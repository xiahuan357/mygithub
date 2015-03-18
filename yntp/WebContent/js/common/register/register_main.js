/**
 * 注册框架，分两步 1 选择注册类型 2 填写信息
 */
define(function(require, exports, module) {
	var $ = require("$");
	var store = require("store");

	var Wizard = require("fuelux-wizard-instance");

	exports.init = function(param) {
		$(document).ready( function() {
				// 增加节点导航：1 选择新建方式；2 填写信息
				var wizard = new Wizard({
					attrs : {
						steptitles : [ {
							title : '1 选择用户类型',
							active : true,
							target : '#div_step1'
						}, {
							title : '2 基本信息',
							active : false,
							target : '#div_step2'
						}, {
							title : '3 详细信息',
							active : false,
							target : '#div_step3'
						} ],
						stepcontents : [ {
							id : 'div_step1',
							active : true,
						}, {
							id : 'div_step2'
						}, {
							id : 'div_step3'
						} ]
					},
					renderTo : param.divWrapperId
				});

				// 第一个选择用户类型
				var FirstComponent = require("./register_selecttype");
				// 第二个填写信息
				var SecondComponent = require("./register_baseinfo");
				// 第三个填写具体信息
				var ThirdComponent;
				
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
						var checkResult = FirstComponent.validateForm();
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
						var selector = $("#" + SecondComponent.getValidateFormId());
						var checkResult = selector.validate().form();
						if (!checkResult)
							return false;
						
						if(FirstComponent.getSelectUserType() == "1"){
							ThirdComponent = require("./register_more_business");
						} else if(FirstComponent.getSelectUserType() == "2"){
							ThirdComponent = require("./register_more_personal");
						}
						
						// 加载下一步界面元素
						ThirdComponent.init({
							attrs : {
								divWrapperId : "div_step3",
							}
						});
					}
					
					// 上一步事件
					if (typeof (data) != "undefined" && data.step === 3 && data.direction === 'previous') {
						if(FirstComponent.getSelectUserType() == "1"){
							ThirdComponent.deleteCancelImage();
						} else if(FirstComponent.getSelectUserType() == "2"){
						}
					}
				});

				// 结束事件
				UXwizard.on('finished', function(e, data) {
					var desurl ;
					var postData;
					if(FirstComponent.getSelectUserType() == "1"){
						var selector = $("#" + ThirdComponent.getValidateFormId());
						var checkResult = selector.validate().form();
						if (!checkResult)
							return false;
						
						desurl = GLOBAL.BASE + "front/register/registerbusiness";
						postData = {
								userEntity : SecondComponent.getFormData(),
								businessEntity : ThirdComponent.getFormData(),
						}
						
					} else if(FirstComponent.getSelectUserType() == "2"){
						desurl = GLOBAL.BASE + "front/register/registerpersonal";
						postData = {
								userEntity : SecondComponent.getFormData(),
						}
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
								bootbox.alertTimeout("创建成功！");
								// 跳转到登录界面
								window.location=GLOBAL.HTML_HOME + "register/registerresult.html";
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
