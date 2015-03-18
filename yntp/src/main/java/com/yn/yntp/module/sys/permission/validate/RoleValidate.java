package com.yn.yntp.module.sys.permission.validate;

import org.springframework.stereotype.Component;

import com.yn.yntp.common.validate.DefaultValidate;
import com.yn.yntp.common.validate.ReturnInfo;
import com.yn.yntp.module.sys.permission.entity.RoleEntity;

/**
 * 
 * @Title: TourismTypeValidate.java 
 * @Package com.yn.yntp.module.tourismline.validate 
 * @Description: TODO(用一句话描述该文件做什么) 
 *
 * @author liucc    
 * @date 2014年11月24日 下午3:24:02 
 * @version V1.0 
 */
@Component
public class RoleValidate extends DefaultValidate<RoleEntity,Long> {

  @Override
  public ReturnInfo validateCreate(Object... param) {
    return super.validateCreate(param);
  }

  @Override
  public ReturnInfo validateUpdate(Object... param) {
    return super.validateUpdate(param);
  }

  @Override
  public ReturnInfo validateDelete(Object... param) {
    return super.validateDelete(param);
  }
 

}
