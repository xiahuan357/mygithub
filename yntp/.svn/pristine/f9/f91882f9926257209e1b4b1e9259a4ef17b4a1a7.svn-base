<table id={{attrs.id}} style="magin-bottom:0;" class="table 
    {{#if attrs.isStriped}} table-striped {{/if}}
    {{#if attrs.isHovered}} table-hover {{/if}}
    {{#if attrs.isBordered}} table-bordered {{/if}}
">
    <thead style="{{attrs.theadAddStyle}}" class="{{attrs.theadAddClass}}">
        <tr>
			{{#if attrs.isCheckAll}}
			<th class='only-checkbox '>
                <input class='check-all' type='checkbox'>
            </th>
		    {{/if}}
		    {{#each attrs.columns}}
			<th>{{this.label}}</th>
			{{/each}}
		</tr>
	</thead>
	<tbody>
	</tbody>
</table>