package net.yhte.gis.xzyun.api;
/**
 * @author 许照云
 *
 */
public class GetParameters{
/**
	 * 获取地理坐标（获取的是“经纬度”）
	 * 
	 * @param args 输入字符串数组
	 * @return 返回用户输入的地理坐标范围
	 */
	public static double[] getgeocord(String[] args) {
		double[] geocord = new double[4];
		geocord[1] = Double.parseDouble(args[2]);//如果要输入“纬经度”，则调换geocord[]0和1,2和3的位置
		geocord[0] = Double.parseDouble(args[3]);
		geocord[3] = Double.parseDouble(args[4]);
		geocord[2] = Double.parseDouble(args[5]);
		return geocord;
	}
	
	/**
	 * 获取等级范围
	 * 
	 * @param args 输入字符串数组
	 * @return 返回用户输入的等级范围
	 */
	public static int[] getlv(String[] args) {
		int[] lv = new int[2];
		lv[0] = Integer.parseInt(args[0]);
		lv[1] = Integer.parseInt(args[1]);
		return lv;
	}

	
	 //if 静态方法 根据if条件返回不同函数值 应该如何实现？？？？？！！！！！
	/**
	 * @param args
	 * @return 地图URL地址固定字符串部分
	 */
	public static String geturl(String[] args) {
		String addr = args[7];
		String address = null;
		if(addr.equals("GoogleMap")){
			address = "http://mt3.google.cn/vt/lyrs=m@183000000&hl=zh-CN&gl=cn&src=app&";
			//address[1] = "&s=Galil";
		}else if(addr.equals("MapABC")){
			address ="http://emap0.is.autonavi.com/appmaptile?&";
			//address[1]	="";
		//}else if(addr=="BaiduMap"){
		//	address[0] ="http://q5.baidu.com/it/u=";
		//	address[1]	=":;v=011;type=web&fm=44";	
		}
		return address;
		
	}	
}