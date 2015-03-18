define(function(require, exports, module) {
			var $ = require("$");
			require.async('../theme/default/css/layout.css', function() {
				$(".page_default").show();
				setTimeout(function(){
					if($(".page_default").length>0){
					var mask = $("<div class='loading'></div>");
					$($("iframe")[0]).before(mask);}
				}, 300);
				// 针对不支持css query的浏览器加载另外的css
				// if ($.browser.msie) {
				if (window.screen.width <= 1024) {
					require.async("../theme/default/css/layout1024.css");
				}
					// }
				});
		});