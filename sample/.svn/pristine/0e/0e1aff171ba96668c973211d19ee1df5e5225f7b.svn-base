package net.yhte.gis.rtliu.examples;

/**
 * 这个类用于测试Java线程
 * @author liurongtao
 *
 */
public class ThreadTest {

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		//创建一个线程
		Thread1 thread1 = new Thread1(100);
		thread1.start();
		//创建另一个线程
		Thread2 thread2 = new Thread2(100);
		new Thread(thread2).start();
		
		System.out.println("主线程");
	}

}

/**
 * 这个类用于展示通过继承Thread类来实现线程
 * 这个线程用来数数,1,2,3,5,7
 * @author liurongtao
 *
 */
class Thread1 extends Thread{
	private int count = 10;
	
	public Thread1(int count){
		this.count = count;
	}
	
	@Override
	public void run() {
		for (int i = 0; i < this.count; i++) {
			System.out.println("奇数线程:"+(2*i+1));
			try {
				sleep(1000);//暂停当前线程1秒钟
			} catch (InterruptedException e) {
				e.printStackTrace();
				System.out.println("sleep error");
			}
		}
	}
}

/**
 * 这个类用于展示通过实现Runnable接口来实现线程
 * 这个线程用来数数,1,2,3,4,5
 * @author liurongtao
 *
 */
class Thread2 implements Runnable
{
	private int count = 10;
	
	public Thread2(int count){
		this.count = count;
	}

	@Override
	public void run() {
		for (int i = 0; i < this.count; i++) {
			System.out.println("偶数线程:"+2*i);
			try {
				Thread.sleep(1000);//暂停当前线程1秒钟
			} catch (InterruptedException e) {
				e.printStackTrace();
				System.out.println("sleep error");
			}
		}
	}
	
}