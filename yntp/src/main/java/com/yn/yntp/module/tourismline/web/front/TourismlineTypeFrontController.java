package com.yn.yntp.module.tourismline.web.front;

import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.yn.yntp.common.entity.response.ServiceResponse;
import com.yn.yntp.common.web.controller.BaseQueryController;
import com.yn.yntp.common.web.vo.SelectOptionVO;
import com.yn.yntp.module.tourismline.entity.TourismlineTypeEntity;
import com.yn.yntp.module.tourismline.service.TourismlineTypeService;

/**
 * 
 * @Title: TourismlineTypeFrontController.java 
 * @Package com.yn.yntp.module.tourismline.web.front 
 * @Description: TODO(用一句话描述该文件做什么) 
 *
 * @author liucc    
 * @date 2015年1月24日 下午8:39:56 
 * @version V1.0 
 */

@Controller
@RequestMapping("/front/tourismline/tourismlinetype")
public class TourismlineTypeFrontController extends BaseQueryController<TourismlineTypeEntity,Long>{
  private TourismlineTypeService getTourismlineTypeService(){
    return (TourismlineTypeService)getBaseService();
  }
  
  /**
   * 查询线路类型
   * 
   * @return
   */
  @RequestMapping(value = "/getselectmodel")
  @ResponseBody
  public Object searchSelectModel(){
    ServiceResponse<List<SelectOptionVO>> ret = new ServiceResponse<List<SelectOptionVO>>();

    ret.setData(getTourismlineTypeService().getSelectOptionVO());
    return ret;
  }

}
