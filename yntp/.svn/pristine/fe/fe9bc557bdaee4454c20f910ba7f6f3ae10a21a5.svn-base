/**
 * UEditor，单图片上传
 */
define(function(require, exports, module) {

	var $ = require("$");
	require("bootstrap_commonrequire");
	require("bootbox.css");
	
	// ------------<ue
	require('ueditor.config-1.3.6');
	require('ueditor.all-1.3.6');
	require('ueditor-zh-cn-1.3.6');
	// ------------ue>
	var baseRoot = GLOBAL.BASE;
	// 当前操作上传组件id
	var currentOptEditorId;
	function initUEditor(imagekey,attrs){
		// 重新实例化一个编辑器，防止在上面的editor编辑器中显示上传的图片或者文件
		var option = {
    			imageUrl: GLOBAL.BASE + "imageupload/ueditorpicupload?imagekey=" + imagekey,
				imagePath: baseRoot,
    	};
    	
		_editor = new UE.ui.Editor(option);
		_editor.render(attrs.editorid);
	    _editor = UE.getEditor(attrs.editorid,option);
	    _editor.ready(function () {
	        // 隐藏编辑器，因为不会用到这个编辑器实例，所以要隐藏
//	        _editor.hide();
	        // 侦听图片上传
	        _editor.addListener('beforeinsertimage', function (t, arg) {
	        	if(currentOptEditorId == attrs.editorid){
	        		// 将地址赋值给相应的input,只取第一张图片的路径
		            $("#" + attrs.editorid + "_path_picture").attr("value", arg[0].src);
		            // 图片预览
		            $("#" + attrs.editorid + "_picture_preview").attr("src", arg[0].src);
	        	}
	        })
	        // 侦听文件上传，取上传文件列表中第一个上传的文件的路径
	        _editor.addListener('afterUpfile', function (t, arg) {
	            $("#file").attr("value", _editor.options.filePath + arg[0].url);
	        })
	    });
	    
	    $("#" + attrs.editorid + "_btn_picture").die().live('click', function() {
	    	currentOptEditorId = attrs.editorid ;
	    	var myImage = _editor.getDialog("insertimage");
		    myImage.open();
	    });
	}
	$(document).ready(function() {
	    
	});    
	
	// 实例化组件-------------------------START
	var template = require("./imageupload.tpl");
	var Widget = require("widget");	
	var Component = Widget.extend({
		template : template,
		afterRender : function() {
			// 输入项初始化
			var attrs = this.get("attrs");
			
			if(attrs.optType == "create"){
			} else if(attrs.optType == "update"){
				// 初始化预览图
				picturePath = attrs.picturePath;
				$("#" + attrs.editorid + "_path_picture").attr("value", picturePath);
				$("#" + attrs.editorid + "_picture_preview").attr("src", picturePath);
			}
			initUEditor(attrs.imagekey,attrs);
			// 设置编辑框不显示
			$(".edui-editor").css("display","none");
		}
	});
	module.exports = Component;	
});