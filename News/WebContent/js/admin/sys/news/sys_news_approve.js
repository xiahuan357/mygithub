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
	var userinfo =store.get("userinfo");
	var FORMOPTURL_UPDATE="updatenewsstatus.action";
	var TABLEOPTURL_QUERY = "querynewstitle.action?type="+userinfo.department;
	var TARGETDIV_TABLE = "basearchive_table";
	var COMPONENTID_TABLE = "pagedatatable";
	var infoUrl = GLOBAL.HTML_HOME + "admin/sys/news/sys_news_preview.html";
	var formUrl =GLOBAL.HTML_HOME + "admin/sys/news/sys_news_form.html";
	var MODULENAME = "news";
	
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
				return	'<input class="btn btn-link table_btn_info"  style="margin-bottom:5px" type="button" value='+data +'>';
				}
			},
			
			{
				"aTargets" : [ 2 ],
				"sTitle" : "新闻作者",
				"mData" : "editor",
				"mRender" : function(data, type, full)
				{
					return data;
				}
			},
			{
				"aTargets" : [ 3 ],
				"sTitle" : "新闻类型",
				"mData" : "type",
				"bVisible" : false,
				"mRender" : function(data, type, full)
				{
					return data;
				}
			},
			{
				"aTargets" : [ 4 ],
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
				"aTargets" : [ 5 ],
				"sTitle" : "操作",
				"bSortable" : false,
				"mData" : null,
				"mRender" : function(data, type, full) {
					return '<a href="#" class="btn contrast icon-edit table_btn_yes" title="通过">通过</a>'
					+ '<a href="#" class="btn contrast icon-edit table_btn_no" title="拒绝" style="margin-left:10px">拒绝</a>'
					+ '<a href="#" class="btn contrast icon-laptop table_btn_info" title="预览" style="margin-left:10px;margin-right:100px">预览</a>';
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
			$('.table_btn_yes').die().live('click', function() {
				var that = this;
				bootbox.confirm('确认通过？',function(YesOrNo){
					if(YesOrNo){
						var datatable = $('#'+param.table_attr.tableid);
						var rowNode = that.parentNode.parentNode;
						var rowData = datatable.dataTable().fnGetData(rowNode);
						var vid = rowData.id;
						var vtype = rowData.type;
						var data = {
							id:vid,
							type:vtype,
							status:"通过",
						};
						$.ajax({
							async:false,
							type : "POST",
							url : FORMOPTURL_UPDATE ,
							data : data, 
							success : function(resultdata) {
								if('000000' != resultdata.ret.flag){
									bootbox.alertTimeout('操作失败，请重试，错误原因：' +resultdata.ret.desc );
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
			$('.table_btn_no').die().live('click', function() {
				var that = this;
				bootbox.confirm('确认拒绝？',function(YesOrNo){
					if(YesOrNo){
						var datatable = $('#'+param.table_attr.tableid);
						var rowNode = that.parentNode.parentNode;
						var rowData = datatable.dataTable().fnGetData(rowNode);
						var vid = rowData.id;
						var vtype = rowData.type;
						var data = {
							id:vid,
							type:vtype,
							status:"拒绝",
						};
						$.ajax({
							async:false,
							type : "POST",
							url : FORMOPTURL_UPDATE ,
							data : data, 
							success : function(resultdata) {
								if('000000' != resultdata.ret.flag){
									bootbox.alertTimeout('操作失败，请重试，错误原因：' +resultdata.ret.desc );
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
			$('.table_btn_info').die().live('click', function() {
				var datatable = $('#'+param.table_attr.tableid);

				var rowNode = this.parentNode.parentNode;
				var rowData = datatable.dataTable().fnGetData(rowNode);
				store.set("currentSelectRowData" + MODULENAME, rowData);
				var currentUrl=GLOBAL.HTML_HOME+"admin/sys/news/sys_news_approve.html";
				store.set("currentUrl",currentUrl);
				basearchiveUtil.jumpToHtml(infoUrl);
			});
			
		});
	};
});