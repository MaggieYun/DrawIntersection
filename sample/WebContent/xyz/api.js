/**
 * @class IbsWindow 情报板
 * @param config
 *            参数
 */
var IbsWindow = function(config) {
	this.menu = [];// 存放Item
	this.dom = null;
	/**
	 * @function
	 */
	this.createFrame = function() {

	};

	/**
	 * @param index 添加的位置id；
	 * @param item 添加的item；
	 * @function
	 * @description 添加信息
	 * @returns {menu} 信息集合
	 */
	this.addItem = function(index, item) {
		var ind = index;
		var ite = item;
		this.menu.splice(ind, ite);
		return menu;
	};

	/**
	 * @param index删除元素的的位置id；
	 * @param num 删除个数；
	 * @function
	 * @description 删除信息
	 * @returns {menu} 信息集合
	 */
	this.deleItem = function(index, num) {
		var ind = index;
		var n = num;
		this.menu.splice(ind, n);
		return menu;
	};
	/**
	 * @function
	 * @description 获得需求Item
	 * @returns {Item} 某一页或几页信息
	 */
	this.getTempItem = function() {
		return item;
	};
	/**
	 * @function
	 * @description 获得当前Item
	 * @returns {Item} 某一页信息
	 */
	this.getCurrentItem = function() {
		return items;
	};

	/**
	 * @function
	 * @description 清除当前显示的Item
	 * @returns {Item} 某一页信息
	 */
	this.clearCurrentItem = function(item) {

	};

	/**
	 * @function
	 * @description 设置信息列表
	 * @returns {allItems} 信息列表
	 */
	this.setMenu = function() {
		return menu;
	};
	/**
	 * @function
	 * @description 获得信息列表
	 * @returns {allItems} 信息列表
	 */
	this.getMenu = function() {

	};
	/**
	 * @function
	 * @description 清除信息列表
	 * @returns {allItems} 信息列表
	 */
	this.clearMenu = function() {
		menu = [];
		return menu;
	};
	/**
	 * @function 显示有style信息
	 */
	this.show = function() {
		//tempItem = IbsWindow.getTempItems();
		// codes goes
	};

	/**
	 * @function 暂停显示
	 */
	this.pause = function() {
		var currentItem = ibsWindow.getCurrentItem();
		// do pause
		return currentItem;
	};
	/**
	 * @function 继续中断的显示
	 */
	this.reStart = function(currentItem) {
		var curIte = currentItem;
		this.show(curIte);
	};

};

/**
 * @class Item 某页信息
 * @param config 参数
 */
var Item = function(ibsWindow) {
	// 需要index属性
	var ibsWin = ibsWindow;
	/**
	 * @function
	 * @description 设置IbsWindow
	 */
	this.setIbsWindow = function() {

	};
	/**
	 * @function
	 * @description 返回IbsWindow
	 */
	this.getIbsWindow = function() {

	};

	/**
	 * @function
	 * @description 向Item里面添加contents
	 * @param itemContent 页面内容
	 */
	this.addContentsToItem = function(itemContent) {

		// itemContent convert to contentarr
		// return contentarr typeof Text

		this.addContent(contentarr[i]);

		// add code
		return Item;
	};

	/**
	 * @function
	 * @description 向Item里面添加content
	 * @param textt 条内容
	 */
	this.addContent = function(text) {
		var txt = text;
		var content = new Content(txt);
		// add code
		return content;
	};
	/**
	 * @function
	 * @description 获得当前Item里的contents
	 * @param item 页
	 * @return {Content} 单条内容
	 */
	this.getContentFromItem = function(item) {

		return Content;
	};
	/**
	 * @function
	 * @description 起始播放日期
	 */
	this.startData=function(){
		
	};
	/**
	 * @function
	 * @description 截止播放日期
	 */
	this.endData=function(){
		
	};
	/**
	 * @function
	 * @description 是否为工作日
	 */
	this.isWorkDay=function(){
		
	};
};

/**
 * @class Content 单条内容
 * @param txt 文本信息 textstyle 文字样式
 * @return {Content} 单条内容
 */
var Content = function(txt, pic, textstyle) {
	this.textstyle = textstyle;
	this.txt = txt;
	this.picture = pic;
	return content;
};


/**
 * @class
 */
var TextStyle = function(config) {

	/**
	 * @description 字体颜色
	 */

	this.fontcolor = config["fontcolor"];
	/**
	 * @description 字体大小
	 */

	this.fontsize = config["fontsize"];

	/**
	 * @description 字体类型
	 */
	this.fontstyle = config["fontstyle"];
	/**
	 * @description 字体粗细
	 */

	this.fontweight = config["fontweight"];

	/**
	 * @description 暂停时长
	 */
	this.pause = config["pause"];
	/**
	 * @description 显示次数
	 */

	this.times = config["times"];

};