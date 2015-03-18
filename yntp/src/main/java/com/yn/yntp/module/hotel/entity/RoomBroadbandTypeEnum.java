package com.yn.yntp.module.hotel.entity;

/**
 * 
 * @Title: RoomBroadbandTypeEnum.java
 * @Package com.yn.yntp.module.hotel.entity
 * @Description: 宽带类型
 *
 * @author liucc
 * @date 2015年1月16日 下午3:35:39
 * @version V1.0
 */

public enum RoomBroadbandTypeEnum {
  // 宽带类型：无，有（免费），有（收费）
  NONO(0L, "无"),
  FREE(1L, "有（免费）"),
  CHARGE(2L, "有（收费）");

  private final Long id;

  private final String name;

  private RoomBroadbandTypeEnum(Long id, String name) {
    this.id = id;
    this.name = name;
  }

  public String getName() {
    return name;
  }

  public Long getId() {
    return id;
  }
}
