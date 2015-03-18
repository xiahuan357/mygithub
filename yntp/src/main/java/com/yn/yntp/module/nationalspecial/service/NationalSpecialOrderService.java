package com.yn.yntp.module.nationalspecial.service;

import java.util.List;

import org.hibernate.Query;
import org.springframework.stereotype.Service;

import com.yn.yntp.common.persistence.service.BaseServiceImpl;
import com.yn.yntp.module.nationalspecial.entity.NationalSpecialOrderEntity;

/**
 * 
 * @Title: NationalSpecialService.java 
 * @Package com.yn.yntp.module.nationalspecial.service 
 * @Description: TODO(用一句话描述该文件做什么) 
 *
 * @author liucc    
 * @date 2015年1月17日 下午2:00:02 
 * @version V1.0 
 */

@Service
public class NationalSpecialOrderService extends BaseServiceImpl<NationalSpecialOrderEntity, Long> {
  /**
   * 获得特产的交易量，计算订单中的数量
   * 
   * @param scenicId
   * @return
   */
  public Integer getSellCount(Long specialId){
    StringBuilder hql = new StringBuilder();
    hql.append("select sum(t.count) from NationalSpecialOrderEntity t where t.special_id = :special_id");
    
    Query query = baseDao.getSession().createQuery(hql.toString());
    query.setParameter("special_id", specialId);

    List result = query.list();
    if(result != null && result.size() > 0){
      return (Integer) (result.get(0) == null ? 0 : result.get(0));
    }
    
    return 0;
  }
}
