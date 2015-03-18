/**
 * 民族特色预览
 * 
 * @author liuchchc
 * @date 2015-1-2 14:00:27
 * 
 */
define(function(require, exports, module)
{
	var $ = require("$");
    var Widget = require("widget");
	var store = require('store');
	require("bootstrap_commonrequire");
    var userinfo =store.get("userinfo");
    
    var template = require("./sys_news_preview.tpl");
    var basearchiveUtil = require('basearchive-util');
    
    var MODULENAME="news";
    var FORMOPTURL_QUERY = "querynews.action";
    
    var lastdata = null;
    
    /**
     * 获取详细信息
     */
    function getNationalFeatureDetail(id,type){
    	$.ajax({
			async : false,
			dataType : 'json',
			type : "POST",
			data:{
				id:id,
				type:type
			},
	        url:FORMOPTURL_QUERY,
	        success : function(resultdata)
	        {
	        	if('000000' != resultdata.ret.flag){
					bootbox.alertTimeout('查询数据出现错误，请刷新重试！');
					lastdata = null; 	// 查询出错
				} else {
					var receiptList = resultdata.ret.data;
					if(receiptList != null && receiptList.length > 0){
						lastdata = receiptList[0];
					} else{
						bootbox.alertTimeout('查询数据出现错误，请刷新重试！');
						lastdata = null; // 没有此条数据						
					}
				}
	        },
	        error : function(XMLHttpRequest, textStatus, errorThrown) {
	        	bootbox.alertTimeout('初始化内容出现错误！');
			}
	    });
    	
    	if(null == lastdata){
    		return null;
		} else{
			return lastdata;
		}
    }
    
    var DetailPreview= Widget.extend(
    {
        template : template,
        setup : function(config)
        {
        	lastdata = null;
        	var storeRowData = store.get("currentSelectRowData" + MODULENAME);
        	var nationalfeature = getNationalFeatureDetail(storeRowData.id,storeRowData.type);
        	if(nationalfeature == null)
        		return;
            this.setModel(nationalfeature);
        },
        afterRender : function(){
        	$("#contentWrapperDiv").html (lastdata.content);

        	
        	$('#form_btn_return').die().live('click', function() {
        		var tableUrl =store.get("currentUrl");
        		basearchiveUtil.jumpToHtml(tableUrl);
			});
        },
    });

    module.exports = DetailPreview;
});
