var ResultSegmt=function(segmt){
    var _points,_length,_name,_nextName,_turnP,_direction,_txt;
    /**
     * 设置segmt值
     */
    var setValue=function(){
        _name=segmt.name;
        _nextName=segmt.nextName;
        _length=segmt.length;
        _points=segmt.points;
        _turnP=segmt.turnP;
        _direction=segmt.direction;
        _txt="在"+_name+"上直行"+_length+"米"+_direction+"至"+_nextName;
    };
    this.getName=function(){
        return _name;
    };
    this.getNextname=function(){
        return _nextName;
    };
    this.getPoints=function(){
        return _points;
    };
    this.getLength=function(){
        return _length;
    };
    this.getTurnP=function(){
        return _turnP;
    };
    this.getDirection=function(){
        return _direction;
    };
    this.getTxt=function(){
        return _txt;
    };
    this.show=function(){
    };
    setValue();
};