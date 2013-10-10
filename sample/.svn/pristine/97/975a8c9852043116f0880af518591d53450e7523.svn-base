#coding=UTF-8
import Image, ImageDraw
import os

from package.astar.Network import *
from package.astar.Route import *
from package.astar.Segment import *
from package.astar.Vertex import *
from package.drawMap.Convert import *

class DrawRoads(): 
    '''
          绘制底图和最佳路径
    ''' 
    def __init__(self,roads,size,bbox):
        '''
        @param roads: 数组形式的路网信息
        @param size 2-tuple (width,height):网页上显示图片的div长宽
        @param bbox 4-tuple (xmin,ymin,xmax,ymax):地理范围
        '''
        self.network = Network(roads)
        self.network.parse()
        self.vertexs = self.network.vertex
        self.segments = self.network.segments
        self.size=size
        self.bbox=bbox
        self.convert=Convert(self.size,self.bbox)
              
#    def save(self):
#        '''
#        将抽象好的路网封装，持久化保存
#        '''
#        import StringIO,pickle
#        f=StringIO.StringIO()
#        pickle.dump(self.vertexs,f,0)  #0表示pickl序列化基于文本，1或2表示基于二进制
#        ff=open("g:\\vertexs.txt","a+")
#        ff.write(f.getvalue())
        
    def draw_basemap(self):
        """
                    绘制底图
        """    
        im = Image.new("RGBA", (955, 600), "#f4f3ef")
        draw = ImageDraw.Draw(im)
        n=len(self.vertexs)
           #实例化
           
#        self.save()
        
        
        for i in range(n):
            ptcoord = self.convert.gemtry_to_screen(self.vertexs[i])
            draw.arc(((ptcoord[0] - 2), (ptcoord[1] - 2), (ptcoord[0] + 2), 
                            (ptcoord[1] + 2)), 0, 360, fill=(0, 0, 0))
            draw.text(((ptcoord[0] - 1), (ptcoord[1] - 1)), str(i), fill=(0,0,0))
            
        for z in self.segments:
            startpoint = self.convert.gemtry_to_screen(z.start)   #gemtry_to_sreen()方法返回的是数组形式，绘制图片draw方法要用元组
            endpoint = self.convert.gemtry_to_screen(z.end)
            draw.line(((startpoint[0], startpoint[1]), (endpoint[0], 
                                    endpoint[1])), fill=(0, 0, 0))
        # del draw
        return im
    
    def drawBesPath(self,start_id,end_id):
        """
                   绘制好底图后，在其基础上绘制最优路径
        @param start_id: 起始点
        @param end_id: 终点
        """
        impath=self.draw_basemap()
        draw = ImageDraw.Draw(impath)
        path = Route().find_best_path(start_id, end_id, self.vertexs)

        bestpath = []
        for x in path:
            ptcoord = self.convert.gemtry_to_screen(x)
            bestpath.append(ptcoord)

        for i in range(len(bestpath) - 1):
            draw.line(((bestpath[i][0], bestpath[i][1]), (bestpath[i + 1][0], 
                            bestpath[i + 1][1])), fill=(255, 0, 0),width=2) #设置线宽为3
        
        return impath