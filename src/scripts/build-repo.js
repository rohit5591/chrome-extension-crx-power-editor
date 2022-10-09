console.log("Building repo...");
const shell = require('shelljs');
const global = require('./global');
const path = 'editors';
const vsPath = 'vs';
const cmPath = 'code-mirror';
shell.cd(path);
//Initiate VS and Dependent Repos
shell.cd(vsPath);
console.log("========================Building monaco-editor =========================");
global.executeCommand('cd monaco-editor && npm i && npm run release && cd ..', 'monaco-editor');
console.log("========================Completed - monaco-editor =========================");
console.log("========================Building monaco-themes =========================");
global.executeCommand('cd monaco-themes && npm i && npm run build && cd ..', 'monaco-themes');
console.log("========================Completed - monaco-themes =========================");
//Initiate Code Mirror and Dependent Repos
shell.cd("..");
shell.cd(cmPath);
console.log("========================Building Code Mirror =========================");
global.executeCommand('cd dev && npm i && npm run prepare && cd ..', 'Code Mirror');
console.log("========================Completed - Code Mirror =========================");
console.log("========================Building Code Mirror Themes=========================");
global.executeCommand('cd codemirror-themes && npm i && npm run prepare && cd ..', 'Code Mirror Themes');
console.log("========================Completed - Code Mirror Themes=========================");
console.log("========================Building Code Mirror Themes - thememirror=========================");
global.executeCommand('cd thememirror && npm i && node bin/cm.js install && npm run prepare && cd ..', 'Code Mirror Themes - thememirror');
console.log("========================Completed - Code Mirror Themes - thememirror=========================");
console.log("Repo built...");