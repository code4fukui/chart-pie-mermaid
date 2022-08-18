import mermaid from "https://unpkg.com/mermaid@9.1.5/dist/mermaid.esm.min.mjs";
import { CSV } from "https://js.sabae.cc/CSV.js";
import { summarise } from "./summarise.js";

class ChartPie extends HTMLElement {
  constructor(data) {
    super();
    if (data !== undefined) {
      this.setData(data);
    } else {
      const src = this.getAttribute("src");
      if (src) {
        this.init(src);
      } else {
        const txt = this.textContent.trim();
        const csv = CSV.toJSON(CSV.decode(txt));
        this.setCSV(csv);
      }
    }
  }
  setCSV(csv) {
    const data = {};
    for (const d of csv) {
      data[d.name] = d.value || d.count;
    }
    this.setData(data);
  }

  setData(data0) {
    const data = summarise(data0, 20);
    //const data = data0;
    const res = [];
    res.push("pie showData");
    for (const name in data) {
      res.push(`"${name || "-"}": ${data[name]}`);
    }
    const t = res.join("\n");
    this.textContent = t;
    this.classList.add("mermaid");
  }
  async init(src) {
    const csv = CSV.toJSON(await CSV.fetch(src));
    this.setCSV(csv);
    this.className = "mermaid";
    mermaid.init();
  }
}

customElements.define("chart-pie", ChartPie);

export { ChartPie };
