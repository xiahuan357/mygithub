package com.yn.yntp.module.food.entity;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import com.yn.yntp.common.entity.BaseImageLibraryEntity;
import com.yn.yntp.module.product.entity.ProductTypeEntity;

/**
 * 
 * @Title: NationalspecialEntity.java
 * @Package com.yn.yntp.module.nationalspecial.entity
 * @Description: TODO(用一句话描述该文件做什么)
 *
 * @author liucc
 * @date 2015年1月17日 下午1:41:20
 * @version V1.0
 */

@Entity
@Table(name = "biz_food")
public class FoodEntity extends BaseImageLibraryEntity<Long> {
  // 名称
  private String name;

  // 区域
  private String region_id;

  // 商品类型
  // 框架自动查询出类型
  @ManyToOne(optional = true)
  @Fetch(FetchMode.SELECT)
  @JoinColumn(name = "type_id")
  private ProductTypeEntity productTypeEntity;
  
  // 美食简述
  private String food_abstract;

  // 美食详细描述
  private String food_description;

  // 商家id
  private Long business_id;

  public String getName() {
    return this.name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getRegion_id() {
    return this.region_id;
  }

  public void setRegion_id(String region_id) {
    this.region_id = region_id;
  }

  public ProductTypeEntity getProductTypeEntity() {
    return this.productTypeEntity;
  }

  public void setProductTypeEntity(ProductTypeEntity productTypeEntity) {
    this.productTypeEntity = productTypeEntity;
  }

  public String getFood_abstract() {
    return this.food_abstract;
  }

  public void setFood_abstract(String food_abstract) {
    this.food_abstract = food_abstract;
  }

  public String getFood_description() {
    return this.food_description;
  }

  public void setFood_description(String food_description) {
    this.food_description = food_description;
  }

  public Long getBusiness_id() {
    return this.business_id;
  }

  public void setBusiness_id(Long business_id) {
    this.business_id = business_id;
  }

}
