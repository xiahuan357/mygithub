package com.news.web;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.news.entity.NewsEntity;
import com.news.entity.NewsTypeEntity;
import com.news.service.NewsServiceImpl;

/**
 * Servlet implementation class QueryServlet
 */
@WebServlet("/QueryTypeServlet")
public class QueryTypeServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public QueryTypeServlet() {
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
			List<NewsTypeEntity> attr = service.querytype();
			if (attr != null) {
				request.setAttribute("attr", attr);
				request.getRequestDispatcher("admin.jsp").forward(request,
						response);
				return;
			} else {
				request.setAttribute("msg", "�������������ͣ�");
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
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
