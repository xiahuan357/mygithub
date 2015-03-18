package com.yn.yntp.module.sys.user.validate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.yn.yntp.common.validate.DefaultValidate;
import com.yn.yntp.common.validate.ReturnInfo;
import com.yn.yntp.module.sys.user.entity.UserEntity;
import com.yn.yntp.module.sys.user.service.UserService;

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
public class UserValidate extends DefaultValidate<UserEntity,Long> {

  @Autowired
  protected UserService userService;
 
  /**
   * 校验用户信息格式：用户名，邮箱，电话号码
   * 
   * @return
   */
  protected ReturnInfo userInfoFormatValidate(){
    ReturnInfo rtn_info = new ReturnInfo();
    String username = currentEntity.getUsername();
    if(username == null || !username.matches(UserEntity.USERNAME_PATTERN)){
      rtn_info.setFlag(false);
      rtn_info.append("用户名格式不正确");
    }
    
    String email = currentEntity.getEmail();
    if (email == null || !email.matches(UserEntity.EMAIL_PATTERN)) {
      rtn_info.setFlag(false);
      rtn_info.append("邮箱格式不正确");
    }

    String mobilePhoneNumber = currentEntity.getMobile_phone_number();
    if (mobilePhoneNumber == null
        || !mobilePhoneNumber.matches(UserEntity.MOBILE_PHONE_NUMBER_PATTERN)) {
      rtn_info.setFlag(false);
      rtn_info.append("手机号格式不正确");
    }

    return rtn_info;
  }
  
  /**
   * 校验用户信息是否重复：用户名，邮箱，电话号码
   * 
   * @return
   */
  protected ReturnInfo userInfoRepeatValidate() {
    ReturnInfo rtn_info = new ReturnInfo();
    
    String username = currentEntity.getUsername();
    UserEntity usernameDbUser = userService.findByUsername(username);
    if(usernameDbUser != null && !usernameDbUser.equals(currentEntity)){
      rtn_info.setFlag(false);
      rtn_info.append("用户名已经被其他人使用，请换一个");
    }
    
    String email = currentEntity.getEmail();
    UserEntity emailDbUser = userService.findByEmail(email);
    if (emailDbUser != null && !emailDbUser.equals(currentEntity)) {
      rtn_info.setFlag(false);
      rtn_info.append("邮箱地址已经被其他人使用，请换一个");
    }

    String mobilePhoneNumber = currentEntity.getMobile_phone_number();
    UserEntity mobilePhoneNumberDbUser = userService.findByMobilePhoneNumber(mobilePhoneNumber);
    if (mobilePhoneNumberDbUser != null
        && !mobilePhoneNumberDbUser.equals(currentEntity)) {
      rtn_info.setFlag(false);
      rtn_info.append("手机号已经被其他人使用，请换一个");
    }
    
   return rtn_info;
  }
}
