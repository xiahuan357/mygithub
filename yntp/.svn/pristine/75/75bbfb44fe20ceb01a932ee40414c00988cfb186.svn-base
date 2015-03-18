package com.yn.yntp.module.tourismline.web;

import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.yn.yntp.common.entity.response.ServiceResponse;
import com.yn.yntp.common.web.controller.BaseCRUDController;
import com.yn.yntp.common.web.vo.MultiSelectorOptionVO;
import com.yn.yntp.module.tourismline.entity.TourismlineThemeEntity;
import com.yn.yntp.module.tourismline.service.TourismlineThemeService;

/**
 * 
 * @Title: ScenicController.java
 * @Package com.yn.yntp.module.scenic.web
 * @Description: 线路主题信息维护，登录用户使用
 *
 * @author liucc
 * @date 2014年11月22日 下午3:40:39
 * @version V1.0
 */

@Controller
@RequestMapping("/admin/tourismline/tourismlinetheme")
public class TourismlineThemeController extends BaseCRUDController<TourismlineThemeEntity, Long> {

  private TourismlineThemeService getTourismlineThemeService(){
    return (TourismlineThemeService)getBaseService();
  }
  
  /**
   * 查询出所有主题，新建时使用
   * 
   * @return
   */
  @RequestMapping(value = "/create/getallthememodel")
  @ResponseBody
  public Object getAllThemeModelForCreate(){
    ServiceResponse<List<MultiSelectorOptionVO>> ret = new ServiceResponse<List<MultiSelectorOptionVO>>();

    ret.setData(getTourismlineThemeService().getAllThemeModelForCreate());
    return ret;
  }
  
  /**
   * 查询出所有主题，并且选中，编辑时使用
   * 
   * @return
   */
  @RequestMapping(value = "/update/getallthememodel")
  @ResponseBody
  public Object getAllThemeModelForUpdate(@RequestParam("themeids") String themeids){
    ServiceResponse<List<MultiSelectorOptionVO>> ret = new ServiceResponse<List<MultiSelectorOptionVO>>();
    
    ret.setData(getTourismlineThemeService().getAllThemeModelForUpdate(themeids));
    return ret;
  }
  
}
