#coding=UTF-8
#pil中的rotate方法按照顺时针方向旋转,角度单位为度数，而direction计算的angle为弧度
#数学坐标系中四个象限角度逆时针方向
#用intersection的center作为图片的中心
import Image,ImageDraw
import math 

class Coord:
    def __init__(self,x,y):
        self.x = x
        self.y = y


class Lane:
    #ZX:u"直行"
    #YZ:u"右转"

    def __init__(self,ltype):
        self.ltype = ltype
        self.direction = None
        self.status=None
        self.bbox=None          #求出每个lane的范围（以便之后放置箭头和文字，设置颜色）

    def set_direction(self,direction):
        self.direction = direction

    def  set_status(self,status):
        self.status=status


class Direction:
    def __init__(self,coord):
        self.coord = coord
        self.lanes = []
        self.bbox=None       #某个路口对象的大的范围（4个坐标）

    def add_lane(self,lane):
        lane.set_direction(self)
        self.lanes.append(lane)

    def set_intersetion(self,intersection):
        self.intersection = intersection
        self.angle = self.get_angle()

    def get_angle(self):
        '''
        求取direction的角度，逆时针方向
        '''
        cx=self.intersection.center.x
        cy=self.intersection.center.y
        x=self.coord.x
        y=self.coord.y
        xdiff=math.fabs(cx-x)
        ydiff=math.fabs(cy-y)
        d=math.floor(xdiff**2,ydiff**2)
        ang=math.asin(ydiff/d)

        angle=0
        if  cy<y:
            if cx==x:
                angle=math.pi/2
            elif cx>x:
                angle=math.pi-ang
            else:
                angle=ang
        elif cy>y:
            if cx==x:
                angle=3*math.pi/2
            elif cx>x:
                angle=math.pi+ang    
            else:
                angle=2*math.pi-ang
        else:       #cy=y
            if cx>x:
                angle=math.pi
            else:
                angle=0    
        return angle



class Intersection:
    def __init__(self,uid,name,center):
        #center:Coord的实例，坐标

        self.id = uid
        self.name = name
        self.center = center   #(0,0)
        self.directions = []
    
    def add_direction(self,direction):
        direction.set_intersetion(self)
        self.directions.append(direction)

        
    def parse(self,data):
        for x in data:
            oneinter=x
            uid=x["id"]
            name=x["name"]
            center=Coord(x["center"][0],x["center"][1])
            intersection=Intersection(uid,name,center)
            directs=x["directions"]

            for direct in directs:
                dire_coord=Coord(direct["coord"][0],direct["coord"][1])
                direction=Direction(dire_coord)
                direction.set_intersetion(intersection)
                for la in direct["lanes"]:
                    lane=Lane(la[0])
                    lane.set_status(la[1])
                    direction.add_lane(lane)
                intersection.add_direction(direction)




    def toImage(self,size):
        """
        @size 2-tuple:tuple[0]:width,tuple[1]:height   图片的尺寸
        """
        im=Image.new("RGBA",size,"#f4f3ef")   #初始化一张图片，大小为整个路口的size
        draw = ImageDraw.Draw(im)
        fill1="#ffc000"
        fill2="#ffc000"

        max_lanes=0
        for el in self.directions:    
            if max_lanes<len(el.lanes):
                max_lanes=len(el.lanes)
        center_radius=max_lanes*10        #获取路口中心空白区正方形的1/2宽

        for el in self.directions:        
            draw.line((self.center.x,self.center.y),(ele.coord.x,ele.coord.y),fill="#ffc000",width=2)  #画双黄线






if __name__ == '__main__':
    path=r"G:\intersection\intersection.js"
    js=open(path).read()          
    data=json.loads(js)
    print data




