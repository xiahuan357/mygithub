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
	
	var FORMOPTURL_UPDATE = GLOBAL.BASE + "admin/business/business/updatestatus";
	var TABLEOPTURL_QUERY = GLOBAL.BASE + "admin/business/business/pagesearch";
	
	var TARGETDIV_TABLE = "basearchive_table";
	
	var COMPONENTID_TABLE = "pagedatatable";
	var formUrl = GLOBAL.HTML_HOME + "admin/sys/business/sys_business_info.html";
	var MODULENAME = "business";
	
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
				"sTitle" : "商户id",
				"mData" : "id",
				"bVisible" : false,
			},
			{
				"aTargets" : [ 1 ],
				"sTitle" : "商户名称",
				"mData" : "userEntity.username",
				"mRender" : function(data, type, full)
				{
				return	'<input class="btn btn-link approve_btn_info"  style="margin-bottom:5px" type="button" value='+data +'>';
				}
			},
			{
				"aTargets" : [ 2 ],
				"sTitle" : "商户地址",
				"mData" : "address",
				"mRender" : function(data, type, full)
				{
					return data;
				}
			},
			{
				"aTargets" : [ 3 ],
				"sTitle" : "审核状态",
				"mData" : "approve_status",
				"mRender" : function(data, type, full)
				{   var statusname;
					if(data == 0){
						return '<span class="label label-warning">未审批</span>'
					}
					else if(data == 1){
						return '<span class="label label-success">审批通过</span>'
					}
					
					else if(data == 2){
						return '<span class="label label-important">审批未通过</span>'
					}
				}
			},
			{
				"aTargets" : [ 4 ],
				"sTitle" : "操作",
				"bSortable" : false,
				"mData" : null,
				"mRender" : function(data, type, full) {
					return '<input class="btn btn-link approve_btn_yes"  type="button" value="允许通过" style="margin-bottom:5px">'
					+ '<input class="btn btn-link approve_btn_no"  type="button" value="拒绝通过" style="margin-bottom:5px">'
					+ '<a href="#" class="btn contrast icon-laptop business_btn_info" title="详细信息" style="margin-left:10px;margin-right:100px">详细信息</a>';
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
			$('.approve_btn_info').die().live('click', function() {
				var datatable = $('#'+param.table_attr.tableid);
				var rowNode = this.parentNode.parentNode;
				var rowData = datatable.dataTable().fnGetData(rowNode);
				store.set("currentSelectRowData" + MODULENAME, rowData);
				basearchiveUtil.jumpToHtml(formUrl);
			});
			$('.business_btn_info').die().live('click', function() {
				var datatable = $('#'+param.table_attr.tableid);

				var rowNode = this.parentNode.parentNode;
				var rowData = datatable.dataTable().fnGetData(rowNode);
				
				store.set("currentSelectRowData" + MODULENAME, rowData);
				basearchiveUtil.jumpToHtml(formUrl);
			});
			// 审核允许更新
		    $('.approve_btn_yes').die().live('click',function(e) {
		    	var that = this;
				bootbox.confirm('确认允许？',function(YesOrNo){
					if(YesOrNo){
						var datatable = $('#'+param.table_attr.tableid);
						var rowNode = that.parentNode.parentNode;
						var rowData = datatable.dataTable().fnGetData(rowNode);

						var vid = rowData.id;
						var vapprove_status = rowData.approve_status;
						var data = {
							id:vid,
							approve_status : 1,
						};
						$.ajax({
							async:false,
							type : "POST",
							url : FORMOPTURL_UPDATE ,
							data : data, 
							success : function(resultdata) {
								if('000000' != resultdata.flag){
									bootbox.alertTimeout('操作失败，请重试，错误原因：' +resultdata.desc );
								} else {
									// 显示成功提交
									bootbox.alertTimeout('操作成功！');
									// 刷新table
									table.reloadTable(param);
								}
							},
							error : function(XMLHttpRequest, textStatus, errorThrown) {
								bootbox.alertTimeout('操作失败，请重试！');
							}
						});
					}
				});
		    });
			// 审核拒绝更新
		    $('.approve_btn_no').die().live('click',function(e) {
		    	var that = this;
				bootbox.confirm('确认拒绝？',function(YesOrNo){
					if(YesOrNo){
						var datatable = $('#'+param.table_attr.tableid);
						var rowNode = that.parentNode.parentNode;
						var rowData = datatable.dataTable().fnGetData(rowNode);
						var userId=rowData.userEntity.id;
						var vid = rowData.id;
						var vapprove_status = rowData.approve_status;
						var data = {
							id:vid,
							approve_status : 2,
						};
						$.ajax({
							async:false,
							type : "POST",
							url : FORMOPTURL_UPDATE,
							data : data, 
							success : function(resultdata) {
								if('000000' != resultdata.flag){
									bootbox.alertTimeout('操作失败，请重试，错误原因：' +resultdata.desc );
								} else {
									// 显示成功提交
									bootbox.alertTimeout('操作成功！');
									// 刷新table
									table.reloadTable(param);
									MessagePush.sendMessageAuto(userId,"哈哈哈");
								}
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