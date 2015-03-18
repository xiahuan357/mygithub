package com.yn.yntp.module.sys.user.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.yn.yntp.module.sys.user.entity.UserEntity;
import com.yn.yntp.module.sys.user.entity.UserType;

/**
 * 
 * @Title: AdminUserService.java 
 * @Package com.yn.yntp.module.sys.user.service 
 * @Description: TODO(用一句话描述该文件做什么) 
 *
 * @author liucc    
 * @date 2014年12月10日 下午9:07:56 
 * @version V1.0 
 */

@Service
@Transactional
public class AdminUserService extends UserService{

  @Override
  public void insert(UserEntity entity) {
    entity.setUsertype(UserType.ADMIN.getCode());
    super.insert(entity);
  }

}
