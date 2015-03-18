package com.yn.yntp.module.region.service;

import java.util.List;

import org.hibernate.Query;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.yn.yntp.common.persistence.service.BaseServiceImpl;
import com.yn.yntp.common.web.vo.SelectOptionVO;
import com.yn.yntp.module.region.dao.RegionDAO;
import com.yn.yntp.module.region.entity.RegionEntity;

/**
 * 
 * @Title: TourismService.java 
 * @Package com.yn.yntp.module.tourism.service 
 * @Description: TODO(用一句话描述该文件做什么) 
 *
 * @author liucc    
 * @date 2014年11月22日 下午3:40:26 
 * @version V1.0 
 */

@Service
@Transactional
public class RegionService extends BaseServiceImpl<RegionEntity, Long>{

  private RegionDAO getRegionDAO(){
    return (RegionDAO)baseDao;
  }
  
  /**
   * 根据父亲id查询出所有孩子
   * 
   * @param region_id
   * @return
   */
  public List<SelectOptionVO> getSelectOptionVO(Long parentid) {
    StringBuilder hql = new StringBuilder();
    hql.append(" select new com.yn.yntp.common.web.vo.SelectOptionVO(T1.id,T1.name) from RegionEntity T1 where T1.parent_id="+parentid );

    Query query = baseDao.getSession().createQuery(hql.toString());

    List<SelectOptionVO> list = query.list();
    return list;
  }
}
