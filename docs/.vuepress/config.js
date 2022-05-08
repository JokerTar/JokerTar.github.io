// 配置导航栏logo(themeConfig.logo)
// 配置导航栏logo(themeConfig.logo)
module.exports = {
  // 网站的一些基本配置
  // base:配置部署站点的基础路径，后续再介绍
  title: '八爪鱼小站', // 网站的标题
  description: '八爪鱼小站', // 网站的描述，它将会以 <meta> 标签渲染到当前页面的 HTML 中。
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }] // 需要被注入到当前页面的 HTML <head> 中的标签
  ],
  // host port在本地运行就不配置了
  themeConfig: {
    // logo: '/dh_logo.jpg',
    nav: [
      // 直接跳转，'/'为不添加路由，跳转至首页，以/结尾的最终对应的都是/index.html,也就是README.md文件编译后的页面
      { text: 'Home', link: '/' },
      { text: 'webpack', link: '/blog/webpack/' },
      { text: 'Vue', link: '/blog/Vue/' },
      { text: 'React', link: '/blog/React/' },
      { text: 'JavaScript高级语法', link: '/blog/JavaScript/' },
      { 
        text: 'Node',
        items: [
          { text: 'node基础', link: '/blog/node/01_base' },
          { text: '脚手架的实现', link: '/blog/node/02_scaffold' },
          { text: 'express核心用法', link: '/blog/node/03_express' },
          { text: 'koa核心用法', link: '/blog/node/04_koa' }
        ]
      },
      { text: 'Python', link: '/blog/Python/' },
      { text: '前端架构', link: '/blog/前端架构/' },
      { text: 'web',
        items: [
          { text: 'html', link: '/blog/web/html' },
          { text: 'css', link: '/blog/web/css' },
          { text: 'git', link: '/blog/web/git' },
          { text: '正则', link: '/blog/web/regular' },
          { text: '网络协议', link: '/blog/web/network' },
          { text: '移动端', link: '/blog/web/mobile' },
          { text: '前端性能优化', link: '/blog/web/optimize' },
        ]
      },
      { text: 'linux', link: '/blog/linux/' },
    ],
    // 禁用导航栏
    // navbar: false,
    // 设置自动生成侧边栏
    sidebar: 'auto',
  }
}