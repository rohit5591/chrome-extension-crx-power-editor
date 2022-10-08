console.log("Initiating repo...");
const shell = require('shelljs')
const path = 'editors'
const fs = require("fs");
if (!fs.existsSync(path)) {
    fs.mkdirSync(path);
}
shell.cd(path)
if (!fs.existsSync('monaco-editor')) {
    shell.exec('git clone https://github.com/microsoft/monaco-editor.git');
}
if (!fs.existsSync('dev')) {
    shell.exec('git clone https://github.com/codemirror/dev.git');
}
console.log("Repo initiated...");