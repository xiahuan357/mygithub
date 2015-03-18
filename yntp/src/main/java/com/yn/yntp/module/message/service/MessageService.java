package com.yn.yntp.module.message.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.yn.yntp.common.persistence.service.BaseServiceImpl;
import com.yn.yntp.module.message.entity.MessageEntity;

/**
 * 
 * @Title: MessageService.java 
 * @Package com.yn.yntp.module.message.service 
 * @Description: TODO(用一句话描述该文件做什么) 
 *
 * @author liucc    
 * @date 2015年1月27日 下午8:14:06 
 * @version V1.0 
 */

@Service
@Transactional
public class MessageService extends BaseServiceImpl<MessageEntity, Long> {

}
