package com.news.web;

import java.io.IOException;
import java.util.UUID;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.news.entity.UserEntity;
import com.news.service.UserLoginServiceImpl;
import com.news.validate.FormValidate;

/**
 * Servlet implementation class RegisterServlet
 */
@WebServlet("/RegisterServlet")
public class RegisterServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public RegisterServlet() {
		super();
		// TODO Auto-generated constructor stub
	}

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doGet(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		FormValidate form = new FormValidate();
		form.setUsername(request.getParameter("username"));
		form.setPassword(request.getParameter("password"));
		form.setSecpassword(request.getParameter("secpassword"));
		form.setEmail(request.getParameter("email"));
		form.setSecemail(request.getParameter("secemail"));
		form.setIdnum(request.getParameter("idnum"));
		form.setName(request.getParameter("name"));
		boolean bool = form.validate();
		if (bool) {
			request.setAttribute("form", form);
			request.getRequestDispatcher("register.jsp").forward(request,
					response);
			return;
		}
		UserLoginServiceImpl userService = new UserLoginServiceImpl();
		UserEntity user = new UserEntity();
//		user.setId(UUID.randomUUID().toString());
//		user.setName(form.getName());
//		user.setUsername(form.getUsername());
//		user.setPassword(form.getPassword());
//		user.setIdnum(form.getIdnum());
//		user.setType("�û�");
		try {
//			userService.register(user);
			request.setAttribute("msg", "ע��ɹ���");
			request.getRequestDispatcher("register.jsp").forward(request,
					response);
		} catch (RuntimeException e) {
			request.setAttribute("msg", "�û����Ѿ����ڣ�");
			request.getRequestDispatcher("register.jsp").forward(request,
					response);
			return;
		} catch (Exception e) {
			request.setAttribute("msg", "ע��ʧ�ܣ�������");
			request.getRequestDispatcher("register.jsp").forward(request,
					response);
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
