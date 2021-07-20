(this.webpackJsonpvocabulary=this.webpackJsonpvocabulary||[]).push([[0],{221:function(t,e,n){},455:function(t,e,n){},458:function(t,e,n){},460:function(t,e,n){"use strict";n.r(e);var r=n(0),c=n.n(r),i=n(31),a=n.n(i),o=n(30),s=n(51),u=n(41),j=(n(221),n(81)),l=n(28),d=n(84),f=n(466),b=n(7);function O(t){var e=t.word,n=t.onDefinitionClick,c=Object(r.useState)(),i=Object(u.a)(c,2),a=i[0],o=i[1];return Object(r.useEffect)((function(){if(""!==e){var t=new AbortController;return fetch("https://api.dictionaryapi.dev/api/v2/entries/en_US/".concat(e),{signal:t.signal}).then((function(t){return t.json()})).then((function(t){o(t[0])})).catch((function(t){return console.error(t)})),function(){return t.abort()}}o(void 0)}),[e]),Object(b.jsx)("ul",{children:null===a||void 0===a?void 0:a.meanings.map((function(t,e){return Object(b.jsxs)("li",{children:[t.partOfSpeech,Object(b.jsx)("ul",{children:t.definitions.map((function(e,r){return Object(b.jsx)("li",{onClick:function(){return n&&n({partOfSpeech:t.partOfSpeech,definition:e.definition})},children:e.definition},r)}))})]},e)}))})}function h(t){var e,n=t.records,c=t.onConfirm,i=Object(l.g)().id,a=Object(r.useState)(Object(o.a)({word:"",partOfSpeech:"",translation:"",definition:"",answersCount:0,correctAnswersCount:0},i&&null!==(e=n.find((function(t){return t.id===parseInt(i)})))&&void 0!==e?e:{})),s=Object(u.a)(a,2),j=s[0],h=s[1],p=Object(l.f)(),v=function(){return p.push("/")};return Object(b.jsxs)(b.Fragment,{children:[Object(b.jsx)(d.a,{type:"primary",danger:!0,onClick:function(){return v()},children:"Cancel"}),Object(b.jsx)(d.a,{type:"primary",onClick:function(){c&&c(j),v()},children:"Confirm"}),Object(b.jsx)(f.a,{placeholder:"Word",value:j.word,onChange:function(t){return h(Object(o.a)(Object(o.a)({},j),{},{word:t.target.value}))}}),Object(b.jsx)(f.a,{placeholder:"Pard ot speech",value:j.partOfSpeech,onChange:function(t){return h(Object(o.a)(Object(o.a)({},j),{},{partOfSpeech:t.target.value}))}}),Object(b.jsx)(f.a,{placeholder:"Translation",value:j.translation,onChange:function(t){return h(Object(o.a)(Object(o.a)({},j),{},{translation:t.target.value}))}}),Object(b.jsx)(f.a.TextArea,{placeholder:"Definition",value:j.definition,onChange:function(t){return h(Object(o.a)(Object(o.a)({},j),{},{definition:t.target.value}))}}),Object(b.jsx)(O,{word:j.word,onDefinitionClick:function(t){return h(Object(o.a)(Object(o.a)({},j),t))}})]})}var p=n(469),v=n(470),x=n(471),C=n(213),m=n(468),w=n(208),g=n.n(w);function y(t){var e=t.items,n=t.onDelete,r=Object(l.f)(),c=[{title:"Word",dataIndex:"word",ellipsis:{showTitle:!0}},{title:Object(b.jsx)(C.a,{title:"Total answers / Correct answers",children:"Total / Correct"}),render:function(t,e){return Object(b.jsxs)(b.Fragment,{children:[e.answersCount," / ",e.correctAnswersCount]})}},{title:function(){return Object(b.jsx)(d.a,{type:"primary",onClick:function(){return r.push("/add")},children:Object(b.jsx)(p.a,{})})},render:function(t,e){return Object(b.jsxs)(b.Fragment,{children:[Object(b.jsx)(d.a,{onClick:function(){return r.push("/edit/".concat(e.id))},children:Object(b.jsx)(v.a,{})}),Object(b.jsx)(m.a,{title:"Are you sure to delete this?",onConfirm:function(){return n&&n(e)},children:Object(b.jsx)(d.a,{children:Object(b.jsx)(x.a,{})})})]})}}];return Object(b.jsxs)(b.Fragment,{children:[Object(b.jsx)(d.a,{type:"primary",onClick:function(){return r.push("/practice")},children:"Practice"}),Object(b.jsx)(g.a,{columns:c,dataSource:e,size:"middle",rowKey:"id"})]})}var S=n(71),k=n(215);function A(t){var e=t.theme,n=t.children,r=t.className,c=Object(k.a)(t,["theme","children","className"]);return Object(b.jsx)("button",Object(o.a)(Object(o.a)({},c),{},{className:"btn btn-".concat(null!==e&&void 0!==e?e:"primary"," ").concat(null!==r&&void 0!==r?r:""),children:n}))}function F(t){return Object(s.a)(t).sort((function(){return Math.random()>.5?1:-1}))}function N(t,e){var n=F(e.filter((function(e){return e!==t}))).splice(0,3);return F([{isCorrect:!0,entity:t}].concat(Object(s.a)(n.map((function(t){return{isCorrect:!1,entity:t}})))))}function I(t){return t.answersCount+t.correctAnswersCount}function D(t,e){var n=[t,e].map(I),r=Object(u.a)(n,2),c=r[0];return r[1]-c}var R,T,E;n(455);!function(t){t[t.translation=0]="translation",t[t.definition=1]="definition"}(E||(E={}));var B=(R={},Object(S.a)(R,E.definition,(function(t){return""!==t.definition})),Object(S.a)(R,E.translation,(function(t){return""!==t.translation})),R),J=(T={},Object(S.a)(T,E.definition,(function(t){return t.definition})),Object(S.a)(T,E.translation,(function(t){return t.translation})),T);function P(t){var e=t.records,n=t.onAnswer,c=Object(r.useState)(),i=Object(u.a)(c,2),a=i[0],o=i[1],j=Object(r.useMemo)((function(){return void 0===a?void 0:e.filter(B[a])}),[e,a]),d=Object(r.useState)(),f=Object(u.a)(d,2),O=f[0],h=f[1];Object(r.useEffect)((function(){if(!O&&j){var t,e,n=(t=j,e=D,Object(s.a)(t).sort(e)),r=n.pop(),c=r?N(r,j):[];h({stack:n,actualRecord:r,actualAnswersSet:c})}}),[j,O]);var p=Object(r.useState)(),v=Object(u.a)(p,2),x=v[0],C=v[1],m=Object(l.f)();return void 0===a?Object(b.jsx)(b.Fragment,{children:[E.definition,E.translation].map((function(t){return Object(b.jsx)(A,{onClick:function(){return o(t)},children:E[t]},t)}))}):Object(b.jsxs)(b.Fragment,{children:[(null===O||void 0===O?void 0:O.actualRecord)&&Object(b.jsxs)("div",{style:{textAlign:"center"},children:[O.actualRecord.word," (",Object(b.jsx)("i",{children:O.actualRecord.partOfSpeech}),")"]}),Object(b.jsx)("div",{className:"ButtonsGrid",children:null===O||void 0===O?void 0:O.actualAnswersSet.map((function(t){return Object(b.jsx)(A,{className:"AnswerButton",disabled:Boolean(x),onClick:function(){return function(t){C(t),n&&(null===O||void 0===O?void 0:O.actualRecord)&&n({isCorrect:t.isCorrect,entity:O.actualRecord})}(t)},theme:t.isCorrect&&x?"success":t.isCorrect||t!==x?"secondary":"danger",children:J[a](t.entity)},t.entity.id)}))}),x&&Object(b.jsxs)(b.Fragment,{children:[Object(b.jsx)("div",{children:Object(b.jsx)("hr",{})}),Object(b.jsx)(A,{onClick:function(){h((function(t){var e,n=Object(s.a)(null!==(e=null===t||void 0===t?void 0:t.stack)&&void 0!==e?e:[]),r=n.pop();return{stack:n,actualRecord:r,actualAnswersSet:r?N(r,null!==j&&void 0!==j?j:[]):[]}})),C(void 0)},children:"Next word"})]}),Object(b.jsx)("div",{children:Object(b.jsx)("hr",{})}),Object(b.jsx)(A,{onClick:function(){return m.push("/")},children:"End practice"})]})}var M="vocabulary";function L(){var t=Object(r.useState)([]),e=Object(u.a)(t,2),n=e[0],c=e[1];Object(r.useEffect)((function(){var t=localStorage.getItem(M);t&&c(JSON.parse(t))}),[]),Object(r.useEffect)((function(){localStorage.setItem(M,JSON.stringify(n))}),[n]);return Object(b.jsx)("div",{className:"App",children:Object(b.jsx)(j.a,{children:Object(b.jsxs)(l.c,{children:[Object(b.jsx)(l.a,{path:"/add",children:Object(b.jsx)(h,{records:n,onConfirm:function(t){return c([Object(o.a)({id:Date.now()},t)].concat(Object(s.a)(n)))}})}),Object(b.jsx)(l.a,{path:"/edit/:id",children:Object(b.jsx)(h,{records:n,onConfirm:function(t){var e=n.findIndex((function(e){return e.id===t.id})),r=Object(s.a)(n);r[e]=t,c(r)}})}),Object(b.jsx)(l.a,{path:"/practice",children:Object(b.jsx)(P,{records:n,onAnswer:function(t){var e=t.isCorrect,r=t.entity,i=n.findIndex((function(t){return t.id===r.id})),a=Object(s.a)(n),u=a[i];a[i]=Object(o.a)(Object(o.a)({},u),{},{answersCount:u.answersCount+1,correctAnswersCount:u.correctAnswersCount+(e?1:0)}),c(a)}})}),Object(b.jsx)(l.a,{path:"/",children:Object(b.jsx)(y,{items:n,onDelete:function(t){c(n.filter((function(e){return e.id!==t.id})))}})})]})})})}var W=function(t){t&&t instanceof Function&&n.e(3).then(n.bind(null,472)).then((function(e){var n=e.getCLS,r=e.getFID,c=e.getFCP,i=e.getLCP,a=e.getTTFB;n(t),r(t),c(t),i(t),a(t)}))};n(456),n(457),n(458);a.a.render(Object(b.jsx)(c.a.StrictMode,{children:Object(b.jsx)(L,{})}),document.getElementById("root")),W()}},[[460,1,2]]]);
//# sourceMappingURL=main.2e95df02.chunk.js.map