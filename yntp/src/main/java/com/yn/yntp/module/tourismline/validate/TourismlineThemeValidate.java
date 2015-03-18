package com.yn.yntp.module.tourismline.validate;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang3.tuple.ImmutableTriple;
import org.apache.commons.lang3.tuple.Triple;
import org.hibernate.type.BasicType;
import org.hibernate.type.StandardBasicTypes;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.yn.yntp.common.entity.search.ClientOperation;
import com.yn.yntp.common.validate.DefaultValidate;
import com.yn.yntp.common.validate.ReturnInfo;
import com.yn.yntp.module.tourismline.entity.TourismlineEntity;
import com.yn.yntp.module.tourismline.entity.TourismlineThemeEntity;
import com.yn.yntp.module.tourismline.service.TourismlineService;
import com.yn.yntp.module.tourismline.service.TourismlineThemeService;

/**
 * 
 * 
 * @Title: ScenicTypeValidate.java
 * @Package com.yn.yntp.module.scenic.validate
 * @Description: TODO(用一句话描述该文件做什么)
 *
 * @author cuilz
 * @date 2014年11月25日 上午10:32:38
 * @version V1.0
 */
@Component
public class TourismlineThemeValidate extends
    DefaultValidate<TourismlineThemeEntity, Long> {
  @Autowired
  private TourismlineThemeService tourismlineThemeService;

  @Autowired
  private TourismlineService tourismlineService;

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

    List<TourismlineThemeEntity> resultList =
        tourismlineThemeService.query(parsedQuery);
    if (resultList != null && !resultList.isEmpty()) {
      rtn_info.setFlag(false);
      rtn_info.append("已存在同名的线路主题");
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

    List<TourismlineThemeEntity> resultList =
        tourismlineThemeService.query(parsedQuery);
    if (resultList != null && !resultList.isEmpty()) {
      rtn_info.setFlag(false);
      rtn_info.append("已存在同名的线路主题");
    }
    return rtn_info;
  }

  @Override
  public ReturnInfo validateDelete(Object... param) {
    ReturnInfo rtn_info = super.validateDelete(param);
    if (this.id == null)
      return rtn_info;

    Map<String, BasicType> filedNameMap = new HashMap<String, BasicType>();
    {
      filedNameMap.put("theme_ids", StandardBasicTypes.STRING);
    }
    
    // 1 校验改线路主题是否被其他对象使用
    List<Triple<String, ClientOperation, String>> parsedQuery =
        new ArrayList<Triple<String, ClientOperation, String>>();
    parsedQuery.add(new ImmutableTriple<String, ClientOperation, String>("theme_ids",
        ClientOperation.CONTAINS, String.valueOf(id)));

    List<TourismlineEntity> resultList = tourismlineService.query(parsedQuery);
    if (resultList != null && !resultList.isEmpty()) {
      for(TourismlineEntity tEntity : resultList){
        String themeIds = tEntity.getTheme_ids();
        if(themeIds == null || themeIds.isEmpty())
          continue;
        
        String[] themeIdArray = themeIds.split(",");
        for(String id : themeIdArray){
          if(id.equals(id)){
            rtn_info.setFlag(false);
            rtn_info.append("改线路主题已被使用，不能删除");
            return rtn_info;
          }
        }
      }
    }
    return rtn_info;
  }
}
