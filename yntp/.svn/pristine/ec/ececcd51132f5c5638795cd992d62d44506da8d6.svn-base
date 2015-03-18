package com.yn.yntp.common.entity.response;

import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * 
 * @Title: ServiceResponse.java
 * @Package com.yn.yntp.common.entity.response
 * @Description: RESTful接口返回格式
 *
 * @author liucc
 * @date 2014年11月21日 下午9:43:30
 * @version V1.0
 */
public class ServiceResponse<T> implements Serializable {
  /**
	 * 
	 */
  private static final long serialVersionUID = 1L;

  @JsonProperty(value = "flag")
  private String retcode = "000000"; // 成功的返回码

  @JsonProperty(value = "desc")
  private String retmsg = ""; // 成功时返回空字符串

  @JsonProperty(value = "data")
  private T data = null;

  public ServiceResponse() {
  }

  public String getRetcode() {
    return retcode;
  }

  public void setRetcode(String retcode) {
    this.retcode = retcode;
  }

  public String getRetmsg() {
    return retmsg;
  }

  public void setRetmsg(String retmsg) {
    this.retmsg = retmsg;
  }

  public T getData() {
    return data;
  }

  public void setData(T data) {
    this.data = data;
  }
}
