package com.yn.yntp.module.sys.user.web.front;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang3.tuple.ImmutableTriple;
import org.apache.commons.lang3.tuple.Triple;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.yn.yntp.common.email.entity.EmailMessageEntity;
import com.yn.yntp.common.email.service.EmailSendService;
import com.yn.yntp.common.entity.response.ServiceResponse;
import com.yn.yntp.common.entity.search.ClientOperation;
import com.yn.yntp.module.sys.user.entity.UserEntity;
import com.yn.yntp.module.sys.user.service.UserService;

@Controller
public class EmailModController {

  EmailSendService emailSendService = new EmailSendService();

  @Autowired
  private UserService userService;

  /**
   * 发送验证邮箱
   * 
   * @return
   */
  @RequestMapping(value = "/admin/email/validate/{email}/{id}", method = RequestMethod.GET)
  @ResponseBody
  public boolean searchSelectModel(@PathVariable("email") final String email,
      @PathVariable("id") final String id, @ModelAttribute UserEntity userEntity) {
    List<Triple<String, ClientOperation, String>> parsedQuery =
        new ArrayList<Triple<String, ClientOperation, String>>();
    parsedQuery.add(new ImmutableTriple<String, ClientOperation, String>("id",
        ClientOperation.EQ, String.valueOf(userEntity.getId())));
    List<UserEntity> user = userService.query(parsedQuery);
    if (user != null && user.size() > 0) {
      String pw = user.get(0).getPassword();
      EmailMessageEntity emailMessageEntity = new EmailMessageEntity();
      emailMessageEntity
          .setContent("你的验证链接为：http://localhost:8080/yntp/html/admin/customer/common/modemail_result.html?id="
              + id + "&validation=" + pw + "&email=" + email);
      emailMessageEntity.setDate(new Date());
      emailMessageEntity.setSubject("asdasd");
      emailMessageEntity.setToEmailAddress(email);
      Map<String, Object> filedNameMap = new HashMap<String, Object>();
      Date date = new Date();
      SimpleDateFormat sdformat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
      String LgTime = sdformat.format(date);
      filedNameMap.put("updatetime", LgTime);
      userService.update(filedNameMap, parsedQuery);
      return emailSendService.sendMail(emailMessageEntity);
    }
    else {
      return false;
    }
  }

  @RequestMapping(value = "/front/email/emailmod", method = RequestMethod.POST)
  @ResponseBody
  public Object emailmod(@RequestParam("id") String id,
      @RequestParam("email") String email,
      @RequestParam("validation") String validation) {
    ServiceResponse<String> ret = new ServiceResponse<String>();

    List<Triple<String, ClientOperation, String>> parsedQuery =
        new ArrayList<Triple<String, ClientOperation, String>>();
    parsedQuery.add(new ImmutableTriple<String, ClientOperation, String>("id",
        ClientOperation.EQ, String.valueOf(id)));
    parsedQuery.add(new ImmutableTriple<String, ClientOperation, String>(
        "password", ClientOperation.EQ, String.valueOf(validation)));

    List<UserEntity> resultList = userService.query(parsedQuery);
    if (resultList == null || resultList.isEmpty()) {
      ret.setRetcode("100000");
      ret.setRetmsg("用户凭证不对！");
      return ret;
    }

    UserEntity userEntity = resultList.get(0);
    parsedQuery = new ArrayList<Triple<String, ClientOperation, String>>();
    parsedQuery.add(new ImmutableTriple<String, ClientOperation, String>("id",
        ClientOperation.EQ, String.valueOf(id)));
    Map<String, Object> filedNameMap = new HashMap<String, Object>();
    filedNameMap.put("email", email);
    // 更改邮箱
    userService.update(filedNameMap, parsedQuery);
    ret.setRetcode("000000");
    ret.setRetmsg("您的邮箱已修改成功！您的新邮箱为：" + email);
    return ret;
  }
}
