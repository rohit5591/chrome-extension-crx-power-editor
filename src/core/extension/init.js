import './init.css';
var browser = browser || chrome;
var isChrome = !browser;

const execute = () => {
    if (window.location.href.indexOf("crx/de") === -1) {
        log("CRX Power Editor - Not on CRX DE");
        return;
    }
    browser.storage.local.get('config', (results) => {
        if (results.config) {
            if (!results.config.isEnable) {
                log("Power Editor is not enabled...");
                return;
            }
            if (results.config.urls.length <= 0) {
                log("No site is allowed.");
                return;
            }
            var isExcluded = results.config.urls.filter(function (url) {
                return (url.indexOf(window.location.origin) !== -1);
            }).length > 0;
            if (!isExcluded) {
                log("Site is excluded => " + window.location.origin);
                return;
            }
            log("Initializing Power editor...");

            createEditorIDElement();
            if (results.config.editorType !== "editorType-codeMirror") {
                var require = { paths: { vs: 'monaco-editor' } };
                createEditorCssLink();
            }
            createElementEditorType(results.config.editorType);
            createElementEditorTheme(results.config.editorTheme);
            createMainScript(chrome.runtime.getURL("main.js"));
            log("Power Editor initialized.");
        }
    });
};
const createEditorCssLink = () => {
    const link = document.createElement('link');
    link.setAttribute('rel', 'stylesheet');
    link.setAttribute('data-name', 'vs/editor/editor.main');
    link.setAttribute('href', chrome.runtime.getURL('main.css'));
    document.head.appendChild(link);
};

const createMainScript = (url) => {
    if (url) {
        const script = document.createElement('script');
        script.setAttribute('src', url);
        script.setAttribute('type', "text/javascript");
        document.body.appendChild(script);
    }
};

const createEditorIDElement = () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'hidden');
    input.setAttribute('id', 'plugin-prefix');
    input.setAttribute('value', 'chrome-extension://' + chrome.runtime.id + "/");
    document.body.appendChild(input);
};

const createElementEditorType = (type) => {
    const input = document.createElement('input');
    input.setAttribute('type', 'hidden');
    input.setAttribute('id', 'editorType');
    input.setAttribute('value', type);
    document.body.appendChild(input);
};

const createElementEditorTheme = (theme) => {
    const input = document.createElement('input');
    input.setAttribute('type', 'hidden');
    input.setAttribute('id', 'editorTheme');
    input.setAttribute('value', theme);
    document.body.appendChild(input);
};

const log = (message) => {
    if (typeof powereditor !== 'undefined' || window.location.href.indexOf("?debug") !== -1) {
        console.log(message);
    }
};

execute();