/**
 * 
 * 基础档案表单：表格
 * @author liuchchc
 * @date 2014-4-24 19:49:26
 * @history
 * 1 增加单选多选设置 - liuchchc - 2014-5-24 19:49:56
 */
define(function(require, exports, module) {

	var $ = require("$");
	require("bootstrap_commonrequire");
	
	require('jquery.dataTables');
	require('ajaxReloadDataTable');
	var dtUtil = require('datatableutil');

	/**
	 * 初始化参数
	 */
	function initAttr(param) {
		var bSort = param.table_attr.bSort;
		if(typeof(bSort) == "undefined" || bSort == null){
			param.table_attr.bSort = false;
		}
		var bServerSide = param.table_attr.bServerSide;
		if(typeof(bServerSide) == "undefined" || bServerSide == null){
			param.table_attr.bServerSide = false;
		}
	};
	
	/**
	 * 刷新界面数据
	 */
	exports.reloadTable = function(param) {
		initAttr(param);
		
		var bServerSide = param.table_attr.bServerSide;
		if(bServerSide){
			$("#" + param.table_attr.tableid).dataTable().fnDraw();
		} else {
			$("#" + param.table_attr.tableid).dataTable().fnReloadAjax();
		}
		
	};

	exports.init = function(param) {
		var tableid = param.table_attr.tableid;
		var requesturl = param.table_attr.requesturl;
		var isMultiSelect = param.table_attr.isMultiSelect;
		
		var Table = require("table");
		
		var exportTable = new Table({
			attrs : {
				id : tableid,
				isHovered : false,
				isStriped : true,
				isBordered : false,
				isDatatable : true,
				theadAddStyle : "color: white",
				theadAddClass : "contrast-background",
			},
			renderTo : param.table_attr.targetdiv,
		});

		initAttr(param);
		
		$(document).ready(function(){
			$('#' + tableid).dataTable({
				//	"sDom" : "<'row-fluid'<'span6'l><'span6'f>r>t<'row-fluid'<'span6'i><'span6'p>>",// 显示头部和搜索框
				"sDom" : "tp",// 不显示
				"oLanguage" : {
					"sUrl" : GLOBAL.BASE + "js/common/table/src/lang/dataTable.cn.txt", // 多语言配置文件，可将oLanguage的设置放在一个txt文件中，例：Javascript/datatable/dtCH.txt
				},
				"bJQueryUI" : false,
				"sPaginationType" : "bootstrap", // 分页自带两种样式，full_numbers和two_button(默认)
				'bPaginate' : true, 	// 是否分页
				"bProcessing" : false,  // 当datatable获取数据时候是否显示正在处理提示信息。
				"bServerSide" : param.table_attr.bServerSide,  // 指定服务器端分页
				"bDeferRender" : true,
				"bFilter" : false,
				"bInfo" : true,
				"bSort": param.table_attr.bSort,
				"iDisplayLength" : DATATABLES_CONFIG.iDisplayLength.DEFAULT,
				"sAjaxSource" : dtUtil.convert_url(requesturl), // 数据源
				"fnServerData" : function(
						sSource, aoData,
						fnCallback, oSettings) {
					oSettings.jqXHR = $.ajax({
						"dataType" : 'json',
						"url" : sSource,
						"data" : dtUtil.convert_aoData(aoData, requesturl),
						"success" :  function(json){
							
							dtUtil.successCallback(json, aoData, fnCallback);
						},
					});
				},
				"aoColumnDefs" : param.table_attr.aocolumnDefs,
				"fnDrawCallback": function( oSettings ) {
                	// 表格绘制完成后，去除width属性，使表格可缩放
                	$('#'+oSettings.sTableId).css("width", "");
                },
			});
			
			// 设置单选多选
			var setRowSelectionWay = function(isMultiSelect){
				if(isMultiSelect == null)
					return;
				
				var datatable = $('#'+tableid).DataTable();
				
				if(isMultiSelect){
					$('#'+tableid+' tbody').on( 'click', 'tr', function () {
						$(this).toggleClass('selected');
				    } );
				} else{
				   $('#'+tableid+' tbody').on( 'click', 'tr', function () {
					   if ($(this).hasClass('selected')) {
						    $(this).removeClass('selected');
				        }
				        else {
				        	datatable.$('tr.selected').removeClass('selected');
				        	$(this).addClass('selected');
				        }
				   } );
				}
			};
			
			setRowSelectionWay(isMultiSelect);
			
			// 删除表头
			// $('#' + tableid + ' thead').remove();
		});
		
		return exportTable;
	};
});