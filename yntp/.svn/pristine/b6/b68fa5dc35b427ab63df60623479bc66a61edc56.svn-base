package com.yn.yntp.module.equipment.web;

import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.yn.yntp.common.entity.response.ServiceResponse;
import com.yn.yntp.common.web.controller.BaseCRUDController;
import com.yn.yntp.common.web.vo.SelectOptionVO;
import com.yn.yntp.module.equipment.entity.EquipmentTypeEntity;
import com.yn.yntp.module.equipment.service.EquipmentTypeService;

/**
 * 
 * @Title: EquipmentController.java 
 * @Package com.yn.yntp.module.equipment.web 
 * @Description: 设备类型信息维护，登录用户使用
 *
 * @author liucc    
 * @date 2014年11月22日 下午3:40:39 
 * @version V1.0 
 */

@Controller
@RequestMapping("/admin/equipment/equipmenttype")
public class EquipmentTypeController extends BaseCRUDController<EquipmentTypeEntity,Long>{

  /**
   * 
   * @return
   */
  private EquipmentTypeService getEquipmentTypeService() {
    return (EquipmentTypeService)getBaseService();
  }
  
  /**
   * 查询旅游装备类型
   * 
   * @return
   */
  @RequestMapping(value = "/getselectmodel")
  @ResponseBody
  public Object searchSelectModel(){
    ServiceResponse<List<SelectOptionVO>> ret = new ServiceResponse<List<SelectOptionVO>>();

    ret.setData(getEquipmentTypeService().getSelectOptionVO());
    return ret;
  }
  
}
