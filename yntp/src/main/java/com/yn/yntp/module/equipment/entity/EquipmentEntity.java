package com.yn.yntp.module.equipment.entity;

import javax.persistence.Entity;
import javax.persistence.Table;

import com.yn.yntp.common.entity.BaseImageLibraryEntity;

/**
 * 
 * @Title: EquipmentEntity.java 
 * @Package com.yn.yntp.module.equipment.entity 
 * @Description: TODO(用一句话描述该文件做什么) 
 *
 * @author liucc    
 * @date 2015年1月19日 下午1:59:56 
 * @version V1.0 
 */

@Entity
@Table(name = "biz_equipment")
public class EquipmentEntity extends BaseImageLibraryEntity<Long> {

  private String name;

  // 类型
  private Long type_id;

  private Double price;

  private String tel;

  private String address;

  // 状态，可租；正在出租中
  private Integer status;

  private String equipment_abstract;

  private String equipment_description;

  // 租赁指南
  private String equipment_buynotes;

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

  public Double getPrice() {
    return this.price;
  }

  public void setPrice(Double price) {
    this.price = price;
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

  public String getEquipment_abstract() {
    return this.equipment_abstract;
  }

  public void setEquipment_abstract(String equipment_abstract) {
    this.equipment_abstract = equipment_abstract;
  }

  public String getEquipment_description() {
    return this.equipment_description;
  }

  public void setEquipment_description(String equipment_description) {
    this.equipment_description = equipment_description;
  }

  public String getEquipment_buynotes() {
    return this.equipment_buynotes;
  }

  public void setEquipment_buynotes(String equipment_buynotes) {
    this.equipment_buynotes = equipment_buynotes;
  }

  public Long getBusiness_id() {
    return this.business_id;
  }

  public void setBusiness_id(Long business_id) {
    this.business_id = business_id;
  }
  
}
