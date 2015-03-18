<form enctype='multipart/form-data' id='fileupload' >
	<script type="text/plain" id={{attrs.editorid}}></script>
	<div class='row-fluid fileupload-buttonbar'>
		<div class='span7'>
			<a id="{{attrs.editorid}}_btn_addimage" name="btn_addimage" class='btn btn-info start'>
				<i class='icon-plus icon-white'></i> <span>添加</span>
			</a>
			<a id="{{attrs.editorid}}_btn_delimage" name="btn_delimage" class='btn btn-primary start'>
				<i class='icon-trash icon-white'></i> <span>删除</span>
			</a>
			<a id="{{attrs.editorid}}_btn_setcover" name="btn_setcover" class='btn btn-warning cancel'>
				<i class='icon-th icon-white'></i> <span>设为封面</span>
			</a>
		</div>
	</div>
	<hr style="margin-left: 0; margin-right: 0px">
	<br>
	<div id="{{attrs.editorid}}_displayWrapperDiv">
		<div class="row-fluid pricing-tables">
			<ul class="inline picture"  id="{{attrs.editorid}}_imagelist"> 
			</ul>
		</div>
	</div>
</form>