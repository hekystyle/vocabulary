if(!self.define){let s,e={};const l=(l,i)=>(l=new URL(l+".js",i).href,e[l]||new Promise((e=>{if("document"in self){const s=document.createElement("script");s.src=l,s.onload=e,document.head.appendChild(s)}else s=l,importScripts(l),e()})).then((()=>{let s=e[l];if(!s)throw new Error(`Module ${l} didn’t register its module`);return s})));self.define=(i,n)=>{const r=s||("document"in self?document.currentScript.src:"")||location.href;if(e[r])return;let u={};const t=s=>l(s,r),o={module:{uri:r},exports:u,require:t};e[r]=Promise.all(i.map((s=>o[s]||t(s)))).then((s=>(n(...s),u)))}}define(["./workbox-27b29e6f"],(function(s){"use strict";self.addEventListener("message",(s=>{s.data&&"SKIP_WAITING"===s.data.type&&self.skipWaiting()})),s.precacheAndRoute([{url:"assets/CreatePage-OLAniF6S.js",revision:null},{url:"assets/Form-oPU7us2l.js",revision:null},{url:"assets/index-_n3anF6Y.js",revision:null},{url:"assets/index-dw0Wku-X.js",revision:null},{url:"assets/index-PKpCWN6a.js",revision:null},{url:"assets/index-TK_De8RI.css",revision:null},{url:"assets/ListPage-NyDBDDuA.js",revision:null},{url:"assets/Page-0jFlJA5W.js",revision:null},{url:"assets/Page-w3gJAThV.js",revision:null},{url:"assets/queryKeys-2xmQmvF2.js",revision:null},{url:"assets/row-IP5oYc9g.js",revision:null},{url:"assets/Tags-YMfCUwKE.js",revision:null},{url:"assets/UpdatePage-pk4Nymlo.js",revision:null},{url:"assets/web-vitals-GXdahIIP.js",revision:null},{url:"index.html",revision:"d0399ec8600034f03a8469b99418d433"},{url:"registerSW.js",revision:"402b66900e731ca748771b6fc5e7a068"}],{}),s.cleanupOutdatedCaches(),s.registerRoute(new s.NavigationRoute(s.createHandlerBoundToURL("index.html")))}));
