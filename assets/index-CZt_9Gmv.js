import{r as a,k as K,l as G,m as Q,g as j,n as W,_ as U,a1 as A,o as Y,p as Z,t as N,q as z,aA as L,C as M,b9 as ee,af as V,D as oe,W as te,aB as re,w as ne}from"./index-BA-ZxV8D.js";import{F as ae,p as ie}from"./queryKeys-CRgo353q.js";const F=a.createContext(null),le=F.Provider,X=a.createContext(null),de=X.Provider;var se=["prefixCls","className","style","checked","disabled","defaultChecked","type","title","onChange"],ce=a.forwardRef(function(e,r){var n=e.prefixCls,o=n===void 0?"rc-checkbox":n,t=e.className,s=e.style,p=e.checked,C=e.disabled,d=e.defaultChecked,w=d===void 0?!1:d,f=e.type,k=f===void 0?"checkbox":f,R=e.title,v=e.onChange,B=K(e,se),m=a.useRef(null),b=G(w,{value:p}),S=Q(b,2),g=S[0],$=S[1];a.useImperativeHandle(r,function(){return{focus:function(c){var E;(E=m.current)===null||E===void 0||E.focus(c)},blur:function(){var c;(c=m.current)===null||c===void 0||c.blur()},input:m.current}});var x=j(o,t,W(W({},"".concat(o,"-checked"),g),"".concat(o,"-disabled"),C)),y=function(c){C||("checked"in e||$(c.target.checked),v==null||v({target:A(A({},e),{},{type:k,checked:c.target.checked}),stopPropagation:function(){c.stopPropagation()},preventDefault:function(){c.preventDefault()},nativeEvent:c.nativeEvent}))};return a.createElement("span",{className:x,title:R,style:s},a.createElement("input",U({},B,{className:"".concat(o,"-input"),ref:m,onChange:y,disabled:C,checked:!!g,type:k})),a.createElement("span",{className:"".concat(o,"-inner")}))});const ue=e=>{const{componentCls:r,antCls:n}=e,o=`${r}-group`;return{[o]:Object.assign(Object.assign({},N(e)),{display:"inline-block",fontSize:0,[`&${o}-rtl`]:{direction:"rtl"},[`${n}-badge ${n}-badge-count`]:{zIndex:1},[`> ${n}-badge:not(:first-child) > ${n}-button-wrapper`]:{borderInlineStart:"none"}})}},be=e=>{const{componentCls:r,wrapperMarginInlineEnd:n,colorPrimary:o,radioSize:t,motionDurationSlow:s,motionDurationMid:p,motionEaseInOutCirc:C,colorBgContainer:d,colorBorder:w,lineWidth:f,colorBgContainerDisabled:k,colorTextDisabled:R,paddingXS:v,dotColorDisabled:B,lineType:m,radioColor:b,radioBgColor:S,calc:g}=e,$=`${r}-inner`,y=g(t).sub(g(4).mul(2)),l=g(1).mul(t).equal();return{[`${r}-wrapper`]:Object.assign(Object.assign({},N(e)),{display:"inline-flex",alignItems:"baseline",marginInlineStart:0,marginInlineEnd:n,cursor:"pointer",[`&${r}-wrapper-rtl`]:{direction:"rtl"},"&-disabled":{cursor:"not-allowed",color:e.colorTextDisabled},"&::after":{display:"inline-block",width:0,overflow:"hidden",content:'"\\a0"'},[`${r}-checked::after`]:{position:"absolute",insetBlockStart:0,insetInlineStart:0,width:"100%",height:"100%",border:`${z(f)} ${m} ${o}`,borderRadius:"50%",visibility:"hidden",content:'""'},[r]:Object.assign(Object.assign({},N(e)),{position:"relative",display:"inline-block",outline:"none",cursor:"pointer",alignSelf:"center",borderRadius:"50%"}),[`${r}-wrapper:hover &,
        &:hover ${$}`]:{borderColor:o},[`${r}-input:focus-visible + ${$}`]:Object.assign({},L(e)),[`${r}:hover::after, ${r}-wrapper:hover &::after`]:{visibility:"visible"},[`${r}-inner`]:{"&::after":{boxSizing:"border-box",position:"absolute",insetBlockStart:"50%",insetInlineStart:"50%",display:"block",width:l,height:l,marginBlockStart:g(1).mul(t).div(-2).equal(),marginInlineStart:g(1).mul(t).div(-2).equal(),backgroundColor:b,borderBlockStart:0,borderInlineStart:0,borderRadius:l,transform:"scale(0)",opacity:0,transition:`all ${s} ${C}`,content:'""'},boxSizing:"border-box",position:"relative",insetBlockStart:0,insetInlineStart:0,display:"block",width:l,height:l,backgroundColor:d,borderColor:w,borderStyle:"solid",borderWidth:f,borderRadius:"50%",transition:`all ${p}`},[`${r}-input`]:{position:"absolute",inset:0,zIndex:1,cursor:"pointer",opacity:0},[`${r}-checked`]:{[$]:{borderColor:o,backgroundColor:S,"&::after":{transform:`scale(${e.calc(e.dotSize).div(t).equal()})`,opacity:1,transition:`all ${s} ${C}`}}},[`${r}-disabled`]:{cursor:"not-allowed",[$]:{backgroundColor:k,borderColor:w,cursor:"not-allowed","&::after":{backgroundColor:B}},[`${r}-input`]:{cursor:"not-allowed"},[`${r}-disabled + span`]:{color:R,cursor:"not-allowed"},[`&${r}-checked`]:{[$]:{"&::after":{transform:`scale(${g(y).div(t).equal({unit:!1})})`}}}},[`span${r} + *`]:{paddingInlineStart:v,paddingInlineEnd:v}})}},ge=e=>{const{buttonColor:r,controlHeight:n,componentCls:o,lineWidth:t,lineType:s,colorBorder:p,motionDurationSlow:C,motionDurationMid:d,buttonPaddingInline:w,fontSize:f,buttonBg:k,fontSizeLG:R,controlHeightLG:v,controlHeightSM:B,paddingXS:m,borderRadius:b,borderRadiusSM:S,borderRadiusLG:g,buttonCheckedBg:$,buttonSolidCheckedColor:x,colorTextDisabled:y,colorBgContainerDisabled:l,buttonCheckedBgDisabled:c,buttonCheckedColorDisabled:E,colorPrimary:I,colorPrimaryHover:P,colorPrimaryActive:u,buttonSolidCheckedBg:O,buttonSolidCheckedHoverBg:_,buttonSolidCheckedActiveBg:i,calc:h}=e;return{[`${o}-button-wrapper`]:{position:"relative",display:"inline-block",height:n,margin:0,paddingInline:w,paddingBlock:0,color:r,fontSize:f,lineHeight:z(h(n).sub(h(t).mul(2)).equal()),background:k,border:`${z(t)} ${s} ${p}`,borderBlockStartWidth:h(t).add(.02).equal(),borderInlineStartWidth:0,borderInlineEndWidth:t,cursor:"pointer",transition:[`color ${d}`,`background ${d}`,`box-shadow ${d}`].join(","),a:{color:r},[`> ${o}-button`]:{position:"absolute",insetBlockStart:0,insetInlineStart:0,zIndex:-1,width:"100%",height:"100%"},"&:not(:first-child)":{"&::before":{position:"absolute",insetBlockStart:h(t).mul(-1).equal(),insetInlineStart:h(t).mul(-1).equal(),display:"block",boxSizing:"content-box",width:1,height:"100%",paddingBlock:t,paddingInline:0,backgroundColor:p,transition:`background-color ${C}`,content:'""'}},"&:first-child":{borderInlineStart:`${z(t)} ${s} ${p}`,borderStartStartRadius:b,borderEndStartRadius:b},"&:last-child":{borderStartEndRadius:b,borderEndEndRadius:b},"&:first-child:last-child":{borderRadius:b},[`${o}-group-large &`]:{height:v,fontSize:R,lineHeight:z(h(v).sub(h(t).mul(2)).equal()),"&:first-child":{borderStartStartRadius:g,borderEndStartRadius:g},"&:last-child":{borderStartEndRadius:g,borderEndEndRadius:g}},[`${o}-group-small &`]:{height:B,paddingInline:h(m).sub(t).equal(),paddingBlock:0,lineHeight:z(h(B).sub(h(t).mul(2)).equal()),"&:first-child":{borderStartStartRadius:S,borderEndStartRadius:S},"&:last-child":{borderStartEndRadius:S,borderEndEndRadius:S}},"&:hover":{position:"relative",color:I},"&:has(:focus-visible)":Object.assign({},L(e)),[`${o}-inner, input[type='checkbox'], input[type='radio']`]:{width:0,height:0,opacity:0,pointerEvents:"none"},[`&-checked:not(${o}-button-wrapper-disabled)`]:{zIndex:1,color:I,background:$,borderColor:I,"&::before":{backgroundColor:I},"&:first-child":{borderColor:I},"&:hover":{color:P,borderColor:P,"&::before":{backgroundColor:P}},"&:active":{color:u,borderColor:u,"&::before":{backgroundColor:u}}},[`${o}-group-solid &-checked:not(${o}-button-wrapper-disabled)`]:{color:x,background:O,borderColor:O,"&:hover":{color:x,background:_,borderColor:_},"&:active":{color:x,background:i,borderColor:i}},"&-disabled":{color:y,backgroundColor:l,borderColor:p,cursor:"not-allowed","&:first-child, &:hover":{color:y,backgroundColor:l,borderColor:p}},[`&-disabled${o}-button-wrapper-checked`]:{color:E,backgroundColor:c,borderColor:p,boxShadow:"none"}}}},pe=e=>{const{wireframe:r,padding:n,marginXS:o,lineWidth:t,fontSizeLG:s,colorText:p,colorBgContainer:C,colorTextDisabled:d,controlItemBgActiveDisabled:w,colorTextLightSolid:f,colorPrimary:k,colorPrimaryHover:R,colorPrimaryActive:v,colorWhite:B}=e,m=4,b=s,S=r?b-m*2:b-(m+t)*2;return{radioSize:b,dotSize:S,dotColorDisabled:d,buttonSolidCheckedColor:f,buttonSolidCheckedBg:k,buttonSolidCheckedHoverBg:R,buttonSolidCheckedActiveBg:v,buttonBg:C,buttonCheckedBg:C,buttonColor:p,buttonCheckedBgDisabled:w,buttonCheckedColorDisabled:d,buttonPaddingInline:n-t,wrapperMarginInlineEnd:o,radioColor:r?k:B,radioBgColor:r?C:k}},J=Y("Radio",e=>{const{controlOutline:r,controlOutlineWidth:n}=e,o=`0 0 0 ${z(n)} ${r}`,s=Z(e,{radioFocusShadow:o,radioButtonFocusShadow:o});return[ue(s),be(s),ge(s)]},pe,{unitless:{radioSize:!0,dotSize:!0}});var Ce=function(e,r){var n={};for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&r.indexOf(o)<0&&(n[o]=e[o]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var t=0,o=Object.getOwnPropertySymbols(e);t<o.length;t++)r.indexOf(o[t])<0&&Object.prototype.propertyIsEnumerable.call(e,o[t])&&(n[o[t]]=e[o[t]]);return n};const he=(e,r)=>{var n,o;const t=a.useContext(F),s=a.useContext(X),{getPrefixCls:p,direction:C,radio:d}=a.useContext(M),w=a.useRef(null),f=ee(r,w),{isFormItemInput:k}=a.useContext(ae),R=i=>{var h,D;(h=e.onChange)===null||h===void 0||h.call(e,i),(D=t==null?void 0:t.onChange)===null||D===void 0||D.call(t,i)},{prefixCls:v,className:B,rootClassName:m,children:b,style:S,title:g}=e,$=Ce(e,["prefixCls","className","rootClassName","children","style","title"]),x=p("radio",v),y=((t==null?void 0:t.optionType)||s)==="button",l=y?`${x}-button`:x,c=V(x),[E,I,P]=J(x,c),u=Object.assign({},$),O=a.useContext(oe);t&&(u.name=t.name,u.onChange=R,u.checked=e.value===t.value,u.disabled=(n=u.disabled)!==null&&n!==void 0?n:t.disabled),u.disabled=(o=u.disabled)!==null&&o!==void 0?o:O;const _=j(`${l}-wrapper`,{[`${l}-wrapper-checked`]:u.checked,[`${l}-wrapper-disabled`]:u.disabled,[`${l}-wrapper-rtl`]:C==="rtl",[`${l}-wrapper-in-form-item`]:k},d==null?void 0:d.className,B,m,I,P,c);return E(a.createElement(te,{component:"Radio",disabled:u.disabled},a.createElement("label",{className:_,style:Object.assign(Object.assign({},d==null?void 0:d.style),S),onMouseEnter:e.onMouseEnter,onMouseLeave:e.onMouseLeave,title:g},a.createElement(ce,Object.assign({},u,{className:j(u.className,!y&&re),type:"radio",prefixCls:l,ref:f})),b!==void 0?a.createElement("span",null,b):null)))},T=a.forwardRef(he),fe=a.forwardRef((e,r)=>{const{getPrefixCls:n,direction:o}=a.useContext(M),[t,s]=G(e.defaultValue,{value:e.value}),p=i=>{const h=t,D=i.target.value;"value"in e||s(D);const{onChange:H}=e;H&&D!==h&&H(i)},{prefixCls:C,className:d,rootClassName:w,options:f,buttonStyle:k="outline",disabled:R,children:v,size:B,style:m,id:b,onMouseEnter:S,onMouseLeave:g,onFocus:$,onBlur:x}=e,y=n("radio",C),l=`${y}-group`,c=V(y),[E,I,P]=J(y,c);let u=v;f&&f.length>0&&(u=f.map(i=>typeof i=="string"||typeof i=="number"?a.createElement(T,{key:i.toString(),prefixCls:y,disabled:R,value:i,checked:t===i},i):a.createElement(T,{key:`radio-group-value-options-${i.value}`,prefixCls:y,disabled:i.disabled||R,value:i.value,checked:t===i.value,title:i.title,style:i.style,id:i.id,required:i.required},i.label)));const O=ne(B),_=j(l,`${l}-${k}`,{[`${l}-${O}`]:O,[`${l}-rtl`]:o==="rtl"},d,w,I,P,c);return E(a.createElement("div",Object.assign({},ie(e,{aria:!0,data:!0}),{className:_,style:m,onMouseEnter:S,onMouseLeave:g,onFocus:$,onBlur:x,id:b,ref:r}),a.createElement(le,{value:{onChange:p,value:t,disabled:e.disabled,name:e.name,optionType:e.optionType}},u)))}),ve=a.memo(fe);var me=function(e,r){var n={};for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&r.indexOf(o)<0&&(n[o]=e[o]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var t=0,o=Object.getOwnPropertySymbols(e);t<o.length;t++)r.indexOf(o[t])<0&&Object.prototype.propertyIsEnumerable.call(e,o[t])&&(n[o[t]]=e[o[t]]);return n};const Se=(e,r)=>{const{getPrefixCls:n}=a.useContext(M),{prefixCls:o}=e,t=me(e,["prefixCls"]),s=n("radio",o);return a.createElement(de,{value:"button"},a.createElement(T,Object.assign({prefixCls:s},t,{type:"radio",ref:r})))},ye=a.forwardRef(Se),q=T;q.Button=ye;q.Group=ve;q.__ANT_RADIO=!0;export{ce as C,q as R};
