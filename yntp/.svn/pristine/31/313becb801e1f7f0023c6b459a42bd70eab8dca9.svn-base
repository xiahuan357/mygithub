package com.yn.yntp.module.region.entity;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.yn.yntp.common.entity.BaseEntity;

/**
 * 
 * @Title: TourismEntity.java 
 * @Package com.yn.yntp.module.tourism.entity 
 * @Description: 线路实体
 *
 * @author liucc    
 * @date 2014年11月22日 下午3:40:15 
 * @version V1.0 
 */

@Entity
@Table(name = "sys_region")
public class RegionEntity extends BaseEntity<Long>{

  
  private Long code;
  private String name;
  
  // 城市从属类型
  private Long parent_id;

  public String getName() {
    return this.name;
  }

  public void setName(String name) {
    this.name = name;
  }
  public Long getCode() {
		return code;
	}

	public void setCode(Long code) {
		this.code = code;
	}

	public Long getParent_id() {
		return parent_id;
	}

	public void setParent_id(Long parent_id) {
		this.parent_id = parent_id;
	}



}
