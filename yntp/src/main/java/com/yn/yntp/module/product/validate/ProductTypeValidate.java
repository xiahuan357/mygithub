package com.yn.yntp.module.product.validate;

import java.util.ArrayList;
import java.util.List;

import org.apache.commons.lang3.tuple.ImmutableTriple;
import org.apache.commons.lang3.tuple.Triple;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.yn.yntp.common.entity.search.ClientOperation;
import com.yn.yntp.common.validate.DefaultValidate;
import com.yn.yntp.common.validate.ReturnInfo;
import com.yn.yntp.module.product.entity.ProductTypeEntity;
import com.yn.yntp.module.product.service.ProductTypeService;

/**
 * 
 * @Title: ProductTypeValidate.java 
 * @Package com.yn.yntp.module.special.validate 
 * @Description: TODO(用一句话描述该文件做什么) 
 *
 * @author jiqr    
 * @date 2014年12月9日 下午2:29:21 
 * @version V1.0 
 */
@Component
public class ProductTypeValidate extends DefaultValidate<ProductTypeEntity,Long> {
  @Autowired
  private ProductTypeService productTypeService;
  
  @Autowired
  private ProductTypeService ProductService;
  
  @Override
  public ReturnInfo validateCreate(Object... param) {
    ReturnInfo rtn_info = super.validateCreate(param);
    if(this.currentEntity == null)
      return rtn_info;
    
    // 1 校验名称是否有重复
    List<Triple<String, ClientOperation, String>> parsedQuery =  new ArrayList<Triple<String, ClientOperation, String>>();
    parsedQuery.add(new ImmutableTriple<String, ClientOperation, String>("name", ClientOperation.EQ, currentEntity.getName()));
    parsedQuery.add(new ImmutableTriple<String, ClientOperation, String>("parent_id", ClientOperation.EQ, String.valueOf(currentEntity.getParent_id())));
    
    List<ProductTypeEntity> resultList = productTypeService.query(parsedQuery);
    if(resultList != null && !resultList.isEmpty()){
      rtn_info.setFlag(false);
      rtn_info.append("已存在同名的分类");
    }
    return rtn_info;
  }

  @Override
  public ReturnInfo validateUpdate(Object... param) {
    ReturnInfo rtn_info = super.validateUpdate(param);
    if(this.currentEntity == null)
      return rtn_info;
    
    // 1 校验名称是否有重复
    List<Triple<String, ClientOperation, String>> parsedQuery =  new ArrayList<Triple<String, ClientOperation, String>>();
    parsedQuery.add(new ImmutableTriple<String, ClientOperation, String>("name", ClientOperation.EQ, currentEntity.getName()));
    parsedQuery.add(new ImmutableTriple<String, ClientOperation, String>("parent_id", ClientOperation.EQ, String.valueOf(currentEntity.getParent_id())));
    parsedQuery.add(new ImmutableTriple<String, ClientOperation, String>("id", ClientOperation.NEG_EQ, String.valueOf(currentEntity.getId())));
    
    List<ProductTypeEntity> resultList = productTypeService.query(parsedQuery);
    if(resultList != null && !resultList.isEmpty()){
      rtn_info.setFlag(false);
      rtn_info.append("已存在同名的分类");
    }
    return rtn_info;
  }

  @Override
  public ReturnInfo validateDelete(Object... param) {
    ReturnInfo rtn_info = super.validateDelete(param);
    if(this.id == null)
      return rtn_info;
    
    // 1 校验分类下是否有孩子节点
    List<Triple<String, ClientOperation, String>> parsedQuery =  new ArrayList<Triple<String, ClientOperation, String>>();
    parsedQuery.add(new ImmutableTriple<String, ClientOperation, String>("parent_id", ClientOperation.EQ, String.valueOf(id)));
    
    List<ProductTypeEntity> resultList = ProductService.query(parsedQuery);
    if(resultList != null && !resultList.isEmpty()){
      rtn_info.setFlag(false);
      rtn_info.append("该分类下面含有子分类，不能删除");
    }
    // 2 校验该分类是否被其他对象使用
    
    return rtn_info;
  }
 
}
