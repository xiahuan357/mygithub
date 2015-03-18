package com.yn.yntp.common.constant;


/**
 * 
 * @Title: ModuleEnum.java 
 * @Package com.yn.yntp.common.constant 
 * @Description: TODO(用一句话描述该文件做什么) 
 *
 * @author liucc    
 * @date 2015年1月17日 下午5:27:28 
 * @version V1.0 
 */

public enum ModuleEnum {

  // 模块名称
  NOVALUE("",""),
  SCENIC("scenic","景点"),
  SCENICTICKET("scenicticket","景点门票"),
  TOURISMLINE("tourismline","线路"),
  TOURISMLINETRIP("tourismlinetrip","线路行程"),
  HOTEL("hotel","酒店"),
  HOTELROOM("hotelroom","酒店房间"),
  HOTSPRING("hotspring","温泉"),
  NATIONALSPECIAL("nationalspecial","民族特产"),
  NATIONALFEATURE("nationalfeature","民族特色"),
  FOOD("food","美食"),
  CAR("car","汽车"),
  EQUIPMENT("equipment","装备");
  
  private final String code;
  private final String name;
  
  private ModuleEnum(String code,String name){
    this.code = code;
    this.name = name;
  }
  
  public static ModuleEnum toModule(String moduleCode) {
    try {
      return valueOf(moduleCode);
    } catch (Exception ex) {
      return NOVALUE;
    }
  }
  
  public String getName(){
    return this.name;
  }
  
  public String getCode(){
    return this.code;
  }
}
