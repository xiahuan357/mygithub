package com.yn.yntp.module.hotel.entity;

import javax.persistence.Entity;
import javax.persistence.Table;

import com.yn.yntp.common.entity.BaseImageLibraryEntity;

/**
 * 
 * @Title: HotelEntity.java
 * @Package com.yn.yntp.module.hotel.entity
 * @Description: TODO(用一句话描述该文件做什么)
 *
 * @author liucc
 * @date 2015年1月16日 下午2:21:35
 * @version V1.0
 */

@Entity
@Table(name = "biz_hotel")
public class HotelEntity extends BaseImageLibraryEntity<Long> {

  // 酒店名称
  private String name;

  // 所在城市id，省市县以-分割
  private String region_id;

  // 星级
  private Long level_id;

  // 酒店类型
  private Long type_id;

  // 地址
  private String address;

  // 电话
  private String tel;

  // 简述
  private String hotel_abstract;

  // 详细描述
  private String hotel_description;

  // 交通指南
  private String hotel_trafficguide;

  // 预定须知
  private String hotel_buynotes;

  // 所属商家id
  private Long business_id;

  public String getName() {
    return this.name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getRegion_id() {
    return this.region_id;
  }

  public void setRegion_id(String region_id) {
    this.region_id = region_id;
  }

  public Long getLevel_id() {
    return this.level_id;
  }

  public void setLevel_id(Long level_id) {
    this.level_id = level_id;
  }

  public Long getType_id() {
    return this.type_id;
  }

  public void setType_id(Long type_id) {
    this.type_id = type_id;
  }

  public String getAddress() {
    return this.address;
  }

  public void setAddress(String address) {
    this.address = address;
  }

  public String getTel() {
    return this.tel;
  }

  public void setTel(String tel) {
    this.tel = tel;
  }

  public String getHotel_abstract() {
    return this.hotel_abstract;
  }

  public void setHotel_abstract(String hotel_abstract) {
    this.hotel_abstract = hotel_abstract;
  }

  public String getHotel_description() {
    return this.hotel_description;
  }

  public void setHotel_description(String hotel_description) {
    this.hotel_description = hotel_description;
  }

  public String getHotel_trafficguide() {
    return this.hotel_trafficguide;
  }

  public void setHotel_trafficguide(String hotel_trafficguide) {
    this.hotel_trafficguide = hotel_trafficguide;
  }

  public String getHotel_buynotes() {
    return this.hotel_buynotes;
  }

  public void setHotel_buynotes(String hotel_buynotes) {
    this.hotel_buynotes = hotel_buynotes;
  }

  public Long getBusiness_id() {
    return this.business_id;
  }

  public void setBusiness_id(Long business_id) {
    this.business_id = business_id;
  }

}