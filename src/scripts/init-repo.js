console.log("Initiating repo...");
const shell = require('shelljs');
const path = 'editors';
const vsPath = 'vs';
const cmPath = 'code-mirror';
const fs = require("fs");;
if (!fs.existsSync(path)) {
    fs.mkdirSync(path);
}
shell.cd(path)
if (!fs.existsSync(vsPath)) {
    fs.mkdirSync(vsPath);
}
//Initiate VS and Dependent Repos
shell.cd(vsPath);
if (!fs.existsSync('monaco-editor')) {
    shell.exec('git clone https://github.com/microsoft/monaco-editor.git');
}
//Initiate Code Mirror and Dependent Repos
shell.cd("..");
if (!fs.existsSync(cmPath)) {
    fs.mkdirSync(cmPath);
}
shell.cd(cmPath)
if (!fs.existsSync('dev')) {
    shell.exec('git clone https://github.com/codemirror/dev.git');
}
console.log("Repo initiated...");