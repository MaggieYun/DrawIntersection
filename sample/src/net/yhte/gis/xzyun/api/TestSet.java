package net.yhte.gis.xzyun.api;

import java.io.IOException;

/**
 * @author Administrator
 *
 */
public class TestSet {

	/**
	 * @param args
	 * @throws IOException 
	 */
	public static void main(String[] args) throws IOException {
		// TODO Auto-generated method stub
		Settings.separate="==";
		Settings settings=new Settings("c:/settings.txt");	
//		String config=settings.get("#");
//		System.out.println(config);
//		
//		settings.set("name", "xuzhaoyun");
//		settings.set("sex", "female", "性别");
		settings.set("name", "xuzhaoyun", "用户姓名",false);
		System.out.println("参数设置完毕");	
		
	//通过调试，程序存在一个缺点，若要修改已存在的配置项参数，重写后注释全部丢失。其余情况都暂且没有大问题。

	}

}
