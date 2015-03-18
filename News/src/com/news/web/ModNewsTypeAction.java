package com.news.web;

import java.util.List;

import javax.annotation.Resource;

import com.news.common.response.ServiceResponse;
import com.news.service.NewsServiceImpl;
import com.opensymphony.xwork2.ActionSupport;

public class ModNewsTypeAction extends ActionSupport{
	@Resource(name="newsservice")
	private NewsServiceImpl newsservice ;
	
	private String oldtype;
	public String getOldtype() {
		return this.oldtype;
	}
	public void setOldtype(String oldtype) {
		this.oldtype = oldtype;
	}
	public String getNewtype() {
		return this.newtype;
	}
	public void setNewtype(String newtype) {
		this.newtype = newtype;
	}
	private String newtype;
	private String id;
	  public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	private ServiceResponse<List> ret;
		public ServiceResponse<List> getRet() {
		return ret;
	}
	public void setRet(ServiceResponse<List> ret) {
		this.ret = ret;
	}
	
	
	public String modnewstype()
	{
		ret = new ServiceResponse<List>();
		try {
			newsservice.updatenewstype(this.id,this.oldtype,this.newtype);
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
