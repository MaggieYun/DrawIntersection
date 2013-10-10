var Navigation = function(canvas,points,segments) {
    /**
     * 创建的div
     */
	var rect;
    /**
     * 拉框的范围
     */
	var range=[];
    var convert=new Convert(extent,scale);
    var start;
    /**
     * 获取坐标
     */
	var getCoordinate = function(e) {
		var x = e.clientX;
		var y = e.clientY;
		return [x, y];
	};
	/**
	 * canvas°鼠标按下
	 */
	this.cnvs_mouseDown = function(e) {
		var coordinate = getCoordinate(e);
		if (rect===undefined) {
			rect = $("<div/>").css({
						"position" : "absolute",
						"border" : "solid red 1px"
					}).appendTo($("body"));
		}
		rect.css({
					top : coordinate[1],
					left : coordinate[0]
				}).width(1).height(1).show();
 
		start = true;
        var temp=convert.covPixelToLaLo(coordinate);
		range.push(temp);
	};
	/**
	 * canvas鼠标移动
	 */
	this.cnvs_mouseMove = function(e) {
		var coordinate = getCoordinate(e);
        var temp=convert.covPixelToLaLo(coordinate);
        $("#coordinates").html("x"+temp[0]+"    "+"y"+temp[1]);
		if (rect && start) {
			var top = rect.offset().top;
			var left = rect.offset().left;
			if (top < coordinate[1]) {
				rect.height(coordinate[1] - top -5).width(coordinate[0]
						- left - 5);
			}else{
             console.log("ww");
            }
		}
	};
    
	/**
	 * canvas鼠标弹起
	 */
	this.cnvs_mouseUp = function(e) {
		var coordinate = convert.covPixelToLaLo(getCoordinate(e));
        rect.hide();
         
		range.push(coordinate);
        range=convert.getBestRange(range);
        
		var newDraw = new Draw(canvas,range);

		var newPointArr = newDraw.pointsConvert(points);

		var newLines = newDraw.getLinePs(segments);

		newDraw.reDraw(newLines, newPointArr, canvas);
        
        
        extent=range;
        scale=955 / (extent[1][0] - extent[0][0]);
        console.log("extent____"+extent+"scale___"+scale);
        convert=new Convert(extent,scale);
        
        range=[];
        rect=undefined;
        start = false;
	};
    
    

};
