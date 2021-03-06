package com.yn.yntp.common.web.vo;

/**
 * 
 * @Title: TreeMultiSelectorOptionVO.java 
 * @Package com.yn.yntp.common.web.vo 
 * @Description: 分层的下拉框选择
 *
 * @author liucc    
 * @date 2014年12月4日 下午3:33:13 
 * @version V1.0 
 */

public class TreeMultiSelectorOptionVO extends MultiSelectorOptionVO {
 
  private Long parentid;
  
  private Boolean haschildren = Boolean.FALSE;

  public Long getParentid() {
    return this.parentid;
  }

  public void setParentid(Long parentid) {
    this.parentid = parentid;
  }

  public Boolean getHaschildren() {
    return this.haschildren;
  }

  public void setHaschildren(Boolean haschildren) {
    this.haschildren = haschildren;
  }
  
}
