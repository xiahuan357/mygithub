<!-- Modal -->
<div class="modal fade" id="{{attrs.id}}" tabindex="-1" role="dialog"  aria-hidden="true" style="{{attrs.style}}" >
  <div class="modal-dialog">
    <div class="modal-content">
      
      {{#if attrs.isshowheader}}
      	 <div class="modal-header contrast-background">
        	<button type="button" class="close" data-dismiss="modal" aria-hidden="true" style="color: white">&times;</button>
        	<h3 style="color: white" >{{attrs.title}}</h3>
      	</div>
      {{/if}}
     
      <div class="modal-body">
			{{#each attrs.items}}
				<div class='control-group'>
					 <!-- the div -->
					 {{#if this.isDiv}}
						<div id="{{this.id}}"  style="this.style"></div>
					 {{/if}}
				</div>
			{{/each}}
      </div>
      
      {{#if attrs.isshowfooter}}
	      <div class="modal-footer">
				<button id='btndialogsave' type="button" class="btn btn-primary contrast-background" >确定</button>
		        <button id='btndialogcancel' type="button" class="btn btn-default" >取消</button>
	      </div>
      {{/if}}
    </div><!-- /.modal-content -->
  </div><!-- /.modal-dialog -->
</div><!-- /.modal -->
