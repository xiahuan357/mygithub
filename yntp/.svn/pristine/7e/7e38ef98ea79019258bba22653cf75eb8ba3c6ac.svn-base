package com.yn.yntp.module.sys.permission.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

import com.yn.yntp.common.entity.BaseEntity;

/**
 * 
 * @Title: RoleEntity.java
 * @Package com.yn.yntp.module.sys.permission.entity
 * @Description: 用户角色实体
 *
 * @author liucc
 * @date 2014年11月21日 下午8:40:27
 * @version V1.0
 */
@Entity
@Table(name = "sys_user_role")
public class UserRoleEntity extends BaseEntity<Long> {

  private static final long serialVersionUID = 1L;

  @Column(name = "user_id")
  private Long userid;
  
  @Column(name = "role_id")
  private Long roleid;

  public Long getUserid() {
    return this.userid;
  }

  public void setUserid(Long userid) {
    this.userid = userid;
  }

  public Long getRoleid() {
    return this.roleid;
  }

  public void setRoleid(Long roleid) {
    this.roleid = roleid;
  }
  
}
