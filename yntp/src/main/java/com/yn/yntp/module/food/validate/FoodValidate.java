package com.yn.yntp.module.food.validate;

import org.springframework.stereotype.Component;

import com.yn.yntp.common.validate.DefaultValidate;
import com.yn.yntp.module.food.entity.FoodEntity;

/**
 * 
 * @Title: NationalSpecialValidate.java 
 * @Package com.yn.yntp.module.nationalspecial.validate 
 * @Description: TODO(用一句话描述该文件做什么) 
 *
 * @author liucc    
 * @date 2015年1月17日 下午2:01:20 
 * @version V1.0 
 */

@Component
public class FoodValidate extends DefaultValidate<FoodEntity, Long> {
}
