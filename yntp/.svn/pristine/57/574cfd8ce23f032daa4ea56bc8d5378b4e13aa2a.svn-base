package com.yn.yntp.module.business.entity;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import com.yn.yntp.common.entity.BaseEntity;
import com.yn.yntp.module.sys.user.entity.UserEntity;

/**
 * 
 * @Title: HotelEntity.java
 * @Package com.yn.yntp.module.hotel.entity
 * @Description: 酒店类型实体
 *
 * @author liucc
 * @date 2014年11月22日 下午3:40:15
 * @version V1.0
 */

@Entity
@Table(name = "sys_business")
public class BusinessEntity extends BaseEntity<Long> {

  // 框架自动查询出用户
  @ManyToOne(optional = true)
  @Fetch(FetchMode.SELECT)
  @JoinColumn(name = "user_id")
  private UserEntity userEntity;

  // 地址
  private String address;

  // 审核状态
  private Integer approve_status = BusinessApproveStatus.NON_APPROVE.getCode();

  // 营业执照号码
  private String license_code;

  // 营业执照照片
  private String license_picture;

  // 组织机构号码
  private String organization_code;

  // 组织机构照片
  private String organization_picture;

  // 法人身份证号
  private String legalperson_code;

  // 法人身份证照片
  private String legalperson_picture;

  // 图片主键，一个特色对应一个key，一个key对应多个图片
  private String imagekey;

  public UserEntity getUserEntity() {
    // 将密码信息删掉
    this.userEntity.setSalt(null);
    this.userEntity.setPassword(null);
    return this.userEntity;
  }

  public void setUserEntity(UserEntity userEntity) {
    this.userEntity = userEntity;
  }
  
  public String getAddress() {
    return this.address;
  }

  public void setAddress(String address) {
    this.address = address;
  }

  public Integer getApprove_status() {
    return this.approve_status;
  }

  public void setApprove_status(Integer approve_status) {
    this.approve_status = approve_status;
  }

  public String getLicense_code() {
    return this.license_code;
  }

  public void setLicense_code(String license_code) {
    this.license_code = license_code;
  }

  public String getLicense_picture() {
    return this.license_picture;
  }

  public void setLicense_picture(String license_picture) {
    this.license_picture = license_picture;
  }

  public String getOrganization_code() {
    return this.organization_code;
  }

  public void setOrganization_code(String organization_code) {
    this.organization_code = organization_code;
  }

  public String getOrganization_picture() {
    return this.organization_picture;
  }

  public void setOrganization_picture(String organization_picture) {
    this.organization_picture = organization_picture;
  }

  public String getLegalperson_code() {
    return this.legalperson_code;
  }

  public void setLegalperson_code(String legalperson_code) {
    this.legalperson_code = legalperson_code;
  }

  public String getLegalperson_picture() {
    return this.legalperson_picture;
  }

  public void setLegalperson_picture(String legalperson_picture) {
    this.legalperson_picture = legalperson_picture;
  }

  public String getImagekey() {
    return this.imagekey;
  }

  public void setImagekey(String imagekey) {
    this.imagekey = imagekey;
  }
}
