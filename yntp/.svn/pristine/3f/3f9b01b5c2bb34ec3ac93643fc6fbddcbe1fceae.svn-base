package com.yn.yntp.module.product.entity;

import javax.persistence.Entity;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.Length;

import com.yn.yntp.common.entity.BaseEntity;

/**
 * 
 * @Title: ProductTypeEntity.java
 * @Package com.yn.yntp.module.special.entity
 * @Description: TODO(用一句话描述该文件做什么)
 *
 * @author jiqr
 * @date 2014年12月9日 下午2:18:59
 * @version V1.0
 */

@Entity
@Table(name = "sys_product_type")
public class ProductTypeEntity extends BaseEntity<Long> {

  // 类型名称
  @NotNull(message = "[类型名称]不能为空")
  @Length(min = 1, max = 255, message = "[类型名称]长度必须在{min}到{max}个字符之间")
  private String name;

  // 当前层数
  private Integer level;

  // 父亲id
  private Long parent_id;

  public String getName() {
    return this.name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public Integer getLevel() {
    return this.level;
  }

  public void setLevel(Integer level) {
    this.level = level;
  }

  public Long getParent_id() {
    return parent_id;
  }

  public void setParent_id(Long parent_id) {
    this.parent_id = parent_id;
  }
}
