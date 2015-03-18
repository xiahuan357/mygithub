/***
 * 首页租车界面-按类型分类
 */
define(function(require, exports, module) {
	var $ = require("$");
	require("bootstrap_commonrequire");

	var store = require('store');
	var basearchiveUtil = require('basearchive-util');

	var MODULE = "type_car";
	
	/** 查询租车类型，在tabbed页签显示*/
	var type_query = GLOBAL.BASE + "front/car/cartype/search?q=";
	
	var TabbedComponent = require("tabbed");

	// 默认引入：组件继承自widget
    var Widget = require("widget");
    // 自定义：组件的html模板
    var template = require("./type_car.tpl");
    
    // 组件的定义 组件名大写
    var Car = Widget.extend(
    {
        template : template,
        afterRender : function(){
        	var attrs = this.get("attrs");
			initFormComponent();
        },
    });
    // 组件对外提供使用
    module.exports = Car;
    
	// 初始化Form组件
	var initFormComponent = function() {
		initCarTabbed();
	}

	// 构建tabbed组件
	var initCarTabbed = function(){
		$.ajax({
			async : false,
			dataType : 'json',
			contentType : "application/json;charset=UTF-8",
			type : "GET",
			url : type_query,
			success : function(resultdata) {
				if (resultdata && resultdata.flag == "000000") {
					var resultList= resultdata.data;
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
					tabattrs.id = "typeCarTabble";
					tabattrs.tabs = tabstatus;
					
					var CarTabbed = new TabbedComponent({
						attrs :  tabattrs,
						renderTo : "typeCarTabbleWrapperDiv",
					});
					
					$("#typeCarTabble ul").addClass("nav-tabs-simple");
					$("#typeCarTabble ul").append('<div class="  pull-right  " style="margin-top:10px;">' +
														'<a  href="javascript:void(0)" id="moreList"> ' +
															'更多>> ' +
														'</a>' +
													'</div>');
					
					// tab页绑定点击事件
					$('#' + tabattrs.id + ' ul li a').on('click', function(e){
						var curTabPaneId = $(this).attr('href');
						if(curTabPaneId){
							curTabPaneId = CarTabbed.getTabLabelIndexByTabId(curTabPaneId);
							curTabPaneId = curTabPaneId.substring(MODULE.length  );
							initCarList(curTabPaneId);
						}
					});
					
					// 默认选中第一个
					$('#' + tabattrs.id + ' ul li:first a').click();
					
					// 更多添加事件
					$("#moreList").on('click', function(e){
						
					});
				} else {
					bootbox.alertTimeout(resultdata.desc);
				}
				
				
			},
			error : function(XMLHttpRequest, textStatus, errorThrown) {
				bootbox.alertTimeout("获取租车类型失败");
			}
		});
	}
	
	var initCarList = function(curTabPaneId) {
		var CarList = require("./carlist");
		CarList.init({
			type_id : curTabPaneId,
			wrapperDiv : MODULE + curTabPaneId,
		})
	}
});