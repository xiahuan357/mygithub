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
    
    
    var template = require("./sys_national_feature_preview.tpl");
    var basearchiveUtil = require('basearchive-util');
    
    var FORMOPTURL_QUERY = GLOBAL.BASE + "admin/nationalfeature/nationalfeature/search";
    var tableUrl = GLOBAL.HTML_HOME + "admin/sys/nationalfeature/sys_national_feature_table.html";
    
    var lastdata = null;
    
    /**
     * 获取详细信息
     */
    function getNationalFeatureDetail(id){
    	$.ajax({
			async : false,
			dataType : 'json',
			contentType : "application/json;charset=UTF-8",
			type : "GET",
	        url:FORMOPTURL_QUERY + "?q=id=" + id,
	        success : function(resultdata)
	        {
	        	if('000000' != resultdata.flag){
					bootbox.alertTimeout('查询数据出现错误，请刷新重试！');
					lastdata = null; 	// 查询出错
				} else {
					var receiptList = resultdata.data;
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
    
    var ProductDetail = Widget.extend(
    {
        template : template,
        setup : function(config)
        {
        	lastdata = null;
        	var nationalfeature = getNationalFeatureDetail(store.get("nationalfeatureid"));
        	if(nationalfeature == null)
        		return;
            this.setModel(nationalfeature);
        },
        afterRender : function(){
        	$("#contentWrapperDiv").html ( lastdata.nationalfeature_description);

        	
        	$('#form_btn_return').die().live('click', function() {
        		basearchiveUtil.jumpToHtml(tableUrl);
			});
        },
    });

    module.exports = ProductDetail;
});
