import * as vscode from 'vscode'
import { CodokuHoverProvider } from './providers/hoverProvider'

export function activate(context: vscode.ExtensionContext): void {
  console.log('Codoku is now active!')

  const config = vscode.workspace.getConfiguration('codoku')
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
  const hoverProvider = new CodokuHoverProvider()

  for (const language of languages) {
    const disposable = vscode.languages.registerHoverProvider(
      { scheme: 'file', language },
      hoverProvider,
    )
    context.subscriptions.push(disposable)
  }

  // Register toggle command
  const toggleCommand = vscode.commands.registerCommand('codoku.toggle', () => {
    const currentEnabled = config.get<boolean>('enabled')
    config.update('enabled', !currentEnabled, vscode.ConfigurationTarget.Global)
    vscode.window.showInformationMessage(
      `Codoku ${!currentEnabled ? 'enabled' : 'disabled'}`,
    )
  })

  context.subscriptions.push(toggleCommand)
}

export function deactivate(): void {
  console.log('Codoku is now deactivated')
}
