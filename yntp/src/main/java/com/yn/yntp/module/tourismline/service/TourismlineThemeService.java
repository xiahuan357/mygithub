package com.yn.yntp.module.tourismline.service;

import java.util.Arrays;
import java.util.List;

import org.hibernate.Query;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.yn.yntp.common.persistence.service.BaseServiceImpl;
import com.yn.yntp.common.web.vo.MultiSelectorOptionVO;
import com.yn.yntp.module.tourismline.dao.TourismlineThemeDAO;
import com.yn.yntp.module.tourismline.entity.TourismlineThemeEntity;

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
public class TourismlineThemeService extends BaseServiceImpl<TourismlineThemeEntity, Long> {

  private TourismlineThemeDAO getTourismlineThemeDAO() {
    return (TourismlineThemeDAO) baseDao;
  }

  /**
   * 
   * @return
   */
  public List<MultiSelectorOptionVO> getAllThemeModelForCreate() {
    StringBuilder hql = new StringBuilder();
    hql.append(" select new com.yn.yntp.common.web.vo.MultiSelectorOptionVO(T1.id,T1.name) from TourismlineThemeEntity T1");

    Query query = baseDao.getSession().createQuery(hql.toString());

    List<MultiSelectorOptionVO> list = query.list();
    return list;
  }

  /**
   * 
   * @return
   */
  public List<MultiSelectorOptionVO> getAllThemeModelForUpdate(String themeids) {
    // 1 查询出所有数据
    StringBuilder hql = new StringBuilder();
    hql.append(" select new com.yn.yntp.common.web.vo.MultiSelectorOptionVO(T1.id,T1.name) from TourismlineThemeEntity T1");

    Query query = baseDao.getSession().createQuery(hql.toString());

    List<MultiSelectorOptionVO> resultList = query.list();
    
    if(resultList == null || resultList.isEmpty())
      return resultList;
    
    // 2 设置已选中数据
    String[] themeIdArray = themeids.split(",");
    List<String> themeIdList = Arrays.asList(themeIdArray);
    if(themeIdList == null || themeIdList.isEmpty())
      return resultList;
          
    for(MultiSelectorOptionVO optionVO:resultList){
      if(themeIdList.indexOf(String.valueOf(optionVO.getId())) > -1){
        optionVO.setSelected(true);
      }
    }
    return resultList;
  }
}
