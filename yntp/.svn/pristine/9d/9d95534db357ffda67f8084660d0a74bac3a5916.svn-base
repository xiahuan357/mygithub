define(function(require, exports, module)
{
    var $ = require("$");

    require("bootstrap_commonrequire");
    require("./paging");
    require("../css/table.css");
    var tpl = require("./table.tpl");
    var Widget = require("widget");
    var Table = Widget.extend(
    {
        template : tpl,

        // 初始化参数
        initCustAttr : function()
        {
            var attrs = this.get("attrs");

            var id = attrs.id;
            if (!attrs.theadAddStyle)
                attrs.theadAddStyle = "color: white";
            if (!attrs.theadAddClass)
                attrs.theadAddClass = "contrast-background";
            if (id)
            {
//                if ($("#" + id).length > 0)
//                {
//                    if (console)
//                    {
//                        console.error("指定table组件的id[" + id + "]已经被使用,请检查！");
//                    }
//                }
            }
            else
            {
//                if (console)
//                {
//                    console.log("请指定table组件的id");
//                }
            }
        },
        afterRender : function()
        {
            var attrs = this.get("attrs");
            var id = attrs.id;
            if (!attrs.isBordered)
                $("#" + id).css(
                {
                    "border" : "solid #DDDDDD",
                    "border-width" : "0px 0px 1px 0px"
                });
        },

        // 设置风格, 加载完表格后使用
        setStyle : function()
        {
        }
    });
    module.exports = Table;
});
