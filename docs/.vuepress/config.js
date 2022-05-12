module.exports = {
  title: "八爪鱼小站",
  description: "八爪鱼小站",
  base: "",
  head: [
    // ['link', { rel: 'icon', href: '/favicon.ico' }] // 需要被注入到当前页面的 HTML <head> 中的标签
    // <meta name="referrer" content="never"></meta>
    ["meta", { name: "referrer", content: "never" }],
  ],
  // host port在本地运行就不配置了
  themeConfig: {
    // logo: '/dh_logo.jpg',
    nav: [
      // 直接跳转，'/'为不添加路由，跳转至首页，以/结尾的最终对应的都是/index.html,也就是README.md文件编译后的页面
      { text: "Home", link: "/" },
      { text: "webpack", link: "/blog/webpack/" },
      { text: "Vue", link: "/blog/Vue/" },
      { text: "React", link: "/blog/React/" },
      { text: "JavaScript高级语法", link: "/blog/JavaScript/" },
      {
        text: "Node",
        items: [
          { text: "node基础", link: "/blog/node/01_base" },
          { text: "脚手架的实现", link: "/blog/node/02_scaffold" },
          { text: "express核心用法", link: "/blog/node/03_express" },
          { text: "koa核心用法", link: "/blog/node/04_koa" },
        ],
      },
      { text: "Python", link: "/blog/Python/" },
      {
        text: "前端架构",
        items: [
          { text: "Github Actions", link: "/blog/前端架构/GithubActions" },
          { text: "Docker", link: "/blog/前端架构/Docker" },
        ],
      },
      {
        text: "web",
        items: [
          { text: "html", link: "/blog/web/html" },
          { text: "css", link: "/blog/web/css" },
          { text: "git", link: "/blog/web/git" },
          { text: "正则", link: "/blog/web/regular" },
          { text: "网络协议", link: "/blog/web/network" },
          { text: "移动端", link: "/blog/web/mobile" },
          { text: "前端性能优化", link: "/blog/web/optimize" },
          {
            text: "浏览器工作原理与实践",
            items: [
              {
                text: "01.Chrome架构：仅仅打开了1个页面，为什么有4个进程？",
                link: "/blog/web/browser/01",
              },
              {
                text: "02.TCP协议：如何保证页面文件能被完整送达浏览器？",
                link: "/blog/web/browser/02",
              },
              {
                text: "03.HTTP 请求流程：为什么很多站点第二次打开速度会很快？",
                link: "/blog/web/browser/03",
              },
              {
                text: "04.导航流程：从输入URL到页面展示，这中间发生了什么？",
                link: "/blog/web/browser/04",
              },
            ],
          },
        ],
      },
      { text: "linux", link: "/blog/linux/" },
      {
        text: "案例库",
        items: [
          { text: "文章收集", link: "/blog/case/article-collects" },
          { text: "前端开发干货", link: "/blog/case/dry-goods" },
        ],
      },
      {
        text: "文档教程",
        items: [
          { text: "慕课教程", link: "https://www.imooc.com/wiki/" },
          { text: "菜鸟教程", link: "https://www.runoob.com/" },
          { text: "印记中文", link: "/blog/tutorial/03.印记中文" },
        ],
      },
    ],
    // 禁用导航栏
    // navbar: false,
    // 设置自动生成侧边栏
    sidebar: "auto",
  },
};
