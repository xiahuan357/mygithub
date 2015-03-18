package com.news.user.struts.action;

import java.util.List;

import javax.annotation.Resource;

import com.news.common.response.ServiceResponse;
import com.news.entity.UserEntity;
import com.news.service.UserLoginServiceImpl;
import com.opensymphony.xwork2.ActionSupport;


public class GetUserInfoAction extends ActionSupport {

	@Resource(name="userLoginService")
	UserLoginServiceImpl userLoginService;
	
	 private ServiceResponse<UserEntity> ret;
		public ServiceResponse<UserEntity> getRet() {
		return ret;
	}
	public void setRet(ServiceResponse<UserEntity> ret) {
		this.ret = ret;
	}

    public String frontgetuserinfo(){
//    	UserEntity userEntity = (UserEntity) ServletActionContext.getRequest().getSession().getAttribute("user");
    	    if(true){
    	      ret.setFlag("100000");
    	      ret.setDesc("用户没登陆");
    	    } else{
//    	      ret.setData(userEntity);
    	    }
    	return "success";
    	 
    }
       
    public void setService(UserLoginServiceImpl userLoginService) {
		this.userLoginService = userLoginService;
	}
}
