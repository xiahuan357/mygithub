/**
 * 
 */
/**
 * 选择注册类型
 */
define(function(require,exports,module){
	var $ = require("$");
	require("bootstrap_commonrequire");
	
	var basearchiveUtil = require('basearchive-util');
	var form = require('basearchive-form');
	var store = require("store");
	var MODULENAME = "personalinfo";
	
	var COMPONENTID_FORM = "validationform" + "_" + MODULENAME;
	var selectUserType;
	var form_param = {
		// Form信息
		form_attr : {
			formitem : {
				title : "普通用户详细信息",
				spansize : 'span12',
				type : basearchiveUtil.FORMOPT_CREATE, // create 创建 ; update 更新
				formid : COMPONENTID_FORM,
				isShowButtons : false,
				boxContentStyle : "box-content  "
			},
			items : [ ]
		}
	};
	
	exports.init = function(param){
		$(document).ready(function() {
			
			form_param.form_attr.formitem.targetdiv = param.attrs.divWrapperId;
			form.init(form_param);
			form.showMsg("暂不需设置，点击完成按钮，完成注册！","info",COMPONENTID_FORM);
		});
	};
});