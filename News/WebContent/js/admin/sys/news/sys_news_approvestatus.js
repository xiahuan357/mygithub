/**
 * 商家审核状态列表
 */
define(function(require, exports, module) {

	var $ = require("$");
	require("bootstrap_commonrequire");
	var bootbox = require('bootbox');
	var store = require('store');
	
	var basearchiveUtil = require('basearchive-util');
	var table = require('basearchive-table');
	var TARGETDIV_TABLE = "basearchive_table";
	var COMPONENTID_TABLE = "pagedatatable";
	var infoUrl = GLOBAL.HTML_HOME + "admin/sys/news/sys_news_preview.html";
	var formUrl =GLOBAL.HTML_HOME + "admin/sys/news/sys_news_form.html";
	var indexUrl =GLOBAL.HTML_HOME + "admin/customer/common/baseinfoindex.html";
	var MODULENAME = "news";
	
	var param = {
		// Table信息
		table_attr : {
			tableid : COMPONENTID_TABLE,
			targetdiv : TARGETDIV_TABLE,
			bServerSide:true,
			aocolumnDefs : [
			{
				"aTargets" : [ 0 ],
				"sTitle" : "新闻id",
				"mData" : "id",
				"bVisible" : false,
			},
			{
				"aTargets" : [ 1 ],
				"sTitle" : "新闻标题",
				"mData" : "title",
				"mRender" : function(data, type, full)
				{
				return	'<input class="btn btn-link approve_btn_info"  style="margin-bottom:5px" type="button" value='+data +'>';
				}
			},
			{
				"aTargets" : [ 2 ],
				"sTitle" : "新闻类型",
				"mData" : "type",
				"mRender" : function(data, type, full)
				{
					return data;
				}
			},
			{
				"aTargets" : [ 3 ],
				"sTitle" : "审核状态",
				"mData" : "status",
				"mRender" : function(data, type, full)
				{   
					if(data == "待定"){
						return '<span class="label label-warning">待定</span>'
					}
					else if(data == "通过"){
						return '<span class="label label-success">审批通过</span>'
					}
					
					else if(data == "未通过"){
						return '<span class="label label-important">审批未通过</span>'
					}
				}
			},
			{
				"aTargets" : [ 4 ],
				"sTitle" : "操作",
				"bSortable" : false,
				"mData" : "status",
				"mRender" : function(data, type, full) {
					if(data == "待定"){
						return 	'<a href="#" class="btn contrast icon-edit table_btn_modify" title="修改" style="margin-left:10px;margin-right:100px">修改</a>';
						}
						if(data=="通过")
							{
							return 	'<a href="#" class="btn contrast icon-laptop table_btn_info" title="预览" style="margin-left:10px;margin-right:100px">详细信息</a>';
							}
						if(data == "未通过"){
							return 	'<a href="#" class="btn contrast icon-edit table_btn_modify" title="修改" style="margin-left:10px;margin-right:100px">修改</a>';
							}
					}
			}]
		}
	};

	exports.init = function(){
		$(document).ready(function() {
			var userinfo =store.get("userinfo");
			var TABLEOPTURL_QUERY = "querynewsstatus.action?username="+userinfo.username;
			param.table_attr.requesturl = TABLEOPTURL_QUERY;
			// 初始化table
			table.init(param);
			// 清除本地store数据
			{
				var cacheKeyList = ["currentSelectRowData" + MODULENAME,"currentOptType" + MODULENAME];
				basearchiveUtil.clearStoreCache(cacheKeyList);
			}
			$('.table_btn_modify').die().live('click', function() {
				var datatable = $('#'+param.table_attr.tableid);

				var rowNode = this.parentNode.parentNode;
				var rowData = datatable.dataTable().fnGetData(rowNode);
				store.set("currentOptType" + MODULENAME, basearchiveUtil.FORMOPT_UPDATE);
				store.set("currentSelectRowData" + MODULENAME, rowData);
				basearchiveUtil.jumpToHtml(formUrl);
			});
			$('.table_btn_info').die().live('click', function() {
				var datatable = $('#'+param.table_attr.tableid);

				var rowNode = this.parentNode.parentNode;
				var rowData = datatable.dataTable().fnGetData(rowNode);
				store.set("currentSelectRowData" + MODULENAME, rowData);
				var currentUrl=GLOBAL.HTML_HOME+"admin/sys/news/sys_news_approvestatus.html";
				store.set("currentUrl",currentUrl);
				basearchiveUtil.jumpToHtml(infoUrl);
			});
            $('#form_btn_return').die().live('click', function() {
				
				basearchiveUtil.jumpToHtml(indexUrl);
			});
			
		});
	};
});