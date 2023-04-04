##  实习任务

1. 继续配置前端开发环境
   1. 下载`JQuery`和`OpenLayers`；
   2. 安装配置`NodeJS`开发环境
   3. 运行`OpenLayers`示例
2. 自选设计内容：小组成员学习使用`OpenLayers`和`MapBox`两种不同的`WebGIS`框架
3. 基于`Canvas`绘制小组图标

##  第三方库使用

###  `openlayers`

​        `openlayers `是一种用于 Web 地图开发的 JavaScript 库。它提供了一组丰富的 `API`，使得开发者能够在网页中添加地图、图层和交互元素，以及与地图进行交互。

`openlayers `支持众多的地图数据源和格式，包括 `Google Maps`、`Bing Maps`、`OpenStreetMap`、`WMS`、`WFS`、`KML`、`GeoJSON `等。它还支持多种投影方式，如 `Web Mercator`、`EPSG:4326`、`EPSG:3857` 等。

​      	通过 `openlayers`，开发者可以轻松地实现地图的可视化、搜索、标注、缩放、平移、旋转、测量等功能。同时，`openlayers `还支持自定义图层和控件，使得开发者可以根据自己的需求进行定制化开发。

​		总之，`openlayers `是一个功能强大、易用性高的 Web 地图开发库，适用于各种类型的地图应用程序。

​		官方网址：[OpenLayers - Welcome](https://openlayers.org/)

### `mapbox`

​        ` Mapbox GL JS` 是他们的一个开源客户端库，用于渲染 Web 端的可交互地图。作为 `Mapbox `生态系统的一部分，它通常与 `Mapbox `提供的其他服务集成在一起，统一对外使用。目前 `Mapbox `公司的主营业务除了地图相关产品，还包括 LBS(Location Based Services)服务、自动驾驶、自有数据(Boundaries, Traffic Data, Movement)以及车机服务。`Mapbox GL JS` 是一个 JavaScript 库，它使用 `WebGL `技术，以vector tiles方式数据组织，以`Mapbox styles`来配置地图样式规则，最终渲染得到交互式地图。`Mapbox GL` 生态系统的另一部分是`Mapbox Mobile`，它是一个用 C++ 编写的兼容桌面和移动平台的渲染引擎。

​		官方网址：[Mapbox GL JS | Mapbox](https://docs.mapbox.com/mapbox-gl-js/guides/)

###  `dat.gui`

​		`dat.gui` 是一个用于创建交互式调试界面的JavaScript库。它允许开发者轻松地创建自定义控件和面板来控制代码中的变量和参数，以方便开发者在调试过程中进行实时调整和查看。

​		`dat.gui` 最初由 Google 开发并由其开源，现在已经成为一个非常流行的开源项目。它提供了一组易于使用的`API`，可以用于创建各种类型的控件，包括滑块、复选框、文本框等等。开发者可以将这些控件组合在一起，创建一个自定义的面板，以便他们可以控制和监视代码中的变量和参数。

​		`dat.gui `还具有良好的可定制性，开发者可以自定义面板的外观和行为，以适应不同的应用场景。此外，它还支持多语言和适应不同的设备屏幕大小。

​		在Web开发、数据可视化和游戏开发等领域，`dat.gui `都是非常受欢迎的工具之一。它简单易用，功能强大，为开发者提供了一个快速、方便的调试界面。

​		官方网址：[dataarts/dat.gui: Lightweight controller library for JavaScript. (github.com)](https://github.com/dataarts/dat.gui)

##  TASK 2

###  段文豪

####  文件结构

```python
.
│  index.html 	# index
│  tree.txt
└─js
   map.js		# mapbox调用文件
```

####  粒子文字

```javascript
// 粒子类
class Particle {
    constructor(canvas, context, x, y) {
        this.canvas = canvas;
        this.context = context;
        this.x = x;
        this.y = y;
        this.radius = particleDensity / 2;        
        this.spring = {
            x: x, y: y
        };

        this.dX = 0;           
        this.dY = 0;
    }

    getDistanceTo(x, y){
        let dX = x - this.x,
            dY = y - this.y;
        return {
            x: dX, y: dY,
            dist: Math.sqrt(dX * dX + dY * dY)
        };
    }

    repulseTo(x, y){
        let distance = this.getDistanceTo(x, y),
            repulseAngle = Math.atan2(distance.y, distance.x),
            repulseForce = (-1 * Math.pow(mousePower, 2)) / distance.dist;

        this.dX += Math.cos(repulseAngle) * repulseForce;
        this.dY += Math.sin(repulseAngle) * repulseForce;        
    }

    springTo(){
        this.dX += (this.spring.x - this.x) * particleStiffness;
        this.dY += (this.spring.y - this.y) * particleStiffness;        
    }

    update(){
        this.springTo();

        this.dX *= particleFriction;
        this.dY *= particleFriction;

        this.x += this.dX;
        this.y += this.dY;
    }

    draw(){ 
        this.context.fillStyle = 'white';

        this.context.beginPath();
        this.context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        this.context.fill();        
    }
}
```





####  `Mapbox`画点线面



###  殷鹏成







###  张梓元







###  朱柏冰





