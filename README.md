# wdio-axe
`aXe` is the accessibility engine for automated testing of HTML-based
user interfaces. These hints run the recommended set of WCAG 2.1
Level A and Level AA rules from [axe-core](https://github.com/dequelabs/axe-core/).

This module uses axe-core API to inject, configure and analyze web pages rendered by wdio by providing sync bindings.

## What does the wdio-axe check?

By default, `wdio-axe` runs against all the
[WCAG 2.1](https://www.w3.org/TR/WCAG21/) Level A and Level AA rules included in
[axe-core](https://github.com/dequelabs/axe-core/) with `document` as the target. 

These rules are grouped based on their assigned category within `axe-core`.

## Getting started

First download the package:

```console
npm install wdio-axe --save-dev
```

## Implementations

### Get Violations
Here is an example script returns violations with tags "wcag2a", "wcag2aa"

```javascript
let aXe = require('wdio-axe');

let result = aXe.getViolations();
console.log(result);
```


### Best-Practice

Here is an example script returns best practice which can be adopted to provide better accessibility.

```javascript
let aXe = require('wdio-axe');

let result = aXe.getBestPractice();
console.log(result);
```

### Get-Rules

Here is an example script returns the list of all rules carried out for performing accessibility.

```javascript
let aXe = require('wdio-axe');

let result = aXe.getRules();
console.log(result);
```

Here is an example script returns the list of rules based on tags.

```javascript
let aXe = require('wdio-axe');

let result = aXe.getRules(["wcag2a", "wcag2aa"]);
console.log(result);
```

### Configure Axe

Here is an example script to modify axe configuration.

```javascript
let aXe = require('wdio-axe');

aXe.runConfig({
    reporter: { reporter: "v1" }
});
```

### Reset Configuration

Here is an example script to reset all axe configuration to default.

```javascript
let aXe = require('wdio-axe');

aXe.reset();
```

### Analyze With Tag

Here is an example script to run axe with custom tag.

```javascript
let aXe = require('wdio-axe');

let result = aXe.analyseWithTag(["best-practice"]);
console.log(result);
```

### Analyze With Context

Here is an example script to run axe with context enabled.

```javascript
let aXe = require('wdio-axe');

let result = aXe.analyseWithContext([{include: [['#iframe']]}]);
console.log(result);
```

## Further Reading

* [Deque University](https://dequeuniversity.com/)
* [Axe Rules](https://dequeuniversity.com/rules/axe/3.3)
* [Web Accessibility Initiative (WAI)](https://www.w3.org/WAI/)
