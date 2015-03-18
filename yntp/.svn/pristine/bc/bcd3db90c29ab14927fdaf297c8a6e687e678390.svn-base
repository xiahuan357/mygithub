/**
 * 网站首页-景点构造
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

	//------------第一层：搜索框------------------------------
	var SearchForm = require("./searchform/searchform");
	//------------第一层：搜索框------------------------------
	
	//------------第一层：图片轮播------------------------------
	var PictureCarousel = require("./picturecarousel/picturecarousel");
	//------------第一层：图片轮播------------------------------
	
	//------------第一层：热销榜------------------------------
	var TopSell = require("./topsell/topsell");
	//------------第一层：热销榜------------------------------
	
	//------------第二层：景点推荐------------------------------
	var RecommendScenic = require("./recommendscenic/sceniclist");
	//------------第二层：景点推荐------------------------------
	
	//------------第三层：景点类型分类------------------------------
	var ScenicType = require("./scenictype/type_scenic");
	//------------第三层：景点类型分类------------------------------
	
   //-------------广告区域 START
	var ScenicAds = require("./scenicads/scenicads");
	//-------------广告区域 END
	
	//------------- 常见问题START
	var ScenicQuestion = require("./scenicquestion/scenicquestion");
	//------------- 常见问题 END
	
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
		
		new SearchForm({
			renderTo : param.searchId,
		});
		
		new PictureCarousel({
			renderTo : param.carouselId,
		});
		
		new TopSell({
			renderTo : param.topSellId,
		})
		
		new RecommendScenic({
			renderTo : param.recommendScenicWrapperDiv,
		});
		new ScenicType({
			renderTo : param.scenicTypeWrapperDiv,
		});
		 
		new ScenicAds({
			renderTo : param.scenicAds1WrapperDiv,
		})
		new ScenicQuestion({
			renderTo : param.scenicQuestionsWrapperDiv,
		})
		
		new Footer({
			renderTo : param.footerId,
		});
		
		//----------设置选中菜单样式 START
		var linode = $("#scenic_page");
		var ulnode = linode.parent();
		ulnode.children().removeClass("active");
		linode.addClass("active");
		//----------设置选中菜单样式 END
		
		//----------设置BOX边框样式，顶部颜色区分 START
		$("#" + param.recommendScenicWrapperDiv).css("border-top","solid 2px #3AA400")
		$("#" + param.scenicTypeWrapperDiv).css("border-top","solid 2px #66CCCC")
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
