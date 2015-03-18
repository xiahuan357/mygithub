package com.yn.yntp.common.validate;

import java.io.Serializable;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.yn.yntp.common.entity.AbstractEntity;

/**
 * 
 * @Title: AbstractValidate.java 
 * @Package com.yn.yntp.common.validate 
 * @Description: TODO(用一句话描述该文件做什么) 
 *
 * @author liucc    
 * @date 2014年11月24日 下午2:05:09 
 * @version V1.0 
 */

public abstract class AbstractValidate<M extends AbstractEntity, ID extends Serializable>{
  /**
   * 日志对象
   */
  protected Logger logger = LoggerFactory.getLogger(getClass());
  
  /**
   * 当前操作ID
   */
  protected ID id;
  
  /**
   * 当前操作对象
   */
  protected M currentEntity;
  
  /**
   * 是否是新实体
   * 
   * @return
   */
  protected Boolean isNewEntity() {
    return currentEntity.getId() == null;
  }
  
  /**
   * 自定义校验
   * 
   * @param param
   * @return
   */
  public abstract ReturnInfo validate(Object ...param);
  
  /**
   * 创建校验
   * 
   * @param param
   * @return
   */
  public abstract ReturnInfo validateCreate(Object ...param);
  
  /**
   * 更新校验
   * 
   * @param param
   * @return
   */
  public abstract ReturnInfo validateUpdate(Object ...param);
  
  /**
   * 删除校验
   * 
   * @param param
   * @return
   */
  public abstract ReturnInfo validateDelete(Object ...param);
}
