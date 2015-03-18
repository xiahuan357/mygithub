/**
 * 美食导航界面
 */
define(function(require, exports, module) {
	var $ = require("$");
	var store = require("store");
	var basearchiveUtil = require('basearchive-util');
	var userutil = require("userutil");
	var Wizard = require("fuelux-wizard-instance");

	var tableUrl = GLOBAL.HTML_HOME + "admin/customer/business/food/biz_food_table.html";
	exports.init = function(param) {
		$(document).ready( function() {
			var userInfo = userutil.getUserInfo();
			
        	$('#form_btn_return').die().live('click', function() {
        		basearchiveUtil.jumpToHtml(tableUrl);
			});
        	
			// 增加节点导航：1 填写基本信息；2 填写扩展信息
			var wizard = new Wizard({
				attrs : {
					steptitles : [ {
						title : '1 基本信息',
						active : true,
						target : '#div_step1'
					}, {
						title : '2 扩展信息',
						active : false,
						target : '#div_step2'
					}, {
						title : '3 图片管理',
						active : false,
						target : '#div_step3'
					}
					],
					stepcontents : [ {
						id : 'div_step1',
						active : true,
					}, {
						id : 'div_step2'
					}, {
						id : 'div_step3'
					}
					]
				},
				renderTo : param.divWrapperId
			});

			// 第一个基本信息
			var FirstComponent = require("./biz_food_baseinfo");
			// 第二个扩展信息
			var SecondComponent = require("./biz_food_extendinfo");
			// 第三个图片管理
			var ThirdComponent = require("./biz_food_imagelibrary");
			
			// 初始化第一个组件
			FirstComponent.init({
				attrs : {
					divWrapperId : "div_step1",
				}
			});
			
			var UXwizard = $('#' + param.divWrapperId);
			UXwizard.on('change', function(e, data) {
				// 加载第二步组件
				if (typeof (data) != "undefined" && data.step === 1 && data.direction === 'next') {
					var checkResult =FirstComponent.validateForm();
					if (!checkResult)
						return false;
					
					// 加载下一步界面元素
					SecondComponent.init({
						attrs : {
							divWrapperId : "div_step2",
						}
					});
				}
				
				// 加载第三步组件
				if (typeof (data) != "undefined" && data.step === 2 && data.direction === 'next') {
					ThirdComponent.init({
						attrs : {
							divWrapperId : "div_step3",
						}
					});
				}
				// 上一步事件
				if (typeof (data) != "undefined" && data.step === 3 && data.direction === 'previous') {
				}
			});

			// 结束事件
			UXwizard.on('finished', function(e, data) {
				var storeRowData = store.get("currentSelectRowDatafood");
				var optType = store.get("currentOptTypefood");
				
				var desurl ;
				var postData;
				
				var FORMOPTURL_INSERT = GLOBAL.BASE + "admin/business/food/" + userInfo.id + "/createwithimage";
				var FORMOPTURL_UPDATE = GLOBAL.BASE + "admin/business/food/" + userInfo.id + "/updatewithimage";

				var firstData = FirstComponent.getFormData();
				var secondData = SecondComponent.getFormData();
				var thirdData = ThirdComponent.getFormData();
				
				var foodEntity = $.extend({},firstData,secondData,thirdData);
				if (optType == basearchiveUtil.FORMOPT_CREATE) { //新增，清空数据
					desurl = FORMOPTURL_INSERT;
				} else if (optType == basearchiveUtil.FORMOPT_UPDATE) { //修改，回填数据
					desurl = FORMOPTURL_UPDATE + "/" + storeRowData.id;
				}
				postData ={
						currentEntity : foodEntity,
						imagelist : SecondComponent.getImageList(),
				}
				var loader = require('loader');
				var doResult = false;
				
				loader.loading("正在保存，请稍等……");
				$.ajax({
					type : "POST",
					dataType : 'json',
					contentType : "application/json;charset=UTF-8",
					url : desurl,
					data : JSON.stringify(postData), 
					success : function(resultdata) {
						loader.noloading();
						if('000000' != resultdata.flag){
							doResult = false; 	// 保存出错
							// 显示错误信息
							bootbox.alertTimeout(resultdata.desc);
						} else {
							doResult = true;
							bootbox.alertTimeout("保存成功！");
							// 跳转到列表界面
							basearchiveUtil .jumpToHtml(tableUrl);
						}
					},
					error : function(XMLHttpRequest, textStatus, errorThrown) {
						loader.noloading();
						doResult = false;
						bootbox.alertTimeout("操作失败！");
					}
				});
				
				return doResult;
			});
		});
	};

});
