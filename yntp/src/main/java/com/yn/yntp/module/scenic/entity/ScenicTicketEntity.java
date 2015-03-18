package com.yn.yntp.module.scenic.entity;

import java.sql.Date;

import javax.persistence.Entity;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonFormat;
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
@Table(name = "biz_scenic_ticket")
public class ScenicTicketEntity extends BaseEntity<Long> {

  private String name;

  private Double price;
  
  private Long type_id;

  private Long scenic_id;
  
  @JsonFormat(pattern = "yyyy-MM-dd", timezone = "GMT+8")
  private Date date_start;

  @JsonFormat(pattern = "yyyy-MM-dd", timezone = "GMT+8")
  private Date date_end;

  public Date getDate_start() {
    return this.date_start;
  }

  public void setDate_start(Date date_start) {
    this.date_start = date_start;
  }

  public Date getDate_end() {
    return this.date_end;
  }

  public void setDate_end(Date date_end) {
    this.date_end = date_end;
  }

  private String ticket_abstract;

  public Long getType_id() {
    return this.type_id;
  }

  public void setType_id(Long type_id) {
    this.type_id = type_id;
  }

  public Long getScenic_id() {
    return this.scenic_id;
  }

  public void setScenic_id(Long scenic_id) {
    this.scenic_id = scenic_id;
  }

  public Double getPrice() {
    return this.price;
  }

  public void setPrice(Double price) {
    this.price = price;
  }

  public String getTicket_abstract() {
    return this.ticket_abstract;
  }

  public void setTicket_abstract(String ticket_abstract) {
    this.ticket_abstract = ticket_abstract;
  }

  public String getName() {
    return this.name;
  }

  public void setName(String name) {
    this.name = name;
  }

}
