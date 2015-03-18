package com.yn.yntp.module.tourismline.web.front;

import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.yn.yntp.common.entity.response.ServiceResponse;
import com.yn.yntp.common.web.controller.BaseQueryController;
import com.yn.yntp.common.web.vo.MultiSelectorOptionVO;
import com.yn.yntp.module.tourismline.entity.TourismlineThemeEntity;
import com.yn.yntp.module.tourismline.service.TourismlineThemeService;

/**
 * 
 * @Title: TourismlineThemeFrontController.java 
 * @Package com.yn.yntp.module.tourismline.web.front 
 * @Description: TODO(用一句话描述该文件做什么) 
 *
 * @author liucc    
 * @date 2015年3月12日 下午12:44:41 
 * @version V1.0 
 */

@Controller
@RequestMapping("/front/tourismline/tourismlinetheme")
public class TourismlineThemeFrontController extends BaseQueryController<TourismlineThemeEntity,Long>{

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
