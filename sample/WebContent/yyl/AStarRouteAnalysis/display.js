
var xmin=13426192.883026948;
var ymin=3671416.5248470777;
var xmax=13430755.218152719;
var ymax=3674282.9134077714;
var scaleX=955/(xmax-xmin);
var scaleY=600/(ymax-ymin);
//找到canvas容器
var canvas = document.getElementById('map');
//获取绘图上下文
var ctx = canvas.getContext('2d');
/*
* 将地理坐标转换为屏幕坐标
*@roads 道路数组
*return 道路的屏幕坐标
*/

/*
var coordinateConvert=function(roads){
	var _roads=roads;
	var _roadsCount=_roads.length;
	for(var i=0;i<_roadsCount;i++){
		var polylines=_roads[i].G.polyline;
		//var polylineCount=polylines.length;
		for(var j=0;j<polylines.length;j++){
			var polyline=polylines[j];
			//var pointCount=polyline.length;
			for(var k=0;k<polyline.length;k++){
				polyline[k][0]=(polyline[k][0]-xmin)*scaleX;
				polyline[k][1]=(polyline[k][1]-ymin)*scaleY;
			}
		}
	}
	return _roads;
};
*/



var coordinateConvertPoints=function(points){		
	var _points=points;	
	for(var i=0;i<_points.length;i++){
	    var point=_points[i];
	    point.setId(i);
		//console.log(point.getX());
		//var valueX=(point.getX()-xmin)*scaleX;
		//var valueY=(point.getY()-ymin)*scaleY;
		//point.setX(valueX);
		//point.setY(valueY);
		//console.log(i);		
		//console.log(point.getX());
	}
	
	return _points;
};

/*
* 地理坐标转换为屏幕坐标
*/
var coordinateConvertSegments=function(segments){
	var _segments=segments;
	for(var i=0;i<_segments.length;i++){
		var segment=_segments[i];
		var startPoint=segment.getStart();
		var endPoint=segment.getEnd();
		
		var startX;
		var startY;
		var endX;
		var endY;
		
		if(startPoint.getX()<=955 && startPoint.getY()<=600 && endPoint.getX()>955 && endPoint.getY()>600){
			endX=(endPoint.getX()-xmin)*scaleX;
			endY=(ymax-endPoint.getY())*scaleY;
			endPoint.setX(endX);
			endPoint.setY(endY);
		}else if(endPoint.getX()<=955 && endPoint.getY()<=600 && startPoint.getX()>955 && startPoint.getY()>600){
			startX=(startPoint.getX()-xmin)*scaleX;
			startY=(ymax-startPoint.getY())*scaleY;
			startPoint.setX(startX);
			startPoint.setY(startY);
		}else if(startPoint.getX()>955 && startPoint.getY()>600 && endPoint.getX()>955 && endPoint.getY()>600){
			startX=(startPoint.getX()-xmin)*scaleX;
			startY=(ymax-startPoint.getY())*scaleY;
			startPoint.setX(startX);
			startPoint.setY(startY);
			endX=(endPoint.getX()-xmin)*scaleX;
			endY=(ymax-endPoint.getY())*scaleY;
			endPoint.setX(endX);
			endPoint.setY(endY);
		}else{
			segment=segment;
		}
		//console.log(i);
		//console.log(segment.getStart().getX());
	}	
	return _segments;
};

/*
* 绘制节点
*/
var drawPoint=function(point){
	ctx.beginPath();
	ctx.arc(point.getX(),point.getY(),1,0,2*Math.PI);
	ctx.stroke();
};

/*
* 绘制路段
*/
var drawSegment=function(segment){
	var start=segment.getStart();
	var end=segment.getEnd();
	ctx.beginPath();
	ctx.moveTo(start.getX(),start.getY());
	ctx.lineTo(end.getX(),end.getY());
	//console.log(segment.getAttributes().single);
	if(segment.getAttributes().single==true){
		ctx.strokeStyle="#FF0000";
	}else{
		ctx.strokeStyle="#000000";
	}	
	ctx.stroke();
};

/*
* 显示节点编号
*/
var labelPoint=function(point){
	var id=point.getId();
	ctx.font="10px Arial";
	ctx.fillText(id,point.getX(),point.getY());
};

/*
* 展示路段
*/
var displayRoads=function(){
	//var screenSegments=coordinateConvertSegments(segments);
	//var screenPoints=coordinateConvertPoints(points);
	
	for(var i=0;i<screenSegments.length;i++){
		var segment=screenSegments[i];
		drawSegment(segment);
	}
	for(var i=0;i<screenPoints.length;i++){
		var point=screenPoints[i];
	 	drawPoint(point);
	 	labelPoint(point);
	}
		
};

/*
* 展示最短路径
*/
var displayBestRoute=function(){
	var route=getRoute();
	for(var i=0;i<route.length-1;i++){
		ctx.beginPath();
		ctx.moveTo(route[i].getX(),route[i].getY());
		ctx.lineTo(route[i+1].getX(),route[i+1].getY());
		ctx.strokeStyle="#00ffcc";
		ctx.stroke();
	}
};

/*
* 刷新
*/
var refresh=function(){
	ctx.clearRect(0, 0, canvas.width, canvas.height); //清除矩形，用此矩形消除canvas中的内容	
	displayRoads();	
	document.getElementById("startNode").value="";
	document.getElementById("endNode").value="";	
};

/*
var displayRoads=function(){
	var screenPoints=coordinateConvert(points);
	for(var i=0;i<screenPoints.length;i++){
		var point=screenPoints[i];
		drawPoint(point);
	}		
};
*/


/*
var drawPolyline=function(polylines){
	for(var i=0;i<polylines.length;i++){
		var polyline=polylines[i];
		ctx.beginPath();
		var j=0;
		while(j<polyline.length){
			ctx.moveTo(polyline[j][0],polyline[j][1]);
			ctx.lineTo(polyline[j+1][0],polyline[j+1][1]);
			ctx.stroke();
			j++;			
		}		
	}
};
*/


/*
var displayRoads=function(){
	var screenRoads=coordinateConvert(roads);
	for(var i=0;i<screenRoads.length;i++){
		var polylines=screenRoads[i].G.polyline;
		drawPolyline(polylines);
		for(var j=0;j<polylines.length;j++){
			var polyline=polylines[j];
			for(var k=0;k<polyline.length;k++){
				var point=polyline[k];
				drawPoint(point);
			}
		}
	}	
};
*/