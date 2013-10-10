/**
 * 情报板播放列表类
 * @class
 */
IBSMenu = function(){
    /**
     * 播放条目集合
     * @type Array.<IBSMenuItem>
     */
    var _items = new Array();
	  /**
     * 更新时间,此时间值是自格林威治时间1970.1.1 00:00:00到现在所经历的秒数
     * @type Number
     */
    var _time;
    /**
     * 节目数,即内容条数
     * @type {Number}
     */
    var _length = 0;
    this.getLength = function(){
    		return _length;
    }
    
    
    /**
     * 添加播放条目
     */
    this.addItem = function(ibsMenuItem){
        _items.push(ibsMenuItem);
        _length++;
    };
    
    this.getItem = function(index){
        return _items[index];
    };
    
    /**
     * 更新指定播放条目
     * @param {IBSMenuItem} item
     * @param {Number} index 位置
     * @return {Boolean} 操作是否成功
     */
    this.updateItem = function(item, index){
   			_items.splice(index, 1, item);
    };
};