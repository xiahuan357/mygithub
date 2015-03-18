package com.yn.yntp.module.messagepush.utils;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpSession;

import org.directwebremoting.Container;
import org.directwebremoting.ScriptSession;
import org.directwebremoting.ServerContextFactory;
import org.directwebremoting.WebContext;
import org.directwebremoting.WebContextFactory;
import org.directwebremoting.event.ScriptSessionEvent;
import org.directwebremoting.event.ScriptSessionListener;
import org.directwebremoting.extend.ScriptSessionManager;
import org.directwebremoting.servlet.DwrServlet;

public class MessageScriptSessionManagerUtil extends DwrServlet{

    private static final long serialVersionUID = -7504612622407420071L;
	//维护一个Map key为session的Id， value为ScriptSession对象  
    public static final Map<String, ScriptSession> scriptSessionMap = new HashMap<String, ScriptSession>();  
    public void init()throws ServletException {
    	  Container container = ServerContextFactory.get().getContainer();
          ScriptSessionManager manager = container.getBean(ScriptSessionManager.class);
          ScriptSessionListener listener = new ScriptSessionListener() {
     		     /** 
     	      * ScriptSession创建事件 
     		      */  
     	     public void sessionCreated(ScriptSessionEvent event) {  
     	           WebContext webContext = WebContextFactory. get();  
     	          HttpSession session = webContext.getSession();  
     	           ScriptSession scriptSession = event.getSession();  
     	           scriptSessionMap.put(session.getId(), scriptSession);     //添加scriptSession  
     	           System.out.println( "session: " + session.getId() + " scriptSession: " + scriptSession.getId() + "is created!");  
     		     }  
     	     /** 
           * ScriptSession销毁事件 
     	      */  
     		     public void sessionDestroyed(ScriptSessionEvent event) {  
     	           WebContext webContext = WebContextFactory. get();  
     		           HttpSession session = webContext.getSession();  
     	           ScriptSession scriptSession = scriptSessionMap.remove(session.getId());  //移除scriptSession  
     	           System.out.println( "session: " + session.getId() + " scriptSession: " + scriptSession.getId() + "is destroyed!");  
     	     }  
          };
          manager.addScriptSessionListener(listener);
}
}
