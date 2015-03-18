package com.yn.yntp.module.car.service;

import java.util.List;

import org.hibernate.Query;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.yn.yntp.common.persistence.service.BaseServiceImpl;
import com.yn.yntp.common.web.vo.SelectOptionVO;
import com.yn.yntp.module.car.dao.CarTypeDAO;
import com.yn.yntp.module.car.entity.CarTypeEntity;


/**
 * 
 * @Title: CarTypeService.java 
 * @Package com.yn.yntp.module.car.service 
 * @Description: TODO(用一句话描述该文件做什么) 
 *
 * @author jiqr    
 * @date 2014年12月7日 下午8:14:26 
 * @version V1.0 
 */

@Service
@Transactional
public class CarTypeService extends BaseServiceImpl<CarTypeEntity, Long>{

  private CarTypeDAO getCarTypeDAO(){
    return (CarTypeDAO)baseDao;
  }

  /**
   * 
   * @return
   */
  public List<SelectOptionVO> getSelectOptionVO() {
    StringBuilder hql = new StringBuilder();
    hql.append(" select new com.yn.yntp.common.web.vo.SelectOptionVO(T1.id,T1.name) from CarTypeEntity T1");

    Query query = baseDao.getSession().createQuery(hql.toString());

    List<SelectOptionVO> list = query.list();
    return list;
  }
}
