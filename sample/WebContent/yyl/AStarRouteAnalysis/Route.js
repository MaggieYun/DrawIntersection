/*
* @class 节点
*/
var Point=function(x,y){
	var _x=x;
	var _y=y;

	/*
	* 设置节点的X坐标
	*/
	this.setX=function(valueX){
		_x=valueX;
	};
	/*
	* 获取节点的X坐标
	*/
	this.getX=function(){
		return _x;
	};
	/*
	* 设置节点的Y坐标
	*/
	this.setY=function(valueY){
		_y=valueY;
	};
	/*
	* 获取节点的Y坐标
	*/
	this.getY=function(){
		return _y;
	};
	
	var _id;
	/*
	* 设置节点的唯一编号
	*/
	this.setId=function(value){
		_id=value;
	};
	/*
	* 获取节点的唯一编号
	*/
	this.getId=function(){
		return _id;
	};	

	var _g=0; //节点的G值	
		
	/*
	* 获取节点的G值
	*/
	this.getG=function(){		
		return _g;
	};	

	var _h; //节点的H值
	/*
	* 设置节点的H值
	*/
	this.setH=function(end){
		_h=this.distance(end);
	};
	/*
	* 获取节点的H值
	*/
	this.getH=function(){		
		return _h;
	};

	var _f; //节点的F值
	/*
	* 设置节点的F值
	*/
	this.setF=function(_g,_h){
		_f = _g + _h;
	};
	/*
	* 获取节点的F值
	*/
	this.getF=function(){		
		return _f;
	};

	var _parent; //父节点
	/*
	* 设置节点的父节点
	*/
	this.setParent=function(current){
		_parent=current;
		if(_parent!=null){
			_g=_parent.getG()+this.distance(_parent);
		}else{
			_g=0;
		}				
		return _g;		
	};
	
	//返回父节点	
	this.getParent=function(){
		return _parent;
	};

	/*
	* 获取该节点与另一个节点之间的距离
	* @point 另一个节点
	* @return 距离
	*/
	this.distance=function(point){
		var x1=this.getX();
		var y1=this.getY();
		var x2=point.getX();
		var y2=point.getY();
		var distance=Math.sqrt(Math.pow(x1-x2,2)+Math.pow(y1-y2,2));
		return distance;
	};

	/*
	* 判断与另一个节点的距离是否小于阈值，小于的话则认为是同一节点，否则不是
	* @point 另一个节点
	* @value 阈值，默认为0
	* @return 返回逻辑值
	*/
	this.closeTo=function(point,value){
		var value=value||0;
		if(this.distance(point)<=value){
			return true;
		}
		return false;
	};

	/*
    * 判断两个节点是否相等
    * @return 返回逻辑值
    */
	this.equalTo=function(point){
		if(point.getX()===this.getX() && point.getY()===this.getY()){
			return true;
		}
		return false;
	};

	/*
	* 获取包含该节点的线段
	*/
	var _segments=[];
	this.addSegment=function(segment){
		_segments.push(segment);
		return _segments;
	};

	/*
	* 获取该节点的临近节点数组
	* @return 临近节点数组
	*/	
	var _points=[];
	this.getNeighbour=function(){				
		for(var i=0;i<_segments.length;i++){
			var segment=_segments[i];
			var point=segment.getOppositePoint(this);
			_points.push(point);			
		}
		return _points;
	};

};


/*
* @class 路段（只包含两个节点的路段）
*/
var Segment=function(start,end){
	var _start=start; //路段的起点
	var _end=end;	//路段的终点
	var _attributes; //路段的属性

	/*
	* 获取路段的起点
	*/
	this.getStart=function(){
		return _start;
	};
	/*
	* 获取路段的终点
	*/
	this.getEnd=function(){
		return _end;
	};
	/*
	* 获取路段的属性
	*/
	this.getAttributes=function(){
		return _attributes;
	};
	/*
	* 设置路段的属性
	*/
	this.setAttributes=function(attributes){
		_attributes=attributes;
		return this;
	};

	/*
	* 已知路段的一个端点，获取另一个端点
	* @return 另一个端点
	*/
	this.getOppositePoint=function(point){
		if(point.equalTo(this.getStart())){
			return this.getEnd();
		}else if(point.equalTo(this.getEnd())){
			return this.getStart();
		}
	};

};


var NetWork=function(roads){	
    var _roads=roads;  //roads为原始网格数据
    var _points=[];
    var _segments=[];

    this.getPoints=function(){
    	return _points;
    };

    this.getSegments=function(){
    	return _segments;
    };

    //检查点是否已经存在于_points
    //这里我们根据位置判断如果两个点靠近距离小于5米,则认为是同一个点
    var checkIfPointExist = function(point){
        var length = _points.length;
        for(var i = 0; i < length; i++){
            if(_points[i].closeTo(point,5)){
                return _points[i];
            }
        }
        return false;
    };

    /*
    * 判断点是否在_points中，不在则添加进去
    */
    var addToPoints=function(point){    	
    	if(_points.length==0){
    		_points.push(point);     		  		
    		return point;
    	}
    	for(var i=0;i<_points.length;i++){
    		var exist=checkIfPointExist(point);
    		if(!exist){
    			_points.push(point);    			
    			return point; 
    		}else{
    			return exist;
    		}
    	}
    };

    var addToSegments=function(segment){
    	_segments.push(segment);
    };

    /*
    * 从路网中获取所有的节点和路段
    */
    var extract=function(){
    	//console.log(_roads[0].G.polyline);    	
    	for(var i=0;i<_roads.length;i++){
    		var road=_roads[i];
    		var paths=road.G.polyline;     		   		
    		var attributes=road.A;
    		//console.log("number of roads:"+_roads.length);
    		//console.log(paths);
    		//console.log(attributes);
    		//console.log(paths.length);
    		//console.log(i);    		
    		for(var j=0;j<paths.length;j++){
    			var path=paths[j];    			
    			for(var k=0;k<path.length-1;k++){    				 
    				//获取路径上相邻两个节点
    				var first=path[k];
    				var second=path[k+1];

    				//创建两个节点对象
    				var firstPoint=new Point(first[0],first[1]);    				
    				var secondPoint=new Point(second[0],second[1]);    				
    				
    				firstPoint=addToPoints(firstPoint);    				
    				secondPoint=addToPoints(secondPoint);

    				//创建路段对象，并添加到_segments中
    				var segment=new Segment(firstPoint,secondPoint);
    				segment.setAttributes(attributes); //设置路段的属性，与整条道路的属性相同
    				addToSegments(segment);

    				// 获取某个节点的相邻线段，考虑到单行线
    				if(segment.getAttributes().single==true){
    					firstPoint.addSegment(segment);
    				}else{
    					firstPoint.addSegment(segment);
    					secondPoint.addSegment(segment);
    				}     				
    			}    			
    		}
    	}
    };

    this.build=function(){
    	extract();
    };
};

