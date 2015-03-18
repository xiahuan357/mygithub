/**
 * 
 */

define(function(require, exports, module) {
	
	
	
	exports.onload = function(){
		
		var userutil = require("userutil");
		if(userutil.getUserInfo()==null)
			
		var userid = userutil.getUserInfo().id;
	  		//通过该方法与后台交互，确保推送时能找到指定用户
	           MessagePush.onPageLoad(userid);
	         //推送信息
			 
		
	}
	
		});
