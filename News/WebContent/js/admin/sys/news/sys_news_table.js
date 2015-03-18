/**
 * 新闻列表界面
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
	var type=store.get("typename");
	var FORMOPTURL_DELETE = "deletenews.action";
	var TABLEOPTURL_QUERY = "querynewstitle.action?type="+type;
	
	var TARGETDIV_TABLE = "basearchive_table";
	
	var COMPONENTID_TABLE = "pagedatatable";
	var formUrl = GLOBAL.HTML_HOME + "admin/sys/news/sys_news_form.html";
	var typeUrl = GLOBAL.HTML_HOME + "admin/sys/news/sys_news_type_table.html";
	var previewUrl = GLOBAL.HTML_HOME + "admin/sys/news/sys_news_preview.html";
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
				"sTitle" : "imagekey",
				"mData" : "imagekey",
				"bVisible" : false,
			},
			{
				"aTargets" : [ 2 ],
				"sTitle" : "新闻标题",
				"mData" : "title",
				"mRender" : function(data, type, full)
				{
					return data;
				}
			},
			{
				"aTargets" : [ 3 ],
				"sTitle" : "发布时间",
				"mData" : "time",
				"mRender" : function(data, type, full)
				{
					return data;
				}
			},
			
			{
				"aTargets" : [ 4 ],
				"sTitle" : "新闻类型",
				"mData" : "type",
				"bVisible" : false,
			},
			{
				"aTargets" : [ 5],
				"sTitle" : "操作",
				"bSortable" : false,
				"mData" : null,
				"mRender" : function(data, type, full) {
					return '<a href="#" class="btn contrast icon-edit table_btn_modify" title="修改" >修改</a>'
					+ '<a href="#" class="btn contrast icon-eye-open table_btn_preview" title="预览" style="margin-left:10px" >预览</a>'
					+ '<a href="#" class="btn contrast icon-trash table_btn_delete" title="删除" style="margin-left:10px;margin-right:100px">删除</a>';
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
           $('#form_btn_return').die().live('click', function() {
				
				basearchiveUtil.jumpToHtml(typeUrl);
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
			

			// Table添加预览方法
			$('.table_btn_preview').die().live('click',function(e) {
				// 修改form的type
				var datatable = $('#'+param.table_attr.tableid);
				
				var rowNode = this.parentNode.parentNode;
				var rowData = datatable.dataTable().fnGetData(rowNode);
				var currentUrl=GLOBAL.HTML_HOME+"admin/sys/news/sys_news_table.html";
				store.set("currentUrl",currentUrl);
				store.set("currentSelectRowData" + MODULENAME, rowData);
				basearchiveUtil.jumpToHtml(previewUrl);
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
						$.ajax({
							async:false,
							type : "POST",
							dataType : 'json',
							url : FORMOPTURL_DELETE,
							data :{
								id:vid,
//								imagekey : vimagekey,
								type:type
							}, 
							success : function(resultdata) {
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