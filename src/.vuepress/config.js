module.exports = {
  title: 'yokrhのブログ',
  description: 'これはyokrhのブログです。',
  plugins: ['@vuepress/blog'] ,
  activeHeaderLinks: false,
  themeConfig: {
    lastUpdated: 'Last Updated',
    // 
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Test', link: '/test/' },
      {
        text: 'Pages',
        items: [
          { text: 'Sandbox', link: '/sandbox/' },
          { text: 'Hoge', link: '/sandbox/hoge/' },
          { text: 'Fuga', link: '/sandbox/fuga/' },
          { text: 'Piyo', link: '/sandbox/piyo/' },
        ]
      },
      { text: 'External', link: 'https://google.com' }
    ],
    //
    sidebar: {
      '/sandbox': [
        ['/sandbox/', 'Sandbox'],
        {
          title: 'children',
          collapsable: false,
          children: [
            ['/sandbox/hoge/', 'Hoge'],
            ['/sandbox/fuga/', 'Fuga'],
            ['/sandbox/piyo/', 'Piyo'],
          ]
        },
      ],
      // fallback
      '/': [
        ['/', 'Home'],
        ['/test/', 'Test'],
        ['/sandbox/', 'Sandbox']
      ],
    }
  }
}
