/**
 * 邮箱修改结果界面
 */
 define(function(require, exports, module) {
	var $ = require("$");
	require("bootstrap_commonrequire");

	exports.init = function(param) {
		var activeUrl = GLOBAL.BASE + "front/email/emailmod";
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
					}
				},
				error : function(XMLHttpRequest, textStatus, errorThrown) {
					$("#activeresultdiv").append("出现错误，请刷新后重试！");
				}
			});
		});
	};

});
