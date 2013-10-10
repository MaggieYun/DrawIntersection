package net.yhte.gis.rtliu.core;

/**
 * 任务类
 * @author liurongtao
 *
 */
public class Task implements Runnable {
	private int lmin;
	private int lmax;
	private int threadNum = 10;
	private float xmin;
	private float xmax;
	private float ymin;
	private float ymax;

	/**
	 * 获取最小等级
	 * @return 最小等级
	 */
	public int getLmin() {
		return lmin;
	}
	/**
	 * 设置最小等级
	 * @param lmin	最小等级
	 */
	public void setLmin(int lmin) {
		this.lmin = lmin;
	}
	/**
	 * 获取最大等级
	 * @return 最大等级
	 */
	public int getLmax() {
		return lmax;
	}
	/**
	 * 设置最大等级
	 * @param lmax 最大等级
	 */
	public void setLmax(int lmax) {
		this.lmax = lmax;
	}
	/**
	 * 获取下载线程数
	 * @return 下载线程数
	 */
	public int getThreadNum() {
		return threadNum;
	}
	/**
	 * 设置下载线程数
	 * @param threadNum 下载线程数
	 */
	public void setThreadNum(int threadNum) {
		this.threadNum = threadNum;
	}
	/**
	 * 获取xmin
	 * @return xmin
	 */
	public float getXmin() {
		return xmin;
	}
	/**
	 * 设置xmin
	 * @param xmin xmin
	 */
	public void setXmin(float xmin) {
		this.xmin = xmin;
	}
	/**
	 * 获取xmax
	 * @return xmax
	 */
	public float getXmax() {
		return xmax;
	}
	/**
	 * 设置xmax
	 * @param xmax xmax
	 */
	public void setXmax(float xmax) {
		this.xmax = xmax;
	}
	/**
	 * 获取ymin
	 * @return ymin
	 */
	public float getYmin() {
		return ymin;
	}
	/**
	 * 设置ymin
	 * @param ymin ymin
	 */
	public void setYmin(float ymin) {
		this.ymin = ymin;
	}
	/**
	 * 获取ymax
	 * @return ymax
	 */
	public float getYmax() {
		return ymax;
	}
	/**
	 * 设置ymax
	 * @param ymax ymax
	 */
	public void setYmax(float ymax) {
		this.ymax = ymax;
	}
	/**
	 * 开始任务
	 */
	public void start(){
		System.out.println("下载任务已经开始");
	}
	
	/**
	 * 构造函数
	 * @param lmin		最小等级
	 * @param lmax		最大等级
	 * @param xmin	
	 * @param xmax
	 * @param ymin
	 * @param ymax
	 */
	public Task(int lmin,int lmax,float xmin,float xmax,float ymin,float ymax){
		setLmin(lmin);
		setLmax(lmax);
		setXmin(xmin);
		setXmax(xmax);
		setYmin(ymin);
		setYmax(ymax);
	}
	/**
	 * 构造函数
	 */
	public Task(){
		
	}
	
	@Override
	public void run() {
		start();
	}

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		// TODO Auto-generated method stub

	}

}
