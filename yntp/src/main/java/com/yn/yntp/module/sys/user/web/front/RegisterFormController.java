package com.yn.yntp.module.sys.user.web.front;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang3.tuple.ImmutableTriple;
import org.apache.commons.lang3.tuple.Triple;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.yn.yntp.common.entity.response.ServiceResponse;
import com.yn.yntp.common.entity.search.ClientOperation;
import com.yn.yntp.common.validate.ReturnInfo;
import com.yn.yntp.common.vo.BusinessUserVO;
import com.yn.yntp.module.business.validate.BusinessValidate;
import com.yn.yntp.module.sys.user.entity.UserEntity;
import com.yn.yntp.module.sys.user.entity.UserStatus;
import com.yn.yntp.module.sys.user.service.RegisterService;
import com.yn.yntp.module.sys.user.service.UserService;
import com.yn.yntp.module.sys.user.validate.PersonalUserValidate;

/**
 * 
 * @Title: RegisterFormController.java 
 * @Package com.yn.yntp.module.sys.user.web.front 
 * @Description: 注册相关
 *
 * @author liucc    
 * @date 2015年1月5日 下午5:15:09 
 * @version V1.0 
 */

@Controller
@RequestMapping("/front/register")
public class RegisterFormController {

  private final Logger logger = LoggerFactory.getLogger(getClass());
  
  @Autowired
  private RegisterService registerService;
  
  @Autowired
  private UserService userService;
  
  @Autowired
  private PersonalUserValidate personalUserValidate;
  
  @Autowired
  private BusinessValidate businessValidate;
  
  /**
   * 商家注册
   * 
   * @param businessUserVO
   * @return
   */
  @RequestMapping(value = "/registerbusiness",method = RequestMethod.POST)
  @ResponseBody
  public Object registerBusiness(@RequestBody BusinessUserVO businessUserVO){
    ServiceResponse<String> ret = new ServiceResponse<String>();
    
    personalUserValidate.setEntity(businessUserVO.getUserEntity());
    ReturnInfo validate = personalUserValidate.validateCreate();
    if (validate != null && Boolean.FALSE == validate.getFlag()) {
      ret.setRetcode("100000");
      ret.setRetmsg(validate.getMsg());
      return ret;
    }
    
    businessValidate.setEntity(businessUserVO.getBusinessEntity());
    validate = personalUserValidate.validateCreate();
    if (validate != null && Boolean.FALSE == validate.getFlag()) {
      ret.setRetcode("100000");
      ret.setRetmsg(validate.getMsg());
      return ret;
    }
    
    registerService.registerBusiness(businessUserVO);
    return ret;
  }
  
  /**
   * 普通用户注册
   * 
   * @param businessUserVO
   * @return
   */
  @RequestMapping(value = "/registerpersonal",method = RequestMethod.POST)
  @ResponseBody
  public Object registerPersonal(@RequestBody BusinessUserVO businessUserVO){
    ServiceResponse<String> ret = new ServiceResponse<String>();
    
    personalUserValidate.setEntity(businessUserVO.getUserEntity());
    ReturnInfo validate = personalUserValidate.validateCreate();
    if (validate != null && Boolean.FALSE == validate.getFlag()) {
      ret.setRetcode("100000");
      ret.setRetmsg(validate.getMsg());
      return ret;
    }
    
    registerService.registerPersonal(businessUserVO);
    return ret;
  }
  
  /**
   * 激活邮件
   * 
   * @param id
   * @param email
   * @param validation
   * @return
   */
  @RequestMapping(value = "/emailactive",method = RequestMethod.POST)
  @ResponseBody
  public Object registerPersonal(@RequestParam("id") String id,@RequestParam("email") String email,
      @RequestParam("validation") String validation){
    ServiceResponse<String> ret = new ServiceResponse<String>();
    
    List<Triple<String, ClientOperation, String>> parsedQuery =  new ArrayList<Triple<String, ClientOperation, String>>();
    parsedQuery.add(new ImmutableTriple<String, ClientOperation, String>("id", ClientOperation.EQ, String.valueOf(id)));
    parsedQuery.add(new ImmutableTriple<String, ClientOperation, String>("email", ClientOperation.EQ, String.valueOf(email)));
    parsedQuery.add(new ImmutableTriple<String, ClientOperation, String>("password", ClientOperation.EQ, String.valueOf(validation)));
    
    List<UserEntity> resultList = userService.query(parsedQuery);
    if(resultList == null || resultList.isEmpty()){
      ret.setRetcode("100000");
      ret.setRetmsg("用户凭证不对（用户信息不对或邮箱地址不存在）！");
      return ret;
    }
    
    UserEntity userEntity = resultList.get(0);
    if(!userEntity.getUserstatus().equals(UserStatus.UNACTIVE.getCode())){
      ret.setRetcode("000000");
      ret.setRetmsg("邮箱已激活！");
      return ret;
    } else {
      parsedQuery =  new ArrayList<Triple<String, ClientOperation, String>>();
      parsedQuery.add(new ImmutableTriple<String, ClientOperation, String>("id", ClientOperation.EQ, String.valueOf(id)));
      
      Map<String,Object> filedNameMap = new HashMap<String, Object>();
      filedNameMap.put("userstatus", UserStatus.NORMAL.getCode());
      
      // 更新状态
      userService.update(filedNameMap,parsedQuery);
    }
    
    ret.setRetcode("000000");
    ret.setRetmsg("激活成功！");
    return ret;
  }
}
