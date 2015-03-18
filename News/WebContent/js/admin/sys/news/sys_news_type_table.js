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
	
	var FORMOPTURL_DELETE = "deletenewstype.action";
	var TABLEOPTURL_QUERY = "querynewstype.action";
	
	
	var TARGETDIV_TABLE = "basearchive_table";
	
	var COMPONENTID_TABLE = "pagedatatable";
	var formUrl = GLOBAL.HTML_HOME + "admin/sys/news/sys_news_type_form.html";
	var infoUrl =GLOBAL.HTML_HOME + "admin/sys/news/sys_news_table.html";
	var approveUrl =GLOBAL.HTML_HOME + "admin/sys/news/sys_news_approve_chief.html";
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
					return '<a href="#" class="btn contrast icon-laptop table_btn_info" title="查看该类型新闻" >查看</a>'
					+  '<a href="#" class="btn contrast icon-edit table_btn_modify" title="修改该新闻类型" style="margin-left:10px">修改</a>'
					+ '<a href="#" class="btn contrast icon-trash table_btn_delete" title="删除该新闻类型" style="margin-left:10px">删除</a>'
					+ '<a href="#" class="btn contrast icon-laptop table_btn_approve" title="审核该类型新闻" style="margin-left:10px;margin-right:100px">审核</a>';
					
					
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

			
			$('.table_btn_info').die().live('click',function(e) {
				// 查看该类型的新闻
				var datatable = $('#'+param.table_attr.tableid);
				var rowNode = this.parentNode.parentNode;
				var rowData = datatable.dataTable().fnGetData(rowNode);

				store.set("typename",rowData.name);
				basearchiveUtil.jumpToHtml(infoUrl);
			});
			$('.table_btn_approve').die().live('click',function(e) {
				// 审核该类型
				var datatable = $('#'+param.table_attr.tableid);
				var rowNode = this.parentNode.parentNode;
				var rowData = datatable.dataTable().fnGetData(rowNode);
				store.set("typename",rowData.name);
				store.set("typeid",rowData.id);
				basearchiveUtil.jumpToHtml(approveUrl);
			});

			// Table删除方法
			$('.table_btn_delete').die().live('click',function(e) {
				var that = this;
				bootbox.confirm('确认删除？',function(YesOrNo){
					if(YesOrNo){
						var datatable = $('#'+param.table_attr.tableid);
						var rowNode = that.parentNode.parentNode;
						var rowData = datatable.dataTable().fnGetData(rowNode);
                        var vname=rowData.name;
						var vid = rowData.id;
						$.ajax({
							async:false,
							type : "POST",
							dataType : 'json',
							url : FORMOPTURL_DELETE,
							data : {type:vname}, 
							success : function(resultdata) {
								//2015.2.21 22：41
								//停留在删除 type下
								//ret 的code 要不要加上
								if('000000' != resultdata.ret.flag){
									bootbox.alertTimeout('删除失败，请重试，错误原因：' +resultdata.ret.desc );
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