var draw_bestpath = function(){
	//获取起点和终点的索引
	var start=document.getElementById("startNode").value;   
	var end=document.getElementById("endNode").value;
	//post交互的url地址
	// var url = "../bestpath";
	$("#basemap").attr("src","../bestpath?startid="+start+"&endid="+end);

};	


var redraw = function(){
	//获取起点和终点的索引
	var startid=document.getElementById("startNode").value="";   
	var endid=document.getElementById("endNode").value="";
	$("#basemap").attr("src","../road");


};


var get_coords=function(event){
	var x=event.clientX;
	var y=event.clientY;
	return [x,y];
};


var rect;

var mouseDown=function(event){
	var coord = get_coords(event);
	console.log(coord[0],coord[1]);
	if(!rect){   //jquery用法，尚不熟悉。
		rect =  $("<div>").css({position:"absolute",border:"solid red 1px"}).appendTo($(".map"));
	}
	rect.css({top:coord[1],left:coord[0]}).width(0).height(0).attr("downX",coord[0]).attr("downY",coord[1]).show();
};



var mouseMove=function(event){
	if(rect){
		newcoord=get_coords(event);
		var wh=Math.abs(rect.attr("downX")-newcoord[0]);
		var ht=Math.abs(rect.attr("downY")-newcoord[1]);
		
		if((newcoord[0]<rect.attr("downX")) || (newcoord[1]<rect.attr("downY"))){
			rect.css({top:newcoord[1],left:newcoord[0]}).width(wh).height(ht);
		}else{
			rect.width(wh).height(ht);
		}
	}
};


var mouseUp=function(event){
	if(rect){
		lastcoord=get_coords(event);
		console.log(lastcoord[0],lastcoord[1]);
		
		centerX=parseInt((parseInt(lastcoord[0]) + parseInt(rect.attr("downX")))/2);
		centerY=parseInt((parseInt(lastcoord[1]) + parseInt(rect.attr("downY")))/2);
		lengthX=Math.abs(parseInt(lastcoord[0]) - parseInt(rect.attr("downX")));
		lengthY=Math.abs(parseInt(lastcoord[1]) - parseInt(rect.attr("downY")));
		rect.attr("centerX",centerX).attr("centerY",centerY).attr("lengthX",lengthX).attr("lengthY",lengthY);
		console.log(centerX,centerY,lengthX,lengthY);
		
		
		// rect.attr("upX",lastcoord[0]).attr("upY",lastcoord[1]);
		// console.log(rect.attr("upX"),rect.attr("upY"));
		rect.hide();
	}
	$("#basemap").attr("src","../newmap?centerX="+rect.attr("centerX")+
											"&centerY="+rect.attr("centerY")+
											"&lengthX="+rect.attr("lengthX")+
											"&lengthY="+rect.attr("lengthY"));
	
};

//JQuery监听事件格式
// $(function(){
// 	$("#btngetpath").bind("click",draw_bestpath);

// });