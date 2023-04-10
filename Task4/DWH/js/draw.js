import {map, draw} from './3Dmodel.js'

console.log(map)
console.log('draw',draw)

var drawFeatureID = '';
var newDrawFeature = false;

// callback for draw.update and draw.selectionchange
var setDrawFeature = function(e) {
    if (e.features.length && e.features[0].type === 'Feature') {
        var feat = e.features[0];
        drawFeatureID = feat.id;
    }
}

map.on('draw.create', function() {
    newDrawFeature = true;
});
map.on('draw.update', setDrawFeature);

map.on('draw.selectionchange', setDrawFeature);



map.on('click',function(e){
    if (!newDrawFeature) {
        var drawFeatureAtPoint = draw.getFeatureIdsAt(e.point);

        //if another drawFeature is not found - reset drawFeatureID
        drawFeatureID = drawFeatureAtPoint.length ? drawFeatureAtPoint[0] : '';
        console.log('draw', draw.get(drawFeatureID))
        // draw.setFeatureProperty(drawFeatureID, 'portColor', '#000');
        var feature = draw.get(drawFeatureID)
        if(feature && feature.geometry.type == "Polygon"){
            draw.setFeatureProperty(drawFeatureID, 'color', document.getElementById('polygonColor').value)
            draw.setFeatureProperty(drawFeatureID, 'opacity', parseFloat(document.getElementById("polygon-opacity").value))
            draw.setFeatureProperty(drawFeatureID, 'outlineColor', document.getElementById("outlineColor").value)
        }
        else if(feature && feature.geometry.type == "LineString"){
            draw.setFeatureProperty(drawFeatureID, 'color', document.getElementById("lineColor").value)
            draw.setFeatureProperty(drawFeatureID, 'width', parseFloat(document.getElementById("line-width").value))
            draw.setFeatureProperty(drawFeatureID, 'opacity', parseFloat(document.getElementById("line-opacity").value))
        }
        else if(feature && feature.geometry.type == "Point"){
            draw.setFeatureProperty(drawFeatureID, 'color',document.getElementById('circleColor').value)
            draw.setFeatureProperty(drawFeatureID, 'radius',parseFloat(document.getElementById("circle-radius").value))
            draw.setFeatureProperty(drawFeatureID, 'opacity',parseFloat(document.getElementById("circle-opacity").value))
            draw.setFeatureProperty(drawFeatureID, 'strokeWidth',parseFloat(document.getElementById('circleStrokeWidth').value))
            draw.setFeatureProperty(drawFeatureID, 'strokeOpacity',parseFloat(document.getElementById('circleStrokeOpacity').value))
            draw.setFeatureProperty(drawFeatureID, 'strokeColor', document.getElementById("circleStrokeColor").value)
        }
    }

    newDrawFeature = false;
})


