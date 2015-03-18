/**
 * 模态对话框：Table组件,选择客户
 * @author: 
 * @date: 2014-6-26
 */
define(function(require, exports, module) {
	var $ = require("$");
	require("bootstrap_commonrequire");
	
	var theme = require('bootstrap_theme');
	var Dialogform = require('modaldialog');
	var dialogId = 'dialog_modal';
	var dialogDivId = 'dialogDiv';
	var table = require("/chain/js/common/basearchive/src/js/basearchive-table");
	var form = require("/chain/js/common/basearchive/src/js/basearchive-form");
	var triggerElementId = "";//触发元素
	
	var formopt_inserturl = "/base/customer";
	var formopt_updateurl = "/base/customer/";
	
	var store = require('store');
	/**
	 * 返回当前商家Id
	 */
	var getStoreId = function() {
		var userInfo = store.get("userInfo");
		if (userInfo)
			return userInfo.storeId;
		else
			return -1;
	};
	
	exports.init = function(param) {
		var Component = new Dialogform({
			attrs : {
				id : dialogId,
				title : '选择客户',
				isOverrideDefaultPositionCss:true,
				customPositionCss:"width:900px;margin-left:-500px;margin-top:-150px",
				items : [ {
					isDiv : true,
					id : dialogDivId,
				} ]
			},
			renderTo : param.attrs.divWrapperId,
			afterRender : function() {		
				
				var nameExistFlag = false;
				
				var commonUtil = require('/chain/js/common/basearchive/src/js/basearchive-util');
				var COMPONENTID_FORM = "validationform_customer";
				var TARGETDIV_FORM = "basearchive_form";
				
				
				var TABLEOPTURL_QUERY="/base/customer?q=storeid=" + getStoreId();;
				var COMPONENTID_TABLE = "selecttable";
				var TARGETDIV_TABLE = "basearchive_table";
				
				var Widget = require("widget");
				var AreaTemplate = require('./add_select_customer.tpl');
				var AreaComponent = Widget.extend({
					template : AreaTemplate,
				});

				new AreaComponent({
					renderTo : dialogDivId
				});				
				
				var optType = commonUtil.FORMOPT_CREATE;
				
				var form_table_param = {
						// Form信息
						form_attr : {
							formitem : {
								spansize : 'span12',
								type : commonUtil.FORMOPT_CREATE, 
								formid : COMPONENTID_FORM,
								targetdiv : TARGETDIV_FORM,
							},
							items : [ {
			    				isHidden : true,
			    				id : 'hidden_id',
			    				name : 'hidden_id',
			    			}, {
			    				isText : true,
			    				label : "客户名称",
			    				id : 'text_name',
			    				name : 'text_name',
			    				type : "text",
			    				style : "width:80%",
			    				placeholder : "请输入客户名称",
			    				validations : {
			    					required : true,
			    					minlength : 1
			    				},
			    			},  {
			    				isTextarea : true,
			    				label : "备注",
			    				id : 'text_tag',
			    				name : 'text_tag',
			    				rows : 10,
			    				type : "textarea",
			    				style : "width:80%",
			    				placeholder : "请输入备注",
			    			} ]
						},
						// Table信息
						table_attr : {
							tableid : COMPONENTID_TABLE,
							targetdiv : TARGETDIV_TABLE,
							requesturl : TABLEOPTURL_QUERY,
							isMultiSelect:false,
							aocolumnDefs : [ {
								"aTargets" : [ 0 ],
								"sTitle" : "客户id",
								"mData" : "id",
								"bVisible" : false,
							}, {
								"aTargets" : [ 1 ],
								"sTitle" : "客户名称",
								"mData" : "name",
							},{
								"aTargets" : [ 2 ],
								"sTitle" : "备注",
								"mData" : "tag",
							}]
						}
					};			
				
				triggerElementId = param.attrs.triggerElementId;				
			
				$('#' + dialogId).modal('hide');
				
				form.init(form_table_param);
				table.init(form_table_param);	
				
				$('#btndialogsave').die().live('click',function() {
					var datatable = $('#selecttable').DataTable();
					
					var rowSels = datatable.$('tr.selected');
					var rowData = datatable.fnGetData(rowSels[0]);
					
					if (rowData != null) {
						var inputElement=$("#"+triggerElementId);
						if(inputElement){			            	
			            	inputElement.attr('value',rowData.name);
			            	inputElement.attr('valueid',rowData.id);							

						}
					}
				});
				
				var addformdiv=document.getElementById("addform");
				var dataTableDiv=document.getElementById("dataForm");
				
				$('#form_btn_create').die().live('click', function() {
					
					cleanUI();					
				    if(addformdiv.style.display=='block') 
				    {
				    	addformdiv.style.display='none'; 
				    	dataTableDiv.style.display='block'; 
				    }else{
				    	addformdiv.style.display='block'; 
				    	dataTableDiv.style.display='none'; 
				    }
				});
				
				var btncancel = $('#btn_mct_cancel');

				// 取消方法
				btncancel.die().live('click', function() {
					bootbox.confirm("确认取消？", function(YesOrNo) {
						if (YesOrNo) {
							addformdiv.style.display='none'; 
							dataTableDiv.style.display='block'; 
						} 
					});
				});
				
//				var btnsave=$('#btn_mct_save');
//				
//				// 保存方法
//				btnsave.die().live('click', function() {
//					
//					// 执行保存操作，返回保存操作的数据
//					var saveResult = fnsubmithandler();
//					if(saveResult){
//						addformdiv.style.display='none'; 
//						table.reloadTable(form_table_param);
//					}
//					
//					return false;
//				});
				
				var resulthandler = function(){
					// 执行保存操作，返回保存操作的数据
					var saveResult = fnsubmithandler();
					if(saveResult){
						addformdiv.style.display='none'; 
						dataTableDiv.style.display='block'; 
						table.reloadTable(form_table_param);
					}
				};
				
				var doSaveAction = function(requestURL,data,optType){
					var ajaxType = "POST";
					if (optType == commonUtil.FORMOPT_UPDATE) {
						ajaxType = "PUT";
					} else{
						ajaxType = "POST";
					}
					
					var saveResult = false;
					$.ajax({
						"async" : false,
						"type" : ajaxType,
						"dataType" : 'json',
						"contentType" : "application/json;charset=UTF-8",
						"url" : requestURL,
						"data" : JSON.stringify(data), 
						"success" : function(resultdata) {
							bootbox.alertTimeout("操作成功！");
							saveResult = true;
						},
						"error" : function(XMLHttpRequest, textStatus, errorThrown) {
							bootbox.alertTimeout("操作失败！");
							saveResult = false;
						}
					});
					return saveResult;
				};
				
				var cleanUI = function(){
					$('#text_name').val("");
					$('#text_tag').val("");
					
				};
				
				var  fnsubmithandler = function(){
					
					if(nameExistFlag) {
						bootbox.alertTimeout('该名称已存在，请选择其它名称');
						return false;
					}
					
					var vid = $('#hidden_id').attr("value");
					var vstoreid = getStoreId();				
					var vcustomername = $('#text_name').attr("value");
					var vtag = $('#text_tag').attr("value");
					
					var data = {
						storeid :vstoreid,
						name:vcustomername,
						tag : vtag,
					};
					
					if (optType == commonUtil.FORMOPT_UPDATE) {
						data.id=vid;
						formopt_updateurl +=vid;
					}
					
					var requestURL = form.getSaveUrl(optType, formopt_inserturl,formopt_updateurl);

					// 访问请求
					var saveResult = doSaveAction(requestURL,data,optType);
					
					return saveResult;
				};
				
				//加载验证，执行保存操作
				theme.setValidateForm($("#"+COMPONENTID_FORM), resulthandler);
				
				var checkUnique = function() {
					var	name = $('#text_name').attr("value");
					var	storeid = getStoreId();
					if(typeof(name) == "undefined" || name == null || $.trim(name) == "") 
						return;
					
					$.ajax({
						type : "GET",
						contentType : "application/json;charset=UTF-8",
						url : "/base/customer?q=storeid=" + storeid + ";name=" + name,
						dataType : 'json',
						success : function(resultdata) {
							if('000000' != resultdata.flag){
								bootbox.alertTimeout(resultdata.desc);
								nameExistFlag = false;
							}
							
							var receiptList = resultdata.data;
							if(receiptList != null && receiptList.length > 0){
								nameExistFlag = true;
								bootbox.alertTimeout('该名称已存在，请选择其它名称');
							}
							else
								nameExistFlag = false;
						},

						error : function(resultdata) {
							bootbox.alertTimeout('检查名称是否存在时报错');
						}
					});
				};
				
				
				// 校验姓名
				$("#text_name").blur(function() {
					checkUnique();	
				});
				
			}
		});
		return Component;
	};

	exports.show = function(data) {
		$('#' + dialogId).modal('show');
	};
});
