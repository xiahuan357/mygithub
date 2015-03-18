package com.yn.yntp.module.nationalspecial.entity;

import javax.persistence.Entity;
import javax.persistence.Table;

import com.yn.yntp.common.entity.BaseOrderEntity;

/**
 * 
 * @Title: NationalSpecialOrderEntity.java
 * @Package com.yn.yntp.module.nationalspecial.entity
 * @Description: TODO(用一句话描述该文件做什么)
 *
 * @author liucc
 * @date 2015年1月26日 上午10:47:03
 * @version V1.0
 */

@Entity
@Table(name = "biz_national_special_order")
public class NationalSpecialOrderEntity extends BaseOrderEntity<Long> {

  // 特产id
  private Long special_id;

  // 数量
  private Integer count;

  // 总价
  private Double totalprice;

  /** 订单中客户信息 */
  private String customer_name;

  private String customer_tel;

  private String customer_address;

  private String customer_postcode;

  private String customer_mobletel;

  public Long getSpecial_id() {
    return this.special_id;
  }

  public void setSpecial_id(Long special_id) {
    this.special_id = special_id;
  }

  public Integer getCount() {
    return this.count;
  }

  public void setCount(Integer count) {
    this.count = count;
  }

  public Double getTotalprice() {
    return this.totalprice;
  }

  public void setTotalprice(Double totalprice) {
    this.totalprice = totalprice;
  }

  public String getCustomer_name() {
    return this.customer_name;
  }

  public void setCustomer_name(String customer_name) {
    this.customer_name = customer_name;
  }

  public String getCustomer_tel() {
    return this.customer_tel;
  }

  public void setCustomer_tel(String customer_tel) {
    this.customer_tel = customer_tel;
  }

  public String getCustomer_address() {
    return this.customer_address;
  }

  public void setCustomer_address(String customer_address) {
    this.customer_address = customer_address;
  }

  public String getCustomer_postcode() {
    return this.customer_postcode;
  }

  public void setCustomer_postcode(String customer_postcode) {
    this.customer_postcode = customer_postcode;
  }

  public String getCustomer_mobletel() {
    return this.customer_mobletel;
  }

  public void setCustomer_mobletel(String customer_mobletel) {
    this.customer_mobletel = customer_mobletel;
  }

}
