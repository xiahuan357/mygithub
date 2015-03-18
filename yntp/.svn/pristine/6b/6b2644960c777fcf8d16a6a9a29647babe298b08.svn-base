package com.yn.yntp.common.validate;

import java.util.ArrayList;
import java.util.List;

/**
 * 
 * @Title: ReturnInfo.java 
 * @Package com.yn.yntp.common.validate 
 * @Description: TODO(用一句话描述该文件做什么) 
 *
 * @author liucc    
 * @date 2014年11月24日 下午3:08:09 
 * @version V1.0 
 */

public class ReturnInfo {
  private Boolean flag = Boolean.TRUE;
  private List<String> msgList;
  
  public ReturnInfo() {
    msgList = new ArrayList<String>();
  }

  public void append(String msg) {
    msgList.add(msg);
  }

  public void append(List<String> msgList) {
    msgList.addAll(msgList);
  }

  public void setFlag(Boolean flag) {
    this.flag = flag;
  }

  public Boolean getFlag() {
    return flag;
  }

  public String getMsg() {
    StringBuilder info = new StringBuilder();
    for (String msg : msgList) {
      info.append(msg).append("\r\n");
    }
    if (info.length() > 0) {
      info = info.delete(info.length() - 2, info.length() - 1);
    }
    return info.toString();
  }

  public List<String> getMsgList() {
    return msgList;
  }
}
