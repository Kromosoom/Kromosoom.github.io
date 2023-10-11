export default class {
    constructor() {

    };
    setTitle(title) {   //set page title
        document.title = title;
    };
    async getHtml() {   //build page html
        return ``;
    };
    buildNavbar() {
        return `
            <div class="header">
                GRAPHQL
            </div>
        `;
    };
    buildFooter() {
        return `
            <div class="contact">
                <i class="fa-brands fa-discord icon"></i>kromosoom
            </div>
            <div class="copyright">
                <i class="fa-regular fa-copyright icon"></i> 2023 Gerol
            </div>
        `;
    };
};