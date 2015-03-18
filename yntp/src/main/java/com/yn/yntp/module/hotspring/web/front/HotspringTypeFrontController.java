package com.yn.yntp.module.hotspring.web.front;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.yn.yntp.common.web.controller.BaseQueryController;
import com.yn.yntp.module.hotspring.entity.HotspringTypeEntity;

/**
 * 
 * @Title: ScenicTypeFrontController.java 
 * @Package com.yn.yntp.module.scenic.web.front 
 * @Description: TODO(用一句话描述该文件做什么) 
 *
 * @author liucc    
 * @date 2015年1月25日 下午9:23:56 
 * @version V1.0 
 */

@Controller
@RequestMapping("/front/hotspring/hotspringtype")
public class HotspringTypeFrontController extends BaseQueryController<HotspringTypeEntity,Long>{


}
