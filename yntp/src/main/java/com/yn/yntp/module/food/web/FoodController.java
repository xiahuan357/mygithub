package com.yn.yntp.module.food.web;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang3.tuple.ImmutableTriple;
import org.apache.commons.lang3.tuple.Triple;
import org.hibernate.type.BasicType;
import org.hibernate.type.StandardBasicTypes;
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

import com.yn.yntp.common.constant.Constants;
import com.yn.yntp.common.entity.pagination.PaginationResult;
import com.yn.yntp.common.entity.response.ServiceResponse;
import com.yn.yntp.common.entity.search.ClientOperation;
import com.yn.yntp.common.entity.search.QueryConstants;
import com.yn.yntp.common.persistence.search.SearchCommonUtil;
import com.yn.yntp.common.web.controller.BaseCRUDWithImageLibraryController;
import com.yn.yntp.module.food.entity.FoodEntity;
import com.yn.yntp.module.food.entity.FoodImageEntity;
import com.yn.yntp.module.sys.user.entity.UserEntity;

/**
 * 
 * @Title: NationalSpecialController.java 
 * @Package com.yn.yntp.module.food.web 
 * @Description: TODO(用一句话描述该文件做什么) 
 *
 * @author liucc    
 * @date 2015年1月17日 下午2:02:23 
 * @version V1.0 
 */

@Controller
@RequestMapping("/admin/business/food")
public class FoodController extends
    BaseCRUDWithImageLibraryController<FoodEntity, Long> {

  static Map<String, BasicType> filedNameMap = new HashMap<String, BasicType>();
  static {
    filedNameMap.put("id", StandardBasicTypes.LONG);
    filedNameMap.put("name", StandardBasicTypes.STRING);
    filedNameMap.put("imagekey", StandardBasicTypes.STRING);
  }
  
  /**
   * 根据商家id和条件查询列表，只查询部分列
   * 
   * @param model
   * @param queryString
   * @return
   */
  @RequestMapping(value = "/search/{businessid}/foodlist", params = {QueryConstants.Q_PARAM}, method = RequestMethod.GET)
  @ResponseBody
  public Object getfoodlist(Model model,@PathVariable("businessid") final Long business_id,
      @RequestParam(QueryConstants.Q_PARAM) final String queryString) {

    ServiceResponse<List<FoodEntity>> ret = new ServiceResponse<List<FoodEntity>>();

    List<Triple<String, ClientOperation, String>> parsedQuery = null;
    // 根据用户条件构造查询三元组
    parsedQuery = SearchCommonUtil.parseQueryString(queryString);

    if(parsedQuery == null){
      parsedQuery =  new ArrayList<Triple<String, ClientOperation, String>>();
    }
    // 添加商家id
    parsedQuery.add(new ImmutableTriple<String, ClientOperation, String>("business_id", ClientOperation.EQ, String.valueOf(business_id)));
    
    // 后台管理列表只显示特定列，不需要显示所有的数据，这样能节省带宽
    ret.setData(getBaseService().query(filedNameMap, parsedQuery));
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
  @RequestMapping(value = "/pagesearch/{businessid}/foodlist", params = {
    QueryConstants.Q_PARAM, QueryConstants.START, QueryConstants.SIZE
  }, method = RequestMethod.GET)
  @ResponseBody
  public Object searchAllPaginated(Model model,
      @PathVariable("businessid") final Long business_id,
      @RequestParam(QueryConstants.Q_PARAM) final String queryString,
      @RequestParam(value = QueryConstants.START) final int start,
      @RequestParam(value = QueryConstants.SIZE) final int size,
      HttpServletRequest request) {

    ServiceResponse<PaginationResult<FoodEntity>> ret =
        new ServiceResponse<PaginationResult<FoodEntity>>();

    List<Triple<String, ClientOperation, String>> parsedQuery = null;
    parsedQuery = SearchCommonUtil.parseQueryString(queryString);
    if (null == parsedQuery) {
      parsedQuery = new ArrayList<Triple<String, ClientOperation, String>>();
    }
 
    // 添加商家id
    parsedQuery.add(new ImmutableTriple<String, ClientOperation, String>("business_id", ClientOperation.EQ, String.valueOf(business_id)));

    ret.setData(getBaseService().query(start, size, filedNameMap, parsedQuery));
    return ret;
  }
  
  //------------------------------ createWithImage ----------------------------------
  /**
   * 新增一个资源。带图片
   * 
   * @param resource
   */
  @RequestMapping(value = "/{businessid}/createwithimage", method = RequestMethod.POST)
  @ResponseBody
  public Object createWithImage(Model model,
      @Validated @RequestBody FoodImageEntity resource, BindingResult result,
      HttpServletRequest request) {
    ServiceResponse<Object> ret;
    // 加工数据
    UserEntity userEntity = (UserEntity) request.getSession().getAttribute(Constants.CURRENT_USER);
    FoodEntity currentEntity = resource.getCurrentEntity();
    currentEntity.setBusiness_id(userEntity.getId());
    
    // 调用基类保存
    return super.createWithImage(model, currentEntity, result, resource.getImagelist(), request);
  }

  // ------------------------------ updateWithImage ----------------------------------
  /**
   * 更新资源。带图片
   * 
   * @param id
   * @param resource
   */
  @RequestMapping(value = "/{businessid}/updatewithimage/{id}" ,method = RequestMethod.POST)
  @ResponseBody
  public Object updateWithImage(Model model, @PathVariable("id") final Long id,
      @Validated @RequestBody FoodImageEntity resource, BindingResult result,
      HttpServletRequest request) {
    ServiceResponse<Object> ret;
    // 加工数据
    UserEntity userEntity = (UserEntity) request.getSession().getAttribute(Constants.CURRENT_USER);
    FoodEntity currentEntity = resource.getCurrentEntity();
    currentEntity.setBusiness_id(userEntity.getId());
    
    // 调用基类保存
    return super.updateWithImage(model,id, currentEntity, result, resource.getImagelist(), request);
  }

  // ------------------------------ deleteWithImage ----------------------------------
  /**
   * 删除之前需要判断是否有订单，评论。。。。
   * 
   * @param id
   */
  @RequestMapping(value = "deletewithimage/{id}", method = RequestMethod.DELETE)
  @ResponseBody
  public Object deleteWithImage(Model model, @PathVariable("id") final Long id,
      @ModelAttribute final FoodEntity resource,
      HttpServletRequest request) {
    
    // 调用基类删除
    ServiceResponse<Object> ret;
    ret = (ServiceResponse<Object>) super.deleteWithImage(model, id, resource, request);
    return ret;
  }
}
