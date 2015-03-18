/**
 * 基础档案辅助类
 */
define(function(require, exports, module) {
	var $ = require("$");
	/**
	 * 常量
	 */
	exports.FORMOPT_CREATE="create";
	exports.FORMOPT_UPDATE="update";
	
	var store = require('store');
	
	exports.cutLength = function(param,length){
		if(param == null || param=="")
			return param;
		
		var stringLen = param.length;
		var showMsg = stringLen > length ? param.substring(0,length)+".." : param;
		return showMsg;
	};
	
	/**
	 * 清除本地缓存
	 */
	exports.clearStoreCache = function(cacheKeyList){
		if(cacheKeyList == null)
			return;
		
		for(var i =0; i < cacheKeyList.length;i++){
			store.remove(cacheKeyList[i]);
		}
	};
	
	// 界面跳转
	exports.jumpToHtml = function(targetUrl){
		$.ajax({
			url : targetUrl,
			dataType : "html",
			contentType : "application/json; charset=utf-8",
			success : function(res) {
				$("#content-wrapper").html(res);
			},
			error : function(XMLHttpRequest, textStatus, errorThrown) {
				bootbox.alertTimeout('Ajax请求发生错误！');
			}
		});
	};
	
	//---------------------------------------------------------------------------------------------
	
	/**
	 * 初始化select2下拉框
	 */
	exports.initSelect2Value = function(param){
		$.ajax({
			async : false,
			dataType : 'json',
			contentType : "application/json;charset=UTF-8",
			type : "GET",
			url : param.queryUrl,
			success : function(resultdata) {
				if (resultdata && resultdata.flag == "000000") {
					// 解析data
					param.com_select2.select2({
						placeholder : param.placeholder,
						allowClear : false,
						multiple : false,
						data : resultdata.data
					});
				} else {
					bootbox.alertTimeout(param.errorMsg);
				}
			},
			error : function(XMLHttpRequest, textStatus, errorThrown) {
				bootbox.alertTimeout(param.errorMsg);
			}
		});
	}
	
	// 为select2组件添加变化事件，如果选中，则将错误信息移除
	exports.initValidateSelect2Events = function(param){
		var select2Com = $("#" + param.select2Id);
		select2Com.on("change", function(e) {
			
			if (e.val != null && e.val != "") {
				var errorSpanId = "span" + param.select2Id;
				if($("#"+errorSpanId).length > 0){
					$("#"+errorSpanId).remove();
				}
				
				var parentCom = select2Com.parent();
				while(parentCom.length > 0){
					var classValue = parentCom.attr("class");
					if(classValue != null && classValue.indexOf("control-group") > -1){
						parentCom.removeAttr("style");
						break;
					} else {
						parentCom = parentCom.parent();
					}
				} 
			}
		});
	}
	
	// 校验select2组件是否选中
	exports.validateSelect2 = function(param){
		var checkResult = true;
		var select2Com = $("#" + param.select2Id);
		var selectValue = select2Com.attr("value");
		var errorSpanId = "span" + param.select2Id;
		
		if(selectValue == "" || selectValue == null  || typeof(selectValue) == "undefined"){
			if($("#"+errorSpanId).length > 0){
			} else {
				var parentCom = select2Com.parent();
				while(parentCom.length > 0){
					var classValue = parentCom.attr("class");
					if(classValue != null && classValue.indexOf("control-group") > -1){
						parentCom.css("color","#b94a48");
						break;
					} else {
						parentCom = parentCom.parent();
					}
				} 
				parentCom = select2Com.parent();
				while(parentCom.length > 0){
					var classValue = parentCom.attr("class");
					if(classValue != null && classValue.indexOf("controls") > -1){
						parentCom.append('<span id="' + errorSpanId + '" for="' + param.select2Id + '" style="color:#b94a48" class="help-block error">必选字段</span>');
						break;
					} else {
						parentCom = parentCom.parent();
					}
				} 
			}
			checkResult = false;
		}
		return checkResult;
	}
	
	/**
	 * 初始化时间范围
	 */
	exports.initDateRange = function(param){
		
		param.com_daterange.data('daterangepicker').setStartDate(param.start);
		param.com_daterange.data('daterangepicker').setEndDate(param.end);
    	
    	var range =  param.start +"/"+ param.end
    	param.com_daterange.prev().val(range);
	}
	
	/**
	 * 获取时间范围
	 */
	exports.getDateRange = function(param){
		var dateText = param.com_daterange.prev().val();
		
		var vdate=dateText.split("/");
		var vdate_start=vdate[0];
		var vdate_end=vdate[1];
		return {
			start : vdate_start,
			end : vdate_end,
		}
	}
});
