package com.yn.yntp.common.web.controller;

import java.io.Serializable;
import java.util.List;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;

import com.yn.yntp.common.entity.BaseImageLibraryEntity;
import com.yn.yntp.common.entity.response.ServiceResponse;
import com.yn.yntp.common.web.controller.upload.ImageLibraryUploadController;

/**
 * 
 * @Title: BaseCRUDWithImageLibraryController.java 
 * @Package com.yn.yntp.common.web.controller 
 * @Description: 用于包含图片库和详细信息的模块，这里的景点，线路，酒店，汽车，装备，美食，特产，继承此类
 *
 * @author liucc    
 * @date 2015年1月19日 上午11:30:01 
 * @version V1.0 
 */

public class BaseCRUDWithImageLibraryController<M extends BaseImageLibraryEntity, ID extends Serializable>
     extends BaseCRUDController<M, ID> {
  @Autowired
  protected ImageLibraryUploadController imageUploader;
  
  //------------------------------ createWithImage ----------------------------------
  /**
   * 新增一个资源。带图片
   * 
   * @param resource
   */
  public Object createWithImage(Model model, @Validated M resource,
      BindingResult result, List<String> imagelist, HttpServletRequest request) {
    ServiceResponse<Object> ret;
    ret = (ServiceResponse<Object>) super.create(model, resource, result);
    if (ret.getRetcode() != "000000") {
      return ret;
    }

    // 针对UEditor，处理上传的图片，因为有上传，但是删除的，那么需要将删除的图片从服务器删除
    List<String> avilabelImageList = imagelist;
    ServletContext sc = request.getSession().getServletContext();
    String serverBase = sc.getRealPath("/");

    imageUploader.clearUnUsedImage(serverBase, avilabelImageList, resource.getImagekey());
    return ret;
  }

  // ------------------------------ updateWithImage ----------------------------------
  /**
   * 更新资源。带图片
   * 
   * @param id
   * @param resource
   */
  public Object updateWithImage(Model model, final ID id,
      @Validated M resource, BindingResult result, List<String> imagelist,
      HttpServletRequest request) {
    ServiceResponse<Object> ret;
    
    ret = (ServiceResponse<Object>) super.update(model, id, resource, result);
    if (ret.getRetcode() != "000000") {
      return ret;
    }
    
    // 针对UEditor，处理上传的图片，因为有上传，但是删除的，那么需要将删除的图片从服务器删除
    List<String> avilabelImageList = imagelist;
    ServletContext sc = request.getSession().getServletContext();
    String serverBase = sc.getRealPath("/");
    imageUploader.clearUnUsedImage(serverBase,avilabelImageList,resource.getImagekey());
    return ret;
  }

  // ------------------------------ deleteWithImage ----------------------------------
  /**
   * 删除线路时，需要将线路下面的行程，删除之前需要判断是否有订单，评论。。。。
   * 
   * @param id
   */
  public Object deleteWithImage(Model model, final ID id,
      final M resource, HttpServletRequest request) {
    ServiceResponse<Object> ret = (ServiceResponse<Object>) super.delete(model, id);
    
    if (ret.getRetcode() != "000000") {
      return ret;
    }
    
    // 删除逻辑。。删除线路，删除行
    ServletContext sc = request.getSession().getServletContext();
    String serverBase = sc.getRealPath("/");

    // 删除UEditor的图片
    imageUploader.clearFolderImage(serverBase, resource.getImagekey());
    // 删除图库中图片
    imageUploader.clearFolderImage(serverBase, resource.getImagelibrarykey());
    return ret;
  }
}
