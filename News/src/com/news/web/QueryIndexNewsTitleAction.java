package com.news.web;

import java.util.List;

import javax.annotation.Resource;

import com.news.common.response.ServiceResponse;
import com.news.entity.NewsEntity;
import com.news.service.NewsServiceImpl;
import com.opensymphony.xwork2.ActionSupport;

public class QueryIndexNewsTitleAction extends ActionSupport {
	 @Resource(name="newsservice")
	  private NewsServiceImpl newsservice ;
	 
	 private ServiceResponse<List<NewsEntity>> ret;
		public ServiceResponse<List<NewsEntity>> getRet() {
		return ret;
	}
	public void setRet(ServiceResponse<List<NewsEntity>> ret) {
		this.ret = ret;
	}
	private String type;
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public String queryindexnewstitle()
	{
		 ret = new ServiceResponse<List<NewsEntity>>();
		try {
			List<NewsEntity> attr = newsservice.queryindextitle(new String(this.type.getBytes(
					"ISO-8859-1"), "UTF-8"));
				ret.setData(attr);
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
