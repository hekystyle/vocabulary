import{b as x,y as h,v as j,F as U,H as F,c as v,j as e,S as i,I}from"./index-d728f598.js";import{Q as u,u as N}from"./queryKeys-124d1007.js";import{F as S}from"./Form-e6b3e753.js";import"./Tags-648563e2.js";import"./index-a64254c8.js";function E(s){return typeof s.returnUrl=="string"}const L=()=>{const s=x(),r=h(),{termsRepository:a}=j(),{id:n}=U(),t=n?parseInt(n,10):NaN,p=F(u.terms.id(t)),{isFetching:f,error:c,data:d,status:l}=N({queryKey:u.terms.id(t),queryFn:async({signal:o})=>await a.getById(t,o),enabled:!Number.isNaN(t)}),{mutateAsync:g}=v({mutationKey:u.terms.id(t),mutationFn:a.update.bind(a)}),m=()=>{I(r.state)&&E(r.state)?s(r.state.returnUrl):s("/records")},y=o=>{g(o).then(m).catch(console.error)},b=()=>m();if(p)return e.jsx(i,{label:"Updating ..."});if(f)return e.jsx(i,{label:"Loading ..."});switch(l){case"loading":return e.jsx(i,{label:"Loading ..."});case"error":return e.jsxs("p",{children:["Error: ",c instanceof Error?c.message:"Unknown"]});case"success":return d===void 0?e.jsxs("p",{children:["Term not found by ID: ",n]}):e.jsx(S,{defaultValue:d,onCancel:b,onSubmit:y});default:return e.jsxs("p",{children:["Unknown status: ",l]})}};export{L as default};
