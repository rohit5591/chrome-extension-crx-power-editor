const fs = require("fs");
const shell = require('shelljs');
module.exports = {
    clone: function (repo) {
        const repoFolderName = repo.replace(/https:\/\/github\.com\/\w+\/(.*)\.git/gi, "$1");
        if (!fs.existsSync(repoFolderName)) {
            this.executeCommand('git clone ' + repo, repoFolderName);
        }
    },
    mkdirIfMissing: function (dirName) {
        if (!fs.existsSync(dirName)) {
            fs.mkdirSync(dirName);
        }
    },
    executeCommand: function (commandStr, commandType = commandStr) {
        const command = shell.exec(commandStr);
        if(command.code != 0) {
            console.log("Some Error occured while executing : " + commandType);
            process.exit(1);
        }
    }
}