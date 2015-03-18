/**
 * 新闻：表单
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
	
	var FORMOPTURL_QUERY ="querynews.action";
	var FORMOPTURL_INSERT= "addnews.action";
	var TARGETDIV_FORM = "basearchive_form";
	var MODULENAME = "news";
	var COMPONENTID_FORM = "validationform" + "_" + MODULENAME;
	
	var typeUrl = GLOBAL.HTML_HOME + "admin/sys/news/sys_news_publish_table.html";

	var editor;
	var baseRoot = GLOBAL.BASE;
	// 保存当前最新从数据库中查询出的对象
	var currentLastData = null;
	
	var param = {
		// Form信息
		form_attr : {
			formitem : {
				title : "新闻",
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
				name : "text_title",
				id : "text_title",
				validations : {
					required : true,
					minlength : 1,
					maxlength : 255
				},
				type : "text",
				style : "width:80%",
				placeholder : "标题"
			},{
				isText : true,
				id : 'text_newstype',
				name : "text_newstype",
				label : "当前新闻类型",
				type : "text",
				style : "width:50%",
				readonly:true,
			},
			{
				isDatepicker : true,
				id : 'text_datetime',
				name : 'text_datetime',
				style : "width:80%",
				label : '发布时间',
			},
			{
				isDiv : true,
				id : 'img_cover_picture',
				name : 'img_cover_picture',
				style : "width:80%",
				label : '封面照片',
			},
			{
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
	var com_title = $('#text_title');
	var com_newstype = $('#text_newstype');
	var com_imagekey = $('#hidden_imagekey');
	var com_datetime= $('#text_datetime');
	//------------组件开始>
	
	function getUIComponent(){
		//------------<组件开始
		com_id = $('#hidden_id');
		com_title = $('#text_title');
		com_newstype = $('#text_newstype');
		com_imagekey = $('#hidden_imagekey');
	    com_datetime= $('#text_datetime');
		
		//------------组件开始>
	}
	
	// 初始化Form组件
	var initFormComponent = function() {
		com_datetime.datetimepicker({
	language : 'zh-CN',
	pickTime : true,
	format : "yyyy-MM-dd hh:mm:ss",
});
	}
	
//	var initFormEvents = function(){
//		basearchiveUtil.initValidateSelect2Events({
//			select2Id : "text_newstypeid",
//		});
//	}
	
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
		var vtitle = com_title.attr("value"); //标题
		var vnewstype = com_newstype.attr("value"); //新闻类别
		var vcontent = UE.getEditor('text_description').getContent(); //内容
		var vimagekey = com_imagekey.attr("value"); // 文件key 
		var vimageList = getAllImage();
		var date_picker = com_datetime.data('datetimepicker');
		var date_localDate = date_picker.getLocalDate();
		var userinfo=store.get("userinfo");
		var veditor=userinfo.username;
		if(vcontent == null || vcontent == "" || $.trim(vcontent) == ""){
			bootbox.alertTimeout("内容不能为空！");
			return;
		}
		var publishstatus ;
		if(userinfo.usertype==3)
			{
			publishstatus ="通过";
			}
		else{publishstatus ="待定";}
		
//		var publishedUserEntity = {
//				id : userEntity.id
//		}
//		var newsTypeEntity = {
//				id : vnewstype,
//		};
		
//		var newsEntity ={
//			title : vtitle,
//			newsTypeEntity : newsTypeEntity,
////			news_abstract:vcontentabstract,
//			news_content:vcontent,
////			publishedUserEntity : publishedUserEntity,
//			imagekey : vimagekey,
//		};
			
//		var postData ={
//				currentEntity : newsEntity,
//				imagelist : vimageList,
//		}
		
		var saveResult = false;
		loader.loading("正在保存，请稍等……");
		$.ajax({
			type : "POST",
			dataType : 'json',
			url : FORMOPTURL_INSERT,
			data : {
				title : vtitle,
				id:vid,
				content:vcontent,
				imagelist : vimageList,
				type:vnewstype,
				imagekey:vimagekey,
				time:date_localDate,
				status:publishstatus,
				editor:veditor
			},
			success : function(resultdata) {
				loader.noloading();
				if('000000' != resultdata.ret.flag){
					doResult = false; 	// 保存出错
					// 显示错误信息
					bootbox.alertTimeout(resultdata.ret.desc);
				} else {
					doResult = true;
					bootbox.alertTimeout("保存成功！");
					// 跳转到登录界面
					basearchiveUtil .jumpToHtml(typeUrl);
				}
			},
			error : function(XMLHttpRequest, textStatus, errorThrown) {
				saveResult = false;
				bootbox.alertTimeout("操作失败！");
			}
		});
		
		if (saveResult) {
			// 清除本地store的数据
//			var cacheKeyList = ["currentSelectRowData" + MODULENAME,"currentOptType" + MODULENAME];
//			basearchiveUtil.clearStoreCache(cacheKeyList);
			// 界面跳转
			basearchiveUtil.jumpToHtml(typeUrl);
		} else {
			return false;
		}
	};

	
	
	// 初始化Form数据，新建和编辑时
	function initFormValue(data){
			var type =store.get("typename");
			if (com_id != 'undefined' && com_id != null)
				com_id.val("");
			if (com_title != 'undefined' && com_title != null)
				com_title.val("");
			if (com_newstype != 'undefined' && com_newstype != null){
				com_newstype.val(type);
			}
			var date_picker = com_datetime.data('datetimepicker');
			date_picker.setLocalDate(new Date());
			getImageKey();// 初始化图片key
			initUeditor(null);  //初始化文本内容
	}
	
	// 新建时，获得图片key
	function getImageKey(){
		$.ajax({
			async : false,
			dataType : 'json',
			type : "POST",
	        url:"getfilekey.action",
	        success : function(data)
	        {
	        	$("#hidden_imagekey").attr("value", data.ret.data);
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
				imageUrl: baseRoot+ "js/tool/ueditor-1.3.6/jsp/imageUp.jsp" ,
				imagePath: "/News/js/tool/ueditor-1.3.6/jsp/",
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
		var requstUrl ="clearimage.action";
		
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
	function deleteCancelImage(imagekey){
		var requstUrl = "createcanceldeleteimage.action";
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
	
//	var validateForm = function() {
//		// 校验框架可以校验的控件
//		var selector = $("#" + COMPONENTID_FORM);
//		var checkResult = selector.validate().form();
//		// 校验框架不可以校验的控件
//	   checkResult =  basearchiveUtil.validateSelect2({
//			select2Id : "text_newstypeid",
//		}) && checkResult;
//		return checkResult;
//	}
	
	exports.init = function(){
		$(document).ready(function() {
			// 初始化组件
			form.init(param);
			
			// 获得UI组件，方便使用
			getUIComponent();
			initFormComponent();
//			initFormEvents();
			// 初始化界面值
			var storeRowData = store.get("currentSelectRowData" + MODULENAME);
			
			var FileUploadCom = require("imageupload");
			new FileUploadCom({
				attrs : {
				},
				renderTo : "img_cover_picture"
			});
			initFormValue(storeRowData);
			
			// 保存
			$('#btn_mct_save').die().on('click',function(){
				fnsubmithandler();
			});
			$('#form_btn_return').die().live('click', function() {
				
				basearchiveUtil.jumpToHtml(typeUrl);
			});
			
			// 取消方法
			$('#btn_mct_cancel').die().on('click', function() {
				bootbox.confirm('确认取消？',function(YesOrNo){
					if(YesOrNo){
						// 清除本地store数据
//						var cacheKeyList = ["currentSelectRowData" + MODULENAME,"currentOptType" + MODULENAME];
//						basearchiveUtil.clearStoreCache(cacheKeyList);
						// 清除已经上传的文件
//						deleteCancelImage(optType,$('#hidden_imagekey').attr("value"));
						
						basearchiveUtil.jumpToHtml(typeUrl);
					}
				});
			});

			//加载验证
			theme.setValidateForm($("#" + COMPONENTID_FORM), $.noop());
		});
	};
});