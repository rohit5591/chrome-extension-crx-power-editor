var isChrome = !browser;
var browser = browser || chrome;
execute();

function execute() {
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
            if (results.config.urls.indexOf(window.location.origin) === -1) {
                log("Site is excluded => " + window.location.origin);
                return;
            }
            log("Initializing Power editor...");

            createElement();
            var require = { paths: { vs: 'monaco-editor' } };
            if(results.config?.editorType == "editorType-codeMirror"){
                createScript(chrome.runtime.getURL("editor.codemirror.init.js"));
                createElementEditorType('cm');
            } else {
                createEditorCssLink();
                createScript(chrome.runtime.getURL("vs/loader.js"));
                createScript(chrome.runtime.getURL("vs/editor/editor.main.nls.js"));
                createScript(chrome.runtime.getURL("vs/editor/editor.main.js"));
                createScript(chrome.runtime.getURL("editor.vs.init.js"));
                createElementEditorType('vs');
            }
            createElementEditorTheme(results.config.editorTheme);

            log("Power Editor initialized.");

        }
    });
}

function createScript(url) {
    if (url) {
        const script = document.createElement('script');
        script.setAttribute('src', url);
        script.setAttribute('type', "text/javascript");
        document.body.appendChild(script);
    }
}
function createElement() {
    const input = document.createElement('input');
    input.setAttribute('type', 'hidden');
    input.setAttribute('id', 'plugin-prefix');
    input.setAttribute('value', 'chrome-extension://' + chrome.runtime.id + "/");
    document.body.appendChild(input);
}
function createElementEditorType(type) {
    const input = document.createElement('input');
    input.setAttribute('type', 'hidden');
    input.setAttribute('id', 'editorType');
    input.setAttribute('value', type);
    document.body.appendChild(input);
}
function createElementEditorTheme(theme) {
    const input = document.createElement('input');
    input.setAttribute('type', 'hidden');
    input.setAttribute('id', 'editorTheme');
    input.setAttribute('value', theme);
    document.body.appendChild(input);
}
function createEditorCssLink() {
    const link = document.createElement('link');
    link.setAttribute('rel', 'stylesheet');
    link.setAttribute('data-name', 'vs/editor/editor.main');
    link.setAttribute('href', chrome.runtime.getURL('vs/editor/editor.main.css'));
    document.head.appendChild(link);
}

function log(message) {
    if (typeof powereditor !== 'undefined' || window.location.href.indexOf("?debug") !== -1) {
        console.log(message);
    }
}