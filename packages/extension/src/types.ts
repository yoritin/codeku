export interface WordEntry {
  word: string
  reading: string
}

export interface AbbreviationEntry {
  abbr: string
  reading: string
  fullForm?: string
}

export interface CodekuConfig {
  enabled: boolean
  languages: string[]
  showOriginal: boolean
  readingStyle: 'katakana' | 'hiragana' | 'romaji'
}
