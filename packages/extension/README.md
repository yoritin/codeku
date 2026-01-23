# Codeku（コードク）

> コードを「読む」- Display Japanese readings for code identifiers on hover

![Demo](./assets/demo.gif)

## Features

**ホバーで読みを表示**
変数名、関数名、クラス名などにマウスをホバーすると、日本語の読み（カタカナ）がツールチップで表示されます。

**識別子の自動分割**
camelCase, PascalCase, snake_case, kebab-case を自動認識し、単語ごとに分割して読みを表示します。

**プログラミング略語対応**
API, HTTP, JSON, URLなどのプログラミングでよく使われる略語にも対応しています。

## Usage

1. 対応言語のファイルを開く
2. 識別子（変数名、関数名など）にマウスをホバー
3. 読みがツールチップで表示されます

### Example

```typescript
const getUserName = () => { ... }
//     ↑ ホバーすると「ゲット ユーザー ネーム」と表示
```

## Supported Languages

- TypeScript / JavaScript
- Python
- Go
- Rust

## Extension Settings

| Setting               | Description         | Default               |
| --------------------- | ------------------- | --------------------- |
| `codeku.enabled`      | 拡張機能の有効/無効 | `true`                |
| `codeku.languages`    | 有効にする言語      | `["typescript", ...]` |
| `codeku.showOriginal` | 元の単語も表示      | `true`                |
| `codeku.readingStyle` | 読みのスタイル      | `"katakana"`          |

### Reading Styles

- `katakana` - カタカナ（デフォルト）
- `hiragana` - ひらがな
- `romaji` - ローマ字

## Known Issues

- 辞書にない単語は元のスペルがそのまま表示されます
- 一部の専門用語や固有名詞には対応していない場合があります

## Contributing

辞書データの追加など、貢献を歓迎します！

[GitHub Repository](https://github.com/yoritin/codeku)

## Release Notes

### 0.1.0

Initial release

- Basic hover functionality
- Support for camelCase, PascalCase, snake_case, kebab-case
- ~400 common programming words
- ~110 programming abbreviations

---

**Enjoy!** 📖
