var app=function(){"use strict";function t(){}function e(t){return t()}function n(){return Object.create(null)}function r(t){t.forEach(e)}function o(t){return"function"==typeof t}function l(t,e){return t!=t?e==e:t!==e||t&&"object"==typeof t||"function"==typeof t}function c(t,e){t.appendChild(e)}function i(t,e,n){t.insertBefore(e,n||null)}function s(t){t.parentNode.removeChild(t)}function a(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}function f(t){return document.createElement(t)}function u(t){return document.createTextNode(t)}function d(){return u(" ")}function m(t,e,n,r){return t.addEventListener(e,n,r),()=>t.removeEventListener(e,n,r)}function g(t,e,n){null==n?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function p(t,e){e=""+e,t.wholeText!==e&&(t.data=e)}let h;function x(t){h=t}const $=[],b=[],y=[],v=[],w=Promise.resolve();let k=!1;function C(t){y.push(t)}let j=!1;const _=new Set;function F(){if(!j){j=!0;do{for(let t=0;t<$.length;t+=1){const e=$[t];x(e),G(e.$$)}for(x(null),$.length=0;b.length;)b.pop()();for(let t=0;t<y.length;t+=1){const e=y[t];_.has(e)||(_.add(e),e())}y.length=0}while($.length);for(;v.length;)v.pop()();k=!1,j=!1,_.clear()}}function G(t){if(null!==t.fragment){t.update(),r(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(C)}}const E=new Set;let A;function L(t,e){t&&t.i&&(E.delete(t),t.i(e))}function S(t,e,n,r){if(t&&t.o){if(E.has(t))return;E.add(t),A.c.push((()=>{E.delete(t),r&&(n&&t.d(1),r())})),t.o(e)}}function H(t){t&&t.c()}function P(t,n,l){const{fragment:c,on_mount:i,on_destroy:s,after_update:a}=t.$$;c&&c.m(n,l),C((()=>{const n=i.map(e).filter(o);s?s.push(...n):r(n),t.$$.on_mount=[]})),a.forEach(C)}function T(t,e){const n=t.$$;null!==n.fragment&&(r(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function M(t,e){-1===t.$$.dirty[0]&&($.push(t),k||(k=!0,w.then(F)),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function z(e,o,l,c,i,a,f=[-1]){const u=h;x(e);const d=o.props||{},m=e.$$={fragment:null,ctx:null,props:a,update:t,not_equal:i,bound:n(),on_mount:[],on_destroy:[],before_update:[],after_update:[],context:new Map(u?u.$$.context:[]),callbacks:n(),dirty:f,skip_bound:!1};let g=!1;if(m.ctx=l?l(e,d,((t,n,...r)=>{const o=r.length?r[0]:n;return m.ctx&&i(m.ctx[t],m.ctx[t]=o)&&(!m.skip_bound&&m.bound[t]&&m.bound[t](o),g&&M(e,t)),n})):[],m.update(),g=!0,r(m.before_update),m.fragment=!!c&&c(m.ctx),o.target){if(o.hydrate){const t=function(t){return Array.from(t.childNodes)}(o.target);m.fragment&&m.fragment.l(t),t.forEach(s)}else m.fragment&&m.fragment.c();o.intro&&L(e.$$.fragment),P(e,o.target,o.anchor),F()}x(u)}class D{$destroy(){T(this,1),this.$destroy=t}$on(t,e){const n=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return n.push(e),()=>{const t=n.indexOf(e);-1!==t&&n.splice(t,1)}}$set(t){var e;this.$$set&&(e=t,0!==Object.keys(e).length)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}function I(t,e,n){const r=t.slice();return r[1]=e[n].text,r[2]=e[n].link,r[3]=e[n].icon,r}function O(e){let n,r,o,l,a,m,p,h,x=e[1]+"";return{c(){n=f("p"),r=f("a"),o=f("i"),a=d(),m=u(x),h=d(),g(o,"class",l="fas fa-"+e[3]+" fa-fw"),g(r,"class","text-green-500 text-center inline-block transform hover:scale-125"),g(r,"href",p=e[2]),g(r,"target","_blank"),g(n,"class","text-center my-3")},m(t,e){i(t,n,e),c(n,r),c(r,o),c(r,a),c(r,m),c(n,h)},p:t,d(t){t&&s(n)}}}function V(e){let n,r,o,l,u,m,p,h,x,$,b,y,v,w,k,C,j,_,F,G=e[0],E=[];for(let t=0;t<G.length;t+=1)E[t]=O(I(e,G,t));return{c(){n=f("section"),r=f("img"),l=d(),u=f("section"),m=f("p"),m.textContent="Hola, mi nombre es Fernando.",p=d(),h=f("br"),x=d(),$=f("p"),$.textContent="Soy egresado de la Lic. en Ciencias de la Informática y me encanta el\n      desarrollo de aplicaciones (web, móvil, etc).",b=d(),y=f("br"),v=d(),w=f("p"),w.textContent="Te dejo mi contacto por si gustas charlar. Debajo podrás encontrar\n      algunos de mis proyectos y otras cosas interesantes sobre mí.",k=d(),C=f("br"),j=d(),_=f("p"),_.textContent="Saludos :D",F=d();for(let t=0;t<E.length;t+=1)E[t].c();r.src!==(o="https://avatars2.githubusercontent.com/u/10598981?s=460&u=834eb543ae75b8fe7d4b332672870741f0f1d036&v=4")&&g(r,"src","https://avatars2.githubusercontent.com/u/10598981?s=460&u=834eb543ae75b8fe7d4b332672870741f0f1d036&v=4"),g(r,"alt","Me"),g(r,"class","rounded-full w-1/3 md:w-1/5"),g(u,"class","px-5 mt-4 md:mt-0"),g(n,"class","flex flex-col md:flex-row justify-center items-center py-10 md:px-20")},m(t,e){i(t,n,e),c(n,r),c(n,l),c(n,u),c(u,m),c(u,p),c(u,h),c(u,x),c(u,$),c(u,b),c(u,y),c(u,v),c(u,w),c(u,k),c(u,C),c(u,j),c(u,_),c(u,F);for(let t=0;t<E.length;t+=1)E[t].m(u,null)},p(t,[e]){if(1&e){let n;for(G=t[0],n=0;n<G.length;n+=1){const r=I(t,G,n);E[n]?E[n].p(r,e):(E[n]=O(r),E[n].c(),E[n].m(u,null))}for(;n<E.length;n+=1)E[n].d(1);E.length=G.length}},i:t,o:t,d(t){t&&s(n),a(E,t)}}}function B(t){return[[{text:"(+52) 55 3759 2020",link:"tel:5537592020",icon:"phone"},{text:"jfer.garciav@gmail.com",link:"mailto:jfer.garciav@gmail.com",icon:"envelope"}]]}class N extends D{constructor(t){super(),z(this,t,B,V,l,{})}}function q(t,e,n){const r=t.slice();return r[2]=e[n],r}function J(e){let n,r,o,l,a;return{c(){n=f("a"),r=f("i"),l=d(),g(r,"class",o="fab fa-"+e[2].icon+" fa-fw text-3xl transform hover:scale-150"),g(n,"href",a=e[2].link),g(n,"target","_blank")},m(t,e){i(t,n,e),c(n,r),c(n,l)},p:t,d(t){t&&s(n)}}}function U(e){let n,r,o,l,m,p,h,x,$,b,y=e[1],v=[];for(let t=0;t<y.length;t+=1)v[t]=J(q(e,y,t));return{c(){n=f("footer"),r=f("section");for(let t=0;t<v.length;t+=1)v[t].c();o=d(),l=f("section"),m=f("i"),p=u("\n    con\n    "),h=f("i"),x=u("\n    por Fernando García en "),$=u(e[0]),b=u(" ©"),g(m,"class","fas fa-code fa-fw text-blue-500"),g(h,"class","fas fa-heart fa-fw text-red-500"),g(n,"class","bg-gray-900 text-white text-center py-10")},m(t,e){i(t,n,e),c(n,r);for(let t=0;t<v.length;t+=1)v[t].m(r,null);c(n,o),c(n,l),c(l,m),c(l,p),c(l,h),c(l,x),c(l,$),c(l,b)},p(t,[e]){if(2&e){let n;for(y=t[1],n=0;n<y.length;n+=1){const o=q(t,y,n);v[n]?v[n].p(o,e):(v[n]=J(o),v[n].c(),v[n].m(r,null))}for(;n<v.length;n+=1)v[n].d(1);v.length=y.length}},i:t,o:t,d(t){t&&s(n),a(v,t)}}}function Y(t){return[(new Date).getFullYear(),[{icon:"github",link:"https://github.com/FerGv"},{icon:"linkedin",link:"https://www.linkedin.com/in/jose-fernando-garcia-vazquez"}]]}class K extends D{constructor(t){super(),z(this,t,Y,U,l,{})}}function Q(e){let n;return{c(){n=f("header"),n.innerHTML='<section class="name py-20 svelte-1hxrb4a"><h1 class="text-5xl">Fernando García</h1> \n\n    <hr class="w-1/2 m-auto my-3 border-2 border-black"/> \n\n    <h2 class="text-2xl">Desarrollador</h2></section>',g(n,"class","bg-gray-700 text-center min-h-screen flex flex-col justify-center svelte-1hxrb4a")},m(t,e){i(t,n,e)},p:t,i:t,o:t,d(t){t&&s(n)}}}class R extends D{constructor(t){super(),z(this,t,null,Q,l,{})}}function W(e){let n,r,o,l,a,m,h,x,$,b,y,v,w,k,C;return{c(){n=f("article"),r=f("img"),l=d(),a=f("div"),m=f("p"),h=u(e[3]),x=d(),$=f("p"),b=u(e[0]),y=d(),v=f("p"),w=f("a"),k=u("Ver\n        "),C=f("i"),r.src!==(o="/img/"+e[1])&&g(r,"src",o),g(r,"alt",e[3]),g(r,"class","rounded rounded-tr-none rounded-br-none sm:w-1/2 svelte-pr5tm8"),g(m,"class","font-bold uppercase"),g(C,"class","fas fa-external-link-alt fa-fw"),g(w,"href",e[2]),g(w,"class","text-blue-500"),g(w,"target","_blank"),g(v,"class","mt-3"),g(a,"class","project-info flex flex-col justify-center content-center px-5 sm:px-10 flex-1 svelte-pr5tm8"),g(n,"class","flex flex-col sm:flex-row bg-white text-center rounded flex-1")},m(t,e){i(t,n,e),c(n,r),c(n,l),c(n,a),c(a,m),c(m,h),c(a,x),c(a,$),c($,b),c(a,y),c(a,v),c(v,w),c(w,k),c(w,C)},p(t,[e]){2&e&&r.src!==(o="/img/"+t[1])&&g(r,"src",o),8&e&&g(r,"alt",t[3]),8&e&&p(h,t[3]),1&e&&p(b,t[0]),4&e&&g(w,"href",t[2])},i:t,o:t,d(t){t&&s(n)}}}function X(t,e,n){let{description:r}=e,{image:o}=e,{link:l}=e,{title:c}=e;return t.$$set=t=>{"description"in t&&n(0,r=t.description),"image"in t&&n(1,o=t.image),"link"in t&&n(2,l=t.link),"title"in t&&n(3,c=t.title)},[r,o,l,c]}class Z extends D{constructor(t){super(),z(this,t,X,W,l,{description:0,image:1,link:2,title:3})}}function tt(t){let e,n,o,l,a,u,p,h,x,$,b,y;return p=new Z({props:{description:t[1][t[0]].description,image:t[1][t[0]].image,link:t[1][t[0]].link,title:t[1][t[0]].title}}),{c(){e=f("section"),n=f("h3"),n.textContent="Proyectos",o=d(),l=f("section"),a=f("div"),a.innerHTML='<i class="fas fa-chevron-left fa-fw text-4xl"></i>',u=d(),H(p.$$.fragment),h=d(),x=f("div"),x.innerHTML='<i class="fas fa-chevron-right fa-fw text-4xl"></i>',g(n,"class","font-bold text-3xl text-center border border-black mb-4"),g(a,"class","flex flex-col justify-center cursor-pointer hover:bg-gray-200"),g(x,"class","flex flex-col justify-center cursor-pointer hover:bg-gray-200"),g(l,"class","flex justify-center"),g(e,"class","py-10 sm:px-5 bg-gray-400")},m(r,s){i(r,e,s),c(e,n),c(e,o),c(e,l),c(l,a),c(l,u),P(p,l,null),c(l,h),c(l,x),$=!0,b||(y=[m(a,"click",t[3]),m(x,"click",t[2])],b=!0)},p(t,[e]){const n={};1&e&&(n.description=t[1][t[0]].description),1&e&&(n.image=t[1][t[0]].image),1&e&&(n.link=t[1][t[0]].link),1&e&&(n.title=t[1][t[0]].title),p.$set(n)},i(t){$||(L(p.$$.fragment,t),$=!0)},o(t){S(p.$$.fragment,t),$=!1},d(t){t&&s(e),T(p),b=!1,r(y)}}}function et(t,e,n){let r=0;const o=[{title:"Escuela Fit",description:"Proyecto dedicado a mejorar la salud de los alumnos de la UPIICSA.",image:"school.jpg",link:"https://github.com/e-mind/Escuela-Fit"},{title:"Analizador Léxico",description:"Obtención de un listado de lenguajes de programación.",image:"analyzer.png",link:"https://github.com/FerGv/lexical-analyzer"},{title:"Biblioteca Virtual",description:"Gestión de contenido multimedia (fotos, videos, imágenes, archivos).",image:"library.png",link:"https://github.com/FerGv/virtual-library"},{title:"Cafetería",description:"Gestión del inventario de una cafetería.",image:"cafe.jpg",link:"https://github.com/FerGv/SGI"},{title:"Veterinaria",description:"Gestión de clientes, mascotas (citas e historial) y doctores de una clínica veterinaria.",image:"veterinary-clinic.jpg",link:"https://github.com/FerGv/veterinary-clinic"}];return[r,o,()=>{n(0,r+=1),r>=o.length&&n(0,r=0)},()=>{n(0,r-=1),r<0&&n(0,r=o.length-1)}]}class nt extends D{constructor(t){super(),z(this,t,et,tt,l,{})}}function rt(t,e,n){const r=t.slice();return r[4]=e[n],r}function ot(t){let e;return{c(){e=f("i"),g(e,"class","fas fa-star fa-fw text-yellow-400")},m(t,n){i(t,e,n)},d(t){t&&s(e)}}}function lt(e){let n,r,o,l,m,h,x,$,b,y=Array(e[3]),v=[];for(let t=0;t<y.length;t+=1)v[t]=ot(rt(e,y,t));return{c(){n=f("article"),r=f("p"),o=f("i"),m=d(),h=f("p"),x=u(e[0]),$=d(),b=f("p");for(let t=0;t<v.length;t+=1)v[t].c();g(o,"class",l="fab fa-"+e[1]+" fa-fw text-"+e[2]+" text-4xl"),g(h,"class","font-bold uppercase"),g(n,"class","flex flex-col bg-white text-center py-5 rounded transform hover:scale-90")},m(t,e){i(t,n,e),c(n,r),c(r,o),c(n,m),c(n,h),c(h,x),c(n,$),c(n,b);for(let t=0;t<v.length;t+=1)v[t].m(b,null)},p(t,[e]){if(6&e&&l!==(l="fab fa-"+t[1]+" fa-fw text-"+t[2]+" text-4xl")&&g(o,"class",l),1&e&&p(x,t[0]),8&e){const e=y.length;let n;for(y=Array(t[3]),n=e;n<y.length;n+=1){rt(t,y,n);v[n]||(v[n]=ot(),v[n].c(),v[n].m(b,null))}for(n=y.length;n<e;n+=1)v[n].d(1);v.length=y.length}},i:t,o:t,d(t){t&&s(n),a(v,t)}}}function ct(t,e,n){let{name:r}=e,{icon:o}=e,{iconColor:l}=e,{stars:c}=e;return t.$$set=t=>{"name"in t&&n(0,r=t.name),"icon"in t&&n(1,o=t.icon),"iconColor"in t&&n(2,l=t.iconColor),"stars"in t&&n(3,c=t.stars)},[r,o,l,c]}class it extends D{constructor(t){super(),z(this,t,ct,lt,l,{name:0,icon:1,iconColor:2,stars:3})}}function st(t,e,n){const r=t.slice();return r[1]=e[n].name,r[2]=e[n].icon,r[3]=e[n].iconColor,r[4]=e[n].stars,r}function at(e){let n,r;return n=new it({props:{name:e[1],icon:e[2],iconColor:e[3],stars:e[4]}}),{c(){H(n.$$.fragment)},m(t,e){P(n,t,e),r=!0},p:t,i(t){r||(L(n.$$.fragment,t),r=!0)},o(t){S(n.$$.fragment,t),r=!1},d(t){T(n,t)}}}function ft(t){let e,n,o,l,u,m=t[0],p=[];for(let e=0;e<m.length;e+=1)p[e]=at(st(t,m,e));const h=t=>S(p[t],1,1,(()=>{p[t]=null}));return{c(){e=f("section"),n=f("h3"),n.textContent="Habilidades",o=d(),l=f("section");for(let t=0;t<p.length;t+=1)p[t].c();g(n,"class","text-white font-bold text-3xl text-center border mb-4"),g(l,"class","grid grid-cols-2 sm:grid-cols-3 gap-3 svelte-m8o50i"),g(e,"class","py-10 px-5 svelte-m8o50i")},m(t,r){i(t,e,r),c(e,n),c(e,o),c(e,l);for(let t=0;t<p.length;t+=1)p[t].m(l,null);u=!0},p(t,[e]){if(1&e){let n;for(m=t[0],n=0;n<m.length;n+=1){const r=st(t,m,n);p[n]?(p[n].p(r,e),L(p[n],1)):(p[n]=at(r),p[n].c(),L(p[n],1),p[n].m(l,null))}for(A={r:0,c:[],p:A},n=m.length;n<p.length;n+=1)h(n);A.r||r(A.c),A=A.p}},i(t){if(!u){for(let t=0;t<m.length;t+=1)L(p[t]);u=!0}},o(t){p=p.filter(Boolean);for(let t=0;t<p.length;t+=1)S(p[t]);u=!1},d(t){t&&s(e),a(p,t)}}}function ut(t){return[[{name:"Python",icon:"python",iconColor:"blue-400",stars:4},{name:"Javascript",icon:"js",iconColor:"yellow-300",stars:4},{name:"Vue",icon:"vuejs",iconColor:"green-500",stars:4},{name:"HTML",icon:"html5",iconColor:"red-400",stars:4},{name:"CSS",icon:"css3-alt",iconColor:"blue-700",stars:4},{name:"PHP",icon:"php",iconColor:"blue-800",stars:3}]]}class dt extends D{constructor(t){super(),z(this,t,ut,ft,l,{})}}function mt(e){let n,r,o,l,a,u,m,g,p,h,x;return r=new R({}),l=new N({}),u=new nt({}),g=new dt({}),h=new K({}),{c(){n=f("main"),H(r.$$.fragment),o=d(),H(l.$$.fragment),a=d(),H(u.$$.fragment),m=d(),H(g.$$.fragment),p=d(),H(h.$$.fragment)},m(t,e){i(t,n,e),P(r,n,null),c(n,o),P(l,n,null),c(n,a),P(u,n,null),c(n,m),P(g,n,null),c(n,p),P(h,n,null),x=!0},p:t,i(t){x||(L(r.$$.fragment,t),L(l.$$.fragment,t),L(u.$$.fragment,t),L(g.$$.fragment,t),L(h.$$.fragment,t),x=!0)},o(t){S(r.$$.fragment,t),S(l.$$.fragment,t),S(u.$$.fragment,t),S(g.$$.fragment,t),S(h.$$.fragment,t),x=!1},d(t){t&&s(n),T(r),T(l),T(u),T(g),T(h)}}}return new class extends D{constructor(t){super(),z(this,t,null,mt,l,{})}}({target:document.body})}();
//# sourceMappingURL=bundle.js.map
