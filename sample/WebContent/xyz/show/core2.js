var IbsWindow = function(config) {
	this.width = config["width"] || 500;
	this.height = config["height"] || 500;
	this.menu = [];
	this.dom = null;

	/**
	 *
	 */
	this.createFrame = function() {
		this.dom = $("<div/>").appendTo($("body")).addClass("frame");
	};

	this.addItem = function(item) {
		this.menu.push(item);
		item.addContents(this.dom);
	};
};

var Item = function(config) {
	this.content = config["content"];

	this.fontcolor = config["fontcolor"];

	this.fontsize = config["fontsize"];

	this.fontstyle = config["fontstyle"];

	this.fontweight = config["fontweight"];

	this.dom = null;

    this.addContents=function(ibsWindow){
    	var  contents = this.content;
    	var  contentsarr=contents.split("/");
    	for(var i=0;i<contentsarr.length;i++){
    		this.dom = $("<div/>").appendTo($(".frame"))
    		           .height(this.fontsize);
    		this.addContent(contentsarr[i],this.dom);
    		var mes=9;
    	}

    }

	this.addContent = function(content,dom) {
		 var arr=content.split("");
		 for(var i=0;i<arr.length;i++){
		 	if (arr[i] == " " || arr[i] == "��") {
				arr[i] = "&nbsp;";
			}
		 	$("<p/>").html(arr[i]).css({
			"font-size" : this.fontsize + "px",
			"color" : this.fontcolor,
			"font-style" : this.fontstyle,
			"font-weight" : this.fontweight,
		}).appendTo(dom);
		//ibsWindow.append(this.dom);
		 }
		
	};
};



$(document).ready(function() {
	
	var showHandler = function() {
		$("#frame").animate({
            marginTop : "-" + ($("#fontsize").val()) + "px"},1000);
        index = index + 1 < $(".frame>div").length ? index + 1 : 0;
		alret("hello");
        setTimeout(showHandler,1000);
	};
	
	var ibs = new IbsWindow({
		width : 500,
		height : 500
	});
	ibs.createFrame();
	var item = new Item({
				content : $("#mes1").val(),
				fontsize : $("#fontsize").val(),
				fontcolor : $("#fontcolor").val(),
				fontstyle : $("#fontstyle").val(),
				fontweight : $("#fontweight").val(),
			});
			ibs.addItem(item);
	 showHandler(0);
});