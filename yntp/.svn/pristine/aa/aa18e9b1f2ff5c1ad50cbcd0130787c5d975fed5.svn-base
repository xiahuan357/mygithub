/**
 * 系统管理员界面，头部导航构造
 */
define(function(require, exports, module)
{
	    var $ = require("$");
	    var Widget = require("widget");
	    var template = require("./sec-header.tpl");
	    require("bootstrap_commonrequire");
	    var menudata = require("./sec-header.json");
	    var userutil = require("userutil");
	    
	    var SecHeader = Widget.extend(
	    {
	        template : template,
	        loadData : function()
	        {
	            this.setModel(menudata);
	        },
	        afterRender : function()
	        {
	        	var userEntity = userutil.getCurrentUserFromServer();
	        	
	        	$("#admininfodiv").append(userEntity.username + "，欢迎您！");
	        	var nav = require("bootstrap_nav");
	        	$('li.la').hover(
		    	        function(){
		    	           $('ul.ua').show();
		    	        },
		     	        function(){
		    		       $('ul.ua').hide();
		    	        });
		    	$('li.lb').hover(
		    	    	function(){
		    	    	   $('ul.ub').show();
		    	    	},
		    	     	function(){
		    	    		$('ul.ub').hide();
		    	    	});
		    	$('li.lc').hover(
		    	    	function(){
		    	    	   $('ul.uc').show();
		    	    	},
		    	     	function(){
		    	    		$('ul.uc').hide();
		    	    	});
		    	$('li.ld').hover(
		    	    	function(){
		    	    	   $('ul.ud').show();
		    	    	},
		    	     	function(){
		    	    		$('ul.ud').hide();
		    	    	});
		    	
		    	click_event = (jQuery.support.touch ? "tap" : "click");
			    $(".main-nav").delegate(".mchild", click_event, function(e)
				{
				    // 清除已激活的状态
					var url = $(this).attr("url");
					exports.toPageView(url);
				});
	        }
	    });
	    module.exports = SecHeader;
	    
	    exports.toPageView = function(url)
	    {
	        $.ajax(
	        {
	            url : GLOBAL.HTML_HOME + url,
	            dataType : "html",
	            contentType : "application/json; charset=utf-8",
	            success : function(res)
	            {
	                var linode = $("a[url='"+url+"']:eq(0)").closest("li");
	                var list = linode.parent();
	                if(!list.is(":visible"))
	                {
	                    list.prev().addClass("in");
	                    list.prev().children(".angle-down").removeClass("icon-angle-down").addClass("icon-angle-up");
	                    list.slideDown(500);
	                }
	                linode.addClass("active");
	                $("#content-wrapper").html(res);
	            }
	        });
	    }; 
});
