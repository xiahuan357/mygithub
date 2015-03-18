/**
 * 新闻分类-form
 */
define(function(require, exports, module) {

	var $ = require("$");
	require("bootstrap_commonrequire");
	require("bootbox.css");
	require('select2.css');
	require('select2');
	var bootbox = require('bootbox');
	var theme = require('bootstrap_theme');
	var store = require('store');
	var loader = require('loader');
	
	var basearchiveUtil = require('basearchive-util');
	var form = require('basearchive-form');
	
	var FORMOPTURL_UPDATE= "updatedepartment.action";
	
	var TARGETDIV_FORM = "basearchive_form";
	var MODULENAME = "usermod";
	
	var COMPONENTID_FORM = "validationform" + "_" + MODULENAME;
	
	var tableUrl = GLOBAL.HTML_HOME + "admin/sys/usermod/sys_user_mod_table.html";
	
	var form_param = {
		// Form信息
		form_attr : {
			formitem : {
				title : "部门变更",
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
				isSelect : true,
				id : 'text_newstype',
				name : "text_newstype",
				label : "部门选择",
				type : "select",
				style : "width:50%",
			}]
		}
	};
	var com_newstype = $('#text_newstype');
	// 初始化Form组件
	var initFormComponent = function() {
		basearchiveUtil.initSelect2Value({
			queryUrl:"gettypeselect.action",
			com_select2 : com_newstype,
			placeholder : "部门选择",
			errorMsg : "初始化部门类型失败",
		});
	}
	
	var initFormEvents = function(){
		basearchiveUtil.initValidateSelect2Events({
			select2Id : "text_newstype",
		});
	}
	
	// 保存
	var fnsubmithandler = function(){
		var vnewtype = com_newstype.val(); //新闻类别
		var vid = $('#hidden_id').attr("value");
		//------------------------
		var data = {
		    department:vnewtype,
			id:vid    //用户id
		};

		var requestURL = FORMOPTURL_UPDATE;
		var saveResult = form.doSaveAction(requestURL,data,"update");
		
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
	function initFormValue(data){
		var hidden_id = $('#hidden_id');
		var text_name = $('#text_name');
		var storeRowData = store.get("currentSelectRowData" + MODULENAME);
			if (hidden_id != 'undefined' && hidden_id != null)
				hidden_id.attr('value', storeRowData.id);//用户id
			if (com_newstype != 'undefined' && com_newstype != null)
				com_newstype.select2("val","");
		}
	
	exports.init = function(){
		$(document).ready(function() {
			// 当前操作：编辑
			var storeRowData = store.get("currentSelectRowData" + MODULENAME);
			form.init(form_param);
			com_newstype = $('#text_newstype');
			initFormComponent();
			initFormEvents();
			initFormValue(storeRowData);
			
			 $('#form_btn_return').die().live('click', function() {
					
					basearchiveUtil.jumpToHtml(tableUrl);
				});
			// 取消方法
			$('#btn_mct_cancel').die().on('click', function() {
				bootbox.confirm("确认取消？", function(YesOrNo){
					if(YesOrNo){
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