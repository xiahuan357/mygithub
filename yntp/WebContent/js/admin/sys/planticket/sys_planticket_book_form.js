/**
 * 机票预订链接-form
 */
define(function(require, exports, module) {

	var $ = require("$");
	require("bootstrap_commonrequire");
	require("bootbox.css");

	var bootbox = require('bootbox');
	var theme = require('bootstrap_theme');
	var store = require('store');
	var loader = require('loader');
	var FileUploadCom = require("imageupload");
	
	var basearchiveUtil = require('basearchive-util');
	var form = require('basearchive-form');
	
	var FORMOPTURL_INSERT= GLOBAL.BASE + "admin/planticket/create";
	var FORMOPTURL_UPDATE= GLOBAL.BASE + "admin/planticket/update";
	
	var TARGETDIV_FORM = "basearchive_form";
	var MODULENAME = "planticket";
	var COMPONENTID_FORM = "validationform" + "_" + MODULENAME;
	
	var tableUrl = GLOBAL.HTML_HOME + "admin/sys/planticket/sys_planticket_book_table.html";
	var tabbed_textarea;
	var fileUpload;
	var form_param = {
		// Form信息
		form_attr : {
			formitem : {
				title : "酒店分类信息",
				spansize : 'span12',
				type : basearchiveUtil.FORMOPT_CREATE, // create 创建 ; update 更新
				formid : COMPONENTID_FORM,
				targetdiv : TARGETDIV_FORM,
			},
			items : [ {
				isHidden : true,
				id : 'hidden_id',
				name : 'hidden_id',
				value : ''
			}, {
				isText : true,
				label : "机票预订链接名称",
				id : 'text_name',
				name : 'text_name',
				type : "text",
				style : "width:50%",
				placeholder : "请输入机票预订链接名称",
				validations : {
					required : true,
					minlength : 1,
					maxlength : 255,
				},
			},
			{
				isText : true,
				label : "机票预订链接地址",
				id : 'text_url',
				name : 'text_url',
				type : "text",
				style : "width:50%",
				placeholder : "请输入机票预订链接地址",
			},{
				isDiv : true,
				id : 'img_planticket',
				name : 'img_planticket',
				style : "width:50%",
				label : '机票预订链接图片',
			}, {
				isDiv : true,
				id : 'text_abstract',
				name : 'text_abstract',
				style : "width:50%",
				label : '机票预订链接说明',
			} ,
			{
				isHidden : true,
				id : 'hidden_imagekey',
				name : 'hidden_imagekey',
			}
			]
		}
	};
	//生成imagekey
	function getImageKey() {
		$.ajax({
			async : false,
			dataType : 'json',
			contentType : "application/json;charset=UTF-8",
			type : "GET",
			url : GLOBAL.BASE + "imageupload/imagekey",
			success : function(data) {
				$('#hidden_imagekey').attr("value", data.data);
			},
			error : function(XMLHttpRequest, textStatus, errorThrown) {
				bootbox.alertTimeout('初始化数据出现错误！');
			}
		});
	}
	// 保存
	var fnsubmithandler = function(){
		var optType = store.get("currentOptType" + MODULENAME);
		var vname = $('#text_name').attr("value");
		var vid = $('#hidden_id').attr("value");
		var vurl = $('#text_url').attr("value");
		var vimagekey = $('#hidden_imagekey').attr("value");
		var vabstract = tabbed_textarea.getText();
		var vplanticket_picture = $('#editor_planticket_path_picture').attr("value");
		//------------------------
		var data = {
			name : vname,
			url : vurl,
			abstracts : vabstract,
			planticket_picture : vplanticket_picture,
			imagekey:vimagekey,
		};

		var requestURL = "";
		
		if (optType == basearchiveUtil.FORMOPT_UPDATE) {
			data.id=vid;
			requestURL = FORMOPTURL_UPDATE + "/" + vid;
		} else {
			requestURL = FORMOPTURL_INSERT;
		}
		var saveResult = form.doSaveAction(requestURL,data,optType);
		
		if (saveResult) {
			// 清除本地store的数据
			var cacheKeyList = ["currentSelectRowData" + MODULENAME,"currentOptType" + MODULENAME];
			basearchiveUtil.clearStoreCache(cacheKeyList);
			
			basearchiveUtil.jumpToHtml(tableUrl);
		} else{
			return false;
		}
	};
	
	// 初始化Form数据，新建和编辑时
	function initFormValue(optType,data){
		var hidden_id = $('#hidden_id');
		var text_abstract = $('#text_abstract');
		var text_name = $('#text_name');
		var text_url = $('#text_url');
		var editor_planticket = $('#editor_planticket_path_picture');
		
		if (optType == basearchiveUtil.FORMOPT_CREATE) {
			if (hidden_id != 'undefined' && hidden_id != null)
				hidden_id.attr("value", "");
			if (text_name != 'undefined' && text_name != null)
				text_name.attr("value", "");
			if (text_url != 'undefined' && text_url != null)
				text_url.attr("value", "");
			if (text_abstract != 'undefined' && text_abstract != null)
				text_abstract.attr("value", "");
			tabbed_textarea.setText("");
			getImageKey();
			fileUpload= new FileUploadCom({
					attrs : {
						editorid:"editor_planticket",
						optType : optType,
						imagekey : $('#hidden_imagekey').attr("value"),
					},
					renderTo : "img_planticket"				});
		} else if (optType == basearchiveUtil.FORMOPT_UPDATE) {
			// 重新从数据库中读取数据
			var queryUrl = GLOBAL.BASE +  "admin/planticket/search?q=id=" + data.id;
			var lastdata = null;
			$.ajax({
				async : false,
				type : "GET",
				dataType : 'json',
				contentType : "application/json;charset=UTF-8",
				url : queryUrl,
				success : function(resultdata) {
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
					bootbox.alertTimeout('查询数据出现错误，请重试！');
				}
			});
			if(null == lastdata){
				// 清除本地store的数据
				var cacheKeyList = ["currentSelectRowData" + MODULENAME,"currentOptType" + MODULENAME];
				basearchiveUtil.clearStoreCache(cacheKeyList);
				
				basearchiveUtil.jumpToHtml(tableUrl);
			}
			if (hidden_id != 'undefined' && hidden_id != null)
				hidden_id.attr('value', lastdata.id);
			if (text_name != 'undefined' && text_name != null)
				text_name.attr("value", lastdata.name);
			if (text_url != 'undefined' && text_url != null)
				text_url.attr("value", lastdata.url );
			tabbed_textarea.setText(lastdata.abstracts);
			 getImageKey();
			 fileUpload= new FileUploadCom({
					attrs : {
						editorid:"editor_planticket",
						optType : optType,
						imagekey : $('#hidden_imagekey').attr("value"),
						picturePath:lastdata.planticket_picture,
					},
					renderTo : "img_planticket"
				});
		}
	}
	// 取消了，需要将上传的文件删除
	 function deleteCancelImage() {
		var imagekey = $('#hidden_imagekey').attr("value")
		var  requstUrl = GLOBAL.BASE + "imageupload/create/cancel";

		$.ajax({
			type : "POST",
			async : false,
			dataType : "text",
			url : requstUrl,
			data : {
				imagekey : imagekey
			},
			success : function(data) {

			},
			error : function(XMLHttpRequest, textStatus, errorThrown) {

			}
		});
	}
	exports.init = function(){
		$(document).ready(function() {
			// 当前操作：新建，编辑
			var optType = store.get("currentOptType" + MODULENAME);
			var storeRowData = store.get("currentSelectRowData" + MODULENAME);
			
			form.init(form_param);
			var TextArea =require("textarea");
			tabbed_textarea = new TextArea({
		    	attrs:{
		    		id:"textarea_abstract",
		    	},
				renderTo : "text_abstract"
			});
			initFormValue(optType,storeRowData);
			var optType = "create";
			// 取消方法
			$('#btn_mct_cancel').die().on('click', function() {
				bootbox.confirm("确认取消？", function(YesOrNo){
					if(YesOrNo){
						deleteCancelImage();
						// 清除本地store的数据
						var cacheKeyList = ["currentSelectRowData" + MODULENAME,"currentOptType" + MODULENAME];
						basearchiveUtil.clearStoreCache(cacheKeyList);
						basearchiveUtil.jumpToHtml(tableUrl);
					}
				});
			});

			//加载验证，验证表单
			theme.setValidateForm($("#"+COMPONENTID_FORM), fnsubmithandler);
		});
	};
});