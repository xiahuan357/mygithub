/**
 * 选择注册类型
 */
define(function(require,exports,module){
	var $ = require("$");
	require("bootstrap_commonrequire");
	
	var basearchiveUtil = require('basearchive-util');
	var form = require('basearchive-form');
	var store = require("store");
	var MODULENAME = "selecttype";
	
	var COMPONENTID_FORM = "validationform" + "_" + MODULENAME;
	var selectUserType;
	var form_param = {
		// Form信息
		form_attr : {
			formitem : {
				title : "选择用户类型",
				spansize : 'span12',
				type : basearchiveUtil.FORMOPT_CREATE, // create 创建 ; update 更新
				formid : COMPONENTID_FORM,
				isShowButtons : false,
				boxContentStyle : "box-content  "
			},
			items : [  {
				isSelect : true,
				label : "用户类型",
				id : 'text_usertype',
				name : 'text_usertype',
				style : "width:80%",
				options : [ {
					value : 1,
					option : "商家用户",
				}, {
					value : 2,
					option : "普通用户",
				} ]
			}]
		}
	};
	
	exports.validateForm = function(){
		var usertype = $("#text_usertype ").val();
		if(usertype == "undefied" || usertype == null || usertype == ""){
			form.showMsg("请选择用户类型","error",COMPONENTID_FORM);
			return false;
		}
		selectUserType = usertype;
		store.set("usertype",usertype);
		return true;
	}
	
	exports.getSelectUserType = function(){
		return selectUserType;
	}
	
	exports.init = function(param){
		$(document).ready(function() {
			
			form_param.form_attr.formitem.targetdiv = param.attrs.divWrapperId;
			form.init(form_param);
			
		});
	};
});