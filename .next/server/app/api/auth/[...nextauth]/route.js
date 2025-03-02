(()=>{var e={};e.id=14,e.ids=[14],e.modules={96330:e=>{"use strict";e.exports=require("@prisma/client")},10846:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},44870:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},19121:e=>{"use strict";e.exports=require("next/dist/server/app-render/action-async-storage.external.js")},3295:e=>{"use strict";e.exports=require("next/dist/server/app-render/after-task-async-storage.external.js")},29294:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-async-storage.external.js")},63033:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-unit-async-storage.external.js")},79646:e=>{"use strict";e.exports=require("child_process")},55511:e=>{"use strict";e.exports=require("crypto")},14985:e=>{"use strict";e.exports=require("dns")},94735:e=>{"use strict";e.exports=require("events")},29021:e=>{"use strict";e.exports=require("fs")},81630:e=>{"use strict";e.exports=require("http")},55591:e=>{"use strict";e.exports=require("https")},91645:e=>{"use strict";e.exports=require("net")},21820:e=>{"use strict";e.exports=require("os")},33873:e=>{"use strict";e.exports=require("path")},27910:e=>{"use strict";e.exports=require("stream")},34631:e=>{"use strict";e.exports=require("tls")},79551:e=>{"use strict";e.exports=require("url")},28354:e=>{"use strict";e.exports=require("util")},74075:e=>{"use strict";e.exports=require("zlib")},4573:e=>{"use strict";e.exports=require("node:buffer")},77598:e=>{"use strict";e.exports=require("node:crypto")},57975:e=>{"use strict";e.exports=require("node:util")},44771:(e,r,t)=>{"use strict";t.r(r),t.d(r,{patchFetch:()=>x,routeModule:()=>p,serverHooks:()=>d,workAsyncStorage:()=>c,workUnitAsyncStorage:()=>l});var s={};t.r(s),t.d(s,{GET:()=>a,POST:()=>u});var i=t(42706),o=t(28203),n=t(45994);let{GET:a,POST:u}=t(39290).Y9,p=new i.AppRouteRouteModule({definition:{kind:o.RouteKind.APP_ROUTE,page:"/api/auth/[...nextauth]/route",pathname:"/api/auth/[...nextauth]",filename:"route",bundlePath:"app/api/auth/[...nextauth]/route"},resolvedPagePath:"C:\\Users\\User\\Documents\\Hi world\\ADRAR 2024\\Fil Rouge\\app\\api\\auth\\[...nextauth]\\route.ts",nextConfigOutput:"",userland:s}),{workAsyncStorage:c,workUnitAsyncStorage:l,serverHooks:d}=p;function x(){return(0,n.patchFetch)({workAsyncStorage:c,workUnitAsyncStorage:l})}},96487:()=>{},78335:()=>{},39290:(e,r,t)=>{"use strict";t.d(r,{j2:()=>d,Y9:()=>l});var s=t(46814),i=t(96330),o=t(93220),n=t(23352),a=t(63367),u=t(72619),p=t(98721);let c=new i.PrismaClient,{handlers:l,auth:d,signIn:x,signOut:v}=(0,o.Ay)({trustHost:!0,adapter:(0,s.y)(c),secret:process.env.AUTH_SECRET,session:{strategy:"jwt",maxAge:604800,updateAge:604800},pages:{signIn:"/login",error:"/login/error"},callbacks:{jwt:async({token:e,trigger:r,session:t,user:s})=>(s&&(e.id=s.id,e.role=s.role,e.hasPassword=s.hasPassword),"update"===r&&t?.hasPassword!==void 0&&(e.hasPassword=t.hasPassword),e),session:async({session:e,token:r})=>({...e,user:{id:r.id,role:r.role,email:r.email,hasPassword:r.hasPassword}})},providers:[(0,a.A)({clientId:process.env.AUTH_GOOGLE_ID,clientSecret:process.env.AUTH_GOOGLE_SECRET,allowDangerousEmailAccountLinking:!0,authorization:{params:{prompt:"consent",access_type:"offline",response_type:"code"}}}),(0,u.A)({server:{host:process.env.EMAIL_SERVER_HOST,port:parseInt(process.env.EMAIL_SERVER_PORT,10),auth:{user:process.env.EMAIL_SERVER_USER,pass:process.env.EMAIL_SERVER_PASSWORD}},from:process.env.EMAIL_FROM,sendVerificationRequest:async e=>{let{identifier:r,url:t,provider:s}=e,i=(0,p.oO)(s.server),o=await i.sendMail({to:r,from:s.from,subject:"Bienvenue sur EventHub !",text:function({url:e}){return`Bienvenue sur EventHub !
Nous sommes ravis de vous accueillir. Pour continuer, cliquez sur le lien suivant pour vous connecter:
${e}

Si vous n'avez pas demand\xe9 cette connexion, vous pouvez ignorer cet email.
`}({url:t}),html:function(e){let{url:r}=e,t="#444";return`
<body style="background: #f9f9f9;">
  <table width="100%" border="0" cellspacing="20" cellpadding="0"
    style="background: #fff; max-width: 600px; margin: auto; border-radius: 10px;">
    <tr>
      <td align="center"
        style="padding: 10px 0px; font-size: 22px; font-family: Helvetica, Arial, sans-serif; color: ${t};">
        Bienvenue sur <strong>EventHub</strong> !
      </td>
    </tr>
    <tr>
      <td align="center"
        style="padding: 5px 0px 20px 0px; font-size: 16px; font-family: Helvetica, Arial, sans-serif; color: ${t};">
        Nous sommes ravis de vous accueillir. Pour continuer, cliquez sur le bouton ci-dessous pour commencer \xe0 utiliser votre compte !.
      </td>
    </tr>
    <tr>
      <td align="center" style="padding: 20px 0;">
        <table border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td align="center" style="border-radius: 5px;" bgcolor="#F3D250">
              <a href="${r}" target="_blank"
                style="font-size: 18px; font-family: Helvetica, Arial, sans-serif; color: black; text-decoration: none; border-radius: 5px; padding: 10px 20px; border: 1px solid black; display: inline-block; font-weight: bold;">
                Se connecter
              </a>
            </td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td align="center"
        style="padding: 0px 0px 10px 0px; font-size: 16px; line-height: 22px; font-family: Helvetica, Arial, sans-serif; color: ${t};">
        Si vous n'avez pas demand\xe9 cette connexion, vous pouvez ignorer cet email.
      </td>
    </tr>
  </table>
</body>
`}({url:t})}),n=o.rejected.concat(o.pending).filter(Boolean);if(n.length)throw Error(`Email(s) (${n.join(", ")}) could not be sent`)}}),(0,n.A)({name:"Credentials",authorize:async e=>e?{id:e.id,role:e.role,hasPassword:"true"===e.hasPassword,email:e.email}:null})]})},42706:(e,r,t)=>{"use strict";e.exports=t(44870)}};var r=require("../../../../webpack-runtime.js");r.C(e);var t=e=>r(r.s=e),s=r.X(0,[87],()=>t(44771));module.exports=s})();