package com.news.web;

import java.io.IOException;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.news.entity.NewsTypeEntity;
import com.news.service.NewsServiceImpl;

/**
 * Servlet implementation class QueryTypeServlet
 */
@WebServlet("/QueryTitleServlet")
public class QueryTitleServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public QueryTitleServlet() {
		super();
		// TODO Auto-generated constructor stub
	}

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doGet(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		NewsServiceImpl service = new NewsServiceImpl();
//		try {
//			String type = new String(request.getParameter("type").getBytes(
//					"ISO-8859-1"), "UTF-8");
//			service.querytitle(type);
//			if (attr != null) {
//				Set<Map.Entry> es = attr.entrySet();
//				Iterator<Map.Entry> it = es.iterator();
//				request.setAttribute("it", it);
//				request.setAttribute("type", type);
//				request.getRequestDispatcher("titlelist.jsp").forward(request,
//						response);
//				return;
//			} else {
//				request.setAttribute("msg", "û�в�ѯ�������б?");
//				request.getRequestDispatcher("admin.jsp").forward(request,
//						response);
//				return;
//			}
//		} catch (Exception e) {
//			request.setAttribute("msg", "��ѯ�����б�����쳣��������");
//			request.getRequestDispatcher("admin.jsp")
//					.forward(request, response);
//			return;
//		}
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
