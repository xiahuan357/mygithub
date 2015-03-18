package com.news.web;

import java.util.List;

import javax.annotation.Resource;

import com.news.common.response.SelectOptionVO;
import com.news.common.response.ServiceResponse;
import com.news.service.NewsServiceImpl;
import com.opensymphony.xwork2.ActionSupport;

public class GetTypeSelectAction extends ActionSupport {
	 @Resource(name="newsservice")
	 private NewsServiceImpl newsservice ;
	 
	 private ServiceResponse<List<SelectOptionVO>> ret;

	public ServiceResponse<List<SelectOptionVO>> getRet() {
		return this.ret;
	}

	public void setRet(ServiceResponse<List<SelectOptionVO>> ret) {
		this.ret = ret;
	}
	public String gettypeselect()
	{
		ret = new ServiceResponse<List<SelectOptionVO>>();

	    ret.setData(newsservice.querytypeselect());
	    
	    return "success";
	}
	public void setService(NewsServiceImpl newsservice) {
		this.newsservice = newsservice;
	}
}
