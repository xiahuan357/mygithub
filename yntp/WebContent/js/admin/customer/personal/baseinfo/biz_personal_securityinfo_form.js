/**
 * 普通用户安全设置
 */
define(function(require, exports, module) {

	var $ = require("$");
	require("bootstrap_commonrequire");
	require("bootbox.css");

	var bootbox = require('bootbox');
	var theme = require('bootstrap_theme');
	var store = require('store');
	var loader = require('loader');
	var FileUploadCom = require("imageupload");
	var userutil = require("userutil");
	var userid = userutil.getUserInfo().id;
	var basearchiveUtil = require('basearchive-util');
	var form = require('basearchive-form');
	var FORMOPTURL_UPDATE= GLOBAL.BASE + "admin/sys/user/business/update";
	var TARGETDIV_FORM = "basearchive_form";
	var MODULENAME = "businessinfo";
	var COMPONENTID_FORM = "validationform" + "_" + MODULENAME;
	var modemailurl = GLOBAL.HTML_HOME + "admin/customer/personal/baseinfo/biz_personal_modemail_form.html";
	var modpwurl = GLOBAL.HTML_HOME + "admin/customer/personal/baseinfo/biz_personal_modpw_form.html";
	var indexUrl =GLOBAL.HTML_HOME + "admin/customer/common/baseinfoindex.html";
	var form_param = {
		// Form信息
		form_attr : {
			formitem : {
				isShowButtons:false,
				title : "您的个人信息",
				spansize : 'span12',
				type : basearchiveUtil.FORMOPT_CREATE, // create 创建 ; update 更新
				formid : COMPONENTID_FORM,
				targetdiv : TARGETDIV_FORM,
			},
			items : [ {
				isHidden : true,
				id : 'hidden_id',
				name : 'hidden_id',
				value : ''
			}, {
				isText : true,
				label : "用户账号",
				id : 'text_name',
				name : 'text_name',
				type : "text",
				style : "width:50%",
				readonly:true,
			},
			{
				isText : true,
				label : "用户密码",
				id : 'text_password',
				name : 'text_password',
				type : "text",
				style : "width:50%",
				readonly:true,
			},
			{   
				isText : true,
				label : "手机号",
				id : 'text_tel',
				name : 'text_tel',
				type : "text",
				style : "width:50%",
				readonly:true,
			},
			{
				isText : true,
				label : "邮箱",
				id : 'text_email',
				name : 'text_email',
				type : "text",
				style : "width:50%",
				readonly:true,
			},
			],
		}
	};
	
	
	// 初始化Form数据，新建和编辑时
	function initFormValue(){
		var hidden_id = $('#hidden_id');
		var text_name = $('#text_name');
		var text_tel = $('#text_tel');
		var text_password = $('#text_password');
		var text_email = $('#text_email');
			// 重新从数据库中读取数
			var queryUrl = GLOBAL.BASE +  "admin/sys/user/business/search?q=id=" + userid;
			var lastdata = null;
			$.ajax({
				async : false,
				type : "GET",
				dataType : 'json',
				contentType : "application/json;charset=UTF-8",
				url : queryUrl,
				success : function(resultdata) {
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
			if (hidden_id != 'undefined' && hidden_id != null)
				hidden_id.attr('value', lastdata.id);
			if (text_name != 'undefined' && text_name != null)
				text_name.attr("value", lastdata.username);
			if (text_email != 'undefined' && text_email != null)
				{
				var strArr=lastdata.email.split("@");
				var len=parseInt(strArr[0].length/3);
				if(strArr[0].length-len<6) 
				text_email.attr("value", "****@"+strArr[1]);
				else
				text_email.attr("value", strArr[0].substring(0,len)+"****@"+strArr[1]);
				}
			if (text_tel != 'undefined' && text_tel != null){
				text_tel.attr("value", lastdata.mobile_phone_number.substring(0,3)+"****"+lastdata.mobile_phone_number.substring(8,12));
			}
			if (text_password != 'undefined' && text_password != null)
				text_password.attr("value", "******");
		}
	
	exports.init = function(){
		$(document).ready(function() {
			// 当前操作：新建，编辑
			form.init(form_param);
			$('#text_tel').parent().append('<a id="modtel" href="#">[修改]</a>');
			$('#text_email').parent().append('<a id="modemail" href="#">[修改]</a>');
			$('#text_password').parent().append('<a id="modpd" href="#">[修改]</a>');
			$('#modtel').die().live('click', function() {
				basearchiveUtil.jumpToHtml(modemailurl);
			})
			$('#modemail').die().live('click', function() {
				basearchiveUtil.jumpToHtml(modemailurl);
			})
			$('#modpd').die().live('click', function() {
				basearchiveUtil.jumpToHtml(modpwurl);
			})
			initFormValue();
			 $('#form_btn_return').die().live('click', function() {
					
					basearchiveUtil.jumpToHtml(indexUrl);
				});
			//加载验证，验证表单
			theme.setValidateForm($("#"+COMPONENTID_FORM), $.noop());
		});
	};
});