/**
 * 路线类型列表界面
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
	
	var FORMOPTURL_DELETE = GLOBAL.BASE + "admin/region/region/delete";
	var TABLEOPTURL_QUERY;
	
	var TARGETDIV_TABLE = "basearchive_table";
	
	var COMPONENTID_TABLE = "pagedatatable";
	var formUrl = GLOBAL.HTML_HOME + "admin/sys/region/sys_region_form_thr.html";
	var MODULENAME = "region";
	var tableUrl = GLOBAL.HTML_HOME + "admin/sys/region/sys_region_sec.html";
	
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
				"sTitle" : "城市id",
				"mData" : "id",
				"bVisible" : false,
			},
			{
				"aTargets" : [ 1 ],
				"sTitle" : "城市名称",
				"mData" : "name",
				"mRender" : function(data, type, full)
				{
					return data;
				}
			},
			{
				"aTargets" : [ 2 ],
				"sTitle" : "上一级",
				"bSortable" : false,
				"mData" : null,
				"mRender" : function(data, type, full) {
					return '<input class="btn btn-link third_btn_prev" type="button" value="上一级" style="margin-bottom:5px">';
				}
			},
			{
				"aTargets" : [ 3 ],
				"sTitle" : "操作",
				"bSortable" : false,
				"mData" : null,
				"mRender" : function(data, type, full) {
					return '<a href="#" class="btn contrast icon-edit table_btn_modify" title="修改" >修改</a>'
					+ '<a href="#" class="btn contrast icon-trash table_btn_delete" title="删除" style="margin-left:10px;margin-right:100px">删除</a>';
				}
			}
			]
		}
	};

	exports.init = function(){
		$(document).ready(function() {
			var selectId_two = store.get('region_two');
			param.table_attr.requesturl = GLOBAL.BASE + "admin/region/region/pagesearch?q=parent_id=" +selectId_two;
			// 初始化table
			table.init(param);
            

			
			$('#form_btn_create').die().live('click', function() {
				store.set("currentOptType" + MODULENAME, basearchiveUtil.FORMOPT_CREATE);
				basearchiveUtil.jumpToHtml(formUrl);
			});
			
			//Table页面跳转到上一级
			$('.third_btn_prev').die().live('click',function(e){
			
				basearchiveUtil.jumpToHtml(tableUrl);
			});
            $('#form_btn_previous').die().live('click',function(e){
				
				basearchiveUtil.jumpToHtml(tableUrl);
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