import abstractView from "./abstractView.js"

export default class extends abstractView {
    constructor() {
        super();
        this.setTitle("Home");
    };
    async getHtml() {
        let userData = JSON.parse(localStorage.getItem("userData"));
        let lineGraphData = localStorage.getItem("lineGraphData");
        let barGraphData = localStorage.getItem("barGraphData");
        const buildView = document.createElement("div");
        const navbar = document.getElementById("navbar");
        navbar.innerHTML = this.buildNavbar();
        navbar.innerHTML += `
            <div class="navbar-btns">
                <button class="log-out-btn" audit-link><i class="fa-solid fa-link icon" audit-link></i>Audit</button>
                <button class="log-out-btn" log-out><i class="fa-solid fa-right-from-bracket icon" log-out></i>Log out</button>
            </div>
        `;
        buildView.appendChild(navbar);
        const main = document.getElementById("main");
        main.innerHTML = `
            <div class="welcome" id="welcome">
                ${userData.name}, welcome to your statistics page!
            </div>
            <div class="user-stats">
                <div class="box">
                    <div class="box-title" id="title-level">
                        LEVEL
                    </div>
                    <div class="box-content" id="content-level">
                        ${userData.level}
                    </div>
                    <div class="box-content-sml" id="content-sml-level">
                        ${userData.xpToNextLvl} to next level
                    </div>
                </div>
                <div class="box">
                    <div class="box-title" id="title-audit">
                        AUDITS RATIO
                    </div>
                    <div class="box-content" id="content-audit">
                        ${userData.auditsRatio}
                    </div>
                    <div class="box-content-sml audit" id="content-sml-audit">
                        <li>Done: ${userData.auditsDone}</li>
                        <li>Received: ${userData.auditsReceived}</li>
                    </div>
                </div>
                <div class="box">
                    <div class="box-title" id="title-project">
                        LAST PROJECT
                    </div>
                    <div class="box-content last-project" id="content-project">
                        ${userData.lastProject}
                    </div>
                    <div class="box-content-sml" id="content-sml-project">
                    ${userData.active} since: ${userData.lastProjectTime[0]} d ${userData.lastProjectTime[1]} h ${userData.lastProjectTime[2]} m
                    </div>
                </div>
                <div class="box">
                    <div class="box-title" id="title-xp">
                        TOTAL XP
                    </div>
                    <div class="box-content" id="content-xp">
                        ${userData.totalXp}
                    </div>
                    <div class="box-content-sml" id="content-sml-xp">
                        Average grade: ${userData.avgGrade}
                    </div>
                </div>
            </div>
            <div class="user-graphs">
                <svg viewBox="0 0 1200 600" class="graph" id="linegraph">
                    ${lineGraphData}
                </svg>
                <svg viewBox="0 0 1200 600" class="graph" id="bargraph">
                    ${barGraphData}
                </svg>
            </div>
        `;
        buildView.appendChild(main);
        const footer = document.getElementById("footer");
        footer.innerHTML = this.buildFooter();
        buildView.appendChild(footer);
        return buildView.innerHTML;
    };
};