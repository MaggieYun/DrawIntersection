#coding=UTF-8

from package.Line import Line
from package.Canvas import Canvas
from package.Point import Point
import Image,ImageDraw


if __name__ == '__main__':
	size=(400,400)
	im=Image.new("RGBA",size,"#f4f3ef")   #初始化一张图片，大小为整个路口的size
	draw = ImageDraw.Draw(im)

	canvas=Canvas(draw)

	center = Point(200,200)
	p1 = Point(0,0)
	p2 = Point(400,200)
	p3 = Point(200,400)
	# print center.x

	line1 = Line(center,p1)
	line1.get_k()
	line1.get_b()
	line1.get_boundp(size)
	line1.get_leftpal_boundp(3)
	print line1.k

	line2 = Line(center,p2)
	line2.get_k()
	line2.get_b()
	line2.get_boundp(size)
	line2.get_leftpal_boundp(2)
	print line2.k,line2.b,line2.boundp1,line2.boundp2

	line3 = Line(center,p3)
	line3.get_k()
	line3.get_b()
	line3.get_boundp(size)
	line3.get_leftpal_boundp(1)
	print line3.k

	canvas.drawline(line1,"red")
	canvas.drawline(line2,"blue")
	canvas.drawline(line3,"green")

	for i in range(5):
		line1.get_pal_boundp(i)
		canvas.draw_palline(line1,i,"black")
	for i in range(4):	
		line2.get_pal_boundp(i)
		canvas.draw_palline(line2,i,"black")
	for i in range(3):	
		line3.get_pal_boundp(i)
		canvas.draw_palline(line3,i,"black")
	
	print len(line1.pal_boundp1),len(line2.pal_boundp1),len(line3.pal_boundp1)
	# print line1.attr1,line1.attr2
	# last_im=im.rotate(90)
	im.save(r"c:\result.png","png")	
