#coding=UTF-8
from package.astar.Network import *
from package.astar.Route import *
from package.astar.Segment import *
from package.astar.Vertex import *

from package.drawMap.Convert import *
from package.drawMap.DrawRoads import *

import tornado.ioloop
import tornado.web
import cStringIO

try:
    import json
except ImportError:
    import simplejson as json

def get_roads():
    """
    获取源数据： 获取存在url地址上的道路数据，js形式转化为python可以
    处理的数组形式（字典组成的数组）
    """

    # roadurl="http://172.16.60.32/route/road.js"      
    # roadurl=r"f:\xunlu\resources\javascript\road.js"
    path = os.path.dirname(__file__)
    roadurl = os.path.join(path, r"resources\javascript\road.js")
    print "roadurl:", roadurl
    
    js = open(roadurl).read()           #从本地文件夹中读取现成的路网数据
    # js=urllib.urlopen(roadurl).read()  #从网页读取现成的路网数据
    js = js.replace("var roads =", "")
    js = js.replace(";", "")
    roads = json.loads(js)
    return roads   
	
	
#全局变量，只需初始化一次，始终保持不变
roads=get_roads()
#全局变量，保存每一次的范围（size暂时只用到955,600，所以不设置）
_bbox=(13426192.883026948,3671416.5248470777,13430755.218152719,3674282.9134077714)

class MainHandler(tornado.web.RequestHandler):
	def get(self):
		global _bbox
		_bbox=(13426192.883026948,3671416.5248470777,13430755.218152719,3674282.9134077714)
		io = cStringIO.StringIO()  
		im=DrawRoads(roads,(955,600),_bbox).draw_basemap()
#		im.save(r"G:\xunlu\roads.png", "png")  #将生成的路网保存一份在本地以便查看
		im.save(io, "PNG")
		self.set_header("Content-Type", "image/png")
		self.write(io.getvalue())
		
	post = get


class PathHandler(tornado.web.RequestHandler):
	def get(self):
		startid_str = self.get_argument("startid")  #从页面获取寻路的起点和终点的索引
		endid_str = self.get_argument("endid")
		start_id = int(json.loads(startid_str)) #转换已知数据
		end_id = int(json.loads(endid_str))

		impath=DrawRoads(roads,(955,600),_bbox).drawBesPath(start_id,end_id)
		
		io = cStringIO.StringIO()
#		impath.save(r"G:\xunlu\bestpath.png", "png")
		impath.save(io, "PNG")
		
		self.set_header("Content-Type", "image/png")
		self.write(io.getvalue())
		# self.write(best)

	post = get		
	
class ExtentHandler(tornado.web.RequestHandler):
	def get(self):
		centerX_str=self.get_argument("centerX")   #待有空验证是否需要json.loads
		centerY_str=self.get_argument("centerY")
		lengthX_str=self.get_argument("lengthX")
		lengthY_str=self.get_argument("lengthY")

		centerX=int(json.loads(centerX_str))
		centerY=int(json.loads(centerY_str))
		lengthX=int(json.loads(lengthX_str))
		lengthY=int(json.loads(lengthY_str))

		print "centerX,centerY:",centerX,centerY
		print "lengthX,lengthY:",lengthX,lengthY

		#屏幕坐标转换为地理坐标
		if (lengthX/lengthY)>(955/600):
			lengthY=600*lengthX/955
			print "x"
		else:
			lengthX=955*lengthY/600	
			print "y"
		print "lengthX,lengthY:",lengthX,lengthY
		
		global _bbox
		convert=Convert((955,600),_bbox)
			
		xmin,ymin=convert.screen_to_gemtry(centerX-0.5*lengthX,centerY+0.5*lengthY)
		xmax,ymax=convert.screen_to_gemtry(centerX+0.5*lengthX,centerY-0.5*lengthY)
#		scale=955/(_xmax-_xmin)
#		print _xmin,_ymin,_xmax,_ymax,_scale
		_bbox=(xmin,ymin,xmax,ymax)
		print "_bbox:",_bbox
		io = cStringIO.StringIO()  
		im=DrawRoads(roads,(955,600),_bbox).draw_basemap()
		im.save(io, "PNG")
		self.set_header("Content-Type", "image/png")
		self.write(io.getvalue())	
	
	post=get	

application = tornado.web.Application([
	(r"/road", MainHandler),
	(r"/bestpath", PathHandler),
	(r"/newmap", ExtentHandler),
	(r"/static/(.*)", tornado.web.StaticFileHandler, {"path": os.path.dirname(__file__)}),
])	


if __name__ == '__main__':
	application.listen(8888)
	tornado.ioloop.IOLoop.instance().start()
