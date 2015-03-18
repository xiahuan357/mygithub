package com.news.web;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.news.service.NewsServiceImpl;

/**
 * Servlet implementation class DeleteServlet
 */
@WebServlet("/DeleteServlet")
public class DeleteServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public DeleteServlet() {
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
			String id = new String(request.getParameter("id").getBytes(
					"ISO-8859-1"), "UTF-8");
			String type = new String(request.getParameter("type").getBytes(
					"ISO-8859-1"), "UTF-8");
			service.delete(type, id);
			request.setAttribute("msg", "ɾ��ɹ���");
			request.getRequestDispatcher("/QueryTitleServlet?type=" + type)
					.forward(request, response);
			return;
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
