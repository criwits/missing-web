const images = document.querySelectorAll('img');

function clearImages(images) {
    images.forEach(img => {
        img.classList.remove('image-center');
    });
}

function ctrlImages(images) {
    images.forEach(img => {
        const src = img.src;
        
        if (src.endsWith('#floatleft') || src.endsWith('#floatright')) {
            const viewportWidth = window.innerWidth;
            
            img.addEventListener('load', () => {
                if (img.width > 0.7 * viewportWidth) {
                    img.classList.add('image-center'); // 添加 img-center 类
                }
            });

            if (img.complete) {
                if (img.width > 0.7 * viewportWidth) {
                    img.classList.add('image-center'); // 添加 img-center 类
                }
            }
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    ctrlImages(images);
});

let resizeTimer;

window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        clearImages(images);
        ctrlImages(images);
    }, 200);
});
