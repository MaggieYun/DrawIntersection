package net.yhte.gis.xzyun.servlet;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.yhte.gis.xzyun.cores.TileSystem2;

/**
 * Servlet implementation class DownLoadServlet
 */
public class DownLoadServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public DownLoadServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doPost(request, response);
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		
		String[] args = request.getParameter("args").split(",");
		/*String extent = request.getParameter("extent");
		String maxLv = request.getParameter("maxLv");
		String minLv = request.getParameter("minLv");*/
		
//		double[] coord = TileSystem2.getgeocord(extent.split(","));
		
//		TileSystem2 tileSys = new TileSystem2();
		
		
		
		TileSystem2.main(args);  //一般情况下不会调用静态方法main函数
		
		//页面会停留在下载阶段  这时要分配两个线程 ：一个主要负责下载图片，另一个负责页面跳转
		//需要添加显示进度的功能，其中可以运用AJAX，刷新页面的一部分，而不必刷新整个页面
		
		PrintWriter out = response.getWriter();
		out.write("task finished!");
	}

}
