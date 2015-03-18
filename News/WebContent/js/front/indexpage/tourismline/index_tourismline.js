/***
 * 首页线路界面
 */
define(function(require, exports, module) {
	var $ = require("$");
	require("bootstrap_commonrequire");

	var store = require('store');
	var basearchiveUtil = require('basearchive-util');

	var MODULE = "tourismline";
	
	
	var TabbedComponent = require("tabbed");

	// 默认引入：组件继承自widget
    var Widget = require("widget");
    // 自定义：组件的html模板
    var template = require("./index_tourismline.tpl");
    
    // 组件的定义 组件名大写
    var Tourismline = Widget.extend(
    {
        template : template,
        afterRender : function(){
        	var attrs = this.get("attrs");
			initFormComponent();
        },
    });
    // 组件对外提供使用
    module.exports = Tourismline;
    
	// 初始化Form组件
	var initFormComponent = function() {
		initTourismlineTabbed();
	}

	// 构建tabbed组件
	var initTourismlineTabbed = function(){
		$.ajax({
			async : false,
			dataType : 'json',
			type : "POST",
			url : "querynewstype.action",
			success : function(resultdata) {
				if (resultdata.ret && resultdata.ret.flag == "000000") {
					var resultList= resultdata.ret.data;
					if (resultList == null)
						return;
					
					// 解析data
					var tabstatus = [];
					$.each(resultList, function(n, value) {
						var id = value.id;
						var name = value.name;
						var entity = {
								id:MODULE + id,
								label:name
						};
						
						tabstatus.push(entity);
					});
					
					var tabattrs = {};
					tabattrs.id = "tourismlineTabble";
					tabattrs.tabs = tabstatus;
					
					var TourismlineTabbed = new TabbedComponent({
						attrs :  tabattrs,
						renderTo : "tourismlineTabbleWrapperDiv",
					});
					
					$("#tourismlineTabble ul").addClass("nav-tabs-simple");
					$("#tourismlineTabble ul").append('<div class="  pull-right  " style="margin-top:10px;">' +
														'<a  href="javascript:void(0)" id="moreList"> ' +
															'更多>> ' +
														'</a>' +
													'</div>');
					
					// tab页绑定点击事件
					$('#' + tabattrs.id + ' ul li a').on('click', function(e){
						var curTabPaneName = $(this).text();
						var curTabPaneId = $(this).attr('href');
						if(curTabPaneId){
							curTabPaneId = TourismlineTabbed.getTabLabelIndexByTabId(curTabPaneId);
							curTabPaneId = curTabPaneId.substring(MODULE.length);
						}
						if(curTabPaneName){
							initTourismlineList(curTabPaneName,curTabPaneId);
						}
					});
					
					// 默认选中第一个
					$('#' + tabattrs.id + ' ul li:first a').click();
					
					// 更多添加事件
					$("#moreList").on('click', function(e){
						
					});
				} else {
					bootbox.alertTimeout(resultdata.ret.desc);
				}
				
				
			},
			error : function(XMLHttpRequest, textStatus, errorThrown) {
				bootbox.alertTimeout("获取新闻类型失败");
			}
		});
	}
	
	var initTourismlineList = function(typename,typeid) {
		var TourismlineList = require("./tourismlinelist");
		TourismlineList.init({
			typename : typename,
			wrapperDiv : MODULE + typeid,
		})
	}
});