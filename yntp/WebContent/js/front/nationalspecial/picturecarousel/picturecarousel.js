/**
 *  网站前台图片轮播
 */
define(function(require, exports, module)
{
    var $ = require("$");
    
    require("bootstrap_commonrequire");
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
				var item = items[i];
				$("#"+item.id).attr("src",item.src);
			}
		}
    });
    module.exports = Menu;
}); 