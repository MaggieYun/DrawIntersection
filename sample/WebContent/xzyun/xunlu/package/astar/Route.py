#coding=UTF-8
class Route:
    """
    寻路算法
    """
    def find_best_path(self, start_id, end_id, vertexs):
        openlist = []
        closelist = []
        path = []    
        nowpoint = None

        start = vertexs[start_id]
        end = vertexs[end_id]
        openlist.append(start)
        start.parent = None  #每次先把起始节点的父节点设为空

        for x in vertexs:
            x.get_neighborpoint()

        flag = True
        while flag:
            nowpoint = self.get_nowpoint(openlist, end)
            closelist.append(nowpoint)
            openlist.remove(nowpoint)
            # nowpoint.get_neighborpoint(pointsclass)

            for x in nowpoint.neighborpoint:
                # x.get_neighborpoint(pointsclass)
                if ((x in closelist) or(len(x.neighborpoint) == 1)):
                    continue
                elif(not(x in openlist)):
                    openlist.append(x)
                    x.set_parent(nowpoint)
                    x.get_h(end)
                    x.get_f()
                elif(x in openlist):
                    temp_g = x.get_distance(nowpoint)
                    if((nowpoint.g + temp_g) < x.g):
                        x.set_parent(nowpoint)
                        x.get_h(end)  #尚未仔细考虑，这两句代码是否有必要
                        x.get_f()
                    else:
                        continue
            if((end in closelist) or (len(openlist) == 0)):
                flag = False        
                    
        if(end in closelist):
            path = self.loop_parents(end)
        return path
        # return closelist

    def loop_parents(self, end):
        path = []
        path.append(end)
        while(path[-1].parent is not None):
            path.append(path[-1].parent)    
        return path
        

    def get_nowpoint(self, openlist, end):
        """
        @param end 终点
        @return 找出开启列表中f值最小的节点，作为当前节点
        """
        minlen = 1000000000000
        nowpoint = None
        for x in openlist:
            x.get_h(end)
            x.get_f()
            if(x.f < minlen):
                minlen = x.f
                nowpoint = x                    
        return nowpoint