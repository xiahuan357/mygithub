/**
 * UEditor，单图片上传
 */
define(function(require, exports, module) {
	var $ = require("$");
	require("bootstrap_commonrequire");
	require("bootbox.css");
	require("ajaxfileupload");
	// ------------<ue
	require('ueditor.config-1.3.6');
	require('ueditor.all-1.3.6');
	require('ueditor-zh-cn-1.3.6');
	// ------------ue>
	 function ajaxFileUpload()
	    {
	        $.ajaxFileUpload({
	                url:'uploadimage.action',//用于文件上传的服务器端请求地址
	                secureuri:false,//一般设置为false
	                fileElementId:'file',//文件上传空间的id属性  <input type="file" id="file" name="file" />
	                type:'post',
	                dataType : 'json',
	                success: function (json)  //服务器成功响应处理函数
	                {  json = eval("(" + json + ")");
	                	$('#hidden_imagekey').val(json.newfilename);
	                    //从服务器返回的json中取出message中的数据,其中message为在struts2中定义的成员变量
	                	$("#file_picture_preview").attr("src", "/News/coverimage/"+json.newfilename);
	                	bootbox.alertTimeout(json.message);
	                },
	                error: function (json)//服务器响应失败处理函数
	                {   json = eval("(" + json + ")");
	                	bootbox.alertTimeout(json.message);
	                }
	            });
	    }
	$(document).ready(function() {
	});    
	
	// 实例化组件-------------------------START
	var template = require("./imageupload.tpl");
	var Widget = require("widget");	
	var bootbox = require('bootbox');
	var Component = Widget.extend({
		template : template,
		afterRender : function() {
			$('#file_confirmBtn').die().on('click',function(){
				ajaxFileUpload();
			});
			
		}
	});
	module.exports = Component;	
});