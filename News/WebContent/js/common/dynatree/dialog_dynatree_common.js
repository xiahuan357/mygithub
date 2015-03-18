/**
 * 模态对话框：Dynatree组件,树
 * @author: liuchchc shanchong
 * @date: 2014-5-24 19:17:39
 */
define(function(require, exports, module)
{
    var $ = require("$");
    // require("bootstrap");
    require('jquery.dynatree');
    require("bootstrap-dynatree.css");
    var Dialogform = require('modaldialog');
    var dialogId = 'dialogform_modal';
    var dynaTreeId = 'dynaTreeComponent';
    var triggerElementId = "";
   
    //触发元素
    //初始化窗口
    exports.init = function(param)
    {
        var initCustAttr = function()
        {
            // 初始化值组件Id
            dialogId = 'dialogform_modal';
            dynaTreeId = 'dynaTreeComponent';

            // 是否传入对话框id
            var customdialogId = param.attrs.dialogId;
            dialogId = typeof (customdialogId) == "undefined" || customdialogId == null ? dialogId : customdialogId;

            // 是否传入树组件id
            var customdynaTreeId = param.attrs.dynaTreeId;
            dynaTreeId = typeof (customdynaTreeId) == "undefined" || customdynaTreeId == null ? dynaTreeId : customdynaTreeId;
            
            // 是否显示对话框footer,默认不显示
            var isshowfooter = param.attrs.isshowfooter;
            param.attrs.isshowfooter = typeof (isshowfooter) == "undefined" || isshowfooter == null ? false : isshowfooter;
            
            // 是否展开第一级，默认展开
            var isExpendRoot = param.attrs.isExpendRoot;
            param.attrs.isExpendRoot = typeof (isExpendRoot) == "undefined" || isExpendRoot == null ? true : isExpendRoot;
            
            // 树是否缓存，默认不缓存（IE中如果缓存会出现问题）
            var isCache = param.attrs.isCache;
            param.attrs.isCache = typeof (isCache) == "undefined" || isCache == null ? false : isCache;
            
            // 设置选中模式,checkbox默认3；radio默认1
            if (param.attrs.checkBoxOrRadio == 'checkbox')
            {
                var selectModeVal = param.attrs.selectModeVal;
                param.attrs.selectModeVal = typeof (selectModeVal) == "undefined" || selectModeVal == null ? 3 : selectModeVal;
            }
            if (param.attrs.checkBoxOrRadio == 'radio')
            {
            	var selectModeVal = param.attrs.selectModeVal;
                param.attrs.selectModeVal = typeof (selectModeVal) == "undefined" || selectModeVal == null ? 1 : selectModeVal;
            }
            
        };

        initCustAttr();
        var Component = new Dialogform(
        {
            attrs :
            {
                id : dialogId,
                title : param.attrs.title,
                isshowfooter : param.attrs.isshowfooter,
                items : [
                {
                    isDiv : true,
                    id : dynaTreeId,
                }]
            },
            renderTo : param.attrs.divWrapperId,
            afterRender : function()
            {
                $('#' + dialogId).modal('hide');
                var url = param.attrs.url;
                var dynatree = $('#' + dynaTreeId);
                var checkboxtype = "dynatree-checkbox";
                var unselectableData;
                if (param.attrs.checkBoxOrRadio == 'checkbox')
                {
                    checkboxtype = "dynatree-checkbox";
                }
                if (param.attrs.checkBoxOrRadio == 'radio')
                {
                    checkboxtype = "dynatree-radio";
                }
                triggerElementId = param.attrs.triggerElementId;
                unselectableData = param.attrs.unselectableData;
                dynatree.dynatree(
                {
                    imagePath : "../../..//img/tool/dynatree/custom/",
                    autoCollapse : true,
                    fx :
                    {
                        height : "toggle",
                        duration : 200
                    },
                    //children : childrenObj,
                    checkbox : true,
                    classNames :
                    {
                        checkbox : checkboxtype
                    },
                    selectMode : param.attrs.selectModeVal,
                    onActivate : function(node)
                    {
                        node.toggleSelect();
                        if (node.hasChildren())
                        {
                            node.expand(true);
                        }
                    },
                    initAjax :
                    {
                        url : url,
                        type : "GET",
                        data :
                        {
                        }
                    },
                    ajaxDefaults :
                    {
                        cache : param.attrs.isCache,
                        dataType : "json"
                    },
                    strings :
                    {
                        loading : "查询中...请稍等！",
                        loadError : "查询出错，请联系管理员！"
                    },
                    onSelect : function(select, node)
                    {
                    	// 低版本IE不支持数组的indexOf方法，需要兼容性处理
                    	if( typeof Array.indexOf !== 'function' ){
                            Array.prototype.indexOf = function(args){
                                var index = -1; 
                                for(var i=0,l=this.length; i<l; i++){
                                    if(this[i] === args){
                                        index = i;
                                        break;
                                    }   
                                }   
                                return index;
                            };
                        }
                        
                        var selectedNodes = node.tree.getSelectedNodes();
                        var selectedKeys = $.map(selectedNodes, function(node)
                        {
                        	// 如果不可选的节点，则不在输入框中显示
                        	if(unselectableData.indexOf(node.data.key) >= 0) //true 包含，false不包含
                        		return;
                        	
                            return node.data.key;
                        });
                        var selectedTitles = $.map(selectedNodes, function(node)
                        {
                        	// 如果不可选的节点，则不在输入框中显示
                        	if(unselectableData.indexOf(node.data.key) >= 0) //true 包含，false不包含
                        		return;
                        	
                            return node.data.title;
                        });
                        $("#" + triggerElementId).val(selectedTitles.join(","));
                        $("#" + triggerElementId).attr("_key", selectedKeys.join(","));
                        // 使控件失去焦点，以进行表单校验（Validate）
                        $("#" + triggerElementId).blur();
                    },
                    onPostInit : function(isReloading, isError)
                    {
                        var treemode = $('#' + dynaTreeId).dynatree("getTree");
                        //设置数据不可选
                        if (unselectableData != null && unselectableData != "")
                        {
                            $.each(unselectableData, function(index, d)
                            {
                                var n = treemode.getNodeByKey(d);
                                if (n)
                                {
                                    n.data.unselectable = true;
                                    n.data.addClass = "custom_unselectable";
                                }
                            });
                        }
                        
                        //选中
                        var triggerElementVal = $("#" + triggerElementId).attr("_key");
                        if ( typeof (triggerElementVal) != "undefined" && triggerElementVal != null)
                        {
                            var keys = $("#" + triggerElementId).attr("_key").split(",");
                            if (keys != null && keys != "")
                            {
                                $.each(keys, function(index, key)
                                {
                                    treemode.selectKey(key);
                                });
                            }
                        }

                        
                        
                        // 展开第一级
                        if(param.attrs.isExpendRoot){
                        	$('#' + dynaTreeId).dynatree("getRoot").visit(
    							function(node) {
    								var nodelevel = node.getLevel();
    								if (nodelevel == 1) {
    									node.expand(true);
    									return;
    								}
							});
                        }
                    },
                    onRender : function(node, nodeSpan) {
                    	//Called after every time a node's HTML tag was created or changed.
                    	//This callback may be used to modify the HTML markup.
						$('#' + dynaTreeId).dynatree("getRoot").visit(
							function(node) {
								var nodelevel = node.getLevel();
								var hasChildren = node.hasChildren();
								if (nodelevel == 1) {
									node.data.icon = "t1s.png";
								} else if (!hasChildren) {
									node.data.icon = "tl.png";
								} else if (nodelevel == 2) {
									node.data.icon = "t2s.png";
								} else if (nodelevel == 3) {
									node.data.icon = "t3s.png";
								} else{
									node.data.icon = "default.png";
								}
							}
						);
					},
                    onDblClick : function(node, event)
                    {
                        node.activate();
                        $('#' + dialogId).modal('hide');
                    },
                    onKeydown : function(node, event)
                    {
                        if (event.which == 32)
                        {
                            node.toggleSelect();
                            return false;
                        }
                    },
                });

            }
        });
        return Component;
    };

    exports.reload = function(e)
    {
        $('#' + dynaTreeId).dynatree("getTree").reload(function()
        {
            $('#' + dynaTreeId).dynatree("getRoot").visit(function(node)
            {
                node.expand(true);
            });
        });
        $('#' + dialogId).modal('show');
    };

    //窗口显示
    exports.show = function(data)
    {
        $('#' + dialogId).modal('show');
    };
});
