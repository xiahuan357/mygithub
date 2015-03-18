/**
 *  网站前台左侧菜单
 */
define(function(require, exports, module)
{
    var $ = require("$");
    var Widget = require("widget");
    var template = require("./slidenav-menu.tpl");
    
    require("bootstrap_commonrequire");
    require("customer.css");
    require("jquery.superslide.2.1.1");
    var userutil = require("userutil");
    
    // 暂用静态JSON资源
    var menudata_front = require("./slidenav-menu.json");
    
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
        	$(document).ready(function(){
        		// 添加滑动门事件
        		$("#slidenav").slide({
    				type : "menu",
    				titCell : ".mainCate",
    				targetCell : ".subCate",
    				delayTime : 0,
    				triggerTime : 0,
    				defaultPlay : false,
    				returnDefault : true
    			});
        		
        		// 监测浏览器大小调整事件
				var slidenavWidth = $('#slidenav').width();
				// 设置初始大小
				$('.subCate').css('left', slidenavWidth);

				// 菜单栏的宽度响应窗口拖动大小变化事件
				$(window).resize(function() {
					slidenavWidth = $('#slidenav').width();
					// 设置初始大小
					$('.subCate').css('left', slidenavWidth);
				});
			});
		}
    });
    module.exports = Menu;
}); 