/**
 * 线路基本信息界面
 */
define(function(require, exports, module) {

	var $ = require("$");
	require("bootstrap_commonrequire");
	var theme = require('bootstrap_theme');
	var store = require('store');

	var basearchiveUtil = require('basearchive-util');
	var ArchiveForm = require('basearchive-form');
	var cityselector_city = require('cityselector_city');

	var FORMOPTURL_QUERY = GLOBAL.BASE + "admin/business/tourismline/search";
	var THEME_QUERY_CREATE = GLOBAL.BASE + "admin/tourismline/tourismlinetheme/create/getallthememodel";
	var THEME_QUERY_UPDATE = GLOBAL.BASE + "admin/tourismline/tourismlinetheme/update/getallthememodel";

	var MODULENAME = "tourismline_baseinfo";

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
				label : "线路名称",
				id : 'text_name',
				name : 'text_name',
				type : "text",
				style : "width:80%",
				placeholder : "请输入线路名称",
				validations : {
					required : true,
					maxlength : 255,
				},
			}, {
				isText : true,
				label : "价格",
				id : 'text_price',
				name : 'text_price',
				type : "text",
				style : "width:80%",
				placeholder : "请输入价格",
				validations : {
					required : true,
					number : true,
					min : 0,
				},
			}, {
				isSelect : true,
				id : 'text_type',
				name : "text_type",
				label : "线路类型",
				type : "select",
				style : "width:80%",
			}, {
				isSelect : true,
				id : 'text_property',
				name : "text_property",
				label : "线路性质",
				type : "select",
				style : "width:80%",
			}, {
				isCheckBox : true,
				label : "线路主题",
				id : 'text_theme',
				name : 'text_theme',
				style : "width:80%",
			}, {
				isDiv : true,
				id : 'start_region',
				name : 'start_region',
				style : "width:80%",
				label : '出发城市',
			}, {
				isDatepicker : true,
				id : 'start_datetime',
				name : 'start_datetime',
				style : "width:80%",
				label : '出发日期',
			},  {
				isDiv : true,
				id : 'target_region',
				name : 'target_region',
				style : "width:80%",
				label : '目的地城市',
			},  {
				isDatepicker : true,
				id : 'end_datetime',
				name : 'end_datetime',
				style : "width:80%",
				label : '结束日期',
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
			} ]
		}
	};

	//------------<组件开始
	var com_name = $('#text_name');
	var com_price = $('#text_price');
	var com_type = $('#text_type');
	var com_property = $('#text_property');
	var com_abstract = $('#textarea_abstract');
	var com_region_start;
	var com_region_target;
	var com_start_datetime;
	var com_end_datetime;
	//------------组件开始>

	function getUIComponent() {
		com_name = $('#text_name');
		com_price = $('#text_price');
		com_type = $('#text_type');
		com_property = $('#text_property');
		com_abstract = $('#textarea_abstract');
		com_start_datetime = $('#start_datetime');
		com_end_datetime = $('#end_datetime');
	}

	// 初始化Form组件
	var initFormComponent = function() {

		basearchiveUtil.initSelect2Value({
			queryUrl:GLOBAL.BASE + "admin/tourismline/tourismlinetype/getselectmodel",
			com_select2 : com_type,
			placeholder : "线路类型",
			errorMsg : "初始化线路类型失败",
		});
		
		basearchiveUtil.initSelect2Value({
			queryUrl:GLOBAL.BASE + "admin/tourismline/tourismlineproperty/getselectmodel",
			com_select2 : com_property,
			placeholder : "线路性质",
			errorMsg : "初始化线路性质失败",
		});
		
		com_region_start = new cityselector_city({
			attrs : {
				provinceid : "start_provinceid",
				cityid : "start_cityid",

				provincewidth : "width:150px",
				citywidth : "width:150px",
			},
			renderTo : "start_region"
		});

		com_region_target = new cityselector_city({
			attrs : {
				provinceid : "target_provinceid",
				cityid : "target_cityid",

				provincewidth : "width:150px",
				citywidth : "width:150px",
			},
			renderTo : "target_region"
		});

		com_start_datetime.datetimepicker({
			language : 'zh-CN',
			pickTime : false,
			format : "yyyy-MM-dd",
		});
		com_end_datetime.datetimepicker({
			language : 'zh-CN',
			pickTime : false,
			format : "yyyy-MM-dd",
		});
	}
	
	// 初始化Form组件事件
	var initFormEvents = function(){
		basearchiveUtil.initValidateSelect2Events({
			select2Id : "text_type",
		});
		basearchiveUtil.initValidateSelect2Events({
			select2Id : "text_property",
		});
		basearchiveUtil.initValidateSelect2Events({
			select2Id : "start_cityid",
		});
		basearchiveUtil.initValidateSelect2Events({
			select2Id : "target_cityid",
		});
	}

	// 初始化Form数据，新建和编辑时
	function initFormValue(optType, data) {
		if (optType == basearchiveUtil.FORMOPT_CREATE) { //新增，清空数据
			if (com_name != 'undefined' && com_name != null)
				com_name.attr("value", "");
			if (com_price != 'undefined' && com_price != null)
				com_price.attr("value", "");
			if (com_abstract != 'undefined' && com_abstract != null)
				com_abstract.attr("value", "");
			
			var start_picker = com_start_datetime.data('datetimepicker');
			start_picker.setLocalDate(new Date());
			var end_picker = com_end_datetime.data('datetimepicker');
			end_picker.setLocalDate(new Date());
			
			// 初始化多选框
			initCheckBox(optType, baseForm);
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
							store.set("currentSelectRowDatatourismline",lastdata);
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
			if (com_abstract != 'undefined' && com_abstract != null)
				com_abstract.attr("value", currentLastData.tl_abstract);

			if (com_type != 'undefined' && com_type != null)
				com_type.select2("val", currentLastData.type_id);

			if (com_property != 'undefined' && com_property != null)
				com_property.select2("val", currentLastData.property_id);

			com_region_start.initRegion(currentLastData.start_city_id);
			com_region_target.initRegion(currentLastData.target_city_id);
			
			var start_picker = com_start_datetime.data('datetimepicker');
			start_picker.setLocalDate(new Date(currentLastData.start_datetime));
			var end_picker = com_end_datetime.data('datetimepicker');
			end_picker.setLocalDate(new Date(currentLastData.end_datetime));
			
			// 初始化多选框
			initCheckBox(optType, baseForm,currentLastData.theme_ids);
		}
	}

	function initCheckBox(optType, baseForm,data) {
		var queryUrl;
		if (optType == basearchiveUtil.FORMOPT_CREATE) { //新增，清空数据
			queryUrl = THEME_QUERY_CREATE;
		} else if (optType == basearchiveUtil.FORMOPT_UPDATE) { //修改，回填数据
			queryUrl = THEME_QUERY_UPDATE;
		}
		// 初始化主题数据
		$.ajax({
			async : false,
			dataType : 'json',
			contentType : "application/json;charset=UTF-8",
			type : "GET",
			url : queryUrl,
			data : {themeids : data},
			success : function(resultdata) {
				if (resultdata && resultdata.flag == "000000") {
					// 解析data
					var param = {
						id : "text_theme",
						options : resultdata.data,
					};

					baseForm.initCheckBox(param);
				} else {
					bootbox.alertTimeout('初始化线路性质数据失败！');
				}
			},
			error : function(XMLHttpRequest, textStatus, errorThrown) {
				bootbox.alertTimeout('查询数据出现错误，请重试！');
			}
		});
	}

	// 校验
	exports.validateForm = function() {
		// 校验框架可以校验的控件
		var selector = $("#" + COMPONENTID_FORM);
		var checkResult = selector.validate().form();
		
		// 校验框架不可以校验的控件
		checkResult =  basearchiveUtil.validateSelect2({
			select2Id : "text_type",
		}) && checkResult;
		
		checkResult =  basearchiveUtil.validateSelect2({
			select2Id : "text_property",
		}) && checkResult;
		
		checkResult =  basearchiveUtil.validateSelect2({
			select2Id : "start_cityid",
		}) && checkResult;
		
		checkResult =  basearchiveUtil.validateSelect2({
			select2Id : "target_cityid",
		}) && checkResult;
		return checkResult;
	}
	
	exports.getFormData = function() {
		var start_picker = com_start_datetime.data('datetimepicker');
		var start_localDate = start_picker.getLocalDate(); // localDate === 2000-01-17 07:00
		var start_currentDate = new Date(start_localDate).format("yyyy-MM-dd HH:mm:ss");
		
		var end_picker = com_end_datetime.data('datetimepicker');
		var end_localDate = end_picker.getLocalDate(); // localDate === 2000-01-17 07:00
		var end_currentDate = new Date(end_localDate).format("yyyy-MM-dd HH:mm:ss");
		
		var formData = {
				name : com_name.attr("value"),
				price : com_price.attr("value"),
				type_id : com_type.val(),
				theme_ids : baseForm.getCheckBox(),
				property_id : com_property.val(),
				start_city_id : com_region_start.getRegion_id(),
				target_city_id : com_region_target.getRegion_id(),
				tl_abstract : com_abstract.attr("value"),
				start_datetime : start_localDate,
				end_datetime : end_localDate,
		}
		
		var optType = store.get("currentOptTypetourismline");
		var storeRowData = store.get("currentSelectRowDatatourismline");
		
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

			var storeRowData = store.get("currentSelectRowDatatourismline");
			var optType = store.get("currentOptTypetourismline");

			getUIComponent();
			initFormComponent();
			initFormEvents();
			initFormValue(optType, storeRowData, baseForm);

			//加载验证，验证表单
			theme.setValidateForm($("#" + COMPONENTID_FORM), $.noop());
		});
	};
});