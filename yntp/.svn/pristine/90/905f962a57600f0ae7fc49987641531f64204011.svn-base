/**
 * 资源-form
 */
define(function(require, exports, module) {

	var $ = require("$");
	require("bootstrap_commonrequire");
	require("bootbox.css");

	var bootbox = require('bootbox');
	var theme = require('bootstrap_theme');
	var store = require('store');
	var loader = require('loader');
	
	require('select2.css');
	require('select2');
	
	var basearchiveUtil = require('basearchive-util');
	var form = require('basearchive-form');
	
	var FORMOPTURL_INSERT= GLOBAL.BASE + "admin/permission/resource/create";
	var FORMOPTURL_UPDATE= GLOBAL.BASE + "admin/permission/resource/update";
	
	var TARGETDIV_FORM = "basearchive_form";
	var MODULENAME = "tourismline_type";
	
	var COMPONENTID_FORM = "validationform" + "_" + MODULENAME;
	
	var tableUrl = GLOBAL.HTML_HOME + "admin/sys/resource/sys_resource_table.html";
	
	var form_param = {
		// Form信息
		form_attr : {
			formitem : {
				title : "资源信息",
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
				label : "资源名称",
				id : 'text_name',
				name : 'text_name',
				type : "text",
				style : "width:80%",
				placeholder : "请输入资源名称",
				validations : {
					required : true,
					minlength : 1,
					maxlength : 100,
				},
			}, {
				isText : true,
				label : "资源编码",
				id : 'text_code',
				name : 'text_code',
				type : "text",
				style : "width:80%",
				placeholder : "请输入资源编码",
				validations : {
					minlength : 1,
					maxlength : 100,
				},
			},{
				isText : true,
				label : "资源url",
				id : 'text_url',
				name : 'text_url',
				type : "text",
				style : "width:80%",
				placeholder : "请输入资源url",
				validations : {
					required : true,
					minlength : 1,
					maxlength : 200,
				},
			},{
				isText : true,
				label : "资源图标",
				id : 'text_icon',
				name : 'text_icon',
				type : "text",
				style : "width:80%",
				placeholder : "请输入资源图标",
				validations : {
					required : true,
					minlength : 1,
					maxlength : 200,
				},
			},{
				isText : true,
				label : "资源排序",
				id : 'text_weight',
				name : 'text_weight',
				type : "text",
				style : "width:80%",
				placeholder : "请输入资源排序",
				validations : {
					number : true,
					min : 1,
				},
			},{
				isSelect : true,
				id : 'text_parentid',
				name : "text_parentid",
				label : "上级菜单",
				type : "select",
			}
			]
		}
	};
	
	// 保存
	var fnsubmithandler = function(){
		var optType = store.get("currentOptType" + MODULENAME);
		var vid = $('#hidden_id').attr("value");
		var vname = $('#text_name').attr("value");
		var vcode = $('#text_code').attr("value");
		var vurl = $('#text_url').attr("value");
		var vicon = $('#text_icon').attr("value");
		var vweight = $('#text_weight').attr("value");
		var vparentid = $('#text_parentid').val();
		
		//------------------------
		var data = {
			name : vname,
			code :vcode,
			url :vurl,
			icon :vicon,
			weight :vweight,
			parentid : vparentid,
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
		var text_url = $('#text_url');
		var text_icon = $('#text_icon');
		var text_weight = $('#text_weight');
		var text_parentid = $('#text_parentid');
		
		if (optType == basearchiveUtil.FORMOPT_CREATE) {
			if (hidden_id != 'undefined' && hidden_id != null)
				hidden_id.attr("value", "");
			if (text_name != 'undefined' && text_name != null)
				text_name.attr("value", "");
			if (text_code != 'undefined' && text_code != null)
				text_code.attr("value", "");
			if (text_url != 'undefined' && text_url != null)
				text_url.attr("value", "");
			if (text_icon != 'undefined' && text_icon != null)
				text_icon.attr("value", "");
			if (text_weight != 'undefined' && text_weight != null)
				text_weight.attr("value", "");
			if (text_parentid != 'undefined' && text_parentid != null)
				text_parentid.val("");
			
			initParentSelect(-1);
		} else if (optType == basearchiveUtil.FORMOPT_UPDATE) {
			// 重新从数据库中读取数据
			var queryUrl = GLOBAL.BASE +  "admin/permission/resource/search?q=id=" + data.id;
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
			if (text_url != 'undefined' && text_url != null)
				text_url.attr("value", lastdata.url);
			if (text_icon != 'undefined' && text_icon != null)
				text_icon.attr("value", lastdata.icon);
			if (text_weight != 'undefined' && text_weight != null)
				text_weight.attr("value", lastdata.weight);
			if (text_parentid != 'undefined' && text_parentid != null){
				initParentSelect(lastdata.id);
				text_parentid.select2("val",data.parentid);
			}
		}
	}
	
	/**
	 * 初始化可选富菜单
	 */
	function initParentSelect(id) {
		var queryUrl = GLOBAL.BASE + "admin/permission/resource/searchparentid/" + id;
		$.ajax({
			async : false,
			dataType : 'json',
			contentType : "application/json;charset=UTF-8",
			type : "GET",
			url : queryUrl,
			success : function(resultData) {
				if(data && data.flag == "000000"){
					// 解析data
					$("#text_parentid").select2({
						placeholder : "父节点",
						allowClear : false,
						multiple : false,
						data : resultData.data
					});
				} else{
					bootbox.alertTimeout('初始父节点数据失败！');
				}
			},
			error : function(XMLHttpRequest, textStatus, errorThrown) {
				bootbox.alertTimeout('初始化父节点数据失败！');
			}
		});
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