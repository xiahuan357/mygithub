/**
 * 旅游装备基本信息界面
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

	var FORMOPTURL_QUERY = GLOBAL.BASE + "admin/business/equipment/search";

	var MODULENAME = "equipment_baseinfo";

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
				label : "旅游装备名称",
				id : 'text_name',
				name : 'text_name',
				type : "text",
				style : "width:80%",
				placeholder : "请输入旅游装备名称",
				validations : {
					required : true,
					maxlength : 255,
				},
			}, {
				isText : true,
				label : "价格",
				name : "text_price",
				id : "text_price",
				type : "text",
				style : "width:80%",
				placeholder : "价格",
				validations : {
					required : true,
					number : true,
					min : 0,
				},
			}, {
				isText : true,
				label : "旅游装备类型",
				name : "text_type",
				id : "text_type",
				type : "text",
				style : "width:80%",
				placeholder : "旅游装备类型",
			},   {
				isText : true,
				label : "联系地址",
				id : 'text_address',
				name : 'text_address',
				type : "text",
				style : "width:80%",
				placeholder : "请输入联系地址",
				validations : {
					required : true,
					maxlength : 255,
				},
			}, {
				isText : true,
				label : "联系地址",
				id : 'text_tel',
				name : 'text_tel',
				type : "text",
				style : "width:80%",
				placeholder : "请输入联系地址",
				validations : {
					required : true,
					maxlength : 20,
				},
			},{
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
			}]
		}
	};

	//------------<组件开始
	var com_name = $('#text_name');
	var com_price = $('#text_price');
	var com_seatcount = $('#text_seatcount');
	var com_type = $('#text_type');
	var com_tel = $('#text_tel');
	var com_address = $('#text_address');
	var com_abstract = $('#textarea_abstract');
	
	//------------组件开始>

	function getUIComponent() {
		com_name = $('#text_name');
		com_price = $('#text_price');
		com_seatcount = $('#text_seatcount');
		com_type = $('#text_type');
		com_tel = $('#text_tel');
		com_address = $('#text_address');
		com_abstract = $('#textarea_abstract');
	}

	// 初始化Form组件
	var initFormComponent = function() {
		basearchiveUtil.initSelect2Value({
			queryUrl:GLOBAL.BASE + "admin/equipment/equipmenttype/getselectmodel",
			com_select2 : com_type,
			placeholder : "旅游装备类型",
			errorMsg : "初始化旅游装备类型失败",
		});
	}
	
	// 初始化Form组件事件
	var initFormEvents = function(){
		basearchiveUtil.initValidateSelect2Events({
			select2Id : "text_type",
		});
	}

	// 初始化Form数据，新建和编辑时
	function initFormValue(optType, data) {
		if (optType == basearchiveUtil.FORMOPT_CREATE) { //新增，清空数据
			if (com_name != 'undefined' && com_name != null)
				com_name.attr("value", "");
			if (com_price != 'undefined' && com_price != null)
				com_price.attr("value", "");
			if (com_seatcount != 'undefined' && com_seatcount != null)
				com_seatcount.attr("value", "");
		 
			if (com_tel != 'undefined' && com_tel != null)
				com_tel.attr("value", "");
			if (com_address != 'undefined' && com_address != null)
				com_address.attr("value", "");
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
							store.set("currentSelectRowDataequipment",lastdata);
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
			if (com_price != 'undefined' && com_price != null)
				com_price.attr("value", currentLastData.price);
			if (com_seatcount != 'undefined' && com_seatcount != null)
				com_seatcount.attr("value", currentLastData.seatcount);
		 
			if (com_tel != 'undefined' && com_tel != null)
				com_tel.attr("value", currentLastData.tel);
			if (com_address != 'undefined' && com_address != null)
				com_address.attr("value", currentLastData.address);
			if (com_abstract != 'undefined' && com_abstract != null)
				com_abstract.attr("value", currentLastData.equipment_abstract);
			
			if (com_type != 'undefined' && com_type != null)
				com_type.select2("val", currentLastData.type_id);
		}
	}

	exports.getValidateFormId = function() {
		return COMPONENTID_FORM;
	}

	exports.validateForm = function() {
		// 校验框架可以校验的控件
		var selector = $("#" + COMPONENTID_FORM);
		var checkResult = selector.validate().form();
		
		// 校验框架不可以校验的控件
		checkResult =  basearchiveUtil.validateSelect2({
			select2Id : "text_type",
		}) && checkResult;
		return checkResult;
	}
	
	exports.getFormData = function() {
		
		var formData = {
				name : com_name.attr("value"),
				price : com_price.attr("value"),
				seatcount : com_seatcount.attr("value"),
				equipment_abstract : com_abstract.attr("value"),
				
				tel : com_tel.attr("value"),
				address : com_address.attr("value"),
				type_id : com_type.attr("value"),
		}
		
		var optType = store.get("currentOptTypeequipment");
		var storeRowData = store.get("currentSelectRowDataequipment");
		
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

			var storeRowData = store.get("currentSelectRowDataequipment");
			var optType = store.get("currentOptTypeequipment");

			getUIComponent();
			initFormComponent();
			initFormEvents();
			initFormValue(optType, storeRowData, baseForm);

			//加载验证，验证表单
			theme.setValidateForm($("#" + COMPONENTID_FORM), $.noop());
		});
	};
});