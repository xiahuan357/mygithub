package com.yn.yntp.module.sys.user.exception;

/**
 * 
 * @Title: UserException.java 
 * @Package com.yn.yntp.module.sys.user.exception 
 * @Description: TODO(用一句话描述该文件做什么) 
 *
 * @author liucc    
 * @date 2014年11月29日 下午5:46:24 
 * @version V1.0
 */
public class UserPasswordRetryLimitExceedException extends UserLoginException {
    private static final long serialVersionUID = 1L;

    public UserPasswordRetryLimitExceedException(int retryLimitCount) {
        super("密码达到最大尝试次数", new Object[]{retryLimitCount});
    }
}
