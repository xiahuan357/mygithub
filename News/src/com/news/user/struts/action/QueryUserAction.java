package com.news.user.struts.action;

import java.util.List;

import javax.annotation.Resource;


import com.news.common.response.ServiceResponse;
import com.news.entity.UserEntity;
import com.news.service.UserLoginServiceImpl;
import com.opensymphony.xwork2.ActionSupport;

public class QueryUserAction extends ActionSupport {

	@Resource(name="userLoginService")
	UserLoginServiceImpl userLoginService;
	
	private ServiceResponse<List<UserEntity>> ret;
	public ServiceResponse<List<UserEntity>> getRet() {
		return this.ret;
	}
	public void setRet(ServiceResponse<List<UserEntity>> ret) {
		this.ret = ret;
	}
	public String queryuser() 
	{  
		 ret = new ServiceResponse<List<UserEntity>>();
		 List<UserEntity> attr  =userLoginService.queryuser();
		ret.setFlag("000000");
		ret.setDesc("查询成功");
		ret.setData(attr);
		return "success";
		
	}
	public void setService(UserLoginServiceImpl userLoginService) {
		this.userLoginService = userLoginService;
	}

}
