(this.webpackJsonpvocabulary=this.webpackJsonpvocabulary||[]).push([[0],{463:function(e,t,n){},465:function(e,t,n){"use strict";n.r(t);var c=n(0),r=n.n(c),i=n(30),a=n.n(i),o=n(99),u=n(85),l=n(29),s=n(113),d=n(22),j=n(53),b=n(87),O=n(471),f=n(48),h=n(7);function p(e){var t=e.word,n=e.onPartOfSpeechClick,r=e.onDefinitionClick,i=Object(c.useState)(),a=Object(j.a)(i,2),o=a[0],u=a[1];return Object(c.useEffect)((function(){if(""!==t){var e=new AbortController;return fetch("https://api.dictionaryapi.dev/api/v2/entries/en_US/".concat(t),{signal:e.signal}).then((function(e){return e.json()})).then((function(e){u(e[0])})).catch((function(e){return console.error(e)})),function(){return e.abort()}}u(void 0)}),[t]),Object(h.jsx)("ul",{children:null===o||void 0===o?void 0:o.meanings.map((function(e,t){return Object(h.jsxs)("li",{children:[Object(h.jsx)("div",{onClick:function(){return n&&n(e.partOfSpeech)},children:e.partOfSpeech}),Object(h.jsx)("ul",{children:e.definitions.map((function(t,n){return Object(h.jsx)("li",{onClick:function(){return r&&r({partOfSpeech:e.partOfSpeech,definition:t.definition})},children:t.definition},n)}))})]},t)}))})}var x=n(116),v=Object(x.b)({name:"dictionary",initialState:[],reducers:{create:{reducer:function(e,t){return e.concat(t.payload)},prepare:function(e){return{payload:Object(d.a)({id:Date.now()},e)}}},update:function(e,t){var n=e.findIndex((function(e){return e.id===t.payload.id}));return n>-1&&(e[n]=t.payload),e},delete:function(e,t){return e.filter((function(e){return e.id!==t.payload.id}))},answer:function(e,t){var n=t.payload,c=n.entity,r=n.isCorrect,i=e.find((function(e){return e.id===c.id}));i&&(i.answersCount++,r&&i.correctAnswersCount++)}}});function m(e){var t=Object(l.h)().id,n=Object(f.c)((function(e){return t?e.find((function(e){return e.id===parseInt(t)})):void 0})),r=Object(c.useState)(Object(d.a)({word:"",partOfSpeech:"",translation:"",definition:"",answersCount:0,correctAnswersCount:0},null!==n&&void 0!==n?n:{})),i=Object(j.a)(r,2),a=i[0],o=i[1],u=Object(l.g)(),s=function(){return u.push("/")},x=Object(f.b)();return Object(h.jsxs)(h.Fragment,{children:[Object(h.jsx)(b.a,{type:"primary",danger:!0,onClick:function(){return s()},children:"Cancel"}),Object(h.jsx)(b.a,{type:"primary",onClick:function(){x(t?v.actions.update(a):v.actions.create(a)),s()},children:"Confirm"}),Object(h.jsx)(O.a,{placeholder:"Word",value:a.word,onChange:function(e){return o(Object(d.a)(Object(d.a)({},a),{},{word:e.target.value}))}}),Object(h.jsx)(O.a,{placeholder:"Pard ot speech",value:a.partOfSpeech,onChange:function(e){return o(Object(d.a)(Object(d.a)({},a),{},{partOfSpeech:e.target.value}))}}),Object(h.jsx)(O.a,{placeholder:"Translation",value:a.translation,onChange:function(e){return o(Object(d.a)(Object(d.a)({},a),{},{translation:e.target.value}))}}),Object(h.jsx)(O.a.TextArea,{placeholder:"Definition",value:a.definition,onChange:function(e){return o(Object(d.a)(Object(d.a)({},a),{},{definition:e.target.value}))}}),Object(h.jsx)(p,{word:a.word,onPartOfSpeechClick:function(e){return o((function(t){return Object(d.a)(Object(d.a)({},t),{},{partOfSpeech:e})}))},onDefinitionClick:function(e){return o((function(t){return Object(d.a)(Object(d.a)({},t),e)}))}})]})}var g=n(474),C=n(475),w=n(476),y=n(222),S=n(473),k=n(215),N=n.n(k),F=n(80);function R(e,t){return Object(F.a)(e).sort(t)}function I(e){return e.answersCount+e.correctAnswersCount}function A(e,t){var n=[e,t].map(I),c=Object(j.a)(n,2),r=c[0];return c[1]-r}function T(e){var t=Object(l.g)(),n=Object(f.b)(),c=[{title:"Word",dataIndex:"word",ellipsis:{showTitle:!0}},{title:Object(h.jsx)(y.a,{title:"Total answers / Correct answers",children:"Total / Correct"}),render:function(e,t){return Object(h.jsxs)(h.Fragment,{children:[t.answersCount," / ",t.correctAnswersCount]})}},{title:function(){return Object(h.jsx)(b.a,{type:"primary",onClick:function(){return t.push("/record")},children:Object(h.jsx)(g.a,{})})},render:function(e,c){return Object(h.jsxs)(h.Fragment,{children:[Object(h.jsx)(b.a,{onClick:function(){return t.push("/record/".concat(c.id))},children:Object(h.jsx)(C.a,{})}),Object(h.jsx)(S.a,{title:"Are you sure to delete this?",onConfirm:function(){n(v.actions.delete(c))},children:Object(h.jsx)(b.a,{children:Object(h.jsx)(w.a,{})})})]})}}],r=Object(f.c)((function(e){return R(e,(function(e,t){var n,c;return(null!==(n=t.id)&&void 0!==n?n:0)-(null!==(c=e.id)&&void 0!==c?c:0)}))}));return Object(h.jsxs)(h.Fragment,{children:[Object(h.jsx)(b.a,{type:"primary",onClick:function(){return t.push("/practice")},children:"Practice"}),Object(h.jsx)(N.a,{columns:c,dataSource:r,size:"middle",rowKey:"id"})]})}var P=n(72),D=n(78);function J(e){var t=e.theme,n=e.children,c=e.className,r=Object(D.a)(e,["theme","children","className"]);return Object(h.jsx)("button",Object(d.a)(Object(d.a)({},r),{},{className:"btn btn-".concat(null!==t&&void 0!==t?t:"primary"," ").concat(null!==c&&void 0!==c?c:""),children:n}))}var E,z,B,L,M=function(e){var t=e.children,n=e.className,c=Object(D.a)(e,["children","className"]);return Object(h.jsx)("div",Object(d.a)(Object(d.a)({className:"card "+(null!==n&&void 0!==n?n:"")},c),{},{children:t}))},W=function(e){var t=e.children,n=e.className,c=Object(D.a)(e,["children","className"]);return Object(h.jsx)("div",Object(d.a)(Object(d.a)({className:"card-body "+(null!==n&&void 0!==n?n:"")},c),{},{children:t}))},K=s.a.div(E||(E=Object(o.a)(["\n  height: 100%;\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n"])));!function(e){e[e.translation=0]="translation",e[e.definition=1]="definition"}(L||(L={}));var U=(z={},Object(P.a)(z,L.definition,(function(e){return""!==e.definition})),Object(P.a)(z,L.translation,(function(e){return""!==e.translation})),z),_=(B={},Object(P.a)(B,L.definition,(function(e){return e.definition})),Object(P.a)(B,L.translation,(function(e){return e.translation})),B);function q(e){var t=Object(c.useState)(),n=Object(j.a)(t,2),r=n[0],i=n[1],a=Object(l.g)();return Object(h.jsxs)(K,{children:[void 0===r?Object(h.jsx)(H,{onSelect:i}):Object(h.jsx)(Q,Object(d.a)({knowledge:r},e)),Object(h.jsx)(J,{onClick:function(){return a.push("/")},children:"End practice"})]})}var G,H=function(e){var t=e.onSelect;return Object(h.jsx)(h.Fragment,{children:[L.definition,L.translation].map((function(e){return Object(h.jsx)(J,{onClick:function(){return t&&t(e)},children:L[e]},e)}))})},Q=function(e){var t=e.knowledge,n=Object(f.c)((function(e){return e})),r=Object(c.useMemo)((function(){return n.filter(U[t])}),[n,t]),i=Object(c.useState)((function(){var e=R(r,A),t=e.pop();return{stack:e,actualRecord:t}})),a=Object(j.a)(i,2),o=a[0],u=a[1],l=Object(c.useState)(!1),s=Object(j.a)(l,2),d=s[0],b=s[1],O=Object(f.b)(),p=function(e){(null===o||void 0===o?void 0:o.actualRecord)&&O(v.actions.answer({isCorrect:e,entity:o.actualRecord})),b(!1),u((function(e){var t,n=Object(F.a)(null!==(t=null===e||void 0===e?void 0:e.stack)&&void 0!==t?t:[]),c=n.pop();return{stack:n,actualRecord:c}}))};return o.actualRecord?Object(h.jsxs)(h.Fragment,{children:[Object(h.jsx)(M,{children:Object(h.jsxs)(W,{className:"text-center",children:[Object(h.jsx)("div",{children:_[t](o.actualRecord)}),Object(h.jsxs)("div",{children:["(",Object(h.jsx)("i",{children:o.actualRecord.partOfSpeech}),")"]})]})}),Object(h.jsx)(M,{children:Object(h.jsx)(W,{className:"text-center",children:d?o.actualRecord.word:"?"})}),d?Object(h.jsxs)(h.Fragment,{children:[Object(h.jsx)(J,{theme:"success",onClick:function(){return p(!0)},children:"Correct"}),Object(h.jsx)(J,{theme:"danger",onClick:function(){return p(!1)},children:"Incorrect"})]}):Object(h.jsx)(J,{onClick:function(){return b(!0)},children:"Reveal answer"})]}):null},V=s.a.div(G||(G=Object(o.a)(["\n  height: 100vh;\n  display: flex;\n  flex-direction: column;\n  font-size: calc(10px + 2vmin);\n"])));function X(){return Object(h.jsx)(V,{className:"bg-dark",children:Object(h.jsx)(u.a,{children:Object(h.jsxs)(l.d,{children:[Object(h.jsx)(l.b,{path:"/record/:id?",children:Object(h.jsx)(m,{})}),Object(h.jsx)(l.b,{path:"/practice",children:Object(h.jsx)(q,{})}),Object(h.jsx)(l.b,{path:"/list",children:Object(h.jsx)(T,{})}),Object(h.jsx)(l.a,{to:"/list"})]})})})}var Y=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,477)).then((function(t){var n=t.getCLS,c=t.getFID,r=t.getFCP,i=t.getLCP,a=t.getTTFB;n(e),c(e),r(e),i(e),a(e)}))},Z=(n(461),n(462),n(463),"vocabulary"),$=localStorage.getItem(Z),ee=Object(x.a)({reducer:v.reducer,preloadedState:$?JSON.parse($):void 0});ee.subscribe((function(){localStorage.setItem(Z,JSON.stringify(ee.getState()))})),a.a.render(Object(h.jsx)(r.a.StrictMode,{children:Object(h.jsx)(f.a,{store:ee,children:Object(h.jsx)(X,{})})}),document.getElementById("root")),Y()}},[[465,1,2]]]);
//# sourceMappingURL=main.90adb1ea.chunk.js.map