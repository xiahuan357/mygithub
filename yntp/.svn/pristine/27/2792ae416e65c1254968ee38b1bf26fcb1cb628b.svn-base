package com.yn.yntp.module.sys.user.service;

import java.util.ArrayList;
import java.util.List;

import org.apache.commons.lang3.tuple.ImmutableTriple;
import org.apache.commons.lang3.tuple.Triple;
import org.hibernate.Query;
import org.springframework.aop.framework.AopContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import com.yn.yntp.common.entity.search.ClientOperation;
import com.yn.yntp.common.persistence.service.BaseServiceImpl;
import com.yn.yntp.module.sys.permission.entity.RoleEntity;
import com.yn.yntp.module.sys.user.entity.UserEntity;
import com.yn.yntp.module.sys.user.entity.UserStatus;
import com.yn.yntp.module.sys.user.exception.UserBlockedException;
import com.yn.yntp.module.sys.user.exception.UserNotExistsException;
import com.yn.yntp.module.sys.user.exception.UserPasswordNotMatchException;
import com.yn.yntp.module.sys.user.exception.UserUnActiveException;
import com.yn.yntp.module.sys.user.utils.UserLogUtils;

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
public class UserService extends BaseServiceImpl<UserEntity, Long> {

  @Autowired
  private PasswordService passwordService;
  
  @Autowired
  private UserStatusHistoryService userStatusHistoryService;
  
  /**
   * 根据用户查询他所属的角色
   * 
   * @param userID
   * @return
   */
  public List<RoleEntity> queryRolesByUserID(Long userID) {
    StringBuilder hql = new StringBuilder();
    hql.append(" from RoleEntity ");
    hql.append(" where in(");
    hql.append(" select role_id from UserRoleEntity where user_id = :user_id");

    Query query = baseDao.createQuery(hql.toString());
    query.setParameter("user_id", userID);

    @SuppressWarnings("unchecked")
    List<RoleEntity> items = query.list();
    return items;
  }

  /**
   * 查询用户信息，可能是用户名，邮箱，手机
   * 
   * @param username
   * @return
   */
  public UserEntity queryUser(String username){
    // 用户名为空
    if (StringUtils.isEmpty(username)) {
      return null;
    }
    
    // 用户名如果不在指定范围内 肯定错误
    if(username.length() < UserEntity.USERNAME_MIN_LENGTH ||
        username.length() > UserEntity.USERNAME_MAX_LENGTH){
      return null;
    }
    
    UserEntity user = null;

    // 此处需要走代理对象，目的是能走缓存切面
    UserService proxyUserService = (UserService) AopContext.currentProxy();
    if (maybeUsername(username)) {
      user = proxyUserService.findByUsername(username);
    }

    if (user == null && maybeEmail(username)) {
      user = proxyUserService.findByEmail(username);
    }

    if (user == null && maybeMobilePhoneNumber(username)) {
      user = proxyUserService.findByMobilePhoneNumber(username);
    }

    if (user == null || Boolean.TRUE.equals(user.getDelflag())) {
      return null;
    }

    return user;
  }
  
  /**
   * 用户登录
   * 
   * @param username
   * @param password
   * @return
   */
  public UserEntity login(String username, String password) {

    // 用户名为空
    if (StringUtils.isEmpty(username) || StringUtils.isEmpty(password)) {
      UserLogUtils.log(username, "loginError", "username is empty");
      throw new UserNotExistsException();
    }
    
    // 密码为空
    if (StringUtils.isEmpty(password) || StringUtils.isEmpty(password)) {
      UserLogUtils.log(username, "loginError", "password is empty");
      throw new UserPasswordNotMatchException();
    }
    
    // 用户名如果不在指定范围内 肯定错误
    if(username.length() < UserEntity.USERNAME_MIN_LENGTH ||
        username.length() > UserEntity.USERNAME_MAX_LENGTH){
      UserLogUtils.log(username, "loginError",
          "username length error! password is between {} and {}",
          UserEntity.USERNAME_MIN_LENGTH, UserEntity.USERNAME_MAX_LENGTH);
      throw new UserNotExistsException();
    }
    
    UserEntity user = null;

    // 此处需要走代理对象，目的是能走缓存切面
    UserService proxyUserService = (UserService) AopContext.currentProxy();
    if (maybeUsername(username)) {
      user = proxyUserService.findByUsername(username);
    }

    if (user == null && maybeEmail(username)) {
      user = proxyUserService.findByEmail(username);
    }

    if (user == null && maybeMobilePhoneNumber(username)) {
      user = proxyUserService.findByMobilePhoneNumber(username);
    }

    if (user == null || Boolean.TRUE.equals(user.getDelflag())) {
      UserLogUtils.log(username, "loginError", "user is not exists!");
      throw new UserNotExistsException();
    }
    
    // 密码如果不在指定范围内 肯定错误
    if (password.length() < UserEntity.PASSWORD_MIN_LENGTH
        || password.length() > UserEntity.PASSWORD_MAX_LENGTH) {
      UserLogUtils.log(username, "loginError",
          "password length error! password is between {} and {}",
          UserEntity.PASSWORD_MIN_LENGTH, UserEntity.PASSWORD_MAX_LENGTH);

      throw new UserPasswordNotMatchException();
    }
    // 校验密码是否正确
    passwordService.validate(user, password);

    if (user.getUserstatus() == UserStatus.BLOCKED.getCode()) {
      UserLogUtils.log(username, "loginError", "user is blocked!");
      throw new UserBlockedException("用户被锁定");
    }
    
    if (user.getUserstatus() == UserStatus.UNACTIVE.getCode()) {
      UserLogUtils.log(username, "loginError", "user is unactive!");
      throw new UserUnActiveException("用户还没有激活");
    }

    UserLogUtils.log(username, "loginSuccess", "");
    return user;
  }

  @Override
  public void insert(UserEntity entity) {
    entity.randomSalt();
    entity.setPassword(passwordService.encryptPassword(entity.getUsername(),entity.getPassword(), entity.getSalt()));

    super.insert(entity);
  }

  /**
   * 修改密码
   * 
   * @param user
   * @param newPassword
   * @return
   */
  public UserEntity changePassword(UserEntity user, String newPassword) {
    UserEntity dbUser = queryById(user.getId());
    
    dbUser.randomSalt();
    dbUser.setPassword(passwordService.encryptPassword(dbUser.getUsername(), newPassword, dbUser.getSalt()));
    update(dbUser);
    return dbUser;
  }
  
  /**
   * 根据手机号查询
   * @param username
   * @return
   */
  public UserEntity findByMobilePhoneNumber(String mobile_phone_number) {
    List<Triple<String, ClientOperation, String>> parsedQuery =
        new ArrayList<Triple<String, ClientOperation, String>>();
    parsedQuery.add(new ImmutableTriple<String, ClientOperation, String>(
        "mobile_phone_number", ClientOperation.EQ, mobile_phone_number));

    List<UserEntity> userResults = query(parsedQuery);
    return (userResults == null || userResults.isEmpty()) ? null : userResults
        .get(0);

  }

  /**
   * 根据Email查询
   * @param username
   * @return
   */
  public UserEntity findByEmail(String email) {
    List<Triple<String, ClientOperation, String>> parsedQuery =
        new ArrayList<Triple<String, ClientOperation, String>>();
    parsedQuery.add(new ImmutableTriple<String, ClientOperation, String>(
        "email", ClientOperation.EQ, email));

    List<UserEntity> userResults = query(parsedQuery);
    return (userResults == null || userResults.isEmpty()) ? null : userResults
        .get(0);
  }

  /**
   * 根据用户名查询
   * @param username
   * @return
   */
  public UserEntity findByUsername(String username) {
    List<Triple<String, ClientOperation, String>> parsedQuery =
        new ArrayList<Triple<String, ClientOperation, String>>();
    parsedQuery.add(new ImmutableTriple<String, ClientOperation, String>(
        "username", ClientOperation.EQ, username));

    List<UserEntity> userResults = query(parsedQuery);
    return (userResults == null || userResults.isEmpty()) ? null : userResults
        .get(0);
  }

  private boolean maybeUsername(String username) {
    if (!username.matches(UserEntity.USERNAME_PATTERN)) {
      return false;
    }
    // 如果用户名不在指定范围内也是错误的
    if (username.length() < UserEntity.USERNAME_MIN_LENGTH
        || username.length() > UserEntity.USERNAME_MAX_LENGTH) {
      return false;
    }

    return true;
  }

  private boolean maybeEmail(String username) {
    if (!username.matches(UserEntity.EMAIL_PATTERN)) {
      return false;
    }
    return true;
  }

  private boolean maybeMobilePhoneNumber(String username) {
    if (!username.matches(UserEntity.MOBILE_PHONE_NUMBER_PATTERN)) {
      return false;
    }
    return true;
  }
}
