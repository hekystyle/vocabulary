if(!self.define){let s,e={};const i=(i,l)=>(i=new URL(i+".js",l).href,e[i]||new Promise((e=>{if("document"in self){const s=document.createElement("script");s.src=i,s.onload=e,document.head.appendChild(s)}else s=i,importScripts(i),e()})).then((()=>{let s=e[i];if(!s)throw new Error(`Module ${i} didn’t register its module`);return s})));self.define=(l,r)=>{const n=s||("document"in self?document.currentScript.src:"")||location.href;if(e[n])return;let t={};const u=s=>i(s,n),o={module:{uri:n},exports:t,require:u};e[n]=Promise.all(l.map((s=>o[s]||u(s)))).then((s=>(r(...s),t)))}}define(["./workbox-27b29e6f"],(function(s){"use strict";self.addEventListener("message",(s=>{s.data&&"SKIP_WAITING"===s.data.type&&self.skipWaiting()})),s.precacheAndRoute([{url:"assets/CreatePage-142fd254.js",revision:null},{url:"assets/Form-d6d7660d.js",revision:null},{url:"assets/index-334fe080.js",revision:null},{url:"assets/index-87153a8b.css",revision:null},{url:"assets/index-9ba77dcc.js",revision:null},{url:"assets/index-b79c61ee.js",revision:null},{url:"assets/ListPage-1137492b.js",revision:null},{url:"assets/Page-25aa6962.js",revision:null},{url:"assets/Page-8d170ccf.js",revision:null},{url:"assets/queryKeys-4a59d2a3.js",revision:null},{url:"assets/row-49bb371e.js",revision:null},{url:"assets/Tags-eb8e025c.js",revision:null},{url:"assets/UpdatePage-4c0246dd.js",revision:null},{url:"assets/web-vitals-9f4c2f45.js",revision:null},{url:"index.html",revision:"e430210e698a017a6def2b549bc2d6ce"},{url:"registerSW.js",revision:"402b66900e731ca748771b6fc5e7a068"}],{}),s.cleanupOutdatedCaches(),s.registerRoute(new s.NavigationRoute(s.createHandlerBoundToURL("index.html")))}));
