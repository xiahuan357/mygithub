package com.yn.yntp.module.sys.permission.web.controller;

import java.util.List;

import org.apache.commons.lang3.tuple.Triple;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.yn.yntp.common.entity.response.ServiceResponse;
import com.yn.yntp.common.entity.search.ClientOperation;
import com.yn.yntp.common.web.controller.BaseCRUDController;
import com.yn.yntp.common.web.vo.SelectOptionVO;
import com.yn.yntp.module.sys.permission.entity.ResourceEntity;
import com.yn.yntp.module.sys.permission.service.ResourceService;

/**
 * 
 * @Title: RoleController.java 
 * @Package com.yn.yntp.module.sys.permission.web.controller 
 * @Description: 后台管理需要的服务
 *
 * @author liucc    
 * @date 2014年11月21日 下午9:25:11 
 * @version V1.0 
 */

@Controller
@RequestMapping("/admin/permission/resource")
public class ResourceController extends BaseCRUDController<ResourceEntity,Long> {

  private ResourceService getResourceService(){
    return (ResourceService)getBaseService();
  }
  
  @RequestMapping(value = "/searchparentid/{id}")
  @ResponseBody
  public Object searchSelectModelByParentId(@PathVariable("id") Long id){
    ServiceResponse<List<SelectOptionVO>> ret = new ServiceResponse<List<SelectOptionVO>>();

    List<Triple<String, ClientOperation, String>> parsedQuery = null;
    ret.setData(getResourceService().queryParentSelectModel(id));
    return ret;
  }
  
}
