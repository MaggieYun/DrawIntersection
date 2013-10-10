var RouteEngine = function(netWork) {
	/**
	 * 从netWork中提取的点数据
	 */
	var _points = netWork.getPoints();

	/**
	 * 起点
	 */
	var _startP;
	/**
	 * 获取起点
     * @param
     * return 起点
	 */
	this.findStartP = function(val) {
		_startP = _points[val];
		return _startP;
	};

	/**
	 * 终点
	 */
	var _endP;
	 /**
     * 获取终点
     * @param
     * return 终点
     */
	this.findEndP = function(val) {
		_endP = _points[val];
		Point.endPoint = _endP;
		return _endP;
	};
    
	/**
	 * 开启列表
	 */
	var openList = [];
	/**
	 * 将点添加至开启列表
     * @param  point 被添加的点
	 */
	this.addToOpenList = function(point) {
		openList.push(point);
	};
	/**
	 * 从开启列表中删除某点
     * @param index 被删除的id
	 */
	this.delFromOpenList = function(index) {
		openList.splice(index, 1);
	};
	/**
	 * 关闭列表
	 */
	var closeList = [];// 关闭列表
	/**
     * 将点从关闭列表删除
     * @param  point 被删除的点
     */
	this.addToColseList = function(point) {
		closeList.push(point);
	};
	/**
	 * 取值
	 */
	this.setVal = function(startendP) {
		var start = startendP[0].getId();// 起点id
		var end = startendP[1].getId();// 终点id
		this.findStartP(start);
		this.findEndP(end);
		return this;
	};

	/**
	 * 寻路
     * @param  startP 起点
     * @param  endP 终点
	 */
	this.route = function(startP, endP) {
		// 将起点添加至开启列表
		this.addToOpenList(startP);
		// 重复执行，当出现下面两种情况之一时，停止；1、将终点B添加至关闭列表。2、开启列表为空。
		while (!openList.length == 0 && !closeList.contains(endP)) {
			// console.log("开启列表的长度"+openList.length);
			// 遍历开启列表,寻找F值最小的格子，设置为当前格
			var currentPoint = this.getMinFPoint(openList);
			// 遍历当前格的临近格子----
			this.handlerNearPs(currentPoint, openList, closeList);
		}
        if(openList.length == 0){
            return false;
        }else if(closeList.contains(endP)){
            return true;
        }
	};
    /**
     * 对当前点临近点的处理
     * @param  currentPoint 当前点
     * @param  openList 开启列表
     * @param  closeList 关闭列表
     */
	this.handlerNearPs = function(currentPoint, openList, closeList) {
		var _currentP = currentPoint;
		// 获得当前格的临近点
		var nearPs = _currentP.get_nearPs();
		// console.log("当前点的X"+_currentP.getX()+"当前点的Y"+_currentP.getY());
		// console.log(nearPs.length+"个临近点");
		for ( var i = 0; i < nearPs.length; i++) {
			// 如果格子不可通过(nearPs包括所有可通过的的点) || in 关闭列表，则忽略
			if (!closeList.contains(nearPs[i]) && netWork.isForbidden(_currentP.getParent(),_currentP,nearPs[i])) {
				// 如果格子 not in 开启列表,。
				if (!openList.contains(nearPs[i])) {
					// 添加该格子至开启列表
					this.addToOpenList(nearPs[i]);
					// console.log("添加该格子至开启列表");
					// 并设置当前格为该格子的父格子(setParent里面已经返回G值)
					// 并计算该格子的G值和H值以及F值
					nearPs[i].setParent(_currentP);
				} else {
					if (_currentP.getG() + nearPs[i].distance(_currentP) <= nearPs[i]
							.getG()) {
						nearPs[i].setParent(_currentP);
					}
				}
			}
		}
	};

	/**
	 * 计算F值获得最小点
     * @param openlist 开启列表
     * return minFPoint F值最小点
	 */
	this.getMinFPoint = function(openList) {
		// 顺序比较获得最小值， 当前格子 从开启列表删除，添加至关闭列表；
		var minFPoint = openList[0];// 设第一个点为F值最小点
		var minF = openList[0].getF();// 设第一个点的F值为最小F值
		var num;
		// console.log("第一个点的F值"+minF);
		for ( var i = 0; i < openList.length; i++) {
			var tempF = openList[i].getF();
			// console.log(tempF+"-----"+minF);
			if (tempF <= minF) {
				minF = tempF;
				minFPoint = openList[i];
				num = i;
			}
		}
		// 从开启列表删除，添加至关闭列表
		this.delFromOpenList(num);
		closeList.push(minFPoint);
		return minFPoint;
	};
	
	/**
	 * 设置所有的H值,并删除前一次所设置的父节点值
	 */
	this.setHclearNodes = function() {
		for ( var i = 0; i < _points.length; i++) {
			_points[i].getH();
            _points[i].deleteParent();
            _points[i].deleteChild();
		}
	};

    /**
     * 寻路
     * @param startP 起点
     * @param endP 终点
     */
	this.findRoute = function(startP, endP) {
		console.log("startP"+startP.getId()+"endP"+endP.getId());
		var route = [];
		var parent = endP.getParent();
		route.push(endP);
		while (!parent.equal(startP)) {
			route.push(parent);
			parent = parent.getParent();
		}
		route.push(startP);
		return route;
	};
	 /**
     * 文本描述
     * @param points 最终路径点集合（0为起点，最后为终点）
     */
	this.txtAnnotate = function(points) {
		//最终路径设定子节点关系
		for(var i=0;i<points.length-1;i++){
			points[i].setChild(points[i+1]);
		}
		/*for(var i=points.length-1;i>0;i--){
			console.log(points[i].getId()+"parent"+points[i].getParent().getId());
		}
		for(var i=0;i<points.length-1;i++){
			console.log(points[i].getId()+"child"+points[i].getChild().getId());
		}*/
		//cornerP为每个转弯的端点（包括起始点）
		var cornerP = points[0];
		var nextP = cornerP.getChild();
		var preP;
		var countLength=0;
		var resultSegments=[];
		while (nextP) {
			var name = cornerP.getSegement(nextP).getName();
			var currentP = nextP;
			var currentPNext = currentP.getChild();
			var segmentPs=[];
			while (currentPNext !== undefined) {
				var tempName = currentP.getSegement(currentPNext).getName();
				if (name !== tempName) {
					preP = cornerP;
					//points
					segmentPs.push(cornerP);
					segmentPs.push(currentP);

	                //length
					var length = cornerP.distance(currentP);
					countLength=countLength+length;
					var direction = judgeDirection([currentP.getX(),currentP.getY(),currentPNext.distance(preP)], 
	                                               [preP.getX(), preP.getY(),currentP.distance(currentPNext)], 
	                                               [currentPNext.getX(), currentPNext.getY(),currentP.distance(preP)]);
					//总汇routeresult---加入segment
					resultSegments.push({points:segmentPs,name:name,nextName:tempName,direction:direction,
		                                length:length,turnP:currentP});
					cornerP = currentP;
					nextP = cornerP.getChild();
					break;
				} else {
					//preP = cornerP;
					segmentPs.push(currentP);
					currentP = currentPNext;
					currentPNext = currentP.getChild();
				}
			}
			
			if (currentPNext === undefined) {
				//length
				var length = cornerP.distance(currentP);
				countLength=countLength+length;		
				segmentPs.push([cornerP,currentP]);
				resultSegments.push({points:segmentPs,name:name,nextName:tempName,direction:direction,
                    length:length,turnP:currentP});
				console.log("全程"+countLength+"米");               
				return resultSegments;
			}
		}
	};
    /**
     * 寻路实施
     * return route 最终路径
     */
	this.doS = function(startendPs) {
		this.setVal(startendPs).setHclearNodes();
		var isPassable=this.route(_startP, _endP);
		 if(isPassable){
	        var finalRoute = this.findRoute(_startP, _endP).reverse();//这里找到的数组是从终点到起点,reverse使变成从起点到终点
			var length = finalRoute.length;
			console.log("最终路径长度" + length);
			console.log("最终路径--从终点到起点");
			for (var i = 0; i < length; i++) {
				console.log(finalRoute[i].getId());
			}
			return finalRoute;
        }else{
            alert("不可通行");
        }
			
	};
};
