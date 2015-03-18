package com.yn.yntp.common.web.controller.validate;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.yn.yntp.common.tool.RandomValidateCode;

/**
 * 
 * @Title: ValidateCodeController.java 
 * @Package com.yn.yntp.common.web.controller 
 * @Description: 验证码控制器
 *
 * @author liucc    
 * @date 2014年11月21日 下午9:48:04 
 * @version V1.0
 */
@Controller
@RequestMapping("/front")
public class ValidateCodeController {

	private final Logger logger = LoggerFactory.getLogger(ValidateCodeController.class);
	private Map<String, String> codeMap = new HashMap<String, String>();

	/**
	 * 生成验证码图片流
	 * @param ts
	 * @param request
	 * @param response
	 * @throws ServletException
	 * @throws IOException
	 */
	@RequestMapping(value = "/generatecode", method = RequestMethod.GET)
	@ResponseBody
	public void getIdentifyCode(@RequestParam("ts") String ts,
			HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		response.setContentType("image/jpeg;charset=UTF-8");// 设置相应类型,告诉浏览器输出的内容为图片
		response.setHeader("Pragma", "No-cache");// 设置响应头信息，告诉浏览器不要缓存此内容
		response.setHeader("Cache-Control", "no-cache");
		response.setDateHeader("Expire", 0);

		RandomValidateCode randomValidateCode = new RandomValidateCode();
		try {
			String generatedRandomString = randomValidateCode.getRandcode(request, response);// //输出图片方法
			codeMap.put(ts, generatedRandomString);
		} catch (Exception e) {
			System.out.print(e);
			final String currentMethod = this.getClass().getName() + " " + Thread.currentThread().getStackTrace()[1].getMethodName();
			logger.error("Exception on " + currentMethod);
			logger.warn("Exception on " + currentMethod, e);
		}
	}

	/**
	 * 校验验证码
	 * @param ts
	 * @param input
	 * @param request
	 * @param response
	 * @return
	 * @throws ServletException
	 * @throws IOException
	 */
	@RequestMapping(value = "/checkcode", method = RequestMethod.GET)
	@ResponseBody
	public Boolean checkCode(@RequestParam("ts") String ts,
			@RequestParam("userinput") String input,
			HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		try {
			String code = codeMap.get(ts);
			if (code != null && input.equalsIgnoreCase(code)){
				return true;
			} else{
				return false;
			}
		} catch (Exception e) {
			System.out.print(e);
			final String currentMethod = this.getClass().getName() + " " + Thread.currentThread().getStackTrace()[1].getMethodName();
			logger.error("Exception on " + currentMethod);
			logger.warn("Exception on " + currentMethod, e);
			return false;
		}
	}
}
