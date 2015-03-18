package com.yn.yntp.module.hotel.validate;

import java.util.ArrayList;
import java.util.List;

import org.apache.commons.lang3.tuple.ImmutableTriple;
import org.apache.commons.lang3.tuple.Triple;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.yn.yntp.common.entity.search.ClientOperation;
import com.yn.yntp.common.validate.DefaultValidate;
import com.yn.yntp.common.validate.ReturnInfo;
import com.yn.yntp.module.hotel.entity.HotelEntity;
import com.yn.yntp.module.hotel.entity.HotelLevelEntity;
import com.yn.yntp.module.hotel.service.HotelLevelService;
import com.yn.yntp.module.hotel.service.HotelService;

/**
 * 
 * @Title: TourismTypeValidate.java
 * @Package com.yn.yntp.module.tourismline.validate
 * @Description: TODO(用一句话描述该文件做什么)
 *
 * @author liucc
 * @date 2014年11月24日 下午3:24:02
 * @version V1.0
 */
@Component
public class HotelLevelValidate extends DefaultValidate<HotelLevelEntity, Long> {

  @Autowired
  private HotelLevelService hotelLevelService;

  @Autowired
  private HotelService hotelService;
  
  @Override
  public ReturnInfo validateCreate(Object... param) {
    ReturnInfo rtn_info = super.validateCreate(param);
    if (this.currentEntity == null)
      return rtn_info;

    // 1 校验名称是否有重复
    List<Triple<String, ClientOperation, String>> parsedQuery =
        new ArrayList<Triple<String, ClientOperation, String>>();
    parsedQuery.add(new ImmutableTriple<String, ClientOperation, String>(
        "name", ClientOperation.EQ, currentEntity.getName()));

    List<HotelLevelEntity> resultList = hotelLevelService.query(parsedQuery);
    if (resultList != null && !resultList.isEmpty()) {
      rtn_info.setFlag(false);
      rtn_info.append("已存在同名的星级名称");
    }
    return rtn_info;
  }

  @Override
  public ReturnInfo validateUpdate(Object... param) {
    ReturnInfo rtn_info = super.validateUpdate(param);
    if (this.currentEntity == null)
      return rtn_info;

    // 1 校验名称是否有重复
    List<Triple<String, ClientOperation, String>> parsedQuery =
        new ArrayList<Triple<String, ClientOperation, String>>();
    parsedQuery.add(new ImmutableTriple<String, ClientOperation, String>(
        "name", ClientOperation.EQ, currentEntity.getName()));
    parsedQuery.add(new ImmutableTriple<String, ClientOperation, String>("id",
        ClientOperation.NEG_EQ, String.valueOf(currentEntity.getId())));

    List<HotelLevelEntity> resultList = hotelLevelService.query(parsedQuery);
    if (resultList != null && !resultList.isEmpty()) {
      rtn_info.setFlag(false);
      rtn_info.append("已存在同名的星级名称");
    }
    return rtn_info;
  }
  
  @Override
  public ReturnInfo validateDelete(Object... param) {
    ReturnInfo rtn_info = super.validateDelete(param);
    if (this.id == null)
      return rtn_info;

    // 1 校验该酒店星级是否被其他对象使用
    List<Triple<String, ClientOperation, String>> parsedQuery =
        new ArrayList<Triple<String, ClientOperation, String>>();
    parsedQuery.add(new ImmutableTriple<String, ClientOperation, String>(
        "level_id", ClientOperation.EQ, String.valueOf(id)));
    
    
    List<HotelEntity> resultList = hotelService.query(parsedQuery);
    if (resultList != null && !resultList.isEmpty()) {
      rtn_info.setFlag(false);
      rtn_info.append("该酒店星级已被使用，不能删除");
    }
    return rtn_info;
  }

}
