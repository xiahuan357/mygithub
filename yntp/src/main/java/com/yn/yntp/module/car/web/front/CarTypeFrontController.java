package com.yn.yntp.module.car.web.front;

import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.yn.yntp.common.entity.response.ServiceResponse;
import com.yn.yntp.common.web.controller.BaseQueryController;
import com.yn.yntp.common.web.vo.SelectOptionVO;
import com.yn.yntp.module.car.entity.CarTypeEntity;
import com.yn.yntp.module.car.service.CarTypeService;

/**
 * 
 * @Title: ScenicTypeFrontController.java 
 * @Package com.yn.yntp.module.scenic.web.front 
 * @Description: TODO(用一句话描述该文件做什么) 
 *
 * @author liucc    
 * @date 2015年1月25日 下午9:23:56 
 * @version V1.0 
 */

@Controller
@RequestMapping("/front/car/cartype")
public class CarTypeFrontController extends BaseQueryController<CarTypeEntity,Long>{
  /**
   * 
   * @return
   */
  private CarTypeService getCarTypeService() {
    return (CarTypeService)getBaseService();
  }
  
  /**
   * 查询汽车类型
   * 
   * @return
   */
  @RequestMapping(value = "/getselectmodel")
  @ResponseBody
  public Object searchSelectModel(){
    ServiceResponse<List<SelectOptionVO>> ret = new ServiceResponse<List<SelectOptionVO>>();

    ret.setData(getCarTypeService().getSelectOptionVO());
    return ret;
  }

}
