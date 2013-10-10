#coding=UTF-8
#是否要给每个方向车道增加一个属性，说明其在哪个象限（即相对于图片中心的位置）？？？
import math
class Line:
    '''直线类'''

    def __init__(self, point1,point2):
        self.point1 = point1             #point1作为特定的center点（要求是整个路口的中心坐标）
        self.point2 = point2
        self.vertical = None  #有待修改
        # self.pal_id=0 

        self.boundp1 = None
        self.boundp2 = None

        self.pal_boundp1 = None
        self.pal_boundp2 = None

        self.angle = 0

        self.leftpal_boundp1 = None
        self.leftpal_boundp2 = None

        self.direction = None

        # self.properties = {}

    # def set_property(key,val):
    #     self.properties[key] = val

    # def get_property(key):
    #     return self.properties.get(key,None)
    def set_direction(self,direction):
        self.direction = direction
        self.offset = self.direction.offset
        # self.offset = self.direction.intersection.max_lanes_num*self.direction.intersection.lane_width  #该种算法已经决定了路口中心区域为正方形
        

    def get_k(self):
        '''求直线斜率'''
        if self.point1.x == self.point2.x:
            self.k = None
        else:
            self.k = (self.point2.y - self.point1.y) / (self.point2.x - self.point1.x)

    def get_b(self):
        '''求直线截距'''
        if self.point1.x==self.point2.x:
            self.b=0
        else:
            self.b=(self.point1.x*self.point2.y-self.point2.x*self.point1.y)/(self.point1.x-self.point2.x)

    def get_vertical(self,canvas_size,d=50):
        '''
        求直线的垂线
        @d:偏离图片中心的距离(垂直距离)，由车道数量最多的方向决定大小 （此方法专门求垂直车道的垂线）
        '''  
        x=canvas_size[0]/2   #图片中心点
        y=canvas_size[1]/2  
        if (self.k is not None) and (self.k !=0):
            k = 1/self.k
            b = (k*y-x+d*math.sqrt(k**2+1))/self.k
        elif self.k==0:
            k = None
            b = d    
        else:   #即k is None
            k = 0
            b = d      
        self.vertical=(k,b)

    
    def get_boundp(self,canvas_size):    #两个求边界点的方法要分离成两个方法提高效率，不用每次求平行线都计算一次原始直线端点
        '''
        获得直线的两端点
        @canvas_size:出图的范围
        '''
        if (self.point2.x-self.point1.x)>0:      #相当于k is not None
            x1=canvas_size[0]/2
            y1=self.k*x1+self.b
            self.boundp1=(x1,y1)  

            x2=canvas_size[0]
            y2=self.k*x2+self.b
            self.boundp2=(x2,y2)

        elif (self.point2.x-self.point1.x)<0:    #相当于k is not None
            x1=canvas_size[0]/2
            y1=self.k*x1+self.b
            self.boundp1=(x1,y1)

            x2=0
            y2=self.b
            self.boundp2=(x2,y2)

        else:                       #相当于k is None
            if (self.point2.y-self.point1.y)>0:
                self.boundp1=(canvas_size[0]/2,canvas_size[1]/2)
                self.boundp2=(canvas_size[0]/2,canvas_size[1])        
            else:
                self.boundp1=(canvas_size[0]/2,canvas_size[1]/2)
                self.boundp2=(canvas_size[0]/2,0)
        

        if(self.direction.id == 0):
            self.boundp1 = (self.boundp1[0],self.boundp1[1]-self.offset)
        elif(self.direction.id == 1):
            self.boundp1 = (self.boundp1[0]+self.offset,self.boundp1[1])
        elif(self.direction.id == 2):
            self.boundp1 = (self.boundp1[0],self.boundp1[1]+self.offset)
        elif(self.direction.id == 3):
            self.boundp1 = (self.boundp1[0]-self.offset,self.boundp1[1])

        return [self.boundp1,self.boundp2]        


    def get_leftpal_boundp(self,n):
        '''
        获取最左边路肩
        @n：此方向右边车道的数量（假使每个方向上左右车道数量相同）
        '''
        n=n
        import math
        if self.k is not None:  
            a1=math.atan(self.k)
            a2=math.cos(a1)
            s=self.direction.intersection.lane_width/a2       #求出每条平行线偏离y轴的距离（绝对值）
        else:
            s=self.direction.intersection.lane_width

        x1=self.boundp1[0]
        y1=self.boundp1[1]
        x2=self.boundp2[0]
        y2=self.boundp2[1]
        
        # self.leftpal_boundp1=None
        # self.leftpal_boundp2=None
        if (self.point2.x-self.point1.x)>0:      #相当于k is not None
            self.leftpal_boundp1=(x1,y1+n*s)
            self.leftpal_boundp2=(x2,y2+n*s)
        elif (self.point2.x-self.point1.x)<0:    #相当于k is not None
            self.leftpal_boundp1=(x1,y1-n*s)
            self.leftpal_boundp2=(x2,y2-n*s)
        else:                       #相当于k is None
            if (self.point2.y-self.point1.y)>0:
                self.leftpal_boundp1=(x1-n*s,y1)
                self.leftpal_boundp2=(x2-n*s,y2)    
            else:
                self.leftpal_boundp1=(x1+n*s,y1)
                self.leftpal_boundp2=(x2+n*s,y2)
        
        return [self.leftpal_boundp1,self.leftpal_boundp2]        


    def get_pal_boundp(self,pal_id):
        '''
        获取右边车道
        @pal_id：第pal_id个车道的右边界
        '''
        if self.k is not None:  
            a1=math.atan(self.k)
            a2=math.cos(a1)
            s=self.direction.intersection.lane_width/a2       #求出每条平行线偏离y轴的距离（绝对值）
        else:
            s=self.direction.intersection.lane_width 
           
        n=pal_id
        x1=self.boundp1[0]
        y1=self.boundp1[1]
        x2=self.boundp2[0]
        y2=self.boundp2[1]

        if (self.point2.x-self.point1.x)>0:      #相当于k is not None
            self.pal_boundp1=(x1,y1-n*s)
            self.pal_boundp2=(x2,y2-n*s)   
        elif (self.point2.x-self.point1.x)<0:    #相当于k is not None
            self.pal_boundp1=(x1,y1+n*s)
            self.pal_boundp2=(x2,y2+n*s)
        else:                       #相当于k is None
            if (self.point2.y-self.point1.y)>0:
                self.pal_boundp1=(x1+n*s,y1)
                self.pal_boundp2=(x2+n*s,y2)       
            else:
                self.pal_boundp1=(x1-n*s,y1)
                self.pal_boundp2=(x2-n*s,y2)

        return [self.pal_boundp1,self.pal_boundp2]        
        

    def get_angle(self):
        '''
        求取direction的角度，逆时针方向
        '''
        cx=self.point1.x
        cy=self.point1.y
        x=self.point2.x
        y=self.point2.y
        xdiff=math.fabs(cx-x)
        ydiff=math.fabs(cy-y)
        d=math.sqrt(xdiff**2+ydiff**2)
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
        self.angle=angle      #弧度 
        # self.angle=angle*180/math.pi   #角度
        return self.angle

    def get_intersecPoint(self,otherLine):
        '''
        求两直线交点
        '''
        return            

            

              
