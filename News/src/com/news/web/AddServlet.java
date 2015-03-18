package com.news.web;

import java.io.IOException;
import java.util.UUID;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.news.entity.NewsEntity;
import com.news.service.NewsServiceImpl;

/**
 * Servlet implementation class AddServlet
 */
@WebServlet("/AddServlet")
public class AddServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public AddServlet() {
		super();
		// TODO Auto-generated constructor stub
	}

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doGet(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		NewsEntity news = new NewsEntity();
		news.setContent(request.getParameter("content"));
		news.setTime(request.getParameter("time"));
		news.setTitle(request.getParameter("title1"));
		news.setType(new String(request.getParameter("type").getBytes(
				"ISO-8859-1"), "UTF-8"));
		news.setId(UUID.randomUUID().toString());
		NewsServiceImpl service = new NewsServiceImpl();
		try {
			service.add(news);
			request.setAttribute("msg", "��ӳɹ���");
			request.getRequestDispatcher("add.jsp").forward(request, response);
			return;

		} catch (Exception e) {
			request.setAttribute("msg", "����������δ֪�������ʧ�ܣ�");
			request.getRequestDispatcher("add.jsp").forward(request, response);
			e.printStackTrace();
			return;
		}
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doPost(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
