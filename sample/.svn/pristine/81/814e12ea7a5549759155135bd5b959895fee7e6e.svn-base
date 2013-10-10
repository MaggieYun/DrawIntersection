/**
 *视频插件单例类Demo
 */
var VideoClient = (function(){
	var _instance = null;
	var _container = null;
	var _jq_object = null;
	var _rpc_object = null;
	var _bar = null;
	var _msgBar = null;
	var _btnChange = null;

	var _width = null;
	var _height = null;
	var _rpcUseable = null;
	var _minIcon = null;
	var _closeIcon = null;

	var _clsid = "clsid:985D60DE-523C-42E9-8BA9-A736273F2D8F";
	var _rpcClsid = "clsid:7D673330-B8A0-407E-A65B-6CB198DCBEB7";
	var LOGIN_FORMAT = "Login方法参数格式为:Login(host,port,user,password)或Login({host:host,port:port,user:user,psw:psw})";

	var _render = function(){
		try{
			$("#" + _container).draggable({containment: "parent" });
			$("#" + _container).width(_width+10)
			.height(_height+50);
			
			//工具栏
			_bar = $("<div/>").attr("id", "bar").appendTo($("#" + _container));
			
			$("<img/>").attr("alt","min").attr("src", _minIcon)
			.click(function(e){console.log(e)})
			.appendTo(_bar);
			
			$("<img/>").attr("alt","close").attr("src", _closeIcon)
			.click(function(e){console.log(e)})
			.appendTo(_bar);
			
			//提示栏
			_msgBar = $("<div/>").attr("id","msgBar").appendTo($("#"+_container));
			
			
			//视频播放插件
			_jq_object = $("<object/>")
				.attr("classid",_clsid)
				.width(_width)
				.height(_height)
				//.css({position: "absolute",'top':50,'left':50})
				.appendTo($("#" + _container));
			
			if(_rpcUseable){
				//点播插件
				_rpc_object = $("<object/>")
				.attr("classid",_rpcClsid)
				.width(0)
				.height(0)
				.appendTo($("#" + _container));
				
				_btnChange = $("<input/>").attr("type","button")
				.attr("alt","change")
				.attr("value","点播")
				.click(_changeActive)
				.prependTo(_bar);
			}
			
			
			
			
		}catch(e){
			console.log(e);
		}
	};
	
	var _changeActive = function(){
		var ocx =_instance.GetOcxObject();
		var rpc = _instance.GetRpcObject();
		if(ocx.style.width != "0px"){//切换至点播状态
				_btnChange.attr("value","视频");
				ocx.style.width=0;
				ocx.style.height=0;    		
				rpc.style.width=_width;
				rpc.style.height=_height;
		}else{//切换至视频状态
			    _btnChange.attr("value","点播");
			    ocx.style.width=_width;
				ocx.style.height=_height;    		
				rpc.style.width=0;
				rpc.style.height=0;
		}
	};

	var _init = function(container,options){
		_container = container;
		_width = options["width"]||800;
		_height = options["height"]||500;
		_rpcUseable = options["rpcUseable"]||false;
		_minIcon = options["minIcon"]||"";
		_closeIcon = options["closeIcon"]||"";
													 
		_render();

		this.GetOcxObject = function(){//获取视频播放插件
			return _jq_object.get(0);
		};
		
		this.GetRpcObject = function(){//获取点播插件
			return _rpc_object.get(0);
		};

		this.GetOcxVersion = function(){//获取本机点播插件版本号
			return this.GetOcxObject().GetVersion();
		};
		
		this.GetRpcVersion = function(){//获取本机点播插件版本号
			return this.GetRpcObject().GetVersion();
		};

		/**
		 *开始播发视频
		 */
		this.Login = function(){
			var host,port,user,psw,bool=true;
			var msg = [];//错误信息
			
			if(arguments.length >= 4){
				host = arguments[0];
				port = arguments[1];
				user = arguments[2];
				psw = arguments[3];
			}else if(typeof(arguments[0]) === "object"){
				host = arguments["host"];
				port = arguments["port"];
				user = arguments["user"];
				psw = arguments["psw"];
			}else{
				bool = false;
				msg.push(LOGIN_FORMAT);
				return {"success":bool,"message":msg};
			}
			
			try{
				this.GetOcxObject().Login(host,port,user,psw);	//视频插件Login方法没有提供返回值
				if(_rpcUseable){
					var a = this.GetRpcObject().Login(host,port,user,psw);
					alert(a);
				}
			}catch(e){
				bool = false;
				msg.push(e);
			}

			return {"success":bool,"message":msg};
		};

		/**
		 *开始播放视频
		 */
		this.StartVideo = function(id,name){
			var ocx =_instance.GetOcxObject();
			if(ocx.style.width == "0px") _changeActive();
			return this.GetOcxObject().StartVideo(id,name,-1);
		};

		/**
		 *关闭所有视频
		 */
		this.stopAllVideo = function(){
			return this.GetOcxObject().stopAllVideo();
		};
		
		/**
		 *开始点播
		*/
		this.StartPlayback = function(videoId, videoName){
			var rpc =_instance.GetRpcObject();
            if(rpc.style.width == "0px") _changeActive();
		    return this.GetRpcObject().StartPlayback(videoId, videoName);
		};
		
		/**
		 * 检查视频播放插件是否
		 */
		this.checkOcxVersion = function(newVersion, url){
            try{
                if(this.GetOcxVersion() < newVersion){//版本有更新
                    var p = $("<p>").css("font-style", "oblique").appendTo(_msgBar);
                    p.append("视频播放插件有更新,请点击下载最新版！");
                    $("<A>").attr("href", url)
                    .append("点击下载视频播放插件。").appendTo(_msgBar);
                    return false;
                }else{//已经为最新版本
                    return true;
                }   
            }catch(e){//为安装视频播放插件
                var p = $("<p>").css("font-style", "oblique").appendTo(_msgBar);
                p.append("检测到您的机器尚未安装视频播放插件,请点击下载安装！");
                $("<A>").attr("href", url)
                .append("点击下载视频播放插件。").appendTo(_msgBar);
                return false;
            }
            	
		};
		
		/**
         * 检查视频播放插件是否
         */
        this.checkRpcVersion = function(newVersion, url){
            try{
                if(this.GetRpcVersion() < newVersion){//版本有更新
                    var p = $("<p>").css("font-style", "oblique").appendTo(_msgBar);
                    p.append("视频点播插件有更新,请点击下载最新版！");
                    $("<A>").attr("href", url)
                    .append("点击下载视频点播插件。").appendTo(_msgBar);
                    return false;
                }else{//已经为最新版本
                    return true;
                }   
            }catch(e){//为安装视频播放插件
                var p = $("<p>").css("font-style", "oblique").appendTo(_msgBar);
                p.append("检测到您的机器尚未安装视频点播插件,请点击下载安装！");
                $("<A>").attr("href", url)
                .append("点击下载视频点播插件。").appendTo(_msgBar);
                return false;
            }
                
        };
		
	};

	return {
		getInstance:function(container,options){
			if(!_instance){
				_instance = new _init(container,options);
			}
			return _instance;
		}
	};
})();