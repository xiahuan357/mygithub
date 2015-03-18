package com.yn.yntp.module.sys.user.service;

import java.util.Date;
import java.util.List;

import org.hibernate.Query;
import org.springframework.stereotype.Service;

import com.yn.yntp.common.persistence.service.BaseServiceImpl;
import com.yn.yntp.module.sys.user.entity.UserOnlineEntity;

/**
 * 
 * @Title: UserOnlineService.java
 * @Package com.yn.yntp.module.sys.user.service
 * @Description: TODO(用一句话描述该文件做什么)
 *
 * @author liucc
 * @date 2014年11月27日 下午8:34:01
 * @version V1.0
 */

@Service
public class UserOnlineService extends BaseServiceImpl<UserOnlineEntity, String> {

  /**
   * 上线
   *
   * @param userOnline
   */
  public void online(UserOnlineEntity userOnline) {
    baseDao.save(userOnline);
  }

  /**
   * 下线
   *
   * @param sid
   */
  public void offline(String sid) {
    UserOnlineEntity userOnline = baseDao.get(sid);
    if (userOnline != null) {
      baseDao.delete(userOnline);
    }
  }

  /**
   * 批量下线
   *
   * @param needOfflineIdList
   */
  public void batchOffline(List<String> needOfflineIdList) {
    baseDao.delete(needOfflineIdList);
  }

  /**
   * 无效的UserOnline
   *
   * @return
   */
  @SuppressWarnings("unchecked")
  public List<UserOnlineEntity> findExpiredUserOnlineList(Date expiredDate) {
    StringBuilder hql = new StringBuilder();
    hql.append(" from UserOnline o where o.last_access_datetime < :last_access_datetime ");
    hql.append(" by o.last_access_datetime asc ");

    Query query = baseDao.createQuery(hql.toString());
    query.setParameter("last_access_datetime", expiredDate);

    return query.list();
  }

}
