package com.yn.yntp.module.sys.permission.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.yn.yntp.common.persistence.service.BaseServiceImpl;
import com.yn.yntp.module.sys.permission.dao.UserRoleDAO;
import com.yn.yntp.module.sys.permission.entity.UserRoleEntity;

/**
 * 
 * @Title: IRoleService.java
 * @Package com.yn.yntp.module.sys.permission.service
 * @Description: TODO(用一句话描述该文件做什么)
 *
 * @author liucc
 * @date 2014年11月21日 下午8:53:00
 * @version V1.0
 */
@Service
@Transactional
public class UserRoleService extends BaseServiceImpl<UserRoleEntity, Long> {
  /**
   * 向下转化为具体dao
   * 
   * @return
   */
  private UserRoleDAO getRoleDAO(){
    return (UserRoleDAO)baseDao;
  }
  
}
