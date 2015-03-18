/**
 *  首页-旅游线路-图片轮播
 */
define(function(require, exports, module)
{
    var $ = require("$");
    
    require("bootstrap_commonrequire");
    var userutil = require("userutil");
    
    var Widget = require("widget");
    var template = require("./picturecarousel.tpl");
    // 暂用静态JSON资源
    var menudata_front = require("./picturecarousel.json");
    
    var slider_count=5;
    var slider_i=1;
	var m_over=true;
	
    function zx_slider(){
		if(m_over){
			if(slider_i<0){slider_i=slider_count;}
			//p
			$(".slider_p_div").hide();
			$("#slider_p"+slider_i).show();
			//p end
			//hi_btn
			$(".hi_btn").hide();
			$("#hi_btn"+slider_i).show();
			//hi_btn end
			//btn
			$(".btnbox img").stop(true,true);
			$(".btnbox img").removeClass("img_hover");
			$(".btnbox img").animate({bottom:'0px'},200);
			$("#btn_img"+slider_i).addClass("img_hover");
			$("#btn_img"+slider_i).animate({bottom:'10px'},200);
			//btn end
			$(".imgbox").stop();
			$(".imgbox").animate({left:'-1170'*slider_i+'px'});
			if(slider_i<slider_count){
				slider_i++;	
			}else{
				slider_i=0;
			}
		}
	}
    function btn_m_over(btn_i){
		if(slider_i-1!=btn_i){
			m_over=true;
			slider_i=btn_i;
			zx_slider();
			m_over=false;
		}
	}
    
    var Menu = Widget.extend(
    {
        template : template,
        loadData : function()
        {
        	var menudata  = menudata_front;
        	this.setModel(menudata);
        },
        afterRender : function()
        {
        	
        	$(".slider_p_div").hide();
        	$("#slider_p0").show();
        	$(".hi_btn").hide();
        	$("#hi_btn0").show();
        	$(".img_hover").animate({bottom:'10px'});
        	$('.zx_slider .imgbox').css("width",1170*slider_count+'px');
        	
        	$(".lbtn").click(function(){
        		m_over=true;
        		if(slider_i==0){slider_i=slider_count-1}else{slider_i=slider_i-2;}
        		zx_slider();
        		m_over=false;
        	});

        	$(".rbtn").click(function(){
        		m_over=true;
        		zx_slider();
        		m_over=false;
        	});


        	zx_timer=self.setInterval(zx_slider,3000); 
        	$(".zx_slider").mouseover(function(){
        		m_over=false;
        	});
        	$(".zx_slider").mouseout(function(){
        		m_over=true;
        	});
        	
    		var items = menudata_front.items;
			for(var i=0;i<items.length;i++){
				// 如果是图片，添加入片地址
				var item = items[i];
				$("#"+item.imageid).attr("src",item.src);
				$("#"+item.btnimageid).attr("src",item.src);
			}
			$('.btnboxa').mouseover(function(e){
				var index = $(this).attr("index");
				btn_m_over(index);
			});
			
		}
    });
    module.exports = Menu;
}); 