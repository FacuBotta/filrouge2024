"use strict";exports.id=683,exports.ids=[683],exports.modules={55852:(e,r,t)=>{t.r(r),t.d(r,{UserAvatar:()=>s});var a=t(45512),o=t(45103);let s=({className:e,src:r,onClick:t})=>{let s=r&&r.trim()?r:"/images/DefaultUserAvatar1.png";return(0,a.jsx)("div",{className:`${e||"size-12"} ${t?"cursor-pointer":""} relative overflow-hidden rounded-full`,onClick:t,"aria-label":"User avatar",children:(0,a.jsx)(o.default,{width:350,height:350,src:s,className:"rounded-full border border-card object-cover overflow-hidden",alt:"user avatar"})})}},33582:(e,r,t)=>{t.d(r,{j2:()=>u,Jv:()=>p,CI:()=>h});var a=t(37067),o=t(96330),s=t(27261),n=t(73993),i=t(61088),c=t(7956),l=t(30342);let d=new o.PrismaClient,{handlers:v,auth:u,signIn:p,signOut:h}=(0,s.Ay)({trustHost:!0,adapter:(0,a.y)(d),secret:process.env.AUTH_SECRET,session:{strategy:"jwt",maxAge:604800,updateAge:604800},pages:{signIn:"/login",error:"/login/error"},callbacks:{jwt:async({token:e,trigger:r,session:t,user:a})=>(a&&(e.id=a.id,e.role=a.role,e.hasPassword=a.hasPassword),"update"===r&&t?.hasPassword!==void 0&&(e.hasPassword=t.hasPassword),e),session:async({session:e,token:r})=>({...e,user:{id:r.id,role:r.role,email:r.email,hasPassword:r.hasPassword}})},providers:[(0,i.A)({clientId:process.env.AUTH_GOOGLE_ID,clientSecret:process.env.AUTH_GOOGLE_SECRET,allowDangerousEmailAccountLinking:!0,authorization:{params:{prompt:"consent",access_type:"offline",response_type:"code"}}}),(0,c.A)({server:{host:process.env.EMAIL_SERVER_HOST,port:parseInt(process.env.EMAIL_SERVER_PORT,10),auth:{user:process.env.EMAIL_SERVER_USER,pass:process.env.EMAIL_SERVER_PASSWORD}},from:process.env.EMAIL_FROM,sendVerificationRequest:async e=>{let{identifier:r,url:t,provider:a}=e,o=(0,l.oO)(a.server),s=await o.sendMail({to:r,from:a.from,subject:"Bienvenue sur EventHub !",text:function({url:e}){return`Bienvenue sur EventHub !
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
`}({url:t})}),n=s.rejected.concat(s.pending).filter(Boolean);if(n.length)throw Error(`Email(s) (${n.join(", ")}) could not be sent`)}}),(0,n.A)({name:"Credentials",authorize:async e=>e?{id:e.id,role:e.role,hasPassword:"true"===e.hasPassword,email:e.email}:null})]})},40492:(e,r,t)=>{t.d(r,{A:()=>o});var a=t(96330);let o=globalThis.prismaGlobal??new a.PrismaClient},11587:(e,r,t)=>{t.d(r,{A:()=>o});var a=t(96330);let o=globalThis.prismaGlobal??new a.PrismaClient},97585:(e,r,t)=>{t.d(r,{DN:()=>n,WL:()=>o,Yw:()=>i,xP:()=>s,z9:()=>c});var a=t(40492);let o=async e=>{try{return await a.A.events.create({data:e})}catch(e){throw console.error("createEventService: error",e),Error("Service error: createEventService")}},s=async(e,r)=>{try{return await a.A.events.update({where:{id:r},data:e})}catch(e){throw console.error("updateEventService: error",e),Error("Service error: updateEventService")}},n=async e=>{try{return await a.A.events.delete({where:{id:e}}),!0}catch(e){throw console.error("deleteEventService: error",e),Error("Service error: deleteEventService")}},i=async e=>{try{let r=await a.A.events.findFirst({select:{id:!0,title:!0,description:!0,eventStart:!0,eventEnd:!0,isPublic:!0,image:!0,locationUrl:!0,lat:!0,lng:!0,vicinity:!0,formattedAddress:!0,createdAt:!0,updatedAt:!0,conversation:{select:{id:!0}},participants:{select:{userId:!0}},UserInvitations:{select:{id:!0,participantId:!0,creatorId:!0,eventId:!0,conversationId:!0,createdAt:!0,status:!0}},category:{select:{id:!0,title:!0}},user:{select:{id:!0,email:!0,username:!0,image:!0,description:!0,_count:{select:{EventsCreated:!0,Ratings:!0}}}},_count:{select:{participants:!0}}},where:{id:e}});if(!r)return null;return r}catch(e){return console.error(e),null}},c=async e=>{try{return await a.A.events.findMany({where:{userId:e},select:{id:!0,title:!0,description:!0,eventStart:!0,eventEnd:!0,isPublic:!0,image:!0,locationUrl:!0,lat:!0,lng:!0,vicinity:!0,formattedAddress:!0,createdAt:!0,updatedAt:!0,Tasks:{select:{id:!0,userId:!0,eventId:!0,content:!0,completed:!0,createdAt:!0,order:!0}},conversation:{select:{id:!0}},participants:{select:{userId:!0}},UserInvitations:{select:{id:!0,participantId:!0,creatorId:!0,eventId:!0,conversationId:!0,createdAt:!0,status:!0}},category:{select:{id:!0,title:!0}},_count:{select:{participants:!0}}},orderBy:{eventStart:"asc"}})}catch(e){return console.error(e),[]}}},59127:(e,r,t)=>{t.d(r,{N:()=>o});var a=t(40492);let o=async({content:e,conversationId:r,invitationId:t,senderId:o})=>{let s={content:e,conversationId:r,senderId:o};t&&(s.invitationId=t);try{return await a.A.message.create({data:s})}catch(e){throw console.error("createMessageService: error",e),Error("Service error: createMessageService")}}},38803:(e,r,t)=>{t.d(r,{X1:()=>s,cb:()=>o,hw:()=>n,r1:()=>i});var a=t(40492);let o=async({userId:e,conversationId:r,role:t})=>{try{return await a.A.userConversation.create({data:{userId:e,conversationId:r,role:t}})}catch(e){throw console.error("createUserConversationService: error",e),Error("Service error: createUserConversationService")}},s=async({userId:e,conversationId:r})=>{try{return await a.A.userConversation.delete({where:{userId_conversationId:{userId:e,conversationId:r}}}),!0}catch(e){throw console.error("deleteUserConversationService: error",e),Error("Service error: deleteUserConversationService")}},n=async e=>{try{return await a.A.userConversation.findMany({where:{conversationId:e},select:{userId:!0}})}catch(e){throw console.error("getConversationService: error",e),Error("Service error: getConversationService")}},i=async({conversationId:e,userId:r})=>{try{return await a.A.userConversation.findUnique({where:{userId_conversationId:{userId:r,conversationId:e}}})}catch(e){throw console.error("selectConversationService: error",e),Error("Service error: selectConversationService")}}},75328:(e,r,t)=>{t.d(r,{h:()=>s,o:()=>o});var a=t(40492);let o=async e=>{try{return await a.A.userInvitations.create({data:e})}catch(e){throw console.error("createUserInvitationService: error",e),Error("Service error: createUserInvitationService")}},s=async({participantId:e,eventId:r,status:t})=>{try{return await a.A.userInvitations.update({where:{participantId_eventId:{participantId:e,eventId:r}},data:{status:t}})}catch(e){throw console.error("updateUserInvitationService: error",e),Error("Service error: updateUserInvitationService")}}}};