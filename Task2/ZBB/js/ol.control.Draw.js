ol.control.DrawControl = function(opt_options){
    var opt_options = opt_options || {};

    this.source_ = undefined;
    this.drawing_ = undefined;
    this.drawType = ['None', 'Point', 'LineString', 'Polygon', 'Circle', 'Box', 'Clear'];
    var defaultControlClassName = 'ol-unselectable ol-control';
    this.element = document.createElement('div');
    this.element.className = defaultControlClassName + ' ' + 'drawtools';

    var createchildElement = function(options){
        var btn = document.createElement('button');
        btn.className = options.class;
        btn.id = options.id;
        var tipLable = 'Draw ' + options.value;
        btn.title = tipLable;
        btn.type = options.type;
        btn.value = options.value;
        return btn;
    };

    this.drawType.forEach(element => {
        var btn = createchildElement({
            type: 'button',
            class: 'drawBtn',
            value: element,
            id: 'ol-draw-' + element.toLocaleLowerCase()
        })
        btn.onclick = function(evt){
            evt.preventDefault();
            this.btnFouceChanged(evt);
            var value = evt.target.getAttribute('value');
            this.addInteraction(value);
        }.bind(this);
        this.element.appendChild(btn);
    });

    ol.control.Control.call(this, {
        element: this.element,
        target: opt_options.target
    })
}

ol.inherits(ol.control.DrawControl, ol.control.Control);

ol.control.DrawControl.prototype.btnFouceChanged = function(evt){
    var map = this.getMap();
    if(map){
        map.removeInteraction(this.drawing_);
    }
}

ol.control.DrawControl.prototype.addInteraction = function(shapeType){
    this.initSource();
    if(shapeType !== 'None'){
        var geomFunc = undefined;
        if(shapeType === 'Clear'){
            this.source_.clear();
            return;
        }
        if(shapeType === 'Box') {
            shapeType = 'Circle'
            geomFunc = ol.interaction.Draw.createBox();
        }
        this.drawing_ = new ol.interaction.Draw({
            source: this.source_,
            type: shapeType,
            freehand: false,    //按住shift可以跟踪鼠标绘制
            geometryFunction: geomFunc
        });
        this.getMap().addInteraction(this.drawing_);
    }
}

ol.control.DrawControl.prototype.initSource = function(){
    if(this.source_ === undefined){
        this.source_ = new ol.source.Vector();
        var layer = new ol.layer.Vector({
            source: this.source_,
            name: 'DrawingLayer'
        })
        this.getMap().addLayer(layer);
    }
}
