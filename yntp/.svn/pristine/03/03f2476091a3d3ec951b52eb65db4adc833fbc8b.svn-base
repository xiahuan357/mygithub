package com.yn.yntp.common.web.controller;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.yn.yntp.common.entity.AbstractEntity;
import com.yn.yntp.common.entity.response.ServiceResponse;
import com.yn.yntp.common.validate.DefaultValidate;
import com.yn.yntp.common.validate.ReturnInfo;

/**
 * 
 * @Title: BaseCRUDController.java 
 * @Package com.yn.yntp.common.web.controller 
 * @Description: 基础新建，编辑，删除控制器
 *
 * @author liucc    
 * @date 2014年11月21日 下午8:17:43 
 * @version V1.0
 */
@SuppressWarnings("rawtypes")
public abstract class BaseCRUDController<M extends AbstractEntity, ID extends Serializable>
    extends BaseQueryController<M, ID> {

  //设置校验
  private DefaultValidate<M, ID> defaultValidate;
  
  @Autowired
  protected void setDefaultValidate(DefaultValidate<M,ID> defaultValidate){
    this.defaultValidate = defaultValidate;
  }
  
  /**
   * 返回默认的校验接口
   * 
   * @return
   */
  protected DefaultValidate getDefaultValidate(){
    return this.defaultValidate;
  }
  
  // ------------------------------ create ----------------------------------
  /**
   * 新增一个资源。
   * 
   * @param resource
   */
  @RequestMapping(value = "/create",method = RequestMethod.POST)
  @ResponseBody
  public Object create(Model model, @Valid @ModelAttribute final M resource,BindingResult result) {
    ServiceResponse<Object> ret = new ServiceResponse<Object>();
    // 1 自动注入实体是否有错
    if (super.hasError(resource, result)) {
      ret.setRetcode("100000");
      ret.setRetmsg(super.getErrors(result));
      return ret;
    }
    // 2 创建前校验是否有错
    getDefaultValidate().setEntity(resource);
    ReturnInfo validate = getDefaultValidate().validateCreate();
    if (validate != null && Boolean.FALSE == validate.getFlag()) {
      ret.setRetcode("100000");
      ret.setRetmsg(validate.getMsg());
      return ret;
    }
    // 保存对象
    getBaseService().insert(resource);
    return ret;
  }

  // ------------------------------ update ----------------------------------
  /**
   * 更新资源。
   * 
   * @param id
   * @param resource
   */
  @RequestMapping(value = "/update/{id}", method = RequestMethod.POST)
  @ResponseBody
  public Object update(Model model, @PathVariable("id") final ID id,
      @Valid @ModelAttribute final M resource,BindingResult result) {
    ServiceResponse<Object> ret = new ServiceResponse<Object>();
    // 1 自动注入实体是否有错
    if (super.hasError(resource, result)) {
      ret.setRetcode("100000");
      ret.setRetmsg(super.getErrors(result));
      return ret;
    }
    // 2 更新前校验是否有错
    getDefaultValidate().setEntity(resource);
    ReturnInfo validate = getDefaultValidate().validateUpdate();
    if (validate != null && Boolean.FALSE == validate.getFlag()) {
      ret.setRetcode("100000");
      ret.setRetmsg(validate.getMsg());
      return ret;
    }
    // 保存对象
    getBaseService().update(resource);
    return ret;
  }

  // ------------------------------ delete ----------------------------------
  /**
   * 删除资源。
   * 
   * @param id
   */
  @RequestMapping(value = "/delete/{id}", method = RequestMethod.DELETE)
  @ResponseBody
  public Object delete(Model model, @PathVariable("id") final ID id) {
    ServiceResponse<Object> ret = new ServiceResponse<Object>();
    List<ID> ids = new ArrayList<ID>();
    ids.add(id);
    // 1 删除前校验是否有错
    getDefaultValidate().setID(id);
    ReturnInfo validate = getDefaultValidate().validateDelete();
    if (validate != null && Boolean.FALSE == validate.getFlag()) {
      ret.setRetcode("100000");
      ret.setRetmsg(validate.getMsg());
      return ret;
    }
    // 2 删除对象
    getBaseService().delete(ids);
    return ret;
  }
  
}
