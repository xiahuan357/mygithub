/**
 * 商家审核状态form
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
	
	var FORMOPTURL_SEARCH= GLOBAL.BASE + "/admin/business/business/search";
	var MODULENAME = "business";
	
	var tableUrl = GLOBAL.HTML_HOME +"admin/customer/business/baseinfo/biz_business_approvestatus.html";
	var DocDetail = require("form_display");
	
	// 初始化Form数据，新建和编辑时
	function initFormValue(data){
		// 重新从数据库中读取数据
		var queryUrl = GLOBAL.BASE +  "/admin/business/business/search?q=id=" + data.id;
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
		var statuscolor="";
		if (lastdata.approve_status==0) 
			{
			statusName ="未审核";
		    statuscolor="color:yellow";
		    }
		else if (lastdata.approve_status==1) 
			{
			statusName ="审核通过";
		    statuscolor="color:green";
			}
		else if (lastdata.approve_status==2) 
		{
			statusName ="审核未通过";
			statuscolor="color:red";
		}
		
		var docDetailParam = {
				spansize : 'span12',
				items : [{
					textid : "text_name",
					label : "商户名称",
					value : lastdata.userEntity.username
				},
				{
					textid : "text_address",
					label : "商户地址",
					value : lastdata.address
				},
				{
					textid : "text_status",
					label : "审批状态",
					value : statusName
				},
				{
					textid : "text_licensecode",
					label : "营业执照号码",
					value : lastdata.license_code
				},
				{
					ispicture : true,
					id : "license_picture",
					label : "营业执照片",
					height : "260px",
					width : "260px",
					src : lastdata.license_picture == null ? GLOBAL.IMG.DEFAULTIMG_BIG : lastdata.license_picture
				},
				{
					textid : "text_organizationcode",
					label : "组织机构号码",
					value : lastdata.organization_code
				},
				{
					ispicture : true,
					id : "organization_picture",
					label : "组织机构照片",
					height : "260px",
					width : "260px",
					src : lastdata.organization_picture == null ? GLOBAL.IMG.DEFAULTIMG_BIG : lastdata.organization_picture
				},
				{
					textid : "text_legalpersoncode",
					label : "法人身份证号码",
					value : lastdata.legalperson_code
				},
				{
					ispicture : true,
					id : "legalperson_picture",
					label : "法人身份证照片",
					height : "260px",
					width : "260px",
					src : lastdata.legalperson_picture == null ? GLOBAL.IMG.DEFAULTIMG_BIG : lastdata.legalperson_picture
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
				
				basearchiveUtil.jumpToHtml(tableUrl);
			});
		});
	};
});