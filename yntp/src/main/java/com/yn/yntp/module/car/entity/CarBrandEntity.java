package com.yn.yntp.module.car.entity;

import javax.persistence.Entity;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.Length;

import com.yn.yntp.common.entity.BaseEntity;

/**
 * 
 * @Title: CarBrandEntity.java 
 * @Package com.yn.yntp.module.car.entity 
 * @Description: TODO(用一句话描述该文件做什么) 
 *
 * @author jiqr    
 * @date 2014年12月8日 下午12:09:20 
 * @version V1.0 
 */

@Entity
@Table(name = "sys_car_brand")
public class CarBrandEntity extends BaseEntity<Long> {
  
  @NotNull(message = "[品牌名称]不能为空")
  @Length(min=1, max=255, message = "[品牌名称]长度必须在{min}到{max}个字符之间")
  private String name;
  
  public String getName() {
    return this.name;
  }

  public void setName(String name) {
    this.name = name;
  }
  
}
