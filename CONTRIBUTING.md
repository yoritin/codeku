# Contributing to Codoku

Codokuへの貢献ありがとうございます！🎉

## 開発環境のセットアップ

### 必要なもの

- Node.js 18+
- pnpm 8+
- Visual Studio Code

### セットアップ手順

```bash
# リポジトリをクローン
git clone https://github.com/yoritin/codeku.git
cd codeku

# 依存関係をインストール
pnpm install

# 拡張機能の開発モードで起動
pnpm dev:extension
```

VSCodeで `F5` を押すと、拡張機能がインストールされた新しいウィンドウが開きます。

## 貢献の種類

### 🐛 バグ報告

[Issue](https://github.com/yoritin/codeku/issues/new?template=bug_report.md) を作成してください。

### 💡 機能リクエスト

[Issue](https://github.com/yoritin/codeku/issues/new?template=feature_request.md) を作成してください。

### 📚 辞書データの追加（最も歓迎！）

辞書データの拡充は最も歓迎される貢献です。

#### 単語の追加

`packages/extension/src/data/words.json`:

```json
{
  "word": "authentication",
  "reading": "オーセンティケーション"
}
```

#### 略語の追加

`packages/extension/src/data/abbreviations.json`:

```json
{
  "abbr": "JWT",
  "reading": "ジェイダブリューティー",
  "fullForm": "JSON Web Token"
}
```

### 🔧 コードの改善

1. Issueで議論してから実装を開始することを推奨
2. テストを追加してください
3. `pnpm lint` でエラーがないことを確認

## Pull Request のガイドライン

1. `main` ブランチから新しいブランチを作成
2. 変更を加える
3. テストが通ることを確認: `pnpm test`
4. コミットメッセージは [Conventional Commits](https://www.conventionalcommits.org/) に従う
   - `feat: add new word to dictionary`
   - `fix: correct reading for "async"`
   - `docs: update README`
5. Pull Request を作成

## コミットメッセージの例

```
feat: add 50 new programming terms to dictionary
fix: handle edge case in snake_case tokenizer
docs: add Japanese translation to README
chore: update dependencies
```

## コードスタイル

- TypeScript を使用
- ESLint の設定に従う
- Prettier でフォーマット

## 質問がある場合

[Discussions](https://github.com/yoritin/codeku/discussions) で気軽に質問してください！
