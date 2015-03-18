package com.yn.yntp.module.news.web;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
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
import com.yn.yntp.module.news.entity.NewsEntity;
import com.yn.yntp.module.news.entity.NewsImageEntity;
import com.yn.yntp.module.news.service.NewsTypeService;
import com.yn.yntp.module.sys.user.entity.UserEntity;

/**
 * 
 * @Title: NewsController.java 
 * @Package com.yn.yntp.module.news.web 
 * @Description: TODO(用一句话描述该文件做什么) 
 *
 * @author liucc    
 * @date 2015年1月11日 下午7:32:52 
 * @version V1.0 
 */

@Controller
@RequestMapping("/admin/news/news")
public class NewsController extends BaseCRUDWithImageController<NewsEntity, Long>{

  @Autowired
  private NewsTypeService newsTypeService;
  
  /**
   * 新增一个资源。带图片
   * 
   * @param resource
   */
  @RequestMapping(value = "/createwithimage",method = RequestMethod.POST)
  @ResponseBody
  public Object createWithImage(Model model, 
      @Validated @RequestBody  NewsImageEntity resource,BindingResult result,
    // 数据加工
      HttpServletRequest request) {
    UserEntity userEntity = (UserEntity) request.getSession().getAttribute(Constants.CURRENT_USER);
    NewsEntity currentEntity = resource.getCurrentEntity();
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
      @Validated @RequestBody  NewsImageEntity resource,BindingResult result,
      HttpServletRequest request) {
    // 数据加工
    UserEntity userEntity = (UserEntity) request.getSession().getAttribute(Constants.CURRENT_USER);
    NewsEntity currentEntity = resource.getCurrentEntity();
    currentEntity.setPublishedUserEntity(userEntity);
    
    // 调用基类保存
    return super.updateWithImage(model, id, currentEntity, result, resource.getImagelist(), request);
  }
  
  @RequestMapping(value = "deletewithimage/{id}", method = RequestMethod.DELETE)
  @ResponseBody
  public Object deleteWithImage(Model model, @PathVariable("id") final Long id,
      @ModelAttribute final NewsEntity resource, HttpServletRequest request) {
    // 调用基类删除
    return super.deleteWithImage(model, id, resource, request);
  }
}
