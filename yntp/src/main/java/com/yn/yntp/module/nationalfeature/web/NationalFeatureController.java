package com.yn.yntp.module.nationalfeature.web;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.yn.yntp.common.constant.Constants;
import com.yn.yntp.common.web.controller.BaseCRUDWithImageController;
import com.yn.yntp.module.nationalfeature.entity.NationalFeatureEntity;
import com.yn.yntp.module.nationalfeature.entity.NationalFeatureImageEntity;
import com.yn.yntp.module.sys.user.entity.UserEntity;
/**
 * 
 * @Title: HotelController.java
 * @Package com.yn.yntp.module.hotel.web
 * @Description: 酒店类型信息维护，登录用户使用
 *
 * @author liucc
 * @date 2014年11月22日 下午3:40:39
 * @version V1.0
 */

@Controller
@RequestMapping("/admin/nationalfeature/nationalfeature")
public class NationalFeatureController extends BaseCRUDWithImageController<NationalFeatureEntity, Long> {
  /**
   * 新增一个资源。带图片
   * 
   * @param resource
   */
  @RequestMapping(value = "/createwithimage",method = RequestMethod.POST)
  @ResponseBody
  public Object createWithImage(Model model, 
      @Validated @RequestBody  NationalFeatureImageEntity resource,BindingResult result,
      HttpServletRequest request) {
    // 数据加工
    UserEntity userEntity = (UserEntity) request.getSession().getAttribute(Constants.CURRENT_USER);
    NationalFeatureEntity currentEntity = resource.getCurrentEntity();
    currentEntity.setPublishedUserEntity(userEntity);
    
    // 调用基类保存
    return super.createWithImage(model,currentEntity, result, resource.getImagelist(),request);
  }
  
  /**
   * 更新资源。带图片
   * 
   * @param id
   * @param resource
   */
  @RequestMapping(value = "updatewithimage/{id}" ,method = RequestMethod.POST)
  @ResponseBody
  public Object updateWithImage(Model model, @PathVariable("id") final Long id,
      @Validated @RequestBody  NationalFeatureImageEntity resource,BindingResult result,
      HttpServletRequest request) {
    // 数据加工
    UserEntity userEntity = (UserEntity) request.getSession().getAttribute(Constants.CURRENT_USER);
    NationalFeatureEntity currentEntity = resource.getCurrentEntity();
    currentEntity.setPublishedUserEntity(userEntity);
    
    // 调用基类保存
    return super.updateWithImage(model, id, currentEntity, result, resource.getImagelist(), request);
  }
  
  @RequestMapping(value = "deletewithimage/{id}", method = RequestMethod.DELETE)
  @ResponseBody
  public Object deleteWithImage(Model model, @PathVariable("id") final Long id,
      @ModelAttribute final NationalFeatureEntity resource, HttpServletRequest request) {
    // 调用基类删除
    return super.deleteWithImage(model, id, resource, request);
  }

}
