/**
 * 对话框实现 下拉框左右选择
 */
define(function(require, exports, module)
{
    var $ = require("$");
    var Modaldialog = require("modaldialog");
    var Selector = require("./multiselect2side");
    exports.init = function(param)
    {
        var example = new Modaldialog(
        {
            attrs :
            {
                id : param.id,
                title : param.title,
                items : [
                {
                    isDiv : true,
                    id : param.id + 'form',
                }],
                isOverrideDefaultPositionCss : true,
                customPositionCss : "width:600px;"
            },
            renderTo : param.renderTo,
            afterRender : function()
            {
                $('#' + param.id).modal('hide');
                new Selector(
                {
                    attrs :
                    {
                        url : param.attrs.url
                    },
                    renderTo : param.id + 'form'
                });
            },
        });
        $('#' + param.id).modal('show');
    };
    exports.getSelectedData = function()
    {
        return $("#funcselect").val();
    };
});
