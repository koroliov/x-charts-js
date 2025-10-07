---
sidebar_label: 'Version'
---

# Version

Module which provides the current [semver](https://semver.org/).

:::warning
Major version 0 is unstable and breaking changes can occur on minor version
updates.
:::

```js
import * as version from '/path-to/x-charts-js/version.js';
```

## Exported properties

<table>
  <thead>
    <th> Property name </th>
    <th> Description </th>
  </thead>
  <tbody>
    <tr>
      <td> version.major </td>
      <td rowspan="3"> Number </td>
    </tr>
    <tr>
      <td> version.minor </td>
    </tr>
    <tr>
      <td> version.patch </td>
    </tr>
  </tbody>
</table>
