Ao=function(d){this.uid=d;var a=d.match(/AS_INSATNCE_(.+)::(.+)_/);var b=this.methods();if(a){this.klass=a[2];this.fullklass=a[1]+"."+a[2]}for(var c=0;c<b.length;c++){var e=b[c];this[e]=function(){var g=[];for(var f=0;f<arguments.length;f++){g.push(Ao._e(arguments[f],this))}var h=Ao._f.S(this.uid,arguments.callee.N,g);if(h!=null){return Ao._d(h)}else{return this}};this[e]["N"]=e}};Ao.VERSION="1.4";Ao.init=function(a){Ao._f=a;if(!Ao._f.R||!Ao._f.$||!Ao._f.G||!Ao._f.S){alert("初始化失败!")}};Ao.$=function(a,b){return new Ao(Ao._f.$(a,Ao._e(b)))};Ao.prototype.methods=function(){return Ao._f.R("method",this.uid)};Ao.prototype.properties=function(){return Ao._f.R("accessor",this.uid)};Ao.prototype.toString=function(){return"<"+this.klass+":"+this.uid+">"};Ao._h={};Ao._i=function(){var a=arguments.callee;if(!a.hasOwnProperty("n")){a.n=0}else{a.n++}return"function_"+a.n};Ao.prototype.attr=function(d){if(typeof d=="object"){Ao._f.S(this.uid,Ao._e(d));return this}else{if(typeof d==="string"&&arguments.length===1){d=d.split(".");var a=Ao._f.G(this.uid,d);return Ao._d(a)}else{if(typeof d==="string"&&arguments.length>1){var c,b={};if(typeof arguments[1]==="function"){c=arguments[1].call(this)}else{c=arguments[1]}b[d]=c;return arguments.callee.call(this,b)}else{return this}}}};Ao._e=function(f,d){if(f==undefined||f==null){return f}else{if(f instanceof Ao){return f.uid}else{if(typeof f==="object"&&f.hasOwnProperty("length")){var c=[];for(var b=0;b<f.length;b++){c.push(arguments.callee.call(null,f[b]))}return c}else{if(typeof f==="function"){var e=Ao._i();for(var a in Ao._h){if(Ao._h[a].s==f){return"Ao._h."+a}}Ao._h[e]=function(g){return f.apply(d,Ao._d(g))};Ao._h[e].s=f;return"Ao._h."+e}else{if(typeof f==="object"){var c={};for(a in f){c[a]=arguments.callee.call(null,f[a])}return c}else{return f}}}}}};Ao._d=function(d){if(d==undefined||d==null){return d}else{if(typeof d==="string"&&d.indexOf("AS_INSATNCE_")===0){return new Ao(d)}else{if(typeof d==="object"&&d.hasOwnProperty("length")){var c=[];for(var b=0;b<d.length;b++){c.push(arguments.callee.call(null,d[b]))}return c}else{if(typeof d==="object"){var c={};for(var a in d){c[a]=arguments.callee.call(null,d[a])}return c}else{return d}}}}};Ao.isArray=function(a){return Object.prototype.toString.apply(a)==="[object Array]"};Ao.attr=function(f,b,g){if(typeof f==="object"&&typeof b==="string"){var b=b.split(".");var a=null;var e=f;for(var c=0;c<b.length;c++){if(e.hasOwnProperty(b[c])){a=e[b[c]];e=a}else{return g||null}}return a}else{return g||null}};AsObject=Ao;Array.prototype.indexOf=function(c){var a=this.length;for(var b=0;b<a;b++){if(c==this[b]){return b}}return -1};Array.prototype.query=function(g,o,C,u,t,v){var q=this.length,B=[],z=[],y=[],w=[],p,n,A="function";if(typeof g===A){for(var s=0;s<q;s++){if(g.call(this,this[s],u)){B.push(this[s])}else{z.push(this[s])}}}p=B.length;if(typeof o===A){for(var r=0;r<p;r++){y.push(o.call(this,B[r],t))}}n=z.length;if(typeof o===A){for(var h=0;h<n;h++){w.push(C.call(this,z[h],v))}}return[B,z,y,w]};var iMap=function(d,c){var b=this;var e=d.width||"100%";var a=d.height||"100%";b.dom=d.dom||"100%";b.basemap=d.type||"null";b.options=c;b.images=d.images;b.jq={};$.extend(b.jq,$("#"+b.dom));(function(j){var h=document.getElementsByTagName("script");for(var l=0;l<h.length;l++){var n=h[l].src;var m=/flashmap_all.js$|imap.js$/;var k=n.match(m);if(k){j.baseurl=n.replace(m,"");j.id="FLASH"+new Date().getTime();break}}})(this);(function(h){var j;if(navigator.appName==="Microsoft Internet Explorer"){j='<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="100%" height="100%" id="{id}"><param name="movie" value="{swf}" />'}else{j='<object  type="application/x-shockwave-flash" data="{swf}" width="100%" height="100%" id="{id}">'}j+='<param name="quality" value="high" /><param name="bgcolor" value="#ffffff" /><param name="wmode" value="opaque" /><param name="allowScriptAccess" value="always" /><param name="allowFullScreen" value="true" /><param name="flashVars" value="uid={id}" /></object>';var i=j.replace(/{id}/g,h.id).replace(/{swf}/g,h.baseurl+"map.swf");h.jq.width(e).height(a).append(i)})(this);this.drawTool=null;this.getDrawTool=function(){if(!b.drawTool){b.drawTool=b.layerTool.attr("drawTool")}return b.drawTool};this.editTool=null;this.getEditTool=function(){if(!b.editTool){b.editTool=b.layerTool.attr("editTool")}return b.editTool};this.naviTool=null;this.getNaviTool=function(){if(!b.naviTool){b.naviTool=b.layerTool.attr("naviTool")}return b.naviTool};this.clientLayer=null;this.loaded=false;this.AS=null;this.layerTool=null;var g=d.onLoad;var f=function(){try{iMap.widget.WidgetManager.map=b}catch(h){}if(d.ovMap){b.addOvMap(d.ovMap)}if(d.images){b.addLayerToggle(d.images)}};(function(h){Flash={};Flash[h.id]=function(j){h.loaded=true;h.swf=document[h.id]||window[h.id];Ao.init(h.swf);h.application=new Ao(j);h.AS=h.application.attr("imap");h.layerTool=h.application.attr("layerTool");if(h.basemap!="null"){h.layerTool.load(h.basemap,h.options);h.clientLayer=h.layerTool.attr("clientLayer")}if(g){try{f();g.call(h,h.AS)}catch(i){alert(i)}}}})(this)};iMap.extend=function(b){for(var a in b){if(this.prototype.hasOwnProperty(a)){alert("扩展方法:"+a+"已存在!");continue}this.prototype[a]=b[a]}};iMap.VERSION="1.3.2";iMap.prototype.toString=function(){return"[iMap:"+this.type+"]"};iMap.http={};iMap.http.Http=function(config){this.http=AsObject.$("mx.rpc.http.HTTPService");this.url=Ao.attr(config,"url");this.method=Ao.attr(config,"method","GET");this.http.attr({url:this.url,method:this.method});if(config.success&&typeof config.success=="function"){this.http.addEventListener("result",function(e){var result=e.attr("result");result=eval("("+result+")");config.success.call(null,result)})}if(config.error&&typeof config.error=="function"){this.http.addEventListener("fault",config.error)}};iMap.http.Http.prototype.send=function(a){var b;if(a){b=a}else{b={}}b.timeId=new Date().getTime();this.http.send(b)};iMap.net={};iMap.net.Socket=function(a){this.host=Ao.attr(a,"host");this.port=Ao.attr(a,"port",0);this.socket=Ao.$("flash.net.Socket");this.databack=Ao.attr(a,"databack");this.lineback=Ao.attr(a,"lineback");this.lineSuffix=Ao.attr(a,"lineSuffix","\r\n");this.charSet=Ao.attr(a,"charSet","utf-8");this.errback=Ao.attr(a,"errback");this.connback=Ao.attr(a,"connback");this.closeback=Ao.attr(a,"closeback")};iMap.net.Socket.prototype.connect=function(){var a="";var c=function(d){console.log(d)};if(this.closeback){this.socket.addEventListener("close",this.closeback)}if(this.connback){this.socket.addEventListener("connect",this.connback)}if(this.errback){this.socket.addEventListener("ioError",this.errback);this.socket.addEventListener("securityError",this.errback)}var b=this;this.socket.addEventListener("socketData",function(j){while(this.attr("bytesAvailable")){var f=[];while(this.attr("bytesAvailable")){f.push(this.readMultiByte(this.attr("bytesAvailable"),b.charSet))}if(b.databack){b.databack.call(null,f.join(""))}if(b.lineback){a+=f.join("");var g=a.split(new RegExp(b.lineSuffix,"g"));var d=g.length;a=g.splice(d-1);for(var h=0;h<g.length;h++){b.lineback.call(null,g[h])}}}});this.socket.connect(this.host,this.port)};iMap.net.Socket.prototype.close=function(a){this.socket.close()};iMap.net.Socket.prototype.send=function(a){var b=Ao.$("flash.utils.ByteArray");b.writeUTFBytes(a);this.socket.writeBytes(b);this.socket.flush()};var GeometryService=function(d){this.url=d;this.methods=[];var b=this;var e=function(g){return Ao.$("mx.rpc.http.HTTPService")(g)};var a=function(j){var g=j.methods;for(var h=0;h<g.length;h++){var k=g[h];b[k]=function(m,n){var l=b.url+"/"+arguments.callee.methodname;var i=e({url:l,method:"POST",error:f,success:function(o){var p=AgsGeo.fromGeoJSON(o);n.call(null,p)}});i.send(m)};b[k]["methodname"]=k}};var f=function(){alert("GeometryService请求错误!")};var c=Ao.$("mx.rpc.http.HTTPService",{url:this.url});c.send({f:"json"})};iMap.extend({glintPoint:function(j,h,d){var f=iMap.MapPoint({x:j,y:h});var i=iMap.SimpleLineSymbol({color:16711680,width:4});var e=iMap.SimpleMarkerSymbol({style:"circle",alpha:0,color:16777215,size:30,outline:i});var c=iMap.SimpleMarkerSymbol({style:"circle",alpha:0,color:16777215,size:20,outline:i});var a=iMap.Graphic({symbol:e,geometry:f});map.clientLayer.add(a);var g=0;var b=setInterval(function(){if(g==0){a.attr("symbol",c);g=1}else{a.attr("symbol",e);g=0}},500);if(d!=-1){setTimeout(function(){clearInterval(b);map.clientLayer.remove(a)},d)}return a}});iMap.widget={};iMap.widget.Widget=function(){var b=function(c){return typeof c==="function"?c:null};var a=arguments[0]||{};this.id=a.id;this.init=b(a.init);this.position=a.position;this.width=a.width||200;this.height=a.height||"auto";this.configData=null;this.map=null;this.title=a.title;this.$=null;this.view=a.view;this.config=a.config;this.draggable=a.draggable||false;this.check=a.check||false;this.show=function(){this.$.show();return this};this.hide=function(){this.$.hide();return this};this.destroy=function(){this.$.empty().remove();iMap.widget.WidgetManager._container.removeData("wgt_"+this.id)};this.toString=function(){return"[iMap.widget.Widget]"}};iMap.widget.WidgetManager=function(){};iMap.widget.WidgetManager.map=null;iMap.widget.WidgetManager.widgetStore=null;iMap.widget.WidgetManager.wgtTplStore=null;iMap.widget.WidgetManager.containDOM="widgetContainer";iMap.widget.WidgetManager.dragRegion="body";iMap.widget.WidgetManager.loadWidget=function(wgt,tpl,callback){var wgtMgr=iMap.widget.WidgetManager;var wgtCtnDOM=wgtMgr.containDOM;if($("#"+wgtCtnDOM).length==0){wgtMgr.map.jq.append($("<div id='"+wgtCtnDOM+"'/>").css("position","absolute").css("top",0).css("left",0))}var widget,viewUrl="/view.html",dataUrl="/config.js",wgtUrl="/control.js",wgtCtn=$("#"+wgtCtnDOM),wgtTplId=tpl||"default",widgetUrl,widgetId=wgt,wgtTplUrl,wgtCachePrefix="wgt_",TplCtnClass="widget-main",wgtplLoadingPrefix="tplLoading_",wgtplCachePrefix="wgtpl_",wgtQueue="wgtQueue_"+wgt,dragRegion=wgtMgr.dragRegion,configURL,viewURL;wgtMgr._container=wgtCtn;if(wgtCtn.data(wgtCachePrefix+wgt)){var widget=wgtMgr.getWidget(wgt);widget.show();widget.$.trigger("show",[widget.$,widget]);return}var onCtrlLoaded=function(data){eval("var cb = "+data);widget=cb.call(wgtMgr.map);widget.id=widgetId;configURL=widget.config||(widgetUrl+dataUrl);viewURL=widget.view||(widgetUrl+viewUrl);wgtCtn.dequeue(wgtQueue)};var onViewLoaded=function(html){widget.$=wgtCtn.data(wgtplCachePrefix+wgtTplId).clone(true);var wgtMain=widget.$.find("."+TplCtnClass);if(wgtMain.length===0){var temp=$("<div class='"+TplCtnClass+"'/>");widget.$.append(temp);wgtMain=temp}wgtMain.empty().append($(html));wgtCtn.append(widget.$.css("z-index",999));widget.$.attr("id","widget-"+widget.id);widget.$.trigger("tplAdd",[widget.$,widget]);widget.$.trigger("show",[widget.$,widget]);var p=widget.position||"0";var w=widget.width;var h=widget.height;widget.$.width(w).height(h).position({of:dragRegion,my:"left top",at:"left top",offset:p});var ch=h-widget.$.find(".widget-title").height()-parseInt(wgtMain.css("padding-top"))-parseInt(wgtMain.css("padding-bottom"));wgtMain.height(ch);wgtCtn.dequeue(wgtQueue)};var onDataLoaded=function(data){var config;try{config=eval("("+data.replace(/{widget}/,widgetUrl)+")")[0]}catch(e){config=null}widget.configData=config;if(typeof widget.init=="function"){widget.init.call(widget)}wgtCtn.data(wgtCachePrefix+wgt,widget);if(typeof callback=="function"){callback.call(widget)}wgtCtn.dequeue(wgtQueue)};var getCtrl=function(){$.get(widgetUrl+wgtUrl,onCtrlLoaded)};var getView=function(){$.get(viewURL,onViewLoaded)};var getConf=function(){$.get(configURL,onDataLoaded)};var getWgtTpl=function(){var exsit=wgtCtn.data(wgtplCachePrefix+wgtTplId);if(exsit){wgtCtn.dequeue(wgtQueue);return}else{if(wgtCtn.data(wgtplLoadingPrefix+wgtTplId)){wgtCtn.bind("tplLoaded",function(e,d){if(d===wgtTplId){wgtMgr.loadWidget(wgt,wgtTplId,callback)}});return}else{var temp=!wgtMgr.wgtTplStore?wgtMgr.map.baseurl+"widgetTpl":wgtMgr.wgtTplStore;wgtTplUrl=temp.replace(/\/+$/,"")+"/"+wgtTplId.replace(/\/+$/,"")}}$.get(wgtTplUrl+viewUrl,function(tpl){$.get(wgtTplUrl+wgtUrl,function(data){eval("var cb = "+data);widget=cb.call(wgtMgr.map,wgtMgr);widget.$=$(tpl).addClass("imap-widget");if(typeof widget.init=="function"){widget.init.call(widget.$)}wgtCtn.data(wgtplCachePrefix+wgtTplId,widget.$);wgtCtn.data(wgtplLoadingPrefix+wgtTplId,false);wgtCtn.trigger("tplLoaded",wgtTplId);wgtCtn.dequeue(wgtQueue)})});wgtCtn.data(wgtplLoadingPrefix+wgtTplId,true)};var temp=!wgtMgr.widgetStore?wgtMgr.map.baseurl+"widgets":wgtMgr.widgetStore;widgetUrl=temp.replace(/\/+$/,"")+"/"+widgetId.replace(/\/+$/,"");wgtCtn.queue(wgtQueue,[getWgtTpl,getCtrl,getView,getConf]);wgtCtn.dequeue(wgtQueue)};iMap.widget.WidgetManager.getWidget=function(a){return iMap.widget.WidgetManager._container.data("wgt_"+a)};iMap.util={};iMap.util.GeoUtil=function(){};iMap.util.GeoUtil.getCoord=function(h){var b=arguments.callee;if(h instanceof AsObject){var g=h.attr("type");var f=[];if(g==="esriGeometryPoint"){f=[h.attr("x"),h.attr("y")]}else{if(g==="esriGeometryPolyline"){var l=h.attr("paths");for(var e=0;e<l.length;e++){var m=[];for(var d=0;d<l[e].length;d++){var a=l[e][d];m.push(b.call(null,a))}f.push(m)}}else{if(g==="esriGeometryPolygon"){var k=h.attr("rings");for(var e=0;e<k.length;e++){var c=[];for(var d=0;d<k[e].length;d++){var a=k[e][d];c.push(b.call(null,a))}f.push(c)}}}}return f}};iMap.util.GeoUtil.Geo2GeoJSON=function(d){if(d instanceof AsObject){var e=iMap.util.GeoUtil.getCoord(d);var c={type:iMap.util.GeoUtil.typeMap[d.attr("type")],coordinates:e};var b={geometry:c};var a=Ao.$("#com.esri.ags.utils.JSON").encode(b);a=a.replace(/\"/g,"'");return a}};iMap.util.GeoUtil.Gra2GeoJSON=function(g){if(g instanceof AsObject){var a=g.attr("attributes");var e=g.attr("geometry");var f=iMap.util.GeoUtil.getCoord(e);var d={type:iMap.util.GeoUtil.typeMap[e.attr("type")],coordinates:f};var c={type:"Feature",geometry:d,properties:a};var b=Ao.$("#com.esri.ags.utils.JSON").encode(c);b=b.replace(/\"/g,"'");return b}};iMap.util.GeoUtil.GeoJSON2Geo=function(k){if(typeof k==="object"){var e;var d=k.geometry["type"];switch(d){case"Point":e=iMap.MapPoint({x:k.geometry["coordinates"][0],y:k.geometry["coordinates"][1]});break;case"LineString":var l=[];var g=k.geometry["coordinates"];for(var c=0;c<g.length;c++){var m=[];for(var b=0;b<g[c].length;b++){var h=iMap.MapPoint({x:k.geometry["coordinates"][c][b][0],y:k.geometry["coordinates"][c][b][1]});m.push(h)}l.push(m)}e=iMap.Polyline({paths:l});break;case"Polygon":var f=[];var g=k.geometry["coordinates"];for(var c=0;c<g.length;c++){var a=[];for(var b=0;b<g[c].length;b++){var h=iMap.MapPoint({x:k.geometry["coordinates"][c][b][0],y:k.geometry["coordinates"][c][b][1]});a.push(h)}f.push(a)}e=iMap.Polygon({rings:f});break;default:break}return e}};iMap.util.GeoUtil.GeoJSON2Gra=function(k){if(typeof k==="object"){var e;var d=k.geometry["type"];switch(d){case"Point":e=iMap.MapPoint({x:k.geometry["coordinates"][0],y:k.geometry["coordinates"][1]});break;case"LineString":var l=[];var g=k.geometry["coordinates"];for(var c=0;c<g.length;c++){var m=[];for(var b=0;b<g[c].length;b++){var h=iMap.MapPoint({x:k.geometry["coordinates"][c][b][0],y:k.geometry["coordinates"][c][b][1]});m.push(h)}l.push(m)}e=iMap.Polyline({paths:l});break;case"Polygon":var f=[];var g=k.geometry["coordinates"];for(var c=0;c<g.length;c++){var a=[];for(var b=0;b<g[c].length;b++){var h=iMap.MapPoint({x:k.geometry["coordinates"][c][b][0],y:k.geometry["coordinates"][c][b][1]});a.push(h)}f.push(a)}e=iMap.Polygon({rings:f});break;default:break}return iMap.Graphic({geometry:e,attributes:k.properties})}};iMap.util.GeoUtil.typeMap={esriGeometryPoint:"Point",esriGeometryPolyline:"LineString",esriGeometryPolygon:"Polygon"};iMap.extend({print:function(b){var a=Ao.$("mx.printing.FlexPrintJob");if(a.start()!=true){return}a.addObject(map.AS,b||"none");a.send()},navi:function(a){if(a=="next"){this.getNaviTool().zoomToNextExtent()}else{if(a=="prev"){this.getNaviTool().zoomToPrevExtent()}else{if(a==null){this.getNaviTool().deactivate()}else{this.getNaviTool().activate(a,true)}}}return this},draw:function(d,b,c){var a=arguments.callee;if(!d){this.getDrawTool().deactivate()}else{this.getDrawTool().activate(d,true)}if(b){if(a.drawEndHandler){this.getDrawTool().removeEventListener("drawEnd",a.drawEndHandler)}a.drawEndHandler=b;this.getDrawTool().addEventListener("drawEnd",b)}if(c){if(a.drawStartHandler){this.getDrawTool().removeEventListener("drawStart",a.drawStartHandler)}a.drawStartHandler=c;this.getDrawTool().addEventListener("drawStart",c)}return this},drawGraphic:function(g,e,d){var c=arguments.callee;if(!g){this.getDrawTool().deactivate()}else{var b=AsObject.attr(d,"style","solid");var a=AsObject.attr(d,"color",16777215);var f=AsObject.attr(d,"alpha",1);var d=iMap.SimpleFillSymbol({style:b,color:a,alpha:f});this.getDrawTool().attr({fillSymbol:d});this.getDrawTool().activate(g,true)}if(e){if(c.drawEndHandler){this.getDrawTool().removeEventListener("drawEnd",c.drawEndHandler)}c.drawEndHandler=function(j){var i=j.attr("graphic");var h=iMap.util.GeoUtil.Gra2GeoJSON(i);e(h,i)};this.getDrawTool().addEventListener("drawEnd",c.drawEndHandler)}return this},edit:function(a){if(a instanceof AsObject){this.getEditTool().activate(3,[a])}return this},add:function(f,b,d,h){var j=this;var g=d;var e=function(m){j.getDrawTool().removeEventListener("drawEnd",e);c();var k=m.attr("graphic.geometry");var l=j.add(k,b,g);if(h){h.call(j,l)}};var c=function(){j.getDrawTool().deactivate();j.getEditTool().deactivate();j.getNaviTool().deactivate()};if(typeof(f)=="string"){c();var i=["point","polyline","polygon"].indexOf(f);switch(i){case -1:j.getDrawTool().activate("mappoint");break;case 0:j.getDrawTool().activate("mappoint");break;case 1:j.getDrawTool().activate("polyline");break;case 2:j.getDrawTool().activate("polygon");break}j.getDrawTool().addEventListener("drawEnd",e)}else{if(f instanceof AsObject){var a=iMap.Graphic();a.attr({geometry:f,symbol:b,attributes:d});j.clientLayer.add(a);return a}}},toScreen:function(b){var c=iMap.MapPoint({x:b.x,y:b.y});var a=this.AS.toScreen(c);return{x:a.attr("x"),y:a.attr("y")}}});iMap.extend({extent:function(f){var b=this;if(arguments.length==0){var g=b.AS.attr("extent.xmin");var e=b.AS.attr("extent.ymin");var d=b.AS.attr("extent.xmax");var a=b.AS.attr("extent.ymax");return[g,e,d,a]}else{var c=iMap.Extent({xmin:f[0],ymin:f[1],xmax:f[2],ymax:f[3]});b.AS.attr({extent:c});return this}},centerAt:function(a,d){var b=this;var c=iMap.MapPoint({x:a[0],y:a[1]});b.AS.centerAt(c);if(typeof d==="number"){b.AS.attr({level:d})}return this},addLayer:function(a){var b=iMap.YhDynamicLayer({url:a.url||null,where:a.where||null,outFields:a.outFields||[],mode:a.mode||"multi",showBusy:a.showBusy||false});this.AS.addLayer(b);return b},deactivateAllMode:function(){this.getNaviTool().deactivate();this.getDrawTool().deactivate();this.getEditTool().deactivate();return this},setYhMode:function(f,g,c){this.deactivateAllMode();var b=this;var a=function(i){var h=i.attr("graphic.geometry.x");var j=i.attr("graphic.geometry.y");g.call(b,[h,j]);b.getDrawTool().removeEventListener("drawEnd",a);b.deactivateAllMode()};var e=function(h){if(g){g.call(b,h)}b.getDrawTool().removeEventListener("drawEnd",d)};var d=function(j){var i=j.attr("graphic.geometry");var h=b.AS.getLayer(c);h.query(i,e);b.deactivateAllMode()};if(f=="mark"){this.getDrawTool().activate("mappoint",true);this.getDrawTool().addEventListener("drawEnd",a)}return this}});iMap.extend({addOvMap:function(b){var a=this.application.attr("moduleTool");a.addModule("OverMap",b)},removeOvMap:function(){var a=map.application.attr("moduleTool").getModule("OverMap");a.attr("visible",false)}});iMap.extend({addBaseLayer:function(b,a){map.layerTool.load(b,a);map.clientLayer=map.layerTool.attr("clientLayer")},setToggleVisible:function(b){var a=this.application.attr("moduleTool").getModule("LayerToggle");a.attr("visible",b)},addLayerToggle:function(b){var a=this.application.attr("moduleTool");a.addModule("LayerToggle",b)}});iMap.extend({query:function(b,d,f,a,e,c){if(typeof b==="function"){return this.layerTool.query(this.clientLayer,b,d,f,a,e)}return this.layerTool.query(b,d,f,a,e,c)},identify:function(b,f,d){var a=this;var c=arguments.callee;if(c.clustered===true){a.layerTool.attr("clustered",true)}else{a.layerTool.attr("clustered",false)}var g=function(k){var h=k.attr("identifyGraphic.attributes");var j=k.attr("identifyGraphic.geometry");var i;if(j.attr("type")=="esriGeometryPoint"){i=a.AS.toScreen(j)}else{var l=j.attr("extent.center");i=a.AS.toScreen(l)}return{screenXY:{x:i.attr("x"),y:i.attr("y")},attributes:h}};if(f&&typeof f==="function"){if(c.lyr_identify_over_Handler){this.layerTool.removeEventListener("lyr_identify_over",c.lyr_identify_over_Handler)}c.lyr_identify_over_Handler=function(h){f.call(h.attr("identifyGraphic"),g(h))};this.layerTool.addEventListener("lyr_identify_over",c.lyr_identify_over_Handler)}if(d&&typeof d==="function"){if(c.lyr_identify_click_Handler){this.layerTool.removeEventListener("lyr_identify_click",c.lyr_identify_click_Handler)}c.lyr_identify_click_Handler=function(h){d.call(h.attr("identifyGraphic"),g(h))};this.layerTool.addEventListener("lyr_identify_click",c.lyr_identify_click_Handler)}var e=iMap.SimpleMarkerSymbol({alpha:false});b.attr("symbol",e);this.layerTool.activate(b,"point");return this}});iMap.extend({distance:function(){var i=this;var c=arguments.callee;var d=arguments[0]?arguments[0]:function(){};var g=function(o){var m=o.attr("graphic");map.clientLayer.add(m);var q=o.attr("graphic.geometry");var k=c.call(i,d,q);d(k);var n;if(k<1000){k=Math.round(k*100)/100;n=k+"米"}else{k=Math.round(k/1000*100)/100;n=k+"千米"}var u=q.attr("paths")[0];var s=u[u.length-1];var t=iMap.PictureMarkerSymbol({source:map.baseurl+"css/cancel.png",xoffset:15});var r=iMap.TextSymbol({color:16711680,border:true,borderColor:16711680,background:true,backgroundColor:16777215,yoffset:-22,htmlText:"<font size='15'><b>总长:"+n+"</b></font>"});var l=iMap.CompositeSymbol({symbols:[t,r]});var j=iMap.Graphic({geometry:s,symbol:l,toolTip:"删除此测距"});var p=function(){map.clientLayer.remove(m);map.clientLayer.remove(j);j.removeEventListener("click",p)};j.addEventListener("click",p);map.clientLayer.add(j);this.removeEventListener("drawEnd",arguments.callee);i.draw()};if(arguments.length<2){i.deactivateAllMode();i.getDrawTool().attr({showDrawTips:false});var h=iMap.SimpleLineSymbol({color:"0xff0000",width:2});var e=iMap.SimpleMarkerSymbol({style:"circle",color:"0xFFFFFF",size:8,outline:h});var a=iMap.SimpleLineSymbol({color:"0xff0000",width:2.5});var b=iMap.CompositeSymbol({symbols:[a,e]});i.getDrawTool().attr("lineSymbol",b);i.draw("polyline",g)}else{if(arguments.length>1&&arguments[1] instanceof AsObject&&arguments[1].klass==="Polyline"){var f=i.AS.attr("spatialReference.wkid");if(f==102113){arguments[1]=AsObject.$("#com.esri.ags.utils.WebMercatorUtil").webMercatorToGeographic(arguments[1])}return AsObject.$("#com.esri.ags.utils.GeometryUtil").geodesicLengths([arguments[1]],"esriMeters")}}},area:function(){var c=this;var f=arguments.callee;var g=arguments[0]?arguments[0]:function(){};var d=function(m){var l=m.attr("graphic");l.attr("autoMoveToTop",false);map.clientLayer.add(l);var o=m.attr("graphic.geometry");var i=f.call(c,g,o);g(i);var j;if(i<1000000){i=Math.round(i*100)/100;j=i+"平方米"}else{i=Math.round(i/1000000*100)/100;j=i+"平方千米"}var q=o.attr("rings")[0];var r=q[q.length-2];var s=iMap.PictureMarkerSymbol({source:map.baseurl+"css/cancel.png",xoffset:15});var p=iMap.TextSymbol({color:16711680,border:true,borderColor:16711680,background:true,backgroundColor:16777215,yoffset:-22,htmlText:"<font size='15'><b>总面积:"+j+"</b></font>"});var k=iMap.CompositeSymbol({symbols:[s,p]});var h=iMap.Graphic({geometry:r,symbol:k,toolTip:"删除此测面"});var n=function(){map.clientLayer.remove(l);map.clientLayer.remove(h);h.removeEventListener("click",n)};h.addEventListener("click",n);map.clientLayer.add(h);this.removeEventListener("drawEnd",arguments.callee);c.draw()};if(arguments.length<2){c.deactivateAllMode();c.getDrawTool().attr({showDrawTips:false});var a=iMap.SimpleLineSymbol({color:"0xff3300",width:2});var b=iMap.SimpleFillSymbol({color:16755200,alpha:0.6,outline:a});c.getDrawTool().attr("fillSymbol",b);c.draw("polygon",d)}else{if(arguments.length>1&&arguments[1] instanceof AsObject&&arguments[1].klass==="Polygon"){var e=c.AS.attr("spatialReference.wkid");if(e==102113){arguments[1]=AsObject.$("#com.esri.ags.utils.WebMercatorUtil").webMercatorToGeographic(arguments[1])}return AsObject.$("#com.esri.ags.utils.GeometryUtil").geodesicAreas([arguments[1]],"esriSquareMeters")}}}});iMap.extend({addTrace:function(b,d,a,g,h,i){var f=this.application.attr("traceTool");var c;if(typeof(a)!="undefined"&&!(!a&&a!=0)){f.attr("traceTime",a)}if(typeof(g)!="undefined"&&!(!g&&g!=0)){f.attr("traceLength",g)}if(typeof(h)!="undefined"&&!(!h&&h!=0)){f.attr("carImageSouce",h)}if(d&&typeof d==="function"){if(c){f.removeEventListener("trace_run",c)}c=function(j){d(j.attr("runGraphic"))};f.addEventListener("trace_run",c)}if(typeof(i)!="undefined"&&!(!i&&i!=0)){f.attr("refreshTime",i)}var e=f.addTrace(b);return e},stopTrace:function(){var a=this.application.attr("traceTool");a.stopTrace()},configTrace:function(){}});