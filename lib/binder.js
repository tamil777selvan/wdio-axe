const axeSource = require('axe-core').source;
const axe = require('axe-core');
let arrayCounter = require('array-counter');
let _ = require('lodash');
let colors = require('colors');

class axeConfig {

    getViolations() {
        try {
            let resultAxeArray = [];
            let resultImpactArray = [];
            browser.execute(axeSource);
            let result = browser.executeAsync(function (done) {
                axe.run({runOnly: {type: 'tags', values: ["wcag2a", "wcag2aa"]}}, function (err, result) {
                    if (err) done(err);
                    done(result);
                })
            });
            result.value.violations.forEach(function (value, index) {
                result.value.violations[index].nodes.forEach(function (value) {
                    if (value.failureSummary.includes("color contrast")) {
                        resultAxeArray.push('Elements must have sufficient color contrast');
                        resultImpactArray.push(value.impact);
                    } else if (value.failureSummary.includes("Required ARIA")) {
                        resultAxeArray.push('Certain ARIA roles must be contained by particular parents');
                        resultImpactArray.push(value.impact);
                    } else if (value.failureSummary.includes("List item does not have")) {
                        resultAxeArray.push('elements must be contained in');
                        resultImpactArray.push(value.impact);
                    } else if (value.failureSummary.includes("semantics")) {
                        resultAxeArray.push('Links must have discernible text');
                        resultImpactArray.push(value.impact);
                    } else if (value.failureSummary.includes("ARIA attribute is not allowed")) {
                        resultAxeArray.push('Elements must only use allowed ARIA attributes');
                        resultImpactArray.push(value.impact);
                    } else {
                        console.log(value)
                    }
                })
            });
            if (resultAxeArray.length > 0) {
                let violationSplitUp = JSON.stringify(arrayCounter(resultAxeArray));
                let impactSplitUp = JSON.stringify(arrayCounter(resultImpactArray));
                let lineString = _.repeat("-", (violationSplitUp.length) + 2);
                console.log(colors.red(lineString));
                console.log(' Total Violations -- ', resultAxeArray.length);
                console.log(' ' + violationSplitUp);
                console.log(' ' + impactSplitUp);
                console.log(colors.red(lineString));
                return result;
            }
        } catch (e) {
            throw new Error(
                'wdio-axe encountered an error. Check the config and try to re run again.'
            );
        }
    }

    getBestPractice() {
        try {
            let resultAxeArray = [];
            let resultImpactArray = [];
            browser.execute(axeSource);
            let result = browser.executeAsync(function (done) {
                axe.run({runOnly: {type: 'tags', values: ["best-practice"]}}, function (err, result) {
                    if (err) done(err);
                    done(result);
                })
            });
            result.value.violations.forEach(function (value, index) {
                result.value.violations[index].nodes.forEach(function (value) {
                    if (value.failureSummary.includes("ARIA role link  is not allowed for given element")) {
                        resultAxeArray.push('ARIA role must be appropriate for the element');
                        resultImpactArray.push(value.impact);
                    } else if (value.failureSummary.includes("Document does not have a main landmark")) {
                        resultAxeArray.push('Page must have one main landmark');
                        resultImpactArray.push(value.impact);
                    } else if (value.failureSummary.includes("Some page content is not contained by landmarks")) {
                        resultAxeArray.push('All page content must be contained by landmarks');
                        resultImpactArray.push(value.impact);
                    } else if (value.failureSummary.includes("Heading order invalid")) {
                        resultAxeArray.push('Heading levels should only increase by one');
                        resultImpactArray.push(value.impact);
                    } else if (value.failureSummary.includes("Page must have a level-one heading")) {
                        resultAxeArray.push('Page must contain a level-one heading');
                        resultImpactArray.push(value.impact);
                    } else {
                        console.log(value)
                    }
                })
            });
            if (resultAxeArray.length > 0) {
                let violationSplitUp = JSON.stringify(arrayCounter(resultAxeArray));
                let impactSplitUp = JSON.stringify(arrayCounter(resultImpactArray));
                let lineString = _.repeat("-", (violationSplitUp.length) + 2);
                console.log(colors.red(lineString));
                console.log(' Total Violations -- ', resultAxeArray.length);
                console.log(' ' + violationSplitUp);
                console.log(' ' + impactSplitUp);
                console.log(colors.red(lineString));
                return result;
            }
        } catch (e) {
            throw new Error(
                'wdio-axe encountered an error. Check the config and try to re run again.'
            );
        }
    }

    getRules(tags) {
        try {
            if (tags) {
                browser.execute(axeSource);
                let result = axe.getRules(tags);
                console.log(result);
            } else {
                browser.execute(axeSource);
                let result = axe.getRules();
                return result;
            }
        } catch (e) {
            throw new Error(
                'wdio-axe encountered an error. Check the config and try to re run again.'
            );
        }
    }

    runConfig(config) {
        try {
            browser.execute(axeSource);
            if (typeof config !== 'object') {
                throw new Error(
                    'wdio-axe needs an object to configure. See axe-core configure API.'
                );
            }
            axe.configure(config);
        } catch (e) {
            throw new Error(
                'wdio-axe encountered an error. Check the config and try to re run again.'
            );
        }
    }

    reset() {
        try {
            browser.execute(axeSource);
            axe.reset();
        } catch (e) {
            throw new Error(
                'wdio-axe encountered an error. Check the config and try to re run again.'
            );
        }
    }

    analyseWithTag(tagArray) {
        let response = true;
        try {
            if (typeof tagArray !== 'object') {
                response = false;
                throw new Error(
                    'wdio-axe needs input tags as Array.'
                );
            }
            let runOnlyConfig = {runOnly: {type: 'tags', values: tagArray}};
            let resultAxeArray = [];
            let resultImpactArray = [];
            browser.execute(axeSource);
            let result = browser.executeAsync(function (runOnlyConfig, done) {
                axe.run(runOnlyConfig, function (err, result) {
                    if (err) done(err);
                    done(result);
                })
            }, runOnlyConfig);
            result.value.violations.forEach(function (value, index) {
                result.value.violations[index].nodes.forEach(function (value) {
                    if (value.failureSummary.includes("color contrast")) {
                        resultAxeArray.push('Elements must have sufficient color contrast');
                        resultImpactArray.push(value.impact);
                    } else if (value.failureSummary.includes("Required ARIA")) {
                        resultAxeArray.push('Certain ARIA roles must be contained by particular parents');
                        resultImpactArray.push(value.impact);
                    } else if (value.failureSummary.includes("List item does not have")) {
                        resultAxeArray.push('elements must be contained in');
                        resultImpactArray.push(value.impact);
                    } else if (value.failureSummary.includes("semantics")) {
                        resultAxeArray.push('Links must have discernible text');
                        resultImpactArray.push(value.impact);
                    } else if (value.failureSummary.includes("ARIA attribute is not allowed")) {
                        resultAxeArray.push('Elements must only use allowed ARIA attributes');
                        resultImpactArray.push(value.impact);
                    } else if (value.failureSummary.includes("ARIA role link  is not allowed for given element")) {
                        resultAxeArray.push('ARIA role must be appropriate for the element');
                        resultImpactArray.push(value.impact);
                    } else if (value.failureSummary.includes("Document does not have a main landmark")) {
                        resultAxeArray.push('Page must have one main landmark');
                        resultImpactArray.push(value.impact);
                    } else if (value.failureSummary.includes("Some page content is not contained by landmarks")) {
                        resultAxeArray.push('All page content must be contained by landmarks');
                        resultImpactArray.push(value.impact);
                    } else if (value.failureSummary.includes("Heading order invalid")) {
                        resultAxeArray.push('Heading levels should only increase by one');
                        resultImpactArray.push(value.impact);
                    } else if (value.failureSummary.includes("Page must have a level-one heading")) {
                        resultAxeArray.push('Page must contain a level-one heading');
                        resultImpactArray.push(value.impact);
                    } else {
                        console.log(value)
                    }
                })
            });
            if (resultAxeArray.length > 0) {
                let violationSplitUp = JSON.stringify(arrayCounter(resultAxeArray));
                let impactSplitUp = JSON.stringify(arrayCounter(resultImpactArray));
                let lineString = _.repeat("-", (violationSplitUp.length) + 2);
                console.log(colors.red(lineString));
                console.log(' Total Violations -- ', resultAxeArray.length);
                console.log(' ' + violationSplitUp);
                console.log(' ' + impactSplitUp);
                console.log(colors.red(lineString));
                return result;
            }
        } catch (e) {
            if (!response) {
                throw new Error(
                    'wdio-axe needs input tags as Array.'
                );
            } else {
                throw new Error(
                    'wdio-axe encountered an error. Check the config and try to re run again.'
                );
            }
        }
    }

}

module.exports = new axeConfig();
