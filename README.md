# 互联网与移动`GIS`开发

[TOC]

## 编辑器选择

### Visual Studio Code

官网：[Visual Studio Code - Code Editing. Redefined](https://code.visualstudio.com/)

下载：

<img src="README.assets/image-20230324084435484.png" alt="image-20230324084435484" style="zoom:67%;" />

<center style="font-size:14px;color:#C0C0C0;">图1 VScode下载页面</center> 

快捷键：

1. 文件和编辑器操作：

- `Ctrl + N`：新建文件
- `Ctrl + O`：打开文件
- `Ctrl + S`：保存文件
- `Ctrl + Shift + S`：另存为
- `Ctrl + W`：关闭当前编辑器
- `Ctrl + Shift + T`：重新打开关闭的编辑器
- `Ctrl + P`：打开文件搜索框
- `Ctrl + Shift + F`：全局搜索
- `Ctrl + F`：在当前文件中搜索
- `Ctrl + Shift + H`：在当前文件中替换

2. 光标和选择操作：

- `Ctrl + ↑ / ↓`：向上 / 下移动一行
- `Ctrl + ← / →`：向左 / 右移动一个单词
- `Ctrl + Shift + ↑ / ↓`：向上 / 下选择多行
- `Ctrl + Shift + ← / →`：向左 / 右选择一个单词
- `Shift + Alt + ↑ / ↓`：向上 / 下复制一行
- `Shift + Alt + ← / →`：将当前行左 / 右缩进

3. 调试和运行操作：

- `F5`：启动调试
- `F9`：在当前行设置 / 取消断点
- `F10`：逐过程执行代码
- `F11`：逐语句执行代码
- `F12`：转到定义

4. 其他常用操作：

- `Ctrl + Shift + E`：打开侧边栏
- `Ctrl + Shift + G`：打开Git面板
- `Ctrl +``   ` ：打开终端
- `Ctrl + K, Ctrl + S`：打开键盘快捷键帮助文档

配置：

<center class="half">
       <img src="README.assets/image-20230324090854428.png" alt="image-20230324090854428" style="width:200;zoom:33%"/>
    <img src="README.assets/image-20230324085845734.png" alt="image-20230324085845734" style="width:200;zoom:33%" />
    <img src="README.assets/image-20230324085733583.png" alt="image-20230324085733583" style="width:200;zoom:33%" /></center>

### Sublime Text

官网：[Sublime Text - Text Editing, Done Right](https://www.sublimetext.com/)

下载：

<img src="README.assets/image-20230327154700293.png" alt="image-20230327154700293" style="zoom:50%;" />



   

## 第三方库使用

### JQuery
JQuery是一个快速、小巧、功能丰富的JavaScript库。它使HTML文档的遍历和操作、事件处理、动画和Ajax等事情变得更加简单，它有一个易于使用的API，可以在众多的浏览器上使用。凭借多功能性和可扩展性的结合，JQuery已经改变了数百万人编写JavaScript的方式。官网:[JQuery官网](https://jquery.com/)

```javascript
$(document).ready(function(){
  $("p").click(function(){
    $(this).hide();
  });
});

```

### Modernizr

Modernizr可用于响应用户的浏览器功能，Modernizr告诉你用户的浏览器可以提供哪些HTML、CSS和JavaScript功能。

Modernizr是一组超快的测试-或者称之为 "检测"-在你的网页加载时运行，然后你可以使用测试结果来为用户定制体验。所有网络开发者都会遇到浏览器和设备之间的差异。这主要是由于不同的功能集：最新版本的流行浏览器可以做一些旧版浏览器做不到的很棒的事情--但我们仍然要支持旧版浏览器。Modernizr使得提供分层体验变得很容易：在支持这些功能的浏览器中使用最新和最伟大的功能，而不至于让不那么幸运的用户感到无奈。

### Openlayers

### TweenMax

TweenMax是GreenSock Animation Platform(GSAP)动画平台核心文件。TweenMax.js集成了GreenSock动画平台的大部分核心功能,且具有极高的兼容性。相较于[Animate.css](https://animate.style/)，这个插件封装的的确很好，但在做一些缓动方面的动画，它也有一定的不足之处。TweenMax更方便，更快速，更清亮与模块化，灵活控制，不受限于线性序列，可以重叠动画序列。

### Normalize.css

Normalize.css是一个很小的CSS文件，它默认的HTML元素样式上提供了跨浏览器的高度一致性，相比传统的CSS reset，Normalize.css是一种现代的、为HTML5准备的优质替代方案。

Normalize.css官网地址：https://necolas.github.io/normalize.css/

### swiper.js

Swiper常用于移动端网站的内容触摸滑动，Swiper是纯javascript打造的滑动特效插件，面向手机、平板电脑等移动终端。Swiper能实现触屏焦点图、触屏Tab切换、触屏轮播图切换等常用效果。

### model-viewer

`<model-viewer>`是一个 Web 组件，使渲染交互式 3D 模型 - 可选在 AR 中 - 易于操作，在尽可能多的浏览器和设备上。 `<model-viewer>`努力为您提供出色的渲染质量默认值，并提高性能。

## 主页设计

### 设计参考

主要界面设计来自[Fullscreen Layout Page Transitions - Pure JS/CSS (codepen.io)](https://codepen.io/marcelo-ribeiro/pen/xOOKpO)。将主页面分成四部分，每部分可描述一次实习。

![image-20230327202033550](README.assets/image-20230327202033550.png)

这样的布局设计叫做`boxlayout`(箱式布局)，很适合多个独立的任务设计与多层内容描述。

### 设计细节

在根目录下的`js`文件夹和`css`文件夹中，分别有`boxlayout.js`和`component.css`。这两个文件控制了整体的布局和跳转。

```css
.bl-main > section {
	position: absolute;
	width: 50%;
	height: 50%;
}

.bl-main > section:first-child {
	top: 0;
	left: 0;
	background: #F06060;
}

.bl-main > section:nth-child(2) {
	top: 0;
	left: 50%;
	background: #FA987D;
}

.bl-main > section:nth-child(3) {
	top: 50%;
	left: 0;
	background: #72CCA7;
}

.bl-main > section:nth-child(4) {
	top: 50%;
	left: 50%;
	background: #10A296;
}
```

上述代码，是控制四个`box`入口的样式，四个section分别占据左上、右上、左下、右下，分别对应Task1， Task2， Task3， Task4。

```javascript
$section.on( 'click', function() {
    console.log('open')
    if( !$section.data( 'open' ) ) {
        $section.data( 'open', true ).addClass( 'bl-expand bl-expand-top' );
        $el.addClass( 'bl-expand-item' );	
    }
} ).find( 'span.bl-icon-close' ).on( 'click', function() {
    $section.data( 'open', false ).removeClass( 'bl-expand' ).on( transEndEventName, function( event ) {
        if( !$( event.target ).is( 'section' ) ) return false;
        $( this ).off( transEndEventName ).removeClass( 'bl-expand-top' );
    } );

    if( !supportTransitions ) {
        $section.removeClass( 'bl-expand-top' );
    }

    $el.removeClass( 'bl-expand-item' );

    return false;
} );
```

上述代码绑定和监听点击事件，控制页面跳转。

当然上述代码只是部分内容的，完整的控制需要全部代码发挥作用。这里大部分是根据参考提供的，进行了少部分调整。

## Task1

通过github page，可以访问我们的网站，但由于github的网络问题，不能访问天地图。地址：[互联网与移动GIS开发任务作业 (dwh553321494.github.io)](https://dwh553321494.github.io/webgis_task/)

实习已经部署到了服务器上面，域名尚未通过，现阶段只能通过公网ip访问：[互联网与移动GIS开发任务作业](http://47.92.251.195:8080/)

### 整体的导航设计

![image-20230327203904571](README.assets/image-20230327203904571.png)

一个二级标题的Task1，加一段p标签，对实习一内容进行简单介绍。

下面的四个图片分别对应每个人主页的入口。点击图片即可查看每个人的个人主页。

### 段文豪部分

#### 文件结构

```python
./DWH
│  index.html				# 主页
│  test.html				# openlayers示例
├─css
│      code.css				# code框的样式
│      mySwiper.css		     # 滑轮轴的样式
│      nva.css				# 导航栏的样式
│      
├─imgs					    # 存放的图片
│      cute.JPG
│      good.JPG
│      jquery.png
│      life.JPG
│      swiper.jpg
│      tool.glb
│      TweenMax.svg
│      夕阳.JPG
│      太阳.glb
│      
└─js						# js文件
        mySwiper.js			  # 滑轮轴的事件监听js文件
        nav.js			      # 导航栏的事件监听js文件
```

#### 个人主页展示

（1）顶部

![image-20230327205137997](README.assets/image-20230327205137997.png)

这里是顶部展示，主要是一个太阳三维模型加一主标题和一副标题。箭头指向后续内容。

太阳模型来自：[iconfont-阿里巴巴矢量图标库](https://www.iconfont.cn/illustrations_3d/detail?spm=a313x.7781069.1998910419.d9df05512&cid=44075)

（2）个人介绍

![image-20230327205354809](README.assets/image-20230327205354809.png)

随着滚轮的滚动，个人介绍和导航栏会展示出来。

这个设计想法是看了很多卡片设计之后想出来的，配色是参考[免费的渐变背景CSS3样式 | oulu.me](http://color.oulu.me/)。然后加上滚轮，就可以加入自己任意想加的内容，我这里加了三个。

![image-20230327205935745](README.assets/image-20230327205935745.png)

![image-20230327205954316](README.assets/image-20230327205954316.png)

![image-20230327210014555](README.assets/image-20230327210014555.png)

1. 第一个是我的一个自我介绍，图片是这个月去东湖拍的，刚好碰上日落。
    点击知乎主页，可以跳转到我的知乎个人主页。

![image-20230327210212991](README.assets/image-20230327210212991.png)

2. 第二个是关于我目前的专业学习。图片很好的诠释了目前的学习生活状态，每天差不多就是这么几步。
    点击GitHub主页可以跳转到我的github个人主页，虽里面没啥东西。
    ![image-20230327210515729](README.assets/image-20230327210515729.png)
3. 第三个是未来的打算，目前现阶段最主要目标就是升学了，最近捣鼓比较多的还是前端，只不过偏向于一些设计方面的了，感觉不能就简单的添加一些控件就行，要注重流畅和方便。研究生期间想要继续研究遥感智能解译相关的算法，期待早日开发出一款属于遥感的GPT！
    图片选自动漫《排球少年！！》，这个少年的发色跟背景图颜色一样！

（3）json格式解读

![image-20230327210938354](README.assets/image-20230327210938354.png)

这里没有说从本地请求一个json文件，而是解释一下json格式和举了一个例子。关于json格式常用于前后端的交互，在WebGIS中有另一常见的传输格式--GeoJson。其与普通的json区别就是以特定的结构储存地理信息，但结构上与json格式保持一致，同样也是键值对。其可直接由一些地理GIS库进行解读，而其实以传统json格式记录地理信息，同样也可以用于地理信息的传输。

而传输时的工具常用的是`ajax`，其封装好了请求方法，例如`get`、`post`、`delete`等。在vue中，用axios可以很方便的进行二次封装，很方便地可以用在前后端分离的项目中。

（4）openlayers体验

![image-20230327211631144](README.assets/image-20230327211631144.png)

这里简单地用`openlayers`调用了一次天地图。后面的实习中可能也主要依据`openlayers`实现一些有意思的`gis`操作。

（5）技术介绍

![image-20230327211908573](README.assets/image-20230327211908573.png)

这一些就是我这次实习用的一些js库，均为`cdn`引入，如果为本地浏览文件，可能无法发送请求。

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/2.0.1/TweenMax.min.js"></script>
<script type="module" src="https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/Swiper/4.3.5/js/swiper.min.js"></script>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/5.0.0/normalize.min.css"/>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/Swiper/4.3.5/css/swiper.min.css"/>
```

（6）footer部分

![image-20230327212119898](README.assets/image-20230327212119898.png)

阐述本次实习参考网页，和后续目标。希望在后面的学习中有更多的思考和感悟。

#### 遇到的问题

1. 插入的`html`的滚轮隐藏问题。

在`iframe`中提供一个属性`frameborder`用于隐藏边框，同样也提供一个属性`scrolling`用于控制滚动条的显示，但在实际中这个属性发挥的作用是隐藏了滚动条，但不允许滚动`iframe`插入的`html`的内容。

后面查询资料，只要在html中把滚动条隐藏即可。

```css
body::-webkit-scrollbar {
    display: none;
}
```

2. 一个在`css`上的bug

在使用我的导航栏时，在点击完后，整体的页面均往上移，尚未解决。

![image-20230328150235218](README.assets/image-20230328150235218.png)

