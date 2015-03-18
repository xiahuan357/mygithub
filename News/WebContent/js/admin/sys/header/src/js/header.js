/**
 * 系统管理员后台头部
 */
define(function(require, exports, module)
{
	var $ = require("$");
	var store = require("store");
	var application = require("application");

    // 默认引入：组件继承自widget
    var Widget = require("widget");
    // 自定义：组件的html模板
    var template = require("./header.tpl");
    
    // 组件的定义 组件名大写
    var Example = Widget.extend(
    {
        template : template,
        afterRender : function(){
        	this.initImgUrl();
        	// 退出事件
        	$("#logout").on("click",function(){
        		application.logout();  
        	});
        	// 跳转到前台首页
        	$("#frontindex").on("click",function(){
        		window.location=GLOBAL.URL.INDEX;
        	});
        },
        initImgUrl : function(param)
        {
           $("#img_userphoto").attr("src",   GLOBAL.BASE + "img/common/header/avatar.png");
        },
        setUserPhotoUrl : function(url){
        	$("#img_userphoto").attr("src", url);
        }
    });
    // 组件对外提供使用
    module.exports = Example;
}); 

