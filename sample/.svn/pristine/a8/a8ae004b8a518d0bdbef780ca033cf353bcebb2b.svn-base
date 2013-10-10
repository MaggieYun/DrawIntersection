$.fn.routeResult = function() {
	/**
	 * map对象
	 */
	var map;
	/**
	 * 设置地图
	 */
	this.setMap = function(map) {
		map = map;
		return this;
	};
	/**
	 * 路段信息数组
	 */
	var resultSegments;
	this.setResultSegments = function(value) {
		resultSegments = value;
        return this;
	};
	/**
	 * 路段组成点
	 */
	var _points;
	this.getPoints = function() {
		return _points;
	};

	/**
	 * 路段长度
	 */
	var _distance;
	this.getDistance = function() {
		return _distance;
	};
	/**
	 * 路段名称
	 */
	var _name;
	this.getName = function() {
		return _name;
	};
	/**
	 * 转弯点
	 */
	var _turnP;
	this.getTurnP = function() {
		return _turnP;
	};
	/**
	 * 文字描述
	 */
    var _annotation;
    this.getAnnotation=function(){
        return _annotation;
    };
    var _color;
    /**
     *显示
     */
	this.show = function() {
		for (var i = 0; i <= resultSegments.length - 1; i++) {
			$("<li/>").html(resultSegments[i]["txt"]).appendTo($("#result"));
		}
	};
	/**
	 * 当前路段信息
	 */
	var _cursegmt;
	this.setCursegmt = function(segmt) {
		_cursegmt = segmt;//当前路段
		_points = _cursegmt.points;
		_distance = _cursegmt.distance;
		_name = _cursegmt.name;
		_turnP = _cursegmt.turnP;
        _annotation=_cursegmt.txt;
        _color="blue";
        
        // 地图中心移动
        map.centerAt(_turnP);
        // 高亮路段
        // 显示一个信息提示框（地点名称、路段长度。。。放大n倍，缩小至原始大小）
	};
	/**
	 * 鼠标点击时，设置当前路段
	 */
	//$("li").bind("click", {"curSgemt":segmt},setCursegmt);
	/**
	 * 鼠标移到某行文字描述上时，高亮
	 */
	$("li").mouseover(function(){
           $(this).css("background-color","yellow");
           });
    $("li").mouseout(function(){
           $(this).css("background-color","white");
           });
	return this;
};
