
//定义三维视图的主要类
let viewer, options, TDTLayerArr;

//地图初始化函数
function init() {
    //初始化球体
    initViewer();
    //加载天地图
    TDTLayerArr = addTDT();

    // 加载控件
    addControls()
    //飞到指定视角
    flyTo();
    // 加载geojson
    addGeoJSONLayer();

    getPrimitives()
}

//初始化球体
function initViewer() {
    //构造三维视图类（视图容器div的id，三维视图设置参数）
    viewer = new Cesium.Viewer(document.getElementById('mapgis-3d-viewer'), {
        imageryProvider: false,
        baseLayerPicker: false,
        timeline: false,
        infoBox: false,
        navigationHelpButton: false,
        fullscreenButton: false,
        animation: false,
        geocoder: false,
        homeButton: false,
        sceneModePicker: true,
        selectionIndicator: false

    });
    // viewer.maximumZoomDistance = 8;

    // 去除logo
    viewer.cesiumWidget.creditContainer.style.display = "none";
    //是否开启抗锯齿
    viewer.scene.fxaa = true;
    viewer.scene.postProcessStages.fxaa.enabled = true;


}

//加载天地图
function addTDT() {
    let TDTLayer_img = viewer.imageryLayers.addImageryProvider(new Cesium.WebMapTileServiceImageryProvider({
        //天地图URL，开发token （请到天地图官网申请自己的开发token，自带token仅做功能验证随时可能失效）
        url: "http://t0.tianditu.gov.cn/img_w/wmts?tk=f581acc25f8c0a5453d4f5c4e87fc8ff",
        //图层名称，vec：矢量底图、img：卫星影像底图、cva: 矢量注记图层（中文）、eva: 矢量注记图层（英文）、cia: 注记图层（中文）、eia: 注记图层（英文）、ter: 地形晕渲底图、cta: 注记（中文）、ibo: 全球国界
        layer: "img",
        //瓦片样式
        style: "default",
        //比例尺
        tileMatrixSetID: "w",
        //请求格式
        format: "tiles",
        // 设置天地图瓦片级别（很关键）
        maximumLevel: 18
    }), { show: false });

    let TDTLayer_cia = viewer.imageryLayers.addImageryProvider(new Cesium.WebMapTileServiceImageryProvider({
        //天地图URL，开发token （请到天地图官网申请自己的开发token，自带token仅做功能验证随时可能失效）
        url: "http://t0.tianditu.gov.cn/cia_w/wmts?tk=f581acc25f8c0a5453d4f5c4e87fc8ff",
        //图层名称，vec：矢量底图、img：卫星影像底图、cva: 矢量注记图层（中文）、eva: 矢量注记图层（英文）、cia: 注记图层（中文）、eia: 注记图层（英文）、ter: 地形晕渲底图、cta: 注记（中文）、ibo: 全球国界
        layer: "cia",
        //瓦片样式
        style: "default",
        //比例尺
        tileMatrixSetID: "w",
        //请求格式
        format: "tiles",
        // 设置天地图瓦片级别（很关键）
        maximumLevel: 18
    }),
        { show: false });

    let TDTLayer_ter = viewer.imageryLayers.addImageryProvider(new Cesium.WebMapTileServiceImageryProvider({
        //天地图URL，开发token （请到天地图官网申请自己的开发token，自带token仅做功能验证随时可能失效）
        url: "http://t0.tianditu.gov.cn/ter_w/wmts?tk=f581acc25f8c0a5453d4f5c4e87fc8ff",
        //图层名称，vec：矢量底图、img：卫星影像底图、cva: 矢量注记图层（中文）、eva: 矢量注记图层（英文）、cia: 注记图层（中文）、eia: 注记图层（英文）、ter: 地形晕渲底图、cta: 注记（中文）、ibo: 全球国界
        layer: "ter",
        //瓦片样式
        style: "default",
        //比例尺
        tileMatrixSetID: "w",
        //请求格式
        format: "tiles",
        // 设置天地图瓦片级别（很关键）
        maximumLevel: 8
    }),
        { show: false });
    let TDTLayer_cta = viewer.imageryLayers.addImageryProvider(new Cesium.WebMapTileServiceImageryProvider({
        //天地图URL，开发token （请到天地图官网申请自己的开发token，自带token仅做功能验证随时可能失效）
        url: "http://t0.tianditu.gov.cn/cta_w/wmts?tk=f581acc25f8c0a5453d4f5c4e87fc8ff",
        //图层名称，vec：矢量底图、img：卫星影像底图、cva: 矢量注记图层（中文）、eva: 矢量注记图层（英文）、cia: 注记图层（中文）、eia: 注记图层（英文）、ter: 地形晕渲底图、cta: 注记（中文）、ibo: 全球国界
        layer: "cta",
        //瓦片样式
        style: "default",
        //比例尺
        tileMatrixSetID: "w",
        //请求格式
        format: "tiles",
        // 设置天地图瓦片级别（很关键）
        maximumLevel: 8
    }),
        { show: false });

    let TDTLayer_vec = viewer.imageryLayers.addImageryProvider(new Cesium.WebMapTileServiceImageryProvider({
        //天地图URL，开发token （请到天地图官网申请自己的开发token，自带token仅做功能验证随时可能失效）
        url: "http://t0.tianditu.gov.cn/vec_w/wmts?tk=f581acc25f8c0a5453d4f5c4e87fc8ff",
        //图层名称，vec：矢量底图、img：卫星影像底图、cva: 矢量注记图层（中文）、eva: 矢量注记图层（英文）、cia: 注记图层（中文）、eia: 注记图层（英文）、ter: 地形晕渲底图、cta: 注记（中文）、ibo: 全球国界
        layer: "vec",
        //瓦片样式
        style: "default",
        //比例尺
        tileMatrixSetID: "w",
        //请求格式
        format: "tiles",
        // 设置天地图瓦片级别（很关键）
        maximumLevel: 18
    }));
    let TDTLayer_cva = viewer.imageryLayers.addImageryProvider(new Cesium.WebMapTileServiceImageryProvider({
        //天地图URL，开发token （请到天地图官网申请自己的开发token，自带token仅做功能验证随时可能失效）
        url: "http://t0.tianditu.gov.cn/cva_w/wmts?tk=f581acc25f8c0a5453d4f5c4e87fc8ff",
        //图层名称，vec：矢量底图、img：卫星影像底图、cva: 矢量注记图层（中文）、eva: 矢量注记图层（英文）、cia: 注记图层（中文）、eia: 注记图层（英文）、ter: 地形晕渲底图、cta: 注记（中文）、ibo: 全球国界
        layer: "cva",
        //瓦片样式
        style: "default",
        //比例尺
        tileMatrixSetID: "w",
        //请求格式
        format: "tiles",
        // 设置天地图瓦片级别（很关键）
        maximumLevel: 18
    }));

    return [TDTLayer_vec, TDTLayer_cva, TDTLayer_img, TDTLayer_cia, TDTLayer_ter, TDTLayer_cta]
}

// 添加地图控件
function addControls() {

    let optionsControl = {};
    // 用于在使用重置导航重置地图视图时设置默认视图控制。接受的值是Cesium.Cartographic 和 Cesium.Rectangle.
    optionsControl.defaultResetView = Cesium.Rectangle.fromDegrees(80, 22, 130, 50);
    // 用于启用或禁用罗盘。true是启用罗盘，false是禁用罗盘。默认值为true。如果将选项设置为false，则罗盘将不会添加到地图中。
    optionsControl.enableCompass = true;
    // 用于启用或禁用缩放控件。true是启用，false是禁用。默认值为true。如果将选项设置为false，则缩放控件将不会添加到地图中。
    optionsControl.enableZoomControls = true;
    // 用于启用或禁用距离图例。true是启用，false是禁用。默认值为true。如果将选项设置为false，距离图例将不会添加到地图中。
    optionsControl.enableDistanceLegend = true;
    // 用于启用或禁用指南针外环。true是启用，false是禁用。默认值为true。如果将选项设置为false，则该环将可见但无效。
    optionsControl.enableCompassOuterRing = true;

    CesiumNavigation.umd(viewer, optionsControl);

}

//飞到指定视角
function flyTo() {
    //飞到指定视角
    viewer.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(114.6126, 30.4601, 5000)
    });
}

// 加载geoserver发布的地图
function addGeoJSONLayer() {
    // http://localhost:8082/geoserver/wfs
    // 加载GeoJSON数据源
    // 设置 WFS 的 URL 地址和参数
    var wfsUrl = 'http://localhost:8082/geoserver/';
    var wfsParams = {
        service: 'WFS',
        version: '1.0.0',
        request: 'GetFeature',
        typeName: 'CugShape:建筑',
        outputFormat: 'application/json'
    };
    // 建筑
    $.ajax({
        url: 'http://localhost:8082/geoserver/CugShape/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=CugShape%3A%E5%BB%BA%E7%AD%91&maxFeatures=50&outputFormat=application%2Fjson',
        cache: false,
        async: true,
        success: function (dataSource) {
            let buildSource = new Cesium.GeoJsonDataSource('buildSource')
            buildSource.load(dataSource).then(function (dataSource) {
                // 将数据源添加到地图中
                viewer.dataSources.add(dataSource);
                let entities = dataSource.entities.values;
                for (let i = 0; i < entities.length; i++) {
                    const entity = entities[i];
                    entity.polygon.material = new Cesium.Color(0.5, 0.2, 0, 1);
                    entity.polygon.outline = true;
                    entity.polygon.outlineColor = Cesium.Color.BLACK;
                }
            })


        },
        error: function (data) {
            console.log("error");
        }
    })
    // 操场
    $.ajax({
        url: 'http://localhost:8082/geoserver/CugShape/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=CugShape%3A%E6%93%8D%E5%9C%BA&maxFeatures=50&outputFormat=application%2Fjson',
        cache: false,
        async: true,
        success: function (dataSource) {
            let playgroundSource = new Cesium.GeoJsonDataSource('playgroundSource')
            playgroundSource.load(dataSource).then(function (dataSource) {
                // 将数据源添加到地图中
                viewer.dataSources.add(dataSource);
                let entities = dataSource.entities.values;
                for (let i = 0; i < entities.length; i++) {
                    const entity = entities[i];
                    entity.polygon.material = new Cesium.Color(0.3, 0.5, 0.1, 1);
                    entity.polygon.outline = true;
                    entity.polygon.outlineColor = Cesium.Color.BLACK;
                }
            })


        },
        error: function (data) {
            console.log("error");
        }
    })

    // 人行道
    $.ajax({
        url: 'http://localhost:8082/geoserver/CugShape/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=CugShape%3A%E4%BA%BA%E8%A1%8C%E9%81%93&maxFeatures=50&outputFormat=application%2Fjson',
        cache: false,
        async: true,
        success: function (dataSource) {
            let pavementSource = new Cesium.GeoJsonDataSource('pavementSource')
            pavementSource.load(dataSource).then(function (dataSource) {
                // 将数据源添加到地图中
                viewer.dataSources.add(dataSource);
                const entities = dataSource.entities.values;
                for (let i = 0; i < entities.length; i++) {
                    const entity = entities[i];
                    entity.polyline.material = new Cesium.Color(0.5, 0.2, 0.4, 1);
                    entity.polyline.outline = true;
                    entity.polyline.outlineColor = Cesium.Color.BLACK;
                }

            }).otherwise(function (error) {
                console.log('错误')
                console.log(error);
            });

        },
        error: function (data) {
            console.log("error");
        }
    })

    //  水
    $.ajax({
        url: 'http://localhost:8082/geoserver/CugShape/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=CugShape%3A%E6%B0%B4&maxFeatures=50&outputFormat=application%2Fjson',
        cache: false,
        async: true,
        success: function (dataSource) {
            let waterSource = new Cesium.GeoJsonDataSource('waterSource')
            waterSource.load(dataSource).then(function (dataSource) {
                // 将数据源添加到地图中
                viewer.dataSources.add(dataSource);
                let entities = dataSource.entities.values;
                for (let i = 0; i < entities.length; i++) {
                    const entity = entities[i];
                    entity.polygon.material = new Cesium.Color(0.2, 0.2, 1, 1);
                    entity.polygon.outline = true;
                    entity.polygon.outlineColor = Cesium.Color.BLACK;
                }

            }).otherwise(function (error) {
                console.log('错误')
                console.log(error);
            });

        },
        error: function (data) {
            console.log("error");
        }
    })
    // 绿化
    $.ajax({
        url: 'http://localhost:8082/geoserver/CugShape/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=CugShape%3A%E7%BB%BF%E5%8C%96&maxFeatures=50&outputFormat=application%2Fjson',
        cache: false,
        async: true,
        success: function (dataSource) {
            let grassSource = new Cesium.GeoJsonDataSource('grassSource')
            grassSource.load(dataSource).then(function (dataSource) {
                // 将数据源添加到地图中
                viewer.dataSources.add(dataSource);
                let entities = dataSource.entities.values;
                for (let i = 0; i < entities.length; i++) {
                    const entity = entities[i];
                    entity.polygon.material = new Cesium.Color(0.4, 0.9, 0, 1);
                    entity.polygon.outline = true;
                    entity.polygon.outlineColor = Cesium.Color.BLACK;
                }

            }).otherwise(function (error) {
                console.log('错误')
                console.log(error);
            });

        },
        error: function (data) {
            console.log("error");
        }
    })
    // 球场

    $.ajax({
        url: 'http://localhost:8082/geoserver/CugShape/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=CugShape%3A%E7%90%83%E5%9C%BA&maxFeatures=50&outputFormat=application%2Fjson',
        cache: false,
        async: true,
        success: function (dataSource) {
            let ballgroundSource = new Cesium.GeoJsonDataSource('ballgroundSource')
            ballgroundSource.load(dataSource).then(function (dataSource) {
                // 将数据源添加到地图中
                viewer.dataSources.add(dataSource);
                let entities = dataSource.entities.values;
                for (let i = 0; i < entities.length; i++) {
                    const entity = entities[i];
                    entity.polygon.material = new Cesium.Color(0.5, 0.8, 0.2, 1);
                    entity.polygon.outline = true;
                    entity.polygon.outlineColor = Cesium.Color.BLACK;
                }

            }).otherwise(function (error) {
                console.log('错误')
                console.log(error);
            });

        },
        error: function (data) {
            console.log("error");
        }
    })
    // 道路
    $.ajax({
        url: 'http://localhost:8082/geoserver/CugShape/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=CugShape%3A%E9%81%93%E8%B7%AF&maxFeatures=50&outputFormat=application%2Fjson',
        cache: false,
        async: true,
        success: function (dataSource) {
            let roadSource = new Cesium.GeoJsonDataSource('roadSource')
            roadSource.load(dataSource).then(function (dataSource) {
                // 将数据源添加到地图中
                viewer.dataSources.add(dataSource);
                let entities = dataSource.entities.values;
                for (let i = 0; i < entities.length; i++) {
                    const entity = entities[i];
                    entity.polyline.material = new Cesium.Color(0.95, 0.5, 0, 1);
                    entity.polyline.outline = true;
                    entity.polyline.outlineColor = Cesium.Color.BLACK;
                }

            }).otherwise(function (error) {
                console.log('错误')
                console.log(error);
            });

        },
        error: function (data) {
            console.log("error");
        }
    })

    // 三维建筑
    $.ajax({
        url: 'http://localhost:8082/geoserver/CugShape/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=CugShape%3Aheightbuilds&maxFeatures=50&outputFormat=application%2Fjson',
        cache: false,
        async: true,
        success: function (dataSource) {
            let build3Source = new Cesium.GeoJsonDataSource('build3Source')
            build3Source.load(dataSource).then(function (dataSource) {
                // 将数据源添加到地图中
                viewer.dataSources.add(dataSource);
                let entities = dataSource.entities.values;
                for (let i = 0; i < entities.length; i++) {
                    const entity = entities[i];

                    entity.polygon.outline = true;
                    entity.polygon.outlineColor = Cesium.Color.BLACK;
                    entity.polygon.extrudedHeight = entity.properties.height;
                    if (entity.properties.height > 19) {
                        entity.polygon.material = new Cesium.Color(0.95, 0.9, 0.6, 1);
                    }
                    else {
                        entity.polygon.material = new Cesium.Color(0.95, 0.5, 0, 1);
                    }
                }


            }).otherwise(function (error) {
                console.log('错误')
                console.log(error);
            });
        },
        error: function (data) {
            console.log("error");
        }
    })

}

// 用于绘制
var handler = null;
//绘制点
function drawPoint() {
    if (handler) {
        handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
        handler.removeInputAction(Cesium.ScreenSpaceEventType.MOUSE_MOVE);
        handler.removeInputAction(Cesium.ScreenSpaceEventType.RIGHT_CLICK);
    }
    handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);

    handler.setInputAction((e) => {
        //笛卡尔坐标转换经纬度
        let ray = viewer.camera.getPickRay(e.position);
        let position = viewer.scene.globe.pick(ray, viewer.scene);
        let cartographic = Cesium.Cartographic.fromCartesian(position);
        let lon = Cesium.Math.toDegrees(cartographic.longitude);
        let lat = Cesium.Math.toDegrees(cartographic.latitude);
        //创建点
        let pointEntity = null;
        pointEntity = viewer.entities.add({
            position: Cesium.Cartesian3.fromDegrees(lon, lat),
            point: {
                pixelSize: 10,
                color: Cesium.Color.RED

            }
        });
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

    // 左键停止绘制点
    handler.setInputAction((e) => {
        handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
        handler.removeInputAction(Cesium.ScreenSpaceEventType.MOUSE_MOVE);
        handler.removeInputAction(Cesium.ScreenSpaceEventType.RIGHT_CLICK);
    }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
}

// 画线
// 保存所有点的数据
var polyline_point_arr = [];
// 临时线entity
var temporary_polyline_entity = null;
function drawLine() {
    click_draw_polyline()
    // 开启绘制的方法
    function click_draw_polyline() {
        // 清除可能会用到的监听事件
        if (handler) {
            handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
            handler.removeInputAction(Cesium.ScreenSpaceEventType.MOUSE_MOVE);
            handler.removeInputAction(Cesium.ScreenSpaceEventType.RIGHT_CLICK);
        }
        handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);

        //鼠标左键--确定选中点
        handler.setInputAction((event) => {
            // 屏幕坐标转为世界坐标
            let cartesian = viewer.scene.globe.pick(viewer.camera.getPickRay(event.position), viewer.scene);
            let ellipsoid = viewer.scene.globe.ellipsoid;
            let cartographic = ellipsoid.cartesianToCartographic(cartesian);
            let lat = Cesium.Math.toDegrees(cartographic.latitude);
            let lon = Cesium.Math.toDegrees(cartographic.longitude);
            // 判断是否定义（是否可以获取到空间坐标）
            if (Cesium.defined(cartesian)) {
                // 将点添加进保存线的坐标的数组中，鼠标停止移动的时添加的点和，点击时候添加的点，坐标一样
                // 注意顺序不能错了，先经度后纬度
                polyline_point_arr.push(lon);
                polyline_point_arr.push(lat);
                // 判断是否开始绘制动态线，没有的话则开始绘制
                if (temporary_polyline_entity == null) {
                    // 绘制动态线
                    draw_dynamic_polyline();
                }
            }

            //鼠标移动--实时绘制线
            handler.setInputAction((event) => {
                // 屏幕坐标转为世界坐标
                let cartesian = viewer.scene.globe.pick(viewer.camera.getPickRay(event.endPosition), viewer.scene);
                let ellipsoid = viewer.scene.globe.ellipsoid;
                let cartographic = ellipsoid.cartesianToCartographic(cartesian);
                let lon = Cesium.Math.toDegrees(cartographic.longitude);  // 经度
                let lat = Cesium.Math.toDegrees(cartographic.latitude);   // 纬度

                // 判断是否定义（是否可以获取到空间坐标）
                if (Cesium.defined(cartesian)) {
                    // 判断是否已经开始绘制动态线，已经开始的话，则可以动态拾取鼠标移动的点，修改点的坐标
                    if (temporary_polyline_entity) {
                        // 只要元素点大于二，每次就删除二个点，因为实时动态的点是添加上去的
                        if (polyline_point_arr.length > 2) {
                            // 删除数组最后两个元素（鼠标移动添加进去的点）
                            polyline_point_arr.pop();
                            polyline_point_arr.pop();
                        }
                        // 将新的点添加进动态线的坐标的数组中，用于实时变化，注意：这里是先添加了一个点，然后再删除点，再添加，这样重复的
                        // 注意顺序不能错了，先经度后纬度
                        polyline_point_arr.push(lon);
                        polyline_point_arr.push(lat);
                    }
                }
            }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
        }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

        //鼠标右键--结束绘制
        handler.setInputAction((event) => {
            // 取消鼠标移动监听
            handler.removeInputAction(Cesium.ScreenSpaceEventType.MOUSE_MOVE);
            // 清除动态绘制的线
            viewer.entities.remove(temporary_polyline_entity);
            // 删除保存的临时线的entity
            temporary_polyline_entity = null;
            // 绘制结果线
            draw_polyline();
            // 清空线点数组，用于下次绘制
            polyline_point_arr = [];
            // 清除所有事件
            if (handler) {
                handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
                handler.removeInputAction(Cesium.ScreenSpaceEventType.MOUSE_MOVE);
                handler.removeInputAction(Cesium.ScreenSpaceEventType.RIGHT_CLICK);
            }
        }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
    }

    //绘制动态线
    function draw_dynamic_polyline() {
        temporary_polyline_entity = viewer.entities.add({
            polyline: {
                positions: new Cesium.CallbackProperty(() => {
                    return new Cesium.Cartesian3.fromDegreesArray(polyline_point_arr);
                }, false),
                // 宽度
                width: 2,
                // 线的颜色
                material: Cesium.Color.RED,
                // 是否显示
                show: true
            }
        });
    }

    //绘制结果线
    function draw_polyline() {
        // 不需要线条闭合的话，删除最后一个动态添加的点（经度和纬度），如果鼠标没移动，最后一个和倒数第二个是一样的，所以也要删除
        polyline_point_arr.pop();
        polyline_point_arr.pop();
        // 需要线条闭合的话，下面两句(将起始点添加到结尾)
        // polyline_point_arr[polyline_point_arr.length - 2] = polyline_point_arr[0];
        // polyline_point_arr[polyline_point_arr.length - 1] = polyline_point_arr[1];
        // 两个点以上才能绘制成线
        if (polyline_point_arr.length >= 2) {
            let polyline_point_entity = viewer.entities.add({
                polyline: {
                    // Cesium.Cartesian3.fromDegreesArray([经度1, 纬度1, 经度2, 纬度2,])
                    // Cesium.Cartesian3.fromDegreesArrayHeights([经度1, 纬度1, 高度1, 经度2, 纬度2, 高度2])
                    // 如果有高度，上面的 polyline_point_arr 里面要增加高度的
                    positions: new Cesium.Cartesian3.fromDegreesArray(polyline_point_arr),
                    // 宽度
                    width: 2,
                    // 线的颜色
                    material: Cesium.Color.RED,
                    // 是否显示
                    show: true
                }
            });
        } else {
            return
        }
    }
}

// 绘制多边形
// 多边形全部点的数组
var polygon_point_arr = [];
// 临时多边形entity
var temporary_polygon_entity = null;
function drawpolygon() {
    click_draw_polygon()
    // 开启绘制的方法
    function click_draw_polygon() {
        // 清除可能会用到的监听事件
        if (handler) {
            handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
            handler.removeInputAction(Cesium.ScreenSpaceEventType.MOUSE_MOVE);
            handler.removeInputAction(Cesium.ScreenSpaceEventType.RIGHT_CLICK);
        }
        handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);

        //鼠标左键--确定选中点
        handler.setInputAction((event) => {
            // 屏幕坐标转为空间坐标
            let cartesian = viewer.camera.pickEllipsoid(event.position, viewer.scene.globe.ellipsoid);
            // 判断是否定义（是否可以获取到空间坐标）
            if (Cesium.defined(cartesian)) {
                // 将点添加进保存多边形点的数组中，鼠标停止移动的时添加的点和，点击时候添加的点，坐标一样
                polygon_point_arr.push(cartesian);
                // 判断是否开始绘制动态多边形，没有的话则开始绘制
                if (temporary_polygon_entity == null) {
                    // 绘制动态多边形
                    draw_dynamic_polygon();
                }
            }
        }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

        //鼠标移动--实时绘制多边形
        handler.setInputAction((event) => {
            // 屏幕坐标转为空间坐标
            let cartesian = viewer.camera.pickEllipsoid(event.endPosition, viewer.scene.globe.ellipsoid);
            // 判断是否定义（是否可以获取到空间坐标）
            if (Cesium.defined(cartesian)) {
                // 判断是否已经开始绘制动态多边形，已经开始的话，则可以动态拾取鼠标移动的点，修改点的坐标
                if (temporary_polygon_entity) {
                    // 只要元素点大于一，每次就删除一个点，因为实时动态的点是添加上去的
                    if (polygon_point_arr.length > 1) {
                        // 删除数组最后一个元素（鼠标移动添加进去的点）
                        polygon_point_arr.pop();
                    }
                    // 将新的点添加进动态多边形点的数组中，用于实时变化，注意：这里是先添加了一个点，然后再删除点，再添加，这样重复的
                    polygon_point_arr.push(cartesian);
                }
            }
        }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

        //鼠标右键--结束绘制
        handler.setInputAction((event) => {
            // 取消鼠标移动监听
            handler.removeInputAction(Cesium.ScreenSpaceEventType.MOUSE_MOVE);
            // 清除动态绘制的多边形
            viewer.entities.remove(temporary_polygon_entity);
            // 删除保存的临时多边形的entity
            temporary_polygon_entity = null;
            // 绘制结果多边形
            draw_polygon();
            // 清空多边形点数组，用于下次绘制
            polygon_point_arr = [];
            // 清除所有事件
            if (handler) {
                handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
                handler.removeInputAction(Cesium.ScreenSpaceEventType.MOUSE_MOVE);
                handler.removeInputAction(Cesium.ScreenSpaceEventType.RIGHT_CLICK);
            }
        }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
    }

    //绘制动态多边形
    function draw_dynamic_polygon() {
        temporary_polygon_entity = viewer.entities.add({
            polygon: {
                hierarchy: new Cesium.CallbackProperty(() => {
                    // PolygonHierarchy 定义多边形及其孔的线性环的层次结构（空间坐标数组）
                    return new Cesium.PolygonHierarchy(polygon_point_arr);
                }, false),
                extrudedHeight: 0,  // 多边体的高度（多边形拉伸高度）
                height: 0,  // 多边形离地高度
                material: Cesium.Color.RED.withAlpha(0.5),
            },
        });
    }

    //绘制结果多边形
    function draw_polygon() {
        // 删除最后一个动态添加的点，如果鼠标没移动，最后一个和倒数第二个是一样的，所以也要删除
        polygon_point_arr.pop();
        // 三个点以上才能绘制成多边形
        if (polygon_point_arr.length >= 3) {
            let polygon_point_entity = viewer.entities.add({
                polygon: {
                    hierarchy: polygon_point_arr,
                    extrudedHeight: 0,  // 多边体的高度（多边形拉伸高度）
                    height: 0,  // 多边形离地高度
                    material: new Cesium.Color(1.0, 0.0, 0.0, 1),
                    outline: true,
                    outlineColor: new Cesium.Color(0.0, 0.0, 0.0, 1.0),
                    outlineWidth: 50
                },
            });

        } else {
            return
        }
    }
}


var myPick = null;
// 选中对象弹出信息
function chooseEntity() {
    // 清除可能会用到的监听事件
    if (handler) {
        handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
        handler.removeInputAction(Cesium.ScreenSpaceEventType.MOUSE_MOVE);
        handler.removeInputAction(Cesium.ScreenSpaceEventType.RIGHT_CLICK);
    }
    handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);

    // 鼠标左键--确定选中点
    handler.setInputAction((click) => {
        let pick = viewer.scene.pick(click.position);
        console.log(pick)
        if (!Cesium.defined(pick)) {
            let ifShow = document.getElementById('attribute-panel')
            let navigation = document.getElementById('navigationDiv')
            if (ifShow.style.display != '') {
                ifShow.style.display = ''

                navigation.style.right = '2px'
                navigation.style.top = '16%'
            }
            document.getElementById('attribute-panel').style.display = ''
            return
        }
        else if (Cesium.defined(pick) && pick.id) {

            let ifShow = document.getElementById('attribute-panel')
            let navigation = document.getElementById('navigationDiv')
            if (ifShow.style.display == '') {
                ifShow.style.display = 'block'
                navigation.style.right = '24%'
                navigation.style.top = '-10%'
            }


            // getClickEntityInfo(pick)
            myPick = new GetEntity(pick);
            myPick.setInfo()
        }
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
}


// 选择实体的类
class GetEntity {
    constructor(pick) {
        this.pick = pick;
        this.id = pick.id._id;
        this.name = pick.id._name;
        console.log(this.id)
        this.color;
    }
    // 信息
    setInfo() {
        document.getElementById('pickId').innerHTML = this.id
        document.getElementById('pickName').innerHTML = this.name
    }
    // 颜色
    setColor() {
        const { a, r, g, b } = tinycolor(color).toRgb()
        if (this.pick.id._point) {
            this.pick.id.point.color = new Cesium.Color(r / 255, g / 255, b / 255, a)
        }
        else if (this.pick.id._polyline) {
            this.pick.id.polyline.material.color = new Cesium.Color(r / 255, g / 255, b / 255, a)
        }
        else if (this.pick.id._polygon) {
            console.log(viewer.entities)

            this.pick.id.polygon.material.color = new Cesium.Color(r / 255, g / 255, b / 255, a)
        }
    }
}

// 修改位置
function setPosition() {
    if (handler) {
        handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
        handler.removeInputAction(Cesium.ScreenSpaceEventType.MOUSE_MOVE);
        handler.removeInputAction(Cesium.ScreenSpaceEventType.RIGHT_CLICK);
    }
    handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);

    let leftDownFlag = false;
    let pick = null;
    handler.setInputAction((click) => {
        pick = viewer.scene.pick(click.position);
        if (Cesium.defined(pick) && pick.id) {
            leftDownFlag = true;
            // 锁定相机
            viewer.scene.screenSpaceCameraController.enableRotate = false; //锁定相机

            if (pick.id.point) {
                handler.setInputAction((movement) => {

                    if (leftDownFlag === true && pick != null) {
                        let ray = viewer.camera.getPickRay(movement.endPosition);
                        let cartesian = viewer.scene.globe.pick(ray, viewer.scene);
                        console.log(cartesian)

                        pick.id.position = cartesian;
                    }

                }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

                handler.setInputAction((movement) => {

                    if (leftDownFlag === true && pick != null) {
                        leftDownFlag = false;
                        viewer.scene.screenSpaceCameraController.enableRotate = true;//解锁相机
                    }
                }, Cesium.ScreenSpaceEventType.LEFT_UP);
            }
            else if (pick.id.polygon) {
                let lastMousePosition = click.position;
                console.log('外层')
                handler.setInputAction((movement) => {

                    if (leftDownFlag === true && pick != null) {
                        let ray = viewer.camera.getPickRay(movement.endPosition);
                        let cartesian = viewer.scene.globe.pick(ray, viewer.scene)

                        //射线与地球交点的坐标
                        if (lastMousePosition) {
                            // 计算鼠标移动距离的屏幕坐标向量
                            let xVector = cartesian.x - lastMousePosition.x
                            let yVector = cartesian.y - lastMousePosition.y
                            let zVector = cartesian.z - lastMousePosition.z

                            let originPosition = pick.id.polygon.hierarchy.getValue().positions
                            let newPositon = []
                            for (let i = 0; i < originPosition.length; i++) {
                                originPosition[i].x = originPosition[i].x + xVector
                                originPosition[i].y = originPosition[i].y + yVector
                                originPosition[i].z = originPosition[i].z + zVector
                                newPositon.push(originPosition[i])
                            }
                            pick.id.polygon.hierarchy = new Cesium.CallbackProperty(function () {
                                return new Cesium.PolygonHierarchy(newPositon)
                            }, false);

                            // 将修改后的坐标赋值给多边形实体的polygon.hierarchy属性
                            // pick.id.polygon.hierarchy = new Cesium.PolygonHierarchy(newPositon);

                        }
                        lastMousePosition = cartesian
                    }
                }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
            }

            handler.setInputAction((movement) => {

                if (leftDownFlag === true && pick != null) {
                    leftDownFlag = false;
                    viewer.scene.screenSpaceCameraController.enableRotate = true;//解锁相机
                }
            }, Cesium.ScreenSpaceEventType.LEFT_UP);
        }
    }, Cesium.ScreenSpaceEventType.LEFT_DOWN);



}

// 删除实体
function deleteEntity() {
    // 清除可能会用到的监听事件
    if (handler) {
        handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
        handler.removeInputAction(Cesium.ScreenSpaceEventType.MOUSE_MOVE);
        handler.removeInputAction(Cesium.ScreenSpaceEventType.RIGHT_CLICK);
    }
    handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);

    // 鼠标左键--确定选中点
    handler.setInputAction((click) => {
        let pick = viewer.scene.pick(click.position);
        if (Cesium.defined(pick) && pick.id) {
            viewer.entities.remove(pick.id)
        }
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
}

// 显示白膜建筑
function build3Show() {
    let viewSource = viewer.dataSources._dataSources
    for (let i = 0; i < viewSource.length; i++) {
        if (viewSource[i]._name == 'build3Source') {
            viewSource[i].show = !viewSource[i].show
        }
    }
}


