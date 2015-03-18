<div class="row-fluid" style="margin-top: 10px">
			<div class="span6 offset3 ">
				<div class="text-center">
					<h2>诱惑难挡，暴瘦美食来一发</h2>
				</div>
			</div>
		</div>
<div class="friend">
    <div class="mr_frbox">
        <img class="mr_frBtnL prev" src="/yntp/img/tool/carousel1/multiprevious.gif" />
        <div class="mr_frUl">
            <ul id="mr_fu">
            	{{#each this.model.items}}
					<li>
						<a href="{{this.href}}" >
							<img id="{{this.imageid}}" src="{{this.src}}" />
						</a>
						<div class="mr_zhe">
	                        <div class="mr_zhe_i">
	                            <h1>{{this.bigtitle}}</h1>
	                            <div class="mr_zhe_p">
	                            	<h3>
	                            		<span>{{this.uptitle}}</span>{{this.downtitle}}
	                            	</h3>
	                            </div>
                            </div>
                           	<div class="mr_zhe_hover">
                           		<h1><img src="/yntp/img/tool/carousel1/multiplus.gif"></h1>
                            	<div class="mr_zhe_p">
                            		<h3>
	                            		<span>{{this.uptitle}}</span>{{this.downtitle}}
	                            	</h3>
                            	</div>
                        	</div>
                    	</div>
                	</li>
				{{/each}}
			 </ul>
        </div>
        <img class="mr_frBtnR next" src="/yntp/img/tool/carousel1/multinext.gif" />
    </div>
</div>
