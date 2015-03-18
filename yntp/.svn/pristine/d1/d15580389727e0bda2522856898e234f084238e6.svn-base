/**
 * 民族特产基本信息界面
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

	var FORMOPTURL_QUERY = GLOBAL.BASE + "admin/business/nationalspecial/search";

	var MODULENAME = "nationalspecial_baseinfo";

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
				label : "特产名称",
				id : 'text_name',
				name : 'text_name',
				type : "text",
				style : "width:80%",
				placeholder : "请输入特产名称",
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
			},  {
				isText : true,
				label : "数量",
				name : "text_stockcount",
				id : "text_stockcount",
				type : "text",
				style : "width:80%",
				placeholder : "数量",
				validations : {
					required : true,
					number : true,
					min : 0,
				},
			},   {
				isText : true,
				label : "商品类型",
				name : "text_type",
				id : "text_type",
				type : "text",
				style : "width:80%",
				placeholder : "商品类型",
				readonly : true,
				validations : {
					required : true,
				},
			}, {
				isDiv : true,
				id : 'location_region',
				name : 'location_region',
				style : "width:80%",
				label : '所在城市',
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
	var com_price = $('#text_price');
	var com_stockcount = $('#text_stockcount');
	var com_type = $('#text_type');
	var com_abstract = $('#textarea_abstract');
	
	var location_region;
	//------------组件开始>

	function getUIComponent() {
		 com_name = $('#text_name');
		 com_price = $('#text_price');
		 com_stockcount = $('#text_stockcount');
		 com_type = $('#text_type');
		 com_abstract = $('#textarea_abstract');
	}

	// 初始化Form组件
	var initFormComponent = function() {
		
		location_region = new cityselector({
			attrs : {
				provinceid : "provinceid",
				cityid : "cityid",
				zoneid : "zoneid",
					
				provincewidth : "width:150px",
				citywidth : "width:150px",
				zonewidth : "width:150px",
				
			},
			renderTo : "location_region"
		});
	}

	// 初始化组件事件
	var initFormEvents = function(){
		$('#text_type').die().live('focus',function() {
			 var producttype_select_dialog = require("sys_product_type_select_dialog");
			 producttype_select_dialog.init({
				 attrs :{
					 title : "商品类型选择",
					 divWrapperId : "modaldialogDiv",
					 triggerElementId : "text_type",
					 isshowfooter : true,
				 }
			 });
			 producttype_select_dialog.show();
		});
		
		basearchiveUtil.initValidateSelect2Events({
			select2Id : "zoneid",
		});
	}

	// 初始化Form数据，新建和编辑时
	function initFormValue(optType, data) {
		if (optType == basearchiveUtil.FORMOPT_CREATE) { //新增，清空数据
			if (com_name != 'undefined' && com_name != null)
				com_name.attr("value", "");
			if (com_price != 'undefined' && com_price != null)
				com_price.attr("value", "");
			if (com_stockcount != 'undefined' && com_stockcount != null)
				com_stockcount.attr("value", "");
			if (com_type != 'undefined' && com_type != null)
				com_type.attr("value", "");
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
							store.set("currentSelectRowDatanationalspecial",lastdata);
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
			if (com_stockcount != 'undefined' && com_stockcount != null)
				com_stockcount.attr("value", currentLastData.stockcount);
			if (com_abstract != 'undefined' && com_abstract != null)
				com_abstract.attr("value", currentLastData.special_abstract);

			if (com_type != 'undefined' && com_type != null){
				com_type.attr("value", currentLastData.productTypeEntity.name);
				com_type.attr("val", currentLastData.productTypeEntity.id);
			}
				
			location_region.initRegion(currentLastData.region_id);
		}
	}
	
	exports.validateForm = function() {
		// 校验框架可以校验的控件
		var selector = $("#" + COMPONENTID_FORM);
		var checkResult = selector.validate().form();
		
		// 校验框架不可以校验的控件
		checkResult =  basearchiveUtil.validateSelect2({
			select2Id : "zoneid",
		}) && checkResult;
		return checkResult;
	}

	exports.getFormData = function() {
		
		var productTypeEntity = {
				id : com_type.attr("val"),
		}
		var formData = {
				name : com_name.attr("value"),
				price : com_price.attr("value"),
				stockcount : com_stockcount.attr("value"),
				special_abstract : com_abstract.attr("value"),
				
				productTypeEntity : productTypeEntity,
				region_id : location_region.getRegion_id(),
		}
		
		var optType = store.get("currentOptTypenationalspecial");
		var storeRowData = store.get("currentSelectRowDatanationalspecial");
		
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

			var storeRowData = store.get("currentSelectRowDatanationalspecial");
			var optType = store.get("currentOptTypenationalspecial");

			getUIComponent();
			initFormComponent();
			initFormEvents();
			initFormValue(optType, storeRowData, baseForm);

			//加载验证，验证表单
			theme.setValidateForm($("#" + COMPONENTID_FORM), $.noop());
		});
	};
});