package com.yn.yntp.module.sys.user.web;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.yn.yntp.common.persistence.service.BaseServiceImpl;
import com.yn.yntp.common.validate.DefaultValidate;
import com.yn.yntp.module.sys.user.entity.UserEntity;
import com.yn.yntp.module.sys.user.service.BusinessUserService;
import com.yn.yntp.module.sys.user.validate.BusinessUserValidate;


/**
 * 
 * @Title: BusinessUserController.java 
 * @Package com.yn.yntp.module.sys.user.web 
 * @Description: 商家操作相关
 *
 * @author liucc    
 * @date 2014年12月7日 下午5:05:33 
 * @version V1.0 
 */

@Controller
@RequestMapping("/admin/sys/user/business")
public class BusinessUserController extends UserController{
  @Autowired
  private BusinessUserService businessUserService;
  
  @Autowired
  private BusinessUserValidate businessUserValidate;

  @Override
  protected void setBaseService(BaseServiceImpl<UserEntity, Long> baseService) {
    super.setBaseService(businessUserService);
  }

  @Override
  protected BaseServiceImpl getBaseService() {
    return businessUserService;
  }
  
  @Override
  protected void setDefaultValidate(DefaultValidate<UserEntity, Long> defaultValidate) {
    super.setDefaultValidate(businessUserValidate);
  }

  @Override
  protected DefaultValidate getDefaultValidate() {
    return businessUserValidate;
  }

  /**
   * 新增一个资源。
   * 
   * @param resource
   */
  @RequestMapping(value = "/create",method = RequestMethod.POST)
  @ResponseBody
  public Object create(Model model, @Valid @ModelAttribute final UserEntity resource,BindingResult result) {
    return super.create(model, resource, result);
  }
  
}
