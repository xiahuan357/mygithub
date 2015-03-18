package com.yn.yntp.common.web.vo;

import java.io.Serializable;
import java.util.List;

/**
 * 
 * @Title: TreeOptionVO.java
 * @Package com.yn.yntp.common.web.vo
 * @Description: 树形数据结构
 *
 * @author liucc
 * @date 2015年3月13日 上午9:22:34
 * @version V1.0
 */

public class TreeOptionVO implements Serializable {

  private Object nodeData = null;

//  private TreeOptionVO parentNode = null;
  private Long parentID = null;

  public Long getParentID() {
    return this.parentID;
  }

  public void setParentID(Long parentID) {
    this.parentID = parentID;
  }

  private List<TreeOptionVO> childrenNodeList = null;

  public Object getNodeData() {
    return this.nodeData;
  }

  public void setNodeData(Object nodeData) {
    this.nodeData = nodeData;
  }

//  public TreeOptionVO getParentNode() {
//    return this.parentNode;
//  }
//
//  public void setParentNode(TreeOptionVO parentNode) {
//    this.parentNode = parentNode;
//  }

  public List<TreeOptionVO> getChildrenNodeList() {
    return this.childrenNodeList;
  }

  public void setChildrenNodeList(List<TreeOptionVO> childrenNodeList) {
    this.childrenNodeList = childrenNodeList;
  }
  
  public void addChildNode(TreeOptionVO childNode){
    this.childrenNodeList.add(childNode);
  }

}
