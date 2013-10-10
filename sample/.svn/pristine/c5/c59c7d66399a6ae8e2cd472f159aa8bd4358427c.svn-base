#coding=UTF-8
from package.astar.Segment import *
from package.astar.Vertex import *

class Network():
    """
    路网
    """
    def __init__(self, roads):
        self.vertex = []   #包含的节点的索引
        self.segments = []
        self.roads = roads

    def parse(self):
        """
        获取路网的各项数据信息
        """
        for x in self.roads:
            road = x                             #获取某条路
            paths = road["G"]["polyline"]        #获取某条路的各个路段
            attributes = road["A"]               #获取某条路的属性
            for y in paths:                    #遍历路的各个分支
                path = y
                for i in range(len(path) - 1):   #获取路径上相邻两节点
                    first = path[i]
                    second = path[i + 1]
                    firstvertex = Vertex(first[0], first[1])
                    secondvetex = Vertex(second[0], second[1])

                    firstvertex = self.addvtx_to_network(firstvertex)   #将节点添加进network
                    secondvetex = self.addvtx_to_network(secondvetex);

                    segment = Segment(firstvertex, secondvetex)
                    segment.setAttributes(attributes)

                    self.add_segments(segment)

                    firstvertex.addSegment(segment)
                    secondvetex.addSegment(segment)


    def add_segments(self, segment):
        self.segments.append(segment)

    def checkifpointexist(self, othervtx):
        vertex_size = len(self.vertex)   #网络数据（network）中已经存在的节点的数目
        for x in self.vertex:
            if(x.ifclose(othervtx, 5)):  #如果两点靠近(距离小于5)，返回这个点本身
                return x
        return False                    #默认点尚不存在于network的节点中    

    def addvtx_to_network(self, othervtx): 
        """
        将点添加至network
        """
        vertex_size = len(self.vertex)
        if(vertex_size == 0):               #第一个点
            self.vertex.append(othervtx)
            return othervtx
        else:
            for x in self.vertex:
                exist = self.checkifpointexist(othervtx)
                if(exist):
                    return exist
                else:
                    self.vertex.append(othervtx)
                    return othervtx        
