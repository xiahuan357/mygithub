/**
 * 
 */
define(function(require, exports, module)
{
	var $ = require("$");
	var store = require("store");

    // 默认引入：组件继承自widget
    var Widget = require("widget");
    // 自定义：组件的html模板
    var template = require("./footer.tpl");
    
    // 组件的定义 组件名大写
    var CenterHeader = Widget.extend(
    {
        template : template,
        afterRender : function(){
        },
    });
    // 组件对外提供使用
    module.exports = CenterHeader;
}); 