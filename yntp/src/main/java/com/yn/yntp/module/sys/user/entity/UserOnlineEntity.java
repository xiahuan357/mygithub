package com.yn.yntp.module.sys.user.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.apache.shiro.session.mgt.OnlineSession;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Type;
import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.yn.yntp.common.entity.AbstractEntity;

/**
 * 
 * 
 * @Title: UserOnlineEntity.java 
 * @Package com.yn.yntp.module.sys.user.entity 
 * @Description: TODO(用一句话描述该文件做什么) 
 *
 * @author liucc    
 * @date 2014年12月12日 下午12:50:03 
 * @version V1.0
 */
@Entity
@Table(name = "sys_user_online")
public class UserOnlineEntity extends AbstractEntity<String> {

    private static final long serialVersionUID = 1L;

    /**
     * 用户会话id ===> uid
     */
    @Id
    @GeneratedValue(generator = "assigned")
    @GenericGenerator(name = "assigned", strategy = "assigned")
    private String id;

    //当前登录的用户Id
    @Column(name = "user_id")
    private Long userId = 0L;

    @Column(name = "username")
    private String username;

    /**
     * 用户主机地址
     */
    @Column(name = "host")
    private String host;

    /**
     * 用户登录时系统IP
     */
    @Column(name = "system_host")
    private String systemHost;

    /**
     * 用户浏览器类型
     */
    @Column(name = "user_agent")
    private String userAgent;

    /**
     * 在线状态
     */
    @Column(name = "status")
    @Enumerated(EnumType.STRING)
    private OnlineSession.OnlineStatus status = OnlineSession.OnlineStatus.on_line;

    /**
     * session创建时间
     */
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @Column(name = "start_datetime")
    private Date startDatetime;
    /**
     * session最后访问时间
     */
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @Column(name = "last_access_datetime")
    private Date lastAccessDatetime;

    /**
     * 超时时间
     */
    @Column(name = "timeout")
    private Long timeout;


    /**
     * 备份的当前用户会话
     */
    @Column(name = "session")
    @Type(type = "com.yn.yntp.common.repository.hibernate.type.ObjectSerializeUserType")
    private OnlineSession session;


    // 是否删除标示，删除数据，不真从数据库删除
    private Boolean delflag = Boolean.FALSE;

    // 创建时间
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    private Date createtime;

    // 创建时间
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    private Date updatetime;

    public Boolean getDelflag() {
      return this.delflag;
    }

    public void setDelflag(Boolean delflag) {
      this.delflag = delflag;
    }

    public Date getCreatetime() {
      return this.createtime;
    }

    public void setCreatetime(Date createtime) {
      this.createtime = createtime;
    }

    public Date getUpdatetime() {
      return this.updatetime;
    }

    public void setUpdatetime(Date updatetime) {
      this.updatetime = updatetime;
    }
    
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Date getStartDatetime() {
        return startDatetime;
    }

    public void setStartDatetime(Date startDatetime) {
        this.startDatetime = startDatetime;
    }

    public Date getLastAccessDatetime() {
        return lastAccessDatetime;
    }

    public void setLastAccessDatetime(Date lastAccessDatetime) {
        this.lastAccessDatetime = lastAccessDatetime;
    }


    public Long getTimeout() {
        return timeout;
    }

    public void setTimeout(Long timeout) {
        this.timeout = timeout;
    }

    public String getHost() {
        return host;
    }

    public void setHost(String host) {
        this.host = host;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getUserAgent() {
        return userAgent;
    }

    public void setUserAgent(String userAgent) {
        this.userAgent = userAgent;
    }

    public OnlineSession.OnlineStatus getStatus() {
        return status;
    }

    public void setStatus(OnlineSession.OnlineStatus status) {
        this.status = status;
    }

    public OnlineSession getSession() {
        return session;
    }

    public void setSession(OnlineSession session) {
        this.session = session;
    }

    public String getSystemHost() {
        return systemHost;
    }

    public void setSystemHost(String systemHost) {
        this.systemHost = systemHost;
    }


    public static final UserOnlineEntity fromOnlineSession(OnlineSession session) {
        UserOnlineEntity online = new UserOnlineEntity();
        online.setId(String.valueOf(session.getId()));
        online.setUserId(session.getUserId());
        online.setUsername(session.getUsername());
        online.setStartDatetime(session.getStartTimestamp());
        online.setLastAccessDatetime(session.getLastAccessTime());
        online.setTimeout(session.getTimeout());
        online.setHost(session.getHost());
        online.setUserAgent(session.getUserAgent());
        online.setSystemHost(session.getSystemHost());
        online.setSession(session);

        return online;
    }


}
