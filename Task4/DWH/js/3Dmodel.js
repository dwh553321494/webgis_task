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
            "layers": [ vecLayer, cvaLayer],
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
     
// transformation parameters to position, rotate and scale the 3D model onto the map
const modelTransform = {
translateX: modelAsMercatorCoordinate.x,
translateY: modelAsMercatorCoordinate.y,
translateZ: modelAsMercatorCoordinate.z,
rotateX: modelRotate[0],
rotateY: modelRotate[1],
rotateZ: modelRotate[2],
/* Since the 3D model is in real world meters, a scale transform needs to be
* applied since the CustomLayerInterface expects units in MercatorCoordinates.
*/
scale: modelAsMercatorCoordinate.meterInMercatorCoordinateUnits()
};
     
const THREE = window.THREE;
     
// configuration of the custom layer for a 3D model per the CustomLayerInterface
const customLayer = {
    id: '3d-model',
    type: 'custom',
    renderingMode: '3d',
    onAdd: function (map, gl) {
        this.camera = new THREE.Camera();
        this.scene = new THREE.Scene();
        
        // create two three.js lights to illuminate the model
        const directionalLight = new THREE.DirectionalLight(0xffffff);
        directionalLight.position.set(0, 1000, 1000).normalize();
        this.scene.add(directionalLight);
        
        const directionalLight2 = new THREE.DirectionalLight(0xffffff);
        directionalLight2.position.set(0, 1000, -1000).normalize();
        this.scene.add(directionalLight2);

        // const directionalLight3 = new THREE.DirectionalLight(0xffffff);
        // directionalLight3.position.set(-10, -10, 10).normalize();
        // this.scene.add(directionalLight3);

        // const directionalLight4 = new THREE.DirectionalLight(0xffffff);
        // directionalLight4.position.set(-10, 10, 10).normalize();
        // this.scene.add(directionalLight4);
        
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
    controls: {
            point: true,
            line_string: true,
            polygon: true,
            trash: true
        },
    });
map.addControl(draw);


export default map;