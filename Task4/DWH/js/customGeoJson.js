import map from './3Dmodel.js'
console.log(map)



// 请求geojson
var custom = null;
$.ajax({
    url: './data/custom.geojson',
    method: 'GET',
    dataType: 'json',
    success:(response)=>{
        custom = response
        console.log("part buildings", custom)
    },
    error:(error)=>{
        console.log(error);
    }
});


map.on('load',()=>{
    map.addSource('custom-geojson',{
        'type': 'geojson',
        'data': custom,
        generateId: true
    });
    
    // 点
    map.addLayer({
        id: 'custom-points',
        type: 'circle',
        source: 'custom-geojson',
        paint:{
            'circle-radius':5,
            'circle-color': ["case",
            ["boolean", ["feature-state", "hover"], false],
            '#0080ff',
            '#ff0000'
        ],
        },
        filter: ['in', '$type', 'Point']
    })
    // 线
    map.addLayer({
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
                '#3000ff'
            ],
            'line-width': 2.5,
            'line-opacity':0.9,
            'line-gap-width':2
        },
        filter: ['in', '$type', 'LineString']
    })
    // 面
    map.addLayer({
        id: 'custom-polygons',
        type: 'fill',
        source: 'custom-geojson',
        layout:{
        },
        paint:{
            'fill-color': ["case",
                ["boolean", ["feature-state", "hover"], false],
                '#0080ff',
                '#3550ff'
            ],
            'fill-opacity':0.5,
        },
        filter: ['in', '$type', 'Polygon']
    })
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
        if (existLayerId.includes('custom-points') || existLayerId.includes('custom-lines') || existLayerId.includes('custom-polygons')) {
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