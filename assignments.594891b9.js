!function(){var e=parcelRequire("b2736226bbcf175e104b7e710aa92180"),t={},n={},r="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{};function i(e){return(i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function o(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function a(e,t){return(a=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function c(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=s(e);if(t){var i=s(this).constructor;n=Reflect.construct(r,arguments,i)}else n=r.apply(this,arguments);return u(this,n)}}function u(e,t){return!t||"object"!==i(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function s(e){return(s=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}null==r.parcelRequire&&(r.parcelRequire=function(e){if(e in n&&(n[e](),delete n[e]),e in t)return t[e];if("undefined"!=typeof module&&"function"==typeof module.require)return module.require(e);var r=new Error("Cannot find module '"+e+"'");throw r.code="MODULE_NOT_FOUND",r},r.parcelRequire.register=function(e,n){t[e]=n},r.parcelRequire.registerBundle=function(e,r){n[e]=r,t[e]={}});var l=function(t){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&a(e,t)}(s,window.HTMLDivElement);var n,r,i,u=c(s);function s(){var e;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,s),(e=u.call(this)).assignmentTemplateId="#single-assignment",e.unsuscriber=null,e.render(),e}return n=s,i=[{key:"observedAttributes",get:function(){return["assignment-id"]}}],(r=[{key:"connectedCallback",value:function(){this.isConnected&&(this.unsuscriber=e().databaseManager.subscribe(this.render.bind(this)))}},{key:"disconnectedCallback",value:function(){this.unsuscriber&&this.unsuscriber()}},{key:"attributeChangedCallback",value:function(e,t,n){"assignment-id"===e&&t!==n&&this.render()}},{key:"render",value:function(){if(e().databaseManager.ready){this.classList.add("panel"),this.classList.add("is-success");var t=null,n=new window.URL(window.location.toString());if(this.hasAttribute("assignment-id"))t=this.getAttribute("assignment-id");else{if(!n.searchParams.has("assignment"))return;t=n.searchParams.get("assignment")}var r=e().databaseManager.getAssignment(t);if(r){var i=document.querySelector(this.assignmentTemplateId).content.cloneNode(!0),o=i.querySelector('[data-element="title-link"]');o.href="/wc-course-website/assignment/index.html?assignment=".concat(r.$loki),o.innerText=r.name;var a=this.getAttribute("delete-path");i.querySelector('[data-element="delete-button"]').onclick=function(){e().databaseManager.deleteAssignment(r),a&&(window.location.href=a)};var c=i.querySelector('[data-list="specfile"]').content;if(r.specfile){var u=c.cloneNode(!0);u.querySelector("div").appendChild(document.createTextNode(r.specfile.title)),i.appendChild(u)}var s=i.querySelector('[data-list="resources"]').content;r.resources&&r.resources.forEach((function(e){var t=s.cloneNode(!0);t.querySelector("div").appendChild(document.createTextNode(e.title)),i.appendChild(t)})),this.innerHTML="",this.appendChild(i)}}}}])&&o(n.prototype,r),i&&o(n,i),s}();window.customElements.define("single-assignment",l,{extends:"div"}),parcelRequire.register("2bdfa298c7645d53f818059b1880c5b4",(function(){return{}}))}();
//# sourceMappingURL=assignments.594891b9.js.map