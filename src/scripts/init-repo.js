console.log("Initiating repo...");
const shell = require('shelljs');
const global = require('./global');
const path = 'editors';
const vsPath = 'vs';
const cmPath = 'code-mirror';
global.mkdirIfMissing(path);
shell.cd(path);
global.mkdirIfMissing(vsPath);
//Initiate VS and Dependent Repos
shell.cd(vsPath);
global.clone('https://github.com/microsoft/monaco-editor.git');
global.clone('https://github.com/brijeshb42/monaco-themes.git');
global.clone('https://github.com/microsoft/vscode-loader.git');
//Initiate Code Mirror and Dependent Repos
shell.cd("..");
global.mkdirIfMissing(cmPath);
shell.cd(cmPath);
global.clone('https://github.com/codemirror/dev.git');
global.clone('https://github.com/vadimdemedes/thememirror.git');
global.clone('https://github.com/dennis84/codemirror-themes.git');
console.log("Repo initiated...");