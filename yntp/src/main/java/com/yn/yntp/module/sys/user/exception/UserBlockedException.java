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
public class UserBlockedException extends UserLoginException {
    private static final long serialVersionUID = 1L;

    public UserBlockedException(String reason) {
        super("用户被锁定", new Object[]{reason});
    }
}
