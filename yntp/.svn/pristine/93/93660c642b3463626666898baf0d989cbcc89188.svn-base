/**
 * 普通用户扩展信息
 */
define(function(require, exports, module) {

	var $ = require("$");
	require("bootstrap_commonrequire");
	require("bootbox.css");
	require('select2.css');
	require('select2');
	var userutil = require("userutil");
	var userid = userutil.getUserInfo().id;
	var bootbox = require('bootbox');
	var theme = require('bootstrap_theme');
	var store = require('store');
	var loader = require('loader');
	var bootbox = require('bootbox');

	var basearchiveUtil = require('basearchive-util');
	var form = require('basearchive-form');
	
	var TARGETDIV_FORM = "basearchive_form";
	var MODULENAME = "scenicticket";
	var COMPONENTID_FORM = "validationform" + "_" + MODULENAME;

	var indexUrl =GLOBAL.HTML_HOME + "admin/customer/common/baseinfoindex.html";
	var editor;
	var baseRoot = GLOBAL.BASE;
	// 保存当前最新从数据库中查询出的对象
	var currentLastData = null;
	var param = {
		// Form信息
		form_attr : {
			formitem : {
				title : "个人资料",
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
			}, {
				isText : true,
				label : "真实姓名",
				name : "text_name",
				id : "text_name",
				type : "text",
				style : "width:50%",
			}, {
				isText : true,
				label : "证件号码",
				name : "text_personcode",
				id : "text_personcode",
				type : "text",
				style : "width:50%",
			}, {
				isDatepicker : true,
				id : 'birthday',
				name : 'birthday',
				style : "width:50%",
				label : '生日',
			},
		   {
			isText : true,
			label : "昵称",
			name : "text_nickname",
			id : "text_nickname",
			type : "text",
			style : "width:50%",
	     	}, 
	     	{
	     		isSelect : true,
	     		label : "性别",
	     		name : "select_sex",
	     		id : "select_sex",
	     		type : "select",
	     		style : "width:50%",
	     		options : [ {
					value : 1,
					option : "男",
				}, {
					value : 2,
					option : "女",
				} ]
	     	}
			 ]
		},
	};

	// ------------<组件开始
	var com_id = $('#hidden_id');
	var com_name = $('#text_name');
	var com_nickname = $('#text_nickname');
	var com_personcode = $('#text_personcode');
	var com_sex= $('#select_sex');
	var com_birthday
	// ------------组件开始>

	function getUIComponent() {
		// ------------<组件开始
		 com_id = $('#hidden_id');
		 com_name = $('#text_name');
		 com_nickname = $('#text_nickname');
		 com_personcode = $('#text_personcode');
		 com_sex= $('#select_sex');
		 com_birthday=$('#birthday');
		// ------------组件开始>
	}

	// 保存
	var fnsubmithandler = function() {
		var FORMOPTURL_UPDATE = GLOBAL.BASE + "admin/sys/user/userinfo/update";
		var vid = com_id.attr("value"); // 编码
		var vname = com_name.attr("value"); //  
		var vnickname = com_nickname.attr("value"); //  
		var vpersoncode = com_personcode.attr("value"); //  
		var vsex = com_sex.val();
		var birthday_picker = com_birthday.data('datetimepicker');
		var vbirthday=birthday_picker.getLocalDate();
		var requestURL;

		var currentEntity = {
				name :vname,
				vpersoncode :vpersoncode,
				sex: vsex,
				nickname : vnickname,
				user_id:userid,
				birthday:vbirthday,
				
		}
			currentEntity.id = vid;
			requestURL = FORMOPTURL_UPDATE + "/" + vid;
		$.ajax({
			async: false,
			type : "POST",
			url : requestURL,
			data : currentEntity,
			success : function(data) {
				bootbox.alertTimeout("修改成功！");
				basearchiveUtil.jumpToHtml(indexUrl);
			},
			error : function(XMLHttpRequest, textStatus, errorThrown) {
				bootbox.alertTimeout("操作失败！");
			}
		});

	};

	// 初始化Form数据，新建和编辑时
	function initFormValue() {

		var FORMOPTURL_QUERY = GLOBAL.BASE + "admin/sys/user/userinfo/search/?q=user_id=" + userid;
			// 重新从数据库中读取数据
			var lastdata = null;
			$.ajax({
				async : false,
				type : "GET",
				dataType : 'json',
				contentType : "application/json;charset=UTF-8",
				url : FORMOPTURL_QUERY,
				success : function(resultdata) {
					if ('000000' != resultdata.flag) {
						bootbox.alertTimeout('查询数据出现错误，请刷新重试！');
						lastdata = null; // 查询出错
					} else {
						var receiptList = resultdata.data;
						if (receiptList != null && receiptList.length > 0) {
							lastdata = receiptList[0];
						} else {
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
			if (null == lastdata) {
				// 清除本地store的数据
				basearchiveUtil.jumpToHtml(indexUrl);
			}
			if (com_id != 'undefined' && com_id != null)
				com_id.val(lastdata.id);
			if (com_name != 'undefined' && com_name != null)
				{
				if(lastdata.name=="null")
					{
					com_name.val("");
					}
				else
					com_name.val(lastdata.name);
				}
			if (com_nickname!= 'undefined' && com_nickname!= null)
				{
				if(lastdata.nickname=="null")
				{
					com_nickname.val("");
				}
			else
				com_nickname.val(lastdata.nickname);
			}
			if (com_personcode  != 'undefined' && com_personcode!= null){
				if(lastdata.person_code=="null")
				{
					com_personcode.val("");
				}
			else
				com_personcode.val(lastdata.person_code);
			}
 			if (com_sex!= 'undefined' && com_sex!= null){
 				if(lastdata.sex==0||lastdata.sex=="null")
				{
 					com_sex.val("");
				}
			else
				com_sex.val(lastdata.sex);
			}
 			var birthday_picker = com_birthday.data('datetimepicker');
 			if(lastdata.birthday=="null")
			{
 				birthday_picker.setLocalDate(new Date(""));
			}
		else
 			birthday_picker.setLocalDate(new Date(lastdata.birthday));
		
	}
	
	exports.init = function() {
		$(document) .ready( function() {
			// 初始化组件
			form.init(param);

			// 获得UI组件，方便使用
			getUIComponent();
			com_birthday.datetimepicker({
					language : 'zh-CN',
					pickTime : false,
					format : "yyyy-MM-dd",
				});
			initFormValue();

			// 取消方法
			$('#btn_mct_cancel') .die() .on( 'click', function() {
						basearchiveUtil .jumpToHtml(indexUrl);
			});
			$('#form_btn_return').die().live('click', function() {
				
				basearchiveUtil.jumpToHtml(indexUrl);
			});
			//保存方法
			$('#btn_mct_save') .die() .on( 'click', function() {
				fnsubmithandler();
	});
			//加载验证
			theme.setValidateForm($("#" + COMPONENTID_FORM), $.noop());
		});
	};
});