
/**
 * 
 * @param p1 起点
 * @param p2 终点
 * @returns
 */
var Segment=function(p1,p2,name,single){
	/**
	 * 路名
	 */
	var _name;
	this.setName=function(value){
		_name=value||"";
	};
	this.getName=function(){
		return _name;
	};
	/**
	 * 起点 equal
	 */
	var _startP;
	this.setStartP=function(value){
		_startP=value;
	};
	this.getStartP=function(){
		return _startP;
	};

	/**
	 * 终点
	 */
	var _endP;
    this.setEndP=function(value){
    	_endP=value;
	};
	this.getEndP=function(){
		return _endP;
	};	
	
	/**
	 * 长度
	 */
	var _length;
    var getLength=function(){
    	_length=_startP.distance(_endP);
		return _length;
    };
    /**
	 * 通达性
	 */
    var _isSingle;
    this.setIsSingle=function(value){
    	_isSingle=value;
    };
    this.getIsSingle=function(value){
    	return _isSingle;
    };
    
    /**
     * 获取路段另一个点
     */
   this.getOppositeP=function(point){
        var _point=point;
    	if(_startP.equal(_point)){
    		return this.getEndP();
    	}else if(_endP.equal(_point)){
    		if(this.getIsSingle()==false){
    			return this.getStartP();
    		}	
    	}
    };
	
	this.setStartP(p1);
	this.setEndP(p2);
	this.setName(name);
	this.setIsSingle(single);
	//this.getLength();
};