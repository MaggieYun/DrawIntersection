#coding=utf-8
import os
import Image
f=open('g:\\tilename.txt','a+')
def loop(path):
	width,height = 0,0#文件及目录个数
	if os.path.isdir(path):
		dirs = os.listdir(path)  #listdir返回指定目录下所有的文件夹名
		height = len(dirs)  #len返回成员数，也就是目录个数
		for c_dir in dirs:
			width = loop(os.path.join(path,c_dir))[1]
	else:
		print path
		f.write(path+'\r\n')
	#f.close()	
	f.seek(0)
	return (width,height)

def pasteimg(width,height):
	tilelist=f.readlines()
	im = Image.new("RGBA",(width*256,height*256),(255,255,255,0))
	n=0
	for i in range(height):
		for j in range(width):
			pic=tilelist[n].split("\r\n")
			print pic,n
			tileimg=Image.open(pic[0])
			im.paste(tileimg,(j*256,i*256))
			n=n+1
	im.save(r"c:\newpaste.png","png")
	im.show()		

if __name__ == "__main__":
	width,height=loop(r"C:\AllLayers\L10")
	pasteimg(width,height)
