package com.yn.yntp.module.scenic.entity;

import javax.persistence.Entity;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.Length;

import com.yn.yntp.common.entity.BaseEntity;

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
@Table(name = "sys_scenic_ticket_type")
public class ScenicTicketTypeEntity extends BaseEntity<Long>{

  @NotNull(message = "[类型名称]不能为空")
  @Length(min=1, max=255, message = "[类型名称]长度必须在{min}到{max}个字符之间")
  private String name;
  
  public String getName() {
    return this.name;
  }

  public void setName(String name) {
    this.name = name;
  }
  
}
