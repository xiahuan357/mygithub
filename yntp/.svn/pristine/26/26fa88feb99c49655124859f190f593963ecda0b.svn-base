package com.yn.yntp.module.sys.user.entity;

import javax.persistence.Entity;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;

import org.apache.commons.lang3.RandomStringUtils;
import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.NotEmpty;

import com.yn.yntp.common.entity.BaseEntity;

/**
 * 
 * @Title: RoleEntity.java
 * @Package com.yn.yntp.module.sys.permission.entity
 * @Description: 
 *
 * @author liucc
 * @date 2014年11月21日 下午8:40:27
 * @version V1.0
 */
@Entity
@Table(name = "sys_user")
public class UserEntity extends BaseEntity<Long> {

  private static final long serialVersionUID = 1L;

  public static final String USERNAME_PATTERN = "^[\\u4E00-\\u9FA5\\uf900-\\ufa2d_a-zA-Z][\\u4E00-\\u9FA5\\uf900-\\ufa2d\\w]{1,19}$";
  public static final String EMAIL_PATTERN = "^((([a-z]|\\d|[!#\\$%&'\\*\\+\\-\\/=\\?\\^_`{\\|}~]|[\\u00A0-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF])+(\\.([a-z]|\\d|[!#\\$%&'\\*\\+\\-\\/=\\?\\^_`{\\|}~]|[\\u00A0-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF])+)*)|((\\x22)((((\\x20|\\x09)*(\\x0d\\x0a))?(\\x20|\\x09)+)?(([\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x7f]|\\x21|[\\x23-\\x5b]|[\\x5d-\\x7e]|[\\u00A0-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF])|(\\\\([\\x01-\\x09\\x0b\\x0c\\x0d-\\x7f]|[\\u00A0-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF]))))*(((\\x20|\\x09)*(\\x0d\\x0a))?(\\x20|\\x09)+)?(\\x22)))@((([a-z]|\\d|[\\u00A0-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF])|(([a-z]|\\d|[\\u00A0-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF])([a-z]|\\d|-|\\.|_|~|[\\u00A0-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF])*([a-z]|\\d|[\\u00A0-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF])))\\.)+(([a-z]|[\\u00A0-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF])|(([a-z]|[\\u00A0-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF])([a-z]|\\d|-|\\.|_|~|[\\u00A0-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF])*([a-z]|[\\u00A0-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF])))\\.?";
  public static final String MOBILE_PHONE_NUMBER_PATTERN = "^0{0,1}(13[0-9]|15[0-9]|14[0-9]|18[0-9])[0-9]{8}$";
  
  public static final int USERNAME_MIN_LENGTH = 5;
  public static final int USERNAME_MAX_LENGTH = 20;
  public static final int PASSWORD_MIN_LENGTH = 5;
  public static final int PASSWORD_MAX_LENGTH = 20;

  @NotNull(message = "{not.null}")
  @Length(min = USERNAME_MIN_LENGTH, max = USERNAME_MAX_LENGTH, message = "{user.username.not.valid}")
  @Pattern(regexp = USERNAME_PATTERN, message = "{user.username.not.valid}")
  private String username;
  
  @NotEmpty(message = "{not.null}")
  @Pattern(regexp = EMAIL_PATTERN, message = "{user.email.not.valid}")
  private String email;
  
  @NotEmpty(message = "{not.null}")
  @Pattern(regexp = MOBILE_PHONE_NUMBER_PATTERN, message = "{user.mobile.phone.number.not.valid}")
  private String mobile_phone_number;
  
  /**
   * 使用md5(username + original password + salt)加密存储
   */
//  @Length(min = PASSWORD_MIN_LENGTH, max = PASSWORD_MAX_LENGTH, message = "{user.password.not.valid}")
  private String password;
  
  private String salt;
  
  //状态（是否正常）0 封禁状态 1 正常状态
  private Integer userstatus = UserStatus.NORMAL.getCode();
  
  //用户类型0 系统管理员；1 商家；2 用户
  private Integer usertype = UserType.ADMIN.getCode();
  
  public String getUsername() {
    return this.username;
  }
  public void setUsername(String username) {
    this.username = username;
  }
  public String getEmail() {
    return this.email;
  }
  public void setEmail(String email) {
    this.email = email;
  }
  public String getMobile_phone_number() {
    return this.mobile_phone_number;
  }
  public void setMobile_phone_number(String mobile_phone_number) {
    this.mobile_phone_number = mobile_phone_number;
  }
  public String getPassword() {
    return this.password;
  }
  public void setPassword(String password) {
    this.password = password;
  }
  public String getSalt() {
    return this.salt;
  }
  public void setSalt(String salt) {
    this.salt = salt;
  }
  public Integer getUserstatus() {
    return this.userstatus;
  }
  public void setUserstatus(Integer userstatus) {
    this.userstatus = userstatus;
  }
  public Integer getUsertype() {
    return this.usertype;
  }
  public void setUsertype(Integer usertype) {
    this.usertype = usertype;
  }

  /**
   * 生成新的种子
   */
  public void randomSalt() {
      setSalt(RandomStringUtils.randomAlphanumeric(10));
  }
}
