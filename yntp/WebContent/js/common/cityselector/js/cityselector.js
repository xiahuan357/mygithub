/**
 * 城市选择器，省市县三级
 * @author liuchchc
 * @date 2014-5-22 08:49:46
 */
define(function(require, exports, module) {
	var $ = require("$");
	require("bootstrap_commonrequire");
	require("bootstrap_theme");

	require('select2.css');
	require('select2');

	var template = require("./cityselector.tpl");
	var Widget = require("widget");
	var handlebars = require("handlebars");

	var com_province;
	var com_city;
	var com_zone;
	
	var bootbox = require("bootbox");
	var action_query = GLOBAL.BASE + "admin/region/region/getselectmodel/";
	
	// 初始化省信息-------------------
	var initProvince = function(){
		$.ajax({
			async: false,
			type : "GET",
			url : action_query + "0",
			success : function(resultData) {
				com_province.select2({
					placeholder : "请选择省市/其他",
					allowClear : true,
					multiple : false,
					data : resultData.data
				});
			},
			error : function(XMLHttpRequest, textStatus, errorThrown) {
				bootbox.alertTimeout("获取行政区域信息失败！");
			}
		});
	}
	
	// 初始化市信息-------------------
	var initCity = function(data){
		$.ajax({
			async: false,
			type : "GET",
			url : action_query + data,
			success : function(resultData) {
				com_city.select2({
					placeholder : "请选择城市...",
					allowClear : true,
					multiple : false,
					data : resultData.data
				});
			},
			error : function(XMLHttpRequest, textStatus, errorThrown) {
				bootbox.alertTimeout("获取行政区域信息失败！");
			}
		});
	}
	
	// 初始化区信息-------------------
	var initZone = function(data){
		$.ajax({
			async: false,
			type : "GET",
			url : action_query + data,
			success : function(resultData) {
				com_zone.select2({
					placeholder : "请选择区/县",
					allowClear : true,
					multiple : false,
					data : resultData.data
				});
			},
			error : function(XMLHttpRequest, textStatus, errorThrown) {
				bootbox.alertTimeout("获取行政区域信息失败！");
			}
		});
	}
	
	var Component = Widget.extend({
		handlebars : handlebars,
		template : template,
		initCustAttr : function() {
			// 输入项初始化
			var attrs = this.get("attrs");
			// 如果没有指定 选择框的id，默认设置如下
			attrs.provinceid = attrs.provinceid == null ? "province" : attrs.provinceid;
			attrs.cityid = attrs.cityid == null ? "city" : attrs.cityid;
			attrs.zoneid = attrs.zoneid == null ? "zone" : attrs.zoneid;
		},
		afterRender : function() {
			var attrs = this.get("attrs");
			com_province=$('#' + attrs.provinceid);
			com_city = $('#' + attrs.cityid);
			com_zone = $('#' + attrs.zoneid);
			
			// 初始化
			com_province.select2({
				placeholder : "请选择省市/其他",
				allowClear : true,
				multiple : false,
				data : [ {
					id : -1,
					text : "请选择省市/其他"
				} ]
			});
			com_city.select2({
				placeholder : "请选择城市...",
				allowClear : true,
				multiple : false,
				data : [ {
					id : -1,
					text : "请选择城市..."
				} ]
			});
			com_zone.select2({
				placeholder : "请选择区/县",
				allowClear : true,
				multiple : false,
				data : [ {
					id : -1,
					text : "请选择区/县"
				} ]
			});

			// 默认加载省
			initProvince();
			
			// 选择省后市自动更新
			com_province.on("change", function(e) {
				if (e.val != null && e.val != "") {
					initCity(e.val);
				}
			});

			// 选择市后区自动更新
			com_city.on("change", function(e) {
				if (e.val != null && e.val != "") {
					initZone(e.val);
				}
			});
		},
		   //初始化
		initRegion : function(region_id){
			var attrs = this.get("attrs");
			com_province=$('#' + attrs.provinceid);
			com_city = $('#' + attrs.cityid);
			com_zone = $('#' + attrs.zoneid);
			
			var arr=new Array();
			arr =region_id.split('-');
			
			// 选中省
			com_province.select2("val",arr[0]);
			
			// 选中市
			var selectedProvince = com_province.attr("value");
			if(selectedProvince != null && selectedProvince != "undefined"){
				initCity(selectedProvince); // 初始化数据
				com_city.select2("val",arr[1]); // 选中数据
			}
			// 选中区
			var selectedCity = com_city.attr('value');
			if(selectedCity != null && selectedCity != "undefined"){
				initZone(selectedCity); // 初始化数据
				com_zone.select2("val",arr[2]); // 选中数据
			}
		},
		getRegion_id:function()
		{  
			var attrs = this.get("attrs");
			com_province=$('#' + attrs.provinceid);
			com_city = $('#' + attrs.cityid);
			com_zone = $('#' + attrs.zoneid);
			
			return com_province.attr("value")+"-"+com_city.attr('value')+"-"+com_zone.attr('value');
		}
	});

	module.exports = Component;
});