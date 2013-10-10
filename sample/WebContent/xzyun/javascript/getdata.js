var url;

var uint;
function getData()
{
	var xmlhttp;
	if (window.XMLHttpRequest){
		xmlhttp=new XMLHttpRequest();
	}
	else{
		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	var startlevel=document.getElementById("startlevel").value;
	var endlevel=document.getElementById("endlevel").value;
	var geocord=document.getElementById("geocord").value;
	var selectmap=document.getElementById("selectmap").value;
	var dir=document.getElementById("dir").value;
	url = "http://localhost:8080/sample/DownLoadServlet?args="
		+startlevel+","+endlevel+","+geocord+","+dir+","+selectmap;

	xmlhttp.open("GET",url,true);
	xmlhttp.setRequestHeader("Content-Type", "text/html;charset=UTF-8");
	//这里如果不设定头部则会导致 firfox 发送数据错误，servlet接受到的参数为乱码，在IE中正常
	xmlhttp.onreadystatechange = function(){
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
			  //在页面显示task finished！
			  document.getElementById("myspan").innerHTML=xmlhttp.responseText;
			  
			  //读取进度的最后数字。
			  getStatus();
			  clearInterval(uint);
		  }
	};
	xmlhttp.send();
	//当用户基本参数传给servlet的时候，就立马开始每隔一秒获取进度
	uint = setInterval(getStatus,1000);//每1秒 ,执行一次查询,从服务端(servlet)获取下载进度
};



function getStatus()
{
	var url;
	var xmlhttp;
	if (window.XMLHttpRequest){
		xmlhttp=new XMLHttpRequest();
	}
	else{
		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	url = "http://localhost:8080/sample/GetStatusServlet";
	
	 xmlhttp.open("GET",url,true);
	 xmlhttp.setRequestHeader("Content-Type", "text/html;charset=UTF-8");
	//这里如果不设定头部则会导致 firfox 发送数据错误，servlet接受到的参数为乱码，在IE中正常
	 
	xmlhttp.onreadystatechange = function(){
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
			  //从servlet获取进度，在页面显示进度数据变化
			  var status=xmlhttp.responseText;
			  document.getElementById("mystatus").innerHTML=status;  
			  //在页面显示进度条的动态变化
				var divBar = $(".progress");
				var temp = status.split("/");
				divBar.width(parseInt(temp[0])*150/parseInt(temp[1]));	  
		  }
	};
	xmlhttp.send();	
	
	
};

