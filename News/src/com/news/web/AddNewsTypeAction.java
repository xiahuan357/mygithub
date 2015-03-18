package com.news.web;

import java.io.UnsupportedEncodingException;
import java.util.List;

import javax.annotation.Resource;

import org.apache.struts2.ServletActionContext;

import com.news.common.response.ServiceResponse;
import com.news.service.NewsServiceImpl;
import com.news.service.UserLoginServiceImpl;
import com.opensymphony.xwork2.ActionSupport;

public class AddNewsTypeAction extends ActionSupport {
     @Resource(name="newsservice")
    private NewsServiceImpl newsservice ;
     
    private String name;
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	 private ServiceResponse<List> ret;
		public ServiceResponse<List> getRet() {
		return ret;
	}
	public void setRet(ServiceResponse<List> ret) {
		this.ret = ret;
	}

	public String addnewstype()
	{
		ret = new ServiceResponse<List>();
		try {
			newsservice.addtype(this.name);
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
	public void setService(NewsServiceImpl newsservice) {
		this.newsservice = newsservice;
	}
}
