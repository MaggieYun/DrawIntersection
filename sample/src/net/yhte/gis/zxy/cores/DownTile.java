package net.yhte.gis.zxy.cores;
import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.net.URL;

/**
 * 
 * @author 张小颖
 * 
 */
public class DownTile {
	/**
	 * 
	 * @param args
	 * @throws IOException
	 */
	public static void main(String[] args) throws IOException {
		loadPic(args);
	}

	/**
	 * @param args
	 * @throws IOException
	 */
	public static void loadPic(String[] args) throws IOException {
		long begin = System.currentTimeMillis();// 开始时间点
		long varcount = 0;
		long count = 0, num = 0;
		InsertLL insertll = TileSystem.getLaLoLev(args);
		levelOfDetai mylevelOfDetai = TileSystem.getLev(args);
		String localadd=args[6];
		for (int i = mylevelOfDetai.lev1; i <= mylevelOfDetai.lev2; i++) {
			MapPixel mappixel = TileSystem.latlongToPixelXY(insertll.start_y,
					insertll.start_x, insertll.end_y, insertll.end_x, i);
			MapTile maptile = TileSystem.PixelXYToTileXY(mappixel.start_x,
					mappixel.start_y, mappixel.end_x, mappixel.end_y);
			num = (maptile.end_y - maptile.start_y + 1)
					* (maptile.end_x - maptile.start_x + 1);
			count = count + num;
		}

		// 下载图片
		System.out.println("图片总数" + count);
		System.out.println("下载中.....");
		for (int i = mylevelOfDetai.lev1; i <= mylevelOfDetai.lev2; i++) {
			MapPixel mappixel = TileSystem.latlongToPixelXY(insertll.start_y,
					insertll.start_x, insertll.end_y, insertll.end_x, i);
			MapTile maptile = TileSystem.PixelXYToTileXY(mappixel.start_x,
					mappixel.start_y, mappixel.end_x, mappixel.end_y);
			String dirName = localadd+"/"+"allLayers" + "/" + "L"
					+ String.format("%02d", i);
			CreateFileUtil.createDir(dirName);
			// 下载图片
			for (int k = maptile.start_y; k <= maptile.end_y; k++) {
				String fileName = dirName + "/R" + String.format("%1$08x", k);
				CreateFileUtil.createDir(fileName);
				for (int j = maptile.start_x; j <= maptile.end_x; j++) {
					String fileName1 = dirName + "/R"
							+ String.format("%1$08x", k) + "/C"
							+ String.format("%1$08x", j) + ".png";
					dlPicture(j, k, i, fileName1);
					varcount++;
					if (varcount % 100 == 0) {
						System.out.println("已完成下载" + varcount + "/" + count);
					}
				}
			}
		}
		if (varcount==count) {
			System.out.println("已完成下载" + count + "/" + count);
		}
		long end = System.currentTimeMillis();
		System.out.println("下载地图耗时：" + (end - begin) + " 毫秒");
		}

	/**
	 * 
	 * @param cx
	 * @param cy
	 * @param cz
	 * @param addr
	 * @throws IOException
	 */
	public static void dlPicture(int cx, int cy, int cz, String addr)
			throws IOException {
		try {
			String remote = "http://emap0.mapabc.com/mapabc/maptile?v=w2.61&x="
					+ cx + "&y=" + cy + "&z=" + cz + "&s=";
			URL url = new URL(remote);
			String fileName = addr;
			BufferedInputStream inputStream = new BufferedInputStream(
					url.openStream());
			BufferedOutputStream outputStream = new BufferedOutputStream(
					new FileOutputStream(fileName));
			int read = 0;
			while ((read = inputStream.read()) != -1) {
				outputStream.write(read);
			}
			inputStream.close();
			outputStream.flush();
			outputStream.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}