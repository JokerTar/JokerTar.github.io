---
sidebar: auto
---

## 01.JavaScript 运行原理

### 1.1.浏览器内核

- Gecko：早期被 Netscape 和 Mozilla Firefox 浏览器浏览器使用；
- Trident：微软开发，被 IE4~IE11 浏览器使用，但是 Edge 浏览器已经转向 Blink；
- Webkit：苹果基于 KHTML 开发、开源的，用于 Safari，Google Chrome 之前也在使用；
- Blink：是 Webkit 的一个分支，Google 开发，目前应用于 Google Chrome、Edge、Opera 等；
- 等等...

事实上，我们经常说的浏览器内核指的是浏览器的排版引擎：

- **排版引擎**（layout engine），也称为**浏览器引擎**（browser engine）、**页面渲染引擎**（rendering engine）或**样版引擎**。

![图片](https://beelz.oss-cn-beijing.aliyuncs.com/blog/imgs/aa.png)WebKit main flow

但是在这个执行过程中，HTML 解析的时候遇到了 JavaScript 标签，应该怎么办呢？

- 会停止解析 HTML，而去加载和执行 JavaScript 代码；

当然，为什么不直接异步去加载执行 JavaScript 代码，而要在这里停止掉呢？

- 这是因为 JavaScript 代码可以操作我们的 DOM；
- 所以浏览器希望将 HTML 解析的 DOM 和 JavaScript 操作之后的 DOM 放到一起来生成最终的 DOM 树，而不是频繁的去生成新的 DOM 树；

那么，JavaScript 代码由谁来执行呢？

- JavaScript 引擎

### 1.2. JavaScript 引擎

为什么需要 JavaScript 引擎呢？

- 事实上我们编写的 JavaScript 无论你交给浏览器或者 Node 执行，最后都是需要被 CPU 执行的；
- 但是 CPU 只认识自己的指令集，实际上是机器语言，才能被 CPU 所执行；
- 所以我们需要 JavaScript 引擎帮助我们将 JavaScript 代码翻译成 CPU 指令来执行；

比较常见的 JavaScript 引擎有哪些呢？

- **SpiderMonkey**：第一款 JavaScript 引擎，由 Brendan Eich 开发（也就是 JavaScript 作者）；
- **Chakra**：微软开发，用于 IT 浏览器；
- **JavaScriptCore**：WebKit 中的 JavaScript 引擎，Apple 公司开发；
- **V8**：Google 开发的强大 JavaScript 引擎，也帮助 Chrome 从众多浏览器中脱颖而出；

这里我们先以 WebKit 为例，WebKit 事实上由两部分组成的：

- WebCore：负责 HTML 解析、布局、渲染等等相关的工作；
- JavaScriptCore：解析、执行 JavaScript 代码；

![图片](https://beelz.oss-cn-beijing.aliyuncs.com/blog/imgs/a1.png)webkit 内核

看到这里，学过小程序的同学有没有感觉非常的熟悉呢？

- 在小程序中编写的 JavaScript 代码就是被 JSCore 执行的；

![图片](https://beelz.oss-cn-beijing.aliyuncs.com/blog/imgs/a2.png)

另外一个强大的 JavaScript 引擎就是 V8 引擎。

### 1.3.V8 引擎

我们来看一下官方对 V8 引擎的定义：

- V8 是用 C ++编写的 Google 开源高性能 JavaScript 和 WebAssembly 引擎，它用于 Chrome 和 Node.js 等。
- 它实现 ECMAScript 和 WebAssembly，并在 Windows 7 或更高版本，macOS 10.12+和使用 x64，IA-32，ARM 或 MIPS 处理器的 Linux 系统上运行。
- V8 可以独立运行，也可以嵌入到任何 C ++应用程序中。

V8 引擎本身的源码非常复杂，大概有超过 100w 行 C++代码，但是我们可以简单了解一下它执行 JavaScript 代码的原理：

- Parse 模块会将 JavaScript 代码转换成 AST（抽象语法树），这是因为解释器并不直接认识 JavaScript 代码；

- - 如果函数没有被调用，那么是不会被转换成 AST 的；
  - Parse 的 V8 官方文档：https://v8.dev/blog/scanner

- Ignition 是一个解释器，会将 AST 转换成 ByteCode（字节码）

- - 同时会收集 TurboFan 优化所需要的信息（比如函数参数的类型信息，有了类型才能进行真实的运算）；
  - 如果函数只调用一次，Ignition 会执行解释执行 ByteCode；
  - Ignition 的 V8 官方文档：https://v8.dev/blog/ignition-interpreter

- TurboFan 是一个编译器，可以将字节码编译为 CPU 可以直接执行的机器码；

- - 如果一个函数被多次调用，那么就会被标记为热点函数，那么就会经过 TurboFan 转换成优化的机器码，提高代码的执行性能；
  - 但是，机器码实际上也会被还原为 ByteCode，这是因为如果后续执行函数的过程中，类型发生了变化（比如 sum 函数原来执行的是 number 类型，后来执行变成了 string 类型），之前优化的机器码并不能正确的处理运算，就会逆向的转换成字节码；
  - TurboFan 的 V8 官方文档：https://v8.dev/blog/turbofan-jit

![图片](https://beelz.oss-cn-beijing.aliyuncs.com/blog/imgs/a3.png)

上面是 JavaScript 代码的执行过程，事实上 V8 的内存回收也是其强大的另外一个原因，这里暂时先不展开讨论：

- Orinoco 模块，负责垃圾回收，将程序中不需要的内存回收；
- Orinoco 的 V8 官方文档：https://v8.dev/blog/trash-talk

## 02.邂逅 Node.js

### 2.1.Node.js 是什么？

官方对 Node.js 的定义：

- Node.js 是一个基于 V8 JavaScript 引擎的 JavaScript 运行时环境。

<!-- ![图片](https://beelz.oss-cn-beijing.aliyuncs.com/blog/imgs/a4.png)image-20200924193328076 -->

也就是说 Node.js 基于 V8 引擎来执行 JavaScript 的代码，但是不仅仅只有 V8 引擎：

- 前面我们知道 Node.js 可以嵌入到任何 C ++应用程序中，无论是 Chrome 还是 Node.js，事实上都是嵌入了 V8 引擎来执行 JavaScript 代码；
- 但是在 Chrome 浏览器中，还需要解析、渲染 HTML、CSS 等相关渲染引擎，另外还需要提供支持浏览器操作的 API、浏览器自己的事件循环等；
- 另外，在 Node.js 中我们也需要进行一些额外的操作，比如文件系统读/写、网络 IO、加密、压缩解压文件等操作；

所以，我们可以简单理解规划出 Node.js 和浏览器的差异：

![图片](https://beelz.oss-cn-beijing.aliyuncs.com/blog/imgs/a4.png)Chrome 浏览器和 Node 架构区别

这里也有一份单独的 Node.js 的架构图：

- 我们编写的 JavaScript 代码会经过 V8 引擎，再通过 Node.js 的 Bindings，将任务放到 Libuv 的事件循环中；
- **libuv**（Unicorn Velociraptor—独角伶盗龙）是使用 C 语言编写的库；
- libuv 提供了事件循环、文件系统读写、网络 IO、线程池等等内容；
- 具体内部代码的执行流程，我会在后续专门讲解事件和异步 IO 的原理中详细讲解；

![图片](https://beelz.oss-cn-beijing.aliyuncs.com/blog/imgs/a5.png)What is Node.js? Where, when and how to use it with examples

### 2.2.Node.js 可以做什么?

了解了 Node.js 的架构，那么使用它我们可以做什么呢？

- 前面我们提到，Node.js 的出现，真正让 Atwood 定律变成了现实，Node.js 的应用场景也越来越多。

我们可以使用基于 Node.js 的 Electron 开发出类似于 VSCode 这种强大的桌面应用程序。另外前端自动化、模块化打包工具 gulp、webpack 也是基于 Node.js 开发和使用的。

Node.js 的快速发展也让企业对 Node.js 技术越来越重视，在前端招聘中通常会对 Node.js 有一定的要求，特别对于高级前端开发工程师，Node.js 更是必不可少的技能：

![图片](https://beelz.oss-cn-beijing.aliyuncs.com/blog/imgs/a6.png)前端工程师岗位需求

目前前端开发的库都是以 node 包的形式进行管理；

- npm、yarn 工具成为前端开发使用最多的工具；
- 越来越多的公司使用 Node.js 作为 web 服务器开发；
- 大量项目需要借助 Node.js 完成前后端渲染的同构应用；
- 资深前端工程师需要为项目编写脚本工具（前端工程师编写脚本通常会使用 JavaScript，而不是 Python 或者 shell）；
- 很多企业在使用 Electron 来开发桌面应用程序；

总结一下，目前 Node.js 到底有哪些应用场景呢？

- 前后端页面渲染

- - 支持项目同构开发
  - 对于需要进行首屏优化、SEO 的页面进行后端渲染

- 开发命令行工具

- - webpack、gulp 等都是基于 Node
  - 开发自己独立的命令行工具（类似于 shell、Python 做的事情，对于前端更加友好）

- 桌面应用的开发

- - 类似于 VSCode 这种强大的桌面应用
  - 甚至开发桌面端类似于 wayward 大型游戏

- 进行服务器开发

- - 拥有类似 express、koa 等强大的 web 框架
  - 开发 Web Socket 等服务器

所以，作为前端开发工程师，Node.js 已经是我们必须掌握的核心技术。

### 2.3.Node.js 的安装

Node.js 是在 2009 年诞生的，目前最新的版本是分别是 12.18.4 以及 14.12.0：

- LTS 版本：相对稳定一些，推荐线上环境使用该版本；
- Current 版本：最新的 Node 版本，包含很多新特性；

![图片](https://beelz.oss-cn-beijing.aliyuncs.com/blog/imgs/a7.png)node 的版本

这些我们选择什么版本呢？

- 如果你是学习使用，可以选择 current 版本；
- 如果你是公司开发，建议选择 LTS 版本；

Node 的安装方式有很多：

- 可以借助于一些操作系统上的软件管理工具，比如 Mac 上的 homebrew，Linux 上的 yum、dnf 等；
- 也可以直接下载对应的安装包下载安装；

我们选择下载安装，下载自己操作系统的安装包直接安装就可以了：

- window 选择.msi 安装包，Mac 选择.pkg 安装包，Linux 会在后续部署中讲解；
- 安装过程中会配置环境变量；
- 并且安装 node 过程中会安装 npm（_Node Package Manager_）工具；

### 2.4.Node.js 版本管理

在实际开发学习中，我们只需要使用一个 Node 版本来开发或者学习即可。但是，如果你希望通过可以快速更新或切换多个版本时，可以借助于一些工具：

- nvm：Node Version Manager
- n：Interactively Manage Your Node.js Versions（交互式管理你的 Node.js 版本）

这里我演示管理工具：n

- n 是 TJ 方便 node 的版本管理，专门开发的；
- 官方介绍是：n - Interactively Manage Your Node.js Versions（交互式管理你的 Node.js 版本）

安装 n：直接使用 npm 安装即可

```js
# 安装工具n
npm install -g n
# 查看安装的版本
n --version
```

安装最新的 lts 版本：

- 前面添加的 sudo 是权限问题；
- 可以两个版本都安装，之后我们可以通过 n 快速在两个版本间切换；

```js
# 安装最新的lts版本
n lts

# 安装最新的版本
n latest
```

![图片](https://beelz.oss-cn-beijing.aliyuncs.com/blog/imgs/a8.png)安装 lts 版本

查看所有的版本，并且选择要使用的版本：

- 可以上下选择想使用的版本

```js
# 查看所有的版本
n
```

![图片](https://beelz.oss-cn-beijing.aliyuncs.com/blog/imgs/b1.png)查看和选择所有的版本

查看当前 Node 的版本：

<!-- ![图片]()查看当前的版本 -->

问题：这两个工具都不支持 window

- n：n is not supported natively on Windows.
- nvm：nvm does not support Windows

### 2.5.window 中使用 nvm

**1.安装**

1. 安装 num-windows 安装包https://github.com/coreybutler/nvm-windows/releases

**2.使用**

1. 查看当前安装过的 node 版本：`nvm list`
2. 查看可用的 node 版本：`nvm list avilable`
3. 安装指定版本：`nvm install 版本号`
4. 安装最新版：`nvm install latest`
5. 安装最新的 lts 版本：`nvm install lts`
6. 使用指定版本：`nvm use 版本号`
7. 卸载指定版本：`nvm uninstall 版本号`

**3.设置淘宝镜像**

1. `nvm node_mirror https://npm.taobao.org/mirror/node/`
2. `nvm npm_mirror https://npm.taobao.org/mirror/npm/`

## 03.Node 基础知识

### 2.1.Node 执行代码

如果我们编写一个 js 文件，里面存放 JavaScript 代码，如何来执行它呢？

```js
// 1.直接打印一段文字
console.log("我是一段JavaScript代码");

// 2.定义一个函数, 调用这个函数
function sum(num1, num2) {
  return num1 + num2;
}

const result = sum(20, 30);
console.log("计算结果:", result);

// 3.执行定时器代码
setTimeout(() => {
  console.log("2s后执行的代码");
}, 2000);
```

目前我们知道有两种方式可以执行：

- 将代码交给浏览器执行；
- 将代码载入到 node 环境中执行；

**演练一：浏览器执行**

如果我们希望把代码交给浏览器执行：

- 需要通过让浏览器加载、解析 html 代码，所以我们需要创建一个 html 文件；
- 在 html 中通过 script 标签，引入 js 文件；
- 当浏览器遇到 script 标签时，就会根据 src 加载、执行 JavaScript 代码；

index.html 文件：

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <script src="./index.js"></script>
  </body>
</html>
```

![图片](https://beelz.oss-cn-beijing.aliyuncs.com/blog/imgs/b2.png)浏览器执行结果

**演练二：Node 执行**

如果我们希望把 js 文件交给 node 执行：

- 首先电脑上需要安装 Node.js 环境，安装过程中会自动配置环境变量；
- 可以通过终端命令`node js文件`的方式来载入和执行对应的 js 文件；

```js
node index.js
```

![图片](https://beelz.oss-cn-beijing.aliyuncs.com/blog/imgs/b3.png)

Node 执行结果

### 2.2.Node 的 REPL

什么是 REPL 呢？感觉挺高大上

- **REPL**是**Read-Eval-Print Loop**的简称，翻译为**“读取-求值-输出”循环**；
- REPL 是一个简单的，交互式的编程环境；

事实上，我们浏览器的 console 就可以看成一个 REPL：

![图片](https://beelz.oss-cn-beijing.aliyuncs.com/blog/imgs/b4.png)浏览器控制台

Node 也给我们提供了一个 REPL 环境，我们可以在其中演练简单的代码：

![图片](https://beelz.oss-cn-beijing.aliyuncs.com/blog/imgs/b5.png)REPL 演练

### 2.3.Node 输入输出

#### 2.3.1.给 node 程序传递参数

正常情况下执行一个 node 程序，直接跟上我们对应的文件即可：

```js
node index.js
```

但是，在某些情况下执行 node 程序的过程中，我们可能希望给 node 传递一些参数：

```js
node index.js env=development coderwhy
```

如果我们这样来使用程序，就意味着我们需要在程序中获取到传递的参数：

- 获取参数其实是在`process`的内置对象中的；

如果我们直接打印这个内置对象，它里面包含特别的信息：

- 其他的一些信息，比如版本、操作系统等大家可以自行查看，后面用到一些其他的我们还会提到；

![图片](https://beelz.oss-cn-beijing.aliyuncs.com/blog/imgs/b6.png)process 对象

现在，我们先找到其中的 argv 属性：

- 我们发现它是一个数组，里面包含了我们需要的参数；
- 你可能有个疑问，为什么叫 argv 呢？

![图片](https://beelz.oss-cn-beijing.aliyuncs.com/blog/imgs/b7.png)argv 属性

在 C/C++程序中的 main 函数中，实际上可以获取到两个参数：

- argc：argument counter 的缩写，传递参数的个数；

- argv：argument vector 的缩写，传入的具体参数。

- - vector 翻译过来是矢量的意思，在程序中表示的是一种数据结构。
  - 在 C++、Java 中都有这种数据结构，是一种数组结构；
  - 在 JavaScript 中也是一个数组，里面存储一些参数信息；

我们可以在代码中，将这些参数信息遍历出来，使用：

```js
// 获取参数
console.log(process.argv);
process.argv.forEach((item) => {
  console.log(item);
});

// 结果如下：
// /usr/local/bin/node
// /Users/coderwhy/Desktop/Node/TestCode/04_learn_node/02_给Node传递参数/index.js
// ENV=dev
// coderwhy
```

#### 2.3.2.node 程序输出内容

**console.log**

最常用的输入内容的方式：console.log

```js
console.log("hello coderwhy");
```

**console.clear**

清空控制台：console.clear

```js
console.clear;
```

**console.trace**

打印函数的调用栈：console.trace

```js
function test() {
  demo();
}

function demo() {
  foo();
}

function foo() {
  console.trace();
}

test();
```

![图片](https://beelz.oss-cn-beijing.aliyuncs.com/blog/imgs/b8.png)console.trace 结果

还有一些其他的方法，其他的一些 console 方法，可以自己在下面学习研究一下。

![图片](https://beelz.oss-cn-beijing.aliyuncs.com/blog/imgs/c1.png)

### 2.4.全局对象

#### 2.4.1.常见全局对象

Node 中给我们提供了一些全局对象，方便我们进行一些操作：

- 这些全局对象，我们并不需要从一开始全部一个个学习；
- 某些全局对象并不常用，某些全局对象我们会在后续学习中讲到；
- 比如 module、exports、require()会在模块化中讲到；
- 比如 Buffer 后续会专门讲到；

![图片](https://beelz.oss-cn-beijing.aliyuncs.com/blog/imgs/c2.png)

**process 对象**

process 提供了 Node 进程中相关的信息：

- 比如 Node 的运行环境、参数信息等；
- 后面在项目中，我也会讲解，如何将一些环境变量读取到 `process` 的 `env` 中；

```js
console.log(process);
```

**console 对象**

提供了简单的调试控制台，在前面讲解输入内容时已经学习过了。

- 更加详细的查看官网文档：https://nodejs.org/api/console.html

**定时器函数**

在 Node 中使用定时器有好几种方式：

- `setTimeout(callback, delay[, ...args])`：`callback`在`delay`毫秒后执行一次；

- `setInterval(callback, delay[, ...args])`：`callback`每`delay`毫秒重复执行一次；

- `setImmediate(callback[, ...args])`：`callback`I / O 事件后的回调的“立即”执行；

- - 这里先不展开讨论它和`setTimeout(callback, 0)`之间的区别；
  - 因为它涉及到事件循环的阶段问题，我会在后续详细讲解事件循环相关的知识；

- `process.nextTick(callback[, ...args])`：添加到下一次 tick 队列中；

- - 具体的讲解，也放到事件循环中说明；

代码演练：

- 暂时不用关心执行顺序问题，在后续事件循环中我会讲到；

```js
setTimeout(() => {
  console.log("setTimtout");
}, 1000);

setInterval(() => {
  console.log("setInterval");
}, 1000);

setImmediate(() => {
  console.log("setImmediate");
});

process.nextTick(() => {
  console.log("process.nextTick");
});
```

当然，它们有对应的取消定时器的方法：

- clearTimeout(timeoutObject);
- clearInterval(intervalObject);
- clearImmediate(immediateObject)

**global 对象**

global 是一个全局对象，事实上前端我们提到的 process、console、setTimeout 等都有被放到 global 中：

```js
console.log(process);
console.log(global.process);
```

为什么结果是一样的呢？

![图片](https://beelz.oss-cn-beijing.aliyuncs.com/blog/imgs/c3.png)Node 的源码

global 中还有哪些属性呢？

![图片](https://beelz.oss-cn-beijing.aliyuncs.com/blog/imgs/c4.png)global 其他属性的查看

**window 和 global 的区别是什么？**

在浏览器中，全局变量都是在 window 上的，比如有 document、setInterval、setTimeout、alert、console 等等

在 Node 中，我们也有一个 global 属性，并且看起来它里面有很多其他对象。

但是在浏览器中执行的 JavaScript 代码，如果我们在顶级范围内通过 var 定义的一个属性，默认会被添加到 window 对象上：

```js
var name = "coderwhy";
console.log(window.name); // coderwhy
```

但是在 node 中，我们通过 var 定义一个变量，它只是在当前模块中有一个变量，不会放到全局中：

```js
var name = "coderwhy";
console.log(global.name); // undefined
```

#### 2.4.2.特殊的全局对象

为什么我称之为特殊的全局对象呢？

- 这些全局对象可以在模块中任意使用，但是在命令行交互中是不可以使用的；
- 包括：**dirname、**filename、exports、module、require()

**\_\_dirname**

获取当前文件所在的路径：

- 注意：不包括后面的文件名

```js
console.log(__dirname);

// /Users/coderwhy/Desktop/Node/TestCode/04_learn_node/03_常见的全局变量
```

**\_\_filename**

获取当前文件所在的路径和文件名称：

- 注意：包括后面的文件名称

```js
console.log(__filename);
// /Users/coderwhy/Desktop/Node/TestCode/04_learn_node/03_常见的全局变量/global对象.js
```

## 04.彻底掌握前端模块化

### 4.1. 什么是模块化开发

#### 4.1.1 JavaScript 设计缺陷

那么，到底什么是模块化开发呢？

- 事实上模块化开发最终的目的是将程序划分成一个个小的结构；
- 这个结构中编写属于自己的逻辑代码，有自己的作用域，不会影响到其他的结构；
- 这个结构可以将自己希望暴露的变量、函数、对象等导出给其结构使用；
- 也可以通过某种方式，导入另外结构中的变量、函数、对象等；

**上面说提到的结构，就是模块；**

**按照这种结构划分开发程序的过程，就是模块化开发的过程；**

无论你多么喜欢 JavaScript，以及它现在发展的有多好，我们都需要承认在*Brendan Eich*用了 10 天写出 JavaScript 的时候，它都有很多的缺陷：

- 比如 var 定义的变量作用域问题；
- 比如 JavaScript 的面向对象并不能像常规面向对象语言一样使用 class；
- 比如 JavaScript 没有模块化的问题；

*Brendan Eich*本人也多次承认过 JavaScript 设计之初的缺陷，但是随着 JavaScript 的发展以及标准化，存在的缺陷问题基本都得到了完善。

- JavaScript 目前已经得到了快速的发展，无论是 web、移动端、小程序端、服务器端、桌面应用都被广泛的使用；

在网页开发的早期，*Brendan Eich*开发 JavaScript 仅仅作为一种脚本语言，做一些简单的表单验证或动画实现等，那个时候代码还是很少的：

- 这个时候我们只需要讲 JavaScript 代码写到 script 标签中即可；
- 并没有必要放到多个文件中来编写；

```html
<button id="btn">按钮</button>

<script>
  document.getElementById("btn").onclick = function () {
    console.log("按钮被点击了");
  };
</script>
```

但是随着前端和 JavaScript 的快速发展，JavaScript 代码变得越来越复杂了：

- ajax 的出现，前后端开发分离，意味着后端返回数据后，我们需要通过 JavaScript 进行前端页面的渲染；
- SPA 的出现，前端页面变得更加复杂：包括前端路由、状态管理等等一系列复杂的需求需要通过 JavaScript 来实现；
- 包括 Node 的实现，JavaScript 编写复杂的后端程序，没有模块化是致命的硬伤；

所以，模块化已经是 JavaScript 一个非常迫切的需求：

- 但是 JavaScript 本身，直到 ES6（2015）才推出了自己的模块化方案；
- 在此之前，为了让 JavaScript 支持模块化，涌现出了很多不同的模块化规范：AMD、CMD、CommonJS 等；

在这个章节，我们将详细学习 JavaScript 的模块化，尤其是 CommonJS 和 ES6 的模块化。

### 4.2. 没有模块化的问题

我们先来简单体会一下没有模块化代码的问题。

我们知道，对于一个大型的前端项目，通常是多人开发的（即使一个人开发，也会将代码划分到多个文件夹中）：

- 我们假设有两个人：小明和小丽同时在开发一个项目，并且会将自己的 JavaScript 代码放在一个单独的 js 文件中。

小明开发了 aaa.js 文件，代码如下（当然真实代码会复杂的多）：

```js
var flag = true;

if (flag) {
  console.log("aaa的flag为true");
}
```

小丽开发了 bbb.js 文件，代码如下：

```js
var flag = false;

if (!flag) {
  console.log("bbb使用了flag为false");
}
```

很明显出现了一个问题：

- 大家都喜欢使用 flag 来存储一个 boolean 类型的值；
- 但是一个人赋值了 true，一个人赋值了 false；
- 如果之后都不再使用，那么也没有关系；

但是，小明又开发了 ccc.js 文件：

```js
if (flag) {
  console.log("使用了aaa的flag");
}
```

问题来了：小明发现 ccc 中的 flag 值不对

- 对于聪明的你，当然一眼就看出来，是小丽将 flag 赋值为了 false；
- 但是如果每个文件都有上千甚至更多的代码，而且有上百个文件，你可以一眼看出来 flag 在哪个地方被修改了吗？

备注：引用路径如下：

```html
<script src="./aaa.js"></script>
<script src="./bbb.js"></script>
<script src="./ccc.js"></script>
```

所以，没有模块化对于一个大型项目来说是灾难性的。

**当然，我们有办法可以解决上面的问题：立即函数调用表达式（IIFE）**

- **IIFE** (Immediately Invoked Function Expression)

aaa.js

```js
const moduleA = (function () {
  var flag = true;

  if (flag) {
    console.log("aaa的flag为true");
  }

  return {
    flag: flag,
  };
})();
```

bbb.js

```js
const moduleB = (function () {
  var flag = false;

  if (!flag) {
    console.log("bbb使用了flag为false");
  }
})();
```

ccc.js

```js
const moduleC = (function () {
  const flag = moduleA.flag;
  if (flag) {
    console.log("使用了aaa的flag");
  }
})();
```

命名冲突的问题，有没有解决呢？解决了。

但是，我们其实带来了新的问题：

- 第一，我必须记得每一个模块中返回对象的命名，才能在其他模块使用过程中正确的使用；
- 第二，代码写起来混乱不堪，每个文件中的代码都需要包裹在一个匿名函数中来编写；
- 第三，在没有合适的规范情况下，每个人、每个公司都可能会任意命名、甚至出现模块名称相同的情况；

**所以，我们会发现，虽然实现了模块化，但是我们的实现过于简单，并且是没有规范的。**

- 我们需要制定一定的规范来约束每个人都按照这个规范去编写模块化的代码；
- 这个规范中应该包括核心功能：模块本身可以导出暴露的属性，模块又可以导入自己需要的属性；

JavaScript 社区为了解决上面的问题，涌现出一系列好用的规范，接下来我们就学习具有代表性的一些规范。

### 4.3. CommonJS 规范

#### 4.3.1. CommonJS 和 Node

我们需要知道 CommonJS 是一个规范，最初提出来是在浏览器意外的地方使用，并且当时被命名为**ServerJS**，后来为了体现它的广泛性，修改为**CommonJS**，平时我们也会简称为 CJS。

- Node 是 CommonJS 在服务器端一个具有代表性的实现；
- Browserify 是 CommonJS 在浏览器中的一种实现；
- webpack 打包工具具备对 CommonJS 的支持和转换（后面我会讲到）；

所以，Node 中对 CommonJS 进行了支持和实现，让我们在开发 node 的过程中可以方便的进行模块化开发：

- 在 Node 中每一个 js 文件都是一个单独的模块；
- 这个模块中包括 CommonJS 规范的核心变量：exports、module.exports、require；
- 我们可以使用这些变量来方便的进行模块化开发；

前面我们提到过模块化的核心是导出和导入，Node 中对其进行了实现：

- exports 和 module.exports 可以负责对模块中的内容进行导出；
- require 函数可以帮助我们导入其他模块（自定义模块、系统模块、第三方库模块）中的内容；

#### 4.3.2. Node 模块化开发

我们来看一下两个文件：

bar.js

```js
const name = "coderwhy";
const age = 18;

function sayHello(name) {
  console.log("Hello " + name);
}
```

main.js

```js
console.log(name);
console.log(age);

sayHello("kobe");
```

上面的代码会报错：

- 在 node 中每一个文件都是一个独立的模块，有自己的作用域；
- 那么，就意味着别的模块 main 中不能随便访问另外一个模块 bar 中的内容；
- bar 需要导出自己想要暴露的变量、函数、对象等等；
- main 从 bar 中导入自己想要使用的变量、函数、对象等等；

![图片](https://beelz.oss-cn-beijing.aliyuncs.com/blog/imgs/c5.png)导出和导入

##### 1. exports 导出

**强调：exports 是一个对象，我们可以在这个对象中添加很多个属性，添加的属性会导出**

bar.js 中导出内容：

```js
exports.name = name;
exports.age = age;
exports.sayHello = sayHello;
```

main.js 中导入内容：

```js
const bar = require("./bar");
```

上面这行代码意味着什么呢？

- 意味着 main 中的 bar 变量等于 exports 对象；

```js
main中的bar = bar中的exports;
```

所以，我可以编写下面的代码：

```js
const bar = require("./bar");

const name = bar.name;
const age = bar.age;
const sayHello = bar.sayHello;

console.log(name);
console.log(age);

sayHello("kobe");
```

![图片](https://beelz.oss-cn-beijing.aliyuncs.com/blog/imgs/c7.png)模块之间的引用关系

为了进一步论证，bar 和 exports 是同一个对象：

- 所以，bar 对象是 exports 对象的浅拷贝；
- 浅拷贝的本质就是一种引用的赋值而已；

![图片](https://beelz.oss-cn-beijing.aliyuncs.com/blog/imgs/c8.png)定时器修改对象

##### 2.module.exports

但是 Node 中我们经常导出东西的时候，又是通过 module.exports 导出的：

- module.exports 和 exports 有什么关系或者区别呢？

我们追根溯源，通过维基百科中对 CommonJS 规范的解析：

- CommonJS 中是没有 module.exports 的概念的；
- 但是为了实现模块的导出，Node 中使用的是 Module 的类，每一个模块都是 Module 的一个实例，也就是 module；
- 所以在 Node 中真正用于导出的其实根本不是 exports，而是 module.exports；
- 因为 module 才是导出的真正实现者；

但是，为什么 exports 也可以导出呢？

- 这是因为 module 对象的 exports 属性是 exports 对象的一个引用；
- 也就是说 `module.exports = exports = main中的bar`；

![图片](https://beelz.oss-cn-beijing.aliyuncs.com/blog/imgs/c9.png)image-20201011163653515

注意：真正导出的模块内容的核心其实是 module.exports，只是为了实现 CommonJS 的规范，刚好 module.exports 对 exports 对象有一个引用而已；

那么，如果我的代码这样修改了：

![图片](https://beelz.oss-cn-beijing.aliyuncs.com/blog/imgs/d1.png)image-20201011164006266

你能猜到内存中会有怎么样的表现吗？

- 结论：和 exports 对象没有任何关系了，exports 你随便玩自己的吧；
- module.exports 我现在导出一个自己的对象，不带着你玩了；
- 新的对象取代了 exports 对象的导出，那么就意味着 require 导入的对象是新的对象；

![图片](https://beelz.oss-cn-beijing.aliyuncs.com/blog/imgs/d2.png)image-20201011164223607

##### 3. require 细节

我们现在已经知道，require 是一个函数，可以帮助我们引入一个文件（模块）中导入的对象。

那么，require 的查找规则是怎么样的呢？

- https://nodejs.org/dist/latest-v14.x/docs/api/modules.html#modules_all_together

**这里我总结比较常见的查找规则：**

导入格式如下：require(X)

- 情况一：X 是一个核心模块，比如 path、http

- - 直接返回核心模块，并且停止查找

- 情况二：X 是以 `./` 或 `../` 或 `/`（根目录）开头的

- - 查找目录下面的 index 文件
  - 1> 查找 X/index.js 文件
  - 2> 查找 X/index.json 文件
  - 3> 查找 X/index.node 文件
  - 1.如果有后缀名，按照后缀名的格式查找对应的文件
  - 2.如果没有后缀名，会按照如下顺序：
  - 1> 直接查找文件 X
  - 2> 查找 X.js 文件
  - 3> 查找 X.json 文件
  - 4> 查找 X.node 文件
  - 第一步：将 X 当做一个文件在对应的目录下查找；
  - 第二步：没有找到对应的文件，将 X 作为一个目录
  - 如果没有找到，那么报错：`not found`

- 情况三：直接是一个 X（没有路径），并且 X 不是一个核心模块

- - 比如 `/Users/coderwhy/Desktop/Node/TestCode/04_learn_node/05_javascript-module/02_commonjs/main.js`中编写 `require('why')`
  - ![图片](https://beelz.oss-cn-beijing.aliyuncs.com/blog/imgs/d3.png)查找顺序
  - 如果上面的路径中都没有找到，那么报错：`not found`

##### 4. 模块加载顺序

这里我们研究一下模块的加载顺序问题。

**结论一：模块在被第一次引入时，模块中的 js 代码会被运行一次**

aaa.js

```js
const name = "coderwhy";

console.log("Hello aaa");

setTimeout(() => {
  console.log("setTimeout");
}, 1000);
```

main.js

```js
const aaa = require("./aaa");
```

aaa.js 中的代码在引入时会被运行一次

**结论二：模块被多次引入时，会缓存，最终只加载（运行）一次**

main.js

```js
const aaa = require("./aaa");
const bbb = require("./bbb");
```

aaa.js

```js
const ccc = require("./ccc");
```

bbb.js

```js
const ccc = require("./ccc");
```

ccc.js

```js
console.log("ccc被加载");
```

ccc 中的代码只会运行一次。

**为什么只会加载运行一次呢？**

- 这是因为每个模块对象 module 都有一个属性：loaded。
- 为 false 表示还没有加载，为 true 表示已经加载；

**结论三：如果有循环引入，那么加载顺序是什么？**

如果出现下面模块的引用关系，那么加载顺序是什么呢？

- 这个其实是一种数据结构：图结构；
- 图结构在遍历的过程中，有深度优先搜索（DFS, depth first search）和广度优先搜索（BFS, breadth first search）；
- Node 采用的是深度优先算法：main -> aaa -> ccc -> ddd -> eee ->bbb

![图片](https://beelz.oss-cn-beijing.aliyuncs.com/blog/imgs/d4.png)多个模块的引入关系

#### 4.3.3. Node 的源码解析

Module 类

![图片](https://beelz.oss-cn-beijing.aliyuncs.com/blog/imgs/d5.png)Module 类

Module.prototype.require 函数

![图片](https://beelz.oss-cn-beijing.aliyuncs.com/blog/imgs/d6.png)require 函数

Module.\_load 函数

![图片](https://beelz.oss-cn-beijing.aliyuncs.com/blog/imgs/d7.png)\_load 函数的实现

### 4.4. AMD 和 CMD 规范

#### 4.4.1. CommonJS 规范缺点

CommonJS 加载模块是同步的：

- 同步的意味着只有等到对应的模块加载完毕，当前模块中的内容才能被运行；
- 这个在服务器不会有什么问题，因为服务器加载的 js 文件都是本地文件，加载速度非常快；

如果将它应用于浏览器呢？

- 浏览器加载 js 文件需要先从服务器将文件下载下来，之后在加载运行；
- 那么采用同步的就意味着后续的 js 代码都无法正常运行，即使是一些简单的 DOM 操作；

所以在浏览器中，我们通常不使用 CommonJS 规范：

- 当然在 webpack 中使用 CommonJS 是另外一回事；
- 因为它会将我们的代码转成浏览器可以直接执行的代码；

在早期为了可以在浏览器中使用模块化，通常会采用 AMD 或 CMD：

- 但是目前一方面现代的浏览器已经支持 ES Modules，另一方面借助于 webpack 等工具可以实现对 CommonJS 或者 ES Module 代码的转换；
- AMD 和 CMD 已经使用非常少了，所以这里我们进行简单的演练；

#### 4.4.2. AMD 规范

AMD 主要是应用于浏览器的一种模块化规范：

- AMD 是 Asynchronous Module Definition（异步模块定义）的缩写；
- 它采用的是异步加载模块；
- 事实上 AMD 的规范还要早于 CommonJS，但是 CommonJS 目前依然在被使用，而 AMD 使用的较少了；

我们提到过，规范只是定义代码的应该如何去编写，只有有了具体的实现才能被应用：

- AMD 实现的比较常用的库是 require.js 和 curl.js；

**这里我们以 require.js 为例讲解：**

第一步：下载 require.js

- 下载地址：https://github.com/requirejs/requirejs
- 找到其中的 require.js 文件；

第二步：定义 HTML 的 script 标签引入 require.js 和定义入口文件：

- data-main 属性的作用是在加载完 src 的文件后会加载执行该文件

```js
<script src="./lib/require.js" data-main="./index.js"></script>
```

第三步：编写如下目录和代码

```js
├── index.html
├── index.js
├── lib
│   └── require.js
└── modules
    ├── bar.js
    └── foo.js
```

index.js

```js
(function () {
  require.config({
    baseUrl: "",
    paths: {
      foo: "./modules/foo",
      bar: "./modules/bar",
    },
  });

  // 开始加载执行foo模块的代码
  require(["foo"], function (foo) {});
})();
```

modules/bar.js

- 如果一个模块不依赖其他，那么直接使用 define(function)即可

```js
define(function () {
  const name = "coderwhy";
  const age = 18;
  const sayHello = function (name) {
    console.log("Hello " + name);
  };

  return {
    name,
    age,
    sayHello,
  };
});
```

modules/foo.js

```js
define(["bar"], function (bar) {
  console.log(bar.name);
  console.log(bar.age);
  bar.sayHello("kobe");
});
```

#### 4.4.3. CMD 规范

CMD 规范也是应用于浏览器的一种模块化规范：

- CMD 是 Common Module Definition（通用模块定义）的缩写；
- 它也采用了异步加载模块，但是它将 CommonJS 的优点吸收了过来；
- 但是目前 CMD 使用也非常少了；

CMD 也有自己比较优秀的实现方案：

- SeaJS

**我们一起看一下 SeaJS 如何使用：**

第一步：下载 SeaJS

- 下载地址：https://github.com/seajs/seajs
- 找到 dist 文件夹下的 sea.js

第二步：引入 sea.js 和使用主入口文件

- `seajs`是指定主入口文件的

```js
<script src="./lib/sea.js"></script>
<script>
  seajs.use('./index.js');
</script>
```

第三步：编写如下目录和代码

```js
├── index.html
├── index.js
├── lib
│   └── sea.js
└── modules
    ├── bar.js
    └── foo.js
```

index.js

```js
define(function (require, exports, module) {
  const foo = require("./modules/foo");
});
```

bar.js

```js
define(function (require, exports, module) {
  const name = "lilei";
  const age = 20;
  const sayHello = function (name) {
    console.log("你好 " + name);
  };

  module.exports = {
    name,
    age,
    sayHello,
  };
});
```

foo.js

```js
define(function (require, exports, module) {
  const bar = require("./bar");

  console.log(bar.name);
  console.log(bar.age);
  bar.sayHello("韩梅梅");
});
```

### 4.5. ES Module

#### 4.5.1. 认识 ES Module

JavaScript 没有模块化一直是它的痛点，所以才会产生我们前面学习的社区规范：CommonJS、AMD、CMD 等，所以在 ES 推出自己的模块化系统时，大家也是兴奋异常。

ES Module 和 CommonJS 的模块化有一些不同之处：

- 一方面它使用了 import 和 export 关键字；
- 另一方面它采用编译期静态类型检测，并且动态引用的方式；

ES Module 模块采用 export 和 import 关键字来实现模块化：

- export 负责将模块内的内容导出；
- import 负责从其他模块导入内容；

了解：采用 ES Module 将自动采用严格模式：`use strict`

- 如果你不熟悉严格模式可以简单看一下 MDN 上的解析；
- https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Strict_mode

#### 4.5.2. ES Module 的使用

##### 1.代码结构组件

这里我在浏览器中演示 ES6 的模块化开发：

代码结构如下：

```js
├── index.html
├── main.js
└── modules
    └── foo.js
```

index.html 中引入两个 js 文件作为模块：

```html
<script src="./modules/foo.js" type="module"></script>
<script src="main.js" type="module"></script>
```

如果直接在浏览器中运行代码，会报如下错误：

![图片](https://beelz.oss-cn-beijing.aliyuncs.com/blog/imgs/d8.png)模块化运行

这个在 MDN 上面有给出解释：

- https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Modules
- 你需要注意本地测试 — 如果你通过本地加载 Html 文件 (比如一个 `file://` 路径的文件), 你将会遇到 CORS 错误，因为 Javascript 模块安全性需要。
- 你需要通过一个服务器来测试。

我这里使用的 VSCode，VSCode 中有一个插件：Live Server

- 通过插件运行，可以将我们的代码运行在一个本地服务中；

![图片](https://beelz.oss-cn-beijing.aliyuncs.com/blog/imgs/d9.png)image-20201012153439900

#### 4.5.3. export 关键字

export 关键字将一个模块中的变量、函数、类等导出；

foo.js 文件中默认代码如下：

```js
const name = "coderwhy";
const age = 18;
let message = "my name is why";

function sayHello(name) {
  console.log("Hello " + name);
}
```

**我们希望将其他中内容全部导出，它可以有如下的方式：**

方式一：在语句声明的前面直接加上 export 关键字

```js
export const name = "coderwhy";
export const age = 18;
export let message = "my name is why";

export function sayHello(name) {
  console.log("Hello " + name);
}
```

方式二：将所有需要导出的标识符，放到 export 后面的 `{}`中

- 注意：这里的 `{}`里面不是 ES6 的对象字面量的增强写法，`{}`也不是表示一个对象的；
- 所以：`export {name: name}`，是错误的写法；

```js
const name = "coderwhy";
const age = 18;
let message = "my name is why";

function sayHello(name) {
  console.log("Hello " + name);
}

export { name, age, message, sayHello };
```

方式三：导出时给`标识符`起一个别名

```js
export {
  name as fName,
  age as fAge,
  message as fMessage,
  sayHello as fSayHello,
};
```

#### 4.5.4. import 关键字

import 关键字负责从另外一个模块中导入内容

**导入内容的方式也有多种：**

方式一：`import {标识符列表} from '模块'`；

- 注意：这里的`{}`也不是一个对象，里面只是存放导入的标识符列表内容；

```js
import { name, age, message, sayHello } from "./modules/foo.js";

console.log(name);
console.log(message);
console.log(age);
sayHello("Kobe");
```

方式二：导入时给标识符起别名

```js
import {
  name as wName,
  age as wAge,
  message as wMessage,
  sayHello as wSayHello,
} from "./modules/foo.js";
```

方式三：将模块功能放到一个模块功能对象（a module object）上

```js
import * as foo from "./modules/foo.js";

console.log(foo.name);
console.log(foo.message);
console.log(foo.age);
foo.sayHello("Kobe");
```

#### 4.5.5. export 和 import 结合

如果从一个模块中导入的内容，我们希望再直接导出出去，这个时候可以直接使用 export 来导出。

bar.js 中导出一个 sum 函数：

```js
export const sum = function (num1, num2) {
  return num1 + num2;
};
```

foo.js 中导入，但是只是做一个中转：

```js
export { sum } from "./bar.js";
```

main.js 直接从 foo 中导入：

```js
import { sum } from "./modules/foo.js";
console.log(sum(20, 30));
```

甚至在 foo.js 中导出时，我们可以变化它的名字

```js
export { sum as barSum } from "./bar.js";
```

为什么要这样做呢？

- 在开发和封装一个功能库时，通常我们希望将暴露的所有接口放到一个文件中；
- 这样方便指定统一的接口规范，也方便阅读；
- 这个时候，我们就可以使用 export 和 import 结合使用；

#### 4.5.6. default 用法

前面我们学习的导出功能都是有名字的导出（named exports）：

- 在导出 export 时指定了名字；
- 在导入 import 时需要知道具体的名字；

还有一种导出叫做默认导出（default export）

- 默认导出 export 时可以不需要指定名字；
- 在导入时不需要使用 `{}`，并且可以自己来指定名字；
- 它也方便我们和现有的 CommonJS 等规范相互操作；

导出格式如下：

```js
export default function sub(num1, num2) {
  return num1 - num2;
}
```

导入格式如下：

```js
import sub from "./modules/foo.js";

console.log(sub(20, 30));
```

注意：在一个模块中，只能有一个默认导出（default export）；

#### 4.5.7. import()

通过 import 加载一个模块，是不可以在其放到逻辑代码中的，比如：

```js
if (true) {
  import sub from "./modules/foo.js";
}
```

为什么会出现这个情况呢？

- 这是因为 ES Module 在被 JS 引擎解析时，就必须知道它的依赖关系；
- 由于这个时候 js 代码没有任何的运行，所以无法在进行类似于 if 判断中根据代码的执行情况；
- 甚至下面的这种写法也是错误的：因为我们必须到运行时能确定 path 的值；

```js
const path = './modules/foo.js';

import sub from path;
```

但是某些情况下，我们确确实实希望动态的来加载某一个模块：

- 如果根据不懂的条件，动态来选择加载模块的路径；
- 这个时候我们需要使用 `import()` 函数来动态加载；

aaa.js 模块：

```js
export function aaa() {
  console.log("aaa被打印");
}
```

bbb.js 模块：

```js
export function bbb() {
  console.log("bbb被执行");
}
```

main.js 模块：

```js
let flag = true;
if (flag) {
  import("./modules/aaa.js").then((aaa) => {
    aaa.aaa();
  });
} else {
  import("./modules/bbb.js").then((bbb) => {
    bbb.bbb();
  });
}
```

### 4.3. ES Module 的原理

#### 4.3.1. ES Module 和 CommonJS 的区别

**CommonJS 模块加载 js 文件的过程是运行时加载的，并且是同步的：**

- 运行时加载意味着是 js 引擎在执行 js 代码的过程中加载 模块；
- 同步的就意味着一个文件没有加载结束之前，后面的代码都不会执行；

```js
console.log("main代码执行");

const flag = true;
if (flag) {
  // 同步加载foo文件，并且执行一次内部的代码
  const foo = require("./foo");
  console.log("if语句继续执行");
}
```

**CommonJS 通过 module.exports 导出的是一个对象：**

- 导出的是一个对象意味着可以将这个对象的引用在其他模块中赋值给其他变量；
- 但是最终他们指向的都是同一个对象，那么一个变量修改了对象的属性，所有的地方都会被修改；

**ES Module 加载 js 文件的过程是编译（解析）时加载的，并且是异步的：**

- 编译时（解析）时加载，意味着 import 不能和运行时相关的内容放在一起使用：

- - 比如 from 后面的路径需要动态获取；
  - 比如不能将 import 放到 if 等语句的代码块中；
  - 所以我们有时候也称 ES Module 是静态解析的，而不是动态或者运行时解析的；

- 异步的意味着：JS 引擎在遇到`import`时会去获取这个 js 文件，但是这个获取的过程是异步的，并不会阻塞主线程继续执行；

- - 也就是说设置了 `type=module` 的代码，相当于在 script 标签上也加上了 `async` 属性；
  - 如果我们后面有普通的 script 标签以及对应的代码，那么 ES Module 对应的 js 文件和代码不会阻塞它们的执行；

```js
<script src="main.js" type="module"></script>
<!-- 这个js文件的代码不会被阻塞执行 -->
<script src="index.js"></script>
```

**ES Module 通过 export 导出的是变量本身的引用：**

- export 在导出一个变量时，js 引擎会解析这个语法，并且创建**模块环境记录**（module environment record）；
- **模块环境记录**会和变量进行 `绑定`（binding），并且这个绑定是实时的；
- 而在导入的地方，我们是可以实时的获取到绑定的最新值的；

![图片](https://beelz.oss-cn-beijing.aliyuncs.com/blog/imgs/e1.png)export 和 import 绑定的过程

**所以我们下面的代码是成立的：**

bar.js 文件中修改

```js
let name = "coderwhy";

setTimeout(() => {
  name = "湖人总冠军";
}, 1000);

setTimeout(() => {
  console.log(name);
}, 2000);

export { name };
```

main.js 文件中获取

```js
import { name } from "./modules/bar.js";

console.log(name);

// bar中修改, main中验证
setTimeout(() => {
  console.log(name);
}, 2000);
```

但是，下面的代码是不成立的：main.js 中修改

```js
import { name } from "./modules/bar.js";

console.log(name);

// main中修改, bar中验证
setTimeout(() => {
  name = "kobe";
}, 1000);
```

![图片](https://beelz.oss-cn-beijing.aliyuncs.com/blog/imgs/e2.png)导入的变量不可以被修改

思考：如果 bar.js 中导出的是一个对象，那么 main.js 中是否可以修改对象中的属性呢？

- 答案是可以的，因为他们指向同一块内存空间；（自己编写代码验证，这里不再给出）

#### 4.3.2. Node 中支持 ES Module

**在 Current 版本中**

在最新的 Current 版本（v14.13.1）中，支持 es module 我们需要进行如下操作：

- 方式一：在 package.json 中配置 `type: module`（后续再学习，我们现在还没有讲到 package.json 文件的作用）
- 方式二：文件以 `.mjs` 结尾，表示使用的是 ES Module；

这里我们暂时选择以 `.mjs` 结尾的方式来演练：

bar.mjs

```js
const name = "coderwhy";

export { name };
```

main.mjs

```js
import { name } from "./modules/bar.mjs";

console.log(name);
```

**在 LTS 版本中**

在最新的 LST 版本（v12.19.0）中，我们也是可以正常运行的，但是会报一个警告：

![图片](https://beelz.oss-cn-beijing.aliyuncs.com/blog/imgs/e3.png)lts 版本的警告

#### 4.3.3. ES Module 和 CommonJS 的交互

**CommonJS 加载 ES Module**

结论：通常情况下，CommonJS 不能加载 ES Module

- 因为 CommonJS 是同步加载的，但是 ES Module 必须经过静态分析等，无法在这个时候执行 JavaScript 代码；
- 但是这个并非绝对的，某些平台在实现的时候可以对代码进行针对性的解析，也可能会支持；
- Node 当中是不支持的；

**ES Module 加载 CommonJS**

结论：多数情况下，ES Module 可以加载 CommonJS

- ES Module 在加载 CommonJS 时，会将其 module.exports 导出的内容作为 default 导出方式来使用；
- 这个依然需要看具体的实现，比如 webpack 中是支持的、Node 最新的 Current 版本也是支持的；
- 但是在最新的 LTS 版本中就不支持；

foo.js

```js
const address = "foo的address";

module.exports = {
  address,
};
```

main.js

```js
import foo from "./modules/foo.js";
console.log(foo.address);
```

## 05.常见的内置模块

### 5.1. 内置模块 path

#### 5.1.1. 认识 path 模块

path 模块用于对路径和文件进行处理，提供了很多好用的方法。

并且我们知道在 Mac OS、Linux 和 window 上的路径是不一样的

- window 上会使用 `\`或者 `\\` 来作为文件路径的分隔符，当然目前也支持 `/`；
- 在 Mac OS、Linux 的 Unix 操作系统上使用 `/` 来作为文件路径的分隔符；

那么如果我们在 window 上使用 `\` 来作为分隔符开发了一个应用程序，要部署到 Linux 上面应该怎么办呢？

- 显示路径会出现一些问题；
- 所以为了屏蔽他们之间的差异，在开发中对于路径的操作我们可以使用 `path` 模块；

#### 5.1.2. path 常见的 API

**从路径中获取信息**

- dirname：获取文件的父文件夹；
- basename：获取文件名；
- extname：获取文件扩展名；

```js
const path = require("path");

const myPath = "/Users/coderwhy/Desktop/Node/课堂/PPT/01_邂逅Node.pdf";

const dirname = path.dirname(myPath);
const basename = path.basename(myPath);
const extname = path.extname(myPath);

console.log(dirname); // /Users/coderwhy/Desktop/Node/课堂/PPT
console.log(basename); // 01_邂逅Node.pdf
console.log(extname); // .pdf
```

**路径的拼接**

- 如果我们希望将多个路径进行拼接，但是不同的操作系统可能使用的是不同的分隔符；
- 这个时候我们可以使用`path.join`函数；

```js
console.log(path.join("/user", "why", "abc.txt"));
```

**将文件和某个文件夹拼接**

- 如果我们希望将某个文件和文件夹拼接，可以使用 `path.resolve`;

- - `resolve`函数会判断我们拼接的路径前面是否有 `/`或`../`或`./`；
  - 如果有表示是一个绝对路径，会返回对应的拼接路径；
  - 如果没有，那么会和当前执行文件所在的文件夹进行路径的拼接

```js
path.resolve("abc.txt"); // /Users/coderwhy/Desktop/Node/TestCode/04_learn_node/06_常见的内置模块/02_文件路径/abc.txt
path.resolve("/abc.txt"); // /abc.txt
path.resolve("/User/why", "abc.txt"); // /User/why/abc.txt
path.resolve("User/why", "abc.txt"); // /Users/coderwhy/Desktop/Node/TestCode/04_learn_node/06_常见的内置模块/02_文件路径/User/why/abc.txt
```

resolve 其实我们在 webpack 中也会使用：

```js
const CracoLessPlugin = require("craco-less");
const path = require("path");

const resolve = (dir) => path.resolve(__dirname, dir);

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { "@primary-color": "#1DA57A" },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
  webpack: {
    alias: {
      "@": resolve("src"),
      components: resolve("src/components"),
    },
  },
};
```

### 5.2. 内置模块 fs

#### 5.2.1. 认识 fs 模块

fs 是 File System 的缩写，表示文件系统。

对于任何一个为服务器端服务的语言或者框架通常都会有自己的文件系统：

- 因为服务器需要将各种数据、文件等放置到不同的地方；
- 比如用户数据可能大多数是放到数据库中的（后面我们也会学习）；
- 比如某些配置文件或者用户资源（图片、音视频）都是以文件的形式存在于操作系统上的；

Node 也有自己的文件系统操作模块，就是 fs：

- 借助于 Node 帮我们封装的文件系统，我们可以在任何的操作系统（window、Mac OS、Linux）上面直接去操作文件；
- 这也是 Node 可以开发服务器的一大原因，也是它可以成为前端自动化脚本等热门工具的原因；

Node 文件系统的 API 非常的多：https://nodejs.org/dist/latest-v14.x/docs/api/fs.html

- 我们不可能，也没必要一个个去学习；
- 这个更多的应该是作为一个 API 查询的手册，等用到的时候查询即可；
- 学习阶段我们只需要学习最常用的即可；

但是这些 API 大多数都提供三种操作方式：

- 方式一：同步操作文件：代码会被阻塞，不会继续执行；
- 方式二：异步回调函数操作文件：代码不会被阻塞，需要传入回调函数，当获取到结果时，回调函数被执行；
- 方式三：异步 Promise 操作文件：代码不会被阻塞，通过 `fs.promises` 调用方法操作，会返回一个 Promise，可以通过 then、catch 进行处理；

**我们这里以获取一个文件的状态为例：**

- 注意：都需要引入 `fs` 模块；

方式一：同步操作文件

```js
// 1.方式一: 同步读取文件
const state = fs.statSync("../foo.txt");
console.log(state);

console.log("后续代码执行");
```

方式二：异步回调函数操作文件

```js
// 2.方式二: 异步读取
fs.stat("../foo.txt", (err, state) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log(state);
});
console.log("后续代码执行");
```

方式三：异步 Promise 操作文件

```js
// 3.方式三: Promise方式
fs.promises
  .stat("../foo.txt")
  .then((state) => {
    console.log(state);
  })
  .catch((err) => {
    console.log(err);
  });
console.log("后续代码执行");
```

后续代码演练中，我将以异步回调的方式演练：相对更通用一些；

#### 5.2.2. 文件描述符

文件描述符（File descriptors）是什么呢？

在 POSIX 系统上，对于每个进程，内核都维护着一张当前打开着的文件和资源的表格。

- 每个打开的文件都分配了一个称为文件描述符的简单的数字标识符。
- 在系统层，所有文件系统操作都使用这些文件描述符来标识和跟踪每个特定的文件。
- Windows 系统使用了一个虽然不同但概念上类似的机制来跟踪资源。
- 为了简化用户的工作，Node.js 抽象出操作系统之间的特定差异，并为所有打开的文件分配一个数字型的文件描述符。

`fs.open()` 方法用于分配新的文件描述符。一旦被分配，则文件描述符可用于从文件读取数据、向文件写入数据、或请求关于文件的信息。

```js
// 获取文件描述符
fs.open("../foo.txt", "r", (err, fd) => {
  console.log(fd);

  fs.fstat(fd, (err, state) => {
    console.log(state);
  });
});
```

#### 5.2.3.文件的读写

如果我们希望对文件的内容进行操作，这个时候可以使用文件的读写：

- `fs.readFile(path[, options], callback)`：读取文件的内容；
- `fs.writeFile(file, data[, options], callback)`：在文件中写入内容；

文件写入：

```js
fs.writeFile("../foo.txt", content, {}, (err) => {
  console.log(err);
});
```

在上面的代码中，你会发现有一个大括号没有填写任何的内容，这个是写入时填写的 option 参数：

- flag：写入的方式。
- encoding：字符的编码；

我们先来看 flag：

- flag 的值有很多：https://nodejs.org/dist/latest-v14.x/docs/api/fs.html#fs_file_system_flags

- - `w` 打开文件写入，默认值；
  - `w+`打开文件进行读写，如果不存在则创建文件；
  - `r+` 打开文件进行读写，如果不存在那么抛出异常；
  - `r`打开文件读取，读取时的默认值；
  - `a`打开要写入的文件，将流放在文件末尾。如果不存在则创建文件；
  - `a+`打开文件以进行读写，将流放在文件末尾。如果不存在则创建文件

我们再来看看编码：

- 我之前在简书上写过一篇关于字符编码的文章：https://www.jianshu.com/p/899e749be47c
- 目前基本用的都是 UTF-8 编码；

文件读取：

- 如果不填写 encoding，返回的结果是 Buffer；

```js
fs.readFile("../foo.txt", { encoding: "utf-8" }, (err, data) => {
  console.log(data);
});
```

文件读取：

```js
const fs = require("fs");

fs.readFile("../foo.txt", { encoding: "utf-8" }, (err, data) => {
  console.log(data);
});
```

#### 5.2.3.文件夹操作

**新建一个文件夹**

使用`fs.mkdir()`或`fs.mkdirSync()`创建一个新文件夹：

```js
const fs = require("fs");

const dirname = "../why";

if (!fs.existsSync(dirname)) {
  fs.mkdir(dirname, (err) => {
    console.log(err);
  });
}
```

**获取文件夹的内容**

```js
// 读取文件夹
function readFolders(folder) {
  fs.readdir(folder, { withFileTypes: true }, (err, files) => {
    files.forEach((file) => {
      if (file.isDirectory()) {
        const newFolder = path.resolve(dirname, file.name);
        readFolders(newFolder);
      } else {
        console.log(file.name);
      }
    });
  });
}

readFolders(dirname);
```

**文件重命名**

```js
fs.rename("../why", "../coder", (err) => {
  console.log(err);
});
```

### 5.3. 内置模块 events

#### 5.3.1. 基本使用

Node 中的核心 API 都是基于异步事件驱动的：

- 在这个体系中，某些对象（发射器（Emitters））发出某一个事件；
- 我们可以监听这个事件（监听器 Listeners），并且传入的回调函数，这个回调函数会在监听到事件时调用；

发出事件和监听事件都是通过 EventEmitter 类来完成的，它们都属于 events 对象。

- `emitter.on(eventName, listener)`：监听事件，也可以使用`addListener`；
- `emitter.off(eventName, listener)`：移除事件监听，也可以使用`removeListener`；
- `emitter.emit(eventName[, ...args])`：发出事件，可以携带一些参数；

```js
const EventEmmiter = require("events");

// 监听事件
const bus = new EventEmmiter();

function clickHanlde(args) {
  console.log("监听到click事件", args);
}

bus.on("click", clickHanlde);

setTimeout(() => {
  bus.emit("click", "coderwhy");
  bus.off("click", clickHanlde);
  bus.emit("click", "kobe");
}, 2000);
```

#### 5.3.1. 常见的属性

EventEmitter 的实例有一些属性，可以记录一些信息：

- `emitter.eventNames()`：返回当前 `EventEmitter对象`注册的事件字符串数组；
- `emitter.getMaxListeners()`：返回当前 `EventEmitter对象`的最大监听器数量，可以通过`setMaxListeners()`来修改，默认是 10；
- `emitter.listenerCount(事件名称)`：返回当前 `EventEmitter对象`某一个事件名称，监听器的个数；
- `emitter.listeners(事件名称)`：返回当前 `EventEmitter对象`某个事件监听器上所有的监听器数组；

```js
console.log(bus.eventNames());
console.log(bus.getMaxListeners());
console.log(bus.listenerCount("click"));
console.log(bus.listeners("click"));
```

#### 5.3.1. 方法的补充

`emitter.once(eventName, listener)`：事件监听一次

```js
const EventEmitter = require("events");

const emitter = new EventEmitter();

emitter.once("click", (args) => {
  console.log("监听到事件", args);
});

setTimeout(() => {
  emitter.emit("click", "coderwhy");
  emitter.emit("click", "coderwhy");
}, 2000);
```

`emitter.prependListener()`：将监听事件添加到最前面

```js
emitter.on("click", (args) => {
  console.log("a监听到事件", args);
});

// b监听事件会被放到前面
emitter.prependListener("click", (args) => {
  console.log("b监听到事件", args);
});
```

`emitter.prependOnceListener()`：将监听事件添加到最前面，但是只监听一次

```js
emitter.prependOnceListener("click", (args) => {
  console.log("c监听到事件", args);
});
```

`emitter.removeAllListeners([eventName])`：移除所有的监听器

```js
// 移除emitter上的所有事件监听
emitter.removeAllListeners();
// 移除emitter上的click事件监听
emitter.removeAllListeners("click");
```

## 06.npm 你不知道的细节

### 6.1. 包管理工具

#### 6.1.1. 认识 npm

我们已经学习了在 JavaScript 中可以通过模块化的方式将代码划分成一个个小的结构：

- 在以后的开发中我们就可以通过模块化的方式来封装自己的代码，并且封装成一个工具；
- 这个工具我们可以让同事通过导入的方式来使用，甚至你可以分享给世界各地的程序员来使用；

**如果我们分享给世界上所有的程序员使用，有哪些方式呢？**

方式一：上传到 GitHub 上、其他程序员通过 GitHub 下载我们的代码手动的引用；

- 缺点是大家必须知道你的代码 GitHub 的地址，并且从 GitHub 上手动下载；
- 需要在自己的项目中手动的引用，并且管理相关的依赖；
- 不需要使用的时候，需要手动来删除相关的依赖；
- 当遇到版本升级或者切换时，需要重复上面的操作；

显然，上面的方式是有效的，但是这种传统的方式非常麻烦，并且容易出错；

方式二：使用一个专业的工具来管理我们的代码

- 我们通过工具将代码发布到特定的位置；
- 其他程序员直接通过工具来安装、升级、删除我们的工具代码；

显然，通过第二种方式我们可以更好的管理自己的工具包，其他人也可以更好的使用我们的工具包。

包管理工具 npm：

- Node Package Manager，也就是 Node 包管理器；
- 但是目前已经不仅仅是 Node 包管理器了，在前端项目中我们也在使用它来管理依赖的包；
- 比如 express、koa、react、react-dom、axios、babel、webpack 等等；

npm 管理的包可以在哪里查看、搜索呢？

- https://www.npmjs.com/
- 这是我们安装相关的 npm 包的官网；

npm 管理的包存放在哪里呢？

- 我们发布自己的包其实是发布到 registry 上面的；
- 当我们安装一个包时其实是从 registry 上面下载的包；

#### 6.1.2. 项目配置文件

事实上，我们每一个项目都会有一个对应的配置文件，无论是前端项目还是后端项目：

- 这个配置文件会记录着你项目的名称、版本号、项目描述等；
- 也会记录着你项目所依赖的其他库的信息和依赖库的版本号；

这个配置文件在 Node 环境下面（无论是前端还是后端）就是 package.json。

我们以 vue cli4 脚手架创建的项目为例：

```json
{
  "name": "my-vue",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "serve": "vue-cli-service serve",
    "build": "vue-cli-service build",
    "lint": "vue-cli-service lint"
  },
  "dependencies": {
    "core-js": "^3.6.5",
    "vue": "^2.6.11"
  },
  "devDependencies": {
    "@vue/cli-plugin-babel": "~4.5.0",
    "@vue/cli-plugin-eslint": "~4.5.0",
    "@vue/cli-service": "~4.5.0",
    "babel-eslint": "^10.1.0",
    "eslint": "^6.7.2",
    "eslint-plugin-vue": "^6.2.2",
    "vue-template-compiler": "^2.6.11"
  },
  "browserslist": ["> 1%", "last 2 versions", "not dead"]
}
```

事实上 Vue ClI4 脚手架创建的项目相对进行了简化，我们来看一下 CLI2 创建的项目：

```json
{
  "name": "vuerouterbasic",
  "version": "1.0.0",
  "description": "A Vue.js project",
  "author": "'coderwhy' <'coderwhy@gmail.com'>",
  "private": true,
  "scripts": {
    "dev": "webpack-dev-server --inline --progress --config build/webpack.dev.conf.js",
    "start": "npm run dev",
    "build": "node build/build.js"
  },
  "dependencies": {
    "vue": "^2.5.2",
    "vue-router": "^3.0.1"
  },
  "devDependencies": {
    "autoprefixer": "^7.1.2",
    "babel-core": "^6.22.1",
    "babel-helper-vue-jsx-merge-props": "^2.0.3",
    "babel-loader": "^7.1.1",
    "babel-plugin-syntax-jsx": "^6.18.0",
    "babel-plugin-transform-runtime": "^6.22.0",
    "babel-plugin-transform-vue-jsx": "^3.5.0",
    "babel-preset-env": "^1.3.2",
    "babel-preset-stage-2": "^6.22.0",
    "chalk": "^2.0.1",
    "copy-webpack-plugin": "^4.0.1",
    "css-loader": "^0.28.0",
    "extract-text-webpack-plugin": "^3.0.0",
    "file-loader": "^1.1.4",
    "friendly-errors-webpack-plugin": "^1.6.1",
    "html-webpack-plugin": "^2.30.1",
    "node-notifier": "^5.1.2",
    "optimize-css-assets-webpack-plugin": "^3.2.0",
    "ora": "^1.2.0",
    "portfinder": "^1.0.13",
    "postcss-import": "^11.0.0",
    "postcss-loader": "^2.0.8",
    "postcss-url": "^7.2.1",
    "rimraf": "^2.6.0",
    "semver": "^5.3.0",
    "shelljs": "^0.7.6",
    "uglifyjs-webpack-plugin": "^1.1.1",
    "url-loader": "^0.5.8",
    "vue-loader": "^13.3.0",
    "vue-style-loader": "^3.0.1",
    "vue-template-compiler": "^2.5.2",
    "webpack": "^3.6.0",
    "webpack-bundle-analyzer": "^2.9.0",
    "webpack-dev-server": "^2.9.1",
    "webpack-merge": "^4.1.0"
  },
  "engines": {
    "node": ">= 6.0.0",
    "npm": ">= 3.0.0"
  },
  "browserslist": ["> 1%", "last 2 versions", "not ie <= 8"]
}
```

我们也可以手动创建一个 package.json 文件：

```js
npm init #创建时填写信息
npm init -y # 所有信息使用默认的
```

`npm init -y`生成文件的效果：

```json
{
  "name": "learn-npm",
  "version": "1.0.0",
  "description": "",
  "main": "main.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}
```

我们会发现属性非常的多，我们这里对一些常见属性进行一些解析。

**必须填写的属性：name、version**

- name 是项目的名称；
- version 是当前项目的版本号；
- description 是描述信息，很多时候是作为项目的基本描述；
- author 是作者相关信息（发布时用到）；
- license 是开源协议（发布时用到）；

**private 属性：**

- private 属性记录当前的项目是否是私有的；
- 当值为 true 时，npm 是不能发布它的，这是防止私有项目或模块发布出去的方式；

**main 属性：**

- 设置程序的入口。

- 很多人会有疑惑，webpack 不是会自动找到程序的入口吗？

- - 这个入口和 webpack 打包的入口并不冲突；
  - 它是在你发布一个模块的时候会用到的；
  - 比如我们使用 axios 模块 `const axios = require('axios');`
  - 实际上是找到对应的 main 属性查找文件的；

![图片](https://beelz.oss-cn-beijing.aliyuncs.com/blog/imgs/e4.png)axios 的入口

**scripts 属性**

- scripts 属性用于配置一些脚本命令，以键值对的形式存在；

- 配置后我们可以通过 `npm run 命令的key`来执行这个命令；

- `npm start`和`npm run start`的区别是什么？

- - 它们是等价的；
  - 对于常用的 start、 test、stop、restart 可以省略掉 run 直接通过 `npm start`等方式运行；

**dependencies 属性**

- dependencies 属性是指定无论开发环境还是生成环境都需要依赖的包；
- 通常是我们项目实际开发用到的一些库模块；
- 与之对应的是 devDependencies；

**devDependencies 属性**

- 一些包在生成环境是不需要的，比如 webpack、babel 等；
- 这个时候我们会通过 `npm install webpack --save-dev`，将它安装到 devDependencies 属性中；

疑问：那么在生成环境如何保证不安装这些包呢？

- 生成环境不需要安装时，我们需要通过 `npm install --production` 来安装文件的依赖；

**版本管理的问题**

我们会发现安装的依赖版本出现：`^2.0.3`或`~2.0.3`，这是什么意思呢？

npm 的包通常需要遵从 semver 版本规范：

- semver：https://semver.org/lang/zh-CN/
- npm semver：https://docs.npmjs.com/misc/semver

semver 版本规范是 X.Y.Z：

- X 主版本号（major）：当你做了不兼容的 API 修改（可能不兼容之前的版本）；
- Y 次版本号（minor）：当你做了向下兼容的功能性新增（新功能增加，但是兼容之前的版本）；
- Z 修订号（patch）：当你做了向下兼容的问题修正（没有新功能，修复了之前版本的 bug）；

我们这里解释一下 ^和~的区别：

- `^x.y.z`：表示 x 是保持不变的，y 和 z 永远安装最新的版本；
- `~x.y.z`：表示 x 和 y 保持不变的，z 永远安装最新的版本；

**engines 属性**

- engines 属性用于指定 Node 和 NPM 的版本号；
- 在安装的过程中，会先检查对应的引擎版本，如果不符合就会报错；
- 事实上也可以指定所在的操作系统 `"os" : [ "darwin", "linux" ]`，只是很少用到；

**browserslist 属性**

- 用于配置打包后的 JavaScript 浏览器的兼容情况，参考；
- 否则我们需要手动的添加 polyfills 来让支持某些语法；
- 也就是说它是为 webpack 等打包工具服务的一个属性（这里不是详细讲解 webpack 等工具的工作原理，所以不再给出详情）；

### 6.2. npm 工具解析

#### 6.2.1. npm install 命令

安装 npm 包分两种情况：

- 全局安装（global install）：`npm install yarn -g`;
- 项目（局部）安装（local install）：`npm install`

**全局安装**

全局安装是直接将某个包安装到全局：

比如 yarn 的全局安装：

```js
npm install yarn -g
```

但是很多人对全局安装有一些误会：

- 通常使用 npm 全局安装的包都是一些工具包：yarn、webpack 等；
- 并不是类似于 axios、express、koa 等库文件；
- 所以全局安装了之后并不能让我们在所有的项目中使用 axios 等库；

**项目安装**

项目安装会在当前目录下生产一个 `node_modules` 文件夹，我们之前讲解 require 查找顺序时有讲解过这个包在什么情况下被查找；

局部安装分为开发时依赖和生产时依赖：

```js
# 安装开发和生产依赖
npm install axios --save
npm install axios -S
npm install axios
npm i axios

# 开发者
npm install axios --save-dev
npm install axios -D
npm i axios -D
```

#### 6.2.2. npm install 原理

很多同学之情应该已经会了 `npm install `，但是你是否思考过它的内部原理呢？

- 执行 `npm install`它背后帮助我们完成了什么操作？
- 我们会发现还有一个成为 package-lock.json 的文件，它的作用是什么？
- 从 npm5 开始，npm 支持缓存策略（来自 yarn 的压力），缓存有什么作用呢？

这是一幅我画出的根据 `npm install` 的原理图：

- npm install 会检测是有 package-lock.json 文件：

- - 检测 lock 中包的版本是否和 package.json 中一致（会按照 semver 版本规范检测）；
  - 一致的情况下，会去优先查找缓存
  - 查找到，会获取缓存中的压缩文件，并且将压缩文件解压到 node_modules 文件夹中；
  - 不一致，那么会重新构建依赖关系，直接会走顶层的流程；
  - 没有找到，会从 registry 仓库下载，直接走顶层流程；
  - 分析依赖关系，这是因为我们可能包会依赖其他的包，并且多个包之间会产生相同依赖的情况；
  - 从 registry 仓库中下载压缩包（如果我们设置了镜像，那么会从镜像服务器下载压缩包）；
  - 获取到压缩包后会对压缩包进行缓存（从 npm5 开始有的）；
  - 将压缩包解压到项目的 node_modules 文件夹中（前面我们讲过，require 的查找顺序会在该包下面查找）
  - 没有 lock 文件
  - 有 lock 文件

![图片](https://beelz.oss-cn-beijing.aliyuncs.com/blog/imgs/e5.png)npm install 原理图

package-lock.json 文件：

```json
{
  "name": "learn-npm",
  "version": "1.0.0",
  "lockfileVersion": 1,
  "requires": true,
  "dependencies": {
    "axios": {
      "version": "0.20.0",
      "resolved": "https://registry.npmjs.org/axios/-/axios-0.20.0.tgz",
      "integrity": "sha512-ANA4rr2BDcmmAQLOKft2fufrtuvlqR+cXNNinUmvfeSNCOF98PZL+7M/v1zIdGo7OLjEA9J2gXJL+j4zGsl0bA==",
      "requires": {
        "follow-redirects": "^1.10.0"
      }
    },
    "follow-redirects": {
      "version": "1.13.0",
      "resolved": "https://registry.npmjs.org/follow-redirects/-/follow-redirects-1.13.0.tgz",
      "integrity": "sha512-aq6gF1BEKje4a9i9+5jimNFIpq4Q1WiwBToeRK5NvZBd/TRsmW8BsJfOEGkr76TbOyPVD3OVDN910EcUNtRYEA=="
    }
  }
}
```

package-lock.json 文件解析：

- name：项目的名称；

- version：项目的版本；

- lockfileVersion：lock 文件的版本；

- requires：使用 requires 来跟着模块的依赖关系；

- dependencies：项目的依赖

- - version 表示实际安装的 axios 的版本；
  - resolved 用来记录下载的地址，registry 仓库中的位置；
  - requires 记录当前模块的依赖；
  - integrity 用来从缓存中获取索引，再通过索引去获取压缩包文件；
  - 当前项目依赖 axios，但是 axios 依赖 follow-redireacts；
  - axios 中的属性如下：

#### 6.2.3. 其他 npm 命令

我们这里再介绍几个比较常用的：

卸载某个依赖包：

```js
npm uninstall package
npm uninstall package --save-dev
npm uninstall package -D
```

强制重新 build

```js
npm rebuild
```

清除缓存

```js
npm cache clean
```

npm 的命令其实是非常多的：

- https://docs.npmjs.com/cli-documentation/cli
- 更多的命令，可以根据需要查阅官方文档

#### 6.2.4. yarn 和 cnpm

另一个 node 包管理工具 yarn：

- yarn 是由 Facebook、Google、Exponent 和 Tilde 联合推出了一个新的 JS 包管理工具；
- yarn 是为了弥补 npm 的一些缺陷而出现的；
- 早期的 npm 存在很多的缺陷，比如安装依赖速度很慢、版本依赖混乱等等一系列的问题；
- 虽然从 npm5 版本开始，进行了很多的升级和改进，但是依然很多人喜欢使用 yarn；

这里给出一张常用命令的对比

<!-- ![img](https://beelz.oss-cn-beijing.aliyuncs.com/blog/imgs/e4.png)npm 和 yarn 常用命令对比 -->

**补充：cnpm**

由于一些特殊的原因，某些情况下我们没办法很好的从 `https://registry.npmjs.org`下载下来一些需要的包。

查看 npm 镜像：

```js
npm config get registry # npm config get registry
```

我们可以直接设置 npm 的镜像：

```js
npm config set registry https://registry.npm.taobao.org
```

但是对于大多数人来说（比如我），并不希望将 npm 镜像修改了：

- 第一，不太希望随意修改 npm 原本从官方下来包的渠道；
- 第二，担心某天淘宝的镜像挂了或者不维护了，又要改来改去；

这个时候，我们可以使用 cnpm，并且将 cnpm 设置为淘宝的镜像：

```js
npm install -g cnpm --registry=https://registry.npm.taobao.org
cnpm config get registry # https://r.npm.taobao.org/
```

**补充：npx**

npx 是 npm5.2 之后自带的一个命令。

npx 的作用非常多，但是比较常见的是使用它来调用项目中的某个模块的指令。

我们以 webpack 为例：

- 全局安装的是 webpack5.1.3
- 项目安装的是 webpack3.6.0

如果我在终端执行 `webpack --version`使用的是哪一个命令呢？

- 显示结果会是 `webpack 5.1.3`，事实上使用的是全局的，为什么呢？
- 原因非常简单，在当前目录下找不到 webpack 时，就会去全局找，并且执行命令；

那么如何使用项目（局部）的 webpack，常见的是两种方式：

- 方式一：明确查找到 node_module 下面的 webpack
- 方式二：在 `scripts`定义脚本，来执行 webpack；

方式一：在终端中使用如下命令（在项目根目录下）

```
./node_modules/.bin/webpack --version
```

方式二：修改 package.json 中的 scripts

```json
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "webpack": "webpack --version"
  },
```

终端中执行：

```
npm run webpack
```

但是这两种方式都有一点点麻烦，更好的办法是直接使用 npx：

```
npx webpack --version
```

npx 的原理非常简单，它会到当前目录的 node_modules/.bin 目录下查找对应的命令；

#### 6.2.5.nrm

nrm 是 npm 的镜像源管理工具，很多使用我们使用 npm 下载国外的源文件速度太慢，可以使用 nrm 快速地在 npm 镜像源之间进行切换。

```
npm install -g nrm
```

```js
nrm ls // 查看可选源
nrm test taobao // 测试源响应时间
nrm use taobeo // 切换源
nrm add imooc https://xxx // 增加定制源
nrm del imooc // 删除定制源

```

## 07.Buffer 的使用

### 7.1. 认识 Buffer

#### 7.1.1. 数据的二进制

计算机中所有的内容：文字、数字、图片、音频、视频最终都会使用二进制来表示。

JavaScript 可以直接去处理非常直观的数据：比如字符串，我们通常展示给用户的也是这些内容。

不对啊，JavaScript 不是也可以处理图片吗？

- 事实上在网页端，图片我们一直是交给浏览器来处理的；
- JavaScript 或者 HTML，只是负责告诉浏览器一个图片的地址；
- 浏览器负责获取这个图片，并且最终将这个图片渲染出来；

但是对于服务器来说是不一样的：

- 服务器要处理的本地文件类型相对较多;
- 比如某一个保存文本的文件并不是使用 `utf-8`进行编码的，而是用 `GBK`，那么我们必须读取到他们的二进制数据，再通过 GKB 转换成对应的文字；
- 比如我们需要读取的是一张图片数据（二进制），再通过某些手段对图片数据进行二次的处理（裁剪、格式转换、旋转、添加滤镜），Node 中有一个 Sharp 的库，就是读取图片或者传入图片的 Buffer 对其再进行处理；
- 比如在 Node 中通过 TCP 建立长连接，TCP 传输的是字节流，我们需要将数据转成字节再进行传入，并且需要知道传输字节的大小（客服端需要根据大小来判断读取多少内容）；

我们会发现，对于前端开发来说，通常很少会和二进制打交道，但是对于服务器端为了做很多的功能，我们必须直接去操作其二进制的数据；

所以 Node 为了可以方便开发者完成更多功能，提供给了我们一个类 Buffer，并且它是全局的。

#### 7.1.2. Buffer 和二进制

我们前面说过，Buffer 中存储的是二进制数据，那么到底是如何存储呢？

- 我们可以将 Buffer 看成是一个存储二进制的数组；
- 这个数组中的每一项，可以保存 8 位二进制：`00000000`

为什么是 8 位呢？

- 在计算机中，很少的情况我们会直接操作一位二进制，因为一位二进制存储的数据是非常有限的；
- 所以通常会将 8 位合在一起作为一个单元，这个单元称之为一个字节（byte）；
- 也就是说 `1byte = 8bit`，`1kb=1024byte`，`1M=1024kb`;
- 比如很多编程语言中的 int 类型是 4 个字节，long 类型是 8 个字节；
- 比如 TCP 传输的是字节流，在写入和读取时都需要说明字节的个数；
- 比如 RGB 的值分别都是 255，所以本质上在计算机中都是用一个字节存储的；

也就是说，Buffer 相当于是一个字节的数组，数组中的每一项对于一个字节的大小：

如果我们希望将一个字符串放入到 Buffer 中，是怎么样的过程呢？

```js
const buffer01 = new Buffer("why");

console.log(buffer01);
```

![img](data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWNgYGBgAAAABQABh6FO1AAAAABJRU5ErkJggg==)字符串存储 buffer 的过程

当然目前已经不希望我们这样来做了：

![img](data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWNgYGBgAAAABQABh6FO1AAAAABJRU5ErkJggg==)VSCode 的警告

那么我们可以通过另外一个创建方法：

```js
const buffer2 = Buffer.from("why");
console.log(buffer2);
```

如果是中文呢？

```js
const buffer3 = Buffer.from("王红元");
console.log(buffer3);
// <Buffer e7 8e 8b e7 ba a2 e5 85 83>
const str = buffer3.toString();
console.log(str);
// 王红元
```

如果编码和解码不同：

```js
const buffer3 = Buffer.from("王红元", "utf16le");
console.log(buffer3);

const str = buffer3.toString("utf8");
console.log(str); // �s�~CQ
```

### 7.2. Buffer 其他用法

#### 7.2.1. Buffer 的其他创建

Buffer 的创建方式有很多：

![图片](https://beelz.oss-cn-beijing.aliyuncs.com/blog/imgs/e6.png)buffer 的创建

来看一下`Buffer.alloc`:

- 我们会发现创建了一个 8 位长度的 Buffer，里面所有的数据默认为 00；

```js
const buffer01 = Buffer.alloc(8);

console.log(buffer01); // <Buffer 00 00 00 00 00 00 00 00>
```

我们也可以对其进行操作：

```js
buffer01[0] = "w".charCodeAt();
buffer01[1] = 100;
buffer01[2] = 0x66;
console.log(buffer01);
```

也可以使用相同的方式来获取：

```js
console.log(buffer01[0]);
console.log(buffer01[0].toString(16));
```

#### 7.2.2. Buffer 和文件读取

文本文件的读取：

```js
const fs = require("fs");

fs.readFile("./test.txt", (err, data) => {
  console.log(data); // <Buffer 48 65 6c 6c 6f 20 57 6f 72 6c 64>
  console.log(data.toString()); // Hello World
});
```

图片文件的读取：

```js
fs.readFile("./zznh.jpg", (err, data) => {
  console.log(data); // <Buffer ff d8 ff e0 ... 40418 more bytes>
});
```

图片文件的读取和转换：

- 将读取的某一张图片，转换成一张 200x200 的图片；
- 这里我们可以借助于 `sharp` 库来完成；

```js
const sharp = require("sharp");
const fs = require("fs");

sharp("./test.png")
  .resize(1000, 1000)
  .toBuffer()
  .then((data) => {
    fs.writeFileSync("./test_copy.png", data);
  });
```

### 7.4. Buffer 的内存分配

事实上我们创建 Buffer 时，并不会频繁的向操作系统申请内存，它会默认先申请一个 8 \* 1024 个字节大小的内存，也就是 8kb

- node/lib/buffer.js：135 行

```js
Buffer.poolSize = 8 * 1024;
let poolSize, poolOffset, allocPool;

const encodingsMap = ObjectCreate(null);
for (let i = 0; i < encodings.length; ++i) encodingsMap[encodings[i]] = i;

function createPool() {
  poolSize = Buffer.poolSize;
  allocPool = createUnsafeBuffer(poolSize).buffer;
  markAsUntransferable(allocPool);
  poolOffset = 0;
}
createPool();
```

假如我们调用 Buffer.from 申请 Buffer：

- 这里我们以从字符串创建为例
- node/lib/buffer.js：290 行

```js
Buffer.from = function from(value, encodingOrOffset, length) {
  if (typeof value === "string") return fromString(value, encodingOrOffset);

  // 如果是对象，另外一种处理情况
  // ...
};
```

我们查看 fromString 的调用：

- node/lib/buffer.js：428 行

```js
function fromString(string, encoding) {
  let ops;
  if (typeof encoding !== "string" || encoding.length === 0) {
    if (string.length === 0) return new FastBuffer();
    ops = encodingOps.utf8;
    encoding = undefined;
  } else {
    ops = getEncodingOps(encoding);
    if (ops === undefined) throw new ERR_UNKNOWN_ENCODING(encoding);
    if (string.length === 0) return new FastBuffer();
  }
  return fromStringFast(string, ops);
}
```

接着我们查看 fromStringFast：

- 这里做的事情是判断剩余的长度是否还足够填充这个字符串；
- 如果不足够，那么就要通过 `createPool` 创建新的空间；
- 如果够就直接使用，但是之后要进行 `poolOffset`的偏移变化；
- node/lib/buffer.js：428 行

```js
function fromStringFast(string, ops) {
  const length = ops.byteLength(string);

  if (length >= Buffer.poolSize >>> 1)
    return createFromString(string, ops.encodingVal);

  if (length > poolSize - poolOffset) createPool();
  let b = new FastBuffer(allocPool, poolOffset, length);
  const actual = ops.write(b, string, 0, length);
  if (actual !== length) {
    // byteLength() may overestimate. That's a rare case, though.
    b = new FastBuffer(allocPool, poolOffset, actual);
  }
  poolOffset += actual;
  alignPool();
  return b;
}
```

### 7.4. Stream

#### 7.4.1. 认识 Stream

什么是流呢？

- 我们的第一反应应该是流水，源源不断的流动；
- 程序中的流也是类似的含义，我们可以想象当我们从一个文件中读取数据时，文件的二进制（字节）数据会源源不断的被读取到我们程序中；
- 而这个一连串的字节，就是我们程序中的流；

所以，我们可以这样理解流：

- 是连续字节的一种表现形式和抽象概念；
- 流应该是可读的，也是可写的；

在之前学习文件的读写时，我们可以直接通过 `readFile`或者 `writeFile`方式读写文件，为什么还需要流呢？

- 直接读写文件的方式，虽然简单，但是无法控制一些细节的操作；
- 比如从什么位置开始读、读到什么位置、一次性读取多少个字节；
- 读到某个位置后，暂停读取，某个时刻恢复读取等等；
- 或者这个文件非常大，比如一个视频文件，一次性全部读取并不合适；

事实上 Node 中很多对象是基于流实现的：

- http 模块的 Request 和 Response 对象；
- process.stdout 对象；

官方：另外所有的流都是 EventEmitter 的实例：

我们可以看一下 Node 源码中有这样的操作：

<!-- ![img](data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWNgYGBgAAAABQABh6FO1AAAAABJRU5ErkJggg==) -->

Stream 和 EventEmitter 关系

流（Stream）的分类：

- `Writable`：可以向其写入数据的流（例如 `fs.createWriteStream()`）。
- `Readable`：可以从中读取数据的流（例如 `fs.createReadStream()`）。
- `Duplex`：同时为`Readable`和的流`Writable`（例如 `net.Socket`）。
- `Transform`：`Duplex`可以在写入和读取数据时修改或转换数据的流（例如`zlib.createDeflate()`）。

这里我们通过 fs 的操作，讲解一下 Writable、Readable，另外两个大家可以自行学习一下。

#### 7.4.2. Readable

之前我们读取一个文件的信息：

```js
fs.readFile("./foo.txt", (err, data) => {
  console.log(data);
});
```

这种方式是一次性将一个文件中所有的内容都读取到程序（内存）中，但是这种读取方式就会出现我们之前提到的很多问题：

- 文件过大、读取的位置、结束的位置、一次读取的大小；

这个时候，我们可以使用 `createReadStream`，我们来看几个参数，更多参数可以参考官网：

- start：文件读取开始的位置；
- end：文件读取结束的位置；
- highWaterMark：一次性读取字节的长度，默认是 64kb；

```js
const read = fs.createReadStream("./foo.txt", {
  start: 3,
  end: 8,
  highWaterMark: 4,
});
```

我们如何获取到数据呢？

- 可以通过监听 data 事件，获取读取到的数据；

```js
read.on("data", (data) => {
  console.log(data);
});
```

我们也可以监听其他的事件：

```js
read.on("open", (fd) => {
  console.log("文件被打开");
});

read.on("end", () => {
  console.log("文件读取结束");
});

read.on("close", () => {
  console.log("文件被关闭");
});
```

甚至我们可以在某一个时刻暂停和恢复读取：

```js
read.on("data", (data) => {
  console.log(data);

  read.pause();

  setTimeout(() => {
    read.resume();
  }, 2000);
});
```

#### 7.4.3. Writable

之前我们写入一个文件的方式是这样的：

```js
fs.writeFile("./foo.txt", "内容", (err) => {});
```

这种方式相当于一次性将所有的内容写入到文件中，但是这种方式也有很多问题：

- 比如我们希望一点点写入内容，精确每次写入的位置等；

这个时候，我们可以使用 `createWriteStream`，我们来看几个参数，更多参数可以参考官网：

- flags：默认是`w`，如果我们希望是追加写入，可以使用 `a`或者 `a+`；
- start：写入的位置；

我们进行一次简单的写入

```js
const writer = fs.createWriteStream("./foo.txt", {
  flags: "a+",
  start: 8,
});

writer.write("你好啊", (err) => {
  console.log("写入成功");
});
```

如果我们希望监听一些事件：

```js
writer.on("open", () => {
  console.log("文件打开");
});

writer.on("finish", () => {
  console.log("文件写入结束");
});

writer.on("close", () => {
  console.log("文件关闭");
});
```

我们会发现，我们并不能监听到 `close` 事件：

- 这是因为写入流在打开后是不会自动关闭的；
- 我们必须手动关闭，来告诉 Node 已经写入结束了；
- 并且会发出一个 `finish` 事件的；

```js
writer.close();

writer.on("finish", () => {
  console.log("文件写入结束");
});

writer.on("close", () => {
  console.log("文件关闭");
});
```

另外一个非常常用的方法是 `end`：

- `end`方法相当于做了两步操作：`write`传入的数据和调用`close`方法；

```js
writer.end("Hello World");
```

#### 7.4.4. pipe 方法

正常情况下，我们可以将读取到的 `输入流`，手动的放到 `输出流`中进行写入：

```js
const fs = require("fs");
const { read } = require("fs/promises");

const reader = fs.createReadStream("./foo.txt");
const writer = fs.createWriteStream("./bar.txt");

reader.on("data", (data) => {
  console.log(data);
  writer.write(data, (err) => {
    console.log(err);
  });
});
```

我们也可以通过 pipe 来完成这样的操作：

```js
reader.pipe(writer);

writer.on("close", () => {
  console.log("输出流关闭");
});
```

## 08.深入事件循环

> 事件循环是什么？事实上我把事件循环理解成我们编写的 JavaScript 和浏览器或者 Node 之间的一个桥梁。
>
> 浏览器的事件循环是一个我们编写的 JavaScript 代码和浏览器 API 调用(setTimeout/AJAX/监听事件等)的一个桥梁, 桥梁之间他们通过回调函数进行沟通。
>
> Node 的事件循环是一个我们编写的 JavaScript 代码和系统调用（file system、network 等）之间的一个桥梁, 桥梁之间他们通过回调函数进行沟通的.

### 8.1. 浏览器的事件循环

#### 8.1.1.进程和线程

线程和进程是操作系统中的两个概念：

- 进程（process）：计算机已经运行的程序；
- 线程（thread）：操作系统能够运行运算调度的最小单位；

听起来很抽象，我们直观一点解释：

- 进程：我们可以认为，启动一个应用程序，就会默认启动一个进程（也可能是多个进程）；
- 线程：每一个进程中，都会启动一个线程用来执行程序中的代码，这个线程被称之为主线程；
- 所以我们也可以说进程是线程的容器；

再用一个形象的例子解释：

- 操作系统类似于一个工厂；
- 工厂中里有很多车间，这个车间就是进程；
- 每个车间可能有一个以上的工人在工厂，这个工人就是线程；

![图片](https://beelz.oss-cn-beijing.aliyuncs.com/blog/imgs/e7.png)操作系统、线程、进程

操作系统是如何做到同时让多个进程（边听歌、边写代码、边查阅资料）同时工作呢？

- 这是因为 CPU 的运算速度非常快，它可以快速的在多个进程之间迅速的切换；
- 当我们的进程中的线程获取获取到时间片时，就可以快速执行我们编写的代码；
- 对于用于来说是感受不到这种快速的切换的；

你可以在 Mac 的活动监视器或者 Windows 的资源管理器中查看到很多进程：

![图片](https://beelz.oss-cn-beijing.aliyuncs.com/blog/imgs/e8.png)活动监视器

#### 8.1.2. 浏览器和 JavaScript

我们经常会说 JavaScript 是单线程的，但是 JavaScript 的线程应该有自己的容器进程：浏览器或者 Node。

浏览器是一个进程吗，它里面只有一个线程吗？

- 目前多数的浏览器其实都是多进程的，当我们打开一个 tab 页面时就会开启一个新的进程，这是为了防止一个页面卡死而造成所有页面无法响应，整个浏览器需要强制退出；
- 每个进程中又有很多的线程，其中包括执行 JavaScript 代码的线程；

但是 JavaScript 的代码执行是在一个单独的线程中执行的：

- 这就意味着 JavaScript 的代码，在同一个时刻只能做一件事；
- 如果这件事是非常耗时的，就意味着当前的线程就会被阻塞；

分析下面代码的执行过程：

- 定义变量 name；
- 执行 log 函数，函数会被放入到调用栈中执行；
- 调用 bar()函数，被压入到调用栈中，但是执行未结束；
- bar 因为调用了 sum，sum 函数被压入到调用栈中，获取到结果后出栈；
- bar 获取到结果后出栈，获取到结果 result；
- 将 log 函数压入到调用栈，log 被执行，并且出栈；

```js
const name = "coderwhy";

// 1.将该函数放入到调用栈中被执行
console.log(name);

// 2. 调用栈
function sum(num1, num2) {
  return num1 + num2;
}

function bar() {
  return sum(20, 30);
}

console.log(bar());
```

#### 8.1.3. 浏览器的事件循环

如果在执行 JavaScript 代码的过程中，有异步操作呢？

- 中间我们插入了一个 setTimeout 的函数调用；
- 这个函数被放到入调用栈中，执行会立即结束，并不会阻塞后续代码的执行；

```js
const name = "coderwhy";

// 1.将该函数放入到调用栈中被执行
console.log(name);

// 2.调用栈
function sum(num1, num2) {
  return num1 + num2;
}

function bar() {
  return sum(20, 30);
}

setTimeout(() => {
  console.log("settimeout");
}, 1000);

const result = bar();

console.log(result);
```

那么，传入的一个函数（比如我们称之为 timer 函数），会在什么时候被执行呢？

- 事实上，setTimeout 是调用了 web api，在合适的时机，会将 timer 函数加入到一个事件队列中；
- 事件队列中的函数，会被放入到调用栈中，在调用栈中被执行；

![图片](https://beelz.oss-cn-beijing.aliyuncs.com/blog/imgs/e9.png)浏览器的事件循环

#### 8.1.4. 宏任务和微任务

但是事件循环中并非只维护着一个队列，事实上是有两个队列：

- 宏任务队列（macrotask queue）：ajax、setTimeout、setInterval、DOM 监听、UI Rendering 等
- 微任务队列（microtask queue）：Promise 的 then 回调、 Mutation Observer API、queueMicrotask()等

那么事件循环对于两个队列的优先级是怎么样的呢？

- 1.main script 中的代码优先执行（编写的顶层 script 代码）；

- 2.在执行任何一个宏任务之前（不是队列，是一个宏任务），都会先查看微任务队列中是否有任务需要执行

- - 也就是宏任务执行之前，必须保证微任务队列是空的；
  - 如果不为空，那么就优先执行微任务队列中的任务（回调）；

我们来看一个面试题：执行结果如何？

```js
setTimeout(function () {
  console.log("set1");

  new Promise(function (resolve) {
    resolve();
  }).then(function () {
    new Promise(function (resolve) {
      resolve();
    }).then(function () {
      console.log("then4");
    });
    console.log("then2");
  });
});

new Promise(function (resolve) {
  console.log("pr1");
  resolve();
}).then(function () {
  console.log("then1");
});

setTimeout(function () {
  console.log("set2");
});

console.log(2);

queueMicrotask(() => {
  console.log("queueMicrotask1");
});

new Promise(function (resolve) {
  resolve();
}).then(function () {
  console.log("then3");
});
```

执行结果：

```
pr1
2
then1
queueMicrotask1
then3
set1
then2
then4
set2
```

async、await 是 Promise 的一个语法糖：

- 我们可以将 await 关键字后面执行的代码，看做是包裹在`(resolve, reject) => {函数执行}`中的代码；
- await 的下一条语句，可以看做是`then(res => {函数执行})`中的代码；

今日头条的面试题：

```js
async function async1() {
  console.log("async1 start");
  await async2();
  console.log("async1 end");
}

async function async2() {
  console.log("async2");
}

console.log("script start");

setTimeout(function () {
  console.log("setTimeout");
}, 0);

async1();

new Promise(function (resolve) {
  console.log("promise1");
  resolve();
}).then(function () {
  console.log("promise2");
});

console.log("script end");
```

执行结果如下：

```
script start
async1 start
async2
promise1
script end
async1 end
promise2
setTimeout
```

### 8.2.Node 的事件循环

#### 8.2.1. Node 的事件循环

浏览器中的 EventLoop 是根据 HTML5 定义的规范来实现的，不同的浏览器可能会有不同的实现，而 Node 中是由 libuv 实现的。

我们来看在很早就给大家展示的 Node 架构图：

- 我们会发现 libuv 中主要维护了一个 EventLoop 和 worker threads（线程池）；
- EventLoop 负责调用系统的一些其他操作：文件的 IO、Network、child-processes 等

![图片](https://beelz.oss-cn-beijing.aliyuncs.com/blog/imgs/f1.png)Node 的架构图

libuv 到底是什么呢？

- libuv is a multi-platform support library with a focus on asynchronous I/O. It was primarily developed for use by Node.js, but it's also used by Luvit, Julia, pyuv, and others.
- libuv 是一个多平台的专注于异步 IO 的库，它最初是为 Node 开发的，但是现在也被使用到 Luvit、Julia、pyuv 等其他地方；

libuv 到底帮助我们做了什么事情呢？

- 我们以文件操作为例，来讲解一下它内部的结构；

#### 8.2.2. 阻塞 IO 和非阻塞 IO

如果我们希望在程序中对一个文件进行操作，那么我们就需要打开这个文件：通过文件描述符。

- 我们思考：JavaScript 可以直接对一个文件进行操作吗？
- 看起来是可以的，但是事实上我们任何程序中的文件操作都是需要进行系统调用（操作系统封装了文件系统）；
- 事实上对文件的操作，是一个操作系统的 IO 操作（输入、输出）；

操作系统为我们提供了`阻塞式调用`和`非阻塞式调用`：

- **阻塞式调用：** 调用结果返回之前，当前线程处于阻塞态（阻塞态 CPU 是不会分配时间片的），调用线程只有在得到调用结果之后才会继续执行。
- **非阻塞式调用：** 调用执行之后，当前线程不会停止执行，只需要过一段时间来检查一下有没有结果返回即可。

所以我们开发中的很多耗时操作，都可以基于这样的 `非阻塞式调用`：

- 比如网络请求本身使用了 Socket 通信，而 Socket 本身提供了 select 模型，可以进行`非阻塞方式的工作`；
- 比如文件读写的 IO 操作，我们可以使用操作系统提供的`基于事件的回调机制`；

但是非阻塞 IO 也会存在一定的问题：我们并没有获取到需要读取（我们以读取为例）的结果

- 那么就意味着为了可以知道是否读取到了完整的数据，我们需要频繁的去确定读取到的数据是否是完整的；
- 这个过程我们称之为轮训操作；

那么这个轮训的工作由谁来完成呢？

- 如果我们的主线程频繁的去进行轮训的工作，那么必然会大大降低性能；
- 并且开发中我们可能不只是一个文件的读写，可能是多个文件；
- 而且可能是多个功能：网络的 IO、数据库的 IO、子进程调用；

libuv 提供了一个线程池（Thread Pool）：

- 线程池会负责所有相关的操作，并且会通过轮训等方式等待结果；
- 当获取到结果时，就可以将对应的回调放到事件循环（某一个事件队列）中；
- 事件循环就可以负责接管后续的回调工作，告知 JavaScript 应用程序执行对应的回调函数；

![图片](https://beelz.oss-cn-beijing.aliyuncs.com/blog/imgs/f2.png)Event loop in node.js

阻塞和非阻塞，同步和异步有什么区别？

- 阻塞和非阻塞是对于被调用者来说的；

- - 在我们这里就是系统调用，操作系统为我们提供了阻塞调用和非阻塞调用；

- 同步和异步是对于调用者来说的；

- - 在我们这里就是自己的程序；
  - 如果我们在发起调用之后，不会进行其他任何的操作，只是等待结果，这个过程就称之为同步调用；
  - 如果我们再发起调用之后，并不会等待结果，继续完成其他的工作，等到有回调时再去执行，这个过程就是异步调用；

#### 8.2.3. Node 事件循环的阶段

我们最前面就强调过，事件循环像是一个桥梁，是连接着应用程序的 JavaScript 和系统调用之间的通道：

- 无论是我们的文件 IO、数据库、网络 IO、定时器、子进程，在完成对应的操作后，都会将对应的结果和回调函数放到事件循环（任务队列）中；
- 事件循环会不断的从任务队列中取出对应的事件（回调函数）来执行；

但是一次完整的事件循环 Tick 分成很多个阶段：

- **定时器（Timers）**：本阶段执行已经被 `setTimeout()` 和 `setInterval()` 的调度回调函数。
- **待定回调（Pending Callback）**：对某些系统操作（如 TCP 错误类型）执行回调，比如 TCP 连接时接收到 ECONNREFUSED。
- **idle, prepare**：仅系统内部使用。
- **轮询（Poll）**：检索新的 I/O 事件；执行与 I/O 相关的回调；
- **检测**：`setImmediate()` 回调函数在这里执行。
- **关闭的回调函数**：一些关闭的回调函数，如：`socket.on('close', ...)`。

![图片](https://beelz.oss-cn-beijing.aliyuncs.com/blog/imgs/f3.png)一次 tick 的事件循环阶段

我们会发现从一次事件循环的 Tick 来说，Node 的事件循环更复杂，它也分为微任务和宏任务：

- 宏任务（macrotask）：setTimeout、setInterval、IO 事件、setImmediate、close 事件；
- 微任务（microtask）：Promise 的 then 回调、process.nextTick、queueMicrotask；

但是，Node 中的事件循环不只是 `微任务队列`和 `宏任务队列`：

- 微任务队列：

- - next tick queue：process.nextTick；
  - other queue：Promise 的 then 回调、queueMicrotask；

- 宏任务队列：

- - timer queue：setTimeout、setInterval；
  - poll queue：IO 事件；
  - check queue：setImmediate；
  - close queue：close 事件；

所以，在每一次事件循环的 tick 中，会按照如下顺序来执行代码：

- next tick microtask queue；
- other microtask queue；
- timer queue；
- poll queue；
- check queue；
- close queue；

#### 8.2.4. Node 代码执行面试

面试题一：

```js
async function async1() {
  console.log("async1 start");
  await async2();
  console.log("async1 end");
}

async function async2() {
  console.log("async2");
}

console.log("script start");

setTimeout(function () {
  console.log("setTimeout0");
}, 0);

setTimeout(function () {
  console.log("setTimeout2");
}, 300);

setImmediate(() => console.log("setImmediate"));

process.nextTick(() => console.log("nextTick1"));

async1();

process.nextTick(() => console.log("nextTick2"));

new Promise(function (resolve) {
  console.log("promise1");
  resolve();
  console.log("promise2");
}).then(function () {
  console.log("promise3");
});

console.log("script end");
```

执行结果如下：

```
script start
async1 start
async2
promise1
promise2
script end
nextTick
async1 end
promise3

setTimeout0
setImmediate
setTimeout2
```

面试题二：

```js
setTimeout(() => {
  console.log("setTimeout");
}, 0);

setImmediate(() => {
  console.log("setImmediate");
});
```

执行结果：

```
情况一：
setTimeout
setImmediate

情况二：
setImmediate
setTimeout
```

为什么会出现不同的情况呢？

- 在 Node 源码的 deps/uv/src/timer.c 中 141 行，有一个 `uv__next_timeout`的函数；
- 这个函数决定了，poll 阶段要不要阻塞在这里；
- 阻塞在这里的目的是当有异步 IO 被处理时，尽可能快的让代码被执行；

```js
int uv__next_timeout(const uv_loop_t* loop) {
  const struct heap_node* heap_node;
  const uv_timer_t* handle;
  uint64_t diff;

  // 计算距离当前时间节点最小的计时器
  heap_node = heap_min(timer_heap(loop));
  // 如果为空, 那么返回-1,表示为阻塞状态
  if (heap_node == NULL)
    return -1; /* block indefinitely */

  // 如果计时器的时间小于当前loop的开始时间, 那么返回0
  // 继续执行后续阶段, 并且开启下一次tick
  handle = container_of(heap_node, uv_timer_t, heap_node);
  if (handle->timeout <= loop->time)
    return 0;

  // 如果不大于loop的开始时间, 那么会返回时间差
  diff = handle->timeout - loop->time;
  if (diff > INT_MAX)
    diff = INT_MAX;

  return (int) diff;
}
```

和上面有什么关系呢？

- 情况一：如果事件循环开启的时间(ms)是小于 `setTimeout`函数的执行时间的；

- - 也就意味着先开启了 event-loop，但是这个时候执行到 timer 阶段，并没有定时器的回调被放到入 timer queue 中；
  - 所以没有被执行，后续开启定时器和检测到有 setImmediate 时，就会跳过 poll 阶段，向后继续执行；
  - 这个时候是先检测 `setImmediate`，第二次的 tick 中执行了 timer 中的 `setTimeout`；

- 情况二：如果事件循环开启的时间(ms)是大于 `setTimeout`函数的执行时间的；

- - 这就意味着在第一次 tick 中，已经准备好了 timer queue；
  - 所以会直接按照顺序执行即可；

## 09.http 开发 web 服务器

> 什么是 Web 服务器？
>
> 当应用程序（客户端）需要某一个资源时，可以向一个台服务器，通过 Http 请求获取到这个资源；提供服务器的这个服务器，就是一个 Web 服务器；

![图片](https://beelz.oss-cn-beijing.aliyuncs.com/blog/imgs/f4.png)Web 服务器

目前有很多开源的 Web 服务器：Nginx、Apache（静态）、Apache Tomcat（静态、动态）、Node.js

### 一. Http 模板基本使用

#### 1.1. 如何创建服务

##### 1.1.1. Web 服务器初体验

创建一个 Web 服务器的初体验：

```js
const http = require("http");

const HTTP_PORT = 8000;

const server = http.createServer((req, res) => {
  res.end("Hello World");
});

server.listen(8000, () => {
  console.log(`🚀服务器在${HTTP_PORT}启动~`);
});
```

##### 1.1.2. 创建服务器

创建服务器对象，我们是通过 `createServer` 来完成的

- `http.createServer`会返回服务器的对象；
- 底层其实使用直接 new Server 对象。

```js
function createServer(opts, requestListener) {
  return new Server(opts, requestListener);
}
```

那么，当然，我们也可以自己来创建这个对象：

```js
const server2 = new http.Server((req, res) => {
  res.end("Hello Server2");
});

server2.listen(9000, () => {
  console.log("服务器启动成功~");
});
```

上面我们已经看到，创建 Server 时会传入一个回调函数，这个回调函数在被调用时会传入两个参数：

- req：request 请求对象，包含请求相关的信息；
- res：response 响应对象，包含我们要发送给客户端的信息；

##### 1.1.3. 监听端口和主机

**Server**通过 listen 方法来开启服务器，并且在某一个主机和端口上监听网络请求：

- 也就是当我们通过 `ip:port`的方式发送到我们监听的 Web 服务器上时；
- 我们就可以对其进行相关的处理；

`listen`函数有三个参数：

- 端口 port: 可以不传, 系统会默认分配端, 后续项目中我们会写入到环境变量中；

- 主机 host: 通常可以传入 localhost、ip 地址 127.0.0.1、或者 ip 地址 0.0.0.0，默认是 0.0.0.0；

- - 监听 IPV4 上所有的地址，再根据端口找到不同的应用程序；
  - 比如我们监听 `0.0.0.0`时，在同一个网段下的主机中，通过 ip 地址是可以访问的；
  - 正常的数据库包经常 应用层 - 传输层 - 网络层 - 数据链路层 - 物理层 ；
  - 而回环地址，是在网络层直接就被获取到了，是不会经常数据链路层和物理层的；
  - 比如我们监听 `127.0.0.1`时，在同一个网段下的主机中，通过 ip 地址是不能访问的；
  - localhost：本质上是一个域名，通常情况下会被解析成 127.0.0.1；
  - 127.0.0.1：回环地址（Loop Back Address），表达的意思其实是我们主机自己发出去的包，直接被自己接收；
  - 0.0.0.0：

- 回调函数：服务器启动成功时的回调函数；

```js
server.listen(() => {
  console.log("服务器启动~🚀");
});
```

#### 1.2. request 请求对象

在向服务器发送请求时，我们会携带很多信息，比如：

- 本次请求的 URL，服务器需要根据不同的 URL 进行不同的处理；
- 本次请求的请求方式，比如 GET、POST 请求传入的参数和处理的方式是不同的；
- 本次请求的 headers 中也会携带一些信息，比如客户端信息、接受数据的格式、支持的编码格式等；
- 等等...

这些信息，Node 会帮助我们封装到一个 request 的对象中，我们可以直接来处理这个 request 对象：

```js
const server = http.createServer((req, res) => {
  // request对象
  console.log(req.url);
  console.log(req.method);
  console.log(req.headers);

  res.end("Hello World");
});
```

##### 1.2.1. URL 的处理

客户端在发送请求时，会请求不同的数据，那么会传入不同的请求地址：

- 比如 `http://localhost:8000/login`；
- 比如 `http://localhost:8000/products`;

服务器端需要根据不同的请求地址，作出不同的响应：

```js
const server = http.createServer((req, res) => {
  const url = req.url;
  console.log(url);

  if (url === "/login") {
    res.end("welcome Back~");
  } else if (url === "/products") {
    res.end("products");
  } else {
    res.end("error message");
  }
});
```

那么如果用户发送的地址中还携带一些额外的参数呢？

- `http://localhost:8000/login?name=why&password=123`;
- 这个时候，url 的值是 `/login?name=why&password=123`；

我们如何对它进行解析呢？

- 使用内置模块 url；

```js
const url = require("url");

// 解析请求
const parseInfo = url.parse(req.url);
console.log(parseInfo);
```

解析结果：

```js
Url {
  protocol: null,
  slashes: null,
  auth: null,
  host: null,
  port: null,
  hostname: null,
  hash: null,
  search: '?name=why&password=123',
  query: 'name=why&password=123',
  pathname: '/login',
  path: '/login?name=why&password=123',
  href: '/login?name=why&password=123'
}
```

我们会发现 `pathname`就是我们想要的结果。

但是 `query` 信息如何可以获取呢？

- 方式一：截取字符串；
- 方式二：使用 querystring 内置模块；

```js
const { pathname, query } = url.parse(req.url);
const queryObj = qs.parse(query);
console.log(queryObj.name);
console.log(queryObj.password);
```

##### 1.2.2. Method 的处理

在 Restful 规范（设计风格）中，我们对于数据的增删改查应该通过不同的请求方式：

- GET：查询数据；
- POST：新建数据；
- PATCH：更新数据；
- DELETE：删除数据；

所以，我们可以通过判断不同的请求方式进行不同的处理。

比如创建一个用户：

- 请求接口为 `/users`；
- 请求方式为 `POST`请求；
- 携带数据 `username`和`password`；

![图片](https://beelz.oss-cn-beijing.aliyuncs.com/blog/imgs/f5.png)创建用户请求

在我们程序中如何进行判断以及获取对应的数据呢？

- 这里我们需要判断接口是 `/users`，并且请求方式是 POST 方法去获取传入的数据；
- 获取这种 body 携带的数据，我们需要通过监听 req 的 `data`事件来获取；

```js
if (req.url.indexOf("/users") !== -1) {
  if (req.method === "POST") {
    // 可以设置编码，也可以在下方通过 data.toString() 获取字符串格式
    req.setEncoding("utf-8");

    req.on("data", (data) => {
      const { username, password } = JSON.parse(data);
      console.log(username, password);
    });

    res.end("create user success");
  } else {
    res.end("users list");
  }
} else {
  res.end("error message");
}
```

将 JSON 字符串格式转成对象类型，通过`JSON.parse`方法即可。

##### 1.2.3. header 属性

在 request 对象的 header 中也包含很多有用的信息：

```js
const server = http.createServer((req, res) => {
  console.log(req.headers);

  res.end("Hello Header");
});
```

浏览器会默认传递过来一些信息：

```
{
  'content-type': 'application/json',
  'user-agent': 'PostmanRuntime/7.26.5',
  accept: '*/*',
  'postman-token': 'afe4b8fe-67e3-49cc-bd6f-f61c95c4367b',
  host: 'localhost:8000',
  'accept-encoding': 'gzip, deflate, br',
  connection: 'keep-alive',
  'content-length': '48'
}
```

`content-type`是这次请求携带的数据的类型：

- `application/json`表示是一个 json 类型；
- `text/plain`表示是文本类型；
- `application/xml`表示是 xml 类型；
- `multipart/form-data`表示是上传文件；

`content-length`：

- 文件的大小和长度

`keep-alive`：

- http 是基于 TCP 协议的，但是通常在进行一次请求和响应结束后会立刻中断；

- 在 http1.0 中，如果想要继续保持连接：

- - 浏览器需要在请求头中添加 `connection: keep-alive`；
  - 服务器需要在响应头中添加 `connection:keey-alive`；
  - 当客户端再次放请求时，就会使用同一个连接，直接一方中断连接；

- 在 http1.1 中，所有连接默认是 `connection: keep-alive`的；

- - 不同的 Web 服务器会有不同的保持 `keep-alive`的时间；
  - Node 中默认是 5s 中；

`accept-encoding`：

- 告知服务器，客户端支持的文件压缩格式，比如 js 文件可以使用 gzip 编码，对应 `.gz`文件；

`accept`：

- 告知服务器，客户端可接受文件的格式类型；

`user-agent`：

- 客户端相关的信息；

#### 1.3. 响应对象 response

##### 1.3.1. 返回响应结果

如果我们希望给客户端响应的结果数据，可以通过两种方式：

- Write 方法：这种方式是直接写出数据，但是并没有关闭流；
- end 方法：这种方式是写出最后的数据，并且写出后会关闭流；

```js
const http = require("http");

const server = http.createServer((req, res) => {
  // 响应数据的方式有两个:
  res.write("Hello World");
  res.write("Hello Response");
  res.end("message end");
});

server.listen(8000, () => {
  console.log("服务器启动🚀~");
});
```

如果我们没有调用 `end`和`close`，客户端将会一直等待结果，所以客户端在发送网络请求时，都会设置超时时间。

##### 1.3.2. 返回状态码

Http 状态码（Http Status Code）是用来表示 Http 响应状态的数字代码：

- Http 状态码非常多，可以根据不同的情况，给客户端返回不同的状态码；
- 常见的状态码是下面这些（后续项目中，也会用到其中的状态码）；

![图片](https://beelz.oss-cn-beijing.aliyuncs.com/blog/imgs/f6.png)状态码

设置状态码常见的有两种方式：

```js
res.statusCode = 400;
res.writeHead(200);
```

##### 1.3.3. 响应头文件

返回头部信息，主要有两种方式：

- `res.setHeader`：一次写入一个头部信息；
- `res.writeHead`：同时写入 header 和 status；

```js
res.setHeader("Content-Type", "application/json;charset=utf8");

res.writeHead(200, {
  "Content-Type": "application/json;charset=utf8",
});
```

Header 设置 `Content-Type`有什么作用呢？

- 默认客户端接收到的是字符串，客户端会按照自己默认的方式进行处理；

比如，我们返回的是一段 HTML，但是没有指定格式：

```js
res.end("<h2>Hello World</h2>");
```

![图片](https://beelz.oss-cn-beijing.aliyuncs.com/blog/imgs/f7.png)image-20201030154312050

但是，如果我们指定了格式：

```
res.setHeader("Content-Type", "text/html;charset=utf8");
res.end('<h2>Hello World</h2>')
```

![图片](https://beelz.oss-cn-beijing.aliyuncs.com/blog/imgs/f9.png)image-20201030154404172

如果我们希望返回一段 JSON 数据，应该怎么做呢？

```js
res.writeHead(200, {
  "Content-Type": "application/json;charset=utf8",
});

const data = {
  name: "王红元",
  age: 18,
  height: 1.88,
};

res.end(JSON.stringify(data));
```

### 二. Web 其他补充

#### 2.1. 文件上传的使用

如果是一个很大的文件需要上传到服务器端，服务器端进行保存应该如何操作呢？

```js
const server = http.createServer((req, res) => {
  if (req.url === "/upload") {
    if (req.method === "POST") {
      const fileWriter = fs.createWriteStream("./foo.png");
      req.pipe(fileWriter);

      const fileSize = req.headers["content-length"];
      let curSize = 0;
      console.log(fileSize);

      req.on("data", (data) => {
        curSize += data.length;
        console.log(curSize);
        res.write(`文件上传进度: ${(curSize / fileSize) * 100}%\n`);
      });

      req.on("end", () => {
        res.end("文件上传完成~");
      });
    }
  } else {
    res.end("error message");
  }
});
```

这个时候我们发现文件上传成功了，但是文件却打不开：

- 这是因为我们写入的数据，里面包含一些特殊的信息；
- 这些信息打开的软件并不能很好的解析；

```js
const server = http.createServer((req, res) => {
  if (req.url === "/upload") {
    if (req.method === "POST") {
      // 图片文件必须设置为二进制的
      req.setEncoding("binary");

      // 获取content-type中的boundary的值
      var boundary = req.headers["content-type"]
        .split("; ")[1]
        .replace("boundary=", "");

      // 记录当前数据的信息
      const fileSize = req.headers["content-length"];
      let curSize = 0;
      let body = "";

      // 监听当前的数据
      req.on("data", (data) => {
        curSize += data.length;
        res.write(`文件上传进度: ${(curSize / fileSize) * 100}%\n`);
        body += data;
      });

      // 数据结构
      req.on("end", () => {
        // 切割数据
        const payload = qs.parse(body, "\r\n", ":");
        // 获取最后的类型(image/png)
        const fileType = payload["Content-Type"].substring(1);
        // 获取要截取的长度
        const fileTypePosition = body.indexOf(fileType) + fileType.length;
        let binaryData = body.substring(fileTypePosition);
        binaryData = binaryData.replace(/^\s\s*/, "");

        // binaryData = binaryData.replaceAll('\r\n', '');
        const finalData = binaryData.substring(
          0,
          binaryData.indexOf("--" + boundary + "--")
        );

        fs.writeFile("./boo.png", finalData, "binary", (err) => {
          console.log(err);
          res.end("文件上传完成~");
        });
      });
    }
  } else {
    res.end("error message");
  }
});
```

#### 2.2. http 发送网络请求

axios 库可以在浏览器中使用，也可以在 Node 中使用：

- 在浏览器中，axios 使用的是封装 xhr；
- 在 Node 中，使用的是 http 内置模块；

所以 http 模块是可以在 Node 中直接发送网络请求的。

发送 get 请求：

```js
http.get("http://localhost:8000", (res) => {
  res.on("data", (data) => {
    console.log(data.toString());
    console.log(JSON.parse(data.toString()));
  });
});
```

发送 post 请求：

```js
const req = http.request(
  {
    method: "POST",
    hostname: "localhost",
    port: 8000,
  },
  (res) => {
    res.on("data", (data) => {
      console.log(data.toString());
      console.log(JSON.parse(data.toString()));
    });
  }
);

req.on("error", (err) => {
  console.log(err);
});

req.end();
```

## 10.登录和 session-cookie

### 10.1.邂逅 session-cookie

#### 10.1.1.为什么需要登录凭证？

web 开发中，我们使用最多的协议是 http，但是 http 是一个无状态的协议，每个 http 请求都是独立的，因此即使是同一个用户的多次连续请求，服务端也无法识别此用户的身份。所以我们必须得有个办法证明我们登录过。

#### 10.1.2.认识 cookie

- Cookie（复数形态 Cookies），又称为“小甜饼”。类型为“小型文本文件，某些网站为了辨别用户身份而存储在用户本地终端（Client Side）上的数据。
  - 浏览器会在特定的情况下携带上 cookie 来发送请求，我们可以通过 cookie 来获取一些信息；
- Cookie 总是保存在客户端中，按在客户端中的存储位置，Cookie 可以分为内存 Cookie 和硬盘 Cookie。

  - 内存 Cookie 由浏览器维护，保存在内存中，浏览器关闭时 Cookie 就会消失，其存在时间是短暂的；
  - 硬盘 Cookie 保存在硬盘中，有一个过期时间，用户手动清理或者过期时间到时，才会被清理；

- 如果判断一个 cookie 是内存 cookie 还是硬盘 cookie 呢？
  - 没有设置过期时间，默认情况下 cookie 是内存 cookie，在关闭浏览器时会自动删除；
  - 有设置过期时间，并且过期时间不为 0 或者负数的 cookie，是硬盘 cookie，需要手动或者到期时，才会删除；

#### 10.1.3.cookie 常见的属性

**cookie 的生命周期：**

- 默认情况下（即未设置过期时间）的 cookie 是内存 cookie，也称之为会话 cookie，也就是在浏览器关闭时会自动被删除；
- 我们可以通过设置 expires 或者 max-age 来设置过期的时间；
  - expires：设置的是 Date.toUTCString()，设置格式是;expires=date-in-GMTString-format；
  - max-age：设置过期的秒钟，;max-age=max-age-in-seconds (例如一年为 60*60*24\*365)；
- cookie 的作用域：（允许 cookie 发送给哪些 URL）
  - Domain：指定哪些主机可以接受 cookie
    - 如果不指定，那么默认是 origin，不包括子域名。
    - 如果指定 Domain，则包含子域名。例如，如果设置 Domain=mozilla.org，则 Cookie 也包含在子域名中（如 developer.mozilla.org）。
  - Path：指定主机下哪些路径可以接受 cookie
    - 例如，设置 Path=/docs，则以下地址都会匹配：p/docsp/docs/Web/p/docs/Web/HTTP

#### 10.1.4.客户端设置 cookie

js 直接设置和获取 cookie：

```js
console.log(document.cookie);
```

这个 cookie 会在会话关闭时被删除掉；

```js
document.cookie = "name=coderwhy";
document.cookie = "age=18";
```

设置 cookie，同时设置过期时间（默认单位是秒钟）服务器设置 cookie

```js
document.cookie = "name=coderwhy;max-age=10";
```

#### 10.1.5.服务端设置 cookie

Koa 中默认支持直接操作 cookie

- /test 请求中设置 cookiep
- /demo 请求中获取 cookie

```js
const Koa = require("koa");
const Router = require("koa-router");

const app = new Koa();
const userRouter = new Router({
  prefix: "/user",
});

app.use(userRouter.routes());
app.use(userRouter.allowedMethods());

userRouter.get("/", (ctx) => {
  ctx.cookie.set("name", "chh", {
    maxAge: 5 * 1000,
  });
  ctx.body = "登录成功";
});

userRouter.get("/demo", (ctx) => {
  const value = ctx.cookie.get("name");
  ctx.body = `cookie值为：${value}`;
});
```

> 服务端 maxAge 的单位为毫秒，客户端 max-age 单位为秒

#### 10.1.6.认识 session

#### 10.1.7.服务端设置 session

在 koa 中，我们可以借助于 koa-session 来实现 session 认证

`npm instal koa-session`

```js
const Koa = require("koa");
const Router = require("koa-router");
const koaSession = require("koa-session");

const userRouter = new Router({
  prefix: "/user",
});
const session = koaSession(
  {
    key: "sessionid", // cookie的key
    maxAge: 5 * 1000, // 过期时间
    httpOnly: true, // 不允许通过js获取cookie
    rolling: true, // 每次响应时，刷新session的有效期
    signed: true, // 是否使用signed签名认证，防止数据被篡改
  },
  app
);
app.keys = ["aaa"]; // session加盐
app.use(session);
app.use(userRouter.routes());
app.use(userRouter.allowedMethods());
userRouter.get("/", (ctx, next) => {
  const id = 110,
    name = chh;
  ctx.session.user = { id, name };
  ctx.body = "登录成功";
});
userRouter.get("/demo", (ctx, next) => {
  console.log(ctx.session.user);
  ctx.body = "demo";
});
```

### 10.2.邂逅 token

#### 10.2.1.cookie 和 session 的缺点：

1. Cookie 会被附加在每个 HTTP 请求中，所以无形中增加了流量（事实上某些请求是不需要的）
2. Cookie 是明文传递的，所以存在安全性的问题
3. Cookie 的大小限制是 4KB，对于复杂的需求来说是不够的
4. 对于浏览器外的其他客户端（比如 iOS、Android），必须手动的设置 cookie 和 session
5. 在分布式系统和服务器集群中线保证其他系统也可以正确的解析 session 是比较麻烦的

#### 10.2.2.认识 token

所以，在目前的前后端分离的开发过程中，使用 token 来进行身份验证的是最多的情况：

- token 可以翻译为令牌；也就是在验证了用户账号和密码正确的情况，给用户颁发一个令牌；
- 这个令牌作为后续用户访问一些接口或者资源的凭证；
- 我们可以根据这个凭证来判断用户是否有权限来访问；

token 的使用应该分成两个重要的步骤：

- 生成 token：登录的时候，颁发 token；
- 验证 token：访问某些资源或者接口时，验证 token；

#### 10.2.3.JWT 实现 Token 机制

JWT 生成的 Token 由三部分组成

1. header
   - alg：采用的加密算法，默认是 HMAC SHA256（HS256），采用同一个密钥进行加密和解密；
   - typ：JWT，固定值，通常都写成 JWT 即可；
   - 会通过 base64Url 算法进行编码；
2. payload
   - 携带的数据，比如我们可以将用户的 id 和 name 放到 payload 中
   - 默认也会携带 iat（issued at），令牌的签发时间；
   - 我们也可以设置过期时间：exp（expiration time）；
   - 会通过 base64Url 算法进行编码
3. signature
   - 设置一个 secretKey，通过将前两个的结果合并后进行 HMACSHA256 的算法；
   - HMACSHA256(base64Url(header)+.+base64Url(payload), secretKey);
   - 但是如果 secretKey 暴露是一件非常危险的事情，因为之后就可以模拟颁发 token，也可以解密 token；

#### 10.2.4.token 的使用
