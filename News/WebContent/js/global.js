//根据localStorage里的值绑定当前默认样式
window.GLOBAL = window.G = {};
var getTheme = function() {
	var theme = eval(window.localStorage["themecolor"]) || "default";
	return theme;
};
seajs.config({
	/* 默认路径前缀 */
	paths : {
		
	},
	base: "/News/",
	alias : {
		// url配置信息
		"urlconfig" : "urlcofig/config",
		// 全局工具, global.js加载的时候同时加载
		"globalutil" : "js/common/util/src/js/globalutil",
		//core核心组件
		'$' : 'js/core/jquery/src/jquerycmd-1.10.1',
		'jquery' : 'js/core/jquery/src/jquerycmd-1.10.1',
		'jquery-migrate' : 'js/core/jquery/src/jquery-migratecmd.min',
		
		'class' : 'js/core/class/src/class',
		'aspect' : 'js/core/base/src/aspect',
		'events' : 'js/core/event/src/events',
		'base' : 'js/core/base/src/base',
		'widget' : 'js/core/widget/src/widget',// 组件核心
		'autoRender' : 'js/core/widget/src/autoRender',// 自动加载组件
		'handlebars' : 'js/core/handlebars/src/handlebars',// 模板解析
		
		/* common组件-start- */
		"table" : "js/common/table/src/js/table", // 表格公共组件	
		"datatableutil" : "js/common/table/src/js/datatableutil",
		"ajaxReloadDataTable" : "js/common/table/src/js/ajaxReloadDataTable",
		'queryparamutil' : 'js/common/util/src/js/queryparamutil', // 查询参数构造工具
		'userutil' : 'js/common/util/src/js/userutil', // 用户信息操作工具
		
		"form" : "js/common/form/src/js/form",  //常规表单
		"form_multiblock" : "js/common/form/src/js/form_multiblock",  //分块表单
		"form_display" : "js/common/form/src/js/form_display",  //表单XS
		
		"basearchive-form" : "js/common/basearchive/src/js/basearchive-form", // 基础档案-Form,
		"basearchive-table" : "js/common/basearchive/src/js/basearchive-table", // 基础档案-Form
		"basearchive-util" : "js/common/basearchive/src/js/basearchive-util", // 基础档案-Form
		"login" : "js/common/login/login",// 登录
		"register" : "js/common/register/register", // 注册
		"register_active" : "js/common/register/register_active", // 激活
		
		"loader" : "js/common/loader/loader",  // loading对话框
		'modaldialog' : 'js/common/dialog/src/js/modaldialog',
		"multiselect2side":"js/common/multiselect2side/multiselect2side",// 下拉框左右选择组件
		"dialogmultiselect2side":"js/common/multiselect2side/dialogmultiselect2side",// 下拉框左右选择组件的对话框
		"fuelux-wizard-instance":"js/common/wizard/js/fuelux-wizard-instance", // 导航组件
		"tabbed" : "js/common/tabbed/src/js/tabbed",// tabbed 组件
		
		"treetable" : "js/common/treetable/src/js/treetable",// 树表 组件
		"textarea" : "js/common/textarea/src/js/textarea",// 文本输入框 组件
		"ueditor" : "js/common/ueditor/src/js/ueditor",//  富文本编辑框 组件
		
		"imageupload" : "js/common/imageupload/imageupload", // 单文件上传
		"imagelibrary" : "js/common/imagelibrary/imagelibrary", // 文件库操作组件
		
		"console" : "js/common/console/src/js/console",// 工作台公共组建
		
		"application" : "js/common/application/application",// 应用程序公共js
		
        "ajaxfileupload":"js/tool/ajaxfileupload/ajaxfileupload",
		/* common组件-end- */
		
		/* 系统管理员-start- */
		"sysindex" : "js/admin/sys/index/src/js/sysindex",			// 索引页
		"header" : "js/admin/sys/header/src/js/header",        //主页头部	
		"secheader" : "js/admin/sys/header/src/js/sec-header",    //主页头部导航
		"menu" : "js/admin/sys/menu/src/js/menu",				// 菜单
		"console-system" : "js/admin/sys/console/console-system",				// 系统管理员工作台
		
		
		"sys_user_form":"js/admin/sys/user/sys_user_form",
		"sys_user_table":"js/admin/sys/user/sys_user_table",
		
		"sys_user_mod_table":"js/admin/sys/usermod/sys_user_mod_table",
		"sys_user_mod_position":"js/admin/sys/usermod/sys_user_mod_position",
		"sys_user_mod_department":"js/admin/sys/usermod/sys_user_mod_department",
		
		"sys_news_table":"js/admin/sys/news/sys_news_table",// 系统管理员-新闻列表
		"sys_news_form":"js/admin/sys/news/sys_news_form",// 系统管理员-新闻表单
		"sys_news_preview":"js/admin/sys/news/sys_news_preview",// 系统管理员-新闻预览
		
		"sys_news_type_table":"js/admin/sys/news/sys_news_type_table",// 系统管理员-新闻类型列表
		"sys_news_type_form":"js/admin/sys/news/sys_news_type_form",// 系统管理员-新闻类型表单
		
		"sys_news_type_select_form":"js/admin/sys/news/sys_news_type_select_form",// 新闻类型变更
		
		"sys_news_publish_table":"js/admin/sys/news/sys_news_publish_table",
		"sys_news_publish_form":"js/admin/sys/news/sys_news_publish_form",
		
		"sys_news_approvestatus":"js/admin/sys/news/sys_news_approvestatus",
		"sys_news_approve":"js/admin/sys/news/sys_news_approve",
		
		"sys_news_approve_chief":"js/admin/sys/news/sys_news_approve_chief",//总编
		
		
		
		/* 商家-普通用户公共-start- */
		"emailvalidate_form":"js/admin/customer/common/emailvalidate/emailvalidate_form",// 修改邮箱
		"modemail_result" :"js/admin/customer/common/emailvalidate/modemail_result",// 修改邮箱结果
		"message_table" : "js/admin/customer/common/messageindex/message_table",// 所有消息
		/* 商家-普通用户公共-end- */
		"business_index":"js/front/index/business_index",
		/* 商家-start- */
		"console-business" : "js/admin/customer/business/console/console-business",				// 商家中心工作台
		
		
		
		/* 普通用户-start- */
		"console-personal" : "js/admin/customer/personal/console/console-personal",				// 普通用户工作台
		
		"biz_personal_userinfo_form":"js/admin/customer/personal/baseinfo/biz_personal_userinfo_form",  //用户个人扩展信息
		"biz_personal_securityinfo_form":"js/admin/customer/personal/baseinfo/biz_personal_securityinfo_form",//用户安全设置
		"biz_personal_modpw_form":"js/admin/customer/personal/baseinfo/biz_personal_modpw_form",//用户密码修改
		/* 普通用户-end- */
		
		/* 系统前台-start- */
		"frontindex" :"js/front/indexpage/frontindex.js",  // 前台首页
		"fixed-header-unlogin" : "js/front/header/src/js/fixed-header-unlogin", // 前台首页顶部，没登陆
		
		"center-header" : "js/front/header/src/js/center-header",			// 首页顶部中间搜索框
		"navicat-header" : "js/front/header/src/js/navicat-header",			// 前台首页横向导航栏
		
		"slidenav-menu" : "js/front/indexpage/slidenav/slidenav-menu", // 首页左侧滑动门菜单
		"picturecarousel":"js/front/indexpage/picturecarousel/picturecarousel",// 首页图片轮播
		
		"footer" : "js/front/footer/src/js/footer",			// 底部组件
		
		"businessinfoindex" : "js/admin/customer/common/businessinfoindex/index/src/js/index-businessinfo",	// 商家和普通用户的业务处理首页
		"fixed-header-login" :"js/admin/customer/common/header/src/js/fixed-header-login", // 登陆的商家和用户的顶部组件
		"newsindex":"js/front/news/newsindex",
		"baseinfoindex" : "js/admin/customer/common/baseinfoindex/index/src/js/index-baseinfo",              // 商家和普通用户的基本信息首页
		"messageindex" : "js/admin/customer/common/messageindex/index/src/js/index-message",              // 商家和普通用户的消息中心首页
		/* 系统前台-end- */
		
		// bootstrap 核心js
		'bootstrap_commonrequire' : 'js/tool/bootstrap/bootstrap_commonrequire',
		'bootstrap' : 'js/tool/bootstrap/bootstrapcmd',
		'bootstrap_nav' : 'js/tool/bootstrap/navcmd',
		'bootstrap_theme':'js/tool/bootstrap/themecmd',
		
		//  bootstrap插件js
		'bootstrap-daterangepicker' : 'js/tool/bootstrap_daterangepicker/bootstrap-daterangepickercmd',
		'bootstrap-daterangepickercmd.zh-CN' : 'js/tool/bootstrap_daterangepicker/locales/bootstrap-daterangepickercmd.zh-CN',
		'bootstrap_datetimepicker':'js/tool/bootstrap_datetimepicker/bootstrap-datetimepickercmd',
		'bootstrap_datetimepicker.zh-CN':'js/tool/bootstrap_datetimepicker/locales/bootstrap-datetimepickercmd.zh-CN',
		'bootstrap_maxlength':'js/tool/bootstrap_maxlength/bootstrap-maxlengthcmd.min',
		
		// tool组件js
		'bootbox' : 'js/tool/bootbox/bootboxcmd',
		'layout' : 'js/tool/layout/src/js/layout',
		'store' : 'js/tool/store/storecmd',
		'json' : 'js/tool/store/jsoncmd',
		'jsuri' : 'js/tool/jsuri/Uricmd',
		'moment' : 'js/tool/moment/momentcmd',
		"draganddrop":"js/tool/draganddrop/src/js/draganddrop",//新的拖拽接口
		'autosize':'js/tool/autosize/jquery.autosizecmd.min',
		'charCount':'js/tool/charCount/charCountcmd',
		'jquery.dataTables': 'js/tool/datatables/jquery.dataTablescmd.min',
		'jquery-ui': 'js/tool/jquery_ui/jquery-uicmd.min',
		"jquery.ui.sortable" : "js/tool/jquery.ui.sortable/src/js/jquery.ui.sortable",
		'jquery.validate': 'js/tool/validate/jquery.validatecmd',
		'jquery.dynatree' : 'js/tool/dynatree/jquery.dynatreecmd',
		'fuelux_wizard' : 'js/tool/fuelux/wizardcmd',
		'fuelux_wizard2' : 'js/tool/fuelux/wizard2cmd',
		'select2' : 'js/tool/select2/select2_3.4.6',
		"jquery.multiselect2side":"js/tool/jquery.multiselect2side/jquery.multiselect2side",
		'imagezoom':'js/tool/imagezoom/imagezoomcmd',
		'swfobject':'js/tool/swfobject/swfobjectcmd', // swf视频播放插件
		"jquery.ba-resize" : "js/tool/jquery.ba-resize/jquery.ba-resize",// 监听DOM元素大小变化
		"jquery.superslide.2.1.1" : "js/tool/jquery.superslide2.1.1/jquery.SuperSlide.2.1.1.source", // 滑动门组件
		
		// editor组件js-1.3.6
		'ueditor.config-1.3.6':'js/tool/ueditor-1.3.6/ueditor.config',
		'ueditor.all-1.3.6':'js/tool/ueditor-1.3.6/ueditor.all',
		'ueditor-zh-cn-1.3.6':'js/tool/ueditor-1.3.6/lang/zh-cn/zh-cn',
		
		// 自定义ss
		'customer.css' :'css/tool/customer/customer.css',
		
		// bootstrap css
		'bootstrap.css' : 'css/tool/bootstrap/bootstrap.css',
		'bootstrap-responsive.css' : 'css/tool/bootstrap/bootstrap-responsive.css',
		'light-theme.css' : 'css/tool/bootstrap/light-theme.css',
		'dark-theme.css' : 'css/tool/bootstrap/dark-theme.css',
		'dark-blue-theme.css' : 'css/tool/bootstrap/dark-blue-theme.css',
		'theme-colors.css': 'css/tool/bootstrap/theme-colors.css',
		
		// 插件css
		'wizard.css' : 'css/tool/fuelux/wizard.css',
		'fuelux.min.css' : 'css/tool/fuelux/fuelux.min.css',
		'bootstrap-datetimepicker.min.css' : 'css/tool/bootstrap_datetimepicker/bootstrap-datetimepicker.min.css',
		'bootstrap-dynatree.css' : 'css/tool/dynatree/ui.dynatree.css',
		'select2.css' : 'css/tool/select2/select2_3.4.6.css',
		'daterangepicker.css' : 'css/tool/bootstrap_daterangepicker/daterangepicker-bs2.css',
		'bootbox.css' : 'css/tool/bootbox/bootbox.css',
		'bootstrap-editable.css' : 'css/tool/xeditable/bootstrap-editable.css',
		'jquery.multiselect2side.css':'css/tool/select2/jquery.multiselect2side.css',
	},
	
	// 移除shim插件 seajs2.1.0推荐
	plugins : [ 'text' ],
	debug : true,
	
	charset : 'utf-8',
	editable : true
});
// url配置
seajs.use("urlconfig");

seajs.use("globalutil");

seajs.use(["$","bootstrap_nav"], function($,Bootstrap_nav){
	// 解决IE下ajax请求使用缓存问题
    jQuery.ajaxSetup({ cache: false });
    
    jQuery.ajaxSetup({
    	// 因为如果退出登录，在网页后退，在点击，界面会弹出，不会跳到登录界面
        complete:function(XMLHttpRequest, textStatus, errorThrown){
              if(textStatus=="parsererror"){
                  window.location.href = GLOBAL.URL.LOGINURL;
              } else if(textStatus=="error"){
            	  
            	if(XMLHttpRequest.status == 404){
              		Bootstrap_nav.toPageView(GLOBAL.URL.ERROR_404);
              	} else if(XMLHttpRequest.status == 500){
              		Bootstrap_nav.toPageView(GLOBAL.URL.ERROR_500);
              	} else if(XMLHttpRequest.status == 503){
              		Bootstrap_nav.toPageView(GLOBAL.URL.ERROR_503);
              	} 
              }
        }
    });
});