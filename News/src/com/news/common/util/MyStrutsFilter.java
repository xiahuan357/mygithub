package com.news.common.util;

import java.io.IOException;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import org.apache.struts2.dispatcher.ng.filter.StrutsPrepareAndExecuteFilter;

public class MyStrutsFilter extends StrutsPrepareAndExecuteFilter {
	public void doFilter(ServletRequest req, ServletResponse res,FilterChain chain) throws IOException, ServletException {
        HttpServletRequest request = (HttpServletRequest) req;
        //不过滤url
        String url = request.getRequestURI();        
        System.out.println(url);        
        if (url.contains("/News/js/tool/ueditor-1.3.6/jsp/")) {            
            chain.doFilter(req, res);        
        }else{            
            super.doFilter(req, res, chain);        
        } 
	}
}
