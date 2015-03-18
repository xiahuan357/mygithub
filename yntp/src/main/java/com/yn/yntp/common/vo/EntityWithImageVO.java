package com.yn.yntp.common.vo;

import java.io.Serializable;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.yn.yntp.common.entity.BaseImageEntity;

/**
 * 
 * @Title: EntityWithImageVO.java
 * @Package com.yn.yntp.common.vo
 * @Description: 包装BaseImageEntity和图片数组，用于UEditor的实体新增和更新
 *
 * @author liucc
 * @date 2015年1月2日 上午10:32:45
 * @version V1.0
 */

public class EntityWithImageVO<M extends BaseImageEntity, ID extends Serializable> implements Serializable{
  /**
   * 日志对象
   */
  protected Logger logger = LoggerFactory.getLogger(getClass());

  /**
   * 当前操作ID
   */
  private ID id;

  /**
   * 当前操作对象
   */
  private M currentEntity;

  /**
   * 图片名称集合
   */
  private List<String> imagelist;

  public ID getId() {
    return this.id;
  }

  public void setId(ID id) {
    this.id = id;
  }

  public M getCurrentEntity() {
    return this.currentEntity;
  }

  public void setCurrentEntity(M currentEntity) {
    this.currentEntity = currentEntity;
  }

  public List<String> getImagelist() {
    return this.imagelist;
  }

  public void setImagelist(List<String> imagelist) {
    this.imagelist = imagelist;
  }
  
}
