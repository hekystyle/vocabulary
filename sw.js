if(!self.define){let s,e={};const i=(i,l)=>(i=new URL(i+".js",l).href,e[i]||new Promise((e=>{if("document"in self){const s=document.createElement("script");s.src=i,s.onload=e,document.head.appendChild(s)}else s=i,importScripts(i),e()})).then((()=>{let s=e[i];if(!s)throw new Error(`Module ${i} didn’t register its module`);return s})));self.define=(l,r)=>{const n=s||("document"in self?document.currentScript.src:"")||location.href;if(e[n])return;let t={};const u=s=>i(s,n),o={module:{uri:n},exports:t,require:u};e[n]=Promise.all(l.map((s=>o[s]||u(s)))).then((s=>(r(...s),t)))}}define(["./workbox-27b29e6f"],(function(s){"use strict";self.addEventListener("message",(s=>{s.data&&"SKIP_WAITING"===s.data.type&&self.skipWaiting()})),s.precacheAndRoute([{url:"assets/CreatePage-52338863.js",revision:null},{url:"assets/Form-7954b513.js",revision:null},{url:"assets/index-01f76892.js",revision:null},{url:"assets/index-7f78f307.js",revision:null},{url:"assets/index-87153a8b.css",revision:null},{url:"assets/index-ebe29ca7.js",revision:null},{url:"assets/ListPage-46efc52f.js",revision:null},{url:"assets/Page-9bbd3ec5.js",revision:null},{url:"assets/Page-ea98ddd7.js",revision:null},{url:"assets/queryKeys-39604b37.js",revision:null},{url:"assets/row-19f938d3.js",revision:null},{url:"assets/Tags-892d018c.js",revision:null},{url:"assets/UpdatePage-1d617c61.js",revision:null},{url:"assets/web-vitals-dfcc5b9a.js",revision:null},{url:"index.html",revision:"e3e48359f41708c937b6b14dbc1a297d"},{url:"registerSW.js",revision:"402b66900e731ca748771b6fc5e7a068"}],{}),s.cleanupOutdatedCaches(),s.registerRoute(new s.NavigationRoute(s.createHandlerBoundToURL("index.html")))}));
