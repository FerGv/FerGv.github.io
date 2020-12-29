var app=function(){"use strict";function e(){}function t(e){return e()}function n(){return Object.create(null)}function r(e){e.forEach(t)}function o(e){return"function"==typeof e}function l(e,t){return e!=e?t==t:e!==t||e&&"object"==typeof e||"function"==typeof e}function i(t,n,r){t.$$.on_destroy.push(function(t,...n){if(null==t)return e;const r=t.subscribe(...n);return r.unsubscribe?()=>r.unsubscribe():r}(n,r))}function s(e,t){e.appendChild(t)}function a(e,t,n){e.insertBefore(t,n||null)}function c(e){e.parentNode.removeChild(e)}function u(e,t){for(let n=0;n<e.length;n+=1)e[n]&&e[n].d(t)}function f(e){return document.createElement(e)}function d(e){return document.createTextNode(e)}function m(){return d(" ")}function g(e,t,n,r){return e.addEventListener(t,n,r),()=>e.removeEventListener(t,n,r)}function p(e,t,n){null==n?e.removeAttribute(t):e.getAttribute(t)!==n&&e.setAttribute(t,n)}function h(e,t){t=""+t,e.wholeText!==t&&(e.data=t)}let b;function $(e){b=e}const x=[],y=[],v=[],k=[],w=Promise.resolve();let C=!1;function j(e){v.push(e)}let S=!1;const P=new Set;function _(){if(!S){S=!0;do{for(let e=0;e<x.length;e+=1){const t=x[e];$(t),F(t.$$)}for($(null),x.length=0;y.length;)y.pop()();for(let e=0;e<v.length;e+=1){const t=v[e];P.has(t)||(P.add(t),t())}v.length=0}while(x.length);for(;k.length;)k.pop()();C=!1,S=!1,P.clear()}}function F(e){if(null!==e.fragment){e.update(),r(e.before_update);const t=e.dirty;e.dirty=[-1],e.fragment&&e.fragment.p(e.ctx,t),e.after_update.forEach(j)}}const G=new Set;let A;function D(){A={r:0,c:[],p:A}}function T(){A.r||r(A.c),A=A.p}function E(e,t){e&&e.i&&(G.delete(e),e.i(t))}function W(e,t,n,r){if(e&&e.o){if(G.has(e))return;G.add(e),A.c.push((()=>{G.delete(e),r&&(n&&e.d(1),r())})),e.o(t)}}function L(e){e&&e.c()}function z(e,n,l){const{fragment:i,on_mount:s,on_destroy:a,after_update:c}=e.$$;i&&i.m(n,l),j((()=>{const n=s.map(t).filter(o);a?a.push(...n):r(n),e.$$.on_mount=[]})),c.forEach(j)}function M(e,t){const n=e.$$;null!==n.fragment&&(r(n.on_destroy),n.fragment&&n.fragment.d(t),n.on_destroy=n.fragment=null,n.ctx=[])}function I(e,t){-1===e.$$.dirty[0]&&(x.push(e),C||(C=!0,w.then(_)),e.$$.dirty.fill(0)),e.$$.dirty[t/31|0]|=1<<t%31}function V(t,o,l,i,s,a,u=[-1]){const f=b;$(t);const d=o.props||{},m=t.$$={fragment:null,ctx:null,props:a,update:e,not_equal:s,bound:n(),on_mount:[],on_destroy:[],before_update:[],after_update:[],context:new Map(f?f.$$.context:[]),callbacks:n(),dirty:u,skip_bound:!1};let g=!1;if(m.ctx=l?l(t,d,((e,n,...r)=>{const o=r.length?r[0]:n;return m.ctx&&s(m.ctx[e],m.ctx[e]=o)&&(!m.skip_bound&&m.bound[e]&&m.bound[e](o),g&&I(t,e)),n})):[],m.update(),g=!0,r(m.before_update),m.fragment=!!i&&i(m.ctx),o.target){if(o.hydrate){const e=function(e){return Array.from(e.childNodes)}(o.target);m.fragment&&m.fragment.l(e),e.forEach(c)}else m.fragment&&m.fragment.c();o.intro&&E(t.$$.fragment),z(t,o.target,o.anchor),_()}$(f)}class H{$destroy(){M(this,1),this.$destroy=e}$on(e,t){const n=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return n.push(t),()=>{const e=n.indexOf(t);-1!==e&&n.splice(e,1)}}$set(e){var t;this.$$set&&(t=e,0!==Object.keys(t).length)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}}const O=[];const q=function(t,n=e){let r;const o=[];function i(e){if(l(t,e)&&(t=e,r)){const e=!O.length;for(let e=0;e<o.length;e+=1){const n=o[e];n[1](),O.push(n,t)}if(e){for(let e=0;e<O.length;e+=2)O[e][0](O[e+1]);O.length=0}}}return{set:i,update:function(e){i(e(t))},subscribe:function(l,s=e){const a=[l,s];return o.push(a),1===o.length&&(r=n(i)||e),l(t),()=>{const e=o.indexOf(a);-1!==e&&o.splice(e,1),0===o.length&&(r(),r=null)}}}}("es");function B(e,t,n){const r=e.slice();return r[3]=t[n].text,r[4]=t[n].link,r[5]=t[n].icon,r}function J(t){let n,r,o,l,i,u,g,h,b=t[3]+"";return{c(){n=f("p"),r=f("a"),o=f("i"),i=m(),u=d(b),h=m(),p(o,"class",l="fas fa-"+t[5]+" fa-fw"),p(r,"class","text-green-500 text-center inline-block transform hover:scale-125"),p(r,"href",g=t[4]),p(r,"target","_blank"),p(n,"class","text-center my-3")},m(e,t){a(e,n,t),s(n,r),s(r,o),s(r,i),s(r,u),s(n,h)},p:e,d(e){e&&c(n)}}}function K(t){let n,r,o,l,i,g,b,$,x,y,v,k,w,C,j,S,P,_,F,G,A,D,T,E=t[1][t[0]].firstParagraph+"",W=t[1][t[0]].secondParagraph+"",L=t[1][t[0]].thirdParagraph+"",z=t[1][t[0]].fourthParagraph+"",M=t[2],I=[];for(let e=0;e<M.length;e+=1)I[e]=J(B(t,M,e));return{c(){n=f("section"),r=f("img"),l=m(),i=f("section"),g=f("p"),b=d(E),$=m(),x=f("br"),y=m(),v=f("p"),k=d(W),w=m(),C=f("br"),j=m(),S=f("p"),P=d(L),_=m(),F=f("br"),G=m(),A=f("p"),D=d(z),T=m();for(let e=0;e<I.length;e+=1)I[e].c();r.src!==(o="/img/profile-photo.jpeg")&&p(r,"src","/img/profile-photo.jpeg"),p(r,"alt","Me"),p(r,"class","rounded-full w-1/3 md:w-1/5"),p(i,"class","px-5 mt-4 md:mt-0"),p(n,"class","flex flex-col md:flex-row justify-center items-center py-12 md:px-20")},m(e,t){a(e,n,t),s(n,r),s(n,l),s(n,i),s(i,g),s(g,b),s(i,$),s(i,x),s(i,y),s(i,v),s(v,k),s(i,w),s(i,C),s(i,j),s(i,S),s(S,P),s(i,_),s(i,F),s(i,G),s(i,A),s(A,D),s(i,T);for(let e=0;e<I.length;e+=1)I[e].m(i,null)},p(e,[t]){if(1&t&&E!==(E=e[1][e[0]].firstParagraph+"")&&h(b,E),1&t&&W!==(W=e[1][e[0]].secondParagraph+"")&&h(k,W),1&t&&L!==(L=e[1][e[0]].thirdParagraph+"")&&h(P,L),1&t&&z!==(z=e[1][e[0]].fourthParagraph+"")&&h(D,z),4&t){let n;for(M=e[2],n=0;n<M.length;n+=1){const r=B(e,M,n);I[n]?I[n].p(r,t):(I[n]=J(r),I[n].c(),I[n].m(i,null))}for(;n<I.length;n+=1)I[n].d(1);I.length=M.length}},i:e,o:e,d(e){e&&c(n),u(I,e)}}}function N(e,t,n){let r;i(e,q,(e=>n(0,r=e)));return[r,{en:{firstParagraph:"Hi, my name is Fernando.",secondParagraph:"I have a degree in Computer Science and I love\n        software development (web, mobile, etc).",thirdParagraph:"Here you have my contact if you want to talk.",fourthParagraph:"Regards :D"},es:{firstParagraph:"Hola, mi nombre es Fernando.",secondParagraph:"Soy egresado de la Lic. en Ciencias de la Informática y\n        me encanta el desarrollo de aplicaciones (web, móvil, etc).",thirdParagraph:"Te dejo mi contacto por si gustas charlar.",fourthParagraph:"Saludos :D"}},[{text:"(+52) 55 3759 2020",link:"tel:5537592020",icon:"phone"},{text:"jfer.garciav@gmail.com",link:"mailto:jfer.garciav@gmail.com",icon:"envelope"}]]}class R extends H{constructor(e){super(),V(this,e,N,K,l,{})}}function U(t){let n,r,o,l,i,u,g,b,$,x,y,v,k;return{c(){n=f("article"),r=f("div"),o=d(t[3]),l=m(),i=f("div"),u=f("p"),g=d(t[0]),b=m(),$=f("p"),x=d(t[2]),y=m(),v=f("p"),k=d(t[1]),p(r,"class","flex justify-center items-center text-5xl"),p(u,"class","font-bold"),p(v,"class","text-blue-500"),p(i,"class","col-span-2 border-l text-center py-5"),p(n,"class","bg-white border rounded grid grid-cols-3")},m(e,t){a(e,n,t),s(n,r),s(r,o),s(n,l),s(n,i),s(i,u),s(u,g),s(i,b),s(i,$),s($,x),s(i,y),s(i,v),s(v,k)},p(e,[t]){8&t&&h(o,e[3]),1&t&&h(g,e[0]),4&t&&h(x,e[2]),2&t&&h(k,e[1])},i:e,o:e,d(e){e&&c(n)}}}function Y(e,t,n){let r,{company:o}=t,{period:l}=t,{title:i}=t;return e.$$set=e=>{"company"in e&&n(0,o=e.company),"period"in e&&n(1,l=e.period),"title"in e&&n(2,i=e.title)},e.$$.update=()=>{1&e.$$.dirty&&n(3,r=o[0])},[o,l,i,r]}class Q extends H{constructor(e){super(),V(this,e,Y,U,l,{company:0,period:1,title:2})}}function X(e,t,n){const r=e.slice();return r[2]=t[n].company,r[3]=t[n].period,r[4]=t[n].title,r}function Z(e){let t,n;return t=new Q({props:{company:e[2],period:e[3],title:e[4]}}),{c(){L(t.$$.fragment)},m(e,r){z(t,e,r),n=!0},p(e,n){const r={};1&n&&(r.company=e[2]),1&n&&(r.period=e[3]),1&n&&(r.title=e[4]),t.$set(r)},i(e){n||(E(t.$$.fragment,e),n=!0)},o(e){W(t.$$.fragment,e),n=!1},d(e){M(t,e)}}}function ee(e){let t,n,r,o,l,i,g=e[1][e[0]].title+"",b=e[1][e[0]].jobs,$=[];for(let t=0;t<b.length;t+=1)$[t]=Z(X(e,b,t));const x=e=>W($[e],1,1,(()=>{$[e]=null}));return{c(){t=f("section"),n=f("h3"),r=d(g),o=m(),l=f("section");for(let e=0;e<$.length;e+=1)$[e].c();p(n,"class","font-bold text-3xl text-center text-white border border-white mb-4 rounded"),p(l,"class","grid grid-cols-1 sm:grid-cols-2 gap-5 svelte-b9r8iw"),p(t,"class","py-12 px-5 svelte-b9r8iw")},m(e,c){a(e,t,c),s(t,n),s(n,r),s(t,o),s(t,l);for(let e=0;e<$.length;e+=1)$[e].m(l,null);i=!0},p(e,[t]){if((!i||1&t)&&g!==(g=e[1][e[0]].title+"")&&h(r,g),3&t){let n;for(b=e[1][e[0]].jobs,n=0;n<b.length;n+=1){const r=X(e,b,n);$[n]?($[n].p(r,t),E($[n],1)):($[n]=Z(r),$[n].c(),E($[n],1),$[n].m(l,null))}for(D(),n=b.length;n<$.length;n+=1)x(n);T()}},i(e){if(!i){for(let e=0;e<b.length;e+=1)E($[e]);i=!0}},o(e){$=$.filter(Boolean);for(let e=0;e<$.length;e+=1)W($[e]);i=!1},d(e){e&&c(t),u($,e)}}}function te(e,t,n){let r;i(e,q,(e=>n(0,r=e)));return[r,{en:{title:"Work experience",jobs:[{company:"Warriors Labs",period:"Jan - Aug (2018)",title:"Web Developer"},{company:"WeeCompany",period:"Mar - Jul (2019)",title:"Web Developer"},{company:"Klatus",period:"Jul (2018) - Current",title:"Web Developer"},{company:"Keyence",period:"Jan (2020) - Current",title:"Web Developer"}]},es:{title:"Experiencia laboral",jobs:[{company:"Warriors Labs",period:"Ene - Ago (2018)",title:"Desarrollador Web"},{company:"WeeCompany",period:"Mar - Jul (2019)",title:"Desarrollador Web"},{company:"Klatus",period:"Jul (2018) - Actual",title:"Desarrollador Web"},{company:"Keyence",period:"Ene (2020) - Actual",title:"Desarrollador Web"}]}}]}class ne extends H{constructor(e){super(),V(this,e,te,ee,l,{})}}function re(e,t,n){const r=e.slice();return r[4]=t[n],r}function oe(t){let n,r,o,l,i;return{c(){n=f("a"),r=f("i"),l=m(),p(r,"class",o="fab fa-"+t[4].icon+" fa-fw text-3xl transform hover:scale-150"),p(n,"href",i=t[4].link),p(n,"target","_blank")},m(e,t){a(e,n,t),s(n,r),s(n,l)},p:e,d(e){e&&c(n)}}}function le(t){let n,r,o,l,i,g,b,$,x,y,v,k,w,C,j=t[1][t[0]].with+"",S=t[1][t[0]].author+"",P=t[3],_=[];for(let e=0;e<P.length;e+=1)_[e]=oe(re(t,P,e));return{c(){n=f("footer"),r=f("section");for(let e=0;e<_.length;e+=1)_[e].c();o=m(),l=f("section"),i=f("i"),g=m(),b=d(j),$=m(),x=f("i"),y=m(),v=d(S),k=m(),w=d(t[2]),C=d(" ©"),p(i,"class","fas fa-code fa-fw text-blue-500"),p(x,"class","fas fa-heart fa-fw text-red-500"),p(n,"class","bg-gray-900 text-white text-center py-10")},m(e,t){a(e,n,t),s(n,r);for(let e=0;e<_.length;e+=1)_[e].m(r,null);s(n,o),s(n,l),s(l,i),s(l,g),s(l,b),s(l,$),s(l,x),s(l,y),s(l,v),s(l,k),s(l,w),s(l,C)},p(e,[t]){if(8&t){let n;for(P=e[3],n=0;n<P.length;n+=1){const o=re(e,P,n);_[n]?_[n].p(o,t):(_[n]=oe(o),_[n].c(),_[n].m(r,null))}for(;n<_.length;n+=1)_[n].d(1);_.length=P.length}1&t&&j!==(j=e[1][e[0]].with+"")&&h(b,j),1&t&&S!==(S=e[1][e[0]].author+"")&&h(v,S)},i:e,o:e,d(e){e&&c(n),u(_,e)}}}function ie(e,t,n){let r;i(e,q,(e=>n(0,r=e)));const o=(new Date).getFullYear();return[r,{en:{with:"with",author:"by Fernando García in "},es:{with:"con",author:"por Fernando García en "}},o,[{icon:"github",link:"https://github.com/FerGv"},{icon:"linkedin",link:"https://www.linkedin.com/in/jose-fernando-garcia-vazquez"}]]}class se extends H{constructor(e){super(),V(this,e,ie,le,l,{})}}function ae(t){let n,r,o,l,i,u,g,b,$=t[1][t[0]].job+"";return{c(){n=f("header"),r=f("section"),o=f("h1"),o.textContent="Fernando García",l=m(),i=f("hr"),u=m(),g=f("h2"),b=d($),p(o,"class","text-5xl"),p(i,"class","w-1/2 m-auto my-3 border-2 border-white"),p(g,"class","text-2xl"),p(r,"class","name py-20 text-white svelte-ioxo3m"),p(n,"class","bg-gray-700 text-center min-h-screen flex flex-col justify-center svelte-ioxo3m")},m(e,t){a(e,n,t),s(n,r),s(r,o),s(r,l),s(r,i),s(r,u),s(r,g),s(g,b)},p(e,[t]){1&t&&$!==($=e[1][e[0]].job+"")&&h(b,$)},i:e,o:e,d(e){e&&c(n)}}}function ce(e,t,n){let r;i(e,q,(e=>n(0,r=e)));return[r,{en:{job:"Developer"},es:{job:"Desarrollador"}}]}class ue extends H{constructor(e){super(),V(this,e,ce,ae,l,{})}}function fe(t){let n,r,o,l,i,u,g,b,$,x,y,v,k,w,C;return{c(){n=f("article"),r=f("img"),l=m(),i=f("div"),u=f("p"),g=d(t[3]),b=m(),$=f("p"),x=d(t[0]),y=m(),v=f("p"),k=f("a"),w=d("Ver\n        "),C=f("i"),r.src!==(o="/img/"+t[1])&&p(r,"src",o),p(r,"alt",t[3]),p(r,"class","rounded-t sm:rounded-t-none sm:rounded-l sm:w-1/2 svelte-pr5tm8"),p(u,"class","font-bold uppercase"),p(C,"class","fas fa-external-link-alt fa-fw"),p(k,"href",t[2]),p(k,"class","text-blue-500"),p(k,"target","_blank"),p(v,"class","mt-3"),p(i,"class","project-info flex flex-col justify-center content-center px-5 sm:px-10 flex-1 svelte-pr5tm8"),p(n,"class","flex flex-col sm:flex-row bg-white text-center rounded flex-1 border")},m(e,t){a(e,n,t),s(n,r),s(n,l),s(n,i),s(i,u),s(u,g),s(i,b),s(i,$),s($,x),s(i,y),s(i,v),s(v,k),s(k,w),s(k,C)},p(e,[t]){2&t&&r.src!==(o="/img/"+e[1])&&p(r,"src",o),8&t&&p(r,"alt",e[3]),8&t&&h(g,e[3]),1&t&&h(x,e[0]),4&t&&p(k,"href",e[2])},i:e,o:e,d(e){e&&c(n)}}}function de(e,t,n){let{description:r}=t,{image:o}=t,{link:l}=t,{title:i}=t;return e.$$set=e=>{"description"in e&&n(0,r=e.description),"image"in e&&n(1,o=e.image),"link"in e&&n(2,l=e.link),"title"in e&&n(3,i=e.title)},[r,o,l,i]}class me extends H{constructor(e){super(),V(this,e,de,fe,l,{description:0,image:1,link:2,title:3})}}function ge(e){let t,n;return t=new me({props:{description:e[1].description,image:e[1].image,link:e[1].link,title:e[1].title}}),{c(){L(t.$$.fragment)},m(e,r){z(t,e,r),n=!0},p(e,n){const r={};2&n&&(r.description=e[1].description),2&n&&(r.image=e[1].image),2&n&&(r.link=e[1].link),2&n&&(r.title=e[1].title),t.$set(r)},i(e){n||(E(t.$$.fragment,e),n=!0)},o(e){W(t.$$.fragment,e),n=!1},d(e){M(t,e)}}}function pe(e){let t,n,o,l,i,u,b,$,x,y,v,k,w=e[2][e[0]].title+"",C=e[1]&&ge(e);return{c(){t=f("section"),n=f("h3"),o=d(w),l=m(),i=f("section"),u=f("div"),u.innerHTML='<i class="fas fa-chevron-left fa-fw text-4xl"></i>',b=m(),C&&C.c(),$=m(),x=f("div"),x.innerHTML='<i class="fas fa-chevron-right fa-fw text-4xl"></i>',p(n,"class","font-bold text-3xl text-center border border-black mb-4 rounded"),p(u,"class","flex flex-col justify-center cursor-pointer hover:bg-gray-200"),p(x,"class","flex flex-col justify-center cursor-pointer hover:bg-gray-200"),p(i,"class","flex justify-center"),p(t,"class","py-12 px-5 bg-gray-300")},m(r,c){a(r,t,c),s(t,n),s(n,o),s(t,l),s(t,i),s(i,u),s(i,b),C&&C.m(i,null),s(i,$),s(i,x),y=!0,v||(k=[g(u,"click",e[4]),g(x,"click",e[3])],v=!0)},p(e,[t]){(!y||1&t)&&w!==(w=e[2][e[0]].title+"")&&h(o,w),e[1]?C?(C.p(e,t),2&t&&E(C,1)):(C=ge(e),C.c(),E(C,1),C.m(i,$)):C&&(D(),W(C,1,1,(()=>{C=null})),T())},i(e){y||(E(C),y=!0)},o(e){W(C),y=!1},d(e){e&&c(t),C&&C.d(),v=!1,r(k)}}}function he(e,t,n){let r;i(e,q,(e=>n(0,r=e)));const o={en:{title:"Projects",projects:[{title:"School Fit",description:"Project dedicated to improve students health at university.",image:"school.jpg",link:"https://github.com/e-mind/Escuela-Fit"},{title:"Lexical analyzer",description:"Get a list of programming languages.",image:"analyzer.png",link:"https://github.com/FerGv/lexical-analyzer"},{title:"Virtual Library",description:"Media content management (images, videos, files).",image:"library.png",link:"https://github.com/FerGv/virtual-library"},{title:"Café",description:"Café inventory management",image:"cafe.jpg",link:"https://github.com/FerGv/SGI"},{title:"Veterinary clinic",description:"Customers, pets and doctors management.",image:"veterinary-clinic.jpg",link:"https://github.com/FerGv/veterinary-clinic"}]},es:{title:"Proyectos",projects:[{title:"Escuela Fit",description:"Proyecto dedicado a mejorar la salud de los alumnos de la UPIICSA.",image:"school.jpg",link:"https://github.com/e-mind/Escuela-Fit"},{title:"Analizador Léxico",description:"Obtención de un listado de lenguajes de programación.",image:"analyzer.png",link:"https://github.com/FerGv/lexical-analyzer"},{title:"Biblioteca Virtual",description:"Gestión de contenido multimedia (fotos, videos, imágenes, archivos).",image:"library.png",link:"https://github.com/FerGv/virtual-library"},{title:"Cafetería",description:"Gestión del inventario de una cafetería.",image:"cafe.jpg",link:"https://github.com/FerGv/SGI"},{title:"Veterinaria",description:"Gestión de clientes, mascotas (citas e historial) y doctores de una clínica veterinaria.",image:"veterinary-clinic.jpg",link:"https://github.com/FerGv/veterinary-clinic"}]}};let l=0;let s,a;return e.$$.update=()=>{1&e.$$.dirty&&n(6,s=o[r].projects),96&e.$$.dirty&&n(1,a=s[l])},[r,a,o,()=>{n(5,l+=1),l>=s.length&&n(5,l=0)},()=>{n(5,l-=1),l<0&&n(5,l=s.length-1)},l,s]}class be extends H{constructor(e){super(),V(this,e,he,pe,l,{})}}function $e(e,t,n){const r=e.slice();return r[4]=t[n],r}function xe(e){let t;return{c(){t=f("i"),p(t,"class","fas fa-star fa-fw text-yellow-400")},m(e,n){a(e,t,n)},d(e){e&&c(t)}}}function ye(t){let n,r,o,l,i,g,b,$,x,y=Array(t[3]),v=[];for(let e=0;e<y.length;e+=1)v[e]=xe($e(t,y,e));return{c(){n=f("article"),r=f("p"),o=f("i"),i=m(),g=f("p"),b=d(t[0]),$=m(),x=f("p");for(let e=0;e<v.length;e+=1)v[e].c();p(o,"class",l="fas fa-"+t[1]+" fa-fw text-"+t[2]+" text-4xl"),p(g,"class","font-bold uppercase"),p(n,"class","flex flex-col bg-white text-center p-5 rounded transform hover:scale-90")},m(e,t){a(e,n,t),s(n,r),s(r,o),s(n,i),s(n,g),s(g,b),s(n,$),s(n,x);for(let e=0;e<v.length;e+=1)v[e].m(x,null)},p(e,[t]){if(6&t&&l!==(l="fas fa-"+e[1]+" fa-fw text-"+e[2]+" text-4xl")&&p(o,"class",l),1&t&&h(b,e[0]),8&t){const t=y.length;let n;for(y=Array(e[3]),n=t;n<y.length;n+=1){$e(e,y,n);v[n]||(v[n]=xe(),v[n].c(),v[n].m(x,null))}for(n=y.length;n<t;n+=1)v[n].d(1);v.length=y.length}},i:e,o:e,d(e){e&&c(n),u(v,e)}}}function ve(e,t,n){let{name:r}=t,{icon:o}=t,{iconColor:l}=t,{stars:i}=t;return e.$$set=e=>{"name"in e&&n(0,r=e.name),"icon"in e&&n(1,o=e.icon),"iconColor"in e&&n(2,l=e.iconColor),"stars"in e&&n(3,i=e.stars)},[r,o,l,i]}class ke extends H{constructor(e){super(),V(this,e,ve,ye,l,{name:0,icon:1,iconColor:2,stars:3})}}function we(e,t,n){const r=e.slice();return r[2]=t[n].name,r[3]=t[n].icon,r[4]=t[n].iconColor,r[5]=t[n].stars,r}function Ce(e,t,n){const r=e.slice();return r[2]=t[n].name,r[3]=t[n].icon,r[4]=t[n].iconColor,r[5]=t[n].stars,r}function je(e){let t,n;return t=new ke({props:{name:e[2],icon:e[3],iconColor:e[4],stars:e[5]}}),{c(){L(t.$$.fragment)},m(e,r){z(t,e,r),n=!0},p(e,n){const r={};1&n&&(r.name=e[2]),1&n&&(r.icon=e[3]),1&n&&(r.iconColor=e[4]),1&n&&(r.stars=e[5]),t.$set(r)},i(e){n||(E(t.$$.fragment,e),n=!0)},o(e){W(t.$$.fragment,e),n=!1},d(e){M(t,e)}}}function Se(e){let t,n;return t=new ke({props:{name:e[2],icon:e[3],iconColor:e[4],stars:e[5]}}),{c(){L(t.$$.fragment)},m(e,r){z(t,e,r),n=!0},p(e,n){const r={};1&n&&(r.name=e[2]),1&n&&(r.icon=e[3]),1&n&&(r.iconColor=e[4]),1&n&&(r.stars=e[5]),t.$set(r)},i(e){n||(E(t.$$.fragment,e),n=!0)},o(e){W(t.$$.fragment,e),n=!1},d(e){M(t,e)}}}function Pe(e){let t,n,r,o,l,i,g,b,$,x,y,v=e[1][e[0]].techSkillsTitle+"",k=e[1][e[0]].softSkillsTitle+"",w=e[1][e[0]].techSkills,C=[];for(let t=0;t<w.length;t+=1)C[t]=je(Ce(e,w,t));const j=e=>W(C[e],1,1,(()=>{C[e]=null}));let S=e[1][e[0]].softSkills,P=[];for(let t=0;t<S.length;t+=1)P[t]=Se(we(e,S,t));const _=e=>W(P[e],1,1,(()=>{P[e]=null}));return{c(){t=f("section"),n=f("h3"),r=d(v),o=m(),l=f("section");for(let e=0;e<C.length;e+=1)C[e].c();i=m(),g=f("h3"),b=d(k),$=m(),x=f("section");for(let e=0;e<P.length;e+=1)P[e].c();p(n,"class","text-white font-bold text-3xl text-center border mb-4 rounded"),p(l,"class","grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 svelte-1rkjq02"),p(g,"class","text-white font-bold text-3xl text-center border mt-10 mb-4 rounded"),p(x,"class","grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 svelte-1rkjq02"),p(t,"class","py-12 px-5 svelte-1rkjq02")},m(e,c){a(e,t,c),s(t,n),s(n,r),s(t,o),s(t,l);for(let e=0;e<C.length;e+=1)C[e].m(l,null);s(t,i),s(t,g),s(g,b),s(t,$),s(t,x);for(let e=0;e<P.length;e+=1)P[e].m(x,null);y=!0},p(e,[t]){if((!y||1&t)&&v!==(v=e[1][e[0]].techSkillsTitle+"")&&h(r,v),3&t){let n;for(w=e[1][e[0]].techSkills,n=0;n<w.length;n+=1){const r=Ce(e,w,n);C[n]?(C[n].p(r,t),E(C[n],1)):(C[n]=je(r),C[n].c(),E(C[n],1),C[n].m(l,null))}for(D(),n=w.length;n<C.length;n+=1)j(n);T()}if((!y||1&t)&&k!==(k=e[1][e[0]].softSkillsTitle+"")&&h(b,k),3&t){let n;for(S=e[1][e[0]].softSkills,n=0;n<S.length;n+=1){const r=we(e,S,n);P[n]?(P[n].p(r,t),E(P[n],1)):(P[n]=Se(r),P[n].c(),E(P[n],1),P[n].m(x,null))}for(D(),n=S.length;n<P.length;n+=1)_(n);T()}},i(e){if(!y){for(let e=0;e<w.length;e+=1)E(C[e]);for(let e=0;e<S.length;e+=1)E(P[e]);y=!0}},o(e){C=C.filter(Boolean);for(let e=0;e<C.length;e+=1)W(C[e]);P=P.filter(Boolean);for(let e=0;e<P.length;e+=1)W(P[e]);y=!1},d(e){e&&c(t),u(C,e),u(P,e)}}}function _e(e,t,n){let r;i(e,q,(e=>n(0,r=e)));return[r,{en:{techSkillsTitle:"Tech skills",softSkillsTitle:"Soft skills",techSkills:[{name:"Web",icon:"code",iconColor:"blue-400",stars:4},{name:"Mobile",icon:"mobile-alt",iconColor:"yellow-300",stars:2},{name:"Database",icon:"database",iconColor:"green-500",stars:3},{name:"Version control",icon:"code-branch",iconColor:"red-400",stars:3},{name:"Cloud",icon:"cloud",iconColor:"blue-700",stars:3},{name:"DevOps",icon:"server",iconColor:"blue-800",stars:2}],softSkills:[{name:"English",icon:"language",iconColor:"blue-400",stars:4},{name:"Communication",icon:"comments",iconColor:"yellow-300",stars:5},{name:"Teamwork",icon:"users",iconColor:"green-500",stars:5},{name:"Laboriosity",icon:"briefcase",iconColor:"red-400",stars:5},{name:"Leadership",icon:"award",iconColor:"blue-700",stars:4}]},es:{techSkillsTitle:"Habilidades técnicas",softSkillsTitle:"Habilidades sociales",techSkills:[{name:"Web",icon:"code",iconColor:"blue-400",stars:4},{name:"Móvil",icon:"mobile-alt",iconColor:"yellow-300",stars:2},{name:"Base de datos",icon:"database",iconColor:"green-500",stars:3},{name:"Control de versiones",icon:"code-branch",iconColor:"red-400",stars:3},{name:"Cloud",icon:"cloud",iconColor:"blue-700",stars:3},{name:"DevOps",icon:"server",iconColor:"blue-800",stars:2}],softSkills:[{name:"Inglés",icon:"language",iconColor:"blue-400",stars:4},{name:"Comunicación",icon:"comments",iconColor:"yellow-300",stars:5},{name:"Trabajo en equipo",icon:"users",iconColor:"green-500",stars:5},{name:"Laboriosidad",icon:"briefcase",iconColor:"red-400",stars:5},{name:"Liderazgo",icon:"award",iconColor:"blue-700",stars:4}]}}]}class Fe extends H{constructor(e){super(),V(this,e,_e,Pe,l,{})}}function Ge(t){let n,r,o,l,i,u,b,$,x,y=t[1][t[0]].label+"";return{c(){n=f("section"),r=f("img"),i=m(),u=f("span"),b=d(y),r.src!==(o="/img/"+t[1][t[0]].icon)&&p(r,"src",o),p(r,"alt",l=t[1][t[0]].imgAlt),p(r,"class","svelte-br5lvk"),p(u,"class","ml-2"),p(n,"class","bg-gray-300 flex justify-center items-center text-blue-500 cursor-pointer")},m(e,o){a(e,n,o),s(n,r),s(n,i),s(n,u),s(u,b),$||(x=g(n,"click",t[2]),$=!0)},p(e,[t]){1&t&&r.src!==(o="/img/"+e[1][e[0]].icon)&&p(r,"src",o),1&t&&l!==(l=e[1][e[0]].imgAlt)&&p(r,"alt",l),1&t&&y!==(y=e[1][e[0]].label+"")&&h(b,y)},i:e,o:e,d(e){e&&c(n),$=!1,x()}}}function Ae(e,t,n){let r;i(e,q,(e=>n(0,r=e)));return[r,{en:{icon:"lang-es.svg",label:"Ver versión en español",imgAlt:"Cambiar idioma"},es:{icon:"lang-en.svg",label:"View English version",imgAlt:"Change language"}},()=>{const e="en"===r;q.set(e?"es":"en")}]}class De extends H{constructor(e){super(),V(this,e,Ae,Ge,l,{})}}function Te(t){let n,r,o,l,i,u,d,g,p,h,b,$,x,y,v,k,w;return r=new De({}),l=new ue({}),u=new R({}),g=new ne({}),h=new be({}),$=new Fe({}),y=new se({}),k=new De({}),{c(){n=f("main"),L(r.$$.fragment),o=m(),L(l.$$.fragment),i=m(),L(u.$$.fragment),d=m(),L(g.$$.fragment),p=m(),L(h.$$.fragment),b=m(),L($.$$.fragment),x=m(),L(y.$$.fragment),v=m(),L(k.$$.fragment)},m(e,t){a(e,n,t),z(r,n,null),s(n,o),z(l,n,null),s(n,i),z(u,n,null),s(n,d),z(g,n,null),s(n,p),z(h,n,null),s(n,b),z($,n,null),s(n,x),z(y,n,null),s(n,v),z(k,n,null),w=!0},p:e,i(e){w||(E(r.$$.fragment,e),E(l.$$.fragment,e),E(u.$$.fragment,e),E(g.$$.fragment,e),E(h.$$.fragment,e),E($.$$.fragment,e),E(y.$$.fragment,e),E(k.$$.fragment,e),w=!0)},o(e){W(r.$$.fragment,e),W(l.$$.fragment,e),W(u.$$.fragment,e),W(g.$$.fragment,e),W(h.$$.fragment,e),W($.$$.fragment,e),W(y.$$.fragment,e),W(k.$$.fragment,e),w=!1},d(e){e&&c(n),M(r),M(l),M(u),M(g),M(h),M($),M(y),M(k)}}}return new class extends H{constructor(e){super(),V(this,e,null,Te,l,{})}}({target:document.body})}();
//# sourceMappingURL=bundle.js.map
