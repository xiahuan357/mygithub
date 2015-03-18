/**
 * 普通用户业务工作台
 */
define(function(require, exports, module) {
	var $ = require("$");
	var Console = require("console");
	var consoledata = require('./consoledata-personal');
	
	exports.init = function(param) {
		$(document).ready(function(){
			 new Console({
				 attrs : {
					 consoledata : consoledata,
				 },
				 renderTo : param.consoleWrapperDiv
            });
		});
	}
});