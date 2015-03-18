<div class='fuelux'>
			<div class='wizard' id='wizard'>
				<ul class='steps'>
					{{#each attrs.steptitles}} 
						{{#if this.active}}
							<li class='active' data-target='{{this.target}}'>
						{{else}}
							<li class='' data-target='{{this.target}}'>
						{{/if}} 
						<span class='step'>{{this.title}}</span>
						</li> 
					{{/each}}
				</ul>
				<div class='actions'>
					<button class='btn btn-prev'>
						<i class='icon-arrow-left'></i>上一步
					</button>
					<button type="submit style=" color:white;" class='btn btn-next btn-contrast start' data-last='完成'
						id="start-hbase-upload">
						<i class='icon-arrow-right'></i>下一步 
					</button>
				</div>
			</div>
			<div class='step-content'>
				<hr class='hr-normal'>
					{{#each attrs.stepcontents}} 
						{{#if this.active}}
							<div class='step-pane active' id='{{this.id}}'>
						{{else}}
							<div class='step-pane' id='{{this.id}}'>
						{{/if}}
						</div>
					{{/each}}
			</div>
		</div>