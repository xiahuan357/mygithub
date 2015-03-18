package com.news.web;

import java.util.List;

import javax.annotation.Resource;

import com.news.common.response.ServiceResponse;
import com.news.entity.NewsEntity;
import com.news.service.NewsServiceImpl;
import com.opensymphony.xwork2.ActionSupport;

public class QueryNewsStatusAction extends ActionSupport {
	 @Resource(name="newsservice")
	  private NewsServiceImpl newsservice ;
	 
	 private ServiceResponse<List<NewsEntity>> ret;
		public ServiceResponse<List<NewsEntity>> getRet() {
		return ret;
	}
	public void setRet(ServiceResponse<List<NewsEntity>> ret) {
		this.ret = ret;
	}
	private String username;
	
	public String getUsername() {
		return this.username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String querynewsstatus ()
	{
		ret = new ServiceResponse<List<NewsEntity>>();
		try {
			List<NewsEntity> attr = newsservice.querynewsstatus(new String(this.username.getBytes(
					"ISO-8859-1"), "UTF-8"));
				ret.setData(attr);
				ret.setFlag("000000");
				ret.setDesc("查询成功！");
				return "success";
		} catch (Exception e) {
			ret.setFlag("100000");
			ret.setDesc("查询出现未知错误！");
			return "error";
		}
	}
	public void setService(NewsServiceImpl newsservice) {
		this.newsservice = newsservice;
	}
}
