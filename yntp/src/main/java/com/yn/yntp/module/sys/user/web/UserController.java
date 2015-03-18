package com.yn.yntp.module.sys.user.web;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

import org.apache.commons.lang3.tuple.ImmutableTriple;
import org.apache.commons.lang3.tuple.Triple;
import org.hibernate.type.BasicType;
import org.hibernate.type.StandardBasicTypes;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.StringUtils;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.yn.yntp.common.constant.Constants;
import com.yn.yntp.common.entity.pagination.PaginationResult;
import com.yn.yntp.common.entity.response.ServiceResponse;
import com.yn.yntp.common.entity.search.ClientOperation;
import com.yn.yntp.common.entity.search.QueryConstants;
import com.yn.yntp.common.persistence.search.SearchCommonUtil;
import com.yn.yntp.common.persistence.service.BaseServiceImpl;
import com.yn.yntp.common.validate.DefaultValidate;
import com.yn.yntp.common.validate.ReturnInfo;
import com.yn.yntp.common.web.controller.BaseCRUDController;
import com.yn.yntp.module.sys.user.entity.UserEntity;
import com.yn.yntp.module.sys.user.service.PasswordService;
import com.yn.yntp.module.sys.user.service.UserService;
import com.yn.yntp.module.sys.user.validate.UserValidate;

/**
 * 
 * @Title: UserController.java
 * @Package com.yn.yntp.module.sys.user.web
 * @Description: 用户接口基类
 *
 * @author liucc
 * @date 2014年11月28日 下午1:14:24
 * @version V1.0
 */

@Controller
@RequestMapping("/admin/sys/user/user")
public class UserController extends BaseCRUDController<UserEntity, Long> {

  @Autowired
  private PasswordService passwordService;

  @Autowired
  private UserValidate userValidate;

  @Autowired
  protected UserService userService;

  @Override
  protected void setBaseService(BaseServiceImpl<UserEntity, Long> baseService) {
    super.setBaseService(userService);
  }

  @Override
  protected BaseServiceImpl getBaseService() {
    return userService;
  }

  @Override
  protected void setDefaultValidate(
      DefaultValidate<UserEntity, Long> defaultValidate) {
    super.setDefaultValidate(userValidate);
  }

  @Override
  protected DefaultValidate getDefaultValidate() {
    return userValidate;
  }

  static Map<String, BasicType> filedNameMap = new HashMap<String, BasicType>();
  static {
    filedNameMap.put("id", StandardBasicTypes.LONG);
    filedNameMap.put("username", StandardBasicTypes.STRING);
    filedNameMap.put("email", StandardBasicTypes.STRING);
    filedNameMap.put("mobile_phone_number", StandardBasicTypes.STRING);
    filedNameMap.put("userstatus", StandardBasicTypes.INTEGER);
    filedNameMap.put("usertype", StandardBasicTypes.INTEGER);
  }

  /**
   * 查询当前用户信息
   * 
   * @param username 用户名|邮箱|手机号码
   * @param request
   * @param response
   * @return
   */

  @RequestMapping(value = "/getuserinfo/{username}", method = RequestMethod.GET)
  @ResponseBody
  public Object getUserEntity(@PathVariable("username") final String username,
      HttpServletRequest request, HttpServletResponse response) {
    ServiceResponse<UserEntity> ret = new ServiceResponse<UserEntity>();

    UserEntity user =
        (UserEntity) request.getSession().getAttribute(Constants.CURRENT_USER);
    if (user == null) {
      user = userService.queryUser(username);
    }

    user.setPassword(null);
    user.setSalt(null);
    ret.setData(user);
    return ret;
  }

  /**
   * 管理员列表显示用，只查询部分列
   * 
   * @param model
   * @param queryString
   * @return
   */
  @RequestMapping(value = "/userlist", params = {
    QueryConstants.Q_PARAM
  }, method = RequestMethod.GET)
  @ResponseBody
  public Object searchAll_FilterFiled(Model model,
      @RequestParam(QueryConstants.Q_PARAM) final String queryString) {

    ServiceResponse<List<UserEntity>> ret =
        new ServiceResponse<List<UserEntity>>();

    List<Triple<String, ClientOperation, String>> parsedQuery = null;
    // 根据用户条件构造查询三元组
    parsedQuery = SearchCommonUtil.parseQueryString(queryString);

    if (null == parsedQuery) {
      parsedQuery = new ArrayList<Triple<String, ClientOperation, String>>();
    }
    // 后台管理列表只显示特定列，不需要显示所有的数据，这样能节省带宽
    ret.setData(getBaseService().query(filedNameMap, parsedQuery));
    return ret;
  }

  /**
   * 管理员列表用，只查询部分列，分页
   * 
   * @param queryString
   * @param page
   * @param size
   * @return
   */
  @RequestMapping(value = "/pagesearch/userlist", params = {
    QueryConstants.Q_PARAM, QueryConstants.START, QueryConstants.SIZE
  }, method = RequestMethod.GET)
  @ResponseBody
  public Object searchAllPaginated_FilterFiled(Model model,
      @RequestParam(QueryConstants.Q_PARAM) final String queryString,
      @RequestParam(value = QueryConstants.START) final int start,
      @RequestParam(value = QueryConstants.SIZE) final int size,
      HttpServletRequest request) {

    ServiceResponse<PaginationResult<UserEntity>> ret =
        new ServiceResponse<PaginationResult<UserEntity>>();

    List<Triple<String, ClientOperation, String>> parsedQuery = null;
    parsedQuery = SearchCommonUtil.parseQueryString(queryString);
    if (null == parsedQuery) {
      parsedQuery = new ArrayList<Triple<String, ClientOperation, String>>();
    }

    ret.setData(getBaseService().query(start, size, filedNameMap, parsedQuery));
    return ret;
  }

  @RequestMapping(value = "/changepassword", params = {
    "id", "oldpassword", "newpassword1", "newpassword2"
  }, method = RequestMethod.POST)
  @ResponseBody
  public Object changePassword(@RequestParam(value = "id") Long id,
      @RequestParam(value = "oldpassword") String oldPassword,
      @RequestParam(value = "newpassword1") String newPassword1,
      @RequestParam(value = "newpassword2") String newPassword2) {

    ServiceResponse<Object> ret = new ServiceResponse<Object>();
    UserEntity resource = userService.queryById(id);
    if (!passwordService.matches(resource, oldPassword)) {
      ret.setRetcode("100000");
      ret.setRetmsg("旧密码不正确");
      return ret;
    }

    if (StringUtils.isEmpty(newPassword1) || StringUtils.isEmpty(newPassword2)) {
      ret.setRetcode("100000");
      ret.setRetmsg("必须输入新密码");
      return ret;
    }

    if (!newPassword1.equals(newPassword2)) {
      ret.setRetcode("100000");
      ret.setRetmsg("两次输入的密码不一致");
      return ret;
    }

    userService.changePassword(resource, newPassword1);
    return ret;
  }

  /**
   * 修改用户基本信息，不包括密码
   * 
   * @param id
   * @param resource
   */
  @RequestMapping(value = "/update/{id}", method = RequestMethod.POST)
  @ResponseBody
  @Override
  public Object update(Model model, @PathVariable("id") final Long id,
      @Valid @ModelAttribute final UserEntity resource, BindingResult result) {
    ServiceResponse<String> ret = new ServiceResponse<String>();
    // 1 自动注入实体是否有错
    if (super.hasError(resource, result)) {
      ret.setRetcode("100000");
      ret.setRetmsg(super.getErrors(result));
      return ret;
    }
    // 2 更新前校验是否有错
    getDefaultValidate().setEntity(resource);
    ReturnInfo validate = getDefaultValidate().validateUpdate();
    if (validate != null && Boolean.FALSE == validate.getFlag()) {
      ret.setRetcode("100000");
      ret.setRetmsg(validate.getMsg());
      return ret;
    }

    // 3 保存对象
    Long userId = resource.getId();
    UserEntity dbUser = userService.queryById(userId);

    dbUser.setUsername(resource.getUsername());
    dbUser.setEmail(resource.getEmail());
    dbUser.setMobile_phone_number(resource.getMobile_phone_number());

    getBaseService().update(dbUser);
    return ret;
  }

  /**
   * 更新用户状态
   * 
   * @param userEntity
   * @return
   */
  @RequestMapping(value = "/updatestatus", method = RequestMethod.POST)
  @ResponseBody
  private Object updatestatus(@ModelAttribute UserEntity userEntity) {
    ServiceResponse<Object> ret = new ServiceResponse<Object>();
    List<Triple<String, ClientOperation, String>> parsedQuery =
        new ArrayList<Triple<String, ClientOperation, String>>();
    parsedQuery.add(new ImmutableTriple<String, ClientOperation, String>("id",
        ClientOperation.EQ, String.valueOf(userEntity.getId())));

    Map<String, Object> filedNameMap = new HashMap<String, Object>();
    filedNameMap.put("userstatus", userEntity.getUserstatus());

    // 保存对象
    getBaseService().update(filedNameMap, parsedQuery);

    return ret;
  }
}
