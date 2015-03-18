define(function(require, exports, module) {
	exports.getDataArray = function(ret){
		if(ret && ret.flag == "000000"){
			if(ret.data){
				// 如果是分页查询，返回数据中有totalItemNum字段
				if(ret.data.totalItemNum){
					return ret.data.items;
				}else if(ret.data.length){
					return ret.data;
				}else{
					return [];
				}
			}
		}
		return null;
	};
	
	// 通过ajax返回数据构造datatable的server请求返回数据结构
	var getDataFromRet = function(ret, aoData){
		if(ret && ret.flag == "000000"){
			// 构造返回数据
			var dtData = {};
			dtData.iTotalRecords = 0;
			dtData.iTotalDisplayRecords = dtData.iTotalRecords;
			dtData.aaData = [];
			
			dtData.sEcho = getEchoValue(aoData);
			if(ret.data){
				// 兼容datatableresponse返回类型
				if(ret.data.aaData){
					return ret.data;
				}
				// 如果是分页查询，返回数据中有totalItemNum字段
				if(ret.data.totalItemNum){
					dtData.iTotalRecords = ret.data.totalItemNum;
					dtData.iTotalDisplayRecords = dtData.iTotalRecords;
					dtData.aaData = ret.data.items;
				}else if(ret.data.length){
					dtData.iTotalRecords = ret.data.length;
					dtData.iTotalDisplayRecords = dtData.iTotalRecords;
					dtData.aaData = ret.data;
				}
			}
			return dtData;
		}
		return null;
	};
	
	// 后台返回数据进行统一处理
	exports.successCallback = function(ret, aoData, fnCallback){
		// 构造返回数据
		dtData = getDataFromRet(ret, aoData);
		fnCallback(dtData);
	};
	
	function getEchoValue(aoData){
		if(!aoData)
			return null;
		var echo = null;
		 jQuery.each(aoData, function(idx,obj) {
	           if (obj.name == 'sEcho') {
	        	   echo =  obj.value;
	        	   return;
	           }
		 });
		 return echo;
	}
	exports.getEcho = getEchoValue;
	
	exports.convert_url = function (url) {
		if(url){
        	var qInd = url.lastIndexOf("?q=");
        	if(qInd > 0){
        		return url.substring(0, qInd);
        	}
        }
		return url;
	};
	
	// 将datatable的请求数据封装为后台要求的格式
	// url中如果有带有?q=***参数，进行提取并转换
	exports.convert_aoData = function (aoData, url) {
		var dstData = {};
        var arrayData = {};
        var srcVarName = ['iDisplayStart', 'iDisplayLength', 'sSearch', 'sEcho', 'iColumns', 'sColumns', 'bRegex', 'iSortingCols', 
                          'mDataProp_', 'sSearch_', 'iSortCol_', 'bSortable_', 'bRegex_', 'bSearchable_', 'sSortDir_'];
        var arrayIdx = 8;
        
        var dstVarName = ['start', 'size']; // 全局请求参数
        var dstQueryName = 'q';
        var dstQueryString = '';
        
        jQuery.each(aoData, function(idx,obj) {
            if (obj.name) {
                for (var i=0; i < srcVarName.length; i++) {
                    if (obj.name.substring(0, srcVarName[i].length) == srcVarName[i]) {
                    	if(i >= arrayIdx){ // 是数组
                    		var index = parseInt(obj.name.substring(srcVarName[i].length));
                    		var key = 'a' + srcVarName[i].substring(0, srcVarName[i].length-1);
                    		if (!arrayData[key]) {
                    			arrayData[key] = [];
                    		}
                    		//console.log('index=' + index);
                    		arrayData[key][index] = obj.value;
                    	}else if(i == 2){// 搜索框输入
                    		if(obj.value && obj.value!='undefined')
                    			dstQueryString += 'searchtext=' + obj.value;
                    	}else if(i < 2){
                    		dstData[dstVarName[i]] = obj.value;
                    	}
                        //console.log(key + ".push(" + obj.value + ")");
                        return;
                    }
                }
                //console.log(obj.name+"=" + obj.value);
                dstData[obj.name] = obj.value;
            }
            else {
            	dstData[idx] = obj;
            }
        });
        // 构造排序参数
        if(arrayData){
        	if(arrayData['amDataProp'] && arrayData['aiSortCol'] && arrayData['asSortDir']){
        		var sortBy = arrayData['amDataProp'][arrayData['aiSortCol'][0]];
        		if(sortBy){
        			dstData['sortBy'] = sortBy;
        			dstData['sortOrder'] = arrayData['asSortDir'][0];
        		}
        	}
        }
        	
        dstData[dstQueryName] = dstQueryString;
        if(url){
        	var qInd = url.lastIndexOf("?q=");
        	if(qInd > 0){
        		qInd += 3;
        		var urlParam = url.substring(qInd);
        		if(urlParam){
        			if(!dstData[dstQueryName])
        				dstData[dstQueryName] += urlParam;
        			else
        				dstData[dstQueryName] += ";" + urlParam;
        		}
        	}
        }
        return dstData;
        //return JSON.stringify(o);
    };
	
	// 封装datatable请求数据，使得后台可使用DataTablesRequest接收
	exports.stringify_aoData = function (aoData) {
        var o = {};
        var modifiers = ['mDataProp_', 'sSearch_', 'iSortCol_', 'bSortable_', 'bRegex_', 'bSearchable_', 'sSortDir_'];
        jQuery.each(aoData, function(idx,obj) {
            if (obj.name) {
                for (var i=0; i < modifiers.length; i++) {
                    if (obj.name.substring(0, modifiers[i].length) == modifiers[i]) {
                        var index = parseInt(obj.name.substring(modifiers[i].length));
                        var key = 'a' + modifiers[i].substring(0, modifiers[i].length-1);
                        if (!o[key]) {
                            o[key] = [];
                        }
                        //console.log('index=' + index);
                        o[key][index] = obj.value;
                        //console.log(key + ".push(" + obj.value + ")");
                        return;
                    }
                }
                //console.log(obj.name+"=" + obj.value);
                o[obj.name] = obj.value;
            }
            else {
                o[idx] = obj;
            }
        });
        //return o;
        return JSON.stringify(o);
    };
});