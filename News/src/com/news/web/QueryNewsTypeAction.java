package com.news.web;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.apache.struts2.ServletActionContext;

import com.news.common.response.ServiceResponse;
import com.news.entity.NewsTypeEntity;
import com.news.entity.UserEntity;
import com.news.service.NewsServiceImpl;
import com.opensymphony.xwork2.ActionSupport;

public class QueryNewsTypeAction extends ActionSupport{
	
	 @Resource(name="newsservice")
	  private NewsServiceImpl newsservice ;
	 
	 private ServiceResponse<List<NewsTypeEntity>> ret;
		public ServiceResponse<List<NewsTypeEntity>> getRet() {
		return ret;
	}
	public void setRet(ServiceResponse<List<NewsTypeEntity>> ret) {
		this.ret = ret;
	}
		public String queryNewsType()
		{
			 ret = new ServiceResponse<List<NewsTypeEntity>>();
			try {
				List<NewsTypeEntity> attr = newsservice.querytype();
					ret.setData(attr);
					ret.setFlag("000000");
					ret.setDesc("查询成功！");
					return "newstype";
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
