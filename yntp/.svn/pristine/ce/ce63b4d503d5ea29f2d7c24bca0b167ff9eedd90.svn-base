/**
 * 
 */

define(function(require, exports, module) {
	require("fileupload-css");
	require("fileupload-ui-css");
    
    require("$");
    require("bootstrap");
    require("jquery-ui-widget");
    
    require("tmpl");
    
    require("fileupload");
    require("fileupload-process");
    require("fileupload-image");
    require("fileupload-audio");
    require("fileupload-video");
    require("fileupload-validate");
    require("fileupload-ui");

    var $ = jQuery;

    $(function() {
        // ----------------------HBASE-------------------
        
        $('#hbase-upload').fileupload({
            url: 'hbase/fileupload.do',
            dataType: 'json',
            //autoUpload: false, 
            maxFileSize: 1000000, 
            acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i, 
            filesContainer: $('.files'),
            //singleFileUploads: false,
            //禁用图片预览
            disableImagePreview: true,
            disableImageLoad: true,
            disableImageMetaDataLoad: true,
            added: function(e, data) {
                /*
				 * $("#start-hbase-upload").click(function () {
				 * //$("p").html("Requête envoyée");
				 * data.submit(); });
				 */
            },
            uploadTemplateId: null,
            downloadTemplateId: null,
            uploadTemplate: function (o) {   
                var rows = $();
                $.each(o.files, function (index, file) {
                    var row = $('<tr class="template-upload fade">' +
                        //'<td><span class="preview"></span></td>' +
                        '<td><p class="name"></p>' +
                        '<div class="error"></div>' +
                        '</td>' +
                        '<td><p class="size"></p>' +
                        '<div class="progress"></div>' +
                        '</td>' +
                        '<td>' +
                        (!index && !o.options.autoUpload ?
                            '<button class="btn btn-primary start" disabled>开始</button>' : '') +
                        (!index ? '<button class="btn btn-warning cancel">取消</button>' : '') +
                        '</td>' +
                        '</tr>');
                    row.find('.name').text(file.name);
                    row.find('.size').text(o.formatFileSize(file.size));
                    if (file.error) {
                        row.find('.error').text(file.error);
                    }
                    rows = rows.add(row);
                });
                return rows;
            },
            //重新定义下载模版
            downloadTemplate: function (o) {
                var rows = $();
                $.each(o.files, function (index, file) {
                	/*
                    var row = $('<tr class="template-download fade">' +
                        //'<td><span class="preview"></span></td>' +
                        '<td><p class="name"></p>' +
                        (file.error ? '<div class="error"></div>' : '') +
                        '</td>' +
                        '<td><span class="size"></span></td>' +
                        '<td><button class="btn btn-default">Delete</button></td>' +
                        '</tr>');
                    row.find('.size').text(o.formatFileSize(file.size));
                    if (file.error) {
                        row.find('.name').text(file.name);
                        row.find('.error').text(file.error);
                    } else {
                        row.find('.name').append($('<a></a>').text(file.name));
                        if (file.thumbnailUrl) {
                            row.find('.preview').append(
                                $('<a></a>').append(
                                    $('<img>').prop('src', file.thumbnailUrl)
                                )
                            );
                        }
                        row.find('a')
                            .attr('data-gallery', '')
                            .prop('href', file.url);
                        row.find('.delete')
                            .attr('data-type', file.delete_type)
                            .attr('data-url', file.delete_url);
                    }
                    */
                	var row = $('<tr class="template-download fade">' +
                            '<td><p class="name"></p></td>' +
                            (file.error ? '<td class="error">上传失败！</td>' : '<td>上传成功！</td>') +
                            '<td><img src="hbase/getfile/'+file+'.do" style="max-height:64px; max-width:64px;"/></td>' +
                            '</tr>');
                	row.find('.name').text(file);
                    rows = rows.add(row);
                });
                //getFileSetsFirst(101);
                return rows;
            },
            //重新定义
            getFilesFromResponse: function(data) {
            	if (data.result && $.isArray(data.result.fileKeyList)) {
                	return data.result.fileKeyList;
                }
            }
        });
        
        
        $("body").on("click", "a[id^='hbase-del']",
        function() {
            var filekey = $(this).attr("id").substr(9);
            $.post("hbase/delfile.do", {
                "filekey": filekey
            }).done(function(data) {
                alert("成功");
            }).fail(function(jqXHR, textStatus, errorThrown) {
                alert("失败");
            });

        });
        $("body").on("click", "a[id^='hbase-info']",
        function() {
            var filekey = $(this).attr("id").substr(10);
            $.getJSON("hbase/fileinfo/" + filekey + ".do",
            function(data) {
                alert(JSON.stringify(data));
            });
        });

        $("#hbase-filesets").on("click", "a[id^='fileset']",
        function() {
            var filesetkey = $(this).attr("id").substr(7);
            $("#hbase-filesets .list-group-item").removeClass("active");
            $(this).addClass("active");
            $.getJSON("hbase/filelist/" + filesetkey + ".do",
            function(data) {
                // alert(JSON.stringify(data));
                $("#hbase-files tr:has(td)").remove();
                $.each(data,
                function(index, fileKey) {
                    $("#hbase-files").append($('<tr/>').append($('<td/>').text(index + 1)).append($('<td/>').text(fileKey)).append($('<td/>').html("<ul class='pagination pagination-sm' style='margin:0px'><li><a href='hbase/getfile/" + fileKey + ".do'>下载</a></li><li><a href='javascript:void(0)' id='hbase-del" + fileKey + "'>删除</a></li><li><a href='javascript:void(0)' id='hbase-info" + fileKey + "'>信息</a></li></ul>"))); // end
                    // $("#uploaded-files").append()
                });
            });
        });

        // 获取文件集主键列表
        function getFileSets(startFileSetKey, count) {
            $.getJSON("hbase/filesetlist/" + startFileSetKey + "/" + count + ".do",
            function(data) {
                // alert(JSON.stringify(data));
                $("#hbase-filesets").empty();
                $.each(data,
                function(index, fileSetKey) {
                    $("#hbase-filesets").append("<a href=\"javascript:void(0)\" class=\"list-group-item\" id=\"fileset" + fileSetKey + "\">" + fileSetKey + "</a>"); // end
                    // $("#uploaded-files").append()
                });
            });
        };

        function getFileSetsFirst(count) {
            getFileSets("!", count);
        }
        //getFileSetsFirst(101);
        
        
    });
});