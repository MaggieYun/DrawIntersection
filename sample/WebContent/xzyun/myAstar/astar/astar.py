#coding=utf-8
import tornado.ioloop
import tornado.web
import json

class route:
	def __init__(self,points=None,lines=None):
		self.points=points
		self.lines=lines

	def find_best_path(self,start_id,end_id,pointsclass):
		openlist=[]
		closelist=[]
		path=[]	
		nowpoint=None

		start=pointsclass[start_id-1]
		end=pointsclass[end_id-1]
		openlist.append(start)

		for x in pointsclass:
			x.get_neighborpoint(pointsclass)

		flag=True
		while flag:
			nowpoint=self.get_nowpoint(openlist,end)
			closelist.append(nowpoint)
			openlist.remove(nowpoint)
			# nowpoint.get_neighborpoint(pointsclass)

			for x in nowpoint.neighborpoint:
				# x.get_neighborpoint(pointsclass)
				if ((x in closelist) or(len(x.neighborpoint)==1)):
					continue
				elif(not(x in openlist)):
					openlist.append(x)
					x.set_parent(nowpoint)
					x.get_g
					x.get_h(end)
					x.get_f

				elif(x in openlist):
					for i in self.lines:
						if((nowpoint.id==i[0] and x.id==i[1]) or (nowpoint.id==i[1] and x.id==i[0])):
							temp_g=i[3]
							if((nowpoint.g+temp_g)<x.g):
								x.set_parent(nowpoint)
								x.get_g()
								x.get_f()	
							else:
								continue
			if((end in closelist) or (len(openlist)==0)):
				flag=False		
					
		if(end in closelist):
			path=self.loop_parents(end)
		return path
		# return closelist

	def loop_parents(self,end):
		path=[]
		path.append(end)
		while(path[-1].parent!=None):
			path.append(path[-1].parent)	
		return path
		

	def get_nowpoint(self,openlist,end):
		"""
		@param end 终点
		@return 找出开启列表中f值最小的节点，作为当前节点
		"""
		minlen=100000
		nowpoint=None
		for x in openlist:
			x.get_g()
			x.get_h(end)
			x.get_f()
			if(x.f<minlen):
				minlen=x.f
				nowpoint=x					
		return nowpoint

#点类		
class Point:
	def __init__(self,lines=None):
		self.parent = None
		self.g = 0
		self.h = 0
		self.id = 0  
		self.neighborpoint=[] 
		self.lines=lines
		self.paths=[]  #self.parents
		

	def set_id(self,pid):
		self.id = pid

	def set_parent(self,nowpoint):   #   设置父节点
		self.parent=nowpoint

	def get_g(self):
		length=0               #   重新计算该节点的g,h,f值
		if(self.parent==None):
			self.g=0
		else:
			for x in self.lines:
				if((self.id==x[0] and self.parent.id==x[1]) or (self.id==x[1] and self.parent.id==x[0])):
					length=x[3]			
			self.g=self.parent.g+length

	def get_h(self,end):
		length=0
		for x in self.lines:
			if((self.id==x[0] and end.id==x[1]) or (self.id==x[1] and end.id==x[0])):
				length=x[3]
				# print "获取该点g值，对应点和长度"
				# print x,length
		self.h=length

	def get_f(self):
		self.f=self.g+self.h	

	def get_neighborpoint(self,pointsclass):      #     返回的都是可通过的节点对象（未设置单向，双向）    
		for x in self.lines:  
			if(x[2]==True):
				for y in pointsclass:
					if(((self.id==x[0]) and (y.id==x[1]))or((self.id==x[1]) and (y.id==x[2]))):
						self.neighborpoint.append(y)
					else:
						continue	
			else:
				continue	


class MainHandler(tornado.web.RequestHandler):
	def get(self):
		points_str = self.get_argument("points")   #获取已知数据
		lines_str = self.get_argument("lines")
		points = json.loads(points_str)  #转换已知数据
		lines = json.loads(lines_str)

		start_id=1
		end_id=6

		s="a,b,c,d,e,f,z,y,x,m,n,o,p,q".split(",")
		pointsclass=[]            #  存放点类对象（数组内存放类对象）
		for x in points:
			pid=x[2]
			pname=s[pid-1]
			pname=Point(lines)
			pname.set_id(pid)
			pointsclass.append(pname)	

		path = route(points,lines).find_best_path(start_id,end_id,pointsclass)
		'''pt=""
		for x in path:
			# pt += " % d % s" % (x.id,s)
			pt += "%d" % x.id'''
				

		#path = Route(points,lines).run(start,end)
		self.write(",".join(map(lambda point:str(point.id),path)))
		# self.write(json.dumps(lines[0]))

	post = get

application = tornado.web.Application([
	(r"/hello", MainHandler),
	(r"/static/(.*)", tornado.web.StaticFileHandler, {"path": r"f:/route"}),
])

if __name__ == "__main__":
	application.listen(8888)
	tornado.ioloop.IOLoop.instance().start()