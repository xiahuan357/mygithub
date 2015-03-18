package com.yn.yntp.module.news.entity;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import com.yn.yntp.common.entity.BaseImageEntity;
import com.yn.yntp.module.sys.user.entity.UserEntity;

/**
 * 
 * @Title: NewsEntity.java
 * @Package com.yn.yntp.module.news.entity
 * @Description: TODO(用一句话描述该文件做什么)
 *
 * @author liucc
 * @date 2015年1月11日 下午7:22:11
 * @version V1.0
 */

@Entity
@Table(name = "sys_news")
public class NewsEntity extends BaseImageEntity<Long> {

  // 标题
  private String title;

  // 框架自动查询出类型
  @ManyToOne(optional = true)
  @Fetch(FetchMode.SELECT)
  @JoinColumn(name = "type_id")
  private NewsTypeEntity newsTypeEntity;

  // 摘要
  private String news_abstract;

  // 内容
  private String news_content;

  // 框架自动查询出用户
  @ManyToOne(optional = true)
  @Fetch(FetchMode.SELECT)
  @JoinColumn(name = "published_user_id")
  private UserEntity publishedUserEntity;

  public String getTitle() {
    return this.title;
  }

  public void setTitle(String title) {
    this.title = title;
  }

  public NewsTypeEntity getNewsTypeEntity() {
    return this.newsTypeEntity;
  }

  public void setNewsTypeEntity(NewsTypeEntity newsTypeEntity) {
    this.newsTypeEntity = newsTypeEntity;
  }

  public String getNews_abstract() {
    return this.news_abstract;
  }

  public void setNews_abstract(String news_abstract) {
    this.news_abstract = news_abstract;
  }

  public String getNews_content() {
    return this.news_content;
  }

  public void setNews_content(String news_content) {
    this.news_content = news_content;
  }

  public UserEntity getPublishedUserEntity() {
    return this.publishedUserEntity;
  }

  public void setPublishedUserEntity(UserEntity publishedUserEntity) {
    this.publishedUserEntity = publishedUserEntity;
  }
  
}
