/**
 * 线路列表构建
 */
define(function(require, exports, module) {
	var $ = require("$");
	var handlebars = require("handlebars");
	
	/**
	 * 初始化组件
	 */
	exports.init = function(param) {
		/** 查询线路，在tabbed内部显示*/
		var tourismline_query = GLOBAL.BASE + "front/tourismline/tourismline/frontshow/fileds/pagesearch?start=0&size=8";
		tourismline_query += "&q=type_id=" + param.type_id;
        handlebars.registerHelper('tourismlinelist', function(items, options) {
    		var dataList;
    		var listBlockOut = "";
            $.ajax({
            	async : false,
            	dataType : 'json',
    			contentType : "application/json;charset=UTF-8",
    			url : tourismline_query,
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
    							  topDivClass = '<div class="row-fluid" style="margin-top:20px">';
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
    						  listBlockOut = listBlockOut +             '<div class="row-fluid  " style="margin-top:5px;">';
    						  listBlockOut = listBlockOut +                 '<div class="price pull-left" style="color:#F40">';
    						  listBlockOut = listBlockOut +                     '<span>¥</span>';
    						  listBlockOut = listBlockOut +                     '<span>' +dataItem.price + '</span>';
    						  listBlockOut = listBlockOut +                 '</div>';
    						  listBlockOut = listBlockOut +                 '<div class="sellcount pull-right" style="color:#888">';
    						  listBlockOut = listBlockOut +                     '<i class="icon-map-marker text-dark-orange"></i>' + dataItem.startCityName;
    						  listBlockOut = listBlockOut +                 '</div>';
    						  listBlockOut = listBlockOut +             '</div>';
    						  listBlockOut = listBlockOut +         '</div>';
    						  listBlockOut = listBlockOut +     '</div>';
    						  listBlockOut = listBlockOut + '</div>';
    					  }
    					  listBlockOut = listBlockOut + '</div>';
    				} else {
    					listBlockOut = "还未有线路，后续会添加。。敬请期待！"
    				}
    			},
    			error : function(XMLHttpRequest, textStatus, errorThrown) {
    				listBlockOut = "服务器查询出现错误了。。请刷新界面试试吧！"
    			}
            });
            return listBlockOut;
		});
		
		// 实例化组件-------------------------START
		var template = require("./tourismlinelist.tpl");
		var Widget = require("widget");	
		var Component = Widget.extend({
			template : template,
		});
		
		new Component({renderTo : param.wrapperDiv});
		
		//实例化组件-------------------------END
	};
});