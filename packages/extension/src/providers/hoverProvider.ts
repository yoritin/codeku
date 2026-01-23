import * as vscode from 'vscode'
import { DictionaryService } from '../services/dictionary'
import { Tokenizer } from '../services/tokenizer'

export class CodekuHoverProvider implements vscode.HoverProvider {
  private dictionary: DictionaryService
  private tokenizer: Tokenizer

  constructor() {
    this.dictionary = new DictionaryService()
    this.tokenizer = new Tokenizer()
  }

  provideHover(
    document: vscode.TextDocument,
    position: vscode.Position,
  ): vscode.ProviderResult<vscode.Hover> {
    const config = vscode.workspace.getConfiguration('codeku')

    if (!config.get<boolean>('enabled')) {
      return null
    }

    const wordRange = document.getWordRangeAtPosition(
      position,
      /[a-zA-Z_][a-zA-Z0-9_]*/,
    )

    if (!wordRange) {
      return null
    }

    const word = document.getText(wordRange)

    if (!word || word.length < 2) {
      return null
    }

    const tokens = this.tokenizer.split(word)
    const readings = this.getReadings(tokens)

    if (readings.length === 0) {
      return null
    }

    const showOriginal = config.get<boolean>('showOriginal')
    const content = this.formatContent(tokens, readings, showOriginal)

    const markdown = new vscode.MarkdownString(content)
    markdown.isTrusted = true

    return new vscode.Hover(markdown, wordRange)
  }

  private getReadings(tokens: string[]): string[] {
    const config = vscode.workspace.getConfiguration('codeku')
    const style = config.get<string>('readingStyle') || 'katakana'

    return tokens.map((token) => {
      const reading = this.dictionary.getReading(token.toLowerCase())
      if (!reading) {
        return token // 辞書にない場合は元の単語をそのまま返す
      }
      return this.convertReadingStyle(reading, style)
    })
  }

  private convertReadingStyle(reading: string, style: string): string {
    switch (style) {
      case 'hiragana':
        return this.katakanaToHiragana(reading)
      case 'romaji':
        return this.katakanaToRomaji(reading)
      default:
        return reading
    }
  }

  private katakanaToHiragana(katakana: string): string {
    return katakana.replace(/[\u30A1-\u30F6]/g, (char) => {
      return String.fromCharCode(char.charCodeAt(0) - 0x60)
    })
  }

  private katakanaToRomaji(katakana: string): string {
    const map: Record<string, string> = {
      ア: 'a',
      イ: 'i',
      ウ: 'u',
      エ: 'e',
      オ: 'o',
      カ: 'ka',
      キ: 'ki',
      ク: 'ku',
      ケ: 'ke',
      コ: 'ko',
      サ: 'sa',
      シ: 'shi',
      ス: 'su',
      セ: 'se',
      ソ: 'so',
      タ: 'ta',
      チ: 'chi',
      ツ: 'tsu',
      テ: 'te',
      ト: 'to',
      ナ: 'na',
      ニ: 'ni',
      ヌ: 'nu',
      ネ: 'ne',
      ノ: 'no',
      ハ: 'ha',
      ヒ: 'hi',
      フ: 'fu',
      ヘ: 'he',
      ホ: 'ho',
      マ: 'ma',
      ミ: 'mi',
      ム: 'mu',
      メ: 'me',
      モ: 'mo',
      ヤ: 'ya',
      ユ: 'yu',
      ヨ: 'yo',
      ラ: 'ra',
      リ: 'ri',
      ル: 'ru',
      レ: 're',
      ロ: 'ro',
      ワ: 'wa',
      ヲ: 'wo',
      ン: 'n',
      ガ: 'ga',
      ギ: 'gi',
      グ: 'gu',
      ゲ: 'ge',
      ゴ: 'go',
      ザ: 'za',
      ジ: 'ji',
      ズ: 'zu',
      ゼ: 'ze',
      ゾ: 'zo',
      ダ: 'da',
      ヂ: 'di',
      ヅ: 'du',
      デ: 'de',
      ド: 'do',
      バ: 'ba',
      ビ: 'bi',
      ブ: 'bu',
      ベ: 'be',
      ボ: 'bo',
      パ: 'pa',
      ピ: 'pi',
      プ: 'pu',
      ペ: 'pe',
      ポ: 'po',
      ャ: 'ya',
      ュ: 'yu',
      ョ: 'yo',
      ァ: 'a',
      ィ: 'i',
      ゥ: 'u',
      ェ: 'e',
      ォ: 'o',
      ー: '-',
      ッ: '',
    }

    let result = ''
    for (const char of katakana) {
      result += map[char] || char
    }
    return result
  }

  private formatContent(
    tokens: string[],
    readings: string[],
    showOriginal?: boolean,
  ): string {
    const readingLine = `📖 **${readings.join(' ')}**`

    if (showOriginal) {
      const originalLine = `\`${tokens.join(' ')}\``
      return `${readingLine}\n\n${originalLine}`
    }

    return readingLine
  }
}
