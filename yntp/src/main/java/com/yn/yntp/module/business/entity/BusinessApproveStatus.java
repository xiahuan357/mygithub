package com.yn.yntp.module.business.entity;

/**
 * 
 * @Title: BusinessApproveStatus.java 
 * @Package com.yn.yntp.module.business.entity 
 * @Description: TODO(用一句话描述该文件做什么) 
 *
 * @author liucc    
 * @date 2015年1月5日 下午8:36:37 
 * @version V1.0 
 */

public enum BusinessApproveStatus {
  // 审批状态0未审批1审批通过2审批不过
  NON_APPROVE(0, "未审批"),
  PASSED_APPROVE(1, "审批通过"),
  UNPASSED_APPROVE(2, "审批不过");

  private final Integer code;

  private final String name;

  private BusinessApproveStatus(Integer code, String name) {
    this.code = code;
    this.name = name;
  }

  public String getname() {
    return name;
  }

  public Integer getCode() {
    return this.code;
  }
}
