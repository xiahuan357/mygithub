/**
 * 顶部栏
 */
define(function(require, exports, module)
{
	var $ = require("$");
	var store = require("store");
	var userutil = require("userutil");
	var application = require("application");

    // 默认引入：组件继承自widget
    var Widget = require("widget");
    // 自定义：组件的html模板
    var template = require("./fixed-header-login.tpl");
    
    var longPolling = function(callback) {
    	var userInfo = userutil.getUserInfo();
    	// 查询未读信息
		var queryUrl = GLOBAL.BASE + "admin/message/"+userInfo.id+"/unreadcount";
		var fiveMinute = 5 * 60 * 1000;
        $.ajax({
            url: queryUrl,
            async: true,
            cache: false,
            global: false,
            timeout: fiveMinute,
            type : "GET",
			dataType : 'json',
			contentType : "application/json;charset=UTF-8",
            success: function (resultdata, status, request) {
                callback(resultdata);
                resultdata = null;
                status = null;
                request = null;
                setTimeout(
                    function () {
                        longPolling( callback);
                    },
                    fiveMinute
                );
            },
            error: function (xmlHR, textStatus, errorThrown) {
                xmlHR = null;
                textStatus = null;
                errorThrown = null;

                setTimeout(
                    function () {
                        longPolling( callback);
                    },
                    fiveMinute
                );
            }
        });
    };
    
    var initMessageList = function() {
    	var userInfo = userutil.getUserInfo();
    	// 查询未读信息
		var queryUrl = GLOBAL.BASE + "admin/message/pagesearch/"+userInfo.id+"/messagelist?start=0&size=5&q=is_read=0";
		$.ajax({
			async : false,
			type : "GET",
			dataType : 'json',
			contentType : "application/json;charset=UTF-8",
			url : queryUrl,
			success : function(resultdata) {
				if ('000000' != resultdata.flag) {
//					bootbox.alertTimeout('查询数据出现错误，请刷新重试！');
				} else {
					var pageData = resultdata.data;
					if (pageData != null  ) {
						var pageItems = pageData.items;
						var messageListHtml = "";
						for(var i=0 ;i < pageItems.length ;i++){
							messageListHtml += '<li id="baseinfoset">';
							messageListHtml += 		'<a href="#">' +pageItems[i].title ;
							messageListHtml += 		'</a>';
							messageListHtml +=  '</li>';
						}
						$("#dropdown-menu-messagelist").html(messageListHtml);
						$("#messageCount").text(pageData.totalItemNum);
					} else {
//						bootbox.alertTimeout('查询数据出现错误，请刷新重试！');
					}
				}
			},
			error : function(XMLHttpRequest, textStatus, errorThrown) {
//				bootbox.alertTimeout('查询数据出现错误，请重试！');
			}
		});
    }
    
    // 组件的定义 组件名大写
    var FixedHeader = Widget.extend(
    {
        template : template,
        afterRender : function() {
			// 获取用户信息事件
			var userName = userutil.getUserName();
			var userLink;
			var userEntity = userutil.getCurrentUserFromServer();
			if(userEntity == null){
				return;
			}
		    MessagePush.onPageLoad(userEntity.id);
			//-----------------------------用户菜单设置----------------------------------
			// 用户类型0 系统管理员；1 商家；2 用户
			if (userEntity.usertype == 0) {
				userLink = "<a id='linktosystem' href='#'  style='color:red'>" + userName + "</a>";
				$("#baseinfoset").remove();
			} else if (userEntity.usertype == 1) {
				userLink = "<a id='linktobusinessinfo' href='#'   style='color:red'>" + userName + "</a>";
			} else if (userEntity.usertype == 2) {
				userLink = "<a id='linktobusinessinfo' href='#'   style='color:red'>" + userName + "</a>";
			}

			$("#userName").prepend(userLink);
			// 连接到系统管理员
			$("#linktosystem").die().on("click", function() {
				window.location = GLOBAL.URL.ADMIN_INDEX;
			});
			// 链接到用户业务中心
			$("#linktobusinessinfo").die().on("click", function() {
				window.location = GLOBAL.URL.BUSINESSINFO_INDEX;
			});
			// 设置鼠标移上去事件，下拉框展开
			$('#dropdown-usersetting').hover(function() {
				$('#dropdown-usersetting').addClass("open");
			}, function() {

			});

			// 设置鼠标移开事件，下拉框关闭
			$('#dropdown-menu-usersetting').hover(function() {

			}, function() {
				$('#dropdown-usersetting').removeClass("open");
			});

			// 账户设置
			$("#baseinfoset").die().on("click", function() {
				window.location = GLOBAL.URL.BASEINFO_INDEX;
			});

			//-----------------------------用户菜单设置----------------------------------

			//-----------------------------消息菜单设置----------------------------------
			// 账户设置
			$("#dropdown-messagelist").die().on("click", function() {
				window.location = GLOBAL.URL.MESSAGE_INDEX;
			});

			// 设置鼠标移上去事件，下拉框展开
			$('#dropdown-messagelist').hover(function() {
				$('#dropdown-messagelist').addClass("open");
				initMessageList();
			}, function() {

			});

			// 设置鼠标移开事件，下拉框关闭
			$('#dropdown-menu-messagelist').hover(function() {

			}, function() {
				$('#dropdown-messagelist').removeClass("open");
			});

			initMessageList();
		    longPolling( function(resultdata) {
		        if(resultdata) {
					if ('000000' != resultdata.flag) {
					} else {
						var count = resultdata.data;
						if (count != null  ) {
							$("#messageCount").text(count);
						} else {
						}
					}
		        }
		    });
			//-----------------------------消息菜单设置----------------------------------

			//-----------------------------退出事件设置----------------------------------
			$("#logout").die().on( "click", function() {
				application.logout();
			});
			//-----------------------------退出事件设置----------------------------------
			//-----------------------------联系我们设置----------------------------------
			// 联系我们事件
			$("#connectus").die().on("click", function() {
				window.location = GLOBAL.URL.CONNECTUS;
			});
		},
    });
    // 组件对外提供使用
    module.exports = FixedHeader;
}); 
