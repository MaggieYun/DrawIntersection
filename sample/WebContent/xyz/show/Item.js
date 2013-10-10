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
		 	if (arr[i] == " " || arr[i] == "　") {
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