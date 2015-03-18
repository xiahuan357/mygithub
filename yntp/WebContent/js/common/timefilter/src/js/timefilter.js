define(function(require, exports, module)
{
	var $ = require("$");
	require('moment');
    require("bootstrap-daterangepicker");
    
    var Widget = require("widget");
    var template = require("./timefilter.tpl");
    
    require("bootstrap.css");
    require("bootstrap-responsive.css");
    require("light-theme.css");
    require("dark-theme.css");
    require("dark-blue-theme.css");
    require("theme-colors.css");
    require("daterangepicker.css");

    var dateFormat = 'YYYY-MM-DD';
    
    function getDateRangeStr(start, end){
    	return start+"/"+end;
    }
    
    var Component = Widget.extend(
    {
        template : template,
        getDateFormat : function(){
        	return dateFormat;
        },
        afterRender : function()
        {
        	var attrs = this.get('attrs');
        	
        	function setBtnSelectedStyle(btnId){
        		var selbtn = $('#' + btnId)[0];
            	var btnGroupNode = selbtn.parentNode;
        		if($(selbtn).hasClass('btn-contrast')){
        			
        		}else{
        			// 去除其他按钮的选中状态 
        			$(btnGroupNode).find(' a.btn-contrast').removeClass('btn-contrast');
        			
        			// 将本按钮置为选中状态
        			$(selbtn).addClass('btn-contrast');
        		}
        	}

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
            },function(start, end, label){
            	setBtnSelectedStyle(attrs.daterangeId);
            });
            
        	$('#' + attrs.id).on('click',' a.btn', function(e){
        		var btnId = $(this).attr('id');
        		setBtnSelectedStyle(btnId);
        	});
        	
        	$('#' + attrs.thisWeekId).click(); // 默认选中本周
        },
	    getLastMonth : function(){
	    	var now = moment();
	    	var lastMonth = now.add('month', -1);
	    	return getDateRangeStr(
	    			lastMonth.startOf("month").format(dateFormat),
	    			lastMonth.endOf("month").format(dateFormat));
	    },
	    getLastWeek: function(){
	    	var now = moment();
	    	var lastWeek = now.add('week', -1);
	    	return getDateRangeStr(
	    			lastWeek.startOf("week").format(dateFormat),
	    			lastWeek.endOf("week").format(dateFormat));
	    },
	    getThisWeek : function(){
	    	var now = moment();
	    	var thisWeek = now.add('week', 0);
	    	return getDateRangeStr(
	    			thisWeek.startOf('week').format(dateFormat),
	    			thisWeek.endOf('week').format(dateFormat));
	    },
	    getPickerRange : function(){
	    	var attrs = this.get('attrs');
	    	var start = $('#' + attrs.daterangeId).data('daterangepicker').startDate.format(dateFormat);
	    	var end = $('#' + attrs.daterangeId).data('daterangepicker').endDate.format(dateFormat);
	    	return getDateRangeStr(start,end);
	    },
        getDateRange : function(){
        	var attrs = this.get('attrs');
        	
        	var btnGroupNode = $('#' + attrs.id);
        	var selbtns = $(btnGroupNode).find(' a.btn-contrast');
        	if(1 == selbtns.length){
        		var selbtnId = $(selbtns[0]).attr('id');
        		if(selbtnId == attrs.thisWeekId){
        			return this.getThisWeek();
        		}
        		if(selbtnId == attrs.lastWeekId){
        			return this.getLastWeek();
        		}
        		if(selbtnId == attrs.lastMonthId){
        			return this.getLastMonth();
        		}
        		return  this.getPickerRange();
        	}
        	return null;
        }
    });
 
    module.exports = Component;
});
