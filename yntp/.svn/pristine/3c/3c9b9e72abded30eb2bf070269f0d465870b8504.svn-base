/**
 * 网站首页-特产构造
 */
define(function(require, exports, module) {
	var $ = require("$");
	require("bootstrap_commonrequire");
	
	//------------公共头部------------------------------
	var TopHeaderUnlogin = require("fixed-header-unlogin");
	var TopHeaderLogin = require("fixed-header-login");

	var CenterHeader = require("center-header");
	var NavicatHeader = require("navicat-header");
	//------------公共头部------------------------------
	
	//------------尾头部------------------------------
	var Footer = require("footer");
	//------------尾头部------------------------------

	//------------第一层：滑动门菜单------------------------------
	var SlideNav = require("./slidenav/slidenav-menu");
	//------------第一层：滑动门菜单------------------------------
	
	//------------第一层：图片轮播------------------------------
	var PictureCarousel = require("./picturecarousel/picturecarousel");
	//------------第一层：图片轮播------------------------------
	
	//------------第二层：特产推荐------------------------------
	var RecommendNationalSpecial = require("./recommendnationalspecial/nationalspeciallist");
	//------------第二层：特产推荐------------------------------
	
	//------------第三层：热卖特产------------------------------
	var TopSellNationalSpecial = require("./topsell/topsell");
	//------------第三层：热卖特产------------------------------
	
	//------------第三层：新品上架------------------------------
	var NewNationalSpecial = require("./newnationalspecial/nationalspeciallist");
	//------------第三层：新品上架------------------------------
	

	exports.init = function(param) {
		//--------------菜单栏的宽度响应窗口拖动大小变化事件 START
		var containerWidth = $('.container').width();
		$('#navcontainer').css('width', containerWidth);

		$(window).resize(function() {
			containerWidth = $('.container').width();
			$('#navcontainer').css('width', containerWidth);
		});
		//--------------菜单栏的宽度响应窗口拖动大小变化事件 END
		
		//--------------顶部组件，登录显示用户名 START
		var userutil = require("userutil");
		var userEntity = userutil.getCurrentUserFromServer();
		
		if (userEntity == null) {
			new TopHeaderUnlogin({
				renderTo : param.topheaderId,
			});
		} else {
			new TopHeaderLogin({
				renderTo : param.topheaderId,
			});
		}
		//--------------顶部组件，登录显示用户名 END
		
		new CenterHeader({
			renderTo : param.centerheaderId,
		});

		new NavicatHeader({
			renderTo : param.navicatheaderId,
		});
		
		new SlideNav({
			renderTo : param.slidenavId,
		});
		
		new PictureCarousel({
			renderTo : param.carouselId,
		});
		
		new RecommendNationalSpecial({
			renderTo : param.recommendNationalSpecialWrapperDiv,
		});
		
		new TopSellNationalSpecial({
			renderTo : param.topsellNationalSpecialWrapperDiv,
		})
		
		new NewNationalSpecial({
			renderTo : param.newNationalSpecialWrapperDiv,
		})
		
		new Footer({
			renderTo : param.footerId,
		});
		
		//----------设置选中菜单样式 START
		var linode = $("#nationalspecial_page");
		var ulnode = linode.parent();
		ulnode.children().removeClass("active");
		linode.addClass("active");
		//----------设置选中菜单样式 END
		
		//----------设置网页风格样式 START
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
		//----------设置网页风格样式 START
	}

});
