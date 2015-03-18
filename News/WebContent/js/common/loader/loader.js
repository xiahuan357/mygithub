define(function(require,exports,module){
	var $ = require("$");
	require("./loader.css");
	exports.loading = function(message)
	{
		$("body").append("<div id='loading'><div><span>"+message+"</span></div></div>");
	};
	
	exports.noloading = function()
	{
		$("#loading").remove();
	};
});
