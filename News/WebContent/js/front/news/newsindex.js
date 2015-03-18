/**
 * 网站首页构造： 
 */
define(function(require, exports, module) {
	var $ = require("$");
	var TopHeaderUnlogin = require("fixed-header-unlogin");

	var CenterHeader = require("center-header");
	var NavicatHeader = require("navicat-header");
	
	var news = require("./news");
	
	var Footer = require("footer");

	require("bootstrap_commonrequire");
	exports.init = function(param) {
		var containerWidth = $('.container').width();
		$('#navcontainer').css('width', containerWidth);

		// 菜单栏的宽度响应窗口拖动大小变化事件
		$(window).resize(function() {
			containerWidth = $('.container').width();
			$('#navcontainer').css('width', containerWidth);
		});

		
//		if (userEntity == null) {
			new TopHeaderUnlogin({
				renderTo : param.topheaderId,
			});
//		} else {
//			new TopHeaderLogin({
//				renderTo : param.topheaderId,
//			});
//		}

		new CenterHeader({
			renderTo : param.centerheaderId,
		});

		new NavicatHeader({
			renderTo : param.navicatheaderId,
		});

		

		
		new news({
			renderTo : param.tourismlineWrapperDiv,
		});
		
		new Footer({
			renderTo : param.footerId,
		});

		if (localStorage.getItem("contrast") == null){
			localStorage.setItem("contrast", "contrast-sea-blue");
		}
		if (localStorage.getItem("content") !== null) {
			$("#color-settings-body-color").attr("href", localStorage.getItem("content"));
		}
		if ((localStorage.getItem("contrast") !== null) && !$("body").hasClass("contrast-background")) {
			$("body")[0].className = $("body")[0].className.replace(/(^|\s)contrast.*?(\s|$)/g, " ").replace(/\s\s+/g, " ").replace(/(^\s|\s$)/g, "");
			$("body").addClass(localStorage.getItem("contrast"));
		}
		$(".color-settings-body-color > a").hover(function() {
			$("#color-settings-body-color").attr("href", $(this).data("change-to"));
			return localStorage.setItem("content", $(this).data("change-to"));
		});
		return $(".color-settings-contrast-color > a").hover(function() {
			$('body')[0].className = $('body')[0].className.replace(/(^|\s)contrast.*?(\s|$)/g, ' ').replace(/\s\s+/g, ' ').replace(/(^\s|\s$)/g, '');
			$('body').addClass($(this).data("change-to"));
			return localStorage.setItem("contrast", $(this).data("change-to"));
		});
	}

});
