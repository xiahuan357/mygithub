/**
 * 酒店房间基本信息界面
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

	var FORMOPTURL_QUERY = GLOBAL.BASE + "admin/business/hotelroom/search";

	var MODULENAME = "hotelroom_baseinfo";

	var COMPONENTID_FORM = "validationform" + "_" + MODULENAME;

	// 保存当对象数据
	var currentLastData;
	var baseForm;
	var form_param = {
			// Form信息
			form_attr : {
				formitem : {
					title : "酒店房间",
					spansize : 'span12',
					type : basearchiveUtil.FORMOPT_CREATE, // create 创建 ; update 更新
					formid : COMPONENTID_FORM,
					isShowButtons : false,
					boxContentStyle : "box-content  "
				},
				items : [  
		         {
					isText : true,
					label : "住房面积",
					name : "text_area",
					id : "text_area",
					type : "text",
					style : "width:80%",
					placeholder : "住房面积",
					validations : {
						required : true,
						number : true,
						min : 0,
					},
				},{
					isText : true,
					label : "楼层",
					name : "text_floor",
					id : "text_floor",
					type : "text",
					style : "width:80%",
					placeholder : "楼层",
					validations : {
						required : true,
						number : true,
						min : 0,
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
					label : "房间数量",
					name : "text_count",
					id : "text_count",
					type : "text",
					style : "width:80%",
					placeholder : "房间数量",
					validations : {
						required : true,
						number : true,
						min : 0,
					},
				},{
					isSelect : true,
					id : 'text_type',
					name : "text_type",
					label : "房间类型",
					type : "select",
					style : "width:80%",
				},  {
					isSelect : true,
					id : 'text_bed_type',
					name : "text_bed_type",
					label : "房间床型",
					type : "select",
					style : "width:80%",
				},  {
					isSelect : true,
					id : 'text_breakfast_type',
					name : "text_breakfast_type",
					label : "早餐类型",
					type : "select",
					style : "width:80%",
				}, {
					isSelect : true,
					id : 'text_windows_type',
					name : "text_windows_type",
					label : "窗户类型",
					type : "select",
					style : "width:80%",
				}, {
					isSelect : true,
					id : 'text_bath_type',
					name : "text_bath_type",
					label : "卫浴类型",
					type : "select",
					style : "width:80%",
				}, {
					isSelect : true,
					id : 'text_broadband_type',
					name : "text_broadband_type",
					label : "宽带类型",
					type : "select",
					style : "width:80%",
				}, {
					isHidden : true,
					id : 'hidden_imagekey',
				} ]
			},
		};

	// ------------<组件开始
	var com_type = $('#text_type');
	var com_bed_type = $('#text_bed_type');
	var com_area = $('#text_area');
	var com_floor = $('#text_floor');
	var com_price = $('#text_price');
	var com_count = $('#text_count');
	var com_breakfast_type = $('#text_breakfast_type');
	var com_windows_type= $('#text_windows_type');
	var com_bath_type = $('#text_bath_type');
	var com_broadband_type = $('#text_broadband_type');
	var com_imagekey = $('#hidden_imagekey');
	// ------------组件开始>

	function getUIComponent() {
		// ------------<组件开始
		 com_type = $('#text_type');
		 com_bed_type = $('#text_bed_type');
		 com_area = $('#text_area');
		 com_floor = $('#text_floor');
		 com_price = $('#text_price');
		 com_count = $('#text_count');
		 com_breakfast_type = $('#text_breakfast_type');
		 com_windows_type= $('#text_windows_type');
		 com_bath_type = $('#text_bath_type');
		 com_broadband_type = $('#text_broadband_type');
		 com_imagekey = $('#hidden_imagekey');
		// ------------组件开始>
	}

	// 初始化Form组件
	var initFormComponent = function() {
		basearchiveUtil.initSelect2Value({
			queryUrl:GLOBAL.BASE + "admin/hotel/hotelroomtype/getselectmodel",
			com_select2 : com_type,
			placeholder : "房间类型",
			errorMsg : "初始化房间类型失败",
		});
		basearchiveUtil.initSelect2Value({
			queryUrl:GLOBAL.BASE + "admin/hotel/hotelbedtype/getselectmodel",
			com_select2 : com_bed_type,
			placeholder : "床型",
			errorMsg : "初始化房间床型失败",
		});
		basearchiveUtil.initSelect2Value({
			queryUrl: GLOBAL.BASE + "admin/business/hotelroom/breakfasttype/getselectmodel",
			com_select2 : com_breakfast_type,
			placeholder : "早餐类型",
			errorMsg : "初始化早餐类型失败",
		});
		basearchiveUtil.initSelect2Value({
			queryUrl:GLOBAL.BASE + "admin/business/hotelroom/windowstype/getselectmodel",
			com_select2 : com_windows_type,
			placeholder : "窗户类型",
			errorMsg : "初始化窗户类型失败",
		});
		basearchiveUtil.initSelect2Value({
			queryUrl:GLOBAL.BASE + "admin/business/hotelroom/bathtype/getselectmodel",
			com_select2 : com_bath_type,
			placeholder : "卫浴类型",
			errorMsg : "初始化卫浴类型失败",
		});
		basearchiveUtil.initSelect2Value({
			queryUrl:GLOBAL.BASE + "admin/business/hotelroom/broadbandtype/getselectmodel",
			com_select2 : com_broadband_type,
			placeholder : "宽带类型",
			errorMsg : "初始化宽带类型失败",
		});
	}

	// 初始化Form组件事件
	var initFormEvents = function(){
		basearchiveUtil.initValidateSelect2Events({
			select2Id : "text_type",
		});
		
		basearchiveUtil.initValidateSelect2Events({
			select2Id : "text_bed_type",
		});
		
		basearchiveUtil.initValidateSelect2Events({
			select2Id : "text_breakfast_type",
		});
		
		basearchiveUtil.initValidateSelect2Events({
			select2Id : "text_windows_type",
		});
		
		basearchiveUtil.initValidateSelect2Events({
			select2Id : "text_bath_type",
		});
		
		basearchiveUtil.initValidateSelect2Events({
			select2Id : "text_broadband_type",
		});
	}

	// 初始化Form数据，新建和编辑时
	function initFormValue(optType, data) {
		if (optType == basearchiveUtil.FORMOPT_CREATE) { // 新增，清空数据
			if (com_area != 'undefined' && com_area != null)
				com_area.val("");
			if (com_floor  != 'undefined' && com_floor  != null)
				com_floor .val("");
			if (com_price  != 'undefined' && com_price  != null)
				com_price .val("");
			if (com_count  != 'undefined' && com_count  != null)
				com_count .val("");

			getImageKey();// 初始化图片key
		} else if (optType == basearchiveUtil.FORMOPT_UPDATE) { // 修改，回填数据

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

			if (com_area != 'undefined' && com_area != null)
				com_area.val(lastdata.area);
			if (com_floor  != 'undefined' && com_floor  != null)
				com_floor .val(lastdata.floor);
			if (com_price  != 'undefined' && com_price  != null)
				com_price .val(lastdata.price);
			if (com_count  != 'undefined' && com_count  != null)
				com_count .val(lastdata.count);
			if (com_imagekey   != 'undefined' && com_imagekey   != null)
				com_imagekey  .val(lastdata.imagekey);
			
 			if (com_type   != 'undefined' && com_type   != null){}
				com_type .select2("val", lastdata.hotelRoomTypeEntity.id);
			if (com_bed_type   != 'undefined' && com_bed_type   != null)
				com_bed_type .select2("val", lastdata.bed_type_id);
			if (com_breakfast_type   != 'undefined' && com_breakfast_type   != null)
				com_breakfast_type .select2("val", lastdata.breakfast_type_id);
			if (com_windows_type  != 'undefined' && com_windows_type  != null)
				com_windows_type.select2("val", lastdata.windows_type_id);
			if (com_bath_type  != 'undefined' && com_bath_type  != null)
				com_bath_type.select2("val", lastdata.bath_type_id);
			if (com_broadband_type  != 'undefined' && com_broadband_type  != null)
				com_broadband_type.select2("val", lastdata.broadband_type_id);
		}
	}
	// 新建时，获得图片key
	function getImageKey() {
		$.ajax({
			async : false,
			dataType : 'json',
			contentType : "application/json;charset=UTF-8",
			type : "GET",
			url : GLOBAL.BASE + "imageupload/imagekey",
			success : function(resultdata) {
				if('000000' != resultdata.flag){
					// 显示错误信息
					bootbox.alertTimeout(resultdata.desc);
				} else {
					$("#hidden_imagekey").attr("value", resultdata.data);
				}
			},
			error : function(XMLHttpRequest, textStatus, errorThrown) {
				bootbox.alertTimeout('初始化数据出现错误！');
			},
		});
	}
	
	exports.validateForm = function() {
		// 校验框架可以校验的控件
		var selector = $("#" + COMPONENTID_FORM);
		var checkResult = selector.validate().form();
		
		checkResult =  basearchiveUtil.validateSelect2({
			select2Id : "text_type",
		}) && checkResult;
		checkResult =  basearchiveUtil.validateSelect2({
			select2Id : "text_bed_type",
		}) && checkResult;
		checkResult =  basearchiveUtil.validateSelect2({
			select2Id : "text_breakfast_type",
		}) && checkResult;
		checkResult =  basearchiveUtil.validateSelect2({
			select2Id : "text_windows_type",
		}) && checkResult;
		checkResult =  basearchiveUtil.validateSelect2({
			select2Id : "text_bath_type",
		}) && checkResult;
		checkResult =  basearchiveUtil.validateSelect2({
			select2Id : "text_broadband_type",
		}) && checkResult;
		return checkResult;
	}
	
	exports.getFormData = function() {
		
		var vtype_id = com_type.val();
		var vbed_type_id = com_bed_type.val();
		var varea = com_area.attr("value"); //  
		var vfloor = com_floor.attr("value"); //  
		var vprice = com_price.attr("value"); //  
		var vcount = com_count.attr("value"); //  
		
		var vbreakfast_type_id = com_breakfast_type.val();
		var vwindows_type_id = com_windows_type.val();
		var vbath_type_id = com_bath_type.val();
		var vbroadband_type_id = com_broadband_type.val();
		var vimagekey = com_imagekey.attr("value"); //  
		
		var optType = store.get("currentOptTypehotelroom");
		var storeRowData = store.get("currentSelectRowDatahotelroom");
		var hotelInfo = store.get("currentSelectRowDatahotel"); 
		
		var hotelRoomTypeEntity  = {
				id : vtype_id
		};
		
		var currentEntity = {
				hotelRoomTypeEntity : hotelRoomTypeEntity,
				bed_type_id : vbed_type_id, 
				area : varea, 
				floor : vfloor, 
				price : vprice, 
				count : vcount, 
				breakfast_type_id : vbreakfast_type_id, 
				windows_type_id : vwindows_type_id, 
				bath_type_id : vbath_type_id, 
				broadband_type_id : vbroadband_type_id, 
				hotel_id : hotelInfo.id,
				imagekey : vimagekey,
		}
		
		if (optType == basearchiveUtil.FORMOPT_UPDATE) {
			currentEntity.id = storeRowData.id;
			currentEntity.createtime = new Date(currentLastData.createtime).format("yyyy-MM-dd hh:mm:ss");
		} else {
		}
		 
		return currentEntity;
	}

	exports.init = function(param) {
		$(document).ready(function() {

			form_param.form_attr.formitem.targetdiv = param.attrs.divWrapperId;
		    baseForm = ArchiveForm.init(form_param);

			var storeRowData = store.get("currentSelectRowDatahotelroom");
			var optType = store.get("currentOptTypehotelroom");

			getUIComponent();
			initFormComponent();
			initFormEvents();
			initFormValue(optType, storeRowData, baseForm);

			//加载验证，验证表单
			theme.setValidateForm($("#" + COMPONENTID_FORM), $.noop());
		});
	};
});