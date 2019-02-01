/**
 * 記事リストサイドメニューの動的作成のためのヘルパー
 */
const glob = require("glob");
const pattern = "src/_posts/**/*.md";
function getArticleRegularPaths() {
  const paths = glob.sync(pattern);
  if (!paths || !Array.isArray(paths)) return [];
  return paths.map((a) => a.substr(3));
}
function getArticlePaths() {
  const paths = glob.sync(pattern);
  if (!paths || !Array.isArray(paths)) return [];

  const dummy = ['/', '/'];
  return paths.map((a) => {
    if (a.split('/').length < 3) return dummy;

    const date = a.split('/')[2];
    let slug = a.split('/')[3];
    if (date.length !== 8) return dummy;
    if (!slug.includes('.')) return dummy;

    const year = date.substr(0, 4);
    const month = date.substr(4, 2);
    const day = date.substr(6, 2);
    slug = slug.split('.')[0];
    return `/${year}/${month}/${day}/${slug}/`;
  });
}
function getSideBar() {
  const sidebar = {};

  const articleRegularPaths = getArticleRegularPaths();
  //const articlePaths = getArticlePaths();

  // default (fallback)
  sidebar['/'] = [
    // ['/debug/', 'Debug']
    {
      title: '記事リスト',
      collapsable: false,
      children: articleRegularPaths,
    },
  ];
  return sidebar;
}

/**
 * 設定ファイル
 */
module.exports = {
  // プラグイン
  plugins: ['@vuepress/blog'],

  // ページ主要情報
  title: 'yokrhのブログ',
  description: 'これはyokrhのブログです。',
  locales: {
    '/': {
      lang: 'ja',
    },
  },

  // ページスクロールによるurlのハッシュ部分の自動付与
  // example.com/hoge/fuga#aaa -> example.com/hoge/fuga#bbb
  activeHeaderLinks: false,

  // ページレイアウト
  themeConfig: {
    // 最終更新日時の表示
    lastUpdated: 'Last Updated',

    // 上部ナビメニュー
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Article', link: '/article/' },
      {
        text: 'External',
        items: [
          { text: 'Github', link: 'https://github.com/yokrh/vuepress-blog' }
        ]
      }
    ],

    // サイドバーメニュー
    sidebar: getSideBar(),
  }
}
