package com.yn.yntp.module.scenic.web.front;

import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.yn.yntp.common.entity.response.ServiceResponse;
import com.yn.yntp.common.web.controller.BaseQueryController;
import com.yn.yntp.common.web.vo.SelectOptionVO;
import com.yn.yntp.module.scenic.entity.ScenicTypeEntity;
import com.yn.yntp.module.scenic.service.ScenicTypeService;

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
@RequestMapping("/front/scenic/scenictype")
public class ScenicTypeFrontController extends BaseQueryController<ScenicTypeEntity,Long>{

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
