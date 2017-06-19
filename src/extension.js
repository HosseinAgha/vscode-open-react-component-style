// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
var vscode = require('vscode');
var path = require('path');
var fs = require('fs');

let { window, commands, workspace } = vscode;

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
exports.activate = function activate(context) {
    var disposable = commands.registerCommand('extension.openComponentOrStyle', () => {
        let editor = window.activeTextEditor;
        // Display a message box to the user
        let filePath = editor.document.fileName;
        let fileExt = path.extname(filePath);
        let nextFilePath = "";
        let config = workspace.getConfiguration('openComponentOrStyle')
        let distFileExt = null;

        if (config.fileExts.includes(fileExt)) { // we need to open a style file
            nextFilePath = filePath.replace(new RegExp(fileExt + '$'), config.styleFileExt);
            if(fs.existsSync(nextFilePath))
                distFileExt = config.styleFileExt;
        } else if (fileExt === config.styleFileExt) { // we need to open a component file
            for (let index = 0; index < config.fileExts.length; index++) {
                let ext = config.fileExts[index];
                nextFilePath = filePath.replace(new RegExp(fileExt + '$'), ext);
                if (fs.existsSync(nextFilePath)) {
                    distFileExt = ext;
                    break
                }
            }
        } else {
            window.showWarningMessage(
                `Please add ${fileExt} extension to configuration`);
            return
        }

        if(distFileExt == null) {
            window.showWarningMessage(
                `file ${path.basename(nextFilePath)} does not exist`);
            return
        }

        // open dist file
        workspace.openTextDocument(nextFilePath)
        .then((file) => {
            window.showTextDocument(file);
        })
    });

    context.subscriptions.push(disposable);
};

// this method is called when your extension is deactivated
exports.deactivate = function deactivate() {
};