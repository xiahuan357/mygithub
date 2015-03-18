/**
 * 填写基本信息
 */
define(function(require, exports, module) {

	var $ = require("$");
	require("bootstrap_commonrequire");
	require("bootbox.css");

	var bootbox = require('bootbox');
	var theme = require('bootstrap_theme');
	var store = require('store');
	var loader = require('loader');
	
	var basearchiveUtil = require('basearchive-util');
	var form = require('basearchive-form');
	var TARGETDIV_FORM = "basearchive_form";
	var MODULENAME = "register";
	var indexUrl=GLOBAL.HTML_HOME + "front/index.html";
	var COMPONENTID_FORM = "validationform" + "_" + MODULENAME;
	
	var form_param = {
		// Form信息
		form_attr : {
			formitem : {
				title : "请输入基本信息",
				spansize : 'span12',
				type : basearchiveUtil.FORMOPT_CREATE, // create 创建 ; update 更新
				formid : COMPONENTID_FORM,
				targetdiv : TARGETDIV_FORM,
				boxContentStyle : "box-content  "
			},
			items : [  {
				isText : true,
				label : "用户名",
				id : 'text_username',
				name : 'text_username',
				type : "text",
				style : "width:80%",
				placeholder : "请输入用户名",
				validations : {
					required : true,
					minlength : 5,
					maxlength : 20,
				},
			}, {
				isText : true,
				label : "密码",
				id : 'text_password',
				name : 'text_password',
				type : "password",
				style : "width:80%",
				placeholder : "请输入密码",
				validations : {
					required : true,
					minlength : 5,
					maxlength : 20,
				},
			}, {
				isText : true,
				label : "确认密码",
				id : 'text_repassword',
				name : 'text_repassword',
				type : "password",
				style : "width:80%",
				placeholder : "请输入确认密码",
				validations : {
					required : true,
					minlength : 5,
					maxlength : 20,
					equalto : "text_password"
				},
			}, {
				isText : true,
				label : "Email",
				id : 'text_email',
				name : 'text_email',
				type : "text",
				style : "width:80%",
				placeholder : "请输入Email",
				validations : {
					required : true,
					email : true
				},
			}, {
				isText : true,
				label : "手机",
				id : 'text_mobile_phone_number',
				name : 'text_mobile_phone_number',
				type : "text",
				style : "width:80%",
				placeholder : "请输入手机",
				validations : {
					required : true,
				},
			}],
		 buttons : [ {
					text : "注册",
					id : "btn_mct_save",
					type : "submit",
					style : "btn btn-primary contrast-background",
					name : "submit",
				}, {
					text : "返回首页",
					id : "btn_mct_cancel",
					type : "button",
					style : "btn",
					name : "cancel",
				} ]
		}
	};
	
	//------------<组件开始
	var com_username = $('#text_username');
	var com_password = $('#text_password');
	var com_repassword = $('#text_repassword');
	var com_email = $('#text_email');
	var com_mobile_phone_number = $('#text_mobile_phone_number');
	//------------组件开始>
	
	function getUIComponent(){
		com_username = $('#text_username');
		com_password = $('#text_password');
		com_repassword = $('#text_repassword');
		com_email = $('#text_email');
		com_mobile_phone_number = $('#text_mobile_phone_number');
	}
	
	// 初始化Form数据，新建和编辑时
	function initFormValue(){
		if (com_username != 'undefined' && com_username != null)
			com_username.attr("value", "");
		if (com_password != 'undefined' && com_password != null)
			com_password.attr("value", "");
		if (com_repassword != 'undefined' && com_repassword != null)
			com_repassword.attr("value", "");
		if (com_email != 'undefined' && com_email != null)
			com_email.attr("value", "");
		if (com_mobile_phone_number != 'undefined' && com_mobile_phone_number != null)
			com_mobile_phone_number.attr("value", "");
	}
	
	 function fnsubmithandler(){
		var vusername = com_username.attr("value");
		var vpassword = com_password.attr("value");
		var vrepassword = com_repassword.attr("value");
		var vemail = com_email.attr("value");
		var vmobile_phone_number = com_mobile_phone_number.attr("value");
	loader.loading("正在注册中，请稍等……");
	$.ajax({
		type : "POST",
		dataType : 'json',
		url : "registeruser.action",
		data : {
	     username:vusername,
	     password:vrepassword,
	     email:vemail,
	     phone_number:vmobile_phone_number,
	     usertype:"4",
	     userstatus:"1"
		},
		success : function(resultdata) {
			loader.noloading();
			if('000000' != resultdata.ret.flag){
				// 显示错误信息
				bootbox.alertTimeout(resultdata.ret.desc);
			} else {
				bootbox.alertTimeout("注册成功！");
				// 跳转到登录界面
				window.location.href=GLOBAL.URL.INDEX;
			}
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			bootbox.alertTimeout("操作失败！");
		}
		
	});
	
	 }
	
	exports.init = function(){
		$(document).ready(function() {
			
			form.init(form_param);
			getUIComponent();
			initFormValue();
			// 保存
			$('#btn_mct_save').die().on('click',function(){
				var selector = $("#" + form_param.form_attr.formitem.formid);
				var checkResult = selector.validate().form();
				if (!checkResult) 
					{
					bootbox.alertTimeout("输入信息有误，请重新输入！！");
					return false;
					}
				fnsubmithandler();
			});
			$('#btn_mct_cancel').die().live('click', function() {
				   window.location.href=GLOBAL.URL.INDEX;
			});
			//加载验证，验证表单
			theme.setValidateForm($("#"+COMPONENTID_FORM), $.noop());
		});
	};
});