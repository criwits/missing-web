document.addEventListener('DOMContentLoaded', function () {
    const scrollToTopBtn = document.getElementById('scroll_to_top');
    const scrollToBottomBtn = document.getElementById('scroll_to_bottom');
    let timeoutId = null;

    // 检查滚动位置
    function checkScroll() {
        showButtons();
        resetTimeout();
    }

    // 显示按钮
    function showButtons() {
        scrollToTopBtn.style.opacity = '0.7';
        scrollToTopBtn.style.visibility = 'visible';
        scrollToBottomBtn.style.opacity = '0.7';
        scrollToBottomBtn.style.visibility = 'visible';
    }

    // 隐藏按钮
    function hideButtons() {
        scrollToTopBtn.style.opacity = '0';
        scrollToTopBtn.style.visibility = 'hidden';
        scrollToBottomBtn.style.opacity = '0';
        scrollToBottomBtn.style.visibility = 'hidden';
    }

    // 重置隐藏计时器
    function resetTimeout() {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(hideButtons, 2000);
    }

    // 滚动到顶部
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo(0, 0);
    });

    // 滚动到底部
    scrollToBottomBtn.addEventListener('click', () => {
        window.scrollTo(0, document.body.scrollHeight);
    });

    // 鼠标悬停或触摸时提高不透明度
    [scrollToTopBtn, scrollToBottomBtn].forEach((btn) => {
        btn.addEventListener('mouseenter', () => {
            btn.style.opacity = '1';
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.opacity = '0.7';
        });
        btn.addEventListener('touchstart', () => {
            btn.style.opacity = '1';
        });
    });

    // 添加滚动事件监听
    window.addEventListener('scroll', checkScroll);

    // 初始化
    hideButtons();
});