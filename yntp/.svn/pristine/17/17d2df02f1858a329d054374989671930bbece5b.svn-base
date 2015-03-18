<link rel="stylesheet" type="text/css" href="/yntp/css/tool/bootstrap/nav-bar.css"/>
<div class="main-nav">
  <div class="user-inf">
  	<div style="margin-top:9px;color:white" id="admininfodiv">
  		<img src="/yntp/img/admin/sys/header/sysadmin_photo.png">
  	</div>
  </div>
  <ul class="nav" id="mhover">
     {{#each this.model}}
        <li class={{this.liclass}} >
           <a href="javascript:void(0);">
              <i class=" icon-large {{this.iclass}}" style="line-height:0.86em"><div style="font-size:8px;">{{this.name}}</div>  
              </i>
           </a>
           <ul class={{this.ulclass}} id="dropmenus" >
             {{#each this.children}}    
               <li>
                 <a class="mchild" href="javascript:void(0);" url={{this.url}}>
                   <span>{{this.name}}</span>
                 </a>
               </li>
             {{/each}}  
           </ul>
        </li>
     {{/each}}
  </ul>
</div> 
              