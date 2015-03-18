package com.yn.yntp.module.car.entity;

import javax.persistence.Entity;
import javax.persistence.Table;

import com.yn.yntp.common.entity.BaseImageLibraryEntity;

/**
 * 
 * @Title: CarEntity.java
 * @Package com.yn.yntp.module.car.entity
 * @Description: TODO(用一句话描述该文件做什么)
 *
 * @author liucc
 * @date 2015年1月19日 下午12:13:11
 * @version V1.0
 */

@Entity
@Table(name = "biz_car")
public class CarEntity extends BaseImageLibraryEntity<Long> {

  private String name;

  // 汽车类型
  private Long type_id;

  // 品牌
  private Long brand_id;

  private Double price;

  // 座位数
  private Integer seatcount;

  private String tel;

  private String address;

  // 状态，可租；正在出租中
  private Integer status;

  private String car_abstract;

  private String car_description;

  // 租赁指南
  private String car_buynotes;

  private Long business_id;

  public String getName() {
    return this.name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public Long getType_id() {
    return this.type_id;
  }

  public void setType_id(Long type_id) {
    this.type_id = type_id;
  }

  public Long getBrand_id() {
    return this.brand_id;
  }

  public void setBrand_id(Long brand_id) {
    this.brand_id = brand_id;
  }

  public Double getPrice() {
    return this.price;
  }

  public void setPrice(Double price) {
    this.price = price;
  }

  public Integer getSeatcount() {
    return this.seatcount;
  }

  public void setSeatcount(Integer seatcount) {
    this.seatcount = seatcount;
  }

  public String getTel() {
    return this.tel;
  }

  public void setTel(String tel) {
    this.tel = tel;
  }

  public String getAddress() {
    return this.address;
  }

  public void setAddress(String address) {
    this.address = address;
  }

  public Integer getStatus() {
    return this.status;
  }

  public void setStatus(Integer status) {
    this.status = status;
  }

  public String getCar_abstract() {
    return this.car_abstract;
  }

  public void setCar_abstract(String car_abstract) {
    this.car_abstract = car_abstract;
  }

  public String getCar_description() {
    return this.car_description;
  }

  public void setCar_description(String car_description) {
    this.car_description = car_description;
  }

  public String getCar_buynotes() {
    return this.car_buynotes;
  }

  public void setCar_buynotes(String car_buynotes) {
    this.car_buynotes = car_buynotes;
  }

  public Long getBusiness_id() {
    return this.business_id;
  }

  public void setBusiness_id(Long business_id) {
    this.business_id = business_id;
  }

}
