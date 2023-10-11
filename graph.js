export class Graph {
    constructor(elemHeight, elemWidth, graphHeight, graphWidth, padding, data, maxX, maxY, guidesX, guidesY, fontSize) {
        this.elemHeight = elemHeight;
        this.elemWidth = elemWidth;
        this.graphHeight = graphHeight;
        this.graphWidth = graphWidth;
        this.padding = padding;
        this.data = data;
        this.maxX = maxX;
        this.maxY = maxY;
        this.guidesX = guidesX;
        this.guidesY = guidesY;
        this.fontSize = fontSize;
        this.base = ``;
        this.smallDots = ``;
        this.line = ``;
        this.completeLine = ``;
    }

    graphBase() {
        let baseX = `${this.padding},${this.elemHeight - this.padding} ${this.elemWidth - this.padding + 20},${this.elemHeight - this.padding}`
        let baseY = `${this.padding},${this.padding - 20} ${this.padding},${this.elemHeight - this.padding}`;
        let points = baseY + " " + baseX;
        this.base = `
            <marker id="arrowheadY" viewBox="0 0 60 60" refX="10" refY="30" markerUnits="strokeWidth" markerWidth="5" markerHeight="5" orient="auto">
                <path d="M 60 0 L 0 30 L 60 60 z" fill="#000"/>
            </marker>
            <marker id="arrowheadX" viewBox="0 0 60 60" refX="10" refY="30" markerUnits="strokeWidth" markerWidth="5" markerHeight="5" orient="180deg">
                <path d="M 60 0 L 0 30 L 60 60 z" fill="#000"/>
            </marker>
            <polyline marker-start="url(#arrowheadY)" marker-end="url(#arrowheadX)" fill="none" stroke="#000" stroke-width="3" points="${points}"/>
        `;
        return this.base
    }

    horizontalGuides() {
        let horzLines = ``;
        const startX = this.padding;
        const endX = this.elemWidth - this.padding;
        for(let i = 0; i < this.guidesX; i++) {
            const ratio = (i + 1) / this.guidesX;
            const y = this.graphHeight - this.graphHeight * ratio + this.padding;
            horzLines += `<polyline fill="none" stroke='#ccc' strokeWidth=".5" points="${startX},${y} ${endX},${y}"/>`
        }
        return horzLines
    }

    verticalGuides() {
        let vertLines = ``;
        const startY = this.padding;
        const endY = this.elemHeight - this.padding;
        for(let i = 0; i < this.guidesY; i++) {
            const ratio = (i + 1) / this.guidesY;
            const x = this.padding + ratio * (this.elemWidth - this.padding * 2);
            vertLines += `<polyline fill="none" stroke='#ccc' strokeWidth=".5" points="${x},${startY} ${x},${endY}"/>`
        }
        return vertLines
    }

    labelsXLine() {
        let labels = ``;
        let j = 0;
        const y = this.elemHeight - this.padding + this.fontSize;
        this.data.map(e => {
            const x = (j / this.maxX) * this.graphWidth + this.padding - this.fontSize / 4;
            labels += `<text x="${x}" y="${y}" style="fill: #000; font-size: FONT_SIZE;" transform="rotate(25, ${x}, ${y})">${e.label}</text>`
            j++
        })
        return labels
    }

    labelsY() {
        let labels = ``;
        const x = this.padding - this.fontSize;
        const PARTS = this.guidesX
        for(let i = 0; i < PARTS + 1; i++) {
            const ratio = i / this.guidesX;
            const y = this.graphHeight - this.graphHeight * ratio + this.padding + this.fontSize / 2;
            labels += `<text x="${x}" y="${y}" text-anchor="end" style="fill: #000; font-size: FONT_SIZE;">${parseFloat(this.maxY * (i / PARTS)).toFixed(0)}</text>`
        }
        return labels
    }

    lineChart() {
        let i = 0;
        let sumValue = 0;
        const points = this.data.map(e => {
            const x = (i / this.maxX) * this.graphWidth + this.padding
            sumValue += e.value
            const y = this.graphHeight - (sumValue / this.maxY) * this.graphHeight + this.padding
            this.smallDots += `
                <g class="topg">
                    <circle fill="#190061" stroke="none" cx="${x}" cy="${y}" r="5"></circle>
                    <text x="${x}" y="${y-10}" style="fill: antiquewhite;">${sumValue}</text>
                </g>`
            i++
            return `${x},${y}`
        }).join(" ");
        this.line = `<polyline fill="none" stroke="#000" stroke-width="3" points="${points}"/>`;
        this.completeLine = this.line + this.smallDots
        return this.completeLine
    }

    labelsXBar() {
        let labels = ``;
        let j = 0;
        const y = this.elemHeight - this.padding + this.fontSize * 2;
        const space = this.graphWidth / this.maxX;
        this.data.map(e => {
            const x = (j / this.maxX) * this.graphWidth + this.padding + space / 2;
            labels += `<text x="${x}" y="${y}" text-anchor="middle" style="fill: '#ccc', fontSize: FONT_SIZE, fontFamily: 'Helvetica'">${e.label}</text>`
            j++
        })
        return labels
    }

    titles(mainTitle, yTitle, xTitle, legend) {
        let allTitles = ``;
        const mainX = this.elemWidth / 2;
        const mainY = this.padding / 2;
        allTitles += `<text x="${mainX}" y="${mainY}" text-anchor="middle" style="fill: #000; font-size: 30; font-weight: bold;">${mainTitle}</text>`
        const yAxisX = this.fontSize * 2;
        const yAxisY = this.elemHeight / 2;
        allTitles += `<text x="${yAxisX}" y="${yAxisY}" text-anchor="middle" style="fill: #000; font-size: 20; font-weight: bold;" transform="rotate(-90, ${yAxisX}, ${yAxisY})">${yTitle}</text>`
        const xAxisX = this.elemWidth / 2;
        const xAxisY = this.elemHeight - this.padding / 2 + this.fontSize;
        allTitles += `<text x="${xAxisX}" y="${xAxisY}" text-anchor="middle" style="fill: #000; font-size: 20; font-weight: bold;">${xTitle}</text>`
        const legendX = this.padding + this.fontSize;
        const legendY = this.elemHeight - this.padding / 2 + this.fontSize * 2;
        allTitles += `<text x="${legendX}" y="${legendY}" style="fill: antiquewhite; font-size: ${this.fontSize}; font-weight: bold;">${legend}</text>`
        return allTitles
    }

    barChart() {
        let i = 0;
        let bars = ``;
        let text = ``;
        let rate = 0;
        let cut = 20;
        const space = this.graphWidth / this.maxX;
        this.data.map(e => {
            const x = (i / this.maxX) * this.graphWidth + this.padding + cut
            const width = space - cut * 2
            const y = this.graphHeight - (e.value / this.maxY) * this.graphHeight + this.padding
            const height = this.graphHeight - y + this.padding
            const newx = x + width / 2;
            const newy = y - this.fontSize;
            rate = (e.success / e.value * 100).toFixed(1)
            bars += `<rect x="${x}" width="${width}" y="${y}" height="${height}" style="fill: #190061;"></rect>`;
            bars += `<text text-anchor="middle"  x="${newx}" y="${newy}" style="fill: antiquewhite; fontSize: ${this.fontSize};">${rate}%</text>`;
            i++
        })
        return bars
    }
}