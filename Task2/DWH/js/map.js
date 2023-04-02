mapboxgl.accessToken = "pk.eyJ1Ijoienp6aWlpIiwiYSI6ImNsYmV1cWtqaTAwMWMzbnM3cGYzdG9xanEifQ.Y8VtfjgM1lBszfFHVoDsFw"

var vecSource = {
    "type": "raster",
    'tiles': [
        "http://t7.tianditu.gov.cn/vec_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=vec&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILECOL={x}&TILEROW={y}&TILEMATRIX={z}&tk=f5347cab4b28410a6e8ba5143e3d5a35"
    ],
    'tileSize': 256
};
var cvaSource = {
    "type": "raster",
    'tiles': [
        "http://t7.tianditu.gov.cn/cva_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cva&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILECOL={x}&TILEROW={y}&TILEMATRIX={z}&tk=f5347cab4b28410a6e8ba5143e3d5a35"
    ],
    'tileSize': 256
};

// 矢量图层
var vecLayer = {
    "id": "vecsrc",
    "type": "raster",
    "source": "vecsrc",
    "minzoom": 0,
    "maxzoom": 20
};
var cvaLayer = {
    "id": "cvasrc",
    "type": "raster",
    "source": "cvasrc",
    "minzoom": 0,
    "maxzoom": 20
};

var map = new mapboxgl.Map({
    // 地图容器div的id
    container: 'mb-map', // container id
    style: {
        //设置版本号，一定要设置
        "version": 8,
        //添加来源
        "sources": {
            "vecsrc": vecSource,
            "cvasrc": cvaSource
        },
        //设置加载并显示来源的图层信息
        "layers": [ vecLayer, cvaLayer],
    },
    center: [114.339408, 30.61271],
    zoom:12,
});


const draw = new MapboxDraw({
    displayControlsDefault: false,
    controls: {
            point: true,
            line_string: true,
            polygon: true,
            trash: true
        },
    });
map.addControl(draw);
