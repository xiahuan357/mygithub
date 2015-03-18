/**
 * tabbed组件
 */
define(function(require, exports, module) {
	var $ = require("$");
	require("bootstrap_commonrequire");

	//	var tabstatus = [ {id : firstTabbedName, label : "全部"}, ];
	
	// 实例化组件
	var template = require("./tabbed.tpl");
	var Widget = require("widget");
	var Component = Widget.extend({
		template : template,
		// 初始化参数
		initCustAttr : function() {
			var attrs = this.get("attrs");
		},
		afterRender : function() {
			var attrs = this.get("attrs");
			// 默认选中第一个
			$('#' + attrs.id + ' ul li:first a').click();
		},
		// 根据tabbedid获得索引
		getTabLabelIndexByTabId : function(tabid){
			if ("string" == typeof (tabid)) {
				var sepIdx = tabid.lastIndexOf("#");
				if (sepIdx >= 0) {
					var idx = tabid.substring(sepIdx + 1);
					return idx;
				}
			}
			return null;
		}
	});
	module.exports = Component;
});