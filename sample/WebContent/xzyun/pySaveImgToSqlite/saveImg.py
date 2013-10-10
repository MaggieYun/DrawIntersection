#coding=UTF-8
import Image
import sqlite3
import os
import string,cStringIO

try:
    from sqlite import encode, decode
except ImportError:
    import base64
    sqlite3.encode = base64.encodestring
    sqlite3.decode = base64.decodestring
else:
    sqlite3.encode = encode
    sqlite3.decode = decode

def init_db(path,name):
    '''
    @param path:新建数据库路径
    @param name: 数据库名称 
    @return: 返回新建的数据库
    '''
    conn = sqlite3.connect(path + os.sep + name + ".sqlite")
    c = conn.cursor()
    c.execute('''select count(*) from sqlite_master where type='table' and tbl_name='layer' ''')
    if c.fetchall()[0][0] == 0:
    	c.execute('''create table layer (z,x,y,data)''')
    conn.commit()
    c.close()
    return conn

def loop(path):
    '''
    @param path:等级范围目录
    @return:  width:行数row，height：column，列数，tilelist，一个等级下图片目录列表
    '''
    tilelist=[]
    width,height = 0,0
    if os.path.isdir(path):
    	dirs = os.listdir(path) 
    	height = len(dirs) 
    	for c_dir in dirs:    #求width和height方法仅在此例中适用
    		width = loop(os.path.join(path,c_dir))[1] 
    		tilelist+=loop(os.path.join(path,c_dir))[2] 
    else:
#    	print path
    	tilelist.append(path)      
#    print tilelist,width,height	
    return (width,height,tilelist)
	


def save_img(img_path,db_path,db_name): 
    conn = init_db(db_path,db_name)
    c = conn.cursor()
    lvlist=[]
    if os.path.isdir(img_path):
        dirs = os.listdir(img_path)
        for lvdir in dirs:
            try:
                newpath=os.path.join(img_path,lvdir)      
                width=height=0
                tilelist=[]
                width,height,tilelist=loop(newpath)
                n=0      
                for i in range(height):
                    for j in range(width):
                        par=[]
                        par=tilelist[n].split(os.sep)
    #                    print par
                        z=int(par[2][1:])
                        row=int(par[3][1:],16)
                        col=int(par[4][1:9],16)
                        
                        inn = cStringIO.StringIO()
                        Image.open(tilelist[n]).save(inn,"png")
                        
                        sql = "insert into layer (z,x,y,data) values (%d,%d,%d,?)"%(z,col,row)
                        print n,i,j,tilelist[n]
                        c.execute(sql, (sqlite3.Binary(inn.getvalue()),))
                        n=n+1
                        if n%20==0:
                            conn.commit()
                    conn.commit()
                conn.commit()
            except:
                continue
        conn.commit()
    print u'end'
    c.close()			

if __name__ == "__main__":
	save_img(r'C:\all16',r'c:','trans')
	
	

