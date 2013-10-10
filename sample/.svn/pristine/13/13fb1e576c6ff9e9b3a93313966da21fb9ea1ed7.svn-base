 //(function($) {
    $.fn.jqMap = function() {
        var element = $(this);
        var self = this;
        var _netWork,_points,_segments;
        var context,cavs,canvas;      
        var initialsize,size;
        var initialbbox,bbox;
       /**
        * 获得jquer对象
        */ 
        this.getElement=function(){
            return element;
        };
        /**
         * 设置页面地图大小
         * @param {String} value 地图大小
         */
        this.setSize = function(value) {
            if(!initialsize){
                 initialsize=value;
                 console.log("设置初始地图大小");
            }
            size = value;
            return this;
        };
        /**
         * 获得原始size大小
         */
        this.getSize=function(){
            return initialsize;
        };
         /**
         * 画布
         */
        var getCtx = function() {
            if (!cavs) {
                cavs = $("<canvas width='"+size[0]+"' "+ "height='"+size[1]+"'/>");//.width(size[0]).height(size[1]);
                element.append(cavs);
                canvas=cavs.get(0);
                context=canvas.getContext('2d');
            }
            return context;
        };       
        /**
         * 设置初始地理范围
         * @param {String} value 地理范围
         */
        this.setBbox = function(value,booln) {
            if(!initialbbox){
                 initialbbox = value;
                 console.log("设置初始地理范围");
            }
            var bool=(booln===undefined? true:booln);
            bbox = value;
            scale=size[0]/(bbox[2]-bbox[0]);
            //触发自定义事件"ExtentEvent",并传递extentevent
            var extentevent = new ExtentEvent(ExtentEvent.EXTENT_CHANGE,bbox,bool);
            element.trigger("ExtentEvent",extentevent);
            return this;
        };
        /**
         * 获得初始地理范围
         */
        this.getBbox=function(){
            return initialbbox;
        };
        /**
         * 设置netWork，_points,_segments
         */
        this.setNetWork=function(netWork){
            _netWork=netWork;
            _points = _netWork.getPoints();
            _segments = _netWork.getSegments();
            //模拟的禁行路段
            var turn=new Turn(_points[60],_points[61],_points[92]);
            _netWork.addToForbid(turn);
            return this;
        };
        /**
         * 设置页面地图大小
         * @param {String} value 地图大小
         */
        this.setSize = function(value) {
            if(!initialsize){
                 initialsize=value;
                 console.log("设置初始地图大小");
            }
            size = value;
            return this;
        };
        /**
         * 获得原始size大小
         */
        this.getSize=function(){
            return initialsize;
        };
        /**
         * 显示地图
         */
        this.show = function() {
            refresh();
            return this;
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
        * @private
         * 监听MapExtentChange事件
         * @param {Array} bbox 地理范围
         */
         var onExtentEvent = function(event,ExtentEvent){
            console.log("监听到"+ExtentEvent.type+"事件,当前bbox值为:"+ExtentEvent.extent); 
                refresh();//调用刷新方法，请求新的地图图片
        };
        
        //注册"map:extentChange"事件监听函数
        element.bind("ExtentEvent",onExtentEvent);
        /**
         * 换图
         * @private
         */
        var refresh = function() {
            var ctx=getCtx();
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            var draw=new Draw(ctx,bbox);

            var convert=new Convert(bbox,scale);
            var pointsArr = convert.pointsConvert(_points);
            var lines =getLinePs(_segments);
          
            draw.drawLine(lines, ctx);//绘路
            draw.drawtxt(pointsArr, ctx);//绘节点
        };         
         /**
         * Map上绘点
         * @param pixel 像素坐标 color 颜色
         */
        this.drawPoint=function(pixel,color){  
            var draw=new Draw(bbox);
            var _pixel=[pixel[0]-5,pixel[1]-5];
            draw.drawPoint(_pixel,context,color);
        };
        /**
         * 在Map上绘制路径
         * @param 最终路径点数组
         */
        this.drawFinalroute=function(finalRoute){
            var draw=new Draw(bbox);
            draw.drawPolyline(finalRoute, context,scale);
        };
         /*** 获得像素和地理坐标
         * @return [pixel,mapPoint] 二维数组（像素坐标和地理坐标）
         * @private
         */
        var getPixelMap=function(event){
            var pixel=[event.clientX,event.clientY];//像素
            var convert=new Convert(bbox,scale);
            var lolat=convert.covPixelToLaLo(pixel);//像素对应的地理坐标
            var _lolat=new Point(lolat[0],lolat[1]);
            var close_lolat=_netWork.findNearestP(_lolat);//最近的地理坐标
            var close_pixel=convert.covLaLatoPixel(close_lolat);//最近的地理坐标对应的像素坐标
            return [{"pixel":close_pixel,"lolat":close_lolat}];
        };
        /**
         * map页面点击事件
         * @private 用于单击页面选取点 依赖于getPixelMap()方法
         */
        var clickHandle=function(){
            var data=getPixelMap(event,bbox,scale)[0];
            var mapclick=new MapChickEvent(MapChickEvent.MAP_CLICK,data.pixel,data.lolat);
            element.trigger("MapClickEvent",mapclick);
        };
     /**
     * 路段起始端的像素坐标
     */
       var getLinePs=function(segments){
            var convert=new Convert(bbox,scale);
            var LinePs=[];
            for ( var i = 0; i < segments.length; i++) {
                var startP = convert.covLaLatoPixel(segments[i].getStartP());
                var endP = convert.covLaLatoPixel(segments[i].getEndP());
                var linep=[startP,endP];
                LinePs.push(linep);
            }
            return LinePs;
        };
        element.click(clickHandle);
        return this;
    };
//})(jQuery);