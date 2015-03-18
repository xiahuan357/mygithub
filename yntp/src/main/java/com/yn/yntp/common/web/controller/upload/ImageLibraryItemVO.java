package com.yn.yntp.common.web.controller.upload;

import java.io.Serializable;

/**
 * 
 * @Title: ImageLibraryItemVO.java
 * @Package com.yn.yntp.common.web.controller.upload
 * @Description: TODO(用一句话描述该文件做什么)
 *
 * @author liucc
 * @date 2015年1月19日 上午9:25:26
 * @version V1.0
 */

public class ImageLibraryItemVO implements Serializable {
  public String fileName;

  public String getFileName() {
    return this.fileName;
  }

  public void setFileName(String fileName) {
    this.fileName = fileName;
  }

}
