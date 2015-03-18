package com.news.web;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.List;
import java.util.Locale;

import javax.annotation.Resource;

import com.news.common.response.ServiceResponse;
import com.news.entity.NewsEntity;
import com.news.service.NewsServiceImpl;
import com.opensymphony.xwork2.ActionSupport;

public class UpdateNewsStatusAction extends ActionSupport{
	@Resource(name="newsservice")
	private NewsServiceImpl newsservice ;
	public String getId() {
		return this.id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getType() {
		return this.type;
	}
	public void setType(String type) {
		this.type = type;
	}
	 private String id;
	 private String type;
	 private String status;
	public String getStatus() {
		return this.status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	 private ServiceResponse<List> ret;
		public ServiceResponse<List> getRet() {
		return ret;
	}
	public void setRet(ServiceResponse<List> ret) {
		this.ret = ret;
	}
	public String updatenews() throws ParseException
	{
		ret =new ServiceResponse<List>();
		NewsEntity news =  new NewsEntity();
		news.setId(this.id);
		news.setType(this.type);
		news.setStatus(this.status);
		try {
			newsservice.updatenewsstatus(news);
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
