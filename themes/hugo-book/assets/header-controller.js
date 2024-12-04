const header = document.querySelector('.book-header');
const bookPage = document.querySelector(".book-page");

const menuControlChkbox = document.querySelector("#menu-control");
const menuTab = document.querySelector(".book-menu");
const menuTabContent = document.querySelector(".book-menu-content");
const menuOverlay = document.querySelector(".book-menu-overlay");

const tocControlChkbox = document.querySelector("#toc-control");
const tocTab = document.querySelector(".book-header>aside");
const tocTabOverlay = document.querySelector(".book-toc-overlay");
const tocAnchors = tocTab.querySelectorAll("a");

menuControlChkbox.addEventListener("change", () => {
    if (menuControlChkbox.checked) {
        menuTab.classList.add("book-menu-checked");
        menuTabContent.classList.add("book-menu-content-checked");
        menuOverlay.classList.add("book-menu-overlay-checked");
        bookPage.classList.add("book-page-checked");
    } else {
        menuTab.classList.remove("book-menu-checked");
        menuTabContent.classList.remove("book-menu-content-checked");
        menuOverlay.classList.remove("book-menu-overlay-checked");
        bookPage.classList.remove("book-page-checked");
    }
});

tocControlChkbox.addEventListener("change", () => {
    if (tocControlChkbox.checked) {
        tocTab.classList.remove("hidden");
        tocTabOverlay.classList.add("book-toc-overlay-checked");
    } else {
        tocTab.classList.add("hidden");
        tocTabOverlay.classList.remove("book-toc-overlay-checked");
    }
})

tocAnchors.forEach(a => {
    a.addEventListener("click", () => {
        if (tocControlChkbox.checked) {
            tocControlChkbox.checked = false;
            tocTab.classList.add("hidden");
            tocTabOverlay.classList.remove("book-toc-overlay-checked");
        }
    })
});


window.addEventListener('scroll', () => {
    if (window.scrollY > 0) {
        header.style.boxShadow = '0 0 0.3rem rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = 'none';
    }
});