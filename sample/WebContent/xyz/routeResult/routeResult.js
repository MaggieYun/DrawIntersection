$.fn.routeResult=function(){
    var element=$(this);
    /**
    *map对象
    */
    var map;
    /**
    *设置地图
    */
    this.setMap=function(map){
        map=map;
    };
    /**
    *路段组成点
    */
    var points;
    /**
    *设置点
    */
    this.setPoints=function(points){
        var cornerP = points[0];
        var nextP = cornerP.getParent();
        var txt = [];
        var preP;
        var preRoadname;
        var countLength=0;
        while (nextP) {
            var roadName = cornerP.getSegement(nextP).getName();
            var currentP = nextP;
            var currentPNext = currentP.getParent();
            var segmentPs=[];
            while (currentPNext !== undefined) {
                var tempName = currentP.getSegement(currentPNext).getName();
                if (roadName !== tempName) {
                    preP = cornerP;
                    //points
                    segmentPs.push(cornerP);
                    segmentPs.push(currentP);

                    //length
                    var length = cornerP.distance(currentP);
                    countLength=countLength+length;
                    //txt
                    var txt2 = "在" + roadName + "上直行" + length + "米";
                    var direction = judgeDirection([currentP.getX(),currentP.getY(),currentPNext.distance(preP)], 
                                                   [preP.getX(), preP.getY(),currentP.distance(currentPNext)], 
                                                   [currentPNext.getX(), currentPNext.getY(),currentP.distance(preP)]);
                    txt2 =txt2+direction+"至"+roadName+"路口";
                    //总汇routeresult---加入segment
                    resultSegments.push([segmentPs,roadName,length,txt2,currentP]);
                    cornerP = currentP;
                    nextP = cornerP.getParent();
                    break;
                } else {
                    //preP = cornerP;
                    segmentPs.push(currentP);
                    currentP = currentPNext;
                    currentPNext = currentP.getParent();
                }
            }
            //其实这里是实际的第一个点和第二个点
            if (currentPNext === undefined) {
                //length
                var length = cornerP.distance(currentP);
                countLength=countLength+length;
                //txt
                var txt2 = "在" + roadName + "直行" + length + "米";        
                segmentPs.push([cornerP,currentP]);
                
                resultSegments.push([segmentPs,roadName,length,txt2,currentP]);
                
                //var newResult=resultSegments.reverse();
                console.log("全程"+countLength+"米");

                return resultSegments;
            }
        }
    };
    /**
    *路段信息数组  元素为segment，[points,roadName,length,center,txt]
    */
    var resultSegments;
    /**
    *当前路段信息
    */
    var cursegmt;
    var setCursegmt=function(segmt){
        //地图中心移动
        map.centerAt(segmt[3]);
        //高亮路段
        //显示一个信息提示框（地点名称、路段长度。。。放大n倍，缩小至原始大小）
    };
    var distance;
    var getDistance=function(){
        
    };
    var name;
    var getName=function(){

    };
    /**
    *鼠标点击时，设置当前路段
    */
    element.li.bind("click",{},setCursegmt);
    /**
    *鼠标移到某行文字描述上时，高亮
    */
    element.li.mouseover(function(){
        $(this).css("background-color","yellow");
     });
    /**
    *鼠标移开某行文字描述上时，恢复
    */
    element.li.mouseout(function(){
        $(this).css("background-color","white");
     });
    
    /**
     * 文字描述
     */
    this.txtAnnotation=function(resultSegmt){
        //添加起点终点的标识
        for (var i = 0; i <= resultSegmt.length-1; i++) {
                    $("<li/>").html(resultSegmt[i][4]).appendTo($("#result"));
                }
    };
return this;
};
