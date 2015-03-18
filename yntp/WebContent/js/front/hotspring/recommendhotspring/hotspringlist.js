/**
 * 推荐温泉列表构建
 */
define(function(require, exports, module) {
	var $ = require("$");
	var handlebars = require("handlebars");
	
	/**
	 * 初始化组件
	 */
	var init = function(param) {
		/** 查询线路，在tabbed内部显示*/
		var hotspring_query = GLOBAL.BASE + "front/hotspring/hotspring/frontshow/fileds/pagesearch?start=0&size=4&q=";
        handlebars.registerHelper('hotspringlist', function(items, options) {
        	var dataList;
    		var listBlockOut = "";
            $.ajax({
            	async : false,
            	dataType : 'json',
    			contentType : "application/json;charset=UTF-8",
    			url : hotspring_query,
    			success : function(resultData) {
    				if('000000' == resultData.flag &&  resultData.data != null && resultData.data.items != null && resultData.data.items.length > 0){
    					dataList = resultData.data.items;
    					var dataItems = dataList;
    					  for(var i = 0;i < dataItems.length; i++){
    						  var dataItem = dataItems[i];
    						  var topDivClass = "";
    						  if(i == 0 ){
    							  topDivClass = '<div class="row-fluid" style="margin-top:5px">';
    							  listBlockOut = listBlockOut + topDivClass;
    						  } else if(i == 4){
    							  listBlockOut = listBlockOut + '</div>';
    							  topDivClass = '<div class="row-fluid" style="margin-top:30px">';
    							  listBlockOut = listBlockOut + topDivClass;
    						  }  
    						  var coverImage = dataItem.coverimagename;
    						  listBlockOut = listBlockOut + '<div class="span3  ">';
    						  listBlockOut = listBlockOut +     '<div class=" ">';
    						  listBlockOut = listBlockOut +         '<div class="picture"><a href="#">';
    						  listBlockOut = listBlockOut +             '<img src="' + coverImage +'" style="width:263px;height:197px;border-radius:5px"></a>';
    						  listBlockOut = listBlockOut +         '</div>';
    						  listBlockOut = listBlockOut +         '<div style="padding:5px 10px">';
    						  listBlockOut = listBlockOut +             '<div class="row-fluid title " style="margin-top:5px;height:40px">';
    						  listBlockOut = listBlockOut +                 '<a href="#" class="pull-left">';
    						  listBlockOut = listBlockOut +                   dataItem.name;
    						  listBlockOut = listBlockOut +                 '</a>';
    						  listBlockOut = listBlockOut +             '</div>';
    						  listBlockOut = listBlockOut +         '</div>';
    						  listBlockOut = listBlockOut +     '</div>';
    						  listBlockOut = listBlockOut + '</div>';
    					  }
    					  listBlockOut = listBlockOut + '</div>';
    				} else {
    					listBlockOut = "还未有温泉，后续会添加。。敬请期待！"
    				}
    			},
    			error : function(XMLHttpRequest, textStatus, errorThrown) {
    				listBlockOut = "服务器查询出现错误了。。请刷新界面试试吧！"
    			}
            });
            return listBlockOut;
		});
	};
	
	// 实例化组件-------------------------START
	var template = require("./hotspringlist.tpl");
	var Widget = require("widget");
	var Component = Widget.extend({
		template : template,
		beforeRender : function() {
			init();
		},
		afterRender : function() {
		}
	});
	// 实例化组件-------------------------END

	// 组件对外提供使用
	module.exports = Component;
});