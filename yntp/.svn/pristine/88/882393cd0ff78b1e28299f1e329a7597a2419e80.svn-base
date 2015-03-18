/**
 * 角色（目前只有商家有角色）-form
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
	
	var FORMOPTURL_INSERT= GLOBAL.BASE + "admin/permission/role/create";
	var FORMOPTURL_UPDATE= GLOBAL.BASE + "admin/permission/role/update";
	var FORMOPTURL_QUERY = GLOBAL.BASE + "admin/permission/role/search";
	
	var TARGETDIV_FORM = "basearchive_form";
	var MODULENAME = "role";
	
	var COMPONENTID_FORM = "validationform" + "_" + MODULENAME;
	
	var tableUrl = GLOBAL.HTML_HOME + "admin/sys/role/sys_role_table.html";
	
	var form_param = {
		// Form信息
		form_attr : {
			formitem : {
				title : "角色信息",
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
				label : "角色名称",
				id : 'text_name',
				name : 'text_name',
				type : "text",
				style : "width:80%",
				placeholder : "请输入角色名称",
				validations : {
					required : true,
					minlength : 1,
					maxlength : 100,
				},
			}, {
				isText : true,
				label : "角色编码",
				id : 'text_code',
				name : 'text_code',
				type : "text",
				style : "width:80%",
				placeholder : "请输入角色编码",
				validations : {
					required : true,
					minlength : 1,
					maxlength : 100,
				},
			},{
				isTextarea : true,
				label : "描述信息",
				id : 'textarea_description',
				name : "textarea_description",
				rows : 10,
				type : "textarea",
				placeholder : "请输入描述信息",
				validations : {
					maxlength : 200
				}
			}]
		}
	};
	
	// 保存
	var fnsubmithandler = function(){
		var optType = store.get("currentOptType" + MODULENAME);
		var vname = $('#text_name').attr("value");
		var vcode = $('#text_code').attr("value");
		var vdescription = $('#textarea_description').attr("value");
		var vid = $('#hidden_id').attr("value");
		
		//------------------------
		var data = {
			name : vname,
			code :vcode,
			description : vdescription
		};

		var requestURL = "";
		
		if (optType == basearchiveUtil.FORMOPT_UPDATE) {
			data.id=vid;
			requestURL = FORMOPTURL_UPDATE + "/" + vid;
		} else {
			requestURL = FORMOPTURL_INSERT;
		}
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
	function initFormValue(optType,data){
		var hidden_id = $('#hidden_id');
		var text_name = $('#text_name');
		var text_code = $('#text_code');
		var textarea_description = $('#textarea_description');
		
		if (optType == basearchiveUtil.FORMOPT_CREATE) {
			if (hidden_id != 'undefined' && hidden_id != null)
				hidden_id.attr("value", "");
			if (text_name != 'undefined' && text_name != null)
				text_name.attr("value", "");
			if (text_code != 'undefined' && text_code != null)
				text_code.attr("value", "");
			if (textarea_description != 'undefined' && textarea_description != null)
				textarea_description.attr("value", "");
			
		} else if (optType == basearchiveUtil.FORMOPT_UPDATE) {
			// 重新从数据库中读取数据
			var queryUrl = FORMOPTURL_QUERY + "?q=id=" + data.id;
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
			
			if(null == lastdata){
				// 清除本地store的数据
				var cacheKeyList = ["currentSelectRowData" + MODULENAME,"currentOptType" + MODULENAME];
				basearchiveUtil.clearStoreCache(cacheKeyList);
				
				basearchiveUtil.jumpToHtml(tableUrl);
			}
			
			if (hidden_id != 'undefined' && hidden_id != null)
				hidden_id.attr('value', lastdata.id);
			if (text_name != 'undefined' && text_name != null)
				text_name.attr("value", lastdata.name);
			if (text_code != 'undefined' && text_code != null)
				text_code.attr("value", lastdata.code);
			if (textarea_description != 'undefined' && textarea_description != null)
				textarea_description.attr("value", lastdata.description);
		}
	}
	
	exports.init = function(){
		$(document).ready(function() {
			// 当前操作：新建，编辑
			var optType = store.get("currentOptType" + MODULENAME);
			var storeRowData = store.get("currentSelectRowData" + MODULENAME);
			
			form.init(form_param);
			
			initFormValue(optType,storeRowData);
			
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