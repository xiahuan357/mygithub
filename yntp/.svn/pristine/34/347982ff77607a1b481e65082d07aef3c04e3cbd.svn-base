package com.yn.yntp.module.hotel.web;

import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.yn.yntp.common.entity.response.ServiceResponse;
import com.yn.yntp.common.web.controller.BaseCRUDController;
import com.yn.yntp.common.web.vo.SelectOptionVO;
import com.yn.yntp.module.hotel.entity.HotelTypeEntity;
import com.yn.yntp.module.hotel.service.HotelTypeService;
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
@RequestMapping("/admin/hotel/hoteltype")
public class HotelTypeController extends BaseCRUDController<HotelTypeEntity, Long> {
  
  private HotelTypeService getHotelTypeService(){
    return (HotelTypeService)getBaseService();
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

    ret.setData(getHotelTypeService().getSelectOptionVO());
    return ret;
  }

}
