package com.news.common.util;

import java.io.File;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts2.ServletActionContext;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;

import com.news.common.util.FileOperate;
import com.opensymphony.xwork2.ActionSupport;

public class UeditorUploadAction extends ActionSupport{
	@Resource(name = "fileOpt")
	private FileOperate fileOpt;
	
	private String imagekey;
	public String getImagekey() {
		return imagekey;
	}

	public void setImagekey(String imagekey) {
		this.imagekey = imagekey;
	}

	Map<String, String> retMap;

	public Map<String, String> getRetMap() {
		return retMap;
	}

	public void setRetMap(Map<String, String> retMap) {
		this.retMap = retMap;
	}

	// 项目根路径
	public static final String projectBase = "/News/";

	// 图片存放路径
	public static final String uploadPath = "upload/image/";
	// 记录上传的文件
	public String ueditorupload(HttpServletRequest request,HttpServletResponse response) {
		Map<String, List<String>> uploadedImageFileMap = new HashMap<String, List<String>>();
		ServletContext sc = request.getSession().getServletContext();
		String serverBase = sc.getRealPath("/");

		// 设置上下方文
		CommonsMultipartResolver multipartResolver = new CommonsMultipartResolver(
				request.getSession().getServletContext());
		// 返回结果
		retMap = new HashMap<String, String>();
		// 检查form是否有enctype="multipart/form-data"
		if (multipartResolver.isMultipart(request)) {
			MultipartHttpServletRequest multiRequest = (MultipartHttpServletRequest) request;

			Iterator<String> iter = multiRequest.getFileNames();
			while (iter.hasNext()) {
				// 由CommonsMultipartFile继承而来,拥有上面的方法.
				MultipartFile file = multiRequest.getFile(iter.next());
				if (file != null) {
					String fileKey;
					try {
						fileKey = new String(
								this.imagekey.getBytes("ISO-8859-1"), "UTF-8");
						// 获得图片地址
						String targetFolder = serverBase + uploadPath + fileKey;
						fileOpt.createFolder(targetFolder);
						Date crtDate = new Date();
						// 检查文件后缀格式
						String fileEnd = file.getOriginalFilename()
								.substring(file.getOriginalFilename().lastIndexOf(".") + 1).toLowerCase();
					     String newFileName = crtDate.getTime() + "." + fileEnd;
						String relativePath = uploadPath + fileKey + "/"
								+ newFileName;
						String path = serverBase + relativePath;

						// 保存图片
						File localFile = new File(path);
						file.transferTo(localFile);

						// 记录上传的文件
						if (uploadedImageFileMap.containsKey(fileKey)) {
							uploadedImageFileMap.get(fileKey).add(
									projectBase + relativePath);
						} else {
							List<String> imageList = new ArrayList<String>();
							imageList.add(projectBase + relativePath);
							uploadedImageFileMap.put(fileKey, imageList);
						}

						// 返回信息
						retMap.put("original", file.getOriginalFilename());
						retMap.put("url", relativePath);
						retMap.put("title", "");
						retMap.put("state", "SUCCESS");
						
					} catch (Exception e) {
						e.printStackTrace();
					}
				}
				}
			
		
	}
		return "";
		
			}
}
