package com.yn.yntp.common.entity.enums;

/**
 * 
 * @Title: OrderStatusEnum.java 
 * @Package com.yn.yntp.common.entity.enums 
 * @Description: 订单状态
 *
 * @author liucc    
 * @date 2015年1月26日 上午10:57:21 
 * @version V1.0 
 */

public enum OrderStatusEnum {
  TO_BE_PROCESS(0, "待处理"),
  TO_BE_PAY(1, "待付款"),
  TO_BE_DELIVER(2, "待发货"),
  TO_BE_RECEIPT(3, "待收货"),
  TO_BE_COMMENT(4,"待点评"),
  
  DELIVERED(5,"已发货"),
  COMMENTED(6,"已点评"),
  CANCELED(7,"已取消"),
  FINISHED(8,"已完成");

  private final Integer code;

  private final String name;

  private OrderStatusEnum(Integer code, String name) {
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
 
