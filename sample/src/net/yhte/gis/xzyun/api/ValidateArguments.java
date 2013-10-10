package net.yhte.gis.xzyun.api;

/**
 * @author 许照云
 *
 */
public class ValidateArguments{	
	/**
	 * 验证地理坐标参数的有效性
	 * 
	 * @param args
	 * @return 返回布尔值，显示地理坐标有效性
	 */
	@SuppressWarnings("javadoc")
	public static boolean validateArgumentsGeo(String[] args) {
		// TODO Auto-generated method stub
		// 判断逻辑
		double[] geocord1 = GetParameters.getgeocord(args);
		if ((geocord1[0] > -85) && (geocord1[0] < 85) && (geocord1[1] > -180)
				&& (geocord1[1] < 180) && (geocord1[2] > -85)
				&& (geocord1[2] < 85) && (geocord1[3] > -180)
				&& (geocord1[3] < 180)) {
			return true;
		} else
			return false;
	}

	/**
	 * 验证等级范围参数的有效性
	 * 
	 * @param args
	 * @return 返回布尔值，显示等级范围有效性
	 */
	@SuppressWarnings("javadoc")
	public static boolean validateArgumentsLv(String[] args) {
		int[] lv1 = GetParameters.getlv(args);
		if ((lv1[0] >= 0) && (lv1[1] <= 19) && (lv1[1] >= 0) && (lv1[1] <= 19)) {
			return true;
		} else
			return false;
	}
	
}