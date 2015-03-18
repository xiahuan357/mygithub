package com.yn.yntp.module.scenic.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.yn.yntp.common.persistence.service.BaseServiceImpl;
import com.yn.yntp.module.scenic.dao.ScenicCommentDAO;
import com.yn.yntp.module.scenic.dao.ScenicTypeDAO;
import com.yn.yntp.module.scenic.entity.ScenicCommentEntity;
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
public class ScenicCommentService extends BaseServiceImpl<ScenicCommentEntity, Long> {

  private ScenicCommentDAO getScenicCommentDAO() {
    return (ScenicCommentDAO) baseDao;
  }
}
