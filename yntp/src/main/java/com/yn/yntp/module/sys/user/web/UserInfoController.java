package com.yn.yntp.module.sys.user.web;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.validation.Valid;

import org.apache.commons.lang3.tuple.ImmutableTriple;
import org.apache.commons.lang3.tuple.Triple;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.yn.yntp.common.entity.response.ServiceResponse;
import com.yn.yntp.common.entity.search.ClientOperation;
import com.yn.yntp.common.validate.ReturnInfo;
import com.yn.yntp.common.web.controller.BaseCRUDController;
import com.yn.yntp.common.web.vo.SelectOptionVO;
import com.yn.yntp.module.scenic.service.ScenicTypeService;
import com.yn.yntp.module.sys.user.entity.UserEntity;
import com.yn.yntp.module.sys.user.entity.UserInfoEntity;
import com.yn.yntp.module.sys.user.service.UserInfoService;

@Controller
@RequestMapping("/admin/sys/user/userinfo")
public class UserInfoController  extends BaseCRUDController<UserInfoEntity, Long>{
	
	 private UserInfoService getUserInfoService() {
		    return (UserInfoService) getBaseService();
		  }
	 
	 
	 /**
	   * 修改用户个人资料
	   * 
	   * @param id
	   * @param resource
	   */
	  @RequestMapping(value = "/update/{id}", method = RequestMethod.POST)
	  @ResponseBody
	  @Override
	  public Object update(Model model, @PathVariable("id") final Long id,
			@Valid @ModelAttribute final UserInfoEntity resource,
			BindingResult result) {
		ServiceResponse<String> ret = new ServiceResponse<String>();
		List<Triple<String, ClientOperation, String>> parsedQuery = new ArrayList<Triple<String, ClientOperation, String>>();
		parsedQuery.add(new ImmutableTriple<String, ClientOperation, String>(
				"id", ClientOperation.EQ, String.valueOf(resource.getId())));
	    // 1 自动注入实体是否有错
	    if (super.hasError(resource, result)) {
	      ret.setRetcode("100000");
	      ret.setRetmsg(super.getErrors(result));
	      return ret;
	    }
	    // 2 更新前校验是否有错
	    getDefaultValidate().setEntity(resource);
	    ReturnInfo validate = getDefaultValidate().validateUpdate();
	    if (validate != null && Boolean.FALSE == validate.getFlag()) {
	      ret.setRetcode("100000");
	      ret.setRetmsg(validate.getMsg());
	      return ret;
	    }

	    // 3 保存对象
	    Map<String, Object> filedNameMap = new HashMap<String, Object>();
	    SimpleDateFormat bdformat = new SimpleDateFormat("yyyy-MM-dd");
	    if(resource.getBirthday()!=null||!resource.getBirthday().equals("")){
	    	String bdTime = bdformat.format(resource.getBirthday());
	    filedNameMap.put("birthday", bdTime);
	    }
	    if(resource.getName()!=null||resource.getName()!=""){
		    filedNameMap.put("name", resource.getName());
		    }
	    if(resource.getNickname()!=null||resource.getNickname()!=""){
	    	filedNameMap.put("nickname", resource.getNickname());
	    }
	    if(resource.getPerson_code()!=null||resource.getPerson_code()!=""){
	    	filedNameMap.put("person_code", resource.getPerson_code());
	    }
	    if(resource.getSex()!=null||!resource.getSex().equals("")){
	    	filedNameMap.put("sex", resource.getSex());
	    }
		Date date = new Date();
		 SimpleDateFormat sdformat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String LgTime = sdformat.format(date);
		filedNameMap.put("updatetime", LgTime);
		getUserInfoService().update(filedNameMap, parsedQuery);
	    return ret;
	  }
}
