define(function(require, exports, module) {

	// Widget
	// 相当于swing jcomponent
	// ---------
	// Widget 是与 DOM 元素相关联的组件，主要负责 View 层的管理。
	require("./css/base.css");
	var Base = require('base');
	var $ = require("$");
	var handlebars = require("handlebars");
	var store = require("store");
	var draganddrop = require("draganddrop");
	// 注册nvl函数
	handlebars.registerHelper("nvl", function(param) {
		if (param == "null" || param == null) {
			return "";
		}
	});

	var Widget = Base.extend({
		// 数据
		model : {},
		// 所有属性
		prop : {},
		Implements : [ draganddrop ],
		// 默认模板
		template : "<div></div>",
		setTemplate : function(template) {
			this.template = template;
			if(seajs.emit){
				if (parent) {
					top.seajs.emit("widget_template_change");
				} else {
					seajs.emit("widget_template_change");
				}
			}
			this.change();
		},
		// 子类标识
		classPrefix : "ui-default",
		setModel : function(model) {
			this.model = model;
			this.prop["model"] = model;
			this.change();
		},
		initialize : function(config) {
			if (!config)
				return;
			// 0:初始化公共参数
			this.initAttr(config);
			// 初始化组件特有参数
			this.initCustAttr();
			// element 初始化
			this.parseElement();
			// widget初始化（供子类覆写）
			this.setup(config);
			// 加载数据
			this.loadData();
			// render
			this.render();
			// 事件绑定
			this.bindEvent();
			// 事件监听
			this.bindListener();
		},
		// 加载数据
		loadData : function() {

		},
		parseElement : function() {
			this.element = $(this.template);
		},
		// 组件加载
		render : function() {
			this.beforeRender();
			this.element = this.parseElementFromTemplate();
			var parentNode = this.get('parentNode');
			if (parentNode) {
				parentNode.html(this.element);
			}
			this.afterRender();
			if(this.get("custom"))
			{
				this.custom();
			}
			// 重新布局
			if(seajs.emit){
				//两层iframe嵌套时
				if(parent!=top){
					parent.seajs.emit('event_widget_rendered');
				}
				top.seajs.emit('event_widget_rendered');
			}
			if(this.get("dragable")){
				var option = {"dragElement":this.element};
				this.dragInit(option);
			}
			return this.element;
		},
		// render前方法，供扩展
		beforeRender : function() {
		},
		// render后方法，供扩展
		afterRender : function() {
		},
		// 组装数据和模板
		parseElementFromTemplate : function() {
			var template = this.compile(this.template);
			try{
				this.element = $(template(this.prop));
			}catch(e){
				return template(this.prop);
			}
			// 容器组件包含其他组件
			// 容器组件的内容区默认class接口是J-content
			var content = this.get("content");
			if (content) {
				var contentNode = this.element.find(".J-content");
				if (content instanceof Widget) {
					content.set("parentNode", contentNode, true);
				} else {
					contentNode.html(content);
				}
			}
			return this.element;
		},
		// 子类初始化
		setup : function(config) {
		},
		// 属性初始化
		initAttr : function(config) {
			//增加config(store)
			var parentNode;
			if ($.type(config.renderTo) === "string" || $.type(config.renderTo) === "number") {
				var rendTo = $("#" + config.renderTo);
				if (rendTo.length > 0) {
					parentNode = rendTo;
				} else {
//					if (console) {
//						console.error("没有找到id为" + config.renderTo + "的元素，请检查组件renderTo对应的id是否存在！");
//					}
				}
			} else {
				parentNode = $(config.renderTo);
			}
			//读取组件可配置的信息
			var option ={};
			if(store!=undefined){
				var componentConfigs=store.get("componentConfigs") || {};
				option=componentConfigs[this.id] || this.defaultOption;
			}
			this.prop = {
				// 如果config.attrs为undefine，则attrs={}
				attrs : $.extend(true,config.attrs || {},option),
				parentNode : parentNode,
				model : config.model,
				classPrefix : this.classPrefix,
				autoRender : config.autoRender,
				G : G || {}//上下文变量
			};
			this.bindListener = config.bindListener || this.bindListener;
			this.afterRender = config.afterRender || this.afterRender;
		},
		// 解析通过 data-attr 设置的 api
		_parseDataAttrsConfig : function(config) {
			var element, dataAttrsConfig
			config && (element = $(config.element))

			// 解析 data-api 时，只考虑用户传入的 element，不考虑来自继承或从模板构建的
			if (element && element[0] && !AutoRender.isDataApiOff(element)) {
				dataAttrsConfig = DAParser.parseElement(element)
			}

			return dataAttrsConfig
		},
		// 初始化个性化参数
		initCustAttr : function() {

		},
		// 事件绑定
		bindEvent : function() {

		},
		// 绑定监听
		bindListener : function() {

		},
		// 属性变化
		change : function() {
			this.render();
		},
		// 模板编译
		compile : handlebars.compile,
		// 模板引擎
		handlebars : handlebars,
		//销毁组件
		destroy:function(){
			this.prop.parentNode.remove();
		}
	});

	module.exports = Widget;
});
