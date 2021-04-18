(this["webpackJsonp03_hooks-snake-game"]=this["webpackJsonp03_hooks-snake-game"]||[]).push([[0],{17:function(n,t,e){},24:function(n,t,e){"use strict";e.r(t);var c=e(2),i=e.n(c),a=e(12),s=e.n(a),r=(e(17),e(11)),o=e(3),u=function(n,t){for(var e=function(){var e=Math.floor(Math.random()*(n-2))+1,c=Math.floor(Math.random()*(n-2))+1;if(!t.some((function(n){return n.x===e&&n.y===c})))return{v:{x:e,y:c}}};;){var c=e();if("object"===typeof c)return c.v}},l=function(n,t){for(var e=[],c=0;c<n;c++){var i=new Array(n).fill("");e.push(i)}e[t.y][t.x]="snake";var a=u(n,[t]);return e[a.x][a.y]="food",e},b={x:17,y:17},j=l(35,b),d=[1e3,700,500,300,100],f=Object.freeze({init:"init",playing:"playing",suspend:"suspend",gameover:"gameover"}),h=Object.freeze({up:"up",right:"right",left:"left",down:"down"}),O=Object.freeze({up:"down",right:"left",left:"right",down:"up"}),m=Object.freeze({up:{x:0,y:-1},right:{x:1,y:0},left:{x:-1,y:0},down:{x:0,y:1}}),x=Object.freeze({37:h.left,38:h.up,39:h.right,40:h.down}),v=e(0),g=function(n){var t=n.status,e=n.onStart,c=n.onSuspend,i=n.onRestart;return Object(v.jsxs)("div",{className:"button",children:[t===f.gameover&&Object(v.jsx)("button",{className:"btn btn-gameover",onClick:i,children:"gameover"}),t===f.init&&Object(v.jsx)("button",{className:"btn btn-init",onClick:e,children:"start"}),t===f.suspend&&Object(v.jsx)("button",{className:"btn btn-suspended",onClick:e,children:"start"}),t===f.playing&&Object(v.jsx)("button",{className:"btn btn-playing",onClick:c,children:"stop"})]})},p=function(n){var t=n.fields;return Object(v.jsx)("div",{className:"field",children:t.map((function(n){return n.map((function(n){return Object(v.jsx)("div",{className:"dots ".concat(n)})}))}))})},y=e(7),N=e(5),k=function(n){var t=n.onChange;return Object(v.jsxs)("div",{className:"manipulation-panel",children:[Object(v.jsx)("button",{className:"manipulation-btn btn btn-left",onClick:function(){return t(h.left)},children:Object(v.jsx)(N.a,{icon:y.b})}),Object(v.jsxs)("div",{children:[Object(v.jsx)("button",{className:"manipulation-btn btn btn-up",onClick:function(){return t(h.up)},children:Object(v.jsx)(N.a,{icon:y.d})}),Object(v.jsx)("button",{className:"manipulation-btn btn btn-down",onClick:function(){return t(h.down)},children:Object(v.jsx)(N.a,{icon:y.a})})]}),Object(v.jsx)("button",{className:"manipulation-btn btn btn-right",onClick:function(){return t(h.right)},children:Object(v.jsx)(N.a,{icon:y.c})})]})},C=function(n){var t=n.length,e=n.difficulty,c=void 0===e?3:e,i=n.onChangeDifficulty,a=c<d.length?"":"is-hidden",s=c>1?"":"is-hidden";return Object(v.jsxs)("div",{className:"navigation",children:[Object(v.jsxs)("div",{className:"navigation-item",children:[Object(v.jsx)("span",{className:"navigation-label",children:"Length: "}),Object(v.jsx)("div",{className:"navigation-item-number-container",children:Object(v.jsx)("div",{className:"num-board",children:t})})]}),Object(v.jsxs)("div",{className:"navigation-item",children:[Object(v.jsx)("span",{className:"navigation-label",children:"Difficulty: "}),Object(v.jsxs)("div",{className:"navigation-item-number-container",children:[Object(v.jsx)("span",{className:"num-board",children:c}),Object(v.jsxs)("div",{className:"difficulty-button-container",children:[Object(v.jsx)("div",{className:"difficulty-button difficulty-up ".concat(a),onClick:function(){return i(c+1)}}),Object(v.jsx)("div",{className:"difficulty-button difficulty-down ".concat(s),onClick:function(){return i(c-1)}})]})]})]})]})},w=void 0,S=function(){w&&clearInterval(w)};var E=function(){var n=Object(c.useState)(j),t=Object(o.a)(n,2),e=t[0],i=t[1],a=Object(c.useState)([]),s=Object(o.a)(a,2),y=s[0],N=s[1],E=Object(c.useState)(f.init),z=Object(o.a)(E,2),I=z[0],L=z[1],M=Object(c.useState)(0),D=Object(o.a)(M,2),F=D[0],A=D[1],B=Object(c.useState)(3),J=Object(o.a)(B,2),P=J[0],R=J[1],T=Object(c.useState)(h.up),_=Object(o.a)(T,2),G=_[0],q=_[1],H=Object(c.useCallback)((function(n){I===f.playing&&O[G]!==n&&q(n)}),[G,I]),K=Object(c.useCallback)((function(n){I===f.init&&(n<1||n>d.length||R(n))}),[I,P]),Q=function(n,t){return t.y<0||t.x<0||(t.y>n-1||t.x>n-1)},U=function(n,t){return"snake"===n[t.y][t.x]};return Object(c.useEffect)((function(){return N([b]),w=setInterval((function(){A((function(n){return n+1}))}),d[P-1]),S}),[P]),Object(c.useEffect)((function(){0!==!y.length&&I===f.playing&&(function(){var n=y[0],t=n.x,c=n.y,a={x:t+m[G].x,y:c+m[G].y};if(Q(e.length,a)||U(e,a))return S(),!1;var s=Object(r.a)(y);if("food"!==e[a.y][a.x]){var o=s.pop();e[o.y][o.x]=""}else{var l=u(e.length,[].concat(Object(r.a)(s),[a]));e[l.y][l.x]="food"}return e[a.y][a.x]="snake",s.unshift(a),N(s),i(e),!0}()||(S(),L(f.gameover)))}),[F]),Object(c.useEffect)((function(){var n=function(n){var t=x[n.keyCode];t&&H(t)};return document.addEventListener("keydown",n),function(){return document.removeEventListener("keydown",n)}}),[H]),Object(v.jsxs)("div",{className:"App",children:[Object(v.jsxs)("header",{className:"header",children:[Object(v.jsx)("div",{className:"title-container",children:Object(v.jsx)("h1",{className:"title",children:"Snake Game"})}),Object(v.jsx)(C,{length:y.length,difficulty:P,onChangeDifficulty:K})]}),Object(v.jsx)("main",{className:"main",children:Object(v.jsx)(p,{fields:e})}),Object(v.jsxs)("footer",{className:"footer",children:[Object(v.jsx)(g,{status:I,onStart:function(){return L(f.playing)},onSuspend:function(){return L(f.suspend)},onRestart:function(){w=setInterval((function(){A((function(n){return n+1}))}),100),L(f.init),N([b]),q(h.up),i(l(35,b))}}),Object(v.jsx)(k,{onChange:H})]})]})},z=function(n){n&&n instanceof Function&&e.e(3).then(e.bind(null,25)).then((function(t){var e=t.getCLS,c=t.getFID,i=t.getFCP,a=t.getLCP,s=t.getTTFB;e(n),c(n),i(n),a(n),s(n)}))};s.a.render(Object(v.jsx)(i.a.StrictMode,{children:Object(v.jsx)(E,{})}),document.getElementById("root")),z()}},[[24,1,2]]]);
//# sourceMappingURL=main.149422c3.chunk.js.map