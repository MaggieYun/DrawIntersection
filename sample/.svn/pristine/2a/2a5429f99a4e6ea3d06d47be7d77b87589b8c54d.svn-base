 //(function($) {
	$.fn.jqMap = function() {
		var element = $(this);
		var cavs,scale,canvas,cntext, initialsize,size, initialbbox, bbox, url, range = [], rect, views = [];
		var startendP=[];
        var self = this;
        var cur_mode = "pan";//当前模式
		/**
		 * canvas
		 */
		var getCavs = function() {
			if (!cavs) {
				cavs = $("<canvas width='"+size[0]+"' "+ "height='"+size[1]+"'/>");//.width(size[0]).height(size[1]);
				//console.log("<canvas width='"+size[0]+"' "+ "height='"+size[1]+"'/>");
				element.append(cavs);
				canvas=cavs.get(0);
				cntext=canvas.getContext('2d');
			}
			return cntext;
		};
		/**
		 * 设置页面地图大小
         * @param {String} value 地图大小
		 */
		this.setSize = function(value) {
			console.log("设置地图大小");
            initialsize=value;
			size = value;
			return this;
		};
    
		/**
		 * 设置初始地理范围
         * @param {String} value 地理范围
		 */
		this.setBbox = function(value) {
            if(!initialbbox){
			     initialbbox = value;
                 console.log("设置初始地理范围");
            }
			bbox = value;
			scale=size[0]/(bbox[2]-bbox[0]);
			console.log("scale"+scale);
            views.push(bbox);
            //触发自定义事件"map:extentChange",并传递改变后的bbox
            element.trigger("map:extentChange",bbox);
			return this;
		};
        
       /**
        * @private
         * 监听MapExtentChange事件
         * @param {Array} bbox 地理范围
         */
         var onMapExtentChange = function(event,bbox){
            console.log("监听到'map:extentChange'事件,当前bbox值为:"+bbox.toString()); 
                refresh();//调用刷新方法，请求新的地图图片
        };
        
        //注册"map:extentChange"事件监听函数
        element.bind("map:extentChange",onMapExtentChange);
        
        /**
         * 重置，使地图返回原始大小和范围
         */
        this.reset=function(){
            self.setBbox(initialbbox);
            size=initialsize;
            $("#result>li").detach();
            startendP=[];
        };
		/**
		 * 前一个视图
		 */
		this.preView = function() {            
           for(var i=0;i<views.length;i++){
                if(views[i]===bbox){
                    if(views[i-1]){
                    	bbox=views[i-1]; 
                        refresh();
                        return;
                    }
                }
           }
		};
        /**
         * 后一个视图
         */
        this.nextView = function() {
            for(var i=0;i<views.length;i++){
                console.log(bbox);
                if(views[i]===bbox){
                    if(views[i+1]){
                    	bbox=views[i+1]; 
                        refresh();
                        return;
                    }
                }
           }
        };
		/**
		 * 激活操作模式 zoomin,zoomout,pan
		 */
		this.activate = function(mode) {
			console.log("激活:" + mode + "模式");
            cur_mode = mode;
            element.bind("mousedown",onMouseDown);
			return this;
		};

		/**
		 * 显示地图
		 */
		this.show = function() {
			refresh();
			console.log("显示 map");
			return this;
		};
        
		/**
		 * 换图
         * @private
		 */
		var refresh = function() {
			var ctx=getCavs();
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			var draw=new Draw(ctx,bbox);

	        var convert=new Convert(bbox,scale);
	        //console.log(bbox+"---"+scale);
			var pointsArr = convert.pointsConvert(points);
			var lines =draw.getLinePs(segments);
          
			draw.drawLine(lines, ctx);
			draw.drawtxt(pointsArr, ctx);
		};

		/**
		 *放大
		 */
		this.zoomIn = function() {
			var newbbox = [];
			var _x = bbox[2] - bbox[0];
			var _y = bbox[3] - bbox[1];
			newbbox[0] = bbox[0] + _x / 6;
			newbbox[1] = bbox[1] + _y / 6;
			newbbox[2] = bbox[2] - _x / 6;
			newbbox[3] = bbox[3] - _y / 6;
			console.log("newbbox"+newbbox);
			self.setBbox(newbbox);
		};

		/**
		 * 缩小
		 */
		this.zoomOut = function() {
			var newbbox = [];
			var _x = bbox[2] - bbox[0];
			var _y = bbox[3] - bbox[1];
			newbbox[0] = bbox[0] - _x / 6;
			newbbox[1] = bbox[1] - _y / 6;
			newbbox[2] = bbox[2] + _x / 6;
			newbbox[3] = bbox[3] + _y / 6;
			self.setBbox(newbbox);
		};
        /**
         * 移动一定的距离（上下左右）
         * @param direction {String} 方向
         */
        this.move=function(direction){
            var newbbox = [];
            var _x = bbox[2] - bbox[0];
            var _y = bbox[3] - bbox[1];
            switch(direction){
                case "left":
	                newbbox[0] = bbox[0] + _x / 6;
		            newbbox[1] = bbox[1];
		            newbbox[2] = bbox[2] + _x / 6;
		            newbbox[3] = bbox[3];  
                    break;
                case "right":
                    newbbox[0] = bbox[0] - _x / 6;
                    newbbox[1] = bbox[1];
                    newbbox[2] = bbox[2] - _x / 6;
                    newbbox[3] = bbox[3]; 
                    break;
                case "up":
                    newbbox[0] = bbox[0]; 
                    newbbox[1] = bbox[1]- _y / 6;
                    newbbox[2] = bbox[2]; 
                    newbbox[3] = bbox[3]- _y / 6; 
                    break;
                case "down":
                    newbbox[0] = bbox[0]; 
                    newbbox[1] = bbox[1]+ _y / 6;
                    newbbox[2] = bbox[2]; 
                    newbbox[3] = bbox[3]+ _y / 6;  
                    break;
            }
            self.setBbox(newbbox);
        };
        /**
         * 移动地图中心到point
         */
        this.centerAt=function(point){
        	var newbbox=[];
        	newbbox[0]=point.getX()-0.5*(bbox[2]-bbox[0]);
        	newbbox[1]=point.getY()-0.5*(bbox[3]-bbox[1]);
        	newbbox[2]=0.5*(bbox[2]-bbox[0])+point.getX();
        	newbbox[3]=0.5*(bbox[3]-bbox[1])+point.getY();
        	self.setBbox(newbbox);
        };
		/**
		 * 按下鼠标
         * @private
		 */
		var onMouseDown = function(event) {
			var coordinate = [event.clientX, event.clientY];
			if(cur_mode==="getPoints"){
				console.log("startendP.length"+startendP.length);
				//绘制鼠标点击的点
				drwaPoint(cntext,coordinate,"yellow");
				//将该点转换为地理坐标点
                var convert=new Convert(bbox,scale);
                var mapPoint=convert.covPixelToLaLo(coordinate);
                mapPoint=new Point(mapPoint[0],mapPoint[1]);
                //从所有点中找到最近点
                var nearestP=findNearestP(mapPoint,points);
                startendP.push(nearestP);
                //算出像素坐标，绘制
                nearestP=convert.covLaLatoPixel(nearestP);
                drwaPoint(cntext,nearestP,"red");
			}else{
				// 将临时数组range重置为空
				range = [];
				// 鼠标按下的像素坐标存入range中
				range.push(coordinate);
				if (cur_mode === "zoomin" || cur_mode === "zoomout") {
					getRect();
					rect.css({
								top : coordinate[1],
								left : coordinate[0]
							}).width(1).height(1).show();
				}
				// 绑定mousemove和mouseup事件
				element.bind("mousemove",onMouseMove);
				element.bind("mouseup",onMouseUp);
			} 

		};
		/**
		 * 移动鼠标
         * @private
		 */
		var onMouseMove = function(event) {
			var coordinate = [event.clientX, event.clientY];
			if (cur_mode === "zoomin" || cur_mode === "zoomout") {
				if (rect) {
					var top = rect.offset().top;
					var left = rect.offset().left;
					if (top < coordinate[1]) {
						rect.height(coordinate[1] - top - 5)
								.width(coordinate[0] - left - 5);
					} else {
						rect.css({
									top : coordinate[1],
									left : coordinate[0]
								}).width(top - coordinate[1] - 5).height(left
								- coordinate[0] - 5);
					}
				}
			}
		};
		/**
		 * 鼠标弹起
         * @private
		 */
		var onMouseUp = function(event) {
			var coordinate = [event.clientX, event.clientY];
			// 鼠标按下和弹起的两点的坐标
			range.push(coordinate);
			console.log(range);
			if (cur_mode === "pan") {
                bbox = convertToMap(range, cur_mode);
                self.setBbox(bbox);
			}else if(cur_mode === "zoomin" || cur_mode === "zoomout"){//触发拉框事件
                //最佳坐标
                range = getBestRange(range);
                element.trigger("map:drawBox",{"a":range});                
            }      
		}; 
        /**
         * 拉框事件
         * @private
         */
        var onDrawBox = function(event,range){
            if(cur_mode === "zoomin" || cur_mode==="zoomout"){
                var bbox = convertToMap(range.a, cur_mode);
                rect.hide();
                self.setBbox(bbox);
            }else if(cur_mode){
                //
            }
            element.unbind("mousemove", onMouseMove);
            element.unbind("mouseup", onMouseUp);
        };

        //注册监听事件map:drawBox
        element.bind("map:drawBox",onDrawBox);
        
		/**
         * @private
		 * 生成地图图片URL
		 */
		var genMapArgs = function() {
			return url + "?size=" + size.join(",") + "&bbox=" + bbox.join(",")
					+ "&inSR=4326&outSR=4326";
			
		};
		/**
         * 将像素坐标转变为地理坐标
         * @private
         * @param {String} range 框选范围
         * @param {String} mode 模式
		 */
		var convertToMap = function(range, mode) {
			var x1 = range[0][0];
			var y1 = range[0][1];
			var x2 = range[1][0];
			var y2 = range[1][1];
			var mapRange = [];
			var scale = size[0] / (bbox[2] - bbox[0]);

			if (mode === "zoomin") {
				var _x1 = (x1 / scale) + bbox[0];
				var _y1 = bbox[3] - (y1 / scale);
				var _x2 = (x2 / scale) + bbox[0];
				var _y2 = bbox[3] - (y2 / scale);
				console.log("zoomin---range--" + [_x1, _y2, _x2, _y1]);
				mapRange = [_x1, _y2, _x2, _y1];
			} else if (mode === "zoomout") {
				var _x1 = bbox[0] - x1 / scale;
				var _y1 = bbox[1] - y1 / scale;
				var _x2 = (size[0] - x2) / scale + bbox[2];
				var _y2 = (size[1] - y2) / scale + bbox[3];
				console.log("zoomout--range---" + [_x1, _y1, _x2, _y2]);
				mapRange = [_x1, _y1, _x2, _y2];
			} else if (mode === "pan") {
				var xmove = x2 - x1;
				var ymove = y2 - y1;
				var _x1 = -xmove / scale + bbox[0];
				var _y1 = ymove / scale + bbox[1];
				var _x2 = -xmove / scale + bbox[2];
				var _y2 = ymove / scale + bbox[3];
				console.log("pan--range---" + [_x1, _y1, _x2, _y2]);
				mapRange = [_x1, _y1, _x2, _y2];
			}
			return mapRange;
		};

		/**
		 * 获得有效范围
		 * @private 
		 * @param range框选范围 
         * @return 返回点的x，y坐标和id 
		 */
		var getBestRange = function(range) {
			var _range = [];
                var x_range = range[1][0] - range[0][0];
	            var y_range = range[1][1] - range[0][1];
	
	            var x_extent = size[0];
	            var y_extent = size[1];
                

                    var x_center = 0.5 * (range[1][0] + range[0][0]);
	                var y_center = 0.5 * (range[1][1] + range[0][1]);
	    
	                if (x_range / y_range > x_extent / y_extent) {
	                    _range[0] = [x_center - 0.5 * x_extent / y_extent * y_range,
	                            y_center - 0.5 * y_range];
	                    _range[1] = [x_center + 0.5 * x_extent / y_extent * y_range,
	                            y_center + 0.5 * y_range];
	                } else {
	                    _range[0] = [x_center - 0.5 * x_range,
	                            y_center - 0.5 * y_extent / x_extent * x_range];
	                    _range[1] = [x_center + 0.5 * x_range,
	                            y_center + 0.5 * y_extent / x_extent * x_range];
	                }
	                 
			return _range;
		};
		/**
         * @private
		 * 拉框div
		 */
		var getRect = function() {
			if (rect === undefined) {
				rect = $("<div/>").css({
							"position" : "absolute",
							"border" : "solid red 1px"
						}).appendTo($("body"));
			}
		};
		 /**
         * 绘点
         */
        var drwaPoint=function(context,point,color){  
            var draw=new Draw(context,bbox);
            var _point=[point[0]-5,point[1]-5];
            draw.drawPoint(_point,context,color);
        };
        /**
         * 获得最近点
         * @param point 点选点
         * @param points 点数组
         * @returns
         */
        var findNearestP=function(point,points){
        	var minDistance=point.distance(points[0]);
        	var nearestP=points[0];
        	for(var i=0;i<points.length;i++){
        		var tempDistance=point.distance(points[i]);
        		if(tempDistance<minDistance){
        			minDistance=tempDistance;
                	nearestP=points[i];
        		}
        	}
        	return nearestP;
        };
		/**
		 * 寻路
		 */
		this.findRoute = function() {
			var routeEngine = new RouteEngine(netWork,startendP);
			//最短路径
			var finalRoute=routeEngine.doS(cntext);
			//最终路径结果路段信息
			var showSegmt=routeEngine.txtAnnotate(finalRoute);
			//绘制结果路径
			var draw=new Draw(cntext,bbox);
			draw.drawPolyline(finalRoute, cntext);
			resultSegmt.setMap(map)
			   .setResultSegments(showSegmt)
			   .show(); 
		};
		return this;
	};
//})(jQuery);