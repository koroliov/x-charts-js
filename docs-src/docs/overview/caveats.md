---
sidebar_label: 'Caveats'
---

# Caveats

## Use only documented API

The user is supposed to use only public, documented API. Although it's possible
to import, use, modify other JS modules, not mentioned in these docs, e.g.

```js
import { validate, getDictionary, }
  from '/path-to/x-charts-js/validation/constructor-arg.js';
```

:::warning
the user must not do it.
:::
