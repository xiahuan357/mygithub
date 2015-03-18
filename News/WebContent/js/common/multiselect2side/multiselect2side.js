/**
 * Jquery 下拉框左右选择组件
 */
define(function(require, exports, module)
{

    var $ = require('$');
    var Widget = require("widget");
    var template = require("./multiselect2side.tpl");
    require('jquery.multiselect2side.css');
    require('jquery.multiselect2side');

    var Selector = Widget.extend(
    {
        template : template,
        loadData : function()
        {
            var that = this;
            var url = this.get("url");
            var data = this.get("data");
            $.ajax(
            {
                url : url,
                dataType : "json",
                data : data,
                success : function(resultdata)
                {
                	var selectModel;
                	if('000000' != resultdata.flag){
						bootbox.alertTimeout('查询数据出现错误，请刷新重试！');
					} else {
						selectModel = resultdata.data;
						that.setModel(selectModel);
					}
                }
            });
        },
        afterRender : function()
        {
            $("#funcselect").multiselect2side(
            {
                moveOptions : true,
                labelTop : '置顶',
                labelBottom : '置底',
                labelUp : '上移',
                labelDown : '下移',
                labelSort : '排序',
                labelsx : '未分配',
                labeldx : '已分配'
            });
        }
    });
    module.exports = Selector;
}); 