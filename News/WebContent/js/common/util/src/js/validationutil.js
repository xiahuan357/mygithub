define(function(require, exports, module) {
	
	// 判断参数是否符合邮政编码规范
	exports.isPostCode = function(param){
		var pattern = /^[0-9]{6}$/;
        return pattern.test(param);
	};
	
	// 判断参数是否是合法的手机号
	exports.isMobileNumber = function(param){
		var pattern = /^1[3-8]\d{9}$/;
        return pattern.test(param);
	};
	
	// 判断参数是否是合法的固定电话号码
	exports.isTelNumber = function(param){
		var pattern = /^(([0\+]\d{2,3}-)?(0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/;
        return pattern.test(param);
	};
	
	// 判断参数是否是合法的邮箱
	exports.isEmail = function(param){
		var pattern = /[A-Za-z0-9_-]+[@](\S*)(net|com|cn|org|cc|tv|[0-9]{1,3})(\S*)/g;
        return pattern.test(param);
	};
});