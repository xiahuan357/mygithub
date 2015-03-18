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
		var hotspring_query = GLOBAL.BASE + "front/hotspring/hotspring/frontshow/fileds/pagesearch?start=0&size=6&q=";
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
    						  
						  if(dataItems.length > 0){
							  listBlockOut += '<div class="span4 ">';
							  listBlockOut += 	'<div class="zzsc">';
							  listBlockOut +=     	'<a href="#" target="_blank">';
							  listBlockOut +=    	    	'<img src="' + dataItems[0].coverimagename +'" style="width:370px;height:484px">';
							  listBlockOut +=     	'</a>';
							  listBlockOut +=     	'<div class="text">';
							  listBlockOut +=     		'<div class="imgtext" style="width:370px">' + dataItems[0].name;
							  listBlockOut +=     		'</div>';
							  listBlockOut +=      	'</div>';
							  listBlockOut += 	'</div>';
							  listBlockOut += '</div>';
						  }				  
						  
						  if(dataItems.length > 1){
							  listBlockOut += '<div class="span8">';
							  listBlockOut +=     '<div class="row-fluid">';
							  listBlockOut +=         '<div class="span4">';
							  listBlockOut += 			'<div class="zzsc">';
							  listBlockOut +=     			'<a href="#" target="_blank">';
							  listBlockOut +=             		'<img src="' + dataItems[1].coverimagename +'" style="width:244px;height:207px">';
							  listBlockOut +=     			'</a>';
							  listBlockOut +=     			'<div class="text" style="width:244px">';
							  listBlockOut +=     				'<div class="imgtext">' + dataItems[1].name;
							  listBlockOut +=     				'</div>';
							  listBlockOut +=      			'</div>';
							  listBlockOut += 			'</div>';
							  listBlockOut +=      	'</div>';
						  }		
						  
						  if(dataItems.length > 2){
							  listBlockOut +=         '<div class="span4">';
							  listBlockOut += 			'<div class="zzsc">';
							  listBlockOut +=     			'<a href="#" target="_blank">';
							  listBlockOut +=             		'<img src="' + dataItems[2].coverimagename +'" style="width:244px;height:207px">';
							  listBlockOut +=     			'</a>';
							  listBlockOut +=     			'<div class="text" style="width:244px">';
							  listBlockOut +=     				'<div class="imgtext">' + dataItems[2].name;
							  listBlockOut +=     				'</div>';
							  listBlockOut +=      			'</div>';
							  listBlockOut +=         	'</div>';
							  listBlockOut +=         '</div>';
						  }		
						  
						  if(dataItems.length > 3){
							  listBlockOut +=         '<div class="span4">';
							  listBlockOut += 			'<div class="zzsc">';
							  listBlockOut +=     			'<a href="#" target="_blank">';
							  listBlockOut +=             		'<img src="' + dataItems[3].coverimagename +'" style="width:244px;height:207px">';
							  listBlockOut +=     			'</a>';
							  listBlockOut +=     			'<div class="text" style="width:244px">';
							  listBlockOut +=     				'<div class="imgtext">' + dataItems[3].name;
							  listBlockOut +=     				'</div>';
							  listBlockOut +=      			'</div>';
							  listBlockOut +=         	'</div>';
							  listBlockOut +=         '</div>';
						  }		
						  
						  if(dataItems.length > 1){
							  listBlockOut +=     '</div>';
						  }
						  
						  if(dataItems.length > 4){
							  listBlockOut +=     '<div class="row-fluid " style="margin-top:10px">';
							  listBlockOut +=         '<div class="span6">';
							  listBlockOut += 			'<div class="zzsc">';
							  listBlockOut +=     			'<a href="#" target="_blank">';
							  listBlockOut +=             		'<img src="' + dataItems[4].coverimagename +'" style="width:375px;height:264px">';
							  listBlockOut +=     			'</a>';
							  listBlockOut +=     			'<div class="text" style="width:375px">';
							  listBlockOut +=     				'<div class="imgtext">' + dataItems[4].name;
							  listBlockOut +=     				'</div>';
							  listBlockOut +=      			'</div>';
							  listBlockOut +=         	'</div>';
							  listBlockOut +=         '</div>';
						  }		
						  
						  if(dataItems.length > 5){
							  listBlockOut +=         '<div class="span6">';
							  
							  listBlockOut += 			'<div class="zzsc">';
							  listBlockOut +=     			'<a href="#" target="_blank">';
							  listBlockOut +=             		'<img src="' + dataItems[5].coverimagename +'" style="width:375px;height:264px">';
							  listBlockOut +=     			'</a>';
							  listBlockOut +=     			'<div class="text" style="width:375px">';
							  listBlockOut +=     				'<div class="imgtext">' + dataItems[5].name;
							  listBlockOut +=     				'</div>';
							  listBlockOut +=      			'</div>';
							  listBlockOut +=      		'</div>';
							  listBlockOut +=         '</div>';
						  }		
						  
						  if(dataItems.length > 4){
							  listBlockOut +=     '</div>';
						  }
						  
						  if(dataItems.length > 0){
							  listBlockOut +=     '</div>';
						  }
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
			$(".imgtext").hide();
			$(".zzsc").hover(function() {
				$(".imgtext", this).slideToggle(500);
			});
		}
	});
	// 实例化组件-------------------------END

	// 组件对外提供使用
	module.exports = Component;
});