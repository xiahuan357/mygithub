define(function(require, exports, module) {

	/**
	 * Base 相当于object
	 */

	var Class = require('class');
	var Events = require('events');
	var Aspect = require('./aspect');
	//			var Attribute = require('./attribute');

	module.exports = Class.create({
		Implements : [ Events, Aspect ],
		prop : {},

		/**
		 * reload为boolean值，指定是否需要重新绘制
		 */
		set : function(param1, param2, reload) {
			if (this.prop[param1] != undefined) {
				this.prop[param1] = param2;
			} else {
				this.prop["attrs"][param1] = param2;
			}
			if (reload) {
				this.change();
			}
		},
		get : function(param) {
			if (this.prop[param]) {
				return this.prop[param];
			} else {
				if (this.prop["attrs"]) {
					return this.prop["attrs"][param];
				} else {
					return undefined;
				}
			}
		},
		change : function() {

		}
	});

});
