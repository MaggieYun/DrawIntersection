#coding=UTF-8  
import tornado.ioloop
import tornado.web
import cStringIO
import Image, ImageDraw

class Layer():
	'''
	'''
	def __init__(self,data,size,bbox):
		'''
		@param data:地图数据源
		@param size 2-list [width,height]:网页上显示图片的div长宽
		@param bbox 4-list [xmin,ymin,xmax,ymax]:地理范围
		'''
		self.data=data
		self.size=size
		self.bbox=bbox

		
	def gemtry_to_screen(self, point):
		"""
		@param point: 2-list 二元列表，存放的是点位的xy坐标
		"""   
		scale=self.size[0]/(self.bbox[2]-self.bbox[0])            
		screenX = int(scale * (point[0] - self.bbox[0]))
		screenY = int(scale * (self.bbox[3] - point[1]))
		return [screenX, screenY]


	def export(self):
		'''
		出图
		'''
		im = Image.new("RGBA", (self.size[0], self.size[1]), "#f4f3ef")
		draw = ImageDraw.Draw(im)
		for x in self.data:
			road = x                             #获取某条路
			paths = road["G"]["polyline"]        #获取某条路的各个路段
			attributes = road["A"]               #获取某条路的属性
			for y in paths:                    #遍历路的各个分支
				path = y
				for i in range(len(path) - 1):   #获取路径上相邻两节点
					first = self.gemtry_to_screen(path[i])
					second = self.gemtry_to_screen(path[i + 1])
					draw.line(((first[0], first[1]), 
						(second[0], second[1])), fill=(0, 0, 0))
		return im
		




	

