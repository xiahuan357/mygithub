package com.news.image.web;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.UUID;

import org.apache.commons.io.FilenameUtils;
import org.apache.commons.io.IOUtils;
import org.apache.struts2.ServletActionContext;

import com.opensymphony.xwork2.ActionSupport;

public class CopyOfFileUploadAction extends ActionSupport{  
    
	    private File file;
	    private String fileFileName;
	    private String fileFileContentType;
	    private String message = "0"; // 0格式错误 1成功(文件路径)  2失败
	    private String filePath;
        private String newfilename;
		public String getNewfilename() {
			return this.newfilename;
		}

		public void setNewfilename(String newfilename) {
			this.newfilename = newfilename;
		}

		public String getFilePath() {
	        return filePath;
	    }

	    public void setFilePath(String filePath) {
	        this.filePath = filePath;
	    }

	    public String getMessage() {
	        return message;
	    }

	    public void setMessage(String message) {
	        this.message = message;
	    }

	    public File getFile() {
	        return file;
	    }

	    public void setFile(File file) {
	        this.file = file;
	    }

	    public String getFileFileName() {
	        return fileFileName;
	    }

	    public void setFileFileName(String fileFileName) {
	        this.fileFileName = fileFileName;
	    }

	    public String getFileFileContentType() {
	        return fileFileContentType;
	    }

	    public void setFileFileContentType(String fileFileContentType) {
	        this.fileFileContentType = fileFileContentType;
	    }
	    @Override
public String execute() throws Exception{  
	        String path = ServletActionContext.getRequest().getRealPath("/coverimage");
	        File file = new File(path); // 判断文件夹是否存在,如果不存在则创建文件夹
	        if (!file.exists()) {
	            file.mkdir();
	        }
	        String[] fileSuffix = new String[] { ".exe" };// 禁止文件
	        try {
	            File f = this.getFile();
	            // 判断文件格式
	            for (int i = 0; i < fileSuffix.length; i++) {
	                if (fileFileName.endsWith(fileSuffix[i])) {
	                    message = "格式不允许！";
	                    return "error";
	                }
	            }
	            String filetype= FilenameUtils.getExtension(fileFileName);
		    	newfilename =UUID.randomUUID().toString()+"."+filetype;
	            FileInputStream inputStream = new FileInputStream(f);
	            FileOutputStream outputStream = new FileOutputStream(path + "\\"
	                    + newfilename);
	            byte[] buf = new byte[1024];
	            int length = 0;
	            while ((length = inputStream.read(buf)) != -1) {
	                outputStream.write(buf, 0, length);
	            }
	            inputStream.close();
	            outputStream.flush();
	            message="上传成功,如需保存请发布！";
	        } catch (Exception e) {
	            e.printStackTrace();
	            message = "出现未知错误！";
	        }
	        return "success";
	    }
   

}
