var Convert = function(extent, scale) {
	var scale = scale;
	var xmin = extent[0];
	var ymax = extent[3];
	/**
	 * 将像素坐标转变为地理坐标
	 * @param point 被转换的点
     * return 返回点的x，y坐标
	 */

	this.covPixelToLaLo = function(point) {
		var x = point[0];
		var y = point[1];
		var _x = (x / scale) + xmin;
		var _y = ymax - (y / scale);
		return [_x, _y];
	};
    
     /**
     * 将地理坐标转变为像素坐标
     * @param point 被转换的点
     * return 返回有效范围
     */
	this.covLaLatoPixel = function(point) {
		var x = point.getX();
		var y = point.getY();
		var id = point.getId();
		var _x = Math.round((x - xmin) * scale);
		var _y = Math.round((ymax - y) * scale);
		return [_x, _y, id];
	};
    
   /**
     * 获得有效范围
     * @param range 框选范围
     * return 返回点的x，y坐标和id
     */
	this.getBestRange = function(range) {
		var _range = [];
		var x_range = range[1][0] - range[0][0];
		var y_range = range[1][1] - range[0][1];

		var x_extent = extent[1][0] - extent[0][0];
		var y_extent = extent[1][1] - extent[0][1];

		var x_center = 0.5 * (range[1][0] + range[0][0]);
		var y_center = 0.5 * (range[1][1] + range[0][1]);

		if (x_range / y_range > x_extent / y_extent) {
			_range[0] = [x_center - 0.5 * x_extent / y_extent * y_range,
					y_center - 0.5 * y_range];
			_range[1] = [x_center + 0.5 * x_extent / y_extent * y_range,
					y_center + 0.5 * y_range];
		} else {
			_range[0] = [x_center - 0.5 * x_range,
					y_center - 0.5 * y_extent / x_extent * x_range];
			_range[1] = [x_center + 0.5 * x_range,
					y_center + 0.5 * y_extent / x_extent * x_range];
		}
		return _range;
	};
/**
 * 转换点数组
 */    
    this.pointsConvert = function(points) { 
        var newPs = [];
        for ( var i = 0; i < points.length; i++) {
            newPs[i] = this.covLaLatoPixel(points[i]);
        }
        return newPs;
    };
};