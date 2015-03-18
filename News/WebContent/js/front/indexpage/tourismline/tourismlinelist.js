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
		var type= param.typename;
        handlebars.registerHelper('tourismlinelist', function(items, options) {
    		var dataList;
    		var listBlockOut = "";
            $.ajax({
            	async : false,
            	dataType : 'json',
    			url : "queryindexnewstitle.action?type="+type,
    			success : function(resultData) {
    				if('000000' == resultData.ret.flag &&  resultData.ret.data != null  && resultData.ret.data.length > 0){
    					dataList = resultData.ret.data;
    					  for(var i = 0;i < dataList.length; i++){
    						  var dataItem = dataList[i];
    						  var topDivClass = "";
    						  if(i == 0 ){
    							  topDivClass = '<div class="row-fluid" style="margin-top:5px">';
    							  listBlockOut = listBlockOut + topDivClass;
    						  } else if(i == 4){
    							  listBlockOut = listBlockOut + '</div>';
    							  topDivClass = '<div class="row-fluid" style="margin-top:20px">';
    							  listBlockOut = listBlockOut + topDivClass;
    						  }  
    						  var coverImage = dataItem.imagekey;
    						  var newsLink =dataItem.id;
    						  listBlockOut = listBlockOut + '<div class="span3  ">';
    						  listBlockOut = listBlockOut +     '<div class=" ">';
    						  listBlockOut = listBlockOut +         '<div class="picture"><a href="/News/html/newshtml/'+ newsLink+'.html'+'">';
    						  listBlockOut = listBlockOut +             '<img src="/News/coverimage/' + coverImage +'" style="width:200px;height:150px;border-radius:5px"></a>';
    						  listBlockOut = listBlockOut +         '</div>';
    						  listBlockOut = listBlockOut +         '<div style="padding:5px 10px">';
    						  listBlockOut = listBlockOut +             '<div class="row-fluid title " style="margin-top:5px;height:40px">';
    						  listBlockOut = listBlockOut +                 '<a href="/News/html/newshtml/'+ newsLink+'.html'+'" class="pull-left">';
    						  listBlockOut = listBlockOut +                   dataItem.title;
    						  listBlockOut = listBlockOut +                 '</a>';
    						  listBlockOut = listBlockOut +             '</div>';
    						  listBlockOut = listBlockOut +         '</div>';
    						  listBlockOut = listBlockOut +     '</div>';
    						  listBlockOut = listBlockOut + '</div>';
    					  }
    					  listBlockOut = listBlockOut + '</div>';
    				} else {
    					listBlockOut = "暂时没有更多新闻了！"
    				}
    			},
    			error : function(XMLHttpRequest, textStatus, errorThrown) {
    				listBlockOut = "服务器查询出现错误了。请刷新界面试试吧！"
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