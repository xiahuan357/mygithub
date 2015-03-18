package com.news.web;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.news.dao.UserDAO;
import com.news.entity.UserEntity;
import com.news.service.UserLoginServiceImpl;

/**
 * Servlet implementation class LoginServlet
 */
@WebServlet("/LoginServlet")
public class LoginServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public LoginServlet() {
		super();
	}

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doGet(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		doPost(request, response);
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doPost(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		UserEntity user = new UserEntity();
		UserLoginServiceImpl userService = new UserLoginServiceImpl();
		try {
//			user = userService.login(request.getParameter("username"),
//					request.getParameter("password"));
			if (user != null) {
				request.getSession().setAttribute("user", user);
				if (user.getUsertype().equals("����Ա")) {
					response.sendRedirect(request.getContextPath()
							+ "/QueryTypeServlet");
					return;
				}
				if (user.getUsertype().equals("�û�")) {
					response.sendRedirect(request.getContextPath()
							+ "/QueryTypeServlet");
					return;
				}
			} else {
				request.setAttribute("msg", "�˺Ż����������");
				request.getRequestDispatcher("index.jsp").forward(request,
						response);
			}
		} catch (Exception e) {
			request.setAttribute("msg", "��¼�쳣�������µ�¼��");
			request.getRequestDispatcher("index.jsp")
					.forward(request, response);
		}
	}

}
