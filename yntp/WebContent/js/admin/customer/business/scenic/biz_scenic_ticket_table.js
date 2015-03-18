/**
 * 景点门票列表界面
 * 
 * @author liuchchc
 * @date 2015-1-14 11:11:28
 * 
 */
define(function(require, exports, module) {

	var $ = require("$");
	require("bootstrap_commonrequire");
	var bootbox = require('bootbox');
	var store = require('store');
	var basearchiveUtil = require('basearchive-util');
	var table = require('basearchive-table');
	
	var FORMOPTURL_DELETE = GLOBAL.BASE + "admin/scenic/scenicticket/delete/";
	
	var TARGETDIV_TABLE = "basearchive_table";
	
	var COMPONENTID_TABLE = "pagedatatable";
	var formUrl = GLOBAL.HTML_HOME + "admin/customer/business/scenic/biz_scenic_ticket_form.html";
	var scenicTableUrl = GLOBAL.HTML_HOME + "admin/customer/business/scenic/biz_scenic_table.html";
	var MODULENAME = "scenicticket";
	
	var param = {
		// Table信息
		table_attr : {
			tableid : COMPONENTID_TABLE,
			targetdiv : TARGETDIV_TABLE,
			bServerSide:true,
			aocolumnDefs : [
			{
				"aTargets" : [ 0 ],
				"sTitle" : "门票id",
				"mData" : "id",
				"bVisible" : false,
			},
			{
				"aTargets" : [ 1 ],
				"sTitle" : "门票名称",
				"mData" : "name",
			}, 
			{
				"aTargets" : [ 2 ],
				"sTitle" : "操作",
				"bSortable" : false,
				"mData" : null,
				"mRender" : function(data, type, full) {
					return '<a href="#" class="btn contrast icon-edit table_btn_modify" title="修改" >修改</a>' 
					+ '<a href="#" class="btn contrast icon-trash table_btn_delete" title="删除" style="margin-left:10px;">删除</a>';
				}
			}]
		}
	};

	exports.init = function(){
		$(document).ready(function() {
			var scenicInfo = store.get("currentSelectRowDatascenic"); 
			var TABLEOPTURL_QUERY = GLOBAL.BASE + "admin/scenic/scenicticket/pagesearch/"+scenicInfo.id+"/ticketlist";
				
			param.table_attr.requesturl = TABLEOPTURL_QUERY;
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
			
			$("#scenicLink").die().on('click', function() {
				basearchiveUtil.jumpToHtml(scenicTableUrl);
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
			
			// Table删除方法
			$('.table_btn_delete').die().live('click',function(e) {
				var that = this;
				bootbox.confirm('确认删除？',function(YesOrNo){
					if(YesOrNo){
						var datatable = $('#'+param.table_attr.tableid);
						var rowNode = that.parentNode.parentNode;
						var rowData = datatable.dataTable().fnGetData(rowNode);

						var vid = rowData.id;
						$.ajax({
							async:false,
							type : "DELETE",
							dataType : 'json',
							contentType : "application/json;charset=UTF-8",
							url : FORMOPTURL_DELETE + "/" + vid,
							success : function(resultdata) {
								if('000000' != resultdata.flag){
									bootbox.alertTimeout('删除失败，请重试，错误原因：' +resultdata.desc );
								} else {
									// 显示成功提交
									bootbox.alertTimeout('删除成功！');
									// 刷新table
									table.reloadTable(param);
								}
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