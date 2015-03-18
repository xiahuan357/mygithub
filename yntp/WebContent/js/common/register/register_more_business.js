/**
 * 如果是商家，还需要填写商家信息
 */
define(function(require, exports, module) {

	var $ = require("$");
	require("bootstrap_commonrequire");
	require("bootbox.css");

	var bootbox = require('bootbox');
	var theme = require('bootstrap_theme');
	var store = require('store');

	var basearchiveUtil = require('basearchive-util');
	var form = require('basearchive-form');

	var TARGETDIV_FORM = "basearchive_form";
	var COOPERATIONCONSTANT = "businessinfo";

	var COMPONENTID_FORM = "validationform" + "_" + COOPERATIONCONSTANT;

	var form_param = {
		// Form信息
		form_attr : {
			formitem : {
				title : "商家用户详细信息",
				spansize : 'span12',
				type : basearchiveUtil.FORMOPT_CREATE, // create 创建 ; update 更新
				formid : COMPONENTID_FORM,
				isShowButtons : false,
				boxContentStyle : "box-content  "
			},
			items : [ {
				isText : true,
				label : "地址",
				id : 'text_address',
				name : 'text_address',
				type : "text",
				style : "width:80%",
				placeholder : "请输入地址",
				validations : {
					required : true,
					maxlength : 255,
				},
			}, {
				isText : true,
				label : "营业执照号码",
				id : 'text_license_code',
				name : 'text_license_code',
				type : "text",
				style : "width:80%",
				placeholder : "营业执照号码",
				validations : {
					required : true,
					maxlength : 255,
				},
			},{
				isDiv : true,
				id : 'img_license_picture',
				name : 'img_license_picture',
				style : "width:80%",
				label : '营业执照照片',
			},  {
				isText : true,
				label : "组织机构号码",
				id : 'text_organization_code',
				name : 'text_organization_code',
				type : "text",
				style : "width:80%",
				placeholder : "组织机构号码",
				validations : {
					required : true,
					maxlength : 255,
				},
			}, {
				isDiv : true,
				id : 'img_organization_picture',
				name : 'img_organization_picture',
				style : "width:80%",
				label : '组织机构照片',
			}, {
				isText : true,
				label : "法人身份证号",
				id : 'text_legalperson_code',
				name : 'text_legalperson_code',
				type : "text",
				style : "width:80%",
				placeholder : "法人身份证号",
				validations : {
					required : true,
					maxlength : 255,
				},
			}, {
				isDiv : true,
				id : 'img_legalperson_picture',
				name : 'img_legalperson_picture',
				style : "width:80%",
				label : '法人身份证照片',
			}, {
				isHidden : true,
				id : 'hidden_imagekey',
				name : 'hidden_imagekey',
			} ]
		}
	};

	//------------<组件开始
	var com_address = $('#text_address');
	var com_license_code = $('#text_license_code');
	var com_organization_code = $('#text_organization_code');
	var com_legalperson_code = $('#text_legalperson_code');
	var com_imagekey = $('#hidden_imagekey');
	//------------组件开始>
	
	function getUIComponent(){
		com_address = $('#text_address');
		com_license_code = $('#text_license_code');
		com_organization_code = $('#text_organization_code');
		com_legalperson_code = $('#text_legalperson_code');
		com_imagekey = $('#hidden_imagekey');
	}
	
	// 初始化Form数据，新建和编辑时
	function initFormValue(optType) {
		if (com_address != 'undefined' && com_address != null)
			com_address.attr("value", "");
		if (com_license_code != 'undefined' && com_license_code != null)
			com_license_code.attr("value", "");
		if (com_organization_code != 'undefined' && com_organization_code != null)
			com_organization_code.attr("value", "");
		if (com_legalperson_code != 'undefined' && com_legalperson_code != null)
			com_legalperson_code.attr("value", "");

		getImageKey();// 初始化图片key
	}

	// 新建新闻时，获得图片key
	function getImageKey() {
		$.ajax({
			async : false,
			dataType : 'json',
			contentType : "application/json;charset=UTF-8",
			type : "GET",
			url : GLOBAL.BASE + "imageupload/imagekey",
			success : function(data) {
				com_imagekey.attr("value", data.data);
			},
			error : function(XMLHttpRequest, textStatus, errorThrown) {
				bootbox.alertTimeout('初始化数据出现错误！');
			}
		});
	}

	// 取消了，需要将上传的文件删除
	exports.deleteCancelImage = function() {
		var imagekey = com_imagekey.attr("value")
		var  requstUrl = GLOBAL.BASE + "imageupload/create/cancel";

		$.ajax({
			type : "POST",
			async : false,
			dataType : "text",
			url : requstUrl,
			data : {
				imagekey : imagekey
			},
			success : function(resultData) {

			},
			error : function(XMLHttpRequest, textStatus, errorThrown) {

			}
		});
	}
	
	exports.getValidateFormId = function(){
		return COMPONENTID_FORM;
	}
	
	exports.getFormData = function(){
		var vaddress = $('#text_address').attr("value");
		var vlicense_code = $('#text_license_code').attr("value");
		var vorganization_code = $('#text_organization_code').attr("value");
		var vlegalperson_code = $('#text_legalperson_code').attr("value");
		var vimagekey = $('#hidden_imagekey').attr("value");
		
		var vlicense_picture = $('#editor_license_picture_path_picture').attr("value");
		var vorganization_picture = $('#editor_organization_picture_path_picture').attr("value");
		var vlegalperson_picture = $('#editor_legalperson_picture_path_picture').attr("value");
		
		var businessEntity = {
				address :vaddress,
				license_code : vlicense_code,
				license_picture : vlicense_picture,
				organization_code : vorganization_code,
				organization_picture : vorganization_picture,
				legalperson_code : vlegalperson_code,
				legalperson_picture : vlegalperson_picture,
				imagekey : vimagekey,
		};
		
		return businessEntity;
	}
	
	exports.init = function(param) {
		$(document).ready(function() {

			form_param.form_attr.formitem.targetdiv = param.attrs.divWrapperId;
			form.init(form_param);
			getUIComponent();
			
			initFormValue(optType);

			var optType = "create";
			var FileUploadCom = require("imageupload");
			new FileUploadCom({
				attrs : {
					editorid:"editor_license_picture",
					optType : optType,
					imagekey : com_imagekey.attr("value"),
				},
				renderTo : "img_license_picture"
			});
			new FileUploadCom({
				attrs : {
					editorid:"editor_organization_picture",
					optType : optType,
					imagekey : com_imagekey.attr("value"),
				},
				renderTo : "img_organization_picture"
			});
			new FileUploadCom({
				attrs : {
					editorid:"editor_legalperson_picture",
					optType : optType,
					imagekey : com_imagekey.attr("value"),
				},
				renderTo : "img_legalperson_picture"
			});
			
			//加载验证，验证表单
			theme.setValidateForm($("#"+COMPONENTID_FORM), $.noop());
		});
	};
});
