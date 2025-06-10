import * as vscode from 'vscode';

export class Logger {
    private static channel: vscode.OutputChannel;

    static init() {
        this.channel = vscode.window.createOutputChannel('YAML Sort v2');
    }

    static log(message: string, data?: any) {
        if (!this.channel) {
            this.init();
        }
        if (data) {
            this.channel.appendLine(`${message}\n${JSON.stringify(data, null, 2)}`);
        } else {
            this.channel.appendLine(message);
        }
    }

    static show() {
        if (!this.channel) {
            this.init();
        }
        this.channel.show();
    }
}