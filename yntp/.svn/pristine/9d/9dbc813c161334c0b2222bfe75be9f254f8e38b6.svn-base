/**
 * 邮箱验证结果界面
 */
 define(function(require, exports, module) {
	var $ = require("$");
	require("bootstrap_commonrequire");

	exports.init = function(param) {
		var activeUrl = GLOBAL.BASE + "front/register/emailactive";
		$(document).ready(function() {
			$.ajax({
				type : "POST",
				dataType : 'json',
				contentType : "application/json;charset=UTF-8",
				url : activeUrl + param.locationsearch,
				//data : JSON.stringify(postData),
				success : function(resultdata) {
					if ('000000' != resultdata.flag) {
						// 显示错误信息
						$("#activeresultdiv").append(resultdata.desc);
					} else {
						$("#activeresultdiv").append(resultdata.desc);
						$("#activeresultdiv").append("点击如下地址进行登录：");
						$("#activeresultdiv").append('<a class="brand" href="' + GLOBAL.URL.LOGINURL + '"><span class="second">云南旅游平台登录</span></a>');
						// 跳转到登录界面
					}
				},
				error : function(XMLHttpRequest, textStatus, errorThrown) {
					$("#activeresultdiv").append("出现错误，请刷新后重试！");
				}
			});
		});
	};

});
