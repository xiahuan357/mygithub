/**
 * 美食基本信息界面
 */
define(function(require, exports, module) {

	var $ = require("$");
	require("bootstrap_commonrequire");
	require('select2.css');
	require('select2');
	
	var theme = require('bootstrap_theme');
	var store = require('store');

	var basearchiveUtil = require('basearchive-util');
	var ArchiveForm = require('basearchive-form');
	var cityselector = require('cityselector');

	var FORMOPTURL_QUERY = GLOBAL.BASE + "admin/business/food/search";

	var MODULENAME = "food_baseinfo";

	var COMPONENTID_FORM = "validationform" + "_" + MODULENAME;

	// 保存当对象数据
	var currentLastData;
	var baseForm;
	var form_param = {
		// Form信息
		form_attr : {
			formitem : {
				title : "基本信息",
				spansize : 'span12',
				type : basearchiveUtil.FORMOPT_CREATE, // create 创建 ; update 更新
				formid : COMPONENTID_FORM,
				isShowButtons : false,
				boxContentStyle : "box-content  "
			},
			items : [{
				isText : true,
				label : "美食名称",
				id : 'text_name',
				name : 'text_name',
				type : "text",
				style : "width:80%",
				placeholder : "请输入美食名称",
				validations : {
					required : true,
					maxlength : 255,
				},
			}, {
				isTextarea : true,
				label : "摘要",
				id : 'textarea_abstract',
				name : "textarea_abstract",
				rows : 10,
				type : "textarea",
				style : "width:80%",
				placeholder : "摘要",
				validations : {
					required : true,
					maxlength : 500
				}
			}, {
				isOnlyDiv : true,
				id : 'modaldialogDiv',
			}  ]
		}
	};

	//------------<组件开始
	var com_name = $('#text_name');
	var com_abstract = $('#textarea_abstract');
	
	//------------组件开始>

	function getUIComponent() {
		 com_name = $('#text_name');
		 com_abstract = $('#textarea_abstract');
	}

	// 初始化Form组件
	var initFormComponent = function() {
		
	}

	// 初始化组件事件
	var initFormEvents = function(){
		
	}

	// 初始化Form数据，新建和编辑时
	function initFormValue(optType, data) {
		if (optType == basearchiveUtil.FORMOPT_CREATE) { //新增，清空数据
			if (com_name != 'undefined' && com_name != null)
				com_name.attr("value", "");
			if (com_abstract != 'undefined' && com_abstract != null)
				com_abstract.attr("value", "");
		} else if (optType == basearchiveUtil.FORMOPT_UPDATE) { //修改，回填数据
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
					if ('000000' != resultdata.flag) {
						bootbox.alertTimeout('查询数据出现错误，请刷新重试！');
						lastdata = null; // 查询出错
					} else {
						var receiptList = resultdata.data;
						if (receiptList != null && receiptList.length > 0) {
							lastdata = receiptList[0];
							store.set("currentSelectRowDatafood",lastdata);
						} else {
							bootbox.alertTimeout('查询数据出现错误，请刷新重试！');
							lastdata = null; // 没有此条数据						
						}
					}
				},
				error : function(XMLHttpRequest, textStatus, errorThrown) {
					bootbox.alertTimeout('查询数据出现错误，请重试！');
				}
			});

			// 保存当前对象值
			currentLastData = lastdata;
			if (null == lastdata) {
				// 清除本地store的数据
				var cacheKeyList = [ "currentSelectRowData" + MODULENAME, "currentOptType" + MODULENAME ];
				basearchiveUtil.clearStoreCache(cacheKeyList);
				basearchiveUtil.jumpToHtml(tableUrl);
			}
			if (com_name != 'undefined' && com_name != null)
				com_name.attr("value", currentLastData.name);
			if (com_abstract != 'undefined' && com_abstract != null)
				com_abstract.attr("value", currentLastData.food_abstract);

		}
	}
	
	exports.validateForm = function() {
		// 校验框架可以校验的控件
		var selector = $("#" + COMPONENTID_FORM);
		var checkResult = selector.validate().form();
		
		return checkResult;
	}

	exports.getFormData = function() {
		
		var formData = {
				name : com_name.attr("value"),
				food_abstract : com_abstract.attr("value"),
		}
		
		var optType = store.get("currentOptTypefood");
		var storeRowData = store.get("currentSelectRowDatafood");
		
		if (optType == basearchiveUtil.FORMOPT_CREATE) { //新增，清空数据
			
		} else if (optType == basearchiveUtil.FORMOPT_UPDATE) { //修改，回填数据
			formData.id = storeRowData.id;
			formData.createtime = new Date(currentLastData.createtime).format("yyyy-MM-dd hh:mm:ss");
		}
		
		return formData;
	}

	exports.init = function(param) {
		$(document).ready(function() {

			form_param.form_attr.formitem.targetdiv = param.attrs.divWrapperId;
		    baseForm = ArchiveForm.init(form_param);

			var storeRowData = store.get("currentSelectRowDatafood");
			var optType = store.get("currentOptTypefood");

			getUIComponent();
			initFormComponent();
			initFormEvents();
			initFormValue(optType, storeRowData, baseForm);

			//加载验证，验证表单
			theme.setValidateForm($("#" + COMPONENTID_FORM), $.noop());
		});
	};
});