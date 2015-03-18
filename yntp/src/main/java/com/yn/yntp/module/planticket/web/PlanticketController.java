package com.yn.yntp.module.planticket.web;

import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.yn.yntp.common.entity.response.ServiceResponse;
import com.yn.yntp.common.web.controller.BaseCRUDController;
import com.yn.yntp.common.web.vo.SelectOptionVO;
import com.yn.yntp.module.planticket.entity.PlanticketEntity;
import com.yn.yntp.module.planticket.service.PlanticketService;
/**
 * 
 * @Title: PlanticketController.java
 * @Package com.yn.yntp.module.Planticket.web
 *
 * @author liucc
 * @date 2014年11月22日 下午3:40:39
 * @version V1.0
 */

@Controller
@RequestMapping("/admin/planticket")
public class PlanticketController extends BaseCRUDController<PlanticketEntity, Long> {

  private PlanticketService getPlanticketService(){
    return (PlanticketService)getBaseService();
  }

}
