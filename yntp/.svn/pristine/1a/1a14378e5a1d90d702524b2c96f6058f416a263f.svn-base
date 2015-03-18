define(function(require, exports, module) {
	/*
	 * 组件有的东西：
	 * 1.外围框提供拖拽：outterpanel
	 * 2.背景接收释放：设计器页面提供J-dropable去接收释放事件，背景需要，本身组件也需要可接受拖拽以便给拖拽提供位置
	 * 3.组件可拖拽：html5属性，draggable= true；
	 * 4.组件属性（此处不考虑）
	 * 组件应有的方法：
	 * dragstart
	 * dragenter
	 * dragover
	 * dragend
	 * dragout
	 * drop
	 * 需要有tpl提供模板
	 * 提供保存事件，保存拖拽后的值
	 * 需要key value键值对保存widget对应关系
	 * 初始化的时候需要知道的option{
	 * 	    dragElement：widgetid/domid,最好是传入相应dom对此dom去绑定事件
	 * 		IDEPageId:设计器页面id，初始化设计器页面允许接收drop
	 * }
	 * */
	var $ = require("$");
	var draganddrop = {
			/*初始化组件拖拽事件*/
			dragInit:function(option){
				var dragElement = option.dragElement;
				//给组件添加可拖拽标识
				dragElement.each(function(){
					if(!dragElement.hasClass(".J-drag")){
						$(this).addClass("J-drag").attr("draggable",true);
					}
				});
				this.initIDEDropable(option);
				this.dragStart(dragElement);
				this.dragEnter(dragElement);
				this.dragOut(dragElement);
				this.dragOver(dragElement);
				this.dragDrop(dragElement);
				this.dragEnd(dragElement);
			},
			/*初始化设计器页面允许接收组件*/
			initIDEDropable:function(option){
				
			},
			dragStart:function(dragElement){
				dragElement.on("dragstart", function(ev){
					window.dragObject = this;						
					return true; 
				});
			},
			dragEnter:function(dragElement){
				dragElement.on("dragenter", function(ev){
					console.log("ondragenter");
				});
			},
			dragOut:function(dragElement){
				dragElement.on("dragout", function(ev){
					console.log("ondragout");
				});
			},
			dragEnd:function(dragElement){
				dragElement.on("dragend",function(ev){
					console.log("ondragend");
					//拖拽后需要重新render组件保证iframe下重新计算页面高度
					if(seajs.emit){
						parent.seajs.emit('event_widget_rendered');
						top.seajs.emit('event_widget_rendered');
					}
				});
			},
			dragOver:function(dragElement){
				dragElement.on("dragover", function(ev){
					//确认是否允许拖拽
					var draggable = $(ev.target).parents().hasClass("J-drag")|| $(ev.target).hasClass("J-drag");						
					if(draggable) 
					{
						/*do something drag
						 * show tooltip make it dragable
						 * */
						console.log("ondragover");
						return false;
					} 
					else 
					{
						return true; 
					}
				});
			},
			dragDrop:function(dragElement){
				dragElement.on("drop",function(ev){
				console.log("ondrop");
				//自己不允许拖动到自己
				if($(window.dragObject)[0]==$(ev.target).parents(".J-drag")[0])
				{			
					//阻止冒泡事件
					ev.stopPropagation();
					return true;
				}				
				/*
				 * 将拖拽过来的组件移动到新位置
				 * */
				$(window.dragObject).parent().insertBefore($(ev.target).parents(".J-drag").parent()[0]);
				window.dragObject = null;
				//阻止冒泡事件
				ev.stopPropagation();
				return false; 
			});
			}
	};
	module.exports = draganddrop;
});