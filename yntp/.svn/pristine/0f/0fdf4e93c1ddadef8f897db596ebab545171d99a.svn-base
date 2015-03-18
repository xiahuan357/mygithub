/**
 * 图库
 */
define(function(require, exports, module) {
	var $ = require("$");
	require("bootstrap_commonrequire");

	var store = require('store');
	var basearchiveUtil = require('basearchive-util');
	var MODULENAME = "scenic_imagelibrary";

	var ImageLibrary = require("imagelibrary");

	var scenicImageLibrary;
	// 初始化Form组件
	var initFormComponent = function(wrapperDivId) {
		 scenicImageLibrary = new ImageLibrary({
			 attrs : {
				 editorid : "scenic_imagelibrary",
			 },
			 renderTo : wrapperDivId
		 });
	}

	// 初始化Form数据
	var initFormValue = function(optType, data) {

		if (optType == basearchiveUtil.FORMOPT_CREATE) { //新增，清空数据
			getImagelibrarykey();
			var imagelibrarykey = store.get("scenicimagelibrarykey");
			scenicImageLibrary.initUploadUEditor("scenic",imagelibrarykey);
			scenicImageLibrary.initImageLibrary(basearchiveUtil.FORMOPT_CREATE,imagelibrarykey);
		} else if (optType == basearchiveUtil.FORMOPT_UPDATE) { //修改，回填数据
			var imagelibrarykey = data.imagelibrarykey;
			store.set("scenicimagelibrarykey",imagelibrarykey);
			scenicImageLibrary.initUploadUEditor("scenic",imagelibrarykey);
			scenicImageLibrary.initImageLibrary(basearchiveUtil.FORMOPT_UPDATE,imagelibrarykey,data.coverimagename);
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
	        	store.set("scenicimagelibrarykey",data.data);
	        },
	        error : function(XMLHttpRequest, textStatus, errorThrown) {
	        	bootbox.alertTimeout('初始化数据出现错误！');
			}
	    });
	}
	
	exports.getFormData = function() {
		var formData = {
			imagelibrarykey : store.get("scenicimagelibrarykey"),
			coverimagename : scenicImageLibrary.getCoverFileName(),
		}
		return formData;
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