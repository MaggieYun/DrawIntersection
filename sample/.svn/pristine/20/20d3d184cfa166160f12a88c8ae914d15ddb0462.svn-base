package net.yhte.gis.xzyun.api;

/**
 * @author 许照云
 *
 */
public class TileUtil{
	
     /**
	 * 
	 * @param latitude 给定的纬度
	 * @param longitude 给定的经度
	 * @param levelOfDetail 等级范围
	 * @return 地理坐标转换为的像素坐标值
	 */
	public static Pixel latLongToPixelXY(double latitude, double longitude,
			int levelOfDetail) {
		latitude = clip(latitude, MinLatitude, MaxLatitude);
		longitude = clip(longitude, MinLongitude, MaxLongitude);

		double x = (longitude + 180) / 360;
		double sinLatitude = Math.sin(latitude * Math.PI / 180);
		double y = 0.5 - Math.log((1 + sinLatitude) / (1 - sinLatitude))
				/ (4 * Math.PI);

		int mapSize = mapsize(levelOfDetail);
		int pixelX = (int) clip(x * mapSize + 0.5, 0, mapSize - 1);
		int pixelY = (int) clip(y * mapSize + 0.5, 0, mapSize - 1);

		Pixel pixel = new Pixel();
		pixel.x = pixelX;
		pixel.y = pixelY;
		return pixel;
	}
	
	/**
	 * 
	 * @param pixelX 像素X值
	 * @param pixelY 像素Y值
	 * @return 瓦片的像素坐标值
	 */
	public static Tile pixelXYToTileXY(int pixelX, int pixelY) {
		int tileX = pixelX / 256;
		int tileY = pixelY / 256;

		Tile tile = new Tile();
		tile.x = tileX;
		tile.y = tileY;
		return tile;
	}
	
	
	/**
	 * 
	 * @param n
	 * @param minValue
	 * @param maxValue
	 * @return 返回三个数中第二大的值
	 */
	private static double clip(double n, double minValue, double maxValue) {
		return Math.min(Math.max(n, minValue), maxValue);
	}
	/**
	 * 
	 * @param levelOfDetail 地图放大的等级范围
	 * @return 256*2^等级范围
	 */
	private static int mapsize(int levelOfDetail) {
		return 256 << levelOfDetail;
	}
	
	private static double MinLatitude = -85.051128;
	private static double MaxLatitude = 85.05112878;
	private static double MinLongitude = -180;
	private static double MaxLongitude = 180;
	// 节省内存
}