!function(){var e=parcelRequire("779923dab9de5d978d909db2660c4851"),t=parcelRequire("80167699844891757ea7b41558fa2f98");function r(e){return e&&e.__esModule?e.default:e}var n={};
/*!
  Copyright (c) 2017 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/!function(){var e={}.hasOwnProperty;function t(){for(var r=[],n=0;n<arguments.length;n++){var o=arguments[n];if(o){var l=typeof o;if("string"===l||"number"===l)r.push(o);else if(Array.isArray(o)&&o.length){var a=t.apply(null,o);a&&r.push(a)}else if("object"===l)for(var c in o)e.call(o,c)&&o[c]&&r.push(c)}}return r.join(" ")}n?(t.default=t,n=t):window.classNames=t}();var o=r(n),l=function(e){var n,l=e.count,a=e.completedCount,c=e.nowShowing,i=e.setNowShowing,u=e.clearCompleted,f=l>0?"items":"item",m=null;a>0&&(m=(n=r(t())).createElement("button",{className:"clear-completed",onClick:u},"Clear completed"));return(n=r(t())).createElement("footer",{className:"footer"},n.createElement("span",{className:"todo-count"},n.createElement("strong",null,l)," ",f," left"),n.createElement("ul",{className:"filters"},n.createElement("li",null,n.createElement("a",{onClick:function(){return i("all")},className:o({selected:"all"===c})},"All"))," ",n.createElement("li",null,n.createElement("a",{onClick:function(){return i("active")},className:o({selected:"active"===c})},"Active"))," ",n.createElement("li",null,n.createElement("a",{onClick:function(){return i("completed")},className:o({selected:"completed"===c})},"Completed"))),m)};function a(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"==typeof Symbol||!(Symbol.iterator in Object(e)))return;var r=[],n=!0,o=!1,l=void 0;try{for(var a,c=e[Symbol.iterator]();!(n=(a=c.next()).done)&&(r.push(a.value),!t||r.length!==t);n=!0);}catch(e){o=!0,l=e}finally{try{n||null==c.return||c.return()}finally{if(o)throw l}}return r}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return c(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);"Object"===r&&e.constructor&&(r=e.constructor.name);if("Map"===r||"Set"===r)return Array.from(e);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return c(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function c(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}var i=function(e){var n=e.todo,l=e.model,c=a(t().useState(!1),2),i=c[0],u=c[1],f=a(t().useState(""),2),m=f[0],s=f[1],d=function(){var e=m.trim();e&&(l.editTodo(n.id,e),s(""),u(!1))},p=r(t());return p.createElement("li",{className:o({completed:n.completed,editing:i})},p.createElement("div",{className:"view"},p.createElement("input",{className:"toggle",type:"checkbox",checked:n.completed,onChange:function(){return l.toggle(n.id)}}),p.createElement("label",{onDoubleClick:function(){return u(!0)}},n.title),p.createElement("button",{className:"destroy",onClick:function(){return l.removeTodo(n.id)}})),p.createElement("input",{className:"edit",value:m,onBlur:d,onChange:function(e){s(e.target.value)},onKeyDown:function(e){"Enter"===e.key&&(e.preventDefault(),d())}}))};function u(e){return function(e){if(Array.isArray(e))return y(e)}(e)||function(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||p(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function f(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function m(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?f(Object(r),!0).forEach((function(t){s(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):f(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function s(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function d(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"==typeof Symbol||!(Symbol.iterator in Object(e)))return;var r=[],n=!0,o=!1,l=void 0;try{for(var a,c=e[Symbol.iterator]();!(n=(a=c.next()).done)&&(r.push(a.value),!t||r.length!==t);n=!0);}catch(e){o=!0,l=e}finally{try{n||null==c.return||c.return()}finally{if(o)throw l}}return r}(e,t)||p(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function p(e,t){if(e){if("string"==typeof e)return y(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?y(e,t):void 0}}function y(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}var b=0;function v(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"==typeof Symbol||!(Symbol.iterator in Object(e)))return;var r=[],n=!0,o=!1,l=void 0;try{for(var a,c=e[Symbol.iterator]();!(n=(a=c.next()).done)&&(r.push(a.value),!t||r.length!==t);n=!0);}catch(e){o=!0,l=e}finally{try{n||null==c.return||c.return()}finally{if(o)throw l}}return r}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return g(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);"Object"===r&&e.constructor&&(r=e.constructor.name);if("Map"===r||"Set"===r)return Array.from(e);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return g(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function g(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}var h=function(){var e=v(t().useState("all"),2),n=e[0],o=e[1],a=v(t().useState(""),2),c=a[0],f=a[1],s=function(){var e=d(t().useState([]),2),r=e[0],n=e[1];return{addTodo:function(e){b++,n([].concat(r,{id:b,title:e,completed:!1}))},editTodo:function(e,t){n(r.map((function(r){return r.id===e?m(m({},r),{},{title:t}):r})))},removeTodo:function(e){n(r.filter((function(t){return t.id!==e})))},all:function(){return u(r)},toggleAll:function(){var e=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];n(r.map((function(t){return m(m({},t),{},{completed:e})})))},toggle:function(e){n(r.map((function(t){return t.id===e?m(m({},t),{},{completed:!t.completed}):t})))}}}(),p=s.all(),y=p.filter((function(e){switch(n){case"active":return!e.completed;case"completed":return e.completed;default:return!0}})),g=p.reduce((function(e,t){return t.completed?e:e+1}),0),h=p.length-g,w=r(t());return w.createElement("div",null,w.createElement("header",{className:"header"},w.createElement("h1",null,"todos"),w.createElement("input",{className:"new-todo",placeholder:"What needs to be done?",value:c,onKeyDown:function(e){if("Enter"===e.key){e.preventDefault();var t=c.trim();t&&(s.addTodo(t),f(""))}},onChange:function(e){f(e.target.value)},autoFocus:!0})),p.length?w.createElement("section",{className:"main"},w.createElement("input",{id:"toggle-all",className:"toggle-all",type:"checkbox",onChange:s.toggleAll,checked:0===g}),w.createElement("label",{htmlFor:"toggle-all"}),w.createElement("ul",{className:"todo-list"},y.map((function(e){return w.createElement(i,{key:e.id,todo:e,model:s})})))):null,g||h?w.createElement(l,{count:g,completedCount:h,nowShowing:n,setNowShowing:o,clearCompleted:function(){return s.toggleAll(!1)}}):null)},w=r(e()),E=r(t());w.render(E.createElement(h,null),document.querySelector(".todoapp"))}();
//# sourceMappingURL=react-todo.cd61a03e.js.map
