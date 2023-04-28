function init() {
    var tdk = "7e0a1f0723a8cdd1fae815de41b60052";   //天地图密钥
    map = new ol.Map({
          target: 'mapCon',     //地图容器div的ID
          controls: ol.control.defaults({
              attributionOptions: ({
                  collapsible: true
              })
          }),
          view: new ol.View({
              center: [12758509.849059934, 3562910.2862833445],  //地图初始中心点
              maxZoom: 28,     //最大瓦片显示级数
              minZoom: 1,      //最小瓦片显示级数
              zoom: 17         //地图初始显示级数
          })
      });
      var tdk = "7e0a1f0723a8cdd1fae815de41b60052";   //天地图密钥


    //加载天地图瓦片图层数据
    var TiandiMap_vect = new ol.layer.Tile({
            name: "天地图矢量图层",
            visible:true, //图层不可见
            source: new ol.source.XYZ({
                url: "http://t0.tianditu.com/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=" + tdk,
                wrapX: false
            })
      
    });     
    var TiandiMap_vectcia =new ol.layer.Tile({
            name: "天地图矢量注记图层",
            visible:false, //图层不可见
            source: new ol.source.XYZ({
                url: "http://t0.tianditu.com/DataServer?T=cva_w&x={x}&y={y}&l={z}&tk=" + tdk
            })
    }); 
    var TiandiMap_img = new ol.layer.Tile({
        name: "天地图影像图层",
        visible:false, //图层不可见
        source: new ol.source.XYZ({
            url: "http://t0.tianditu.com/DataServer?T=img_w&x={x}&y={y}&l={z}&tk=" + tdk,
            wrapX: false
        })
    });
    var TiandiMap_imgcia = new ol.layer.Tile({
        name: "天地图影像注记图层",
        visible:false,  //图层不可见
        source: new ol.source.XYZ({
            url: "http://t0.tianditu.com/DataServer?T=cia_w&x={x}&y={y}&l={z}&tk=" + tdk,
            wrapX: false
        })
    });

  

      map.addLayer(TiandiMap_vect);
      map.addLayer(TiandiMap_vectcia
      );
      map.addLayer(TiandiMap_img);
      map.addLayer(TiandiMap_imgcia);
     
    var zoomslider = new ol.control.ZoomSlider(); 
    map.addControl(zoomslider);

    //加载图层列表数据
    
  
    //实例化一个矢量图层Vector作为绘制层
    vectorSource = new ol.source.Vector({ wrapX: false });

    commonStyle = new ol.style.Style({
              fill: new ol.style.Fill({
                  color: 'rgba(255, 255, 255, 0.2)'
              }),
              stroke: new ol.style.Stroke({
                  color: '#ffcc33',
                  width: 2
              }),
              image: new ol.style.Circle({
                  radius: 7,
                  fill: new ol.style.Fill({
                      color: '#ffcc33'
                  })
              })
          });
    
    vectorLayer = new ol.layer.Vector({
          name: "绘画层",
          source: vectorSource,
          visible:true,  //图层不可见
          style: commonStyle,
          
      });
      //将绘制层添加到地图容器中
    map.addLayer(vectorLayer);

      
    var geoLayer = new ol.layer.Vector({
        visible:false,  //图层不可见
        source: new ol.source.Vector({
        // 加载 GeoJSON 数据
        url: "http://localhost:8080/geoserver/ne/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=ne%3AWuhan_city&maxFeatures=50&outputFormat=application%2Fjson",
        format: new ol.format.GeoJSON()
        }),
        style:new ol.style.Style({
                fill: new ol.style.Fill({
                    color:[92, 213, 27, 0.5],
                   
                }),
                stroke: new ol.style.Stroke({
                    color: [231, 229, 223, 0.3],
                    width: 2
                })
            }),
        name: "武汉边界",
        })
        map.addLayer(geoLayer)    
   
   var buildLayer = new ol.layer.Vector({
      source: new ol.source.Vector({
      // 加载 GeoJSON 数据
      url: "/geojson/build.geojson",
      format: new ol.format.GeoJSON()
      }),
      style:new ol.style.Style({
              fill: new ol.style.Fill({
                  color:[231, 229, 223, 1],
                 
              }),
              stroke: new ol.style.Stroke({
                  color: [231, 229, 223, 1],
                  width: 2
              })
          }),
      name: "建筑物",
      })
      map.addLayer(buildLayer)      

  var waterLayer = new ol.layer.Vector({
      source: new ol.source.Vector({
      // 加载 GeoJSON 数据
      url: "/geojson/water.geojson",
      format: new ol.format.GeoJSON()
      }),
      style: new ol.style.Style({
              fill: new ol.style.Fill({
                  color:[21, 71, 139],
                 
              })
      
          }),
      name: "水",
      })
      map.addLayer(waterLayer) 

  var roadLayer = new ol.layer.Vector({
      source: new ol.source.Vector({
      // 加载 GeoJSON 数据
      url: "/geojson/road.geojson",
      format: new ol.format.GeoJSON()
      }),
      style: new ol.style.Style({
              fill: new ol.style.Fill({
                  color:'#e59a76',
                 
              }),
              stroke: new ol.style.Stroke({
                  color: '#e59a76',
                  width: 4
              })
          }),
      name: "道路",
      })
      map.addLayer(roadLayer)  

  var plantLayer = new ol.layer.Vector({
      source: new ol.source.Vector({
      // 加载 GeoJSON 数据
      url: "/geojson/plant.geojson",
      format: new ol.format.GeoJSON()
      }),
      style:  new ol.style.Style({
              fill: new ol.style.Fill({
                  color:[191, 216, 154], 
              }),
          }),
      name: "绿化",
      })
      map.addLayer(plantLayer)  

  var personLayer = new ol.layer.Vector({
      source: new ol.source.Vector({
      // 加载 GeoJSON 数据
      url: "/geojson/personroad.geojson",
      format: new ol.format.GeoJSON()
      }),
      style:  new ol.style.Style({
              fill: new ol.style.Fill({
                  color:[191, 216, 154], 
              }),
          }),
      name: "人行道",
      })
      map.addLayer(personLayer) 

  var groundLayer = new ol.layer.Vector({
      source: new ol.source.Vector({
      // 加载 GeoJSON 数据
      url: "/geojson/ground.geojson",
      format: new ol.format.GeoJSON()
      }),
      style:  new ol.style.Style({
              fill: new ol.style.Fill({
                  color:[225, 139, 82], 
              }),
          }),
      name: "操场",
      })
      map.addLayer(groundLayer) 

      var bullLayer = new ol.layer.Vector({
      source: new ol.source.Vector({
      // 加载 GeoJSON 数据
      url: "/geojson/bull.geojson",
      format: new ol.format.GeoJSON()
      }),
      style:  new ol.style.Style({
              fill: new ol.style.Fill({
                  color:[250, 196, 188], 
              }),
          }),
      name: "球场",
      })
      map.addLayer(bullLayer) 
      
      loadLayersControl(map, "layerTree");
        // 创建 select 交互对象
       
        // // 监听按钮点击事件
        // var button = document.getElementById('change-color-button');
        // button.addEventListener('click', function () {
        // // 获取选中的要素
        // var feature = selectInteraction.getFeatures().getArray()[0];

        // // 将要素的样式恢复为原样
        // feature.setStyle(null);
        // });
   
} 