package com.yn.yntp.module.sys.user.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

import org.springframework.format.annotation.DateTimeFormat;

import com.yn.yntp.common.entity.BaseEntity;

/**
 * 
 * 
 * @Title: UserLastOnlineEntity.java 
 * @Package com.yn.yntp.module.sys.user.entity 
 * @Description: 用户登录信息 
 *
 * @author liucc    
 * @date 2014年12月12日 下午12:49:32 
 * @version V1.0
 */
@Entity
@Table(name = "sys_user_last_online")
public class UserLastOnlineEntity extends BaseEntity<Long> {

    private static final long serialVersionUID = 1L;

    /**
     * 在线的用户
     */
    @Column(name = "user_id")
    private Long userId;

    @Column(name = "username")
    private String username;

    /**
     * 最后退出时的uid
     */
    private String uid;

    /**
     * 用户主机地址
     */
    @Column(name = "host")
    private String host;


    /**
     * 用户浏览器类型
     */
    @Column(name = "user_agent")
    private String userAgent;

    /**
     * 用户登录时系统IP
     */
    @Column(name = "system_host")
    private String systemHost;

    /**
     * 最后登录时间
     */
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @Column(name = "last_login_datetime")
    private Date lastLoginDatetime;

    /**
     * 最后退出时间
     */
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @Column(name = "last_stop_datetime")
    private Date lastStopDatetime;

    /**
     * 登录次数
     */
    @Column(name = "login_count")
    private Integer loginCount = 0;

    /**
     * 总的在线时长（秒为单位）
     */
    @Column(name = "total_online_time")
    private Long totalOnlineTime = 0L;


    public String getUid() {
        return uid;
    }

    public void setUid(String uid) {
        this.uid = uid;
    }

    public String getHost() {
        return host;
    }

    public void setHost(String host) {
        this.host = host;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getUserAgent() {
        return userAgent;
    }

    public void setUserAgent(String userAgent) {
        this.userAgent = userAgent;
    }

    public Integer getLoginCount() {
        return loginCount;
    }

    public void setLoginCount(Integer loginCount) {
        this.loginCount = loginCount;
    }

    public Long getTotalOnlineTime() {
        return totalOnlineTime;
    }

    public void setTotalOnlineTime(Long totalOnlineTime) {
        this.totalOnlineTime = totalOnlineTime;
    }

    public String getSystemHost() {
        return systemHost;
    }

    public void setSystemHost(String systemHost) {
        this.systemHost = systemHost;
    }

    public Date getLastLoginDatetime() {
        return lastLoginDatetime;
    }

    public void setLastLoginDatetime(Date lastLoginDatetime) {
        this.lastLoginDatetime = lastLoginDatetime;
    }

    public Date getLastStopDatetime() {
        return lastStopDatetime;
    }

    public void setLastStopDatetime(Date lastStopDatetime) {
        this.lastStopDatetime = lastStopDatetime;
    }

    public void incLoginCount() {
        setLoginCount(getLoginCount() + 1);
    }

    public void incTotalOnlineTime() {
        long onlineTime = getLastStopDatetime().getTime() - getLastLoginDatetime().getTime();
        setTotalOnlineTime(getTotalOnlineTime() + onlineTime / 1000);
    }


    public static final UserLastOnlineEntity fromUserOnline(UserOnlineEntity online) {
        UserLastOnlineEntity lastOnline = new UserLastOnlineEntity();
        lastOnline.setHost(online.getHost());
        lastOnline.setUserId(online.getUserId());
        lastOnline.setUsername(online.getUsername());
        lastOnline.setUserAgent(online.getUserAgent());
        lastOnline.setSystemHost(online.getSystemHost());
        lastOnline.setUid(String.valueOf(online.getId()));
        lastOnline.setLastLoginDatetime(online.getStartDatetime());
        lastOnline.setLastStopDatetime(online.getLastAccessDatetime());
        return lastOnline;
    }

    public static final void merge(UserLastOnlineEntity from, UserLastOnlineEntity to) {
        to.setHost(from.getHost());
        to.setUserId(from.getUserId());
        to.setUsername(from.getUsername());
        to.setUserAgent(from.getUserAgent());
        to.setSystemHost(from.getSystemHost());
        to.setUid(String.valueOf(from.getUid()));
        to.setLastLoginDatetime(from.getLastLoginDatetime());
        to.setLastStopDatetime(from.getLastStopDatetime());
    }

}
