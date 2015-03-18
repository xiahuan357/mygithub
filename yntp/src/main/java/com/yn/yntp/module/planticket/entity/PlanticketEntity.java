package com.yn.yntp.module.planticket.entity;

import javax.persistence.Entity;
import javax.persistence.Table;

import com.yn.yntp.common.entity.BaseEntity;
import com.yn.yntp.common.entity.BaseImageEntity;

/**
 * 
 * @Title: PlanticketEntity.java
 * @Package com.yn.yntp.module.Planticket.entity
 * @Description: TODO(用一句话描述该文件做什么)
 *
 * @author liucc
 * @date 2015年1月16日 下午2:21:35
 * @version V1.0
 */

@Entity
@Table(name = "sys_planticket_book")
public class PlanticketEntity extends BaseImageEntity<Long> {

	private String name;
	private String url;
	private String abstracts;
	private String planticket_picture;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public String getPlanticket_picture() {
		return planticket_picture;
	}

	public void setPlanticket_picture(String planticket_picture) {
		this.planticket_picture = planticket_picture;
	}

	public String getAbstracts() {
		return abstracts;
	}

	public void setAbstracts(String abstracts) {
		this.abstracts = abstracts;
	}

}
