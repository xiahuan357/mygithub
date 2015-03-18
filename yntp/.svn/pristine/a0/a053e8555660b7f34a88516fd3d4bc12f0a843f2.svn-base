/**
 * 图库
 */
define(function(require, exports, module) {
	var $ = require("$");
	require("bootstrap_commonrequire");

	var store = require('store');
	var basearchiveUtil = require('basearchive-util');
	var MODULENAME = "tourismline_imagelibrary";

	var ImageLibrary = require("imagelibrary");

	var tourismlineImageLibrary;
	// 初始化Form组件
	var initFormComponent = function(wrapperDivId) {
		 tourismlineImageLibrary = new ImageLibrary({
			 attrs : {
				 editorid : "tourismline_imagelibrary",
			 },
			 renderTo : wrapperDivId
		 });
	}

	// 初始化Form数据
	var initFormValue = function(optType, data) {

		if (optType == basearchiveUtil.FORMOPT_CREATE) { //新增，清空数据
			getImagelibrarykey();
			var imagelibrarykey = store.get("tourismlineimagelibrarykey");
			tourismlineImageLibrary.initUploadUEditor("tourismline",imagelibrarykey);
			tourismlineImageLibrary.initImageLibrary(basearchiveUtil.FORMOPT_CREATE,imagelibrarykey);
		} else if (optType == basearchiveUtil.FORMOPT_UPDATE) { //修改，回填数据
			var imagelibrarykey = data.imagelibrarykey;
			store.set("tourismlineimagelibrarykey",imagelibrarykey);
			tourismlineImageLibrary.initUploadUEditor("tourismline",imagelibrarykey);
			tourismlineImageLibrary.initImageLibrary(basearchiveUtil.FORMOPT_UPDATE,imagelibrarykey,data.coverimagename);
		}
	}

	// 新建时，获得图片key
	function getImagelibrarykey(){
		$.ajax({
			async : false,
			dataType : 'json',
			contentType : "application/json;charset=UTF-8",
			type : "GET",
	        url:GLOBAL.BASE + "imageupload/imagekey",
	        success : function(data)
	        {
	        	store.set("tourismlineimagelibrarykey",data.data);
	        },
	        error : function(XMLHttpRequest, textStatus, errorThrown) {
	        	bootbox.alertTimeout('初始化数据出现错误！');
			}
	    });
	}
	
	exports.getFormData = function() {
		var formData = {
			imagelibrarykey : store.get("tourismlineimagelibrarykey"),
			coverimagename : tourismlineImageLibrary.getCoverFileName(),
		}
		return formData;
	}
	
	exports.getImageList = function(){
		var descriptionList =  tabbed_ueditor_description.getAllImage();
		return allTemp;
	}

	exports.init = function(param) {
		$(document).ready(function() {

			var wrapperDivId = param.attrs.divWrapperId;
			initFormComponent(wrapperDivId);

			var storeRowData = store.get("currentSelectRowDatatourismline");
			var optType = store.get("currentOptTypetourismline");

			initFormValue(optType, storeRowData);
		});
	};

});