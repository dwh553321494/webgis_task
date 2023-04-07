import map from './3Dmodel.js'

console.log(map)

// 请求geojson
var buildings = null;
$.ajax({
    url: './data/buildings.geojson',
    method: 'GET',
    dataType: 'json',
    success:(response)=>{
        buildings = response
        console.log("part buildings", buildings)
    },
    error:(error)=>{
        console.log(error);
    }
});



map.on('load',()=>{
    map.addSource('buildings',{
        'type': 'geojson',
        'data': buildings,
        generateId: true
    });
    // Add a new layer to visualize the polygon.
    map.addLayer({
        'id': 'buildings',
        'type': 'fill',
        'source': 'buildings', // reference the data source
        'layout': {},
        'paint': {
            'fill-color': ["case",
            ["boolean", ["feature-state", "hover"], false],
            '#0080ff',
            '#ff0000'
        ],
            'fill-opacity': 0.5
        }
    });
    changeMapCursor();
})



const existLayersIds = [];
// 图层高亮集合
let layerHighlights = {};   // {layerId:{id,source},...}

// 图层属性集合
let layerProperties = {};   // {layerId:{layerName:'',key1:value1,key2:value2,...}}
 
// 实现属性查询及高亮
map.on('click', function (e) {
    // 属性集合清空
    layerProperties = {};
    console.log('object', e);
    const bbox = [
        [e.point.x - 5, e.point.y - 5],
        [e.point.x + 5, e.point.y + 5]
    ];
    const existLayers = map.getStyle().layers;
    existLayers.forEach(existLayer => {
        var existLayerId = existLayer.id;
        if (existLayerId.includes('buildings')) {
            existLayersIds.push(existLayer.id);
        }
    });
    console.log('existLayersIds',existLayersIds)
    let renderFeatures = map.queryRenderedFeatures(bbox, { layers: existLayersIds });
    renderFeatures.forEach(renderFeature => {
        console.log('renderFeature', renderFeature);
        
        const { id, layer, source, properties } = renderFeature;
        console.log(id)
        // 属性数据存储
        layerProperties[layer.id] = properties;
        // 添加新的高亮
        map.setFeatureState(
            { source, id },
            { hover: true }
        );

        // 更新图层高亮集合
        layerHighlights[layer.id] = { id, source };
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
        popup.on('close', function(e){
            let renderFeatures = map.queryRenderedFeatures(bbox, { layers: existLayersIds });
            renderFeatures.forEach(renderFeature => {
                console.log('renderFeature', renderFeature);
                
                const { id, layer, source, properties } = renderFeature;
                console.log(id)
                // 属性数据存储
                layerProperties[layer.id] = properties;

                for (let i in layerHighlights) {
                    // 取消上次高亮
                    if (i === layer.id) {
                        const { id, source } = layerHighlights[i];
                        map.setFeatureState(
                            { source, id },
                            { hover: false }
                        );
                    }
                }
            });
        })
    }

});



// 改变地图手势
function changeMapCursor() {
    const layers = map.getStyle().layers;
    layers.forEach(layer => {
        const layerId = layer.id;
        if (layerId.includes('buildings')) {
            map.on('mousemove', layerId, function () {
                map.getCanvas().style.cursor = 'pointer';
            });
            map.on('mouseleave', layerId, function (e) {
                map.getCanvas().style.cursor = '';
            });
        }
    });
}
