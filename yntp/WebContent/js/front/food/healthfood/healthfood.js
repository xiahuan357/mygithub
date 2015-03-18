/**
 *  首页-旅游线路-图片轮播
 */
define(function(require, exports, module)
{
    var $ = require("$");
    
    require("bootstrap_commonrequire");
    require("./js/block");
    require("./css/style.css");
    
    var handlebars = require("handlebars");
	
	/**
	 * 初始化组件
	 */
	var init = function(param) {
		/** 查询线路，在tabbed内部显示*/
		var food_query = GLOBAL.BASE + "front/food/food/frontshow/fileds/pagesearch?start=0&size=12&q=";
        handlebars.registerHelper('healthfoodblock', function(items, options) {
        	var dataList;
    		var listBlockOut = "";
            $.ajax({
            	async : false,
            	dataType : 'json',
    			contentType : "application/json;charset=UTF-8",
    			url : food_query,
    			success : function(resultData) {
    				if('000000' == resultData.flag &&  resultData.data != null && resultData.data.items != null && resultData.data.items.length > 0){
    					dataList = resultData.data.items;
						var dataItems = dataList;
						for (var i = 0; i < dataItems.length; i++) {
							var dataItem = dataItems[i];
							if(i == 0){
								listBlockOut += '<ul>';
							}
							if(i == 6){
								listBlockOut += '</ul>';
								listBlockOut += '<ul >';
							}
							if(i % 3 == 0){
								if((2< i  && i < 6) || (8 < i && i < 12)){
									listBlockOut +=     '<li style="margin-top:10px">';
								} else {
									listBlockOut +=     '<li>';
								}
							} else {
								if((2< i  && i < 6) || (8 < i && i < 12)){
									listBlockOut +=     '<li style="margin-top:10px;margin-left:44px">';
								} else {
									listBlockOut +=     '<li style="margin-left:44px">';
								}
							}
							
							
							listBlockOut +=     	'<a href="#" class="images">';
							listBlockOut +=     		'<img src="' + dataItem.coverimagename + '" />';
						    listBlockOut +=       '</a>';
						    listBlockOut +=       '<span class="title">' + dataItem.name+ '</span>';
							listBlockOut +=     '<li>';
							
							
						}
						listBlockOut += '<ul>';
    				} else {
    					listBlockOut = "还未有景点，后续会添加。。敬请期待！"
    				}
    			},
    			error : function(XMLHttpRequest, textStatus, errorThrown) {
    				listBlockOut = "服务器查询出现错误了。。请刷新界面试试吧！"
    			}
            });
            return listBlockOut;
		});
	};
    
    var Widget = require("widget");
    var template = require("./healthfood.tpl");
    
    var Component = Widget.extend(
    {
        template : template,
        beforeRender : function() {
			init();
		},
		
        afterRender : function()
        {
		}
    });
    module.exports = Component;
}); 