package com.yn.yntp.module.hotel.entity;

/**
 * 
 * @Title: RoomBathTypeEnum.java 
 * @Package com.yn.yntp.module.hotel.entity 
 * @Description: 卫浴类型
 *
 * @author liucc    
 * @date 2015年1月16日 下午3:35:13 
 * @version V1.0 
 */

public enum RoomBathTypeEnum {

  // 卫浴类型：独立卫浴，公用卫浴
  INDEPENDENT (0L, "独立卫浴"),
  COMMON(1L, "公用卫浴");
  
  private final Long id;

  private final String name;

  private RoomBathTypeEnum(Long id, String name) {
    this.id = id;
    this.name = name;
  }

  public String getName() {
    return name;
  }
  
  public Long getId(){
    return id;
  }
}
