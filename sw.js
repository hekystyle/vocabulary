if(!self.define){let e,s={};const i=(i,l)=>(i=new URL(i+".js",l).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(l,n)=>{const r=e||("document"in self?document.currentScript.src:"")||location.href;if(s[r])return;let t={};const u=e=>i(e,r),o={module:{uri:r},exports:t,require:u};s[r]=Promise.all(l.map((e=>o[e]||u(e)))).then((e=>(n(...e),t)))}}define(["./workbox-7369c0e1"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"assets/button-17ce1136.js",revision:null},{url:"assets/CreatePage-71930785.js",revision:null},{url:"assets/Form-169bfe0b.js",revision:null},{url:"assets/index-41d07ec4.css",revision:null},{url:"assets/index-5ea10e70.js",revision:null},{url:"assets/index-b9232e39.js",revision:null},{url:"assets/index-e85c9393.js",revision:null},{url:"assets/index-f886b1eb.js",revision:null},{url:"assets/ListPage-01cd1bd0.js",revision:null},{url:"assets/Page-1e4bff3e.js",revision:null},{url:"assets/queryKeys-286b327b.js",revision:null},{url:"assets/Tags-1ef070b0.js",revision:null},{url:"assets/UpdatePage-0457d215.js",revision:null},{url:"assets/web-vitals-7b71ae84.js",revision:null},{url:"index.html",revision:"5cf137848be9436e802be22c7dac93ef"},{url:"registerSW.js",revision:"1872c500de691dce40960bb85481de07"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));