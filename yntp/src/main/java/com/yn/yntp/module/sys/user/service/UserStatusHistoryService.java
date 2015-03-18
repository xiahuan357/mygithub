package com.yn.yntp.module.sys.user.service;

import java.util.Date;
import java.util.List;

import org.hibernate.Query;
import org.springframework.stereotype.Service;

import com.yn.yntp.common.persistence.service.BaseServiceImpl;
import com.yn.yntp.module.sys.user.entity.UserEntity;
import com.yn.yntp.module.sys.user.entity.UserStatus;
import com.yn.yntp.module.sys.user.entity.UserStatusHistoryEntity;

/**
 * 
 * @Title: UserStatusHistoryService.java
 * @Package com.yn.yntp.module.sys.user.service
 * @Description: 登录历史
 *
 * @author liucc
 * @date 2014年11月27日 下午8:12:29
 * @version V1.0
 */
@Service
public class UserStatusHistoryService extends
    BaseServiceImpl<UserStatusHistoryEntity, Long> {

  public void log(UserEntity opUser, UserEntity user, UserStatus newStatus,
      String reason) {
    UserStatusHistoryEntity history = new UserStatusHistoryEntity();
    history.setUser(user);
    history.setOpUser(opUser);
    history.setOpDate(new Date());
    history.setStatus(newStatus);
    history.setReason(reason);
    baseDao.save(history);
  }

  public UserStatusHistoryEntity findLastHistory(final UserEntity user) {
    StringBuilder hql = new StringBuilder();
    hql.append(" from UserStatusHistoryEntity where user_id = :user_id");
    hql.append(" order by opDate desc");

    Query query = baseDao.createQuery(hql.toString());
    query.setParameter("user_id", user.getId());
    query.setFirstResult(0);
    query.setMaxResults(1);
    @SuppressWarnings("unchecked")
    List<UserStatusHistoryEntity> items = query.list();

    return (items == null || items.isEmpty()) ? null : items.get(0);
  }

  public String getLastReason(UserEntity user) {
    UserStatusHistoryEntity history = findLastHistory(user);
    if (history == null) {
      return "";
    }
    return history.getReason();
  }
}
