
//定义三维视图的主要类
let viewer, options, TDTLayerArr;
let schoolGeo = {
    "type": "FeatureCollection",
    "features": [
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [87.5813, 43.7784]
            },
            "properties": {
                "school": "primaryschool"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [117.2417, 31.8177]
            },
            "properties": {
                "school": "juniorschool"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [117.2757, 31.7384]
            },
            "properties": {
                "school": "seniorschool"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [114.6009, 30.4891]
            },
            "properties": {
                "school": "university"
            }
        }
    ]
}

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
    //初始化示例UI操作

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
        sceneModePicker: true

    });
    viewer.maximumZoomDistance = 8;
    viewer.scene.postProcessStages.fxaa.enabled = true
    // 去除logo
    viewer.cesiumWidget.creditContainer.style.display = "none";


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
        destination: Cesium.Cartesian3.fromDegrees(116.5258, 41.8054, 20000000)
    });
}


// 加载geojson
function addGeoJSONLayer() {
    // 加载GeoJSON数据源
    Cesium.GeoJsonDataSource.load(schoolGeo, {}).then(function (dataSource) {

        // 将数据源添加到地图中
        viewer.dataSources.add(dataSource);
        const entities = dataSource.entities.values;
        console.log(dataSource)

        entities.forEach(entity => {
            // 重置图片，图片大小，大小单位为米
            entity.billboard.image = '../asset/image/学校.png'
            entity.billboard.width = 40;
            entity.billboard.height = 40;
            entity.billboard.sizeInMeters = false;
        })
    }).otherwise(function (error) {
        // 如果加载出错，输出错误信息
        console.log(error);
    });
}

function getSchoolPosition(school) {
    for (var i = 0; i < viewer.dataSources.length; i++) {
        var dataSource = viewer.dataSources.get(i);
        // 如果是 GeoJSON 数据源
        if (dataSource instanceof Cesium.GeoJsonDataSource) {
            // 获取数据源中的所有实体
            var entities = dataSource.entities.values;
            // 将所有实体添加到数组中
            for (var j = 0; j < entities.length; j++) {
                if (entities[j].properties.school._value == school) {
                    return entities[j]
                }
            }

        }
    }
}
function flyToPos(school) {
    switch (school) {
        case 'primaryschool':
            viewer.flyTo(getSchoolPosition(school));
        case 'juniorschool':
            viewer.flyTo(getSchoolPosition(school));
        case 'seniorschool':
            viewer.flyTo(getSchoolPosition(school));
        case 'university':
            viewer.flyTo(getSchoolPosition(school));
    }
}

