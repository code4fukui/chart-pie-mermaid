> 日本語のREADMEはこちらです: [README.ja.md](README.ja.md)

# chart-pie-mermaid

A lightweight web component for creating pie charts using the Mermaid diagramming library.

## Demo

https://code4fukui.github.io/chart-pie-mermaid/

## Features

-   Renders pie charts as a simple HTML custom element (`<chart-pie>`).
-   Populates charts from an external CSV file or inline CSV data.
-   Can be instantiated and configured programmatically with JavaScript.
-   Automatically summarizes datasets with 20 or more segments, grouping smaller slices into an "Others" category.
-   Powered by [Mermaid](https://mermaid-js.github.io/mermaid/#/), which is bundled and loaded automatically.

## Usage

This component is a self-contained JavaScript module. No build step or package installation is required.

### 1. Load from an external CSV file

Use the `src` attribute to point to your data file.

```html
<script type="module" src="https://code4fukui.github.io/chart-pie-mermaid/chart-pie.js"></script>

<chart-pie src="./data.csv"></chart-pie>
```

### 2. Use inline CSV data

Place your CSV data directly inside the `<chart-pie>` tag. The header must be `name,count` or `name,value`. You can set the size of the chart using standard CSS properties.

```html
<script type="module" src="https://code4fukui.github.io/chart-pie-mermaid/chart-pie.js"></script>

<chart-pie style="height:400px; width:600px;">
name,count
A,30
B,20
C,70
</chart-pie>
```

### 3. Create with JavaScript

You can also import the `ChartPie` class and create an instance programmatically with a JavaScript object.

```html
<div id="chart-container"></div>

<script type="module">
  import { ChartPie } from "https://code4fukui.github.io/chart-pie-mermaid/chart-pie.js";

  const data = {
    "A": 30,
    "B": 20,
    "C": 70,
  };

  const chart = new ChartPie(data);
  document.getElementById("chart-container").appendChild(chart);
</script>
```

## Credit

This project is a fork of [code4fukui/chart-pie](https://github.com/code4fukui/chart-pie), adapted to use Mermaid for rendering.

## License

MIT License