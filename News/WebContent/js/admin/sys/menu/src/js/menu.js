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
    var store =require("store");
 // 暂用静态JSON资源
	var menudata_chiefeditor = require("./menu_chiefeditor.json");
	var menudata_admin = require("./menu_admin.json");
	var menudate_editor=require("./menu_editor.json");
	var menudate_journalist=require("./menu_journalist.json");
	
    var Menu = Widget.extend(
    {
        template : template,
        loadData : function()
        {   var menudata="";
        	var userinfo =store.get("userinfo");
        	if (userinfo.usertype == 0) {
				 menudata = menudata_admin;
			} else if (userinfo.usertype == 1) {
				 menudata = menudate_journalist;
			}
			else if (userinfo.usertype == 2) {
				 menudata = menudate_editor;
			}
			else if (userinfo.usertype == 3) {
				 menudata = menudata_chiefeditor;
			}
        	
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