package com.yn.yntp.module.car.service;

import java.util.List;

import org.hibernate.Query;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.yn.yntp.common.persistence.service.BaseServiceImpl;
import com.yn.yntp.common.web.vo.SelectOptionVO;
import com.yn.yntp.module.car.dao.CarBrandDAO;
import com.yn.yntp.module.car.entity.CarBrandEntity;

/**
 * 
 * @Title: CarBrandService.java 
 * @Package com.yn.yntp.module.car.service 
 * @Description: TODO(用一句话描述该文件做什么) 
 *
 * @author jiqr    
 * @date 2014年12月8日 下午12:13:32 
 * @version V1.0 
 */

@Service
@Transactional
public class CarBrandService extends BaseServiceImpl<CarBrandEntity, Long>{
  
  private CarBrandDAO getCarBrandDAO() {
    return (CarBrandDAO) baseDao;
  }
  
  /**
   * 
   * @return
   */
  public List<SelectOptionVO> getSelectOptionVO() {
    StringBuilder hql = new StringBuilder();
    hql.append(" select new com.yn.yntp.common.web.vo.SelectOptionVO(T1.id,T1.name) from CarBrandEntity T1");

    Query query = baseDao.getSession().createQuery(hql.toString());

    List<SelectOptionVO> list = query.list();
    return list;
  }
}
