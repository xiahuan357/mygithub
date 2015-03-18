package org.apache.shiro.realm;

import java.util.ArrayList;
import java.util.List;

import org.apache.commons.lang3.tuple.ImmutableTriple;
import org.apache.commons.lang3.tuple.Triple;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.AuthenticationInfo;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.SimpleAuthenticationInfo;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.authz.SimpleAuthorizationInfo;
import org.apache.shiro.subject.PrincipalCollection;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;

import com.yn.yntp.common.entity.search.ClientOperation;
import com.yn.yntp.module.sys.user.entity.UserEntity;
import com.yn.yntp.module.sys.user.exception.UserBlockedException;
import com.yn.yntp.module.sys.user.exception.UserException;
import com.yn.yntp.module.sys.user.exception.UserNotExistsException;
import com.yn.yntp.module.sys.user.exception.UserPasswordNotMatchException;
import com.yn.yntp.module.sys.user.exception.UserPasswordRetryLimitExceedException;
import com.yn.yntp.module.sys.user.exception.UserUnActiveException;
import com.yn.yntp.module.sys.user.service.UserAuthService;
import com.yn.yntp.module.sys.user.service.UserService;

/**
 * 
 * @Title: UserRealm.java 
 * @Package org.apache.shiro.realm 
 * @Description: TODO(用一句话描述该文件做什么) 
 *
 * @author liucc    
 * @date 2014年11月29日 下午5:57:42 
 * @version V1.0
 */
public class UserRealm extends AuthorizingRealm {

    @Autowired
    private UserService userService;
    
    @Autowired
    private UserAuthService userAuthService;

    private static final Logger log = LoggerFactory.getLogger("es-error");

    @Autowired
    public UserRealm(ApplicationContext ctx) {
        super();
        //不能注入 因为获取bean依赖顺序问题造成可能拿不到某些bean报错
        //why？
        //因为spring在查找findAutowireCandidates时对FactoryBean做了优化，即只获取Bean，但不会autowire属性，
        //所以如果我们的bean在依赖它的bean之前初始化，那么就得不到ObjectType（永远是Repository）
        //所以此处我们先getBean一下 就没有问题了
//        ctx.getBeansOfType(SimpleBaseRepositoryFactoryBean.class);
    }

    @Override
    protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principals) {
        String username = (String) principals.getPrimaryPrincipal();
        // 1 校验名称是否有重复
        List<Triple<String, ClientOperation, String>> parsedQuery =  new ArrayList<Triple<String, ClientOperation, String>>();
        parsedQuery.add(new ImmutableTriple<String, ClientOperation, String>("username", ClientOperation.EQ, username));
        List<UserEntity> userResults = userService.query(parsedQuery);
        
        UserEntity user = userResults.get(0);

        SimpleAuthorizationInfo authorizationInfo = new SimpleAuthorizationInfo();
        authorizationInfo.setRoles(userAuthService.findStringRoles(user));
        authorizationInfo.setStringPermissions(userAuthService.findStringPermissions(user));

        return authorizationInfo;
    }

    private static final String OR_OPERATOR = " or ";
    private static final String AND_OPERATOR = " and ";
    private static final String NOT_OPERATOR = "not ";

    /**
     * 支持or and not 关键词  不支持and or混用
     *
     * @param principals
     * @param permission
     * @return
     */
    public boolean isPermitted(PrincipalCollection principals, String permission) {
        if (permission.contains(OR_OPERATOR)) {
            String[] permissions = permission.split(OR_OPERATOR);
            for (String orPermission : permissions) {
                if (isPermittedWithNotOperator(principals, orPermission)) {
                    return true;
                }
            }
            return false;
        } else if (permission.contains(AND_OPERATOR)) {
            String[] permissions = permission.split(AND_OPERATOR);
            for (String orPermission : permissions) {
                if (!isPermittedWithNotOperator(principals, orPermission)) {
                    return false;
                }
            }
            return true;
        } else {
            return isPermittedWithNotOperator(principals, permission);
        }
    }

    private boolean isPermittedWithNotOperator(PrincipalCollection principals, String permission) {
        if (permission.startsWith(NOT_OPERATOR)) {
            return !super.isPermitted(principals, permission.substring(NOT_OPERATOR.length()));
        } else {
            return super.isPermitted(principals, permission);
        }
    }

    @Override
    protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken token) throws RuntimeException {

        UsernamePasswordToken upToken = (UsernamePasswordToken) token;
        String username = upToken.getUsername().trim();
        String password = "";
        if (upToken.getPassword() != null) {
            password = new String(upToken.getPassword());
        }

        UserEntity user = null;
        try {
            user = userService.login(username, password);
        } catch (UserNotExistsException e) {
            throw e;
        } catch (UserPasswordNotMatchException e) {
          throw e;
        } catch (UserPasswordRetryLimitExceedException e) {
          throw e;
        } catch (UserBlockedException e) {
          throw e;
        } catch (UserUnActiveException e){
          throw e;
        } catch (Exception e) {
            log.error("login error", e);
            throw new AuthenticationException(new UserException("user.unknown.error", null));
        }

        SimpleAuthenticationInfo info = new SimpleAuthenticationInfo(user.getUsername(), password.toCharArray(), getName());
        return info;
    }

}
