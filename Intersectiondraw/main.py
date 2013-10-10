#coding=UTF-8
import sys,os
sys.path.append(os.path.join(os.path.dirname(__file__), "site-packages"))
sys.path.append(os.path.join(os.path.dirname(__file__), "site-packages/PIL"))

from net.yhte.gis.intersection.Line import Line
from net.yhte.gis.intersection.Canvas import Canvas
from net.yhte.gis.intersection.Point import Point
import Image,ImageDraw
import math
import os.path

import tornado.ioloop
import tornado.web

try:
    import json
except ImportError:
    import simplejson as json

class Lane:
    '''
    车道类
    '''
    def __init__(self,lid):
        self.id = lid
        self.direction = None
        self.status=None
        self.bbox=None          #求出每个lane的范围（以便之后放置箭头和文字，设置颜色）

    def set_direction(self,direction):
        self.direction = direction

    def set_picUrl(self,picUrl):
        self.picUrl = picUrl

    def get_bbox(self,canvas_size):
        '''
        暂定，还需将靠近图片中心的点偏移一定距离
        '''
        if self.id==1:
            left=self.direction.line.get_boundp(canvas_size)
        else:   
            left=self.direction.line.get_pal_boundp(self.id-1)

        right=self.direction.line.get_pal_boundp(self.id)

        offset1 = self.direction.offset
        # offset1 = self.direction.intersection.max_lanes_num*self.direction.intersection.lane_width
        offset2 = canvas_size[0]/2-offset1-2*self.direction.intersection.lane_width

        if(self.direction.id == 0):
            self.bbox = (right[1],right[0],left[0],left[1])
            self.start = (int(right[1][0]+4),int(right[1][1]+4+offset2))
        elif(self.direction.id == 1):
            self.bbox = (right[1],right[0],left[0],left[1])
            self.start = (int(right[0][0]+8),int(right[0][1]+4))
        elif(self.direction.id == 2):
            self.bbox = (right[1],right[0],left[0],left[1])
            self.start = (int(left[0][0]+4),int(left[0][1]+8))
        elif(self.direction.id == 3):
            self.bbox = (right[1],right[0],left[0],left[1])
            self.start = (int(left[1][0]+4+offset2),int(left[1][1]+4))



class Direction:
    '''
    路口方向类（即路口的每个走向）
    '''
    def __init__(self,coord,did):
        self.id=did
        self.point = Point(coord[0],coord[1])
        self.lanes = []
        self.line=None
        self.linep=None  #靠近中心空白去的两个定点
        self.leftbbox=None
        self.offset_center = None
        self.offset = None
        self.width = None 
        # self.leftpal_boundp=None

    def add_lane(self,lane):
        lane.set_direction(self)
        self.lanes.append(lane)

    def get_leftbbox(self):

        self.leftbbox = (self.line.leftpal_boundp2,
            self.line.leftpal_boundp1,
            (self.offset_center.x,self.offset_center.y),
            (self.point.x,self.point.y))    #center有待偏移

    def set_intersetion(self,intersection):
        self.intersection = intersection   

        

    def get_line(self,n,size):   
        '''
        @n：车道数
        @size：图片尺寸
        '''

        # self.offset = self.intersection.max_lanes_num*self.intersection.lane_width
        
        if(self.id == 0):
            self.offset_center = Point(self.intersection.center.x,self.intersection.center.y-self.offset)
        elif(self.id == 1):
            self.offset_center = Point(self.intersection.center.x+self.offset,self.intersection.center.y)
        elif(self.id == 2):
            self.offset_center = Point(self.intersection.center.x,self.intersection.center.y+self.offset)
        elif(self.id == 3): 
            self.offset_center = Point(self.intersection.center.x-self.offset,self.intersection.center.y)

        self.line=Line(self.offset_center,self.point) 
        self.line.set_direction(self)  #主要用于计算直线平移时的平移量
        self.line.get_k()
        self.line.get_b()
        self.line.get_boundp(size)
        self.line.get_leftpal_boundp(n)
        self.angle=self.line.get_angle()        


class Intersection:
    '''
    路口对象
    '''
    def __init__(self,uid,center):
        self.id = uid
        self.center = Point(center[0],center[1])   #(0,0)
        self.directions = []
        self.centerArea = None
        self.max_lanes_num = None  #各路口车道最多的数量
        self.lane_width = None #假设每个路口的所有车道的宽度全部相同
        self.canvas_size = None
        self.template = None


    def add_direction(self,direction):
        direction.set_intersetion(self)   #此处不确定是否可以直接用self代表intersection？？
        self.directions.append(direction)

    def get_centerArea(self):
        '''
        centerArea为一维数组，每个元素是元组(x,y),是中心区域多边形的各个顶点
        两两相连，因此涉及排序问题
        对于简化后的路口，该处算法可以简化
        '''
        linelist = []

        for direction in self.directions:
            linep0 = self.center.move(direction.angle,direction.offset)  #中心区域半径由车道数最多的路口决定
            linep1 = linep0.move(direction.angle+math.pi/2,direction.width)  #确保了中心区域为正方形
            linep2 = linep0.move(direction.angle-math.pi/2,direction.width)
            direction.linep = ((linep1.x,linep1.y),(linep2.x,linep2.y))

        n = len(self.directions)
        for i in xrange(n-1):
            for j in xrange(i+1,n):
                if self.directions[i].angle>self.directions[j].angle:
                    temp = self.directions[i]
                    self.directions[i] = self.directions[j]
                    self.directions[j] = temp
            
        for ele in self.directions:
            linelist.append(ele.linep[1])
            linelist.append(ele.linep[0])

        self.centerArea = linelist
        self.centerArea.append(self.centerArea[0])

    def parse(self,data):
        '''
        原始数据抽象与转化
        '''
        data=data
        self.canvas_size=data["canvas_size"]
        directs=data["coordlist"]
        self.root_address = data["root_address"]
        self.pic_address = data["pic_address"]

        self.lane_width = data["lane_width"]

        num_lanes = []
        for direct in directs:
            num_lanes.append(len(direct[1]))  #事先求出最大车道数，便于计算bbox

        self.max_lanes_num = max(num_lanes)  #部分方法依赖该变量，因此先遍历一边directs

        
        dids=data["dids"]
        count = 0
        for direct in directs:
            did = dids[count]  #使用原始数据的0,1,2,3作为direction的id，可以辨别direction的方向
            count=count+1
        
            direction=Direction(direct[0],did)
            self.add_direction(direction)

            for i in range(len(direct[1])):
                lane=Lane(i+1)  #lane的id不是唯一的。每个路口上的lane的id不重复，不同路口id有重复
                direction.add_lane(lane)

        

        sorted_directions = sorted(self.directions,key = lambda x:x.id)  #该处算法完全局限了路口方向不能超过4
        ids = map(lambda x:x.id,sorted_directions)
        full = [0,1,2,3]
        for ele in ids:
            if ele in full:
                full.remove(ele)
        for idx in full:
            sorted_directions.insert(idx,None)

        for i in range(4):     #此处算法应能简化，相对方向的offset相同
            neighbors = []
            if (i == 0 and sorted_directions[0]):
                if(sorted_directions[3]):
                    neighbors.append(len(sorted_directions[3].lanes))
                if(sorted_directions[1]):
                    neighbors.append(len(sorted_directions[1].lanes))
                if (neighbors):
                    sorted_directions[0].offset = max(neighbors)*self.lane_width
                else:
                    sorted_directions[0].offset = self.max_lanes_num*self.lane_width
            elif (i == 3 and sorted_directions[3]):
                if(sorted_directions[0]):
                    neighbors.append(len(sorted_directions[0].lanes))
                if(sorted_directions[2]):
                    neighbors.append(len(sorted_directions[2].lanes))
                if (neighbors):
                    sorted_directions[3].offset = max(neighbors)*self.lane_width
                else:
                    sorted_directions[3].offset = self.max_lanes_num*self.lane_width
            else:
                if(sorted_directions[i]):
                    if(sorted_directions[i-1]):
                        neighbors.append(len(sorted_directions[i-1].lanes))
                    if(sorted_directions[i+1]):
                        neighbors.append(len(sorted_directions[i+1].lanes))
                    if (neighbors):
                        sorted_directions[i].offset = max(neighbors)*self.lane_width
                    else:
                        sorted_directions[i].offset = self.max_lanes_num*self.lane_width
        for i in range(4):             #用于计算direction的width，用于计算中心区域的边界
            if(sorted_directions[i]):
                if(i==0 or i==2):
                    if(sorted_directions[1]):
                        sorted_directions[i].width = sorted_directions[1].offset 
                    elif(sorted_directions[3]):
                        sorted_directions[i].width = sorted_directions[3].offset 
                    else:
                        sorted_directions[i].width = sorted_directions[i].offset
                if (i==1 or i==3):
                    if(sorted_directions[0]):
                        sorted_directions[i].width = sorted_directions[0].offset 
                    elif(sorted_directions[2]):
                        sorted_directions[i].width = sorted_directions[2].offset 
                    else:
                        sorted_directions[i].width = sorted_directions[i].offset


        for m in range(len(directs)):
            direct = directs[m]
            direction = self.directions[m]

            direction.get_line(len(direct[1]),self.canvas_size)
            direction.get_leftbbox()
            for i in range(len(direct[1])):
                lane = direction.lanes[i]
                lane.get_bbox(self.canvas_size)
                picPath = os.path.join(self.root_address,self.pic_address[str(direct[1][i])])
                lane.set_picUrl(picPath)
        self.get_centerArea()  
        self.get_template()
        
        

    def get_template(self):

        im=Image.new("RGBA",self.canvas_size,"#b0cffe")   #初始化一张图片，大小为整个路口的size
        draw = ImageDraw.Draw(im)
        canvas=Canvas(draw)

        for direction in self.directions:
            canvas.draw_area(direction.leftbbox,"black","white")  #给左车道上色，区分绿化
            canvas.drawline(direction.line,"yellow",8)   #绘制每个方向中心双黄线
            canvas.draw_left_line(direction.line,"white")  #绘制每个方向左路肩
            
            n=len(direction.lanes)
            for i in range(1,n+1):
                direction.line.get_pal_boundp(i)  #有待改进为面向对象
                canvas.draw_palline(direction.line,"white")    #绘制平行线 即车道
            
            for lane in direction.lanes:
                canvas.draw_area(lane.bbox,"black","white")

        canvas.draw_area(self.centerArea,"black","white")     #绘制中心空白区 
        canvas.draw_lines(self.centerArea,"white",8)  #绘制斑马线
        self.template = im
        # self.template.show()

    
    def refresh(self,coordlist,lane_width):       
        for i in range(len(coordlist)):  #因为不方便用id遍历寻找，因此要求保证数据的顺序对应关系
            direct = coordlist[i]
            for j in range(len(direct[1])):
                picPath = os.path.join(self.root_address,self.pic_address[str(direct[1][j])])
                self.directions[i].lanes[j].set_picUrl(picPath)


        im = self.template.copy()  #以下逻辑是否放在refresh方法中有待考虑

        for direction in self.directions:
            for lane in direction.lanes:    
                pic = Image.open(lane.picUrl)

                temp = lane_width-8  #图片尺寸减小，避免遮盖车道线
                resized = pic.resize((temp,2*temp))  #图片宽为车道宽，长为2倍车道宽（固定）直接影响bbox的计算

                if(lane.direction.id == 0):  #根据方向做旋转
                    pic2 = resized.rotate(180)
                elif(lane.direction.id == 1):
                    pic2 = resized.rotate(90)
                elif(lane.direction.id == 3):
                    pic2 = resized.rotate(270)
                else:
                    pic2 = resized
                im.paste(pic2,lane.start)
              
        return im



def render(options):
    DEFAULT_CONFIG = {
      "inter_id":1,
      "root_address":os.path.dirname(__file__)+ os.sep + "\\sample\\pics", 
      "pic_address":{
        "1":"1.gif",
        "2":"2.gif",
        "3":"3.gif",
        "4":"4.gif",
        "5":"5.gif",
        "6":"6.gif",
        "7":"7.gif",
        "8":"8.gif",
        "9":"9.gif"
      },
      "intersection":{
        "0":[1,4,1],
        "2":[5,6,7],
        "3":[1,2,4]
      },
      "image_size":[1000,1000],
      "lane_width":40
    }

    config = DEFAULT_CONFIG.copy()
    for k in options:
        config[k] = options[k]
    
    size = (config["image_size"][0],config["image_size"][1])

    ANGLES = {   
      0:(size[0]/2,0),
      1:(size[0],size[1]/2),
      2:(size[0]/2,size[1]),
      3:(0,size[1]/2)
    }

    data={"centercoord":(size[0]/2,size[1]/2),
      "canvas_size":size}

    coordlist = {"coordlist":[ ]}
    dids = {"dids":[]}
    for (k,v) in config["intersection"].items():
        coordlist["coordlist"].append([ANGLES[int(k)],v])
        dids["dids"].append(int(k))

    data.update(coordlist)
    data.update(dids)
    data.update(config)   #此处数据有多余，有待优化



    intersection=Intersection(data["inter_id"],data["centercoord"])  #实例化路口，有待考虑缓存、模板
    intersection.parse(data)

    # im = intersection.refresh(data["coordlist"],data["lane_width"])

    # return im

    im = intersection.template.copy()

    for direction in intersection.directions:
        for lane in direction.lanes:    
            pic = Image.open(lane.picUrl)
            pic2 = pic.convert("RGBA")

            temp = data["lane_width"]-8  #图片尺寸减小，避免遮盖车道线
            resized = pic2.resize((temp,2*temp))  #图片宽为车道宽，长为2倍车道宽（固定）直接影响bbox的计算

            if(lane.direction.id == 0):  #根据方向做旋转
                pic2 = resized.rotate(180)
            elif(lane.direction.id == 1):
                pic2 = resized.rotate(90)
            elif(lane.direction.id == 3):
                pic2 = resized.rotate(270)
            else:
                pic2 = resized
            im.paste(pic2,lane.start,pic2)
          
    return im

            



class renderHandler(tornado.web.RequestHandler):
    
    def initialize(self,settingPath):

        setting_stream = file(r"%s"%settingPath, 'r').read()  #读取配置文件中的系统参数
        self.options = json.loads(setting_stream)  #unicode编码


    def get(self):
        url_stream = self.get_argument("params")  #从url中获取参数
        url_options = json.loads(url_stream)  

        url_options.update(self.options)
        options = self.unicode_to_str(url_options)

        im = render(options)

        import cStringIO
        io = cStringIO.StringIO()
        im.save(io, "PNG")
        self.set_header("Content-Type", "image/png")
        self.write(io.getvalue())

    post = get   


    def unicode_to_str(self,dict_unicode): 
        options_str = {}  #此处代码有待优化,将unicodel编码的字典转化为字符串编码的字典
        for (k,v) in dict_unicode.items():
            if isinstance(k,unicode):
                k = str(k)
                options_str.update({k:{}})
            if isinstance(v,dict):
                for(key,value) in v.items():
                    if isinstance(key,unicode):
                        key = str(key)
                    if isinstance(value,unicode):
                        value = str(value)
                        options_str[k].update({key:value})
                    else:
                        options_str[k].update({key:value})
            elif isinstance(v,unicode):
                v = str(v)
                options_str.update({k:v})
            else:
                options_str.update({k:v})

        return options_str

        


        


            
