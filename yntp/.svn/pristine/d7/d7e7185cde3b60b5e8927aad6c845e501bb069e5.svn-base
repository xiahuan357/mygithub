/**
 * 管理员修改密码-form
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
	var userutil = require("userutil");
	
	var FORMOPTURL_UPDATE= GLOBAL.BASE + "admin/sys/user/user/changepassword";
	
	var TARGETDIV_FORM = "basearchive_form";
	var MODULENAME = "admin";
	
	var COMPONENTID_FORM = "validationform" + "_" + MODULENAME;
	
	var tableUrl = GLOBAL.HTML_HOME + "admin/sys/admin/sys_admin_table.html";
	
	var form_param = {
		// Form信息
		form_attr : {
			formitem : {
				title : "密码修改",
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
			},{
				isText : true,
				label : "原密码",
				id : 'text_oldpassword',
				name : 'text_oldpassword',
				type : "password",
				style : "width:80%",
				placeholder : "请输入原密码",
				validations : {
					required : true,
					minlength : 5,
					maxlength : 20,
				},
			}, {
				isText : true,
				label : "新密码",
				id : 'text_newpassword',
				name : 'text_newpassword',
				type : "password",
				style : "width:80%",
				placeholder : "请输入新密码",
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
					equalto : "text_newpassword"
				},
			}]
		}
	};
	
	// 保存
	var fnsubmithandler = function(){
		var vid = $('#hidden_id').attr("value");
		var voldpassword = $('#text_oldpassword').attr("value");
		var vnewpassword = $('#text_newpassword').attr("value");
		var vrepassword = $('#text_repassword').attr("value");
		
		//------------------------
		var data = {
			id : vid,
			oldpassword : voldpassword,
			newpassword1 : vnewpassword,
			newpassword2 : vrepassword,
		};

		var requestURL = FORMOPTURL_UPDATE;
		var optType = basearchiveUtil.FORMOPT_UPDATE;	
		var saveResult = form.doSaveAction(requestURL,data,optType);
		
		if (saveResult) {
			// 清除本地store的数据
			var cacheKeyList = ["currentSelectRowData" + MODULENAME,"currentOptType" + MODULENAME];
			basearchiveUtil.clearStoreCache(cacheKeyList);
			
			basearchiveUtil.jumpToHtml(tableUrl);
		} else{
			return false;
		}
	};
	
	// 初始化Form数据，新建和编辑时
	function initFormValue(data){
		var hidden_id = $('#hidden_id');
		var text_oldpassword = $('#text_oldpassword');
		var text_newpassword = $('#text_newpassword');
		var text_repassword = $('#text_repassword');
			
			
		if (hidden_id != 'undefined' && hidden_id != null)
			hidden_id.attr('value', data.id);
		if (text_oldpassword != 'undefined' && text_oldpassword != null)
			text_oldpassword.attr("value", "");
		if (text_newpassword != 'undefined' && text_newpassword != null)
			text_newpassword.attr("value", "");
		if (text_repassword != 'undefined' && text_repassword != null)
			text_repassword.attr("value", "");
	}
	
	exports.init = function(){
		$(document).ready(function() {
			var storeRowData = store.get("currentSelectRowData" + MODULENAME);
			
			form.init(form_param);
			if(storeRowData == null){
				storeRowData  = userutil.getUserInfo();
			}
			initFormValue(storeRowData);
			
			// 取消方法
			$('#btn_mct_cancel').die().on('click', function() {
				bootbox.confirm("确认取消？", function(YesOrNo){
					if(YesOrNo){
						// 清除本地store的数据
						var cacheKeyList = ["currentSelectRowData" + MODULENAME,"currentOptType" + MODULENAME];
						basearchiveUtil.clearStoreCache(cacheKeyList);
						
						basearchiveUtil.jumpToHtml(tableUrl);
					}
				});
			});

			//加载验证，验证表单
			theme.setValidateForm($("#"+COMPONENTID_FORM), fnsubmithandler);
		});
	};
});