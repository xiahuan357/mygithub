package com.news.user.struts.action;

import java.util.List;

import javax.annotation.Resource;

import com.news.common.response.ServiceResponse;
import com.news.entity.UserEntity;
import com.news.service.UserLoginServiceImpl;
import com.opensymphony.xwork2.ActionSupport;

public class AddUserAction extends ActionSupport{
	@Resource(name="userLoginService")
	UserLoginServiceImpl userLoginService;
	 private ServiceResponse<List> ret;
		public ServiceResponse<List> getRet() {
		return ret;
	}
	public void setRet(ServiceResponse<List> ret) {
		this.ret = ret;
	}
	private String username;
	public String getUsername() {
		return this.username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getPassword() {
		return this.password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getEmail() {
		return this.email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPhone_number() {
		return this.phone_number;
	}
	public void setPhone_number(String phone_number) {
		this.phone_number = phone_number;
	}
	public Integer getUsertype() {
		return this.usertype;
	}
	public void setUsertype(Integer usertype) {
		this.usertype = usertype;
	}
	public Integer getUserstatus() {
		return this.userstatus;
	}
	public void setUserstatus(Integer userstatus) {
		this.userstatus = userstatus;
	}
	private String password;
	private String email;
	private String phone_number;
	private Integer usertype;
	private Integer userstatus;
	public String adduser()
	{
		ret =new ServiceResponse<List>();
		try {
			UserEntity user=new UserEntity();
			if(userLoginService.checkusername(this.username))
			{   
				ret.setFlag("100000");
				ret.setDesc("用户名已存在！请更换新的用户名！");
				return "success";
			}
			user.setEmail(this.email);
			user.setPassword(this.password);
			user.setPhone_number(this.phone_number);
			user.setUsername(this.username);
			user.setUserstatus(this.userstatus);
			user.setUsertype(this.usertype);
			userLoginService.adduser(user);
				ret.setFlag("000000");
				ret.setDesc("注册成功！");
				return "success";
		} catch (Exception e) {
			e.printStackTrace();
			ret.setFlag("100000");
			ret.setDesc("查询出现未知错误！");
			return "error";
		}
	}
	public void setService(UserLoginServiceImpl userLoginService) {
		this.userLoginService = userLoginService;
	}
}
