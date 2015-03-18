package com.news.user.struts.action;

import java.sql.ResultSet;
import javax.annotation.Resource;
import org.apache.struts2.ServletActionContext;
import com.news.common.response.ServiceResponse;
import com.news.entity.UserEntity;
import com.news.service.UserLoginServiceImpl;
import com.opensymphony.xwork2.ActionSupport;


@SuppressWarnings("serial")
public class UserAction extends ActionSupport {

	@Resource(name="userLoginService")
	UserLoginServiceImpl userLoginService;
	public Object getuserinfo() 
	{  
		UserEntity user=new UserEntity();
		ServiceResponse<UserEntity> ret = new ServiceResponse<UserEntity>();
		user =userLoginService.login(ServletActionContext.getRequest()
				.getParameter("username"), ServletActionContext.getRequest()
				.getParameter("password"));
		ret.setFlag("000000");
		ret.setDesc("出现未知错误");
		ret.setData(user);
		return ret ;
		
	}
	public void setService(UserLoginServiceImpl userLoginService) {
		this.userLoginService = userLoginService;
	}
}
