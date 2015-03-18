/**
 * 租车扩展信息界面
 */
define(function(require, exports, module) {
	var $ = require("$");
	require("bootstrap_commonrequire");

	var store = require('store');
	var basearchiveUtil = require('basearchive-util');
	var MODULENAME = "equipment_extendinfo";

	var TabbedComponent = require("tabbed");
	var UeditorComponent = require("ueditor");

	var tabbed_ueditor_description;
	var tabbed_ueditor_buynotes;

	// 初始化Form组件
	var initFormComponent = function(wrapperDivId) {
		new TabbedComponent({
			attrs : {
				id : "extend_info",
				tabs : [ {
					id : "tabbed_equipment_description",
					label : "旅游装备描述"
				}, {
					id : "tabbed_equipment_buynotes",
					label : "租赁指南"
				},    ]
			},
			renderTo : wrapperDivId
		});

		tabbed_ueditor_description = new UeditorComponent({
			attrs : {
				id : "ueditor_description",
				name : "ueditor_description",
			},
			renderTo : "tabbed_equipment_description"
		});

		tabbed_ueditor_buynotes = new UeditorComponent({
			attrs : {
				id : "ueditor_buynotes",
				name : "ueditor_buynotes",
			},
			renderTo : "tabbed_equipment_buynotes"
		});
	}

	// 初始化Form数据
	var initFormValue = function(optType, data) {

		if (optType == basearchiveUtil.FORMOPT_CREATE) { //新增，清空数据
			getImageKey();
			var imagekey = store.get("equipmentimagekey");
			tabbed_ueditor_description.initUEditor(imagekey, "");
			tabbed_ueditor_buynotes.initUEditor(imagekey, "");
			 
		} else if (optType == basearchiveUtil.FORMOPT_UPDATE) { //修改，回填数据
			
			var imagekey = data.imagekey;
			store.set("equipmentimagekey",imagekey);
			tabbed_ueditor_description.initUEditor(imagekey, data.equipment_description);
			tabbed_ueditor_buynotes.initUEditor(imagekey, data.equipment_buynotes);
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
	        	store.set("equipmentimagekey",data.data);
	        },
	        error : function(XMLHttpRequest, textStatus, errorThrown) {
	        	bootbox.alertTimeout('初始化数据出现错误！');
			}
	    });
	}
	
	exports.getFormData = function() {
		var formData = {
			equipment_description : tabbed_ueditor_description.getContent(),
			equipment_buynotes : tabbed_ueditor_buynotes.getContent(),
			imagekey : store.get("equipmentimagekey"),
		}
		return formData;
	}
	
	exports.getImageList = function(){
		var descriptionList =  tabbed_ueditor_description.getAllImage();
		var buynotesList =  tabbed_ueditor_buynotes.getAllImage();
		
		var allTemp = $.merge(descriptionList, buynotesList);      
		return allTemp;
	}

	exports.init = function(param) {
		$(document).ready(function() {

			var wrapperDivId = param.attrs.divWrapperId;
			initFormComponent(wrapperDivId);

			var storeRowData = store.get("currentSelectRowDataequipment");
			var optType = store.get("currentOptTypeequipment");

			initFormValue(optType, storeRowData);
		});
	};

});