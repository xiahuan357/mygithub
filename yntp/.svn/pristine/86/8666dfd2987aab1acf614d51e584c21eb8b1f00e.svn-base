package com.yn.yntp.common.extra.exception.web;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

import com.yn.yntp.common.entity.response.ServiceResponse;

/**
 * 
 * 
 * @Title: DefaultExceptionHandler.java
 * @Package com.yn.yntp.common.extra.exception.web
 * @Description: 全局异常处理
 *
 * @author liucc
 * @date 2014年12月12日 下午12:49:05
 * @version V1.0
 */
@ControllerAdvice
public class DefaultExceptionHandler {

  @ExceptionHandler(Exception.class)  
  @ResponseBody
  public Object processException(Exception ex,
      HttpServletRequest request, HttpServletResponse response) {
    ServiceResponse<Object> ret = new ServiceResponse<Object>();
    if (!(request.getHeader("accept").indexOf("application/json") > -1 || 
        (request.getHeader("X-Requested-With") != null && request.getHeader("X-Requested-With").indexOf("XMLHttpRequest") > -1))) {
      // 不是Ajax请求
      ret.setRetcode("100000");
      ret.setRetmsg(ex.getMessage());
      return ret;
    }
    else {
        ret.setRetcode("100000");
        ret.setRetmsg(ex.getMessage());
        return ret;
    }
  }
  
  @ExceptionHandler(IllegalStateException.class)  
  @ResponseBody
  public Object processIllegalStateException(IllegalStateException ex,
      HttpServletRequest request, HttpServletResponse response) {
    ServiceResponse<Object> ret = new ServiceResponse<Object>();
    if (!(request.getHeader("accept").indexOf("application/json") > -1 || 
        (request.getHeader("X-Requested-With") != null && request.getHeader("X-Requested-With").indexOf("XMLHttpRequest") > -1))) {
      // 不是Ajax请求
      ret.setRetcode("100000");
      ret.setRetmsg(ex.getMessage());
      return ret;
    }
    else {
        ret.setRetcode("100000");
        ret.setRetmsg(ex.getMessage());
        return ret;
    }
  }

}
