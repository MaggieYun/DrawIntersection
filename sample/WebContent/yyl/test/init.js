
$(function(){
	map=new iMap({    
	dom:"flashContent",  
	type:"street" ,
	width:800,  
	height:400,  
	onLoad:onloadHandler	
	});
	
});

var cache; //缓存数据
var CACHE_NAME="mycache";
var composite_symbol;
var line_symbol;
var node_symbol;	
var graphics;

function onloadHandler(m){
	cache = Ao.$("#flash.net.SharedObject").getLocal(CACHE_NAME); //静态方法前用#，封装（不需要实例化）
	
	composite_symbol=AsObject.$("com.esri.ags.symbols.CompositeSymbol");
	line_symbol=AsObject.$("com.esri.ags.symbols.SimpleLineSymbol");
	node_symbol=AsObject.$("com.esri.ags.symbols.SimpleMarkerSymbol");
	line_symbol.attr("style","solid");
	line_symbol.attr("color","0x00ccff");
	line_symbol.attr("alpha",0.5);
	line_symbol.attr("width",2);	
	node_symbol.attr("style","circle");
	node_symbol.attr("color","0x00ccff");
	node_symbol.attr("alpha",0.5);
	node_symbol.attr("size",10);	
	composite_symbol.attr("symbols",[line_symbol,node_symbol]);
	drawlayer=AsObject.$("com.esri.ags.layers.GraphicsLayer");
	drawlayer.attr("symbol",composite_symbol);

	graphics = cache.attr("data.graphics");
	if(graphics){
		drawlayer.attr("graphicProvider",graphics);
	}else{
		alert("没有缓存的数据");
	}

	this.extent([13293520.346386466,3557197.4753160057,13585509.794435698,3740646.34320034]);		
	
	m.addLayer(drawlayer);
	drawtool=AsObject.$("com.esri.ags.tools.DrawTool",{map:m});	
	navitool=AsObject.$("com.esri.ags.tools.NavigationTool");
	navitool.attr("map",m);			
};

function zoomin(){	//放大
	navitool.activate("zoomin");
};

function zoomout(){  //缩小
	navitool.activate("zoomout");
};

function pan(){     //漫游
	navitool.activate("pan");
};

function next(){	//向后
	navitool.zoomToNextExtent();
};

function prev(el){   //向前
	navitool.zoomToPrevExtent();
};

function reset(){     //重置
	map.AS.zoomToInitialExtent();
};

function drawMapPoint(){
	console.log(drawtool);	
	var point_symbol=AsObject.$("com.esri.ags.symbols.SimpleMarkerSymbol");
	point_symbol.attr("style","diamond");
	point_symbol.attr("color","0x00ccff");
	point_symbol.attr("size",12);
	drawtool.attr("markerSymbol",point_symbol);
	drawtool.activate("mappoint");	
	drawtool.addEventListener("drawEnd",drawEnd);
	
};

function doubleLines(){		//设置双向线路
	drawtool.attr("lineSymbol",composite_symbol);
	drawtool.activate("polyline");	
	drawtool.addEventListener("drawEnd",drawEnd);	
};

function singleDirection(){		//设置单行线
	drawtool.attr("lineSymbol",composite_symbol);
	drawtool.activate("polyline");	
	drawtool.addEventListener("drawEnd",drawEnd);
};

var vertexArray=[];
var segmentArray=[];
function getRoadNetwork(){		//获取路网中的点和线段
	var polylineArray;
	if(graphics==null){
		polylineArray=drawlayer.attr("graphicProvider").attr("source");
	}else{
		polylineArray=graphics.attr("source");
	}			
	//console.log("the number of lines:",polylineArray.length);
	for(var i=0;i<polylineArray.length;i++){		
		var polylineGraphic=polylineArray[i];
		var polyline=polylineGraphic.attr("geometry");
		var path=polyline.attr("paths");
		//console.log("number of points of every line:",path[0].length);
		if(i==0){
			for(var j=0;j<path[0].length;j++){
				var vertex=path[0][j];
				//console.log(vertex.attr("x")+","+vertex.attr("y"));
				vertexArray.push(vertex);
				if(j<path[0].length-1){
					var segment=new Array(path[0][j],path[0][j+1]);
					segmentArray.push(segment);
					//console.log(segmentArray);					
				}									
			}
			//console.log(vertexArray);
		}else{
			var segmentPoint=new Array();
			for(var j=0;j<path[0].length;j++){
				var vertex=path[0][j];				
				//console.log(vertex.attr("x")+","+vertex.attr("y"));
				//console.log(vertexArray);
				var judge=getRepeatVertex(vertex,vertexArray);
				if(judge==null){
					vertexArray.push(vertex);
					//console.log(vertex);
					segmentPoint.push(vertex);
				}else{
					//console.log(judge);
					segmentPoint.push(judge);
				}							
			}
			for(var k=0;k<segmentPoint.length-1;k++){
				var segment=new Array(segmentPoint[k],segmentPoint[k+1]);
				segmentArray.push(segment);
				//console.log(segmentArray);
			}
		}			
	}			
	//console.log(vertexArray);
	//console.log(segmentArray);	
	return [vertexArray,segmentArray];
};

function breakLines(){
	var roadNetwork=getRoadNetwork();
	vertexArray=roadNetwork[0];
	segmentArray=roadNetwork[1];
	labelVertex(vertexArray);
}

function bestWay(){	
	//console.log(vertexArray);
	//console.log(segmentArray);
	var startValue=document.getElementById("startNode").value;
	var endValue=document.getElementById("endNode").value;
	var start=vertexArray[startValue-1];	//起点
	var end=vertexArray[endValue-1];	//终点

	var openVertexArray=new Array(start);   //开启列表，将起点放入开启列表中
	var closeArray=[];  //存放所有临近节点的3种值的数组
	var shortestVertexArray=[];  //最短路径节点，父节点
	var processVertexArray=[]; //关闭列表，存放当前节点
	var tmpVertexArray=[];  //存放当前点的临近点		

	console.log(start);
	console.log(end);
	do{	
		var currentNode;  //当前节点
		var parentNode;		//父节点
		var currentValueG;  //当前节点的G值
		var currentValueH;  //当前节点的H值
		var currentValueF;  //当前节点的F值
		var closeValueArray=[];  //存放临近节点G值、H值、F值的数组
		
		if(openVertexArray.length==1 && openVertexArray[0]==start){
			currentNode=start;
			currentValueG=0;
			currentValueH=distance(currentNode,end);
			currentValueF=currentValueG+currentValueH;
		}else{	
			//console.log(closeArray);
			var currentNodeNum=getCurrentNodeNum(openVertexArray,closeArray);
			currentNode=openVertexArray[currentNodeNum];			
			currentValueG=closeArray[currentNodeNum][0];
			currentValueH=closeArray[currentNodeNum][1];
			currentValueF=closeArray[currentNodeNum][2];
			closeArray.splice(currentNodeNum,1);
		}		
		processVertexArray.push(currentNode); //将当前节点存放到关闭列表中
		openVertexArray.splice(currentNodeNum,1); //从开启列表中删除当前节点

		for(var i=0;i<segmentArray.length;i++){     //获取当前节点的临近点数组
			var segment=segmentArray[i];
			for(var j=0;j<segment.length;j++){
				if(currentNode.attr("x")==segment[j].attr("x") && currentNode.attr("y")==segment[j].attr("y")){
					if(j==0){
						tmpVertexArray.push(segment[j+1]);
					}else{
						tmpVertexArray.push(segment[j-1]);
					}
				}			
			}
		}
		for(var i=0;i<tmpVertexArray.length;i++){    //遍历当前节点的临近点数组
			var closeVertex=tmpVertexArray[i];	//临近节点
			var closeValueG;  //临近节点G值
			var closeValueH;  //临近节点H值
			var closeValueF;  //临近节点F值	
			if(isInProcessVertexArray(closeVertex,processVertexArray)){ //如果该临近节点在关闭列表中（或不可通过），则继续下个临近点的判断
				continue;
			}else if(isNotInopenVertexArray(closeVertex,openVertexArray)){ //如果该临近节点不在开启列表中，则将其放入开启列表中，并把当前点设为其父节点，计算G值、H值、F值
				openVertexArray.push(closeVertex);
				parentNode=currentNode;  //将当前节点设置为该临近节点的父节点
				shortestVertexArray.push(parentNode); //存储父节点，形成最短路径
				closeValueG=currentValueG+distance(parentNode,closeVertex);
				closeValueH=distance(closeVertex,end);
				closeValueF=closeValueG+closeValueH;
				closeValueArray.push(closeValueG);
				closeValueArray.push(closeValueH);
				closeValueArray.push(closeValueF);
				closeArray.push(closeValueArray);
				console.log(closeArray);
			}else{ //如果该临近点在开启列表中，需要判断现在的路径是否最好
				closeValueG=currentValueG+distance(currentNode,closeVertex);
				var theValueG=getTheValueG(closeVertex,openVertexArray);
				if(closeValueG<theValueG){    //判断当前点的G值+移动到该临近点的消耗是否小于该临近点的G值
					parentNode=currentNode;
					shortestVertexArray.push(parentNode); //存储父节点，形成最短路径
					closeValueH=distance(closeVertex,end);
					closeValueF=closeValueG+closeValueH;
					closeValueArray.push(closeValueG);
					closeValueArray.push(closeValueH);
					closeValueArray.push(closeValueF);
					closeArray.push(closeValueArray);
				}
			}
		}		

	}while(openVertexArray.length>0 || processVertexArray[processVertexArray.length-1]!=end)
};

function getTheValueG(closeVertex,openVertexArray){
	for(var i=0;i<openVertexArray.length;i++){
		if(closeVertex==openVertexArray[i]){
			var valueG=closeArray[i][0];
			return valueG;
		}
	}
};

function getCurrentNodeNum(openVertexArray,closeArray){	
	var minValueF=closeArray[0][2];	
	for(var i=1;i<openVertexArray.length;i++){
		if(minValueF>closeArray[i][2]){
			minValueF=closeArray[i][2];
			return i;
		}
	}
};


function isInProcessVertexArray(closeVertex,processVertexArray){
	for(var i=0;i<processVertexArray.length;i++){
		if(closeVertex==processVertexArray[i]){
			return true;
		}
	}
	return false;
};

function isNotInopenVertexArray(closeVertex,openVertexArray){
	for(var i=0;i<openVertexArray.length;i++){
		if(closeVertex!=openVertexArray[i]){
			return true;
		}
	}
	return false;
};	



function distance(vertex1,vertex2){
	var x1=vertex1.attr("x");
	var y1=vertex1.attr("y");
	var x2=vertex2.attr("x");
	var y2=vertex2.attr("y");
	var distance=Math.sqrt(Math.pow(x1-x2,2)+Math.pow(y1-y2,2));
	return distance;
};

function labelVertex(vertexArray){		
	for(var i=0;i<vertexArray.length;i++){							
		var text_symbol=AsObject.$("com.esri.ags.symbols.TextSymbol");
		text_symbol.attr("placement","middle");		
		text_symbol.attr("text",i+1);
		var pointGraphic=AsObject.$("com.esri.ags.Graphic");	
		pointGraphic.attr("geometry",vertexArray[i]);			
		pointGraphic.attr("symbol",text_symbol);
		console.log(pointGraphic);			
		drawlayer.add(pointGraphic);		
	}		
};

function getRepeatVertex(vertex,vertexArray){     //任意两个点的距离，如果距离小于阈值，则认为是同一个点	
	var x1=vertex.attr("x");
	var y1=vertex.attr("y");
	//console.log(vertexArray.length);
	var repeatVertex;
	for(var i=0;i<vertexArray.length;i++){
		var x2=vertexArray[i].attr("x");
		var y2=vertexArray[i].attr("y");
		var distance=Math.sqrt(Math.pow(x1-x2,2)+Math.pow(y1-y2,2));
		//console.log(distance);
		if(distance<1){
			repeatVertex=vertexArray[i];
			//console.log(repeatVertex);						
		}
	}
	return repeatVertex;	
};

function drawPolygon(){		
	var outline=AsObject.$("com.esri.ags.symbols.SimpleLineSymbol");	
	outline.attr("style","solid");
	outline.attr("color","0x0000ff");
	var polygon_symbol=AsObject.$("com.esri.ags.symbols.SimpleFillSymbol");	
	polygon_symbol.attr("color","0x00ff00");
	polygon_symbol.attr("style","diagonalcross");		
	polygon_symbol.attr("outline",outline);
	drawtool.attr("fillSymbol",polygon_symbol);	
	drawtool.activate("polygon");
	drawtool.addEventListener("drawEnd",drawEnd);
};

function drawCircle(){	
	var outline=AsObject.$("com.esri.ags.symbols.SimpleLineSymbol");
	outline.attr("style","solid");
	outline.attr("color","0x0000ff");
	var polygon_symbol=AsObject.$("com.esri.ags.symbols.SimpleFillSymbol");
	polygon_symbol.attr("color","0xffccff");
	polygon_symbol.attr("style","forwarddiagonal");
	polygon_symbol.attr("outline",outline);
	drawtool.attr("fillSymbol",polygon_symbol);
	drawtool.activate("circle");
	drawtool.addEventListener("drawEnd",drawEnd);
};

var list = [];
function drawEnd(e){
	//console.log(e.attr("graphic"));
	//var g = e.attr("graphic");
	//var s = g.attr("symbol");
	//console.log(s.attr("style"));
	//drawtool.deactivate();
	var graphic = e.attr("graphic");	
	list.push(graphic);
	drawlayer.add(graphic);
	//graphic.addEventListener("click",onGraphicClickHandler);
	console.log("drawend.缓存数据");
	cache.setProperty("graphics",drawlayer.attr("graphicProvider"));
};

var onGraphicClickHandler = function(event){
	var tool = getEditTool();	
	var sym=AsObject.$("com.esri.ags.symbols.SimpleMarkerSymbol");
	sym.attr("color","0x0000ff");
	sym.attr("size",8);
	tool.attr("vertexSymbol",sym);
	var graphic = event.attr("target");
	console.log(graphic);
	tool.activate(3,[graphic]);
	tool.addEventListener("geometryUpdate",function(event){
		console.log("geometryUpdate");
		});
};

var layerClear = function (){
	drawlayer.clear();
};

var getEditTool = function(){
	if(!arguments.callee.tool){
		var tool = AsObject.$("com.esri.ags.tools.EditTool");
		tool.attr("map",map.AS);		
		// tool.addEventListener("geometryUpdate",function(event){
		// 	console.log("geometryUpdate");
		// });
		arguments.callee.tool = tool;	
	}
	return arguments.callee.tool;
};