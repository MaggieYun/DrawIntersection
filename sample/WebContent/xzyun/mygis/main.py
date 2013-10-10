#coding=UTF-8 
from package.layer import *
import tornado.ioloop
import tornado.web
import cStringIO
import os

try:
	import json
except ImportError:
	import simplejson as json
		

def get_roads():
	"""
	获取源数据
	"""
	# roadurl="http://172.16.60.32/route/road.js"      
	# roadurl=r"f:\xunlu\resources\javascript\road.js"
	path = os.path.dirname(__file__)
	roadurl = os.path.join(path, r"resources\road.js")
	print "roadurl:", roadurl

	js = open(roadurl).read()           #从本地文件夹中读取现成的路网数据
	# js=urllib.urlopen(roadurl).read()  #从网页读取现成的路网数据
	js = js.replace("var roads =", "")
	js = js.replace(";", "")
	roads = json.loads(js)
	return roads   


class MainHandler(tornado.web.RequestHandler):
	def get(self):
		u_size=self.get_argument("size").split(",")   #待有空验证是否需要json.loads
		u_bbox=self.get_argument("bbox").split(",")

		size=map(lambda x:int(x),u_size)
		bbox=map(lambda x:float(x),u_bbox)		
		data=get_roads()

		layer=Layer(data,size,bbox)
		io = cStringIO.StringIO()  
		im=layer.export()
#		im.save(r"G:\xunlu\roads.png", "png")  #将生成的路网保存一份在本地以便查看
		im.save(io, "PNG")
		self.set_header("Content-Type", "image/png")
		self.write(io.getvalue())
		
	post = get

application = tornado.web.Application([
	(r"/road", MainHandler),
	(r"/static/(.*)", tornado.web.StaticFileHandler, {"path": os.path.dirname(__file__)}),
])	


if __name__ == '__main__':
	application.listen(8888)
	tornado.ioloop.IOLoop.instance().start()	
