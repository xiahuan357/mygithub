/**
 * 新闻类型列表界面
 * 
 * @author liuchchc
 * @date 2014-11-22
 * 
 */
define(function(require, exports, module) {

	var $ = require("$");
	require("bootstrap_commonrequire");
	var bootbox = require('bootbox');
	var store = require('store');
	
	var basearchiveUtil = require('basearchive-util');
	var table = require('basearchive-table');
	
	var TABLEOPTURL_QUERY = "querynewstype.action";
	
	
	var TARGETDIV_TABLE = "basearchive_table";
	
	var COMPONENTID_TABLE = "pagedatatable";
	var formUrl =GLOBAL.HTML_HOME + "admin/sys/news/sys_news_publish_form.html";
	var MODULENAME = "news_type";
	
	var param = {
		// Table信息
		table_attr : {
			tableid : COMPONENTID_TABLE,
			targetdiv : TARGETDIV_TABLE,
			requesturl : TABLEOPTURL_QUERY,
			bServerSide:true,
			aocolumnDefs : [
			{
				"aTargets" : [ 0 ],
				"sTitle" : "新闻类型id",
				"mData" : "id",
				"bVisible" : false,
				
			},
			{
				"aTargets" : [ 1 ],
				"sTitle" : "新闻类型名称",
				"mData" : "name",
				"mRender" : function(data, type, full)
				{
					return data;
				}
			},
			{
				"aTargets" : [ 2 ],
				"sTitle" : "操作",
				"bSortable" : false,
				"mData" : null,
				"mRender" : function(data, type, full) {
					return '<a href="#" class="btn contrast icon-laptop table_btn_info" title="发布该类型新闻" style="margin-left:10px;margin-right:100px">发布该类型新闻</a>';
					
				}
			}]
		}
	};

	exports.init = function(){
		$(document).ready(function() {
			// 初始化table
			table.init(param);

			// 清除本地store数据
			{
				var cacheKeyList = ["currentSelectRowData" + MODULENAME,"currentOptType" + MODULENAME];
				basearchiveUtil.clearStoreCache(cacheKeyList);
			}
			
			
			$('.table_btn_info').die().live('click',function(e) {
				// info详细信息
				var datatable = $('#'+param.table_attr.tableid);
				var rowNode = this.parentNode.parentNode;
				var rowData = datatable.dataTable().fnGetData(rowNode);

				store.set("typename",rowData.name);
				basearchiveUtil.jumpToHtml(formUrl);
			});

		});
	};
});