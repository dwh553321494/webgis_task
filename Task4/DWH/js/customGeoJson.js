import {map} from './3Dmodel.js'
// import { currentFeatureId as currentfeatureid, currentFeature as currentfeature,currentSource as currentsource} from './loadGeoJSON.js';
import { event, allData } from './loadGeoJSON.js';
// 请求geojson
let  custom = null;
$.ajax({
    url: './data/custom.geojson',
    method: 'GET',
    dataType: 'json',
    success:(response)=>{
        custom = response
        // console.log("part buildings", custom)
        allData['custom-geojson'] = custom
    },
    error:(error)=>{
        console.log(error);
    }
});


var custom_point = {
    id: 'custom-points',
    type: 'circle',
    source: 'custom-geojson',
    paint:{
        'circle-radius':['get', 'radius'],
        'circle-color': ["case",
            ["boolean", ["feature-state", "hover"], false],
            '#0080ff',
            ['get', 'color']
        ],
        'circle-opacity': ['get', 'opacity'],
        'circle-stroke-width': ['get', 'strokeWidth'],
        'circle-stroke-color': ['get', 'strokeColor'],
        'circle-stroke-opacity':['get', 'strokeOpacity']
    },
    filter: ['in', '$type', 'Point']
}

var custom_line = {
    id: 'custom-lines',
    type: 'line',
    source: 'custom-geojson',
    layout:{
        'line-cap': 'round',
        'line-join':'round'
    },
    paint:{
        'line-color': ["case",
            ["boolean", ["feature-state", "hover"], false],
            '#0080ff',
            ['get', 'color']
        ],
        'line-width': ['get', 'width'],
        'line-opacity':['get', 'opacity'],
        // 'line-gap-width':2
    },
    filter: ['in', '$type', 'LineString']
}

var custom_polygon = {
    id: 'custom-polygons',
    type: 'fill',
    source: 'custom-geojson',
    layout:{
    },
    paint:{
        'fill-color': ["case",
            ["boolean", ["feature-state", "hover"], false],
            '#0080ff',
            ['get', 'color']
        ],
        'fill-opacity':['get', 'opacity'],
        'fill-outline-color':['get', 'outlineColor']
    },
    filter: ['in', '$type', 'Polygon']
}
map.on('load',()=>{
    map.addSource('custom-geojson',{
        'type': 'geojson',
        'data': custom,
        generateId: true
    });
    
    // 点
    map.addLayer(custom_point)
    // 线
    map.addLayer(custom_line)
    // 面
    map.addLayer(custom_polygon)
})

$("#customLayer").on("click", ()=>{
    if($("#customLayer").prop("checked")){
         // 点
        map.addLayer(custom_point)
        // 线
        map.addLayer(custom_line)
        // 面
        map.addLayer(custom_polygon)

    }else{
        map.removeLayer("custom-points")
        map.removeLayer("custom-lines")
        map.removeLayer("custom-polygons")

    }
})


const existLayersIds = [];
// 图层高亮集合
let layerHighlights = {};   // {layerId:{id,source},...}

// 图层属性集合
let layerProperties = {};   // {layerId:{layerName:'',key1:value1,key2:value2,...}}
// 当前选中的要素
let  currentFeature = null;
let  currentFeatureId = null;
let  currentSource = null

window.addEventListener('currentData',(e)=>{
    currentFeature = e.detail.currentfeature;
    currentFeatureId = e.detail.currentfeatureid;
    currentSource = e.detail.currentsource;
    // console.log('event', e)
})
window.dispatchEvent(event)

// 实现属性查询及高亮
map.on('click', function (e) {
    // 属性集合清空
    layerProperties = {};
    // console.log('object', e);
    const bbox = [
        [e.point.x - 5, e.point.y - 5],
        [e.point.x + 5, e.point.y + 5]
    ];
    const existLayers = map.getStyle().layers;
    existLayers.forEach(existLayer => {
        var existLayerId = existLayer.id;
        if (existLayerId.includes('custom-points') || existLayerId.includes('custom-lines') || existLayerId.includes('custom-polygons')) {
            existLayersIds.push(existLayer.id);
        }
    });

    // 获取点击选中的要素
    let renderFeatures = map.queryRenderedFeatures(bbox, { layers: existLayersIds });
    renderFeatures.forEach(renderFeature => {
        // console.log('renderFeature', renderFeature);
        const { id, layer, source, properties } = renderFeature;
        // console.log(id)
        // 属性数据存储
        layerProperties[layer.id] = properties;

        // ----------------------------------
        // 这里是高亮部分
        // 添加新的高亮
        map.setFeatureState(
            { source, id },
            { hover: true }
        );
        
        // 更新图层高亮集合
        layerHighlights[layer.id] = { id, source };
        // ----------------------------------------

        // 更新样式版内容
        var currentFeature1 = allData['custom-geojson'].features[id]
        var currentFeatureId1 = id
        var currentSource1 = source
        // console.log('111')
        // console.log('custom feature111', currentFeature1)

        window.addEventListener('currentData',(e)=>{
            // console.log('custom feature', currentFeature1)
            e.detail.currentfeature = currentFeature1;
            e.detail.currentfeatureid = currentFeatureId1;
            e.detail.currentsource = currentSource1;
            // console.log('custom event', e)
        })
        window.dispatchEvent(event)
        if (currentFeature.geometry.type == "Point"){
            var circleRadius = document.getElementById("circle-radius");
            var circleOpacity = document.getElementById("circle-opacity")
            var circleColor = document.getElementById('circleColor');
            var circleStrokeWidth = document.getElementById('circleStrokeWidth')
            var circleStrokeOpacity = document.getElementById('circleStrokeOpacity')
            var circleStrokeColor = document.getElementById("circleStrokeColor")
            circleRadius.value = currentFeature.properties.radius
            circleOpacity.value = currentFeature.properties.opacity
            circleColor.value = currentFeature.properties.color
            circleStrokeColor.value = currentFeature.properties.strokeColor
            circleStrokeOpacity.value = currentFeature.properties.strokeOpacity
            circleStrokeWidth.value = currentFeature.properties.strokeWidth

        }else if(currentFeature.geometry.type == "LineString"){
            document.getElementById("line-width").value = currentFeature.properties.width
            document.getElementById("line-opacity").value = currentFeature.properties.opacity
            document.getElementById("lineColor").value = currentFeature.properties.color
        }else if(currentFeature.geometry.type == "Polygon"){
            document.getElementById("outlineColor").value = currentFeature.properties.outlineColor
            document.getElementById("polygon-opacity").value = currentFeature.properties.opacity
            document.getElementById("polygonColor").value = currentFeature.properties.color
        }

    });

    const contents = [];
    for (let i in layerProperties) {
        const properties = layerProperties[i];
        for (let p in properties) {
            if(p=='name'){
                const content = `<h2>${properties[p]}</h2>`
                contents.push(content);
            }else if( p == 'description'){
                const content = `<p><span>${properties[p]}</span></p>`
                contents.push(content);
            }
        }
    }

    const propertiesContent = `${contents.join('')}`;

    // 属性展示
    if (Object.keys(layerProperties).length > 0) {
        var popup = new mapboxgl.Popup()
            .setLngLat(e.lngLat)
            .setHTML(propertiesContent)
            .addTo(map);
        // 关闭 popup
        popup.on('close', function(e){
            let renderFeatures = map.queryRenderedFeatures(bbox, { layers: existLayersIds });
            renderFeatures.forEach(renderFeature => {
                const { id, layer, source, properties } = renderFeature;
                // 属性数据存储
                layerProperties[layer.id] = properties;

                for (let i in layerHighlights) {
                    // 取消上次高亮
                    if (i === layer.id) {
                        const { id, source } = layerHighlights[i];
                        map.setFeatureState(
                            { source, id },
                            { hover: false}
                        );

                    }
                }
            });
        })
    }

});



function changeStyle(){
    window.addEventListener('currentData',(e)=>{
        currentFeature = e.detail.currentfeature;
        currentFeatureId = e.detail.currentfeatureid;
        currentSource = e.detail.currentsource;
        // console.log('change event', e)
    })
    window.dispatchEvent(event)
    // console.log('currentFeature', currentFeature)
    // console.log('currentFeatureId', currentFeatureId)
    if(currentFeature.geometry.type == "Point"){
        var circleRadius = document.getElementById("circle-radius");
            var circleOpacity = document.getElementById("circle-opacity")
            var circleColor = document.getElementById('circleColor');
            var circleStrokeWidth = document.getElementById('circleStrokeWidth')
            var circleStrokeOpacity = document.getElementById('circleStrokeOpacity')
            var circleStrokeColor = document.getElementById("circleStrokeColor")
            currentFeature.properties.radius =  parseFloat(circleRadius.value)
            currentFeature.properties.opacity =  parseFloat(circleOpacity.value)
            currentFeature.properties.color = circleColor.value
            currentFeature.properties.strokeColor = circleStrokeColor.value
            currentFeature.properties.strokeOpacity =  parseFloat(circleStrokeOpacity.value)
            currentFeature.properties.strokeWidth =  parseFloat(circleStrokeWidth.value)
            allData[currentSource].features[currentFeatureId] = currentFeature
            // console.log('currentFeature change', currentFeature)
            // console.log('currentFeatureId change', currentFeatureId)
            map.getSource(currentSource).setData(allData[currentSource])
    }else if(currentFeature.geometry.type == "LineString"){
        currentFeature.properties.width = parseFloat(document.getElementById("line-width").value)
        currentFeature.properties.opacity = parseFloat(document.getElementById("line-opacity").value)
        currentFeature.properties.color = document.getElementById("lineColor").value
        map.getSource(currentSource).setData(allData[currentSource])
    }else if(currentFeature.geometry.type == "Polygon"){
        currentFeature.properties.outlineColor = document.getElementById("outlineColor").value
        currentFeature.properties.opacity = parseFloat(document.getElementById("polygon-opacity").value)
        currentFeature.properties.color = document.getElementById("polygonColor").value
        map.getSource(currentSource).setData(allData[currentSource])
    }

}

$('#pointChange').on('click',()=>{
    changeStyle()
})

$('#lineChange').on('click',()=>{
    changeStyle()
})

$('#polygonChange').on('click',()=>{
    changeStyle()
})