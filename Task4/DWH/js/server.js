import { map } from "./3Dmodel.js";
import { allData } from './loadGeoJSON.js';

console.log(map)


var serverData = null;
$.ajax({
    url:'http://localhost:8088/geoserver/HuBei/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=HuBei%3AHuBeiProvince&maxFeatures=50&outputFormat=application%2Fjson',
    method: 'GET',
    dataType: 'json',
    success:(response)=>{
        serverData = response
        // console.log("part buildings", custom)
        allData['wms-geojson'] = serverData
    },
    error:(error)=>{
        console.log(error);
    }
})

var geoserverL = {
    'id': 'wms-layer',
    'type': 'fill',
    'source': 'wms-source',
    'paint': {
        'fill-opacity': 0.5,
        'fill-color': "#ff8133",
        'fill-outline-color': "#ff1100",
        // 'fill-outline-opacity': 1,

    }
}
map.on('load',()=>{
    map.addSource('wms-source', {
        'type': 'geojson',
        'data': serverData,
        generateId: true
        
      });
    
    map.addLayer(geoserverL);
    
})

$("#geoserverLayer").on("click", ()=>{
    if($("#geoserverLayer").prop("checked")){
         // 
        map.addLayer(geoserverL)

    }else{
        map.removeLayer("wms-layer")

    }
})



const existLayersIds = [];

// 图层属性集合
let layerProperties = {};   // {layerId:{layerName:'',key1:value1,key2:value2,...}}

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
        if (existLayerId.includes('wms-layer')) {
            existLayersIds.push(existLayer.id);
        }
    });
    // console.log('existLayersIds',existLayersIds)
    let renderFeatures = map.queryRenderedFeatures(bbox, { layers: existLayersIds });
    renderFeatures.forEach(renderFeature => {
        // console.log('renderFeature', renderFeature);
        // console.log('featurestates', map.getFeatureState(renderFeature))
        
        const { id, layer, source, properties } = renderFeature;
        // console.log('feature', id)
        // 属性数据存储
        layerProperties[layer.id] = properties;
    });

    const contents = [];
    for (let i in layerProperties) {
        const properties = layerProperties[i];
        for (let p in properties) {
            if(p=='name'){
                const content = `<h2>${properties[p]}</h2>`
                contents.push(content);
            }else if( p == 'childNum'){
                const content = `<p>childNum:<span>${properties[p]}</span></p>`
                contents.push(content);
            }
            else if( p == 'cp'){
                const content = `<p>中心:<span>${properties[p]}</span></p>`
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
        popup.on('close', function(e){
            let renderFeatures = map.queryRenderedFeatures(bbox, { layers: existLayersIds });
            renderFeatures.forEach(renderFeature => {
                // console.log('renderFeature', renderFeature);
                
                const { id, layer, source, properties } = renderFeature;
                // 属性数据存储
                layerProperties[layer.id] = properties;
            });
        })
    }

});