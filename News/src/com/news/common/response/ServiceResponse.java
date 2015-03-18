package com.news.common.response;

import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonProperty;

public class ServiceResponse<T> implements Serializable {
	 private static final long serialVersionUID = 1L;

	  private String flag = "000000"; // 成功的返回码

	  private String desc = ""; // 成功时返回空字符串

	  public String getFlag() {
		return flag;
	}


	public void setFlag(String flag) {
		this.flag = flag;
	}


	public String getDesc() {
		return desc;
	}


	public void setDesc(String desc) {
		this.desc = desc;
	}

	private T data = null;

	  public ServiceResponse() {
	  }

	
	  public T getData() {
	    return data;
	  }

	  public void setData(T data) {
	    this.data = data;
	  }
}
