---
title: VuePress使ってみました
date: 2019-02-01
categories:
  - article
  - technology
  - vuepress
---

# VuePress使ってみました
はじめてのブログ作成、せっかくなので知らない技術を触ってみようと思い、VuePress使ってみました。

## VuePressを選んだ理由

* **自由度がありそう**  
少し自分好みにいじろうと思えばいじれそう
* **運用が楽そう&安そう**  
調べたら、静的サイトジェネレータという分野のものが自分にはよさそう  
* **幸い Vue.js が好きで、触ったことがある**  
静的サイトジェネレータの中でもまだ歴史が浅くてalpha版だけれど、さっと試せそう

ということで VuePress 始めてみました。  
（パッと作る分には楽だし、最初はどこかのブログサービスを使おうかと思っていたのだけれど）  

## VuePress環境構築
ポイントだと思ったところを記載。

### 概要把握
[https://vuepress.vuejs.org/guide/#introduction](https://vuepress.vuejs.org/guide/#introduction)  
VuePressは、**ドキュメントなど静的ページに焦点を絞ったフレームワーク**。特化型Nuxt。  
（Nuxtは、Webアプリケーション全体を対象としたフレームワーク）  
（ブログ向けというより技術リファレンス向けの機能/レイアウトが中心）

特長はいくつかあるけれど、特に

* **Markdown**でページを基本的に作成する  
* Markdownに、Vueコンポーネントのように**Vueの機能を混ぜられる**  

が個性的。

### 環境構築
[https://vuepress.vuejs.org/guide/getting-started.html#inside-an-existing-project](https://vuepress.vuejs.org/guide/getting-started.html#inside-an-existing-project)

ほぼ公式チュートリアルのままですが、

```sh
npm init
# 2019/02/01時点では1.0.0-alpha.35
npm i -D vuepress@next
# ブログ向けのプラグイン。後述
npm i -D @vuepress/plugin-blog
# 公式だとsrcではなくdocsという名前だが、慣れているのでsrcに変更。package.jsonのscriptの引数も変更。
mkdir -p src/.vuepress
```
`package.json`
```json
{
  ...
  "scripts": {
    "dev": "vuepress dev src",
    "build": "vuepress build src"
  }
  ...
}
```
で、
```sh
npm run dev
```
で、
[localhost:8080](localhost:8080)

### ディレクトリ構成とルーティング
[https://vuepress.vuejs.org/guide/directory-structure.html#directory-structure](https://vuepress.vuejs.org/guide/directory-structure.html#directory-structure)

規約がある。

1. ディレクトリ構成をなぞって**urlのパスは自動**で作られる。RailsとかNuxtと似た感じ。

1. **README.mdがデフォルト**で表示される。index.html的な。  
ex) /src/about/README.md -> hogehoge.com/about で表示される  

あとは、 .vuepress ディレクトリにファイルを追加して独自に設定を追加していくのだが、触るのはだいたい `.vuepress/config.js` だった。

### VuePress公式Plugin plugin-blog 導入
[https://vuepress.vuejs.org/plugin/official/plugin-blog.html#install](https://vuepress.vuejs.org/plugin/official/plugin-blog.html#install)

1. module を追加（上記環境構築で済み）

1. `config.js` にplugin読み込みの記述追加

1. `_posts` ディレクトリにブログ記事の markdown を追加

1. ブログ記事の markdown の YAML front matter には `date` を追加

すると動いた。（少し嵌った）  
markdown の YAML front matter に記載した `date` を元に、パスを自動で作ってくれている模様。  
ex) date: 2019-02-01 -> /2019/02/01/markdown-name  
Category、Tagの利用はまだ開発中で、パッとできない。

### その他に参考にしたサイト
とーふとふのブログ
[https://to-hutohu.com/2018/05/18/migrate-to-vuepress/](https://to-hutohu.com/2018/05/18/migrate-to-vuepress/)  
vuepressで作られているブログで、vuepress導入の記事があった。ありがたい

### 困ったら
Vueインスタンスの情報をconsoleログに吐き出して確認  
`適当な markdown`
```js
<script>
export default {
  mounted() {
    console.log(this);
  },
}
</script>
```

## おわりに
記事にまとめてたら気づいたらチュートリアルみたいになっていた。
Markdownに少し詳しくなった。  
あと、何だかんだ環境構築フェーズは知らないことが多いので躓く。  

VuePressを触ってみて

* **良さげ**

基本早い。  
Markdownでパッと書ける。デフォルトのスタイルもいい感じ。  
ドキュメントを **Gitでバージョン管理できる**。  
HMRにより **ローカルですぐに変更が確認できる**。

* **頑張ってほしい**

ブログ向け機能がまだ整備されていない。（alpha版で開発中なので当然だが）  
サイドバーなどデフォルトのレイアウトの一部の変更をしたくなると手間がかかる。（該当部分のコンテンツを規律に依りながらの再実装になる） 
記事追加の度に本番リリースのビルドが必要になりそうでめんどくさそう（静的サイトジェネレータはどれもそう？）  

またページの変更等で VuePress を触った時に何かあったらメモするかもしれないし、しないかもしれない。
