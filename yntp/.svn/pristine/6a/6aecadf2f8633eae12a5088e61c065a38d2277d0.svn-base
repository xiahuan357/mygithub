/**
 * 邮箱验证导航界面
 */
define(function(require, exports, module) {
	var $ = require("$");
	var store = require("store");
	var basearchiveUtil = require('basearchive-util');
	var userutil = require("userutil");
	var Wizard = require("fuelux-wizard-instance");
	var loader = require('loader');
	exports.init = function(param) {
		$(document).ready(function() {
			var userInfo = userutil.getUserInfo();

			$('#form_btn_return').die().live('click',function() {
						basearchiveUtil.jumpToHtml(tableUrl);
			});

			// 增加节点导航：1 填写基本信息；2 填写扩展信息
			var wizard = new Wizard({
				attrs : {
					steptitles : [ {
						title : '1 验证原邮箱',
						active : true,
						target : '#div_step1'
					}, {
						title : '2 输入新邮箱地址',
						active : false,
						target : '#div_step2'
					}, ],
					stepcontents : [ {
						id : 'div_step1',
						active : true,
					}, {
						id : 'div_step2'
					}, ]
				},
				renderTo : param.divWrapperId
			});

			// 第一个基本信息
			var FirstComponent = require("./emailvalidate_fir");
			// 第二个扩展信息
			var SecondComponent = require("./emailvalidate_sec");

			// 初始化第一个组件
			FirstComponent.init({
				attrs : {
					divWrapperId : "div_step1",
				}
			});

			var UXwizard = $('#' + param.divWrapperId);
			UXwizard.on('change',function(e, data) {
				// 加载第二步组件
				if (typeof (data) != "undefined"&& data.step === 1&& data.direction === 'next') {
					var selector = $("#"+ FirstComponent.getValidateFormId());
					var checkResult = selector.validate().form();
					if (!checkResult)
						return false;
					if (FirstComponent.preemailvalidate()) {
						// 加载下一步界面元素
						SecondComponent.init({
							attrs : {
								divWrapperId : "div_step2",
								securitysettingUrl : param.securitysettingUrl,
							}
						});
					} else {
						bootbox.alertTimeout("输入原邮箱有误!");
						return false;
					}
				}
			});

			// 结束事件
			UXwizard.on('finished',function(e, data) {
				if (!SecondComponent.haveSendValidateSuccess()) {
					bootbox.confirm('验证邮箱没有发送成功，是否退出？',function(confirmed) {
						if (confirmed) {
							basearchiveUtil
									.jumpToHtml(param.securitysettingUrl);
						}
					});
				}
			});
		});
		$('#form_btn_return').die().live('click', function() {
			basearchiveUtil.jumpToHtml(param.securitysettingUrl);
		});
	};
});
