package com.yn.yntp.module.sys.user.entity;

/**
 * 
 * @Title: UserStatus.java 
 * @Package com.yn.yntp.module.sys.user.entity 
 * @Description: 用户类型
 *
 * @author liucc    
 * @date 2014年11月27日 下午5:00:30 
 * @version V1.0
 */
public enum UserType {
  // 用户类型0 系统管理员；1 商家用户；2 个人用户
  ADMIN(0, "系统管理员"),
  BUSINESS(1, "商家用户"),
  PERSONAL(2, "个人用户");

  private final Integer code;

  private final String name;

  private UserType(Integer code, String name) {
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
