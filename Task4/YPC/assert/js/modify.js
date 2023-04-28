function modifystyle(){
    selectInteraction = new ol.interaction.Select({
        condition: ol.events.condition.click,
        });

        // 创建 modify 交互对象
         modifyInteraction = new ol.interaction.Modify({
        features: selectInteraction.getFeatures(),
        });

        // 将 select 和 modify 交互对象添加到地图上
        map.addInteraction(selectInteraction);
        map.addInteraction(modifyInteraction);

        // 监听选中要素事件
        selectInteraction.on('select', function (event) {
        // 获取选中的要素
        var feature = event.selected[0];
        // console.log(styleall)
        
        // 将要素的样式设置为指定颜色
         feature.setStyle(styleall);
        });
}

var drawInteraction=null;
var modify=null;
var snap=null;

    function addMoveInteraction(featureParam,style) {

        // 如果传入单体要素 Feature
        if (featureParam && featureParam instanceof ol.Feature) {

            if (featureParam instanceof ol.Feature) {
                featureParam = [featureParam];
            }

            if (!featureParam[0].getStyle()) {
               
                let editStyle = new ol.style.Style({
                    //边框样式
                    stroke: new ol.style.Stroke({
                        color: 'blue',
                        width: 2,
                    }),
                    //填充样式
                    fill: new ol.style.Fill({
                        color: 'rgba(0, 0, 255, 0.3)',
                    }),
                });
                featureParam[0].setStyle(editStyle);
            }

            // 传入选中的图形
            modify = new ol.interaction.Translate({
                features: new ol.Collection(featureParam),
            });
        } else {
            // 先选择在修改.每次只编辑一个图形
            drawInteraction = new ol.interaction.Select({
                layers: [layer],
                feature: source.getFeatures(),
            });
            // 传入选中的图形
            // 这样做之后，需要点击选中要素才可以进行编辑
            modify = new ol.interaction.Translate({
                features: drawInteraction.getFeatures(),
            });
        }

        modify.on('translatestart', function (e) {
            try {
                console.log(e.target);
            } catch (e) {
                console.log(e);
            }
        });

        // 平移结束事件
        modify.on('translateend', function (e) {
            try {
                console.log(e.target);
                featureParam[0].setStyle(style);
            } catch (e) {
            }
        });

        // 吸附鼠标
        snap = new ol.interaction.Snap({
            pixelTolerance: 20,
            source: vectorSource
        });

        // 添加交互
        snap && map.addInteraction(snap);
        drawInteraction && map.addInteraction(drawInteraction);
        modify && map.addInteraction(modify);
    }

    

    function trans(){
        selectInteraction = new ol.interaction.Select({
        condition: ol.events.condition.click,
        });

        // 创建 modify 交互对象
        modifyInteraction = new ol.interaction.Modify({
        features: selectInteraction.getFeatures(),

        });

        // 将 select 和 modify 交互对象添加到地图上
        map.addInteraction(selectInteraction);
        map.addInteraction(modifyInteraction);

     // 监听选中要素事件
         selectInteraction.on('select', function (event) {
        // 获取选中的要素
        console.log(event.selected[0])
        addMoveInteraction(event.selected[0],event.selected[0].getStyle()) ;
        // console.log(styleall)
        
       
        
        });

}


 // 关闭操作
 function closeFeature() {
    // 删除所有交互
    let collection = map.getInteractions();
    let length = collection.getLength();
    // 注意，这样删除的话，不会删除地图必要的交互
    for (let i = 9; i < length; i++) {
        let interaction = collection.item(9);
        // 判断选中交互
        if (interaction instanceof ol.interaction.Select) {
            interaction.getFeatures().clear()
        }
        map.removeInteraction(interaction)
    }
    
}


function end1()
{
    map.removeInteraction(selectInteraction);
    map.removeInteraction(modifyInteraction);
}


function createPointStyleFunction() {
    var pointstyle=new ol.style.Style({
        image: new ol.style.Circle({
                        radius:document.getElementById('points-size').value,
                        fill: new ol.style.Fill({
                        color: document.getElementById('points-fill-color').value
                        }),
                        stroke: new ol.style.Stroke({
                        color: document.getElementById('points-stroke-color').value,
                        width: document.getElementById('points-stroke-width').value
                        })
                    }),
        
    })
    return pointstyle
    }

    function createlineStyleFunction() {
    var linestyle=new ol.style.Style({
    
        stroke: new ol.style.Stroke({
        color: document.getElementById('lines-stroke-color').value,
        width: document.getElementById('lines-stroke-width').value
        })
    })
    return linestyle}

    function createpolyganStyleFunction() {
    var polyganstyle=new ol.style.Style({
        fill: new ol.style.Fill({
        color: document.getElementById('polygons-fill-color').value
        }),
        stroke: new ol.style.Stroke({
        color: document.getElementById('polygons-stroke-color').value,
        width: document.getElementById('polygons-stroke-width').value
        })
    })
    return polyganstyle}

    function point() {
        console.log("1")
        styleall=createPointStyleFunction()
    }

    function line() {
        console.log("2")
        styleall=createlineStyleFunction()
    }

    function polygan() {
        console.log("3")
        styleall=createpolyganStyleFunction()
    }
 