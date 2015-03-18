package com.yn.yntp.common.email.entity;


/**
 * 
 * @Title: EmailConfigEntity.java
 * @Package com.yn.yntp.common.email.entity
 * @Description: 邮件服务配置信息
 *
 * @author liucc
 * @date 2015年1月6日 下午2:14:09
 * @version V1.0
 */

public interface EmailConfig {

  // 发送邮件服务器
  public static String mail_Server = "smtp.sina.cn";

  // 发送邮件端口
  public static Integer mail_Port= 25;

  // 登录邮件用户
  public static String mail_LoginUsername= "yunnantp@sina.cn";

  // 登录邮件用户密码
  public static String mail_LoginPassword= "yntp147258369";

  // 显示发送邮件名称
  public static String mail_FromUserName= "云南旅游平台";
  
  // 邮箱验证地址
  public static String mail_ActiveUrl= "http://localhost:8080/yntp/html/register/emailactive.html";
}
