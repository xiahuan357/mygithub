package com.yn.yntp.module.scenic.entity;

/**
 * 
 * @Title: ScenicDirectorEntity.java 
 * @Package com.yn.yntp.module.scenic.entity 
 * @Description: TODO(用一句话描述该文件做什么) 
 *
 * @author liucc    
 * @date 2015年1月25日 下午9:07:39 
 * @version V1.0 
 */

public class ScenicDirectorEntity extends ScenicEntity {
  // 最低门票价格
  private Double minTicketPrice;

  public Double getMinTicketPrice() {
    return this.minTicketPrice;
  }

  public void setMinTicketPrice(Double minTicketPrice) {
    this.minTicketPrice = minTicketPrice;
  }
  
}
