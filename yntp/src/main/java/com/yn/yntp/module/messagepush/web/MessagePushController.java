package com.yn.yntp.module.messagepush.web;

import java.util.Collection;

import javax.annotation.Resource;
import javax.servlet.ServletException;

import org.directwebremoting.Browser;
import org.directwebremoting.ScriptBuffer;
import org.directwebremoting.ScriptSession;
import org.directwebremoting.ScriptSessionFilter;
import org.directwebremoting.WebContextFactory;
import org.directwebremoting.annotations.RemoteMethod;
import org.directwebremoting.annotations.RemoteProxy;
import org.springframework.stereotype.Controller;


public class MessagePushController {

	 public void onPageLoad(Long userId)  {

	        ScriptSession scriptSession = WebContextFactory.get().getScriptSession();
	        scriptSession.setAttribute(userId.toString(), userId);
//	        MessageScriptSessionManagerUtil messageScriptSessionManager =new MessageScriptSessionManagerUtil();
//	        try {
//				messageScriptSessionManager.init();
//			} catch (ServletException e) {
//				e.printStackTrace();
//			}
//	        new DWRScriptSessionManager();

	 }
	 public void sendMessageAuto(Long userid, String message){
	        
	        final Long userId = userid;
	        final String autoMessage = message;
	        Browser.withAllSessionsFiltered(new ScriptSessionFilter() {
	            public boolean match(ScriptSession session){
	                if (session.getAttribute("userId") == null)
	                    return false;
	                else
	                    return (session.getAttribute("userId")).equals(userId);
	            }
	        }, new Runnable(){
	            
	            private ScriptBuffer script = new ScriptBuffer();
	            
	            public void run(){
	                
	                script.appendCall("showMessage", autoMessage);
	                
	                Collection<ScriptSession> sessions = Browser

	                .getTargetSessions();
	                
	                for (ScriptSession scriptSession : sessions){
	                    scriptSession.addScript(script);
	                }
	            }
	        });
	    }
	 

}
