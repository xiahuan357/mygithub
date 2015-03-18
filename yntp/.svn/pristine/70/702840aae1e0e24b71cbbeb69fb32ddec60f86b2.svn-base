/**
 * Statistics 区域
 */
define(function(require, exports, module) {
	var $ = require("$");
	var nav = require("bootstrap_nav");
	exports.init = function(param) {
		var listBlockOut = "";
		for (var i = 0; i < param.body.length; i++) {
			// 每行三个，三个为一个row-fluid
			if (i == 0) {
				var topDivClass = '<div class="row-fluid" style="margin-top:5px">';
				listBlockOut = listBlockOut + topDivClass;
			} else if (i % 3 == 0) {
				listBlockOut = listBlockOut + '</div>';
				topDivClass = '<div class="row-fluid" style="margin-top:20px">';
				listBlockOut = listBlockOut + topDivClass;
			}

			var bodyItem = param.body[i];
			var template = ' <div class="span4 box">'
					+ ' <div class="box-header">' + ' <div class="title '
					+ bodyItem.bHeader.colorClass + ' ">' + ' <i class="'
					+ bodyItem.bHeader.bIcon + '"></i>'
					+ bodyItem.bHeader.bTitle + ' </div></div>'
					+ ' <div class="row-fluid">' + ' <div class="span12">';

			var bBodys = bodyItem.bBody;
			for (var j = 0; j < bBodys.length; j++) {
				template += initBBodyHtml(bBodys[j], param.daterange);
			}

			template += ' </div></div></div>';
			listBlockOut = listBlockOut + template;
		}
		listBlockOut = listBlockOut + '</div>';
		$("#" + param.appendDivId).append(listBlockOut);
	};
	var initBBodyHtml = function(bBody, daterange) {
		var bBodyHtml = '<div style="cursor:pointer;" class="box-content box-statistic conBody" url="'
				+ bBody.url
				+ '"><h3 class="title '
				+ bBody.clolorClass
				+ '">'
				+ getTotal(bBody.dataUrl, bBody.data, daterange)
				+ '</h3><small>'
				+ bBody.title
				+ '</small>'
				+ '<div class="'
				+ bBody.clolorClass
				+ ' '
				+ bBody.icon
				+ ' align-right"></div></div>';
		return bBodyHtml;
	};

	var getTotal = function(url, data, daterange) {
		var paramutil = require('queryparamutil');
		var dateparam = paramutil.getDateParam(daterange);
		var param = data;
		param = paramutil.addParam(param, dateparam);

		var total = 0;
		//        $.ajax(
		//        {
		//            url : url,
		//            data : param,
		//            dataType : "json",
		//            async : false,
		//            contentType : "application/json; charset=utf-8",
		//            success : function(res)
		//            {
		//            	if(res && res.flag == '000000'){
		//            		total = res.data;
		//            	}else{
		//            		total = 0;
		//            	}
		//            },
		//            error : function(XMLHttpRequest, textStatus, errorThrown) {
		//				bootbox.alertTimeout(textStatus);
		//			}
		//        });
		return total;
	};

	exports.initEvent = function() {
		$(".conBody").on("click", function() {
			// 获取所点击的页签名称
			var seltext = $(this).find(" small").text();
			if ('今日新增' == seltext) {
				seltext = $(this).parent().parent().prev().first().text();
			}
			seltext = $.trim(seltext);

			$('#desktop_goto_tab').val(seltext);

			var url = $(this).attr("url");
			nav.toPageView(url);
		});
	};

});