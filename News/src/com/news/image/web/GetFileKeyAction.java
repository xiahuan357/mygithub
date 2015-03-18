package com.news.image.web;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.annotation.Resource;

import com.news.common.response.ServiceResponse;
import com.news.common.util.FileOperate;
import com.opensymphony.xwork2.ActionSupport;

public class GetFileKeyAction extends ActionSupport {
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
	  /**
	   * 获得图片Key
	   * 
	   * @return
	   */
	  public String getFileKey() {
	    ret = new ServiceResponse<String>();
	    // 创建文件唯一名称
	    String uuid = UUID.randomUUID().toString();
	    ret.setData(uuid);
	    return "success";
	  }
}
