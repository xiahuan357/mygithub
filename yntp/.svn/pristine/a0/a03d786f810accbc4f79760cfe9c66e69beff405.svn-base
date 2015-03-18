package com.yn.yntp.module.nationalfeature.validate;

import java.util.ArrayList;
import java.util.List;

import org.apache.commons.lang3.tuple.ImmutableTriple;
import org.apache.commons.lang3.tuple.Triple;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.yn.yntp.common.entity.search.ClientOperation;
import com.yn.yntp.common.validate.DefaultValidate;
import com.yn.yntp.common.validate.ReturnInfo;
import com.yn.yntp.module.nationalfeature.entity.NationalFeatureEntity;
import com.yn.yntp.module.nationalfeature.service.NationalFeatureService;

/**
 * 
 * @Title: TourismTypeValidate.java 
 * @Package com.yn.yntp.module.tourismline.validate 
 * @Description: TODO(用一句话描述该文件做什么) 
 *
 * @author liucc    
 * @date 2015年1月2日10:19:54 
 * @version V1.0 
 */
@Component
public class NationalFeatureValidate extends DefaultValidate<NationalFeatureEntity,Long> {
  
  @Autowired
  private NationalFeatureService nationalFeatureService;
  
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

    List<NationalFeatureEntity> resultList = nationalFeatureService.query(parsedQuery);
    if (resultList != null && !resultList.isEmpty()) {
      rtn_info.setFlag(false);
      rtn_info.append("已存在同名的民族特色");
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

    List<NationalFeatureEntity> resultList = nationalFeatureService.query(parsedQuery);
    if (resultList != null && !resultList.isEmpty()) {
      rtn_info.setFlag(false);
      rtn_info.append("已存在同名的民族特色");
    }
    return rtn_info;
  }
 
}
