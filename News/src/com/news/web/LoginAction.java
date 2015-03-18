package com.news.web;

import java.sql.ResultSet;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.apache.struts2.ServletActionContext;
import org.apache.struts2.interceptor.ServletRequestAware;

import com.news.common.response.ServiceResponse;
import com.news.entity.UserEntity;
import com.news.service.UserLoginServiceImpl;
import com.opensymphony.xwork2.ActionSupport;

@SuppressWarnings("serial")
public class LoginAction extends ActionSupport {

	private static final String ADMIN = "admin";
	private static final String JOURNALIST = "journalist";
	private static final String EDITOR = "editor";
	private static final String CHIEFEDITOR = "chiefeditor";
	@Resource(name="userLoginService")
	UserLoginServiceImpl userLoginService;
	
	private UserEntity user;
	private String username;
	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	private String password;
	public UserEntity getUser() {
		return user;
	}

	public void setUser(UserEntity user) {
		this.user = user;
	}

	public String userlogin() throws Exception 
	{
       user =new UserEntity();
       
       user=userLoginService.login(this.username, this.password);
       if (user!= null) {
			ServletActionContext.getRequest().getSession()
					.setAttribute("user", user);
			return "success";
		}
		else {
			return "error";
			
		}
}
   
	public void setService(UserLoginServiceImpl userLoginService) {
		this.userLoginService = userLoginService;
	}
}
