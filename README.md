# DJ List

[URL](https://djlist-5d87e.web.app/)
DJのリストが見れるユーザー投稿型サイト

## 技術

-   フレームワーク: vue-cli2
-   css: SCSS
-   言語: JavaScript
-   サーバー: Firebase Hosting
-   データベース: Firebase Realtime Database
-   ストレージ: Cloud Storage for Firebase
-   認証: Firebase Authentication

## 機能

### ヘッダー

-   メニュー(左からユーザー、タイトル、投稿)

### メインページ

-   検索機能
-   タグを表示
-   タグを更新できるようにした
-   Aboutページへの誘導を設置(×を押すと消える/リロードすると再表示)
-   投稿された人物のリストを表示
-   お気に入り機能（ログイン必要）

### ユーザーページ

-   サインアップ(メールアドレス)/ログイン/ログアウト
-   ログイン後、ユーザー名の登録可
-   ユーザーが投稿した人物を表示
-   ユーザーがお気に入りした人物を表示

### 投稿ページ

-   人物の投稿機能
-   画像をローカル/URLから投稿できるようにした
-   活動場所、リンク、ジャンルは入力すると自動で入力欄が増えるようにした

### 人物ページ

-   要素: お気に入り数、投稿した日時、活動場所、ジャンル、関連リンク
-   コメント機能
-   コメント: ログインしていないorユーザー名を登録していない場合、匿名で投稿される
-   コメント: ログインしているandユーザー名を登録している場合、ユーザー名で投稿される
-   編集機能（要素を編集できる）

### 人物ページ

-   要素: お気に入り数、投稿した日時、活動場所、ジャンル、関連リンク
-   コメント機能
-   コメント: ログインしていないorユーザー名を登録していない場合、匿名で投稿される
-   コメント: ログインしているandユーザー名を登録している場合、ユーザー名で投稿される
-   編集機能（要素を編集できる）

### その他

-   レスポンシブ対応

## ローカルサーバーで実行

```bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
```
