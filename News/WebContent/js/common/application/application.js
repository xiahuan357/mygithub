/**
 * 应用程序公共方法
 */
define(function(require, exports, module) {
	var $ = require("$");
	var store = require('store');
	var userutil = require("userutil");
	
	exports.logout = function(){
		var url = GLOBAL.BASE + "front/login/logout";
		$.ajax({
			url : url,
			type : "POST",
			success : function(data) {
				store.clear();
				userutil.clearUserInfo();
				window.location = GLOBAL.URL.LOGINURL;
			},
			error : function(XMLHttpRequest, textStatus, errorThrown) {
			}
		});
	}
});