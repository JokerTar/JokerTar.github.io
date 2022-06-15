(window.webpackJsonp=window.webpackJsonp||[]).push([[25],{437:function(a,t,s){"use strict";s.r(t);var e=s(62),r=Object(e.a)({},(function(){var a=this,t=a.$createElement,s=a._self._c||t;return s("ContentSlotsDistributor",{attrs:{"slot-key":a.$parent.slotKey}},[s("h2",{attrs:{id:"问题"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#问题"}},[a._v("#")]),a._v(" 问题")]),a._v(" "),s("p",[a._v("在开发新需求分支里，要切换到送测版本分支修改bug时；")]),a._v(" "),s("p",[a._v("怎么使用git命令行工具时去切换分支？")]),a._v(" "),s("h2",{attrs:{id:"方法"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#方法"}},[a._v("#")]),a._v(" 方法")]),a._v(" "),s("blockquote",[s("p",[a._v("接下来我用一个当前开发版本"),s("code",[a._v("develop-portal")]),a._v(",切换到送测版本"),s("code",[a._v("feature-1.0.12-fix")]),a._v("为例")])]),a._v(" "),s("p",[a._v("1、清屏")]),a._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{pre:!0,attrs:{class:"token function"}},[a._v("clear")]),a._v("\n")])])]),s("p",[a._v("2、查看远程分支")]),a._v(" "),s("blockquote",[s("p",[a._v("可以看到远程分支有很多")])]),a._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{pre:!0,attrs:{class:"token function"}},[a._v("git")]),a._v(" branch -a\n")])])]),s("p",[s("img",{attrs:{src:"https://img-blog.csdnimg.cn/20191212152227280.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2thaW1vMzEz,size_16,color_FFFFFF,t_70",alt:"在这里插入图片描述"}})]),a._v(" "),s("p",[a._v("3、查看本地分支")]),a._v(" "),s("blockquote",[s("p",[a._v("可以看到当前分支是"),s("code",[a._v("develop-portal")])])]),a._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{pre:!0,attrs:{class:"token function"}},[a._v("git")]),a._v(" branch\n")])])]),s("p",[s("img",{attrs:{src:"https://img-blog.csdnimg.cn/20191212152249895.png",alt:"在这里插入图片描述"}})]),a._v(" "),s("p",[a._v("4、切换分支")]),a._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{pre:!0,attrs:{class:"token function"}},[a._v("git")]),a._v(" checkout -b feature-1.0.12-fix origin/feature-1.0.12-fix\n")])])]),s("p",[a._v("如果出现类似"),s("code",[a._v("fatal: A branch named 'feature-1.0.12-fix' already exists.")]),a._v(" 这样的提示就说明你本地已经有这个分支。执行下面命令就行。")]),a._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{pre:!0,attrs:{class:"token function"}},[a._v("git")]),a._v(" checkout feature-1.0.12-fix\n")])])]),s("p",[s("img",{attrs:{src:"https://img-blog.csdnimg.cn/20191212152315928.png",alt:"在这里插入图片描述"}})])])}),[],!1,null,null,null);t.default=r.exports}}]);