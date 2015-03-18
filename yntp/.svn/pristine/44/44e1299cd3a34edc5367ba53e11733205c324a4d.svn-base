/**
 * 商家和客户首页构造：顶部和左侧菜单
 */
define(function(require, exports, module) {
	var $ = require("$");
	var FixedHeader = require("fixed-header-login");
	var CenterHeader = require("center-header");
	var NavicatHeader = require("navicat-header");
	var LeftNavicatMenu = require("../../../left_navicat_menu/src/js/left-navicat-menu");
	var Footer = require("footer");
	
	require("bootstrap_commonrequire");
	
	var userutil = require("userutil");
	exports.init = function(param) {
		// 菜单栏的宽度响应窗口拖动大小变化事件
		$(document).ready(function(){
			  var containerWidth = $('.container').width();
			  $('#navcontainer').css('width',containerWidth);
			  $(window).resize(function(){
			    containerWidth = $('.container').width();
			    $('#navcontainer').css('width',containerWidth);
			  });
		});
		
		// 如果没登陆跳转到登录界面
		var userEntity = userutil.getCurrentUserFromServer();
		if(userEntity == null){
			window.location=GLOBAL.URL.LOGINURL;
		} else if(userEntity.usertype == 0){
			window.location=GLOBAL.URL.LOGINURL;
		} 
		
		// 实例化组件，固定头，中间搜索区，头部导航区，左侧导航区
		new FixedHeader({
			renderTo : param.fixedheaderId,
		});
		
		new CenterHeader({
			renderTo : param.centerheaderId,
		});

		new NavicatHeader({
			renderTo : param.navicatheaderId,
		});
		
		var menu = new LeftNavicatMenu({
			renderTo : param.leftnavicatmenuId,
		});
		
		new Footer({
			renderTo : param.footerId,
		});

		// 设定工作区
		var menuData = menu.model;
		var nav = require("bootstrap_nav");
		var consoleURL ;
		// 用户类型0 系统管理员；1 商家；2 用户
		if (userEntity.usertype == 1) {
			consoleURL = "/admin/customer/business/console/console.html";
		} else if (userEntity.usertype == 2) {
			consoleURL = "/admin/customer/personal/console/console.html";
		}
		
		if (menuData) {
			for (var i in menuData) {
				var m = menuData[i];
				if (consoleURL == m.url) {
					nav.toPageView(consoleURL);
					break;
				}
			}
		}
		
		// 点击工作台，跳转到工作台
		$("#linkconsole").die().live("click",function(){
			nav.toPageView(consoleURL);
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
