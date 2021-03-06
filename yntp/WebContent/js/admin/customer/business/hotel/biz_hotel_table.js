/**
 * 酒店列表界面
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
	var userUtil = require('userutil');
	var basearchiveUtil = require('basearchive-util');
	var table = require('basearchive-table');
	var userutil = require("userutil");
	
	var FORMOPTURL_DELETE = GLOBAL.BASE + "admin/business/hotel/deletewithimage/";
	
	var TARGETDIV_TABLE = "basearchive_table";
	
	var COMPONENTID_TABLE = "pagedatatable";
	var formUrl = GLOBAL.HTML_HOME + "admin/customer/business/hotel/biz_hotel_form.html";
	var tableUrl_room = GLOBAL.HTML_HOME + "admin/customer/business/hotel/biz_hotel_room_table.html";
	var MODULENAME = "hotel";
	
	var param = {
		// Table信息
		table_attr : {
			tableid : COMPONENTID_TABLE,
			targetdiv : TARGETDIV_TABLE,
			bServerSide:true,
			aocolumnDefs : [
			{
				"aTargets" : [ 0 ],
				"sTitle" : "酒店id",
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
				"sTitle" : "酒店名称",
				"mData" : "name",
				"mRender" : function(data, type, full)
				{
					return  data ;
				}
			},
			{
				"aTargets" : [ 3 ],
				"sTitle" : "操作",
				"bSortable" : false,
				"mData" : null,
				"mRender" : function(data, type, full) {
					return '<a href="#" class="btn contrast icon-edit table_btn_modify" title="修改" >修改</a>' 
					+ '<a href="#" class="btn contrast icon-trash table_btn_delete" title="删除" style="margin-left:10px;">删除</a>'
					+ '<a href="#" class="btn contrast icon-reorder table_btn_roomedit" title="房间编辑" style="margin-left:10px;">房间编辑</a>';
				}
			}]
		}
	};

	exports.init = function(){
		$(document).ready(function() {
			var userInfo = userutil.getUserInfo();
			var TABLEOPTURL_QUERY = GLOBAL.BASE + "admin/business/hotel/pagesearch/"+userInfo.id+"/hotellist";
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
			
			// 行程编辑
			$('.table_btn_roomedit').die().live('click',function(e) {
				// 修改form的type
				var datatable = $('#'+param.table_attr.tableid);
				
				var rowNode = this.parentNode.parentNode;
				var rowData = datatable.dataTable().fnGetData(rowNode);
				
				store.set("currentOptType" + MODULENAME, basearchiveUtil.FORMOPT_UPDATE);
				store.set("currentSelectRowData" + MODULENAME, rowData);
				basearchiveUtil.jumpToHtml(tableUrl_room);
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
								imagekey :vimagekey,
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