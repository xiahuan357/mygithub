/**
 * 顶部栏，未登录用户
 */
define(function(require, exports, module)
{
	var $ = require("$");
	var store = require("store");

    // 默认引入：组件继承自widget
    var Widget = require("widget");
    // 自定义：组件的html模板
    var template = require("./fixed-header-unlogin.tpl");
    
    // 组件的定义 组件名大写
    var FixedHeader = Widget.extend(
    {
        template : template,
        afterRender : function(){
	    	// 登录事件
			$("#login").die().on("click", function() {
				window.location=GLOBAL.URL.LOGINURL;
			});
			
			// 注册事件
			$("#register").die().on("click", function() {
				window.location=GLOBAL.URL.REGISTER;
			});
			
			// 联系我们事件
			$("#connectus").die().on("click", function() {
				window.location=GLOBAL.URL.CONNECTUS;
			});
		},
    });
    // 组件对外提供使用
    module.exports = FixedHeader;
}); 
