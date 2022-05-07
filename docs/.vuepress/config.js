module.exports = {
  title: "八爪鱼小站",
  description: "八爪鱼小站",
  base: "/JokerTar.github.io/",
  head: [
    // ['link', { rel: 'icon', href: '/logo.jpg' }] // 需要被注入到当前页面的 HTML <head> 中的标签
  ],
  // host port在本地运行就不配置了
  themeConfig: {
    // logo: '/dh_logo.jpg',
    nav: [
      { text: "Home", link: "/" },
      // 对应blog/fontend/README.md
      { text: "node", link: "/blog/node/" },
      { text: "docker", link: "/blog/docker/" },
      { text: "JavaScript", link: "/blog/JavaScript/" },
    ],
    // 禁用导航栏
    // navbar: false,
    // 设置自动生成侧边栏
    // sidebar: 'auto',
  },
};
