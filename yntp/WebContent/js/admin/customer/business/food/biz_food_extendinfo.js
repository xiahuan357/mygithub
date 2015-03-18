/**
 * 美食扩展信息界面
 */
define(function(require, exports, module) {
	var $ = require("$");
	require("bootstrap_commonrequire");

	var store = require('store');
	var basearchiveUtil = require('basearchive-util');
	var MODULENAME = "food_extendinfo";

	var TabbedComponent = require("tabbed");
	var UeditorComponent = require("ueditor");

	var tabbed_ueditor_description;

	// 初始化Form组件
	var initFormComponent = function(wrapperDivId) {
		new TabbedComponent({
			attrs : {
				id : "extend_info",
				tabs : [ {
					id : "tabbed_food_description",
					label : "美食描述"
				}  ]
			},
			renderTo : wrapperDivId
		});

		tabbed_ueditor_description = new UeditorComponent({
			attrs : {
				id : "ueditor_description",
				name : "ueditor_description",
			},
			renderTo : "tabbed_food_description"
		});

	}

	// 初始化Form数据
	var initFormValue = function(optType, data) {

		if (optType == basearchiveUtil.FORMOPT_CREATE) { //新增，清空数据
			getImageKey();
			var imagekey = store.get("foodimagekey");
			tabbed_ueditor_description.initUEditor(imagekey, "");
			 
		} else if (optType == basearchiveUtil.FORMOPT_UPDATE) { //修改，回填数据
			
			var imagekey = data.imagekey;
			store.set("foodimagekey",imagekey);
			tabbed_ueditor_description.initUEditor(imagekey, data.food_description);
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
	        	store.set("foodimagekey",data.data);
	        },
	        error : function(XMLHttpRequest, textStatus, errorThrown) {
	        	bootbox.alertTimeout('初始化数据出现错误！');
			}
	    });
	}
	
	exports.getFormData = function() {
		var formData = {
		    food_description : tabbed_ueditor_description.getContent(),
			imagekey : store.get("foodimagekey"),
		}
		return formData;
	}
	
	exports.getImageList = function(){
		var descriptionList =  tabbed_ueditor_description.getAllImage();
		
		return descriptionList;
	}

	exports.init = function(param) {
		$(document).ready(function() {

			var wrapperDivId = param.attrs.divWrapperId;
			initFormComponent(wrapperDivId);

			var storeRowData = store.get("currentSelectRowDatafood");
			var optType = store.get("currentOptTypefood");

			initFormValue(optType, storeRowData);
		});
	};

});