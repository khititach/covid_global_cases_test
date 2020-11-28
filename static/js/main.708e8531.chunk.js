(this.webpackJsonpcovid_cases_test=this.webpackJsonpcovid_cases_test||[]).push([[0],{12:function(t,n,e){},35:function(t,n,e){},36:function(t,n,e){},55:function(t,n,e){"use strict";e.r(n);var a=e(1),c=e(0),s=e.n(c),r=e(26),i=e.n(r),o=(e(35),e(36),e(5),e(10)),u=(e(13),e(2));e(12);function l(){return Math.floor(100*Math.random())}l(),l(),l(),l(),l(),l(),l(),l(),l(),l();var b=e(14),j=e.n(b);function f(){return Object(a.jsx)("div",{children:"Loading Data"})}var d=function(){var t=Object(c.useState)(!0),n=Object(u.a)(t,2),e=n[0],s=n[1],r=Object(c.useState)([]),i=Object(u.a)(r,2),l=i[0],b=i[1],d=Object(c.useState)([]),h=Object(u.a)(d,2),O=h[0],v=h[1],p=Object(c.useState)([]),m=Object(u.a)(p,2),x=m[0],g=m[1],y=Object(c.useState)([]),S=Object(u.a)(y,2),N=S[0],w=S[1],E=Object(c.useState)([]),C=Object(u.a)(E,2),F=C[0],M=C[1],k=Object(c.useState)([]),B=Object(u.a)(k,2),D=B[0],I=B[1];Object(c.useEffect)((function(){j.a.get("https://disease.sh/v3/covid-19/countries?yesterday=false&twoDaysAgo=false&allowNull=false").then((function(t){var n=function(t){var n=[];return t.data.forEach((function(t){n.push(t.country)})),n}(t);b(n)}));var t="https://disease.sh/v3/covid-19/historical/"+l+"?lastdays=30";j.a.get(t).then((function(t){var n=function(t){var n=[],e=t.data.filter((function(t){return t.country})),a=Object.keys(e[0].timeline.cases),c=[],s=[];return a.forEach((function(t,a){var r=Math.max.apply(Math,Object(o.a)(e.map((function(n){return n.timeline.cases[t]}))));n.push(r),e.map((function(n,e){s[e]={country:n.country,cases:n.timeline.cases[t],beforePosition:e+1}})),c[t]=s,s=[],c[t].sort((function(t,n){return n.cases-t.cases})),c[t].forEach((function(t,n){Object.assign(t,{positionBar:n+1})})),c[t].sort((function(t,n){return t.beforePosition-n.beforePosition}))})),[e,a,n,c]}(t),e=Object(u.a)(n,4),a=e[0],c=e[1],r=e[2],i=e[3],l=function(t){for(var n=[],e=0;e<t.length;e++)n.push("#"+(16777216+16777215*Math.random()).toString(16).substr(1,6));return n}(a);v(c),g(a),w(r),M(l),I(i),s(!1)}))}),[]);var L=Object(c.useState)(0),P=Object(u.a)(L,2),T=P[0],_=P[1];return Object(c.useEffect)((function(){T>=29?setTimeout((function(){_(0)}),3e3):setTimeout((function(){_(T+1)}),1e3)})),e?Object(a.jsx)(f,{}):Object(a.jsxs)("div",{className:"header",children:[Object(a.jsx)("div",{className:"header-title",children:Object(a.jsx)("span",{children:"COVID GLOBAL CASES"})}),Object(a.jsx)("div",{className:"count-day",children:Object(a.jsxs)("span",{children:["Day : ",O[T]]})}),Object(a.jsx)("div",{className:"chart-body",children:Object(a.jsx)("div",{className:"chart-text",children:x.map((function(t,n){var e=t.timeline.cases[O[T]],c=parseInt(e/N[T]*100)+"%",s=D[O[T]][n].positionBar;return Object(a.jsxs)("div",{className:"country-bar",style:{top:60*s+"px",transition:"all 0.3s"},children:[Object(a.jsx)("div",{className:"bg-bar",style:{backgroundColor:F[n],width:c,transition:"all 0.3s"}}),Object(a.jsxs)("span",{className:"country-text",children:[t.country," (cases : ",e,") "]})]},n)}))})})]})},h=e(6),O=e(7);function v(){var t=Object(h.a)(["\n    position : absolute;\n    left: 15px;\n    top: 7px;\n    padding: 0;\n    margin : 0;\n"]);return v=function(){return t},t}function p(){var t=Object(h.a)(["\n  position: absolute;\n  transition: all 0.3s;\n  width: 100%;\n  top: ","%;\n"]);return p=function(){return t},t}function m(){var t=Object(h.a)(["\n    position: absolute;\n    transition: all 0.3s;\n    height: 30px;\n    background-color: ",";\n    width: ","%;\n"]);return m=function(){return t},t}function x(){var t=Object(h.a)(["\n    transition: all 0.3s;\n    position: relative;\n    width:100%;\n"]);return x=function(){return t},t}O.a.div(x()),O.a.div(m(),(function(t){return t.color}),(function(t){return parseInt((100*t.total/t.totalcases*5).toFixed(0))})),O.a.div(p(),(function(t){return 7*t.space})),O.a.p(v());var g=function(){return Object(a.jsx)(a.Fragment,{children:Object(a.jsx)(d,{})})},y=function(t){t&&t instanceof Function&&e.e(3).then(e.bind(null,56)).then((function(n){var e=n.getCLS,a=n.getFID,c=n.getFCP,s=n.getLCP,r=n.getTTFB;e(t),a(t),c(t),s(t),r(t)}))};i.a.render(Object(a.jsx)(s.a.StrictMode,{children:Object(a.jsx)(g,{})}),document.getElementById("root")),y()}},[[55,1,2]]]);
//# sourceMappingURL=main.708e8531.chunk.js.map