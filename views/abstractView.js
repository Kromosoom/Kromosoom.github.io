export default class {
    constructor() {

    };
    setTitle(title) {   //set page title
        document.title = title;
    };
    async getHtml() {   //build page html
        return ``;
    };
    buildNavbar() { //build navbar with header
        return `
            <div class="header">
                GRAPHQL
            </div>
        `;
    };
    buildFooter() { //build footer
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