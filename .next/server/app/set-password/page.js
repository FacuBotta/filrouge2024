(()=>{var e={};e.id=837,e.ids=[837],e.modules={96330:e=>{"use strict";e.exports=require("@prisma/client")},5486:e=>{"use strict";e.exports=require("bcrypt")},10846:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},19121:e=>{"use strict";e.exports=require("next/dist/server/app-render/action-async-storage.external.js")},3295:e=>{"use strict";e.exports=require("next/dist/server/app-render/after-task-async-storage.external.js")},29294:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-async-storage.external.js")},63033:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-unit-async-storage.external.js")},79646:e=>{"use strict";e.exports=require("child_process")},55511:e=>{"use strict";e.exports=require("crypto")},14985:e=>{"use strict";e.exports=require("dns")},94735:e=>{"use strict";e.exports=require("events")},29021:e=>{"use strict";e.exports=require("fs")},81630:e=>{"use strict";e.exports=require("http")},55591:e=>{"use strict";e.exports=require("https")},91645:e=>{"use strict";e.exports=require("net")},21820:e=>{"use strict";e.exports=require("os")},33873:e=>{"use strict";e.exports=require("path")},27910:e=>{"use strict";e.exports=require("stream")},34631:e=>{"use strict";e.exports=require("tls")},79551:e=>{"use strict";e.exports=require("url")},28354:e=>{"use strict";e.exports=require("util")},74075:e=>{"use strict";e.exports=require("zlib")},4573:e=>{"use strict";e.exports=require("node:buffer")},77598:e=>{"use strict";e.exports=require("node:crypto")},57975:e=>{"use strict";e.exports=require("node:util")},67944:(e,s,r)=>{"use strict";r.r(s),r.d(s,{GlobalError:()=>n.a,__next_app__:()=>c,pages:()=>l,routeModule:()=>p,tree:()=>u});var t=r(70260),a=r(28203),o=r(25155),n=r.n(o),i=r(67292),d={};for(let e in i)0>["default","tree","pages","GlobalError","__next_app__","routeModule"].indexOf(e)&&(d[e]=()=>i[e]);r.d(s,d);let u=["",{children:["set-password",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(r.bind(r,213)),"C:\\Users\\User\\Documents\\Hi world\\ADRAR 2024\\Fil Rouge\\app\\set-password\\page.tsx"]}]},{}],auth:["__DEFAULT__",{},{defaultPage:[()=>Promise.resolve().then(r.bind(r,91985)),"C:\\Users\\User\\Documents\\Hi world\\ADRAR 2024\\Fil Rouge\\app\\@auth\\default.tsx"]}]},{layout:[()=>Promise.resolve().then(r.bind(r,1033)),"C:\\Users\\User\\Documents\\Hi world\\ADRAR 2024\\Fil Rouge\\app\\layout.tsx"],"not-found":[()=>Promise.resolve().then(r.bind(r,89977)),"C:\\Users\\User\\Documents\\Hi world\\ADRAR 2024\\Fil Rouge\\app\\not-found.tsx"],forbidden:[()=>Promise.resolve().then(r.t.bind(r,69116,23)),"next/dist/client/components/forbidden-error"],unauthorized:[()=>Promise.resolve().then(r.t.bind(r,41485,23)),"next/dist/client/components/unauthorized-error"]}],l=["C:\\Users\\User\\Documents\\Hi world\\ADRAR 2024\\Fil Rouge\\app\\set-password\\page.tsx"],c={require:r,loadChunk:()=>Promise.resolve()},p=new t.AppPageRouteModule({definition:{kind:a.RouteKind.APP_PAGE,page:"/set-password/page",pathname:"/set-password",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:u}})},14817:(e,s,r)=>{"use strict";r.r(s),r.d(s,{"7fe13f6264349238c6e48141c1e4a57ee047053936":()=>t.Y});var t=r(53337)},68935:(e,s,r)=>{"use strict";r.r(s),r.d(s,{"7faaecf046cb5b8d941bfcfad4c2bd225f09d86dba":()=>t.O,"7ff9d91c13361dc3a4dd24a54556883017b4825aa1":()=>m});var t=r(43567),a=r(21590);r(70376);var o=r(33582),n=r(80956),i=r(45795),d=r(17038),u=r(49755),l=r(5486),c=r.n(l),p=r(99344);let m=async e=>{let s=await (0,o.j2)(),r=(0,u.h)(e,"id"),t=(0,u.h)(e,"password");if(!s||s.user.id!==r)return{ok:!1,message:"Non connect\xe9"};async function a(e){return await c().hash(e,10)}try{i.$w.parse({password:t});let e=await a(t);return await (0,d.Aw)({id:r,data:{password:e,hasPassword:!0}}),{ok:!0,message:"Mot de passe mis \xe0 jour avec succ\xe8s"}}catch(e){return(0,n.H)(e)}};(0,p.D)([m]),(0,a.A)(m,"7ff9d91c13361dc3a4dd24a54556883017b4825aa1",null)},68700:(e,s,r)=>{Promise.resolve().then(r.bind(r,1563)),Promise.resolve().then(r.bind(r,23104))},55132:(e,s,r)=>{Promise.resolve().then(r.bind(r,71036)),Promise.resolve().then(r.bind(r,20124))},71036:(e,s,r)=>{"use strict";r.d(s,{default:()=>w});var t=r(45512),a=r(26248);let o=(0,a.createServerReference)("7faaecf046cb5b8d941bfcfad4c2bd225f09d86dba",a.callServer,void 0,a.findSourceMapURL,"checkPassword"),n=(0,a.createServerReference)("7ff9d91c13361dc3a4dd24a54556883017b4825aa1",a.callServer,void 0,a.findSourceMapURL,"updatePassword");var i=r(13645),d=r(74490),u=r(95226),l=r(35748),c=r(66712),p=r(79334),m=r(58009),f=r(91542),v=r(24109);function w({id:e,isUpdate:s}){let{update:r,data:a}=(0,c.wV)(),w=(0,p.useRouter)(),[x,h]=(0,m.useTransition)(),[g,b]=(0,m.useState)(!s),[y,P]=(0,m.useState)({password:{message:"",value:!1},oldPassword:{message:"",value:!1}}),A=async e=>{if(!e){P({...y,oldPassword:{message:"Mot de passe manquant",value:!0}}),b(!1);return}h(async()=>{if(!a?.user.email){P(e=>({...e,oldPassword:{message:"Utilisateur non connecte",value:!0}}));return}try{d.$w.safeParse({password:e}),await o({inputPassword:e,email:a.user.email})?(b(!0),P({password:{message:"",value:!1},oldPassword:{message:"",value:!1}})):(P(e=>({...e,oldPassword:{message:"Ancien mot de passe incorrect",value:!0}})),b(!1))}catch(e){console.error("Error checking old password:",e),P(e=>({...e,oldPassword:{message:"Erreur lors de la v\xe9rification",value:!0}}))}})},q=async e=>{e.preventDefault(),P({password:{message:"",value:!1},oldPassword:{message:"",value:!1}}),g||P({...y,oldPassword:{message:"Mot de passe manquant",value:!0}});let s=new FormData(e.currentTarget),t=(0,u.h)(s,"password");if(t!==(0,u.h)(s,"confirmPassword")){P({...y,password:{message:"Les mots de passe ne correspondent pas",value:!0}});return}try{d.$w.parse({password:t}),h(async()=>{let e=await n(s);e?.ok?(await r({hasPassword:!0}),w.push("/profile"),f.o.success("Mot de passe modifi\xe9")):P({...y,password:{message:e?.message,value:!0}})})}catch(s){let e=(0,i.H)(s);console.log({errorHandled:e}),P({password:{message:e.message,value:!0},oldPassword:{message:"",value:!1}})}};return(0,t.jsxs)("form",{className:"primary-form",onSubmit:q,children:[(0,t.jsx)("input",{type:"hidden",name:"id",value:e}),s&&(0,t.jsx)(l.pd,{className:"primary-input",autoFocus:s,onBlur:e=>A(e.target.value),required:!0,label:"Ancien mot de passe",type:"password",name:"oldPassword",placeholder:"Mot de passe",disabled:x,autoComplete:"current-password",success:{message:"Mot de passe v\xe9rifi\xe9",value:g},error:{message:y.oldPassword?.message,value:y.oldPassword?.value}}),(0,t.jsx)(l.yA,{autoFocus:!s,regexp:{message:d.Ug,pattern:d.jk},label:"Nouveau mot de passe",className:"primary-input",name:"password",placeholder:"Nouveau mot de passe",disabled:!g}),(0,t.jsx)(l.yA,{disabled:!g,className:"primary-input",label:"Confirmer le mot de passe",name:"confirmPassword",placeholder:"Confirmer le mot de passe",error:{message:y.password?.message,value:y.password?.value}}),(0,t.jsx)(v.A,{type:"submit",disabled:x||!g,children:s?"Modifier mot de passe":"Cr\xe9er un mot de passe"})]})}},24109:(e,s,r)=>{"use strict";r.d(s,{A:()=>a});var t=r(45512);function a({onClick:e,width:s,children:r,type:a}){return(0,t.jsx)("button",{type:a||"button",style:{width:s||"fit-content"},onClick:e,className:"inline-flex items-center justify-center px-4 py-1 border-2 text-lg rounded-lg bg-light-yellow text-dark-bg font-bold border-dark-bg hover:shadow-lg  transition-transform duration-300 ease-in-out ",children:r})}r(58009)},13645:(e,s,r)=>{"use strict";r.d(s,{H:()=>o});class t extends Error{constructor(e,s){super(e),this.name=this.constructor.name,this.ok=!1,this.message=e,this.errors=s}}var a=r(16131);function o(e){if(e instanceof a.G){let s=e.errors.map(({message:e,path:s})=>({message:e,path:s}));return new t(s.map(e=>e.message).join(", "),s)}return new t("Une erreur est survenue")}},43567:(e,s,r)=>{"use strict";r.d(s,{O:()=>u});var t=r(21590);r(70376);var a=r(45795),o=r(5486),n=r.n(o),i=r(67611),d=r(99344);let u=async({inputPassword:e,hashedPassword:s,email:r})=>{try{if(s)return await n().compare(e,s);if(!s&&r){a.y4.parse({email:r});let s=await (0,i.A)(r);if(!s?.password)return!1;let t=s.password;return await n().compare(e,t)}return!1}catch(e){return console.error("Error al verificar la contrase\xf1a:",e),!1}};(0,d.D)([u]),(0,t.A)(u,"7faaecf046cb5b8d941bfcfad4c2bd225f09d86dba",null)},67611:(e,s,r)=>{"use strict";r.d(s,{A:()=>o});var t=r(21590);r(70376);var a=r(17038);async function o(e){try{return await (0,a.cT)({email:e})}catch(e){return console.log(e),null}}(0,r(99344).D)([o]),(0,t.A)(o,"40b80a991cc8f7c1cc7ee98d4d6ab0d55315e6e3e4",null)},213:(e,s,r)=>{"use strict";r.r(s),r.d(s,{default:()=>d});var t=r(62740),a=r(53337),o=r(1563),n=r(23104),i=r(31831);async function d(){let{user:e}=await (0,a.Y)();e||(0,i.redirect)("/login");let s=e?.hasPassword||!1;return(0,t.jsx)("div",{className:"bg-light-ciel dark:bg-dark-bg h-screen",children:(0,t.jsx)(n.default,{children:(0,t.jsxs)("div",{className:"flex flex-col items-center justify-center self-start gap-10 p-24 ",children:[(0,t.jsx)("h1",{className:"text-6xl font-bold text-light-grey text-balance text-center",children:s?"Modification de mot de passe":"Bienvenue sur EventHub !"}),(0,t.jsx)("div",{className:"text-center text-light-grey",children:(0,t.jsx)("p",{className:"text-2xl",children:s?"Tu peux choisir un nouveau mot de passe":"Vous devez d'abord cr\xe9er un mot de passe pour pouvoir commencer."})}),(0,t.jsx)(o.default,{isUpdate:e.hasPassword,id:e.id})]})})})}},1563:(e,s,r)=>{"use strict";r.d(s,{default:()=>t});let t=(0,r(46760).registerClientReference)(function(){throw Error("Attempted to call the default export of \"C:\\\\Users\\\\User\\\\Documents\\\\Hi world\\\\ADRAR 2024\\\\Fil Rouge\\\\components\\\\forms\\\\passwordForm.tsx\" from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"C:\\Users\\User\\Documents\\Hi world\\ADRAR 2024\\Fil Rouge\\components\\forms\\passwordForm.tsx","default")},80956:(e,s,r)=>{"use strict";r.d(s,{H:()=>o});class t extends Error{constructor(e,s){super(e),this.name=this.constructor.name,this.ok=!1,this.message=e,this.errors=s}}var a=r(16500);function o(e){if(e instanceof a.G){let s=e.errors.map(({message:e,path:s})=>({message:e,path:s}));return new t(s.map(e=>e.message).join(", "),s)}return new t("Une erreur est survenue")}},49755:(e,s,r)=>{"use strict";r.d(s,{S:()=>a,h:()=>t});let t=(e,s)=>{let r=e.get(s);return"string"==typeof r?r.trim():""},a=(e,s)=>{let r=e.get(s);return r instanceof File?r:null}}};var s=require("../../webpack-runtime.js");s.C(e);var r=e=>s(s.s=e),t=s.X(0,[87,895,671,512,500,899,321],()=>r(67944));module.exports=t})();