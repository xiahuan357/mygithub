package com.yn.yntp.module.hotel.entity;

/**
 * 
 * @Title: RoomBreakfastTypeEnum.java 
 * @Package com.yn.yntp.module.hotel.entity 
 * @Description: 早餐类型
 *
 * @author liucc    
 * @date 2015年1月16日 下午3:34:26 
 * @version V1.0 
 */

public enum RoomBreakfastTypeEnum {
  // 早餐：无，含早，含双早，含三早，有（收费）
  NONO (0L, "无"),
  ONE (1L, "含早"),
  TWO (2L, "含双早"),
  THREE(3L, "含三早"),
  CHARGE(4L, "有（收费）");
  
  private final Long id;

  private final String name;

  private RoomBreakfastTypeEnum(Long id, String name) {
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
