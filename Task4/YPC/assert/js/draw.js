           /**
         * 根据绘制类型进行交互绘制图形处理,pType参数取如下值：
         * "Point":点
         * "LineString":线
         * "Polygon":多边形
         * "Circle":圆
         * "Square":正方形
         * "Box":长方形
         * "ArrowLine":箭头线
        */
           function addInteraction(pType) {
            //绘制类型
            var value = pType;
            if (pType != "") {
                var geometryFunction, maxPoints;
                if (pType === 'Square') {
                    value = 'Circle';
                    //正方形图形（圆）
                    geometryFunction = ol.interaction.Draw.createRegularPolygon(4);

                } else if (pType === 'Box') {
                    value = 'LineString';
                    maxPoints = 2;
                    geometryFunction = function (coordinates, geometry) {
                        if (!geometry) {
                            //多边形
                            geometry = new ol.geom.Polygon(null);
                        }
                        var start = coordinates[0];
                        var end = coordinates[1];
                        geometry.setCoordinates([
                            [start, [start[0], end[1]], end, [end[0], start[1]], start]
                        ]);
                        return geometry;
                    };
                }else if (pType==="ArrowLine")
                {
                    value  = "LineString";
                    geometryFunction = null;
                }

                //实例化交互绘制类对象并添加到地图容器中
                drawTool = new ol.interaction.Draw({
                    //绘制层数据源
                    source: vectorSource,
                    /** @type {ol.geom.GeometryType}几何图形类型 */
                    type: value,
                    //几何信息变更时调用函数
                    geometryFunction: geometryFunction,
                    //最大点数
                    maxPoints: maxPoints
                });
                map.addInteraction(drawTool);
            }
        }
        function end()
        {
        
                    map.removeInteraction(drawTool);
            
        }

        function addGeomPoint()
        {
        vectorLayer.setStyle(commonStyle);
        if(drawTool!=null)
        {
                //移除绘制图形
                map.removeInteraction(drawTool);
        }
        
            //添加交互绘制功能控件
            addInteraction("Point");

        }

        function addGeomLine()
        {
            vectorLayer.setStyle(commonStyle);
            if(drawTool!=null)
        {
                //移除绘制图形
                map.removeInteraction(drawTool);
        }
        
            //添加交互绘制功能控件
            addInteraction("LineString"); 
        }

        function addGeomCircle()
        {
            vectorLayer.setStyle(commonStyle);
            if(drawTool!=null)
        {
                //移除绘制图形
                map.removeInteraction(drawTool);
        }
        
            //添加交互绘制功能控件
            addInteraction("Circle");        
        }



        function addGeomPolygon()
        {
        vectorLayer.setStyle(commonStyle);
        if(drawTool!=null)
        {
                //移除绘制图形
                map.removeInteraction(drawTool);
        }
        
            //添加交互绘制功能控件
            addInteraction("Polygon");          
        }

        function deleteAll()
        {
            if(vectorSource==null)
            {
                return;
            }
            vectorSource.clear(true);
        }