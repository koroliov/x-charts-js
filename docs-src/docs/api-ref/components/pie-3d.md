---
sidebar_label: 'Pie-3d'
---

# Pie-3d

```js
import '/path-to/x-charts-js/components/pie-3d/main.js';

XChartsJs.add(addMethodArgument);
```

## General notes

### Rotations order

The chart has several options which transform its position in 3d space. The
transformations happen in this order:

- rotate around the pie's center - Z axis, by
the [addMethodArgument.options.startAtDeg](#addmethodargumentoptionsstartatdeg)
angle.
- rotate around the pie's center - X axis, by
the [addMethodArgument.options.rotationAroundCenterXAxisDeg](#addmethodargumentoptionsrotationaroundcenterxaxisdeg)
angle.
- rotate around the pie's center - Z axis, by
the [addMethodArgument.options.rotationAroundCenterZAxisDeg](#addmethodargumentoptionsrotationaroundcenterzaxisdeg)
angle.

There is no way to change this order.

### Unsafely large numeric values

Currently there are no safeguards regarding too large numbers, e.g. those with
are close to `Number.MAX_VALUE` so that mathematical operations become
inaccurate.

E.g. if the data provided contains values large enough that when summed up,
processed the result will be inaccurate (`Infinity`, `NaN` etc.), then currently
the user is supposed to take care of this.

normalize data to something reasonable/safe. E.g divide each item by
1,000,000,000,000 etc., exclude/combine too small values etc.

Currently this was deemed to be an overkill to implement.

## xChartsJs.add() method

Arguments:

- addMethodArgument: object

### addMethodArgument.type

Constant string `'pie-3d'`

### addMethodArgument.zIndex

A numeric integer string. E.g. `'-1'`, `'0'` etc.

Similar to the CSS `z-index`. Equals the order of the component in a 'component
stack', which is used to draw the components.

### addMethodArgument.options

An object.

### addMethodArgument.options.thicknessPx

A number of pixels for the pie's height/thickness.

### addMethodArgument.options.radiusPx

A number of pixels for the pie's radius

### addMethodArgument.options.centerXPx

A number, the x coordinate of the pie's center point (the origin is the top left
corner, which is the standard for the HTML 5 Canvas).

### addMethodArgument.options.centerYPx

A number, the y coordinate of the pie's center point (the origin is the top left
corner, which is the standard for the HTML 5 Canvas).

### addMethodArgument.options.startAtDeg

A number, the angle in degrees from which the first slice will be drawn
counterclockwise.

### addMethodArgument.options.rotationAroundCenterXAxisDeg

A number, the angle in degrees by which the standard 2d pie will be rotated
around the axis passing thru its center and parallel to the originX axis.

### addMethodArgument.options.rotationAroundCenterZAxisDeg

A number, the angle in degrees by which the standard 2d pie will be rotated
around the axis passing thru its center and parallel to the originZ axis.

### addMethodArgument.data

An array of data to draw.

### addMethodArgument.data[N]

An object.

### addMethodArgument.data[N].value

A number >= 0. The actual numeric value to be represented by the chart.

### addMethodArgument.data[N].meta

An object.

### addMethodArgument.data[N].meta.faceColor

A string. A hexadecimal color code. E.g. `#3300ff` or `#3300FF`.

The face of the slice on the pie, which corresponds to the data item, will be
filled with this color.

### addMethodArgument.data[N].meta.rimColor

A string. A hexadecimal color code. E.g. `#3300ff` or `#3300FF`.

The rim part of the slice on the pie, which corresponds to the data item, will
be filled with this color.
