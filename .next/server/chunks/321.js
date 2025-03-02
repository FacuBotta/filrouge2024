"use strict";exports.id=321,exports.ids=[321],exports.modules={20124:(e,t,r)=>{r.d(t,{default:()=>a});var s=r(45512);function a({children:e}){return(0,s.jsx)("div",{className:"no-scrollbar pt-[100px] fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center overflow-y-scroll",children:e})}r(58009)},74490:(e,t,r)=>{r.d(t,{$w:()=>o,Ug:()=>n,Wo:()=>d,jk:()=>i,q8:()=>c,y4:()=>a});var s=r(16131);let a=s.z.object({email:s.z.string().email({message:"Veuillez utiliser une adresse e-mail valide"})}),i=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#@$!%*?&])[A-Za-z\d#@$!%*?&]{8,30}$/,n="8 caract\xe8res, une majuscule, une minuscule, un chiffre et un caract\xe8re sp\xe9cial, ' \" _ - ne sont pas autoris\xe9s",o=s.z.object({password:s.z.string().min(8,{message:"Le mot de passe doit \xeatre de 8 caract\xe8res minimum"}).max(30,{message:"Le mot de passe doit \xeatre de 30 caract\xe8res maximum"}).regex(i,{message:n})});s.z.object({email:s.z.string().email({message:"Veuillez utiliser une adresse e-mail valide"})});let l=s.z.object({url:s.z.string().url(),lat:s.z.number(),lng:s.z.number(),formattedAddress:s.z.string(),vicinity:s.z.string()}),d=s.z.object({categoryId:s.z.string(),title:s.z.string().max(100,{message:"Le titre doit \xeatre de 100 caract\xe8res maximum"}),description:s.z.string().min(30,{message:"Il faut un peu de l'inspiration pour cette description!"}).max(1e3,{message:"La description doit \xeatre de 1000 caract\xe8res maximum"}),eventStart:s.z.date().refine(e=>{let t=new Date;return!isNaN(e.getTime())&&e>=t},{message:"La date doit \xeatre valide et ne peut pas \xeatre dans le pass\xe9"}),eventEnd:s.z.date().nullable().refine(e=>{if(!e)return!0;let t=new Date;return!isNaN(e.getTime())&&e>=t},{message:"La date doit \xeatre valide et ne peut pas \xeatre dans le pass\xe9"}),isPublic:s.z.boolean(),participants:s.z.array(s.z.string()),address:l,image:s.z.instanceof(File)});s.z.string().regex(RegExp("^(sport|education|language|city tours|air libre|autres)$"),{message:"Titre invalide"});let c=s.z.object({username:s.z.string().max(30,"Le nom d'utilisateur doit comporter 30 caract\xe8res ou moins").optional(),image:s.z.union([s.z.instanceof(File).refine(e=>e.size<=2097152,{message:"La taille de l'image doit \xeatre de 2 Mo ou moins"}),s.z.null(),s.z.undefined()]).optional(),description:s.z.string().max(1e3,"La description doit comporter 1000 caract\xe8res ou moins").optional(),oldImage:s.z.string().optional()}),u=s.z.object({id:s.z.string(),email:s.z.string().email().nullable(),username:s.z.string().nullable(),image:s.z.string().nullable(),description:s.z.string().nullable(),_count:s.z.object({Ratings:s.z.number(),EventsCreated:s.z.number()})});s.z.array(u)},95226:(e,t,r)=>{r.d(t,{S:()=>a,h:()=>s});let s=(e,t)=>{let r=e.get(t);return"string"==typeof r?r.trim():""},a=(e,t)=>{let r=e.get(t);return r instanceof File?r:null}},23104:(e,t,r)=>{r.d(t,{default:()=>s});let s=(0,r(46760).registerClientReference)(function(){throw Error("Attempted to call the default export of \"C:\\\\Users\\\\User\\\\Documents\\\\Hi world\\\\ADRAR 2024\\\\Fil Rouge\\\\components\\\\layouts\\\\Backdrop.tsx\" from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"C:\\Users\\User\\Documents\\Hi world\\ADRAR 2024\\Fil Rouge\\components\\layouts\\Backdrop.tsx","default")},33582:(e,t,r)=>{r.d(t,{j2:()=>m,Jv:()=>p,CI:()=>g});var s=r(37067),a=r(96330),i=r(27261),n=r(73993),o=r(61088),l=r(7956),d=r(30342);let c=new a.PrismaClient,{handlers:u,auth:m,signIn:p,signOut:g}=(0,i.Ay)({trustHost:!0,adapter:(0,s.y)(c),secret:process.env.AUTH_SECRET,session:{strategy:"jwt",maxAge:604800,updateAge:604800},pages:{signIn:"/login",error:"/login/error"},callbacks:{jwt:async({token:e,trigger:t,session:r,user:s})=>(s&&(e.id=s.id,e.role=s.role,e.hasPassword=s.hasPassword),"update"===t&&r?.hasPassword!==void 0&&(e.hasPassword=r.hasPassword),e),session:async({session:e,token:t})=>({...e,user:{id:t.id,role:t.role,email:t.email,hasPassword:t.hasPassword}})},providers:[(0,o.A)({clientId:process.env.AUTH_GOOGLE_ID,clientSecret:process.env.AUTH_GOOGLE_SECRET,allowDangerousEmailAccountLinking:!0,authorization:{params:{prompt:"consent",access_type:"offline",response_type:"code"}}}),(0,l.A)({server:{host:process.env.EMAIL_SERVER_HOST,port:parseInt(process.env.EMAIL_SERVER_PORT,10),auth:{user:process.env.EMAIL_SERVER_USER,pass:process.env.EMAIL_SERVER_PASSWORD}},from:process.env.EMAIL_FROM,sendVerificationRequest:async e=>{let{identifier:t,url:r,provider:s}=e,a=(0,d.oO)(s.server),i=await a.sendMail({to:t,from:s.from,subject:"Bienvenue sur EventHub !",text:function({url:e}){return`Bienvenue sur EventHub !
Nous sommes ravis de vous accueillir. Pour continuer, cliquez sur le lien suivant pour vous connecter:
${e}

Si vous n'avez pas demand\xe9 cette connexion, vous pouvez ignorer cet email.
`}({url:r}),html:function(e){let{url:t}=e,r="#444";return`
<body style="background: #f9f9f9;">
  <table width="100%" border="0" cellspacing="20" cellpadding="0"
    style="background: #fff; max-width: 600px; margin: auto; border-radius: 10px;">
    <tr>
      <td align="center"
        style="padding: 10px 0px; font-size: 22px; font-family: Helvetica, Arial, sans-serif; color: ${r};">
        Bienvenue sur <strong>EventHub</strong> !
      </td>
    </tr>
    <tr>
      <td align="center"
        style="padding: 5px 0px 20px 0px; font-size: 16px; font-family: Helvetica, Arial, sans-serif; color: ${r};">
        Nous sommes ravis de vous accueillir. Pour continuer, cliquez sur le bouton ci-dessous pour commencer \xe0 utiliser votre compte !.
      </td>
    </tr>
    <tr>
      <td align="center" style="padding: 20px 0;">
        <table border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td align="center" style="border-radius: 5px;" bgcolor="#F3D250">
              <a href="${t}" target="_blank"
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
        style="padding: 0px 0px 10px 0px; font-size: 16px; line-height: 22px; font-family: Helvetica, Arial, sans-serif; color: ${r};">
        Si vous n'avez pas demand\xe9 cette connexion, vous pouvez ignorer cet email.
      </td>
    </tr>
  </table>
</body>
`}({url:r})}),n=i.rejected.concat(i.pending).filter(Boolean);if(n.length)throw Error(`Email(s) (${n.join(", ")}) could not be sent`)}}),(0,n.A)({name:"Credentials",authorize:async e=>e?{id:e.id,role:e.role,hasPassword:"true"===e.hasPassword,email:e.email}:null})]})},40492:(e,t,r)=>{r.d(t,{A:()=>a});var s=r(96330);let a=globalThis.prismaGlobal??new s.PrismaClient},45795:(e,t,r)=>{r.d(t,{$w:()=>i,Wo:()=>o,q8:()=>l,y4:()=>a});var s=r(16500);let a=s.z.object({email:s.z.string().email({message:"Veuillez utiliser une adresse e-mail valide"})}),i=s.z.object({password:s.z.string().min(8,{message:"Le mot de passe doit \xeatre de 8 caract\xe8res minimum"}).max(30,{message:"Le mot de passe doit \xeatre de 30 caract\xe8res maximum"}).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#@$!%*?&])[A-Za-z\d#@$!%*?&]{8,30}$/,{message:"8 caract\xe8res, une majuscule, une minuscule, un chiffre et un caract\xe8re sp\xe9cial, ' \" _ - ne sont pas autoris\xe9s"})});s.z.object({email:s.z.string().email({message:"Veuillez utiliser une adresse e-mail valide"})});let n=s.z.object({url:s.z.string().url(),lat:s.z.number(),lng:s.z.number(),formattedAddress:s.z.string(),vicinity:s.z.string()}),o=s.z.object({categoryId:s.z.string(),title:s.z.string().max(100,{message:"Le titre doit \xeatre de 100 caract\xe8res maximum"}),description:s.z.string().min(30,{message:"Il faut un peu de l'inspiration pour cette description!"}).max(1e3,{message:"La description doit \xeatre de 1000 caract\xe8res maximum"}),eventStart:s.z.date().refine(e=>{let t=new Date;return!isNaN(e.getTime())&&e>=t},{message:"La date doit \xeatre valide et ne peut pas \xeatre dans le pass\xe9"}),eventEnd:s.z.date().nullable().refine(e=>{if(!e)return!0;let t=new Date;return!isNaN(e.getTime())&&e>=t},{message:"La date doit \xeatre valide et ne peut pas \xeatre dans le pass\xe9"}),isPublic:s.z.boolean(),participants:s.z.array(s.z.string()),address:n,image:s.z.instanceof(File)});s.z.string().regex(RegExp("^(sport|education|language|city tours|air libre|autres)$"),{message:"Titre invalide"});let l=s.z.object({username:s.z.string().max(30,"Le nom d'utilisateur doit comporter 30 caract\xe8res ou moins").optional(),image:s.z.union([s.z.instanceof(File).refine(e=>e.size<=2097152,{message:"La taille de l'image doit \xeatre de 2 Mo ou moins"}),s.z.null(),s.z.undefined()]).optional(),description:s.z.string().max(1e3,"La description doit comporter 1000 caract\xe8res ou moins").optional(),oldImage:s.z.string().optional()}),d=s.z.object({id:s.z.string(),email:s.z.string().email().nullable(),username:s.z.string().nullable(),image:s.z.string().nullable(),description:s.z.string().nullable(),_count:s.z.object({Ratings:s.z.number(),EventsCreated:s.z.number()})});s.z.array(d)},17038:(e,t,r)=>{r.d(t,{Aw:()=>i,Td:()=>n,cT:()=>o,qM:()=>a});var s=r(40492);let a=async({userId:e})=>{if(!e)return!1;try{return await s.A.user.delete({where:{id:e}}),!0}catch(e){throw console.error("deleteUserService error:",e),Error("Error deleting user")}},i=async({id:e,data:t})=>{try{return s.A.user.update({where:{id:e},data:t})}catch(e){return console.error("updateUserService",e),null}},n=async({id:e})=>{try{return s.A.user.findUnique({where:{id:e},select:{id:!0,email:!0,username:!0,image:!0,description:!0,_count:{select:{EventsCreated:!0,Ratings:!0}}}})}catch(e){return console.error("selectUserByIdService",e),null}},o=async({email:e})=>{try{return s.A.user.findUnique({where:{email:e},select:{id:!0,role:!0,password:!0,hasPassword:!0,email:!0}})}catch(e){return console.error("selectUserByEmailService",e),null}}}};