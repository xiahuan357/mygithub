package com.news.image.web;

import java.io.File;
import java.io.UnsupportedEncodingException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;

import com.news.common.response.ServiceResponse;
import com.news.common.util.FileOperate;
import com.opensymphony.xwork2.ActionSupport;

public class UpdateCancelDeleteImageAction extends ActionSupport {
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
	public void updateCancelDeleteImage(HttpServletRequest request) {
		    ServletContext sc = request.getSession().getServletContext();
		    String serverBase = sc.getRealPath("/");

		    List<String> uploadedFileList = uploadedImageFileMap.get(this.imagekey);
		    if (uploadedFileList == null || uploadedFileList.size() == 0)
		      return;

		    String targetFolderPath = serverBase + uploadPath + this.imagekey;

		    for (String image : uploadedFileList) {
		      String imageName = image.substring(image.lastIndexOf("/") + 1);

		      String deleteImagePath = targetFolderPath + "/" + imageName;
		      File crtFile = new File(deleteImagePath);
		      File parentDir = crtFile.getParentFile();
		      fileOpt.delFile(deleteImagePath);
		      // 如果父亲文件夹空了，删除之
		      if (parentDir != null && parentDir.list().length == 0) {
		        parentDir.delete();
		      }
		    }
		  }
}
