
//�ж�����ֵ�Ƿ����Ҫ��
var judgeRange = function(self,min,max) {
	var str =self.value;
	if (parseFloat(str) < min || parseFloat(str) > max) {
		self.parentNode.lastChild.innerHTML = "data error";
	} else {
		self.parentNode.lastChild.innerHTML = "";
	}
};

var showHint = function() {
	var str = getInput();
	var url="http://localhost:8080/sample/load?args=" + str[0]+ "," + str[1] + "," + str[2] + "," + str[3] + "," + str[4] + ","
			+ str[5];
	doHttpRequest(url);
};
 var doHttpRequest=function(url){
	 var xmlhttp;
		if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
			xmlhttp = new XMLHttpRequest();
		} else {// code for IE6, IE5
			xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
		}
		xmlhttp.onreadystatechange = function() {
			if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
				document.getElementById("txtHint").innerHTML = xmlhttp.responseText;
			}
		};
		xmlhttp.open("GET", url, true);
		xmlhttp.send(); 
 };

// �����������
var getInput = function() {
	var str = [];
	str[0] = document.getElementById("x1").value.trim();
	str[1] = document.getElementById("y1").value.trim();
	str[2] = document.getElementById("x2").value.trim();
	str[3] = document.getElementById("y2").value.trim();
	str[4] = document.getElementById("fromrange").value.trim();
	str[5] = document.getElementById("torange").value.trim();
	// str7=document.getElementById("ithread").value;
	return str;
};

// �����б�̬����
// temp array use store option

var options = [];
var onChangeHandler = function() {

	// console.log("onChangeHandler");
	var select = document.getElementById("fromrange");
	var selectedItem = select.selectedIndex;

	// console.log(selectedItem);

	// clear options2
	for ( var i = 0; i < options.length; i++) {
		var option2 = document.getElementById("torange");
		option2.remove(options[i]);
	}

	for ( var i = selectedItem + 1; i <= 19; i++) {
		// console.log("add option to select(option2):"+i);
		var option2 = document.getElementById("torange");
		var newOption = document.createElement("option");
		newOption.value = i;
		newOption.text = i;
		options.push(newOption);
		option2.add(newOption);
	}
};
// ��ͼ����
var onMapsChangeHandler = function() {
	var add="";
	var mapStyle = document.getElementById("mapstyle");
	switch (mapStyle) {
	case Mapabc:
		add = "http://emap0.mapabc.com/mapabc/maptile?";
	case Google:
	    add = "http://emap0.mapabc.com/mapabc/maptile?";
	case BMap:
		add = "http://emap0.mapabc.com/mapabc/maptile?";
	}
	return add;
};
