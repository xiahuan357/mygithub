/**
 * 首页-旅游线路-搜索框
 */
define(function(require, exports, module) {

	var $ = require("$");
	require("bootstrap_commonrequire");
	require('select2.css');
	require('select2');

	var basearchiveUtil = require('basearchive-util');
	var form = require('basearchive-form');

	var MODULENAME = "scenic_searchform";

	// 实例化组件-------------------------START
	var template = require("./searchform.tpl");
	var Widget = require("widget");
	var Component = Widget.extend({
		template : template,
		afterRender : function() {
			// ------------<组件开始
			var com_name = $('#text_name');
			var com_type = $('#text_type');
			// ------------组件开始>

			function getUIComponent() {
				// ------------<组件开始
				com_name = $('#text_name');
				com_type = $('#text_type');
				// ------------组件开始>
			}

			// 初始化Form组件
			var initFormComponent = function() {
				basearchiveUtil.initSelect2Value({
						queryUrl : GLOBAL.BASE + "front/scenic/scenictype/getselectmodel",
						com_select2 : com_type,
						placeholder : "线路类型",
						errorMsg : "初始化线路类型失败",
					});
			}

			// 初始化Form组件事件
			var initFormEvents = function() {
				basearchiveUtil.initValidateSelect2Events({
					select2Id : "text_type",
				});
			}

			// 获得界面数据
			var getFormData = function() {

				var formData = {
					name : com_name.attr("value"),
					type_id : com_type.val(),
				}

				return formData;
			}

			getUIComponent();
			initFormComponent();
			initFormEvents();
		}
	});
	
	// 组件对外提供使用
	module.exports = Component;
});