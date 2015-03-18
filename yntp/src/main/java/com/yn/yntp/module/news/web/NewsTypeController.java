package com.yn.yntp.module.news.web;

import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.yn.yntp.common.entity.response.ServiceResponse;
import com.yn.yntp.common.web.controller.BaseCRUDController;
import com.yn.yntp.common.web.vo.SelectOptionVO;
import com.yn.yntp.module.news.entity.NewsTypeEntity;
import com.yn.yntp.module.news.service.NewsTypeService;
/**
 * 
 * @Title: NewsController.java
 * @Package com.yn.yntp.module.news.web
 * @Description: 新闻类型信息维护，登录用户使用
 *
 * @author liucc
 * @date 2014年11月22日 下午3:40:39
 * @version V1.0
 */

@Controller
@RequestMapping("/admin/news/newstype")
public class NewsTypeController extends BaseCRUDController<NewsTypeEntity, Long> {

  private NewsTypeService getNewTypeService(){
    return (NewsTypeService)getBaseService();
  }
  
  /**
   * 将新闻类型封装成前台下拉框所需要的数据类型
   * 
   * @param id
   * @return
   */
  @RequestMapping(value = "/getselectmodel")
  @ResponseBody
  public Object searchSelectModel(){
    ServiceResponse<List<SelectOptionVO>> ret = new ServiceResponse<List<SelectOptionVO>>();

    ret.setData(getNewTypeService().getSelectOptionVO());
    return ret;
  }
}
