/**
 *  填写原邮箱
 */
define(function(require, exports, module) {

	var $ = require("$");
	require("bootstrap_commonrequire");
	var loader = require('loader');
	var theme = require('bootstrap_theme');
	var basearchiveUtil = require('basearchive-util');
	var ArchiveForm = require('basearchive-form');
	var userutil = require("userutil");
	var userid = userutil.getUserInfo().id;
	var FORMOPTURL_QUERY = GLOBAL.BASE + "admin/sys/user/business/search";

	var MODULENAME = "emailvalidate";

	var COMPONENTID_FORM = "validationform" + "_" + MODULENAME;

	// 保存当对象数据
	var currentLastData;
	var baseForm;
	var form_param = {
		// Form信息
		form_attr : {
			formitem : {
				title : "绑定新邮箱",
				spansize : 'span12',
				type : basearchiveUtil.FORMOPT_CREATE, // create 创建 ; update 更新
				formid : COMPONENTID_FORM,
				isShowButtons : false,
				boxContentStyle : "box-content  "
			},
			items : [ {
				isText : true,
				label : "原绑定邮箱",
				id : 'text_email',
				name : 'text_email',
				type : "text",
				style : "width:80%",
				placeholder : "请输入原绑定邮箱",
				validations : {
					email:true,
					required : true,
					maxlength : 255,
				},
			},  ]
		}
	};

	function initForm()
	{   
		var text_email=$('#text_email');
		if (text_email != 'undefined' && text_email != null)
			text_email.attr("value", "");
	}
	exports.getValidateFormId = function() {
		return COMPONENTID_FORM;
	}
	
	//验证原邮箱
	exports.preemailvalidate = function() {
		loader.loading("正在验证...");
		var lastdata=null;
		var doResult = false;
		var queryUrl =GLOBAL.BASE +  "admin/sys/user/business/search?q=id=" + userid;
		var text_email=$('#text_email');
		$.ajax({
			async : false,
			type : "GET",
			dataType : 'json',
			contentType : "application/json;charset=UTF-8",
			url : queryUrl,
			success : function(resultdata) {
				loader.noloading();
				if('000000' != resultdata.flag){
					bootbox.alertTimeout('查询数据出现错误，请刷新重试！');
					lastdata = null; 	// 查询出错
				} else {
					var receiptList = resultdata.data;
					if(receiptList != null && receiptList.length > 0){
						lastdata = receiptList[0];
					} else{
						bootbox.alertTimeout('查询数据出现错误，请刷新重试！');
						lastdata = null; // 没有此条数据						
					}
				}
			},
			error : function(XMLHttpRequest, textStatus, errorThrown) {
				bootbox.alertTimeout('查询数据出现错误，请重试！');
			}
		});
		if (text_email.attr("value") == lastdata.email) {
			return true;
		}
		return false;
	}

	exports.init = function(param) {
		$(document).ready(function() {

			form_param.form_attr.formitem.targetdiv = param.attrs.divWrapperId;
		    baseForm = ArchiveForm.init(form_param);

			initForm();
			//加载验证，验证表单
			theme.setValidateForm($("#" + COMPONENTID_FORM), $.noop());
		});
	};
});