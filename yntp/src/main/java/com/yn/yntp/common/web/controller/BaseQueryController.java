package com.yn.yntp.common.web.controller;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang3.tuple.Triple;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.yn.yntp.common.entity.AbstractEntity;
import com.yn.yntp.common.entity.pagination.PaginationResult;
import com.yn.yntp.common.entity.response.ServiceResponse;
import com.yn.yntp.common.entity.search.ClientOperation;
import com.yn.yntp.common.entity.search.QueryConstants;
import com.yn.yntp.common.persistence.search.SearchCommonUtil;
import com.yn.yntp.common.persistence.service.BaseServiceImpl;

/**
 * 
 * @Title: BaseQueryController.java 
 * @Package com.yn.yntp.common.web.controller 
 * @Description: 基础的查询控制器
 *
 * @author liucc    
 * @date 2015年1月24日 下午8:42:18 
 * @version V1.0 
 */

public class BaseQueryController<M extends AbstractEntity, ID extends Serializable>
    extends BaseController<M, ID> {

  /**
   * 日志对象
   */
  protected Logger logger = LoggerFactory.getLogger(getClass());
  
  /**
   * 设置基础service
   */
  private BaseServiceImpl<M, ID> baseService;
  
  @Autowired
  protected void setBaseService(BaseServiceImpl<M, ID> baseService) {
    this.baseService = baseService;
  }
  
  /**
   * 返回默认的服务接口
   * 
   * @return
   */
  protected BaseServiceImpl getBaseService() {
    return this.baseService;
  }
  
  //------------------------------ 普通查询 ----------------------------------
  /**
   * 查询满足给定查询条件的信息。
   * 
   * @param queryString
   * @return
   */
  @RequestMapping(value = "/search", params = {QueryConstants.Q_PARAM}, method = RequestMethod.GET)
  @ResponseBody
  public Object searchAll(Model model, @RequestParam(QueryConstants.Q_PARAM) final String queryString) {

    ServiceResponse<List<M>> ret = new ServiceResponse<List<M>>();

    List<Triple<String, ClientOperation, String>> parsedQuery = null;
    parsedQuery = SearchCommonUtil.parseQueryString(queryString);

    if (null == parsedQuery) {
      parsedQuery = new ArrayList<Triple<String, ClientOperation, String>>();
    }
    ret.setData(getBaseService().query(parsedQuery));
    return ret;
  }

  //------------------------------ 分页查询 ----------------------------------
  /**
   * 按页查询给定查询条件的信息。
   * 
   * @param queryString
   * @param page
   * @param size
   * @return
   */
  @RequestMapping(value = "/pagesearch",params = {QueryConstants.Q_PARAM, QueryConstants.START, QueryConstants.SIZE}, method = RequestMethod.GET)
  @ResponseBody
  public Object searchAllPaginated(Model model, 
      @RequestParam(QueryConstants.Q_PARAM) final String queryString,
      @RequestParam(value = QueryConstants.START) final int start,
      @RequestParam(value = QueryConstants.SIZE) final int size,
      HttpServletRequest request) {

     ServiceResponse<PaginationResult<M>> ret = new ServiceResponse<PaginationResult<M>>();

    List<Triple<String, ClientOperation, String>> parsedQuery = null;
    parsedQuery = SearchCommonUtil.parseQueryString(queryString);
    if (null == parsedQuery) {
      parsedQuery = new ArrayList<Triple<String, ClientOperation, String>>();
    }

    ret.setData(getBaseService().query(start, size, parsedQuery));
    return ret;
  }

}
