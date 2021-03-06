class Segment:
    'Class about a line segment:直线类'

    def __init__(self, x1 = 0, y1 = 0, x2 = 0, y2 = 0):
        self.x1 = x1
        self.y1 = y1
        self.x2 = x2
        self.y2 = y2
                
    def k(self):
        '''求直线斜率'''
        if self.x1 == self.x2:
            self.k = 'None'
        else:
            self.k = (self.y2 - self.y1) / (self.x2 * 1.0 - self.x1)
        return self.k

    def b(self):
        '''求直线截距'''
        if self.x1==self.x2:
            self.b=0
        else:
            self.b=(self.x1*self.y2-self.x2*self.y1)/(self.x1-self.x2)

    def get_parallel(self,yoffset=10):   #向上（y轴正方向）平移yoffset为正，向下平移，yoffset为负值(尚未考虑斜率不存在的问题)
        '''求直线平行线
        @yoffset:偏离y轴的距离（带符号）
        '''
        b=self.b+yoffset
        k=self.k
        return[k,b]

    def get_vertical(self,b=40):
        '''求直线的垂线
        @b:垂线的截距，给定值（带符号，根据direction坐标所在的象限决定） 
        '''    
        k = 0 - self.k
        b = b
        return [k,b]

 

# LingeSegment1 = Segment(0, 0, 3, 4)
# print 'Line k is: ', LingeSegment1.k()