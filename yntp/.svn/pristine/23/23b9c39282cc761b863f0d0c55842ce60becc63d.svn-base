/**
 * 消息列表，左列表，右详细
 */
define(function(require, exports, module) {
	var $ = require("$");

	require("bootstrap_commonrequire");
	var bootbox = require('bootbox');
	var store = require('store');
	var userUtil = require('userutil');
	var basearchiveUtil = require('basearchive-util');
	var userutil = require("userutil");

	exports.init = function(param) {
		var userInfo = userutil.getUserInfo();
		var TABLEOPTURL_QUERY = GLOBAL.BASE + "admin/message/pagesearch/"+userInfo.id+"/messagelist";
		var TABLEOPTURL_DELETE = GLOBAL.BASE + "admin/message/delete/";
		
		var tableid = param.tableWrapperDiv + 'Table';

		// 在tab页中加载数据
		var Table = require("table");
		var dtUtil = require('datatableutil');

		new Table({
			attrs : {
				id : tableid,
				isHovered : false,
				isStriped : true,
				isBordered : true
			},
			renderTo : param.attrs.tableWrapperId
		});

		var dtMessage = $('#' + tableid).dataTable(
		{
			"sDom" : "tp",
			"oLanguage" : {
				"sUrl" : GLOBAL.BASE + "/js/common/table/src/lang/dataTable.cn.txt", // 多语言配置文件，可将oLanguage的设置放在一个txt文件中，例：Javascript/datatable/dtCH.txt
			},
			"bJQueryUI" : false,
			"sPaginationType" : "bootstrap", // 分页自带两种样式，full_numbers和two_button(默认)
			'bPaginate' : true, // 是否分页
			"bProcessing" : false, // 当datatable获取数据时候是否显示正在处理提示信息。
			"bServerSide" : true, // 指定服务器端分页
			"bDeferRender" : true,
			"bFilter" : false,
			"bInfo" : false,
			"iDisplayLength" : DATATABLES_CONFIG.iDisplayLength.DEFAULT,
			"sAjaxSource" : TABLEOPTURL_QUERY, // 数据源
			"fnServerData" : function(sSource, aoData,fnCallback, oSettings) {

				var queryparam = dtUtil.convert_aoData(aoData);

				oSettings.jqXHR = $.ajax({
					"dataType" : 'json',
					"contentType" : "application/json;charset=UTF-8",
					"url" : sSource,
					"data" : queryparam, // 将请求数据转换为后台要求的JSON格式
					"success" : function(json) {
						dtUtil.successCallback(json,
								aoData, fnCallback);
					}
				});
			},
			"aoColumnDefs" : [ 
            {
				"aTargets" : [ 0 ],
				"sTitle" : "",
				"bSortable" : false,
				"mData" : null,
				"mRender" : function(data, type, full) {
					var statusName = full.is_read == 0 ? "未读" : "已读";
					var statusColour = full.is_read == 0 ? "label label-important" : "label label-success";
					var ret =  '<div class="row-fluid title">' +
										'<p><a href="javascript:void(0)"><strong>' + full.title + '</strong></a></p>' +
									'</div>' +
									'<div class="row-fluid">' +
										'<span class="pull-left status ' + statusColour + '">' + statusName + '</span>' +
										'<span class="pull-right">' + full.send_date + '</span>' +
									'</div>';
					return ret;
				}
			} ],
			"fnDrawCallback" : function(oSettings, json) {
				$('#'+ tableid+ ' tbody tr:first td div.pull-left p a').click();
				// 如果删除后没有数据，详情界面的数据清空
				if (oSettings != null) {
					var aoData = oSettings.aoData;
					if (aoData != null && aoData.length > 0) {

					} else {
						refreshDetailData();
					}
				}
			}
		});

		// 删除表头
		$('#' + tableid + ' thead').remove();

		// 列表绑定点击事件
		$('#' + tableid + ' tbody').off().on('click',' tr td div.title p a',function(e) {
			var trNode = this.parentNode.parentNode.parentNode.parentNode;
			var tbNode = trNode.parentNode;
			$(tbNode).find(' tr.row_selected').removeClass('info');
			$(tbNode).find(' tr.row_selected').removeClass('row_selected');
			$(trNode).addClass('row_selected');
			$(trNode).addClass('info');

			refreshCurDetailData();
			updateStatus();
		});

		// 刷新右侧详细信息
		function refreshDetailData(selectRowData) {
			if(selectRowData == null)
				return;
			var DocDetail = require("form_display");
			var docDetailParam = {
					spansize : 'span12',
					items : [
					{
						textid : "text_title",
						label : "主题",
						labelclass : "span3",
						value : selectRowData.title,
						valueclass : "span9",
					},
					{
						textid : "text_date",
						label : "发送日期",
						labelclass : "span3",
						value : selectRowData.send_date,
						valueclass : "span9",
					},
					{
						textid : "text_content",
						label : "内容",
						labelclass : "span3",
						value : selectRowData.content,
						valueclass : "span9",
					} 
					]
			};

			new DocDetail({
				attrs : docDetailParam,
				renderTo : param.attrs.detailWrapperId
			});
		}

		// 标记为已读
		function updateStatus(){
			var rowSels = dtMessage.$('tr.row_selected');
			
			var rowData = dtMessage.fnGetData(rowSels[0]);
			
			if(rowData.is_read == 1)
				return;
			
			$.ajax({
				async:false,
				type : "POST",
				dataType : 'json',
				contentType : "application/json;charset=UTF-8",
				url : GLOBAL.BASE + "admin/message/markread/" + rowData.id,
				success : function(resultData) {
					if(resultData.flag == "000000"){
						$(rowSels).find(" span.status").removeClass().addClass("pull-left status  label label-success");
						$(rowSels).find(" span.status").text ( "已读");
					} else{
					}
				},
				error : function(XMLHttpRequest, textStatus, errorThrown) {
				}
			});
		}
		
		// 获得当前选中的单据详细信息并显示
		function refreshCurDetailData() {
			var rowSels = dtMessage.$('tr.row_selected');
			var rowData = dtMessage.fnGetData(rowSels[0]);

			// 刷新右侧详细界面
			refreshDetailData(rowData);

			// 删除
			$('#delete_btn').off().on('click', function(e) {
				delete_doc(rowData.id);
			});

			// 删除
			function delete_doc(vid) {
				bootbox.confirm("确认删除？", function(YesOrNo) {
					if (YesOrNo) {
						$.ajax({
							async : false,
							type : "DELETE",
							dataType : 'json',
							contentType : "application/json;charset=UTF-8",
							url : TABLEOPTURL_DELETE + vid,
							success : function(resultData) {
								if(resultData.flag == "000000"){
									// 显示成功提交
									bootbox.alertTimeout('删除成功！');
									// 刷新table
									dtMessage.fnDraw();
									// 默认选中第一行
								} else{
									bootbox.alertTimeout('删除失败，请重试！');
								}
							},
							error : function(XMLHttpRequest, textStatus, errorThrown) {
								bootbox.alertTimeout('删除失败！');
							}
						});
					}
				});
			}
		}
	};
});