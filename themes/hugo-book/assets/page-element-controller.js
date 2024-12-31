/* 常量 */
const wrapContextLength = 8; // 禁折区上下文长度
const floatImageWidthThreshold = 0.65; // 浮动图片宽度阈值
const rerenderInterval = 300; // 重新渲染间隔

/* 中文行首尾标点挤压 */
function destroyPunct() {
    const article = document.querySelector('article');
    const spans = article.querySelectorAll('.force-no-wrap');
    const spansParents = Array.from(spans).map(span => span.parentNode);
    spans.forEach(span => {
        const text = span.textContent;
        const textNode = document.createTextNode(text);
        span.replaceWith(textNode);
    });
    spansParents.forEach(parent => {
        // 将相邻的文本节点合并
        let node = parent.firstChild;
        while (node) {
            if (node.nodeType === Node.TEXT_NODE) {
                let nextNode = node.nextSibling;
                while (nextNode && nextNode.nodeType === Node.TEXT_NODE) {
                    node.textContent += nextNode.textContent;
                    parent.removeChild(nextNode);
                    nextNode = node.nextSibling;
                }
            }
            node = node.nextSibling;
        }
    });
}


function renderPunct() {
    const article = document.querySelector('body');
    const textNodes = getTextNodes(article);
    const chinesePunctuations = /[，。？！；：、「」『』《》〈〉（）【】]/g;
    
    textNodes.forEach(node => {
        const headPuncts = []
        const tailPuncts = []
    
        const text = node.nodeValue;

        let leadingSpaces = 0;
        for (let i = 0; i < text.length; i++) {
            if (text[i] === ' ' || text[i] === '\t' || text[i] === '\n' || text[i] === '\r') {
                leadingSpaces += 1;
            } else {
                break;
            }
        }

        let match;

        while ((match = chinesePunctuations.exec(text)) !== null) {
            const punctuation = match[0];
            const index = match.index;

            // 获取该标点在页面上的位置
            const range = document.createRange();
            range.setStart(node, index);
            range.setEnd(node, index + punctuation.length);
            const rect = range.getBoundingClientRect();
    
            if (index === leadingSpaces) {
                // 只处理 <p>、<h1>、<h2>、<h3>、<h4>、<h5>、<h6>、<li> 和 <a> 下的首尾标点
                if (!node.parentNode || !['P', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'LI', 'A'].includes(node.parentNode.tagName)) {
                    continue;
                }
                const previousNode = node.previousSibling;
                if (previousNode === null) {
                    headPuncts.push(index)
                }
            } else if (index + punctuation.length === text.length) {
                // 结点尾，没有任何必要处理
            } else {
                const previousRange = document.createRange();
                previousRange.setStart(node, index - 1);
                previousRange.setEnd(node, index);
                const previousRect = previousRange.getBoundingClientRect();
    
                const nextRange = document.createRange();
                nextRange.setStart(node, index + punctuation.length);
                nextRange.setEnd(node, index + punctuation.length + 1);
                const nextRect = nextRange.getBoundingClientRect();
    
                if (previousRect.y < rect.y) {
                    // 行首
                    headPuncts.push(index)
                }
    
                if (nextRect.y > rect.y) {
                    // 行尾
                    tailPuncts.push(index)
                }
            }
        }
        if (!(headPuncts.length === 0 && tailPuncts.length === 0)) {
            compressPunct(node, headPuncts, tailPuncts);
        }
    });
    
    function getTextNodes(element) {
        const textNodes = [];
        const walk = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, null);
        let node = walk.nextNode();
        while (node) {
            textNodes.push(node);
            node = walk.nextNode();
        }
        return textNodes;
    }
    
    function compressPunct(node, headPuncts, tailPuncts) {
        const text = node.nodeValue; // 获取文本内容
        const parent = node.parentNode; // 父节点
    
        let spanIntervals = [];

        function checkIfHalfWidth(char) {
            const charCode = char.charCodeAt(0);
            return charCode < 0x2100; // U+2100 之前的字符可以当作比较窄的字符
        }

        function calcHeadFwdPosition(text, index) {
            // 测试ABCD字符「测试字符」
            //            ^i
            //      [][][]  
            let pos = 0;
            let wrapCount = 0;
            for (pos = index - 1; pos >= 0; pos--) {
                if (checkIfHalfWidth(text[pos])) {
                    wrapCount += 1;
                } else {
                    wrapCount += 2;
                }
                if (wrapCount >= wrapContextLength) {
                    break;
                }
            }
            return Math.max(0, pos);
        }

        function calcHeadBwdPosition(text, index) {
            // 测试ABCD字符「测试字符」
            //            ^i
            //           [][][]
            let pos = 0;
            let wrapCount = -1;
            for (pos = index; pos < text.length; pos++) {
                if (checkIfHalfWidth(text[pos])) {
                    wrapCount += 1;
                } else {
                    wrapCount += 2;
                }
                if (wrapCount >= wrapContextLength) {
                    break;
                }
            }
            return Math.min(text.length - 1, pos);
        }

        function calcTailFwdPosition(text, index) {
            // 「测试字符」测试字ABCD
            //         ^i
            //     [][][]
            let pos = 0;
            let wrapCount = -1;
            for (pos = index; pos >= 0; pos--) {
                if (checkIfHalfWidth(text[pos])) {
                    wrapCount += 1;
                }
                else {
                    wrapCount += 2;
                }
                if (wrapCount >= wrapContextLength) {
                    break;
                }
            }
            return Math.max(0, pos);
        }

        function calcTailBwdPosition(text, index) {
            // 「测试字符」测试字ABCD
            //         ^i
            //           [][][]
            let pos = 0;
            let wrapCount = 0;
            for (pos = index + 1; pos < text.length; pos++) {
                if (checkIfHalfWidth(text[pos])) {
                    wrapCount += 1;
                }
                else {
                    wrapCount += 2;
                }
                if (wrapCount >= wrapContextLength) {
                    break;
                }
            }
            return Math.min(text.length - 1, pos);
        }

    
        for (let i = 0; i < text.length; i++) {
            if (headPuncts.includes(i)) {
                // 对于行首标点，从 (i - ctx) 开始，到 (i - 1) 为前禁折区，从 (i) 到 (i + ctx - 1) 为后禁折区
                const f_start = calcHeadFwdPosition(text, i);
                const f_end = Math.max(0, i - 1);
                const b_start = i;
                const b_end = calcHeadBwdPosition(text, i);
                spanIntervals.push([f_start, f_end]);
                spanIntervals.push([b_start, b_end]);
            } else if (tailPuncts.includes(i)) {
                // 对于行尾标点，从 (i - ctx + 1) 开始，到 (i) 为前禁折区，从 (i + 1) 到 (i + ctx) 为后禁折区
                const f_start = calcTailFwdPosition(text, i);
                const f_end = i;
                const b_start = Math.min(text.length - 1, i + 1);
                const b_end = calcTailBwdPosition(text, i);
                spanIntervals.push([f_start, f_end]);
                spanIntervals.push([b_start, b_end]);
            }
        }
    
        const mergedIntervals = mergeIntervals(spanIntervals);
        const spanInIndexes = mergedIntervals.map(interval => interval[0]);
        const spanOutIndexes = mergedIntervals.map(interval => interval[1]);
    
        const wrappedParts = text.split('').map((char, index) => {
            let result = char;
            if (headPuncts.includes(index) || tailPuncts.includes(index)) {
                result = `<span class="force-compress-punct">${result}</span>`;
            }
            if (spanInIndexes.includes(index)) {
                result = `<span class="force-no-wrap">${result}`;
            }
            if (spanOutIndexes.includes(index)) {
                result = `${result}</span>`;
            }
            return result; // 其他字符保持不变
        });
    
        // 将新内容插入到 DOM 中
        const newContent = wrappedParts.join('');
        const tempContainer = document.createElement('div');
        tempContainer.innerHTML = newContent;
    
        // 替换原文本节点
        while (tempContainer.firstChild) {
            parent.insertBefore(tempContainer.firstChild, node);
        }
        parent.removeChild(node); // 移除原始文本节点
    }
    
    function mergeIntervals(intervals) {
      // 按照每个区间的起始点进行排序
      intervals.sort((a, b) => a[0] - b[0]);
    
      const merged = [];
      let currentInterval = intervals[0];
    
      for (let i = 1; i < intervals.length; i++) {
        const interval = intervals[i];
        // 检查当前区间是否与前一个区间重叠
        if (currentInterval[1] >= interval[0]) {
          // 如果重叠，合并区间
          currentInterval[1] = Math.max(currentInterval[1], interval[1]);
        } else {
          // 如果不重叠，将前一个区间添加到结果数组中
          merged.push(currentInterval);
          currentInterval = interval; // 更新当前区间为当前遍历到的区间
        }
      }
    
      // 将最后一个区间添加到结果数组中
      merged.push(currentInterval);
    
      return merged;
    }
}

/* 浮动图片对齐 */
function clearImages(images) {
    images.forEach(img => {
        img.classList.remove('image-center');
    });
}

function ctrlImages(images) {
    images.forEach(img => {
        const src = img.src;
        
        if (src.endsWith('#floatleft') || src.endsWith('#floatright')) {
            const bookPage = document.querySelector('.book-page');
            const bookPageWidth = bookPage.clientWidth;
            
            if (img.clientWidth > floatImageWidthThreshold * bookPageWidth) {
                img.classList.add('image-center'); // 添加 img-center 类
            }
        }
    });
}

/* 加载器 */
window.onload = function() {
    let resizeTimer;
    const images = document.querySelectorAll('img');
    ctrlImages(images);
    renderPunct();

    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            clearImages(images);
            ctrlImages(images);
            destroyPunct();
            renderPunct();
        }, rerenderInterval);
    });
}

