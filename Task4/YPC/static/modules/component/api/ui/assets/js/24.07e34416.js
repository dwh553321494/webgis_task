(window.webpackJsonp=window.webpackJsonp||[]).push([[24],{526:function(t,s,a){t.exports=a.p+"assets/img/border-box-bug.85568132.png"},527:function(t,s,a){t.exports=a.p+"assets/img/border-box-bug2.393d9746.png"},578:function(t,s,a){"use strict";a.r(s);var n=a(13),e=Object(n.a)({},(function(){var t=this,s=t._self._c;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h1",{attrs:{id:"解决引入本组件后box-sizing在全局中被设置为了border-box及其导致的样式问题-webclient-vue-mapboxgl同样适用"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#解决引入本组件后box-sizing在全局中被设置为了border-box及其导致的样式问题-webclient-vue-mapboxgl同样适用"}},[t._v("#")]),t._v(" 解决引入本组件后box-sizing在全局中被设置为了border-box及其导致的样式问题（webclient-vue-mapboxgl同样适用）")]),t._v(" "),s("p",[t._v("本组件所引用的Antd中的antd.css文件将"),s("strong",[t._v("box-sizing")]),t._v("全局设置为了"),s("strong",[t._v("border-box")]),t._v("。")]),t._v(" "),s("p",[t._v("因此在某些未使用Antd的项目中，引用本组件后有可能会出现与盒模型相关的样式问题，如下面的示例：")]),t._v(" "),s("h2",{attrs:{id:"错误示例"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#错误示例"}},[t._v("#")]),t._v(" 错误示例：")]),t._v(" "),s("p",[t._v("说明：下图为引用webclient-vue-ui后的错误界面，在本示例中，由于元素的height和padding均是按照"),s("strong",[t._v("box-sizing")]),t._v("的默认值"),s("strong",[t._v("content-box")]),t._v("类型来写的，而本组件的引入导致"),s("strong",[t._v("box-sizing")]),t._v("被全局设置为了"),s("strong",[t._v("border-box")]),t._v("，使得该元素的高度由之前正确的"),s("strong",[t._v("40px")]),t._v("(height+padding)变为了错误的"),s("strong",[t._v("20px")]),t._v("(height)。")]),t._v(" "),s("img",{attrs:{alt:"bug示例",src:a(526),width:"100%"}}),t._v(" "),s("p",[t._v("以下为3种解决方案，推荐使用方案1：")]),t._v(" "),s("h2",{attrs:{id:"解决方案1-元素样式设置box-sizing-推荐"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#解决方案1-元素样式设置box-sizing-推荐"}},[t._v("#")]),t._v(" 解决方案1：元素样式设置box-sizing（推荐）")]),t._v(" "),s("p",[t._v("在需要修改的元素的样式中增加一行：")]),t._v(" "),s("div",{staticClass:"language-css extra-class"},[s("pre",{pre:!0,attrs:{class:"language-css"}},[s("code",[s("span",{pre:!0,attrs:{class:"token property"}},[t._v("box-sizing")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" content-box"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),s("p",[t._v("例如，以上示例修改为：")]),t._v(" "),s("div",{staticClass:"language-css extra-class"},[s("pre",{pre:!0,attrs:{class:"language-css"}},[s("code",[s("span",{pre:!0,attrs:{class:"token selector"}},[t._v(".content-div ul li")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v("height")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" 20px"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v("padding")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" 10px 0"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v("box-sizing")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" content-box"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" // 增加该行\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),s("p",[t._v("修改完成后，可以看到界面正确显示:\n"),s("img",{attrs:{alt:"bug示例",src:a(527),width:"100%"}})]),t._v(" "),s("h2",{attrs:{id:"解决方案2-按照border-box类型来修改元素高度等信息"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#解决方案2-按照border-box类型来修改元素高度等信息"}},[t._v("#")]),t._v(" 解决方案2：按照border-box类型来修改元素高度等信息")]),t._v(" "),s("p",[t._v("例如，以上示例经过计算得到"),s("strong",[t._v("border-box")]),t._v("类型下元素的高度实际为40px，因此修改高度为：")]),t._v(" "),s("div",{staticClass:"language-css extra-class"},[s("pre",{pre:!0,attrs:{class:"language-css"}},[s("code",[s("span",{pre:!0,attrs:{class:"token selector"}},[t._v(".content-div ul li")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v("height")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" 40px"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("  // 修改为实际高度\n    "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v("padding")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" 10px 0"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),s("p",[t._v("该方案也可解决此类问题，但某些情况下（如height为100%）修改会相对困难，不建议应用此方案。")]),t._v(" "),s("h2",{attrs:{id:"解决方案3-在项目的app-vue文件中全局设置-慎用"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#解决方案3-在项目的app-vue文件中全局设置-慎用"}},[t._v("#")]),t._v(" 解决方案3：在项目的App.vue文件中全局设置（慎用）")]),t._v(" "),s("p",[t._v("在项目的App.vue文件的style中加入以下内容：")]),t._v(" "),s("div",{staticClass:"language-css extra-class"},[s("pre",{pre:!0,attrs:{class:"language-css"}},[s("code",[s("span",{pre:!0,attrs:{class:"token selector"}},[t._v("*,\n*::before,\n*::after")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v("box-sizing")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" content-box "),s("span",{pre:!0,attrs:{class:"token important"}},[t._v("!important")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),s("p",[t._v("该方案会将全局的"),s("strong",[t._v("box-sizing")]),t._v("都设置为"),s("strong",[t._v("content-box")]),t._v("且无法覆盖，容易造成其他样式无法兼容的问题，因此不建议采用此方案。")])])}),[],!1,null,null,null);s.default=e.exports}}]);