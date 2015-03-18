package com.news.web;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Locale;

import javax.annotation.Resource;

import com.news.common.response.ServiceResponse;
import com.news.entity.NewsEntity;
import com.news.service.NewsServiceImpl;
import com.opensymphony.xwork2.ActionSupport;

public class UpdateNewsAction extends ActionSupport{
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
	public String getContent() {
		return this.content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	 private String id;
	 private String type;
	 private String content;
	 private String title;
	 private String time;
	 private String editor;
	 private String status;
	 private String imagekey;
	public String getImagekey() {
		return this.imagekey;
	}
	public void setImagekey(String imagekey) {
		this.imagekey = imagekey;
	}
	public String getStatus() {
		return this.status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getEditor() {
		return this.editor;
	}
	public void setEditor(String editor) {
		this.editor = editor;
	}
	public String getTime() {
		return this.time;
	}
	public void setTime(String time) {
		this.time = time;
	}
	public String getTitle() {
		return this.title;
	}
	public void setTitle(String title) {
		this.title = title;
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
		news.setContent(this.content);
		news.setId(this.id);
		news.setTitle(this.title);
		news.setTime(this.time);
		news.setType(this.type);
		news.setImagekey(this.imagekey);
		String dt=this.time.replaceAll(" GMT.+$", "");
		SimpleDateFormat pSdf=new SimpleDateFormat("EEE MMM DD yyyy HH:mm:ss",Locale.ENGLISH);
		SimpleDateFormat fSdf=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String result =fSdf.format(pSdf.parse(dt));
		news.setTime(result);
		try {
			newsservice.updatenews(news);
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
