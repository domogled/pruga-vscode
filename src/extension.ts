'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as path from 'path';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    
    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "pruga-vscode" is now active!');

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand('pruga.init', () => {

        console.log(`vscode.env.appName: ${vscode.env.appName}`);

        console.log(`context.extensionPath: ${context.extensionPath}`);
        console.log(`context.globalState: ${context.globalState}`);
        console.log(`context.storagePath: ${context.storagePath}`);
        console.log(`context.subscriptions: ${context.subscriptions}`);
        console.log(`context.workspaceState: ${context.workspaceState}`);

        const pruga_extension = vscode.extensions.getExtension('domogled.pruga-vscode');
        const pruga_properties = pruga_extension.packageJSON.contributes.configuration.properties
        // console.dir(extension.);

        const config = vscode.workspace.getConfiguration('pruga')

        // const keys = ["showLevel"
        // , "livereload.port"
        // , "server.web",
        // , "watch.buildedWeb"
        // , "compile.elm"
        // , "compile.php"
        // , "compile.typescript"
        // , "clean",
        // , "elm.test"
        // , "copy.static"
        // ]

        for (let option in pruga_properties) {
            const option_a = option.split('.')
            option_a.shift()
            option = option_a.join('.')
            const value = config.get(option);
            console.log(`${option}: ${value}`);
            config['update'](option, value, false)
        };
    });

    context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {
}