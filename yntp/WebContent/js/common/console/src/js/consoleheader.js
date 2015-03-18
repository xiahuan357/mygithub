/**
 * Quick navigation 区域
 */
define(function(require, exports, module) {
	var $ = require("$");
	var nav = require("bootstrap_nav");
	exports.init = function(param) {
		var listBlockOut = "";
		for (var i = 0; i < param.header.length; i++) {
			// 每行四个，四个为一个row-fluid
			if (i == 0) {
				var topDivClass = '<div class="row-fluid" style="margin-top:5px">';
				listBlockOut = listBlockOut + topDivClass;
			} else if (i % 4 == 0) {
				listBlockOut = listBlockOut + '</div>';
				topDivClass = '<div class="row-fluid" style="margin-top:20px">';
				listBlockOut = listBlockOut + topDivClass;
			}

			// 构建每个快捷导航块
			var template = '<div class="span3 box-quick-link ';
			var item = param.header[i];
			if (item.backgroudclass)
				template += item.backgroudclass;
			template += '">';
			template += '<a href="#" url="';
			if (item.url)
				template += item.url;
			template += '" class="conHeader">';
			template += '<div class="header"><div class="';
			if (item.icon)
				template += item.icon;
			template += '"></div>';
			template += '</div><div class="content">';
			if (item.title)
				template += item.title;
			template += '</div></a></div>';

			listBlockOut = listBlockOut + template;
		}
		listBlockOut = listBlockOut + '</div>';

		$("#" + param.appendDivId).append(listBlockOut);
	};

	exports.initEvent = function() {
		$(".conHeader").on("click", function(e) {
			var url = $(this).attr("url");
			nav.toPageView(url);
		});
	};
});
