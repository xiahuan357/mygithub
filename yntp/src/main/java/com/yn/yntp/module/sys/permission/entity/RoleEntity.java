package com.yn.yntp.module.sys.permission.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

import com.yn.yntp.common.entity.BaseEntity;

/**
 * 
 * @Title: RoleEntity.java
 * @Package com.yn.yntp.module.sys.permission.entity
 * @Description: 角色实体
 *
 * @author liucc
 * @date 2014年11月21日 下午8:40:27
 * @version V1.0
 */
@Entity
@Table(name = "sys_role")
public class RoleEntity extends BaseEntity<Long> {

  private static final long serialVersionUID = 1L;

  // 角色名称
  private String name;

  // 角色编码
  private String code;

  // 角色描述
  private String description;

  /**
   * 是否显示 也表示是否可用 为了统一 都使用这个
   */
  @Column(name = "is_show")
  private Boolean show = Boolean.TRUE;

  public String getName() {
    return this.name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getCode() {
    return this.code;
  }

  public void setCode(String code) {
    this.code = code;
  }

  public String getDescription() {
    return this.description;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  public Boolean getShow() {
    return this.show;
  }

  public void setShow(Boolean show) {
    this.show = show;
  }

}
