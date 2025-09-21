---
sidebar_position: 1
---

# Overview

**x-charts-js** is yet another JS library with the purpose to draw dynamic
charts via a convenient JS API interface.

It is supposed to be used in any modern web browser's environment.

## Prerequisites

There are some worth mentioning APIs on which the library relies, namely:

- [JavaScript Modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)
- [HTML 5 Canvas (CanvasRenderingContext2D)](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)
- [Shadow DOM](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_shadow_DOM)

## Current Limitations (v0.0.0)

### No support for user interactions, animations

There are plans to add this in future versions.

### 'Save image as' context menu does not work

If the user attempts to save the chart as an image, it will be a transparent
blank one. This is due to the implementation of the legend component, which is
present as a DOM DocumentFragment, not a &lt;canvas&gt; element.

If one is using only 1 component (and it's not legend) and the XChartsJs
constructor has been supplied the `isComponentInspectMode: true,` option

```js
const xChartsJsConstructorArg = {
  //...
  options: {
    //...
    isComponentInspectMode: true,
    //...
  },
  //...
};
const ins = new XChartsJs(xChartsJsConstructorArg);
```

then it will work, but **this is not supported and can be removed in future
versions**.

Instead there are plans to draw the legend on the canvas and make the normal
behavior of the 'Save as' context menu option work.

### Only ECMAScript modules API is supported

Currently there are no plans to support other JS module systems, like CommonJS,
AMD etc.

## Caveats

### Use only documented API

The user is supposed to use only public, documented API. Although it's possible
to import, use, modify other JS modules, not mentioned in these docs, e.g.

```js
import { validate, getDictionary, }
  from '/path-to/x-charts-js/validation/constructor-arg.js';
```

**the user must not do it**.

## Usage

For some actual working examples see the [Demos page](/docs/demos)

### Download library, unarchive it and place it on your server

TODO: fix the file name

```bash
unzip x-charts-js-v0.0.0.zip
```

### Have web page

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

### In your module script

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
