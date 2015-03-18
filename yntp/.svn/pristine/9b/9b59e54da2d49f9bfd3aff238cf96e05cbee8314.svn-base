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
import com.yn.yntp.module.sys.user.service.PersonalUserService;
import com.yn.yntp.module.sys.user.validate.PersonalUserValidate;


/**
 * 
 * @Title: CommonUserController.java 
 * @Package com.yn.yntp.module.sys.user.web 
 * @Description: 普通用户操作相关
 *
 * @author liucc    
 * @date 2014年12月7日 下午5:05:58 
 * @version V1.0 
 */

@Controller
@RequestMapping("/admin/sys/user/personal")
public class PersonalController extends UserController{
  @Autowired
  private PersonalUserService personalUserService;
  
  @Autowired
  private PersonalUserValidate personalUserValidate;

  @Override
  protected void setBaseService(BaseServiceImpl<UserEntity, Long> baseService) {
    super.setBaseService(personalUserService);
  }

  @Override
  protected BaseServiceImpl getBaseService() {
    return personalUserService;
  }
  
  @Override
  protected void setDefaultValidate(DefaultValidate<UserEntity, Long> defaultValidate) {
    super.setDefaultValidate(personalUserValidate);
  }

  @Override
  protected DefaultValidate getDefaultValidate() {
    return personalUserValidate;
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
