import{r as l,k as oo,Y as ho,c as ro,O as g,i as So,S as vo,D as Oo}from"./index-2126cee3.js";import{e as xo,d as Eo,L as Q,C as jo,g as Bo,m as z,q as Io,n as To,o as wo,W as Ho}from"./compact-item-c1a94619.js";var Po=globalThis&&globalThis.__rest||function(o,r){var t={};for(var e in o)Object.prototype.hasOwnProperty.call(o,e)&&r.indexOf(e)<0&&(t[e]=o[e]);if(o!=null&&typeof Object.getOwnPropertySymbols=="function")for(var n=0,e=Object.getOwnPropertySymbols(o);n<e.length;n++)r.indexOf(e[n])<0&&Object.prototype.propertyIsEnumerable.call(o,e[n])&&(t[e[n]]=o[e[n]]);return t};const eo=l.createContext(void 0),zo=o=>{const{getPrefixCls:r,direction:t}=l.useContext(oo),{prefixCls:e,size:n,className:i}=o,s=Po(o,["prefixCls","size","className"]),c=r("btn-group",e),[,,d]=ho();let m="";switch(n){case"large":m="lg";break;case"small":m="sm";break}const $=ro(c,{[`${c}-${m}`]:m,[`${c}-rtl`]:t==="rtl"},i,d);return l.createElement(eo.Provider,{value:n},l.createElement("div",Object.assign({},s,{className:$})))},No=zo,Z=/^[\u4e00-\u9fa5]{2}$/,H=Z.test.bind(Z);function Do(o){return typeof o=="string"}function I(o){return o==="text"||o==="link"}function Ao(o,r){if(o==null)return;const t=r?" ":"";return typeof o!="string"&&typeof o!="number"&&Do(o.type)&&H(o.props.children)?xo(o,{children:o.props.children.split("").join(t)}):typeof o=="string"?H(o)?g.createElement("span",null,o.split("").join(t)):g.createElement("span",null,o):Eo(o)?g.createElement("span",null,o):o}function Lo(o,r){let t=!1;const e=[];return g.Children.forEach(o,n=>{const i=typeof n,s=i==="string"||i==="number";if(t&&s){const c=e.length-1,d=e[c];e[c]=`${d}${n}`}else e.push(n);t=s}),g.Children.map(e,n=>Ao(n,r))}const T=()=>({width:0,opacity:0,transform:"scale(0)"}),w=o=>({width:o.scrollWidth,opacity:1,transform:"scale(1)"}),Ro=o=>{let{prefixCls:r,loading:t,existIcon:e}=o;const n=!!t;return e?g.createElement("span",{className:`${r}-loading-icon`},g.createElement(Q,null)):g.createElement(jo,{visible:n,motionName:`${r}-loading-icon-motion`,removeOnLeave:!0,onAppearStart:T,onAppearActive:w,onEnterStart:T,onEnterActive:w,onLeaveStart:w,onLeaveActive:T},(i,s)=>{let{className:c,style:d}=i;return g.createElement("span",{className:`${r}-loading-icon`,style:d,ref:s},g.createElement(Q,{className:c}))})},Wo=Ro,k=(o,r)=>({[`> span, > ${o}`]:{"&:not(:last-child)":{[`&, & > ${o}`]:{"&:not(:disabled)":{borderInlineEndColor:r}}},"&:not(:first-child)":{[`&, & > ${o}`]:{"&:not(:disabled)":{borderInlineStartColor:r}}}}}),_o=o=>{const{componentCls:r,fontSize:t,lineWidth:e,colorPrimaryHover:n,colorErrorHover:i}=o;return{[`${r}-group`]:[{position:"relative",display:"inline-flex",[`> span, > ${r}`]:{"&:not(:last-child)":{[`&, & > ${r}`]:{borderStartEndRadius:0,borderEndEndRadius:0}},"&:not(:first-child)":{marginInlineStart:-e,[`&, & > ${r}`]:{borderStartStartRadius:0,borderEndStartRadius:0}}},[r]:{position:"relative",zIndex:1,[`&:hover,
          &:focus,
          &:active`]:{zIndex:2},"&[disabled]":{zIndex:0}},[`${r}-icon-only`]:{fontSize:t}},k(`${r}-primary`,n),k(`${r}-danger`,i)]}},Go=_o;function Mo(o,r){return{[`&-item:not(${r}-last-item)`]:{marginBottom:-o.lineWidth},"&-item":{"&:hover,&:focus,&:active":{zIndex:2},"&[disabled]":{zIndex:0}}}}function Vo(o,r){return{[`&-item:not(${r}-first-item):not(${r}-last-item)`]:{borderRadius:0},[`&-item${r}-first-item:not(${r}-last-item)`]:{[`&, &${o}-sm, &${o}-lg`]:{borderEndEndRadius:0,borderEndStartRadius:0}},[`&-item${r}-last-item:not(${r}-first-item)`]:{[`&, &${o}-sm, &${o}-lg`]:{borderStartStartRadius:0,borderStartEndRadius:0}}}}function Fo(o){const r=`${o.componentCls}-compact-vertical`;return{[r]:Object.assign(Object.assign({},Mo(o,r)),Vo(o.componentCls,r))}}const Xo=o=>{const{componentCls:r,iconCls:t}=o;return{[r]:{outline:"none",position:"relative",display:"inline-block",fontWeight:400,whiteSpace:"nowrap",textAlign:"center",backgroundImage:"none",backgroundColor:"transparent",border:`${o.lineWidth}px ${o.lineType} transparent`,cursor:"pointer",transition:`all ${o.motionDurationMid} ${o.motionEaseInOut}`,userSelect:"none",touchAction:"manipulation",lineHeight:o.lineHeight,color:o.colorText,"> span":{display:"inline-block"},[`> ${t} + span, > span + ${t}`]:{marginInlineStart:o.marginXS},"> a":{color:"currentColor"},"&:not(:disabled)":Object.assign({},So(o)),[`&-icon-only${r}-compact-item`]:{flex:"none"},[`&-compact-item${r}-primary`]:{[`&:not([disabled]) + ${r}-compact-item${r}-primary:not([disabled])`]:{position:"relative","&:before":{position:"absolute",top:-o.lineWidth,insetInlineStart:-o.lineWidth,display:"inline-block",width:o.lineWidth,height:`calc(100% + ${o.lineWidth*2}px)`,backgroundColor:o.colorPrimaryHover,content:'""'}}},"&-compact-vertical-item":{[`&${r}-primary`]:{[`&:not([disabled]) + ${r}-compact-vertical-item${r}-primary:not([disabled])`]:{position:"relative","&:before":{position:"absolute",top:-o.lineWidth,insetInlineStart:-o.lineWidth,display:"inline-block",width:`calc(100% + ${o.lineWidth*2}px)`,height:o.lineWidth,backgroundColor:o.colorPrimaryHover,content:'""'}}}}}}},b=(o,r)=>({"&:not(:disabled)":{"&:hover":o,"&:active":r}}),Uo=o=>({minWidth:o.controlHeight,paddingInlineStart:0,paddingInlineEnd:0,borderRadius:"50%"}),qo=o=>({borderRadius:o.controlHeight,paddingInlineStart:o.controlHeight/2,paddingInlineEnd:o.controlHeight/2}),P=o=>({cursor:"not-allowed",borderColor:o.colorBorder,color:o.colorTextDisabled,backgroundColor:o.colorBgContainerDisabled,boxShadow:"none"}),v=(o,r,t,e,n,i,s)=>({[`&${o}-background-ghost`]:Object.assign(Object.assign({color:r||void 0,backgroundColor:"transparent",borderColor:t||void 0,boxShadow:"none"},b(Object.assign({backgroundColor:"transparent"},i),Object.assign({backgroundColor:"transparent"},s))),{"&:disabled":{cursor:"not-allowed",color:e||void 0,borderColor:n||void 0}})}),N=o=>({"&:disabled":Object.assign({},P(o))}),to=o=>Object.assign({},N(o)),O=o=>({"&:disabled":{cursor:"not-allowed",color:o.colorTextDisabled}}),no=o=>Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({},to(o)),{backgroundColor:o.colorBgContainer,borderColor:o.colorBorder,boxShadow:`0 ${o.controlOutlineWidth}px 0 ${o.controlTmpOutline}`}),b({color:o.colorPrimaryHover,borderColor:o.colorPrimaryHover},{color:o.colorPrimaryActive,borderColor:o.colorPrimaryActive})),v(o.componentCls,o.colorBgContainer,o.colorBgContainer,o.colorTextDisabled,o.colorBorder)),{[`&${o.componentCls}-dangerous`]:Object.assign(Object.assign(Object.assign({color:o.colorError,borderColor:o.colorError},b({color:o.colorErrorHover,borderColor:o.colorErrorBorderHover},{color:o.colorErrorActive,borderColor:o.colorErrorActive})),v(o.componentCls,o.colorError,o.colorError,o.colorTextDisabled,o.colorBorder)),N(o))}),Yo=o=>Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({},to(o)),{color:o.colorTextLightSolid,backgroundColor:o.colorPrimary,boxShadow:`0 ${o.controlOutlineWidth}px 0 ${o.controlOutline}`}),b({color:o.colorTextLightSolid,backgroundColor:o.colorPrimaryHover},{color:o.colorTextLightSolid,backgroundColor:o.colorPrimaryActive})),v(o.componentCls,o.colorPrimary,o.colorPrimary,o.colorTextDisabled,o.colorBorder,{color:o.colorPrimaryHover,borderColor:o.colorPrimaryHover},{color:o.colorPrimaryActive,borderColor:o.colorPrimaryActive})),{[`&${o.componentCls}-dangerous`]:Object.assign(Object.assign(Object.assign({backgroundColor:o.colorError,boxShadow:`0 ${o.controlOutlineWidth}px 0 ${o.colorErrorOutline}`},b({backgroundColor:o.colorErrorHover},{backgroundColor:o.colorErrorActive})),v(o.componentCls,o.colorError,o.colorError,o.colorTextDisabled,o.colorBorder,{color:o.colorErrorHover,borderColor:o.colorErrorHover},{color:o.colorErrorActive,borderColor:o.colorErrorActive})),N(o))}),Jo=o=>Object.assign(Object.assign({},no(o)),{borderStyle:"dashed"}),Ko=o=>Object.assign(Object.assign(Object.assign({color:o.colorLink},b({color:o.colorLinkHover},{color:o.colorLinkActive})),O(o)),{[`&${o.componentCls}-dangerous`]:Object.assign(Object.assign({color:o.colorError},b({color:o.colorErrorHover},{color:o.colorErrorActive})),O(o))}),Qo=o=>Object.assign(Object.assign(Object.assign({},b({color:o.colorText,backgroundColor:o.colorBgTextHover},{color:o.colorText,backgroundColor:o.colorBgTextActive})),O(o)),{[`&${o.componentCls}-dangerous`]:Object.assign(Object.assign({color:o.colorError},O(o)),b({color:o.colorErrorHover,backgroundColor:o.colorErrorBg},{color:o.colorErrorHover,backgroundColor:o.colorErrorBg}))}),Zo=o=>Object.assign(Object.assign({},P(o)),{[`&${o.componentCls}:hover`]:Object.assign({},P(o))}),ko=o=>{const{componentCls:r}=o;return{[`${r}-default`]:no(o),[`${r}-primary`]:Yo(o),[`${r}-dashed`]:Jo(o),[`${r}-link`]:Ko(o),[`${r}-text`]:Qo(o),[`${r}-disabled`]:Zo(o)}},D=function(o){let r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:"";const{componentCls:t,iconCls:e,controlHeight:n,fontSize:i,lineHeight:s,lineWidth:c,borderRadius:d,buttonPaddingHorizontal:m}=o,$=Math.max(0,(n-i*s)/2-c),p=m-c,f=`${t}-icon-only`;return[{[`${t}${r}`]:{fontSize:i,height:n,padding:`${$}px ${p}px`,borderRadius:d,[`&${f}`]:{width:n,paddingInlineStart:0,paddingInlineEnd:0,[`&${t}-round`]:{width:"auto"},"> span":{transform:"scale(1.143)"}},[`&${t}-loading`]:{opacity:o.opacityLoading,cursor:"default"},[`${t}-loading-icon`]:{transition:`width ${o.motionDurationSlow} ${o.motionEaseInOut}, opacity ${o.motionDurationSlow} ${o.motionEaseInOut}`},[`&:not(${f}) ${t}-loading-icon > ${e}`]:{marginInlineEnd:o.marginXS}}},{[`${t}${t}-circle${r}`]:Uo(o)},{[`${t}${t}-round${r}`]:qo(o)}]},or=o=>D(o),rr=o=>{const r=z(o,{controlHeight:o.controlHeightSM,padding:o.paddingXS,buttonPaddingHorizontal:8,borderRadius:o.borderRadiusSM});return D(r,`${o.componentCls}-sm`)},er=o=>{const r=z(o,{controlHeight:o.controlHeightLG,fontSize:o.fontSizeLG,borderRadius:o.borderRadiusLG});return D(r,`${o.componentCls}-lg`)},tr=o=>{const{componentCls:r}=o;return{[r]:{[`&${r}-block`]:{width:"100%"}}}},nr=Bo("Button",o=>{const{controlTmpOutline:r,paddingContentHorizontal:t}=o,e=z(o,{colorOutlineDefault:r,buttonPaddingHorizontal:t});return[Xo(e),rr(e),or(e),er(e),tr(e),ko(e),Go(e),Io(o),Fo(o)]});var lr=globalThis&&globalThis.__rest||function(o,r){var t={};for(var e in o)Object.prototype.hasOwnProperty.call(o,e)&&r.indexOf(e)<0&&(t[e]=o[e]);if(o!=null&&typeof Object.getOwnPropertySymbols=="function")for(var n=0,e=Object.getOwnPropertySymbols(o);n<e.length;n++)r.indexOf(e[n])<0&&Object.prototype.propertyIsEnumerable.call(o,e[n])&&(t[e[n]]=o[e[n]]);return t};function dr(o){return o==="danger"?{danger:!0}:{type:o}}function ir(o){if(typeof o=="object"&&o){const r=o==null?void 0:o.delay;return{loading:!1,delay:!Number.isNaN(r)&&typeof r=="number"?r:0}}return{loading:!!o,delay:0}}const ar=(o,r)=>{const{loading:t=!1,prefixCls:e,type:n="default",danger:i,shape:s="default",size:c,disabled:d,className:m,rootClassName:$,children:p,icon:f,ghost:lo=!1,block:io=!1,htmlType:ao="button"}=o,L=lr(o,["loading","prefixCls","type","danger","shape","size","disabled","className","rootClassName","children","icon","ghost","block","htmlType"]),{getPrefixCls:so,autoInsertSpaceInButton:R,direction:W}=l.useContext(oo),a=so("btn",e),[_,co]=nr(a),uo=l.useContext(vo),go=l.useContext(Oo),x=d??go,bo=l.useContext(eo),h=l.useMemo(()=>ir(t),[t]),[C,G]=l.useState(h.loading),[E,M]=l.useState(!1),y=r||l.createRef(),V=()=>l.Children.count(p)===1&&!f&&!I(n),mo=()=>{if(!y||!y.current||R===!1)return;const u=y.current.textContent;V()&&H(u)?E||M(!0):E&&M(!1)};l.useEffect(()=>{let u=null;h.delay>0?u=window.setTimeout(()=>{u=null,G(!0)},h.delay):G(h.loading);function S(){u&&(window.clearTimeout(u),u=null)}return S},[h]),l.useEffect(mo,[y]);const F=u=>{const{onClick:S}=o;if(C||x){u.preventDefault();return}S==null||S(u)},X=R!==!1,{compactSize:po,compactItemClassnames:fo}=To(a,W),Co={large:"lg",small:"sm",middle:void 0},U=po||bo||c||uo,q=U&&Co[U]||"",yo=C?"loading":f,j=wo(L,["navigate"]),$o=j.href!==void 0&&x,Y=ro(a,co,{[`${a}-${s}`]:s!=="default"&&s,[`${a}-${n}`]:n,[`${a}-${q}`]:q,[`${a}-icon-only`]:!p&&p!==0&&!!yo,[`${a}-background-ghost`]:lo&&!I(n),[`${a}-loading`]:C,[`${a}-two-chinese-chars`]:E&&X&&!C,[`${a}-block`]:io,[`${a}-dangerous`]:!!i,[`${a}-rtl`]:W==="rtl",[`${a}-disabled`]:$o},fo,m,$),J=f&&!C?f:l.createElement(Wo,{existIcon:!!f,prefixCls:a,loading:!!C}),K=p||p===0?Lo(p,V()&&X):null;if(j.href!==void 0)return _(l.createElement("a",Object.assign({},j,{className:Y,onClick:F,ref:y}),J,K));let B=l.createElement("button",Object.assign({},L,{type:ao,className:Y,onClick:F,disabled:x,ref:y}),J,K);return I(n)||(B=l.createElement(Ho,{disabled:!!C},B)),_(B)},A=l.forwardRef(ar);A.Group=No;A.__ANT_BUTTON=!0;const ur=A;export{ur as B,dr as c};