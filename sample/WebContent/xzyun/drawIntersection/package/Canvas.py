#coding=UTF-8
import Image,ImageDraw

class Canvas():
	"""docstring for Canvas"""
	def __init__(self,draw):
		# self.draw=draw
		self.draw=draw



	def load(self):
		path=r"G:\intersection\intersection.js"
		js=open(path).read()
		data=json.loads(js)

	def drawline(self,line,fill):
		'''
		画线
		'''
		self.draw.line((line.boundp1,line.boundp2),fill=fill,width=2)  #画双黄线

	def draw_palline(self,line,i,fill):
		'''
		画某条线的平行线
		@line:即其平行线
		'''
		self.draw.line((line.pal_boundp1[i],line.pal_boundp2[i]),fill=fill,width=1)  #画双黄线



	# def save(self,path):
	# 	self.draw.save(0)			
	
#line.boundp1[0],line.boundp1[1],line.boundp2[0],line.boundp2[1]
