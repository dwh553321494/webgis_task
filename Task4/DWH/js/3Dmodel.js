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
    "id": "veclayer",
    "type": "raster",
    "source": "vecsrc",
    "minzoom": 0,
    "maxzoom": 20
};
var cvaLayer = {
    "id": "cvalayer",
    "type": "raster",
    "source": "cvasrc",
    "minzoom": 0,
    "maxzoom": 20
};
var noneLayer = {
    "id": "noneLayer",
    "type": "background",
    "paint": {
        "background-color": "rgba(0, 0, 0, 0)",
    },
    "metadata": {
        "mapbox:group": "92ca48f13df25"
    }
};

const map = new mapboxgl.Map({
        container: 'map',
        // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
        style: {
            //设置版本号，一定要设置
            "version": 8,
            //添加来源
            "sources": {
                "vecsrc": vecSource,
                "cvasrc": cvaSource
            },
            //设置加载并显示来源的图层信息
            "layers": [ vecLayer, cvaLayer, noneLayer],
        },
        zoom: 16,
        center:[114.612441,30.458611],
        antialias: true // create the gl context with MSAA antialiasing, so custom layers are antialiased
    });
     
// parameters to ensure the model is georeferenced correctly on the map
const modelOrigin = [114.612881,30.458611];
const modelAltitude = 0;
const modelRotate = [Math.PI / 2, 0, 0];
    
const modelAsMercatorCoordinate = mapboxgl.MercatorCoordinate.fromLngLat(
    modelOrigin,
    modelAltitude
);
const modelTransform = {
translateX: modelAsMercatorCoordinate.x,
translateY: modelAsMercatorCoordinate.y,
translateZ: modelAsMercatorCoordinate.z,
rotateX: modelRotate[0],
rotateY: modelRotate[1],
rotateZ: modelRotate[2],
scale: modelAsMercatorCoordinate.meterInMercatorCoordinateUnits()
};
     
const THREE = window.THREE;
     
const customLayer = {
    id: '3d-model',
    type: 'custom',
    renderingMode: '3d',
    onAdd: function (map, gl) {
        this.camera = new THREE.Camera();
        this.scene = new THREE.Scene();
        
        const directionalLight = new THREE.DirectionalLight(0xffffff);
        directionalLight.position.set(0, 1000, 1000).normalize();
        this.scene.add(directionalLight);
        
        const directionalLight2 = new THREE.DirectionalLight(0xffffff);
        directionalLight2.position.set(0, 1000, -1000).normalize();
        this.scene.add(directionalLight2);
        
        const loader = new THREE.GLTFLoader();
        loader.load(
        '../DWH/data/未来城.gltf',
        (gltf) => {
            this.scene.add(gltf.scene);
            }
        );
        this.map = map;
        
        // use the Mapbox GL JS map canvas for three.js
        this.renderer = new THREE.WebGLRenderer({
            canvas: map.getCanvas(),
            context: gl,
            antialias: true
        });
        
        this.renderer.autoClear = false;
    },
    render: function (gl, matrix) {
        const rotationX = new THREE.Matrix4().makeRotationAxis(
        new THREE.Vector3(0.65, 0, 0),
        modelTransform.rotateX
    );
    const rotationY = new THREE.Matrix4().makeRotationAxis(
        new THREE.Vector3(0, 0.65, 0),
        modelTransform.rotateY
    );
    const rotationZ = new THREE.Matrix4().makeRotationAxis(
        new THREE.Vector3(0, 0, 0.65),
        modelTransform.rotateZ
    );
     
    const m = new THREE.Matrix4().fromArray(matrix);
    const l = new THREE.Matrix4()
    .makeTranslation(
        modelTransform.translateX,
        modelTransform.translateY,
        modelTransform.translateZ
    )
    .scale(
        new THREE.Vector3(
            modelTransform.scale,
            -modelTransform.scale,
            modelTransform.scale
        )
    )
    .multiply(rotationX)
    .multiply(rotationY)
    .multiply(rotationZ);
     
    this.camera.projectionMatrix = m.multiply(l);
    this.renderer.resetState();
    this.renderer.render(this.scene, this.camera);
    this.map.triggerRepaint();
    }
};
     
map.on('style.load', () => {
    map.addLayer(customLayer);
});


const draw = new MapboxDraw({
    displayControlsDefault: false,
    userProperties: true,
    controls: {
            point: true,
            line_string: true,
            polygon: true,
            trash: true
        },
        styles: [
            // default themes provided by MB Draw
            {
                'id': 'gl-draw-polygon-fill-inactive',
                'type': 'fill',
                'filter': ['all', ['==', 'active', 'false'],
                    ['==', '$type', 'Polygon'],
                    ['!=', 'mode', 'static']
                ],
                'paint': {
                    'fill-color': '#3bb2d0',
                    'fill-outline-color': '#3bb2d0',
                    'fill-opacity': 0.1
                }
            },
            {
                'id': 'gl-draw-polygon-fill-active',
                'type': 'fill',
                'filter': ['all', ['==', 'active', 'true'],
                    ['==', '$type', 'Polygon']
                ],
                'paint': {
                    'fill-color': '#fbb03b',
                    'fill-outline-color': '#fbb03b',
                    'fill-opacity': 0.1
                }
            },
            {
                'id': 'gl-draw-polygon-midpoint',
                'type': 'circle',
                'filter': ['all', ['==', '$type', 'Point'],
                    ['==', 'meta', 'midpoint']
                ],
                'paint': {
                    'circle-radius': 3,
                    'circle-color': '#fbb03b'
                }
            },
            {
                'id': 'gl-draw-polygon-stroke-inactive',
                'type': 'line',
                'filter': ['all', ['==', 'active', 'false'],
                    ['==', '$type', 'Polygon'],
                    ['!=', 'mode', 'static']
                ],
                'layout': {
                    'line-cap': 'round',
                    'line-join': 'round'
                },
                'paint': {
                    'line-color': '#3bb2d0',
                    'line-width': 2
                }
            },
            {
                'id': 'gl-draw-polygon-stroke-active',
                'type': 'line',
                'filter': ['all', ['==', 'active', 'true'],
                    ['==', '$type', 'Polygon']
                ],
                'layout': {
                    'line-cap': 'round',
                    'line-join': 'round'
                },
                'paint': {
                    'line-color': '#fbb03b',
                    'line-dasharray': [0.2, 2],
                    'line-width': 2
                }
            },
            {
                'id': 'gl-draw-line-inactive',
                'type': 'line',
                'filter': ['all', ['==', 'active', 'false'],
                    ['==', '$type', 'LineString'],
                    ['!=', 'mode', 'static']
                ],
                'layout': {
                    'line-cap': 'round',
                    'line-join': 'round'
                },
                'paint': {
                    'line-color': '#3bb2d0',
                    'line-width': 2
                }
            },
            {
                'id': 'gl-draw-line-active',
                'type': 'line',
                'filter': ['all', ['==', '$type', 'LineString'],
                    ['==', 'active', 'true']
                ],
                'layout': {
                    'line-cap': 'round',
                    'line-join': 'round'
                },
                'paint': {
                    'line-color': '#fbb03b',
                    'line-dasharray': [0.2, 2],
                    'line-width': 2
                }
            },
            {
                'id': 'gl-draw-polygon-and-line-vertex-stroke-inactive',
                'type': 'circle',
                'filter': ['all', ['==', 'meta', 'vertex'],
                    ['==', '$type', 'Point'],
                    ['!=', 'mode', 'static']
                ],
                'paint': {
                    'circle-radius': 5,
                    'circle-color': '#fff'
                }
            },
            {
                'id': 'gl-draw-polygon-and-line-vertex-inactive',
                'type': 'circle',
                'filter': ['all', ['==', 'meta', 'vertex'],
                    ['==', '$type', 'Point'],
                    ['!=', 'mode', 'static']
                ],
                'paint': {
                    'circle-radius': 3,
                    'circle-color': '#fbb03b'
                }
            },
            {
                'id': 'gl-draw-point-point-stroke-inactive',
                'type': 'circle',
                'filter': ['all', ['==', 'active', 'false'],
                    ['==', '$type', 'Point'],
                    ['==', 'meta', 'feature'],
                    ['!=', 'mode', 'static']
                ],
                'paint': {
                    'circle-radius': 5,
                    'circle-opacity': 1,
                    'circle-color': '#fff'
                }
            },
            {
                'id': 'gl-draw-point-inactive',
                'type': 'circle',
                'filter': ['all', ['==', 'active', 'false'],
                    ['==', '$type', 'Point'],
                    ['==', 'meta', 'feature'],
                    ['!=', 'mode', 'static']
                ],
                'paint': {
                    'circle-radius': 3,
                    'circle-color': '#3bb2d0'
                }
            },
            {
                'id': 'gl-draw-point-stroke-active',
                'type': 'circle',
                'filter': ['all', ['==', '$type', 'Point'],
                    ['==', 'active', 'true'],
                    ['!=', 'meta', 'midpoint']
                ],
                'paint': {
                    'circle-radius': 7,
                    'circle-color': '#fff'
                }
            },
            {
                'id': 'gl-draw-point-active',
                'type': 'circle',
                'filter': ['all', ['==', '$type', 'Point'],
                    ['!=', 'meta', 'midpoint'],
                    ['==', 'active', 'true']
                ],
                'paint': {
                    'circle-radius': 5,
                    'circle-color': '#fbb03b'
                }
            },
            {
                'id': 'gl-draw-polygon-fill-static',
                'type': 'fill',
                'filter': ['all', ['==', 'mode', 'static'],
                    ['==', '$type', 'Polygon']
                ],
                'paint': {
                    'fill-color': '#404040',
                    'fill-outline-color': '#404040',
                    'fill-opacity': 0.1
                }
            },
            {
                'id': 'gl-draw-polygon-stroke-static',
                'type': 'line',
                'filter': ['all', ['==', 'mode', 'static'],
                    ['==', '$type', 'Polygon']
                ],
                'layout': {
                    'line-cap': 'round',
                    'line-join': 'round'
                },
                'paint': {
                    'line-color': '#404040',
                    'line-width': 2
                }
            },
            {
                'id': 'gl-draw-line-static',
                'type': 'line',
                'filter': ['all', ['==', 'mode', 'static'],
                    ['==', '$type', 'LineString']
                ],
                'layout': {
                    'line-cap': 'round',
                    'line-join': 'round'
                },
                'paint': {
                    'line-color': '#404040',
                    'line-width': 2
                }
            },
            {
                'id': 'gl-draw-point-static',
                'type': 'circle',
                'filter': ['all', ['==', 'mode', 'static'],
                    ['==', '$type', 'Point']
                ],
                'paint': {
                    'circle-radius': 5,
                    'circle-color': '#404040'
                }
            },

            // end default themes provided by MB Draw

            // new styles for toggling colors
            {
                'id': 'gl-draw-polygon-color-picker',
                'type': 'fill',
                'filter': ['all', ['==', '$type', 'Polygon'],
                    ['has', 'user_color'],
                    ['has', 'user_outlineColor'],
                    ['has', 'user_opacity']
                ],
                'paint': {
                    'fill-color': ['get', 'user_color'],
                    'fill-outline-color': ['get', 'user_outlineColor'],
                    'fill-opacity': ['get', 'user_opacity']
                }
            },
            {
                'id': 'gl-draw-line-color-picker',
                'type': 'line',
                'filter': ['all', ['==', '$type', 'LineString'],
                    ['has', 'user_color'],
                    ['has', 'user_width'],
                    ['has', 'user_opacity']
                ],
                'paint': {
                    'line-color': ['get', 'user_color'],
                    'line-width': ['get', 'user_width'],
                    'line-opacity': ['get', 'user_opacity']
                }
            },
            {
                'id': 'gl-draw-point-color-picker',
                'type': 'circle',
                'filter': ['all', ['==', '$type', 'Point'],
                    ['has', 'user_color'], 
                    ['has', 'user_radius'],
                    ['has', 'user_opacity'],
                    ['has', 'user_strokeWidth'], 
                    ['has', 'user_strokeColor'],
                    ['has', 'user_strokeOpacity']
                ],
                'paint': {
                    'circle-radius': ['get', 'user_radius'],
                    'circle-color': ['get', 'user_color'],
                    'circle-opacity': ['get', 'user_opacity'],
                    'circle-stroke-width':['get','user_strokeWidth'],
                    'circle-stroke-color': ['get', 'user_strokeColor'],
                    'circle-stroke-opacity':['get', 'user_strokeOpacity']    
                }
            },

        ]
    });
map.addControl(draw);


$("#vecLayer").on("click", ()=>{
    if($("#vecLayer").prop("checked")){
        if(!map.getLayer("veclayer") && !map.getLayer("cvalayer")){
            map.addLayer(vecLayer, 'noneLayer')
            map.addLayer(cvaLayer, 'noneLayer')
            console.log("true")
        }
    }else{
        if(map.getLayer("veclayer") && map.getLayer("cvalayer")){
            map.removeLayer("veclayer")
            map.removeLayer("cvalayer")
            console.log("false")
        }
    }
})


$("#3DLayer").on("click", ()=>{
    if($("#3DLayer").prop("checked")){
        if(!map.getLayer("3d-model")){
            map.addLayer(customLayer, 'noneLayer')
            console.log("true")
        }
    }else{
        if(map.getLayer("3d-model")){
            map.removeLayer("3d-model")
            console.log("false")
        }
    }
})

export { map, draw};
