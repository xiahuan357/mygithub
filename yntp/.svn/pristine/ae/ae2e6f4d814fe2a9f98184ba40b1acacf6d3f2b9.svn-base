define(function(require, exports, module) {
	var $ = require('$');
 	require('jquery.dataTables');
 
	/* API method to get paging information */
	$.fn.dataTableExt.oApi.fnPagingInfo = function ( oSettings )
	{
		return {
			"iStart":         oSettings._iDisplayStart,
			"iEnd":           oSettings.fnDisplayEnd(),
			"iLength":        oSettings._iDisplayLength,
			"iTotal":         oSettings.fnRecordsTotal(),
			"iFilteredTotal": oSettings.fnRecordsDisplay(),
			"iPage":          Math.ceil( oSettings._iDisplayStart / oSettings._iDisplayLength ),
			"iTotalPages":    Math.ceil( oSettings.fnRecordsDisplay() / oSettings._iDisplayLength )
		};
	};
	
	/* Bootstrap style pagination control */
	$.extend( $.fn.dataTableExt.oPagination, {
		"bootstrap": {
			"fnInit": function( oSettings, nPaging, fnDraw ) {
				var oLang = oSettings.oLanguage.oPaginate;
				var fnClickHandler = function ( e ) {
					e.preventDefault();
					if ( oSettings.oApi._fnPageChange(oSettings, e.data.action) ) {
						fnDraw( oSettings );
					}
				};
				
				$(nPaging).addClass('pagination').append(
					'<ul>'+
						'<li class="prev disabled"><a href="#">'+oLang.sPrevious+'</a></li>'+
						'<li class="next disabled"><a href="#">'+oLang.sNext+'</a></li>'+
					'</ul>'
				);
				if(false == oSettings.bInfo){
					$(nPaging).addClass('span12 pagination-centered');
					$(nPaging).attr("style", "margin:0");
				}
				
				var els = $('a', nPaging);
				$(els[0]).bind( 'click.DT', { action: "previous" }, fnClickHandler );
				$(els[1]).bind( 'click.DT', { action: "next" }, fnClickHandler );
			},
	
			"fnUpdate": function ( oSettings, fnDraw ) {
				var iListLength = 5;
				var oPaging = oSettings.oInstance.fnPagingInfo();
				var an = oSettings.aanFeatures.p;
				var i, j, sClass, iStart, iEnd, iHalf=Math.floor(iListLength/2);
	
				if ( oPaging.iTotalPages < iListLength) {
					iStart = 1;
					iEnd = oPaging.iTotalPages;
				}
				else if ( oPaging.iPage <= iHalf ) {
					iStart = 1;
					iEnd = iListLength;
				} else if ( oPaging.iPage >= (oPaging.iTotalPages-iHalf) ) {
					iStart = oPaging.iTotalPages - iListLength + 1;
					iEnd = oPaging.iTotalPages;
				} else {
					iStart = oPaging.iPage - iHalf + 1;
					iEnd = iStart + iListLength - 1;
				}
	
				for ( i=0, iLen=an.length ; i<iLen ; i++ ) {
					// Remove the middle elements
					$('li:gt(0)', an[i]).filter(':not(:last)').remove();
	
					// Add the new list items and their event handlers
					for ( j=iStart ; j<=iEnd ; j++ ) {
						sClass = (j==oPaging.iPage+1) ? 'class="active"' : '';
						$('<li '+sClass+'><a href="#">'+j+'</a></li>')
							.insertBefore( $('li:last', an[i])[0] )
							.bind('click', function (e) {
								e.preventDefault();
								oSettings._iDisplayStart = (parseInt($('a', this).text(),10)-1) * oPaging.iLength;
								fnDraw( oSettings );
							} );
					}
	
					// Add / remove disabled classes from the static elements
					if ( oPaging.iPage === 0 ) {
						$('li:first', an[i]).addClass('disabled');
					} else {
						$('li:first', an[i]).removeClass('disabled');
					}
	
					if ( oPaging.iPage === oPaging.iTotalPages-1 || oPaging.iTotalPages === 0 ) {
						$('li:last', an[i]).addClass('disabled');
					} else {
						$('li:last', an[i]).removeClass('disabled');
					}
				}
			}
		}
	} );
	
	// -------------定义datatables的统一可选配置参数------------------
	if("undefined" == typeof(window.DATATABLES_CONFIG)){
		window.DATATABLES_CONFIG = {};
	}
	// 表格元素显示设置
	DATATABLES_CONFIG.sDom = {
		ALL : "<'row-fluid'<'span6'l><'span6'f>r>t<'row-fluid'<'span6'i><'span6'p>>", // 显示所有datatables元素
		ONLY_TABLE_INFO_PAGE : "<'row-fluid'r>t<'row-fluid'<'span6'i><'span6'p>>", // 仅显示表格、页码信息和翻页
		ONLY_TABLE_PAGE : "tp" // 仅显示表格和翻页
	};
	// 表格分页大小设置
	DATATABLES_CONFIG.iDisplayLength = {
		DEFAULT : 25, 	// 默认
		MIN : 10 		// 最小，左侧单据列表显示使用
	};
	
	// ----------------设置datatables的默认配置---------------------
//	$.extend( $.fn.dataTable.defaults, {
//		"sDom" : DATATABLES_CONFIG.sDom.ALL,
//	    "oLanguage" :
//	    {
//	    	// 多语言配置文件，可将oLanguage的设置放在一个txt文件中
//	        "sUrl" : "/chain/js/common/table/src/lang/dataTable.cn.txt",
//	    },
//	    "bJQueryUI" : false,
//	    "sPaginationType" : "bootstrap", //分页自带两种样式，full_numbers和two_button(默认), 此处使用bootstrap风格的分页
//	    'bPaginate' : true, 	//是否分页
//	    "bProcessing" : false, 	//当datatable获取数据时候是否显示正在处理提示信息。
//	    "bServerSide" : true, 	// 指定服务器端分页
//	    "bDeferRender" : true,
//	    "bFilter" : true,		// 是否显示右上搜索框
//	    "bInfo" : true,			// 是否显示左下分页信息
//	    "bSort" : true,		// 是否支持排序
//	    "iDisplayLength" : DATATABLES_CONFIG.iDisplayLength.DEFAULT  // 默认分页的每页记录数
//	} );
});