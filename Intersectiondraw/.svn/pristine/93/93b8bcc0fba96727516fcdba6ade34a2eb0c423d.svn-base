#coding=UTF-8
import os.path
from main import renderHandler


import tornado.ioloop
import tornado.web

def startup(port,settingPath):
    application = tornado.web.Application([
        (r"/intersectionDraw",renderHandler,{"settingPath":settingPath}), 
        (r"/static/(.*)", tornado.web.StaticFileHandler, {"path": os.path.abspath(os.path.dirname(__file__)) +os.sep + 'sample'}),
    ])
    
    
    application.listen(port)
    print u"程序已经启动"
    tornado.ioloop.IOLoop.instance().start()

if __name__ == "__main__":
    settingPath = os.path.abspath(os.path.dirname(__file__))+ os.sep + "setting.config"  #配置文件的路径
    startup(8888,settingPath)