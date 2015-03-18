package com.yn.yntp.module.sys.permission.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

import com.yn.yntp.common.entity.BaseEntity;

/**
 * 
 * @Title: ResourceEntity.java
 * @Package com.yn.yntp.module.sys.permission.entity
 * @Description: TODO(用一句话描述该文件做什么)
 *
 * @author liucc
 * @date 2014年11月27日 下午6:49:24
 * @version V1.0
 */
@Entity
@Table(name = "sys_resource")
public class ResourceEntity extends BaseEntity<Long> {

  private static final long serialVersionUID = 1L;

  /**
   * 标题
   */
  private String name;

  /**
   * 资源标识符 用于权限匹配的 如sys:resource
   */
  private String code;

  /**
   * 点击后前往的地址
   * 菜单才有
   */
  private String url;

  /**
   * 父路径
   */
  @Column(name = "parent_id")
  private Long parentid;

  @Column(name = "parent_ids")
  private String parentids;

  // 权重
  private Integer weight;

  /**
   * 图标
   */
  private String icon;

  /**
   * 是否显示
   */
  @Column(name = "is_show")
  private Boolean show = Boolean.FALSE;

  public String getName() {
    return name;
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

  public String getUrl() {
    return url;
  }

  public void setUrl(String url) {
    this.url = url;
  }

  public Long getParentid() {
    return parentid;
  }

  public void setParentid(Long parentid) {
    this.parentid = parentid;
  }

  public String getParentids() {
    return parentids;
  }

  public void setParentids(String parentids) {
    this.parentids = parentids;
  }

  public Integer getWeight() {
    return weight;
  }

  public void setWeight(Integer weight) {
    this.weight = weight;
  }

  public String getIcon() {
    return icon;
  }

  public void setIcon(String icon) {
    this.icon = icon;
  }

  public Boolean getShow() {
    return show;
  }

  public void setShow(Boolean show) {
    this.show = show;
  }

}
