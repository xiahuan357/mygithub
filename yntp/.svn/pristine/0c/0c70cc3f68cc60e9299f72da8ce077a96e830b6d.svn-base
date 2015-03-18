package com.yn.yntp.common.entity;

import java.io.Serializable;

import javax.persistence.MappedSuperclass;

/**
 * 
 * @Title: BaseImageLibraryEntity.java
 * @Package com.yn.yntp.common.entity
 * @Description: 带有详细信息和图片库的实体，一般是需要在前台列表显示，并且需要有预览图，还带有UEditor，这里的
 *               景点，线路，酒店，汽车租赁，设备租赁，美食，特产 需要继承此类
 *
 * @author liucc
 * @date 2015年1月19日 上午10:57:27
 * @version V1.0
 */

@MappedSuperclass
public class BaseImageLibraryEntity<ID extends Serializable> extends
    BaseEntity<ID> {
  // 上传文件key
  private String imagekey;

  // 图片库，用于在列表和详细界面的轮播显示
  private String imagelibrarykey;

  // 封面图片名字，不含路径
  private String coverimagename;

  public String getImagekey() {
    return this.imagekey;
  }

  public void setImagekey(String imagekey) {
    this.imagekey = imagekey;
  }

  public String getImagelibrarykey() {
    return this.imagelibrarykey;
  }

  public void setImagelibrarykey(String imagelibrarykey) {
    this.imagelibrarykey = imagelibrarykey;
  }

  public String getCoverimagename() {
    return this.coverimagename;
  }

  public void setCoverimagename(String coverimagename) {
    this.coverimagename = coverimagename;
  }
  
}
