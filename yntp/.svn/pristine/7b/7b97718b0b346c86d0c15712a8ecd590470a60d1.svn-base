/**
 * 基础档案表单+表格-表单界面
 */
define(function(require, exports, module) {
	var $ = require("$");
	var commonUtil = require('./basearchive-util');
	var bootbox = require('bootbox');
	
	require("bootstrap_commonrequire");
	require('jquery.dataTables');
	require('ajaxReloadDataTable');

	var form = require('form');
	/**
	 * 当前操作状态，默认新建
	 */
	var curtOptType = commonUtil.FORMOPT_CREATE;
	
	/**
	 * 设置当前操作状态 create update
	 */
	exports.setCurtOptType = function(optType){
		curtOptType = optType;
	};
	
	exports.getCurtOptType = function(){
		return curtOptType;
	};
	
	/**
	 * Form表单验证
	 */
	exports.formValidation = function(param){
		var selector = $("#" + param.form_attr.formitem.formid);
		var checkResult = selector.validate().form();
		if (!checkResult)
			return false;
		
		return true;
	};
	
	exports.showMsg = function(msg,msgtype,formid){
		form.showMsg(msg,msgtype,formid);
	}
	
	exports.clearMsg = function(formid){
		form.clearMsg(formid);
	}
	
	/**
	 * 获得按钮的请求URL
	 */
	exports.getSaveUrl = function(optType,createUrl,updateUrl){
		if (optType == commonUtil.FORMOPT_CREATE) {
			return createUrl;
		} else if (optType == commonUtil.FORMOPT_UPDATE) {
			return updateUrl;
		}
	};
	
	/**
	 * 保存按钮，同步方式
	 */
	exports.doSaveAction = function(desurl,data,optType){
		var loader = require('loader');
		var doResult = false;
		var ajaxType = "POST"; 
		loader.loading("正在保存，请稍等……");
		$.ajax({
			async: false,
			type : ajaxType,
			url : desurl,
			data : data,
//			dataType: 'json',
			success : function(resultdata) {
				loader.noloading();
				if('000000' != resultdata.flag){
					doResult = false; 	// 保存出错
					// 显示错误信息
					form.showMsg(resultdata.desc);
				} else {
					doResult = true;
					if (optType == commonUtil.FORMOPT_CREATE) {
						bootbox.alertTimeout("创建成功！");
					} else if (optType == commonUtil.FORMOPT_UPDATE) {
						bootbox.alertTimeout("修改成功！");
					}
				}
			},
			error : function(XMLHttpRequest, textStatus, errorThrown) {
				loader.noloading();
				doResult = false;
				bootbox.alertTimeout("操作失败！");
			}
		});
		return doResult;
	};
	
	/**
	 * 初始化Form，按钮
	 */
	exports.init = function(param){

		var saveButtonId = "btn_mct_save";
		var cancelButtonId = "btn_mct_cancel";
		var custombuttons = null;
		function initAttr(param) {
			// 将保存和取消按钮的id设置成：formid + Buttonid
			var isOverrideButtonId = param.form_attr.formitem.isOverrideButtonId;
			if(isOverrideButtonId != null && isOverrideButtonId == true){
				saveButtonId = param.form_attr.formitem.formid + saveButtonId;
				cancelButtonId = param.form_attr.formitem.formid + cancelButtonId;
			}
			
			// 设置按钮是否显示
			var isShowButtons = param.form_attr.formitem.isShowButtons;
			if(typeof(isShowButtons) == "undefined" || isShowButtons == null){
				param.form_attr.formitem.isShowButtons = true;
			}
			if(param.form_attr.formitem.isShowButtons){
				custombuttons = [ {
					text : "保存",
					id : saveButtonId,
					type : "submit",
					style : "btn btn-primary contrast-background",
					name : "submit",
				}, {
					text : "取消",
					id : cancelButtonId,
					style : "btn",
					type : "button",
					name : "cancel",
				} ];
			} else {
				custombuttons = null;
			}
			
			// 设置自定义按钮
			var hasCustombuttons = param.form_attr.buttons;
			if(hasCustombuttons != null && typeof(hasCustombuttons) != "undefined"){
				custombuttons = hasCustombuttons;
			}
		}
		
		initAttr(param);
		var exportForm = new form({
			attrs : {
				useBoxContent:param.form_attr.formitem.useBoxContent,
				boxContentStyle:param.form_attr.formitem.boxContentStyle,
				title : param.form_attr.formitem.title,
				spansize : param.form_attr.formitem.spansize,
				type : param.form_attr.formitem.type, //create 创建  ; update 更新
				id : param.form_attr.formitem.formid,
				items :param.form_attr.items,
				buttons : custombuttons,
			},
			
			renderTo : param.form_attr.formitem.targetdiv,
		});
		
		return exportForm;
	};
	
});