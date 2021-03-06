package com.yn.yntp.module.hotel.web;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang3.tuple.ImmutableTriple;
import org.apache.commons.lang3.tuple.Triple;
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
import com.yn.yntp.common.web.controller.BaseCRUDWithImageLibraryController;
import com.yn.yntp.common.web.vo.SelectOptionVO;
import com.yn.yntp.module.hotel.entity.HotelRoomEntity;
import com.yn.yntp.module.hotel.entity.HotelRoomImageEntity;
import com.yn.yntp.module.hotel.entity.RoomBathTypeEnum;
import com.yn.yntp.module.hotel.entity.RoomBreakfastTypeEnum;
import com.yn.yntp.module.hotel.entity.RoomBroadbandTypeEnum;
import com.yn.yntp.module.hotel.entity.RoomWindowsTypeEnum;

/**
 * 
 * @Title: HotelRoomController.java 
 * @Package com.yn.yntp.module.hotel.web 
 * @Description: TODO(用一句话描述该文件做什么) 
 *
 * @author liucc    
 * @date 2015年1月16日 下午2:47:23 
 * @version V1.0 
 */

@Controller
@RequestMapping("/admin/business/hotelroom")
public class HotelRoomController extends
    BaseCRUDWithImageLibraryController<HotelRoomEntity, Long> {
  
  /**
   * 根据商家id和条件查询列表，只查询部分列
   * 
   * @param model
   * @param queryString
   * @return
   */
  @RequestMapping(value = "/search/{hotelid}/roomlist", params = {QueryConstants.Q_PARAM}, method = RequestMethod.GET)
  @ResponseBody
  public Object getroomlist(Model model,@PathVariable("hotelid") final Long hotel_id,
      @RequestParam(QueryConstants.Q_PARAM) final String queryString) {

    ServiceResponse<List<HotelRoomEntity>> ret = new ServiceResponse<List<HotelRoomEntity>>();

    List<Triple<String, ClientOperation, String>> parsedQuery = null;
    // 根据用户条件构造查询三元组
    parsedQuery = SearchCommonUtil.parseQueryString(queryString);

    if(parsedQuery == null){
      parsedQuery =  new ArrayList<Triple<String, ClientOperation, String>>();
    }
    // 添加商家id
    parsedQuery.add(new ImmutableTriple<String, ClientOperation, String>("hotel_id", ClientOperation.EQ, String.valueOf(hotel_id)));
    
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
  @RequestMapping(value = "/pagesearch/{hotelid}/roomlist", params = {
    QueryConstants.Q_PARAM, QueryConstants.START, QueryConstants.SIZE
  }, method = RequestMethod.GET)
  @ResponseBody
  public Object searchAllPaginated(Model model,
      @PathVariable("hotelid") final Long hotel_id,
      @RequestParam(QueryConstants.Q_PARAM) final String queryString,
      @RequestParam(value = QueryConstants.START) final int start,
      @RequestParam(value = QueryConstants.SIZE) final int size,
      HttpServletRequest request) {

    ServiceResponse<PaginationResult<HotelRoomEntity>> ret =
        new ServiceResponse<PaginationResult<HotelRoomEntity>>();

    List<Triple<String, ClientOperation, String>> parsedQuery = null;
    parsedQuery = SearchCommonUtil.parseQueryString(queryString);
    if (null == parsedQuery) {
      parsedQuery = new ArrayList<Triple<String, ClientOperation, String>>();
    }
 
    // 添加商家id
    parsedQuery.add(new ImmutableTriple<String, ClientOperation, String>("hotel_id", ClientOperation.EQ, String.valueOf(hotel_id)));

    ret.setData(getBaseService().query(start, size, parsedQuery));
    return ret;
  }
  
  //------------------------------ createWithImage ----------------------------------
  /**
   * 新增一个资源。带图片
   * 
   * @param resource
   */
  @RequestMapping(value = "/{hotelid}/createwithimage", method = RequestMethod.POST)
  @ResponseBody
  public Object createWithImage(Model model,
      @Validated @RequestBody HotelRoomImageEntity resource,
      BindingResult result, HttpServletRequest request) {
    return super.createWithImage(model, resource.getCurrentEntity(), result, resource.getImagelist(), request);
  }

  // ------------------------------ updateWithImage ----------------------------------
  /**
   * 更新资源。带图片
   * 
   * @param id
   * @param resource
   */
  @RequestMapping(value = "/{hotelid}/updatewithimage/{id}" ,method = RequestMethod.POST)
  @ResponseBody
  public Object updateWithImage(Model model, @PathVariable("id") final Long id,
      @Validated @RequestBody HotelRoomImageEntity resource,
      BindingResult result,
      HttpServletRequest request) {
    HotelRoomEntity currentEntity = resource.getCurrentEntity();
    
    return super.updateWithImage(model, id, currentEntity, result, resource.getImagelist(), request);
  }

  //------------------------------ deleteWithImage ----------------------------------
  /**
   * 删除
   */
  @RequestMapping(value = "deletewithimage/{id}", method = RequestMethod.DELETE)
  @ResponseBody
  public Object deleteWithImage(Model model, @PathVariable("id") final Long id,
      @ModelAttribute final HotelRoomEntity resource, HttpServletRequest request) {
    // 调用基类删除
    return super.deleteWithImage(model, id, resource, request);
  }
  
  //------------------------------ query data ----------------------------------
  /**
   * 查询早餐类型
   * 
   * @return
   */
  @RequestMapping(value = "/breakfasttype/getselectmodel")
  @ResponseBody
  public Object searchBreakfastSelectModel(){
    ServiceResponse<List<SelectOptionVO>> ret = new ServiceResponse<List<SelectOptionVO>>();
    
    List<SelectOptionVO> optionList = new ArrayList<SelectOptionVO>();
    for (RoomBreakfastTypeEnum item : RoomBreakfastTypeEnum.values()){
      SelectOptionVO option = new SelectOptionVO(item.getId(),item.getName());
      optionList.add(option);
    }
    ret.setData(optionList);
    return ret;
  }
  
  /**
   * 查询窗户类型
   * 
   * @return
   */
  @RequestMapping(value = "/windowstype/getselectmodel")
  @ResponseBody
  public Object searchWindowsSelectModel(){
    ServiceResponse<List<SelectOptionVO>> ret = new ServiceResponse<List<SelectOptionVO>>();
    
    List<SelectOptionVO> optionList = new ArrayList<SelectOptionVO>();
    for (RoomWindowsTypeEnum item : RoomWindowsTypeEnum.values()){
      SelectOptionVO option = new SelectOptionVO(item.getId(),item.getName());
      optionList.add(option);
    }
    ret.setData(optionList);
    return ret;
  }
  
  /**
   * 查询卫浴类型
   * 
   * @return
   */
  @RequestMapping(value = "/bathtype/getselectmodel")
  @ResponseBody
  public Object searchBathSelectModel(){
    ServiceResponse<List<SelectOptionVO>> ret = new ServiceResponse<List<SelectOptionVO>>();
    
    List<SelectOptionVO> optionList = new ArrayList<SelectOptionVO>();
    for (RoomBathTypeEnum item : RoomBathTypeEnum.values()){
      SelectOptionVO option = new SelectOptionVO(item.getId(),item.getName());
      optionList.add(option);
    }
    ret.setData(optionList);
    return ret;
  }
  
  /**
   * 查询宽带类型
   * 
   * @return
   */
  @RequestMapping(value = "/broadbandtype/getselectmodel")
  @ResponseBody
  public Object searchBroadbandSelectModel(){
    ServiceResponse<List<SelectOptionVO>> ret = new ServiceResponse<List<SelectOptionVO>>();
    
    List<SelectOptionVO> optionList = new ArrayList<SelectOptionVO>();
    for (RoomBroadbandTypeEnum item : RoomBroadbandTypeEnum.values()){
      SelectOptionVO option = new SelectOptionVO(item.getId(),item.getName());
      optionList.add(option);
    }
    ret.setData(optionList);
    return ret;
  }
}