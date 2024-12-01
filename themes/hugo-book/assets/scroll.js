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

    // 平滑滚动函数
    function smoothScroll(targetPosition) {
        const startPosition = window.scrollY;
        const distance = targetPosition - startPosition;
        const duration = 500; // 动画持续时间（毫秒）
        let startTime = null;

        function animation(currentTime) {
            if (!startTime) startTime = currentTime;
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / duration, 1); // 限制 progress 最大为 1
            const easeInOutQuad = progress < 0.5
                ? 2 * progress * progress
                : 1 - Math.pow(-2 * progress + 2, 2) / 2; // easeInOutQuad 函数
            const scrollY = startPosition + distance * easeInOutQuad;

            window.scrollTo(0, scrollY);

            if (elapsedTime < duration) {
                requestAnimationFrame(animation);
            }
        }

        requestAnimationFrame(animation);
    }

    // 滚动到顶部
    scrollToTopBtn.addEventListener('click', () => {
        // window.scrollTo({ top: 0, behavior: 'smooth' });
        smoothScroll(0);
    });

    // 滚动到底部
    scrollToBottomBtn.addEventListener('click', () => {
        // window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
        smoothScroll(document.body.scrollHeight);
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