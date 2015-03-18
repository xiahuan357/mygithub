package com.yn.yntp.module.business.web;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang3.tuple.ImmutableTriple;
import org.apache.commons.lang3.tuple.Triple;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.yn.yntp.common.entity.response.ServiceResponse;
import com.yn.yntp.common.entity.search.ClientOperation;
import com.yn.yntp.common.web.controller.BaseCRUDController;
import com.yn.yntp.module.business.entity.BusinessEntity;

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
@RequestMapping("/admin/business/business")
public class BusinessController extends BaseCRUDController<BusinessEntity, Long> {

  @RequestMapping(value = "/updatestatus", method = RequestMethod.POST)
  @ResponseBody
  private Object updatestatus(@ModelAttribute BusinessEntity businessEntity) {
    ServiceResponse<Object> ret = new ServiceResponse<Object>();
    List<Triple<String, ClientOperation, String>> parsedQuery = new ArrayList<Triple<String, ClientOperation, String>>();
    parsedQuery.add(new ImmutableTriple<String, ClientOperation, String>("id", ClientOperation.EQ, String.valueOf(businessEntity.getId())));

    Map<String, Object> filedNameMap = new HashMap<String, Object>();
    filedNameMap.put("approve_status", businessEntity.getApprove_status());

    // 保存对象
    getBaseService().update(filedNameMap, parsedQuery);
    return ret;
  }

}
