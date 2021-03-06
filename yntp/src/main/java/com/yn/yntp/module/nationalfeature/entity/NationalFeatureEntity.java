package com.yn.yntp.module.nationalfeature.entity;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;
import org.hibernate.validator.constraints.Length;

import com.yn.yntp.common.entity.BaseImageLibraryEntity;
import com.yn.yntp.module.sys.user.entity.UserEntity;

/**
 * 
 * @Title: NewsTypeEntity.java 
 * @Package com.yn.yntp.module.nationalfeature.entity 
 * @Description: TODO(用一句话描述该文件做什么) 
 *
 * @author liucc    
 * @date 2015年1月1日 下午12:40:54 
 * @version V1.0
 */
@Entity
@Table(name = "sys_national_feature")
public class NationalFeatureEntity extends BaseImageLibraryEntity<Long>{

  @NotNull(message = "[名称]不能为空")
  @Length(min=1, max=255, message = "[名称]长度必须在{min}到{max}个字符之间")
  private String name;
  
  // 区域id
  private Long region_id;
  
  @Length(min=0, max=500, message = "[摘要]长度必须在{min}到{max}个字符之间")
  private String nationalfeature_abstract;
  
  @NotNull(message = "[介绍]不能为空")
  private String nationalfeature_description;
  
  // 框架自动查询出用户
  @ManyToOne(optional = true)
  @Fetch(FetchMode.SELECT)
  @JoinColumn(name = "published_user_id")
  private UserEntity publishedUserEntity;
  
  public String getName() {
    return this.name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public Long getRegion_id() {
    return this.region_id;
  }

  public void setRegion_id(Long region_id) {
    this.region_id = region_id;
  }

  public String getNationalfeature_abstract() {
    return this.nationalfeature_abstract;
  }

  public void setNationalfeature_abstract(String nationalfeature_abstract) {
    this.nationalfeature_abstract = nationalfeature_abstract;
  }

  public String getNationalfeature_description() {
    return this.nationalfeature_description;
  }

  public void setNationalfeature_description(String nationalfeature_description) {
    this.nationalfeature_description = nationalfeature_description;
  }
  
  public UserEntity getPublishedUserEntity() {
    return this.publishedUserEntity;
  }

  public void setPublishedUserEntity(UserEntity publishedUserEntity) {
    this.publishedUserEntity = publishedUserEntity;
  }
}