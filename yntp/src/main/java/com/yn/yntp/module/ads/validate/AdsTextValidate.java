package com.yn.yntp.module.ads.validate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.yn.yntp.common.validate.DefaultValidate;
//import com.yn.yntp.module.ads.entity.AdsEntity;
import com.yn.yntp.module.ads.entity.AdsTextEntity;
//import com.yn.yntp.module.ads.service.adsService;
import com.yn.yntp.module.ads.service.AdsTextService;

/**
 * 
 * 
 * @Title: AdsTextValidate.java
 * @Package com.yn.yntp.module.ads.validate
 * @Description: TODO(用一句话描述该文件做什么)
 *
 * @author cuilz
 * @date 2014年12月10日 上午10:09:16
 * @version V1.0
 */
@Component
public class AdsTextValidate extends DefaultValidate<AdsTextEntity, Long> {

  @Autowired
  private AdsTextService adsTextService;

}
