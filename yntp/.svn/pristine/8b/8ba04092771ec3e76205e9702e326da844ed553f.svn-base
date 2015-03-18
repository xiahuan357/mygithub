package com.yn.yntp.common.web.upload.exception;

import org.apache.commons.fileupload.FileUploadException;

/**
 * 
 * @Title: FileNameLengthLimitExceededException.java 
 * @Package com.yn.yntp.common.web.upload.exception 
 * @Description: TODO(用一句话描述该文件做什么) 
 *
 * @author liucc    
 * @date 2014年11月29日 下午6:07:19 
 * @version V1.0
 */
public class FileNameLengthLimitExceededException extends FileUploadException {

    private static final long serialVersionUID = 1L;
    private int length;
    private int maxLength;
    private String filename;

    public FileNameLengthLimitExceededException(String filename, int length, int maxLength) {
        super("file name : [" + filename + "], length : [" + length + "], max length : [" + maxLength + "]");
        this.length = length;
        this.maxLength = maxLength;
        this.filename = filename;
    }

    public String getFilename() {
        return filename;
    }

    public int getLength() {
        return length;
    }


    public int getMaxLength() {
        return maxLength;
    }

}
