document.addEventListener('DOMContentLoaded', function() {
    const article = document.querySelector('article');
    const textNodes = getTextNodes(article);
    const chinesePunctuations = /[，。？！；：、「」『』《》〈〉（）【】]/g;

    textNodes.forEach(node => {
        const text = node.nodeValue;
        let match;
        const punctList = []
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
                // console.log('结点首')
                // punctList.push(index)
            } else if (index + punctuation.length === text.length) {
                // console.log('结点尾')
                // punctList.push(index)
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
                    // 打印前后的字符
                    const contextText = text.substring(index - 1, index + 1);
                    console.log(contextText)
                    console.log('行首')
                    punctList.push(index)
                }

                if (nextRect.y > rect.y) {
                    // 打印前后的字符
                    const contextText = text.substring(index - 1, index + 2);
                    console.log(contextText)
                    console.log('行尾')
                    punctList.push(index)
                }
            }
        }
        console.log(punctList)
        if (punctList.length > 0) {
            compressPunct(node, punctList)
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

    function compressPunct(node, punctList) {
        const text = node.nodeValue; // 获取文本内容
        const parent = node.parentNode; // 父节点

        // 将文本拆分为数组，用于构建新的 HTML 结构
        const wrappedParts = text.split('').map((char, index) => {
            if (punctList.includes(index)) {
                // 包裹指定下标的字符
                return `<span class="force-compress-punct">${char}</span>`;
            }
            return char; // 其他字符保持不变
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
});

