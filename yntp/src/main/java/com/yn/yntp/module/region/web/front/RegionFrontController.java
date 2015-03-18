package com.yn.yntp.module.region.web.front;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.yn.yntp.common.web.controller.BaseCRUDController;
import com.yn.yntp.module.region.entity.RegionEntity;

/**
 * 
 * @Title: TourismController.java 
 * @Package com.yn.yntp.module.tourism.web 
 * @Description: TODO(用一句话描述该文件做什么) 
 *
 * @author liucc    
 * @date 2014年11月22日 下午3:40:39 
 * @version V1.0 
 */

@Controller
@RequestMapping("/front/region/region")
public class RegionFrontController extends BaseCRUDController<RegionEntity,Long>{


}
