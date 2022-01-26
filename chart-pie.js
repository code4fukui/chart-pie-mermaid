import * as d3 from "https://cdn.skypack.dev/d3@7";
import { CSV } from "https://js.sabae.cc/CSV.js";
import { Num } from "https://js.sabae.cc/Num.js";

class ChartPie extends HTMLElement {
  constructor(data) {
    super();
    if (data !== undefined) {
      if (!Array.isArray(data)) {
        data = Object.keys(data).map(name => {
          return { name, value: data[name] }
        });
      }
      this.data = data;
      console.log(this.data);
      //this.setAttribute("value", data);
    } else {
      const txt = this.textContent.trim();
      const data = CSV.toJSON(CSV.decode(txt));
      this.textContent = "";
      if (data.length > 0) {
        this.data = data;
      }
    }
    this.style.display = this.style.display || "inline-block";
    this.init();
  }
  async init() {
    if (!this.data) {
      const fn = this.getAttribute("src");
      if (fn) {
        this.data = CSV.toJSON(await CSV.fetch(fn));
      }
    }
    window.addEventListener("resize", () => this.draw());
    this.draw();
  }
  draw() {
    if (this.svg) {
      this.svg.remove();
    }
    const svg = this.svg = d3.select(this).append("svg");

    const dataset = this.data;
    const width = this.offsetWidth || 400;
    const height = this.offsetHeight || 400;
    const radius = Math.min(width, height) / 2 - 10;
    
    if (!dataset) {
      return;
    }

    svg.attr("width", width).attr("height", height);
    const g = svg.append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
    
    const color = d3.scaleSequential((t) => d3.hsl(t / 12 * 360, 1, .6));
 
    const pie = d3.pie()
      .value((d) => d.value || d.count)
      .sort(null);
  
    const pieGroup = g.selectAll(".pie")
      .data(pie(dataset))
      .enter()
      .append("g")
      .attr("class", "pie");
  
    const arc = d3.arc()
      .outerRadius(radius)
      .innerRadius(0);
  
    pieGroup.append("path")
      .attr("d", arc)
      .attr("fill", (d) => color(d.index))
      .attr("opacity", 0.75)
      .attr("stroke", "white");
  
    const text = d3.arc()
      .outerRadius(radius - 30)
      .innerRadius(radius - 30);
  
    const sum = dataset.reduce((pre, cur) => parseInt(cur.count || cur.value) + pre, 0);

    pieGroup.append("text")
      .attr("fill", "black")
      .attr("transform", (d) => "translate(" + text.centroid(d) + ")")
      .attr("dy", "5px")
      .attr("font-size", "12px")
      .attr("text-anchor", "middle")
      .text((d) => d.data.name + " " + Num.addComma(d.data.count || d.data.value) + " " + (parseInt(d.data.count || d.data.value) / sum * 100).toFixed(1) + "%");
    
    pieGroup.append("text")
      .attr("fill", "black")
      .attr("dy", "5px")
      .attr("font-size", "12px")
      .attr("text-anchor", "middle")
      .text((d) => Num.addComma(sum));
  }
}

customElements.define("chart-pie", ChartPie);

export { ChartPie };
