package net.yhte.gis.xzyun.api;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;

/**
 * @author 许照云
 *
 */
public class StartDownTile{
	

private static String address = "http://emap0.mapabc.com/mapabc/maptile?v=w2.61&x=";
	/**
	 * 
	 * @param levelOfDetail1 等级范围中较小的等级
	 * @param levelOfDetail2 等级范围中较大的等级
	 * @param latitude1 左下角的纬度
	 * @param longitude1 左下角的经度
	 * @param latitude2 右上角的纬度
	 * @param longitude2 右上角的经度
	 * @param dir 用户输入文件目录（eg:c）
	 * @throws IOException 抛出输入输出异常
	 */

	// 不用static静态方法
	public static void startdowntile(int levelOfDetail1, int levelOfDetail2, double latitude1,
			double longitude1, double latitude2, double longitude2,String dir)
			throws IOException {
		long picNum = 0; // 每一等级要下载的图片数量
		long num = 0; // 总共要下载的图片数量
		long count = 0; // 下载计数，可用于进度条
		String progress = null; // 用于计算下载进度
		
		long begin = System.currentTimeMillis(); //增加计时功能
		System.out.println("已开始下载图片!");
		// 计算总共要下载的图片的数量
		for (int lv = levelOfDetail1; lv <= levelOfDetail2; lv++) {

			Pixel pixel1 = TileUtil.latLongToPixelXY(latitude1, longitude1,lv);
			Tile tile1 = TileUtil.pixelXYToTileXY(pixel1.x, pixel1.y);

			Pixel pixel2 = TileUtil.latLongToPixelXY(latitude2, longitude2,lv);
			Tile tile2 = TileUtil.pixelXYToTileXY(pixel2.x, pixel2.y);

			picNum = (tile2.x - tile1.x + 1) * (tile1.y - tile2.y + 1);
			num += picNum;
			//System.out.println("要下载的图片数量为：" + num);
		}

		String dirName = null;
		// 开始下载任务
		for (int lv = levelOfDetail1; lv <= levelOfDetail2; lv++) {

			Pixel pixel1 = TileUtil.latLongToPixelXY(latitude1, longitude1,lv);
			Tile tile1 = TileUtil.pixelXYToTileXY(pixel1.x, pixel1.y);

			Pixel pixel2 = TileUtil.latLongToPixelXY(latitude2, longitude2,lv);
			Tile tile2 = TileUtil.pixelXYToTileXY(pixel2.x, pixel2.y);

			picNum = (tile2.x - tile1.x + 1) * (tile1.y - tile2.y + 1);

			for (int i = tile2.y; i <= tile1.y; i++) {
				dirName = dir + ":/AllLayers/" + "L" + String.format("%02d",lv )+ "/" + "R" + String.format("%08x",i ) + "";

				CreateFileUtil.createDir(dirName); // 需要完善 尝试不引用别的类的方法

				for (int j = tile1.x; j <= tile2.x; j++) {
					String base = address + j + "&y=" + i + "&z=" + lv + "&s=";
					//System.out.println(base);
					String fileName = dirName + "/" + "C" + String.format("%08x",j ) + ".png";     
					DownLoadFile.download(base, fileName);
					
					count++; 
					progress = count + "/" + num;
					
					if(count%100==0){
						System.out.println("下载进度为：" + progress);
					}
					
					//创建文件流
					FileWriter fileWriter = new FileWriter(new File("c:/status.txt"),false);
					fileWriter.write(progress);
					fileWriter.close();
				}
			}
		}
		System.out.println("下载进度为：" + progress);
		System.out.println("图片下载已完成!");
		long end = System.currentTimeMillis();
		System.out.println("下载地图耗时：" + (end - begin) + " 毫秒"); //显示下载耗费的时间

	}
}