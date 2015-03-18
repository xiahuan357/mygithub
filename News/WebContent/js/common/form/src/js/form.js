define(function(require, exports, module) {
	var $ = require("$");
	require("bootstrap_commonrequire");
	require("jquery.validate");
	
	require('bootstrap-daterangepicker');
	require('daterangepicker.css');
	
	var form_tpl = require("./form.tpl");
	var Widget = require("widget");
	var handlebars = require("handlebars");
	
	// 显示错误或是其他信息在form顶端
	var showMsg  = 	function(msg,msgtype,formid){
		var msgTypeClass = "alert alert-info";
		if(msgtype != null){
			if(msgtype == "success"){
				msgTypeClass = "alert alert-success";
			} else if(msgtype == "error"){
				msgTypeClass = "alert alert-error";
			} else if(msgtype == "alert"){
				msgTypeClass = "alert alert-info";
			}
		}
        var msgdiv = '<div class="' + msgTypeClass + '">' + 
					        '<button type="button" class="close" data-dismiss="alert">×</button>' + 
					        '<span class="icon-remove-sign icon-large"></span>&nbsp;' +  msg +
					 '</div>';
        
        var msgDivId ;
        if(formid  != null){
        	msgDivId = formid + "_appendmsg";
        	$("#" + msgDivId).empty();
            $("#" + msgDivId).append(msgdiv);
        } else{
        	$("div[id$='_appendmsg']").empty();	
        	$("div[id$='_appendmsg']").append(msgdiv);
        }
	}
	
	// 清除在form顶端显示的错误或是其他信息
	var clearMsg  = 	function(formid){
		var msgDivId ;
        if(formid  != null){
        	msgDivId = formid + "_appendmsg";
        	$("#" + msgDivId).empty();
        } else{
        	$("div[id$='_appendmsg']").empty();	
        }
	}

	
	// 设置checkBox的值
	var initCheckBox = function(param){
		var comId = param.id;
		var options = param.options;
		if(options == null){
			return;
		}
		
		var checkBoxHtml="";
		for(var i=0;i<options.length;i++){
			var option = options[i];
			var checked = option.selected == null ? "" :  option.selected;
			checkBoxHtml = checkBoxHtml + '<label class="checkbox inline">';
			checkBoxHtml = checkBoxHtml + '<input type="checkbox" name="' +option.name + '"' + checked +  '>' ;
			checkBoxHtml = checkBoxHtml + '</label>';
		}
		$("#"+comId).append(checkBoxHtml);
	}
	
	var Form = Widget.extend({
		handlebars : handlebars,
		// 初始化参数
		initCustAttr : function() {
			// 输入项初始化
			attrs = this.get("attrs");
			
			// 是否显示Box-Content边框
			attrs.useBoxContent = attrs.useBoxContent == null ? true : attrs.useBoxContent;
			// 是否覆盖Box-Content样式
			attrs.boxContentStyle = attrs.boxContentStyle == null ? "box-content box-no-padding" : attrs.boxContentStyle;
		},
		template : form_tpl,
		afterRender : function(){
			var that = this;
			var items = this.get("items");
			if(items == null){
				return;
			}
			
			for(var i=0;i<items.length;i++){
				var item = items[i];
				// 初始化datarange
				if(item.isDaterange){
					item.format = item.format == null ? "YYYY-MM-DD" : item.format;
					var dateFormat = item.format;
					$('#' + item.id).daterangepicker({
						format : dateFormat,
						startDate : item.startDate,
						endDate : item.endDate,
						locale : {
							applyLabel : '确定',
							cancelLabel : "取消",
							fromLabel : '从',
							toLabel : '到',
							weekLabel : '周',
							customRangeLabel : '自定义',
							daysOfWeek : [ "日", "一", "二", "三","四", "五", "六" ],
							monthNames : [ "一月", "二月", "三月","四月", "五月", "六月", "七月","八月", "九月", "十月", "十一月","十二月" ],
							firstDay : 0
						},
					});
				}
			}
			$('#btn_mct_save').live('hover',function(elem){
				$('#btn_mct_save').focus();
			});
		},
		bindEvent : function(){
			var that = this;
			var items = this.get("items");
			if(items == null){
				return;
			}
			
			for(var i=0;i<items.length;i++){
				var item = items[i];
				// 给datarange绑定事件
				if(item.isDaterange){
					item.format = item.format == null ? "YYYY-MM-DD" : item.format;
					var dateFormat = item.format;
					
					function getDateRangeStr(start, end){
		            	return start.format(dateFormat)+"/"+end.format(dateFormat);
		            }
					var comid = item.id;
					// 绑定选择日期的确定点击事件
		            $('#' + comid).on('apply.daterangepicker', function(ev, picker){
		            	// 将选中结果回填到input输入框中
		            	var range = getDateRangeStr(picker.startDate,picker.endDate);
		            	$('#' + comid).prev().val(range);
					});
				}
			}
		},
		initCheckBox  : function(param){
			// 构建数据MultiSelectorOptionVO 
			var comId = param.id;
			var options = param.options;
			if(options == null){
				return;
			}
			
			var checkBoxHtml="";
			for(var i=0;i<options.length;i++){
				var option = options[i];
				var checked = option.selected == null  || option.selected == false ? "" :  "checked";
				checkBoxHtml = checkBoxHtml + '<label class="checkbox inline">';
				checkBoxHtml = checkBoxHtml + '<input type="checkbox" value="' + option.id + '" name="' +option.name + '"' + checked +  '>' +option.name  ;
				checkBoxHtml = checkBoxHtml + '</label>';
			}
			$("#"+comId).append(checkBoxHtml);
		},
		getCheckBox : function(param){
			// 获得选中的id，以“,”分割
			var ids="";
			var selectCount = jQuery("input[type=checkbox]:checked").length;
			var i = 0;
			var checkboxa = jQuery("input[type=checkbox]:checked").each(function(){
				i ++;
				var id = jQuery(this).val();
			    ids = ids + id;
			    if(i < selectCount){
			    	ids = ids + ",";
			    }
			})
			return ids;
		}
	});
	module.exports = Form;
	module.exports.showMsg = showMsg;
	module.exports.clearMsg = clearMsg;
	module.exports.initCheckBox = initCheckBox;
});