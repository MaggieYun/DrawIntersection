//找到canvas容器
var canvas = document.getElementById('map');
//获取绘图上下文
var ctx = canvas.getContext('2d');


//绘制线路
var draw_route = function(){
	//获取起点和终点的索引
	var startid=document.getElementById("startNode").value;   
	var endid=document.getElementById("endNode").value;

	//post交互的url地址
	var url = "../hello";
	//数值类型转化为json字符类型
	var param = {
		startid:JSON.stringify(startid),
		endid:JSON.stringify(endid)		
	};

	$.post(url,param,function(data){
			console.log("get path,start draw path");
			// console.log(data);
			ptscr=JSON.parse(data.points);  //获取点位坐标信息
			segs=JSON.parse(data.segs);     //获取路段信息
			bestpath=JSON.parse(data.bestpath);
			console.log(bestpath);
			// console.log(typeof(ptscr));
			// console.log(ptscr.length);
			m=ptscr.length;
			for(var i=0;i<m;i++){     //绘制点
				ctx.beginPath();
				ctx.arc(ptscr[i][0],ptscr[i][1],1,0,Math.PI*2,true);   //设置节点格式：半径大小
				ctx.fillText(i, ptscr[i][0]+3,ptscr[i][1]+5);   //标注点号（即存储在数组中的索引）
				ctx.stroke();
			};
			n=segs.length;
			// console.log(n);
			for(var j=0;j<n;j++){    //连接线段
				ctx.beginPath();
				ctx.moveTo(segs[j][0][0],segs[j][0][1]);
				ctx.lineTo(segs[j][1][0],segs[j][1][1]);
				ctx.stroke();
			};


			ctx.strokeStyle = "rgb(255,0,0)" ; //设置画笔的颜色为红色
			ctx.beginPath();
			ctx.moveTo(bestpath[0][0],bestpath[0][1]);	
			p=bestpath.length;
			for(var i=0;i<p;i++){
				ctx.lineTo(bestpath[i][0],bestpath[i][1]);	
				ctx.stroke();

			};
	});
};


var route = function(){

};	