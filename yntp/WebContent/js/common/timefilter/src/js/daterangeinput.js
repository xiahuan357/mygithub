define(function(require, exports, module)
{
	var $ = require("$");
	require('moment');
    require("bootstrap-daterangepicker");
    
    var Widget = require("widget");
    var template = require("./daterangeinput.tpl");
    
    require("bootstrap.css");
    require("bootstrap-responsive.css");
    require("light-theme.css");
    require("theme-colors.css");
    require("daterangepicker.css");

    var dateFormat = 'YYYY-MM-DD';
    function getDateRangeStr(start, end){
    	return start.format(dateFormat)+"/"+end.format(dateFormat);
    }
    
    var Component = Widget.extend(
    {
        template : template,
        getDateFormat : function(){
        	return dateFormat;
        },
        // 初始化特有参数
		initCustAttr : function() {
			var attrs = this.get('attrs');
			attrs.label = typeof(attrs.label) == "undefined" || attrs.label == null ? "日期" : attrs.label;
			
		},
        afterRender : function()
        {
        	var attrs = this.get('attrs');

            $('#' + attrs.daterangeId).daterangepicker({
                format : dateFormat,
                applyClass : 'btn-contrast',
                locale : {
                    applyLabel : '确定',
                    cancelLabel : "取消",
                    fromLabel : '从',
                    toLabel : '到',
                    weekLabel : '周',
                    customRangeLabel : '自定义',
                    daysOfWeek : ["日", "一", "二", "三", "四", "五", "六"],
                    monthNames : ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
                    firstDay : 0
                },
                opens : "left",
            }
//            ,function(start, end, label){
//            	// 将选中结果回填到input输入框中
//            	var range = getDateRangeStr(start,end);
//            	$('#' + attrs.daterangeId).prev().val(range);
//            }
            );
            
            // 绑定选择日期的确定点击事件
            $('#' + attrs.daterangeId).on('apply.daterangepicker', function(ev, picker){
            	// 将选中结果回填到input输入框中
            	var range = getDateRangeStr(picker.startDate,picker.endDate);
            	$('#' + attrs.daterangeId).prev().val(range);
			});
        },
        // 设置日期选择为本月开始到今天
        setRangeToThisMonth : function(){
        	var attrs = this.get('attrs');
        	var start = moment().startOf('month');
        	var end = moment();
        	$('#' + attrs.daterangeId).data('daterangepicker').setStartDate(start);
        	$('#' + attrs.daterangeId).data('daterangepicker').setEndDate(end);
        	
        	var range = getDateRangeStr(start,end);
        	$('#' + attrs.daterangeId).prev().val(range);
        },
        clearInput : function(){
        	var attrs = this.get('attrs');
        	$('#' + attrs.daterangeId).prev().val('');
        },
	    getPickerRange : function(){
	    	var attrs = this.get('attrs');
	    	return $('#' + attrs.daterangeId).prev().val();
	    	//var start = $('#' + attrs.daterangeId).data('daterangepicker').startDate;
	    	//var end = $('#' + attrs.daterangeId).data('daterangepicker').endDate;
	    	//return getDateRangeStr(start,end);
	    }
    });
 
    module.exports = Component;
});
