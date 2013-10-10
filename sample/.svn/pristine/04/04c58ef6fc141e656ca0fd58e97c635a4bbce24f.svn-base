$(document).ready(function() {
            /**
             * 页面加载时绘制路网
             */
            var dataLoad = function(draw,lines,points,canvas) {
                draw.drawLine(lines, canvas);
                draw.drawtxt(points, canvas);
            };

            /**
             * 寻路
             */
            var findRoute = function(event) {
                var routeEngine = new RouteEngine(netWork);
                routeEngine.doS(event.data.canvas);
            };
            /**
             * 刷新
             */
            var refresh = function(event) {
                extent=Draw.extent;
                scale=955 / (Draw.extent[1][0] - Draw.extent[0][0]);
                var navitation=new Navigation(ctx,points,segments);
                $("#map").bind("mousedown",navitation.cnvs_mouseDown);
                $("#map").bind("mousemove",navitation.cnvs_mouseMove);
                $("#map").bind("mouseup",navitation.cnvs_mouseUp);
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                dataLoad(event.data.draw,event.data.lines,event.data.points,event.data.canvas);
            };
            /*var navitation=function(event){
                var navitation=new Navigation(event.data.ctx,event.data.scale,
                                              event.data.extent,event.data.points,event.data.segments);
                
                $("#map").bind("mousedown",navitation.cnvs_mouseDown);
                $("#map").bind("mousemove",navitation.cnvs_mouseMove);
                $("#map").bind("mouseup",navitation.cnvs_mouseUp);
            };*/
            var rect;
            var start = false;
            Draw.extent=[[13426192.883026948,3671416.5248470777],[13430755.218152719,3674282.9134077714]];
            Draw.scale=955 / (Draw.extent[1][0] - Draw.extent[0][0]);
            extent=Draw.extent;
            scale=Draw.scale;
            

            // 获取绘图上下文
            var canvas = document.getElementById('map');
            var ctx = canvas.getContext('2d');
            var netWork = new NetWork(roads);
            netWork.build();
            var draw = new Draw(ctx,extent,scale);
            var convert=new Convert(extent,scale);
         
           /**
            * netWork中的点数据
            */
            var points = netWork.getPoints();
            /**
             * netWork中的路段数据
             */
            var segments = netWork.getSegments();
            /**
             * 绘制在底图上的点像素坐标
             */
            var pointArr = convert.pointsConvert(points);
             /**
             * 绘制在底图上的路段起始点像素信息
             */
            var lines = draw.getLinePs(segments);

            console.log(segments.length + " " + "路段");
            console.log(points.length + " " + "节点");
            
                        
            // 加载数据
            dataLoad(draw,lines,pointArr,ctx);   
            var navitation=new Navigation(ctx,extent);
        });

