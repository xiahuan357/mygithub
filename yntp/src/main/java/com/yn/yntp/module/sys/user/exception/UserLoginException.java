package com.yn.yntp.module.sys.user.exception;

import org.apache.shiro.authc.AuthenticationException;

/**
 * 
 * @Title: UserLoginException.java
 * @Package com.yn.yntp.module.sys.user.exception
 * @Description: TODO(用一句话描述该文件做什么)
 *
 * @author liucc
 * @date 2014年12月7日 上午10:44:48
 * @version V1.0
 */

public class UserLoginException extends AuthenticationException {
  /**
   * 所属模块
   */
  private String module = "userlogin";

  /**
   * 错误消息
   */
  private String defaultMessage;
  
  /**
   * 错误码对应的参数
   */
  private Object[] args;

  public UserLoginException(String defaultMessage, Object[] args) {
    this.defaultMessage = defaultMessage;
    this.args = args;
  }

  public UserLoginException(String defaultMessage) {
    this(defaultMessage,null);
  }

  @Override
  public String getMessage() {
    return defaultMessage;
  }

  public String getModule() {
    return module;
  }

  public Object[] getArgs() {
    return args;
  }

  public String getDefaultMessage() {
    return defaultMessage;
  }

  @Override
  public String toString() {
    return this.getClass() + "{" + "module='" + module + '\'' + ", message='"
        + getMessage() + '\'' + '}';
  }
}
