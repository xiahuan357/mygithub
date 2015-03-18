package com.yn.yntp.module.sys.permission.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

import com.yn.yntp.common.entity.BaseEntity;

/**
 * 
 * @Title: RoleEntity.java
 * @Package com.yn.yntp.module.sys.permission.entity
 * @Description: 角色资源实体
 *
 * @author liucc
 * @date 2014年11月21日 下午8:40:27
 * @version V1.0
 */
@Entity
@Table(name = "sys_role_resource")
public class RoleResourceEntity extends BaseEntity<Long> {

  private static final long serialVersionUID = 1L;

  @Column(name = "role_id")
  private Long roleid;

  @Column(name = "resource_id")
  private Long resourceid;

  public Long getResourceid() {
    return this.resourceid;
  }

  public void setResourceid(Long resourceid) {
    this.resourceid = resourceid;
  }

  public Long getRoleid() {
    return this.roleid;
  }

  public void setRoleid(Long roleid) {
    this.roleid = roleid;
  }

}
