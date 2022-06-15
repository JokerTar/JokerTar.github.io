(window.webpackJsonp=window.webpackJsonp||[]).push([[50],{463:function(t,_,a){"use strict";a.r(_);var n=a(62),e=Object(n.a)({},(function(){var t=this,_=t.$createElement,a=t._self._c||_;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h2",{attrs:{id:"从输入-url-到页面展示完整流程示意图"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#从输入-url-到页面展示完整流程示意图"}},[t._v("#")]),t._v(" 从输入 URL 到页面展示完整流程示意图")]),t._v(" "),a("p",[a("strong",[t._v("浏览器进程")]),t._v("：主要负责用户交互、子进程管理和文件储存等功能")]),t._v(" "),a("p",[a("strong",[t._v("网络进程")]),t._v("：是面向渲染进程和浏览器进程等提供网络下载功能。")]),t._v(" "),a("p",[a("strong",[t._v("渲染进程")]),t._v("：主要职责是把从网络下载的 HTML、JavaScript、CSS、图片等资源解析为可以显示和交互的页面。")]),t._v(" "),a("p",[a("img",{attrs:{src:"https://img-blog.csdnimg.cn/20210107213749436.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2thaW1vMzEz,size_16,color_FFFFFF,t_70",alt:"在这里插入图片描述"}})]),t._v(" "),a("p",[t._v("过程可以大致描述为如下")]),t._v(" "),a("ul",[a("li",[t._v("首先，浏览器进程接收到用户输入的 URL 请求，浏览器进程便将该 URL 转发给网络进程。")]),t._v(" "),a("li",[t._v("然后，在网络进程中发起真正的 URL 请求。")]),t._v(" "),a("li",[t._v("接着网络进程接收到了响应头数据，便解析响应头数据，并将数据转发给浏览器进程。")]),t._v(" "),a("li",[t._v("浏览器进程接收到网络进程的响应头数据之后，发送“提交导航 (CommitNavigation)”消息到渲染进程；")]),t._v(" "),a("li",[t._v("渲染进程接收到“提交导航”的消息之后，便开始准备接收 HTML 数据，接收数据的方式是直接和网络进程建立数据管道；")]),t._v(" "),a("li",[t._v("最后渲染进程会向浏览器进程“确认提交”，这是告诉浏览器进程：“已经准备好接受和解析页面数据了”。")]),t._v(" "),a("li",[t._v("浏览器进程接收到渲染进程“提交文档”的消息之后，便开始移除之前旧的文档，然后更新浏览器进程中的页面状态。")])]),t._v(" "),a("h2",{attrs:{id:"导航"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#导航"}},[t._v("#")]),t._v(" 导航")]),t._v(" "),a("p",[a("strong",[t._v("用户发出 URL 请求到页面开始解析的这个过程，就叫做导航。")])]),t._v(" "),a("h2",{attrs:{id:"从输入-url-到页面展示"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#从输入-url-到页面展示"}},[t._v("#")]),t._v(" 从输入 URL 到页面展示")]),t._v(" "),a("h3",{attrs:{id:"_1-用户输入"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_1-用户输入"}},[t._v("#")]),t._v(" 1. 用户输入")]),t._v(" "),a("p",[t._v("当用户在地址栏中输入一个查询关键字时，地址栏会判断输入的关键字是"),a("strong",[t._v("搜索内容")]),t._v("，还是"),a("strong",[t._v("请求的 URL")]),t._v("。")]),t._v(" "),a("p",[t._v("当用户输入关键字并键入回车之后，当前页面没有监听 "),a("code",[t._v("beforeunload")]),t._v(" 事件或者同意了继续后续流程，便进入了加载状态。但此时页面显示的依然是之前打开的页面内容，并没立即替换页面。因为需要等待提交文档阶段，页面内容才会被替换。")]),t._v(" "),a("h3",{attrs:{id:"_2-url-请求过程"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2-url-请求过程"}},[t._v("#")]),t._v(" 2. URL 请求过程")]),t._v(" "),a("p",[t._v("1、首先，网络进程会查找本地缓存是否缓存了该资源。")]),t._v(" "),a("blockquote",[a("p",[t._v("如果有缓存资源，那么直接返回资源给浏览器进程；如果在缓存中没有查找到资源，那么直接进入网络请求流程。这请求前的第一步是要进行 DNS 解析，以获取请求域名的服务器 IP 地址。如果请求协议是 HTTPS，那么还需要建立 TLS 连接。")])]),t._v(" "),a("p",[t._v("2、利用 IP 地址和服务器建立 TCP 连接。")]),t._v(" "),a("blockquote",[a("p",[t._v("连接建立之后，浏览器端会构建请求行、请求头等信息，并把和该域名相关的 Cookie 等数据附加到请求头中，然后向服务器发送构建的请求信息。")])]),t._v(" "),a("p",[t._v("3、服务器接收到请求信息后，会根据请求信息生成响应数据，并发给网络进程。等网络进程接收了响应行和响应头之后，就开始解析响应头的内容。")]),t._v(" "),a("p",[t._v("3.1）重定向")]),t._v(" "),a("p",[t._v("如果发现返回的状态码是 301 或者 302，那么说明服务器需要浏览器重定向到其他 URL。")]),t._v(" "),a("blockquote",[a("p",[t._v("网络进程会从响应头的 Location 字段里面读取重定向的地址。")])]),t._v(" "),a("p",[t._v("3.2）响应数据类型处理")]),t._v(" "),a("p",[a("strong",[t._v("Content-Type")]),t._v(" 是 HTTP 头中一个非常重要的字段， 它告诉浏览器服务器返回的响应体数据是什么类型，然后浏览器会根据 "),a("code",[t._v("Content-Type")]),t._v(" 的值来决定如何显示响应体的内容。")]),t._v(" "),a("blockquote",[a("p",[t._v("如果 "),a("code",[t._v("Content-Type")]),t._v(" 字段的值被浏览器判断为下载类型，那么该请求会被提交给浏览器的下载管理器，同时该 URL 请求的导航流程就此结束。但如果是 HTML，那么浏览器则会继续进行导航流程。")])]),t._v(" "),a("h3",{attrs:{id:"_3-准备渲染进程"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_3-准备渲染进程"}},[t._v("#")]),t._v(" 3. 准备渲染进程")]),t._v(" "),a("p",[t._v("如果从一个页面打开了另一个新页面，而新页面和当前页面属于同一站点的话，那么新页面会复用父页面的渲染进程。官方把这个默认策略叫 "),a("code",[t._v("process-per-site-instance")]),t._v("。")]),t._v(" "),a("p",[t._v("打开一个新页面采用的渲染进程策略就是：")]),t._v(" "),a("ul",[a("li",[t._v("通常情况下，打开新的页面都会使用单独的渲染进程；")]),t._v(" "),a("li",[t._v("如果从 A 页面打开 B 页面，且 A 和 B 都属于同一站点的话，那么 B 页面复用 A 页面的渲染进程；如果是其他情况，浏览器进程则会为 B 创建一个新的渲染进程。")])]),t._v(" "),a("h3",{attrs:{id:"_4-提交文档"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_4-提交文档"}},[t._v("#")]),t._v(" 4. 提交文档")]),t._v(" "),a("p",[a("strong",[t._v("提交文档")]),t._v("：就是指浏览器进程将网络进程接收到的 HTML 数据提交给渲染进程。")]),t._v(" "),a("p",[t._v("具体流程：")]),t._v(" "),a("ul",[a("li",[t._v("1、首先当浏览器进程接收到网络进程的响应头数据之后，便向渲染进程发起“提交文档”的消息；")]),t._v(" "),a("li",[t._v("2、渲染进程接收到“提交文档”的消息后，会和网络进程建立传输数据的“管道”；")]),t._v(" "),a("li",[t._v("3、等文档数据传输完成之后，渲染进程会返回“确认提交”的消息给浏览器进程；")]),t._v(" "),a("li",[t._v("4、浏览器进程在收到“确认提交”的消息后，会更新浏览器界面状态，包括了安全状态、地址栏的 URL、前进后退的历史状态，并更新 Web 页面。")])]),t._v(" "),a("p",[a("img",{attrs:{src:"https://img-blog.csdnimg.cn/20210107213807807.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2thaW1vMzEz,size_16,color_FFFFFF,t_70",alt:"在这里插入图片描述"}})]),t._v(" "),a("h3",{attrs:{id:"_5-渲染阶段"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_5-渲染阶段"}},[t._v("#")]),t._v(" 5. 渲染阶段")]),t._v(" "),a("p",[t._v("一旦文档被提交，渲染进程便开始页面解析和子资源加载，页面生成完成，渲染进程会发送一个消息给浏览器进程，浏览器接收到消息后，会停止标签图标上的加载动画。")]),t._v(" "),a("h2",{attrs:{id:"精选留言"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#精选留言"}},[t._v("#")]),t._v(" 精选留言")]),t._v(" "),a("p",[a("strong",[t._v("ytd")]),t._v("：")]),t._v(" "),a("div",{staticClass:"language-txt extra-class"},[a("pre",{pre:!0,attrs:{class:"language-txt"}},[a("code",[t._v("结合老师的讲义，自己总结了下，不考虑用户输入搜索关键字的情况：\n\n1，用户输入url并回车\n2，浏览器进程检查url，组装协议，构成完整的url\n3，浏览器进程通过进程间通信（IPC）把url请求发送给网络进程\n4，网络进程接收到url请求后检查本地缓存是否缓存了该请求资源，如果有则将该资源返回给浏览器进程\n5，如果没有，网络进程向web服务器发起http请求（网络请求），请求流程如下：\n    5.1 进行DNS解析，获取服务器ip地址，端口（端口是通过dns解析获取的吗？这里有个疑问）\n    5.2 利用ip地址和服务器建立tcp连接\n    5.3 构建请求头信息\n    5.4 发送请求头信息\n    5.5 服务器响应后，网络进程接收响应头和响应信息，并解析响应内容\n6，网络进程解析响应流程；\n    6.1 检查状态码，如果是301/302，则需要重定向，从Location自动中读取地址，重新进行第4步\n        （301/302跳转也会读取本地缓存吗？这里有个疑问），如果是200，则继续处理请求。\n    6.2 200响应处理：\n        检查响应类型Content-Type，如果是字节流类型，则将该请求提交给下载管理器，该导航流程结束，不再进行\n        后续的渲染，如果是html则通知浏览器进程准备渲染进程准备进行渲染。\n7，准备渲染进程\n    7.1 浏览器进程检查当前url是否和之前打开的渲染进程根域名是否相同，如果相同，则复用原来的进程，如果不同，则开启新的渲染进程\n8. 传输数据、更新状态\n    8.1 渲染进程准备好后，浏览器向渲染进程发起“提交文档”的消息，渲染进程接收到消息和网络进程建立传输数据的“管道”\n    8.2 渲染进程接收完数据后，向浏览器发送“确认提交”\n    8.3 浏览器进程接收到确认消息后更新浏览器界面状态：安全、地址栏url、前进后退的历史状态、更新web页面。\n")])])]),a("p",[a("strong",[t._v("羽蝶曲")]),t._v("：")]),t._v(" "),a("div",{staticClass:"language-txt extra-class"},[a("pre",{pre:!0,attrs:{class:"language-txt"}},[a("code",[t._v("1. 用户输入URL，浏览器会根据用户输入的信息判断是搜索还是网址，如果是搜索内容，就将搜索内容+默认搜索引擎合成新的URL；如果用户输入的内容符合URL规则，浏览器就会根据URL协议，在这段内容上加上协议合成合法的URL\n2. 用户输入完内容，按下回车键，浏览器导航栏显示loading状态，但是页面还是呈现前一个页面，这是因为新页面的响应数据还没有获得\n3. 浏览器进程浏览器构建请求行信息，会通过进程间通信（IPC）将URL请求发送给网络进程\nGET /index.html HTTP1.1\n4. 网络进程获取到URL，先去本地缓存中查找是否有缓存文件，如果有，拦截请求，直接200返回；否则，进入网络请求过程\n5. 网络进程请求DNS返回域名对应的IP和端口号，如果之前DNS数据缓存服务缓存过当前域名信息，就会直接返回缓存信息；否则，发起请求获取根据域名解析出来的IP和端口号，如果没有端口号，http默认80，https默认443。如果是https请求，还需要建立TLS连接。\n6. Chrome 有个机制，同一个域名同时最多只能建立 6 个TCP 连接，如果在同一个域名下同时有 10 个请求发生，那么其中 4 个请求会进入排队等待状态，直至进行中的请求完成。如果当前请求数量少于6个，会直接建立TCP连接。\n7. TCP三次握手建立连接，http请求加上TCP头部——包括源端口号、目的程序端口号和用于校验数据完整性的序号，向下传输\n8. 网络层在数据包上加上IP头部——包括源IP地址和目的IP地址，继续向下传输到底层\n9. 底层通过物理网络传输给目的服务器主机\n10. 目的服务器主机网络层接收到数据包，解析出IP头部，识别出数据部分，将解开的数据包向上传输到传输层\n11. 目的服务器主机传输层获取到数据包，解析出TCP头部，识别端口，将解开的数据包向上传输到应用层\n12. 应用层HTTP解析请求头和请求体，如果需要重定向，HTTP直接返回HTTP响应数据的状态code301或者302，同时在请求头的Location字段中附上重定向地址，浏览器会根据code和Location进行重定向操作；如果不是重定向，首先服务器会根据 请求头中的If-None-Match 的值来判断请求的资源是否被更新，如果没有更新，就返回304状态码，相当于告诉浏览器之前的缓存还可以使用，就不返回新数据了；否则，返回新数据，200的状态码，并且如果想要浏览器缓存数据的话，就在相应头中加入字段：\nCache-Control:Max-age=2000\n响应数据又顺着应用层——传输层——网络层——网络层——传输层——应用层的顺序返回到网络进程\n13. 数据传输完成，TCP四次挥手断开连接。如果，浏览器或者服务器在HTTP头部加上如下信息，TCP就一直保持连接。保持TCP连接可以省下下次需要建立连接的时间，提示资源加载速度\nConnection:Keep-Alive\n14. 网络进程将获取到的数据包进行解析，根据响应头中的Content-type来判断响应数据的类型，如果是字节流类型，就将该请求交给下载管理器，该导航流程结束，不再进行；如果是text/html类型，就通知浏览器进程获取到文档准备渲染\n15. 浏览器进程获取到通知，根据当前页面B是否是从页面A打开的并且和页面A是否是同一个站点（根域名和协议一样就被认为是同一个站点），如果满足上述条件，就复用之前网页的进程，否则，新创建一个单独的渲染进程\n16. 浏览器会发出“提交文档”的消息给渲染进程，渲染进程收到消息后，会和网络进程建立传输数据的“管道”，文档数据传输完成后，渲染进程会返回“确认提交”的消息给浏览器进程\n17. 浏览器收到“确认提交”的消息后，会更新浏览器的页面状态，包括了安全状态、地址栏的 URL、前进后退的历史状态，并更新web页面，此时的web页面是空白页\n18. 渲染进程对文档进行页面解析和子资源加载，HTML 通过HTM 解析器转成DOM Tree（二叉树类似结构的东西），CSS按照CSS 规则和CSS解释器转成CSSOM TREE，两个tree结合，形成render tree（不包含HTML的具体元素和元素要画的具体位置），通过Layout可以计算出每个元素具体的宽高颜色位置，结合起来，开始绘制，最后显示在屏幕中新页面显示出来\n")])])]),a("p",[a("strong",[t._v("芳华年月")]),t._v("：")]),t._v(" "),a("p",[t._v("Q：请问老师，https://linkmarket.aliyun.com 内新开的页面都是新开一个渲染进程，能帮忙解释下吗")]),t._v(" "),a("div",{staticClass:"language-txt extra-class"},[a("pre",{pre:!0,attrs:{class:"language-txt"}},[a("code",[t._v('A：我看了下代码，因为连接里面使用了 rel="noopener noreferrer"这个属性。\n\n这个涉及到安全了，要完整解释起来就话长了，我长话短说，先看阿里这个网站的连接是下面这种形式：\n\n<a target="_blank" rel="noopener noreferrer" class="hover" href="https://linkmarket.aliyun.com/hardware_store?spm=a2c3t.11219538.iot-navBar.62.4b5a51e7u2sXtw" data-spm-anchor-id="a2c3t.11219538.iot-navBar.62">硬件商城</a>\n\n使用noopener noreferrer就是告诉浏览器，新打开的子窗口不需要访问父窗口的任何内容，这是为了防止一些钓鱼网站窃取父窗口的信息。\n\n浏览器在打开新页面时，解析到含有noopener noreferrer时，就知道他们不需要共享页面内容，所以这时候浏览器就会让新链接在一个新页面中打开了。\n')])])])])}),[],!1,null,null,null);_.default=e.exports}}]);