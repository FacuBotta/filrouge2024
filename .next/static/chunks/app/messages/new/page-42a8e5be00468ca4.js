(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[8654],{6322:(e,t,r)=>{Promise.resolve().then(r.bind(r,7419))},7419:(e,t,r)=>{"use strict";r.d(t,{NewMessagePage:()=>v});var n=r(5155),s=r(5828);let l=(0,s.createServerReference)("40a45ea36b9f590f5279bf88e972aa253d9f1e05a7",s.callServer,void 0,s.findSourceMapURL,"createConversation");var i=r(9790),a=r(1909),o=r(371);let c=e=>{let{className:t}=e;return(0,n.jsxs)("svg",{className:t,viewBox:"0 0 20 20",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[(0,n.jsxs)("g",{id:"DefaultUserAvatar",clipPath:"url(#clip0_388_43)",children:[(0,n.jsx)("path",{id:"border",d:"M1 10C1 11.1819 1.23279 12.3522 1.68508 13.4442C2.13738 14.5361 2.80031 15.5282 3.63604 16.364C4.47177 17.1997 5.46392 17.8626 6.55585 18.3149C7.64778 18.7672 8.8181 19 10 19C11.1819 19 12.3522 18.7672 13.4442 18.3149C14.5361 17.8626 15.5282 17.1997 16.364 16.364C17.1997 15.5282 17.8626 14.5361 18.3149 13.4442C18.7672 12.3522 19 11.1819 19 10C19 8.8181 18.7672 7.64778 18.3149 6.55585C17.8626 5.46392 17.1997 4.47177 16.364 3.63604C15.5282 2.80031 14.5361 2.13738 13.4442 1.68508C12.3522 1.23279 11.1819 1 10 1C8.8181 1 7.64778 1.23279 6.55585 1.68508C5.46392 2.13738 4.47177 2.80031 3.63604 3.63604C2.80031 4.47177 2.13738 5.46392 1.68508 6.55585C1.23279 7.64778 1 8.8181 1 10Z",stroke:"black",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"}),(0,n.jsxs)("g",{id:"filled",children:[(0,n.jsx)("path",{id:"Vector",d:"M7 8C7 8.79565 7.31607 9.55871 7.87868 10.1213C8.44129 10.6839 9.20435 11 10 11C10.7956 11 11.5587 10.6839 12.1213 10.1213C12.6839 9.55871 13 8.79565 13 8C13 7.20435 12.6839 6.44129 12.1213 5.87868C11.5587 5.31607 10.7956 5 10 5C9.20435 5 8.44129 5.31607 7.87868 5.87868C7.31607 6.44129 7 7.20435 7 8Z",fill:"black",stroke:"black",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"}),(0,n.jsxs)("g",{id:"Vector_2",children:[(0,n.jsx)("path",{d:"M6 18C6.25459 16.8459 4.77555 15.8258 5.48559 15.1068C6.19563 14.3878 7.05692 13.9996 7.9417 14H12.0562C12.9421 13.9996 13.8045 14.3886 14.515 15.1093C15.2256 15.83 13.7464 16.8438 14 18",fill:"black"}),(0,n.jsx)("path",{d:"M6 18C6.25459 16.8459 4.77555 15.8258 5.48559 15.1068C6.19563 14.3878 7.05692 13.9996 7.9417 14H12.0562C12.9421 13.9996 13.8045 14.3886 14.515 15.1093C15.2256 15.83 13.7464 16.8438 14 18",stroke:"black",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"})]})]})]}),(0,n.jsx)("defs",{children:(0,n.jsx)("clipPath",{id:"clip0_388_43",children:(0,n.jsx)("rect",{width:"20",height:"20",fill:"white"})})})]})};var u=r(4788),d=r(3126),f=r(6046),h=r(2115),p=r(814);let v=e=>{let{users:t}=e,[r,s]=(0,h.useState)([]),v=(0,f.useRouter)(),x=async e=>{e.preventDefault();let t={sujet:new FormData(e.currentTarget).get("sujet"),participantsId:r},n=await l(t);(null==n?void 0:n.ok)?(p.o.success(n.message),v.push("/messages")):(console.error(n),p.o.error(n.message))},m=e=>{s(t=>t.includes(e)?t.filter(t=>t!==e):[...t,e])};return(0,n.jsx)(i.default,{children:(0,n.jsxs)("div",{className:"w-full max-w-[400px] h-fit max-h-[600px] flex flex-col gap-2 p-4 mx-2 bg-light-blue dark:bg-dark-bg rounded-xl",children:[(0,n.jsx)(d.Link,{href:"/messages",children:(0,n.jsx)(o.default,{type:"plus",strokeWidth:2,className:"transform rotate-45"})}),(0,n.jsxs)("form",{onSubmit:e=>x(e),className:"w-full h-full flex flex-col gap-3",children:[(0,n.jsx)("p",{children:"Subject"}),(0,n.jsx)("input",{type:"text",name:"sujet",placeholder:"Sujet",className:"p-2 border-2 rounded-lg"}),(0,n.jsx)("p",{children:"Destinataires"}),(0,n.jsx)("div",{className:"flex w-full max-h-[320px] no-scrollbar overflow-y-scroll",children:(0,n.jsx)("ul",{className:"w-full",children:null==t?void 0:t.map(e=>(0,n.jsxs)("li",{className:"cursor-pointer flex gap-2 items-end my-2 border-2 rounded-lg p-2 ".concat(r.includes(e.id)?"border-light-yellow":"border-inherit"),onClick:()=>m(e.id),children:[e.image?(0,n.jsx)(u.UserAvatar,{src:e.image}):(0,n.jsx)(c,{className:"size-12 opacity-40"}),(0,n.jsx)("span",{children:e.email})]},e.id))})}),(0,n.jsx)(a.A,{width:"100%",type:"submit",children:"Create"})]})]})})}},9790:(e,t,r)=>{"use strict";r.d(t,{default:()=>l});var n=r(5155),s=r(2115);function l(e){let{children:t}=e;return(0,s.useEffect)(()=>(document.body.classList.add("no-scroll"),()=>{document.body.classList.remove("no-scroll")}),[]),(0,n.jsx)("div",{className:"no-scrollbar pt-[100px] fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center overflow-y-scroll",children:t})}},1909:(e,t,r)=>{"use strict";r.d(t,{A:()=>s});var n=r(5155);function s(e){let{onClick:t,width:r,children:s,type:l}=e;return(0,n.jsx)("button",{type:l||"button",style:{width:r||"fit-content"},onClick:t,className:"inline-flex items-center justify-center px-4 py-1 border-2 text-lg rounded-lg bg-light-yellow text-dark-bg font-bold border-dark-bg hover:shadow-lg  transition-transform duration-300 ease-in-out ",children:s})}r(2115)},371:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>l});var n=r(5155),s=r(7490);function l(e){return(0,n.jsx)(s.In,{...e})}},5828:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var r in t)Object.defineProperty(e,r,{enumerable:!0,get:t[r]})}(t,{callServer:function(){return n.callServer},createServerReference:function(){return l},findSourceMapURL:function(){return s.findSourceMapURL}});let n=r(9603),s=r(3355),l=r(4979).createServerReference},4788:(e,t,r)=>{"use strict";r.r(t),r.d(t,{UserAvatar:()=>l});var n=r(5155),s=r(5565);let l=e=>{let{className:t,src:r,onClick:l}=e,i=r&&r.trim()?r:"/images/DefaultUserAvatar1.png";return(0,n.jsx)("div",{className:"".concat(t||"size-12"," ").concat(l?"cursor-pointer":""," relative overflow-hidden rounded-full"),onClick:l,"aria-label":"User avatar",children:(0,n.jsx)(s.default,{width:350,height:350,src:i,className:"rounded-full border border-card object-cover overflow-hidden",alt:"user avatar"})})}},3126:(e,t,r)=>{"use strict";r.r(t),r.d(t,{Link:()=>x,ViewTransitions:()=>d,useTransitionRouter:()=>p});var n=r(5155),s=r(8173),l=r(6046),i=r(2115);function a(){return window.location.hash}function o(){return""}function c(e){return window.addEventListener("hashchange",e),()=>window.removeEventListener("hashchange",e)}let u=(0,i.createContext)(()=>()=>{});function d(e){let{children:t}=e,[r,s]=(0,i.useState)(null);return(0,i.useEffect)(()=>{r&&(r(),s(null))},[r]),!function(){let e=(0,l.usePathname)(),t=(0,i.useRef)(e),[r,n]=(0,i.useState)(null);(0,i.useEffect)(()=>{if(!("startViewTransition"in document))return()=>{};let e=()=>{let e;let t=new Promise(t=>{e=t});n([new Promise(e=>{document.startViewTransition(()=>(e(),t))}),e])};return window.addEventListener("popstate",e),()=>{window.removeEventListener("popstate",e)}},[]),r&&t.current!==e&&(0,i.use)(r[0]);let s=(0,i.useRef)(r);(0,i.useEffect)(()=>{s.current=r},[r]);let u=(0,i.useSyncExternalStore)(c,a,o);(0,i.useEffect)(()=>{t.current=e,s.current&&(s.current[1](),s.current=null)},[u,e])}(),(0,n.jsx)(u.Provider,{value:s,children:t})}function f(){return(f=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e}).apply(this,arguments)}function h(e,t){if(null==e)return{};var r,n,s={},l=Object.keys(e);for(n=0;n<l.length;n++)r=l[n],t.indexOf(r)>=0||(s[r]=e[r]);return s}function p(){let e=(0,l.useRouter)(),t=(0,i.use)(u),r=(0,i.useCallback)(function(e){let{onTransitionReady:r}=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if(!("startViewTransition"in document))return e();{let n=document.startViewTransition(()=>new Promise(r=>{(0,i.startTransition)(()=>{e(),t(()=>r)})}));r&&n.ready.then(r)}},[]),n=(0,i.useCallback)(function(t){let n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};var{onTransitionReady:s}=n,l=h(n,["onTransitionReady"]);r(()=>e.push(t,l),{onTransitionReady:s})},[r,e]),s=(0,i.useCallback)(function(t){let n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};var{onTransitionReady:s}=n,l=h(n,["onTransitionReady"]);r(()=>e.replace(t,l),{onTransitionReady:s})},[r,e]);return(0,i.useMemo)(()=>f({},e,{push:n,replace:s}),[n,s,e])}function v(){return(v=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e}).apply(this,arguments)}function x(e){let t=p(),{href:r,as:l,replace:a,scroll:o}=e,c=(0,i.useCallback)(n=>{e.onClick&&e.onClick(n),"startViewTransition"in document&&!function(e){let{nodeName:t}=e.currentTarget;return!!("A"===t.toUpperCase()&&function(e){let t=e.currentTarget.getAttribute("target");return t&&"_self"!==t||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||e.nativeEvent&&2===e.nativeEvent.which}(e))}(n)&&(n.preventDefault(),(a?t.replace:t.push)(l||r,{scroll:null==o||o}))},[e.onClick,r,l,a,o]);return(0,n.jsx)(s,v({},e,{onClick:c}))}}},e=>{var t=t=>e(e.s=t);e.O(0,[7261,8173,815,5565,814,8441,1517,7358],()=>t(6322)),_N_E=e.O()}]);
//# sourceMappingURL=page-42a8e5be00468ca4.js.map