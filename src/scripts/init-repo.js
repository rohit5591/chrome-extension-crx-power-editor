console.log("Initiating repo...");
const shell = require('shelljs');
const path = 'editors';
const vsPath = 'vs';
const cmPath = 'code-mirror';
const fs = require("fs");
function clone(repo) {
    const repoFolderName = repo.replace(/https:\/\/github\.com\/\w+\/(.*)\.git/gi, "$1");
    if (!fs.existsSync(repoFolderName)) {
        shell.exec('git clone ' + repo);
    }
}
function mkdirIfMissing(dirName) {
    if (!fs.existsSync(dirName)) {
        fs.mkdirSync(dirName);
    }
}
mkdirIfMissing(path);
shell.cd(path)
mkdirIfMissing(vsPath);
//Initiate VS and Dependent Repos
shell.cd(vsPath);
clone('https://github.com/microsoft/monaco-editor.git');
clone('https://github.com/brijeshb42/monaco-themes.git');
//Initiate Code Mirror and Dependent Repos
shell.cd("..");
mkdirIfMissing(cmPath);
shell.cd(cmPath)
clone('https://github.com/codemirror/dev.git');
clone('https://github.com/vadimdemedes/thememirror.git');
clone('https://github.com/dennis84/codemirror-themes.git');
console.log("Repo initiated...");