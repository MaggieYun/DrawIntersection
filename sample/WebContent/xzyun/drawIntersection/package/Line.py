#coding=UTF-8
class Line:
    '''直线类'''

    def __init__(self, point1,point2):
        self.point1 = point1             #point1作为特定的center点（要求是整个路口的中心坐标）
        self.point2 = point2
        self.vertical=None  #有待修改
        # self.pal_id=0 

        self.boundp1=None
        self.boundp2=None

        self.pal_boundp1=[]  #改为列表的形式
        self.pal_boundp2=[]

        # self.properties = {}

    # def set_property(key,val):
    #     self.properties[key] = val

    # def get_property(key):
    #     return self.properties.get(key,None)
                
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

    # def get_parallel(self,n):   #向上（y轴正方向）平移yoffset为正，向下平移，yoffset为负值(尚未考虑斜率不存在的问题)
    #     '''
    #     '''
    #     for i in range(1,n+1):
    #         self.pal_boundp1[i]=None
    #         self.pal_boundp2[i]=None
        # for i in range(n):
        #     self.parallel.id=i
        # absb=self.b+yoffset
        # k=self.k
        # self.parallel.append([yoffset,k,b])       #暂定此种数据格式（self.parallel.k,.b,.yoffset?）
        # return[k,b]

    def get_vertical(self,b=40):
        '''
        求直线的垂线
        @b:垂线的截距，给定值（带符号，根据direction坐标所在的象限决定） 
        '''    
        k = 0 - self.k
        b = b
        self.vertical=[k,b]
        # return [k,b]
    
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


    def get_leftpal_boundp(self,n):
        '''
        获取最左边路肩
        @n：此方向右边车道的数量（假使每个方向上左右车道数量相同）
        '''
        import math
        if self.k is not None:  
            a1=math.atan(self.k)
            a2=math.cos(a1)
            s=10/a2       #求出每条平行线偏离y轴的距离（绝对值）
        else:
            s=10   

        x1=self.boundp1[0]
        y1=self.boundp1[1]
        x2=self.boundp2[0]
        y2=self.boundp2[1]

        if (self.point2.x-self.point1.x)>0:      #相当于k is not None
            self.pal_boundp1.insert(0,(x1,y1+n*s))
            self.pal_boundp2.insert(0,(x2,y2+n*s))
        elif (self.point2.x-self.point1.x)<0:    #相当于k is not None
            self.pal_boundp1.insert(0,(x1,y1-n*s))
            self.pal_boundp2.insert(0,(x2,y2-n*s))
        else:                       #相当于k is None
            if (self.point2.y-self.point1.y)>0:
                self.pal_boundp1.insert(0,(x1-n*s,y1))
                self.pal_boundp2.insert(0,(x2-n*s,y2))    
            else:
                self.pal_boundp1.insert(0,(x1+n*s,y1))
                self.pal_boundp2.insert(0,(x2+n*s,y2))





    def get_pal_boundp(self,pal_id):
        '''
        获取右边车道
        @pal_id：第pal_id个车道的右边界
        '''
        import math
        if self.k is not None:  
            a1=math.atan(self.k)
            a2=math.cos(a1)
            s=10/a2       #求出每条平行线偏离y轴的距离（绝对值）
        else:
            s=10   
           
        n=pal_id
        x1=self.boundp1[0]
        y1=self.boundp1[1]
        x2=self.boundp2[0]
        y2=self.boundp2[1]

        if (self.point2.x-self.point1.x)>0:      #相当于k is not None
            self.pal_boundp1.append((x1,y1-n*s))
            self.pal_boundp2.append((x2,y2-n*s))   
        elif (self.point2.x-self.point1.x)<0:    #相当于k is not None
            self.pal_boundp1.append((x1,y1+n*s))
            self.pal_boundp2.append((x2,y2+n*s))
        else:                       #相当于k is None
            if (self.point2.y-self.point1.y)>0:
                self.pal_boundp1.append((x1+n*s,y1))
                self.pal_boundp2.append((x2+n*s,y2))        
            else:
                self.pal_boundp1.append((x1-n*s,y1))
                self.pal_boundp2.append((x2-n*s,y2))






    def get_intersecPoint(self,otherLine):
        '''
        求两直线交点
        '''
        return            

            

              
