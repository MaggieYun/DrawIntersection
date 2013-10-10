/**
 * 地图导航工具类
 * @class
 * @requires jQuery
 */
var NavigationTool = function(map){
    /**
     * @name 区域变化事件
     * @event 
     * @param {ExtentEvent} e
     */
    
    var map = null;
    
    /**
     * 设置地图对象
     * @param {jqMap} value 地图对象
     * @return {NavigationTool} this
     */
    this.setMap = function(value){
       //TODO 
    };
    /**
     * 获取地图对象
     * @return 地图对象
     */
    this.getMap = function(value){
        //TODO
    };
    /**
     * 是否第一个视图
     * @return {boolean} 
     */
    this.isFirstExtent = function(){
        //TODO
    };
    /**
     * 是否最后一个视图
     * @return {boolean} 
     */
    this.isLastExtent = function(){
        //TODO
    };
    /**
     * 激活漫游、放大、缩小
     * @param {String} mode 模式,可选值NavigationTool.PAN("pan"),NavigationTool.ZOOM_IN("zoomin"),NavigationTool.ZOOM_OUT("zoomout")
     * @return {NavigationTool} this
     */
    this.activate = function(mode){
        //TODO
    };
    /**
     * 恢复默认
     * @return {NavigationTool} this
     */
    this.deactivate = function(){
        //TODO
    };
    /**
     * 回到初始范围
     * @return {NavigationTool} this
     */
    this.zoomToInitialExtent = function(){};
    /**
     * 回到下一个范围
     * @return {NavigationTool} this
     */
    this.zoomToNextExtent = function(){};
    /**
     * 回到上一个范围
     * @return {NavigationTool} this
     */
    this.zoomToPrevExtent = function(){};
};
/**
 * 漫游模式
 * @constant
 * @type String
 */
NavigationTool.PAN = "pan";
/**
 * 放大模式
 * @constant
 * @type String
 */
NavigationTool.ZOOM_IN = "zoomin";
/**
 * 缩小模式
 * @constant
 * @type String
 */
NavigationTool.ZOOM_OUT = "zoomout";
