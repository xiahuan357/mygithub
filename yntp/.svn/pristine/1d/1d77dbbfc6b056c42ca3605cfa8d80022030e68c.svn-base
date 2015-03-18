package com.yn.yntp.module.sys.permission.service;



import java.util.ArrayList;
import java.util.List;

import org.apache.commons.lang3.tuple.ImmutableTriple;
import org.apache.commons.lang3.tuple.Triple;
import org.hibernate.Query;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.yn.yntp.common.entity.search.ClientOperation;
import com.yn.yntp.common.persistence.service.BaseServiceImpl;
import com.yn.yntp.common.web.vo.SelectOptionVO;
import com.yn.yntp.module.sys.permission.entity.ResourceEntity;

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
public class ResourceService extends BaseServiceImpl<ResourceEntity, Long> {
  
  /**
   * 根据角色id查询资源
   * 
   * @param roleid
   * @return
   */
  public List<ResourceEntity> getResourceByRoleId(Long roleid){
    if(roleid == null)
      return null;
    
    StringBuilder hql = new StringBuilder();
    hql.append(" from ResourceEntity where id in ( ");
    hql.append(" select resourceid from RoleResourceEntity where roleid = :roleid)");
    
    Query query = baseDao.createQuery(hql.toString());
    query.setParameter("roleid", roleid);
    
    return query.list();
  }
  
  /**
   * 获得某一菜单所有可作为父亲的菜单
   * 1 本身不可选
   * 2 有父亲节点的菜单不可选
   * @param currentId
   * @return
   */
  public List<SelectOptionVO> queryParentSelectModel(Long currentId) {
    List<ResourceEntity> unusedResourceList = getUnusedResourceList(currentId);
    List<Long> resourceIdList = new ArrayList<Long>();
    if(currentId != -1)
      resourceIdList.add(currentId);
    if(unusedResourceList != null && !unusedResourceList.isEmpty()){
      for(ResourceEntity enrity : unusedResourceList){
        resourceIdList.add(enrity.getId());
      }
    }
    
    StringBuilder hql = new StringBuilder();
    hql.append(" select new com.yn.yntp.common.web.vo.SelectOptionVO(T1.id,T1.name) from ResourceEntity T1");
    if(resourceIdList.size() > 0){
      hql.append(" where id not in :ids");
    }
    
    Query query = baseDao.getSession().createQuery(hql.toString());
    if(resourceIdList.size() > 0){
      query.setParameterList("ids", resourceIdList);
    }
    
    List<SelectOptionVO> list = query.list();
    return list;
  }
  
  /**
   * 某一级菜单选择父亲菜单时，需要过滤，保证只有二级菜单。
   * 
   * @param currentId
   * @return
   */
  private List<ResourceEntity> getUnusedResourceList(Long currentId){
    List<ResourceEntity> unusedResourceList = new ArrayList<ResourceEntity>();
    List<Triple<String, ClientOperation, String>> parsedQuery =  new ArrayList<Triple<String, ClientOperation, String>>();
    parsedQuery.add(new ImmutableTriple<String, ClientOperation, String>("parentid", ClientOperation.NEG_EQ, "null"));
    
    List<ResourceEntity> resultList = super.query(parsedQuery);
    if(resultList != null && !resultList.isEmpty()){
      unusedResourceList.addAll(resultList);
    }
    return unusedResourceList;
  }
}
