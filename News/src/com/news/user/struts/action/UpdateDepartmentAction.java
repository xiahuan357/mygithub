package com.news.user.struts.action;

import java.util.List;

import javax.annotation.Resource;

import com.news.common.response.ServiceResponse;
import com.news.service.UserLoginServiceImpl;
import com.opensymphony.xwork2.ActionSupport;

public class UpdateDepartmentAction extends ActionSupport {

	@Resource(name="userLoginService")
	UserLoginServiceImpl userLoginService;
	 private ServiceResponse<List> ret;
		public ServiceResponse<List> getRet() {
		return ret;
	}
	public void setRet(ServiceResponse<List> ret) {
		this.ret = ret;
	}
	private String department;
	public String getDepartment() {
		return this.department;
	}
	public void setDepartment(String department) {
		this.department = department;
	}
	private Integer id;
	public Integer getId() {
		return this.id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String updatedepartment()
	{
		ret =new ServiceResponse<List>();
		try {
			userLoginService.updatedeparment(this.id,this.department);
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
