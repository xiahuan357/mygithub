package com.yn.yntp.module.tourismline.web;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang3.tuple.ImmutableTriple;
import org.apache.commons.lang3.tuple.Triple;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.yn.yntp.common.entity.pagination.PaginationResult;
import com.yn.yntp.common.entity.response.ServiceResponse;
import com.yn.yntp.common.entity.search.ClientOperation;
import com.yn.yntp.common.entity.search.QueryConstants;
import com.yn.yntp.common.persistence.search.SearchCommonUtil;
import com.yn.yntp.common.web.controller.BaseCRUDWithImageController;
import com.yn.yntp.module.tourismline.entity.TourismlineEntity;
import com.yn.yntp.module.tourismline.entity.TourismlineTripEntity;
import com.yn.yntp.module.tourismline.entity.TourismlineTripImageEntity;
import com.yn.yntp.module.tourismline.service.TourismlineService;

/**
 * 
 * @Title: TourismlineTripController.java 
 * @Package com.yn.yntp.module.tourismline.web 
 * @Description: TODO(用一句话描述该文件做什么) 
 *
 * @author liucc    
 * @date 2015年1月15日 下午2:22:55 
 * @version V1.0 
 */

@Controller
@RequestMapping("/admin/business/tourismlinetrip")
public class TourismlineTripController extends BaseCRUDWithImageController<TourismlineTripEntity, Long> {
  
  @Autowired
  private TourismlineService tourismlineService;
  
  /**
   * 根据商家id和条件查询列表，只查询部分列
   * 
   * @param model
   * @param queryString
   * @return
   */
  @RequestMapping(value = "/search/{tourismlineid}/triplist", params = {QueryConstants.Q_PARAM}, method = RequestMethod.GET)
  @ResponseBody
  public Object getTourismlineList(Model model,@PathVariable("tourismlineid") final Long tourismline_id,
      @RequestParam(QueryConstants.Q_PARAM) final String queryString) {

    ServiceResponse<List<TourismlineEntity>> ret = new ServiceResponse<List<TourismlineEntity>>();

    List<Triple<String, ClientOperation, String>> parsedQuery = null;
    // 根据用户条件构造查询三元组
    parsedQuery = SearchCommonUtil.parseQueryString(queryString);

    if(parsedQuery == null){
      parsedQuery =  new ArrayList<Triple<String, ClientOperation, String>>();
    }
    // 添加商家id
    parsedQuery.add(new ImmutableTriple<String, ClientOperation, String>("tourismlineEntity.id", ClientOperation.EQ, String.valueOf(tourismline_id)));
    
    // 后台管理列表只显示特定列，不需要显示所有的数据，这样能节省带宽
    ret.setData(getBaseService().query( parsedQuery));
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
  @RequestMapping(value = "/pagesearch/{tourismlineid}/triplist", params = {
    QueryConstants.Q_PARAM, QueryConstants.START, QueryConstants.SIZE
  }, method = RequestMethod.GET)
  @ResponseBody
  public Object searchAllPaginated(Model model,
      @PathVariable("tourismlineid") final Long tourismline_id,
      @RequestParam(QueryConstants.Q_PARAM) final String queryString,
      @RequestParam(value = QueryConstants.START) final int start,
      @RequestParam(value = QueryConstants.SIZE) final int size,
      HttpServletRequest request) {

    ServiceResponse<PaginationResult<TourismlineEntity>> ret =
        new ServiceResponse<PaginationResult<TourismlineEntity>>();

    List<Triple<String, ClientOperation, String>> parsedQuery = null;
    parsedQuery = SearchCommonUtil.parseQueryString(queryString);
    if (null == parsedQuery) {
      parsedQuery = new ArrayList<Triple<String, ClientOperation, String>>();
    }
 
    // 添加商家id
    parsedQuery.add(new ImmutableTriple<String, ClientOperation, String>("tourismlineEntity.id", ClientOperation.EQ, String.valueOf(tourismline_id)));

    ret.setData(getBaseService().query(start, size, parsedQuery));
    return ret;
  }

  /**
   * 新增一个资源。带图片
   * 
   * @param resource
   */
  @RequestMapping(value = "/{tourismlineid}/createwithimage",method = RequestMethod.POST)
  @ResponseBody
  public Object createWithImage(Model model, @PathVariable("tourismlineid") final Long tourismline_id,
      @Validated @RequestBody  TourismlineTripImageEntity resource,BindingResult result,
      HttpServletRequest request) {
 
    // 数据加工
    TourismlineTripEntity currentEntity = resource.getCurrentEntity();
    TourismlineEntity tourismlineEntity = tourismlineService.queryById(tourismline_id);
    currentEntity.setTourismlineEntity(tourismlineEntity);
    
    return super.createWithImage(model, currentEntity, result, resource.getImagelist(), request);
  }

  // ------------------------------ updateWithImage ----------------------------------
  /**
   * 更新资源。带图片
   * 
   * @param id
   * @param resource
   */
  @RequestMapping(value = "/{tourismlineid}/updatewithimage/{id}" ,method = RequestMethod.POST)
  @ResponseBody
  public Object updateWithImage(Model model, @PathVariable("tourismlineid") final Long tourismline_id,
      @PathVariable("id") final Long id,
      @Validated @RequestBody  TourismlineTripImageEntity resource,BindingResult result,
      HttpServletRequest request) {
    // 数据加工
    TourismlineTripEntity currentEntity = resource.getCurrentEntity();
    TourismlineEntity tourismlineEntity = tourismlineService.queryById(tourismline_id);
    currentEntity.setTourismlineEntity(tourismlineEntity);
    
    return super.updateWithImage(model, id, currentEntity, result, resource.getImagelist(), request);
  }
  
  /**
   * 删除
   */
  @RequestMapping(value = "deletewithimage/{id}", method = RequestMethod.DELETE)
  @ResponseBody
  public Object deleteWithImage(Model model, @PathVariable("id") final Long id,
      @ModelAttribute final TourismlineTripEntity resource, HttpServletRequest request) {
    // 调用基类删除
    return super.deleteWithImage(model, id, resource, request);
  }

}
