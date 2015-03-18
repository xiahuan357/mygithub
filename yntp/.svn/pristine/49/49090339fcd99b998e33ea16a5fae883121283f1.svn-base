package com.yn.yntp.module.car.web;

import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.yn.yntp.common.entity.response.ServiceResponse;
import com.yn.yntp.common.web.controller.BaseCRUDController;
import com.yn.yntp.common.web.vo.SelectOptionVO;
import com.yn.yntp.module.car.entity.CarBrandEntity;
import com.yn.yntp.module.car.service.CarBrandService;

/**
 * 
 * @Title: CarBrandController.java 
 * @Package com.yn.yntp.module.car.web 
 * @Description: TODO(用一句话描述该文件做什么) 
 *
 * @author jiqr    
 * @date 2014年12月8日 下午12:19:54 
 * @version V1.0 
 */

@Controller
@RequestMapping("/admin/car/carbrand")
public class CarBrandController extends BaseCRUDController<CarBrandEntity,Long>{

  private CarBrandService getCarBrandService(){
    return (CarBrandService)getBaseService();
  }
  
  /**
   * 查询旅游汽车类型
   * 
   * @return
   */
  @RequestMapping(value = "/getselectmodel")
  @ResponseBody
  public Object searchSelectModel(){
    ServiceResponse<List<SelectOptionVO>> ret = new ServiceResponse<List<SelectOptionVO>>();

    ret.setData(getCarBrandService().getSelectOptionVO());
    return ret;
  }
}
