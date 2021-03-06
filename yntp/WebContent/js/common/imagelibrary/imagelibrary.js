/**
 * 图片库组件
 */
define(function(require, exports, module) {

	var $ = require("$");
	require("bootstrap_commonrequire");
	require("bootbox.css");
	require("customer.css");
	
	var bootbox = require('bootbox');
	// ------------<ue
	require('ueditor.config-1.3.6');
	require('ueditor.all-1.3.6');
	require('ueditor-zh-cn-1.3.6');
	// ------------ue>

	// 当前操作上传组件id
	var currentOptEditorId;
	var currentSelectedFileName;
	var currentSelectedEle;
	var currentCoverFileName;
	var currentImagekey;
	
	// 上传路径
	var baseRoot = GLOBAL.BASE;
	
	// 动态构建图片元素
	var buildImageLi = function(imagePathList,coverFileName){
		var buildLi = "";
		for (var i = 0; i < imagePathList.length; i++) {
			var imageItem = imagePathList[i];
			var point =  imageItem.lastIndexOf('/');  
			var fileName =  imageItem.substring(point+1); 
			
			buildLi += '<li>'
					+ ' <div class="   pricing-table" style="width: 220px">'
					+ ' <img class="del_pic" title="双击删除图片"'
					+ ' src="'
					+ imageItem
					+ '" val="'
					+ fileName
					+ '" style="width: 220px;height:170px">'
					+ ' <div class="footer" style="padding: 10px">' + fileName + '</div>';
		   if(coverFileName != null && imageItem.indexOf(coverFileName) > 0){
			   var coverSet = '<div id="divb" class="bb"> </div>';
			   buildLi += coverSet;
		   }
		   buildLi += ' </div>'
					+ ' </li>';
		}
		return buildLi;
	}
	
	// 添加图片选中事件
	var bindingLiSelectedEvent = function(){
		// 添加选中事件
		var image = $("li > div > img").die().live('click',function(e) {
		    currentSelectedEle = $(this);
		    currentSelectedFileName = $(this).attr("val");
			
            $(this).parent().parent().addClass("li-selected");  
            $(this).parent().parent().siblings().removeClass("li-selected");           
        });  
	}
	
	// 实例化组件-------------------------START
	var template = require("./imagelibrary.tpl");
	var Widget = require("widget");
	var Component = Widget .extend({
		template : template,
		afterRender : function() {
			// 输入参数
			var attrs = this.get("attrs");
			currentOptEditorId = attrs.editorid ;
			
			// 设置编辑框不显示
			$(".edui-editor").css("display", "none");

			// 添加图片
			$("#" + attrs.editorid + "_btn_addimage").die().live( 'click', function() {
		    	var myImage = _editor.getDialog("insertimage");
			    myImage.open();
		    });
			// 删除图片
			$("#" + attrs.editorid + "_btn_delimage").die().live( 'click', function() {
				var deleteURL=GLOBAL.BASE + "imagelibrary/imageupload/deleteimage";
				if(currentSelectedFileName == null){
					bootbox.alertTimeout("请先选择图片");
					return;
				}
				if(currentCoverFileName != null && currentCoverFileName == currentSelectedFileName ){
					bootbox.alertTimeout("不能删除封面");
					return;
				}
				var deleteImageList=[currentSelectedFileName];
				$.ajax({
					type : "POST",
					dataType : 'json',
					contentType : "application/json;charset=UTF-8",
					url : deleteURL + "?imagekey=" + currentImagekey ,
					data : JSON.stringify(deleteImageList), 
					success : function(resultdata) {
						if('000000' == resultdata.flag){
							currentSelectedEle.parent().parent().remove();
						} else {
							bootbox.alertTimeout("删除图片出现错误，请重试");
						}
					},
					error : function(XMLHttpRequest, textStatus, errorThrown) {
						bootbox.alertTimeout("删除图片出现错误，请重试");
					}
				});
			});
			// 设置封面
			$("#" + attrs.editorid + "_btn_setcover").die().live( 'click', function() {
				currentCoverFileName = currentSelectedEle.attr("val");
				var coverSet = '<div id="divb" class="bb"> </div>';
				// 将其他移除
				$('#divb').remove();
				// 设置样式
				currentSelectedEle.parent().append(coverSet);
			});
			
			bindingLiSelectedEvent();
		},
		initImageLibrary : function(optType,imagekey,coverFileName){
			currentCoverFileName = coverFileName;
			currentImagekey = imagekey;
			if ( optType == "create") {
			} else if (optType == "update") {
				var queryImageListURL=GLOBAL.BASE + "imagelibrary/imageupload/getallimagelibrary";
				// 编辑时，需要将上传的文件显示，显示小图
				$.ajax({
					type : "POST",
					dataType : 'json',
					contentType : "application/json;charset=UTF-8",
					url : queryImageListURL + "?imagekey=" + imagekey ,
					success : function(resultdata) {
						if('000000' == resultdata.flag){
							var rtnList = resultdata.data;
							var com_ul = $("#" + currentOptEditorId + "_imagelist");
	                        var imagePathList = [];
	                        if(rtnList == null)
	                        	return;
	                        
							for (var i = 0; i < rtnList.length; i++) {
								var imageItem = rtnList[i];
								imagePathList.push(imageItem.fileName);
							}
							com_ul .append(buildImageLi(imagePathList,coverFileName));
						} else {
							bootbox.alertTimeout("初始化图片库出现错误，请重试");
						}
					},
					error : function(XMLHttpRequest, textStatus, errorThrown) {
						bootbox.alertTimeout("初始化图片库出现错误，请重试");
					}
				});
			}
		},
		initUploadUEditor : function(moduletype,imagekey) {
			currentImagekey = imagekey;
			// 输入参数
			var attrs = this.get("attrs");
			
			// 重新实例化一个编辑器，防止在上面的editor编辑器中显示上传的图片或者文件
			var option = {
				imageUrl : GLOBAL.BASE
						+ "imagelibrary/imageupload/ueditorpicupload/"
						+ moduletype + "?imagekey=" + imagekey,
				imagePath : baseRoot,
			};

			_editor = new UE.ui.Editor(option);
			_editor.render(attrs.editorid);
			_editor = UE.getEditor(attrs.editorid, option);
			_editor .ready(function() {
				// 隐藏编辑器，因为不会用到这个编辑器实例，所以要隐藏
				// 侦听图片上传完毕
				_editor .addListener( 'beforeinsertimage', function(t, args) {
					if (currentOptEditorId == attrs.editorid) {
						var com_ul = $("#" + currentOptEditorId + "_imagelist");
                        var imagePathList = [];
						for (var i = 0; i < args.length; i++) {
							var imageItem = args[i];
							imagePathList.push(imageItem.src);
						}
						com_ul .append(buildImageLi(imagePathList));
					}
				})
				// 侦听文件上传，取上传文件列表中第一个上传的文件的路径
				_editor.addListener('afterUpfile', function(t, args) {
				})
			});
			// 设置编辑框不显示
			$("#" + attrs.editorid).find(".edui-editor").css("display","none");
		},
		getCoverFileName : function(){
			return currentCoverFileName;
		},
	});
	module.exports = Component;
});