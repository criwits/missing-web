const menuControlChkbox = document.querySelector("#menu-control");
const menuTab = document.querySelector(".book-menu");
const menuTabContent = document.querySelector(".book-menu-content");
const menuOverlay = document.querySelector(".book-menu-overlay");
const bookPage = document.querySelector(".book-page");

const tocControlChkbox = document.querySelector("#toc-control");
const tocTab = document.querySelector(".book-header>aside");
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
    } else {
        tocTab.classList.add("hidden");
    }
})

tocAnchors.forEach(a => {
    a.addEventListener("click", () => {
        if (tocControlChkbox.checked) {
            tocControlChkbox.checked = false;
            tocTab.classList.add("hidden");
        }
    })
});