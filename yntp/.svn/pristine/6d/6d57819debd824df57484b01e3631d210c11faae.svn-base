package com.yn.yntp.module.tourismline.web.front;

import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.yn.yntp.common.entity.response.ServiceResponse;
import com.yn.yntp.common.web.controller.BaseQueryController;
import com.yn.yntp.common.web.vo.SelectOptionVO;
import com.yn.yntp.module.tourismline.entity.TourismlinePropertyEntity;
import com.yn.yntp.module.tourismline.service.TourismlinePropertyService;



/**
 * 
 * @Title: TourismlinePropertyFrontController.java 
 * @Package com.yn.yntp.module.tourismline.web.front 
 * @Description: TODO(用一句话描述该文件做什么) 
 *
 * @author liucc    
 * @date 2015年3月12日 下午12:45:04 
 * @version V1.0 
 */

@Controller
@RequestMapping("/front/tourismline/tourismlineproperty")
public class TourismlinePropertyFrontController extends BaseQueryController<TourismlinePropertyEntity,Long>{
  /**
   * 
   * @return
   */
  private TourismlinePropertyService getTourismlineTypeService() {
    return (TourismlinePropertyService)getBaseService();
  }
  
  /**
   * 查询线路性质
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
