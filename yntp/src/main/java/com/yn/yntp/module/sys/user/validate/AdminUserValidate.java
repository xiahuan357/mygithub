package com.yn.yntp.module.sys.user.validate;

import org.springframework.stereotype.Component;

import com.yn.yntp.common.validate.ReturnInfo;
import com.yn.yntp.module.sys.user.entity.UserEntity;

/**
 * 
 * @Title: AdminUserValidate.java 
 * @Package com.yn.yntp.module.sys.user.validate 
 * @Description: TODO(用一句话描述该文件做什么) 
 *
 * @author liucc    
 * @date 2014年12月7日 下午9:38:38 
 * @version V1.0 
 */

@Component
public class AdminUserValidate extends UserValidate{

  @Override
  public ReturnInfo validateUpdate(Object... param) {
    ReturnInfo rtn_info = super.userInfoFormatValidate();
    if(!rtn_info.getFlag())
      return rtn_info;
    return super.userInfoRepeatValidate();
  }

  @Override
  public ReturnInfo validateCreate(Object... param) {
    ReturnInfo rtn_info = super.userInfoFormatValidate();
    
    // 校验密码格式
    String password = currentEntity.getPassword();
    if(password == null || password.length() > UserEntity.PASSWORD_MAX_LENGTH || password.length() < UserEntity.PASSWORD_MIN_LENGTH){
      rtn_info.setFlag(false);
      rtn_info.append("密码格式不正确");
    }
    
    if(!rtn_info.getFlag())
      return rtn_info;
    
    return super.userInfoRepeatValidate();
  }
}
