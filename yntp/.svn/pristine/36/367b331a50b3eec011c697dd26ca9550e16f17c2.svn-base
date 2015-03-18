package com.yn.yntp.module.sys.user.service;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.yn.yntp.common.email.entity.EmailConfig;
import com.yn.yntp.common.email.entity.EmailMessageEntity;
import com.yn.yntp.common.email.service.EmailSendService;
import com.yn.yntp.common.validate.ReturnInfo;
import com.yn.yntp.common.vo.BusinessUserVO;
import com.yn.yntp.module.business.entity.BusinessEntity;
import com.yn.yntp.module.business.service.BusinessService;
import com.yn.yntp.module.sys.user.entity.UserEntity;
import com.yn.yntp.module.sys.user.entity.UserStatus;

/**
 * 
 * @Title: RegisterService.java 
 * @Package com.yn.yntp.module.sys.user.service 
 * @Description: TODO(用一句话描述该文件做什么) 
 *
 * @author liucc    
 * @date 2015年1月5日 下午8:27:16 
 * @version V1.0 
 */

@Service
@Transactional
public class RegisterService {

  @Autowired
  private BusinessUserService businessUserService;
  
  @Autowired
  private PersonalUserService personalUserService;
  
  @Autowired
  private BusinessService businessService;
  
  @Value(value = "${mail.validate.needactive}")
  private Boolean needEmailActive;
  
  /**
   * 商家注册
   * 
   * @param businessUserVO
   * @return
   */
  public ReturnInfo registerBusiness(BusinessUserVO businessUserVO) {
    ReturnInfo returnInfo = new ReturnInfo();
    UserEntity userEntity = businessUserVO.getUserEntity();
    if(needEmailActive){
      userEntity.setUserstatus(UserStatus.UNACTIVE.getCode());
    } else {
      userEntity.setUserstatus(UserStatus.NORMAL.getCode());
    }
    businessUserService.insert(userEntity);
    
    BusinessEntity businessEntity = businessUserVO.getBusinessEntity();
    businessEntity.setUserEntity(userEntity);
    businessService.insert(businessEntity);
    
    if(needEmailActive){
      sendActiveEmail(userEntity);
    } 
    
    return returnInfo;
  }
  
  /**
   * 普通用户注册
   * 
   * @param businessUserVO
   * @return
   */
  public ReturnInfo registerPersonal(BusinessUserVO businessUserVO){
    ReturnInfo returnInfo = new ReturnInfo();
    UserEntity userEntity = businessUserVO.getUserEntity();
    
    if(needEmailActive){
      userEntity.setUserstatus(UserStatus.UNACTIVE.getCode());
    } else {
      userEntity.setUserstatus(UserStatus.NORMAL.getCode());
    }
    
    personalUserService.insert(userEntity);
    
    if(needEmailActive){
      sendActiveEmail(userEntity);
    } 
    return returnInfo;
  }
  
  /**
   * 发送激活邮件
   * 
   * @param userEntity
   */
  private void sendActiveEmail(UserEntity userEntity){
    EmailMessageEntity messageEntity = new EmailMessageEntity();
    messageEntity.setDate(new Date());
    messageEntity.setToEmailAddress(userEntity.getEmail());
    messageEntity.setToUserName(userEntity.getEmail());
    
    StringBuilder emailContent = new StringBuilder();
    emailContent.append("尊敬的用户，你好！").append("\r\n");
    emailContent.append("    欢迎注册云南旅游平台，请点击如下链接完成邮箱激活：").append("\r\n");
    emailContent.append(EmailConfig.mail_ActiveUrl + "?email=" + userEntity.getEmail());
    emailContent.append("&validation=" + userEntity.getPassword());
    emailContent.append("&id=" + userEntity.getId());
    messageEntity.setContent(emailContent.toString());
    
    EmailSendService emailSendService = new EmailSendService();
    boolean flag;
    flag =  emailSendService.sendMail(messageEntity);
    if (flag) {
      System.out.println("邮件发送成功！");
    } else {
      System.out.println("邮件发送失败！");
    }
   
  }
}
