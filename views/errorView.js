import abstractView from "./abstractView.js"

export default class extends abstractView {
    constructor() {
        super();
        this.setTitle("Error");
    };
    async getHtml() {
        const buildView = document.createElement("div");
        const navbar = document.getElementById("navbar");
        navbar.innerHTML = this.buildNavbar();
        navbar.innerHTML += `
            <div class="navbar-btns">
                <button class="log-out-btn" home-btn><i class="fa-solid fa-house icon" home-btn></i>Home</button>
            </div>
        `;
        buildView.appendChild(navbar);
        const main = document.getElementById("main");
        const error = document.createElement("div");
        error.classList.add("error");
        error.innerHTML = `
            404 PAGE NOT FOUND
        `;
        main.innerHTML = error.outerHTML;
        buildView.appendChild(main);
        const footer = document.getElementById("footer");
        footer.innerHTML = this.buildFooter();
        buildView.appendChild(footer);
        return buildView.innerHTML;
    };
};