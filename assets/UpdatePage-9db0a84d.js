import{o as y,p as E,q as I,z as N,A as v,j as t,w as i,x as c,B as w}from"./index-b79f1141.js";import{u as x}from"./compact-item-0a38f763.js";import{Q as u,a as S}from"./queryKeys-35c55de0.js";import{F as j}from"./Form-24d7610f.js";import"./Tags-9b0c1bfd.js";import"./index-3cc8f336.js";import"./button-1537ba7c.js";function B(s){return typeof s.returnUrl=="string"}const C=()=>{const s=y(),a=E(),{termsRepository:n}=I(),{id:o}=N(),r=o?parseInt(o,10):NaN,f=v(u.terms.id(r)),{isFetching:g,error:d,data:l,status:m}=S(u.terms.id(r),async({signal:e})=>await n.getById(r,e),{enabled:!Number.isNaN(r),onError:e=>console.error(e)}),{mutateAsync:h}=x(u.terms.id(r),n.update.bind(n),{onError:e=>console.error(e)}),p=()=>{w(a.state)&&B(a.state)?s(a.state.returnUrl):s("/records")},b=e=>{h(e).then(p).catch(console.error)},U=()=>p();if(f)return t(i,{label:"Updating ..."});if(g)return t(i,{label:"Loading ..."});switch(m){case"idle":return t("p",{children:"Idle"});case"loading":return t(i,{label:"Loading ..."});case"error":return c("p",{children:["Error: ",d instanceof Error?d.message:"Unknown"]});case"success":return l===void 0?c("p",{children:["Term not found by ID: ",o]}):t(j,{defaultValue:l,onCancel:U,onSubmit:b});default:return c("p",{children:["Unknown status: ",m]})}};export{C as default};
