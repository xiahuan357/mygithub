package com.news.image.web;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import com.news.common.response.ServiceResponse;
import com.news.common.util.FileOperate;
import com.opensymphony.xwork2.ActionSupport;

public class ClearImageAction extends ActionSupport {
	@Resource(name="fileOpt")
	 protected FileOperate fileOpt;

	  // 项目根路径
	  public static final String projectBase = "/News/";

	  // 图片存放路径
	  public static final String uploadPath = "upload/image/";

	  // 记录上传的文件
	  protected Map<String, List<String>> uploadedImageFileMap = new HashMap<String, List<String>>();
		 private ServiceResponse<String> ret;
		 
		public ServiceResponse<String> getRet() {
			return ret;
		}
		public void setRet(ServiceResponse<String> ret) {
			this.ret = ret;
		}
       private String imagekey;
		 public String getImagekey() {
		return imagekey;
	}
	public void setImagekey(String imagekey) {
		this.imagekey = imagekey;
	}
		public void clearImageMap() {
			    uploadedImageFileMap.remove(this.imagekey);
			  }
}
