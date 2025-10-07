---
sidebar_label: 'XChartsJs'
---

# XChartsJs

The main module responsible to draw and manage a particular chart block on the
page. The user is supposed to import it, instantiate it and then add components.

The `x-charts-js/main.js` module provides the default export, so any name can be
used in place of `XChartsJs`.

```js
import XChartsJs from '/path-to/x-charts-js/main.js';

const instance = new XChartsJs(constructorArgument);
```

## Constructor

```js
const xChartsJs = new XChartsJs(constructorArgument);
```

Instantiates an XChartsJs instance. Is supposed to manage a particular charts
block on the page.

Constructor arguments:

  - constructorArgument: object

### constructorArgument.containerDiv

An HTMLDivElement instance. The `div` on the page which will contain the chart.

### constructorArgument.options

An object.

### constructorArgument.options.backgroundColor

A string. A hexadecimal color code. E.g. `#3300ff` or `#3300FF`

### constructorArgument.options.isComponentInspectMode

A boolean. Setting it to `true` removes the 'cover canvas' element.

The cover canvas element's purpose is to serve as the single image facing the
user. E.g. to save the chart as an image (which is currently not implemented).

But it obstructs an easy use of the devtools' 'Inspect' context menu option.

## .add()

```js
xChartsJs.add(addMethodArg);
```

Adds a component to the chart. E.g. a 'pie-3d', a 'legend'. The user may add
multiple components of the same type. To add a particular component refer to its
documentation page.

:::warning
The return value is not defined, i.e. the user should not rely on it. It can be
changed in future versions.
:::
