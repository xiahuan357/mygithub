package com.yn.yntp.common.entity;

import java.io.Serializable;

import org.apache.commons.lang3.builder.ReflectionToStringBuilder;
import org.springframework.data.domain.Persistable;

/**
 * 
 * @Title: AbstractEntity.java
 * @Package com.yn.yntp.common.entity
 * @Description: 抽象实体基类
 *
 * @author liucc
 * @date 2014年11月21日 下午7:05:19
 * @version V1.0
 */
public abstract class AbstractEntity<ID extends Serializable> implements
    Persistable<ID> {

  private static final long serialVersionUID = 1L;

  public abstract ID getId();

  /**
   * 设置id
   * 
   * @param id
   */
  public abstract void setId(final ID id);

  /**
   * 是否为新
   */
  public boolean isNew() {
    return null == getId();
  }

  /*
   * (non-Javadoc)
   *
   * @see java.lang.Object#equals(java.lang.Object)
   */
  @Override
  public boolean equals(Object obj) {

    if (null == obj) {
      return false;
    }

    if (this == obj) {
      return true;
    }

    if (!getClass().equals(obj.getClass())) {
      return false;
    }

    AbstractEntity<?> that = (AbstractEntity<?>) obj;

    return null == this.getId() ? false : this.getId().equals(that.getId());
  }

  /*
   * (non-Javadoc)
   *
   * @see java.lang.Object#hashCode()
   */
  @Override
  public int hashCode() {
    int hashCode = 17;

    hashCode += null == getId() ? 0 : getId().hashCode() * 31;

    return hashCode;
  }

  @Override
  public String toString() {
    return ReflectionToStringBuilder.toString(this);
  }
}
