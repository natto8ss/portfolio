# ERINA Portfolio

React + TypeScriptで作ったポートフォリオです。TOPでは、輪郭が波打つ18個のバブルをつかんで遊べます。

## 起動

Node.js 22.12以上を使用します。

```sh
npm install
npm run dev
```

表示されたローカルURLを開いてください。HTMLファイルの直接オープンではReactは起動しません。

```sh
npm run build
npm run preview
```

公開対象は `dist/` です。既存の作品詳細ページと画像もビルド時にコピーします。

## 操作

- 丸をドラッグして離すと、慣性で動き、壁やほかの丸にぶつかります。
- Tabで丸にフォーカスし、矢印キーで移動できます。
- OSの「視差効果を減らす」設定では自動の動きを初期停止します。

## 実装

- `index.html`: メタ情報とReactのマウント先だけを持つ入口。
- `src/main.tsx`: Reactの起動と共通CSSの読み込み。
- `src/App.tsx`: ページ全体の構成。
- `src/components/`: Playground・About・Skills・Works・Contact・Header・Footer。
- `src/data/portfolio.ts`: スキルと作品一覧の型付きデータ。内容の更新はここで行います。
- `src/usePlayground.ts`: Pointer Events、ResizeObserver、requestAnimationFrameをまとめたカスタムHook。
- `src/physics.ts`: バブルの型、境界判定、衝突と慣性。
- `src/bubbleShape.ts`: 波打つ輪郭のSVGパス生成。
- `src/playground.css`: 見た目、スクロール吸着、レスポンシブ表示。

座標はrefで保持し、毎フレームのReact再レンダリングを避けてtransformとSVGパスを更新します。監視とフレームはEffectの終了時に解除します。

トップページ全体をReactで描画します。既存の `work/*.html` の作品詳細ページは静的HTMLとして維持しています。スキルは「できること＋技術名」で紹介し、React・TypeScriptは挑戦中として掲載しています。`work/06.html` がないため、6件目は既存の作品画像へのリンクです。

TypeScriptはstrictモードで、アプリ・Vite設定・Playwrightテストを型チェックします。`npm run typecheck` で型チェックのみ、`npm run build` で型チェックと本番ビルドを実行します。

## 動作確認

Google Chromeがインストールされた環境で実行します。

```sh
npm run build
npm test
```

PCのドラッグ・キーボード・名前の改行、スマートフォンのタッチ操作と横幅、既存ページの配信を確認します。

参考: [React useEffect](https://react.dev/reference/react/useEffect)、[Vite](https://vite.dev/guide/)。
