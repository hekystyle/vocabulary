if(!self.define){let s,e={};const l=(l,i)=>(l=new URL(l+".js",i).href,e[l]||new Promise((e=>{if("document"in self){const s=document.createElement("script");s.src=l,s.onload=e,document.head.appendChild(s)}else s=l,importScripts(l),e()})).then((()=>{let s=e[l];if(!s)throw new Error(`Module ${l} didn’t register its module`);return s})));self.define=(i,r)=>{const n=s||("document"in self?document.currentScript.src:"")||location.href;if(e[n])return;let t={};const u=s=>l(s,n),o={module:{uri:n},exports:t,require:u};e[n]=Promise.all(i.map((s=>o[s]||u(s)))).then((s=>(r(...s),t)))}}define(["./workbox-27b29e6f"],(function(s){"use strict";self.addEventListener("message",(s=>{s.data&&"SKIP_WAITING"===s.data.type&&self.skipWaiting()})),s.precacheAndRoute([{url:"assets/CreatePage-AvsLU6Da.js",revision:null},{url:"assets/Form-XMj9NIMv.js",revision:null},{url:"assets/index-3q3Rv4J0.js",revision:null},{url:"assets/index-8E2ThZKZ.js",revision:null},{url:"assets/index-TK_De8RI.css",revision:null},{url:"assets/index-wuc3vGlb.js",revision:null},{url:"assets/ListPage-hrzFPPzA.js",revision:null},{url:"assets/Page-gOAE3kHo.js",revision:null},{url:"assets/Page-nMikJ5BW.js",revision:null},{url:"assets/queryKeys-ILG9WHuU.js",revision:null},{url:"assets/row-RLkIKVEQ.js",revision:null},{url:"assets/Tags-6WvVoAKl.js",revision:null},{url:"assets/UpdatePage-Ym6EBEeP.js",revision:null},{url:"assets/web-vitals-GXdahIIP.js",revision:null},{url:"index.html",revision:"27b7d778c34ca8683b55bc3bc9781011"},{url:"registerSW.js",revision:"402b66900e731ca748771b6fc5e7a068"}],{}),s.cleanupOutdatedCaches(),s.registerRoute(new s.NavigationRoute(s.createHandlerBoundToURL("index.html")))}));
