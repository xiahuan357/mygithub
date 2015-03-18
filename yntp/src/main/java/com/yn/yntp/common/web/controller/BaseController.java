package com.yn.yntp.common.web.controller;

import java.io.Serializable;

import org.springframework.core.annotation.AnnotationUtils;
import org.springframework.ui.Model;
import org.springframework.util.Assert;
import org.springframework.util.StringUtils;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.RequestMapping;

import com.yn.yntp.common.entity.AbstractEntity;
import com.yn.yntp.common.tool.Reflections;

/**
 * 
 * @Title: BaseController.java 
 * @Package com.yn.yntp.common.web.controller 
 * @Description: 基础控制器
 *
 * @author liucc    
 * @date 2014年11月21日 下午8:21:44 
 * @version V1.0
 */
@SuppressWarnings("rawtypes")
public abstract class BaseController<M extends AbstractEntity, ID extends Serializable> {

  /**
   * 实体类型
   */
  protected final Class<M> entityClass;

  /**
   * URL访问前缀
   */
  protected String viewPrefix;

  protected BaseController() {
    this.entityClass = Reflections.findParameterizedType(getClass(), 0);
    setViewPrefix(defaultViewPrefix());
  }

  /**
   * 设置通用数据
   *
   * @param model
   */
  protected void setCommonData(Model model) {
  }

  /**
   * 新创建对象
   * 
   * @return
   */
  protected M newModel() {
    try {
      return entityClass.newInstance();
    } catch (Exception e) {
      throw new IllegalStateException("can not instantiated model : " + this.entityClass, e);
    }
  }

  /**
   * 共享的验证规则
   * 验证失败返回true
   *
   * @param m
   * @param result
   * @return
   */
  protected boolean hasError(M m, BindingResult result) {
    Assert.notNull(m);
    return result.hasErrors();
  }
  
  /**
   * 获取错误信息
   * 
   * @param result
   * @return
   */
  protected String getErrors(BindingResult result){
    Assert.notNull(result);
    StringBuilder errors = new StringBuilder();
    if(result.hasErrors()){
      for(FieldError error :result.getFieldErrors()){
        errors.append(error.getDefaultMessage());
        errors.append("\r\n");
      }
    }
    return errors.toString();
  }

  /**
   * 当前模块 视图的前缀
   * 默认
   * 1、获取当前类头上的@RequestMapping中的value作为前缀
   * 2、如果没有就使用当前模型小写的简单类名
   */
  public void setViewPrefix(String viewPrefix) {
    if (viewPrefix.startsWith("/")) {
      viewPrefix = viewPrefix.substring(1);
    }
    this.viewPrefix = viewPrefix;
  }

  /**
   * 返回默认前缀，如果没有前缀取类名
   * 
   * @return
   */
  protected String defaultViewPrefix() {
    String currentViewPrefix = "";
    RequestMapping requestMapping =
        AnnotationUtils.findAnnotation(getClass(), RequestMapping.class);
    if (requestMapping != null && requestMapping.value().length > 0) {
      currentViewPrefix = requestMapping.value()[0];
    }

    if (StringUtils.isEmpty(currentViewPrefix)) {
      currentViewPrefix = this.entityClass.getSimpleName();
    }

    return currentViewPrefix;
  }
}
