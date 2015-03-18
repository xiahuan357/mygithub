/**
 * 填写新邮箱
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
    var infoUrl= GLOBAL.BASE+"html/admin/customer/business/baseinfo/biz_businessinfo_form.html";
	var MODULENAME = "emailvalidate";

	var COMPONENTID_FORM = "validationform" + "_" + MODULENAME;
    var haveSendValidate = false;
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
				label : "新邮箱",
				id : 'text_email2',
				name : 'text_email2',
				type : "text",
				style : "width:80%",
				placeholder : "请输入您的新邮箱",
				validations : {
					email : true,
					required : true,
					maxlength : 255,
				},
			} ],
			buttons : [ {
				text : "发送验证",
				id : "btn_mct_save",
				type : "submit",
				style : "btn btn-primary contrast-background",
				name : "submit",
			}, ]
		}
	};
	function initForm() {
		var text_email = $('#text_email');
		if (text_email != 'undefined' && text_email != null)
			text_email.attr("value", "");
	}
	exports.getValidateFormId = function() {
		return COMPONENTID_FORM;
	}

	// 是否发送验证成功
	exports.haveSendValidateSuccess = function(){
		return haveSendValidate;
	}
	
	exports.init = function(param) {
		$(document).ready(function() {
			haveSendValidate = false;
			form_param.form_attr.formitem.targetdiv = param.attrs.divWrapperId;
			baseForm = ArchiveForm.init(form_param);
	
			initForm();
			$('#btn_mct_save').die().live('click',function() {
				var nowdate = new Date();
				var email2 = $('#text_email2').attr("value");
				var lastdata=null;
				var doResult = false;
				var queryUrl1 =GLOBAL.BASE +  "admin/sys/user/business/search?q=id=" + userid;
				$.ajax({
					async : false,
					type : "GET",
					dataType : 'json',
					contentType : "application/json;charset=UTF-8",
					url : queryUrl1,
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
				if(lastdata.updatetime==null||((nowdate.getTime()-Date.parse(lastdata.updatetime.replace(/-/g,"/")))/1000)>3600){
				var queryUrl = GLOBAL.BASE+ "admin/email/validate/" + email2+"/"+userid+".json";
				$.ajax({
					async : false,
					type : "GET",
					dataType : 'json',
					contentType : "application/json;charset=UTF-8",
					url : queryUrl,
					success : function(resultdata) {
						if (resultdata) {
							bootbox.confirm('邮件发送成功请注意接收，并点击邮件里的链接进行验证！谢谢', function (confirmed) { 
						        	 basearchiveUtil.jumpToHtml(param.securitysettingUrl);
						        	 haveSendValidate = true;
							});
						} else {
							haveSendValidate = true;
							bootbox.confirm('发送验证码失败，请刷新重试！');
						}
					},
					error : function(
							XMLHttpRequest,
							textStatus,
							errorThrown) {
						bootbox.confirm('发送验证码失败，请重试！');
					}
				});
				}
				else bootbox.confirm('邮箱修改间隔为1小时，请勿频繁修改邮箱!，谢谢');
				

			});
			//加载验证，验证表单
			theme.setValidateForm($("#" + COMPONENTID_FORM), $.noop());
		});
	};
});