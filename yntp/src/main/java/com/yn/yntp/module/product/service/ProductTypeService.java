package com.yn.yntp.module.product.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.yn.yntp.common.persistence.service.BaseServiceImpl;
import com.yn.yntp.module.product.dao.ProductTypeDAO;
import com.yn.yntp.module.product.entity.ProductTypeEntity;

/**
 * 
 * @Title: ProductTypeService.java 
 * @Package com.yn.yntp.module.special.service 
 * @Description: TODO(用一句话描述该文件做什么) 
 *
 * @author jiqr    
 * @date 2014年12月9日 下午2:26:33 
 * @version V1.0 
 */

@Service
@Transactional
public class ProductTypeService extends BaseServiceImpl<ProductTypeEntity, Long> {

  private ProductTypeDAO getProdcutTypeDAO() {
    return (ProductTypeDAO) baseDao;
  }
}
