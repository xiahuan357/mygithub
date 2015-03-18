package com.yn.yntp.module.ads.entity;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.Length;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.yn.yntp.common.entity.BaseImageEntity;

/**
 * 
 * 
 * @Title: AdsTextEntity.java
 * @Package com.yn.yntp.module.ads.entity
 * @Description: TODO(用一句话描述该文件做什么)
 *
 * @author cuilz
 * @date 2014年12月10日 上午10:09:31
 * @version V1.0
 */

@Entity
@Table(name = "sys_ads_picture")
public class AdsPictureEntity extends BaseImageEntity<Long> {
  // Name
  @NotNull(message = "[名称]不能为空")
  @Length(min = 1, max = 255, message = "[名称]长度必须在{min}到{max}个字符之间")
  private String name;

  // Url
  @NotNull(message = "[url]不能为空")
  @Length(min = 1, max = 255, message = "[url]长度必须在{min}到{max}个字符之间")
  private String url;

  // description
  @Length(min = 1, max = 255, message = "[描述]长度必须在{min}到{max}个字符之间")
  private String description;

  // position
  @NotNull(message = "[位置]不能为空")
  private Long position_id;

  // starttime
  @JsonFormat(pattern = "yyyy-MM-dd", timezone = "GMT+8")
  @NotNull(message = "[开始时间]不能为空")
  private Date starttime;

  // endtime
  @JsonFormat(pattern = "yyyy-MM-dd", timezone = "GMT+8")
  @NotNull(message = "[结束时间]不能为空")
  private Date endtime;
  
  @NotNull(message = "[图片]不能为空")
  @Length(min = 1, max = 255, message = "[图片]长度必须在{min}到{max}个字符之间")
  private String picture;

  public String getName() {
    return this.name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getUrl() {
    return this.url;
  }

  public void setUrl(String url) {
    this.url = url;
  }

  public String getDescription() {
    return this.description;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  public Long getPosition_id() {
    return this.position_id;
  }

  public void setPosition_id(Long position_id) {
    this.position_id = position_id;
  }

  public Date getStarttime() {
    return this.starttime;
  }

  public void setStarttime(Date starttime) {
    this.starttime = starttime;
  }

  public Date getEndtime() {
    return this.endtime;
  }

  public void setEndtime(Date endtime) {
    this.endtime = endtime;
  }

  public String getPicture() {
    return this.picture;
  }

  public void setPicture(String picture) {
    this.picture = picture;
  }
  
}
