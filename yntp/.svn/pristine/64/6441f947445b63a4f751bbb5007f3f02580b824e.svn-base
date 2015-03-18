package com.yn.yntp.module.sys.user.entity;

import java.util.Date;

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
 * @Title: userinfoEntity.java
 * @Package com.yn.yntp.module.sys.permission.entity
 * @Description: 
 *
 * @author liucc
 * @date 2014年11月21日 下午8:40:27
 * @version V1.0
 */
@Entity
@Table(name = "sys_userinfo")
public class UserInfoEntity extends BaseEntity<Long> {
	
	  private String nickname;
	  private Long user_id;
	  private String name;
	  private String person_code;
	  private Date birthday;
	  private Integer sex; 
    public String getNickname() {
		return nickname;
	}
	public void setNickname(String nickname) {
		this.nickname = nickname;
	}
	public Long getUser_id() {
		return user_id;
	}
	public void setUser_id(Long user_id) {
		this.user_id = user_id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getPerson_code() {
		return person_code;
	}
	public void setPerson_code(String person_code) {
		this.person_code = person_code;
	}
	public Date getBirthday() {
		return birthday;
	}
	public void setBirthday(Date birthday) {
		this.birthday = birthday;
	}
	public Integer getSex() {
		return sex;
	}
	public void setSex(Integer sex) {
		this.sex = sex;
	}
  
}
