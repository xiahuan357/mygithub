package com.yn.yntp.module.message.web;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang3.tuple.ImmutableTriple;
import org.apache.commons.lang3.tuple.Triple;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
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
import com.yn.yntp.module.message.entity.MessageEntity;

/**
 * 
 * @Title: MessageController.java 
 * @Package com.yn.yntp.module.message.web 
 * @Description: 系统消息 
 *
 * @author liucc    
 * @date 2015年1月27日 下午8:15:49 
 * @version V1.0 
 */

@Controller
@RequestMapping("/admin/message")
public class MessageController extends BaseCRUDController<MessageEntity, Long> {

  /**
   * 查询用户的所有消息
   * 
   * @param model
   * @param queryString
   * @return
   */
  @RequestMapping(value = "/search/{userid}/messagelist", params = {QueryConstants.Q_PARAM}, method = RequestMethod.GET)
  @ResponseBody
  public Object getCarList(Model model,@PathVariable("userid") final Long userid,
      @RequestParam(QueryConstants.Q_PARAM) final String queryString) {

    ServiceResponse<List<MessageEntity>> ret = new ServiceResponse<List<MessageEntity>>();

    List<Triple<String, ClientOperation, String>> parsedQuery = null;
    // 根据用户条件构造查询三元组
    parsedQuery = SearchCommonUtil.parseQueryString(queryString);

    if(parsedQuery == null){
      parsedQuery =  new ArrayList<Triple<String, ClientOperation, String>>();
    }
    // 根据收件人id查询
    parsedQuery.add(new ImmutableTriple<String, ClientOperation, String>("receiver_id", ClientOperation.EQ, String.valueOf(userid)));
    
    // 后台管理列表只显示特定列，不需要显示所有的数据，这样能节省带宽
    ret.setData(getBaseService().query(parsedQuery));
    return ret;
  }

  /**
   * 查询用户的所有消息
   * 
   * @param queryString
   * @param page
   * @param size
   * @return
   */
  @RequestMapping(value = "/pagesearch/{userid}/messagelist", params = {
    QueryConstants.Q_PARAM, QueryConstants.START, QueryConstants.SIZE
  }, method = RequestMethod.GET)
  @ResponseBody
  public Object searchAllPaginated(Model model,
      @PathVariable("userid") final Long userid,
      @RequestParam(QueryConstants.Q_PARAM) final String queryString,
      @RequestParam(value = QueryConstants.START) final int start,
      @RequestParam(value = QueryConstants.SIZE) final int size,
      HttpServletRequest request) {

    ServiceResponse<PaginationResult<MessageEntity>> ret =
        new ServiceResponse<PaginationResult<MessageEntity>>();

    List<Triple<String, ClientOperation, String>> parsedQuery = null;
    parsedQuery = SearchCommonUtil.parseQueryString(queryString);
    if (null == parsedQuery) {
      parsedQuery = new ArrayList<Triple<String, ClientOperation, String>>();
    }
 
    // 添加商家id
    parsedQuery.add(new ImmutableTriple<String, ClientOperation, String>("receiver_id", ClientOperation.EQ, String.valueOf(userid)));

    ret.setData(getBaseService().query(start, size, parsedQuery));
    return ret;
  }
  
  @RequestMapping(value = "/{userid}/unreadcount",method=RequestMethod.GET)
  @ResponseBody
  public Object unReadCount(@PathVariable("userid") final Long userid){
    ServiceResponse<String> ret = new ServiceResponse<String>();
    List<Triple<String, ClientOperation, String>> parsedQuery = null;
    parsedQuery = new ArrayList<Triple<String, ClientOperation, String>>();
 
    // 添加商家id
    parsedQuery.add(new ImmutableTriple<String, ClientOperation, String>("receiver_id", ClientOperation.EQ, String.valueOf(userid)));
    parsedQuery.add(new ImmutableTriple<String, ClientOperation, String>("is_read", ClientOperation.EQ, String.valueOf(0)));

    ret.setData(getBaseService().queryCount(parsedQuery).toString());
    return ret;
  }
  
  /**
   * 标记为已读
   * 
   * @param id
   * @return
   */
  @RequestMapping(value="/markread/{id}",method=RequestMethod.POST)
  @ResponseBody
  public Object markMessageRead(@PathVariable("id") final Long id){
    ServiceResponse<String> ret = new ServiceResponse<String>();
    List<Triple<String, ClientOperation, String>> parsedQuery = new ArrayList<Triple<String, ClientOperation, String>>();
    parsedQuery.add(new ImmutableTriple<String, ClientOperation, String>("id", ClientOperation.EQ, String.valueOf(id)));

    Map<String, Object> filedNameMap = new HashMap<String, Object>();
    filedNameMap.put("is_read", 1);

    // 保存对象
    getBaseService().update(filedNameMap, parsedQuery);
    return ret;
  }
}
