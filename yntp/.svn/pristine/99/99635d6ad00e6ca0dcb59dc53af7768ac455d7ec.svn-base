package org.apache.shiro.web.filter.authc;

import java.io.PrintWriter;

import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.subject.Subject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import com.yn.yntp.module.sys.user.entity.UserEntity;
import com.yn.yntp.module.sys.user.entity.UserType;
import com.yn.yntp.module.sys.user.service.UserService;

/**
 * 
 * 
 * @Title: CustomFormAuthenticationFilter.java
 * @Package org.apache.shiro.web.filter.authc
 * @Description:
 *               基于几点修改：
 *               1、onLoginFailure 时 把异常添加到request attribute中 而不是异常类名
 *               2、登录成功时：成功页面重定向：
 *               2.1、如果前一个页面是登录页面，-->2.3
 *               2.2、如果有SavedRequest 则返回到SavedRequest
 *               2.3、否则根据当前登录的用户决定返回到管理员首页/前台首页
 * @author liucc
 * @date 2014年11月29日 下午6:03:09
 * @version V1.0
 */
public class CustomFormAuthenticationFilter extends FormAuthenticationFilter {

  protected Logger logger = LoggerFactory.getLogger(CustomFormAuthenticationFilter.class);

  @Autowired
  UserService userService;

  @Override
  protected void setFailureAttribute(ServletRequest request,
      AuthenticationException ae) {
    request.setAttribute(getFailureKeyAttribute(), ae);
  }

  /**
   * 默认的成功地址
   */
  private String defaultSuccessUrl;

  /**
   * 管理员默认的成功地址
   */
  private String adminDefaultSuccessUrl;

  public void setUserService(UserService userService) {
    this.userService = userService;
  }

  public void setDefaultSuccessUrl(String defaultSuccessUrl) {
    this.defaultSuccessUrl = defaultSuccessUrl;
  }

  public void setAdminDefaultSuccessUrl(String adminDefaultSuccessUrl) {
    this.adminDefaultSuccessUrl = adminDefaultSuccessUrl;
  }

  public String getDefaultSuccessUrl() {
    return defaultSuccessUrl;
  }

  public String getAdminDefaultSuccessUrl() {
    return adminDefaultSuccessUrl;
  }

  /**
   * 根据用户选择成功地址
   *
   * @return
   */
  @Override
  public String getSuccessUrl() {
    String username = (String) SecurityUtils.getSubject().getPrincipal();
    UserEntity user = userService.findByUsername(username);
    if (user != null) {
      if (user.getUsertype().equals(UserType.ADMIN.getCode())) {
        return getAdminDefaultSuccessUrl();
      }
      else if (user.getUsertype().equals(UserType.BUSINESS.getCode())) {

      }
      else if (user.getUsertype().equals(UserType.PERSONAL.getCode())) {

      }
    }
    return getDefaultSuccessUrl();
  }

  /**
   * 所有请求都会经过的方法。
   */
  @Override
  protected boolean onAccessDenied(ServletRequest request,
  ServletResponse response) throws Exception {
    if (isLoginRequest(request, response)) {
      if (isLoginSubmission(request, response)) {
        if (logger.isTraceEnabled()) {
          logger.trace("Login submission detected.  Attempting to execute login.");
        }
        if ("XMLHttpRequest".equalsIgnoreCase(((HttpServletRequest) request).getHeader("X-Requested-With"))) {// 不是ajax请求
        }
        return executeLogin(request, response);
      } else {
        if (logger.isTraceEnabled()) {
          logger.trace("Login page view.");
        }
        return true;
      }
    } else {
      Subject subject = getSubject(request, response);
      if (subject != null) {
          subject.logout();
      }
      if (logger.isTraceEnabled()) {
        logger.trace("Attempting to access a path which requires authentication.  Forwarding to the "
                + "Authentication url [" + getLoginUrl() + "]");
      }
      if (!"XMLHttpRequest".equalsIgnoreCase(((HttpServletRequest) request).getHeader("X-Requested-With"))) {// 不是ajax请求
        saveRequestAndRedirectToLogin(request, response);
      } else {
        response.setCharacterEncoding("UTF-8");
        PrintWriter out = response.getWriter();
        out.print("登陆超时！请重新登陆！");
        out.flush();
        out.close();
      }
      return false;
    }
  }
}
