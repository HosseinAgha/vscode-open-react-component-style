// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import vscode, { ExtensionContext, languages, RelativePattern } from 'vscode';
import path from 'path';

let { window, commands, workspace } = vscode;

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: ExtensionContext) {
  var disposable = commands.registerCommand(
    'extension.openComponentOrStyle',
    async () => {
      const editor = window.activeTextEditor;
      if (editor == null) {
        return;
      }
      // Display a message box to the user
      const openDocument = editor.document;
      const config = workspace.getConfiguration('openComponentOrStyle');

      const isCodeFile = config.codeFileLanguages.some((lang) =>
        languages.match({ scheme: 'file', language: lang }, openDocument),
      );
      const isStyleFile = config.styleFileLanguages.some((lang) =>
        languages.match({ scheme: 'file', language: lang }, openDocument),
      );

      const targetLanugages = isCodeFile
        ? config.styleFileLanguages
        : isStyleFile
        ? config.codeFileLanguages
        : null;

      if (targetLanugages == null) return;

      const fileName = path.basename(openDocument.fileName).replace(/\..*?$/, '');
      const files = await workspace.findFiles(`**/${fileName}.*`);
      const filesWithSameName = files.filter(
        ({ path }) => path !== openDocument.fileName,
      );

      for (const file of filesWithSameName) {
        const doc = await workspace.openTextDocument(file);
        const isMatch = targetLanugages.some((language) =>
          languages.match({ scheme: 'file', language }, doc),
        );
        if (isMatch) {
          return window.showTextDocument(doc);
        }
      }

      const correspondingFile = isCodeFile ? 'component file' : 'style file';
      window.showWarningMessage(
        `cannot open ${path.basename(
          openDocument.fileName,
        )}'s corresponding ${correspondingFile}`,
      );
    },
  );

  context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
