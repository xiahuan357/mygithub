package com.yn.yntp.module.business.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.yn.yntp.common.persistence.service.BaseServiceImpl;
import com.yn.yntp.module.business.dao.BusinessDAO;
import com.yn.yntp.module.business.entity.BusinessEntity;

/**
 * 
 * @Title: HotelService.java
 * @Package com.yn.yntp.module.hotel.service
 * @Description: TODO(用一句话描述该文件做什么)
 *
 * @author liucc
 * @date 2014年11月22日 下午3:40:26
 * @version V1.0
 */

@Service
@Transactional
public class BusinessService extends BaseServiceImpl<BusinessEntity, Long> {

  private BusinessDAO businessDAO() {
    return (BusinessDAO) baseDao;
  }

}
