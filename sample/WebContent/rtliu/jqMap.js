(function($){
    $.fn.jqMap = function(){
        var element = $(this);
        var img,size,bbox,url;
        
        var getImg = function(){
            if(!img){
                img = $("<img/>");
            }
            return img;
        };
        
        /**
         * 设置地图大小
         */
        this.setSize = function(value){
            console.log("设置地图大小");
            size = value;
            return this;
        };
        
        /**
         * 设置初始地理范围
         */
        this.setBbox = function(value){
            console.log("设置初始地理范围");
            bbox = value;
            return this;
        };
        
        /**
         * 设置URL
         */
        this.setUrl = function(value){
            console.log("设置URL");
            url = value;
            return this;
        };
        
        /**
         * 激活操作模式 zoomin,zoomout,pan
         */
        this.activate = function(mode){
            console.log("激活:" + mode + "模式");
            return this;
        };
        
        /**
         * 显示地图
         */
        this.show = function(){
            element.append(getImg().attr("src",genMapUrl()));
            element.width(size[0]).height(size[1]);
            console.log("显示 map");   
            return this;
        };
        
        //生成地图图片URL
        var genMapUrl = function(){
            return url + "?size=" + size.join(",") + "&bbox=" + bbox.join(",");
        };
        
        return this;
    };
})(jQuery);