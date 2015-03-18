package com.yn.yntp.module.nationalspecial.web;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.yn.yntp.common.web.controller.BaseCRUDController;
import com.yn.yntp.module.nationalspecial.entity.NationalSpecialOrderEntity;

/**
 * 
 * @Title: NationalSpecialController.java 
 * @Package com.yn.yntp.module.nationalspecial.web 
 * @Description: TODO(用一句话描述该文件做什么) 
 *
 * @author liucc    
 * @date 2015年1月17日 下午2:02:23 
 * @version V1.0 
 */

@Controller
@RequestMapping("/admin/business/nationalspecialorder")
public class NationalSpecialOrderController extends
    BaseCRUDController<NationalSpecialOrderEntity, Long> {

}
