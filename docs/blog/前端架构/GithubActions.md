---
sidebar: auto
---

# 了解 Github Actions

## 概览

> 大家知道，持续集成由很多操作组成，比如抓取代码、运行测试、登录远程服务器，发布到第三方服务等等。GitHub 把这些操作就称为 actions。

> 很多操作在不同项目里面是类似的，完全可以共享。GitHub 注意到了这一点，想出了一个很妙的点子，允许开发者把每个操作写成独立的脚本文件，存放到代码仓库，使得其他开发者可以引用。

> 如果你需要某个 action，不必自己写复杂的脚本，直接引用他人写好的 action 即可，整个持续集成过程，就变成了一个 actions 的组合。这就是 GitHub Actions 最特别的地方。

## 基本概念

1. workflow （工作流程）：持续集成一次运行的过程，就是一个 workflow。

2. job （任务）：一个 workflow 由一个或多个 jobs 构成，含义是一次持续集成的运行，可以完成多个任务。

3. step（步骤）：每个 job 由多个 step 构成，一步步完成。

4. action （动作）：每个 step 可以依次执行一个或多个命令（action）。

## 基本配置字段

详见[官方文档](https://docs.github.com/cn/actions/learn-github-actions/understanding-github-actions)

## 一个案例了解 Github Actions

一个 push 动作，自动拉取代码、配置环境、远程登录到云服务器、自动构建代码

```js
name: deploy

on:
  push:
    branches: [master]
    paths:
      - "docs/**"
      - ".github/workflows/**"
  pull_request:
    branches: [master]

jobs:
  deploy-dev:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v2
      - name: install node.js
        uses: actions/setup-node@v2.5.1
        with:
          node-version: "14.x"
      - name: install deps
        run: npm install
      - name: build app
        run: npm run build
      - name: copy dist file with scp
        uses: appleboy/scp-action@master
        with:
          host: ${{ secrets.REMOTE_HOST }}
          username: ${{ secrets.REMOTE_USER }}
          password: ${{ secrets.REMOTE_PASS }}
          port: 22
          source: "docs/.vuepress/dist"
          target: "/opt/blogs/dist"

```

## 相关文档

[官方文档](https://docs.github.com/cn/actions)

[阮一峰 GitHub Actions 入门教程](http://www.ruanyifeng.com/blog/2019/09/getting-started-with-github-actions.html)

[actions 官方市场](https://github.com/marketplace?type=actions)

[awesome actions](https://github.com/sdras/awesome-actions)
