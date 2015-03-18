/**
 * 
 */
define(function(require, exports, module) {

	var $ = require("$");
	require("bootstrap_commonrequire");
	var bootbox = require('bootbox');
	var store = require('store');
	
	var basearchiveUtil = require('basearchive-util');
	var table = require('basearchive-table');
	
	var TABLEOPTURL_QUERY = "queryuser.action";
	
	var TARGETDIV_TABLE = "basearchive_table";
	
	var COMPONENTID_TABLE = "pagedatatable";
	var form1Url = GLOBAL.HTML_HOME + "admin/sys/usermod/sys_user_mod_position.html";
	var form2Url = GLOBAL.HTML_HOME + "admin/sys/usermod/sys_user_mod_department.html";
	var MODULENAME = "usermod";
	
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
				"sTitle" : "用户id",
				"mData" : "id",
				"bVisible" : false,
			},
			{
				"aTargets" : [ 1 ],
				"sTitle" : "用户名称",
				"mData" : "username",
				"mRender" : function(data, type, full)
				{
				return	data ;
				}
			},
			
			{
				"aTargets" : [ 2 ],
				"sTitle" : "用户类型",
				"mData" : "usertype",
				"mRender" : function(data, type, full)
				{  if(data==1)
					{
					return "记者";
					}
				   if(data==2)
				   {
			     	return "编辑";
				   }
				}},
			{
				"aTargets" : [ 3 ],
				"sTitle" : "所属部门",
				"mData" : "department",
				"mRender" : function(data, type, full)
				{  
					return data;
					}
			},
			
			{
				"aTargets" : [ 4 ],
				"sTitle" : "操作",
				"bSortable" : false,
				"mData" : "usertype",
				"mRender" : function(data, type, full) {
					return   '<input class="btn btn-link user_btn_position"  type="button" value="职位变更" style="margin-bottom:5px">'
					+ '<input class="btn btn-link user_btn_department"  type="button" value="部门变更" style="margin-bottom:5px">';
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
			
//			$('.user_btn_info').die().live('click', function() {
//				var datatable = $('#'+param.table_attr.tableid);
//
//				var rowNode = this.parentNode.parentNode;
//				var rowData = datatable.dataTable().fnGetData(rowNode);
//				store.set("currentSelectRowData" + MODULENAME, rowData);
//				basearchiveUtil.jumpToHtml(formUrl);
//			});
		    $('.user_btn_position').die().live('click',function(e) {
				var datatable = $('#'+param.table_attr.tableid);
		    	var rowNode = this.parentNode.parentNode;
		    	var rowData = datatable.dataTable().fnGetData(rowNode);
		    	store.set("currentSelectRowData" + MODULENAME, rowData);
		    	basearchiveUtil.jumpToHtml(form1Url);
		    });
		    $('.user_btn_department').die().live('click',function(e) {
		    	var datatable = $('#'+param.table_attr.tableid);
		    	var rowNode = this.parentNode.parentNode;
		    	var rowData = datatable.dataTable().fnGetData(rowNode);
		    	store.set("currentSelectRowData" + MODULENAME, rowData);
		    	basearchiveUtil.jumpToHtml(form2Url);
		    });
		});
	};
});