#coding=UTF-8
class Segment:    
    """
    线段类
    """
    def __init__(self, start, end):
        self.start = start   
        self.end = end
        self.attributes = None

    def setAttributes(self, value):
        self.attributes = value

    def getAttributes(self):
        return self.attributes

    def getopsitevtx(self, vtx):
        if(vtx.ifequal(self.start)):
            return self.end
        else:
            return self.start    