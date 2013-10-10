$.fn.routeResult = function() {
   var self=this;
   var element=$(this);
   
	/**
	 * 路段信息数组
	 */
	var resultSegments=[];
	this.setResultSegments = function(value) {
        for(var i=0;i<value.length;i++){
            console.log(value[i]);
             var reult=new ResultSegmt(value[i]);
             resultSegments.push(reult);
        }
        return this;
	};
    /**
     *显示
     */
	this.show = function() {
		for (var i = 0; i < resultSegments.length ; i++) {
           $("<li/>").html(resultSegments[i].getTxt()).data("data",resultSegments[i]).appendTo(element);
		}
	};
    /**
     *显示
     */
    this.clear = function() {
        element.find("li").detach();
        resultSegments=[];
    };
    var _seletedItem=null;
    this.getSelectedItem = function(){
        return _seletedItem;
    };
    
    element.find("li").live("click",function(){
        element.trigger("item:click",$(this).data("data"));
    });
    
    var onItemClickDefaultHandler = function(e,d){
        _seletedItem = $(this);
        console.log("默认处理");
    };
    
    element.bind("item:click",onItemClickDefaultHandler);
    
    element.find("li").live("mouseover",function(){
       $(this).css({"background-color":"yellow",
                    "cursor":"pointer"
       });
    });
    
    element.find("li").live("mouseout",function(){
           $(this).css("background-color","white");
           });
	return this;
};
