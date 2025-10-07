---
sidebar_label: 'Legend'
---

# Legend

```js
import '/path-to/x-charts-js/components/legend/main.js';

xChartsJs.add(addMethodArgument);
```

## General notes

Currently this component is just HTML rendered by the browser. This provides
flexibility and allows considerable customizations in the legend's look. The
downside is that it cannot be easily saved as an image.

In the future this may be changed and the legend will be drawn on a canvas as an
image, with the canvas API, which may put restrictions on its look. To rephrase:

:::warning
not every legend which can be generated and added to a chart now, will be
possible to render in the future.
:::

So the user should be aware this.

## xChartsJs.add() method

Arguments:

- addMethodArgument: object

### addMethodArgument.type

Constant string `'legend'`

### addMethodArgument.zIndex

A numeric integer string. E.g. `'-1'`, `'0'` etc.

Similar to the CSS `z-index`. Equals the order of the component in the
'component stack', which is used to draw the components.

### addMethodArgument.htmlFragment

An HTML string, whose rendering by the browser will become the legend presented
to the user. Example:

```js
`
<style>
  ul {
    list-style: decimal-leading-zero;
  }
</style>
<ul>
  <li>Item One</li>
</ul>
`
```
