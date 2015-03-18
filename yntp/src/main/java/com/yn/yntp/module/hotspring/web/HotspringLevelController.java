package com.yn.yntp.module.hotspring.web;

import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.yn.yntp.common.entity.response.ServiceResponse;
import com.yn.yntp.common.web.controller.BaseCRUDController;
import com.yn.yntp.common.web.vo.SelectOptionVO;
import com.yn.yntp.module.hotspring.entity.HotspringLevelEntity;
import com.yn.yntp.module.hotspring.service.HotspringLevelService;
/**
 * 
 * @Title: HotspringController.java
 * @Package com.yn.yntp.module.hotspring.web
 * @Description: 温泉类型信息维护，登录用户使用
 *
 * @author liucc
 * @date 2014年11月22日 下午3:40:39
 * @version V1.0
 */

@Controller
@RequestMapping("/admin/hotspring/hotspringlevel")
public class HotspringLevelController extends BaseCRUDController<HotspringLevelEntity, Long> {

  private HotspringLevelService getHotspringLevelService(){
    return (HotspringLevelService)getBaseService();
  }
  
  /**
   * 查询温泉等级
   * 
   * @return
   */
  @RequestMapping(value = "/getselectmodel")
  @ResponseBody
  public Object searchSelectModel(){
    ServiceResponse<List<SelectOptionVO>> ret = new ServiceResponse<List<SelectOptionVO>>();

    ret.setData(getHotspringLevelService().getSelectOptionVO());
    return ret;
  }
}
