/**
 * 网站首页-酒店构造
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

	
	//------------第一层：图片轮播------------------------------
	var PictureCarousel = require("./picturecarousel/picturecarousel");
	//------------第一层：图片轮播------------------------------
	
	
	//------------第二层：酒店推荐------------------------------
	var RecommendHotel = require("./recommendhotel/hotellist");
	//------------第二层：酒店推荐------------------------------
	
	 //-------------广告区域 START
	var HotelAds = require("./hotelads/hotelads");
	//-------------广告区域 END
	
	//------------- 酒店品牌START
	var HotelBrand = require("./hotelbrand/hotelbrand");
	//------------- 酒店品牌 END
	
	//------------第三层：酒店类型分类------------------------------
	var HotelType = require("./hoteltype/type_hotel");
	//------------第三层：酒店类型分类------------------------------
	

	
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
		
		new PictureCarousel({
			renderTo : param.carouselId,
		});
		
		new RecommendHotel({
			renderTo : param.recommendHotelWrapperDiv,
		});
		
		new HotelAds({
			renderTo : param.hotelAds1WrapperDiv,
		})
		
		new HotelBrand({
			renderTo : param.hotelBrandWrapperDiv ,
		})
		
		
		new HotelType({
			renderTo : param.hotelTypeWrapperDiv,
		});
		
		new Footer({
			renderTo : param.footerId,
		});
		
		//----------设置选中菜单样式 START
		var linode = $("#hotel_page");
		var ulnode = linode.parent();
		ulnode.children().removeClass("active");
		linode.addClass("active");
		//----------设置选中菜单样式 END
		
		//----------设置BOX边框样式，顶部颜色区分 START
		$("#" + param.recommendHotelWrapperDiv).css("border-top","solid 2px #3AA400")
		$("#" + param.hotelTypeWrapperDiv).css("border-top","solid 2px #66CCCC")
		//----------设置BOX边框样式，顶部颜色区分 START
		
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
