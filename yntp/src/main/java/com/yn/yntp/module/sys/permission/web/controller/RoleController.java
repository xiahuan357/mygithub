package com.yn.yntp.module.sys.permission.web.controller;

import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.yn.yntp.common.entity.response.ServiceResponse;
import com.yn.yntp.common.web.controller.BaseCRUDController;
import com.yn.yntp.common.web.vo.TreeMultiSelectorOptionVO;
import com.yn.yntp.module.sys.permission.entity.ResourceEntity;
import com.yn.yntp.module.sys.permission.entity.RoleEntity;
import com.yn.yntp.module.sys.permission.service.RoleService;

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
@RequestMapping("/admin/permission/role")
public class RoleController extends BaseCRUDController<RoleEntity,Long> {

  private RoleService getRoleService(){
    return (RoleService)getBaseService();
  }
  
  /**
   * 获得多选下拉框左右移动的数据
   * 
   * @param roleid
   * @return
   */
  @RequestMapping("/multiselectorresource/{roleid}")
  @ResponseBody
  public Object getMutiSelResourceOptions(@PathVariable("roleid") final Long roleid){
    ServiceResponse<List<TreeMultiSelectorOptionVO>> ret = new ServiceResponse<List<TreeMultiSelectorOptionVO>>();

    ret.setData(getRoleService().getMutiSelResourceOptions(roleid));
    return ret;
  }
  
  /**
   * 为角色分配资源
   * 
   * @param roleid
   * @param resourceList
   * @return
   */
  @RequestMapping("/grantresource/{roleid}")
  @ResponseBody
  public Object grantResource(@PathVariable("roleid") Long roleid,
      @RequestBody List<ResourceEntity> resourceList) {
    ServiceResponse<String> ret = new ServiceResponse<String>();

    getRoleService().grantResource(roleid, resourceList);
    return ret;
  }
}
