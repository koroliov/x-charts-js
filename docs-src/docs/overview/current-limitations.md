---
sidebar_label: 'Current limitations'
---

# Current Limitations (v0.0.0)

## No support for user interactions, animations

There are plans to add this in future versions.

## 'Save image as' context menu does not work

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

## Only ECMAScript modules API is supported

Currently there are no plans to support other JS module systems, like CommonJS,
AMD etc.
