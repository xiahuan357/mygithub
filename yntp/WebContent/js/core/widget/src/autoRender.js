
/**
 * 组件自动渲染功能
 */
define(function(require, exports) {
	var $ = require('$');
	var DATA_WIDGET_AUTO_RENDERED = 'data-widget-auto-rendered'
	// 找到所有有data-widget的标签。然后获取值，加载对应的组件。
	initWidget();
	$(function() {
		initWidget();
	})
	
	function initWidget(){
		$('[data-widget]').not('[data-widget-auto-rendered]').each(function(i, element) {
			var widget_name = element
					.getAttribute('data-widget');
			var dataset = {};
			var attrs = element.attributes
			for (var i = 0, len = attrs.length; i < len; i++) {
				var attr = attrs[i]
				var name = attr.name
				if (name.indexOf('data-attr') === 0) {
					name = name.substring(11);
					if (attr.value.indexOf('{') === 0
							|| attr.value.indexOf('[') === 0) {
						dataset[name] = eval('(' + attr.value
								+ ')');
					} else if (attr.value.indexOf('function') === 0) {
						dataset[name] = function() {
							return eval(attr.value)
						};
					} else {
						dataset[name] = attr.value;
					}
				}
			}
			// 对属性进行获取
			seajs.use(widget_name, function(widget) {
				if(widget){
					new widget({
						attrs : dataset,
						renderTo : element
					})
				} 
			})
			$(element).attr(DATA_WIDGET_AUTO_RENDERED,true);
		})
	}
});