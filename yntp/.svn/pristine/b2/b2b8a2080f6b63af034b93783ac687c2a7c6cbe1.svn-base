package com.yn.yntp.common.vo;

import java.io.Serializable;
import java.util.List;

import com.yn.yntp.common.entity.BaseImageLibraryEntity;

/**
 * 
 * @Title: EntityWithImageLibraryVO.java 
 * @Package com.yn.yntp.common.vo 
 * @Description: 包装BaseImageLibraryEntity和图片数组，用于含有UEditor和图库的实体新增和更新
 *
 * @author liucc    
 * @date 2015年1月19日 上午11:35:33 
 * @version V1.0 
 */

public class EntityWithImageLibraryVO <M extends BaseImageLibraryEntity, ID extends Serializable> implements Serializable{

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
