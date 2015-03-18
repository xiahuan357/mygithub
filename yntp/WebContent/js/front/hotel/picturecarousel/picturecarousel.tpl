<div id="{{this.model.id}}" class="carousel slide">
	<!-- 轮播（Carousel）指标 -->
	<ol class="carousel-indicators">
		{{#each this.model.items}}
			<li data-target="#{{this.model.id}}" data-slide-to="{{this.index}}"  
			 {{#if this.active}}
			 	class="active"
			 {{/if}}
			 ></li>
		{{/each}}
	</ol>
	<!-- 轮播（Carousel）项目 -->
	<div class="carousel-inner">
		 {{#each this.model.items}}
		 	<div  
		 	 {{#if this.active}}
			 	class="item active"
			 {{else}}
			 	class="item"
			 {{/if}}
		 	>
				<img id="{{this.id}}"  style="height:394px" alt="{{this.alt}}">
				<div class="carousel-caption" style="color:white">{{this.caption}}</div>
			</div>
		 {{/each}}
	</div>
	<!-- 轮播（Carousel）导航 -->
	<a class="carousel-control left" href="#{{this.model.id}}"
	data-slide="prev">&lsaquo;</a> <a class="carousel-control right"
	href="#{{this.model.id}}" data-slide="next">&rsaquo;</a>
</div>