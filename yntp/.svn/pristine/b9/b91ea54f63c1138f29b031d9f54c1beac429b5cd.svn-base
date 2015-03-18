package com.yn.yntp.module.tourismline.entity;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import com.yn.yntp.common.entity.BaseImageEntity;

/**
 * 
 * @Title: TourismlineTripEntity.java 
 * @Package com.yn.yntp.module.tourismline.entity 
 * @Description: TODO(用一句话描述该文件做什么) 
 *
 * @author liucc    
 * @date 2015年1月14日 上午9:49:55 
 * @version V1.0 
 */

@Entity
@Table(name = "biz_tourismline_trip")
public class TourismlineTripEntity extends BaseImageEntity<Long>{

  // 标题
  private String title;
  
  // 详情
  private String description;
  // 第几天
  private Integer sequence;
  
  // 框架自动查询出线路
  @ManyToOne(optional = true)
  @Fetch(FetchMode.SELECT)
  @JoinColumn(name = "tourismline_id")
  private TourismlineEntity tourismlineEntity;

  public String getTitle() {
    return this.title;
  }

  public void setTitle(String title) {
    this.title = title;
  }

  public String getDescription() {
    return this.description;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  public Integer getSequence() {
    return this.sequence;
  }

  public void setSequence(Integer sequence) {
    this.sequence = sequence;
  }

  public TourismlineEntity getTourismlineEntity() {
    return this.tourismlineEntity;
  }

  public void setTourismlineEntity(TourismlineEntity tourismlineEntity) {
    this.tourismlineEntity = tourismlineEntity;
  }
  
}
