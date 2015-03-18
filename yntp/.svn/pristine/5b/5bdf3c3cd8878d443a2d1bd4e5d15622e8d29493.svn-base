/**
 * 树表控件
 */
define(function(require, exports, module) {
	var $ = require("$");
	var Widget = require("widget");
	
	require("bootstrap_commonrequire");
	require("./Core4j-debug");
	require("./TableTree4j-debug");
	require("../css/tabletree4j.css");
	
	// 全局树表组件
	var fifaGirdTree;
	
	// 查询树表的初始数据结构
	var initNodeList = function(queryUrl){
		var jsoninitNodes = null;
		$.ajax({
			async : false,
			type : "GET",
			dataType : 'json',
			contentType : "application/json;charset=UTF-8",
			url : queryUrl,
			success : function(resultdata) {
				if('000000' != resultdata.flag){
					bootbox.alertTimeout('查询数据出现错误，请刷新重试！');
					jsoninitNodes = null; 	// 查询出错
				} else {
					var receiptList = resultdata.data;
					 jsoninitNodes = receiptList;
				}
			},
			error : function(resultdata) {
				bootbox.alertTimeout('查询数据出现错误，请重试！');
			}
		});
		return jsoninitNodes;
	};
	
	var TreeTable = Widget.extend({
		// 初始化参数
		initCustAttr : function() {
			var attrs = this.get("attrs");
		},
		afterRender : function() {
			var attrs = this.get("attrs");
			// ------------------------------------------------------------------------------------
			// the flow of build tabletree
			// create and config tabletree object
			
			// 树表头数据结构
			var jsonFIFAHeaders = [ {
				columns : attrs.FIFAHeadersColumns,
				dataObject : attrs.FIFAHeadersDataObject ,
				trAttributeNames : [ 'classStyle', 'style' ],
				trAttributeValueObject : {
					classStyle : 'tableheaderbg  contrast-background',
					style : ''
				}
			} ];
			
			// 创建树表控件
			fifaGirdTree = new Core4j.toolbox.TableTree4j({
				columns : attrs.GirdTreeColumns,
				treeMode : 'gird',
				renderTo : attrs.treetableWrapperDiv,
				useLine : true,
				useIcon : true,
				id : attrs.treetableid,
				useCookie : false,
				onExpandNodeEvents : [ fifaExpandNodeEvent ],
				onSelectNodeEvents : [ fifaOnSelectNodeEvents ],
				headers : jsonFIFAHeaders,
				themeName : 'arrow',
				selectMode : 'single',
			});
			
			// 树表节点数据结构
			var jsoninitNodes = initNodeList(attrs.initnodequeryurl);
			
			// 初始化数据
			fifaGirdTree.build(jsoninitNodes, true);
			
			// 加上bootstrap的表格样式
			$("#" + attrs.treetableid).addClass(" table");
			// ------------------------------------------------------------------------------------
			
			// 节点展开，动态加载下级数据
			function fifaExpandNodeEvent(node, tree) {
				if (node.isLoad == false) {
					tree.startLoadingNode(node);

					// 获取下级数据，获得数据的函数，通过参数传进来
					var childrenData = attrs.getExpandNodeData(node);

					if (childrenData != null) {
						tree.loadingAddNodes(childrenData,node.id);
					}

					tree.endLoadingNode(node);
				}
			};
			
			// 选中节点事件
			function fifaOnSelectNodeEvents(selectnodes,allSelectnodes,tree){
				attrs.onSelectNodeEvents(selectnodes,allSelectnodes,tree);
			};
			// ------------------------------------------------------------------------------------
		},
		// 设置风格, 加载完表格后使用
		setStyle : function() {
		},
		getTreeTable : function(){
			return fifaGirdTree;
		},
		// 获得选中的节点，一行
		getSelectedNode : function(){
			var sllectNodes = fifaGirdTree.getSelectNodes();
			if (sllectNodes == null || sllectNodes.length == 0) {
				return null;
			} else {
				return node = sllectNodes[0];
			}
		},
		// 创建一行数据
		getNewTableTreeNode : function(param){
			var addnode = new Core4j.toolbox.TableTreeNode(param);
			return addnode;
		},
		// 刷新表格数据
		rebuildTreeByNodes : function(){
			var attrs = this.get("attrs");
			// 树表节点数据结构
			var jsoninitNodes = initNodeList(attrs.initnodequeryurl);
			fifaGirdTree.rebuildTreeByNodes(jsoninitNodes,true);
			$("#" + attrs.treetableid).addClass(" table");
		}
	});
	module.exports = TreeTable;
});
