(function(){
    var baseLayer = new ol.layer.Tile({
        source: new ol.source.XYZ({
            url: 'http://t7.tianditu.com/DataServer?T=vec_w&tk=f5347cab4b28410a6e8ba5143e3d5a35&x={x}&y={y}&l={z}'
        })
    });
    var map = new ol.Map({
        target: 'map',
        view: new ol.View({
            projection: 'EPSG:4326',
            center: [114.339408, 30.61271],
            zoom: 12
        }),
        layers: [baseLayer]
    })

    var drawControl = new ol.control.DrawControl();
    map.addControl(drawControl);
})()