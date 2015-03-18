package com.news.web;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.news.service.NewsServiceImpl;

/**
 * Servlet implementation class ContentServlet
 */
@WebServlet("/ContentServlet")
public class ContentServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public ContentServlet() {
		super();
		// TODO Auto-generated constructor stub
	}

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doGet(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {

		NewsServiceImpl service = new NewsServiceImpl();
		try {
			String content = service.querycontent(
					request.getParameter("id"),
					new String(request.getParameter("type").getBytes(
							"ISO-8859-1"), "UTF-8"));
			if (content != null) {
				request.setAttribute("content", content);
				request.getRequestDispatcher("content.jsp").forward(request,
						response);
				return;
			} else {
				request.setAttribute("msg", "�������������ݣ�");
			}
		} catch (Exception e) {
			request.setAttribute("msg", "����������δ֪����");
		}
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doPost(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		doGet(request, response);
	}

}
