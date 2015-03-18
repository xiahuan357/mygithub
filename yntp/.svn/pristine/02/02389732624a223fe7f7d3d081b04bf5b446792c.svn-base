package com.yn.yntp.module.scenic.web;

import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.yn.yntp.common.entity.response.ServiceResponse;
import com.yn.yntp.common.web.controller.BaseCRUDController;
import com.yn.yntp.common.web.vo.SelectOptionVO;
import com.yn.yntp.module.scenic.entity.ScenicLevelEntity;
import com.yn.yntp.module.scenic.service.ScenicLevelService;

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
@RequestMapping("/admin/scenic/sceniclevel")
public class ScenicLevelController extends BaseCRUDController<ScenicLevelEntity, Long> {

  private ScenicLevelService getScenicLevelService(){
    return (ScenicLevelService)getBaseService();
  }
  
  /**
   * 查询景点级别
   * 
   * @return
   */
  @RequestMapping(value = "/getselectmodel")
  @ResponseBody
  public Object searchSelectModel(){
    ServiceResponse<List<SelectOptionVO>> ret = new ServiceResponse<List<SelectOptionVO>>();

    ret.setData(getScenicLevelService().getSelectOptionVO());
    return ret;
  }
}
