#coding=UTF-8
import math
class Point:
    def __init__(self,x,y):
        self.x = x
        self.y = y
    
    def move(self,angle,dis):
        '''
        按角度和距离移动点
        @param angle 角度(弧度为单位)
        @param dis 距离
        @return: 新的点位
        '''
        x = self.x + dis * math.cos(angle)
        y = self.y + dis * math.sin(angle)
        return Point(x,y)