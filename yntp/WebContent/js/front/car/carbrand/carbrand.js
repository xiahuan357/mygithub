/**
 *  汽车品牌
 */
define(function(require, exports, module)
{
    var $ = require("$");
    var Widget = require("widget");
    var template = require("./carbrand.tpl");
    
    require("bootstrap_commonrequire");
    require("customer.css");
    require("jquery.superslide.2.1.1");
    var userutil = require("userutil");
    
    // 暂用静态JSON资源
    var hotelList = require("./carbrand.json");
    
    var HotHotelBlock = Widget.extend(
    {
        template : template,
        loadData : function()
        {
        	this.setModel(hotelList);
        },
        afterRender : function()
        {
        	$(document).ready(function(){
			});
		}
    });
    module.exports = HotHotelBlock;
}); 