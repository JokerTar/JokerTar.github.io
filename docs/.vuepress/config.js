// 配置导航栏logo(themeConfig.logo)
// 配置导航栏logo(themeConfig.logo)
module.exports = {
  // 网站的一些基本配置
  // base:配置部署站点的基础路径，后续再介绍
  title: '八爪鱼小站', // 网站的标题
  description: '八爪鱼小站', // 网站的描述，它将会以 <meta> 标签渲染到当前页面的 HTML 中。
  head: [
    // ['link', { rel: 'icon', href: '/logo.jpg' }] // 需要被注入到当前页面的 HTML <head> 中的标签
  ],
  // host port在本地运行就不配置了
  themeConfig: {
    // logo: '/dh_logo.jpg',
    nav: [
      // 直接跳转，'/'为不添加路由，跳转至首页，以/结尾的最终对应的都是/index.html,也就是README.md文件编译后的页面
      { text: 'Home', link: '/' },
      // 对应blog/fontend/README.md
      { text: 'node', link: '/blog/node/' },
      { text: 'docker', link: '/blog/docker/' },
      { text: 'JavaScript', link: '/blog/JavaScript/' },
      // 不指定深度，默认深度1-提取h2 最大深度-2，同一标题下最多提取到h3，想要改变深度可以指定sidebarDepth
    ],
    // 禁用导航栏
    // navbar: false,
    // 设置自动生成侧边栏
    // sidebar: 'auto',
  }
}