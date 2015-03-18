/**
 * 系统管理员界面，左侧菜单构造
 */
define(function(require, exports, module)
{
    
    var $ = require("$");
    var Widget = require("widget");
    var template = require("./menu.tpl");
    require("bootstrap_commonrequire");
    var menudata = require("./menu.json");
    
    var Menu = Widget.extend(
    {
        template : template,
        loadData : function()
        {
            this.setModel(menudata);
        },
        afterRender : function()
        {
        	var nav = require("bootstrap_nav");
            require("jquery.ba-resize");
            
            var leftMenuHeight = $('#wrapper').height() + $("#header").height() ;
    		$('#main-nav-bg').css('height', leftMenuHeight);
    		
            $('#wrapper').resize(function(){
            	leftMenuHeight = $('#wrapper').height() + $("#header").height() ;
        		$('#main-nav-bg').css('height', leftMenuHeight);
            });
        	

    		// 菜单栏的宽度响应窗口拖动大小变化事件
    		$(window).resize(function() {
    			leftMenuHeight = $('#wrapper').height() + $("#header").height() ;
        		$('#main-nav-bg').css('height', leftMenuHeight);
    		});
        }
    });
    module.exports = Menu;
}); 