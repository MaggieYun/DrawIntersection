class OfftoZero:
	"""OfftoZero:将所有坐标平移到以center为原点的坐标系中"""
	def __init__(self, cx,cy):
		self.xoff = cx
		self.yoff = cy

	def offtoZero(self,x,y):
		newx=x - self.xoff
		newy=y - self.yoff
		return [newx,newy]
			
		