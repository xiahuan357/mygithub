/**
 * 模态对话框：标题-具体DIV-保存取消按钮
 * @author: liuchchc
 * @date: 2014-5-24 19:58:07
 */
define(function(require, exports, module) {
	require('bootstrap_commonrequire');
	
	var form_tpl = require("./modaldialog.tpl");
	var Widget = require("widget");
	var handlebars = require("handlebars");

	var example = Widget.extend({
		handlebars : handlebars,
		template : form_tpl,
		// 初始化参数
		initCustAttr : function() {
			
			var attrs = this.get("attrs");
			
			// 传入参数设置模态对话框的大小（长度）和显示的位置
			attrs.isOverrideDefaultPositionCss = attrs.isOverrideDefaultPositionCss == null ? false : attrs.isOverrideDefaultPositionCss;
			var isOverrideDefaultPositionCss = attrs.isOverrideDefaultPositionCss;
			var defaultPositionCss="width:560px;margin-left:-280px";
			if(isOverrideDefaultPositionCss){
				var customPositionCss = attrs.customPositionCss == null ? defaultPositionCss : attrs.customPositionCss;
				attrs.style=customPositionCss;
			} else{
				attrs.style=defaultPositionCss;
			}
			
			// 设置是否显示模态对话框的头和脚（默认显示）
		    var isshowheader = attrs.isshowheader;
		    var isshowfooter = attrs.isshowfooter;
		    
		    attrs.isshowheader = isshowheader == null ? true : isshowheader;
		    attrs.isshowfooter = isshowfooter == null ? true : isshowfooter;
		},
	});
	module.exports = example;
});