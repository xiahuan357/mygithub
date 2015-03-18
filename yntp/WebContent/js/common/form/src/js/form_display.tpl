<div class='span12' style='margin-left:0' id="{{attrs.id}}">
	<div class='row-fluid'>
		<div class="{{attrs.spansize}} box">
			{{#each attrs.items}}
				<div class='row-fluid' style="margin-top:10px;border:solid #DDDDDD;border-width:0px 0px 1px 0px">
					{{#if this.colums}}
						{{#each this.colums}}
							<div class="{{this.labelclass}}" style="text-align:right;height:40px;line-height:40px">{{this.label}}：</div>
							<div class="{{this.valueclass}}" style="text-align:left;height:40px;line-height:40px" style={{this.style}}>{{this.value}}</div>	
						{{/each}}
					{{else}}
						{{#if this.ispicture}}
							<div class="{{this.labelclass}}" style="text-align:right;height:40px;line-height:40px">{{this.label}}：</div>
							<div class="{{this.valueclass}}" style="text-align:left;">
								<img id="{{this.id}}" alt="" style="height:{{this.height}};width:{{this.width}}" class=""  onError="/yntp/img/common/default-1.png">
							</div>
						{{else}}
							<div class="{{this.labelclass}}" style="text-align:right;height:40px;line-height:40px">{{this.label}}：</div>
							<div class="{{this.valueclass}}" style="text-align:left;height:40px;line-height:40px">{{this.value}}</div>	
						{{/if}}
					{{/if}}
				</div>
			{{/each}}
		</div>
	</div>
	{{#if attrs.otherCons}}
		{{#each attrs.otherCons}}
			<div class='row-fluid'>
				<div class="{{this.spansize}} box">
					{{#if this.contitle}}
						<div class="box-header contrast-background" style="border-bottom:1px solid #fff;">
			        		<div class="title">{{this.contitle}}</div>
			    		</div>
		    		{{/if}}
		    		<div id="{{this.id}}"></div>
				</div>
			</div>
		{{/each}}
	{{/if}}
	{{#if attrs.buttons}}
		<div class='row-fluid'>
			<div class="{{this.spansize}} box" id="{{this.id}}">
				<div class='form-actions' style='text-align:center;margin-bottom:0'>
					{{#each attrs.buttons}}
			    		<button id='{{this.id}}' class='btn btn-contrast contrast-background' name='{{this.name}}' type='{{this.type}}'>
			      			<i class='icon-{{this.icon}}'></i>{{this.text}}
			    		</button>
					{{/each}}
	    		</div>
			</div>
		</div>
	{{/if}}
</div>

