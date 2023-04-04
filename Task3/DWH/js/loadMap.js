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
            "cvasrc": cvaSource,
        },
        //设置加载并显示来源的图层信息
        "layers": [vecLayer, cvaLayer],
    },
    center: [114.339408, 30.61271],
    zoom:6,
});


//-------------------------------------------------------------------------------------
// 控件
map.addControl(new mapboxgl.Minimap(), 'bottom-right');
map.addControl(new mapboxgl.FullscreenControl());
map.addControl(new mapboxgl.NavigationControl());
map.addControl(new mapboxgl.FrameRateControl());
var directions = new MapboxDirections({
    accessToken: 'pk.eyJ1Ijoienp6aWlpIiwiYSI6ImNsYmV1cWtqaTAwMWMzbnM3cGYzdG9xanEifQ.Y8VtfjgM1lBszfFHVoDsFw',
    unit: 'metric',
    profile: 'mapbox/cycling'
  });

map.addControl(directions, 'top-left');

// 箭头-右
var svgXML =
`<svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"> 
    <path d="M529.6128 512L239.9232 222.4128 384.7168 77.5168 819.2 512 384.7168 946.4832 239.9232 801.5872z" p-id="9085" fill="#ffffff"></path> 
</svg>
`
var svgBase64 = 'data:image/svg+xml;base64,' + window.btoa(unescape(encodeURIComponent(svgXML)));

const juniorSchool = [111.432383, 27.608648]
const seniorSchool = [111.440355, 27.691964]
const undergraduate = [114.617146, 30.457564]
const graduate = [116.281528, 40.072093]
 
// 路线
const route = {
    'type': 'FeatureCollection',
    'features': [
        {
        'type': 'Feature',
        'geometry': {
            'type': 'LineString',
            'coordinates': [juniorSchool, seniorSchool, undergraduate, graduate]
            }
        }
    ]
};

var realroute = {
    'type': 'FeatureCollection',
    'features':[{
        'type': 'Feature',
        'geometry': {
            'type': 'LineString',
            'coordinates': []
        }
    }]
}
 
// 沿路线运动的点.
// 以初始点初始化.
const point = {
    'type': 'FeatureCollection',
    'features': [
        {
        'type': 'Feature',
        'properties': {},
            'geometry': {
            'type': 'Point',
            'coordinates': juniorSchool
            }
        }
    ]
};
 
// 计算距离.
const lineDistance = turf.length(route.features[0]);
 
const arc = [];
 
//在弧线和动画中使用的步骤数，更多的步骤表示
//平滑的弧线和动画，但过多的步骤将导致
//低帧速率
const steps = 500;
 
// 在两个点的“起点”和“终点”之间画一条弧
for (let i = 0; i < lineDistance; i += lineDistance / steps) {
    const segment = turf.along(route.features[0], i);
    arc.push(segment.geometry.coordinates);
}
 
// 根据弧坐标更新route
route.features[0].geometry.coordinates = arc;
 
// 用于根据route增加点测量值.
let counter = 0;
 
map.on('load', () => {
    let arrowIcon = new Image(20, 20)
    arrowIcon.src = svgBase64
    arrowIcon.onload = function() {
        map.addImage('arrowIcon', arrowIcon)
        console.log('arrow')
    }

    map.addSource('route', {
        'type': 'geojson',
        'data': route
    });

    map.addSource('realroute',{
        'type': 'geojson',
        'data': realroute
    })
    
    map.addSource('point', {
        'type': 'geojson',
        'data': point
    });
    
    map.addLayer({
        'id': 'route',
        'source': 'route',
        'type': 'line',
        'paint': {
            'line-width': 5,
            'line-opacity': 1,
            'line-color': '#007cbf'
        }   
    });

    map.addLayer({
        'id': 'realroute',
        'type': 'line',
        'source': 'realroute',
        'paint': {
            'line-width': 5,
            'line-opacity': 1,
            'line-color': '#FF9900',
        }
    });

    map.addLayer({
        'id': 'arrawLayer',
        'type': 'symbol',
        'source': 'route',
        'layout': {
            'symbol-placement':'line',
            'symbol-spacing': 50,
            'icon-image': 'arrowIcon',
            'icon-size': 0.25
        }
    })
    // 加载自定义icon
    map.loadImage('./imgs/airport.png',(error, image) => {
        if(error) throw error;
        map.addImage('myAirport', image);
        console.log('airport init')
        map.addLayer({
            'id': 'point',
            'source': 'point',
            'type': 'symbol',
            'layout': {
                // To add a new image to the style at runtime see
                // https://docs.mapbox.com/mapbox-gl-js/example/add-image/
                'icon-image': 'myAirport',
                'icon-size': 1.,
                'icon-rotate': ['get', 'bearing'],
                'icon-rotation-alignment': 'map',
                'icon-allow-overlap': true,
                'icon-ignore-placement': true
            }
            });
    })


    let running = false;
    function animate() {
        running = true;
        document.getElementById('replay').disabled = true;

        const start =
            route.features[0].geometry.coordinates[
                counter >= steps ? counter - 1 : counter
            ];
        const end =
            route.features[0].geometry.coordinates[
                counter >= steps ? counter : counter + 1
            ];
        if (!start || !end || counter >= steps) {
            running = false;
            document.getElementById('replay').disabled = false;

            return;
        }
        //更新点几何体到一个基于计数器指示的新位置
        //访问arc的索引
        point.features[0].geometry.coordinates =
        route.features[0].geometry.coordinates[counter];
        realroute.features[0].geometry.coordinates.push(point.features[0].geometry.coordinates)

        //计算轴承，确保图标旋转到匹配路线弧
        //在当前点到下一个点之间计算轴承，除了
        //在弧的结尾，它使用前一个点和当前点
        point.features[0].properties.bearing = turf.bearing(
            turf.point(start),
            turf.point(end)
        );
        
        //更新
        map.getSource('point').setData(point);
        map.getSource('realroute').setData(realroute);
        
        // 请求下一帧动画，只要还没有到达终点
        if (counter < steps) {
            requestAnimationFrame(animate);
        }

        counter = counter + 1;
    }
    document.getElementById('replay').addEventListener('click', () => {
        if (running) {
            void 0;
        } else {
            // Set the coordinates of the original point back to origin
            point.features[0].geometry.coordinates = juniorSchool;
            realroute.features[0].geometry.coordinates = []
            // Update the source layer
            map.getSource('point').setData(point);
            
            // Reset the counter
            counter = 0;
            
            // Restart the animation
            animate(counter);
        }
    });
    animate(counter);


    // -------------------------------------------------------------------------------------------
    // 加载自定义icon
    map.loadImage('./imgs/school.png',(error, image) => {
        if(error) throw error;
        map.addImage('school', image);
        console.log('school init')
    })

    map.addSource('places', {
        'type': 'geojson',
        'data': {
            'type': 'FeatureCollection',
            'features': [
                {
                    'type': 'Feature',
                    'properties': {
                        'description':
                        '<h2>禾青中心学校</h2><p><strong>小学、初中</strong>。我在这个学校待了10年,从学前班到初三一直在这里接受教育。现已改名为禾青芙蓉学校</p>',
                        'icon': 'school'
                    },
                    'geometry': {
                        'type': 'Point',
                        'coordinates': juniorSchool
                    }
                },
                {
                    'type': 'Feature',
                    'properties': {
                        'description':
                            '<h2>冷水江市第一中学</h2><p><strong>高中学校</strong>。在99年出了文理科状元，因此在我们地级市出名，现阶段的一中教学质量出现了严重下滑。</p>',
                        'icon': 'school'
                    },
                    'geometry': {
                        'type': 'Point',
                        'coordinates': seniorSchool
                    }
                },
                {
                    'type': 'Feature',
                    'properties': {
                        'description':
                            '<h2>中国地质大学(武汉)</h2><p><strong>大学</strong>。2020年我来到中国地质大学求学，选择了测绘类专业，分流至地理空间信息工程。现阶段研究方向是遥感智能解疑算法。</p>',
                        'icon': 'school'
                    },
                    'geometry': {
                        'type': 'Point',
                        'coordinates': undergraduate
                    }
                },
                {
                    'type': 'Feature',
                    'properties': {
                        'description':
                            '<h2>中国科学院空天信息创新研究院</h2><p><strong>研究生与博士</strong>。希望今年可以顺利升学，然后就可以全心身投入到科研之中了！</p>',
                        'icon': 'school'
                    },
                    'geometry': {
                        'type': 'Point',
                        'coordinates': graduate
                    }
                },
            ]
        }
    });

    map.addLayer({
        'id': 'places',
        'type': 'symbol',
        'source': 'places',
        'layout': {
            'icon-image': ['get', 'icon'],
            'icon-allow-overlap': true
        }
    });
        
    map.on('click', 'places', (e) => {
        const coordinates = e.features[0].geometry.coordinates.slice();
        const description = e.features[0].properties.description;
            
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }
            
        new mapboxgl.Popup()
            .setLngLat(coordinates)
            .setHTML(description)
            .addTo(map);
    });
        
    map.on('mouseenter', 'places', () => {
        map.getCanvas().style.cursor = 'pointer';
    });

    map.on('mouseleave', 'places', () => {
        map.getCanvas().style.cursor = '';
    });
});


let isAtStart = true;
function flytoJunior(){
    const start = {
        center: [114.339408, 30.61271],
        zoom: 6,
        pitch: 0,
        bearing: 0
    };
    const end = {
        center: juniorSchool,
        zoom: 12.5,
        bearing: 130,
        pitch: 75
    };
    const target = isAtStart ? end : start;
    isAtStart = !isAtStart;
    
    map.flyTo({
        ...target, // Fly to the selected target
        duration: 12000, // Animate over 12 seconds
        essential: true // This animation is considered essential with
        //respect to prefers-reduced-motion
    });
}

function flytoSenior(){
    const start = {
        center: [114.339408, 30.61271],
        zoom: 6,
        pitch: 0,
        bearing: 0
    };
    const end = {
        center: seniorSchool,
        zoom: 12.5,
        bearing: 130,
        pitch: 75
    };
    const target = isAtStart ? end : start;
    isAtStart = !isAtStart;
    
    map.flyTo({
        ...target, // Fly to the selected target
        duration: 12000, // Animate over 12 seconds
        essential: true // This animation is considered essential with
        //respect to prefers-reduced-motion
    });
}

function flytoUndergraduate(){
    const start = {
        center: [114.339408, 30.61271],
        zoom: 6,
        pitch: 0,
        bearing: 0
    };
    const end = {
        center: undergraduate,
        zoom: 12.5,
        bearing: 130,
        pitch: 75
    };
    const target = isAtStart ? end : start;
    isAtStart = !isAtStart;
    
    map.flyTo({
        ...target, // Fly to the selected target
        duration: 12000, // Animate over 12 seconds
        essential: true // This animation is considered essential with
        //respect to prefers-reduced-motion
    });
}

function flytoGraduate(){
    const start = {
        center: [114.339408, 30.61271],
        zoom: 6,
        pitch: 0,
        bearing: 0
    };
    const end = {
        center: graduate,
        zoom: 12.5,
        bearing: 130,
        pitch: 75
    };
    const target = isAtStart ? end : start;
    isAtStart = !isAtStart;
    
    map.flyTo({
        ...target, // Fly to the selected target
        duration: 12000, // Animate over 12 seconds
        essential: true // This animation is considered essential with
        //respect to prefers-reduced-motion
    });
}



// 图层切换
function changeLayer(mode){
    if (mode == 'vec'){
        map.setLayoutProperty('vecsrc', 'visibility', 'visible');
        map.setLayoutProperty('cvasrc', 'visibility', 'visible');
        map.setLayoutProperty('imgsrc', 'visibility', 'none');
        map.setLayoutProperty('ciasrc', 'visibility', 'none');
        map.setLayoutProperty('tersrc', 'visibility', 'none');
        map.setLayoutProperty('ctasrc', 'visibility', 'none');
    }else if (mode == 'img'){
        map.setLayoutProperty('vecsrc', 'visibility', 'none');
        map.setLayoutProperty('cvasrc', 'visibility', 'none');
        map.setLayoutProperty('imgsrc', 'visibility', 'visible');
        map.setLayoutProperty('ciasrc', 'visibility', 'visible');
        map.setLayoutProperty('tersrc', 'visibility', 'none');
        map.setLayoutProperty('ctasrc', 'visibility', 'none');
    }else if (mode == 'ter'){
        map.setLayoutProperty('vecsrc', 'visibility', 'none');
        map.setLayoutProperty('cvasrc', 'visibility', 'none');
        map.setLayoutProperty('imgsrc', 'visibility', 'none');
        map.setLayoutProperty('ciasrc', 'visibility', 'none');
        map.setLayoutProperty('tersrc', 'visibility', 'visible');
        map.setLayoutProperty('ctasrc', 'visibility', 'visible');
    }
}