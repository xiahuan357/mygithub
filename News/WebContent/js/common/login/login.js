/**
 * 登录界面
 */
define(function(require, exports, module) {

	var $ = require("$");
	require("bootstrap_commonrequire");
	
	// 控制是否启用验证码
	var useValidate;
//	= isUsevalidate();
	// 验证码时间戳
	var timeStamp;
	// 加载验证码
	function loadImage(){
		timeStamp = new Date().getTime() + Math.random();
		var url = GLOBAL.BASE + "front/generatecode?ts=" + timeStamp;
		$("#codeImage").attr("src",url);
	}
	
	// 是否启用验证码
	function isUsevalidate(){
		var inputval= $("#code").attr("value");
		var url = GLOBAL.BASE + "front/login/usevalidate";
		var isUsevalidate;
		$.ajax({
			async : false,
			type : "GET",
			url : url,
			success : function(resultdata) {
				isUsevalidate = resultdata;
			},
			error : function(XMLHttpRequest, textStatus, errorThrown) {
				isUsevalidate = true;
			}
		});
		return isUsevalidate;
	}
	
	// 校验验证码
	function checkcode(){
    	var inputval= $("#code").attr("value");
    	var url = GLOBAL.BASE + "front/checkcode";
     	var data={
   			userinput : inputval,
   			ts : timeStamp,
     	}
     	var checkResult;
     	$.ajax({
 			async : false,
 			type : "GET",
 			url : url,
 			data : data,
 			success : function(resultdata) {
					checkResult = resultdata;
 			},
 			error : function(XMLHttpRequest, textStatus, errorThrown) {
 				checkResult = false;
 			}
 		});
     	return checkResult;
    }
	
	// 登录
	function doLogin(){  
		var loginurl = "backgroundlogin.action"; 
		var queryuser = "backgroundlogininfo.action";
	    var username= $("#username").val();  
	    var password= $("#password").val();  
	    var validcode = $("#code").val();  
	    
	    if(username == null || $.trim(username) == "" || typeof(username) == "undefined"){
	    	$("#msg").html("用户名不能为空！");
			return;
		}
		if(password == null || $.trim(password) == "" ||typeof(password) == "undefined"){
			$("#msg").html("密码不能为空！");
			return;
		}
//		if(useValidate && (validcode == null ||$.trim(validcode) == "" || typeof(validcode) == "undefined")){
//			$("#msg").html("验证码不能为空！");
//			return;
//		}
		// 校验验证码
//		if(useValidate && !checkcode()){
//			$("#msg").html("验证码不对，请重新输入！");
//			loadImage();
//			return;
//		}
		
		var remeberme = $("#remember_me");
		var remebermeVal="";
		// if(remeberme.checked == true){
		// 		remebermeVal = "&rememberme=1";
		// }
	    $.ajax({  
	        url:loginurl,  
	        type:"POST",  
	        dataType : 'json',
	        data:{
	        	username:username,
	        	password:password
	        },  
	        success: function(resultdata){  
					var store = require("store");
					var userInfo;
					userInfo=resultdata.user;
					store.set("userinfo",userInfo);
					if(userInfo != null){
						if(userInfo.usertype == 4){
						window.location=GLOBAL.URL.INDEX;
					} else {
							window.location=GLOBAL.URL.ADMIN_INDEX;
					}
					
				}
	        },
	        error : function(XMLHttpRequest, textStatus, errorThrown) {
	        	$("#msg").html("系统出现错误，请重试！");
 			}
	    }); 
	}  
	
	$(document).ready(function() {
		if(useValidate){
//			loadImage();
		}
	});    
	
	// 实例化组件-------------------------START
	var template = require("./login.tpl");
	var Widget = require("widget");	
	var Component = Widget.extend({
		template : template,
		// 初始化参数
		initCustAttr : function() {
			// 输入项初始化
			var attrs = this.get("attrs");
			attrs.isusevalidate = useValidate;
		},
		afterRender : function() {
			$("#codeImage").die().on("click",function(){
				loadImage();
			});
			$("#btn_login").die().on("click",function(){
				doLogin();
			});
			$("#btn_register").die().on("click",function(){
				window.location=GLOBAL.URL.REGISTER
			});

		    $("body").keydown(function() {
				if (event.keyCode == "13") {// keyCode=13是回车键
					$('#btn_login').click();
				}
			});
			  
		}
	});
	module.exports = Component;	
});