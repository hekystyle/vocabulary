import{r as g,u as _,a as Ce,j as l,c as $,C as Me,b as A,d as le,T as xe,e as Ae,g as be,f as $e,D as Ne,h as Oe,_ as P,i as R,k as z,R as Pe,s as K,l as Re,m as Te,n as ue,o as _e,p as de,S as H,q as je}from"./index-278e01b2.js";import{u as Ue,Q as q}from"./queryKeys-fd1818e2.js";import{g as Le,m as He,W as De,L as Fe,u as fe}from"./compact-item-a5f7af99.js";import{T as ze}from"./Tags-a9018aff.js";import{R as Ke}from"./index-41b4d16b.js";const he=g.forwardRef(({as:e,bsPrefix:n,variant:t="primary",size:r,active:i=!1,disabled:a=!1,className:s,...o},u)=>{const f=_(n,"btn"),[p,{tagName:d}]=Ce({tagName:e,disabled:a,...o}),h=d;return l.jsx(h,{...p,...o,ref:u,disabled:a,className:$(s,f,i&&"active",t&&`${f}-${t}`,r&&`${f}-${r}`,o.href&&a&&"disabled")})});he.displayName="Button";const x=he,ge=g.forwardRef(({bsPrefix:e,className:n,variant:t,as:r="img",...i},a)=>{const s=_(e,"card-img");return l.jsx(r,{ref:a,className:$(t?`${s}-${t}`:s,n),...i})});ge.displayName="CardImg";const Be=ge,pe=g.forwardRef(({bsPrefix:e,className:n,as:t="div",...r},i)=>{const a=_(e,"card-header"),s=g.useMemo(()=>({cardHeaderBsPrefix:a}),[a]);return l.jsx(Me.Provider,{value:s,children:l.jsx(t,{ref:i,...r,className:$(n,a)})})});pe.displayName="CardHeader";const We=pe,qe=le("h5"),Qe=le("h6"),me=A("card-body"),Ge=A("card-title",{Component:qe}),Ve=A("card-subtitle",{Component:Qe}),Xe=A("card-link",{Component:"a"}),Ye=A("card-text",{Component:"p"}),Ze=A("card-footer"),Je=A("card-img-overlay"),Se=g.forwardRef(({bsPrefix:e,className:n,bg:t,text:r,border:i,body:a=!1,children:s,as:o="div",...u},f)=>{const p=_(e,"card");return l.jsx(o,{ref:f,...u,className:$(n,p,t&&`bg-${t}`,r&&`text-${r}`,i&&`border-${i}`),children:a?l.jsx(me,{children:s}):s})});Se.displayName="Card";const b=Object.assign(Se,{Img:Be,Title:Ge,Subtitle:Ve,Body:me,Link:Xe,Text:Ye,Header:We,Footer:Ze,ImgOverlay:Je});function D(){return D=Object.assign?Object.assign.bind():function(e){for(var n=1;n<arguments.length;n++){var t=arguments[n];for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])}return e},D.apply(this,arguments)}function N(e){return N=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(n){return typeof n}:function(n){return n&&typeof Symbol=="function"&&n.constructor===Symbol&&n!==Symbol.prototype?"symbol":typeof n},N(e)}function ke(e,n){if(N(e)!=="object"||e===null)return e;var t=e[Symbol.toPrimitive];if(t!==void 0){var r=t.call(e,n||"default");if(N(r)!=="object")return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return(n==="string"?String:Number)(e)}function en(e){var n=ke(e,"string");return N(n)==="symbol"?n:String(n)}function Q(e,n,t){return n=en(n),n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function nn(e){if(Array.isArray(e))return e}function tn(e,n){var t=e==null?null:typeof Symbol<"u"&&e[Symbol.iterator]||e["@@iterator"];if(t!=null){var r,i,a,s,o=[],u=!0,f=!1;try{if(a=(t=t.call(e)).next,n===0){if(Object(t)!==t)return;u=!1}else for(;!(u=(r=a.call(t)).done)&&(o.push(r.value),o.length!==n);u=!0);}catch(p){f=!0,i=p}finally{try{if(!u&&t.return!=null&&(s=t.return(),Object(s)!==s))return}finally{if(f)throw i}}return o}}function G(e,n){(n==null||n>e.length)&&(n=e.length);for(var t=0,r=new Array(n);t<n;t++)r[t]=e[t];return r}function rn(e,n){if(e){if(typeof e=="string")return G(e,n);var t=Object.prototype.toString.call(e).slice(8,-1);if(t==="Object"&&e.constructor&&(t=e.constructor.name),t==="Map"||t==="Set")return Array.from(e);if(t==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))return G(e,n)}}function an(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function sn(e,n){return nn(e)||tn(e,n)||rn(e,n)||an()}function cn(e,n){if(e==null)return{};var t={},r=Object.keys(e),i,a;for(a=0;a<r.length;a++)i=r[a],!(n.indexOf(i)>=0)&&(t[i]=e[i]);return t}function on(e,n){if(e==null)return{};var t=cn(e,n),r,i;if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(i=0;i<a.length;i++)r=a[i],!(n.indexOf(r)>=0)&&Object.prototype.propertyIsEnumerable.call(e,r)&&(t[r]=e[r])}return t}function ln(e){if(Array.isArray(e))return e}function un(e,n){var t=e==null?null:typeof Symbol<"u"&&e[Symbol.iterator]||e["@@iterator"];if(t!=null){var r,i,a,s,o=[],u=!0,f=!1;try{if(a=(t=t.call(e)).next,n===0){if(Object(t)!==t)return;u=!1}else for(;!(u=(r=a.call(t)).done)&&(o.push(r.value),o.length!==n);u=!0);}catch(p){f=!0,i=p}finally{try{if(!u&&t.return!=null&&(s=t.return(),Object(s)!==s))return}finally{if(f)throw i}}return o}}function V(e,n){(n==null||n>e.length)&&(n=e.length);for(var t=0,r=new Array(n);t<n;t++)r[t]=e[t];return r}function dn(e,n){if(e){if(typeof e=="string")return V(e,n);var t=Object.prototype.toString.call(e).slice(8,-1);if(t==="Object"&&e.constructor&&(t=e.constructor.name),t==="Map"||t==="Set")return Array.from(e);if(t==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))return V(e,n)}}function fn(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function F(e,n){return ln(e)||un(e,n)||dn(e,n)||fn()}function X(e){var n=g.useRef();n.current=e;var t=g.useCallback(function(){for(var r,i=arguments.length,a=new Array(i),s=0;s<i;s++)a[s]=arguments[s];return(r=n.current)===null||r===void 0?void 0:r.call.apply(r,[n].concat(a))},[]);return t}function hn(){return!!(typeof window<"u"&&window.document&&window.document.createElement)}var Y=hn()?g.useLayoutEffect:g.useEffect,Z=function(n,t){var r=g.useRef(!0);Y(function(){if(!r.current)return n()},t),Y(function(){return r.current=!1,function(){r.current=!0}},[])};function J(e){var n=g.useRef(!1),t=g.useState(e),r=F(t,2),i=r[0],a=r[1];g.useEffect(function(){return n.current=!1,function(){n.current=!0}},[]);function s(o,u){u&&n.current||a(o)}return[i,s]}function U(e){return e!==void 0}function gn(e,n){var t=n||{},r=t.defaultValue,i=t.value,a=t.onChange,s=t.postState,o=J(function(){return U(i)?i:U(r)?typeof r=="function"?r():r:typeof e=="function"?e():e}),u=F(o,2),f=u[0],p=u[1],d=i!==void 0?i:f,h=s?s(d):d,S=X(a),E=J([d]),C=F(E,2),M=C[0],I=C[1];Z(function(){var m=M[0];f!==m&&S(f,m)},[M]),Z(function(){U(i)||p(i)},[i]);var w=X(function(m,y){p(m,y),I([d],y)});return[h,w]}var c={MAC_ENTER:3,BACKSPACE:8,TAB:9,NUM_CENTER:12,ENTER:13,SHIFT:16,CTRL:17,ALT:18,PAUSE:19,CAPS_LOCK:20,ESC:27,SPACE:32,PAGE_UP:33,PAGE_DOWN:34,END:35,HOME:36,LEFT:37,UP:38,RIGHT:39,DOWN:40,PRINT_SCREEN:44,INSERT:45,DELETE:46,ZERO:48,ONE:49,TWO:50,THREE:51,FOUR:52,FIVE:53,SIX:54,SEVEN:55,EIGHT:56,NINE:57,QUESTION_MARK:63,A:65,B:66,C:67,D:68,E:69,F:70,G:71,H:72,I:73,J:74,K:75,L:76,M:77,N:78,O:79,P:80,Q:81,R:82,S:83,T:84,U:85,V:86,W:87,X:88,Y:89,Z:90,META:91,WIN_KEY_RIGHT:92,CONTEXT_MENU:93,NUM_ZERO:96,NUM_ONE:97,NUM_TWO:98,NUM_THREE:99,NUM_FOUR:100,NUM_FIVE:101,NUM_SIX:102,NUM_SEVEN:103,NUM_EIGHT:104,NUM_NINE:105,NUM_MULTIPLY:106,NUM_PLUS:107,NUM_MINUS:109,NUM_PERIOD:110,NUM_DIVISION:111,F1:112,F2:113,F3:114,F4:115,F5:116,F6:117,F7:118,F8:119,F9:120,F10:121,F11:122,F12:123,NUMLOCK:144,SEMICOLON:186,DASH:189,EQUALS:187,COMMA:188,PERIOD:190,SLASH:191,APOSTROPHE:192,SINGLE_QUOTE:222,OPEN_SQUARE_BRACKET:219,BACKSLASH:220,CLOSE_SQUARE_BRACKET:221,WIN_KEY:224,MAC_FF_META:224,WIN_IME:229,isTextModifyingKeyEvent:function(n){var t=n.keyCode;if(n.altKey&&!n.ctrlKey||n.metaKey||t>=c.F1&&t<=c.F12)return!1;switch(t){case c.ALT:case c.CAPS_LOCK:case c.CONTEXT_MENU:case c.CTRL:case c.DOWN:case c.END:case c.ESC:case c.HOME:case c.INSERT:case c.LEFT:case c.MAC_FF_META:case c.META:case c.NUMLOCK:case c.NUM_CENTER:case c.PAGE_DOWN:case c.PAGE_UP:case c.PAUSE:case c.PRINT_SCREEN:case c.RIGHT:case c.SHIFT:case c.UP:case c.WIN_KEY:case c.WIN_KEY_RIGHT:return!1;default:return!0}},isCharacterKey:function(n){if(n>=c.ZERO&&n<=c.NINE||n>=c.NUM_ZERO&&n<=c.NUM_MULTIPLY||n>=c.A&&n<=c.Z||window.navigator.userAgent.indexOf("WebKit")!==-1&&n===0)return!0;switch(n){case c.SPACE:case c.QUESTION_MARK:case c.NUM_PLUS:case c.NUM_MINUS:case c.NUM_PERIOD:case c.NUM_DIVISION:case c.SEMICOLON:case c.DASH:case c.EQUALS:case c.COMMA:case c.PERIOD:case c.SLASH:case c.APOSTROPHE:case c.SINGLE_QUOTE:case c.OPEN_SQUARE_BRACKET:case c.BACKSLASH:case c.CLOSE_SQUARE_BRACKET:return!0;default:return!1}}},pn=["prefixCls","className","checked","defaultChecked","disabled","loadingIcon","checkedChildren","unCheckedChildren","onClick","onChange","onKeyDown"],ye=g.forwardRef(function(e,n){var t,r=e.prefixCls,i=r===void 0?"rc-switch":r,a=e.className,s=e.checked,o=e.defaultChecked,u=e.disabled,f=e.loadingIcon,p=e.checkedChildren,d=e.unCheckedChildren,h=e.onClick,S=e.onChange,E=e.onKeyDown,C=on(e,pn),M=gn(!1,{value:s,defaultValue:o}),I=sn(M,2),w=I[0],m=I[1];function y(v,j){var O=w;return u||(O=v,m(O),S==null||S(O,j)),O}function ve(v){v.which===c.LEFT?y(!1,v):v.which===c.RIGHT&&y(!0,v),E==null||E(v)}function Ee(v){var j=y(!w,v);h==null||h(j,v)}var Ie=$(i,a,(t={},Q(t,"".concat(i,"-checked"),w),Q(t,"".concat(i,"-disabled"),u),t));return g.createElement("button",D({},C,{type:"button",role:"switch","aria-checked":w,disabled:u,className:Ie,ref:n,onKeyDown:ve,onClick:Ee}),f,g.createElement("span",{className:"".concat(i,"-inner")},g.createElement("span",{className:"".concat(i,"-inner-checked")},p),g.createElement("span",{className:"".concat(i,"-inner-unchecked")},d)))});ye.displayName="Switch";const mn=e=>{const{componentCls:n}=e,t=`${n}-inner`;return{[n]:{[`&${n}-small`]:{minWidth:e.switchMinWidthSM,height:e.switchHeightSM,lineHeight:`${e.switchHeightSM}px`,[`${n}-inner`]:{paddingInlineStart:e.switchInnerMarginMaxSM,paddingInlineEnd:e.switchInnerMarginMinSM,[`${t}-checked`]:{marginInlineStart:`calc(-100% + ${e.switchPinSizeSM+e.switchPadding*2}px - ${e.switchInnerMarginMaxSM*2}px)`,marginInlineEnd:`calc(100% - ${e.switchPinSizeSM+e.switchPadding*2}px + ${e.switchInnerMarginMaxSM*2}px)`},[`${t}-unchecked`]:{marginTop:-e.switchHeightSM,marginInlineStart:0,marginInlineEnd:0}},[`${n}-handle`]:{width:e.switchPinSizeSM,height:e.switchPinSizeSM},[`${n}-loading-icon`]:{top:(e.switchPinSizeSM-e.switchLoadingIconSize)/2,fontSize:e.switchLoadingIconSize},[`&${n}-checked`]:{[`${n}-inner`]:{paddingInlineStart:e.switchInnerMarginMinSM,paddingInlineEnd:e.switchInnerMarginMaxSM,[`${t}-checked`]:{marginInlineStart:0,marginInlineEnd:0},[`${t}-unchecked`]:{marginInlineStart:`calc(100% - ${e.switchPinSizeSM+e.switchPadding*2}px + ${e.switchInnerMarginMaxSM*2}px)`,marginInlineEnd:`calc(-100% + ${e.switchPinSizeSM+e.switchPadding*2}px - ${e.switchInnerMarginMaxSM*2}px)`}},[`${n}-handle`]:{insetInlineStart:`calc(100% - ${e.switchPinSizeSM+e.switchPadding}px)`}},[`&:not(${n}-disabled):active`]:{[`&:not(${n}-checked) ${t}`]:{[`${t}-unchecked`]:{marginInlineStart:e.marginXXS/2,marginInlineEnd:-e.marginXXS/2}},[`&${n}-checked ${t}`]:{[`${t}-checked`]:{marginInlineStart:-e.marginXXS/2,marginInlineEnd:e.marginXXS/2}}}}}}},Sn=e=>{const{componentCls:n}=e;return{[n]:{[`${n}-loading-icon${e.iconCls}`]:{position:"relative",top:(e.switchPinSize-e.fontSize)/2,color:e.switchLoadingIconColor,verticalAlign:"top"},[`&${n}-checked ${n}-loading-icon`]:{color:e.switchColor}}}},yn=e=>{const{componentCls:n,motion:t}=e,r=`${n}-handle`;return{[n]:{[r]:{position:"absolute",top:e.switchPadding,insetInlineStart:e.switchPadding,width:e.switchPinSize,height:e.switchPinSize,transition:`all ${e.switchDuration} ease-in-out`,"&::before":{position:"absolute",top:0,insetInlineEnd:0,bottom:0,insetInlineStart:0,backgroundColor:e.colorWhite,borderRadius:e.switchPinSize/2,boxShadow:e.switchHandleShadow,transition:`all ${e.switchDuration} ease-in-out`,content:'""'}},[`&${n}-checked ${r}`]:{insetInlineStart:`calc(100% - ${e.switchPinSize+e.switchPadding}px)`},[`&:not(${n}-disabled):active`]:t?{[`${r}::before`]:{insetInlineEnd:e.switchHandleActiveInset,insetInlineStart:0},[`&${n}-checked ${r}::before`]:{insetInlineEnd:0,insetInlineStart:e.switchHandleActiveInset}}:{}}}},wn=e=>{const{componentCls:n}=e,t=`${n}-inner`;return{[n]:{[t]:{display:"block",overflow:"hidden",borderRadius:100,height:"100%",paddingInlineStart:e.switchInnerMarginMax,paddingInlineEnd:e.switchInnerMarginMin,transition:`padding-inline-start ${e.switchDuration} ease-in-out, padding-inline-end ${e.switchDuration} ease-in-out`,[`${t}-checked, ${t}-unchecked`]:{display:"block",color:e.colorTextLightSolid,fontSize:e.fontSizeSM,transition:`margin-inline-start ${e.switchDuration} ease-in-out, margin-inline-end ${e.switchDuration} ease-in-out`,pointerEvents:"none"},[`${t}-checked`]:{marginInlineStart:`calc(-100% + ${e.switchPinSize+e.switchPadding*2}px - ${e.switchInnerMarginMax*2}px)`,marginInlineEnd:`calc(100% - ${e.switchPinSize+e.switchPadding*2}px + ${e.switchInnerMarginMax*2}px)`},[`${t}-unchecked`]:{marginTop:-e.switchHeight,marginInlineStart:0,marginInlineEnd:0}},[`&${n}-checked ${t}`]:{paddingInlineStart:e.switchInnerMarginMin,paddingInlineEnd:e.switchInnerMarginMax,[`${t}-checked`]:{marginInlineStart:0,marginInlineEnd:0},[`${t}-unchecked`]:{marginInlineStart:`calc(100% - ${e.switchPinSize+e.switchPadding*2}px + ${e.switchInnerMarginMax*2}px)`,marginInlineEnd:`calc(-100% + ${e.switchPinSize+e.switchPadding*2}px - ${e.switchInnerMarginMax*2}px)`}},[`&:not(${n}-disabled):active`]:{[`&:not(${n}-checked) ${t}`]:{[`${t}-unchecked`]:{marginInlineStart:e.switchPadding*2,marginInlineEnd:-e.switchPadding*2}},[`&${n}-checked ${t}`]:{[`${t}-checked`]:{marginInlineStart:-e.switchPadding*2,marginInlineEnd:e.switchPadding*2}}}}}},vn=e=>{const{componentCls:n}=e;return{[n]:Object.assign(Object.assign(Object.assign(Object.assign({},Ae(e)),{position:"relative",display:"inline-block",boxSizing:"border-box",minWidth:e.switchMinWidth,height:e.switchHeight,lineHeight:`${e.switchHeight}px`,verticalAlign:"middle",background:e.colorTextQuaternary,border:"0",borderRadius:100,cursor:"pointer",transition:`all ${e.motionDurationMid}`,userSelect:"none",[`&:hover:not(${n}-disabled)`]:{background:e.colorTextTertiary}}),be(e)),{[`&${n}-checked`]:{background:e.switchColor,[`&:hover:not(${n}-disabled)`]:{background:e.colorPrimaryHover}},[`&${n}-loading, &${n}-disabled`]:{cursor:"not-allowed",opacity:e.switchDisabledOpacity,"*":{boxShadow:"none",cursor:"not-allowed"}},[`&${n}-rtl`]:{direction:"rtl"}})}},En=Le("Switch",e=>{const n=e.fontSize*e.lineHeight,t=e.controlHeight/2,r=2,i=n-r*2,a=t-r*2,s=He(e,{switchMinWidth:i*2+r*4,switchHeight:n,switchDuration:e.motionDurationMid,switchColor:e.colorPrimary,switchDisabledOpacity:e.opacityLoading,switchInnerMarginMin:i/2,switchInnerMarginMax:i+r+r*2,switchPadding:r,switchPinSize:i,switchBg:e.colorBgContainer,switchMinWidthSM:a*2+r*2,switchHeightSM:t,switchInnerMarginMinSM:a/2,switchInnerMarginMaxSM:a+r+r*2,switchPinSizeSM:a,switchHandleShadow:`0 2px 4px 0 ${new xe("#00230b").setAlpha(.2).toRgbString()}`,switchLoadingIconSize:e.fontSizeIcon*.75,switchLoadingIconColor:`rgba(0, 0, 0, ${e.opacityLoading})`,switchHandleActiveInset:"-30%"});return[vn(s),wn(s),yn(s),Sn(s),mn(s)]});var In=globalThis&&globalThis.__rest||function(e,n){var t={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&n.indexOf(r)<0&&(t[r]=e[r]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var i=0,r=Object.getOwnPropertySymbols(e);i<r.length;i++)n.indexOf(r[i])<0&&Object.prototype.propertyIsEnumerable.call(e,r[i])&&(t[r[i]]=e[r[i]]);return t};const we=g.forwardRef((e,n)=>{var{prefixCls:t,size:r,disabled:i,loading:a,className:s,rootClassName:o}=e,u=In(e,["prefixCls","size","disabled","loading","className","rootClassName"]);const{getPrefixCls:f,direction:p}=g.useContext($e),d=g.useContext(Ne),h=(i??d)||a,S=f("switch",t),E=g.createElement("div",{className:`${S}-handle`},a&&g.createElement(Fe,{className:`${S}-loading-icon`})),[C,M]=En(S),I=Oe(r),w=$({[`${S}-small`]:I==="small",[`${S}-loading`]:a,[`${S}-rtl`]:p==="rtl"},s,o,M);return C(g.createElement(De,null,g.createElement(ye,Object.assign({},u,{prefixCls:S,className:w,disabled:h,ref:n,loadingIcon:E}))))});we.__ANT_SWITCH=!0;const k=we;function ee(e){for(var n=[],t;!(t=e.next()).done;)n.push(t.value);return n}function ne(e,n,t){for(var r=0,i=t.length;r<i;){if(e(n,t[r]))return!0;r+=1}return!1}function Cn(e){var n=String(e).match(/^function (\w*)/);return n==null?"":n[1]}function Mn(e,n){return e===n?e!==0||1/e===1/n:e!==e&&n!==n}const L=typeof Object.is=="function"?Object.is:Mn;var te=Object.prototype.toString,xn=function(){return te.call(arguments)==="[object Arguments]"?function(n){return te.call(n)==="[object Arguments]"}:function(n){return P("callee",n)}}(),An=!{toString:null}.propertyIsEnumerable("toString"),re=["constructor","valueOf","isPrototypeOf","toString","propertyIsEnumerable","hasOwnProperty","toLocaleString"],ie=function(){return arguments.propertyIsEnumerable("length")}(),bn=function(n,t){for(var r=0;r<n.length;){if(n[r]===t)return!0;r+=1}return!1},ae=typeof Object.keys=="function"&&!ie?R(function(n){return Object(n)!==n?[]:Object.keys(n)}):R(function(n){if(Object(n)!==n)return[];var t,r,i=[],a=ie&&xn(n);for(t in n)P(t,n)&&(!a||t!=="length")&&(i[i.length]=t);if(An)for(r=re.length-1;r>=0;)t=re[r],P(t,n)&&!bn(i,t)&&(i[i.length]=t),r-=1;return i}),se=R(function(n){return n===null?"Null":n===void 0?"Undefined":Object.prototype.toString.call(n).slice(8,-1)});function ce(e,n,t,r){var i=ee(e),a=ee(n);function s(o,u){return B(o,u,t.slice(),r.slice())}return!ne(function(o,u){return!ne(s,u,o)},a,i)}function B(e,n,t,r){if(L(e,n))return!0;var i=se(e);if(i!==se(n))return!1;if(typeof e["fantasy-land/equals"]=="function"||typeof n["fantasy-land/equals"]=="function")return typeof e["fantasy-land/equals"]=="function"&&e["fantasy-land/equals"](n)&&typeof n["fantasy-land/equals"]=="function"&&n["fantasy-land/equals"](e);if(typeof e.equals=="function"||typeof n.equals=="function")return typeof e.equals=="function"&&e.equals(n)&&typeof n.equals=="function"&&n.equals(e);switch(i){case"Arguments":case"Array":case"Object":if(typeof e.constructor=="function"&&Cn(e.constructor)==="Promise")return e===n;break;case"Boolean":case"Number":case"String":if(!(typeof e==typeof n&&L(e.valueOf(),n.valueOf())))return!1;break;case"Date":if(!L(e.valueOf(),n.valueOf()))return!1;break;case"Error":return e.name===n.name&&e.message===n.message;case"RegExp":if(!(e.source===n.source&&e.global===n.global&&e.ignoreCase===n.ignoreCase&&e.multiline===n.multiline&&e.sticky===n.sticky&&e.unicode===n.unicode))return!1;break}for(var a=t.length-1;a>=0;){if(t[a]===e)return r[a]===n;a-=1}switch(i){case"Map":return e.size!==n.size?!1:ce(e.entries(),n.entries(),t.concat([e]),r.concat([n]));case"Set":return e.size!==n.size?!1:ce(e.values(),n.values(),t.concat([e]),r.concat([n]));case"Arguments":case"Array":case"Object":case"Boolean":case"Number":case"String":case"Date":case"Error":case"RegExp":case"Int8Array":case"Uint8Array":case"Uint8ClampedArray":case"Int16Array":case"Uint16Array":case"Int32Array":case"Uint32Array":case"Float32Array":case"Float64Array":case"ArrayBuffer":break;default:return!1}var s=ae(e);if(s.length!==ae(n).length)return!1;var o=t.concat([e]),u=r.concat([n]);for(a=s.length-1;a>=0;){var f=s[a];if(!(P(f,n)&&B(n[f],e[f],o,u)))return!1;a-=1}return!0}var $n=z(function(n,t){return B(n,t,[],[])});const Nn=$n;function On(e){return Object.prototype.toString.call(e)==="[object String]"}var Pn=z(function(n,t){var r=n<0?t.length+n:n;return On(t)?t.charAt(r):t[r]});const Rn=Pn;var Tn=R(function(n){return n==null});const oe=Tn;var _n=Rn(-1);const jn=_n;var Un=z(function(e,n){for(var t=[],r=0,i=n.length;r<i;){for(var a=r+1;a<i&&e(n[a-1],n[a]);)a+=1;t.push(n.slice(r,a)),r=a}return t});const Ln=Un,Hn="returnUrl",Dn=()=>{const e=window.speechSynthesis;return g.useEffect(()=>()=>e.cancel(),[e]),{speak:n=>{e.cancel();const t=new SpeechSynthesisUtterance(n);e.speak(t)}}},Fn=e=>async(n,t)=>{const r=await e.terms.get(n);r&&(r.answersCount+=1,t&&(r.correctAnswersCount+=1),await e.terms.put(r))},W=Pe({key:"practice/session",default:{config:void 0,isActive:!1,queue:[],isRevealed:!1}}),zn=K(b.Body)`
  overflow: auto;
`,Kn=K.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`,Bn=()=>{const e=Re(),{pathname:n}=Te(),{speak:t}=Dn(),{db:r,termsRepository:i}=ue(),a=_e(),[{queue:s,isRevealed:o,config:u},f]=de(W),p=jn(s),d=(u==null?void 0:u.playAfterReveal)??!1,{data:h,isFetching:S}=Ue(q.terms.id(p),({signal:m})=>oe(p)?void 0:i.getById(p,m),{enabled:!oe(p),onError:m=>console.error(m)}),{mutateAsync:E,isLoading:C}=fe(async({id:m,isCorrect:y})=>await Fn(r)(m,y),{onSuccess:(m,{id:y})=>a.invalidateQueries(q.terms.id(y))}),M=()=>{f(m=>({...m,isRevealed:!0})),h&&d&&t(h.word)},I=m=>{(h==null?void 0:h.id)!==void 0&&E({id:h.id,isCorrect:m}).then(()=>f(y=>({...y,queue:y.queue.slice(0,-1),isRevealed:!1}))).catch(console.error)},w=()=>{h!=null&&h.id&&e(`/records/${h.id}`,{state:{[Hn]:n}})};return S?l.jsx(H,{label:"Loading term ..."}):C?l.jsx(H,{label:"Updating term answers ..."}):h?l.jsxs(l.Fragment,{children:[l.jsx(b,{children:l.jsxs(b.Body,{className:"text-center",children:[l.jsx("div",{children:h.translation}),l.jsxs("div",{children:["(",l.jsx("i",{children:h.partOfSpeech}),")"]})]})}),l.jsx(b,{children:l.jsx(zn,{className:"text-center",children:h.definition})}),l.jsx(b,{children:l.jsx(b.Body,{className:"text-center",children:o?l.jsxs(Kn,{children:[h.word,l.jsx(x,{onClick:()=>t(h.word),children:"Play it again"})]}):"?"})}),o?l.jsxs(l.Fragment,{children:[l.jsx(x,{variant:"success",onClick:()=>I(!0),children:"I was correct"}),l.jsx(x,{variant:"danger",onClick:()=>I(!1),children:"I was incorrect"})]}):l.jsx(x,{onClick:M,children:"Reveal answer"}),l.jsx(x,{onClick:w,children:"Edit current term"})]}):l.jsx("p",{children:"You've finished all the terms!"})},Wn=e=>e.definition!=="",qn=e=>e.translation!=="";function Qn(e){const n=[...e];let t=n.length;for(;t;){const r=Math.floor(Math.random()*t);t-=1;const i=n[t];n[t]=n[r],n[r]=i}return n}function Gn({answersCount:e,correctAnswersCount:n}){return e+n}function Vn({answersCount:e,correctAnswersCount:n}){return e===0?0:Math.floor(100/e*n)}var T=(e=>(e.Relative="relative",e.Absolute="absolute",e))(T||{});const Xn=e=>typeof e=="string"&&Object.values(T).some(Nn(e)),Yn={relative:Vn,absolute:Gn},Zn=e=>async({ignoreScoreOfNewTerms:n,scoreAlgorithm:t,tags:r})=>{const i=[],a=new Set(r);return await e.terms.filter(s=>(qn(s)||Wn(s))&&(a.size===0||s.tags.some(o=>a.has(o)))).each(s=>{i.push({id:s.id,score:n&&s.answersCount<10?0:Yn[t](s)})}),i.sort((s,o)=>o.score-s.score),Ln((s,o)=>s.score===o.score,i).map(s=>Qn(s)).reduce((s,o)=>[...s,...o.map(u=>u.id)],[])},Jn=()=>{const{db:e}=ue(),n=je(W),[t,r]=g.useState({scoreAlgorithm:T.Relative,playAfterReveal:!1,ignoreScoreOfNewTerms:!1,tags:[]}),{isLoading:i,mutateAsync:a}=fe(Zn(e),{onError:d=>console.error(d)}),s=()=>{a(t).then(d=>n({config:t,queue:d,isActive:!0,isRevealed:!1})).catch(console.error)},o=d=>r(h=>({...h,...d}));if(i)return l.jsx(H,{label:"Preparing practice session queue ..."});const{scoreAlgorithm:u,playAfterReveal:f,ignoreScoreOfNewTerms:p}=t;return l.jsxs(l.Fragment,{children:[l.jsx(Ke.Group,{buttonStyle:"solid",name:"scoreAlgorithm",optionType:"button",options:Object.values(T).map(d=>({label:d,value:d,style:{flexGrow:1,textAlign:"center"}})),style:{display:"flex"},value:u,onChange:({target:{value:d}})=>o({scoreAlgorithm:Xn(d)?d:void 0})}),l.jsx(k,{checked:f,checkedChildren:"Play word after reveal",unCheckedChildren:"Play word after reveal",onChange:d=>o({playAfterReveal:d})}),l.jsx(k,{checked:p,checkedChildren:"Ignore score for items with less then 11 answers",unCheckedChildren:"Don't ignore score for items with less then 11 answers",onChange:d=>o({ignoreScoreOfNewTerms:d})}),l.jsx(ze,{style:{width:"100%"},value:t.tags,onChange:d=>o({tags:d})}),l.jsx(x,{onClick:s,children:"Start session"})]})},kn=K.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`,at=()=>{const[{isActive:e},n]=de(W),t=()=>{n(r=>({...r,config:void 0,queue:[],isActive:!1}))};return l.jsx(kn,{children:e?l.jsxs(l.Fragment,{children:[l.jsx(Bn,{}),l.jsx(x,{onClick:t,children:"End session"})]}):l.jsx(Jn,{})})};export{at as default};