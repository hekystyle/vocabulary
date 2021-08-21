(this.webpackJsonpvocabulary=this.webpackJsonpvocabulary||[]).push([[0],{481:function(e,t,n){},483:function(e,t,n){"use strict";n.r(t);var c,r=n(0),a=n.n(r),i=n(25),o=n.n(i),s=n(72),u=n(59),l=n(31),j=n(73),d=n(8),b=n(55),O=n(494),f=n(94),h=n(51),p=n(157),x=n.n(p),v=n(224),m=n(225),g=n(226),C=function(){function e(){Object(m.a)(this,e),this.controller=new AbortController}return Object(g.a)(e,[{key:"abort",value:function(){this.controller.abort()}},{key:"word",value:function(){var e=Object(v.a)(x.a.mark((function e(t){var n;return x.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("https://api.dictionaryapi.dev/api/v2/entries/en_US/".concat(t),{headers:{Accept:"application/json"},signal:this.controller.signal});case 2:return n=e.sent,e.next=5,n.json();case 5:return e.abrupt("return",e.sent);case 6:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()}]),e}(),w=n(5),y=j.a.ul(c||(c=Object(s.a)(["\n  color: white;\n"])));function S(e){var t=e.word,n=e.onPartOfSpeechClick,c=e.onDefinitionClick,a=Object(r.useState)(),i=Object(b.a)(a,2),o=i[0],s=i[1];return Object(r.useEffect)((function(){if(""!==t){var e=new C;return e.word(t).then((function(e){s(e[0])})).catch((function(e){return console.error(e)})),function(){return e.abort()}}s(void 0)}),[t]),Object(w.jsx)(y,{children:null===o||void 0===o?void 0:o.meanings.map((function(e,t){return Object(w.jsxs)("li",{children:[Object(w.jsx)("div",{onClick:function(){return n&&n(e.partOfSpeech)},children:e.partOfSpeech}),Object(w.jsx)("ul",{children:e.definitions.map((function(t,n){return Object(w.jsx)("li",{onClick:function(){return c&&c({partOfSpeech:e.partOfSpeech,definition:t.definition})},children:t.definition},n)}))})]},t)}))})}var k=n(123),N=Object(k.b)({name:"dictionary",initialState:[],reducers:{create:{reducer:function(e,t){return e.concat(t.payload)},prepare:function(e){return{payload:Object(d.a)({id:Date.now()},e)}}},update:function(e,t){var n=e.findIndex((function(e){return e.id===t.payload.id}));return n>-1&&(e[n]=t.payload),e},delete:function(e,t){return e.filter((function(e){return e.id!==t.payload.id}))},answer:function(e,t){var n=t.payload,c=n.entity,r=n.isCorrect,a=e.find((function(e){return e.id===c.id}));a&&(a.answersCount++,r&&a.correctAnswersCount++)}}});function F(e){var t=Object(l.i)().id,n=Object(h.c)((function(e){return t?e.find((function(e){return e.id===parseInt(t)})):void 0})),c=Object(r.useState)(Object(d.a)({word:"",partOfSpeech:"",translation:"",definition:"",answersCount:0,correctAnswersCount:0},null!==n&&void 0!==n?n:{})),a=Object(b.a)(c,2),i=a[0],o=a[1],s=Object(l.g)(),u=function(){return s.push("/")},j=Object(h.b)();return Object(w.jsxs)(w.Fragment,{children:[Object(w.jsx)(O.a,{placeholder:"Word",value:i.word,onChange:function(e){return o(Object(d.a)(Object(d.a)({},i),{},{word:e.target.value}))}}),Object(w.jsx)(O.a,{placeholder:"Part ot speech",value:i.partOfSpeech,onChange:function(e){return o(Object(d.a)(Object(d.a)({},i),{},{partOfSpeech:e.target.value}))}}),Object(w.jsx)(O.a,{placeholder:"Translation",value:i.translation,onChange:function(e){return o(Object(d.a)(Object(d.a)({},i),{},{translation:e.target.value}))}}),Object(w.jsx)(O.a.TextArea,{placeholder:"Definition",value:i.definition,onChange:function(e){return o(Object(d.a)(Object(d.a)({},i),{},{definition:e.target.value}))}}),Object(w.jsx)(f.a,{type:"primary",onClick:function(){j(t?N.actions.update(i):N.actions.create(i)),u()},children:"Confirm"}),Object(w.jsx)(f.a,{type:"primary",danger:!0,onClick:function(){return u()},children:"Cancel"}),Object(w.jsx)(S,{word:i.word,onPartOfSpeechClick:function(e){return o((function(t){return Object(d.a)(Object(d.a)({},t),{},{partOfSpeech:e})}))},onDefinitionClick:function(e){return o((function(t){return Object(d.a)(Object(d.a)({},t),e)}))}})]})}function I(){var e=Object(l.j)().path;return Object(w.jsxs)(l.d,{children:[Object(w.jsx)(l.b,{path:"".concat(e,"/:id?"),component:F}),Object(w.jsx)(l.a,{to:"".concat(e)})]})}var A=n(499),T=n(500),P=n(501),D=n(237),J=n(497),L=n(230),E=n.n(L),z=n(80);function B(e){return Object(z.a)(e).sort((function(){return Math.random()>.5?1:-1}))}function M(e){return e.answersCount+e.correctAnswersCount}function W(e){var t=Object(l.g)(),n=Object(h.b)(),c=[{title:"Word",dataIndex:"word",ellipsis:{showTitle:!0}},{title:Object(w.jsx)(D.a,{title:"Total answers / Correct answers",children:"Total / Correct"}),render:function(e,t){return Object(w.jsxs)(w.Fragment,{children:[t.answersCount," / ",t.correctAnswersCount]})}},{title:function(){return Object(w.jsx)(f.a,{type:"primary",onClick:function(){return t.push("/record")},children:Object(w.jsx)(A.a,{})})},render:function(e,c){return Object(w.jsxs)(w.Fragment,{children:[Object(w.jsx)(f.a,{onClick:function(){return t.push("/record/".concat(c.id))},children:Object(w.jsx)(T.a,{})}),Object(w.jsx)(J.a,{title:"Are you sure to delete this?",onConfirm:function(){n(N.actions.delete(c))},children:Object(w.jsx)(f.a,{children:Object(w.jsx)(P.a,{})})})]})}}],r=Object(h.c)((function(e){return function(e,t){return Object(z.a)(e).sort(t)}(e,(function(e,t){var n,c;return(null!==(n=t.id)&&void 0!==n?n:0)-(null!==(c=e.id)&&void 0!==c?c:0)}))}));return Object(w.jsx)(w.Fragment,{children:Object(w.jsx)(E.a,{columns:c,dataSource:r,size:"middle",rowKey:"id"})})}var G=function(){var e=Object(l.j)().path;return Object(w.jsx)(l.d,{children:Object(w.jsx)(l.b,{path:"".concat(e),component:W})})},K=n(20);function R(e){var t=e.theme,n=e.children,c=e.className,r=Object(K.a)(e,["theme","children","className"]);return Object(w.jsx)("button",Object(d.a)(Object(d.a)({},r),{},{className:"btn btn-".concat(null!==t&&void 0!==t?t:"primary"," ").concat(null!==c&&void 0!==c?c:""),children:n}))}var U,_,q=function(e){var t=e.children,n=e.className,c=Object(K.a)(e,["children","className"]);return Object(w.jsx)("div",Object(d.a)(Object(d.a)({className:"card "+(null!==n&&void 0!==n?n:"")},c),{},{children:t}))},H=function(e){var t=e.children,n=e.className,c=Object(K.a)(e,["children","className"]);return Object(w.jsx)("div",Object(d.a)(Object(d.a)({className:"card-body "+(null!==n&&void 0!==n?n:"")},c),{},{children:t}))},Q=n(498),V=Object(j.a)(H)(U||(U=Object(s.a)(["\n  overflow: auto;\n"]))),X=function(){var e=Object(h.c)((function(e){return e})),t=function(e){var t=Object(r.useState)((function(){var t=e.filter((function(e){return""!==e.translation||""!==e.definition})).map((function(e){return{id:e.id,score:M(e)}})),n=Object(Q.a)((function(e,t){return e.score===t.score}),t).map((function(e){return B(e)})).reduce((function(e,t){return[].concat(Object(z.a)(e),Object(z.a)(t.map((function(e){var t;return null!==(t=e.id)&&void 0!==t?t:-1})).filter((function(e){return-1!==e}))))}),[]),c=n.pop();return{stack:n,selected:c}})),n=Object(b.a)(t,2),c=n[0].selected,a=n[1];return{selected:c,next:function(){return a((function(e){var t,n=Object(z.a)(null!==(t=null===e||void 0===e?void 0:e.stack)&&void 0!==t?t:[]),c=n.pop();return{stack:n,selected:c}}))}}}(e),n=t.selected,c=t.next,a=Object(r.useState)(!1),i=Object(b.a)(a,2),o=i[0],s=i[1],u=e.find((function(e){return e.id===n})),l=Object(h.b)(),j=function(e){u&&l(N.actions.answer({isCorrect:e,entity:u})),s(!1),c()};return u?Object(w.jsxs)(w.Fragment,{children:[Object(w.jsx)(q,{children:Object(w.jsxs)(H,{className:"text-center",children:[Object(w.jsx)("div",{children:u.translation}),Object(w.jsxs)("div",{children:["(",Object(w.jsx)("i",{children:u.partOfSpeech}),")"]})]})}),Object(w.jsx)(q,{children:Object(w.jsx)(V,{className:"text-center",children:u.definition})}),Object(w.jsx)(q,{children:Object(w.jsx)(H,{className:"text-center",children:o?u.word:"?"})}),o?Object(w.jsxs)(w.Fragment,{children:[Object(w.jsx)(R,{theme:"success",onClick:function(){return j(!0)},children:"I was correct"}),Object(w.jsx)(R,{theme:"danger",onClick:function(){return j(!1)},children:"I was incorrect"})]}):Object(w.jsx)(R,{onClick:function(){return s(!0)},children:"Reveal answer"})]}):null},Y=j.a.div(_||(_=Object(s.a)(["\n  height: 100%;\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n"])));function Z(e){var t=Object(l.g)();return Object(w.jsxs)(Y,{children:[Object(w.jsx)(X,{}),Object(w.jsx)(R,{onClick:function(){return t.push("/")},children:"End practice"})]})}function $(){var e=Object(l.j)().path;return Object(w.jsxs)(l.d,{children:[Object(w.jsx)(l.b,{path:"".concat(e),exact:!0,component:Z}),Object(w.jsx)(l.a,{to:e})]})}var ee,te=n(493),ne=n(492),ce=n(495),re=[{title:"List",path:"/list"},{title:"Practice",path:"/practice"}],ae=function(){var e=Object(l.g)(),t=Object(l.h)().pathname;return Object(w.jsx)(te.a,{variant:"dark",expand:"lg",collapseOnSelect:!0,children:Object(w.jsxs)(ne.a,{children:[Object(w.jsx)(te.a.Toggle,{style:{flexGrow:1}}),Object(w.jsx)(te.a.Collapse,{children:Object(w.jsx)(ce.a,{children:re.map((function(n,c){var r=n.title,a=n.path;return Object(w.jsx)(ce.a.Link,{href:"#",active:a===t,onSelect:function(){return e.push(a)},children:r},c)}))})})]})})},ie=j.a.div(ee||(ee=Object(s.a)(["\n  height: 100vh;\n  display: flex;\n  flex-direction: column;\n  font-size: calc(10px + 2vmin);\n"])));function oe(){return Object(w.jsx)(u.a,{children:Object(w.jsxs)(ie,{className:"bg-dark",children:[Object(w.jsx)(ae,{}),Object(w.jsxs)(l.d,{children:[Object(w.jsx)(l.b,{path:"/record",component:I}),Object(w.jsx)(l.b,{path:"/practice",component:$}),Object(w.jsx)(l.b,{path:"/list",component:G}),Object(w.jsx)(l.a,{to:"/list"})]})]})})}var se=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,502)).then((function(t){var n=t.getCLS,c=t.getFID,r=t.getFCP,a=t.getLCP,i=t.getTTFB;n(e),c(e),r(e),a(e),i(e)}))},ue=(n(479),n(480),n(481),"vocabulary"),le=localStorage.getItem(ue),je=Object(k.a)({reducer:N.reducer,preloadedState:le?JSON.parse(le):void 0});je.subscribe((function(){localStorage.setItem(ue,JSON.stringify(je.getState()))})),o.a.render(Object(w.jsx)(a.a.StrictMode,{children:Object(w.jsx)(h.a,{store:je,children:Object(w.jsx)(oe,{})})}),document.getElementById("root")),se()}},[[483,1,2]]]);
//# sourceMappingURL=main.b4ec2433.chunk.js.map