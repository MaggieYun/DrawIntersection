/**
 * 情报板类
 * @class
 */
IBSPanel = function(dom, url){
  /**
   *dom节点
  */ 
  var _dom;
  
  this.setDom = function(value){
  		_dom = value;
  };
  
  this.setDom(dom);
  
  /**
   *url请求地址
  */
  var _url;
  
  this.setUrl = function(value){
  		_url = value;	
  };
  this.setUrl(url);
  
	/**
     * 情报板的宽度
     */
  var _width;
  
  this.setWidth = function(value){
  	_width = value
  };
  
    /**
     * 情报板的高度
     */
    var _height;
    this.setHeight = function(value){
    		_height = value;
    };
    
    /**
     * 情报板的top值
     */
    var _top;
    this.setTop = function(value){
    		_top = value;	
    };
    /**
     * 情报板的left值
     */
    var _left;
    this.setLeft = function(value){
    		_left = value;
    };
    /**
     *图标DIV
     */
    var _imgDiv;
    /**
     *滚动ul
     */
    var _ul;
    /**
     *播放列表
     */
    var _IBSMenu = new IBSMenu();
    /**
     *当前播放的条目索引
     */
    var _playIndex = -1;
    
    /*
     *初始化
     */
    function init(){
        _imgDiv = $("<div>").height(0).width(0)
        .css("background-color","black")
        .css("float","left").appendTo($("#"+_dom));
        
        var div = $("<div>").height(_height+52).width(_width+50)
        .css("background-color","black")
        .appendTo($("#"+_dom));
        
        _ul = $("<ul>", {
            "class": "marquee"
        }).height(_height).width(_width)
        .css("background-color","black")
        .appendTo(div); 
    };
    
    /*
     *装配li组件
     */
    function addItems(){
    	  var length = _IBSMenu.getLength();
    		for(var i=0; i<length; i++){
            var li = $("<li>").appendTo(_ul);
            var ibsMenuItem = _IBSMenu.getItem(i); 
            li.append(ibsMenuItem.getShowFormat());
        }	
    };
    
    /**
     * 获取播放列表
     * @return {IBSMenu} 播放列表
     */
    this.getMenu = function(){
        return _IBSMenu;
    };
    
    /**
     * 获取播放条目
     * @param {Number} index 索引位置
     * @return {IBSMenuItem} 播放条目
     */
    this.getItem = function(index){
        return _IBSMenu.items[index];
    };
    
    /**
     *获取当前播放条目
     *@return {IBSMenuItem} 当前播放条目
     */
    this.getCurItem = function(){
    		return this.getItem(_playIndex);
    		if(_playIndex == -1)
    				return null;
    };
    
    /**
     *获取当前播放条目索引
     *@return {IBSMenuItem} 当前播放条目
     */
    this.getCurItemIndex = function(){
    		return _playIndex;
    };
    
    /**
     * 清空播放列表
     * @return {Boolean} 操作是否成功
     */
    this.clear = function(){
        _IBSMenu = null;
        _ul.empty();
        _imgDiv.empty();
        return true;
    };
    
    /**
     * 更新播放列表
     * @param {IBSMenu} menu
     * @return {Boolean} 操作是否成功
     */
    this.update = function(menu){
        this.clear();
        _IBSMenu = menu;
        var length = _IBSMenu.getLength();
        for(var i=0; i<length; i++){
            var li = $("<li>").appendTo(_ul);
            var ibsMenuItem = _IBSMenu.getItem(i); 
            li.append(ibsMenuItem.getShowFormat());
        }
        return true;
    };
    
    /**
     * 更新指定播放条目
     * @param {IBSMenuItem} item
     * @param {Number} index 位置
     * @return {Boolean} 操作是否成功
     */
    this.updateItem = function(item, index){
    		var li = $(".marquee li:eq("+index+")");
    		li.html(item.getShowFormat());
    		_IBSMenu.updateItem(item, index);
    		return true;
    };
    
    /**
     * 添加播放条目
     * @param {IBSMenuItem} item 播放条目
     * @param {Number} index 位置
     * @return {Boolean} 操作是否成功
     */
    this.insert = function(item,index){
        _IBSMenu.items.splice(index, 0, item);
        var brother = $(".marquee li:eq("+index+")");
        var li = $("<li>").insertBefore(brother);
        li.append(item.getShowFormat());
        _ul.marquee("update", index);
        return true;
    };
    
    /**
     * 删除播放条目
     * @param {Number} index 位置
     * @return {Boolean} 操作是否成功
     */
    this.remove = function(index){
        $("ul li:eq("+index+")").remove();
        _IBSMenu.items.splice(index, 1);
        return true;
    };

    /**
     * 设置长和宽
     * @param {Number} width 宽度
     * @param {Number} height 高度
     * @return {Boolean} 操作是否成功
     */
    this.size = function(width, height) {
        if(typeof(width) != 'undefined' && width >= 0){ 
            _ul.width(width);
     　 }
        if(typeof(height) != 'undefined' && height >= 0){ 
        　　_ul.height(height);
     　 }
        return true;
    };
    
    /**
     * 设置位置
     * @param {Number} left left值
     * @param {Number} top top高度
     * @return {Boolean} 操作是否成功
     */
    this.position = function(x, y){
        if(typeof(x) != 'undefined' && typeof(y) != 'undefined'){ 
            $("#"+_dom).css({ position:"absolute" , left:x+"px", top:y+"px"});
            _ul.css({ position:"absolute" , left:x+"px", top:y+"px"});
     　 }
        return true;
    };
    
    /**
     *自动更新
     */
    function renew(self){
    	 var urls = _url.split("?");
       $.ajax({
            url:urls[0],
            type:"GET",
            data: urls[1]+"&type=cms",
            dataType:"json",
            
            success:function(dev){
            		if(_width != dev.devicewidth || _height != dev.deviceheight){
            				self.size(dev.devicewidth, dev.deviceheight);
            		}
            },
            error:function(XMLHttpRequest,textStatus,errorthrow){
                alert("请求错误，请联系管理员");
            }
       });
       
       $.ajax({
            url:urls[0],
            type:"GET",
            data: urls[1]+"&type=playlist",
            dataType:"json",
            
            success:function(devs){
            	 var menu = new IBSMenu();
               for(var i=0; i<devs.length; i++){
                		 var dev = devs[i];
               			 var config = {"content":dev.scontent, "fontName":dev.bfontname, "fontSize":dev.bfontsize, "fontColor":dev.fontColor
               			 								, "startMonth":dev.startmon, "endMonth":dev.endmon, "startWeekday":dev.startweekday, "endWeekday":dev.endweekday
               			 								, "startDay":dev.startday, "endDay":dev.endday
               			 								, "startHour":dev.starthour, "endHour":dev.endhour
               			 								, "startMinute":dev.startminute, "endMinute":dev.endminute};
							       var ibsMenuItem = new IBSMenuItem(config);
							       menu.addItem(ibsMenuItem);
                }
                if(menu.getLength() != _IBSMenu.getLength()){
                		self.update(menu);
                		//self.play();
                }
                var length = menu.getLength();
                for(var i=0; i<length; i++){
                    var newItem = menu.getItem(i);
                    var oldItem = _IBSMenu.getItem(i);
                    if(!oldItem.equalTo(newItem)){
                    		self.updateItem(newItem, i);
                    }
                }
            },
            error:function(XMLHttpRequest,textStatus,errorthrow){
                alert("请求错误，请联系管理员");
            }
       });
    };
    
    /**
     * 获取情报板参数
     */
    function getParam(param){
    	 var self = this;
    	 var urls = param.split("?");
       $.ajax({
            url:urls[0],
            type:"GET",
            data: urls[1]+"&type=cms",
            dataType:"json",
            
            success:function(dev){
                _width = dev.devicewidth;
                _height = dev.deviceheight;
                init();
                
            },
            error:function(XMLHttpRequest,textStatus,errorthrow){
                alert("请求错误，请联系管理员");
            }
       });
       
       $.ajax({
            url:urls[0],
            type:"GET",
            data: urls[1]+"&type=playlist",
            dataType:"json",
            
            success:function(devs){
               for(var i=0; i<devs.length; i++){
                		 var dev = devs[i];
               			 var config = {"content":dev.scontent, "fontName":dev.bfontname, "fontSize":dev.bfontsize, "fontColor":dev.fontColor
               			 								, "startMonth":dev.startmon, "endMonth":dev.endmon, "startWeekday":dev.startweekday, "endWeekday":dev.endweekday
               			 								, "startDay":dev.startday, "endDay":dev.endday
               			 								, "startHour":dev.starthour, "endHour":23
               			 								, "startMinute":dev.startminute, "endMinute":59};
							       var ibsMenuItem = new IBSMenuItem(config);
							       _IBSMenu.addItem(ibsMenuItem);
                }
                addItems();
            },
            error:function(XMLHttpRequest,textStatus,errorthrow){
                alert("请求错误，请联系管理员");
            }
       });
       
     
       var content1 = "<p><span style=\"color: #ff0000;\"><strong>sdfsadfsadf<span style=\"text-decoration: underline; background-color: #3366ff;\"><em>fsdfsdfa</em></span></strong></span></p>";
       var config1 = {"content":content1,"endMinute":59,"endHour":23};
       var ibsMenuItem1 = new IBSMenuItem(config1);
       _IBSMenu.addItem(ibsMenuItem1);
       
       var content2 = "<p><strong><span style=\"color: #ff0000;\">怡和科技</span></strong> &nbsp;<em><span style=\"color: #ffff00;\">和谐交通</span></em> &nbsp;<span style=\"text-decoration: underline; color: #00ccff;\"><span style=\"font-size: large;\">人文苏州</span></span> <span style=\"font-family: 'arial black', 'avant garde'; background-color: #ff0000;\">文明先锋</span></p>";
       var config2 = {"content":content2,"endMinute":59,"endHour":23};
       var ibsMenuItem2 = new IBSMenuItem(config2);
       _IBSMenu.addItem(ibsMenuItem2);
       
        /*
       var content1 = "情报板信息3";
       var config1 = {"content":content1,"startMinute":17,"startHour":15,"endMinute":18,"endHour":15};
       var ibsMenuItem1 = new IBSMenuItem(config1);
       _IBSMenu.addItem(ibsMenuItem1);
       
       var content2 = "情报板信息4";
       var config2 = {"content":content2,"endMinute":59,"endHour":23};
       var ibsMenuItem2 = new IBSMenuItem(config2);
       _IBSMenu.addItem(ibsMenuItem2);
       */
    };
    
    /**
     * 播放演播列表
     */
    this.play = function(){
    	var self = this;
    	_ul.marquee({scroll: "left", beforeshow:function(e,f,index){
    	   var ibsMenuItem = _IBSMenu.getItem(index);
    	   if(!ibsMenuItem.getEnable()){//该信息不在发布时间段内，则播放下一条信息
    	   		 var newIndex = -1;
    	   		 var length = _IBSMenu.getLength();
    	   	   for(var i=index+1; i<length; i++){
    	   	   	   var item = _IBSMenu.getItem(i);
    	   	       if(item.getEnable()){
    	   	           _playIndex = i;
    	   	           newIndex = i;
    	   	           break;
    	   	       }
    	   	   }
    	   	   if(newIndex == -1){//如果在待播放后半部分未找到能播放的信息，再到前半部分查找
    	   	       for(var i=0; i<index; i++){
    	   	           var item = _IBSMenu.getItem(i);
                       if(item.getEnable()){
                           newIndex = i;
                           break;
                       }    
    	   	       }
    	   	   }
    	   		 _playIndex = newIndex;
    	   	   _ul.marquee("update", _playIndex);
    	   }
    	}});
    	//每隔一分钟更新
    	setInterval(renew, 60000, self);
    	//setTimeout(self.renew, 6000, self);
    };
    
    getParam(_url);
};