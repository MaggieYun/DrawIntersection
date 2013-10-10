var Draw = function(canvas,extent,color) {
	var xmin = extent[0]||13426192.883026948;
	var ymin = extent[1]||3671416.5248470777;
	var xmax = extent[2]||13430755.218152719;
	var ymax = extent[3]||3674282.9134077714;
	var scale = canvas.canvas.width / (xmax - xmin);
    var color=color|| "balck";
	/**
	 * 实现canvas的绘制起点
	 * @param point  点
	 * @param canvas 画布对象
	 * @returns
	 */
	var canvasMoveTo = function(point, canvas) {
		var x = point[0];
		var y = point[1];
		canvas.moveTo(x, y);
	};
	
	/**
	 * 实现canvas的绘制终点
	 * @param point 点
	 * @param canvas 画布对象
	 * @returns
	 */
	var canvasLineTo = function(point, canvas) {
		var x = point[0];
		var y = point[1];
		canvas.lineTo(x, y);
	};
	
	/**
	 * 实现canvas的绘线
	 * @param point 点
	 * @param canvas 画布对象
	 * @param r 半径
	 * @returns
	 */
	var canvasDrawLine = function(point1, point2, canvas) {
		canvas.beginPath();
		canvasMoveTo(point1, canvas);
		canvasLineTo(point2, canvas);
		canvas.stroke();
	};
	/**
	 * 实现canvas的绘点
	 * @param point 点
	 * @param canvas 画布对象
	 * @returns
	 */
	this.drawPoint = function(point,canvas,color) {
		var x=point[0];
		var y=point[1];
		canvas.fillStyle=color;
		canvas.beginPath();
		canvas.arc(x,y,5,0,Math.PI*2,true);
		canvas.closePath();
		canvas.fill();
	};
	/**
	 * 转换点坐标
	 * @param points
	 * @returns 返回点坐标数组[x,y]
	 */
	this.pointsConvert = function(points) {	
		var convert=new Convert(extent,scale);
		console.log("地理范围"+xmin+"---"+ymin+"---"+xmax+"---"+ymax);
		console.log("比例尺"+1/scale);
		var newPs = [];
		for ( var i = 0; i < points.length; i++) {
			newPs[i] = convert.covLaLatoPixel(points[i]);
		}
		return newPs;
	};
	/**
	 * 路段起始端的像素坐标
	 */
		this.getLinePs=function(points){
	        var convert=new Convert(extent,scale);
	        var LinePs=[];
	        for ( var i = 0; i < segments.length; i++) {
	            var startP = convert.covLaLatoPixel(segments[i].getStartP());
	            var endP = convert.covLaLatoPixel(segments[i].getEndP());
	            var linep=[startP,endP];
	            LinePs.push(linep);
	        }
	        return LinePs;
	    };

	/**
	 * 以路段为基础数据绘路
	 * @param segments 路段
	 * @param canvas 画布
	 */
	this.drawLine = function(lines, canvas) {
		canvas.strokeStyle = "black";
		canvas.lineWidth=1;
		for(var i=0;i<lines.length;i++){
			canvasDrawLine(lines[i][0], lines[i][1], canvas);
			canvas.stroke();
		}
	};	
	
	/**
	 * 以连续点为为基础数据绘路
	 * @param pointsArr 路段
	 * @param canvas 画布
	 */
	this.drawPolyline = function(pointsArr, canvas) {
		var convert=new Convert(extent,scale);
		canvas.strokeStyle = "red";
		canvas.beginPath();
		var p0 = convert.covLaLatoPixel(pointsArr[0]);
		canvasMoveTo(p0, canvas);
		for ( var i = 1; i < pointsArr.length; i++) {
			canvas.lineWidth=3;
			var pi = convert.covLaLatoPixel(pointsArr[i]);
			canvasLineTo(pi, canvas);
		}
		canvas.stroke();
	};

	/**
	 * 添加序列号
	 * @param points 点数据
	 * @param canvas 画布
	 */
	this.drawtxt = function(points, canvas) {
		canvas.fillStyle="black";
		for ( var i = 0; i < points.length; i++) {
			var x = points[i][0];
			var y = points[i][1];
			var id = points[i][2];
			// canvas.arc(x,y,5,0,Math.PI*2,true);
			canvas.fillText(id, x + 5, y + 5);
		}
	};
	
	/**
	 * 添加序列号
	 * @param points 点数据
	 * @param canvas 画布
	 */
	this.reDraw=function(lines,points,ctx){
		ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
		this.drawLine(lines, ctx);
		this.drawtxt(points, ctx);
	};
};
