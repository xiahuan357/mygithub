package com.yn.yntp.module.scenic.service;

import java.util.List;

import org.hibernate.Query;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.yn.yntp.common.persistence.service.BaseServiceImpl;
import com.yn.yntp.common.web.vo.SelectOptionVO;
import com.yn.yntp.module.scenic.entity.ScenicTypeEntity;

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
public class ScenicTypeService extends BaseServiceImpl<ScenicTypeEntity, Long> {

  /**
   * 查询数据，前台下拉框显示
   * 
   * @return
   */
  public List<SelectOptionVO> getSelectOptionVO() {
    StringBuilder hql = new StringBuilder();
    hql.append(" select new com.yn.yntp.common.web.vo.SelectOptionVO(T1.id,T1.name) from ScenicTypeEntity T1");

    Query query = baseDao.getSession().createQuery(hql.toString());

    List<SelectOptionVO> list = query.list();
    return list;
  }
}
