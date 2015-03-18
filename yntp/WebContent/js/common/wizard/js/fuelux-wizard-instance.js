/*
 * 向导组件
 */

define(function(require, exports, module) {

	require("bootstrap_commonrequire");
	require("fuelux_wizard");
	require("jquery.validate");

	// 默认引入：组件继承自widget
	var Widget = require("widget");
	// 自定义：组件的html模板
	var template = require("./fuelux-wizard-instance.tpl");
	// 组件的定义 组件名大写
	var Wizard = Widget.extend({
		initCustAttr : function() {
			var attrs = this.get("attrs");
		},
		template : template
	});
	// 组件对外提供使用
	module.exports = Wizard;
});