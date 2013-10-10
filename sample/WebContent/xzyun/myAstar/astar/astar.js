
// $(function(){
// 	var url = "../hello";

// 	$("#btnAjax").click(function(){
// 		$.post(url,{name:"zxy"},function(data){
// 			console.log(data);
// 		})
// 	});

// });

//找到canvas容器
var canvas = document.getElementById('map');
//获取绘图上下文
var ctx = canvas.getContext('2d');

//随机生成一个canvas范围内的像素坐标位置
var simulateData = function(){
	var x = Math.round(Math.random()*(canvas.width-10));
	var y = Math.round(Math.random()*(canvas.height-10));
	return [x,y];
};

//随机产生20条线段，作为不连通的路径(8条路径不一定全属于已有路径)
var simulatePath=function(size){  
	var unlines=[];
	for (var i=1;i<=20;i++){
		var x=Math.ceil(Math.random()*size);
		var y=Math.ceil(Math.random()*size);
		unlines.push([x,y]);
	}	
	return unlines;
};

//判断二维数组是否包含某元素
Array.prototype.in_array = function(e){  
    for(var i=0;i<this.length;i++){  
    	if(this[i][0] == e[0] && this[i][1] == e[1])  
    	return true;  
    }  
    	return false;  
};  

//用于存储模拟网格节点
var points = [];
var lines=[];

//创建模拟网格节点
var gen_grid = function(size){
	ctx.clearRect(0,0,550,250);  //清空canvas
	points=[];                   //清空二维数组
	for (var i = size;  i > 0; i--) {  //生成随机点，并绘制点
		var pos =simulateData();
		pos.push(size-i+1);             //加入点号信息
		ctx.beginPath();
		ctx.arc(pos[0],pos[1],5,0,Math.PI*2,true); 
		ctx.fillText(size-i+1, pos[0]+5,pos[1]+10);
		points.push(pos);
		//console.log(points);
		ctx.stroke();
	}	
	console.log(points);

	var unln=simulatePath(size);
	// console.log(unln);
	for (var i = 0; i <=size-1; i++){  //连接点生成路径
		for (var j=i+1;j<=size-1;j++){
			var xdiff = points[i][0]- points[j][0];
			var ydiff = points[i][1]- points[j][1];
			length=Math.round(Math.pow((xdiff * xdiff + ydiff * ydiff), 0.5));
			//将不连通路径的connect属性设置为false
			connect=false;
			var ln=[];
			if(unln.in_array([i+1,j+1])){
				connect=false;
				ln=[i+1,j+1,false,length];
			}else{
				connect=true;
				ln=[i+1,j+1,true,length];
				ctx.beginPath();
				ctx.moveTo(points[i][0],points[i][1]);	
				ctx.lineTo(points[j][0],points[j][1]);	
				ctx.stroke();

			}
			// console.log(connect);
			lines.push(ln);	
		}	
	}
	console.log(lines);

	//post交互的url地址
	var url = "../hello";

	//参数
	var param = {
		points:JSON.stringify(points),
		lines:JSON.stringify(lines)
	};

	$.post(url,param,function(data){
			console.log("get path,start draw path");
			console.log(data);

			var path=data.split(",");
			n=path.length;
			var ids=[];
			for(i=0;i<n;i++){
				ids.push(parseInt(path[i]));
			}
			console.log(ids);
			
			// ctx.clearRect(0,0,550,250);
			// canvas.pen.color:=rgb(255,0,0)";// 设置画笔颜色 
			ctx.strokeStyle = "rgb(255,0,0)" ; //设置画笔的颜色为红色
			ctx.beginPath();
			var first=ids[0]-1;
			ctx.moveTo(points[first][0],points[first][1]);	
			for(i=0;i<n;i++){
				ctx.lineTo(points[(ids[i]-1)][0],points[(ids[i]-1)][1]);	
				ctx.stroke();

			};
	});
};

//连接points中的点
var connect = function(){
	
};

//寻路
var route = function(){
	var start=document.getElementById("startNode").valueOf();
	var end=document.getElementById("endNode").valueOf();
	console.log(start);
	console.log(end);

};