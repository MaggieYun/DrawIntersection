$(document).ready(function() {
			/**
			 * 页面加载时绘制路网
			 */
			var dataLoad = function(lines,points,context) {
                var draw = new Draw(context,extent,scale);
				draw.drawLine(lines, context);
				draw.drawtxt(points, context);
			};

			/**
			 * 寻路
			 */
			var findRoute = function(event) {
				var routeEngine = new RouteEngine(netWork);
				routeEngine.doS(event.data.context);
                 $("li").mouseover(function(){
                    $(this).css("background-color","yellow");
                 });
                $("li").mouseout(function(){
                    $(this).css("background-color","white");
                 });
			};
            
            Draw.extent=[[13426192.883026948,3671416.5248470777],[13430755.218152719,3674282.9134077714]];
            Draw.scale=955 / (Draw.extent[1][0] - Draw.extent[0][0]);
            extent=Draw.extent;
            scale=Draw.scale;
            
          
			// 获取绘图上下文
			var canvas = document.getElementById('map');
			var ctx = canvas.getContext('2d');
			var netWork = new NetWork(roads);
			netWork.build();
            //数据准备
            /**
            * netWork中的点数据
            */
			var points = netWork.getPoints();
            /**
             * netWork中的路段数据
             */
            var segments = netWork.getSegments();
            
              //获得原始比例尺像素点坐标,和路段信息
            var convert=new Convert(extent,scale);
            /**
             * 绘制在底图上的点像素坐标
             */
			var pointArr = convert.pointsConvert(points);
			 /**
             * 绘制在底图上的路段起始点像素信息
             */
			var lines =getLinePs(segments);

			console.log(segments.length + " " + "路段");
			console.log(points.length + " " + "节点");
                 
            // 加载数据
            dataLoad(lines,pointArr,ctx);   
            $("#findRoute").bind("click",{"context":ctx},findRoute);
		});

