package com.news.web;

import java.util.List;

import javax.annotation.Resource;

import com.news.common.response.ServiceResponse;
import com.news.service.NewsServiceImpl;
import com.opensymphony.xwork2.ActionSupport;

public class DeleteNewsAction extends ActionSupport {
	@Resource(name="newsservice")
	  private NewsServiceImpl newsservice ;
	  private String type;
	  private String id;
	  public String getId() {
		return this.id;
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
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public String deletenews(){
		
		ret = new ServiceResponse<List>();
		try {
			newsservice.delete(this.type,this.id);
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
