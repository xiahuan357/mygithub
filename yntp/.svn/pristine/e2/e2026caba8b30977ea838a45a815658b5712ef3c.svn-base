package com.yn.yntp.module.hotel.entity;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import com.yn.yntp.common.entity.BaseImageLibraryEntity;

/**
 * 
 * @Title: HotelRoomEntity.java
 * @Package com.yn.yntp.module.hotel.entity
 * @Description: TODO(用一句话描述该文件做什么)
 *
 * @author liucc
 * @date 2015年1月16日 下午2:29:07
 * @version V1.0
 */

@Entity
@Table(name = "biz_hotel_room")
public class HotelRoomEntity extends BaseImageLibraryEntity<Long> {

  // 框架自动查询出类型实体
  @ManyToOne(optional = true)
  @Fetch(FetchMode.SELECT)
  @JoinColumn(name = "type_id")
  private HotelRoomTypeEntity hotelRoomTypeEntity;

  // 床型id
  private Long bed_type_id;

  // 住房面积
  private String area;

  // 楼层
  private Integer floor;

  // 价格
  private Double price;

  // 数量
  private Integer count;

  // 酒店id
  private Long hotel_id;

  // 早餐：无，含早，含双早，含三早，有（收费）
  private Long breakfast_type_id;

  // 窗户类型：有窗，内窗，无窗
  private Long windows_type_id;

  // 卫浴类型：独立卫浴，公用卫浴
  private Long bath_type_id;

  // 宽带类型：无，有（免费），有（收费）
  private Long broadband_type_id;

  public HotelRoomTypeEntity getHotelRoomTypeEntity() {
    return this.hotelRoomTypeEntity;
  }

  public void setHotelRoomTypeEntity(HotelRoomTypeEntity hotelRoomTypeEntity) {
    this.hotelRoomTypeEntity = hotelRoomTypeEntity;
  }

  public Long getBed_type_id() {
    return this.bed_type_id;
  }

  public void setBed_type_id(Long bed_type_id) {
    this.bed_type_id = bed_type_id;
  }

  public String getArea() {
    return this.area;
  }

  public void setArea(String area) {
    this.area = area;
  }

  public Integer getFloor() {
    return this.floor;
  }

  public void setFloor(Integer floor) {
    this.floor = floor;
  }

  public Double getPrice() {
    return this.price;
  }

  public void setPrice(Double price) {
    this.price = price;
  }

  public Long getHotel_id() {
    return this.hotel_id;
  }

  public void setHotel_id(Long hotel_id) {
    this.hotel_id = hotel_id;
  }

  public Integer getCount() {
    return this.count;
  }

  public void setCount(Integer count) {
    this.count = count;
  }

  public Long getBreakfast_type_id() {
    return this.breakfast_type_id;
  }

  public void setBreakfast_type_id(Long breakfast_type_id) {
    this.breakfast_type_id = breakfast_type_id;
  }

  public Long getWindows_type_id() {
    return this.windows_type_id;
  }

  public void setWindows_type_id(Long windows_type_id) {
    this.windows_type_id = windows_type_id;
  }

  public Long getBath_type_id() {
    return this.bath_type_id;
  }

  public void setBath_type_id(Long bath_type_id) {
    this.bath_type_id = bath_type_id;
  }

  public Long getBroadband_type_id() {
    return this.broadband_type_id;
  }

  public void setBroadband_type_id(Long broadband_type_id) {
    this.broadband_type_id = broadband_type_id;
  }

}
