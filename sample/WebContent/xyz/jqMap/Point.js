	/**
	 * @class 点对象
	 */
var Point = function(x,y) {
	/**
	 * 与point相关联的路段
	 */
	var _attactedSegment=[];
	var _nearPs=[];
	this.setAttactedSegment=function(segment){
		_attactedSegment.push(segment);
		
		var nearP=segment.getOppositeP(this);
		if(nearP && !_nearPs.contains(nearP)){
                _nearPs.push(nearP);
		}	
	};
	
	this.getAttactedSegment=function(){
		return _attactedSegment;
	};
	/**
	 * 节点x坐标
	 */
	var _x;
   
	this.setX = function(value) {
		_x = value;
		return this;
	};

	this.getX = function() {
		return _x;
	};
	 this.setX(x);
	 
	/**
	 * 节点y坐标
	 */
	var _y;

	this.setY = function(value) {
		_y = value;
		return this;
	};

	this.getY = function() {
		return _y;
	};
	this.setY(y);
	
	/**
	 * 节点id
	 */
	var _id = -1;

	this.getId = function() {
		if (_id > -1) {
			return _id;
		}
        if(Point.count===undefined){
            Point.count = 0;
        }else {
            Point.count++;
        }
        _id = Point.count;
        return _id;
       
	};

	/**
	 * 节点g值
	 */
	var _g;
	this.getG = function() {
		if(!_g){
			if(!_parent){
			_g=0;
			return _g;
			}
			_g = _parent.getG() + this.distance(_parent);
		}
		return _g;
	};

	/**
	 * 节点h值
	 */
	var _h;
	this.getH = function() {
		if (!_h) {
			_h = this.distance(Point.endPoint);
		}
		return _h;
	};
	
	/**
	 * 节点f值
	 */
	var _f;

	this.getF = function() {
		if (!_f) {
			_f = this.getG() +this.getH();
		}
		return _f;
	};
	
	/**
	 * 节点父元素
	 */
	var _parent;

	this.setParent = function(parent) {
		_parent = parent;
		_g = _parent.getG() + this.distance(_parent);
        _f=_g+_h;
	};

	this.getParent = function() {
		return _parent;
	};
    this.deleteParent=function(){
        _parent=undefined;
    };
	var _child;
    this.setChild=function(value){
        _child=value;
    };
    this.getChild=function(){
        return _child;
    };
    this.deleteChild=function(){
        _child=undefined;
    };
	/**
	 * 该节点与另一个节点的距离
	 */
	this.distance = function(point) {
      //  if(point instanceof Point){
            var x2 = Math.pow(this.getX() - point.getX(),2);
            var y2 = Math.pow(this.getY() - point.getY(),2);
       // }else{
           // var x2 = Math.pow(this.getX() - point[0],2);
           // var y2 = Math.pow(this.getY() - point[0],2);
       // }
       // console.log("x,y"+x2+","+y2);
        return Math.pow(x2 + y2,.5);
	};
	
	/**
     *判断两个点是否靠近
     *@param {Point} point
     *@param {Number} value 离多远算"靠近",默认为0
     */
    this.closeTo = function(point,value){
        var value = value||0;
        if(this.distance(point) <= value){
            return true;
        }
        return false;
    };
	
	/**
	 * 连通点
	 */
	
	this.get_nearPs=function(){
		return _nearPs;
	};
	/**
	 *是否为同一个点
	*/
	this.equal=function(point){
		if(this.getX()===point.getX() && this.getY()===point.getY()){
			return true;
		}else{
		return false;
		}
	};
	
	/**
*根据两点信息获得路段
*/
	this.getSegement=function(point){
    var segments=this.getAttactedSegment();
    for(var i=0;i<segments.length;i++){
        var tempP=segments[i].getOppositeP(this);
        if(tempP.equal(point)){
            return segments[i];
        }
    }
};
};