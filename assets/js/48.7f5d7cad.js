(window.webpackJsonp=window.webpackJsonp||[]).push([[48],{462:function(_,v,t){"use strict";t.r(v);var a=t(62),s=Object(a.a)({},(function(){var _=this,v=_.$createElement,t=_._self._c||v;return t("ContentSlotsDistributor",{attrs:{"slot-key":_.$parent.slotKey}},[t("h2",{attrs:{id:"fp-first-paint"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#fp-first-paint"}},[_._v("#")]),_._v(" FP（First Paint）")]),_._v(" "),t("p",[_._v("在衡量 Web 页面性能的时候有一个重要的指标叫"),t("code",[_._v("FP（First Paint）")]),_._v("，是指从页面加载到首次开始绘制的时长。其中一个重要的因素是"),t("code",[_._v("网络加载速度")]),_._v("。")]),_._v(" "),t("h2",{attrs:{id:"一个数据包的-旅程"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#一个数据包的-旅程"}},[_._v("#")]),_._v(" 一个数据包的“旅程”")]),_._v(" "),t("p",[_._v("互联网，实际上是一套理念和协议组成的体系架构。")]),_._v(" "),t("p",[_._v("互联网中的数据是通过数据包来传输的。如果发送的数据很大，那么该数据就会被拆分为很多小数据包来传输。")]),_._v(" "),t("h3",{attrs:{id:"_1-ip-把数据包送达目的主机"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_1-ip-把数据包送达目的主机"}},[_._v("#")]),_._v(" 1. IP：把数据包送达目的主机")]),_._v(" "),t("p",[_._v("数据包要在互联网上进行传输，就要符合网际协议（Internet Protocol，简称 IP）标准。")]),_._v(" "),t("p",[_._v("计算机的地址就称为 IP 地址，访问任何网站实际上只是你的计算机向另外一台计算机请求信息。")]),_._v(" "),t("p",[_._v("简化的 IP 网络三层传输模型:")]),_._v(" "),t("p",[t("img",{attrs:{src:"https://img-blog.csdnimg.cn/20201103153247579.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2thaW1vMzEz,size_16,color_FFFFFF,t_70#pic_center",alt:"在这里插入图片描述"}})]),_._v(" "),t("p",[_._v("如上图：")]),_._v(" "),t("p",[_._v("一个数据包从主机 A 到主机 B 的旅程：")]),_._v(" "),t("ul",[t("li",[_._v("上层将含有“极客时间”的数据包交给网络层；")]),_._v(" "),t("li",[_._v("网络层再将 IP 头附加到数据包上，组成新的 IP 数据包，并交给底层；")]),_._v(" "),t("li",[_._v("底层通过物理网络将数据包传输给主机 B；")]),_._v(" "),t("li",[_._v("数据包被传输到主机 B 的网络层，在这里主机 B 拆开数据包的 IP 头信息，并将拆开来的数据部分交给上层；")]),_._v(" "),t("li",[_._v("最终，含有“极客时间”信息的数据包就到达了主机 B 的上层了。")])]),_._v(" "),t("h3",{attrs:{id:"_2-udp-把数据包送达应用程序"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_2-udp-把数据包送达应用程序"}},[_._v("#")]),_._v(" 2. UDP：把数据包送达应用程序")]),_._v(" "),t("p",[_._v("IP 是非常底层的协议，只负责把数据包传送到对方电脑，但是对方电脑并不知道把数据包交给哪个程序，因此需要基于 IP 之上开发能和应用打交道的协议，最常见的是“用户数据包协议（User Datagram Protocol）”，简称 "),t("code",[_._v("UDP")]),_._v("。")]),_._v(" "),t("p",[_._v("IP 通过 IP 地址信息把数据包发送给指定的电脑，而 UDP 通过端口号把数据包分发给正确的程序。")]),_._v(" "),t("p",[_._v("简化的 UDP 网络四层传输模型:")]),_._v(" "),t("p",[t("img",{attrs:{src:"https://img-blog.csdnimg.cn/20201103153312650.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2thaW1vMzEz,size_16,color_FFFFFF,t_70#pic_center",alt:"在这里插入图片描述"}})]),_._v(" "),t("p",[_._v("如上图：")]),_._v(" "),t("p",[_._v("一个数据包从主机 A 旅行到主机 B 的路线：")]),_._v(" "),t("ul",[t("li",[_._v("上层将含有“极客时间”的数据包交给传输层；")]),_._v(" "),t("li",[_._v("传输层会在数据包前面附加上 UDP 头，组成新的 UDP 数据包，再将新的 UDP 数据包交给网络层；")]),_._v(" "),t("li",[_._v("网络层再将 IP 头附加到数据包上，组成新的 IP 数据包，并交给底层；")]),_._v(" "),t("li",[_._v("数据包被传输到主机 B 的网络层，在这里主机 B 拆开 IP 头信息，并将拆开来的数据部分交给传输层；")]),_._v(" "),t("li",[_._v("在传输层，数据包中的 UDP 头会被拆开，并根据 UDP 中所提供的端口号，把数据部分交给上层的应用程序；")]),_._v(" "),t("li",[_._v("最终，含有“极客时间”信息的数据包就旅行到了主机 B 上层应用程序这里。")])]),_._v(" "),t("p",[_._v("UDP 不能保证数据可靠性，但是传输速度却非常快")]),_._v(" "),t("h3",{attrs:{id:"_3-tcp-把数据完整地送达应用程序"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_3-tcp-把数据完整地送达应用程序"}},[_._v("#")]),_._v(" 3. TCP：把数据完整地送达应用程序")]),_._v(" "),t("blockquote",[t("p",[_._v("TCP（Transmission Control Protocol，传输控制协议）是一种面向连接的、可靠的、基于字节流的传输层通信协议。")])]),_._v(" "),t("p",[_._v("要求数据传输可靠性（reliability）的应用，如果使用 UDP 来传输会存在两个问题：")]),_._v(" "),t("ul",[t("li",[_._v("数据包在传输过程中容易丢失")]),_._v(" "),t("li",[_._v("大文件会被拆分成很多小的数据包来传输，这些小的数据包会经过不同的路由，并在不同的时间到达接收端，而 UDP 协议并不知道如何组装这些数据包，从而把这些数据包还原成完整的文件。")])]),_._v(" "),t("p",[_._v("相对于 UDP，TCP 有下面两个特点:")]),_._v(" "),t("ul",[t("li",[_._v("对于数据包丢失的情况，TCP 提供重传机制；")]),_._v(" "),t("li",[_._v("TCP 引入了数据包排序机制，用来保证把乱序的数据包组合成一个完整的文件。")])]),_._v(" "),t("p",[_._v("和 UDP 头一样，TCP 头除了包含了目标端口和本机端口号外，还提供了"),t("code",[_._v("用于排序的序列号")]),_._v("，以便接收端通过序号来"),t("code",[_._v("重排数据包")]),_._v("。")]),_._v(" "),t("p",[_._v("简化的 TCP 网络四层传输模型（TCP 下的单个数据包的传输流程）:")]),_._v(" "),t("p",[t("img",{attrs:{src:"https://img-blog.csdnimg.cn/20201103153340848.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2thaW1vMzEz,size_16,color_FFFFFF,t_70#pic_center",alt:"在这里插入图片描述"}})]),_._v(" "),t("p",[_._v("TCP 单个数据包的传输流程和 UDP 流程差不多，不同的地方在于，通过 TCP 头的信息保证了一块大的数据传输的完整性。")]),_._v(" "),t("h3",{attrs:{id:"一个-tcp-连接的生命周期"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#一个-tcp-连接的生命周期"}},[_._v("#")]),_._v(" 一个 TCP 连接的生命周期")]),_._v(" "),t("p",[t("code",[_._v("面向连接")]),_._v("：是指在数据通信开始之前先做好两端之间的准备工作。")]),_._v(" "),t("p",[t("code",[_._v("三次握手")]),_._v("：是指在建立一个 TCP 连接时，客户端和服务器总共要发送三个数据包以确认连接的建立。")]),_._v(" "),t("p",[t("img",{attrs:{src:"https://img-blog.csdnimg.cn/20201103153357190.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2thaW1vMzEz,size_16,color_FFFFFF,t_70#pic_center",alt:"在这里插入图片描述"}})]),_._v(" "),t("p",[_._v("1、首先，建立连接阶段")]),_._v(" "),t("blockquote",[t("p",[_._v("这个阶段是通过"),t("code",[_._v("三次握手")]),_._v("来建立客户端和服务器之间的连接。TCP 提供"),t("code",[_._v("面向连接")]),_._v("的通信传输。")])]),_._v(" "),t("p",[_._v("2、其次，传输数据阶段")]),_._v(" "),t("blockquote",[t("p",[_._v("在该阶段，接收端需要对每个数据包进行确认操作，也就是接收端在接收到数据包之后，需要发送确认数据包给发送端。所以当发送端发送了一个数据包之后，在规定时间内没有接收到接收端反馈的确认消息，则判断为数据包丢失，并触发发送端的重发机制。同样，一个大的文件在传输过程中会被拆分成很多小的数据包，这些数据包到达接收端后，接收端会按照 TCP 头中的序号为其排序，从而保证组成完整的数据。")])]),_._v(" "),t("p",[_._v("3、最后，断开连接阶段")]),_._v(" "),t("blockquote",[t("p",[_._v("数据传输完毕之后，就要终止连接了，涉及到最后一个阶段"),t("code",[_._v("四次挥手")]),_._v("来保证双方都能断开连接。")])]),_._v(" "),t("h2",{attrs:{id:"总结"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#总结"}},[_._v("#")]),_._v(" 总结")]),_._v(" "),t("ul",[t("li",[_._v("互联网中的数据是通过数据包来传输的，数据包在传输过程中容易丢失或出错。")]),_._v(" "),t("li",[_._v("IP 负责把数据包送达目的主机。")]),_._v(" "),t("li",[_._v("UDP 负责把数据包送达具体应用。")]),_._v(" "),t("li",[_._v("TCP 保证了数据完整地传输，它的连接可分为三个阶段：建立连接、传输数据和断开连接。")])]),_._v(" "),t("h2",{attrs:{id:"精选留言"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#精选留言"}},[_._v("#")]),_._v(" 精选留言")]),_._v(" "),t("p",[_._v("1、HTTP 协议和 TCP 协议都是 "),t("code",[_._v("TCP/IP")]),_._v(" 协议簇的子集。")]),_._v(" "),t("p",[_._v("HTTP 协议属于应用层，TCP 协议属于传输层，HTTP 协议位于 TCP 协议的上层。")]),_._v(" "),t("p",[_._v("请求方要发送的数据包，在应用层加上 HTTP 头以后会交给传输层的 TCP 协议处理，应答方接收到的数据包，在传输层拆掉 TCP 头以后交给应用层的 HTTP 协议处理。建立 TCP 连接后会顺序收发数据，请求方和应答方都必须依据 HTTP 规范构建和解析 HTTP 报文。")]),_._v(" "),t("p",[_._v("2、现在的浏览器可以同时打开多个页签，他们端口一样吗？如果一样，数据怎么知道去哪个页签？")]),_._v(" "),t("blockquote",[t("p",[_._v("作者回复: 端口一样的，网络进程知道每个 tcp 链接所对应的标签是那个，所以接收到数据后，会把数据分发给对应的渲染进程")])]),_._v(" "),t("p",[_._v("3、http 和 websocket 都是属于应用层的协议吗？")]),_._v(" "),t("blockquote",[t("p",[_._v("作者回复: 是的，他们都是应用层协议，而且 websocket 名字取的比较有迷惑性，其实和 socket 完全不一样，你可以把 websocket 看出是 http 的改造版本，增加了服务器向客户端主动发送消息的能力。")])]),_._v(" "),t("p",[_._v("4、tcp 传送数据时 浏览器端就做渲染处理了么？如果前面数据包丢了 后面数据包先来是要等么？类似的那种实时渲染怎么处理？针对数据包的顺序性？")]),_._v(" "),t("blockquote",[t("p",[_._v("作者回复: 接收到 http 响应头中的 content-type 类型时就开始准备渲染进程了，\n响应体数据一旦接受到便开始做 DOM 解析了！\n基于 http 不用担心数据包丢失的问题，因为丢包和重传都是在 tcp 层解决的。http 能保证数据按照顺序接收的！")])])])}),[],!1,null,null,null);v.default=s.exports}}]);