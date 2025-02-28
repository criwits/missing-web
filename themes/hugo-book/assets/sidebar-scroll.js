document.addEventListener("DOMContentLoaded", function () {
    let activeLink = document.querySelector(".book-menu-content .active");

    if (activeLink) {
        activeLink.scrollIntoView({
            behavior: "smooth",
            block: "center",
            inline: "nearest"
        });
    }
});
