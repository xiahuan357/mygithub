/**
 *  首页-旅游线路-图片轮播
 */
define(function(require, exports, module)
{
    var $ = require("$");
    require("bootstrap_commonrequire");
    require("jquery.superslide.2.1.1");
    require("./css/style.css");
    
    var userutil = require("userutil");
    
    var Widget = require("widget");
    var template = require("./picturecarousel.tpl");
    // 暂用静态JSON资源
    var menudata_front = require("./picturecarousel.json");
    
    var Menu = Widget.extend(
    {
        template : template,
        loadData : function()
        {
        	var menudata  = menudata_front;
        	this.setModel(menudata);
        },
        afterRender : function()
        {
    		var items = menudata_front.items;
			for(var i=0;i<items.length;i++){
				// 如果是图片，添加入片地址
//				var item = items[i];
//				$("#"+item.imageid).attr("src",item.src);
			}
			
			/* 图片滚动效果 */
			$(".mr_frbox").slide({
				titCell: "",
				mainCell: ".mr_frUl ul",
				autoPage: true,
				effect: "leftLoop",
				autoPlay: true,
				vis: 4
			});
			
			/* 鼠标悬停图片效果 */
			$(".mr_zhe_hover").css("top", $('.mr_zhe').eq(0).height());
			$("li").mouseout(function (e) {
				if ((e.pageX < $(this).offset().left || e.pageX > ($(this).offset().left + $(this).width())) || (e.pageY < $(this).offset().top || e.pageY > ($(this).offset().top + $(this).height()))) {
					$(this).find('.mr_zhe_i').show();
					$(this).find('.mr_zhe_hover').hide().stop().animate({ top: '190px' }, { queue: false, duration: 190 });
					return false;
				}

			});
			$('.mr_zhe').mouseover(function (event) {
				$(this).find('.mr_zhe_i').hide();
				$(this).find('.mr_zhe_hover').show().stop().animate({ top: '190px' }, { queue: false, duration: 190 });
				return false;
			});
		}
    });
    module.exports = Menu;
}); 