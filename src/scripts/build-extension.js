const fs = require("fs-extra");
const shell = require('shelljs');
const path = require('path');
const glob = require('glob');
var jsonminify = require("jsonminify");

fs.removeSync('dist');
fs.mkdirSync('dist');

//Build VS Code Editor for Chrome Extension
//Copy built folders/files first
fs.mkdirSync('dist/vs');
fs.copySync('editors/vs/monaco-editor/release/min/vs', 'dist/vs');
fs.copySync('editors/vs/vscode-loader/src/loader.js', 'dist/vs/loader.js');
//Build VS Themes Function
let options = [];
let jsonVars = "function getTheme(theme) {\n switch(theme) {\n";
const themeList = JSON.parse(fs.readFileSync('editors/vs/monaco-themes/themes/themelist.json'));
// glob.sync('./themes/*.json').forEach(file => {
//     const fileObj = path.parse(file);
//     //console.log(fileObj.name);
//     options.push(fileObj.name);
//     const themeName = fileObj.name.replaceAll(/[^a-zA-Z0-9]/g, '');
//     const fileContents = jsonminify(fs.readFileSync(file, { encoding: 'utf8' }));
//     jsonVars += "case '" + themeName + "' : {\n ";
//     jsonVars += "const " + themeName + "= " + fileContents + ";\n";
//     jsonVars += "monaco.editor.defineTheme(\"" + themeName + "\", " + themeName + ");\n";
//     jsonVars += "monaco.editor.setTheme(\"" + themeName + "\");\n";
//     jsonVars += "return theme;";
//     jsonVars += "}\n ";
//     //jsonVars += "monaco.editor.defineTheme(\"" + fileObj.name + "\", " + fileObj.name + ");\n";
//     //monaco.editor.defineTheme('monokai', data);
// });
// jsonVars += "\n}\n return theme;\n}\n"
// //console.log("monaco.editor.defineTheme(\"" + option.replaceAll(/[^a-zA-Z0-9]/g, '') + "\", " + option.replaceAll(/[^a-zA-Z0-9]/g, '') + ");");

// console.log(jsonVars);
// // console.log("selct dropdowns ======");
// // options.forEach(option => {
// //     console.log("<option value=\"" + option.replaceAll(/[^a-zA-Z0-9]/g, '') + "\">" + option + "</option>");
// // });