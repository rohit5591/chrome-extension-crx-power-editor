const fs = require("fs-extra");
const UglifyJS = require("uglify-js");
const jsonminify = require("jsonminify");
let powerEditorCode = fs.readFileSync('src/core/power-editor.js');
let extensionIndexHtml = fs.readFileSync('src/extension/index.html');

fs.removeSync('dist');
fs.mkdirSync('dist');

//Copy all extension files
fs.copySync('src/extension/.', 'dist/.');
//Build VS Code Editor for Chrome Extension
//Copy built folders/files first
fs.mkdirSync('dist/vs');
fs.copySync('editors/vs/monaco-editor/release/min/vs', 'dist/vs');
fs.copySync('editors/vs/vscode-loader/src/loader.js', 'dist/vs/loader.js');
//Build VS Themes Function
let vsOptions = "";
let jsonVars = "function getVSTheme(theme) {\n    switch(theme) {\n";
const themesPath = 'editors/vs/monaco-themes/themes/';
const themeList = JSON.parse(fs.readFileSync(themesPath + 'themelist.json'));
Object.keys(themeList).forEach(key => {
    const themeKey = key.replaceAll(/[^a-zA-Z0-9]/g, '');;
    const themeName = themeList[key];
    const fileContents = jsonminify(fs.readFileSync(`${themesPath}${themeName}.json`, { encoding: 'utf8' }));
    jsonVars += "        case '" + themeKey + "' : {\n ";
    jsonVars += "            const " + themeKey + "= " + fileContents + ";\n";
    jsonVars += "            monaco.editor.defineTheme(\"" + themeKey + "\", " + themeKey + ");\n";
    jsonVars += "            monaco.editor.setTheme(\"" + themeKey + "\");\n";
    jsonVars += "            return theme;\n";
    jsonVars += "        }\n";
    vsOptions += `<option value=\"${themeKey}\">${themeName}</option>\n`;
});
jsonVars += "    }\n    return theme;\n}\n"

//Prepend the getVSTheme method to powerEditorCode
powerEditorCode = jsonVars + powerEditorCode;
//Replace themes
extensionIndexHtml = extensionIndexHtml.replace('<!--GENERATED-THEMES-VS-->', vsOptions);