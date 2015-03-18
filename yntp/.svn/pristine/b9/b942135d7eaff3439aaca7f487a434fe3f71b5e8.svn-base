package com.yn.yntp.common.web.controller.front;

import java.io.IOException;

import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;

import org.apache.shiro.web.util.WebUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * 
 * @Title: WelcomeIndexController.java 
 * @Package com.yn.yntp.common.web.controller.front 
 * @Description: TODO(用一句话描述该文件做什么) 
 *
 * @author liucc    
 * @date 2015年1月26日 下午6:15:19 
 * @version V1.0 
 */

@Controller
public class WelcomeIndexController {

  @RequestMapping("/")
  public void redirectToIndex(ServletRequest request, ServletResponse response){
    try {
      WebUtils.issueRedirect(request, response, "/html/front/index.html");
    }
    catch (IOException e) {
       
    }
  }
}
