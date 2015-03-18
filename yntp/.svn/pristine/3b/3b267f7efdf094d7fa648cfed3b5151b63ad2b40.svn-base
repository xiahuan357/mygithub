/**
 *  网站前台左侧菜单
 */
define(function(require, exports, module)
{
    var $ = require("$");
    var Widget = require("widget");
    var template = require("./slidenav-menu.tpl");
    
    require("bootstrap_commonrequire");
    require("customer.css");
    require("jquery.superslide.2.1.1");
    
    var handlebars = require("handlebars");
	
	/**
	 * 初始化组件
	 */
	var init = function(param) {
		/** 查询线路，在tabbed内部显示*/
		var nationalspecial_query = GLOBAL.BASE + "front/product/producttype/navslide";
        handlebars.registerHelper('navslide', function(items, options) {
        	var dataList;
    		var listBlockOut = "";
            $.ajax({
            	async : false,
            	dataType : 'json',
    			contentType : "application/json;charset=UTF-8",
    			url : nationalspecial_query,
    			success : function(resultData) {
    				if('000000' == resultData.flag &&  resultData.data != null &&  resultData.data.length > 0){
    					dataList = resultData.data;
						var dataItems = dataList;
						// 显示特产标题
						listBlockOut += '<h3 class="" style="margin: 0;padding-left:10px;color: #FFF;background:#3AA400">特产分类</h3>';
						listBlockOut += '<ul id="slidenav" style="margin: 0">';
						// 构建第一层分类
						for (var i = 0; i < dataItems.length && i < 4; i++) {
							var dataItem = dataItems[i];
							var evenLeval = (i % 2 == 0) ? "evenLeval" : "";
							listBlockOut += '<li id="mainCate-' + (i+1) + '" class="mainCate ' + evenLeval + ' slidenav-statistic" style="padding-left:10px">';
							listBlockOut +=     '<h3 style="">';
							listBlockOut +=         '<a href="#" style="color:#3AA400" class="a_producttype" producttypeid="' + dataItem.nodeData.id + '" >' +dataItem.nodeData.name+ '</a>';
							listBlockOut +=     '</h3>';
							// 构建第二层分类
							if(dataItem.childrenNodeList != null && dataItem.childrenNodeList.length > 0 ){
								listBlockOut += '<p style="">';
								for(var j = 0; j < dataItem.childrenNodeList.length && j < 3;j++){
									var childItem = dataItem.childrenNodeList[j];
									listBlockOut +='<a href="#" class="a_producttype" producttypeid="' + childItem.nodeData.id + '" >' +childItem.nodeData.name+ '</a>';;
								}
								listBlockOut += '</p>';
								
								listBlockOut += '<div class="subCate" style="display: none;">'
								for(var j = 0; j < dataItem.childrenNodeList.length;j++){
									var childItem = dataItem.childrenNodeList[j];
									listBlockOut += '<ul id="sub-ul-' + (j +1) + '">';
									listBlockOut +=     '<h4>';
									listBlockOut +=         '<a href="#" class="a_producttype" producttypeid="' + childItem.nodeData.id + '" >' +childItem.nodeData.name+ '</a>';
									listBlockOut +=     '</h4>';
									listBlockOut +=     '<li></li>';
									listBlockOut += '</ul>';
								}
								listBlockOut += '</div>';
							}
							
							listBlockOut += '</li>';
						}
						listBlockOut = listBlockOut + '</ul>';
    				} else {
    					listBlockOut = "还未有类型，后续会添加。。敬请期待！"
    				}
    			},
    			error : function(XMLHttpRequest, textStatus, errorThrown) {
    				listBlockOut = "服务器查询出现错误了。。请刷新界面试试吧！"
    			}
            });
            return listBlockOut;
		});
	};
	
    var Menu = Widget.extend(
    {
        template : template,
        loadData : function()
        {
        },
        beforeRender : function() {
			init();
		},
        afterRender : function()
        {
        	$(document).ready(function(){
        		// 添加滑动门事件
        		$("#slidenav").slide({
    				type : "menu",
    				titCell : ".mainCate",
    				targetCell : ".subCate",
    				delayTime : 0,
    				triggerTime : 0,
    				defaultPlay : false,
    				returnDefault : true
    			});
        		
        		// 监测浏览器大小调整事件
				var slidenavWidth = $('#slidenav').width();
				// 设置初始大小
				$('.subCate').css('left', slidenavWidth);

				// 菜单栏的宽度响应窗口拖动大小变化事件
				$(window).resize(function() {
					slidenavWidth = $('#slidenav').width();
					// 设置初始大小
					$('.subCate').css('left', slidenavWidth);
				});
				
				//  类型链接事件
				$('.a_producttype').die().live('click',function(e) {

					var producttypeid = $(this).attr("producttypeid");
				});
			});
		}
    });
    module.exports = Menu;
}); 