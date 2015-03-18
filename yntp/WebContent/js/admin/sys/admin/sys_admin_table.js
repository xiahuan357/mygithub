/**
 * 管理员编辑界面
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
	
	var FORMOPTURL_DELETE = GLOBAL.BASE + "admin/sys/user/user/delete";
	var TABLEOPTURL_QUERY = GLOBAL.BASE + "admin/sys/user/user/pagesearch/userlist?q=usertype=0";
	
	var TARGETDIV_TABLE = "basearchive_table";
	
	var COMPONENTID_TABLE = "pagedatatable";
	var formUrl = GLOBAL.HTML_HOME + "admin/sys/admin/sys_admin_form.html";
	var passwordformUrl = GLOBAL.HTML_HOME + "admin/sys/admin/sys_admin_modifypassword.html";
	var MODULENAME = "admin";
	
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
				"sTitle" : "管理员id",
				"mData" : "id",
				"bVisible" : false,
			},
			{
				"aTargets" : [ 1 ],
				"sTitle" : "管理员帐号",
				"mData" : "username",
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
					return '<a href="#" class="btn contrast icon-edit table_btn_modify" title="修改信息" >修改信息</a>'
					+ '<a href="#" class="btn contrast icon-lock table_btn_modifypassword" title="修改密码" style="margin-left:10px;">修改密码</a>'
					+ '<a href="#" class="btn contrast icon-trash table_btn_delete" title="删除" style="margin-left:10px;">删除</a>';
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
			
			$('#form_btn_create').die().live('click', function() {
				store.set("currentOptType" + MODULENAME, basearchiveUtil.FORMOPT_CREATE);
				basearchiveUtil.jumpToHtml(formUrl);
			});
			
			// Table添加修改方法
			$('.table_btn_modify').die().live('click',function(e) {
				// 修改form的type
				var datatable = $('#'+param.table_attr.tableid);

				var rowNode = this.parentNode.parentNode;
				var rowData = datatable.dataTable().fnGetData(rowNode);

				store.set("currentOptType" + MODULENAME, basearchiveUtil.FORMOPT_UPDATE);
				store.set("currentSelectRowData" + MODULENAME, rowData);
				basearchiveUtil.jumpToHtml(formUrl);
			});
			
			// Table添加修改密码方法
			$('.table_btn_modifypassword').die().live('click',function(e) {
				// 修改form的type
				var datatable = $('#'+param.table_attr.tableid);
				
				var rowNode = this.parentNode.parentNode;
				var rowData = datatable.dataTable().fnGetData(rowNode);
				
				store.set("currentOptType" + MODULENAME, basearchiveUtil.FORMOPT_UPDATE);
				store.set("currentSelectRowData" + MODULENAME, rowData);
				basearchiveUtil.jumpToHtml(passwordformUrl);
			});

			// Table删除方法
			$('.table_btn_delete').die().live('click',function(e) {
				var that = this;
				bootbox.confirm('确认删除？',function(YesOrNo){
					if(YesOrNo){
						var datatable = $('#'+param.table_attr.tableid);
						var rowNode = that.parentNode.parentNode;
						var rowData = datatable.dataTable().fnGetData(rowNode);

						var vid = rowData.id;
						var vimagekey = rowData.imagekey;
						var data = {
							id:vid,
							imagekey : vimagekey,
						};
						$.ajax({
							async:false,
							type : "DELETE",
							dataType : 'json',
							contentType : "application/json;charset=UTF-8",
							url : FORMOPTURL_DELETE + "/" + vid,
							data : JSON.stringify(data), 
							success : function(resultData) {
								// 显示成功提交
								bootbox.alertTimeout('删除成功！');
								// 刷新table
								table.reloadTable(param);
							},

							error : function(XMLHttpRequest, textStatus, errorThrown) {
								bootbox.alertTimeout('删除失败，请重试！');
							}
						});
					}
				});
			});
		});
	};
});