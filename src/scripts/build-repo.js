console.log("Building repo...");
const shell = require('shelljs');
const global = require('./global');
const fs = require("fs-extra");
const path = 'editors';
const vsPath = 'vs';
const cmPath = 'code-mirror';
//Inject compile time overrides
fs.copySync('src/overrides/compile/editors/.', './editors/.', { overwrite: true });
shell.cd(path);
//Initiate VS
shell.cd(vsPath);
global.executeCommand('cd monaco-editor && npm i && npm run release && cd ..', 'Build monaco-editor');
global.executeCommand('cd vscode-loader && npm i && npm run compile && cd ..', 'Build VSCode Loader');
//Initiate Code Mirror and Dependent Repos
shell.cd("..");
shell.cd(cmPath);
global.executeCommand('cd dev && node bin/cm.js install && npm run prepare && cd ..', 'Build Code Mirror');
global.executeCommand('cd codemirror-themes && npm i && npm run prepare && cd ..', 'Build Code Mirror Themes');
global.executeCommand('cd thememirror && npm i && npm run prepare && cd ..', 'Build Code Mirror Themes - thememirror');
console.log("Repo built...");