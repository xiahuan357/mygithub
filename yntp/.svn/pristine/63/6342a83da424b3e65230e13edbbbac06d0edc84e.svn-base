/**
 * ueditor组件
 */
define(function(require, exports, module) {
	var $ = require("$");
	
	require("bootstrap_commonrequire");
	// ------------<ue
	require('ueditor.config-1.3.6');
	require('ueditor.all-1.3.6');
	require('ueditor-zh-cn-1.3.6');
	// ------------ue>
	
	var baseRoot = GLOBAL.BASE;
	
	// 实例化组件
	var template = require("./ueditor.tpl");
	var Widget = require("widget");

	var Component = Widget.extend({
		initCustAttr : function() {
			// 组件参数
			var attrs = this.get("attrs");
		},
		template : template,
		afterRender : function() {
			// 组件参数
			var attrs = this.get("attrs");
		},
		initUEditor : function(imagekey, content) {
			// 组件参数
			var attrs = this.get("attrs");
			var option = {
				imageUrl : GLOBAL.BASE + "imageupload/ueditorpicupload?imagekey=" + imagekey,
				imagePath : baseRoot,
				initialFrameHeight : 320,
				autoClearinitialContent : true, // 是否自动清除编辑器初始内容
				elementPathEnabled : false,
			};
			editor = new UE.ui.Editor(option);
			editor.render(attrs.id);

			if (content == null) {
				UE.getEditor(attrs.id, option).ready(function() {
					this.setContent("");
				});
			} else {
				UE.getEditor(attrs.id, option).ready(function() {
					this.setContent(content);
				});
			}
			// 设置编辑框的宽度
			// $(".edui-editor").css("width","90%");
		},
		getContent : function() {
			// 组件参数
			var attrs = this.get("attrs");
			return UE.getEditor(attrs.id).getContent();
		}, 
		getAllImage : function() {
			// 组件参数
			var attrs = this.get("attrs");
	    	var root = UE.htmlparser(UE.getEditor(attrs.id).getContent(), true);
	    	var imgs = new Array();
	    	var imgs = root.getNodesByTagName('img' );
	    	var imgSrcList = new Array();
	    	if(imgs == null){
	    		return imgSrcList;
	    	}
	    	
	    	for(var i =0;i<imgs.length;i++){
	    		imgSrcList.push(imgs[i].getAttr('src'));
	    	}
	    	return imgSrcList;
	    } 
	});

	module.exports = Component;
});