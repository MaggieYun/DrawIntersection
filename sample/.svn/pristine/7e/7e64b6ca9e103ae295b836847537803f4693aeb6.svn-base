/**
 * 情报板播放条目类
 * @class
 */
IBSMenuItem = function(config){
    /**
     * 开始小时
     * @type {Number}
     */
    var _startHour;
   
    /**
     * 开始分钟
     * @type {Number}
     */
    var _startMinute;
    /**
     * 结束小时
     * @type {Number}
     */
    var _endHour;
    /**
     * 结束分钟
     * @type {Number}
     */
    var _endMinute;
    /**
     * 图标代码
     * @type {Number}
     */
    var _iconCode;
    /**
     * 显示内容类型
     * @type {Number}
     */
    var _contentType;
    /**
     * 显示内容
     * @type {String}
     */
    var _content;
    /**
     * 字体大小
     * @type {Number}
     */
    var _fontSize;
    /**
     * 字体名称
     * @type {Number}
     */
    var _fontName;
    /**
     * 字体颜色
     * @type {Number}
     */
    var _fontColor;
    /**
     * 显示风格
     * @type {Number}
     */
    var _showStyle;
    /**
     * 显示速度
     * @type {Number}
     */
    var _showSpeed;
    /**
     * 显示时长
     * @type {Number}
     */
    var _showTime;
    /**
     * 开始于周几
     * @type {Number}
     * 0--不限制  1--星期天 2--星期一  3--星期二  4--星期三 5--星期四  6--星期五 7--星期六
     */
    var _startWeekday;
    /**
     * 结束语周几
     * @type {Number}
     *  0--不限制  1--星期天 2--星期一  3--星期二  4--星期三 5--星期四  6--星期五 7--星期六
     */
    var _endWeekday;
    /**
     * 开始于几日
     * @type {Number}
     *  0--不限制
     */
    var _startDay;
    /**
     * 结束于几日
     * @type {Number}
     *  0--不限制
     */
    var _endDay;
    /**
     * 开始于几月
     * @type {Number}
     *   0--不限制
     */
    var _startMonth;
    /**
     * 结束于几月
     * @type {Number}
     *   0--不限制
     */
    var _endMonth;
    /**
     * 信息类型
     * @type {Number}
     */
    var _infoType;
    
    /*
     *初始化
     */
    function init(){
    		_startHour = config["startHour"]||0;
    		_startMinute = config["startMinute"]||0;
    		_endHour = config["endHour"]||0;
    		_endMinute = config["endMinute"]||0;
    		_startWeekday = config["startWeekday"]||0;
    		_endWeekday = config["endWeekday"]||0;
    		_startDay = config["startDay"]||0;
    		_endDay = config["endDay"]||0;
    		_startMonth = config["startMonth"]||0;
    		_endMonth = config["endMonth"]||0;
    		
    		_content = config["content"]||"";
    		_fontSize = config["fontSize"]||14;
    		_fontName = config["fontName"]||"宋体";
    		_fontColor = config["fontColor"]||"#ff0000";
    };
    init();
    
    /**
     * 获取格式化后的情报板信息
     * @return {String} 格式化后的情报板信息
     */
    this.getShowFormat = function(){
        var p = $("<p style='align:left;line-height:100%;font-family:" + _fontName + ";color:"+_fontColor+";font-size:"+_fontSize+";'>");
        p.append(_content);
        return p;
    };
    
    /**
     * 获取此时该信息是否可以显示
     * @return {Boolean} 是否可以显示
     */
    this.getEnable = function(){
    	var now = new Date();
    	if(_startMonth!=0 && now.getMonth()+1 < _startMonth){//早于开始月份
    	   return false;
    	}
    	if(_endMonth!=0 && now.getMonth()+1 > _endMonth){//晚于结束月份
           return false;
        }
        if(_startWeekday!=0 && now.getDay()+1 < _startWeekday){//早于开始星期
            return false;
        }
        if(_endWeekday!=0 && now.getDay()+1 > _endWeekday){//晚于结束星期
            return false;
        }
        if(_startDay!=0 && now.getDate() < _startDay){//早于开始一个月中的日期值
            return false;
        }
        if(_endDay!=0 && now.getDate() > _endDay){//晚于结束一个月中的日期值
            return false;
        }
        var nowMinuteNum = now.getHours()*60 + now.getMinutes();
        var startMinuteNum = _startHour*60 + _startMinute;
        var endMinuteNum = _endHour*60 + _endMinute;
        
        if(nowMinuteNum < startMinuteNum){//早于开始小时/分钟
            return false;
        }
        
        if(nowMinuteNum > endMinuteNum){//晚于结束小时/分钟
            return false;
        }
        
//        if(now.getHours() < _startHour){//早于开始小时
//            return false;
//        }
//        if(now.getHours() > _endHour){//晚于结束小时
//            return false;
//        }
//        if(now.getMinutes() < _startMinute){//早于开始分钟
//            return false;
//        }
//        if(now.getMinutes() > _endMinute){//晚于结束分钟
//            return false;
//        }
        return true;
    };
    
    /**
     * 比较两条信息是否相同
     * @return {Boolean} 是否相同
     */
    this.equalTo = function(instance){
        if(_startHour != instance.startHour ||_startMinute != instance.startMinute 
        ||_endHour != instance.endHour ||_endMinute != instance.endMinute
        ||_content != instance.content ||_fontSize != instance.fontSize
        ||_fontName != instance.fontName ||_fontColor != instance.fontColor
        ||_startWeekday != instance.startWeekday ||_endWeekday != instance.endWeekday
        ||_startDay != instance.startDay ||_endDay != instance.endDay
        ||_startMonth != instance.startMonth ||_endMonth != instance.endMonth){
            return false;
        }else{
            return true;
        }	
    };
};