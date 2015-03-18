package com.yn.yntp.module.sys.user.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.google.common.base.Function;
import com.google.common.collect.Collections2;
import com.google.common.collect.Sets;
import com.yn.yntp.module.sys.permission.entity.RoleEntity;
import com.yn.yntp.module.sys.user.entity.UserEntity;

/**
 * 
 * 
 * @Title: UserAuthService.java 
 * @Package com.yn.yntp.module.sys.user.service 
 * @Description: TODO(用一句话描述该文件做什么) 
 *
 * @author liucc    
 * @date 2014年12月12日 下午12:50:18 
 * @version V1.0
 */
@Service
public class UserAuthService {

  @Autowired
  private UserService userService;

  public List<RoleEntity> findRoles(UserEntity user) {

    if (user == null) {
      return new ArrayList<RoleEntity>();
    }
    Long userId = user.getId();

    return userService.queryRolesByUserID(userId);
  }

  public Set<String> findStringRoles(UserEntity user) {
    List<RoleEntity> roles = findRoles(user);
    return Sets.newHashSet(Collections2.transform(roles,
        new Function<RoleEntity, String>() {
          @Override
          public String apply(RoleEntity input) {
            return input.getCode();
          }
        }));
  }

  /**
   * 根据角色获取 权限字符串 如sys:admin
   *
   * @param user
   * @return
   */
  public Set<String> findStringPermissions(UserEntity user) {
    Set<String> permissions = Sets.newHashSet();
    permissions.add("sys:admin");
    return permissions;
  }
}
