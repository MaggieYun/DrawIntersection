var Navigation = function() {
	/**
	 * 获取当前像素坐标
	 */
	var getCoordinate = function(e) {
		var x = e.clientX;
		var y = e.clientY;
		return [x, y];
	};
	/**
	 * 状态数组
	 */
	var viewArr = [];
	/**
	 * 保存显示状态
	 */
	var setViewArr = function(view) {

		viewArr.push(view);
	};
	/**
	 * 获得某一状态数据
	 */
	var getViewFromArr = function(id) {
		return viewArr[id];
	};
	/**
	 * 启用地图平移，默认启用
	 */
	var enableDragging = function() {

	};
	/**
	 * 禁止地图平移
	 */
	var disableDragging = function() {

	};
	/**
	 * canvas鼠标按下
	 */
	var cnvs_mouseDown = function(e) {
		var coordinate = getCoordinate(e);
		if (rect === undefined) {
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
		var temp = convert.covPixelToLaLo(coordinate);
		range.push(temp);
	};
	/**
	 * canvas鼠标移动
	 */
	var cnvs_mouseMove = function(e) {
		var coordinate = getCoordinate(e);
		var temp = convert.covPixelToLaLo(coordinate);
		$("#coordinates").html("x" + temp[0] + "    " + "y" + temp[1]);
		if (rect && start) {
			var top = rect.offset().top;
			var left = rect.offset().left;
			if (top < coordinate[1]) {
				rect.height(coordinate[1] - top - 5).width(coordinate[0] - left
						- 5);
			} else {
				rect.css({
							top : coordinate[1],
							left : coordinate[0]
						}).width(top - coordinate[1]).height(left
						- coordinate[0]);
			}
		}
	};

	/**
	 * canvas鼠标弹起
	 */

	var cnvs_mouseUp = function(e) {

		var coordinate = convert.covPixelToLaLo(getCoordinate(e));
		rect.hide();

		range.push(coordinate);
		range = convert.getBestRange(range);

		var newDraw = new Draw(canvas, range);

		var newPointArr = newDraw.pointsConvert(points);

		var newLines = newDraw.getLinePs(segments);

		newDraw.reDraw(newLines, newPointArr, canvas);

		extent = range;
		scale = 955 / (extent[1][0] - extent[0][0]);
		console.log("extent____" + extent + "scale___" + scale);
		convert = new Convert(extent, scale);

		range = [];
		rect = undefined;
		start = false;
	};
	/**
	 * 设置初始化地图（中心点和比例）
	 */
	var centerAndZoom = function(point, scale) {
        
	};
	/**
	 * 平移地图（改变中心点）（开始加载地图时设置默认地图中心点，平移时根据平移的距离相应改变当前中心点）
	 */
	var pan = function(centerPoint, panPoint) {
		var distance;
		// 计算distance
		if (aa) {
			// panPoint在当前范围的容器1/2边缘范围之内
			// 中心点不变
		} else {
			// 移动中心点
		}
	};
	/**
	 * 放大某比例视图(不可拖拽时)
	 */
	var zoomIn = function() {

	};
	/**
	 * 缩小某比例级视图（不可拖拽时）
	 */
	var zoomOut = function() {

	};
	/**
	 * 返回前一视图
     * return view 返回状态数据
	 */
	var preView = function() {
        return view;
	};
	/**
	 * 前进到后一视图
     * return view 返回状态数据
	 */
	var nextView = function() {
        return view;
	};
	/**
	 * 重置地图(恢复初始化状态)
	 */
	var reSet = function() {

	};
};
