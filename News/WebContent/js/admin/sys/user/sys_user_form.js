/**
 * 线路分类-form
 */
define(function(require, exports, module) {

	var $ = require("$");
	require("bootstrap_commonrequire");
	require("bootbox.css");

	var bootbox = require('bootbox');
	var theme = require('bootstrap_theme');
	var store = require('store');
	var loader = require('loader');
	
	var basearchiveUtil = require('basearchive-util');
	
	var FORMOPTURL_SEARCH= GLOBAL.BASE + "/admin/sys/user/admin/search";
	var MODULENAME = "user";
	
	var formUrl = GLOBAL.HTML_HOME + "admin/sys/user/sys_user_table.html";
	var DocDetail = require("form_display");
	
	// 初始化Form数据，新建和编辑时
	function initFormValue(data){
		// 重新从数据库中读取数据
		var queryUrl = GLOBAL.BASE +  "/admin/sys/user/admin/search?q=id=" + data.id;
		var lastdata = null;
		$.ajax({
			async : false,
			type : "GET",
			dataType : 'json',
			contentType : "application/json;charset=UTF-8",
			url : queryUrl,
			success : function(resultdata) {
				if('000000' != resultdata.flag){
					bootbox.alertTimeout('查询数据出现错误，请刷新重试！');
					lastdata = null; 	// 查询出错
				} else {
					var receiptList = resultdata.data;
					if(receiptList != null && receiptList.length > 0){
						lastdata = receiptList[0];
					} else{
						bootbox.alertTimeout('查询数据出现错误，请刷新重试！');
						lastdata = null; // 没有此条数据						
					}
				}
			},
			error : function(resultdata) {
				bootbox.alertTimeout('查询数据出现错误，请重试！');
			}
		});
		
		if(null == lastdata){
			// 清除本地store的数据
			var cacheKeyList = ["currentSelectRowData" + MODULENAME,"currentOptType" + MODULENAME];
			basearchiveUtil.clearStoreCache(cacheKeyList);
			
			basearchiveUtil.jumpToHtml(tableUrl);
		}
		
		var statusName = "";
		if (lastdata.userstatus==0) 
			{
			statusName ="封禁";
		    }
		else if (lastdata.userstatus==1) 
			{
			statusName ="正常";
			}
		var docDetailParam = {
				spansize : 'span12',
				items : [{
					textid : "username",
					label : "用户账号",
					value : lastdata.username
				},
				
				{
					textid : "email",
					label : "用户邮箱",
					value : lastdata.email
				},
				{
					textid : "mobile_phone_number",
					label : "用户手机号码",
					value : lastdata.mobile_phone_number
				},
				{
					textid : "userstatus",
					label : "用户状态",
					value : statusName
				},
				
				]
		};
		
		new DocDetail({attrs : docDetailParam, renderTo : "basearchive_form"});
		
	}
	
	exports.init = function(){
		$(document).ready(function() {
			// 当前操作                                    
			var storeRowData = store.get("currentSelectRowData" + MODULENAME);
			
			initFormValue(storeRowData);
			$('#form_btn_return').die().live('click', function() {
				
				basearchiveUtil.jumpToHtml(formUrl);
			});
			
		});
	};
});