document.addEventListener('DOMContentLoaded', function() {
    renderPunct();
});

let resizeTimer;

window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
        destroyPunct();
        renderPunct();
    }, 100);
});

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
    const article = document.querySelector('article');
    const textNodes = getTextNodes(article);
    const chinesePunctuations = /[，。？！；：、「」『』《》〈〉（）【】]/g;
    
    textNodes.forEach(node => {
        const headPuncts = []
        const tailPuncts = []
    
        const text = node.nodeValue;
        let match;
    
        while ((match = chinesePunctuations.exec(text)) !== null) {
            const punctuation = match[0];
            const index = match.index;
    
            // 获取该标点在页面上的位置
            const range = document.createRange();
            range.setStart(node, index);
            range.setEnd(node, index + punctuation.length);
            const rect = range.getBoundingClientRect();
    
            // 如果该标点是 node 的首个字符或者最后一个字符，打印「首」或「尾」
            if (index === 0) {
                // 结点首，行首标点需要挤压，但是结点首不一定是行首
                previousNode = node.previousSibling;
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
        const wrapContextLength = 2;
        const text = node.nodeValue; // 获取文本内容
        const parent = node.parentNode; // 父节点
    
        let spanIntervals = [];
    
        for (let i = 0; i < text.length; i++) {
            if (headPuncts.includes(i)) {
                // 对于行首标点，从 (i - ctx) 开始，到 (i - 1) 为前禁折区，从 (i) 到 (i + ctx - 1) 为后禁折区
                const f_start = Math.max(0, i - wrapContextLength);
                const f_end = Math.max(0, i - 1);
                const b_start = i;
                const b_end = Math.min(text.length - 1, i + wrapContextLength - 1);
                spanIntervals.push([f_start, f_end]);
                spanIntervals.push([b_start, b_end]);
            } else if (tailPuncts.includes(i)) {
                // 对于行尾标点，从 (i - ctx + 1) 开始，到 (i) 为前禁折区，从 (i + 1) 到 (i + ctx) 为后禁折区
                const f_start = Math.max(0, i - wrapContextLength + 1);
                const f_end = i;
                const b_start = Math.min(text.length - 1, i + 1);
                const b_end = Math.min(text.length - 1, i + wrapContextLength);
                spanIntervals.push([f_start, f_end]);
                spanIntervals.push([b_start, b_end]);
            }
        }
    
        let mergedIntervals = mergeIntervals(spanIntervals);
        let spanInIndexes = mergedIntervals.map(interval => interval[0]);
        let spanOutIndexes = mergedIntervals.map(interval => interval[1]);
    
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