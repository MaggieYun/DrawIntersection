/**
 * 地图导航工具类
 * @class
 * @requires jQuery
 */
var NavigationTool = function(){    
    var extents=[],bbox,size,cur_mode,range,map_bbox,map_size,rect,map_element;
    /**
     * @name 区域变化事件
     * @event 
     * @param {ExtentEvent} e
     */   
    var map = null;
    /**
     * 设置地图对象
     * @param {jqMap} value 地图对象
     * @return {NavigationTool} this
     */
    this.setMap = function(value){
       map=value;
       map_size=map.getSize();
       map_bbox=map.getBbox();
       map_element=map.getElement();
       size=map_size;
       bbox=map_bbox;
       map.bind("ExtentEvent",onExentEventHandler);
    };
    /**
     * 获取地图对象
     * @return 地图对象
     */
    this.getMap = function(value){
        return map;
    };
    /**
     * 是否第一个视图
     * @return {boolean} 
     */
    this.isFirstExtent = function(){
        //TODO
    };
    /**
     * 是否最后一个视图
     * @return {boolean} 
     */
    this.isLastExtent = function(){
        //TODO
    };
    /**
     * 激活漫游、放大、缩小
     * @param {String} mode 模式,可选值NavigationTool.PAN("pan"),NavigationTool.ZOOM_IN("zoomin"),NavigationTool.ZOOM_OUT("zoomout")
     * @return {NavigationTool} this
     */
    this.activate = function(mode){
          console.log("激活:" + mode + "模式");
          cur_mode = mode;
          map.bind("mousedown",onMouseDown);
          return this;
    };
    /**
     * 恢复默认
     * @return {NavigationTool} this
     */
    this.deactivate = function(){
        cur_mode="";
        extents=[];
        this.zoomToInitialExtent();
        map.unbind("mousedown");
        map.unbind("mousemove");
        map.unbind("mouseup");
        return this;
    };
    /**
     * 回到初始范围
     * @return {NavigationTool} this
     */
    this.zoomToInitialExtent = function(){
        map.setSize(map_size);
        map.setBbox(map_bbox);
    };
    /**
     * 回到下一个范围
     * @return {NavigationTool} this
     */
    this.zoomToNextExtent = function(){
        for(var i=0;i<extents.length;i++){
                if(extents[i]===bbox){
                    if(extents[i+1]){
                        bbox=extents[i+1]; 
                        map.setBbox(bbox,false);
                        return;
                    }
                }
           }
    };
    /**
     * 回到上一个范围
     * @return {NavigationTool} this
     */
    this.zoomToPrevExtent = function(){  
        for(var i=0;i<extents.length;i++){
                if(extents[i]===bbox){
                    if(extents[i-1]){
                        bbox=extents[i-1]; 
                        map.setBbox(bbox,false);
                        return;
                    }
                }
           }
    };
          /**
         * 按下鼠标
         * @private
         */
     var onMouseDown = function(event) {
            var coordinate = [event.clientX, event.clientY];
                // 将临时数组range重置为空
                range = [];
                // 鼠标按下的像素坐标存入range中
                range.push(coordinate);
                if (cur_mode === NavigationTool.ZOOM_IN || cur_mode === NavigationTool.ZOOM_OUT) {
                    getRect();
                    rect.css({
                                top : coordinate[1],
                                left : coordinate[0]
                            }).width(1).height(1).show();
                }
                // 绑定mousemove和mouseup事件
                map.bind("mousemove",onMouseMove);
                map.bind("mouseup",onMouseUp);
        };
        /**
         * 移动鼠标
         * @private
         */
        var onMouseMove = function(event) {
            var coordinate = [event.clientX, event.clientY];
            if (cur_mode === NavigationTool.ZOOM_IN || cur_mode === NavigationTool.ZOOM_OUT) {
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
            console.log(range.toString());
            if (cur_mode === NavigationTool.PAN) {
                bbox = convertToMap(range, cur_mode);
                map.setBbox(bbox);
            }else if(cur_mode === NavigationTool.ZOOM_IN || cur_mode === NavigationTool.ZOOM_OUT){//触发拉框事件
                //最佳坐标
                range = getBestRange(range);
                onDrawBox(range,cur_mode);               
            }      
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
	        console.log(_range.toString());         
			return _range;
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
            console.log("scale"+scale);
            if (mode === NavigationTool.ZOOM_IN) {
                var _x1 = (x1 / scale) + bbox[0];
                var _y1 = bbox[3] - (y1 / scale);
                var _x2 = (x2 / scale) + bbox[0];
                var _y2 = bbox[3] - (y2 / scale);
                console.log("zoomin---range--" + [_x1, _y2, _x2, _y1]);
                mapRange = [_x1, _y2, _x2, _y1];
            } else if (mode === NavigationTool.ZOOM_OUT) {
                var _x1 = bbox[0] - x1 / scale;
                var _y1 = bbox[1] - y1 / scale;
                var _x2 = (size[0] - x2) / scale + bbox[2];
                var _y2 = (size[1] - y2) / scale + bbox[3];
                console.log("zoomout--range---" + [_x1, _y1, _x2, _y2]);
                mapRange = [_x1, _y1, _x2, _y2];
            } else if (mode === NavigationTool.PAN) {
                var xmove = x2 - x1;
                var ymove = y2 - y1;
                var _x1 = -xmove / scale + bbox[0];
                var _y1 = ymove / scale + bbox[1];
                var _x2 = -xmove / scale + bbox[2];
                var _y2 = ymove / scale + bbox[3];
                console.log("pan--range---" + [_x1, _y1, _x2, _y2]);
                mapRange = [_x1, _y1, _x2, _y2];
            }
            console.log("mapRange"+mapRange.toString());
            return mapRange;
        };
         /*** 获得像素和地理坐标
         * @return [pixel,mapPoint] 二维数组
         */
        var getPixelMap=function(event){
            var pixel=[event.clientX,event.clientY];
            var convert=new Convert(bbox,scale);
            var mapPoint=convert.covPixelToLaLo(pixel);
            return [{"pixel":pixel,"mapPoint":mapPoint}];
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
         * 拉框放大缩小事件
         * @private
         */
        var onDrawBox = function(range,mode){
            bbox = convertToMap(range,mode);
            rect.hide();
            map.setBbox(bbox);
            map.unbind("mousemove", onMouseMove);
            map.unbind("mouseup", onMouseUp);
        }; 
        /**
         * 存储视图集合
         */
        var onExentEventHandler=function(event,ExtentEvent){
            if(ExtentEvent.levelChange){
                 extents.push(ExtentEvent.extent);
                 bbox=ExtentEvent.extent;//每次改变exten时候同时修改navigatool里面的  bbox
            }
            console.log("extents.length"+extents.length);
            console.log("bbox"+bbox);
        };
};
/**
 * 漫游模式
 * @constant
 * @type String
 */
NavigationTool.PAN = "pan";
/**
 * 放大模式
 * @constant
 * @type String
 */
NavigationTool.ZOOM_IN = "zoomin";
/**
 * 缩小模式
 * @constant
 * @type String
 */
NavigationTool.ZOOM_OUT = "zoomout";
