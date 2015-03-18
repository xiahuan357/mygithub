package com.news.web;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.Properties;
import java.util.UUID;

import javax.annotation.Resource;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;

import org.apache.struts2.ServletActionContext;
import org.json.JSONObject;

import com.news.common.response.ServiceResponse;
import com.news.common.util.FileOperate;
import com.news.entity.NewsEntity;
import com.news.service.NewsServiceImpl;
import com.opensymphony.xwork2.ActionSupport;
import com.opensymphony.xwork2.inject.util.Strings;

public class AddNewsAction extends ActionSupport {
	@Resource(name="fileOpt")
	 protected FileOperate fileOpt;

	  // 项目根路径
	  public static final String projectBase = "/News/";

	  // 图片存放路径
	  public static final String uploadPath = "upload/image/";
	 @Resource(name="newsservice")
	  private NewsServiceImpl newsservice ;
	 public NewsServiceImpl getNewsservice() {
		return this.newsservice;
	}
	public void setNewsservice(NewsServiceImpl newsservice) {
		this.newsservice = newsservice;
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
	 private String type;
	 private String content;
	 private String imagekey;
	 private String title;
	 private String time;
	 private String status;
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
	private String editor;
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
	public String getImagekey() {
		return this.imagekey;
	}
	public void setImagekey(String imagekey) {
		this.imagekey = imagekey;
	}
	 private ServiceResponse<List> ret;
		public ServiceResponse<List> getRet() {
		return ret;
	}
	public void setRet(ServiceResponse<List> ret) {
		this.ret = ret;
	}
        private  List<String> imagelist;
	public List<String> getImagelist() {
			return this.imagelist;
		}
		public void setImagelist(List<String> imagelist) {
			this.imagelist = imagelist;
		}
	String newsid=UUID.randomUUID().toString();
	public String addnews() throws ParseException {
		ret = new ServiceResponse<List>();
		NewsEntity news =  new NewsEntity();
		news.setContent(this.content);
		news.setImagekey(this.imagekey);
		news.setTitle(this.title);
		news.setEditor(this.editor);
		news.setStatus(this.status);
		String dt=this.time.replaceAll(" GMT.+$", "");
		SimpleDateFormat pSdf=new SimpleDateFormat("EEE MMM DD yyyy HH:mm:ss",Locale.ENGLISH);
		SimpleDateFormat fSdf=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String result =fSdf.format(pSdf.parse(dt));
		news.setTime(result);
		news.setType(this.type);
		news.setId(newsid);
		// 处理上传的图片，因为有上传，但是删除的，那么需要将删除的图片从服务器删除
//	    List<String> avilabelImageList = this.imagelist;
//	    ServletContext sc = request.getSession().getServletContext();
//	    String serverBase = sc.getRealPath("/");
		try {
//		      clearUnUsedImage(serverBase,avilabelImageList,this.imagekey);
			   creatNewsHtml();
			    newsservice.add(news);
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
	public void creatNewsHtml()
	{   
		String templateContent = "";
		try {
			String filepath=ServletActionContext.getServletContext().getRealPath("/html/newshtml")+"/news.html";	
			FileInputStream fileinputstream = new FileInputStream(filepath);
			int lenght = fileinputstream.available();
			byte bytes[] = new byte[lenght];
			fileinputstream.read(bytes);
			fileinputstream.close();
			templateContent = new String(bytes);
			System.out.print(templateContent);
			templateContent = templateContent.replaceAll("##type##", this.type);
			templateContent = templateContent.replaceAll("##id##",newsid);
			System.out.print(templateContent);
			String filename =newsid+".html";
			filename = ServletActionContext.getServletContext().getRealPath("/html/newshtml")  +"/"+filename;
			FileOutputStream fileoutputstream = new FileOutputStream(filename);
			System.out.print("文件输出路径:");
			System.out.print(filename);
			byte tag_bytes[] = templateContent.getBytes("UTF-8");
			fileoutputstream.write(tag_bytes);
			fileoutputstream.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	  public void setService(NewsServiceImpl newsservice) {
			this.newsservice = newsservice;
		}

}
