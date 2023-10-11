import abstractView from "./abstractView.js"

export default class extends abstractView {
    constructor() {
        super();
        this.setTitle("Login");
    };
    async getHtml() {
        const buildView = document.createElement("div");
        const navbar = document.getElementById("navbar");
        navbar.innerHTML = this.buildNavbar();
        buildView.appendChild(navbar);
        const main = document.getElementById("main");
        const loginForm = document.createElement("div");
        loginForm.classList.add("loginform");
        loginForm.innerHTML = `
            <form method="POST" id="login_form">
                <label for="username" class="spacing">Username/Email:</label><br>
                <input class="input_fields" type="text" placeholder="Username/Email" name="username" id="username"><br>
                <label for="password" class="spacing">Password:</label><br>
                <input class="input_fields" type="password" placeholder="Password" name="password" id="password"><br>
                <div id="login_error" class="create_comment_error"></div>
                <button class="edit_post_buttons" type="submit" log-in>Login</button>
                <div class="spinner" id="spinner"><i class="fa-solid fa-spinner fa-spin fa-lg"></i></div>
            </form> 
        `;
        main.innerHTML = loginForm.outerHTML;
        buildView.appendChild(main);
        const footer = document.getElementById("footer");
        footer.innerHTML = this.buildFooter();
        buildView.appendChild(footer);
        return buildView.innerHTML;
    };
};