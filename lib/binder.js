const axeSource = require('axe-core').source;
const axe = require('axe-core');

class axeConfig {

    getViolations() {
        try {
            let resultAxeArray = [];
            let resultAxeObject = {};
            let returnObject = {};
            returnObject.pageUrl = browser.getUrl();
            returnObject.pageTitle = browser.getTitle();
            browser.execute(axeSource);
            let result = browser.executeAsync(function (done) {
                axe.run({runOnly: {type: 'tags', values: ["wcag2a", "wcag2aa"]}}, function (err, result) {
                    if (err) done(err);
                    done(result);
                });
            });
            result.violations.forEach(value => {
                value.nodes.forEach(value1 => {
                    resultAxeObject.description = value.description;
                    resultAxeObject.help = value.help;
                    resultAxeObject.helpUrl = value.helpUrl;
                    resultAxeObject.id = value.id;
                    resultAxeObject.impact = (value1.any[0]).impact;
                    resultAxeObject.message = (value1.any[0]).message;
                    resultAxeObject.failureSummary = value1.failureSummary;
                    resultAxeObject.html = value1.html;
                    resultAxeObject.target = value1.target;
                    resultAxeArray.push(resultAxeObject);
                });
            });
            returnObject.violations = resultAxeArray;
            return returnObject;
        } catch (e) {
            throw new Error(
                'wdio-axe encountered an error. Check the config and try to re run again.'
            );
        }
    }

    getBestPractice() {
        try {
            let resultAxeArray = [];
            let resultAxeObject = {};
            let returnObject = {};
            returnObject.pageUrl = browser.getUrl();
            returnObject.pageTitle = browser.getTitle();
            browser.execute(axeSource);
            let result = browser.executeAsync(function (done) {
                axe.run({runOnly: {type: 'tags', values: ["best-practice"]}}, function (err, result) {
                    if (err) done(err);
                    done(result);
                });
            });
            result.violations.forEach(value => {
                value.nodes.forEach(value1 => {
                    resultAxeObject.description = value.description;
                    resultAxeObject.help = value.help;
                    resultAxeObject.helpUrl = value.helpUrl;
                    resultAxeObject.id = value.id;
                    resultAxeObject.failureSummary = value1.failureSummary;
                    resultAxeObject.html = value1.html;
                    resultAxeObject.target = value1.target;
                    resultAxeArray.push(resultAxeObject);
                });
            });
            returnObject.bestPractice = resultAxeArray;
            return returnObject;
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
            let resultAxeObject = {};
            let returnObject = {};
            returnObject.pageUrl = browser.getUrl();
            returnObject.pageTitle = browser.getTitle();
            browser.execute(axeSource);
            let result = browser.executeAsync(function (runOnlyConfig, done) {
                axe.run(runOnlyConfig, function (err, result) {
                    if (err) done(err);
                    done(result);
                });
            }, runOnlyConfig);
            result.violations.forEach(value => {
                value.nodes.forEach(value1 => {
                    resultAxeObject.description = value.description;
                    resultAxeObject.help = value.help;
                    resultAxeObject.helpUrl = value.helpUrl;
                    resultAxeObject.id = value.id;
                    try {
                        resultAxeObject.impact = (value1.any[0]).impact;
                        resultAxeObject.message = (value1.any[0]).message;
                    } catch (e) {

                    }
                    resultAxeObject.failureSummary = value1.failureSummary;
                    resultAxeObject.html = value1.html;
                    resultAxeObject.target = value1.target;
                    resultAxeArray.push(resultAxeObject);
                });
            });
            returnObject.result = resultAxeArray;
            return returnObject;
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

    analyseWithContext(contextArray) {
        let response = true;
        try {
            if (typeof contextArray !== 'object') {
                response = false;
                throw new Error(
                    'wdio-axe needs input tags as Array.'
                );
            }
            let runOnlyConfig = contextArray[0];
            let resultAxeArray = [];
            let resultAxeObject = {};
            let returnObject = {};
            returnObject.pageUrl = browser.getUrl();
            returnObject.pageTitle = browser.getTitle();
            browser.execute(axeSource);
            let result = browser.executeAsync(function (runOnlyConfig, done) {
                axe.run(runOnlyConfig, function (err, result) {
                    if (err) done(err);
                    done(result);
                });
            }, runOnlyConfig);
            result.violations.forEach(value => {
                value.nodes.forEach(value1 => {
                    resultAxeObject.description = value.description;
                    resultAxeObject.help = value.help;
                    resultAxeObject.helpUrl = value.helpUrl;
                    resultAxeObject.id = value.id;
                    try {
                        resultAxeObject.impact = (value1.any[0]).impact;
                        resultAxeObject.message = (value1.any[0]).message;
                    } catch (e) {

                    }
                    resultAxeObject.failureSummary = value1.failureSummary;
                    resultAxeObject.html = value1.html;
                    resultAxeObject.target = value1.target;
                    resultAxeArray.push(resultAxeObject);
                });
            });
            returnObject.result = resultAxeArray;
            return returnObject;
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

    getRules(tags) {
        try {
            if (tags) {
                browser.execute(axeSource);
                return axe.getRules(tags);
            } else {
                browser.execute(axeSource);
                return axe.getRules();
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

}

module.exports = new axeConfig();
