package com.yn.yntp.module.sys.user.entity;

/**
 * 
 * @Title: UserStatus.java 
 * @Package com.yn.yntp.module.sys.user.entity 
 * @Description: 用户状态
 *
 * @author liucc    
 * @date 2014年11月27日 下午5:00:30 
 * @version V1.0
 */
public enum UserStatus {

  BLOCKED(0, "封禁状态"),
  NORMAL(1, "正常状态"),
  UNACTIVE(2,"注册未激活");

  private final Integer code;

  private final String name;

  private UserStatus(Integer code, String name) {
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
