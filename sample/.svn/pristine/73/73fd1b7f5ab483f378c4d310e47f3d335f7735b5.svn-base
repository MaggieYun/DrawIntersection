#coding=UTF-8    
class Vertex:
    """
    点类
    """
    def __init__(self, vx, vy):
        self.x = vx
        self.y = vy
        self.segments = []   #包含该节点的路段
        self.parent = None
        self.neighborpoint = []
        self.g = 0

    def set_parent(self, nowpoint):   #   设置父节点,每次g值与父节点直接相关
        self.parent = nowpoint
        if(self.parent == None):
            self.g = 0
        else:    
            self.g = self.parent.g + self.get_distance(self.parent)

    def get_h(self, end):
        self.h = self.get_distance(end)

    def get_f(self):
        self.f = self.g + self.h
        
    def get_neighborpoint(self):      #     返回的都是可通过的节点对象（未设置单向，双向）    
        for x in self.segments:
            y = x.getopsitevtx(self)
            self.neighborpoint.append(y)

                    


    
    def get_x(self):
        return self.x

    def get_y(self):
        return self.y    

    def ifclose(self, othervtx, value):
        if(value > 0):
            buffdistance = value
        else:
            buffdistance = 0
        if(self.get_distance(othervtx) <= buffdistance):
            return True
        else:
            return False    

    def get_distance(self, othervtx):
        """
        计算两点之间的距离
        """
        xdis = (self.get_x() - othervtx.get_x()) ** 2;    #这种方法是否不妥，两个点的实例对象（点对象内涉及另一个实例对象）
        ydis = (self.get_y() - othervtx.get_y()) ** 2;
        return (xdis + ydis) ** 0.5

    def ifequal(self, othervtx):
        if(self.get_x() == othervtx.get_x() and self.get_y() == othervtx.get_y()):
            return True
        else:
            return False    

    def  addSegment(self, segment):
        self.segments.append(segment)
