package com.news.user.struts.action;

import java.util.List;

import javax.annotation.Resource;

import com.news.common.response.ServiceResponse;
import com.news.service.UserLoginServiceImpl;
import com.opensymphony.xwork2.ActionSupport;

public class UpdatePositionAction extends ActionSupport {

	@Resource(name="userLoginService")
	UserLoginServiceImpl userLoginService;
	 private ServiceResponse<List> ret;
		public ServiceResponse<List> getRet() {
		return ret;
	}
	public void setRet(ServiceResponse<List> ret) {
		this.ret = ret;
	}
	private Integer usertype;
	private Integer id;
	public Integer getId() {
		return this.id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public Integer getUsertype() {
		return this.usertype;
	}
	public void setUsertype(Integer usertype) {
		this.usertype = usertype;
	}
	public String updateposition()
	{
		ret =new ServiceResponse<List>();
		try {
			userLoginService.updateposition(this.id,this.usertype);
				ret.setFlag("000000");
				ret.setDesc("查询成功！");
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
