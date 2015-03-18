package com.yn.yntp.common.validate;

import java.io.Serializable;

import com.yn.yntp.common.entity.AbstractEntity;

/**
 * 
 * @Title: DefaultValidate.java 
 * @Package com.yn.yntp.common.validate 
 * @Description: TODO(用一句话描述该文件做什么) 
 *
 * @author liucc    
 * @date 2014年11月24日 下午3:34:48 
 * @version V1.0 
 */

public class DefaultValidate<M extends AbstractEntity, ID extends Serializable> extends AbstractValidate<M,ID> {

  /**
   * 设置当前ID
   * 
   * @param id
   */
  public void setID(ID id){
    this.id = id;
  }
  
  /**
   * 设置当前对象
   * 
   * @param currentEntity
   */
  public void setEntity(M currentEntity){
    this.currentEntity = currentEntity;
  }
  
  @Override
  public ReturnInfo validate(Object... param) {
    return new ReturnInfo();
  }

  @Override
  public ReturnInfo validateCreate(Object... param) {
    return new ReturnInfo();
  }

  @Override
  public ReturnInfo validateUpdate(Object... param) {
    return new ReturnInfo();
  }

  @Override
  public ReturnInfo validateDelete(Object... param) {
    return new ReturnInfo();
  }

}
