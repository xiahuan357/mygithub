package com.yn.yntp.common.web.vo;

import java.io.Serializable;
import java.util.Map;

/**
 * 
 * @Title: TreeTableOptionVO.java
 * @Package com.yn.yntp.common.web.vo
 * @Description: 用于树表的数据结构
 *
 * @author liucc
 * @date 2015年1月10日 上午10:42:11
 * @version V1.0
 */

public class TreeTableOptionVO implements Serializable {

  // 数据id*
  private Long id;

  // 父亲id
  private Long pid;
  
  // 排序，可不选
  private Integer order;

  // 是否为叶子
  private Boolean isLeaf;

  // 显示的数据，键值对例如{typename:'Group B'}
  private Map dataObject;

  // 自定义数据，键值对例如{isGroup:true,jsonName:'jsonNodes_B'}
  private Map userObject;

  public Long getId() {
    return this.id;
  }

  public void setId(Long id) {
    this.id = id;
  }
  
  public Long getPid() {
    return this.pid;
  }

  public void setPid(Long pid) {
    this.pid = pid;
  }

  public Integer getOrder() {
    return this.order;
  }

  public void setOrder(Integer order) {
    this.order = order;
  }

  public Boolean getIsLeaf() {
    return this.isLeaf;
  }

  public void setIsLeaf(Boolean isLeaf) {
    this.isLeaf = isLeaf;
  }

  public Map getDataObject() {
    return this.dataObject;
  }

  public void setDataObject(Map dataObject) {
    this.dataObject = dataObject;
  }

  public Map getUserObject() {
    return this.userObject;
  }

  public void setUserObject(Map userObject) {
    this.userObject = userObject;
  }
  
  
}
