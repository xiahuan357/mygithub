package com.yn.yntp.module.scenic.web;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import org.apache.commons.lang3.tuple.ImmutableTriple;
import org.apache.commons.lang3.tuple.Triple;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.yn.yntp.common.entity.pagination.PaginationResult;
import com.yn.yntp.common.entity.response.ServiceResponse;
import com.yn.yntp.common.entity.search.ClientOperation;
import com.yn.yntp.common.entity.search.QueryConstants;
import com.yn.yntp.common.persistence.search.SearchCommonUtil;
import com.yn.yntp.common.web.controller.BaseCRUDController;
import com.yn.yntp.module.scenic.entity.ScenicTicketEntity;

/**
 * 
 * @Title: ScenicController.java
 * @Package com.yn.yntp.module.scenic.web
 * @Description: 线路类型信息维护，登录用户使用
 *
 * @author liucc
 * @date 2014年11月22日 下午3:40:39
 * @version V1.0
 */

@Controller
@RequestMapping("/admin/scenic/scenicticket")
public class ScenicTicketController extends BaseCRUDController<ScenicTicketEntity, Long> {
	 
  /**
   * 根据商家id和条件查询列表，只查询部分列
   * 
   * @param model
   * @param queryString
   * @return
   */
  @RequestMapping(value = "/search/{scenicid}/ticketlist", params = {QueryConstants.Q_PARAM}, method = RequestMethod.GET)
  @ResponseBody
  public Object getticketlist(Model model,@PathVariable("scenicid") final Long scenic_id,
      @RequestParam(QueryConstants.Q_PARAM) final String queryString) {

    ServiceResponse<List<ScenicTicketEntity>> ret = new ServiceResponse<List<ScenicTicketEntity>>();

    List<Triple<String, ClientOperation, String>> parsedQuery = null;
    // 根据用户条件构造查询三元组
    parsedQuery = SearchCommonUtil.parseQueryString(queryString);

    if(parsedQuery == null){
      parsedQuery =  new ArrayList<Triple<String, ClientOperation, String>>();
    }
    // 添加景点id
    parsedQuery.add(new ImmutableTriple<String, ClientOperation, String>("scenic_id", ClientOperation.EQ, String.valueOf(scenic_id)));
    
    // 后台管理列表只显示特定列，不需要显示所有的数据，这样能节省带宽
    ret.setData(getBaseService().query(parsedQuery));
    return ret;
  }

  /**
   * 根据商家id和条件查询列表，只查询部分列
   * 
   * @param queryString
   * @param page
   * @param size
   * @return
   */
  @RequestMapping(value = "/pagesearch/{scenicid}/ticketlist", params = {
    QueryConstants.Q_PARAM, QueryConstants.START, QueryConstants.SIZE
  }, method = RequestMethod.GET)
  @ResponseBody
  public Object searchAllPaginated(Model model,
      @PathVariable("scenicid") final Long scenic_id,
      @RequestParam(QueryConstants.Q_PARAM) final String queryString,
      @RequestParam(value = QueryConstants.START) final int start,
      @RequestParam(value = QueryConstants.SIZE) final int size,
      HttpServletRequest request) {

    ServiceResponse<PaginationResult<ScenicTicketEntity>> ret =
        new ServiceResponse<PaginationResult<ScenicTicketEntity>>();

    List<Triple<String, ClientOperation, String>> parsedQuery = null;
    parsedQuery = SearchCommonUtil.parseQueryString(queryString);
    if (null == parsedQuery) {
      parsedQuery = new ArrayList<Triple<String, ClientOperation, String>>();
    }
 
    // 添加景点id
    parsedQuery.add(new ImmutableTriple<String, ClientOperation, String>("scenic_id", ClientOperation.EQ, String.valueOf(scenic_id)));

    ret.setData(getBaseService().query(start, size, parsedQuery));
    return ret;
  }
  
  /**
   * 新增一个资源。
   * 
   * @param resource
   */
  @RequestMapping(value = "/{scenicid}/create",method = RequestMethod.POST)
  @ResponseBody
  public Object create(Model model, @PathVariable("scenicid") final Long scenic_id,
      @Valid @ModelAttribute final ScenicTicketEntity resource, BindingResult result) {
    return super.create(model, resource, result);
  }

  // ------------------------------ update ----------------------------------
  /**
   * 更新资源。
   * 
   * @param id
   * @param resource
   */
  @RequestMapping(value = "/{scenicid}/update/{id}", method = RequestMethod.POST)
  @ResponseBody
  public Object update(Model model, @PathVariable("scenicid") final Long scenic_id,
      @PathVariable("id") final Long id,
      @Valid @ModelAttribute final ScenicTicketEntity resource,BindingResult result) {
    return super.update(model, id, resource, result);
  }
}
