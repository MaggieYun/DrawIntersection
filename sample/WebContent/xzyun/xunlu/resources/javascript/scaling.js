//全局变量
var mouseDownX;
var mouseDownY;
var mouseUpX;
var mouseUpY;


function downHandler(e) {
	e = e || window.event;
	mouseDownX = event.screenX;
	mouseDownY = event.screenY;
}

function upHandler(e){
	e = e || window.event;
	mouseUpX=event.screenX;
	mouseUpY=event.screenY;

};

document.onmousedown = downHandler();
document.onmouseup = upHandler();

var scaling=funtion(){
	//post交互的url地址
	var url = "../scale";
	param={X1:mouseDownX,
			Y1:mouseDownY,
			X2:mouseUpX,
			Y2:mouseUpY

			};

	$.post(url,param,function(data){
//			ptscr=JSON.parse(data.points);  //获取点位坐标信息
//			segs=JSON.parse(data.segs);     //获取路段信息
//			m=ptscr.length;
//			for(var i=0;i<m;i++){     //绘制点
//				ctx.beginPath();
//				ctx.arc(ptscr[i][0],ptscr[i][1],1,0,Math.PI*2,true);   //设置节点格式：半径大小
//				ctx.fillText(i, ptscr[i][0]+3,ptscr[i][1]+5);   //标注点号（即存储在数组中的索引）
//				ctx.stroke();
//			};
//			n=segs.length;
//			// console.log(n);
//			for(var j=0;j<n;j++){    //连接线段
//				ctx.beginPath();
//				ctx.moveTo(segs[j][0][0],segs[j][0][1]);
//				ctx.lineTo(segs[j][1][0],segs[j][1][1]);
//				ctx.stroke();
//			};
//			
	});
};

//function mousePosition(ev){
//	if(ev.pageX || ev.pageY){
//		return {x:ev.pageX, y:ev.pageY};
//	}
//	return {
//		x:ev.clientX + document.body.scrollLeft - document.body.clientLeft,
//		y:ev.clientY + document.body.scrollTop - document.body.clientTop
//	};
//}


//function mouseMove(ev){
//	ev = ev || window.event;
//	var mousePos = mousePosition(ev);
//	document.getElementById('div1').value = mousePos.x;
//	document.getElementById('div2').value = mousePos.y;
//}
 
