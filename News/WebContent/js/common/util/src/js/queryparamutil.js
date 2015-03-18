define(function(require, exports, module) {
	
	// 根据时间范围构造时间查询参数字符串
	// 参数 daterange YYYY-MM-DD/YYYY-MM-DD格式的字符串
	//     datename  日期字段名称, 默认为date 
	exports.getDateParam = function(daterange, datename){
		var queryparam = "";
		if(!datename){
			datename = "date";
		}
		if(daterange){
			var dateparam = daterange.split("/");
			if(dateparam[0] == dateparam[1]){
				queryparam +=  datename + "=";
				queryparam += dateparam[0];
			}else{
				queryparam += datename + ">=";
				queryparam += dateparam[0];
				queryparam += ";";
				queryparam += datename + "<=";
				queryparam += dateparam[1];
			}
		}
		return queryparam;
	};
	
	exports.addParam = function(query, param){
		if(param){
			if(query){
				query += ";" + param;
			}else{
				query = param;
			}
		}
		
		return query;
	};
	
	exports.buildQString = function(paramArray){
		var qstr  = "";
		for(var i = 0; i < paramArray.length; i++){
			qstr += paramArray[i].key + '=' + paramArray[i].value;
		}
		return qstr;
	};
});