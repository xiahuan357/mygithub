define(function(require, exports, module)
{
	(function()
	{
		var $ = require('$');
		var bootbox = require("bootbox");
		var jQuery = $;
        
		$(document).ready(function()
		{
			var body, click_event, nav, nav_closed_width, nav_open;
			nav = $("#main-nav");
			body = $("body");
			nav_closed_width = 50;
			nav_open = body.hasClass("main-nav-opened") || nav.width() > nav_closed_width;
			click_event = (jQuery.support.touch ? "tap" : "click");
			$("body").delegate("#main-nav .dropdown-collapse", click_event, function(e)
			{
				var link, list;
				e.preventDefault();
				link = $(this);
				list = link.parent().find("> ul");
				if (list.is(":visible"))
				{
					if (body.hasClass("main-nav-closed") && link.parents("li").length === 1)
					{
						false;
					}
					else
					{
					    link.removeClass("in");
					    link.children(".angle-down").removeClass("icon-angle-up").addClass("icon-angle-down");
						list.slideUp(500, function()
						{
						    link.removeClass("in");
						    link.children(".angle-down").removeClass("icon-angle-up").addClass("icon-angle-down");
						});
					}
				}
				else
				{
					if (list.parents("ul.nav.nav-stacked").length === 1)
					{
						$(document).trigger("nav-open");
					}
				    link.addClass("in");
                    link.children(".angle-down").removeClass("icon-angle-down").addClass("icon-angle-up");
					list.slideDown(500, function()
					{
					    link.addClass("in");
                        link.children(".angle-down").removeClass("icon-angle-down").addClass("icon-angle-up");
					});
				}
				return false;
			});
			$("body").delegate(".child", click_event, function(e)
			{
			    // 清除已激活的状态
				var url = $(this).attr("url");
				exports.toPageView(url);
			});
			$("body").delegate("#search_btn", "click", function(e)
			{
			    exports.toPageView("goodsqryresult.html");
			});
			$("body").delegate("#search_txt", "keydown", function(e)
            {
                if (e.keyCode == 13)
                {
                   exports.toPageView("goodsqryresult.html");
                }
            }); 
			 
			$("body").delegate("#helpcenter", "click", function(e)
			{
			    exports.toPageView("helpcenter/help-index.html");
			});
			
			if (jQuery.support.touch)
			{
				nav.swiperight(function(event, touch)
				{
					return $(document).trigger("nav-open");
				});
				nav.swipeleft(function(event, touch)
				{
					return $(document).trigger("nav-close");
				});
			}
			$("body").delegate("#nav_toggler", click_event, function(e)
			{
				if (nav_open)
				{
					$(document).trigger("nav-close");
				}
				else
				{
					$(document).trigger("nav-open");
				}
				return false;
			});
			$(document).bind("nav-close", function(event, params)
			{
				body.removeClass("main-nav-opened").addClass("main-nav-closed");
				return nav_open = false;
			});
			return $(document).bind("nav-open", function(event, params)
			{
				body.addClass("main-nav-opened").removeClass("main-nav-closed");
				return nav_open = true;
			});
		});
		     
        exports.toPageView = function(url)
        {
            $("#licenseTable").remove();
            // 清除已激活的状态
            $("li").removeClass("active");
            $.ajax(
            {
                url : GLOBAL.HTML_HOME + url,
                dataType : "html",
                contentType : "application/json; charset=utf-8",
                success : function(res)
                {
                	// 如果点击菜单返回的是 登录超时，那么需要跳转到登录界面
                	if(res=="登陆超时！请重新登陆！"){
                		var userutil = require("userutil");
			        	userutil.clearUserInfo();
	                    window.location.href = GLOBAL.URL.LOGINURL;
	                    return;
                    } 
                	
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
                },
                error : function(XMLHttpRequest, textStatus, errorThrown){  
                }
            });
        }; 
 	}).call(this);
});