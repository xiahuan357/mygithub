/**
 * 景点基本信息界面
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
	var cityselector_city = require('cityselector_city');

	var FORMOPTURL_QUERY = GLOBAL.BASE + "admin/business/scenic/search";

	var MODULENAME = "scenic_baseinfo";

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
			items : [ {
				isText : true,
				label : "景点名称",
				id : 'text_name',
				name : 'text_name',
				type : "text",
				style : "width:80%",
				placeholder : "请输入景点名称",
				validations : {
					required : true,
					maxlength : 255,
				},
			},   {
				isText : true,
				label : "景点电话",
				id : 'text_tel',
				name : 'text_tel',
				type : "text",
				style : "width:80%",
				placeholder : "请输入景点电话",
				validations : {
					required : true,
					maxlength : 20,
				},
			},{
				isText : true,
				label : "景点地址",
				id : 'text_address',
				name : 'text_address',
				type : "text",
				style : "width:80%",
				placeholder : "请输入景点地址",
				validations : {
					required : true,
					maxlength : 255,
				},
			},{
				isSelect : true,
				id : 'text_type',
				name : "text_type",
				label : "景点类型",
				type : "select",
				style : "width:80%",
			}, {
				isSelect : true,
				id : 'text_level',
				name : "text_level",
				label : "景点星级",
				type : "select",
				style : "width:80%",
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
			}  ]
		}
	};

	//------------<组件开始
	var com_name = $('#text_name');
	var com_tel= $('#text_tel');
	var com_address= $('#text_address');
	var com_abstract = $('#textarea_abstract');
	
	var com_type = $('#text_type');
	var com_level = $('#text_level');
	var location_region;
	//------------组件开始>

	function getUIComponent() {
		com_name = $('#text_name');
		com_tel = $('#text_tel');
		com_address = $('#text_address');
		com_abstract = $('#textarea_abstract');

		com_type = $('#text_type');
		com_level = $('#text_level');
	}

	// 初始化Form组件
	var initFormComponent = function() {
		basearchiveUtil.initSelect2Value({
			queryUrl:GLOBAL.BASE + "admin/scenic/scenictype/getselectmodel",
			com_select2 : com_type,
			placeholder : "景点类型",
			errorMsg : "初始化景点类型失败",
		});
		
		basearchiveUtil.initSelect2Value({
			queryUrl:GLOBAL.BASE + "admin/scenic/sceniclevel/getselectmodel",
			com_select2 : com_level,
			placeholder : "景点星级",
			errorMsg : "初始化景点星级失败",
		});

		location_region = new cityselector_city({
			attrs : {
				provinceid : "provinceid",
				cityid : "cityid",

				provincewidth : "width:150px",
				citywidth : "width:150px",
			},
			renderTo : "location_region"
		});
	}

	// 初始化Form组件事件
	var initFormEvents = function(){
		basearchiveUtil.initValidateSelect2Events({
			select2Id : "text_type",
		});
		
		basearchiveUtil.initValidateSelect2Events({
			select2Id : "text_level",
		});
		
		basearchiveUtil.initValidateSelect2Events({
			select2Id : "cityid",
		});
	}

	// 初始化Form数据，新建和编辑时
	function initFormValue(optType, data) {
		if (optType == basearchiveUtil.FORMOPT_CREATE) { //新增，清空数据
			if (com_name != 'undefined' && com_name != null)
				com_name.attr("value", "");
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
							store.set("currentSelectRowDatascenic",lastdata);
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
			if (com_tel != 'undefined' && com_tel != null)
				com_tel.attr("value", currentLastData.tel);
			if (com_address != 'undefined' && com_address != null)
				com_address.attr("value", currentLastData.address);
			if (com_abstract != 'undefined' && com_abstract != null)
				com_abstract.attr("value", currentLastData.scenic_abstract);
			if (com_type != 'undefined' && com_type != null)
				com_type.select2("val", currentLastData.type_id);
			if (com_level != 'undefined' && com_level != null)
				com_level.select2("val", currentLastData.level_id);

			location_region.initRegion(currentLastData.region_id);
		}
	}

	exports.validateForm = function() {
		// 校验框架可以校验的控件
		var selector = $("#" + COMPONENTID_FORM);
		var checkResult = selector.validate().form();
		
		// 校验框架不可以校验的控件
		checkResult =  basearchiveUtil.validateSelect2({
			select2Id : "text_type",
		}) && checkResult;
		checkResult =  basearchiveUtil.validateSelect2({
			select2Id : "text_level",
		}) && checkResult;
		checkResult =  basearchiveUtil.validateSelect2({
			select2Id : "cityid",
		}) && checkResult;
		return checkResult;
	}
	
	exports.getFormData = function() {
		
		var formData = {
				name : com_name.attr("value"),
				tel : com_tel.attr("value"),
				address : com_address.attr("value"),
				scenic_abstract : com_abstract.attr("value"),
				
				type_id : com_type.val(),
				level_id : com_level.val(),
				
				region_id : location_region.getRegion_id(),
		}
		
		var optType = store.get("currentOptTypescenic");
		var storeRowData = store.get("currentSelectRowDatascenic");
		
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

			var storeRowData = store.get("currentSelectRowDatascenic");
			var optType = store.get("currentOptTypescenic");

			getUIComponent();
			initFormComponent();
			initFormEvents();
			initFormValue(optType, storeRowData, baseForm);

			//加载验证，验证表单
			theme.setValidateForm($("#" + COMPONENTID_FORM), $.noop());
		});
	};
});