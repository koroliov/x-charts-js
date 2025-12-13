---
description: "A JavaScript canvas charting library with no dependencies, works
in any modern web browser and potentially in any environemnt which supports
CanvasRenderingContext2D API and DOM with Shadow DOM. No WebGL is required.
Currently implemented charts, components: pie 3d, legend."
---

# Overview

:::tip
**There is the <a class="button button--primary button--sm"
href="/x-charts-js/docs/demos/">demo page</a> with live working example.**
:::

## Introduction

**x-charts-js** is yet another JavaScript library with the purpose to draw
dynamic charts via a convenient JavaScript API interface. It has no other
library dependencies and doesn't require WebGL. Will work in any modern web
browser and potentially other environments if the necessary APIs are provided
there.

## Requirements

There are some worth mentioning APIs on which the library relies, namely:

- [JavaScript Modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)
- [HTML 5 Canvas (CanvasRenderingContext2D)](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)
- [Shadow DOM](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_shadow_DOM)

## Usage

- Download
  [latest released version](https://github.com/koroliov/x-charts-js/releases),
  unarchive it and place it on your server:

  ```bash
  #downloaded from https://github.com/koroliov/x-charts-js/releases
  unzip x-charts-js.zip
  ```

- Have web page:

  - a div element must present and visible;
  - a script of type module must be used to draw charts on the page;

  ```html {9-10}
  <!doctype html>
  <html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Some page</title>
  </head>
  <body>
    ... Some content here
    <div id="x-charts-js"></div>
    <script type="module" src="/path-to-module/my-page-charts.js"></script>
    ... Some content here
  </body>
  </html>
  ```

- In your module script:

  - import the library's main class:

    ```js
    import XChartsJs from '/path-to/x-charts-js/main.js';
    ```

  - import main classes of components to be used. The import is needed for the
    component to be 'registered':

    ```js
    import '/path-to/x-charts-js/components/pie-3d/main.js';
    ```

  - instantiate the library:

    ```js
    const ins = new XChartsJs(xChartsJsConstructorArg);
    ```

  - add components to it:

    ```js
    ins.add(addMethodArgPie3d);
    ins.add(addMethodArgLegend);
    ```

## Current Limitations

- No support for user interactions, animations.

  There are plans to add this in v0.1.0.

- 'Save image as' context menu does not work.

  If the user attempts to save the chart as an image, it will be a transparent
  blank one. This is due to the implementation of the legend component, which is
  present as a DOM DocumentFragment, not a &lt;canvas&gt; element.

  If one is using only 1 component (and it's not legend) and the XChartsJs
  constructor has been passed the `isComponentInspectMode: true` option:

  ```js {5}
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

  then it will work, but

  :::warning
  this is not supported and can be removed in future versions.
  :::

  Instead there are plans to draw the legend on the canvas and make the normal
  behavior of the 'Save as' context menu option work.

- Only ECMAScript modules API is supported.

  Currently there are no plans to support other JS module systems, like
  CommonJS, AMD etc., **but if there is a need, please consider creating a
  request on the [GitHub repository](https://github.com/koroliov/x-charts-js).**

## Caveats

- Use only documented API.

  The user is supposed to use only public, documented API. Although it's
  possible to import, use, modify other JS modules, not mentioned in these docs,
  e.g.

  ```js
  import { validate, getDictionary, }
    from '/path-to/x-charts-js/validation/constructor-arg.js';
  ```

  :::warning
  the user must not do it.
  :::

- Unstable API.

  Breaking changes may be introduced on minor version updates.
