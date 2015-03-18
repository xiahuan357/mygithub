package com.yn.yntp.common.email.service;

import java.util.Properties;

import javax.mail.Authenticator;
import javax.mail.BodyPart;
import javax.mail.Message;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;

import com.yn.yntp.common.email.entity.EmailConfig;
import com.yn.yntp.common.email.entity.EmailMessageEntity;

/**
 * 
 * @Title: EmailSendService.java
 * @Package com.yn.yntp.common.email.service
 * @Description: TODO(用一句话描述该文件做什么)
 *
 * @author liucc
 * @date 2015年1月6日 上午11:31:29
 * @version V1.0
 */

public class EmailSendService {

  String userName = EmailConfig.mail_LoginUsername;// 发送人邮箱
  String password = EmailConfig.mail_LoginPassword;// 发送人密码
  String smtp_server = EmailConfig.mail_Server;// 邮件服务名
  Integer smtp_port = EmailConfig.mail_Port;// 邮件服务端口
  
  public Boolean sendMail(EmailMessageEntity emailMessageEntity) {
    try {
      String from_mail_address = userName;
      String to_mail_address = emailMessageEntity.getToEmailAddress();// 收信人邮箱
          
      Authenticator auth = new PopupAuthenticator(userName, password);// 发送人的邮箱账号密码验证
      Properties mailProps = new Properties();
      mailProps.put("mail.smtp.host", smtp_server);// 设置邮件服务名
      mailProps.put("mail.smtp.auth", "true");// 是否需要登录
      mailProps.put("username", userName);// 设置账号
      mailProps.put("password", password);// 设置密码

      Session mailSession = Session.getDefaultInstance(mailProps, auth);
      mailSession.setDebug(true);// 是否打印调试信息
      MimeMessage message = new MimeMessage(mailSession);
      message.setFrom(new InternetAddress(from_mail_address));// 发件人
      message.setRecipient(Message.RecipientType.TO, new InternetAddress(to_mail_address));// 邮件头
      message.setSubject(emailMessageEntity.getSubject());// 邮箱主题
      message.setSentDate(emailMessageEntity.getDate());
      MimeMultipart multi = new MimeMultipart();
      BodyPart textBodyPart = new MimeBodyPart();
      textBodyPart.setText(emailMessageEntity.getContent());// 邮箱内容

      multi.addBodyPart(textBodyPart);
      message.setContent(multi);
      message.saveChanges();
      Transport.send(message);
      return true;
    } catch (Exception ex) {
      System.err.println("邮件发送失败的原因是：" + ex.getMessage());
      System.err.println("具体的错误原因");
      ex.printStackTrace(System.err);
      return false;
    }
  }
}

class PopupAuthenticator extends Authenticator {
  private String username;
  private String password;

  public PopupAuthenticator(String username, String pwd) {
    this.username = username;
    this.password = pwd;
  }
  
  public PasswordAuthentication getPasswordAuthentication() {
    return new PasswordAuthentication(this.username, this.password);
}
}
