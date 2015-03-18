package com.yn.yntp.module.hotspring.web.front;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang3.tuple.Triple;
import org.hibernate.type.BasicType;
import org.hibernate.type.StandardBasicTypes;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.yn.yntp.common.entity.pagination.PaginationResult;
import com.yn.yntp.common.entity.response.ServiceResponse;
import com.yn.yntp.common.entity.search.ClientOperation;
import com.yn.yntp.common.entity.search.QueryConstants;
import com.yn.yntp.common.persistence.search.SearchCommonUtil;
import com.yn.yntp.common.web.controller.BaseQueryController;
import com.yn.yntp.common.web.controller.upload.BaseImageUploadController;
import com.yn.yntp.module.hotspring.entity.HotspringEntity;

/**
 * 
 * @Title: HotspringController.java 
 * @Package com.yn.yntp.module.hotspring.web.front 
 * @Description: TODO(用一句话描述该文件做什么) 
 *
 * @author liucc    
 * @date 2015年1月25日 下午9:05:40 
 * @version V1.0 
 */

@Controller
@RequestMapping("/front/hotspring/hotspring")
public class HotspringFrontController extends BaseQueryController<HotspringEntity,Long>{

  // 查询指定字段
  static Map<String, BasicType> filedNameMap = new HashMap<String, BasicType>();
  static {
    filedNameMap.put("id", StandardBasicTypes.LONG);
    filedNameMap.put("name", StandardBasicTypes.STRING);
    filedNameMap.put("coverimagename", StandardBasicTypes.STRING);
    filedNameMap.put("imagelibrarykey", StandardBasicTypes.STRING);
  }
 
  //------------------------------ 普通查询 ----------------------------------
  /**
   * 查询满足给定查询条件的信息。
   * 
   * @param queryString
   * @return
   */
  @RequestMapping(value = "/frontshow/search", params = {QueryConstants.Q_PARAM}, method = RequestMethod.GET)
  @ResponseBody
  public Object searchAll(Model model, @RequestParam(QueryConstants.Q_PARAM) final String queryString) {

    ServiceResponse<List<HotspringEntity>> ret = new ServiceResponse<List<HotspringEntity>>();

    List<Triple<String, ClientOperation, String>> parsedQuery = null;
    parsedQuery = SearchCommonUtil.parseQueryString(queryString);

    if (null == parsedQuery) {
      parsedQuery = new ArrayList<Triple<String, ClientOperation, String>>();
    }
    
    List<HotspringEntity> queryResultList = getBaseService().query(parsedQuery);
    List<HotspringEntity> rtnResultList = directorQueryResult(queryResultList);
    
    ret.setData(rtnResultList);
    return ret;
  }
  
  /**
   * 查询满足给定查询条件的信息。只查询指定字段
   * 
   * @param queryString
   * @return
   */
  @RequestMapping(value = "/frontshow/fileds/search", params = {QueryConstants.Q_PARAM}, method = RequestMethod.GET)
  @ResponseBody
  public Object searchFiledsAll(Model model, @RequestParam(QueryConstants.Q_PARAM) final String queryString) {

    ServiceResponse<List<HotspringEntity>> ret = new ServiceResponse<List<HotspringEntity>>();

    List<Triple<String, ClientOperation, String>> parsedQuery = null;
    parsedQuery = SearchCommonUtil.parseQueryString(queryString);

    if (null == parsedQuery) {
      parsedQuery = new ArrayList<Triple<String, ClientOperation, String>>();
    }
    
    List<HotspringEntity> queryResultList = getBaseService().query(filedNameMap, parsedQuery);
    List<HotspringEntity> rtnResultList = directorQueryResult(queryResultList);
    
    ret.setData(rtnResultList);
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
  @RequestMapping(value = "/frontshow/pagesearch",params = {QueryConstants.Q_PARAM, QueryConstants.START, QueryConstants.SIZE}, method = RequestMethod.GET)
  @ResponseBody
  public Object searchAllPaginated(Model model, 
      @RequestParam(QueryConstants.Q_PARAM) final String queryString,
      @RequestParam(value = QueryConstants.START) final int start,
      @RequestParam(value = QueryConstants.SIZE) final int size,
      HttpServletRequest request) {

    ServiceResponse<PaginationResult<HotspringEntity>> ret = new ServiceResponse<PaginationResult<HotspringEntity>>();

    List<Triple<String, ClientOperation, String>> parsedQuery = null;
    parsedQuery = SearchCommonUtil.parseQueryString(queryString);
    if (null == parsedQuery) {
      parsedQuery = new ArrayList<Triple<String, ClientOperation, String>>();
    }

    PaginationResult queryResultPagination = getBaseService().query(start, size, parsedQuery);
    List<HotspringEntity> queryResultList = queryResultPagination.getItems();
    List<HotspringEntity> rtnResultList = directorQueryResult(queryResultList);
    ret.setData(new PaginationResult<HotspringEntity>(rtnResultList, queryResultPagination.getTotalItemNum(), size, start));
    return ret;
  }
  
  /**
   * 按页查询给定查询条件的信息。只查询指定字段
   * 
   * @param queryString
   * @param page
   * @param size
   * @return
   */
  @RequestMapping(value = "/frontshow/fileds/pagesearch",params = {QueryConstants.Q_PARAM, QueryConstants.START, QueryConstants.SIZE}, method = RequestMethod.GET)
  @ResponseBody
  public Object searchFiledsAllPaginated(Model model, 
      @RequestParam(QueryConstants.Q_PARAM) final String queryString,
      @RequestParam(value = QueryConstants.START) final int start,
      @RequestParam(value = QueryConstants.SIZE) final int size,
      HttpServletRequest request) {

    ServiceResponse<PaginationResult<HotspringEntity>> ret = new ServiceResponse<PaginationResult<HotspringEntity>>();

    List<Triple<String, ClientOperation, String>> parsedQuery = null;
    parsedQuery = SearchCommonUtil.parseQueryString(queryString);
    if (null == parsedQuery) {
      parsedQuery = new ArrayList<Triple<String, ClientOperation, String>>();
    }

    PaginationResult queryResultPagination = getBaseService().query(start, size, filedNameMap, parsedQuery);
    List<HotspringEntity> queryResultList = queryResultPagination.getItems();
    List<HotspringEntity> rtnResultList = directorQueryResult(queryResultList);
    ret.setData(new PaginationResult<HotspringEntity>(rtnResultList, queryResultPagination.getTotalItemNum(), size, start));
    return ret;
  }

  /**
   * 装饰结果数据，用于前台显示
   * 
   * @param queryResultList
   * @return
   */
  private List<HotspringEntity> directorQueryResult(List<HotspringEntity> queryResultList) {
    List<HotspringEntity> rtnResultList = new ArrayList<HotspringEntity>();
    if(queryResultList!=null && !queryResultList.isEmpty()){
      for(HotspringEntity hotspringEntity : queryResultList){
        // 设置封面图片
        hotspringEntity.setCoverimagename(
            BaseImageUploadController.projectBase+BaseImageUploadController.uploadPath+hotspringEntity.getImagelibrarykey()
            +"/"+hotspringEntity.getCoverimagename());
        
        
        rtnResultList.add(hotspringEntity);
      }
    }
    return rtnResultList;
  }
}
