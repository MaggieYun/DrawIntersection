class IntersecPoint(object):
	"""求两直线交点"""
	def __init__(self, k1,b1,k2,b2):
		self.k1 = k1
		self.k2 = k2
		self.b1 = b1
		self.b2 = b2

	def get_intersectPoint(self):
		pointx=(self.b2-self.b1)/(self.k1-self.k2)
		pointy=(self.k1*self.b2-self.k2*self.b1)/(self.k1-self.k2)	
		return [pointx,pointy]

		