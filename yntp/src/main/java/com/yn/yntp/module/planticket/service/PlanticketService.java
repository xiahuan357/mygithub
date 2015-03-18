package com.yn.yntp.module.planticket.service;

import java.util.List;

import org.hibernate.Query;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.yn.yntp.common.persistence.service.BaseServiceImpl;
import com.yn.yntp.common.web.vo.SelectOptionVO;
import com.yn.yntp.module.planticket.dao.PlanticketDAO;
import com.yn.yntp.module.planticket.entity.PlanticketEntity;

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
public class PlanticketService extends BaseServiceImpl<PlanticketEntity, Long> {

  private PlanticketDAO getPlanticketDAO() {
    return (PlanticketDAO) baseDao;
  }
 
}