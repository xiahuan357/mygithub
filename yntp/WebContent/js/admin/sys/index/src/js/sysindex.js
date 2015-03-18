/**
 * 首页构造：顶部和左侧菜单
 */
define(function(require, exports, module) {
	var $ = require("$");
	var Header = require("header");
	var SecHeader = require("secheader");
	var Menu = require("menu");
	
	require("bootstrap_commonrequire");
	var userutil = require("userutil");
	exports.init = function(param) {
		var userEntity = userutil.getCurrentUserFromServer();
		if(userEntity == null){
			window.location=GLOBAL.URL.INDEX;
		} else if(userEntity.usertype != 0){
			window.location=GLOBAL.URL.INDEX;
		} 
		
		new Header({
			renderTo : param.headerId,
		});
		
		new SecHeader({
			renderTo : param.secheaderId,
		});

		var menu = new Menu({
			renderTo : param.menuId,
		});

		// 主页没有工作台时显示默认图片
		$("#" + param.contentId).html("<div style='bottom:5px; right:5px; position:fixed;'><img src='/yntp/img/admin/sys/indexbg.png'/></div>");

		var menuData = menu.model;
		var nav = require("bootstrap_nav");
		if (menuData) {
			for (var i in menuData) {
				var m = menuData[i];
				if ("/admin/sys/console/console.html" == m.url) {
					nav.toPageView("/admin/sys/console/console.html");
					break;
				}
			}
		}
		
		// 点击工作台，跳转到工作台
		$("#linkconsole").die().live("click",function(){
			nav.toPageView("/admin/sys/console/console.html");
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
