# chart-pie-mermaid

Mermaidライブラリを使用して円グラフを作成するための軽量なWebコンポーネントです。

## デモ

https://code4fukui.github.io/chart-pie-mermaid/

## 機能

- シンプルなHTMLカスタム要素（`<chart-pie>`）として円グラフを描画します。
- 外部CSVファイルまたはインラインのCSVデータからチャートにデータを読み込みます。
- JavaScriptを使用してプログラムからインスタンス化および設定が可能です。
- データが20項目以上ある場合、自動的に集計を行い、割合の小さいデータを「その他」カテゴリにまとめます。
- [Mermaid](https://mermaid-js.github.io/mermaid/#/)を利用しており、自動的にバンドル・読み込みが行われます。

## 使い方

このコンポーネントは自己完結型のJavaScriptモジュールです。ビルドやパッケージのインストールは不要です。

### 1. 外部CSVファイルからの読み込み

`src`属性を使用してデータファイルを指定します。

```html
<script type="module" src="https://code4fukui.github.io/chart-pie-mermaid/chart-pie.js"></script>

<chart-pie src="./data.csv"></chart-pie>
```

### 2. インラインCSVデータの使用

CSVデータを直接`<chart-pie>`タグ内に記述します。ヘッダーは`name,count`または`name,value`である必要があります。チャートのサイズは標準のCSSプロパティを使用して設定できます。

```html
<script type="module" src="https://code4fukui.github.io/chart-pie-mermaid/chart-pie.js"></script>

<chart-pie style="height:400px; width:600px;">
name,count
A,30
B,20
C,70
</chart-pie>
```

### 3. JavaScriptでの作成

`ChartPie`クラスをインポートし、JavaScriptオブジェクトを使用してプログラムからインスタンスを作成することも可能です。

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

## クレジット

このプロジェクトは[code4fukui/chart-pie](https://github.com/code4fukui/chart-pie)のフォークであり、描画にMermaidを使用するように改変されています。

## ライセンス

MIT License
