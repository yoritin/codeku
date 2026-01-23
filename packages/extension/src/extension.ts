import * as vscode from 'vscode'
import { CodekuHoverProvider } from './providers/hoverProvider'

export function activate(context: vscode.ExtensionContext): void {
  console.log('Codeku is now active!')

  const config = vscode.workspace.getConfiguration('codeku')
  const languages = config.get<string[]>('languages') || [
    'typescript',
    'javascript',
    'typescriptreact',
    'javascriptreact',
    'python',
    'go',
    'rust',
  ]

  // Register hover provider for each language
  const hoverProvider = new CodekuHoverProvider()

  for (const language of languages) {
    const disposable = vscode.languages.registerHoverProvider(
      { scheme: 'file', language },
      hoverProvider,
    )
    context.subscriptions.push(disposable)
  }

  // Register toggle command
  const toggleCommand = vscode.commands.registerCommand('codeku.toggle', () => {
    const currentEnabled = config.get<boolean>('enabled')
    config.update('enabled', !currentEnabled, vscode.ConfigurationTarget.Global)
    vscode.window.showInformationMessage(
      `Codeku ${!currentEnabled ? 'enabled' : 'disabled'}`,
    )
  })

  context.subscriptions.push(toggleCommand)
}

export function deactivate(): void {
  console.log('Codeku is now deactivated')
}
