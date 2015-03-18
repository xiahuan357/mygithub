/**
 * 商家业务工作台
 */
define(function(require, exports, module) {
	var $ = require("$");
	var Console = require("console");
	var consoledata = require('./consoledata-business');
	
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