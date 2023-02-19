import{r as i,k as oo,H as $o,c as ro,I as b,i as ho,S as So,D as vo}from"./index-e85c9393.js";import{c as Oo,a as xo,L as Y,C as Eo,g as Bo,m as z,p as jo,f as Io,o as To,W as Ho}from"./index-f886b1eb.js";var wo=globalThis&&globalThis.__rest||function(o,r){var t={};for(var e in o)Object.prototype.hasOwnProperty.call(o,e)&&r.indexOf(e)<0&&(t[e]=o[e]);if(o!=null&&typeof Object.getOwnPropertySymbols=="function")for(var n=0,e=Object.getOwnPropertySymbols(o);n<e.length;n++)r.indexOf(e[n])<0&&Object.prototype.propertyIsEnumerable.call(o,e[n])&&(t[e[n]]=o[e[n]]);return t};const eo=i.createContext(void 0),Po=o=>{const{getPrefixCls:r,direction:t}=i.useContext(oo),{prefixCls:e,size:n,className:l}=o,a=wo(o,["prefixCls","size","className"]),c=r("btn-group",e),[,,d]=$o();let p="";switch(n){case"large":p="lg";break;case"small":p="sm";break}const u=ro(c,{[`${c}-${p}`]:p,[`${c}-rtl`]:t==="rtl"},l,d);return i.createElement(eo.Provider,{value:n},i.createElement("div",Object.assign({},a,{className:u})))},zo=Po,Z=/^[\u4e00-\u9fa5]{2}$/,w=Z.test.bind(Z);function No(o){return typeof o=="string"}function I(o){return o==="text"||o==="link"}function Ao(o,r){if(o==null)return;const t=r?" ":"";return typeof o!="string"&&typeof o!="number"&&No(o.type)&&w(o.props.children)?Oo(o,{children:o.props.children.split("").join(t)}):typeof o=="string"?w(o)?b.createElement("span",null,o.split("").join(t)):b.createElement("span",null,o):xo(o)?b.createElement("span",null,o):o}function Do(o,r){let t=!1;const e=[];return b.Children.forEach(o,n=>{const l=typeof n,a=l==="string"||l==="number";if(t&&a){const c=e.length-1,d=e[c];e[c]=`${d}${n}`}else e.push(n);t=a}),b.Children.map(e,n=>Ao(n,r))}const T=()=>({width:0,opacity:0,transform:"scale(0)"}),H=o=>({width:o.scrollWidth,opacity:1,transform:"scale(1)"}),Ro=o=>{let{prefixCls:r,loading:t,existIcon:e}=o;const n=!!t;return e?b.createElement("span",{className:`${r}-loading-icon`},b.createElement(Y,null)):b.createElement(Eo,{visible:n,motionName:`${r}-loading-icon-motion`,removeOnLeave:!0,onAppearStart:T,onAppearActive:H,onEnterStart:T,onEnterActive:H,onLeaveStart:H,onLeaveActive:T},(l,a)=>{let{className:c,style:d}=l;return b.createElement("span",{className:`${r}-loading-icon`,style:d,ref:a},b.createElement(Y,{className:c}))})},Lo=Ro,k=(o,r)=>({[`> span, > ${o}`]:{"&:not(:last-child)":{[`&, & > ${o}`]:{"&:not(:disabled)":{borderInlineEndColor:r}}},"&:not(:first-child)":{[`&, & > ${o}`]:{"&:not(:disabled)":{borderInlineStartColor:r}}}}}),Wo=o=>{const{componentCls:r,fontSize:t,lineWidth:e,colorPrimaryHover:n,colorErrorHover:l}=o;return{[`${r}-group`]:[{position:"relative",display:"inline-flex",[`> span, > ${r}`]:{"&:not(:last-child)":{[`&, & > ${r}`]:{borderStartEndRadius:0,borderEndEndRadius:0}},"&:not(:first-child)":{marginInlineStart:-e,[`&, & > ${r}`]:{borderStartStartRadius:0,borderEndStartRadius:0}}},[r]:{position:"relative",zIndex:1,[`&:hover,
          &:focus,
          &:active`]:{zIndex:2},"&[disabled]":{zIndex:0}},[`${r}-icon-only`]:{fontSize:t}},k(`${r}-primary`,n),k(`${r}-danger`,l)]}},_o=Wo;function Go(o,r){return{[`&-item:not(${r}-last-item)`]:{marginBottom:-o.lineWidth},"&-item":{"&:hover,&:focus,&:active":{zIndex:2},"&[disabled]":{zIndex:0}}}}function Mo(o,r){return{[`&-item:not(${r}-first-item):not(${r}-last-item)`]:{borderRadius:0},[`&-item${r}-first-item:not(${r}-last-item)`]:{[`&, &${o}-sm, &${o}-lg`]:{borderEndEndRadius:0,borderEndStartRadius:0}},[`&-item${r}-last-item:not(${r}-first-item)`]:{[`&, &${o}-sm, &${o}-lg`]:{borderStartStartRadius:0,borderStartEndRadius:0}}}}function Vo(o){const r=`${o.componentCls}-compact-vertical`;return{[r]:Object.assign(Object.assign({},Go(o,r)),Mo(o.componentCls,r))}}const Fo=o=>{const{componentCls:r,iconCls:t}=o;return{[r]:{outline:"none",position:"relative",display:"inline-block",fontWeight:400,whiteSpace:"nowrap",textAlign:"center",backgroundImage:"none",backgroundColor:"transparent",border:`${o.lineWidth}px ${o.lineType} transparent`,cursor:"pointer",transition:`all ${o.motionDurationMid} ${o.motionEaseInOut}`,userSelect:"none",touchAction:"manipulation",lineHeight:o.lineHeight,color:o.colorText,"> span":{display:"inline-block"},[`> ${t} + span, > span + ${t}`]:{marginInlineStart:o.marginXS},"> a":{color:"currentColor"},"&:not(:disabled)":Object.assign({},ho(o)),[`&-icon-only${r}-compact-item`]:{flex:"none"},[`&-compact-item${r}-primary`]:{[`&:not([disabled]) + ${r}-compact-item${r}-primary:not([disabled])`]:{position:"relative","&:before":{position:"absolute",top:-o.lineWidth,insetInlineStart:-o.lineWidth,display:"inline-block",width:o.lineWidth,height:`calc(100% + ${o.lineWidth*2}px)`,backgroundColor:o.colorPrimaryHover,content:'""'}}},"&-compact-vertical-item":{[`&${r}-primary`]:{[`&:not([disabled]) + ${r}-compact-vertical-item${r}-primary:not([disabled])`]:{position:"relative","&:before":{position:"absolute",top:-o.lineWidth,insetInlineStart:-o.lineWidth,display:"inline-block",width:`calc(100% + ${o.lineWidth*2}px)`,height:o.lineWidth,backgroundColor:o.colorPrimaryHover,content:'""'}}}}}}},m=(o,r)=>({"&:not(:disabled)":{"&:hover":o,"&:active":r}}),Xo=o=>({minWidth:o.controlHeight,paddingInlineStart:0,paddingInlineEnd:0,borderRadius:"50%"}),Uo=o=>({borderRadius:o.controlHeight,paddingInlineStart:o.controlHeight/2,paddingInlineEnd:o.controlHeight/2}),P=o=>({cursor:"not-allowed",borderColor:o.colorBorder,color:o.colorTextDisabled,backgroundColor:o.colorBgContainerDisabled,boxShadow:"none"}),v=(o,r,t,e,n,l,a)=>({[`&${o}-background-ghost`]:Object.assign(Object.assign({color:r||void 0,backgroundColor:"transparent",borderColor:t||void 0,boxShadow:"none"},m(Object.assign({backgroundColor:"transparent"},l),Object.assign({backgroundColor:"transparent"},a))),{"&:disabled":{cursor:"not-allowed",color:e||void 0,borderColor:n||void 0}})}),N=o=>({"&:disabled":Object.assign({},P(o))}),to=o=>Object.assign({},N(o)),O=o=>({"&:disabled":{cursor:"not-allowed",color:o.colorTextDisabled}}),no=o=>Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({},to(o)),{backgroundColor:o.colorBgContainer,borderColor:o.colorBorder,boxShadow:`0 ${o.controlOutlineWidth}px 0 ${o.controlTmpOutline}`}),m({color:o.colorPrimaryHover,borderColor:o.colorPrimaryHover},{color:o.colorPrimaryActive,borderColor:o.colorPrimaryActive})),v(o.componentCls,o.colorBgContainer,o.colorBgContainer,o.colorTextDisabled,o.colorBorder)),{[`&${o.componentCls}-dangerous`]:Object.assign(Object.assign(Object.assign({color:o.colorError,borderColor:o.colorError},m({color:o.colorErrorHover,borderColor:o.colorErrorBorderHover},{color:o.colorErrorActive,borderColor:o.colorErrorActive})),v(o.componentCls,o.colorError,o.colorError,o.colorTextDisabled,o.colorBorder)),N(o))}),qo=o=>Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({},to(o)),{color:o.colorTextLightSolid,backgroundColor:o.colorPrimary,boxShadow:`0 ${o.controlOutlineWidth}px 0 ${o.controlOutline}`}),m({color:o.colorTextLightSolid,backgroundColor:o.colorPrimaryHover},{color:o.colorTextLightSolid,backgroundColor:o.colorPrimaryActive})),v(o.componentCls,o.colorPrimary,o.colorPrimary,o.colorTextDisabled,o.colorBorder,{color:o.colorPrimaryHover,borderColor:o.colorPrimaryHover},{color:o.colorPrimaryActive,borderColor:o.colorPrimaryActive})),{[`&${o.componentCls}-dangerous`]:Object.assign(Object.assign(Object.assign({backgroundColor:o.colorError,boxShadow:`0 ${o.controlOutlineWidth}px 0 ${o.colorErrorOutline}`},m({backgroundColor:o.colorErrorHover},{backgroundColor:o.colorErrorActive})),v(o.componentCls,o.colorError,o.colorError,o.colorTextDisabled,o.colorBorder,{color:o.colorErrorHover,borderColor:o.colorErrorHover},{color:o.colorErrorActive,borderColor:o.colorErrorActive})),N(o))}),Jo=o=>Object.assign(Object.assign({},no(o)),{borderStyle:"dashed"}),Ko=o=>Object.assign(Object.assign(Object.assign({color:o.colorLink},m({color:o.colorLinkHover},{color:o.colorLinkActive})),O(o)),{[`&${o.componentCls}-dangerous`]:Object.assign(Object.assign({color:o.colorError},m({color:o.colorErrorHover},{color:o.colorErrorActive})),O(o))}),Qo=o=>Object.assign(Object.assign(Object.assign({},m({color:o.colorText,backgroundColor:o.colorBgTextHover},{color:o.colorText,backgroundColor:o.colorBgTextActive})),O(o)),{[`&${o.componentCls}-dangerous`]:Object.assign(Object.assign({color:o.colorError},O(o)),m({color:o.colorErrorHover,backgroundColor:o.colorErrorBg},{color:o.colorErrorHover,backgroundColor:o.colorErrorBg}))}),Yo=o=>Object.assign(Object.assign({},P(o)),{[`&${o.componentCls}:hover`]:Object.assign({},P(o))}),Zo=o=>{const{componentCls:r}=o;return{[`${r}-default`]:no(o),[`${r}-primary`]:qo(o),[`${r}-dashed`]:Jo(o),[`${r}-link`]:Ko(o),[`${r}-text`]:Qo(o),[`${r}-disabled`]:Yo(o)}},A=function(o){let r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:"";const{componentCls:t,iconCls:e,controlHeight:n,fontSize:l,lineHeight:a,lineWidth:c,borderRadius:d,buttonPaddingHorizontal:p}=o,u=Math.max(0,(n-l*a)/2-c),f=p-c,S=`${t}-icon-only`;return[{[`${t}${r}`]:{fontSize:l,height:n,padding:`${u}px ${f}px`,borderRadius:d,[`&${S}`]:{width:n,paddingInlineStart:0,paddingInlineEnd:0,[`&${t}-round`]:{width:"auto"},"> span":{transform:"scale(1.143)"}},[`&${t}-loading`]:{opacity:o.opacityLoading,cursor:"default"},[`${t}-loading-icon`]:{transition:`width ${o.motionDurationSlow} ${o.motionEaseInOut}, opacity ${o.motionDurationSlow} ${o.motionEaseInOut}`},[`&:not(${S}) ${t}-loading-icon > ${e}`]:{marginInlineEnd:o.marginXS}}},{[`${t}${t}-circle${r}`]:Xo(o)},{[`${t}${t}-round${r}`]:Uo(o)}]},ko=o=>A(o),or=o=>{const r=z(o,{controlHeight:o.controlHeightSM,padding:o.paddingXS,buttonPaddingHorizontal:8,borderRadius:o.borderRadiusSM});return A(r,`${o.componentCls}-sm`)},rr=o=>{const r=z(o,{controlHeight:o.controlHeightLG,fontSize:o.fontSizeLG,borderRadius:o.borderRadiusLG});return A(r,`${o.componentCls}-lg`)},er=o=>{const{componentCls:r}=o;return{[r]:{[`&${r}-block`]:{width:"100%"}}}},tr=Bo("Button",o=>{const{controlTmpOutline:r,paddingContentHorizontal:t}=o,e=z(o,{colorOutlineDefault:r,buttonPaddingHorizontal:t});return[Fo(e),or(e),ko(e),rr(e),er(e),Zo(e),_o(e),jo(o,{focus:!1}),Vo(o)]});var nr=globalThis&&globalThis.__rest||function(o,r){var t={};for(var e in o)Object.prototype.hasOwnProperty.call(o,e)&&r.indexOf(e)<0&&(t[e]=o[e]);if(o!=null&&typeof Object.getOwnPropertySymbols=="function")for(var n=0,e=Object.getOwnPropertySymbols(o);n<e.length;n++)r.indexOf(e[n])<0&&Object.prototype.propertyIsEnumerable.call(o,e[n])&&(t[e[n]]=o[e[n]]);return t};function ar(o){return o==="danger"?{danger:!0}:{type:o}}const ir=(o,r)=>{const{loading:t=!1,prefixCls:e,type:n="default",danger:l,shape:a="default",size:c,disabled:d,className:p,children:u,icon:f,ghost:S=!1,block:io=!1,htmlType:lo="button"}=o,R=nr(o,["loading","prefixCls","type","danger","shape","size","disabled","className","children","icon","ghost","block","htmlType"]),{getPrefixCls:so,autoInsertSpaceInButton:L,direction:W}=i.useContext(oo),s=so("btn",e),[_,ao]=tr(s),co=i.useContext(So),uo=i.useContext(vo),x=d??uo,go=i.useContext(eo),[C,G]=i.useState(!!t),[E,M]=i.useState(!1),y=r||i.createRef(),V=()=>i.Children.count(u)===1&&!f&&!I(n),bo=()=>{if(!y||!y.current||L===!1)return;const g=y.current.textContent;V()&&w(g)?E||M(!0):E&&M(!1)},$=typeof t=="boolean"?t:(t==null?void 0:t.delay)||!0;i.useEffect(()=>{let g=null;typeof $=="number"?g=window.setTimeout(()=>{g=null,G($)},$):G($);function h(){g&&(window.clearTimeout(g),g=null)}return h},[$]),i.useEffect(bo,[y]);const F=g=>{const{onClick:h}=o;if(C||x){g.preventDefault();return}h==null||h(g)},X=L!==!1,{compactSize:mo,compactItemClassnames:po}=Io(s,W),fo={large:"lg",small:"sm",middle:void 0},U=mo||go||c||co,q=U&&fo[U]||"",Co=C?"loading":f,B=To(R,["navigate"]),yo=B.href!==void 0&&x,J=ro(s,ao,{[`${s}-${a}`]:a!=="default"&&a,[`${s}-${n}`]:n,[`${s}-${q}`]:q,[`${s}-icon-only`]:!u&&u!==0&&!!Co,[`${s}-background-ghost`]:S&&!I(n),[`${s}-loading`]:C,[`${s}-two-chinese-chars`]:E&&X&&!C,[`${s}-block`]:io,[`${s}-dangerous`]:!!l,[`${s}-rtl`]:W==="rtl",[`${s}-disabled`]:yo},po,p),K=f&&!C?f:i.createElement(Lo,{existIcon:!!f,prefixCls:s,loading:!!C}),Q=u||u===0?Do(u,V()&&X):null;if(B.href!==void 0)return _(i.createElement("a",Object.assign({},B,{className:J,onClick:F,ref:y}),K,Q));let j=i.createElement("button",Object.assign({},R,{type:lo,className:J,onClick:F,disabled:x,ref:y}),K,Q);return I(n)||(j=i.createElement(Ho,{disabled:!!C},j)),_(j)},D=i.forwardRef(ir);D.Group=zo;D.__ANT_BUTTON=!0;const cr=D;export{cr as B,ar as c};