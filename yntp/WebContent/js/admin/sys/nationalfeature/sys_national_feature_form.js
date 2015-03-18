/**
 * 名族特色：表单
 */
define(function(require, exports, module) {

	var $ = require("$");
	require("bootstrap_commonrequire");
	require("bootbox.css");

	//------------<ue
	require('ueditor.config-1.3.6');
	require('ueditor.all-1.3.6');
	require('ueditor-zh-cn-1.3.6');
	//------------ue>
	
	var bootbox = require('bootbox');
	var theme = require('bootstrap_theme');
	var store = require('store');
	var loader = require('loader');
	var bootbox = require('bootbox');
	
	var basearchiveUtil = require('basearchive-util');
	var form = require('basearchive-form');
	var userutil = require("userutil");
	
	var FORMOPTURL_QUERY = GLOBAL.BASE + "admin/nationalfeature/nationalfeature/search";
	var FORMOPTURL_INSERT= GLOBAL.BASE + "admin/nationalfeature/nationalfeature/createwithimage";
	var FORMOPTURL_UPDATE= GLOBAL.BASE + "admin/nationalfeature/nationalfeature/updatewithimage";
	
	var TARGETDIV_FORM = "basearchive_form";
	var MODULENAME = "nationalfeature";
	
	var COMPONENTID_FORM = "validationform" + "_" + MODULENAME;
	
	var tableUrl = GLOBAL.HTML_HOME + "admin/sys/nationalfeature/sys_national_feature_table.html";

	var editor;
	var baseRoot = GLOBAL.BASE;
	// 保存当前最新从数据库中查询出的对象
	var currentLastData = null;
	var param = {
		// Form信息
		form_attr : {
			formitem : {
				title : "民族特色",
				spansize : 'span12',
				type : basearchiveUtil.FORMOPT_CREATE, // create 创建 ; update 更新
				formid : COMPONENTID_FORM,
				targetdiv : TARGETDIV_FORM,
			},
			items : [ {
				isHidden : true,
				id : "hidden_id",
				name : "hidden_id",
				value : ""
			},{
				isText : true,
				label : "标题",
				name : "text_name",
				id : "text_name",
				validations : {
					required : true,
					minlength : 1,
					maxlength : 255
				},
				type : "text",
				style : "width:80%",
				placeholder : "标题"
			},{
				isTextarea : true,
				label : "摘要",
				id : 'textarea_abstract',
				name : "textarea_abstract",
				rows : 10,
				type : "textarea",
				style : "width:80%",
				placeholder : "摘要",
				validations : {
					required : true,
					maxlength : 500
				}
			}, {
				id : 'text_description',
				isUEditor : true,
				name : 'text_description',
				label : '内容',
				style : "width:100%"
			} , {
				isHidden : true,
				id : 'hidden_imagekey',
			} 
		    ],
		    buttons : [ {
				text : "发布",
				id : "btn_mct_save",
				type : "submit",
				style : "btn btn-primary contrast-background",
				name : "submit",
			}, {
				text : "取消",
				id : "btn_mct_cancel",
				type : "button",
				style : "btn",
				name : "cancel",
			} ]
		},
	};
	
	//------------<组件开始
	var com_id = $('#hidden_id');
	var com_name = $('#text_name');
	var com_abstract = $('#textarea_abstract');
	var com_imagekey = $('#hidden_imagekey');
	//------------组件开始>
	
	function getUIComponent(){
		//------------<组件开始
		com_id = $('#hidden_id');
		com_name = $('#text_name');
		com_abstract = $('#textarea_abstract');
		com_imagekey = $('#hidden_imagekey');
		//------------组件开始>
	}
	
	// 获得所有图片
    function getAllImage(){
    	var root = UE.htmlparser(editor.getContent(), true);
    	var imgs = new Array();
    	var imgs = root.getNodesByTagName('img' );
    	var imgSrcList = new Array();
    	if(imgs == null){
    		return imgSrcList;
    	}
    	
    	for(var i =0;i<imgs.length;i++){
    		imgSrcList.push(imgs[i].getAttr('src'));
    	}
    	return imgSrcList;
    } 
    
	// 保存
	var fnsubmithandler = function(){
		var vid = com_id.attr("value"); //编码
		var vname = com_name.attr("value"); //标题
		var vcontentabstract = com_abstract.attr("value"); //内容摘要
		var vcontent = UE.getEditor('text_description').getContent(); //内容
		var vimagekey = com_imagekey.attr("value"); // 文件key 
		var vimageList = getAllImage();

		if(vcontent == null || vcontent == "" || $.trim(vcontent) == ""){
			bootbox.alertTimeout("内容不能为空！");
			return;
		}
		
		var optType = store.get("currentOptType" + MODULENAME);
		var requestURL;
		var requestType;
		var publishedUserEntity = {
				id : userutil.getUserId(),
		};
		
		var nationalFeatureEntity ={
			name : vname,
			nationalfeature_abstract:vcontentabstract,
			nationalfeature_description:vcontent,
			publishedUserEntity : publishedUserEntity,
			imagekey : vimagekey,
		};
			
		if (optType == basearchiveUtil.FORMOPT_UPDATE) {
			nationalFeatureEntity.id=vid;
			nationalFeatureEntity.createtime = new Date(currentLastData.createtime).format("yyyy-MM-dd hh:mm:ss");
			requestURL = FORMOPTURL_UPDATE  + "/" + vid;
		} else {
			requestURL = FORMOPTURL_INSERT;
		}
		
		var postData ={
				currentEntity : nationalFeatureEntity,
				imagelist : vimageList,
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
			// 界面跳转
			basearchiveUtil.jumpToHtml(tableUrl);
		} else {
			return false;
		}
	};

	// 初始化Form数据，新建和编辑时
	function initFormValue(optType,data){
		
		if (optType == basearchiveUtil.FORMOPT_CREATE) { //新增，清空数据
			if (com_id != 'undefined' && com_id != null)
				com_id.val("");
			if (com_name != 'undefined' && com_name != null)
				com_name.val("");
			if (com_abstract != 'undefined' && com_abstract != null)
				com_abstract.val("");
			
			getImageKey();// 初始化图片key
			initUeditor(null);  //初始化文本内容
		} else if (optType == basearchiveUtil.FORMOPT_UPDATE) { //修改，回填数据
			
			// 重新从数据库中读取数据
			var queryUrl = FORMOPTURL_QUERY + "?q=id=" + data.id;
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
				com_id.val(data.id);
			if (com_name != 'undefined' && com_name != null)
				com_name.val(data.name);
			if (com_imagekey != 'undefined' && com_imagekey != null)
				com_imagekey.val(data.imagekey);
			if (com_abstract != 'undefined' && com_abstract != null)
				com_abstract.val(data.nationalfeature_abstract);
			
			initUeditor(data.nationalfeature_description);  //初始化文本内容
			// 将记录的上传的文件清除
			clearImageMap($('#hidden_imagekey').attr("value"));
		}
	}
	
	
	// 新建时，获得图片key
	function getImageKey(){
		$.ajax({
			async : false,
			dataType : 'json',
			contentType : "application/json;charset=UTF-8",
			type : "GET",
	        url:GLOBAL.BASE + "imageupload/imagekey",
	        success : function(data)
	        {
	        	$("#hidden_imagekey").attr("value", data.data);
	        },
	        error : function(XMLHttpRequest, textStatus, errorThrown) {
	        	bootbox.alertTimeout('初始化数据出现错误！');
			}
	    });
	}
	
	/**
	 * 初始化富文本
	 */
	function initUeditor(content){
		var option = {
    			imageUrl: GLOBAL.BASE + "imageupload/ueditorpicupload?imagekey=" + $('#hidden_imagekey').attr("value"),
				imagePath: baseRoot,
    			initialFrameHeight:320,
    	        autoClearinitialContent:true,  //是否自动清除编辑器初始内容
    	        elementPathEnabled  :  false,
    	};
    	
    	editor = new UE.ui.Editor(option);
    	editor.render("text_description");
    	
		if(content == null){
			UE.getEditor('text_description',option).ready(function(){
				this.setContent("");
        	});
		} else{
			UE.getEditor('text_description',option).ready(function(){
				this.setContent(content);
        	});
		}
		// 设置编辑框的宽度
		$(".edui-editor").css("width","99%");
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
			// 初始化组件
			form.init(param);
			
			// 获得UI组件，方便使用
			getUIComponent();
			
			// 初始化界面值
			var storeRowData = store.get("currentSelectRowData" + MODULENAME);
			var optType = store.get("currentOptType" + MODULENAME);
			
			initFormValue(optType,storeRowData);
			
			// 取消方法
			$('#btn_mct_cancel').die().on('click', function() {
				bootbox.confirm('确认取消？',function(YesOrNo){
					if(YesOrNo){
						// 清除本地store数据
						var cacheKeyList = ["currentSelectRowData" + MODULENAME,"currentOptType" + MODULENAME];
						basearchiveUtil.clearStoreCache(cacheKeyList);
						// 清除已经上传的文件
						deleteCancelImage(optType,$('#hidden_imagekey').attr("value"));
						
						basearchiveUtil.jumpToHtml(tableUrl);
					}
				});
			});

			//加载验证
			theme.setValidateForm($("#"+COMPONENTID_FORM), fnsubmithandler);
		});
	};
});