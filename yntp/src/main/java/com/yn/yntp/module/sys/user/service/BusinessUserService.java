package com.yn.yntp.module.sys.user.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.yn.yntp.module.sys.user.entity.UserEntity;
import com.yn.yntp.module.sys.user.entity.UserType;

/**
 * 
 * @Title: BusinessUserService.java 
 * @Package com.yn.yntp.module.sys.user.service 
 * @Description: TODO(用一句话描述该文件做什么) 
 *
 * @author liucc    
 * @date 2015年1月5日 上午9:20:15 
 * @version V1.0 
 */

@Service
@Transactional
public class BusinessUserService extends UserService{

  @Override
  public void insert(UserEntity entity) {
    entity.setUsertype(UserType.BUSINESS.getCode());
    super.insert(entity);
  }

}
