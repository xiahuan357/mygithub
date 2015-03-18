package com.yn.yntp.module.hotel.service;

import java.util.List;

import org.hibernate.Query;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.yn.yntp.common.persistence.service.BaseServiceImpl;
import com.yn.yntp.module.hotel.entity.HotelRoomEntity;

/**
 * 
 * @Title: HotelRoomService.java 
 * @Package com.yn.yntp.module.hotel.service 
 * @Description: TODO(用一句话描述该文件做什么) 
 *
 * @author liucc    
 * @date 2015年1月16日 下午2:34:12 
 * @version V1.0 
 */

@Service
@Transactional
public class HotelRoomService extends BaseServiceImpl<HotelRoomEntity, Long> {
  
  /**
   * 获得酒店的最低房间价格
   * 
   * @param scenicId
   * @return
   */
  public Double getMinRoomPrice(Long hotelId){
    StringBuilder hql = new StringBuilder();
    hql.append("select min(price) from HotelRoomEntity t where t.hotel_id = :hotel_id");
    
    Query query = baseDao.getSession().createQuery(hql.toString());
    query.setParameter("hotel_id", hotelId);

    List result = query.list();
    if(result != null && result.size() > 0){
      return (Double)result.get(0);
    }
    
    return -1.00;
  }
}
