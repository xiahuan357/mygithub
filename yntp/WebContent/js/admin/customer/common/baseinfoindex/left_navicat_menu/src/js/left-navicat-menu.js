/**
 * 商家基本信息左侧菜单
 */
define(function(require, exports, module) {

	var $ = require("$");
	var Widget = require("widget");
	var template = require("./left-navicat-menu.tpl");
	require("bootstrap_commonrequire");

	var userutil = require("userutil");

	// 暂用静态JSON资源
	var menudata_personal = require("./left-navicat-menu-personal.json");
	var menudata_business = require("./left-navicat-menu-business.json");
	
	// 界面加载时左侧导航背景的高度是自适应的，高度正好填充完整整个界面
	var contentInitHeight = $('#content').height();
	var main_nav_bgInitHeight = $('#main-nav-bg').height();
	$(document).ready(function(){
		 contentInitHeight = $('#content').height();
		 main_nav_bgInitHeight = $('#main-nav-bg').height();
		 $('#wrapper').css('height', main_nav_bgInitHeight - 20);
	});
	
	var Menu = Widget.extend({
		template : template,
		loadData : function() {
			var userInfo = userutil.getUserInfo();
			var menudata = menudata_personal;
			// 用户类型0 系统管理员；1 商家；2 用户
			if (userInfo.usertype == 1) {
				menudata = menudata_business;
			} else if (userInfo.usertype == 2) {
				menudata = menudata_personal;
			}
			this.setModel(menudata);
		},
		afterRender : function() {
			var nav = require("bootstrap_nav");

			require("jquery.ba-resize");

			// 监听左侧导航菜单的高度变化，保证背景的高度永远都是填充完整的界面
			$('#main-nav').resize(function() {
				var main_navHeight = $('#main-nav').height();
				var main_nav_bgHeight = $('#main-nav-bg').height();
				if (main_navHeight > main_nav_bgHeight) {
					$('#main-nav-bg').css('height', main_navHeight + 151);
					$('#wrapper').css('height', main_navHeight + 151 - 20);
				} else {
					if(main_nav_bgInitHeight < main_nav_bgHeight){
						$('#main-nav-bg').css('height', main_nav_bgInitHeight);
						$('#wrapper').css('height', main_nav_bgInitHeight - 20);
					}
				}
			});
			// 监听右侧内容面板的高度变化，保证背景的高度永远都是填充完整的界面
			$('#content').resize(function() {
				var contentHeight = $('#content').height();
				var main_nav_bgHeight = $('#main-nav-bg').height();
				if(contentHeight >main_nav_bgHeight + 50){
					$('#main-nav-bg').css('height', contentHeight + 151);
					$('#wrapper').css('height', contentHeight + 151 - 20);
				} else{
					if(main_nav_bgInitHeight < main_nav_bgHeight && main_nav_bgInitHeight > contentHeight ){
						$('#main-nav-bg').css('height', main_nav_bgInitHeight);
						$('#wrapper').css('height', main_nav_bgInitHeight - 20);
					}
				}
			});
		}
	});
	module.exports = Menu;
});