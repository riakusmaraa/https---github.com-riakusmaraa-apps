const elements = document.getElementsByClassName("nav__link");
for (let i = 0; i < elements.length; i++) {
    elements[i].onclick = function () {
        let el = elements[0];
        while (el) {
            if (el.tagName === "A") {
                el.classList.remove("nav__link--active");
            }
            el = el.nextSibling;
        }
        this.classList.add("nav__link--active");
    };
}