package com.yn.yntp.module.region.web;

import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.yn.yntp.common.entity.response.ServiceResponse;
import com.yn.yntp.common.web.controller.BaseCRUDController;
import com.yn.yntp.common.web.vo.SelectOptionVO;
import com.yn.yntp.module.region.entity.RegionEntity;
import com.yn.yntp.module.region.service.RegionService;

/**
 * 
 * @Title: TourismController.java 
 * @Package com.yn.yntp.module.tourism.web 
 * @Description: 线路信息维护，登录用户使用
 *
 * @author liucc    
 * @date 2014年11月22日 下午3:40:39 
 * @version V1.0 
 */

@Controller
@RequestMapping("/admin/region/region")
public class RegionController extends BaseCRUDController<RegionEntity,Long>{

  private RegionService getRegionService(){
    return (RegionService)getBaseService();
  }
  
  /**
   * 查询景点级别
   * 
   * @return
   */
  @RequestMapping(value = "/getselectmodel/{parentid}")
  @ResponseBody
  public Object searchSelectModel(@PathVariable("parentid") final Long parentid){
    ServiceResponse<List<SelectOptionVO>> ret = new ServiceResponse<List<SelectOptionVO>>();
    ret.setData(getRegionService().getSelectOptionVO(parentid));
    return ret;
  }
  
}
