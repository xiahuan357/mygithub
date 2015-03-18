package com.yn.yntp.module.scenic.entity;

import javax.persistence.Entity;
import javax.persistence.Table;

import com.yn.yntp.common.entity.BaseImageLibraryEntity;

/**
 * 
 * @Title: NewsEntity.java
 * @Package com.yn.yntp.module.news.entity
 * @Description: 景点类型实体
 *
 * @author liucc
 * @date 2014年11月22日 下午3:40:15
 * @version V1.0
 */

@Entity
@Table(name = "biz_scenic")
public class ScenicEntity extends BaseImageLibraryEntity<Long> {

  private String name;

  private String address;

  private String tel;
  
  private Long business_id;

  private Long type_id;

  private Long level_id;
  
  private String region_id;

  private String scenic_abstract;

  private String scenic_description;

  private String scenic_buynotes;

  private String scenic_trafficguide;

  public Long getBusiness_id() {
    return this.business_id;
  }

  public void setBusiness_id(Long business_id) {
    this.business_id = business_id;
  }

  public Long getType_id() {
    return this.type_id;
  }

  public void setType_id(Long type_id) {
    this.type_id = type_id;
  }

  public Long getLevel_id() {
    return this.level_id;
  }

  public void setLevel_id(Long level_id) {
    this.level_id = level_id;
  }

  public String getTel() {
    return this.tel;
  }

  public void setTel(String tel) {
    this.tel = tel;
  }

  public String getRegion_id() {
    return this.region_id;
  }

  public void setRegion_id(String region_id) {
    this.region_id = region_id;
  }

  public String getScenic_abstract() {
    return this.scenic_abstract;
  }

  public void setScenic_abstract(String scenic_abstract) {
    this.scenic_abstract = scenic_abstract;
  }

  public String getScenic_description() {
    return this.scenic_description;
  }

  public void setScenic_description(String scenic_description) {
    this.scenic_description = scenic_description;
  }

  public String getScenic_buynotes() {
    return this.scenic_buynotes;
  }

  public void setScenic_buynotes(String scenic_buynotes) {
    this.scenic_buynotes = scenic_buynotes;
  }

  public String getScenic_trafficguide() {
    return this.scenic_trafficguide;
  }

  public void setScenic_trafficguide(String scenic_trafficguide) {
    this.scenic_trafficguide = scenic_trafficguide;
  }

  public String getAddress() {
    return this.address;
  }

  public void setAddress(String address) {
    this.address = address;
  }

  public String getName() {
    return this.name;
  }

  public void setName(String name) {
    this.name = name;
  }

}
