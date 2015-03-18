/**
 * 角色（目前只有商家有角色）列表界面
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
	
	var FORMOPTURL_DELETE = GLOBAL.BASE + "admin/permission/role/delete";
	var TABLEOPTURL_QUERY = GLOBAL.BASE + "admin/permission/role/pagesearch";
	var MULTISELECTOR_QUERY =  GLOBAL.BASE + "admin/permission/role/multiselectorresource";
	var GRANTRESOURCE =  GLOBAL.BASE + "admin/permission/role/grantresource";
	var TARGETDIV_TABLE = "basearchive_table";
	
	var COMPONENTID_TABLE = "pagedatatable";
	var formUrl = GLOBAL.HTML_HOME + "admin/sys/role/sys_role_form.html";
	var MODULENAME = "role";
	
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
				"sTitle" : "角色id",
				"mData" : "id",
				"bVisible" : false,
			},
			{
				"aTargets" : [ 1 ],
				"sTitle" : "角色名称",
				"mData" : "name",
				"mRender" : function(data, type, full)
				{
					return data;
				}
			},
			{
				"aTargets" : [ 2 ],
				"sTitle" : "角色编码",
				"mData" : "code",
				"mRender" : function(data, type, full)
				{
					return data;
				}
			},
			{
				"aTargets" : [3 ],
				"sTitle" : "操作",
				"bSortable" : false,
				"mData" : null,
				"mRender" : function(data, type, full) {
					return '<a href="#" class="btn contrast icon-edit table_btn_modify" title="修改" >修改</a>'
					+ '<a href="#" class="btn contrast icon-trash table_btn_delete" title="删除" style="margin-left:10px;">删除</a>'
					+ '<a href="#" class="btn contrast icon-gear (alias) table_btn_grant" title="分配资源" style="margin-left:10px;">分配资源</a>';
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

			// Table添加分配资源
			$('.table_btn_grant').die().live('click',function(e) {
				var datatable = $('#'+param.table_attr.tableid);

				var rowNode = this.parentNode.parentNode;
				var rowData = datatable.dataTable().fnGetData(rowNode);

				if ($('#dialogForm').length <= 0)
                {
                    $('body').append('<div id="dialogForm"></div>');
                };
                var dialogmultiselect2side = require("dialogmultiselect2side");
                var dialogForm = dialogmultiselect2side.init(
                {
                    attrs :
                    {
                        url : MULTISELECTOR_QUERY+"/"+rowData.id
                    },
                    renderTo : "dialogForm",
                    id : "resourcemutisel",
            		title: "资源分配",
                });
                $("#btndialogsave").on("click", function()
                {
                    var data = dialogmultiselect2side.getSelectedData();
                    var resources = new Array();
                    for(var i in data)
                    {
                        resources.push({id:data[i]});
                    }
                    $.ajax(
                    {
                        url : GRANTRESOURCE+"/"+rowData.id,
                        dataType : "json",
                        type : "POST",
                        contentType : "application/json;charset=UTF-8",
                        data : JSON.stringify(resources),
                        async : false,
                        success : function(resultData) {
                            bootbox.alertTimeout("分配成功！");
                        },
                        error : function(XMLHttpRequest, textStatus, errorThrown) {
							bootbox.alertTimeout('分配失败，请重试！');
						}
                    });
                });
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