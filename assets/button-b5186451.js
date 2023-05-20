import{r as s,c as x,X as c,aI as vo,f as lo,a4 as Oo,g as xo,D as Eo,am as jo,h as Bo}from"./index-278e01b2.js";import{L as Io,c as zo,b as To,g as Ho,m as D,h as No,f as Po,o as wo,W as Ro}from"./compact-item-a5f7af99.js";const Lo=s.forwardRef((o,e)=>{const{className:t,style:r,children:n,prefixCls:l}=o,i=x(`${l}-icon`,t);return c.createElement("span",{ref:e,className:i,style:r},n)}),io=Lo,ro=s.forwardRef((o,e)=>{let{prefixCls:t,className:r,style:n,iconClassName:l}=o;const i=x(`${t}-loading-icon`,r);return c.createElement(io,{prefixCls:t,className:i,style:n,ref:e},c.createElement(Io,{className:l}))}),P=()=>({width:0,opacity:0,transform:"scale(0)"}),w=o=>({width:o.scrollWidth,opacity:1,transform:"scale(1)"}),Wo=o=>{let{prefixCls:e,loading:t,existIcon:r,className:n,style:l}=o;const i=!!t;return r?c.createElement(ro,{prefixCls:e,className:n,style:l}):c.createElement(vo,{visible:i,motionName:`${e}-loading-icon-motion`,removeOnLeave:!0,onAppearStart:P,onAppearActive:w,onEnterStart:P,onEnterActive:w,onLeaveStart:w,onLeaveActive:P},(d,m)=>{let{className:u,style:y}=d;return c.createElement(ro,{prefixCls:e,className:n,style:Object.assign(Object.assign({},l),y),ref:m,iconClassName:u})})},Do=Wo;var Ao=globalThis&&globalThis.__rest||function(o,e){var t={};for(var r in o)Object.prototype.hasOwnProperty.call(o,r)&&e.indexOf(r)<0&&(t[r]=o[r]);if(o!=null&&typeof Object.getOwnPropertySymbols=="function")for(var n=0,r=Object.getOwnPropertySymbols(o);n<r.length;n++)e.indexOf(r[n])<0&&Object.prototype.propertyIsEnumerable.call(o,r[n])&&(t[r[n]]=o[r[n]]);return t};const so=s.createContext(void 0),Go=o=>{const{getPrefixCls:e,direction:t}=s.useContext(lo),{prefixCls:r,size:n,className:l}=o,i=Ao(o,["prefixCls","size","className"]),d=e("btn-group",r),[,,m]=Oo();let u="";switch(n){case"large":u="lg";break;case"small":u="sm";break}const y=x(d,{[`${d}-${u}`]:u,[`${d}-rtl`]:t==="rtl"},l,m);return s.createElement(so.Provider,{value:n},s.createElement("div",Object.assign({},i,{className:y})))},_o=Go,to=/^[\u4e00-\u9fa5]{2}$/,L=to.test.bind(to);function Fo(o){return typeof o=="string"}function R(o){return o==="text"||o==="link"}function Mo(o,e){if(o==null)return;const t=e?" ":"";return typeof o!="string"&&typeof o!="number"&&Fo(o.type)&&L(o.props.children)?zo(o,{children:o.props.children.split("").join(t)}):typeof o=="string"?L(o)?c.createElement("span",null,o.split("").join(t)):c.createElement("span",null,o):To(o)?c.createElement("span",null,o):o}function Vo(o,e){let t=!1;const r=[];return c.Children.forEach(o,n=>{const l=typeof n,i=l==="string"||l==="number";if(t&&i){const d=r.length-1,m=r[d];r[d]=`${m}${n}`}else r.push(n);t=i}),c.Children.map(r,n=>Mo(n,e))}function Xo(o,e){return{[`&-item:not(${e}-last-item)`]:{marginBottom:-o.lineWidth},"&-item":{"&:hover,&:focus,&:active":{zIndex:2},"&[disabled]":{zIndex:0}}}}function Uo(o,e){return{[`&-item:not(${e}-first-item):not(${e}-last-item)`]:{borderRadius:0},[`&-item${e}-first-item:not(${e}-last-item)`]:{[`&, &${o}-sm, &${o}-lg`]:{borderEndEndRadius:0,borderEndStartRadius:0}},[`&-item${e}-last-item:not(${e}-first-item)`]:{[`&, &${o}-sm, &${o}-lg`]:{borderStartStartRadius:0,borderStartEndRadius:0}}}}function qo(o){const e=`${o.componentCls}-compact-vertical`;return{[e]:Object.assign(Object.assign({},Xo(o,e)),Uo(o.componentCls,e))}}const no=(o,e)=>({[`> span, > ${o}`]:{"&:not(:last-child)":{[`&, & > ${o}`]:{"&:not(:disabled)":{borderInlineEndColor:e}}},"&:not(:first-child)":{[`&, & > ${o}`]:{"&:not(:disabled)":{borderInlineStartColor:e}}}}}),Jo=o=>{const{componentCls:e,fontSize:t,lineWidth:r,colorPrimaryHover:n,colorErrorHover:l}=o;return{[`${e}-group`]:[{position:"relative",display:"inline-flex",[`> span, > ${e}`]:{"&:not(:last-child)":{[`&, & > ${e}`]:{borderStartEndRadius:0,borderEndEndRadius:0}},"&:not(:first-child)":{marginInlineStart:-r,[`&, & > ${e}`]:{borderStartStartRadius:0,borderEndStartRadius:0}}},[e]:{position:"relative",zIndex:1,[`&:hover,
          &:focus,
          &:active`]:{zIndex:2},"&[disabled]":{zIndex:0}},[`${e}-icon-only`]:{fontSize:t}},no(`${e}-primary`,n),no(`${e}-danger`,l)]}},Ko=Jo,Qo=o=>{const{componentCls:e,iconCls:t,buttonFontWeight:r}=o;return{[e]:{outline:"none",position:"relative",display:"inline-block",fontWeight:r,whiteSpace:"nowrap",textAlign:"center",backgroundImage:"none",backgroundColor:"transparent",border:`${o.lineWidth}px ${o.lineType} transparent`,cursor:"pointer",transition:`all ${o.motionDurationMid} ${o.motionEaseInOut}`,userSelect:"none",touchAction:"manipulation",lineHeight:o.lineHeight,color:o.colorText,"> span":{display:"inline-block"},[`${e}-icon`]:{lineHeight:0},[`&:not(${e}-icon-only) > ${e}-icon`]:{[`&${e}-loading-icon, &:not(:last-child)`]:{marginInlineEnd:o.marginXS}},[`> span + ${t}`]:{marginInlineStart:o.marginXS},"> a":{color:"currentColor"},"&:not(:disabled)":Object.assign({},xo(o)),[`&-icon-only${e}-compact-item`]:{flex:"none"},[`&-compact-item${e}-primary`]:{[`&:not([disabled]) + ${e}-compact-item${e}-primary:not([disabled])`]:{position:"relative","&:before":{position:"absolute",top:-o.lineWidth,insetInlineStart:-o.lineWidth,display:"inline-block",width:o.lineWidth,height:`calc(100% + ${o.lineWidth*2}px)`,backgroundColor:o.colorPrimaryHover,content:'""'}}},"&-compact-vertical-item":{[`&${e}-primary`]:{[`&:not([disabled]) + ${e}-compact-vertical-item${e}-primary:not([disabled])`]:{position:"relative","&:before":{position:"absolute",top:-o.lineWidth,insetInlineStart:-o.lineWidth,display:"inline-block",width:`calc(100% + ${o.lineWidth*2}px)`,height:o.lineWidth,backgroundColor:o.colorPrimaryHover,content:'""'}}}}}}},p=(o,e)=>({"&:not(:disabled)":{"&:hover":o,"&:active":e}}),Yo=o=>({minWidth:o.controlHeight,paddingInlineStart:0,paddingInlineEnd:0,borderRadius:"50%"}),Zo=o=>({borderRadius:o.controlHeight,paddingInlineStart:o.controlHeight/2,paddingInlineEnd:o.controlHeight/2}),W=o=>({cursor:"not-allowed",borderColor:o.colorBorder,color:o.colorTextDisabled,backgroundColor:o.colorBgContainerDisabled,boxShadow:"none"}),v=(o,e,t,r,n,l,i)=>({[`&${o}-background-ghost`]:Object.assign(Object.assign({color:e||void 0,backgroundColor:"transparent",borderColor:t||void 0,boxShadow:"none"},p(Object.assign({backgroundColor:"transparent"},l),Object.assign({backgroundColor:"transparent"},i))),{"&:disabled":{cursor:"not-allowed",color:r||void 0,borderColor:n||void 0}})}),A=o=>({"&:disabled":Object.assign({},W(o))}),ao=o=>Object.assign({},A(o)),O=o=>({"&:disabled":{cursor:"not-allowed",color:o.colorTextDisabled}}),co=o=>Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({},ao(o)),{backgroundColor:o.colorBgContainer,borderColor:o.colorBorder,boxShadow:`0 ${o.controlOutlineWidth}px 0 ${o.controlTmpOutline}`}),p({color:o.colorPrimaryHover,borderColor:o.colorPrimaryHover},{color:o.colorPrimaryActive,borderColor:o.colorPrimaryActive})),v(o.componentCls,o.colorBgContainer,o.colorBgContainer,o.colorTextDisabled,o.colorBorder)),{[`&${o.componentCls}-dangerous`]:Object.assign(Object.assign(Object.assign({color:o.colorError,borderColor:o.colorError},p({color:o.colorErrorHover,borderColor:o.colorErrorBorderHover},{color:o.colorErrorActive,borderColor:o.colorErrorActive})),v(o.componentCls,o.colorError,o.colorError,o.colorTextDisabled,o.colorBorder)),A(o))}),ko=o=>Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({},ao(o)),{color:o.colorTextLightSolid,backgroundColor:o.colorPrimary,boxShadow:`0 ${o.controlOutlineWidth}px 0 ${o.controlOutline}`}),p({color:o.colorTextLightSolid,backgroundColor:o.colorPrimaryHover},{color:o.colorTextLightSolid,backgroundColor:o.colorPrimaryActive})),v(o.componentCls,o.colorPrimary,o.colorPrimary,o.colorTextDisabled,o.colorBorder,{color:o.colorPrimaryHover,borderColor:o.colorPrimaryHover},{color:o.colorPrimaryActive,borderColor:o.colorPrimaryActive})),{[`&${o.componentCls}-dangerous`]:Object.assign(Object.assign(Object.assign({backgroundColor:o.colorError,boxShadow:`0 ${o.controlOutlineWidth}px 0 ${o.colorErrorOutline}`},p({backgroundColor:o.colorErrorHover},{backgroundColor:o.colorErrorActive})),v(o.componentCls,o.colorError,o.colorError,o.colorTextDisabled,o.colorBorder,{color:o.colorErrorHover,borderColor:o.colorErrorHover},{color:o.colorErrorActive,borderColor:o.colorErrorActive})),A(o))}),oe=o=>Object.assign(Object.assign({},co(o)),{borderStyle:"dashed"}),ee=o=>Object.assign(Object.assign(Object.assign({color:o.colorLink},p({color:o.colorLinkHover},{color:o.colorLinkActive})),O(o)),{[`&${o.componentCls}-dangerous`]:Object.assign(Object.assign({color:o.colorError},p({color:o.colorErrorHover},{color:o.colorErrorActive})),O(o))}),re=o=>Object.assign(Object.assign(Object.assign({},p({color:o.colorText,backgroundColor:o.colorBgTextHover},{color:o.colorText,backgroundColor:o.colorBgTextActive})),O(o)),{[`&${o.componentCls}-dangerous`]:Object.assign(Object.assign({color:o.colorError},O(o)),p({color:o.colorErrorHover,backgroundColor:o.colorErrorBg},{color:o.colorErrorHover,backgroundColor:o.colorErrorBg}))}),te=o=>Object.assign(Object.assign({},W(o)),{[`&${o.componentCls}:hover`]:Object.assign({},W(o))}),ne=o=>{const{componentCls:e}=o;return{[`${e}-default`]:co(o),[`${e}-primary`]:ko(o),[`${e}-dashed`]:oe(o),[`${e}-link`]:ee(o),[`${e}-text`]:re(o),[`${e}-disabled`]:te(o)}},G=function(o){let e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:"";const{componentCls:t,controlHeight:r,fontSize:n,lineHeight:l,lineWidth:i,borderRadius:d,buttonPaddingHorizontal:m,iconCls:u}=o,y=Math.max(0,(r-n*l)/2-i),E=m-i,f=`${t}-icon-only`;return[{[`${t}${e}`]:{fontSize:n,height:r,padding:`${y}px ${E}px`,borderRadius:d,[`&${f}`]:{width:r,paddingInlineStart:0,paddingInlineEnd:0,[`&${t}-round`]:{width:"auto"},[u]:{fontSize:o.buttonIconOnlyFontSize}},[`&${t}-loading`]:{opacity:o.opacityLoading,cursor:"default"},[`${t}-loading-icon`]:{transition:`width ${o.motionDurationSlow} ${o.motionEaseInOut}, opacity ${o.motionDurationSlow} ${o.motionEaseInOut}`}}},{[`${t}${t}-circle${e}`]:Yo(o)},{[`${t}${t}-round${e}`]:Zo(o)}]},le=o=>G(o),ie=o=>{const e=D(o,{controlHeight:o.controlHeightSM,padding:o.paddingXS,buttonPaddingHorizontal:8,borderRadius:o.borderRadiusSM,buttonIconOnlyFontSize:o.fontSizeLG-2});return G(e,`${o.componentCls}-sm`)},se=o=>{const e=D(o,{controlHeight:o.controlHeightLG,fontSize:o.fontSizeLG,borderRadius:o.borderRadiusLG,buttonIconOnlyFontSize:o.fontSizeLG+2});return G(e,`${o.componentCls}-lg`)},ae=o=>{const{componentCls:e}=o;return{[e]:{[`&${e}-block`]:{width:"100%"}}}},ce=Ho("Button",o=>{const{controlTmpOutline:e,paddingContentHorizontal:t}=o,r=D(o,{colorOutlineDefault:e,buttonPaddingHorizontal:t,buttonIconOnlyFontSize:o.fontSizeLG,buttonFontWeight:400});return[Qo(r),ie(r),le(r),se(r),ae(r),ne(r),Ko(r),No(o),qo(o)]});var de=globalThis&&globalThis.__rest||function(o,e){var t={};for(var r in o)Object.prototype.hasOwnProperty.call(o,r)&&e.indexOf(r)<0&&(t[r]=o[r]);if(o!=null&&typeof Object.getOwnPropertySymbols=="function")for(var n=0,r=Object.getOwnPropertySymbols(o);n<r.length;n++)e.indexOf(r[n])<0&&Object.prototype.propertyIsEnumerable.call(o,r[n])&&(t[r[n]]=o[r[n]]);return t};function fe(o){return o==="danger"?{danger:!0}:{type:o}}function ue(o){if(typeof o=="object"&&o){const e=o==null?void 0:o.delay;return{loading:!1,delay:!Number.isNaN(e)&&typeof e=="number"?e:0}}return{loading:!!o,delay:0}}const ge=(o,e)=>{const{loading:t=!1,prefixCls:r,type:n="default",danger:l,shape:i="default",size:d,styles:m,disabled:u,className:y,rootClassName:E,children:f,icon:$,ghost:uo=!1,block:go=!1,htmlType:mo="button",classNames:j}=o,F=de(o,["loading","prefixCls","type","danger","shape","size","styles","disabled","className","rootClassName","children","icon","ghost","block","htmlType","classNames"]),{getPrefixCls:bo,autoInsertSpaceInButton:M,direction:V}=s.useContext(lo),a=bo("btn",r),[X,po]=ce(a),fo=s.useContext(Eo),B=u??fo,yo=s.useContext(so),S=s.useMemo(()=>ue(t),[t]),[C,U]=s.useState(S.loading),[I,q]=s.useState(!1),h=jo(e,s.createRef()),J=s.Children.count(f)===1&&!$&&!R(n);s.useEffect(()=>{let g=null;S.delay>0?g=setTimeout(()=>{g=null,U(!0)},S.delay):U(S.loading);function b(){g&&(clearTimeout(g),g=null)}return b},[S]),s.useEffect(()=>{if(!h||!h.current||M===!1)return;const g=h.current.textContent;J&&L(g)?I||q(!0):I&&q(!1)},[h]);const K=g=>{const{onClick:b}=o;if(C||B){g.preventDefault();return}b==null||b(g)},Q=M!==!1,{compactSize:z,compactItemClassnames:Co}=Po(a,V),ho={large:"lg",small:"sm",middle:void 0},Y=Bo(g=>{var b,N;return(N=(b=z??yo)!==null&&b!==void 0?b:d)!==null&&N!==void 0?N:g}),Z=Y&&ho[Y]||"",$o=C?"loading":$,T=wo(F,["navigate"]),So=T.href!==void 0&&B,k=x(a,po,{[`${a}-${i}`]:i!=="default"&&i,[`${a}-${n}`]:n,[`${a}-${Z}`]:Z,[`${a}-icon-only`]:!f&&f!==0&&!!$o,[`${a}-background-ghost`]:uo&&!R(n),[`${a}-loading`]:C,[`${a}-two-chinese-chars`]:I&&Q&&!C,[`${a}-block`]:go,[`${a}-dangerous`]:!!l,[`${a}-rtl`]:V==="rtl",[`${a}-disabled`]:So},Co,y,E),oo=$&&!C?c.createElement(io,{prefixCls:a,className:j==null?void 0:j.icon,style:m==null?void 0:m.icon},$):c.createElement(Do,{existIcon:!!$,prefixCls:a,loading:!!C}),eo=f||f===0?Vo(f,J&&Q):null;if(T.href!==void 0)return X(c.createElement("a",Object.assign({},T,{className:k,onClick:K,ref:h}),oo,eo));let H=c.createElement("button",Object.assign({},F,{type:mo,className:k,onClick:K,disabled:B,ref:h}),oo,eo);return R(n)||(H=c.createElement(Ro,{disabled:!!C},H)),X(H)},_=s.forwardRef(ge);_.Group=_o;_.__ANT_BUTTON=!0;const ye=_;export{ye as B,fe as c};
