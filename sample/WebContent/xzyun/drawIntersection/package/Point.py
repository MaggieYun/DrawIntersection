#coding=UTF-8
class Point:
	def __init__(self,x,y):
		self.x = x
		self.y = y

	def offset(self,x,y):
		'''
		平移坐标（将所有坐标平移到以center为原点的坐标系中）
		@offsetX
		@offsetY
		'''
		return Point(self.x + x,self.y + y)
	
	def move(self,angle,dis):
		'''
		按角度和距离移动点
		@param angle 角度
		@param dis 距离
		@return: 新的点位
		'''
		x = dis * math.cos(angle*math.pi/180)
		y = dis * math.sin(angle*math.pi/180)
		return self.offset(x,y)