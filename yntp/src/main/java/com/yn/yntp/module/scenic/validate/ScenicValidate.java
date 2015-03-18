package com.yn.yntp.module.scenic.validate;

import java.util.ArrayList;
import java.util.List;

import org.apache.commons.lang3.tuple.ImmutableTriple;
import org.apache.commons.lang3.tuple.Triple;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.yn.yntp.common.entity.search.ClientOperation;
import com.yn.yntp.common.validate.DefaultValidate;
import com.yn.yntp.common.validate.ReturnInfo;
import com.yn.yntp.module.scenic.entity.ScenicEntity;
import com.yn.yntp.module.scenic.entity.ScenicTicketEntity;
import com.yn.yntp.module.scenic.service.ScenicService;
import com.yn.yntp.module.scenic.service.ScenicTicketService;

/**
 * 
 * 
 * @Title: ScenicValidate.java
 * @Package com.yn.yntp.module.scenic.validate
 * @Description: TODO(用一句话描述该文件做什么)
 *
 * @author cuilz
 * @date 2014年11月25日 上午10:32:38
 * @version V1.0
 */
@Component
public class ScenicValidate extends DefaultValidate<ScenicEntity, Long> {

  @Autowired
  private ScenicService scenicService;

  @Autowired
  private ScenicTicketService scenicTicketService;
  
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
    parsedQuery.add(new ImmutableTriple<String, ClientOperation, String>(
        "business_id", ClientOperation.EQ, String.valueOf(currentEntity.getBusiness_id())));

    List<ScenicEntity> resultList = scenicService.query(parsedQuery);
    if (resultList != null && !resultList.isEmpty()) {
      rtn_info.setFlag(false);
      rtn_info.append("已存在同名的景点");
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
    parsedQuery.add(new ImmutableTriple<String, ClientOperation, String>("id",
        ClientOperation.NEG_EQ, String.valueOf(currentEntity.getId())));
    parsedQuery.add(new ImmutableTriple<String, ClientOperation, String>(
        "name", ClientOperation.EQ, currentEntity.getName()));
    parsedQuery.add(new ImmutableTriple<String, ClientOperation, String>(
        "business_id", ClientOperation.EQ, String.valueOf(currentEntity.getBusiness_id())));

    List<ScenicEntity> resultList = scenicService.query(parsedQuery);
    if (resultList != null && !resultList.isEmpty()) {
      rtn_info.setFlag(false);
      rtn_info.append("已存在同名的景点");
    }
    return rtn_info;
  }

  @Override
  public ReturnInfo validateDelete(Object... param) {
    ReturnInfo rtn_info = super.validateDelete(param);
    if (this.id == null)
      return rtn_info;

    // 1 校验景点下面是否有门票
    List<Triple<String, ClientOperation, String>> parsedQuery =
        new ArrayList<Triple<String, ClientOperation, String>>();
    parsedQuery.add(new ImmutableTriple<String, ClientOperation, String>(
        "scenic_id", ClientOperation.EQ, String.valueOf(id)));
    
    List<ScenicTicketEntity> resultList = scenicTicketService.query(parsedQuery);
    if (resultList != null && !resultList.isEmpty()) {
      rtn_info.setFlag(false);
      rtn_info.append("该景点下面已经含有门票信息，不能删除，或者先删除门票后再删除该景点");
    }
    return rtn_info;
  }
}