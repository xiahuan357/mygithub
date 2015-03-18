package com.yn.yntp.module.tourismline.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.yn.yntp.common.persistence.service.BaseServiceImpl;
import com.yn.yntp.module.tourismline.dao.TourismlineDAO;
import com.yn.yntp.module.tourismline.entity.TourismlineEntity;

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
public class TourismlineService extends BaseServiceImpl<TourismlineEntity, Long>{

  private TourismlineDAO getTourismlineDAO(){
    return (TourismlineDAO)baseDao;
  }
}
