import{l as m,n as l,j as r,S as p}from"./index-278e01b2.js";import{F as d}from"./Form-e3fa320b.js";import{u as x}from"./compact-item-a5f7af99.js";import"./Tags-a9018aff.js";import"./queryKeys-fd1818e2.js";import"./index-6ba262d8.js";import"./button-b5186451.js";const C=()=>{const a=m(),{termsRepository:t}=l(),{mutateAsync:c,status:e,error:n}=x(t.create.bind(t),{onError:s=>console.error(s)}),o=()=>{a("/records")},i=s=>{c(s).then(o).catch(console.error)},u=()=>o();switch(e){case"loading":return r.jsx(p,{label:"Creating ..."});case"error":return r.jsxs("p",{children:["Error: ",n instanceof Error?n.message:"Unknown"]});case"success":return r.jsx("p",{children:e});case"idle":return r.jsx(d,{onCancel:u,onSubmit:i});default:return r.jsxs("p",{children:["Unknown status: ",e]})}};export{C as default};
