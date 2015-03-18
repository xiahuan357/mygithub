/**
 * 文字广告信息-form
 */
define(function(require, exports, module) {

	var $ = require("$");
	require("bootstrap_commonrequire");
	require("bootbox.css");
	
	var bootbox = require('bootbox');
	var theme = require('bootstrap_theme');
	var store = require('store');
	var loader = require('loader');
	
	var basearchiveUtil = require('basearchive-util');
	var form = require('basearchive-form');
	
	//------------<ue
	require('ueditor.config-1.3.6');
	require('ueditor.all-1.3.6');
	require('ueditor-zh-cn-1.3.6');
	//------------ue>
	
	var FORMOPTURL_QUERY = GLOBAL.BASE + "admin/ads/adspicture/search";
	var FORMOPTURL_INSERT= GLOBAL.BASE + "admin/ads/adspicture/createwithimage";
	var FORMOPTURL_UPDATE= GLOBAL.BASE + "admin/ads/adspicture/updatewithimage";
	
	var TARGETDIV_FORM = "basearchive_form";
	var MODULENAME = "ads_picture";
	
	var COMPONENTID_FORM = "validationform" + "_" + MODULENAME;
	
	var tableUrl = GLOBAL.HTML_HOME + "admin/sys/ads/sys_ads_picture_table.html";
	
	var defaultDateValue = new Date().format("yyyy-MM-dd");
	
	// 保存当前最新从数据库中查询出的对象
	var currentLastData = null;
	var form_param = {
		// Form信息
		form_attr : {
			formitem : {
				title : "文字广告信息",
				spansize : 'span12',
				type : basearchiveUtil.FORMOPT_CREATE, // create 创建 ; update 更新
				formid : COMPONENTID_FORM,
				targetdiv : TARGETDIV_FORM,
			},
			items : [ 
		   {
				isHidden : true,
				id : 'hidden_id',
				name : 'hidden_id',
				value : ''
			},{
				isText : true,
				label : "广告内容",
				id : 'text_name',
				name : 'text_name',
				type : "text",
				style : "width:80%",
				placeholder : "请输入广告内容",
				validations : {
					required : true,
					minlength : 1,
					maxlength : 255,
			   },
			}, {
				isText : true,
				label : "广告链接",
				id : 'text_url',
				name : 'text_url',
				type : "text",
				style : "width:80%",
				placeholder : "请输入广告链接",
				validations : {
					required : true,
					minlength : 1,
					maxlength : 255,
			   },
			}, {
				isText : true,
				label : "广告描述",
				id : 'text_description',
				name : 'text_description',
				type : "text",
				style : "width:80%",
				placeholder : "请输入广告描述",
				validations : {
					required : true,
					minlength : 1,
					maxlength : 255,
			   },
			}, {
				isText : true,
				label : "位置说明",
				id : 'text_position',
				name : 'text_position',
				type : "text",
				style : "width:80%",
				placeholder : "请输入位置说明",
				validations : {
					required : true,
					minlength : 1,
					maxlength : 255,
			   },
			}, {
				isDaterange : true,
				label : "起始时间",
				id : 'date_range',
				name : 'date_range',
				style : "width:80%",
				format : "YYYY-MM-DD",
				placeholder : "请选择起始时间",
			}, {
				isDiv : true,
				id : 'img_picture',
				name : 'img_picture',
				style : "width:80%",
				label : '图片路径',
			}, {
				isHidden : true,
				id : 'hidden_imagekey',
			} 
			]
		}
	};
	
	// ------------<组件开始
	var com_id = $('#hidden_id');
	var com_name = $('#text_name');
	var com_url = $('#text_url');
	
	var com_description = $('#text_description');
	var com_position = $('#text_position');
	
	var com_daterange = $('#date_range');
	var com_imagekey = $('#hidden_imagekey');
	// ------------组件开始>

	function getUIComponent() {
		// ------------<组件开始
		com_id = $('#hidden_id');
		com_name = $('#text_name');
		com_url = $('#text_url');

		com_description = $('#text_description');
		com_position = $('#text_position');

		com_daterange = $('#date_range');
		com_imagekey = $('#hidden_imagekey');
		// ------------组件开始>
	}
	
	// 保存
	var fnsubmithandler = function(){
		var optType = store.get("currentOptType" + MODULENAME);
		
		var vid = com_id.attr("value");
		var vname = com_name.attr("value");
		var vurl = com_url.attr("value");
		var vdescription = com_description.attr("value");
		var vposition = com_position.attr("value");
		var vimagekey = com_imagekey.attr("value"); // 文件key 
		
		var vdate=basearchiveUtil.getDateRange({
			com_daterange : com_daterange,
		});
		var vdate_start= vdate.start;
		var vdate_end= vdate.end;
        
		var vlicense_picture = $('#editor_picture_path_picture').attr("value");
		
		//------------------------
		var adsPictureEntity = {
			name : vname,
			url : vurl,
			description : vdescription,
			position_id : vposition,
			starttime : vdate_start,
			endtime : vdate_end,
			imagekey : vimagekey,
			picture : vlicense_picture,
		};

		var requestURL = "";
		
		if (optType == basearchiveUtil.FORMOPT_UPDATE) {
			adsPictureEntity.id=vid;
			adsPictureEntity.createtime = new Date(currentLastData.createtime);
			requestURL = FORMOPTURL_UPDATE + "/" + vid;
		} else {
			requestURL = FORMOPTURL_INSERT;
		}
		var postData ={
				currentEntity : adsPictureEntity,
				imagelist : [vlicense_picture],
		}
		
		var saveResult = false;
		loader.loading("正在保存，请稍等……");
		$.ajax({
			type : "POST",
			dataType : 'json',
			contentType : "application/json;charset=UTF-8",
			url : requestURL,
			data : JSON.stringify(postData), 
			success : function(resultdata) {
				loader.noloading();
				if('000000' != resultdata.flag){
					doResult = false; 	// 保存出错
					// 显示错误信息
					bootbox.alertTimeout(resultdata.desc);
				} else {
					doResult = true;
					bootbox.alertTimeout("保存成功！");
					// 跳转到登录界面
					basearchiveUtil .jumpToHtml(tableUrl);
				}
			},
			error : function(XMLHttpRequest, textStatus, errorThrown) {
				saveResult = false;
				bootbox.alertTimeout("操作失败！");
			}
		});
		
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
		
		if (optType == basearchiveUtil.FORMOPT_CREATE) {
			if (com_id != 'undefined' && com_id != null)
				com_id.attr("value", "");
			if (com_name != 'undefined' && com_name != null)
				com_name.attr("value", "");
			if (com_url != 'undefined' && com_url != null)
				com_url.attr("value", "");
			if (com_description != 'undefined' && com_description != null)
				com_description.attr("value", "");
			if (com_position != 'undefined' && com_position != null)
				com_position.attr("value", "");
			getImageKey();// 初始化图片key
		} else if (optType == basearchiveUtil.FORMOPT_UPDATE) {
			// 重新从数据库中读取数据
			var queryUrl = GLOBAL.BASE +  "admin/ads/adspicture/search?q=id=" + data.id;
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
			
			// 保存当前对象值
			currentLastData = lastdata;
			if(null == lastdata){
				// 清除本地store的数据
				var cacheKeyList = ["currentSelectRowData" + MODULENAME,"currentOptType" + MODULENAME];
				basearchiveUtil.clearStoreCache(cacheKeyList);
				
				basearchiveUtil.jumpToHtml(tableUrl);
			}
			
			if (com_id != 'undefined' && com_id != null)
				com_id.attr('value', lastdata.id);
			if (com_name != 'undefined' && com_name != null)
				com_name.attr("value", lastdata.name);
			if (com_url != 'undefined' && com_url != null)
				com_url.attr("value", lastdata.url);
			if (com_description != 'undefined' && com_description != null)
				com_description.attr("value", lastdata.description);
			if (com_position != 'undefined' && com_position != null)
				com_position.attr("value", lastdata.position_id);
			if (com_imagekey != 'undefined' && com_imagekey != null)
				com_imagekey.val(data.imagekey);
			
			if (com_daterange   != 'undefined' && com_daterange   != null){
				basearchiveUtil.initDateRange({
					com_daterange : com_daterange,
					start : lastdata.starttime,
					end : lastdata.endtime,
				})
			}
			// 将记录的上传的文件清除
			clearImageMap($('#hidden_imagekey').attr("value"));
		}
	}
	
	// 新建新闻时，获得图片key
	function getImageKey() {
		$.ajax({
			async : false,
			dataType : 'json',
			contentType : "application/json;charset=UTF-8",
			type : "GET",
			url : GLOBAL.BASE + "imageupload/imagekey",
			success : function(resultdata) {
				if('000000' != resultdata.flag){
					// 显示错误信息
					bootbox.alertTimeout(resultdata.desc);
				} else {
					com_imagekey.attr("value", resultdata.data);
				}
			},
			error : function(XMLHttpRequest, textStatus, errorThrown) {
				bootbox.alertTimeout('初始化数据出现错误！');
			},
		});
	}

	// 编辑对象时，需要将已经记录的上传的文件删除
	function clearImageMap(imagekey){
		var requstUrl = GLOBAL.BASE + "imageupload/clearimagemap";
		
		$.ajax({
	        type : "POST",
	        async:false,
	        dataType : "text",
	        url:requstUrl,
	        data:{imagekey:imagekey},
	        success : function(data)
	        {
	        	 
	        },
	        error : function(XMLHttpRequest, textStatus, errorThrown) {
				 
			}
	    });
	}
	
	// 取消了，需要将上传的文件删除
	function deleteCancelImage(optType,imagekey){
		var requstUrl;
		if (optType == basearchiveUtil.FORMOPT_CREATE) {
			requstUrl = GLOBAL.BASE + "imageupload/create/cancel";
		} else if(optType == basearchiveUtil.FORMOPT_UPDATE){
			requstUrl = GLOBAL.BASE + "imageupload/update/cancel";
		}
		
		$.ajax({
	        type : "POST",
	        async:false,
	        dataType : "text",
	        url:requstUrl,
	        data:{imagekey:imagekey},
	        success : function(data)
	        {
	        	 
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
			getUIComponent();
			initFormValue(optType,storeRowData);
			
			var picturePath = currentLastData == null ? "" : currentLastData.picture;
			var FileUploadCom = require("imageupload");
			new FileUploadCom({
				attrs : {
					editorid:"editor_picture",
					optType : optType,
					imagekey : com_imagekey.attr("value"),
					picturePath : picturePath,
				},
				renderTo : "img_picture"
			});
			
			// 取消方法
			$('#btn_mct_cancel').die().on('click', function() {
				bootbox.confirm("确认取消？", function(YesOrNo){
					if(YesOrNo){
						// 清除本地store的数据
						var cacheKeyList = ["currentSelectRowData" + MODULENAME,"currentOptType" + MODULENAME];
						basearchiveUtil.clearStoreCache(cacheKeyList);
						// 清除已经上传的文件
						deleteCancelImage(optType,$('#hidden_imagekey').attr("value"));
						basearchiveUtil.jumpToHtml(tableUrl);
					}
				});
			});

			//加载验证，验证表单
			theme.setValidateForm($("#"+COMPONENTID_FORM), fnsubmithandler);
		});
	};
});