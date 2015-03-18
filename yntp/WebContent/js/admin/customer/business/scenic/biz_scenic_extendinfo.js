/**
 * 酒店扩展信息界面
 */
define(function(require, exports, module) {
	var $ = require("$");
	require("bootstrap_commonrequire");

	var store = require('store');
	var basearchiveUtil = require('basearchive-util');
	var MODULENAME = "scenic_extendinfo";

	var TabbedComponent = require("tabbed");
	var UeditorComponent = require("ueditor");

	var tabbed_ueditor_description;
	var tabbed_ueditor_buynotes;
	var tabbed_ueditor_trafficguide;

	// 初始化Form组件
	var initFormComponent = function(wrapperDivId) {
		new TabbedComponent({
			attrs : {
				id : "extend_info",
				tabs : [ {
					id : "tabbed_scenic_description",
					label : "景点描述"
				}, {
					id : "tabbed_scenic_buynotes",
					label : "购买须知"
				},   {
					id : "tabbed_scenic_trafficguide",
					label : "交通指南"
				}, ]
			},
			renderTo : wrapperDivId
		});

		tabbed_ueditor_description = new UeditorComponent({
			attrs : {
				id : "ueditor_description",
				name : "ueditor_description",
			},
			renderTo : "tabbed_scenic_description"
		});

		tabbed_ueditor_buynotes = new UeditorComponent({
			attrs : {
				id : "ueditor_buynotes",
				name : "ueditor_buynotes",
			},
			renderTo : "tabbed_scenic_buynotes"
		});
		 
		tabbed_ueditor_trafficguide = new UeditorComponent({
			attrs : {
				id : "ueditor_trafficguide",
				name : "ueditor_trafficguide",
			},
			renderTo : "tabbed_scenic_trafficguide"
		});
	}

	// 初始化Form数据
	var initFormValue = function(optType, data) {

		if (optType == basearchiveUtil.FORMOPT_CREATE) { //新增，清空数据
			getImageKey();
			var imagekey = store.get("scenicimagekey");
			tabbed_ueditor_description.initUEditor(imagekey, "");
			tabbed_ueditor_buynotes.initUEditor(imagekey, "");
			 
			tabbed_ueditor_trafficguide.initUEditor(imagekey, "");
		} else if (optType == basearchiveUtil.FORMOPT_UPDATE) { //修改，回填数据
			
			var imagekey = data.imagekey;
			store.set("scenicimagekey",imagekey);
			tabbed_ueditor_description.initUEditor(imagekey, data.scenic_description);
			tabbed_ueditor_buynotes.initUEditor(imagekey, data.scenic_buynotes);
			tabbed_ueditor_trafficguide.initUEditor(imagekey, data.scenic_trafficguide);
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
	        	store.set("scenicimagekey",data.data);
	        },
	        error : function(XMLHttpRequest, textStatus, errorThrown) {
	        	bootbox.alertTimeout('初始化数据出现错误！');
			}
	    });
	}
	
	exports.getFormData = function() {
		var formData = {
			scenic_description : tabbed_ueditor_description.getContent(),
			scenic_buynotes : tabbed_ueditor_buynotes.getContent(),
			scenic_trafficguide : tabbed_ueditor_trafficguide.getContent(),
			imagekey : store.get("scenicimagekey"),
		}
		return formData;
	}
	
	exports.getImageList = function(){
		var descriptionList =  tabbed_ueditor_description.getAllImage();
		var buynotesList =  tabbed_ueditor_buynotes.getAllImage();
		var trafficguideList =  tabbed_ueditor_trafficguide.getAllImage();
		
		var allTemp = $.merge(descriptionList, buynotesList,trafficguideList);      
		return allTemp;
	}

	exports.init = function(param) {
		$(document).ready(function() {

			var wrapperDivId = param.attrs.divWrapperId;
			initFormComponent(wrapperDivId);

			var storeRowData = store.get("currentSelectRowDatascenic");
			var optType = store.get("currentOptTypescenic");

			initFormValue(optType, storeRowData);
		});
	};

});