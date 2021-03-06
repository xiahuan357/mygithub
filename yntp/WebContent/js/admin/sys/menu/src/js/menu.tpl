<div class='navigation'>
  <ul class="nav nav-stacked">
    {{#each this.model}}
        {{#if this.children}}
    		<li>
				<a id={{this.id}} class='dropdown-collapse' href='javascript:void(0);' url='{{this.url}}'>
                    <i class='{{this.icon}}'></i>
                    <span>{{this.name}}</span>
                    <i class='icon-angle-down angle-down' style="float:right;line-height: 40px;margin-right: 0;"></i>
                </a>	
    			<ul class="nav nav-stacked">
    				{{#each this.children}}
    					<li>
							<a id={{this.id}} class="child" href='javascript:void(0);' url='{{this.url}}'>
		                    <i class='{{this.icon}}'></i>
		                    <span>{{this.name}}</span>
                			</a>	
                		</li>
    				{{/each}}
    			</ul>
    		</li>		
    	{{else}}
    		<li>
	            <a id={{this.id}} class='child' href='javascript:void(0);' url='{{this.url}}'>
	                <i class='{{this.icon}}'></i>
	                <span>{{this.name}}</span>
	            </a>
            </li>
    	{{/if}}
	{{/each}}
  </ul>
</div>
