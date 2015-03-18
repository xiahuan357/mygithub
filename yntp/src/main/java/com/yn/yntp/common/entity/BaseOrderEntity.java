package com.yn.yntp.common.entity;

import java.io.Serializable;

import javax.persistence.MappedSuperclass;

/**
 * 
 * @Title: OrderBaseEntity.java
 * @Package com.yn.yntp.common.entity
 * @Description: 订单基类
 *
 * @author liucc
 * @date 2015年1月2日 上午10:05:21
 * @version V1.0
 */

@MappedSuperclass
public class BaseOrderEntity<ID extends Serializable> extends BaseEntity<ID> {
  // 订单编号
  private String orderno;

  // 用户id
  private Long user_id;

  // 订单状态
  private Integer order_status;

  // 支付方式id
  private Long pay_type_id;

  // 支付状态
  private Integer pay_type_status;

  // 取消原因
  private String cancel_reason;

  public String getOrderno() {
    return this.orderno;
  }

  public void setOrderno(String orderno) {
    this.orderno = orderno;
  }

  public Long getUser_id() {
    return this.user_id;
  }

  public void setUser_id(Long user_id) {
    this.user_id = user_id;
  }

  public Integer getOrder_status() {
    return this.order_status;
  }

  public void setOrder_status(Integer order_status) {
    this.order_status = order_status;
  }

  public Long getPay_type_id() {
    return this.pay_type_id;
  }

  public void setPay_type_id(Long pay_type_id) {
    this.pay_type_id = pay_type_id;
  }

  public Integer getPay_type_status() {
    return this.pay_type_status;
  }

  public void setPay_type_status(Integer pay_type_status) {
    this.pay_type_status = pay_type_status;
  }

  public String getCancel_reason() {
    return this.cancel_reason;
  }

  public void setCancel_reason(String cancel_reason) {
    this.cancel_reason = cancel_reason;
  }

}
