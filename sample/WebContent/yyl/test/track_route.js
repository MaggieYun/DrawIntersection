
// var gArray=new Array();  //图形数组
// var drawGraArray=new Array();//绘图数组
// var edgeSymbolFun=new Function();//轨迹段落样式
// var nodeSymbolFun=new Function();//轨迹节点样式
// var graphicLayer=AsObject.$("com.esri.ags.layers.GraphicsLayer"); //轨迹展示图层
// var timeInterval; //轨迹展示的刷新时间间隔，单位毫秒
// var distanceInterval; //轨迹展示的刷新距离间隔，单位米
// var pixelInterval; //轨迹展示的刷新距离间隔，单位像素
// var myInterval; //轨迹计数器id
// var intervalArray=new Array(); //轨迹计数器数组
// var i; //轨迹的索引数；
// var redrawGra=AsObject.$("com.esri.ags.Graphic"); //刻画的轨迹现状图形
// var num; //刻画线段需要的分段段数
// var j; //分段的索引值
// var addX; //每分段的X轴增量
// var addY; //每分段的Y轴增量

// var pointsArray=[];   //存放点位数组
// var point={x:13420826.546979707,y:3671831.1846190235};
// pointsArray.push(point);
// var point={x:13433725.295502812,y:3674219.8417529324};
// pointsArray.push(point);
// var point={x:13431451.476743596,y:3672910.7287957044};
// pointsArray.push(point);
// var point={x:13420826.546979707,y:3671831.1846190235};
// pointsArray.push(point);
// var point_symbol=AsObject.$("com.esri.ags.symbols.SimpleMarkerSymbol",{style:"circle",color:"0x0000ff",size:5});

// var getGraphics=new Function([pointArray]){  //获取点线图形数组
// 	if(pointArray && pointArray.length>1){
// 		gArray=[];
// 		for(var i=0;i<pointArray.length;i++){
// 			var gPoint=pointArray[i];
// 			gArray.push(gPOint);
// 			if(i<pointArray.length-1){
// 				var gnextPoint=pointArray[i+1];

// 			}
// 		}
// 	}
	

// };

function track_route(){
	var pointsArray=[];   //存放点位数组
	var point={x:13420826.546979707,y:3671831.1846190235};
	pointsArray.push(point);
	var point={x:13433725.295502812,y:3674219.8417529324};
	pointsArray.push(point);
	var point={x:13431451.476743596,y:3672910.7287957044};
	pointsArray.push(point);
	var point={x:13420826.546979707,y:3671831.1846190235};
	pointsArray.push(point);
	var point_symbol=AsObject.$("com.esri.ags.symbols.SimpleMarkerSymbol",{style:"circle",color:"0x0000ff",size:5});
	var gPointLayer=AsObject.$("com.esri.ags.layers.GraphicsLayer");
	for(var i=0;i<pointsArray.length;i++){
		var graphic=AsObject.$("com.esri.ags.Graphic",{symbol:point_symbol,geometry:pointsArray[i]});
		gPointLayer.add(graphic);
	}
	map.addLayer(gPointLayer);

}