/**
 * 文字广告信息-form
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
	
	var FORMOPTURL_INSERT= GLOBAL.BASE + "admin/ads/adstext/create";
	var FORMOPTURL_UPDATE= GLOBAL.BASE + "admin/ads/adstext/update";
	
	var TARGETDIV_FORM = "basearchive_form";
	var MODULENAME = "ads_text";
	
	var COMPONENTID_FORM = "validationform" + "_" + MODULENAME;
	
	var tableUrl = GLOBAL.HTML_HOME + "admin/sys/ads/sys_ads_text_table.html";
	
	var defaultDateValue = new Date().format("yyyy-MM-dd");
	
	var form_param = {
		// Form信息
		form_attr : {
			formitem : {
				title : "文字广告信息",
				spansize : 'span12',
				type : basearchiveUtil.FORMOPT_CREATE, // create 创建 ; update 更新
				formid : COMPONENTID_FORM,
				targetdiv : TARGETDIV_FORM,
			},
			items : [ 
		   {
				isHidden : true,
				id : 'hidden_id',
				name : 'hidden_id',
				value : ''
			},{
				isText : true,
				label : "广告内容",
				id : 'text_name',
				name : 'text_name',
				type : "text",
				style : "width:80%",
				placeholder : "请输入广告内容",
				validations : {
					required : true,
					minlength : 1,
					maxlength : 255,
			   },
			}, {
				isText : true,
				label : "广告链接",
				id : 'text_url',
				name : 'text_url',
				type : "text",
				style : "width:80%",
				placeholder : "请输入广告链接",
				validations : {
					required : true,
					minlength : 1,
					maxlength : 255,
			   },
			}, {
				isText : true,
				label : "广告描述",
				id : 'text_description',
				name : 'text_description',
				type : "text",
				style : "width:80%",
				placeholder : "请输入广告描述",
				validations : {
					required : true,
					minlength : 1,
					maxlength : 255,
			   },
			}, {
				isText : true,
				label : "位置说明",
				id : 'text_position',
				name : 'text_position',
				type : "text",
				style : "width:80%",
				placeholder : "请输入位置说明",
				validations : {
					required : true,
					minlength : 1,
					maxlength : 255,
			   },
			}, {
				isDaterange : true,
				label : "起始时间",
				id : 'date_range',
				name : 'date_range',
				style : "width:80%",
				format : "YYYY-MM-DD",
				placeholder : "请选择起始时间",
			}
			]
		}
	};
	
	// ------------<组件开始
	var com_id = $('#hidden_id');
	var com_name = $('#text_name');
	var com_url = $('#text_url');
	
	var com_description = $('#text_description');
	var com_position = $('#text_position');
	
	var com_daterange = $('#date_range');
	// ------------组件开始>

	function getUIComponent() {
		// ------------<组件开始
		com_id = $('#hidden_id');
		com_name = $('#text_name');
		com_url = $('#text_url');

		com_description = $('#text_description');
		com_position = $('#text_position');

		com_daterange = $('#date_range');
		// ------------组件开始>
	}
	
	// 保存
	var fnsubmithandler = function(){
		var optType = store.get("currentOptType" + MODULENAME);
		
		var vid = com_id.attr("value");
		var vname = com_name.attr("value");
		var vurl = com_url.attr("value");
		var vdescription = com_description.attr("value");
		var vposition = com_position.attr("value");
		
		var vdate=basearchiveUtil.getDateRange({
			com_daterange : com_daterange,
		});
		var vdate_start= vdate.start;
		var vdate_end= vdate.end;
        
		//------------------------
		var data = {
			name : vname,
			url : vurl,
			description : vdescription,
			position_id : vposition,
			starttime : new Date( vdate_start),
			endtime : new Date( vdate_end),
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
		
		if (optType == basearchiveUtil.FORMOPT_CREATE) {
			if (com_id != 'undefined' && com_id != null)
				com_id.attr("value", "");
			if (com_name != 'undefined' && com_name != null)
				com_name.attr("value", "");
			if (com_url != 'undefined' && com_url != null)
				com_url.attr("value", "");
			if (com_description != 'undefined' && com_description != null)
				com_description.attr("value", "");
			if (com_position != 'undefined' && com_position != null)
				com_position.attr("value", "");
			
		} else if (optType == basearchiveUtil.FORMOPT_UPDATE) {
			// 重新从数据库中读取数据
			var queryUrl = GLOBAL.BASE +  "admin/ads/adstext/search?q=id=" + data.id;
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
			
			if (com_id != 'undefined' && com_id != null)
				com_id.attr('value', lastdata.id);
			if (com_name != 'undefined' && com_name != null)
				com_name.attr("value", lastdata.name);
			if (com_url != 'undefined' && com_url != null)
				com_url.attr("value", lastdata.url);
			if (com_description != 'undefined' && com_description != null)
				com_description.attr("value", lastdata.description);
			if (com_position != 'undefined' && com_position != null)
				com_position.attr("value", lastdata.position_id);
			
			if (com_daterange   != 'undefined' && com_daterange   != null){
				basearchiveUtil.initDateRange({
					com_daterange : com_daterange,
					start : lastdata.starttime,
					end : lastdata.endtime,
				})
			}
		}
	}
	
	exports.init = function(){
		$(document).ready(function() {
			// 当前操作：新建，编辑
			var optType = store.get("currentOptType" + MODULENAME);
			var storeRowData = store.get("currentSelectRowData" + MODULENAME);
			
			form.init(form_param);
			getUIComponent();
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