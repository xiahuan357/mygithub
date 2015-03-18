package com.yn.yntp.module.sys.user.web.front;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.lang3.StringUtils;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.subject.Subject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.MessageSource;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.yn.yntp.common.constant.Constants;
import com.yn.yntp.common.entity.response.ServiceResponse;
import com.yn.yntp.module.sys.user.entity.UserEntity;
import com.yn.yntp.module.sys.user.exception.UserBlockedException;
import com.yn.yntp.module.sys.user.exception.UserNotExistsException;
import com.yn.yntp.module.sys.user.exception.UserPasswordNotMatchException;
import com.yn.yntp.module.sys.user.exception.UserPasswordRetryLimitExceedException;
import com.yn.yntp.module.sys.user.exception.UserUnActiveException;
import com.yn.yntp.module.sys.user.service.UserService;
import com.yn.yntp.module.sys.user.service.UserStatusHistoryService;

/**
 * 
 * 
 * @Title: LoginFormController.java 
 * @Package com.yn.yntp.module.sys.user.web.front 
 * @Description: 用户登录 
 *
 * @author liucc    
 * @date 2014年12月12日 下午12:50:43 
 * @version V1.0
 */
@Controller
@RequestMapping("/front/login")
public class LoginFormController {

  private final Logger logger = LoggerFactory.getLogger(getClass());
  
  @Value(value = "${shiro.login.url}")
  private String loginUrl;

  @Value(value = "${shiro.validate.enable}")
  public Boolean isUseValidate;
  
  @Autowired
  private MessageSource messageSource;

  @Autowired
  private UserService userService;
  
  @Autowired
  private UserStatusHistoryService userStatusHistoryService;

  private String redirect = "redirect:";

  /**
   * 是否启用验证码
   * 
   * @param request
   * @param response
   * @return
   */
  @RequestMapping(value = "/usevalidate", method = RequestMethod.GET)
  @ResponseBody
  public Boolean useValidate(HttpServletRequest request, HttpServletResponse response){
      return isUseValidate == null ? true : isUseValidate;
  }

  /**
   * 用户登录
   * 
   * @param currUser
   * @param session
   * @param model
   * @param request
   * @return
   * @throws Exception
   */
  @RequestMapping(value = "/login", method = RequestMethod.POST)
  @ResponseBody
  public Object loginPost(@ModelAttribute UserEntity currUser,
      HttpSession session, Model model, HttpServletRequest request)
      throws Exception {
    ServiceResponse<String> ret = new ServiceResponse<String>();
    Subject shiroUser = SecurityUtils.getSubject();

    UsernamePasswordToken token =
        new UsernamePasswordToken(currUser.getUsername(),currUser.getPassword());

    String rememberme = request.getParameter("rememberme");
    if (StringUtils.isNotBlank(rememberme)) {
      token.setRememberMe(true);
    }
    else {
      token.setRememberMe(false);
    }

    try {
      // 会调用 UserRealm 的认证方法
      // org.springrain.frame.shiro.ShiroDbRealm.doGetAuthenticationInfo(AuthenticationToken)
      shiroUser.login(token);
      
      // 将用户信息放到session中
      String username = currUser.getUsername();
      //此处注意缓存 防止大量的查询db
      UserEntity user = userService.queryUser(username);
      
      user.setPassword(null);
      user.setSalt(null);
      
      //把当前用户放到session中
      ((HttpServletRequest)request).getSession().setAttribute(Constants.CURRENT_USER, user);
      //druid监控需要
      ((HttpServletRequest)request).getSession().setAttribute(Constants.CURRENT_USERNAME, username);
    }
    catch (UserNotExistsException e) {
      model.addAttribute("message", "账号不存在!");

      ret.setRetcode("10000");
      ret.setRetmsg("账号不存在!");
      return ret;
    }
    catch (UserPasswordNotMatchException e) {
      model.addAttribute("message", "密码错误!");

      ret.setRetcode("10000");
      ret.setRetmsg("密码错误!");
      return ret;
    }
    catch (UserPasswordRetryLimitExceedException e) {
      model.addAttribute("message", "账号被锁定!");

      ret.setRetcode("10000");
      ret.setRetmsg("达到最大尝试次数!");
      return ret;
    }
    catch (UserBlockedException e) {
      model.addAttribute("message", "账号被锁定!");

      ret.setRetcode("10000");
      ret.setRetmsg("账号被锁定!");
      return ret;
    }
    catch(UserUnActiveException e){
      model.addAttribute("message", "账号没激活!");

      ret.setRetcode("10000");
      ret.setRetmsg("账号没激活!");
      return ret;
    }
    catch (Exception e) {
      model.addAttribute("message", "未知错误,请联系管理员.");

      ret.setRetcode("10000");
      ret.setRetmsg("未知错误,请联系管理员.");
      return ret;
    }
    return ret;
  }

  @RequestMapping(value = "/logout", method = RequestMethod.POST)
  @ResponseBody
  public Object logout(HttpServletRequest request) {
    ServiceResponse<String> ret = new ServiceResponse<String>();
    try {
      Subject subject = SecurityUtils.getSubject();
      if (subject != null) {
        subject.logout();
        
        // 清空用户信息
        request.getSession().setAttribute(Constants.CURRENT_USER, null);
        request.getSession().setAttribute(Constants.CURRENT_USERNAME, null);
      }
    } catch (Exception e) {
      ret.setRetcode("10000");
      ret.setData("未知错误,请联系管理员.");
    }
    return ret;
  }
  
  @RequestMapping(value = "/getuser", method = RequestMethod.GET)
  @ResponseBody
  public Object getCurrentUser(HttpServletRequest request) {
    ServiceResponse<UserEntity> ret = new ServiceResponse<UserEntity>();
    UserEntity userEntity = (UserEntity) request.getSession().getAttribute(Constants.CURRENT_USER);
    if(userEntity == null){
      ret.setRetmsg("用户没登陆");
      ret.setRetcode("100000");
    } else{
      ret.setData(userEntity);
    }
    
    return ret;
  }

}
