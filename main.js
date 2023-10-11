import Login from "./views/loginView.js"
import Home from "./views/homeView.js"
import Error from "./views/errorView.js"
import * as helpers from "./helpers.js"
import * as data from "./builder.js"

const authUrl = "https://01.kood.tech/api/auth/signin";

export const navigateTo = url => { //change URL without reloading the page
    history.pushState(null, null, url);
    router();
};
const router = async () => {
    const routes = [
        {path: "#login", view: Login},
        {path: "/", view: Home},
        {path: "#error", view: Error},
    ];
    const potentialMatches = routes.map(route => {
        return {
            route: route,
            result: location.hash === route.path
        }
    });
    let match = potentialMatches.find(potentialMatch => potentialMatch.result) //find which routes path matched url
    if (!match && location.hash === "") {   //if no such path, load error page
        match = {
            route: routes[1],
            result: [location.hash]
        };
    } else if (!match) {    //if no such path, load error page
        match = {
            route: routes[2],
            result: [location.hash]
        };
    };
    if (document.cookie !== "graphql=access" && match.route.path === "/") {
        match = {
            route: routes[0],
            result: [location.hash]
        };
    };
    const view = new match.route.view(match);
    document.querySelector("body").innerHTML = await view.getHtml();
};
window.addEventListener("popstate", router); //for func router to be executed when pressing "forward/backwards" in browser
document.addEventListener("DOMContentLoaded", () => {   //when HTML/script is loaded/executed, add all the possible eventlisteners
    document.body.addEventListener("click", e => {
        if (e.target.matches("[log-in]")) {
            e.preventDefault();
            validateLogin();
        }
        if (e.target.matches("[log-out]")) {
            e.preventDefault();
            document.cookie = "graphql=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
            localStorage.clear();
            navigateTo("#login");
        }
        if (e.target.matches("[audit-link]")) {
            window.open("https://github.com/01-edu/public/tree/master/subjects/graphql/audit");
        }
        if (e.target.matches("[home-btn]")) {
            e.preventDefault();
            navigateTo("/");
        }
    });
    router();
});
async function validateLogin() {  //frontend validation for login
    const input = document.getElementById("login_form");
    const errorLogin = document.getElementById("login_error");
    const spinner = document.getElementById("spinner");
    const formdata = new FormData(input);
    let username = formdata.get("username");
    let password = formdata.get("password");
    if (username === "") {
        errorLogin.innerHTML = `Please insert username/email!`;
    } else if (password === "") {
        errorLogin.innerHTML = `Please insert password!`;
    } else {
        spinner.style.visibility = "visible";
        let basicAuth = btoa(`${username}:${password}`);
        let token = await helpers.Authentication(authUrl, basicAuth);
        if (token.error === undefined && token !== "") {
           let userData = await data.UserData(token);
           localStorage.setItem("userData",  JSON.stringify(userData));
           let lineGraphData = await data.buildLineGraph(token);
           localStorage.setItem("lineGraphData", lineGraphData);
           let barGraphData = await data.buildBarGraph(token);
           localStorage.setItem("barGraphData", barGraphData);
           document.cookie = "graphql=access";
           navigateTo("/");
           spinner.style.visibility = "hidden";
        } else {
            errorLogin.innerHTML = token.error;
            spinner.style.visibility = "hidden";
        };
    };
};