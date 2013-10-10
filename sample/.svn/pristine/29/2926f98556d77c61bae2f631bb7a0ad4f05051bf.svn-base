var NetWork = function(roads) {

	var _roads = roads;
	/**
	 * 路网节点
	 */
	var _points = [];
	this.getPoints = function() {
		return _points;
	};
	/**
	 * 将point添加至路网节点中
	 */
	var addToPoints = function(point) {
		if (_points.length == 0) {
            var id=point.getId();
            //console.log("第一个点的id"+id);
			_points.push(point);
		}
		for ( var i = 0; i < _points.length; i++) {
			var exist = checkIfPointExist(point);
			if (exist) {
				return exist;
			}
		}
         point.getId();
		_points.push(point);
		return point;
	};
	/**
	 * 检查点是否已经存在于_points..
	 * 这里我们根据位置判断如果两个点靠近距离小于5米,则认为是同一个点
	 * @param point
	 * @returns
	 */
    var checkIfPointExist = function(point){
        var length = _points.length;
        for(var i = 0; i < length; i++){
            if(_points[i].closeTo(point,5)){
                return _points[i];
            }
        }
        return false;
    };
	/**
	 * 路段
	 */
	var _segments = [];
	this.getSegments = function() {
		return _segments;
	};
	var addToSegment = function(segment) {
		_segments.push(segment);
		return _segments;
	};

	/**
	 * 从roads中解析出points和segments
	 * 
	 */
	var parse = function() {
		var _roadsSize = _roads.length;
		for ( var i = 0; i < _roadsSize; i++) {
			var road = _roads[i];

			// 属性信息
			var attribute = road.A || "";
			var roadName = attribute.name || "";
			var roadSingle = attribute.single;

			// 几何对象
			var gemo = road.G;
			var polylines = gemo.polyline;
			var polylines_size = polylines.length;

			// 存储_segments.point信息
			for ( var j = 0; j < polylines_size; j++) {
				var polyline = polylines[j];
				var pointsNum = polyline.length;

				for ( var k = 0; k < pointsNum - 1; k++) {
					
					//point
					var startP=new Point(polyline[k][0],polyline[k][1]);
					var endP=new Point(polyline[k+1][0],polyline[k+1][1]);
					
					// 如果不存在添加至Points数组
					startP=addToPoints(startP);
					endP=addToPoints(endP);
					
					// segments
					var segment = new Segment(startP,endP,roadName,roadSingle);
					addToSegment(segment);

					//创建point的相联segment
					startP.setAttactedSegment(segment);
					endP.setAttactedSegment(segment);
				}
			}
		}
	};

	/**
	 * 构建
	 */
	this.build = function() {
		_points = [];
		_segments = [];
		Point.count=-1;
		parse();
	};

	
};
