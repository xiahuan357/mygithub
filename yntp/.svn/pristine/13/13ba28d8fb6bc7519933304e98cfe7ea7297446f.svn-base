<div class="{{attrs.spansize}} box">
    {{#if attrs.title}}
	    <div class="box-header contrast-background">
	        <div class="title" id="formboxtitle">
	            {{attrs.title}}
	        </div>
	        <div class='actions'>
	            {{#if attrs.hasCollapse}}
	            	<a class="btn box-collapse btn-mini btn-link" href="#"><i></i></a>
	            {{/if}}
	        </div>
	    </div>
    {{/if}}
    {{#if attrs.useBoxContent}}
    <div class='{{attrs.boxContentStyle}}'>
    {{/if}}
        <div id="{{attrs.id}}_appendmsg"></div>
        <form id="{{attrs.id}}" class="form form-horizontal validate-form" >
            {{#each attrs.items}}
            <div class='control-group'>
                {{#if this.isOnlyDiv}}
                	<div id="{{this.id}}"></div>
                {{else}}
	                {{#if this.isHidden}}
	                	<input id="{{this.id}}" name="{{this.name}}" type="hidden" value="{{this.value}}" />
	                {{else}}
	                <label class="control-label" for="{{this.name}}">{{this.label}}</label>
	                <div class="controls">
                    {{#if this.isPassword}}
                    	<input
                    	{{#if this.validations.minlength}} 
                    		data-rule-minlength='{{this.validations.minlength}}'
                    	{{/if}}
                    	{{#if this.validations.required}}
                    		data-rule-password='true' data-rule-required='true'
                    	{{/if}}
                   		id='{{this.id}}'  placeholder='Password' type='{{this.type}}'>
                    {{else}}
                    {{#if this.isCheckBox}}
                    	<div id="{{this.id}}">
	                    	{{#each this.options}}
	                    		<label class="checkbox inline">
	                        		<input type="checkbox" name="{{this.name}}" value="{{this.id}}">{{this.text}} 
	                        	</label>
	                    	{{/each}}
	                    </div>
                    {{else}}
                    {{#if this.isRadio}}
	                    {{#each this.options}}
		                    <label class='radio inline'>
		                        <input type='radio' id="{{this.id}}" name="{{this.name}}" value="{{this.value}}"
		                        {{#if this.checked}}
		                        checked
		                        {{/if}}
		                        >
		                        {{this.lable}} 
		                    </label>
	                    {{/each}}
                    {{else}}
                    {{#if this.isSelect}}
	                    {{#if this.options}}
		                    <select id="{{this.id}}" name="{{this.name}}" class="populate span6 input-block-level {require:true}" style="{{this.style}}">
		                        {{#each this.options}}
		                        	<option value = "{{this.value}}">{{option}}</option>
		                        {{/each}}
		                    </select>
	                    {{else}}
		                    <input  
		                    {{#if this.validations.select2}}
		                    	data-rule-select2='{{this.validations.select2}}'
	                    	{{/if}}
		                    {{#if this.validations.required}}
		                    	data-rule-required='true'
	                    	{{/if}}
                   	 		type="hidden" id="{{this.id}}" name="{{this.name}}" style="{{this.style}}"/>
                   		{{/if}}
                    {{else}}
                    {{#if this.isDatepicker}}
                    <div id="{{this.id}}" name="{{this.name}}" class="input-append date">
                        <input type="text" value="{{this.value}}" disable>
                        </input>
                        <span class="add-on"> <i data-time-icon="icon-time" data-date-icon="icon-calendar"> </i> </span>
                    </div>
                    {{else}}
                    {{#if this.isDaterange}}
                    <div style="{{this.style}}">
                        <div class='input-append'>
                          <input id="{{attrs.daterangeId}}input" placeholder={{this.placeholder}} class='input-medium daterange span12'  type='text'>
                          <span class='add-on' id='{{this.id}}'>
                            <i class='icon-calendar'></i>
                          </span>
                        </div>
                    </div>
                    {{else}}
                    {{#if this.isRange}}
                    <input name="{{this.minName}}" type="text" class="nc-form-textfield-range J-{{this.minName}}" />
                    到
                    <input name="{{this.maxName}}" type="text" class="nc-form-textfield-range J-{{this.maxName}}" />
                    {{else}}
                    {{#if this.isDiv}}
                    	<div id="{{this.id}}"></div>
                    {{else}}
                    {{#if this.isFileupload}}
                    <div class="btn-group">
                        <span class="btn btn-success fileinput-button"> <i class="glyphicon glyphicon-plus"></i> <span>添加文件...</span>
                            <input id="fileupload" type="file" name="files[]" multiple>
                        </span>
                    </div>
                    <br/>
                    <div id="progress" class="progress progress-success progress-striped">
                        <div class="bar"></div>
                    </div>
                    <div id="newfiles" class="files"></div>
                    <div id="oldfiles" class="files"></div>
                    {{else}}
                    {{#if this.isUEditor}}
                    <script id="{{this.id}}" name="{{this.name}}" type="text/plain"></script>
                    {{else}}
                    {{#if this.isTextarea}}
                    <textarea 
                    {{#if this.validations.required}}
                    data-rule-required='true'
                    {{/if}}
                    {{#if this.validations.minlength}}
                    data-rule-minlength='{{this.validations.minlength}}'
                    {{/if}}
                    {{#if this.validations.maxlength}}
                    data-rule-maxlength='{{this.validations.maxlength}}'
                    {{/if}}
                    id="{{this.id}}" rows="{{this.rows}}" name="{{this.name}}" class="" placeholder="{{this.placeholder}}" style="{{this.style}}">{{this.value}}</textarea>
                    {{else}}
                    <input
                    {{#if this.validations.required}}
                    data-rule-required='true'
                    {{/if}}
                    {{#if this.validations.minlength}}
                    data-rule-minlength='{{this.validations.minlength}}'
                    {{/if}}
                    {{#if this.validations.maxlength}}
                    data-rule-maxlength='{{this.validations.maxlength}}'
                    {{/if}}
                    {{#if this.validations.rangelength}}
                    data-rule-rangelength='{{this.validations.rangelength}}'
                    {{/if}}
                    {{#if this.validations.min}}
                    min='{{this.validations.min}}'
                    {{/if}}
                    {{#if this.validations.max}}
                    max='{{this.validations.max}}'
                    {{/if}}
                    {{#if this.validations.range}}
                    data-rule-range='{{this.validations.range}}'
                    {{/if}}
                    {{#if this.validations.number}}
                    data-rule-number="true"
                    {{/if}}
                    {{#if this.validations.equalto}}
                    data-rule-equalto='#{{this.validations.equalto}}'
                    {{/if}}
                    {{#if this.validations.email}}
                    data-rule-email='#{{this.validations.email}}'
                    {{/if}}
                    {{#if this.validations.digits}}
                    data-rule-digits='#{{this.validations.digits}}'
                    {{/if}}
                    {{#if this.validations.date}}
                    data-rule-date='#{{this.validations.date}}'
                    {{/if}}
                    {{#if this.validations.remote}}
                    data-rule-remote='#{{this.validations.remote}}'
                    {{/if}}
                    {{#if this.validations.url}}
                    data-rule-url='#{{this.validations.url}}'
                    {{/if}}
                    {{#if this.validations.creditcard}}
                    data-rule-creditcard='#{{this.validations.creditcard}}'
                    {{/if}}
                    {{#if this.readonly}}
                    readonly
                    {{/if}}
                    id={{this.id}} name="{{this.name}}" type="{{this.type}}" value="{{this.value}}" class="nc-form-textfield J-{{this.name}}"  placeholder="{{this.placeholder}}" style="{{this.style}}"/>
                    {{/if}}
                    {{/if}}
                    {{/if}}
                    {{/if}}
                    {{/if}}
                    {{/if}}
                    {{/if}}
                    {{/if}}
                    {{/if}}
                    {{/if}}
                    {{/if}}
                </div>
                {{/if}}
                {{/if}}
            </div>
            {{/each}}

            {{#if attrs.buttons}}
            <div class='form-actions' style='margin-bottom:0'>
                {{#each attrs.buttons}}
                <button id='{{this.id}}' class='btn {{this.style}}' name='{{this.name}}' type='{{this.type}}'>
                    {{this.text}}
                </button>
                {{/each}}
            </div>
            {{/if}}
        </form>
    {{#if attrs.useBoxContent}}
    </div>
    {{/if}}

</div>
<!-- <div class="clear"></div>-->