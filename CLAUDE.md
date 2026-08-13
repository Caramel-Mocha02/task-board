# CLAUDE.md

このファイルは、このリポジトリで作業する際に Claude Code（claude.ai/code）が参照するガイダンスです。

## プロジェクト概要

**task-board** — タスク管理ボードアプリケーション。テキスト入力でタスクを追加し、チェックボックスで完了/未完了を切り替え、削除できる。タスクはブラウザの localStorage に保存され、リロードしても保持される。

## デプロイ先

https://caramel-mocha02.github.io/task-board/

GitHub Actions（[.github/workflows/deploy.yml](.github/workflows/deploy.yml)）により、`main` への push で自動的にビルド・公開される。Vite の `base` は `/task-board/`（リポジトリ名）に設定している。

## 技術スタック

- **言語**: JavaScript（JSX）
- **UI ライブラリ**: React 18（`react` / `react-dom`）
- **ビルドツール**: Vite 5（`@vitejs/plugin-react`）
- **状態管理**: React の `useState` / `useEffect`（外部ライブラリなし）
- **永続化**: ブラウザの localStorage（キー: `task-board.tasks`）
- **スタイル**: プレーンな CSS（コンポーネントごとに `.css` を併置）
- **デプロイ**: GitHub Pages + GitHub Actions

## ディレクトリ構成

- `index.html` — エントリ HTML（`#root` にマウント）
- `src/main.jsx` — アプリのエントリポイント（`App` を描画）
- `src/App.jsx` — アプリ本体（タスクの追加・完了切替・削除・永続化ロジック）
- `src/App.css` / `src/index.css` — スタイル
- `vite.config.js` — Vite 設定（`base` を含む）
- `.github/workflows/deploy.yml` — GitHub Pages への自動デプロイ

## コンポーネント命名規約

- **コンポーネント名**: パスカルケース（`App` など）。ファイル名もコンポーネント名と一致させる（`App.jsx`）。
- **ファイル拡張子**: React コンポーネントは `.jsx`。
- **1 ファイル 1 コンポーネント**、`export default` で公開する。
- **スタイル**: 各コンポーネントに同名の CSS を併置する（`App.jsx` ↔ `App.css`）。全体共通のベーススタイルは `src/index.css`。
- **CSS クラス名**: ケバブケース（`task-list`, `add-form`, `task-item` など）。状態は修飾クラスで表す（例: 完了タスクは `task-item done`）。
- **イベントハンドラ**: `handle` は付けず、動詞ベースで命名する（`addTask`, `toggleTask`, `deleteTask`）。

## 開発コマンド

- セットアップ: `npm install`
- 開発サーバー: `npm run dev`（http://localhost:5173/ で起動）
- 本番ビルド: `npm run build`（出力先: `dist/`）
- ビルド結果のプレビュー: `npm run preview`

## Git 運用ルール

**コードを変更するたびに、必ず GitHub へプッシュすること。** 変更をローカルに溜め込まず、意味のある単位ごとにコミットし、その都度リモートへ反映します。

### 基本フロー

作業のたびに以下を実行します。

```bash
git add -A
git commit -m "<変更内容を表す簡潔なメッセージ>"
git push
```

### ルール詳細

- **こまめにコミット・プッシュする** — 一つの論理的な変更（機能追加・修正・リファクタなど）が完了したら、その都度コミットしてプッシュする。複数の無関係な変更を一つにまとめない。
- **プッシュ漏れを防ぐ** — 作業の区切りごとに `git status` で未プッシュ・未コミットの変更が残っていないか確認する。
- **コミットメッセージ** — 何を・なぜ変更したかが分かるように書く。
- **ブランチ運用** — `main` へ直接作業する場合も、変更後は必ず `git push` でリモートを最新に保つ。フィーチャーブランチを使う場合は、プッシュ後に Pull Request を作成する。

### リモート

Git 初期化・リモート設定は完了済み（`origin` = https://github.com/Caramel-Mocha02/task-board.git）。ワークフローファイル（`.github/workflows/`）を push する際は、認証トークンに `workflow` スコープが必要。
