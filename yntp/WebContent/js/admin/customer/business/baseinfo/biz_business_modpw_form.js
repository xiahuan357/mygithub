/**
 * 商家修改密码-form
 */
define(function(require, exports, module) {

	var $ = require("$");
	require("bootstrap_commonrequire");
	require("bootbox.css");

	var bootbox = require('bootbox');
	var theme = require('bootstrap_theme');
	var loader = require('loader');
	var userutil = require("userutil");
	var userid = userutil.getUserInfo().id;
	var basearchiveUtil = require('basearchive-util');
	var form = require('basearchive-form');
	var TARGETDIV_FORM = "basearchive_form";
	var MODULENAME = "modpw";
	var COMPONENTID_FORM = "validationform" + "_" + MODULENAME;
	var securityinfoUrl= GLOBAL.HTML_HOME+"admin/customer/business/baseinfo/biz_business_securityinfo_form.html";
	var form_param = {
		// Form信息
		form_attr : {
			formitem : {
				title : "密码修改",
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
				label : "当前密码",
				id : 'text_oldpw',
				name : 'text_oldpw',
				type : "password",
				style : "width:50%",
			},
			{
				isText : true,
				label : "新密码",
				id : 'text_newpw',
				name : 'text_newpw',
				type : "password",
				style : "width:50%",
			},
			{
				isDiv : true,
				id : 'leveldiv',
				name : 'leveldiv',
				style : "width:50%",
			},
			{   
				isText : true,
				label : "确认新密码",
				id : 'text_renewpw',
				name : 'text_renewpw',
				type : "password",
				style : "width:50%",
			}
			],
		}
	};
	
	//分析密码安全等级
	function AnalyzePasswordSecurityLevel(password) {
	    var securityLevelFlag = 0;
	    if (password.length < 6) {
	        return 0;
	    }
	    else {
	        if (/[a-z]/.test(password)){
	            securityLevelFlag++;    //lowercase
	        }
	        if (/[A-Z]/.test(password)){
	            securityLevelFlag++;    //uppercase
	        } 
	        if(/[0-9]/.test(password)){
	            securityLevelFlag++;    //digital
	        }
	        if(containSpecialChar(password)){
	            securityLevelFlag++;    //specialcase
	        }
	        return securityLevelFlag;
	    }
	}
	
	function modpw(oldpw,newpw,renewpw)
	{   
		var queryUrl = GLOBAL.BASE+ "admin/sys/user/user/changepassword/?id="
		+userid+"&oldpassword="+oldpw+"&newpassword1="+newpw+"&newpassword2="+renewpw;
		$.ajax({
			async : false,
			type : "POST",
			dataType : 'json',
			contentType : "application/json;charset=UTF-8",
			url : queryUrl,
			success : function(resultdata) {
				loader.noloading();
				if('000000' != resultdata.flag){
					// 显示错误信息
					bootbox.alertTimeout(resultdata.desc);
				} else {
					bootbox.alertTimeout("修改成功！");
					// 跳转到安全设置
					basearchiveUtil .jumpToHtml(securityinfoUrl);
				}
			},
			error : function(XMLHttpRequest, textStatus, errorThrown) {
				loader.noloading();
				bootbox.alertTimeout("操作失败！请重试！");
			}
		});
	}
	
	exports.init = function(){
		$(document).ready(function() {
			// 当前操作：新建，编辑
			form.init(form_param);
			$('#leveldiv').append('<td id="level" class="pw-strength">'+          	
				'<div class="pw-bar"></div>'+
				'<div class="pw-bar-on"></div>'+
				'<div class="pw-txt">'+
				'<span>弱</span>'+
				'<span>中</span>'+
				'<span>强</span>'+
				'</div>'+
				'</td>')
			$('#text_newpw').focus(function(){
			  $('#span1').remove();
			});
			
			$('#text_renewpw').focus(function(){
				 $('#span2').remove();
			});
			
			$('#text_newpw').blur(function()
			{
				var newpw =$('#text_newpw').val();
				var strongRegex = new RegExp("^(?=.{8,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\\W).*$", "g"); 
				var mediumRegex = new RegExp("^(?=.{7,})(((?=.*[A-Z])(?=.*[a-z]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))).*$", "g"); 
				var enoughRegex = new RegExp("(?=.{6,}).*", "g"); 
				if (false == enoughRegex.test($(this).val())) { 
					$('#level').removeClass('pw-weak'); 
					$('#level').removeClass('pw-medium'); 
					$('#level').removeClass('pw-strong'); 
					$('#level').addClass(' pw-defule'); 
					$('#text_newpw').parent().append('<span id="span1" style="color:#b94a48">密码不能小于6位!</span>');
					 //密码小于六位的时候，密码强度图片都为灰色 
					$("#btn_mct_save").attr("disabled", true); 
				} 
				else if (strongRegex.test($(this).val())) { 
					$('#level').removeClass('pw-weak'); 
					$('#level').removeClass('pw-medium'); 
					$('#level').removeClass('pw-strong'); 
					$('#level').addClass(' pw-strong'); 
					 //密码为八位及以上并且字母数字特殊字符三项都包括,强度最强 
					$("#btn_mct_save").attr("disabled", false); 
				} 
				else if (mediumRegex.test($(this).val())) { 
					$('#level').removeClass('pw-weak'); 
					$('#level').removeClass('pw-medium'); 
					$('#level').removeClass('pw-strong'); 
					$('#level').addClass(' pw-medium'); 
					 //密码为七位及以上并且字母、数字、特殊字符三项中有两项，强度是中等 
					$("#btn_mct_save").attr("disabled", false); 
				} 
				else { 
					$('#level').removeClass('pw-weak'); 
					$('#level').removeClass('pw-medium'); 
					$('#level').removeClass('pw-strong'); 
					$('#level').addClass('pw-weak'); 
					 //如果密码为6为及以下，就算字母、数字、特殊字符三项都包括，强度也是弱的 
					$('#text_newpw').parent().append('<span id="span1" style="color:#b94a48">密码强度较弱建议修改！</span>');
					 //密码小于六位的时候，密码强度图片都为灰色 
					$("#btn_mct_save").attr("disabled", false); 
				} 
			});
			
			$('#text_renewpw').blur(function()
			{
				var newpw =$('#text_newpw').val();
				var renewpw =$('#text_renewpw').val();
				if(newpw!=renewpw)
				{
					$('#text_renewpw').parent().append('<span  id="span2" style="color:#b94a48">两次密码不一致!</span>');
				}
			});
			
			$('#btn_mct_cancel') .die() .on( 'click', function() {
				basearchiveUtil.jumpToHtml(securityinfoUrl);
			});
		
			$('#btn_mct_save') .die() .on( 'click', function() {
				var oldpw =$('#text_oldpw').val();
				var newpw =$('#text_newpw').val();
				var renewpw =$('#text_renewpw').val();
				if(newpw!=null&&renewpw!=null)
				{
				if(renewpw!=newpw){
					$('#span2').remove();
					$('#text_renewpw').parent().append('<span   id="span2" style="color:#b94a48">两次密码不一致!</span>');
				}
				else modpw(oldpw,newpw,renewpw);
				}
				else if(renewpw==null)
				{
				$('#span2').remove();
				$('#text_renewpw').parent().append('<span   id="span2" style="color:#b94a48">密码不能为空!</span>');
				}
			else 
			{
			$('#span1').remove();
			$('#text_newpw').parent().append('<span  id="span1" style="color:#b94a48">密码不能为空!</span>');
			}
		});
			
		$('#form_btn_return').die().live('click', function() {
			basearchiveUtil.jumpToHtml(securityinfoUrl);
		});
		
		//加载验证，验证表单
		theme.setValidateForm($("#"+COMPONENTID_FORM), $.noop());
		});
	};
});