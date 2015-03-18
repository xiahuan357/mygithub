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
	
	var FORMOPTURL_UPDATE = GLOBAL.BASE + "admin/sys/user/user/updatestatus";
	var TABLEOPTURL_QUERY = GLOBAL.BASE + "admin/sys/user/user/pagesearch/userlist?q=usertype=2";
	
	var TARGETDIV_TABLE = "basearchive_table";
	
	var COMPONENTID_TABLE = "pagedatatable";
	var formUrl = GLOBAL.HTML_HOME + "admin/sys/user/sys_user_form.html";
	var MODULENAME = "user";
	
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
				"sTitle" : "用户账号",
				"mData" : "username",
				"mRender" : function(data, type, full)
				{
				return	'<input class="btn btn-link user_btn_info"  style="margin-bottom:5px" type="button" value='+data +'>';
				}
			},
			
			{
				"aTargets" : [ 2 ],
				"sTitle" : "用户状态",
				"mData" : "userstatus",
				"mRender" : function(data, type, full)
				{  
					 var statusname;
						if(data == 0){
							return '<span class="label label-warning">封禁</span>'
						}
						else if(data == 1){
							return '<span class="label label-success">正常</span>'
						}
						
					}
				
			},
			
			{
				"aTargets" : [ 3 ],
				"sTitle" : "操作",
				"bSortable" : false,
				"mData" : null,
				"mRender" : function(data, type, full) {
					return   '<input class="btn btn-link user_btn_yes"  type="button" value="封禁" style="margin-bottom:5px">'
					+ '<input class="btn btn-link user_btn_no"  type="button" value="取消封禁" style="margin-bottom:5px">'
					+ '<a href="#" class="btn contrast icon-laptop user_btn_info" title="详细信息" style="margin-left:10px;margin-right:100px">详细信息</a>';
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
			
			$('.user_btn_info').die().live('click', function() {
				var datatable = $('#'+param.table_attr.tableid);

				var rowNode = this.parentNode.parentNode;
				var rowData = datatable.dataTable().fnGetData(rowNode);
				
				store.set("currentSelectRowData" + MODULENAME, rowData);
				basearchiveUtil.jumpToHtml(formUrl);
			});
			// 封禁更新
		    $('.user_btn_yes').die().live('click',function(e) {
		    	var that = this;
				bootbox.confirm('确认封禁？',function(YesOrNo){
					if(YesOrNo){
						var datatable = $('#'+param.table_attr.tableid);
						var rowNode = that.parentNode.parentNode;
						var rowData = datatable.dataTable().fnGetData(rowNode);

						var vid = rowData.id;
						var vapprove_status = rowData.approve_status;
						var data = {
							id:vid,
							userstatus : 0,
						};
						$.ajax({
							async:false,
							type : "POST",
							url : FORMOPTURL_UPDATE ,
							data : data, 
							success : function(resultData) {
								// 显示成功提交
								bootbox.alertTimeout('操作成功！');
								// 刷新table
							table.reloadTable(param);
							},

							error : function(XMLHttpRequest, textStatus, errorThrown) {
								bootbox.alertTimeout('操作失败，请重试！');
							}
						});
					}
				});
		    });
			// 取消封禁更新
		    $('.user_btn_no').die().live('click',function(e) {
		    	var that = this;
				bootbox.confirm('确认取消封禁？',function(YesOrNo){
					if(YesOrNo){
						var datatable = $('#'+param.table_attr.tableid);
						var rowNode = that.parentNode.parentNode;
						var rowData = datatable.dataTable().fnGetData(rowNode);

						var vid = rowData.id;
						var vapprove_status = rowData.approve_status;
						var data = {
							id:vid,
							userstatus : 1,
						};
						$.ajax({
							async:false,
							type : "POST",
							url : FORMOPTURL_UPDATE,
							data : data, 
							success : function(resultData) {
								// 显示成功提交
								bootbox.alertTimeout('操作成功！');
								// 刷新table
							table.reloadTable(param);
							},

							error : function(XMLHttpRequest, textStatus, errorThrown) {
								bootbox.alertTimeout('操作失败，请重试！');
							}
						});
					}
				});
		    });
		});
	};
});