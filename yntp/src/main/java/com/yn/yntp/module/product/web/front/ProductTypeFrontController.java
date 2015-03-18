package com.yn.yntp.module.product.web.front;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang3.tuple.ImmutableTriple;
import org.apache.commons.lang3.tuple.Triple;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.yn.yntp.common.entity.response.ServiceResponse;
import com.yn.yntp.common.entity.search.ClientOperation;
import com.yn.yntp.common.web.controller.BaseQueryController;
import com.yn.yntp.common.web.vo.TreeOptionVO;
import com.yn.yntp.module.product.entity.ProductTypeEntity;
import com.yn.yntp.module.product.service.ProductTypeService;

/**
 * 
 * @Title: ProductTypeFrontController.java 
 * @Package com.yn.yntp.module.product.web.front 
 * @Description: TODO(用一句话描述该文件做什么) 
 *
 * @author liucc    
 * @date 2015年3月13日 上午9:15:48 
 * @version V1.0 
 */
@Controller
@RequestMapping("/front/product/producttype")
public class ProductTypeFrontController extends BaseQueryController<ProductTypeEntity,Long>{
  
  private ProductTypeService getProductTypeService() {
    return (ProductTypeService) getBaseService();
  }
  
  /**
   * 查询两层数据，用于特产首页的滑动门菜单显示
   * 
   * @param model
   * @param level
   * @return
   */
  @RequestMapping(value = "/navslide",method = RequestMethod.GET)
  @ResponseBody
  public Object getProductTreeTableVOByLevel(Model model){
    ServiceResponse<List<TreeOptionVO>> ret = new ServiceResponse<List<TreeOptionVO>>();
    // 查询出数据，只查询2层
    List<Triple<String, ClientOperation, String>> parsedQuery =  new ArrayList<Triple<String, ClientOperation, String>>();
    parsedQuery.add(new ImmutableTriple<String, ClientOperation, String>("level", ClientOperation.LE, String.valueOf(2)));
    
    List<ProductTypeEntity> resultList = getProductTypeService().query(parsedQuery);
    if(resultList == null || resultList.isEmpty()){
      ret.setRetmsg("没有查询到数据");
      return ret;
    }
    // 构建所需的树表数据结构，两层数据
    List<TreeOptionVO> treeTableVOList = buildTreeTableVOList(resultList);
    ret.setData(treeTableVOList);
    return ret;
  }
  
  /**
   * 将数据库数据转化为需要的树表数据列表
   * 
   * @param resultList
   * @return
   */
  private List<TreeOptionVO> buildTreeTableVOList(List<ProductTypeEntity> resultList) {
    // 构造TreeVO
    List<TreeOptionVO> treeVOList = new ArrayList<TreeOptionVO>();
    Map<Long, TreeOptionVO> entityMap = new HashMap<Long, TreeOptionVO>();
    
    for(ProductTypeEntity productTypeEntity : resultList ){
      if(productTypeEntity.getLevel().equals(1)){
        
        TreeOptionVO treeOptionVO = buildTreeVO(productTypeEntity,null);
        if(!entityMap.containsKey(productTypeEntity.getId())){
          entityMap.put(productTypeEntity.getId(), treeOptionVO);
        }
        treeVOList.add(treeOptionVO);
      } else{
        TreeOptionVO parentNode = entityMap.get(productTypeEntity.getParent_id());
        TreeOptionVO treeOptionVO = buildTreeVO(productTypeEntity,parentNode);
      }
    }
    return treeVOList;
  }

  /**
   * 将数据转化为需要的实体
   * 
   * @param productTypeEntity
   * @return
   */
  private TreeOptionVO buildTreeVO(ProductTypeEntity productTypeEntity,TreeOptionVO parentNode) {
    TreeOptionVO treeOptionVO = new TreeOptionVO();
    treeOptionVO.setNodeData(productTypeEntity);
   
    if(parentNode == null)
      return treeOptionVO;
    
    treeOptionVO.setParentID(((ProductTypeEntity)parentNode.getNodeData()).getId());
    if(parentNode.getChildrenNodeList() != null){
      parentNode.addChildNode(treeOptionVO);
    } else {
      List<TreeOptionVO> childrenNodeList = new ArrayList<TreeOptionVO>();
      childrenNodeList.add(treeOptionVO);
      parentNode.setChildrenNodeList(childrenNodeList);
    }
    return treeOptionVO;
  }
}
