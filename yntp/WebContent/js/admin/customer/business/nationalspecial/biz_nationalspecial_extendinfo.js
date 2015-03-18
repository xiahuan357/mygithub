/**
 * 民族特产扩展信息界面
 */
define(function(require, exports, module) {
	var $ = require("$");
	require("bootstrap_commonrequire");

	var store = require('store');
	var basearchiveUtil = require('basearchive-util');
	var MODULENAME = "nationalspecial_extendinfo";

	var TabbedComponent = require("tabbed");
	var UeditorComponent = require("ueditor");

	var tabbed_ueditor_description;
	var tabbed_ueditor_specification;

	// 初始化Form组件
	var initFormComponent = function(wrapperDivId) {
		new TabbedComponent({
			attrs : {
				id : "extend_info",
				tabs : [ {
					id : "tabbed_nationalspecial_description",
					label : "民族特产描述"
				}, {
					id : "tabbed_nationalspecial_specification",
					label : "规格说明"
				},    ]
			},
			renderTo : wrapperDivId
		});

		tabbed_ueditor_description = new UeditorComponent({
			attrs : {
				id : "ueditor_description",
				name : "ueditor_description",
			},
			renderTo : "tabbed_nationalspecial_description"
		});

		tabbed_ueditor_specification = new UeditorComponent({
			attrs : {
				id : "ueditor_specification",
				name : "ueditor_specification",
			},
			renderTo : "tabbed_nationalspecial_specification"
		});
	}

	// 初始化Form数据
	var initFormValue = function(optType, data) {

		if (optType == basearchiveUtil.FORMOPT_CREATE) { //新增，清空数据
			getImageKey();
			var imagekey = store.get("nationalspecialimagekey");
			tabbed_ueditor_description.initUEditor(imagekey, "");
			tabbed_ueditor_specification.initUEditor(imagekey, "");
			 
		} else if (optType == basearchiveUtil.FORMOPT_UPDATE) { //修改，回填数据
			
			var imagekey = data.imagekey;
			store.set("nationalspecialimagekey",imagekey);
			tabbed_ueditor_description.initUEditor(imagekey, data.special_description);
			tabbed_ueditor_specification.initUEditor(imagekey, data.special_specification);
		}
	}

	// 新建时，获得图片key
	function getImageKey(){
		$.ajax({
			async : false,
			dataType : 'json',
			contentType : "application/json;charset=UTF-8",
			type : "GET",
	        url:GLOBAL.BASE + "imageupload/imagekey",
	        success : function(data)
	        {
	        	store.set("nationalspecialimagekey",data.data);
	        },
	        error : function(XMLHttpRequest, textStatus, errorThrown) {
	        	bootbox.alertTimeout('初始化数据出现错误！');
			}
	    });
	}
	
	exports.getFormData = function() {
		var formData = {
		    special_description : tabbed_ueditor_description.getContent(),
			special_specification : tabbed_ueditor_specification.getContent(),
			imagekey : store.get("nationalspecialimagekey"),
		}
		return formData;
	}
	
	exports.getImageList = function(){
		var descriptionList =  tabbed_ueditor_description.getAllImage();
		var specificationList =  tabbed_ueditor_specification.getAllImage();
		
		var allTemp = $.merge(descriptionList, specificationList);      
		return allTemp;
	}

	exports.init = function(param) {
		$(document).ready(function() {

			var wrapperDivId = param.attrs.divWrapperId;
			initFormComponent(wrapperDivId);

			var storeRowData = store.get("currentSelectRowDatanationalspecial");
			var optType = store.get("currentOptTypenationalspecial");

			initFormValue(optType, storeRowData);
		});
	};

});