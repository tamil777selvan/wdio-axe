# wdio-axe
Provides sync bindings for axe with webdriverio


## Getting Started

Install [Node.js](https://docs.npmjs.com/getting-started/installing-node) if you haven't already. 

Install axe-wdio and its dependencies: `npm i wdio-axe`

## Usage

This module uses a axe-core API to inject, configure and analyze web pages rendered by wdio.

## Example

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
