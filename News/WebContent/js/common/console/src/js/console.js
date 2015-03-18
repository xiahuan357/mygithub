/**
 * 工作台组件，可以设置快速导航和统计块
 */
define(function(require, exports, module) {
	var $ = require("$");
	
	var Widget = require("widget");
	var template = require("./console.tpl");

	var Console = Widget.extend({
		template : template,
		afterRender : function() {
			var attrs = this.get("attrs");
			var totalConsleData = attrs.consoledata.getData();
			// 初始化快速导航块
			initHeaderData(totalConsleData.header);
			// 初始化统计区域
			initBodyData(totalConsleData.body, null);
		}
	});

	var initHeaderData = function(header) {
		$("#headerDiv").empty();
		var consoleHeader = require("./consoleheader.js");
		consoleHeader.init({
			header : header,
			appendDivId : "headerDiv"
		});

		consoleHeader.initEvent();
	};

	var initBodyData = function(body, daterange) {
		$("#bodyDiv").empty();
		var consoleBody = require("./consolebody.js");
		consoleBody.init({
			body : body,
			appendDivId : "bodyDiv"
		});
		consoleBody.initEvent();

	};
	module.exports = Console;
});
