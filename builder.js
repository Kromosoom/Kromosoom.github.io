import * as helpers from "./helpers.js"
import * as queryString from "./queries.js"
import { Graph } from "./graph.js"

const apiUrl = "https://01.kood.tech/api/graphql-engine/v1/graphql";
let divHeight = 600;
let divWidth = 1200;
let padding = 100;
let fontSize = 16;
let guidesX = 10;
let graphHeight = 400;
let graphWidth = 1000;

export async function UserData(token) { //formatted user data
    let userData = {
        "name": "",
        "level": 0,
        "xpToNextLvl": 0,
        "auditsRatio": 0,
        "auditsDone": 0,
        "auditsReceived": 0,
        "lastProject": "",
        "lastProjectTime": [],
        "totalXp": 0,
        "avgGrade": 0,
    };
    let start;
    const user = await helpers.GetData(apiUrl, token, queryString.user);
    userData.name = user.data.user[0].attrs.firstName.toUpperCase();
    userData.auditsRatio = user.data.user[0].auditRatio.toFixed(2);
    userData.auditsDone = helpers.byteConversion(user.data.user[0].totalUp);
    userData.auditsReceived = helpers.byteConversion(user.data.user[0].totalDown);
    const totalxp = await helpers.GetData(apiUrl, token, queryString.totalXp);
    const totalXpBytes = totalxp.data.transaction_aggregate.aggregate.sum.amount;
    userData.totalXp = helpers.byteConversion(totalXpBytes);
    const level = await helpers.GetData(apiUrl, token, queryString.level);
    userData.level = level.data.transaction_aggregate.aggregate.max.amount;
    userData.xpToNextLvl = helpers.byteConversion(helpers.levelNeededXP(userData.level + 1) - totalXpBytes);
    const grade = await helpers.GetData(apiUrl, token, queryString.avgGrade);
    userData.avgGrade = grade.data.result_aggregate.aggregate.avg.grade.toFixed(2);
    const lastProject = await helpers.GetData(apiUrl, token, queryString.lastProject);
    userData.lastProject = lastProject.data.progress[0].object.name;
    if (!lastProject.data.progress[0].isDone) {
        start = lastProject.data.progress[0].createdAt;
    } else {
        start = lastProject.data.progress[0].updatedAt;
    };
    userData.lastProjectTime = helpers.timeSince(start);
    return userData;
};
export async function buildLineGraph(token) {   //linegraph builder with data
    let xpSum = 0;
    let lineGraph;
    const xpProgress = await helpers.GetData(apiUrl, token, queryString.xpProgression2);
    const lineGraphData = helpers.formatLineGraphData(xpProgress.data.transaction_aggregate.nodes, xpProgress.data.transaction_aggregate.aggregate.sum.amount);
    let maxLineX = lineGraphData.length;
    lineGraphData.forEach(obj => {
        xpSum += obj.value;
    });
    let maxLineY = helpers.roundUp(xpSum);
    let sizeType = helpers.byteConversion(xpProgress.data.transaction_aggregate.aggregate.sum.amount).split(" ")[1];
    let newLineGraph = new Graph(divHeight, divWidth, graphHeight, graphWidth, padding, lineGraphData, maxLineX, maxLineY, guidesX, maxLineX, fontSize);
    let baseGraph = newLineGraph.graphBase();
    let horzGuides = newLineGraph.horizontalGuides();
    let vertGuides = newLineGraph.verticalGuides();
    let labelsX = newLineGraph.labelsXLine();
    let labelsY = newLineGraph.labelsY();
    let titles = newLineGraph.titles("XP PROGRESSION OVER TIME", `XP AMOUNT (${sizeType})`, "", "");
    let line = newLineGraph.lineChart();
    lineGraph = horzGuides + vertGuides + baseGraph + labelsX + labelsY + titles + line;
    return lineGraph;
};
export async function buildBarGraph(token) {    //bargraph builder with data
    let barGraph;
    const jsPiscine = await helpers.GetData(apiUrl, token, queryString.jsPiscineAttempts);
    const barGraphData = helpers.formatBarGraphData(jsPiscine.data.result_aggregate.nodes);
    let maxBarX = barGraphData.length;
    const max = barGraphData.reduce((prev, current)=> ( (prev.value > current.value) ? prev : current),0);
    let maxBarY = helpers.roundUp(max.value);
    let newBarGraph = new Graph(divHeight, divWidth, graphHeight, graphWidth, padding, barGraphData, maxBarX, maxBarY, guidesX, maxBarX, fontSize);
    let baseGraph = newBarGraph.graphBase();
    let horzGuides = newBarGraph.horizontalGuides();
    let labelsX = newBarGraph.labelsXBar();
    let labelsY = newBarGraph.labelsY();
    let titles = newBarGraph.titles("TOTAL ATTEMPTS PER JAVASCRIPT PISCINE QUEST", "TOTAL ATTEMPTS PER QUEST", "QUESTS", "Success rate %");
    let bars = newBarGraph.barChart();
    barGraph = horzGuides + labelsX + labelsY + titles + bars + baseGraph;
    return barGraph;
};