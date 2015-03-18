/***
 * 首页特产界面
 */
define(function(require, exports, module) {
	var $ = require("$");
	require("bootstrap_commonrequire");

	var store = require('store');
	var basearchiveUtil = require('basearchive-util');
	
	var MODULE = "nationalspecial";

	/** 查询特产类型，在tabbed页签显示*/
	var type_query = GLOBAL.BASE + "front/nationalspecial/nationalspecialtype/search?q=";
	

	// 默认引入：组件继承自widget
    var Widget = require("widget");
    // 自定义：组件的html模板
    var template = require("./index_nationalspecial.tpl");
    
    // 组件的定义 组件名大写
    var Nationalspecial = Widget.extend(
    {
        template : template,
        afterRender : function(){
        	var attrs = this.get("attrs");
			initFormComponent();
        },
    });
    // 组件对外提供使用
    module.exports = Nationalspecial;
    
	// 初始化Form组件
	var initFormComponent = function() {
		initNationalspecialList();
	}
	
	var initNationalspecialList = function(typeid) {
		var NationalspecialList = require("./nationalspeciallist");
		NationalspecialList.init({
			wrapperDiv : 'nationalspecialList',
		})
	}
});