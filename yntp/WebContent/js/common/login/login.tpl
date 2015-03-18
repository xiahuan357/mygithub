<div class="row-fluid">
	<div class="dialog span3">
		<div class="block" style="min-width:434px">
			<div class="block-heading"><center>云南旅游平台登录</center></div>
			<div class="block-body">
				<form>
					<div class="row-fluid" style="margin-top:20px">
                		<div class="span12" style="margin-left:45px">
                			<div class="input-prepend span12">
								<span class="add-on"><i class="icon-user"></i></span> 
								<input class="span8" id="username" value="" placeholder="用户名/邮箱/手机号" type="text">
							</div>
						</div>
					</div>
					
					<div class="row-fluid" >
                		<div class="span12" style="margin-left:45px">
                			<div class="input-prepend span12">
								<span class="add-on"><i class="icon-lock"></i></span> 
								<input class="span8" id="password" value="" placeholder="密码" type="password">
							</div>
						</div>
					</div>
					

					{{#if attrs.isusevalidate}}
						<div class="row-fluid" ">
	                		<div class="span12" style="margin-left:45px">
	                			<div class="input-prepend span12">
									<span class="add-on"><i class="icon-edit"></i></span> 
									<input value="" id="code" placeholder="验证码" class="span6" type="text">
									<img id="codeImage" title="点击更换">							
								</div>
							</div>
						</div>
					{{/if}}
					<hr style="margin-left:0;margin-right:0">
					<div class="row-fluid" style="margin-top:20px">
                		<div class="span12" style="margin-left:45px">
                			<input id="btn_login" name="submit" class='btn btn-success span4' value="登录">
							</input>
							<input id="btn_register" name="submit" class='btn btn-primary span4 '  style="margin-left:33px" value="注册">
							</input>
						</div>
					</div>
					<span class="title text-error" style="margin-top: 5px" id="msg"></span>
				</form>
			</div>
		</div>
	</div>
</div>