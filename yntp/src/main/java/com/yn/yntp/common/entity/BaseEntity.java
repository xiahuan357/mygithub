package com.yn.yntp.common.entity;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.MappedSuperclass;

import com.fasterxml.jackson.annotation.JsonFormat;

/**
 * 
 * @Title: BaseEntity.java
 * @Package com.yn.yntp.common.entity
 * @Description: 所有实体类的基类
 * @author liucc
 * @date 2014年11月21日 下午4:36:42
 * @version V1.0
 */

@MappedSuperclass
public abstract class BaseEntity<ID extends Serializable> extends
    AbstractEntity<ID> {

  private static final long serialVersionUID = 1L;

  @Id
  @Column
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private ID id;

  // 是否删除标示，删除数据，不真从数据库删除
  private Boolean delflag = Boolean.FALSE;

  // 创建时间
  @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
  private Date createtime;

  // 创建时间
  @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
  private Date updatetime;

  @Override
  public ID getId() {
    return id;
  }

  @Override
  public void setId(ID id) {
    this.id = id;
  }

  public Boolean getDelflag() {
    return this.delflag;
  }

  public void setDelflag(Boolean delflag) {
    this.delflag = delflag;
  }

  public Date getCreatetime() {
    return this.createtime;
  }

  public void setCreatetime(Date createtime) {
    this.createtime = createtime;
  }

  public Date getUpdatetime() {
    return this.updatetime;
  }

  public void setUpdatetime(Date updatetime) {
    this.updatetime = updatetime;
  }

}
