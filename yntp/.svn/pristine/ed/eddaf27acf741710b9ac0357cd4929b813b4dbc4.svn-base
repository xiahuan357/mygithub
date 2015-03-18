/**
 *  用户信息
 */
define(function(require, exports, module) {
	var $ = require("$");
	var store = require('store');
	
	// 从服务器端获得用户
	exports.getCurrentUserFromServer = function(){
		var queryuser = GLOBAL.BASE + "front/login/getuser";
		var userEntity = null;
		// 获取用户信息
		$.ajax({  
			async : false,
	        url:queryuser,  
	        type:"GET",  
	        success: function(resultdata){  
	        	if('000000' == resultdata.flag){
	        		store.set("userinfo",resultdata.data);
	        		userEntity = resultdata.data;
				}
	        },
	        error : function(XMLHttpRequest, textStatus, errorThrown) {
 			}
	    });
		 return userEntity;
	}
	
	// 获得用户信息
	exports.getUserInfo = function(){
		var userInfo = store.get("userinfo");
		if(userInfo == null){
			var username = store.get("username");
			var queryuser = GLOBAL.BASE + "admin/sys/user/user/getuserinfo/" + username;
			// 获取用户信息
			$.ajax({  
				async : false,
		        url:queryuser + "/" + username,  
		        type:"GET",  
		        success: function(resultdata){  
		        	if('000000' == resultdata.flag){
		        		store.set("userinfo",resultdata.data);
		        		userInfo = resultdata.data;
					}
		        },
		        error : function(XMLHttpRequest, textStatus, errorThrown) {
	 			}
		    }); 
		}
		return userInfo;
	}
	
	// 用户id
	exports.getUserId = function(){
		var userInfo = exports.getUserInfo();
		if (userInfo)
			return userInfo.id;
		else
			return -1;
	}
	
	// 用户账号
	exports.getUserName = function(){
		var userInfo = exports.getUserInfo();
		if (userInfo)
			return userInfo.username;
		else
			return null;
	}
	
	// 移除用户信息
	exports.clearUserInfo = function(){
		store.remove("userinfo");
    	store.remove("username");
	}
	
})