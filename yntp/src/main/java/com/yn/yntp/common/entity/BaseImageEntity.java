package com.yn.yntp.common.entity;

import java.io.Serializable;

import javax.persistence.MappedSuperclass;

/**
 * 
 * @Title: BaseImageEntity.java 
 * @Package com.yn.yntp.common.entity 
 * @Description: 只带图片实体基类，一个imagekey，里面带有全部图片，或是用于UEditor，或是用在需要上传图片的地方
 *              这里的新闻，商家信息，民族特色，房间详情，线路行程等 继承此类
 *
 * @author liucc    
 * @date 2015年1月2日 上午11:17:59 
 * @version V1.0 
 */
@MappedSuperclass
public abstract class BaseImageEntity<ID extends Serializable> extends BaseEntity<ID> {

  // 上传文件key
  private String imagekey;

  public String getImagekey() {
    return this.imagekey;
  }

  public void setImagekey(String imagekey) {
    this.imagekey = imagekey;
  }
  
}
