/**
 * textarea组件
 */
define(function(require, exports, module) {
	var $ = require("$");
	require("bootstrap_commonrequire");
	
	// 实例化组件
	var template = require("./textarea.tpl");
	var Widget = require("widget");
	var Component = Widget.extend({
		template : template,
		afterRender : function() {
			
		},setText : function(textvalue){
			// 组件参数
			var attrs = this.get("attrs");
			$("#" + attrs.id).val(textvalue);
		},getText : function(){
			// 组件参数
			var attrs = this.get("attrs");
			return $("#" + attrs.id).attr("value");
		},
	});
	
	module.exports = Component;
});