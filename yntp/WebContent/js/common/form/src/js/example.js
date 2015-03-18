/**
 * 
 */
var DocDetail = require("./form_display");
				var docDetailParam = {
						spansize : 'span12',
						items : [{
							textid : "text_orderdocno",
							label : "单据号",
							value : selectRowData == null ? "" :selectRowData.docno
						},
						{
							textid : "text_orderdocno",
							label : "订单号",
							value : selectRowData == null ? "" :selectRowData.orderdocno
						},
						{
							textid : "text_sourcevalue",
							label : sourceLabel,
							value : sourceValue
						},
						{
							textid : "text_date",
							label : "日期",
							value : selectRowData == null ? "" :getDate(selectRowData.date)
						},
						{
							textid : "text_originaltotalmny",
							label : "金额",
							value : selectRowData == null ? "" :selectRowData.originaltotalmny
						},
						{
							textid : "text_tag",
							label : "备注",
							value : selectRowData == null ? "" :selectRowData.tag
						}
						]
				};
				
				new DocDetail({attrs : docDetailParam, renderTo : param.attrs.detailWrapperId});