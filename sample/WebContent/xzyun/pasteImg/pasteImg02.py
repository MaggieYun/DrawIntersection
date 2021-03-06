#coding=utf-8
#用列表存放tile文件目录地址，再拼接图片
import os
import Image
def loop(path):
	tilelist=[]
	width,height = 0,0#文件及目录个数
	if os.path.isdir(path):
		dirs = os.listdir(path)  #listdir返回指定目录下所有的文件名
		height = len(dirs)  #len返回成员数，也就是目录个数
		for c_dir in dirs:  #遍历dirs下的文件
			width = loop(os.path.join(path,c_dir))[1]  #两个递归函数是重点，每个文件夹下width相同，其实width被多次赋值，每一都一样
			tilelist+=loop(os.path.join(path,c_dir))[2]  #从一个文件夹下获取完图片文件名后，再遍历下一个文件下的图片文件，将每一个文件夹里的图片名存放在list里，如果不加，则每一次重新遍历另一个文件夹时，list又变成空的
	else:
		print path
		tilelist.append(path)
	print tilelist,width,height	
	return (width,height,tilelist)

def pasteimg(width,height,tilelist):
	im = Image.new("RGBA",(width*256,height*256),(255,255,255,0))
	n=0
	for i in range(height):
		for j in range(width):
			tileimg=Image.open(tilelist[n])  
			im.paste(tileimg,(j*256,i*256))
			n=n+1
	im.save(r"c:\newpaste.png","png")
	im.show()		

if __name__ == "__main__":
	width,height,tilelist=loop(r"C:\AllLayers\L18")
	pasteimg(width,height,tilelist)
