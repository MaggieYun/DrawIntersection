function init() {
	var map = new BMap.Map("bmap"); // 创建Map实例
	var point = new BMap.Point(116.404, 39.915); // 创建点坐标
	map.centerAndZoom(point, 15);
};
