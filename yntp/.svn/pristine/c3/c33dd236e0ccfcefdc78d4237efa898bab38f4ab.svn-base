define(function(require, exports, module)
{
	exports.getData = function(userid, storeid){
		var today = new Date();
		var todayParam = "date>=" + today.format("yyyy-MM-dd")+" 00:00:000;";
		todayParam += "date<=" + today.format("yyyy-MM-dd")+" 23:59:999";
		
		var data = {"header":[
			{"title":"账号管理","backgroudclass":"green-background","icon":"icon-user","url":"admin/customer/common/baseinfoindex.html"},
			{"title":"系统消息","backgroudclass":"blue-background","icon":" icon-envelope","url":"admin/customer/common/messageindex.html"},
			],
			"body":[
			    {"bHeader":{"bTitle":"景点订单","bIcon":"icon-picture"},
			     "bBody":[
			        {"title":"待处理","clolorClass":"text-danger","icon":"icon-info-sign","dataUrl":"","data":"status=1","url":""},
			        {"title":"待付款","clolorClass":"text-success","icon":"icon-ok-sign","dataUrl":"","data":"status=2","url":""}
			     ]},
			     {"bHeader":{"bTitle":"线路订单","bIcon":"icon-road"},
			     "bBody":[
			        {"title":"待处理","clolorClass":"text-danger","icon":"icon-info-sign","dataUrl":"","data":"status=1","url":""},
			        {"title":"待付款","clolorClass":"text-success","icon":"icon-ok-sign","dataUrl":"","data":"status=2","url":""}
			     ]},
			     {"bHeader":{"bTitle":"酒店订单","bIcon":"icon-building"},
			     "bBody":[
			        {"title":"待处理","clolorClass":"text-danger","icon":"icon-info-sign","dataUrl":"","data":"status=1","url":""},
			        {"title":"待付款","clolorClass":"text-success","icon":"icon-ok-sign","dataUrl":"","data":"status=2","url":""}
			     ]},
			     {"bHeader":{"bTitle":"特产订单","bIcon":"icon-leaf"},
			     "bBody":[
			        {"title":"待处理","clolorClass":"text-danger","icon":"icon-info-sign","dataUrl":"","data":"status=1","url":""},
			        {"title":"待付款","clolorClass":"text-success","icon":"icon-ok-sign","dataUrl":"","data":"status=2","url":""}
			     ]},
			     {"bHeader":{"bTitle":"汽车租赁订单","bIcon":"icon-truck"},
			     "bBody":[
			        {"title":"待处理","clolorClass":"text-danger","icon":"icon-info-sign","dataUrl":"","data":"status=1","url":""},
			        {"title":"待付款","clolorClass":"text-success","icon":"icon-ok-sign","dataUrl":"","data":"status=2","url":""}
			     ]},
			     {"bHeader":{"bTitle":"设备租赁订单","bIcon":"icon-camera"},
			     "bBody":[
			        {"title":"待处理","clolorClass":"text-danger","icon":"icon-info-sign","dataUrl":"","data":"status=1","url":""},
			        {"title":"待付款","clolorClass":"text-success","icon":"icon-ok-sign","dataUrl":"","data":"status=2","url":""}
			     ]},
			]};
		return data;
	};
});