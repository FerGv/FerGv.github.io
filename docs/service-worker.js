!function(){"use strict";const e=1609778963629,t=`cache${e}`,s=["/client/client.8c64eb9e.js","/client/inject_styles.5607aec6.js","/client/index.b44a05ac.js"].concat(["/service-worker-index.html","/CNAME","/css/global.css","/css/tailwind.css","/favicon.svg","/files/CV_Fernando_García_(en).pdf","/files/CV_Fernando_García_(es).pdf","/img/.DS_Store","/img/analyzer.png","/img/cafe.jpg","/img/experience-bg.jpg","/img/header-bg.jpg","/img/lang-en.svg","/img/lang-es.svg","/img/library.png","/img/profile-photo.jpeg","/img/school.jpg","/img/skills-bg.jpg","/img/veterinary-clinic.jpg","/manifest.json"]),n=new Set(s);self.addEventListener("install",(e=>{e.waitUntil(caches.open(t).then((e=>e.addAll(s))).then((()=>{self.skipWaiting()})))})),self.addEventListener("activate",(e=>{e.waitUntil(caches.keys().then((async e=>{for(const s of e)s!==t&&await caches.delete(s);self.clients.claim()})))})),self.addEventListener("fetch",(t=>{if("GET"!==t.request.method||t.request.headers.has("range"))return;const s=new URL(t.request.url),a=s.protocol.startsWith("http"),c=s.hostname===self.location.hostname&&s.port!==self.location.port,i=s.host===self.location.host&&n.has(s.pathname),o="only-if-cached"===t.request.cache&&!i;!a||c||o||t.respondWith((async()=>i&&await caches.match(t.request)||async function(t){const s=await caches.open(`offline${e}`);try{const e=await fetch(t);return s.put(t,e.clone()),e}catch(e){const n=await s.match(t);if(n)return n;throw e}}(t.request))())}))}();
