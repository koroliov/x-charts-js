---
sidebar_label: 'Usage'
---

# Usage

For some actual working examples see the [Demos page](/docs/demos)

## Download library, unarchive it and place it on your server

TODO: fix the file name

```bash
unzip x-charts-js-v0.0.0.zip
```

## Have web page

- a div element must present and visible
- a script of type module must be used to draw charts on the page

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Some page</title>
</head>
<body>
  ... Some can go content here
  <div id="x-charts-js"></div>
  <script type="module" src="/path-to-module/my-page-charts.js"></script>
  ... Some can go content here
</body>
</html>
```

## In your module script

- import the library's main class

```js
import XChartsJs from '/path-to/x-charts-js/main.js';
```

- import main classes of components to be used. The import is needed for the
  component to be 'registered'.

```js
import '/path-to/x-charts-js/components/pie-3d/main.js';
```

- instantiate the library

```js
const ins = new XChartsJs(xChartsJsConstructorArg);
```

- add components to it

```js
ins.add(addMethodArgPie3d);
ins.add(addMethodArgLegend);
```
