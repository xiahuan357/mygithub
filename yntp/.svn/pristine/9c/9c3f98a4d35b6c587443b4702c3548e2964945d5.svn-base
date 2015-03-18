package com.yn.yntp.module.sys.permission.service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.hibernate.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.yn.yntp.common.persistence.service.BaseServiceImpl;
import com.yn.yntp.common.web.vo.TreeMultiSelectorOptionVO;
import com.yn.yntp.module.sys.permission.dao.RoleDAO;
import com.yn.yntp.module.sys.permission.entity.ResourceEntity;
import com.yn.yntp.module.sys.permission.entity.RoleEntity;
import com.yn.yntp.module.sys.permission.entity.RoleResourceEntity;

/**
 * 
 * @Title: IRoleService.java
 * @Package com.yn.yntp.module.sys.permission.service
 * @Description: TODO(用一句话描述该文件做什么)
 *
 * @author liucc
 * @date 2014年11月21日 下午8:53:00
 * @version V1.0
 */
@Service
@Transactional
public class RoleService extends BaseServiceImpl<RoleEntity, Long> {
  /**
   * 向下转化为具体dao
   * 
   * @return
   */
  private RoleDAO getRoleDAO(){
    return (RoleDAO)baseDao;
  }
  
  @Autowired
  private ResourceService resourceService;
  
  @Autowired
  private RoleResourceService roleResourceService;
  
  
  /**
   * 查询角色已分配的和未分配的资源
   * 
   * @param roleid
   * @return
   */
  public List<TreeMultiSelectorOptionVO> getMutiSelResourceOptions(Long roleid){
    List<TreeMultiSelectorOptionVO> list = new ArrayList<TreeMultiSelectorOptionVO>();
    // 查询出所有资源
    List<ResourceEntity> funcs = resourceService.queryAll();
    // 查询出角色所有资源
    List<ResourceEntity> roleFuncs = resourceService.getResourceByRoleId(roleid);
    // <父亲id，孩子id集合>
    Map<Long,List<Long>> allResourceMap = new HashMap<Long,List<Long>>();
    
    // 遍历集合查出所有资源和他的孩子资源
    if ((funcs != null) && (funcs.size() > 0)) {
      for(ResourceEntity entity :funcs ){
        if(entity.getParentid() == null){
          // 没有父亲节点，那么是第一级菜单
          List<Long> childrenIdList = new ArrayList<Long>();
          allResourceMap.put(entity.getId(), childrenIdList);
        } else{
            // 有父亲节点，那么加到父亲节点的孩子节点集合中
           if(allResourceMap.containsKey(entity.getParentid())){
              allResourceMap.get(entity.getParentid()).add(entity.getId());
            } else{
              List<Long> childrenIdList = new ArrayList<Long>();
              allResourceMap.put(entity.getParentid(), childrenIdList);
            }
        }
       
      }
    }
    
    if ((funcs != null) && (funcs.size() > 0)) { 
      if ((roleFuncs != null) && (roleFuncs.size() > 0)) {
        funcs.removeAll(roleFuncs);
        for (ResourceEntity func : roleFuncs) {
          TreeMultiSelectorOptionVO option = new TreeMultiSelectorOptionVO();
          option.setId(func.getId());
          option.setSelected(true);
          
          Long parentid = func.getParentid();
          if(parentid != null){
            option.setName("->2:" + func.getName());
          } else{
            option.setName("1:"+ func.getName());
          }
          
          option.setParentid(parentid);
          option.setHaschildren(allResourceMap.get(func.getId()) == null || allResourceMap.get(func.getId()).size() > 0);
          list.add(option);
        }
      }
      for (ResourceEntity func : funcs) {
        TreeMultiSelectorOptionVO option = new TreeMultiSelectorOptionVO();
        option.setId(func.getId());
        option.setSelected(false);
        
        Long parentid = func.getParentid();
        if(parentid != null){
          option.setName("->2:" + func.getName());
        } else{
          option.setName("1:"+ func.getName());
        }
        option.setParentid(parentid);
        option.setHaschildren(allResourceMap.get(func.getId()) == null || allResourceMap.get(func.getId()).size() > 0);
        list.add(option);
      }
    }
    
    Collections.sort(list);
    return list;
  }
  
  /**
   * 给角色分配资源
   * 
   * @param roleid
   * @param resourceList
   */
  public void grantResource(Long roleid,List<ResourceEntity> resourceList){
    if(null == roleid)
      return;
    
    // 1 先删除已经分配好的菜单
    StringBuilder hql = new StringBuilder();
    hql.append(" delete from RoleResourceEntity where roleid = :roleid");
    Query query = baseDao.createQuery(hql.toString());
    query.setParameter("roleid", roleid);
    query.executeUpdate();
    
    if(null == resourceList || resourceList.isEmpty())
      return;
    
    // 2 再分配选择的菜单
    List<RoleResourceEntity> linkEntity = new ArrayList<RoleResourceEntity>();
    for(ResourceEntity rEntity : resourceList){
      RoleResourceEntity rrEntity = new  RoleResourceEntity();
      rrEntity.setRoleid(roleid);
      rrEntity.setResourceid(rEntity.getId());
      rrEntity.setCreatetime(new Date());
      linkEntity.add(rrEntity);
    }
    
    roleResourceService.insert(linkEntity);
  }
}
