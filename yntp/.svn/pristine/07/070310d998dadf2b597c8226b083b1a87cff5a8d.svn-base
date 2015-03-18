<div class="row-fluid">
	<div class="span12 box bordered-box blue-border ">

		<div class="box-header contrast-background">
			<div class="title">
				<i class="icon-ban-circle"></i> {{attrs.title}}
			</div>
			<div class="actions">
				{{#if attrs.hasRemove}} <a class="btn box-remove btn-mini btn-link"
					href="#"> <i class='icon-remove'></i>
				</a> {{/if}} {{#if attrs.hasCollapse}} <a
					class="btn box-collapse btn-mini btn-link" href="#"> <i></i>
				</a> {{/if}}
			</div>
		</div>

		<div class="box-content box-no-padding">
			<div id="{{attrs.id}}" style="margin-bottom: 0;" >

				{{#each attrs.blocks}}
					<fieldset>
						<div class="span4">
							<div class="lead">
								<i class="icon-github text-contrast"></i> {{this.title}}
							</div>
							<small class="muted">{{this.description}}</small>
						</div>
						
						<div class="span7 offset1">
							{{#each this.items}}
								<div class='control-group'>
									<!-- the div -->
									{{#if this.isDiv}}
										<div id="{{this.id}}" style=""></div>
									{{/if}}
								</div>
							{{/each}}
						</div>
						
						<div class="text-right">
							{{#each this.buttons}}
								<button id='{{this.id}}' class='{{this.style}}' name='{{this.name}}' type='{{this.type}}'>
				                    {{this.text}}
				                </button>
							{{/each}}
						</div>
					</fieldset>
					<hr class="hr-normal">
				{{/each}}
			</div>
		</div>
	</div>
</div>