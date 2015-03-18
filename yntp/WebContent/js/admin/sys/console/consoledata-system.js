define(function(require, exports, module)
{
	exports.getData = function(userid, storeid){
		var today = new Date();
		var todayParam = "date>=" + today.format("yyyy-MM-dd")+" 00:00:000;";
		todayParam += "date<=" + today.format("yyyy-MM-dd")+" 23:59:999";
		
		var data = {"header":[
			{"title":"新闻中心","backgroudclass":"green-background","icon":"icon-file-text","url":"background/news/newstable.html"},
			{"title":"基础数据","backgroudclass":"blue-background","icon":"icon-file-text-alt","url":"background/department/departmenttable.html"},
			],
			"body":[
			    
			    {"bHeader":{"bTitle":"消息","bIcon":"icon-comments"},
			     "bBody":[
			        {"title":"未读","clolorClass":"text-danger","icon":"icon-info-sign","dataUrl":"","data":"status=1","url":""},
			        {"title":"已读","clolorClass":"text-success","icon":"icon-ok-sign","dataUrl":"","data":"status=2","url":""}
			     ]}
			]};
		return data;
	};
});