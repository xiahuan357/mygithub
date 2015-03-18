package com.yn.yntp.module.message.entity;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.yn.yntp.common.entity.BaseEntity;

/**
 * 
 * @Title: MessageEntity.java
 * @Package com.yn.yntp.module.message.entity
 * @Description: TODO(用一句话描述该文件做什么)
 *
 * @author liucc
 * @date 2015年1月27日 下午8:06:36
 * @version V1.0
 */

@Entity
@Table(name = "sys_message")
public class MessageEntity extends BaseEntity<Long> {

  // 发送人id
  private Long sender_id;

  // 接收人id
  private Long receiver_id;

  // 发送日期
  @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
  private Date send_date;

  // 发送状态
  private Integer sender_status;

  // 发送状态改变日期
  @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
  private Date sender_status_change_date;

  // 接收状态
  private Integer receiver_status;

  // 接受状态改变日期
  @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
  private Date receiver_status_change_date;

  // 标题
  private String title;

  // 消息内容
  private String content;

  // 类型
  private String type;

  // 是否已读
  private Integer is_read;

  // 是否已回复
  private Integer is_replied;

  public Long getSender_id() {
    return this.sender_id;
  }

  public void setSender_id(Long sender_id) {
    this.sender_id = sender_id;
  }

  public Long getReceiver_id() {
    return this.receiver_id;
  }

  public void setReceiver_id(Long receiver_id) {
    this.receiver_id = receiver_id;
  }

  public Date getSend_date() {
    return this.send_date;
  }

  public void setSend_date(Date send_date) {
    this.send_date = send_date;
  }

  public Integer getSender_status() {
    return this.sender_status;
  }

  public void setSender_status(Integer sender_status) {
    this.sender_status = sender_status;
  }

  public Date getSender_status_change_date() {
    return this.sender_status_change_date;
  }

  public void setSender_status_change_date(Date sender_status_change_date) {
    this.sender_status_change_date = sender_status_change_date;
  }

  public Integer getReceiver_status() {
    return this.receiver_status;
  }

  public void setReceiver_status(Integer receiver_status) {
    this.receiver_status = receiver_status;
  }

  public Date getReceiver_status_change_date() {
    return this.receiver_status_change_date;
  }

  public void setReceiver_status_change_date(Date receiver_status_change_date) {
    this.receiver_status_change_date = receiver_status_change_date;
  }

  public String getTitle() {
    return this.title;
  }

  public void setTitle(String title) {
    this.title = title;
  }

  public String getContent() {
    return this.content;
  }

  public void setContent(String content) {
    this.content = content;
  }

  public String getType() {
    return this.type;
  }

  public void setType(String type) {
    this.type = type;
  }

  public Integer getIs_read() {
    return this.is_read;
  }

  public void setIs_read(Integer is_read) {
    this.is_read = is_read;
  }

  public Integer getIs_replied() {
    return this.is_replied;
  }

  public void setIs_replied(Integer is_replied) {
    this.is_replied = is_replied;
  }

}
