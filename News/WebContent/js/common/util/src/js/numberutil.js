define(function(require, exports, module) {
	
	// 价格类的数字，统一小数位数为2
	var PRICE_FRACTION = 2;
	
	// 如果是参数是数字类型，取价格小数位数的数字并返回
	exports.getFractionPrice = function(price){
		if(typeof(price) == 'number'){
			return price.toFixed(PRICE_FRACTION);
		}
		return price;
	};
});