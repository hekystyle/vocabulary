if(!self.define){let s,e={};const i=(i,l)=>(i=new URL(i+".js",l).href,e[i]||new Promise((e=>{if("document"in self){const s=document.createElement("script");s.src=i,s.onload=e,document.head.appendChild(s)}else s=i,importScripts(i),e()})).then((()=>{let s=e[i];if(!s)throw new Error(`Module ${i} didn’t register its module`);return s})));self.define=(l,n)=>{const r=s||("document"in self?document.currentScript.src:"")||location.href;if(e[r])return;let t={};const u=s=>i(s,r),o={module:{uri:r},exports:t,require:u};e[r]=Promise.all(l.map((s=>o[s]||u(s)))).then((s=>(n(...s),t)))}}define(["./workbox-7369c0e1"],(function(s){"use strict";self.addEventListener("message",(s=>{s.data&&"SKIP_WAITING"===s.data.type&&self.skipWaiting()})),s.precacheAndRoute([{url:"assets/button-fc7038dc.js",revision:null},{url:"assets/CreatePage-9c5d1ded.js",revision:null},{url:"assets/Form-af429d15.js",revision:null},{url:"assets/index-41d07ec4.css",revision:null},{url:"assets/index-51bb6bd1.js",revision:null},{url:"assets/index-59bbef48.js",revision:null},{url:"assets/index-90375025.js",revision:null},{url:"assets/index-e12cf8c1.js",revision:null},{url:"assets/ListPage-4c7abdfb.js",revision:null},{url:"assets/Page-fb5c7a21.js",revision:null},{url:"assets/queryKeys-fa4f5833.js",revision:null},{url:"assets/Tags-96d4b092.js",revision:null},{url:"assets/UpdatePage-9c65cdff.js",revision:null},{url:"assets/web-vitals-7b71ae84.js",revision:null},{url:"index.html",revision:"69b815847ff92872cecbaa931fa993d0"},{url:"registerSW.js",revision:"1872c500de691dce40960bb85481de07"}],{}),s.cleanupOutdatedCaches(),s.registerRoute(new s.NavigationRoute(s.createHandlerBoundToURL("index.html")))}));
