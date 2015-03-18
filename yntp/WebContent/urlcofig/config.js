define(function(require, exports, module)
{
    window.GLOBAL = window.G =
    {
    };
    GLOBAL.BASE = "/news/";
    GLOBAL.HTML_HOME = "/news/html/";
    
    GLOBAL.URL =
    {
        LOGINURL :'/news/html/login/login.html', // 登录界面
        REGISTER :'/news/html/register/register.html', // 注册界面
        INDEX : "/news/html/front/index.html",//  前台首页
        ADMIN_INDEX : "/news/html/admin/sys/sysindex.html",// 系统管理员首页
        BUSINESSINFO_INDEX : "/news/html/admin/customer/common/businessinfoindex.html",// 商家和普通用户的业务处理首页
        BASEINFO_INDEX : "/news/html/admin/customer/common/baseinfoindex.html",// 商家和普通用户的基本信息首页
        MESSAGE_INDEX : "/news/html/admin/customer/common/messageindex.html",// 商家和普通用户的消息中心
        
        CONNECTUS :"",// 联系我们
        ERROR_404 : "error/404.html",// 错误页面
        ERROR_500 : "error/500.html",// 错误页面
        ERROR_503 : "error/503.html",// 错误页面
    };
    GLOBAL.IMG =
    {
         DEFAULTIMG_BIG:"/news/img/common/default-1.png",// 默认大图片
    };
});
