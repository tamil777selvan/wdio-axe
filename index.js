const axeSource = require('axe-core').source;
const axe = require('axe-core');
const _ = require('lodash');

const defaultErrorMessage = 'wdio-axe encountered an error. Check the config and try to re run again.';

class wdioAxe {
    parseResult(axeResults, pageUrl, pageTitle, calledMethod = '') {
        if (_.has(axeResults, 'violations') && axeResults.violations.length > 0) {
            axeResults.violations.map((violation) => {
                delete violation.tags;
                violation.nodes.map((nodeData) => {
                    delete nodeData.all;
                    delete nodeData.none;
                    if (calledMethod !== 'getBestPractice' && calledMethod !== 'analyseWithTag') {
                        violation.message = nodeData.any[0].message;
                    }
                    violation.html = nodeData.html;
                    violation.target = JSON.stringify(nodeData.target);
                });
                delete violation.nodes;
                violation.pageUrl = pageUrl;
                violation.pageTitle = pageTitle;
            });
            return axeResults.violations;
        }
        if (calledMethod === 'getViolations' || calledMethod === 'analyseWithTag'
                || calledMethod === 'analyseWithContext') {
            return `No Violations found in this page "${pageUrl}"`;
        } if (calledMethod === 'getBestPractice') {
            return `Page ("${pageUrl}") is aligned with best practice standards.`;
        }
        return '';
    }

    getViolations() {
        try {
            browser.execute(axeSource);
            const pageUrl = browser.getUrl();
            const pageTitle = browser.getTitle();
            const axeResults = browser.execute(async() => await axe.run({runOnly: {type: 'tags', values: ['wcag2a', 'wcag2aa']}}));
            return this.parseResult(axeResults, pageUrl, pageTitle, 'getViolations');
        } catch (e) {
            throw new Error(defaultErrorMessage);
        }
    }

    getBestPractice() {
        try {
            browser.execute(axeSource);
            const pageUrl = browser.getUrl();
            const pageTitle = browser.getTitle();
            const axeResults = browser.execute(async() => await axe.run({runOnly: {type: 'tags', values: ['best-practice']}}));
            return this.parseResult(axeResults, pageUrl, pageTitle, 'getBestPractice');
        } catch (e) {
            throw new Error(defaultErrorMessage);
        }
    }

    analyseWithTag(tags) {
        if (!Array.isArray(tags)) {
            throw new Error('wdio-axe\'s analyseWithTag function require input tags as Array.');
        }
        try {
            const runOnly = {runOnly: {type: 'tags', values: tags}};
            browser.execute(axeSource);
            const pageUrl = browser.getUrl();
            const pageTitle = browser.getTitle();
            const axeResults = browser.executeAsync((runOnlyConfig, done) => {
                axe.run(runOnlyConfig, ((error, results) => {
                    if (error) done(error);
                    done(results);
                }));
            }, runOnly);
            return this.parseResult(axeResults, pageUrl, pageTitle, 'analyseWithTag');
        } catch (e) {
            throw new Error(defaultErrorMessage);
        }
    }

    analyseWithContext(context) {
        if (!Array.isArray(context)) {
            throw new Error('wdio-axe\'s analyseWithContext function require input context as Array.');
        }
        try {
            const runOnly = context[0];
            browser.execute(axeSource);
            const pageUrl = browser.getUrl();
            const pageTitle = browser.getTitle();
            const axeResults = browser.executeAsync((runOnlyConfig, done) => {
                axe.run(runOnlyConfig, ((error, results) => {
                    if (error) done(error);
                    done(results);
                }));
            }, runOnly);
            return this.parseResult(axeResults, pageUrl, pageTitle, 'analyseWithContext');
        } catch (e) {
            throw new Error(defaultErrorMessage);
        }
    }

    getRules(tags = []) {
        if (!Array.isArray(tags)) {
            throw new Error('wdio-axe\'s getRules function require input tags as Array.');
        }
        try {
            browser.execute(axeSource);
            return axe.getRules(tags);
        } catch (e) {
            throw new Error(defaultErrorMessage);
        }
    }

    runConfig(config) {
        if (Array.isArray(config) && (typeof config) === 'object') {
            throw new Error('wdio-axe\'s runConfig function require input config as Object.');
        }
        try {
            return axe.configure(config);
        } catch (e) {
            throw new Error(defaultErrorMessage);
        }
    }

    reset() {
        try {
            browser.execute(axeSource);
            return axe.reset();
        } catch (e) {
            throw new Error(defaultErrorMessage);
        }
    }
}
// eslint-disable-next-line new-cap
module.exports = new wdioAxe();
