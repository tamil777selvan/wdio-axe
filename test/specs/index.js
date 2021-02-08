/* eslint-disable */
const {expect} = require('chai');
const http = require('http');
const axe = require('../../index');

const violationResult =  [
    {
        description: 'Ensures the contrast between foreground and background colors meets WCAG 2 AA contrast ratio thresholds',
        help: 'Elements must have sufficient color contrast',
        helpUrl: 'https://dequeuniversity.com/rules/axe/4.1/color-contrast?application=axeAPI',
        id: 'color-contrast',
        impact: 'serious',
        message: 'Element has insufficient color contrast of 2.83 (foreground color: #ffffff, background color: #2ba6cb, font size: 24.0pt (32px), font weight: normal). Expected contrast ratio of 3:1',
        html: '<i class="fa fa-2x fa-sign-in"> Login</i>',
        target: '["i"]',
        pageUrl: 'https://the-internet.herokuapp.com/login',
        pageTitle: 'The Internet'
    }
];

const bestPracticeResult = [
    {
        description: 'Ensures the order of headings is semantically correct',
        help: 'Heading levels should only increase by one',
        helpUrl: 'https://dequeuniversity.com/rules/axe/4.1/heading-order?application=axeAPI',
        id: 'heading-order',
        impact: 'moderate',
        html: '<h4 class="subheader">This is where you can log into the secure area. Enter <em>tomsmith</em> for the username and <em>SuperSecretPassword!</em> for the password. If the information is wrong you should see error messages.</h4>',
        target: '["h4"]',
        pageUrl: 'https://the-internet.herokuapp.com/login',
        pageTitle: 'The Internet'
    },
    {
        description: 'Ensures the document has a main landmark',
        help: 'Document must have one main landmark',
        helpUrl: 'https://dequeuniversity.com/rules/axe/4.1/landmark-one-main?application=axeAPI',
        id: 'landmark-one-main',
        impact: 'moderate',
        html: '<html class="no-js" lang="en">',
        target: '["html"]',
        pageUrl: 'https://the-internet.herokuapp.com/login',
        pageTitle: 'The Internet'
    },
    {
        description: 'Ensure that the page, or at least one of its frames contains a level-one heading',
        help: 'Page must contain a level-one heading',
        helpUrl: 'https://dequeuniversity.com/rules/axe/4.1/page-has-heading-one?application=axeAPI',
        id: 'page-has-heading-one',
        impact: 'moderate',
        html: '<html class="no-js" lang="en">',
        target: '["html"]',
        pageUrl: 'https://the-internet.herokuapp.com/login',
        pageTitle: 'The Internet'
    },
    {
        description: 'Ensures all page content is contained by landmarks',
        help: 'All page content must be contained by landmarks',
        helpUrl: 'https://dequeuniversity.com/rules/axe/4.1/region?application=axeAPI',
        id: 'region',
        impact: 'moderate',
        html: '<div id="page-footer" class="row">\n' +
            '      <div class="large-4 large-centered columns">\n' +
            '        <hr>\n' +
            '        <div style="text-align: center;">Powered by <a target="_blank" href="http://elementalselenium.com/">Elemental Selenium</a></div>\n' +
            '      </div>\n' +
            '    </div>',
        target: '["#page-footer"]',
        pageUrl: 'https://the-internet.herokuapp.com/login',
        pageTitle: 'The Internet'
    }
];

const analyseWithContextResult =  [
    {
        description: 'Ensures <iframe> and <frame> elements contain a non-empty title attribute',
        help: 'Frames must have title attribute',
        helpUrl: 'https://dequeuniversity.com/rules/axe/4.1/frame-title?application=axeAPI',
        id: 'frame-title',
        impact: 'serious',
        message: 'aria-label attribute does not exist or is empty',
        html: '<iframe id="snippet-preview" class="preview-iframe" src="//s.bootsnipp.com/iframe/vl4R7"></iframe>',
        target: '["#snippet-preview"]',
        pageUrl: 'https://bootsnipp.com/snippets/vl4R7',
        pageTitle: 'Bootstrap Snippet Elegant Login Page using HTML CSS'
    }
];

const wcag2aRuleResult = [
    {
        ruleId: 'area-alt',
        description: 'Ensures <area> elements of image maps have alternate text',
        help: 'Active <area> elements must have alternate text',
        helpUrl: 'https://dequeuniversity.com/rules/axe/4.1/area-alt?application=axeAPI',
        tags: [
            'cat.text-alternatives',
            'wcag2a',
            'wcag111',
            'wcag244',
            'wcag412',
            'section508',
            'section508.22.a',
            'ACT'
        ]
    },
    {
        ruleId: 'aria-allowed-attr',
        description: "Ensures ARIA attributes are allowed for an element's role",
        help: 'Elements must only use allowed ARIA attributes',
        helpUrl: 'https://dequeuniversity.com/rules/axe/4.1/aria-allowed-attr?application=axeAPI',
        tags: [ 'cat.aria', 'wcag2a', 'wcag412' ]
    },
    {
        ruleId: 'aria-command-name',
        description: 'Ensures every ARIA button, link and menuitem has an accessible name',
        help: 'ARIA commands must have an accessible name',
        helpUrl: 'https://dequeuniversity.com/rules/axe/4.1/aria-command-name?application=axeAPI',
        tags: [ 'cat.aria', 'wcag2a', 'wcag412' ]
    },
    {
        ruleId: 'aria-hidden-body',
        description: "Ensures aria-hidden='true' is not present on the document body.",
        help: "aria-hidden='true' must not be present on the document body",
        helpUrl: 'https://dequeuniversity.com/rules/axe/4.1/aria-hidden-body?application=axeAPI',
        tags: [ 'cat.aria', 'wcag2a', 'wcag412' ]
    },
    {
        ruleId: 'aria-hidden-focus',
        description: 'Ensures aria-hidden elements do not contain focusable elements',
        help: 'ARIA hidden element must not contain focusable elements',
        helpUrl: 'https://dequeuniversity.com/rules/axe/4.1/aria-hidden-focus?application=axeAPI',
        tags: [ 'cat.name-role-value', 'wcag2a', 'wcag412', 'wcag131' ]
    },
    {
        ruleId: 'aria-input-field-name',
        description: 'Ensures every ARIA input field has an accessible name',
        help: 'ARIA input fields must have an accessible name',
        helpUrl: 'https://dequeuniversity.com/rules/axe/4.1/aria-input-field-name?application=axeAPI',
        tags: [ 'cat.aria', 'wcag2a', 'wcag412', 'ACT' ]
    },
    {
        ruleId: 'aria-meter-name',
        description: 'Ensures every ARIA meter node has an accessible name',
        help: 'ARIA meter nodes must have an accessible name',
        helpUrl: 'https://dequeuniversity.com/rules/axe/4.1/aria-meter-name?application=axeAPI',
        tags: [ 'cat.aria', 'wcag2a', 'wcag111' ]
    },
    {
        ruleId: 'aria-progressbar-name',
        description: 'Ensures every ARIA progressbar node has an accessible name',
        help: 'ARIA progressbar nodes must have an accessible name',
        helpUrl: 'https://dequeuniversity.com/rules/axe/4.1/aria-progressbar-name?application=axeAPI',
        tags: [ 'cat.aria', 'wcag2a', 'wcag111' ]
    },
    {
        ruleId: 'aria-required-attr',
        description: 'Ensures elements with ARIA roles have all required ARIA attributes',
        help: 'Required ARIA attributes must be provided',
        helpUrl: 'https://dequeuniversity.com/rules/axe/4.1/aria-required-attr?application=axeAPI',
        tags: [ 'cat.aria', 'wcag2a', 'wcag412' ]
    },
    {
        ruleId: 'aria-required-children',
        description: 'Ensures elements with an ARIA role that require child roles contain them',
        help: 'Certain ARIA roles must contain particular children',
        helpUrl: 'https://dequeuniversity.com/rules/axe/4.1/aria-required-children?application=axeAPI',
        tags: [ 'cat.aria', 'wcag2a', 'wcag131' ]
    },
    {
        ruleId: 'aria-required-parent',
        description: 'Ensures elements with an ARIA role that require parent roles are contained by them',
        help: 'Certain ARIA roles must be contained by particular parents',
        helpUrl: 'https://dequeuniversity.com/rules/axe/4.1/aria-required-parent?application=axeAPI',
        tags: [ 'cat.aria', 'wcag2a', 'wcag131' ]
    },
    {
        ruleId: 'aria-roledescription',
        description: 'Ensure aria-roledescription is only used on elements with an implicit or explicit role',
        help: 'Use aria-roledescription on elements with a semantic role',
        helpUrl: 'https://dequeuniversity.com/rules/axe/4.1/aria-roledescription?application=axeAPI',
        tags: [ 'cat.aria', 'wcag2a', 'wcag412' ]
    },
    {
        ruleId: 'aria-roles',
        description: 'Ensures all elements with a role attribute use a valid value',
        help: 'ARIA roles used must conform to valid values',
        helpUrl: 'https://dequeuniversity.com/rules/axe/4.1/aria-roles?application=axeAPI',
        tags: [ 'cat.aria', 'wcag2a', 'wcag412' ]
    },
    {
        ruleId: 'aria-toggle-field-name',
        description: 'Ensures every ARIA toggle field has an accessible name',
        help: 'ARIA toggle fields have an accessible name',
        helpUrl: 'https://dequeuniversity.com/rules/axe/4.1/aria-toggle-field-name?application=axeAPI',
        tags: [ 'cat.aria', 'wcag2a', 'wcag412', 'ACT' ]
    },
    {
        ruleId: 'aria-tooltip-name',
        description: 'Ensures every ARIA tooltip node has an accessible name',
        help: 'ARIA tooltip nodes must have an accessible name',
        helpUrl: 'https://dequeuniversity.com/rules/axe/4.1/aria-tooltip-name?application=axeAPI',
        tags: [ 'cat.aria', 'wcag2a', 'wcag412' ]
    },
    {
        ruleId: 'aria-valid-attr-value',
        description: 'Ensures all ARIA attributes have valid values',
        help: 'ARIA attributes must conform to valid values',
        helpUrl: 'https://dequeuniversity.com/rules/axe/4.1/aria-valid-attr-value?application=axeAPI',
        tags: [ 'cat.aria', 'wcag2a', 'wcag412' ]
    },
    {
        ruleId: 'aria-valid-attr',
        description: 'Ensures attributes that begin with aria- are valid ARIA attributes',
        help: 'ARIA attributes must conform to valid names',
        helpUrl: 'https://dequeuniversity.com/rules/axe/4.1/aria-valid-attr?application=axeAPI',
        tags: [ 'cat.aria', 'wcag2a', 'wcag412' ]
    },
    {
        ruleId: 'audio-caption',
        description: 'Ensures <audio> elements have captions',
        help: '<audio> elements must have a captions track',
        helpUrl: 'https://dequeuniversity.com/rules/axe/4.1/audio-caption?application=axeAPI',
        tags: [
            'cat.time-and-media',
            'wcag2a',
            'wcag121',
            'section508',
            'section508.22.a'
        ]
    },
    {
        ruleId: 'blink',
        description: 'Ensures <blink> elements are not used',
        help: '<blink> elements are deprecated and must not be used',
        helpUrl: 'https://dequeuniversity.com/rules/axe/4.1/blink?application=axeAPI',
        tags: [
            'cat.time-and-media',
            'wcag2a',
            'wcag222',
            'section508',
            'section508.22.j'
        ]
    },
    {
        ruleId: 'button-name',
        description: 'Ensures buttons have discernible text',
        help: 'Buttons must have discernible text',
        helpUrl: 'https://dequeuniversity.com/rules/axe/4.1/button-name?application=axeAPI',
        tags: [
            'cat.name-role-value',
            'wcag2a',
            'wcag412',
            'section508',
            'section508.22.a',
            'ACT'
        ]
    },
    {
        ruleId: 'bypass',
        description: 'Ensures each page has at least one mechanism for a user to bypass navigation and jump straight to the content',
        help: 'Page must have means to bypass repeated blocks',
        helpUrl: 'https://dequeuniversity.com/rules/axe/4.1/bypass?application=axeAPI',
        tags: [
            'cat.keyboard',
            'wcag2a',
            'wcag241',
            'section508',
            'section508.22.o'
        ]
    },
    {
        ruleId: 'definition-list',
        description: 'Ensures <dl> elements are structured correctly',
        help: '<dl> elements must only directly contain properly-ordered <dt> and <dd> groups, <script>, <template> or <div> elements',
        helpUrl: 'https://dequeuniversity.com/rules/axe/4.1/definition-list?application=axeAPI',
        tags: [ 'cat.structure', 'wcag2a', 'wcag131' ]
    },
    {
        ruleId: 'dlitem',
        description: 'Ensures <dt> and <dd> elements are contained by a <dl>',
        help: '<dt> and <dd> elements must be contained by a <dl>',
        helpUrl: 'https://dequeuniversity.com/rules/axe/4.1/dlitem?application=axeAPI',
        tags: [ 'cat.structure', 'wcag2a', 'wcag131' ]
    },
    {
        ruleId: 'document-title',
        description: 'Ensures each HTML document contains a non-empty <title> element',
        help: 'Documents must have <title> element to aid in navigation',
        helpUrl: 'https://dequeuniversity.com/rules/axe/4.1/document-title?application=axeAPI',
        tags: [ 'cat.text-alternatives', 'wcag2a', 'wcag242', 'ACT' ]
    },
    {
        ruleId: 'duplicate-id-active',
        description: 'Ensures every id attribute value of active elements is unique',
        help: 'IDs of active elements must be unique',
        helpUrl: 'https://dequeuniversity.com/rules/axe/4.1/duplicate-id-active?application=axeAPI',
        tags: [ 'cat.parsing', 'wcag2a', 'wcag411' ]
    },
    {
        ruleId: 'duplicate-id-aria',
        description: 'Ensures every id attribute value used in ARIA and in labels is unique',
        help: 'IDs used in ARIA and labels must be unique',
        helpUrl: 'https://dequeuniversity.com/rules/axe/4.1/duplicate-id-aria?application=axeAPI',
        tags: [ 'cat.parsing', 'wcag2a', 'wcag411' ]
    },
    {
        ruleId: 'duplicate-id',
        description: 'Ensures every id attribute value is unique',
        help: 'id attribute value must be unique',
        helpUrl: 'https://dequeuniversity.com/rules/axe/4.1/duplicate-id?application=axeAPI',
        tags: [ 'cat.parsing', 'wcag2a', 'wcag411' ]
    },
    {
        ruleId: 'form-field-multiple-labels',
        description: 'Ensures form field does not have multiple label elements',
        help: 'Form field should not have multiple label elements',
        helpUrl: 'https://dequeuniversity.com/rules/axe/4.1/form-field-multiple-labels?application=axeAPI',
        tags: [ 'cat.forms', 'wcag2a', 'wcag332' ]
    },
    {
        ruleId: 'frame-title',
        description: 'Ensures <iframe> and <frame> elements contain a non-empty title attribute',
        help: 'Frames must have title attribute',
        helpUrl: 'https://dequeuniversity.com/rules/axe/4.1/frame-title?application=axeAPI',
        tags: [
            'cat.text-alternatives',
            'wcag2a',
            'wcag241',
            'wcag412',
            'section508',
            'section508.22.i'
        ]
    },
    {
        ruleId: 'html-has-lang',
        description: 'Ensures every HTML document has a lang attribute',
        help: '<html> element must have a lang attribute',
        helpUrl: 'https://dequeuniversity.com/rules/axe/4.1/html-has-lang?application=axeAPI',
        tags: [ 'cat.language', 'wcag2a', 'wcag311', 'ACT' ]
    },
    {
        ruleId: 'html-lang-valid',
        description: 'Ensures the lang attribute of the <html> element has a valid value',
        help: '<html> element must have a valid value for the lang attribute',
        helpUrl: 'https://dequeuniversity.com/rules/axe/4.1/html-lang-valid?application=axeAPI',
        tags: [ 'cat.language', 'wcag2a', 'wcag311', 'ACT' ]
    },
    {
        ruleId: 'html-xml-lang-mismatch',
        description: 'Ensure that HTML elements with both valid lang and xml:lang attributes agree on the base language of the page',
        help: 'HTML elements with lang and xml:lang must have the same base language',
        helpUrl: 'https://dequeuniversity.com/rules/axe/4.1/html-xml-lang-mismatch?application=axeAPI',
        tags: [ 'cat.language', 'wcag2a', 'wcag311', 'ACT' ]
    },
    {
        ruleId: 'image-alt',
        description: 'Ensures <img> elements have alternate text or a role of none or presentation',
        help: 'Images must have alternate text',
        helpUrl: 'https://dequeuniversity.com/rules/axe/4.1/image-alt?application=axeAPI',
        tags: [
            'cat.text-alternatives',
            'wcag2a',
            'wcag111',
            'section508',
            'section508.22.a',
            'ACT'
        ]
    },
    {
        ruleId: 'input-button-name',
        description: 'Ensures input buttons have discernible text',
        help: 'Input buttons must have discernible text',
        helpUrl: 'https://dequeuniversity.com/rules/axe/4.1/input-button-name?application=axeAPI',
        tags: [
            'cat.name-role-value',
            'wcag2a',
            'wcag412',
            'section508',
            'section508.22.a'
        ]
    },
    {
        ruleId: 'input-image-alt',
        description: 'Ensures <input type="image"> elements have alternate text',
        help: 'Image buttons must have alternate text',
        helpUrl: 'https://dequeuniversity.com/rules/axe/4.1/input-image-alt?application=axeAPI',
        tags: [
            'cat.text-alternatives',
            'wcag2a',
            'wcag111',
            'section508',
            'section508.22.a',
            'ACT'
        ]
    },
    {
        ruleId: 'label',
        description: 'Ensures every form element has a label',
        help: 'Form elements must have labels',
        helpUrl: 'https://dequeuniversity.com/rules/axe/4.1/label?application=axeAPI',
        tags: [
            'cat.forms',
            'wcag2a',
            'wcag412',
            'wcag131',
            'section508',
            'section508.22.n',
            'ACT'
        ]
    },
    {
        ruleId: 'link-in-text-block',
        description: 'Links can be distinguished without relying on color',
        help: 'Links must be distinguished from surrounding text in a way that does not rely on color',
        helpUrl: 'https://dequeuniversity.com/rules/axe/4.1/link-in-text-block?application=axeAPI',
        tags: [ 'cat.color', 'experimental', 'wcag2a', 'wcag141' ]
    },
    {
        ruleId: 'link-name',
        description: 'Ensures links have discernible text',
        help: 'Links must have discernible text',
        helpUrl: 'https://dequeuniversity.com/rules/axe/4.1/link-name?application=axeAPI',
        tags: [
            'cat.name-role-value',
            'wcag2a',
            'wcag412',
            'wcag244',
            'section508',
            'section508.22.a',
            'ACT'
        ]
    },
    {
        ruleId: 'list',
        description: 'Ensures that lists are structured correctly',
        help: '<ul> and <ol> must only directly contain <li>, <script> or <template> elements',
        helpUrl: 'https://dequeuniversity.com/rules/axe/4.1/list?application=axeAPI',
        tags: [ 'cat.structure', 'wcag2a', 'wcag131' ]
    },
    {
        ruleId: 'listitem',
        description: 'Ensures <li> elements are used semantically',
        help: '<li> elements must be contained in a <ul> or <ol>',
        helpUrl: 'https://dequeuniversity.com/rules/axe/4.1/listitem?application=axeAPI',
        tags: [ 'cat.structure', 'wcag2a', 'wcag131' ]
    },
    {
        ruleId: 'marquee',
        description: 'Ensures <marquee> elements are not used',
        help: '<marquee> elements are deprecated and must not be used',
        helpUrl: 'https://dequeuniversity.com/rules/axe/4.1/marquee?application=axeAPI',
        tags: [ 'cat.parsing', 'wcag2a', 'wcag222' ]
    },
    {
        ruleId: 'meta-refresh',
        description: 'Ensures <meta http-equiv="refresh"> is not used',
        help: 'Timed refresh must not exist',
        helpUrl: 'https://dequeuniversity.com/rules/axe/4.1/meta-refresh?application=axeAPI',
        tags: [
            'cat.time-and-media',
            'wcag2a',
            'wcag2aaa',
            'wcag221',
            'wcag224',
            'wcag325'
        ]
    },
    {
        ruleId: 'no-autoplay-audio',
        description: 'Ensures <video> or <audio> elements do not autoplay audio for more than 3 seconds without a control mechanism to stop or mute the audio',
        help: '<video> or <audio> elements do not autoplay audio',
        helpUrl: 'https://dequeuniversity.com/rules/axe/4.1/no-autoplay-audio?application=axeAPI',
        tags: [ 'cat.time-and-media', 'wcag2a', 'wcag142', 'experimental' ]
    },
    {
        ruleId: 'object-alt',
        description: 'Ensures <object> elements have alternate text',
        help: '<object> elements must have alternate text',
        helpUrl: 'https://dequeuniversity.com/rules/axe/4.1/object-alt?application=axeAPI',
        tags: [
            'cat.text-alternatives',
            'wcag2a',
            'wcag111',
            'section508',
            'section508.22.a'
        ]
    },
    {
        ruleId: 'p-as-heading',
        description: 'Ensure p elements are not used to style headings',
        help: 'Bold, italic text and font-size are not used to style p elements as a heading',
        helpUrl: 'https://dequeuniversity.com/rules/axe/4.1/p-as-heading?application=axeAPI',
        tags: [ 'cat.semantics', 'wcag2a', 'wcag131', 'experimental' ]
    },
    {
        ruleId: 'role-img-alt',
        description: "Ensures [role='img'] elements have alternate text",
        help: "[role='img'] elements have an alternative text",
        helpUrl: 'https://dequeuniversity.com/rules/axe/4.1/role-img-alt?application=axeAPI',
        tags: [
            'cat.text-alternatives',
            'wcag2a',
            'wcag111',
            'section508',
            'section508.22.a',
            'ACT'
        ]
    },
    {
        ruleId: 'scrollable-region-focusable',
        description: 'Elements that have scrollable content should be accessible by keyboard',
        help: 'Ensure that scrollable region has keyboard access',
        helpUrl: 'https://dequeuniversity.com/rules/axe/4.1/scrollable-region-focusable?application=axeAPI',
        tags: [ 'cat.keyboard', 'wcag2a', 'wcag211' ]
    },
    {
        ruleId: 'select-name',
        description: 'Ensures select element has an accessible name',
        help: 'Select element must have and accessible name',
        helpUrl: 'https://dequeuniversity.com/rules/axe/4.1/select-name?application=axeAPI',
        tags: [
            'cat.forms',
            'wcag2a',
            'wcag412',
            'wcag131',
            'section508',
            'section508.22.n',
            'ACT'
        ]
    },
    {
        ruleId: 'server-side-image-map',
        description: 'Ensures that server-side image maps are not used',
        help: 'Server-side image maps must not be used',
        helpUrl: 'https://dequeuniversity.com/rules/axe/4.1/server-side-image-map?application=axeAPI',
        tags: [
            'cat.text-alternatives',
            'wcag2a',
            'wcag211',
            'section508',
            'section508.22.f'
        ]
    },
    {
        ruleId: 'svg-img-alt',
        description: 'Ensures svg elements with an img, graphics-document or graphics-symbol role have an accessible text',
        help: 'svg elements with an img role have an alternative text',
        helpUrl: 'https://dequeuniversity.com/rules/axe/4.1/svg-img-alt?application=axeAPI',
        tags: [
            'cat.text-alternatives',
            'wcag2a',
            'wcag111',
            'section508',
            'section508.22.a',
            'ACT'
        ]
    },
    {
        ruleId: 'table-fake-caption',
        description: 'Ensure that tables with a caption use the <caption> element.',
        help: 'Data or header cells should not be used to give caption to a data table.',
        helpUrl: 'https://dequeuniversity.com/rules/axe/4.1/table-fake-caption?application=axeAPI',
        tags: [
            'cat.tables',
            'experimental',
            'wcag2a',
            'wcag131',
            'section508',
            'section508.22.g'
        ]
    },
    {
        ruleId: 'td-has-header',
        description: 'Ensure that each non-empty data cell in a large table has one or more table headers',
        help: 'All non-empty td element in table larger than 3 by 3 must have an associated table header',
        helpUrl: 'https://dequeuniversity.com/rules/axe/4.1/td-has-header?application=axeAPI',
        tags: [
            'cat.tables',
            'experimental',
            'wcag2a',
            'wcag131',
            'section508',
            'section508.22.g'
        ]
    },
    {
        ruleId: 'td-headers-attr',
        description: 'Ensure that each cell in a table using the headers refers to another cell in that table',
        help: 'All cells in a table element that use the headers attribute must only refer to other cells of that same table',
        helpUrl: 'https://dequeuniversity.com/rules/axe/4.1/td-headers-attr?application=axeAPI',
        tags: [
            'cat.tables',
            'wcag2a',
            'wcag131',
            'section508',
            'section508.22.g'
        ]
    },
    {
        ruleId: 'th-has-data-cells',
        description: 'Ensure that each table header in a data table refers to data cells',
        help: 'All th elements and elements with role=columnheader/rowheader must have data cells they describe',
        helpUrl: 'https://dequeuniversity.com/rules/axe/4.1/th-has-data-cells?application=axeAPI',
        tags: [
            'cat.tables',
            'wcag2a',
            'wcag131',
            'section508',
            'section508.22.g'
        ]
    },
    {
        ruleId: 'video-caption',
        description: 'Ensures <video> elements have captions',
        help: '<video> elements must have captions',
        helpUrl: 'https://dequeuniversity.com/rules/axe/4.1/video-caption?application=axeAPI',
        tags: [
            'cat.text-alternatives',
            'wcag2a',
            'wcag122',
            'section508',
            'section508.22.a'
        ]
    }
];

describe('wdio-axe', () => {
    it('getViolations - should return array if violations is present', () => {
        browser.url('https://the-internet.herokuapp.com/login');
        const violations = axe.getViolations();
        expect(violations).to.be.an('array');
        // expect(violations).to.deep.equal(violationResult);
    });

    it('getViolations - should return custom message if no violations are present', () => {
        const server = http.createServer((req, res) => {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write('<html lang="en"><head><title>wdio-axe</title></head><body><h1>wdio-axe</h1></body></html>');
            res.end();
        });
        server.listen(5050);
        browser.url('http://127.0.0.1:5050');
        const violations = axe.getViolations();
        expect(violations).to.be.equal('No Violations found in this page "http://127.0.0.1:5050/"');
        server.close(() => {});
    });

    it('getBestPractice - should get appropriate response', () => {
        browser.url('https://the-internet.herokuapp.com/login');
        const violations = axe.getBestPractice();
        expect(violations).to.be.an('array');
        // expect(violations).to.deep.equal(bestPracticeResult);
    });

    it('analyseWithTag - should get appropriate response', () => {
        browser.url('https://the-internet.herokuapp.com/login');
        const violations = axe.analyseWithTag(["best-practice"]);
        expect(violations).to.be.an('array');
        // expect(violations).to.deep.equal(bestPracticeResult);
    });

    it('analyseWithTag - should throw error for incorrect input', () => {
        expect(() => axe.analyseWithTag({"best-practice": "best-practice"}))
            .to.throw(Error, 'wdio-axe\'s analyseWithTag function require input tags as Array.');
    });

    it('analyseWithContext - should get appropriate response', () => {
        browser.url('https://bootsnipp.com/snippets/vl4R7');
        const violations = axe.analyseWithContext([{include: ['#snippet-preview']}]);
        expect(violations).to.be.an('array');
        // expect(violations).to.deep.equal(analyseWithContextResult);
    });

    it('analyseWithContext - should throw error for incorrect input', () => {
        expect(() => axe.analyseWithContext({include: ['#snippet-preview']}))
            .to.throw(Error, 'wdio-axe\'s analyseWithContext function require input context as Array.');
    });

    it('getRules - should return w3c rules for requested category', () => {
        const rules = axe.getRules(["wcag2a"]);
        expect(rules).to.be.an('array');
        // expect(rules).to.deep.equal(wcag2aRuleResult);
    });

    it('getRules - should throw error for incorrect input', () => {
        expect(() => axe.getRules({wcag2a: 'wcag2a'}))
            .to.throw(Error, 'wdio-axe\'s getRules function require input tags as Array.');
    });

    it('runConfig - should set axe configuration without any error', () => {
        const setConfig = axe.runConfig({
            reporter: { reporter: "v1" }
        });
        expect(setConfig).to.equal(undefined);
    });

    it('runConfig - should throw error for incorrect input', () => {
        expect(() => axe.runConfig([{reporter: { reporter: "v1" }}]))
            .to.throw(Error, 'wdio-axe\'s runConfig function require input config as Object.');
    });

    it('reset - should reSet axe configuration without any error', () => {
        const reSetConfig = axe.reset();
        expect(reSetConfig).to.equal(undefined);
    });
});
