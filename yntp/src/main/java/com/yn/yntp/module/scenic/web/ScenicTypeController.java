package com.yn.yntp.module.scenic.web;

import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.yn.yntp.common.entity.response.ServiceResponse;
import com.yn.yntp.common.web.controller.BaseCRUDController;
import com.yn.yntp.common.web.vo.SelectOptionVO;
import com.yn.yntp.module.scenic.entity.ScenicTypeEntity;
import com.yn.yntp.module.scenic.service.ScenicTypeService;

/**
 * 
 * @Title: ScenicController.java
 * @Package com.yn.yntp.module.scenic.web
 * @Description: 线路类型信息维护，登录用户使用
 *
 * @author liucc
 * @date 2014年11月22日 下午3:40:39
 * @version V1.0
 */

@Controller
@RequestMapping("/admin/scenic/scenictype")
public class ScenicTypeController extends BaseCRUDController<ScenicTypeEntity, Long> {

  private ScenicTypeService getScenicType() {
    return (ScenicTypeService) getBaseService();
  }

  /**
   * 数据查询，前台下拉框使用
   * 
   * @return
   */
  @RequestMapping(value = "/getselectmodel")
  @ResponseBody
  public Object searchSelectModel() {
    ServiceResponse<List<SelectOptionVO>> ret =
        new ServiceResponse<List<SelectOptionVO>>();

    ret.setData(getScenicType().getSelectOptionVO());
    return ret;
  }
}
