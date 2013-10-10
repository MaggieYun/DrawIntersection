package net.yhte.gis.rtliu.apis;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.yhte.gis.rtliu.core.Task;

/**
 * 创建任务用Servlet
 */
public class NewTaskServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public NewTaskServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		//创建任务
		Task task = new Task();
		//task.setLmax(lmax);
		//...
		//task.setYmin(30);
		
		//打开新的线程执行task
		new Thread(task).start();
		
		//返回客户端,通知任务已经开始
		response.getWriter().write("任务已经执行!");
	}

}
