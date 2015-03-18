package com.yn.yntp.module.scenic.service;

import java.util.List;

import org.hibernate.Query;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.yn.yntp.common.persistence.service.BaseServiceImpl;
import com.yn.yntp.module.scenic.dao.ScenicTicketDAO;
import com.yn.yntp.module.scenic.entity.ScenicTicketEntity;

/**
 * 
 * @Title: ScenicService.java
 * @Package com.yn.yntp.module.scenic.service
 * @Description: TODO(用一句话描述该文件做什么)
 *
 * @author liucc
 * @date 2014年11月22日 下午3:40:26
 * @version V1.0
 */

@Service
@Transactional
public class ScenicTicketService extends BaseServiceImpl<ScenicTicketEntity, Long> {

  private ScenicTicketDAO getScenicTicketDAO() {
    return (ScenicTicketDAO) baseDao;
  }
  
  /**
   * 获得景点的最低门票价格
   * 
   * @param scenicId
   * @return
   */
  public Double getMinTicketPrice(Long scenicId){
    StringBuilder hql = new StringBuilder();
    hql.append("select min(price) from ScenicTicketEntity t where t.scenic_id = :scenic_id");
    
    Query query = baseDao.getSession().createQuery(hql.toString());
    query.setParameter("scenic_id", scenicId);

    List result = query.list();
    if(result != null && result.size() > 0){
      return (Double)result.get(0);
    }
    
    return -1.00;
  }
}
