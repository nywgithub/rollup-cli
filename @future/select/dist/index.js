(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.future = global.future || {}));
}(this, (function (exports) { 'use strict';

    function styleInject(css, ref) {
      if ( ref === void 0 ) ref = {};
      var insertAt = ref.insertAt;

      if (!css || typeof document === 'undefined') { return; }

      var head = document.head || document.getElementsByTagName('head')[0];
      var style = document.createElement('style');
      style.type = 'text/css';

      if (insertAt === 'top') {
        if (head.firstChild) {
          head.insertBefore(style, head.firstChild);
        } else {
          head.appendChild(style);
        }
      } else {
        head.appendChild(style);
      }

      if (style.styleSheet) {
        style.styleSheet.cssText = css;
      } else {
        style.appendChild(document.createTextNode(css));
      }
    }

    var n,u$1,i$2,t$1,o$1,r$1={},f$1=[],e$1=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;function c$1(n,l){for(var u in l)n[u]=l[u];return n}function s$1(n){var l=n.parentNode;l&&l.removeChild(n);}function a$1(n,l,u){var i,t,o,r=arguments,f={};for(o in l)"key"==o?i=l[o]:"ref"==o?t=l[o]:f[o]=l[o];if(arguments.length>3)for(u=[u],o=3;o<arguments.length;o++)u.push(r[o]);if(null!=u&&(f.children=u),"function"==typeof n&&null!=n.defaultProps)for(o in n.defaultProps)void 0===f[o]&&(f[o]=n.defaultProps[o]);return v$1(n,f,i,t,null)}function v$1(l,u,i,t,o){var r={type:l,props:u,key:i,ref:t,__k:null,__:null,__b:0,__e:null,__d:void 0,__c:null,__h:null,constructor:void 0,__v:null==o?++n.__v:o};return null!=n.vnode&&n.vnode(r),r}function h$1(){return {current:null}}function y$1(n){return n.children}function p$1(n,l){this.props=n,this.context=l;}function d$1(n,l){if(null==l)return n.__?d$1(n.__,n.__.__k.indexOf(n)+1):null;for(var u;l<n.__k.length;l++)if(null!=(u=n.__k[l])&&null!=u.__e)return u.__e;return "function"==typeof n.type?d$1(n):null}function _$1(n){var l,u;if(null!=(n=n.__)&&null!=n.__c){for(n.__e=n.__c.base=null,l=0;l<n.__k.length;l++)if(null!=(u=n.__k[l])&&null!=u.__e){n.__e=n.__c.base=u.__e;break}return _$1(n)}}function k$2(l){(!l.__d&&(l.__d=!0)&&u$1.push(l)&&!b$1.__r++||t$1!==n.debounceRendering)&&((t$1=n.debounceRendering)||i$2)(b$1);}function b$1(){for(var n;b$1.__r=u$1.length;)n=u$1.sort(function(n,l){return n.__v.__b-l.__v.__b}),u$1=[],n.some(function(n){var l,u,i,t,o,r;n.__d&&(o=(t=(l=n).__v).__e,(r=l.__P)&&(u=[],(i=c$1({},t)).__v=t.__v+1,I$1(r,t,i,l.__n,void 0!==r.ownerSVGElement,null!=t.__h?[o]:null,u,null==o?d$1(t):o,t.__h),T$2(u,t),t.__e!=o&&_$1(t)));});}function m$1(n,l,u,i,t,o,e,c,s,a){var h,p,_,k,b,m,w,A=i&&i.__k||f$1,P=A.length;for(u.__k=[],h=0;h<l.length;h++)if(null!=(k=u.__k[h]=null==(k=l[h])||"boolean"==typeof k?null:"string"==typeof k||"number"==typeof k||"bigint"==typeof k?v$1(null,k,null,null,k):Array.isArray(k)?v$1(y$1,{children:k},null,null,null):k.__b>0?v$1(k.type,k.props,k.key,null,k.__v):k)){if(k.__=u,k.__b=u.__b+1,null===(_=A[h])||_&&k.key==_.key&&k.type===_.type)A[h]=void 0;else for(p=0;p<P;p++){if((_=A[p])&&k.key==_.key&&k.type===_.type){A[p]=void 0;break}_=null;}I$1(n,k,_=_||r$1,t,o,e,c,s,a),b=k.__e,(p=k.ref)&&_.ref!=p&&(w||(w=[]),_.ref&&w.push(_.ref,null,k),w.push(p,k.__c||b,k)),null!=b?(null==m&&(m=b),"function"==typeof k.type&&null!=k.__k&&k.__k===_.__k?k.__d=s=g$2(k,s,n):s=x$2(n,k,_,A,b,s),a||"option"!==u.type?"function"==typeof u.type&&(u.__d=s):n.value=""):s&&_.__e==s&&s.parentNode!=n&&(s=d$1(_));}for(u.__e=m,h=P;h--;)null!=A[h]&&("function"==typeof u.type&&null!=A[h].__e&&A[h].__e==u.__d&&(u.__d=d$1(i,h+1)),L$1(A[h],A[h]));if(w)for(h=0;h<w.length;h++)z$1(w[h],w[++h],w[++h]);}function g$2(n,l,u){var i,t;for(i=0;i<n.__k.length;i++)(t=n.__k[i])&&(t.__=n,l="function"==typeof t.type?g$2(t,l,u):x$2(u,t,t,n.__k,t.__e,l));return l}function w$2(n,l){return l=l||[],null==n||"boolean"==typeof n||(Array.isArray(n)?n.some(function(n){w$2(n,l);}):l.push(n)),l}function x$2(n,l,u,i,t,o){var r,f,e;if(void 0!==l.__d)r=l.__d,l.__d=void 0;else if(null==u||t!=o||null==t.parentNode)n:if(null==o||o.parentNode!==n)n.appendChild(t),r=null;else {for(f=o,e=0;(f=f.nextSibling)&&e<i.length;e+=2)if(f==t)break n;n.insertBefore(t,o),r=o;}return void 0!==r?r:t.nextSibling}function A$2(n,l,u,i,t){var o;for(o in u)"children"===o||"key"===o||o in l||C$1(n,o,null,u[o],i);for(o in l)t&&"function"!=typeof l[o]||"children"===o||"key"===o||"value"===o||"checked"===o||u[o]===l[o]||C$1(n,o,l[o],u[o],i);}function P$1(n,l,u){"-"===l[0]?n.setProperty(l,u):n[l]=null==u?"":"number"!=typeof u||e$1.test(l)?u:u+"px";}function C$1(n,l,u,i,t){var o;n:if("style"===l)if("string"==typeof u)n.style.cssText=u;else {if("string"==typeof i&&(n.style.cssText=i=""),i)for(l in i)u&&l in u||P$1(n.style,l,"");if(u)for(l in u)i&&u[l]===i[l]||P$1(n.style,l,u[l]);}else if("o"===l[0]&&"n"===l[1])o=l!==(l=l.replace(/Capture$/,"")),l=l.toLowerCase()in n?l.toLowerCase().slice(2):l.slice(2),n.l||(n.l={}),n.l[l+o]=u,u?i||n.addEventListener(l,o?H$1:$$3,o):n.removeEventListener(l,o?H$1:$$3,o);else if("dangerouslySetInnerHTML"!==l){if(t)l=l.replace(/xlink[H:h]/,"h").replace(/sName$/,"s");else if("href"!==l&&"list"!==l&&"form"!==l&&"tabIndex"!==l&&"download"!==l&&l in n)try{n[l]=null==u?"":u;break n}catch(n){}"function"==typeof u||(null!=u&&(!1!==u||"a"===l[0]&&"r"===l[1])?n.setAttribute(l,u):n.removeAttribute(l));}}function $$3(l){this.l[l.type+!1](n.event?n.event(l):l);}function H$1(l){this.l[l.type+!0](n.event?n.event(l):l);}function I$1(l,u,i,t,o,r,f,e,s){var a,v,h,d,_,k,b,g,w,x,A,P=u.type;if(void 0!==u.constructor)return null;null!=i.__h&&(s=i.__h,e=u.__e=i.__e,u.__h=null,r=[e]),(a=n.__b)&&a(u);try{n:if("function"==typeof P){if(g=u.props,w=(a=P.contextType)&&t[a.__c],x=a?w?w.props.value:a.__:t,i.__c?b=(v=u.__c=i.__c).__=v.__E:("prototype"in P&&P.prototype.render?u.__c=v=new P(g,x):(u.__c=v=new p$1(g,x),v.constructor=P,v.render=M$1),w&&w.sub(v),v.props=g,v.state||(v.state={}),v.context=x,v.__n=t,h=v.__d=!0,v.__h=[]),null==v.__s&&(v.__s=v.state),null!=P.getDerivedStateFromProps&&(v.__s==v.state&&(v.__s=c$1({},v.__s)),c$1(v.__s,P.getDerivedStateFromProps(g,v.__s))),d=v.props,_=v.state,h)null==P.getDerivedStateFromProps&&null!=v.componentWillMount&&v.componentWillMount(),null!=v.componentDidMount&&v.__h.push(v.componentDidMount);else {if(null==P.getDerivedStateFromProps&&g!==d&&null!=v.componentWillReceiveProps&&v.componentWillReceiveProps(g,x),!v.__e&&null!=v.shouldComponentUpdate&&!1===v.shouldComponentUpdate(g,v.__s,x)||u.__v===i.__v){v.props=g,v.state=v.__s,u.__v!==i.__v&&(v.__d=!1),v.__v=u,u.__e=i.__e,u.__k=i.__k,u.__k.forEach(function(n){n&&(n.__=u);}),v.__h.length&&f.push(v);break n}null!=v.componentWillUpdate&&v.componentWillUpdate(g,v.__s,x),null!=v.componentDidUpdate&&v.__h.push(function(){v.componentDidUpdate(d,_,k);});}v.context=x,v.props=g,v.state=v.__s,(a=n.__r)&&a(u),v.__d=!1,v.__v=u,v.__P=l,a=v.render(v.props,v.state,v.context),v.state=v.__s,null!=v.getChildContext&&(t=c$1(c$1({},t),v.getChildContext())),h||null==v.getSnapshotBeforeUpdate||(k=v.getSnapshotBeforeUpdate(d,_)),A=null!=a&&a.type===y$1&&null==a.key?a.props.children:a,m$1(l,Array.isArray(A)?A:[A],u,i,t,o,r,f,e,s),v.base=u.__e,u.__h=null,v.__h.length&&f.push(v),b&&(v.__E=v.__=null),v.__e=!1;}else null==r&&u.__v===i.__v?(u.__k=i.__k,u.__e=i.__e):u.__e=j$2(i.__e,u,i,t,o,r,f,s);(a=n.diffed)&&a(u);}catch(l){u.__v=null,(s||null!=r)&&(u.__e=e,u.__h=!!s,r[r.indexOf(e)]=null),n.__e(l,u,i);}}function T$2(l,u){n.__c&&n.__c(u,l),l.some(function(u){try{l=u.__h,u.__h=[],l.some(function(n){n.call(u);});}catch(l){n.__e(l,u.__v);}});}function j$2(n,l,u,i,t,o,e,c){var a,v,h,y,p=u.props,d=l.props,_=l.type,k=0;if("svg"===_&&(t=!0),null!=o)for(;k<o.length;k++)if((a=o[k])&&(a===n||(_?a.localName==_:3==a.nodeType))){n=a,o[k]=null;break}if(null==n){if(null===_)return document.createTextNode(d);n=t?document.createElementNS("http://www.w3.org/2000/svg",_):document.createElement(_,d.is&&d),o=null,c=!1;}if(null===_)p===d||c&&n.data===d||(n.data=d);else {if(o=o&&f$1.slice.call(n.childNodes),v=(p=u.props||r$1).dangerouslySetInnerHTML,h=d.dangerouslySetInnerHTML,!c){if(null!=o)for(p={},y=0;y<n.attributes.length;y++)p[n.attributes[y].name]=n.attributes[y].value;(h||v)&&(h&&(v&&h.__html==v.__html||h.__html===n.innerHTML)||(n.innerHTML=h&&h.__html||""));}if(A$2(n,d,p,t,c),h)l.__k=[];else if(k=l.props.children,m$1(n,Array.isArray(k)?k:[k],l,u,i,t&&"foreignObject"!==_,o,e,n.firstChild,c),null!=o)for(k=o.length;k--;)null!=o[k]&&s$1(o[k]);c||("value"in d&&void 0!==(k=d.value)&&(k!==n.value||"progress"===_&&!k)&&C$1(n,"value",k,p.value,!1),"checked"in d&&void 0!==(k=d.checked)&&k!==n.checked&&C$1(n,"checked",k,p.checked,!1));}return n}function z$1(l,u,i){try{"function"==typeof l?l(u):l.current=u;}catch(l){n.__e(l,i);}}function L$1(l,u,i){var t,o,r;if(n.unmount&&n.unmount(l),(t=l.ref)&&(t.current&&t.current!==l.__e||z$1(t,null,u)),i||"function"==typeof l.type||(i=null!=(o=l.__e)),l.__e=l.__d=void 0,null!=(t=l.__c)){if(t.componentWillUnmount)try{t.componentWillUnmount();}catch(l){n.__e(l,u);}t.base=t.__P=null;}if(t=l.__k)for(r=0;r<t.length;r++)t[r]&&L$1(t[r],u,i);null!=o&&s$1(o);}function M$1(n,l,u){return this.constructor(n,u)}function N$1(l,u,i){var t,o,e;n.__&&n.__(l,u),o=(t="function"==typeof i)?null:i&&i.__k||u.__k,e=[],I$1(u,l=(!t&&i||u).__k=a$1(y$1,null,[l]),o||r$1,r$1,void 0!==u.ownerSVGElement,!t&&i?[i]:o?null:u.firstChild?f$1.slice.call(u.childNodes):null,e,!t&&i?i:o?o.__e:u.firstChild,t),T$2(e,l);}function O$1(n,l){N$1(n,l,O$1);}function S$1(n,l,u){var i,t,o,r=arguments,f=c$1({},n.props);for(o in l)"key"==o?i=l[o]:"ref"==o?t=l[o]:f[o]=l[o];if(arguments.length>3)for(u=[u],o=3;o<arguments.length;o++)u.push(r[o]);return null!=u&&(f.children=u),v$1(n.type,f,i||n.key,t||n.ref,null)}function q$2(n,l){var u={__c:l="__cC"+o$1++,__:n,Consumer:function(n,l){return n.children(l)},Provider:function(n){var u,i;return this.getChildContext||(u=[],(i={})[l]=this,this.getChildContext=function(){return i},this.shouldComponentUpdate=function(n){this.props.value!==n.value&&u.some(k$2);},this.sub=function(n){u.push(n);var l=n.componentWillUnmount;n.componentWillUnmount=function(){u.splice(u.indexOf(n),1),l&&l.call(n);};}),n.children}};return u.Provider.__=u.Consumer.contextType=u}n={__e:function(n,l){for(var u,i,t;l=l.__;)if((u=l.__c)&&!u.__)try{if((i=u.constructor)&&null!=i.getDerivedStateFromError&&(u.setState(i.getDerivedStateFromError(n)),t=u.__d),null!=u.componentDidCatch&&(u.componentDidCatch(n),t=u.__d),t)return u.__E=u}catch(l){n=l;}throw n},__v:0},p$1.prototype.setState=function(n,l){var u;u=null!=this.__s&&this.__s!==this.state?this.__s:this.__s=c$1({},this.state),"function"==typeof n&&(n=n(c$1({},u),this.props)),n&&c$1(u,n),null!=n&&this.__v&&(l&&this.__h.push(l),k$2(this));},p$1.prototype.forceUpdate=function(n){this.__v&&(this.__e=!0,n&&this.__h.push(n),k$2(this));},p$1.prototype.render=y$1,u$1=[],i$2="function"==typeof Promise?Promise.prototype.then.bind(Promise.resolve()):setTimeout,b$1.__r=0,o$1=0;

    var t,u,r,o=0,i$1=[],c=n.__b,f=n.__r,e=n.diffed,a=n.__c,v=n.unmount;function m(t,r){n.__h&&n.__h(u,t,o||r),o=0;var i=u.__H||(u.__H={__:[],__h:[]});return t>=i.__.length&&i.__.push({}),i.__[t]}function l(n){return o=1,p(w$1,n)}function p(n,r,o){var i=m(t++,2);return i.t=n,i.__c||(i.__=[o?o(r):w$1(void 0,r),function(n){var t=i.t(i.__[0],n);i.__[0]!==t&&(i.__=[t,i.__[1]],i.__c.setState({}));}],i.__c=u),i.__}function y(r,o){var i=m(t++,3);!n.__s&&k$1(i.__H,o)&&(i.__=r,i.__H=o,u.__H.__h.push(i));}function h(r,o){var i=m(t++,4);!n.__s&&k$1(i.__H,o)&&(i.__=r,i.__H=o,u.__h.push(i));}function s(n){return o=5,d(function(){return {current:n}},[])}function _(n,t,u){o=6,h(function(){"function"==typeof n?n(t()):n&&(n.current=t());},null==u?u:u.concat(n));}function d(n,u){var r=m(t++,7);return k$1(r.__H,u)&&(r.__=n(),r.__H=u,r.__h=n),r.__}function A$1(n,t){return o=8,d(function(){return n},t)}function F$1(n){var r=u.context[n.__c],o=m(t++,9);return o.__c=n,r?(null==o.__&&(o.__=!0,r.sub(u)),r.props.value):n.__}function T$1(t,u){n.useDebugValue&&n.useDebugValue(u?u(t):t);}function q$1(n){var r=m(t++,10),o=l();return r.__=n,u.componentDidCatch||(u.componentDidCatch=function(n){r.__&&r.__(n),o[1](n);}),[o[0],function(){o[1](void 0);}]}function x$1(){i$1.forEach(function(t){if(t.__P)try{t.__H.__h.forEach(g$1),t.__H.__h.forEach(j$1),t.__H.__h=[];}catch(u){t.__H.__h=[],n.__e(u,t.__v);}}),i$1=[];}n.__b=function(n){u=null,c&&c(n);},n.__r=function(n){f&&f(n),t=0;var r=(u=n.__c).__H;r&&(r.__h.forEach(g$1),r.__h.forEach(j$1),r.__h=[]);},n.diffed=function(t){e&&e(t);var o=t.__c;o&&o.__H&&o.__H.__h.length&&(1!==i$1.push(o)&&r===n.requestAnimationFrame||((r=n.requestAnimationFrame)||function(n){var t,u=function(){clearTimeout(r),b&&cancelAnimationFrame(t),setTimeout(n);},r=setTimeout(u,100);b&&(t=requestAnimationFrame(u));})(x$1)),u=void 0;},n.__c=function(t,u){u.some(function(t){try{t.__h.forEach(g$1),t.__h=t.__h.filter(function(n){return !n.__||j$1(n)});}catch(r){u.some(function(n){n.__h&&(n.__h=[]);}),u=[],n.__e(r,t.__v);}}),a&&a(t,u);},n.unmount=function(t){v&&v(t);var u=t.__c;if(u&&u.__H)try{u.__H.__.forEach(g$1);}catch(t){n.__e(t,u.__v);}};var b="function"==typeof requestAnimationFrame;function g$1(n){var t=u;"function"==typeof n.__c&&n.__c(),u=t;}function j$1(n){var t=u;n.__c=n.__(),u=t;}function k$1(n,t){return !n||n.length!==t.length||t.some(function(t,u){return t!==n[u]})}function w$1(n,t){return "function"==typeof t?t(n):t}

    function C(n,t){for(var e in t)n[e]=t[e];return n}function S(n,t){for(var e in n)if("__source"!==e&&!(e in t))return !0;for(var r in t)if("__source"!==r&&n[r]!==t[r])return !0;return !1}function E(n){this.props=n;}function g(n,t){function e(n){var e=this.props.ref,r=e==n.ref;return !r&&e&&(e.call?e(null):e.current=null),t?!t(this.props,n)||!r:S(this.props,n)}function r(t){return this.shouldComponentUpdate=e,a$1(n,t)}return r.displayName="Memo("+(n.displayName||n.name)+")",r.prototype.isReactComponent=!0,r.__f=!0,r}(E.prototype=new p$1).isPureReactComponent=!0,E.prototype.shouldComponentUpdate=function(n,t){return S(this.props,n)||S(this.state,t)};var w=n.__b;n.__b=function(n){n.type&&n.type.__f&&n.ref&&(n.props.ref=n.ref,n.ref=null),w&&w(n);};var R="undefined"!=typeof Symbol&&Symbol.for&&Symbol.for("react.forward_ref")||3911;function x(n){function t(t,e){var r=C({},t);return delete r.ref,n(r,(e=t.ref||e)&&("object"!=typeof e||"current"in e)?e:null)}return t.$$typeof=R,t.render=t,t.prototype.isReactComponent=t.__f=!0,t.displayName="ForwardRef("+(n.displayName||n.name)+")",t}var N=function(n,t){return null==n?null:w$2(w$2(n).map(t))},k={map:N,forEach:N,count:function(n){return n?w$2(n).length:0},only:function(n){var t=w$2(n);if(1!==t.length)throw "Children.only";return t[0]},toArray:w$2},A=n.__e;n.__e=function(n,t,e){if(n.then)for(var r,u=t;u=u.__;)if((r=u.__c)&&r.__c)return null==t.__e&&(t.__e=e.__e,t.__k=e.__k),r.__c(n,t);A(n,t,e);};var O=n.unmount;function L(){this.__u=0,this.t=null,this.__b=null;}function U(n){var t=n.__.__c;return t&&t.__e&&t.__e(n)}function D(n){var t,e,r;function u(u){if(t||(t=n()).then(function(n){e=n.default||n;},function(n){r=n;}),r)throw r;if(!e)throw t;return a$1(e,u)}return u.displayName="Lazy",u.__f=!0,u}function F(){this.u=null,this.o=null;}n.unmount=function(n){var t=n.__c;t&&t.__R&&t.__R(),t&&!0===n.__h&&(n.type=null),O&&O(n);},(L.prototype=new p$1).__c=function(n,t){var e=t.__c,r=this;null==r.t&&(r.t=[]),r.t.push(e);var u=U(r.__v),o=!1,i=function(){o||(o=!0,e.__R=null,u?u(l):l());};e.__R=i;var l=function(){if(!--r.__u){if(r.state.__e){var n=r.state.__e;r.__v.__k[0]=function n(t,e,r){return t&&(t.__v=null,t.__k=t.__k&&t.__k.map(function(t){return n(t,e,r)}),t.__c&&t.__c.__P===e&&(t.__e&&r.insertBefore(t.__e,t.__d),t.__c.__e=!0,t.__c.__P=r)),t}(n,n.__c.__P,n.__c.__O);}var t;for(r.setState({__e:r.__b=null});t=r.t.pop();)t.forceUpdate();}},f=!0===t.__h;r.__u++||f||r.setState({__e:r.__b=r.__v.__k[0]}),n.then(i,i);},L.prototype.componentWillUnmount=function(){this.t=[];},L.prototype.render=function(n,t){if(this.__b){if(this.__v.__k){var e=document.createElement("div"),r=this.__v.__k[0].__c;this.__v.__k[0]=function n(t,e,r){return t&&(t.__c&&t.__c.__H&&(t.__c.__H.__.forEach(function(n){"function"==typeof n.__c&&n.__c();}),t.__c.__H=null),null!=(t=C({},t)).__c&&(t.__c.__P===r&&(t.__c.__P=e),t.__c=null),t.__k=t.__k&&t.__k.map(function(t){return n(t,e,r)})),t}(this.__b,e,r.__O=r.__P);}this.__b=null;}var u=t.__e&&a$1(y$1,null,n.fallback);return u&&(u.__h=null),[a$1(y$1,null,t.__e?null:n.children),u]};var M=function(n,t,e){if(++e[1]===e[0]&&n.o.delete(t),n.props.revealOrder&&("t"!==n.props.revealOrder[0]||!n.o.size))for(e=n.u;e;){for(;e.length>3;)e.pop()();if(e[1]<e[0])break;n.u=e=e[2];}};function T(n){return this.getChildContext=function(){return n.context},n.children}function j(n){var t=this,e=n.i;t.componentWillUnmount=function(){N$1(null,t.l),t.l=null,t.i=null;},t.i&&t.i!==e&&t.componentWillUnmount(),n.__v?(t.l||(t.i=e,t.l={nodeType:1,parentNode:e,childNodes:[],appendChild:function(n){this.childNodes.push(n),t.i.appendChild(n);},insertBefore:function(n,e){this.childNodes.push(n),t.i.appendChild(n);},removeChild:function(n){this.childNodes.splice(this.childNodes.indexOf(n)>>>1,1),t.i.removeChild(n);}}),N$1(a$1(T,{context:t.context},n.__v),t.l)):t.l&&t.componentWillUnmount();}function I(n,t){return a$1(j,{__v:n,i:t})}(F.prototype=new p$1).__e=function(n){var t=this,e=U(t.__v),r=t.o.get(n);return r[0]++,function(u){var o=function(){t.props.revealOrder?(r.push(u),M(t,n,r)):u();};e?e(o):o();}},F.prototype.render=function(n){this.u=null,this.o=new Map;var t=w$2(n.children);n.revealOrder&&"b"===n.revealOrder[0]&&t.reverse();for(var e=t.length;e--;)this.o.set(t[e],this.u=[1,0,this.u]);return n.children},F.prototype.componentDidUpdate=F.prototype.componentDidMount=function(){var n=this;this.o.forEach(function(t,e){M(n,e,t);});};var W="undefined"!=typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103,P=/^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|fill|flood|font|glyph(?!R)|horiz|marker(?!H|W|U)|overline|paint|stop|strikethrough|stroke|text(?!L)|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/,V=function(n){return ("undefined"!=typeof Symbol&&"symbol"==typeof Symbol()?/fil|che|rad/i:/fil|che|ra/i).test(n)};function z(n,t,e){return null==t.__k&&(t.textContent=""),N$1(n,t),"function"==typeof e&&e(),n?n.__c:null}function B(n,t,e){return O$1(n,t),"function"==typeof e&&e(),n?n.__c:null}p$1.prototype.isReactComponent={},["componentWillMount","componentWillReceiveProps","componentWillUpdate"].forEach(function(n){Object.defineProperty(p$1.prototype,n,{configurable:!0,get:function(){return this["UNSAFE_"+n]},set:function(t){Object.defineProperty(this,n,{configurable:!0,writable:!0,value:t});}});});var H=n.event;function Z(){}function Y(){return this.cancelBubble}function $$2(){return this.defaultPrevented}n.event=function(n){return H&&(n=H(n)),n.persist=Z,n.isPropagationStopped=Y,n.isDefaultPrevented=$$2,n.nativeEvent=n};var q,G={configurable:!0,get:function(){return this.class}},J=n.vnode;n.vnode=function(n){var t=n.type,e=n.props,r=e;if("string"==typeof t){for(var u in r={},e){var o=e[u];"value"===u&&"defaultValue"in e&&null==o||("defaultValue"===u&&"value"in e&&null==e.value?u="value":"download"===u&&!0===o?o="":/ondoubleclick/i.test(u)?u="ondblclick":/^onchange(textarea|input)/i.test(u+t)&&!V(e.type)?u="oninput":/^on(Ani|Tra|Tou|BeforeInp)/.test(u)?u=u.toLowerCase():P.test(u)?u=u.replace(/[A-Z0-9]/,"-$&").toLowerCase():null===o&&(o=void 0),r[u]=o);}"select"==t&&r.multiple&&Array.isArray(r.value)&&(r.value=w$2(e.children).forEach(function(n){n.props.selected=-1!=r.value.indexOf(n.props.value);})),"select"==t&&null!=r.defaultValue&&(r.value=w$2(e.children).forEach(function(n){n.props.selected=r.multiple?-1!=r.defaultValue.indexOf(n.props.value):r.defaultValue==n.props.value;})),n.props=r;}t&&e.class!=e.className&&(G.enumerable="className"in e,null!=e.className&&(r.class=e.className),Object.defineProperty(r,"className",G)),n.$$typeof=W,J&&J(n);};var K=n.__r;n.__r=function(n){K&&K(n),q=n.__c;};var Q={ReactCurrentDispatcher:{current:{readContext:function(n){return q.__n[n.__c].props.value}}}},X=1,nn=2,tn=3,en=4,rn=5;function un(n,t){return t()}var on="object"==typeof performance&&"function"==typeof performance.now?performance.now.bind(performance):function(){return Date.now()},ln="16.8.0";function fn(n){return a$1.bind(null,n)}function cn(n){return !!n&&n.$$typeof===W}function an(n){return cn(n)?S$1.apply(null,arguments):n}function sn(n){return !!n.__k&&(N$1(null,n),!0)}function hn(n){return n&&(n.base||1===n.nodeType&&n)||null}var pn=function(n,t){return n(t)},vn=y$1;var React$2 = {useState:l,useReducer:p,useEffect:y,useLayoutEffect:h,useRef:s,useImperativeHandle:_,useMemo:d,useCallback:A$1,useContext:F$1,useDebugValue:T$1,version:"16.8.0",Children:k,render:z,hydrate:B,unmountComponentAtNode:sn,createPortal:I,createElement:a$1,createContext:q$2,createFactory:fn,cloneElement:an,createRef:h$1,Fragment:y$1,isValidElement:cn,findDOMNode:hn,Component:p$1,PureComponent:E,memo:g,forwardRef:x,unstable_batchedUpdates:pn,StrictMode:y$1,Suspense:L,SuspenseList:F,lazy:D,__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED:Q};

    var compat_module = /*#__PURE__*/Object.freeze({
        __proto__: null,
        'default': React$2,
        version: ln,
        Children: k,
        render: z,
        hydrate: B,
        unmountComponentAtNode: sn,
        createPortal: I,
        createFactory: fn,
        cloneElement: an,
        isValidElement: cn,
        findDOMNode: hn,
        PureComponent: E,
        memo: g,
        forwardRef: x,
        unstable_batchedUpdates: pn,
        StrictMode: vn,
        Suspense: L,
        SuspenseList: F,
        lazy: D,
        __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: Q,
        unstable_ImmediatePriority: X,
        unstable_UserBlockingPriority: nn,
        unstable_NormalPriority: tn,
        unstable_LowPriority: en,
        unstable_IdlePriority: rn,
        unstable_runWithPriority: un,
        unstable_now: on,
        createElement: a$1,
        createContext: q$2,
        createRef: h$1,
        Fragment: y$1,
        Component: p$1,
        useState: l,
        useReducer: p,
        useEffect: y,
        useLayoutEffect: h,
        useRef: s,
        useImperativeHandle: _,
        useMemo: d,
        useCallback: A$1,
        useContext: F$1,
        useDebugValue: T$1,
        useErrorBoundary: q$1
    });

    function _extends$3() {
        _extends$3 = Object.assign || function (target) {
            for (var i = 1; i < arguments.length; i++) {
                var source = arguments[i];

                for (var key in source) {
                    if (Object.prototype.hasOwnProperty.call(source, key)) {
                        target[key] = source[key];
                    }
                }
            }

            return target;
        };

        return _extends$3.apply(this, arguments);
    }

    function Compose(Component) {
        return /*#__PURE__*/function () {
            function _class(el, props) {
                this.el = el;
                this.props = props;

                for (var key in this.props){
                    if(Object.prototype.hasOwnProperty.call(this.props, key)){
                        var callback = this.props[key];
                        if(typeof callback === "function"){
                            this.props[key] = callback.bind(this);
                        }
                    }
                }

                this.render();
            }

            var _proto = _class.prototype;

            _proto.render = function render() {
                React$2.render(React$2.createElement(Component, this.props), this.el);
            };

            _proto.setProps = function setProps(props) {
                this.props = _extends$3({}, this.props, props);
                this.render();
            };

            _proto.destroy = function destroy() {
                React$2.unmountComponentAtNode(this.el);
            };

            return _class;
        }();
    }

    function _extends$2() {
      _extends$2 = Object.assign || function (target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i];

          for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              target[key] = source[key];
            }
          }
        }

        return target;
      };

      return _extends$2.apply(this, arguments);
    }

    function _defineProperty$2(obj, key, value) {
      if (key in obj) {
        Object.defineProperty(obj, key, {
          value: value,
          enumerable: true,
          configurable: true,
          writable: true
        });
      } else {
        obj[key] = value;
      }

      return obj;
    }

    function _objectWithoutPropertiesLoose$1(source, excluded) {
      if (source == null) return {};
      var target = {};
      var sourceKeys = Object.keys(source);
      var key, i;

      for (i = 0; i < sourceKeys.length; i++) {
        key = sourceKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        target[key] = source[key];
      }

      return target;
    }

    function _objectWithoutProperties$1(source, excluded) {
      if (source == null) return {};
      var target = _objectWithoutPropertiesLoose$1(source, excluded);
      var key, i;

      if (Object.getOwnPropertySymbols) {
        var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

        for (i = 0; i < sourceSymbolKeys.length; i++) {
          key = sourceSymbolKeys[i];
          if (excluded.indexOf(key) >= 0) continue;
          if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
          target[key] = source[key];
        }
      }

      return target;
    }

    var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

    function getAugmentedNamespace(n) {
    	if (n.__esModule) return n;
    	var a = Object.defineProperty({}, '__esModule', {value: true});
    	Object.keys(n).forEach(function (k) {
    		var d = Object.getOwnPropertyDescriptor(n, k);
    		Object.defineProperty(a, k, d.get ? d : {
    			enumerable: true,
    			get: function () {
    				return n[k];
    			}
    		});
    	});
    	return a;
    }

    var fails$8 = function (exec) {
      try {
        return !!exec();
      } catch (error) {
        return true;
      }
    };

    var toString = {}.toString;

    var classofRaw = function (it) {
      return toString.call(it).slice(8, -1);
    };

    var fails$7 = fails$8;
    var classof$1 = classofRaw;

    var split = ''.split;

    // fallback for non-array-like ES3 and non-enumerable old V8 strings
    var indexedObject = fails$7(function () {
      // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
      // eslint-disable-next-line no-prototype-builtins -- safe
      return !Object('z').propertyIsEnumerable(0);
    }) ? function (it) {
      return classof$1(it) == 'String' ? split.call(it, '') : Object(it);
    } : Object;

    // `RequireObjectCoercible` abstract operation
    // https://tc39.es/ecma262/#sec-requireobjectcoercible
    var requireObjectCoercible$2 = function (it) {
      if (it == undefined) throw TypeError("Can't call method on " + it);
      return it;
    };

    // toObject with fallback for non-array-like ES3 strings
    var IndexedObject$1 = indexedObject;
    var requireObjectCoercible$1 = requireObjectCoercible$2;

    var toIndexedObject$4 = function (it) {
      return IndexedObject$1(requireObjectCoercible$1(it));
    };

    var check = function (it) {
      return it && it.Math == Math && it;
    };

    // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
    var global$d =
      // eslint-disable-next-line es/no-global-this -- safe
      check(typeof globalThis == 'object' && globalThis) ||
      check(typeof window == 'object' && window) ||
      // eslint-disable-next-line no-restricted-globals -- safe
      check(typeof self == 'object' && self) ||
      check(typeof commonjsGlobal == 'object' && commonjsGlobal) ||
      // eslint-disable-next-line no-new-func -- fallback
      (function () { return this; })() || Function('return this')();

    var shared$3 = {exports: {}};

    var global$c = global$d;

    var setGlobal$3 = function (key, value) {
      try {
        // eslint-disable-next-line es/no-object-defineproperty -- safe
        Object.defineProperty(global$c, key, { value: value, configurable: true, writable: true });
      } catch (error) {
        global$c[key] = value;
      } return value;
    };

    var global$b = global$d;
    var setGlobal$2 = setGlobal$3;

    var SHARED = '__core-js_shared__';
    var store$3 = global$b[SHARED] || setGlobal$2(SHARED, {});

    var sharedStore = store$3;

    var store$2 = sharedStore;

    (shared$3.exports = function (key, value) {
      return store$2[key] || (store$2[key] = value !== undefined ? value : {});
    })('versions', []).push({
      version: '3.18.0',
      mode: 'global',
      copyright: '© 2021 Denis Pushkarev (zloirock.ru)'
    });

    var requireObjectCoercible = requireObjectCoercible$2;

    // `ToObject` abstract operation
    // https://tc39.es/ecma262/#sec-toobject
    var toObject$3 = function (argument) {
      return Object(requireObjectCoercible(argument));
    };

    var toObject$2 = toObject$3;

    var hasOwnProperty$1 = {}.hasOwnProperty;

    var has$9 = Object.hasOwn || function hasOwn(it, key) {
      return hasOwnProperty$1.call(toObject$2(it), key);
    };

    var id = 0;
    var postfix = Math.random();

    var uid$2 = function (key) {
      return 'Symbol(' + String(key === undefined ? '' : key) + ')_' + (++id + postfix).toString(36);
    };

    // `isCallable` abstract operation
    // https://tc39.es/ecma262/#sec-iscallable
    var isCallable$d = function (argument) {
      return typeof argument === 'function';
    };

    var global$a = global$d;
    var isCallable$c = isCallable$d;

    var aFunction = function (argument) {
      return isCallable$c(argument) ? argument : undefined;
    };

    var getBuiltIn$4 = function (namespace, method) {
      return arguments.length < 2 ? aFunction(global$a[namespace]) : global$a[namespace] && global$a[namespace][method];
    };

    var getBuiltIn$3 = getBuiltIn$4;

    var engineUserAgent = getBuiltIn$3('navigator', 'userAgent') || '';

    var global$9 = global$d;
    var userAgent = engineUserAgent;

    var process = global$9.process;
    var Deno = global$9.Deno;
    var versions = process && process.versions || Deno && Deno.version;
    var v8 = versions && versions.v8;
    var match, version;

    if (v8) {
      match = v8.split('.');
      version = match[0] < 4 ? 1 : match[0] + match[1];
    } else if (userAgent) {
      match = userAgent.match(/Edge\/(\d+)/);
      if (!match || match[1] >= 74) {
        match = userAgent.match(/Chrome\/(\d+)/);
        if (match) version = match[1];
      }
    }

    var engineV8Version = version && +version;

    /* eslint-disable es/no-symbol -- required for testing */

    var V8_VERSION = engineV8Version;
    var fails$6 = fails$8;

    // eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing
    var nativeSymbol = !!Object.getOwnPropertySymbols && !fails$6(function () {
      var symbol = Symbol();
      // Chrome 38 Symbol has incorrect toString conversion
      // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances
      return !String(symbol) || !(Object(symbol) instanceof Symbol) ||
        // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
        !Symbol.sham && V8_VERSION && V8_VERSION < 41;
    });

    /* eslint-disable es/no-symbol -- required for testing */

    var NATIVE_SYMBOL$1 = nativeSymbol;

    var useSymbolAsUid = NATIVE_SYMBOL$1
      && !Symbol.sham
      && typeof Symbol.iterator == 'symbol';

    var global$8 = global$d;
    var shared$2 = shared$3.exports;
    var has$8 = has$9;
    var uid$1 = uid$2;
    var NATIVE_SYMBOL = nativeSymbol;
    var USE_SYMBOL_AS_UID$1 = useSymbolAsUid;

    var WellKnownSymbolsStore = shared$2('wks');
    var Symbol$1 = global$8.Symbol;
    var createWellKnownSymbol = USE_SYMBOL_AS_UID$1 ? Symbol$1 : Symbol$1 && Symbol$1.withoutSetter || uid$1;

    var wellKnownSymbol$6 = function (name) {
      if (!has$8(WellKnownSymbolsStore, name) || !(NATIVE_SYMBOL || typeof WellKnownSymbolsStore[name] == 'string')) {
        if (NATIVE_SYMBOL && has$8(Symbol$1, name)) {
          WellKnownSymbolsStore[name] = Symbol$1[name];
        } else {
          WellKnownSymbolsStore[name] = createWellKnownSymbol('Symbol.' + name);
        }
      } return WellKnownSymbolsStore[name];
    };

    var isCallable$b = isCallable$d;

    var isObject$5 = function (it) {
      return typeof it === 'object' ? it !== null : isCallable$b(it);
    };

    var isObject$4 = isObject$5;

    // `Assert: Type(argument) is Object`
    var anObject$5 = function (argument) {
      if (isObject$4(argument)) return argument;
      throw TypeError(String(argument) + ' is not an object');
    };

    var fails$5 = fails$8;

    // Detect IE8's incomplete defineProperty implementation
    var descriptors = !fails$5(function () {
      // eslint-disable-next-line es/no-object-defineproperty -- required for testing
      return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] != 7;
    });

    var objectDefineProperty = {};

    var global$7 = global$d;
    var isObject$3 = isObject$5;

    var document$1 = global$7.document;
    // typeof document.createElement is 'object' in old IE
    var EXISTS$1 = isObject$3(document$1) && isObject$3(document$1.createElement);

    var documentCreateElement$2 = function (it) {
      return EXISTS$1 ? document$1.createElement(it) : {};
    };

    var DESCRIPTORS$5 = descriptors;
    var fails$4 = fails$8;
    var createElement = documentCreateElement$2;

    // Thank's IE8 for his funny defineProperty
    var ie8DomDefine = !DESCRIPTORS$5 && !fails$4(function () {
      // eslint-disable-next-line es/no-object-defineproperty -- requied for testing
      return Object.defineProperty(createElement('div'), 'a', {
        get: function () { return 7; }
      }).a != 7;
    });

    var isCallable$a = isCallable$d;
    var getBuiltIn$2 = getBuiltIn$4;
    var USE_SYMBOL_AS_UID = useSymbolAsUid;

    var isSymbol$2 = USE_SYMBOL_AS_UID ? function (it) {
      return typeof it == 'symbol';
    } : function (it) {
      var $Symbol = getBuiltIn$2('Symbol');
      return isCallable$a($Symbol) && Object(it) instanceof $Symbol;
    };

    var tryToString$1 = function (argument) {
      try {
        return String(argument);
      } catch (error) {
        return 'Object';
      }
    };

    var isCallable$9 = isCallable$d;
    var tryToString = tryToString$1;

    // `Assert: IsCallable(argument) is true`
    var aCallable$2 = function (argument) {
      if (isCallable$9(argument)) return argument;
      throw TypeError(tryToString(argument) + ' is not a function');
    };

    var aCallable$1 = aCallable$2;

    // `GetMethod` abstract operation
    // https://tc39.es/ecma262/#sec-getmethod
    var getMethod$1 = function (V, P) {
      var func = V[P];
      return func == null ? undefined : aCallable$1(func);
    };

    var isCallable$8 = isCallable$d;
    var isObject$2 = isObject$5;

    // `OrdinaryToPrimitive` abstract operation
    // https://tc39.es/ecma262/#sec-ordinarytoprimitive
    var ordinaryToPrimitive$1 = function (input, pref) {
      var fn, val;
      if (pref === 'string' && isCallable$8(fn = input.toString) && !isObject$2(val = fn.call(input))) return val;
      if (isCallable$8(fn = input.valueOf) && !isObject$2(val = fn.call(input))) return val;
      if (pref !== 'string' && isCallable$8(fn = input.toString) && !isObject$2(val = fn.call(input))) return val;
      throw TypeError("Can't convert object to primitive value");
    };

    var isObject$1 = isObject$5;
    var isSymbol$1 = isSymbol$2;
    var getMethod = getMethod$1;
    var ordinaryToPrimitive = ordinaryToPrimitive$1;
    var wellKnownSymbol$5 = wellKnownSymbol$6;

    var TO_PRIMITIVE = wellKnownSymbol$5('toPrimitive');

    // `ToPrimitive` abstract operation
    // https://tc39.es/ecma262/#sec-toprimitive
    var toPrimitive$1 = function (input, pref) {
      if (!isObject$1(input) || isSymbol$1(input)) return input;
      var exoticToPrim = getMethod(input, TO_PRIMITIVE);
      var result;
      if (exoticToPrim) {
        if (pref === undefined) pref = 'default';
        result = exoticToPrim.call(input, pref);
        if (!isObject$1(result) || isSymbol$1(result)) return result;
        throw TypeError("Can't convert object to primitive value");
      }
      if (pref === undefined) pref = 'number';
      return ordinaryToPrimitive(input, pref);
    };

    var toPrimitive = toPrimitive$1;
    var isSymbol = isSymbol$2;

    // `ToPropertyKey` abstract operation
    // https://tc39.es/ecma262/#sec-topropertykey
    var toPropertyKey$2 = function (argument) {
      var key = toPrimitive(argument, 'string');
      return isSymbol(key) ? key : String(key);
    };

    var DESCRIPTORS$4 = descriptors;
    var IE8_DOM_DEFINE$1 = ie8DomDefine;
    var anObject$4 = anObject$5;
    var toPropertyKey$1 = toPropertyKey$2;

    // eslint-disable-next-line es/no-object-defineproperty -- safe
    var $defineProperty = Object.defineProperty;

    // `Object.defineProperty` method
    // https://tc39.es/ecma262/#sec-object.defineproperty
    objectDefineProperty.f = DESCRIPTORS$4 ? $defineProperty : function defineProperty(O, P, Attributes) {
      anObject$4(O);
      P = toPropertyKey$1(P);
      anObject$4(Attributes);
      if (IE8_DOM_DEFINE$1) try {
        return $defineProperty(O, P, Attributes);
      } catch (error) { /* empty */ }
      if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
      if ('value' in Attributes) O[P] = Attributes.value;
      return O;
    };

    var ceil = Math.ceil;
    var floor = Math.floor;

    // `ToInteger` abstract operation
    // https://tc39.es/ecma262/#sec-tointeger
    var toInteger$2 = function (argument) {
      return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor : ceil)(argument);
    };

    var toInteger$1 = toInteger$2;

    var min$1 = Math.min;

    // `ToLength` abstract operation
    // https://tc39.es/ecma262/#sec-tolength
    var toLength$2 = function (argument) {
      return argument > 0 ? min$1(toInteger$1(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
    };

    var toInteger = toInteger$2;

    var max = Math.max;
    var min = Math.min;

    // Helper for a popular repeating case of the spec:
    // Let integer be ? ToInteger(index).
    // If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
    var toAbsoluteIndex$1 = function (index, length) {
      var integer = toInteger(index);
      return integer < 0 ? max(integer + length, 0) : min(integer, length);
    };

    var toIndexedObject$3 = toIndexedObject$4;
    var toLength$1 = toLength$2;
    var toAbsoluteIndex = toAbsoluteIndex$1;

    // `Array.prototype.{ indexOf, includes }` methods implementation
    var createMethod$1 = function (IS_INCLUDES) {
      return function ($this, el, fromIndex) {
        var O = toIndexedObject$3($this);
        var length = toLength$1(O.length);
        var index = toAbsoluteIndex(fromIndex, length);
        var value;
        // Array#includes uses SameValueZero equality algorithm
        // eslint-disable-next-line no-self-compare -- NaN check
        if (IS_INCLUDES && el != el) while (length > index) {
          value = O[index++];
          // eslint-disable-next-line no-self-compare -- NaN check
          if (value != value) return true;
        // Array#indexOf ignores holes, Array#includes - not
        } else for (;length > index; index++) {
          if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
        } return !IS_INCLUDES && -1;
      };
    };

    var arrayIncludes = {
      // `Array.prototype.includes` method
      // https://tc39.es/ecma262/#sec-array.prototype.includes
      includes: createMethod$1(true),
      // `Array.prototype.indexOf` method
      // https://tc39.es/ecma262/#sec-array.prototype.indexof
      indexOf: createMethod$1(false)
    };

    var hiddenKeys$4 = {};

    var has$7 = has$9;
    var toIndexedObject$2 = toIndexedObject$4;
    var indexOf = arrayIncludes.indexOf;
    var hiddenKeys$3 = hiddenKeys$4;

    var objectKeysInternal = function (object, names) {
      var O = toIndexedObject$2(object);
      var i = 0;
      var result = [];
      var key;
      for (key in O) !has$7(hiddenKeys$3, key) && has$7(O, key) && result.push(key);
      // Don't enum bug & hidden keys
      while (names.length > i) if (has$7(O, key = names[i++])) {
        ~indexOf(result, key) || result.push(key);
      }
      return result;
    };

    // IE8- don't enum bug keys
    var enumBugKeys$3 = [
      'constructor',
      'hasOwnProperty',
      'isPrototypeOf',
      'propertyIsEnumerable',
      'toLocaleString',
      'toString',
      'valueOf'
    ];

    var internalObjectKeys$1 = objectKeysInternal;
    var enumBugKeys$2 = enumBugKeys$3;

    // `Object.keys` method
    // https://tc39.es/ecma262/#sec-object.keys
    // eslint-disable-next-line es/no-object-keys -- safe
    var objectKeys$1 = Object.keys || function keys(O) {
      return internalObjectKeys$1(O, enumBugKeys$2);
    };

    var DESCRIPTORS$3 = descriptors;
    var definePropertyModule$3 = objectDefineProperty;
    var anObject$3 = anObject$5;
    var objectKeys = objectKeys$1;

    // `Object.defineProperties` method
    // https://tc39.es/ecma262/#sec-object.defineproperties
    // eslint-disable-next-line es/no-object-defineproperties -- safe
    var objectDefineProperties = DESCRIPTORS$3 ? Object.defineProperties : function defineProperties(O, Properties) {
      anObject$3(O);
      var keys = objectKeys(Properties);
      var length = keys.length;
      var index = 0;
      var key;
      while (length > index) definePropertyModule$3.f(O, key = keys[index++], Properties[key]);
      return O;
    };

    var getBuiltIn$1 = getBuiltIn$4;

    var html$2 = getBuiltIn$1('document', 'documentElement');

    var shared$1 = shared$3.exports;
    var uid = uid$2;

    var keys = shared$1('keys');

    var sharedKey$3 = function (key) {
      return keys[key] || (keys[key] = uid(key));
    };

    /* global ActiveXObject -- old IE, WSH */

    var anObject$2 = anObject$5;
    var defineProperties = objectDefineProperties;
    var enumBugKeys$1 = enumBugKeys$3;
    var hiddenKeys$2 = hiddenKeys$4;
    var html$1 = html$2;
    var documentCreateElement$1 = documentCreateElement$2;
    var sharedKey$2 = sharedKey$3;

    var GT = '>';
    var LT = '<';
    var PROTOTYPE = 'prototype';
    var SCRIPT = 'script';
    var IE_PROTO$1 = sharedKey$2('IE_PROTO');

    var EmptyConstructor = function () { /* empty */ };

    var scriptTag = function (content) {
      return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
    };

    // Create object with fake `null` prototype: use ActiveX Object with cleared prototype
    var NullProtoObjectViaActiveX = function (activeXDocument) {
      activeXDocument.write(scriptTag(''));
      activeXDocument.close();
      var temp = activeXDocument.parentWindow.Object;
      activeXDocument = null; // avoid memory leak
      return temp;
    };

    // Create object with fake `null` prototype: use iframe Object with cleared prototype
    var NullProtoObjectViaIFrame = function () {
      // Thrash, waste and sodomy: IE GC bug
      var iframe = documentCreateElement$1('iframe');
      var JS = 'java' + SCRIPT + ':';
      var iframeDocument;
      iframe.style.display = 'none';
      html$1.appendChild(iframe);
      // https://github.com/zloirock/core-js/issues/475
      iframe.src = String(JS);
      iframeDocument = iframe.contentWindow.document;
      iframeDocument.open();
      iframeDocument.write(scriptTag('document.F=Object'));
      iframeDocument.close();
      return iframeDocument.F;
    };

    // Check for document.domain and active x support
    // No need to use active x approach when document.domain is not set
    // see https://github.com/es-shims/es5-shim/issues/150
    // variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
    // avoid IE GC bug
    var activeXDocument;
    var NullProtoObject = function () {
      try {
        activeXDocument = new ActiveXObject('htmlfile');
      } catch (error) { /* ignore */ }
      NullProtoObject = typeof document != 'undefined'
        ? document.domain && activeXDocument
          ? NullProtoObjectViaActiveX(activeXDocument) // old IE
          : NullProtoObjectViaIFrame()
        : NullProtoObjectViaActiveX(activeXDocument); // WSH
      var length = enumBugKeys$1.length;
      while (length--) delete NullProtoObject[PROTOTYPE][enumBugKeys$1[length]];
      return NullProtoObject();
    };

    hiddenKeys$2[IE_PROTO$1] = true;

    // `Object.create` method
    // https://tc39.es/ecma262/#sec-object.create
    var objectCreate = Object.create || function create(O, Properties) {
      var result;
      if (O !== null) {
        EmptyConstructor[PROTOTYPE] = anObject$2(O);
        result = new EmptyConstructor();
        EmptyConstructor[PROTOTYPE] = null;
        // add "__proto__" for Object.getPrototypeOf polyfill
        result[IE_PROTO$1] = O;
      } else result = NullProtoObject();
      return Properties === undefined ? result : defineProperties(result, Properties);
    };

    var wellKnownSymbol$4 = wellKnownSymbol$6;
    var create$1 = objectCreate;
    var definePropertyModule$2 = objectDefineProperty;

    var UNSCOPABLES = wellKnownSymbol$4('unscopables');
    var ArrayPrototype = Array.prototype;

    // Array.prototype[@@unscopables]
    // https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
    if (ArrayPrototype[UNSCOPABLES] == undefined) {
      definePropertyModule$2.f(ArrayPrototype, UNSCOPABLES, {
        configurable: true,
        value: create$1(null)
      });
    }

    // add a key to Array.prototype[@@unscopables]
    var addToUnscopables$1 = function (key) {
      ArrayPrototype[UNSCOPABLES][key] = true;
    };

    var isCallable$7 = isCallable$d;
    var store$1 = sharedStore;

    var functionToString = Function.toString;

    // this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper
    if (!isCallable$7(store$1.inspectSource)) {
      store$1.inspectSource = function (it) {
        return functionToString.call(it);
      };
    }

    var inspectSource$2 = store$1.inspectSource;

    var global$6 = global$d;
    var isCallable$6 = isCallable$d;
    var inspectSource$1 = inspectSource$2;

    var WeakMap$1 = global$6.WeakMap;

    var nativeWeakMap = isCallable$6(WeakMap$1) && /native code/.test(inspectSource$1(WeakMap$1));

    var createPropertyDescriptor$3 = function (bitmap, value) {
      return {
        enumerable: !(bitmap & 1),
        configurable: !(bitmap & 2),
        writable: !(bitmap & 4),
        value: value
      };
    };

    var DESCRIPTORS$2 = descriptors;
    var definePropertyModule$1 = objectDefineProperty;
    var createPropertyDescriptor$2 = createPropertyDescriptor$3;

    var createNonEnumerableProperty$5 = DESCRIPTORS$2 ? function (object, key, value) {
      return definePropertyModule$1.f(object, key, createPropertyDescriptor$2(1, value));
    } : function (object, key, value) {
      object[key] = value;
      return object;
    };

    var NATIVE_WEAK_MAP = nativeWeakMap;
    var global$5 = global$d;
    var isObject = isObject$5;
    var createNonEnumerableProperty$4 = createNonEnumerableProperty$5;
    var objectHas = has$9;
    var shared = sharedStore;
    var sharedKey$1 = sharedKey$3;
    var hiddenKeys$1 = hiddenKeys$4;

    var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
    var WeakMap = global$5.WeakMap;
    var set, get, has$6;

    var enforce = function (it) {
      return has$6(it) ? get(it) : set(it, {});
    };

    var getterFor = function (TYPE) {
      return function (it) {
        var state;
        if (!isObject(it) || (state = get(it)).type !== TYPE) {
          throw TypeError('Incompatible receiver, ' + TYPE + ' required');
        } return state;
      };
    };

    if (NATIVE_WEAK_MAP || shared.state) {
      var store = shared.state || (shared.state = new WeakMap());
      var wmget = store.get;
      var wmhas = store.has;
      var wmset = store.set;
      set = function (it, metadata) {
        if (wmhas.call(store, it)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
        metadata.facade = it;
        wmset.call(store, it, metadata);
        return metadata;
      };
      get = function (it) {
        return wmget.call(store, it) || {};
      };
      has$6 = function (it) {
        return wmhas.call(store, it);
      };
    } else {
      var STATE = sharedKey$1('state');
      hiddenKeys$1[STATE] = true;
      set = function (it, metadata) {
        if (objectHas(it, STATE)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
        metadata.facade = it;
        createNonEnumerableProperty$4(it, STATE, metadata);
        return metadata;
      };
      get = function (it) {
        return objectHas(it, STATE) ? it[STATE] : {};
      };
      has$6 = function (it) {
        return objectHas(it, STATE);
      };
    }

    var internalState = {
      set: set,
      get: get,
      has: has$6,
      enforce: enforce,
      getterFor: getterFor
    };

    var objectGetOwnPropertyDescriptor = {};

    var objectPropertyIsEnumerable = {};

    var $propertyIsEnumerable = {}.propertyIsEnumerable;
    // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
    var getOwnPropertyDescriptor$1 = Object.getOwnPropertyDescriptor;

    // Nashorn ~ JDK8 bug
    var NASHORN_BUG = getOwnPropertyDescriptor$1 && !$propertyIsEnumerable.call({ 1: 2 }, 1);

    // `Object.prototype.propertyIsEnumerable` method implementation
    // https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
    objectPropertyIsEnumerable.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
      var descriptor = getOwnPropertyDescriptor$1(this, V);
      return !!descriptor && descriptor.enumerable;
    } : $propertyIsEnumerable;

    var DESCRIPTORS$1 = descriptors;
    var propertyIsEnumerableModule = objectPropertyIsEnumerable;
    var createPropertyDescriptor$1 = createPropertyDescriptor$3;
    var toIndexedObject$1 = toIndexedObject$4;
    var toPropertyKey = toPropertyKey$2;
    var has$5 = has$9;
    var IE8_DOM_DEFINE = ie8DomDefine;

    // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
    var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

    // `Object.getOwnPropertyDescriptor` method
    // https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
    objectGetOwnPropertyDescriptor.f = DESCRIPTORS$1 ? $getOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
      O = toIndexedObject$1(O);
      P = toPropertyKey(P);
      if (IE8_DOM_DEFINE) try {
        return $getOwnPropertyDescriptor(O, P);
      } catch (error) { /* empty */ }
      if (has$5(O, P)) return createPropertyDescriptor$1(!propertyIsEnumerableModule.f.call(O, P), O[P]);
    };

    var redefine$3 = {exports: {}};

    var DESCRIPTORS = descriptors;
    var has$4 = has$9;

    var FunctionPrototype = Function.prototype;
    // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
    var getDescriptor = DESCRIPTORS && Object.getOwnPropertyDescriptor;

    var EXISTS = has$4(FunctionPrototype, 'name');
    // additional protection from minified / mangled / dropped function names
    var PROPER = EXISTS && (function something() { /* empty */ }).name === 'something';
    var CONFIGURABLE = EXISTS && (!DESCRIPTORS || (DESCRIPTORS && getDescriptor(FunctionPrototype, 'name').configurable));

    var functionName = {
      EXISTS: EXISTS,
      PROPER: PROPER,
      CONFIGURABLE: CONFIGURABLE
    };

    var global$4 = global$d;
    var isCallable$5 = isCallable$d;
    var has$3 = has$9;
    var createNonEnumerableProperty$3 = createNonEnumerableProperty$5;
    var setGlobal$1 = setGlobal$3;
    var inspectSource = inspectSource$2;
    var InternalStateModule$1 = internalState;
    var CONFIGURABLE_FUNCTION_NAME$1 = functionName.CONFIGURABLE;

    var getInternalState$1 = InternalStateModule$1.get;
    var enforceInternalState = InternalStateModule$1.enforce;
    var TEMPLATE = String(String).split('String');

    (redefine$3.exports = function (O, key, value, options) {
      var unsafe = options ? !!options.unsafe : false;
      var simple = options ? !!options.enumerable : false;
      var noTargetGet = options ? !!options.noTargetGet : false;
      var name = options && options.name !== undefined ? options.name : key;
      var state;
      if (isCallable$5(value)) {
        if (String(name).slice(0, 7) === 'Symbol(') {
          name = '[' + String(name).replace(/^Symbol\(([^)]*)\)/, '$1') + ']';
        }
        if (!has$3(value, 'name') || (CONFIGURABLE_FUNCTION_NAME$1 && value.name !== name)) {
          createNonEnumerableProperty$3(value, 'name', name);
        }
        state = enforceInternalState(value);
        if (!state.source) {
          state.source = TEMPLATE.join(typeof name == 'string' ? name : '');
        }
      }
      if (O === global$4) {
        if (simple) O[key] = value;
        else setGlobal$1(key, value);
        return;
      } else if (!unsafe) {
        delete O[key];
      } else if (!noTargetGet && O[key]) {
        simple = true;
      }
      if (simple) O[key] = value;
      else createNonEnumerableProperty$3(O, key, value);
    // add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
    })(Function.prototype, 'toString', function toString() {
      return isCallable$5(this) && getInternalState$1(this).source || inspectSource(this);
    });

    var objectGetOwnPropertyNames = {};

    var internalObjectKeys = objectKeysInternal;
    var enumBugKeys = enumBugKeys$3;

    var hiddenKeys = enumBugKeys.concat('length', 'prototype');

    // `Object.getOwnPropertyNames` method
    // https://tc39.es/ecma262/#sec-object.getownpropertynames
    // eslint-disable-next-line es/no-object-getownpropertynames -- safe
    objectGetOwnPropertyNames.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
      return internalObjectKeys(O, hiddenKeys);
    };

    var objectGetOwnPropertySymbols = {};

    // eslint-disable-next-line es/no-object-getownpropertysymbols -- safe
    objectGetOwnPropertySymbols.f = Object.getOwnPropertySymbols;

    var getBuiltIn = getBuiltIn$4;
    var getOwnPropertyNamesModule = objectGetOwnPropertyNames;
    var getOwnPropertySymbolsModule = objectGetOwnPropertySymbols;
    var anObject$1 = anObject$5;

    // all object keys, includes non-enumerable and symbols
    var ownKeys$3 = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
      var keys = getOwnPropertyNamesModule.f(anObject$1(it));
      var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
      return getOwnPropertySymbols ? keys.concat(getOwnPropertySymbols(it)) : keys;
    };

    var has$2 = has$9;
    var ownKeys$2 = ownKeys$3;
    var getOwnPropertyDescriptorModule = objectGetOwnPropertyDescriptor;
    var definePropertyModule = objectDefineProperty;

    var copyConstructorProperties$1 = function (target, source) {
      var keys = ownKeys$2(source);
      var defineProperty = definePropertyModule.f;
      var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
      for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        if (!has$2(target, key)) defineProperty(target, key, getOwnPropertyDescriptor(source, key));
      }
    };

    var fails$3 = fails$8;
    var isCallable$4 = isCallable$d;

    var replacement = /#|\.prototype\./;

    var isForced$1 = function (feature, detection) {
      var value = data[normalize(feature)];
      return value == POLYFILL ? true
        : value == NATIVE ? false
        : isCallable$4(detection) ? fails$3(detection)
        : !!detection;
    };

    var normalize = isForced$1.normalize = function (string) {
      return String(string).replace(replacement, '.').toLowerCase();
    };

    var data = isForced$1.data = {};
    var NATIVE = isForced$1.NATIVE = 'N';
    var POLYFILL = isForced$1.POLYFILL = 'P';

    var isForced_1 = isForced$1;

    var global$3 = global$d;
    var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;
    var createNonEnumerableProperty$2 = createNonEnumerableProperty$5;
    var redefine$2 = redefine$3.exports;
    var setGlobal = setGlobal$3;
    var copyConstructorProperties = copyConstructorProperties$1;
    var isForced = isForced_1;

    /*
      options.target      - name of the target object
      options.global      - target is the global object
      options.stat        - export as static methods of target
      options.proto       - export as prototype methods of target
      options.real        - real prototype method for the `pure` version
      options.forced      - export even if the native feature is available
      options.bind        - bind methods to the target, required for the `pure` version
      options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version
      options.unsafe      - use the simple assignment of property instead of delete + defineProperty
      options.sham        - add a flag to not completely full polyfills
      options.enumerable  - export as enumerable property
      options.noTargetGet - prevent calling a getter on target
      options.name        - the .name of the function if it does not match the key
    */
    var _export = function (options, source) {
      var TARGET = options.target;
      var GLOBAL = options.global;
      var STATIC = options.stat;
      var FORCED, target, key, targetProperty, sourceProperty, descriptor;
      if (GLOBAL) {
        target = global$3;
      } else if (STATIC) {
        target = global$3[TARGET] || setGlobal(TARGET, {});
      } else {
        target = (global$3[TARGET] || {}).prototype;
      }
      if (target) for (key in source) {
        sourceProperty = source[key];
        if (options.noTargetGet) {
          descriptor = getOwnPropertyDescriptor(target, key);
          targetProperty = descriptor && descriptor.value;
        } else targetProperty = target[key];
        FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
        // contained in target
        if (!FORCED && targetProperty !== undefined) {
          if (typeof sourceProperty === typeof targetProperty) continue;
          copyConstructorProperties(sourceProperty, targetProperty);
        }
        // add a flag to not completely full polyfills
        if (options.sham || (targetProperty && targetProperty.sham)) {
          createNonEnumerableProperty$2(sourceProperty, 'sham', true);
        }
        // extend global
        redefine$2(target, key, sourceProperty, options);
      }
    };

    var fails$2 = fails$8;

    var correctPrototypeGetter = !fails$2(function () {
      function F() { /* empty */ }
      F.prototype.constructor = null;
      // eslint-disable-next-line es/no-object-getprototypeof -- required for testing
      return Object.getPrototypeOf(new F()) !== F.prototype;
    });

    var has$1 = has$9;
    var isCallable$3 = isCallable$d;
    var toObject$1 = toObject$3;
    var sharedKey = sharedKey$3;
    var CORRECT_PROTOTYPE_GETTER = correctPrototypeGetter;

    var IE_PROTO = sharedKey('IE_PROTO');
    var ObjectPrototype = Object.prototype;

    // `Object.getPrototypeOf` method
    // https://tc39.es/ecma262/#sec-object.getprototypeof
    // eslint-disable-next-line es/no-object-getprototypeof -- safe
    var objectGetPrototypeOf = CORRECT_PROTOTYPE_GETTER ? Object.getPrototypeOf : function (O) {
      var object = toObject$1(O);
      if (has$1(object, IE_PROTO)) return object[IE_PROTO];
      var constructor = object.constructor;
      if (isCallable$3(constructor) && object instanceof constructor) {
        return constructor.prototype;
      } return object instanceof Object ? ObjectPrototype : null;
    };

    var fails$1 = fails$8;
    var isCallable$2 = isCallable$d;
    var getPrototypeOf$1 = objectGetPrototypeOf;
    var redefine$1 = redefine$3.exports;
    var wellKnownSymbol$3 = wellKnownSymbol$6;

    var ITERATOR$2 = wellKnownSymbol$3('iterator');
    var BUGGY_SAFARI_ITERATORS$1 = false;

    // `%IteratorPrototype%` object
    // https://tc39.es/ecma262/#sec-%iteratorprototype%-object
    var IteratorPrototype$2, PrototypeOfArrayIteratorPrototype, arrayIterator;

    /* eslint-disable es/no-array-prototype-keys -- safe */
    if ([].keys) {
      arrayIterator = [].keys();
      // Safari 8 has buggy iterators w/o `next`
      if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS$1 = true;
      else {
        PrototypeOfArrayIteratorPrototype = getPrototypeOf$1(getPrototypeOf$1(arrayIterator));
        if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype$2 = PrototypeOfArrayIteratorPrototype;
      }
    }

    var NEW_ITERATOR_PROTOTYPE = IteratorPrototype$2 == undefined || fails$1(function () {
      var test = {};
      // FF44- legacy iterators case
      return IteratorPrototype$2[ITERATOR$2].call(test) !== test;
    });

    if (NEW_ITERATOR_PROTOTYPE) IteratorPrototype$2 = {};

    // `%IteratorPrototype%[@@iterator]()` method
    // https://tc39.es/ecma262/#sec-%iteratorprototype%-@@iterator
    if (!isCallable$2(IteratorPrototype$2[ITERATOR$2])) {
      redefine$1(IteratorPrototype$2, ITERATOR$2, function () {
        return this;
      });
    }

    var iteratorsCore = {
      IteratorPrototype: IteratorPrototype$2,
      BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS$1
    };

    var defineProperty = objectDefineProperty.f;
    var has = has$9;
    var wellKnownSymbol$2 = wellKnownSymbol$6;

    var TO_STRING_TAG$1 = wellKnownSymbol$2('toStringTag');

    var setToStringTag$2 = function (it, TAG, STATIC) {
      if (it && !has(it = STATIC ? it : it.prototype, TO_STRING_TAG$1)) {
        defineProperty(it, TO_STRING_TAG$1, { configurable: true, value: TAG });
      }
    };

    var IteratorPrototype$1 = iteratorsCore.IteratorPrototype;
    var create = objectCreate;
    var createPropertyDescriptor = createPropertyDescriptor$3;
    var setToStringTag$1 = setToStringTag$2;

    var createIteratorConstructor$1 = function (IteratorConstructor, NAME, next) {
      var TO_STRING_TAG = NAME + ' Iterator';
      IteratorConstructor.prototype = create(IteratorPrototype$1, { next: createPropertyDescriptor(1, next) });
      setToStringTag$1(IteratorConstructor, TO_STRING_TAG, false);
      return IteratorConstructor;
    };

    var isCallable$1 = isCallable$d;

    var aPossiblePrototype$1 = function (argument) {
      if (typeof argument === 'object' || isCallable$1(argument)) return argument;
      throw TypeError("Can't set " + String(argument) + ' as a prototype');
    };

    /* eslint-disable no-proto -- safe */

    var anObject = anObject$5;
    var aPossiblePrototype = aPossiblePrototype$1;

    // `Object.setPrototypeOf` method
    // https://tc39.es/ecma262/#sec-object.setprototypeof
    // Works with __proto__ only. Old v8 can't work with null proto objects.
    // eslint-disable-next-line es/no-object-setprototypeof -- safe
    var objectSetPrototypeOf = Object.setPrototypeOf || ('__proto__' in {} ? function () {
      var CORRECT_SETTER = false;
      var test = {};
      var setter;
      try {
        // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
        setter = Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set;
        setter.call(test, []);
        CORRECT_SETTER = test instanceof Array;
      } catch (error) { /* empty */ }
      return function setPrototypeOf(O, proto) {
        anObject(O);
        aPossiblePrototype(proto);
        if (CORRECT_SETTER) setter.call(O, proto);
        else O.__proto__ = proto;
        return O;
      };
    }() : undefined);

    var $$1 = _export;
    var FunctionName = functionName;
    var isCallable = isCallable$d;
    var createIteratorConstructor = createIteratorConstructor$1;
    var getPrototypeOf = objectGetPrototypeOf;
    var setPrototypeOf = objectSetPrototypeOf;
    var setToStringTag = setToStringTag$2;
    var createNonEnumerableProperty$1 = createNonEnumerableProperty$5;
    var redefine = redefine$3.exports;
    var wellKnownSymbol$1 = wellKnownSymbol$6;
    var IteratorsCore = iteratorsCore;

    var PROPER_FUNCTION_NAME = FunctionName.PROPER;
    var CONFIGURABLE_FUNCTION_NAME = FunctionName.CONFIGURABLE;
    var IteratorPrototype = IteratorsCore.IteratorPrototype;
    var BUGGY_SAFARI_ITERATORS = IteratorsCore.BUGGY_SAFARI_ITERATORS;
    var ITERATOR$1 = wellKnownSymbol$1('iterator');
    var KEYS = 'keys';
    var VALUES = 'values';
    var ENTRIES = 'entries';

    var returnThis = function () { return this; };

    var defineIterator$1 = function (Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
      createIteratorConstructor(IteratorConstructor, NAME, next);

      var getIterationMethod = function (KIND) {
        if (KIND === DEFAULT && defaultIterator) return defaultIterator;
        if (!BUGGY_SAFARI_ITERATORS && KIND in IterablePrototype) return IterablePrototype[KIND];
        switch (KIND) {
          case KEYS: return function keys() { return new IteratorConstructor(this, KIND); };
          case VALUES: return function values() { return new IteratorConstructor(this, KIND); };
          case ENTRIES: return function entries() { return new IteratorConstructor(this, KIND); };
        } return function () { return new IteratorConstructor(this); };
      };

      var TO_STRING_TAG = NAME + ' Iterator';
      var INCORRECT_VALUES_NAME = false;
      var IterablePrototype = Iterable.prototype;
      var nativeIterator = IterablePrototype[ITERATOR$1]
        || IterablePrototype['@@iterator']
        || DEFAULT && IterablePrototype[DEFAULT];
      var defaultIterator = !BUGGY_SAFARI_ITERATORS && nativeIterator || getIterationMethod(DEFAULT);
      var anyNativeIterator = NAME == 'Array' ? IterablePrototype.entries || nativeIterator : nativeIterator;
      var CurrentIteratorPrototype, methods, KEY;

      // fix native
      if (anyNativeIterator) {
        CurrentIteratorPrototype = getPrototypeOf(anyNativeIterator.call(new Iterable()));
        if (CurrentIteratorPrototype !== Object.prototype && CurrentIteratorPrototype.next) {
          if (getPrototypeOf(CurrentIteratorPrototype) !== IteratorPrototype) {
            if (setPrototypeOf) {
              setPrototypeOf(CurrentIteratorPrototype, IteratorPrototype);
            } else if (!isCallable(CurrentIteratorPrototype[ITERATOR$1])) {
              redefine(CurrentIteratorPrototype, ITERATOR$1, returnThis);
            }
          }
          // Set @@toStringTag to native iterators
          setToStringTag(CurrentIteratorPrototype, TO_STRING_TAG, true);
        }
      }

      // fix Array.prototype.{ values, @@iterator }.name in V8 / FF
      if (PROPER_FUNCTION_NAME && DEFAULT == VALUES && nativeIterator && nativeIterator.name !== VALUES) {
        if (CONFIGURABLE_FUNCTION_NAME) {
          createNonEnumerableProperty$1(IterablePrototype, 'name', VALUES);
        } else {
          INCORRECT_VALUES_NAME = true;
          defaultIterator = function values() { return nativeIterator.call(this); };
        }
      }

      // export additional methods
      if (DEFAULT) {
        methods = {
          values: getIterationMethod(VALUES),
          keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
          entries: getIterationMethod(ENTRIES)
        };
        if (FORCED) for (KEY in methods) {
          if (BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
            redefine(IterablePrototype, KEY, methods[KEY]);
          }
        } else $$1({ target: NAME, proto: true, forced: BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME }, methods);
      }

      // define iterator
      if (IterablePrototype[ITERATOR$1] !== defaultIterator) {
        redefine(IterablePrototype, ITERATOR$1, defaultIterator, { name: DEFAULT });
      }

      return methods;
    };

    var toIndexedObject = toIndexedObject$4;
    var addToUnscopables = addToUnscopables$1;
    var InternalStateModule = internalState;
    var defineIterator = defineIterator$1;

    var ARRAY_ITERATOR = 'Array Iterator';
    var setInternalState = InternalStateModule.set;
    var getInternalState = InternalStateModule.getterFor(ARRAY_ITERATOR);

    // `Array.prototype.entries` method
    // https://tc39.es/ecma262/#sec-array.prototype.entries
    // `Array.prototype.keys` method
    // https://tc39.es/ecma262/#sec-array.prototype.keys
    // `Array.prototype.values` method
    // https://tc39.es/ecma262/#sec-array.prototype.values
    // `Array.prototype[@@iterator]` method
    // https://tc39.es/ecma262/#sec-array.prototype-@@iterator
    // `CreateArrayIterator` internal method
    // https://tc39.es/ecma262/#sec-createarrayiterator
    var es_array_iterator = defineIterator(Array, 'Array', function (iterated, kind) {
      setInternalState(this, {
        type: ARRAY_ITERATOR,
        target: toIndexedObject(iterated), // target
        index: 0,                          // next index
        kind: kind                         // kind
      });
    // `%ArrayIteratorPrototype%.next` method
    // https://tc39.es/ecma262/#sec-%arrayiteratorprototype%.next
    }, function () {
      var state = getInternalState(this);
      var target = state.target;
      var kind = state.kind;
      var index = state.index++;
      if (!target || index >= target.length) {
        state.target = undefined;
        return { value: undefined, done: true };
      }
      if (kind == 'keys') return { value: index, done: false };
      if (kind == 'values') return { value: target[index], done: false };
      return { value: [index, target[index]], done: false };
    }, 'values');

    // https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
    addToUnscopables('keys');
    addToUnscopables('values');
    addToUnscopables('entries');

    // iterable DOM collections
    // flag - `iterable` interface - 'entries', 'keys', 'values', 'forEach' methods
    var domIterables = {
      CSSRuleList: 0,
      CSSStyleDeclaration: 0,
      CSSValueList: 0,
      ClientRectList: 0,
      DOMRectList: 0,
      DOMStringList: 0,
      DOMTokenList: 1,
      DataTransferItemList: 0,
      FileList: 0,
      HTMLAllCollection: 0,
      HTMLCollection: 0,
      HTMLFormElement: 0,
      HTMLSelectElement: 0,
      MediaList: 0,
      MimeTypeArray: 0,
      NamedNodeMap: 0,
      NodeList: 1,
      PaintRequestList: 0,
      Plugin: 0,
      PluginArray: 0,
      SVGLengthList: 0,
      SVGNumberList: 0,
      SVGPathSegList: 0,
      SVGPointList: 0,
      SVGStringList: 0,
      SVGTransformList: 0,
      SourceBufferList: 0,
      StyleSheetList: 0,
      TextTrackCueList: 0,
      TextTrackList: 0,
      TouchList: 0
    };

    // in old WebKit versions, `element.classList` is not an instance of global `DOMTokenList`
    var documentCreateElement = documentCreateElement$2;

    var classList = documentCreateElement('span').classList;
    var DOMTokenListPrototype$1 = classList && classList.constructor && classList.constructor.prototype;

    var domTokenListPrototype = DOMTokenListPrototype$1 === Object.prototype ? undefined : DOMTokenListPrototype$1;

    var global$2 = global$d;
    var DOMIterables = domIterables;
    var DOMTokenListPrototype = domTokenListPrototype;
    var ArrayIteratorMethods = es_array_iterator;
    var createNonEnumerableProperty = createNonEnumerableProperty$5;
    var wellKnownSymbol = wellKnownSymbol$6;

    var ITERATOR = wellKnownSymbol('iterator');
    var TO_STRING_TAG = wellKnownSymbol('toStringTag');
    var ArrayValues = ArrayIteratorMethods.values;

    var handlePrototype = function (CollectionPrototype, COLLECTION_NAME) {
      if (CollectionPrototype) {
        // some Chrome versions have non-configurable methods on DOMTokenList
        if (CollectionPrototype[ITERATOR] !== ArrayValues) try {
          createNonEnumerableProperty(CollectionPrototype, ITERATOR, ArrayValues);
        } catch (error) {
          CollectionPrototype[ITERATOR] = ArrayValues;
        }
        if (!CollectionPrototype[TO_STRING_TAG]) {
          createNonEnumerableProperty(CollectionPrototype, TO_STRING_TAG, COLLECTION_NAME);
        }
        if (DOMIterables[COLLECTION_NAME]) for (var METHOD_NAME in ArrayIteratorMethods) {
          // some Chrome versions have non-configurable methods on DOMTokenList
          if (CollectionPrototype[METHOD_NAME] !== ArrayIteratorMethods[METHOD_NAME]) try {
            createNonEnumerableProperty(CollectionPrototype, METHOD_NAME, ArrayIteratorMethods[METHOD_NAME]);
          } catch (error) {
            CollectionPrototype[METHOD_NAME] = ArrayIteratorMethods[METHOD_NAME];
          }
        }
      }
    };

    for (var COLLECTION_NAME in DOMIterables) {
      handlePrototype(global$2[COLLECTION_NAME] && global$2[COLLECTION_NAME].prototype, COLLECTION_NAME);
    }

    handlePrototype(DOMTokenListPrototype, 'DOMTokenList');

    var aCallable = aCallable$2;
    var toObject = toObject$3;
    var IndexedObject = indexedObject;
    var toLength = toLength$2;

    // `Array.prototype.{ reduce, reduceRight }` methods implementation
    var createMethod = function (IS_RIGHT) {
      return function (that, callbackfn, argumentsLength, memo) {
        aCallable(callbackfn);
        var O = toObject(that);
        var self = IndexedObject(O);
        var length = toLength(O.length);
        var index = IS_RIGHT ? length - 1 : 0;
        var i = IS_RIGHT ? -1 : 1;
        if (argumentsLength < 2) while (true) {
          if (index in self) {
            memo = self[index];
            index += i;
            break;
          }
          index += i;
          if (IS_RIGHT ? index < 0 : length <= index) {
            throw TypeError('Reduce of empty array with no initial value');
          }
        }
        for (;IS_RIGHT ? index >= 0 : length > index; index += i) if (index in self) {
          memo = callbackfn(memo, self[index], index, O);
        }
        return memo;
      };
    };

    var arrayReduce = {
      // `Array.prototype.reduce` method
      // https://tc39.es/ecma262/#sec-array.prototype.reduce
      left: createMethod(false),
      // `Array.prototype.reduceRight` method
      // https://tc39.es/ecma262/#sec-array.prototype.reduceright
      right: createMethod(true)
    };

    var fails = fails$8;

    var arrayMethodIsStrict$1 = function (METHOD_NAME, argument) {
      var method = [][METHOD_NAME];
      return !!method && fails(function () {
        // eslint-disable-next-line no-useless-call,no-throw-literal -- required for testing
        method.call(null, argument || function () { throw 1; }, 1);
      });
    };

    var classof = classofRaw;
    var global$1 = global$d;

    var engineIsNode = classof(global$1.process) == 'process';

    var $ = _export;
    var $reduce = arrayReduce.left;
    var arrayMethodIsStrict = arrayMethodIsStrict$1;
    var CHROME_VERSION = engineV8Version;
    var IS_NODE = engineIsNode;

    var STRICT_METHOD = arrayMethodIsStrict('reduce');
    // Chrome 80-82 has a critical bug
    // https://bugs.chromium.org/p/chromium/issues/detail?id=1049982
    var CHROME_BUG = !IS_NODE && CHROME_VERSION > 79 && CHROME_VERSION < 83;

    // `Array.prototype.reduce` method
    // https://tc39.es/ecma262/#sec-array.prototype.reduce
    $({ target: 'Array', proto: true, forced: !STRICT_METHOD || CHROME_BUG }, {
      reduce: function reduce(callbackfn /* , initialValue */) {
        return $reduce(this, callbackfn, arguments.length, arguments.length > 1 ? arguments[1] : undefined);
      }
    });

    var classnames$2 = {exports: {}};

    /*!
      Copyright (c) 2018 Jed Watson.
      Licensed under the MIT License (MIT), see
      http://jedwatson.github.io/classnames
    */

    (function (module) {
    /* global define */

    (function () {

    	var hasOwn = {}.hasOwnProperty;

    	function classNames() {
    		var classes = [];

    		for (var i = 0; i < arguments.length; i++) {
    			var arg = arguments[i];
    			if (!arg) continue;

    			var argType = typeof arg;

    			if (argType === 'string' || argType === 'number') {
    				classes.push(arg);
    			} else if (Array.isArray(arg)) {
    				if (arg.length) {
    					var inner = classNames.apply(null, arg);
    					if (inner) {
    						classes.push(inner);
    					}
    				}
    			} else if (argType === 'object') {
    				if (arg.toString === Object.prototype.toString) {
    					for (var key in arg) {
    						if (hasOwn.call(arg, key) && arg[key]) {
    							classes.push(key);
    						}
    					}
    				} else {
    					classes.push(arg.toString());
    				}
    			}
    		}

    		return classes.join(' ');
    	}

    	if (module.exports) {
    		classNames.default = classNames;
    		module.exports = classNames;
    	} else {
    		window.classNames = classNames;
    	}
    }());
    }(classnames$2));

    var classNames$2 = classnames$2.exports;

    var css_248z$1 = ".ft-select{min-width:80px;border:1px solid #ced3d9;border-radius:4px;background:#fff;color:#222;font-size:14px;line-height:1.5;display:inline-block;position:relative}.ft-select-none-border{border:0}.ft-select.hover,.ft-select:hover{border-color:#888}.ft-select.focus,.ft-select.open{border-color:#2e8ae6}.ft-select.error{border-color:#e64545}.ft-select.disabled{cursor:not-allowed;color:#b3b3b3;border:1px solid #ced3d9;background:#f5f7fa}.ft-select.disabled.hover,.ft-select.disabled:hover{border-color:#ced3d9}.ft-select-input{padding:5px 10px;width:100%;box-sizing:border-box;display:flex;align-items:center;cursor:pointer;white-space:nowrap;overflow:hidden}.ft-select.disabled .ft-select-input{cursor:not-allowed}.ft-select-input-inner{width:0;flex-grow:1;white-space:nowrap;overflow:hidden;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.ft-select.disabled .ft-select-input-inner{cursor:not-allowed}.is-placeholder .ft-select-input-inner{color:#888}.ft-select.disabled .is-placeholder .ft-select-input-inner{color:#b3b3b3}.ft-select-tools{line-height:1;box-sizing:content-box;color:#888;font-size:0;flex-shrink:0;display:flex;align-items:center;justify-content:center}.ft-select-arrow{font-size:20px;transition:transform .2s ease}.ft-select.open .ft-select-arrow{transform:rotate(180deg)}.ft-select-clear{font-size:16px;display:none}.ft-select-with-clear:hover .ft-select-clear{display:block}.ft-select-with-clear:hover .ft-select-arrow{display:none}.ft-select-dropdown{margin-top:2px;min-width:100%;border-radius:4px;box-shadow:0 9px 16px 8px rgba(0,0,0,.03),0 6px 10px 0 rgba(0,0,0,.06),0 3px 6px -3px rgba(0,0,0,.12);background:#fff;overflow:hidden;display:none;top:100%;position:absolute;z-index:66}.ft-select.open .ft-select-dropdown{display:block}.ft-select .select-list{max-height:300px;min-width:100%;overflow:auto}.ft-select .select-list::-webkit-scrollbar{width:10px}.ft-select .select-list::-webkit-scrollbar-thumb{background:#b3b3b3;border-radius:8px;border:2px solid transparent;background-clip:padding-box}.ft-select .select-list-wrap{margin:0;padding:0;min-width:100%;*width:100%;list-style:none;background:#fff}.ft-select .select-opt{padding:5px 10px;color:#555;display:block;word-wrap:break-word;text-decoration:none;cursor:pointer;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.ft-select .select-opt.hide{display:none}.ft-select .select-opt.hover,.ft-select .select-opt.selected,.ft-select .select-opt:hover{color:#2c87e2;background:#f5f7fa}.ft-select .select-opt.disabled{border:0;cursor:not-allowed;color:#b3b3b3;background:none}.ft-select .select-opt.disabled:hover{background:none}.ft-select .select-opt.multiple-opt{display:flex;align-items:center}.ft-select .select-opt.multiple-opt .ft-checkbox{margin-right:10px}.ft-select .select-optgroup{border-radius:unset}.ft-select .select-optgroup+.select-optgroup{border-top:1px solid #dae0e6}.ft-select .select-optgroup .select-optgroup-label{padding:5px 10px;color:#b3b3b3;font-size:14px;font-weight:700}.ft-select .select-optgroup .select-opt{padding-left:20px;padding-right:20px}.ft-select .select-group{padding:0 10px}.ft-select .select-group .select-opt{margin-left:-10px;margin-right:-10px}.ft-select .select-group:after{height:0;content:\"\";display:block;padding:0 10px;margin:5px 0;border-bottom:1px solid #dae0e6;box-sizing:border-box}.ft-select .select-group:last-of-type:after{margin:0;padding:0;border:0}.ft-select .select-opt-label{padding:5px 0;font-weight:700}.ft-select.open{z-index:110}.ft-select.open .select-arrow{transform:rotate(180deg)}.ft-select.open .select-list{display:block}.ft-select.top .select-list{top:auto;bottom:100%;margin-bottom:2px;border-bottom:0}";
    styleInject(css_248z$1, {id: "future-select-2.1.1"});

    const OptionGroup = props => {
      const {
        label,
        children
      } = props;
      return /*#__PURE__*/React$2.createElement("div", {
        className: "select-optgroup"
      }, /*#__PURE__*/React$2.createElement("div", {
        className: "select-optgroup-label"
      }, label), children);
    };

    function _extends$1() {
      _extends$1 = Object.assign || function (target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i];

          for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              target[key] = source[key];
            }
          }
        }

        return target;
      };

      return _extends$1.apply(this, arguments);
    }

    function _defineProperty$1(obj, key, value) {
      if (key in obj) {
        Object.defineProperty(obj, key, {
          value: value,
          enumerable: true,
          configurable: true,
          writable: true
        });
      } else {
        obj[key] = value;
      }

      return obj;
    }

    function _objectWithoutPropertiesLoose(source, excluded) {
      if (source == null) return {};
      var target = {};
      var sourceKeys = Object.keys(source);
      var key, i;

      for (i = 0; i < sourceKeys.length; i++) {
        key = sourceKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        target[key] = source[key];
      }

      return target;
    }

    function _objectWithoutProperties(source, excluded) {
      if (source == null) return {};
      var target = _objectWithoutPropertiesLoose(source, excluded);
      var key, i;

      if (Object.getOwnPropertySymbols) {
        var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

        for (i = 0; i < sourceSymbolKeys.length; i++) {
          key = sourceSymbolKeys[i];
          if (excluded.indexOf(key) >= 0) continue;
          if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
          target[key] = source[key];
        }
      }

      return target;
    }

    var classnames$1 = {exports: {}};

    /*!
      Copyright (c) 2018 Jed Watson.
      Licensed under the MIT License (MIT), see
      http://jedwatson.github.io/classnames
    */

    (function (module) {
    /* global define */

    (function () {

    	var hasOwn = {}.hasOwnProperty;

    	function classNames() {
    		var classes = [];

    		for (var i = 0; i < arguments.length; i++) {
    			var arg = arguments[i];
    			if (!arg) continue;

    			var argType = typeof arg;

    			if (argType === 'string' || argType === 'number') {
    				classes.push(arg);
    			} else if (Array.isArray(arg)) {
    				if (arg.length) {
    					var inner = classNames.apply(null, arg);
    					if (inner) {
    						classes.push(inner);
    					}
    				}
    			} else if (argType === 'object') {
    				if (arg.toString === Object.prototype.toString) {
    					for (var key in arg) {
    						if (hasOwn.call(arg, key) && arg[key]) {
    							classes.push(key);
    						}
    					}
    				} else {
    					classes.push(arg.toString());
    				}
    			}
    		}

    		return classes.join(' ');
    	}

    	if (module.exports) {
    		classNames.default = classNames;
    		module.exports = classNames;
    	} else {
    		window.classNames = classNames;
    	}
    }());
    }(classnames$1));

    var classNames$1 = classnames$1.exports;

    function ownKeys$1(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

    function _objectSpread$1(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$1(Object(source), true).forEach(function (key) { _defineProperty$1(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$1(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
    const Checkbox = props => {
      const {
        className,
        indeterminate,
        checked,
        children
      } = props;

      const nativeRadioProps = (_ref => {
        let keys = _objectWithoutProperties(_ref, ["className", "indeterminate", "children", "error"]);

        return _objectSpread$1({}, keys);
      })(props);

      return /*#__PURE__*/React$2.createElement("label", {
        className: classNames$1("ft-checkbox", className)
      }, /*#__PURE__*/React$2.createElement("input", _extends$1({
        type: "checkbox"
      }, nativeRadioProps, {
        className: classNames$1(indeterminate && !checked && "is-indeterminate")
      })), /*#__PURE__*/React$2.createElement("span", {
        className: "ft-checkbox-front"
      }), children && /*#__PURE__*/React$2.createElement("span", {
        className: "ft-checkbox-label"
      }, children));
    };

    var css_248z = ".ft-checkbox{margin:0;color:#222;font-weight:400;display:inline-flex;align-items:center;vertical-align:middle;position:relative;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.ft-checkbox+.ft-checkbox{margin-left:20px}.ft-checkbox input[type=checkbox]{margin:0;width:0;height:0;left:0;top:0;position:absolute;opacity:0}.ft-checkbox input[type=checkbox]+.ft-checkbox-front{width:16px;height:16px;border:1px solid #888;border-radius:3px;background-color:#fff;box-sizing:border-box;position:relative;transition:all .1s ease-in;cursor:pointer}.ft-checkbox input[type=checkbox]:hover+.ft-checkbox-front{border-color:#2776c6}.ft-checkbox input[type=checkbox].disabled+.ft-checkbox-front,.ft-checkbox input[type=checkbox][disabled]+.ft-checkbox-front{border-color:#ccc;cursor:not-allowed}.ft-checkbox input[type=checkbox]:checked+.ft-checkbox-front{border-color:#2e8ae6;background-color:#2e8ae6}.ft-checkbox input[type=checkbox]:checked+.ft-checkbox-front:after{width:10px;height:6px;border:2px solid #fff;border-top:0;border-right:0;box-sizing:border-box;display:block;transition:all .1s ease-in;transform:rotate(-45deg);top:3px;left:2px;position:absolute;content:\"\"}.ft-checkbox input[type=checkbox]:checked:hover+.ft-checkbox-front{border-color:#0a64bf;background-color:#0a64bf}.ft-checkbox input[type=checkbox]:checked.disabled+.ft-checkbox-front,.ft-checkbox input[type=checkbox]:checked[disabled]+.ft-checkbox-front{border-color:#ccc;background-color:#ccc}.ft-checkbox input[type=checkbox].is-indeterminate+.ft-checkbox-front{border-color:#2e8ae6;background-color:#2e8ae6}.ft-checkbox input[type=checkbox].is-indeterminate+.ft-checkbox-front:after{width:11px;height:3px;border-radius:4px;background-color:#fff;top:50%;left:50%;position:absolute;transform:translate(-50%,-50%);content:\"\"}.ft-checkbox input[type=checkbox].is-indeterminate[disabled]+.ft-checkbox-front{border-color:#ccc;background-color:#ccc}.ft-checkbox .ft-checkbox-front+.ft-checkbox-label{margin-left:5px}.ft-checkbox-group{display:flex;align-items:center}";
    styleInject(css_248z, {id: "future-select-2.1.1"});

    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }

    function _defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    function _createClass(Constructor, protoProps, staticProps) {
      if (protoProps) _defineProperties(Constructor.prototype, protoProps);
      if (staticProps) _defineProperties(Constructor, staticProps);
      return Constructor;
    }

    function _defineProperty(obj, key, value) {
      if (key in obj) {
        Object.defineProperty(obj, key, {
          value: value,
          enumerable: true,
          configurable: true,
          writable: true
        });
      } else {
        obj[key] = value;
      }

      return obj;
    }

    function _extends() {
      _extends = Object.assign || function (target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i];

          for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              target[key] = source[key];
            }
          }
        }

        return target;
      };

      return _extends.apply(this, arguments);
    }

    function _inherits(subClass, superClass) {
      if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function");
      }

      subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
          value: subClass,
          writable: true,
          configurable: true
        }
      });
      if (superClass) _setPrototypeOf(subClass, superClass);
    }

    function _getPrototypeOf(o) {
      _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o);
      };
      return _getPrototypeOf(o);
    }

    function _setPrototypeOf(o, p) {
      _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
        o.__proto__ = p;
        return o;
      };

      return _setPrototypeOf(o, p);
    }

    function _isNativeReflectConstruct() {
      if (typeof Reflect === "undefined" || !Reflect.construct) return false;
      if (Reflect.construct.sham) return false;
      if (typeof Proxy === "function") return true;

      try {
        Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
        return true;
      } catch (e) {
        return false;
      }
    }

    function _assertThisInitialized(self) {
      if (self === void 0) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      }

      return self;
    }

    function _possibleConstructorReturn(self, call) {
      if (call && (typeof call === "object" || typeof call === "function")) {
        return call;
      }

      return _assertThisInitialized(self);
    }

    function _createSuper(Derived) {
      var hasNativeReflectConstruct = _isNativeReflectConstruct();

      return function _createSuperInternal() {
        var Super = _getPrototypeOf(Derived),
            result;

        if (hasNativeReflectConstruct) {
          var NewTarget = _getPrototypeOf(this).constructor;

          result = Reflect.construct(Super, arguments, NewTarget);
        } else {
          result = Super.apply(this, arguments);
        }

        return _possibleConstructorReturn(this, result);
      };
    }

    var classnames = {exports: {}};

    /*!
      Copyright (c) 2018 Jed Watson.
      Licensed under the MIT License (MIT), see
      http://jedwatson.github.io/classnames
    */

    (function (module) {
    /* global define */

    (function () {

    	var hasOwn = {}.hasOwnProperty;

    	function classNames() {
    		var classes = [];

    		for (var i = 0; i < arguments.length; i++) {
    			var arg = arguments[i];
    			if (!arg) continue;

    			var argType = typeof arg;

    			if (argType === 'string' || argType === 'number') {
    				classes.push(arg);
    			} else if (Array.isArray(arg)) {
    				if (arg.length) {
    					var inner = classNames.apply(null, arg);
    					if (inner) {
    						classes.push(inner);
    					}
    				}
    			} else if (argType === 'object') {
    				if (arg.toString === Object.prototype.toString) {
    					for (var key in arg) {
    						if (hasOwn.call(arg, key) && arg[key]) {
    							classes.push(key);
    						}
    					}
    				} else {
    					classes.push(arg.toString());
    				}
    			}
    		}

    		return classes.join(' ');
    	}

    	if (module.exports) {
    		classNames.default = classNames;
    		module.exports = classNames;
    	} else {
    		window.classNames = classNames;
    	}
    }());
    }(classnames));

    var classNames = classnames.exports;

    var appendHtmlChildren = function appendHtmlChildren(target, children) {
      return /*#__PURE__*/React$2.cloneElement(target, typeof children === "string" ? {
        dangerouslySetInnerHTML: {
          __html: children
        }
      } : {
        children: children
      });
    };

    var Picker = /*#__PURE__*/function (_React$Component) {
      _inherits(Picker, _React$Component);

      var _super = _createSuper(Picker);

      function Picker(props) {
        var _this;

        _classCallCheck(this, Picker);

        _this = _super.call(this, props);

        _defineProperty(_assertThisInitialized(_this), "handleClickOutside", function (e) {
          var wrapper = _this.pickerRef.current;

          if (_this.isDropdownVisible() && wrapper && !wrapper.contains(e.target)) {
            _this.props.onBlur && _this.props.onBlur(e);
            _this.state.open && _this.handleOpenChange(false);
          }
        });

        _defineProperty(_assertThisInitialized(_this), "handleInputClick", function (e) {
          e.stopPropagation();
          e.nativeEvent.stopImmediatePropagation();
          var disabled = _this.props.disabled;

          if (!disabled) {
            _this.handleOpenChange(!_this.state.open);

            _this.props.onClick && _this.props.onClick(e.nativeEvent);
          }
        });

        _defineProperty(_assertThisInitialized(_this), "closeDropdown", function () {
          _this.handleOpenChange(false);
        });

        _defineProperty(_assertThisInitialized(_this), "handleClear", function (e) {
          e.stopPropagation();
          e.nativeEvent.stopImmediatePropagation();
          _this.props.onClear && _this.props.onClear();
        });

        _this.state = {};
        _this.pickerRef = /*#__PURE__*/h$1();
        return _this;
      }

      _createClass(Picker, [{
        key: "handleOpenChange",
        value: function handleOpenChange(open) {
          this.props.dropdownVisible === undefined && this.setState({
            open: open
          });
        }
      }, {
        key: "isDropdownVisible",
        value: function isDropdownVisible() {
          var dropdownVisible = this.props.dropdownVisible;
          return dropdownVisible !== undefined ? dropdownVisible : this.state.open;
        }
      }, {
        key: "render",
        value: function render() {
          var _this$props = this.props,
              className = _this$props.className,
              children = _this$props.children,
              value = _this$props.value,
              namespace = _this$props.namespace,
              placeholder = _this$props.placeholder,
              name = _this$props.name,
              title = _this$props.title,
              disabled = _this$props.disabled,
              error = _this$props.error,
              prefix = _this$props.prefix,
              suffix = _this$props.suffix,
              _this$props$arrow = _this$props.arrow,
              arrow = _this$props$arrow === void 0 ? true : _this$props$arrow,
              clear = _this$props.clear;
          var suffixElement = suffix || /*#__PURE__*/React$2.createElement(React$2.Fragment, null, arrow && /*#__PURE__*/React$2.createElement("i", {
            className: "ft-icon icon-down ".concat(namespace, "-arrow")
          }), clear && /*#__PURE__*/React$2.createElement("i", {
            className: "ft-icon icon-error ".concat(namespace, "-clear"),
            onClick: this.handleClear
          }));
          var pickerClassNames = classNames("".concat(namespace), this.isDropdownVisible() && "open", disabled && "disabled", error && "error", className);
          return /*#__PURE__*/React$2.createElement("div", _extends({
            className: pickerClassNames
          }, name ? {
            "data-name": name
          } : {}, {
            ref: this.pickerRef
          }), /*#__PURE__*/React$2.createElement("div", {
            className: classNames("".concat(namespace, "-input"), clear && value && "".concat(namespace, "-with-clear"), !value && placeholder && "is-placeholder"),
            title: title,
            onClick: this.handleInputClick
          }, prefix && /*#__PURE__*/React$2.createElement("div", {
            className: "".concat(namespace, "-prefix")
          }, prefix), appendHtmlChildren( /*#__PURE__*/React$2.createElement("div", {
            className: "".concat(namespace, "-input-inner")
          }), value || /*#__PURE__*/React$2.createElement(React$2.Fragment, null, placeholder)), suffixElement && /*#__PURE__*/React$2.createElement("div", {
            className: classNames("".concat(namespace, "-suffix"), !suffix && (arrow || clear) && "".concat(namespace, "-tools"))
          }, suffixElement)), /*#__PURE__*/React$2.createElement("div", {
            className: "".concat(namespace, "-dropdown")
          }, children && ( /*#__PURE__*/React$2.isValidElement(children) && typeof children.type !== 'string' && children.type !== React$2.Fragment ? /*#__PURE__*/React$2.cloneElement(children, {
            closeDropdown: this.closeDropdown
          }) : children)));
        }
      }, {
        key: "componentDidMount",
        value: function componentDidMount() {}
      }, {
        key: "componentDidUpdate",
        value: function componentDidUpdate(prevProps, prevState, snapshot) {
          var dropdownVisible = this.props.dropdownVisible;

          if (prevProps.dropdownVisible !== dropdownVisible) {
            if (dropdownVisible) {
              window.document.addEventListener("click", this.handleClickOutside, true);
            } else {
              window.document.removeEventListener("click", this.handleClickOutside, true);
            }
          }
        }
      }, {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {}
      }]);

      return Picker;
    }(React$2.Component);

    _defineProperty(Picker, "defaultProps", {
      namespace: "ft-picker"
    });

    class Select$2 extends React$2.Component {
      constructor(props) {
        super(props);

        _defineProperty$2(this, "handleSelectClick", e => {
          if (!this.props.disabled) {
            this.setState({
              visible: !this.state.visible,
              hasFocusClass: true
            }, () => {
              this.state.visible && this.positionSelected();
            });

            if (this.state.visible) {
              this.props.onFocus && this.props.onFocus(e);
            }
          }
        });

        _defineProperty$2(this, "handleBlur", e => {
          const {
            onBlur
          } = this.props;
          onBlur && onBlur(e);
          this.closeDropdown();
        });

        _defineProperty$2(this, "handleClear", () => {
          const {
            multiple,
            onChange
          } = this.props;
          const newVal = multiple ? [] : "";
          onChange && onChange(newVal);
        });

        this.state = {
          visible: false,
          hasFocusClass: false,
          selectedLabel: null
        };
        this.listRef = /*#__PURE__*/h$1();
        this.selectWrapperRef = /*#__PURE__*/h$1();
      }

      //todo
      positionSelected() {
        const listElement = this.listRef.current;

        if (listElement) {
          const selectedElement = listElement.querySelector(".selected");
          const selectedItem = selectedElement === null || selectedElement === void 0 ? void 0 : selectedElement.parentElement;

          if (selectedItem) {
            const {
              offsetTop
            } = selectedItem;

            if (listElement.scrollTop !== offsetTop) {
              listElement.scrollTop = offsetTop;
            }
          }
        }
      }

      closeDropdown() {
        var _this$props$onDropdow, _this$props;

        const visible = false;
        this.setState({
          visible
        });
        (_this$props$onDropdow = (_this$props = this.props).onDropdownVisibleChange) === null || _this$props$onDropdow === void 0 ? void 0 : _this$props$onDropdow.call(_this$props, visible);
      }

      handleOptionSelect(val) {
        const {
          value,
          onChange
        } = this.props;
        const multiple = Array.isArray(value);
        let arrayValue = multiple ? [...value] : [value];

        if (arrayValue.includes(val)) {
          multiple && arrayValue.splice(arrayValue.indexOf(val), 1);
        } else {
          if (multiple) {
            arrayValue.push(val);
          } else {
            arrayValue = [val];
          }
        }

        onChange && onChange(multiple ? arrayValue : arrayValue[0]);
        this.setState({
          visible: multiple
        });
      }

      isSelected(optionVal) {
        const {
          value
        } = this.props;
        return Array.isArray(value) ? value.includes(optionVal) : value === optionVal;
      }

      getOptionLabel(option) {
        const {
          label,
          value,
          children
        } = option.props;
        const childrenVal = typeof children === "number" || typeof children === "string" && children;
        return label || childrenVal || value;
      }

      findLabelByVal(options, val) {
        const option = options.find(option => option.props.value === val);
        return option ? this.getOptionLabel(option) : undefined;
      }

      listSelectedData(options) {
        const {
          value,
          multiple,
          placeholder
        } = this.props;
        let selectedList = [];

        if (multiple) {
          selectedList = (Array.isArray(value) ? value : [value]).map(val => ({
            value: val,
            label: this.findLabelByVal(options, val) || val
          }));
        } else {
          const val = Array.isArray(value) ? value[0] : value;
          const label = this.findLabelByVal(options, val);

          if (val !== undefined) {
            selectedList = [{
              value: val,
              label: label !== undefined ? label : val
            }];
          }
        }

        if (selectedList.length === 1) {
          const only = selectedList[0];

          if (only.value === "" && only.label === "" && placeholder) {
            only.label = placeholder;
          }
        }

        if (selectedList.length === 0) {
          const firstOption = options[0];

          if (placeholder) ; else if (firstOption) {
            selectedList = [{
              value: firstOption.props.value,
              label: this.getOptionLabel(firstOption)
            }];
          }
        }

        return selectedList;
      }

      renderOptionList(options, groupDisabled) {
        const {
          multiple
        } = this.props;
        return options.length > 0 && /*#__PURE__*/React$2.createElement("ul", {
          className: "select-list-wrap"
        }, options.map(option => /*#__PURE__*/React$2.createElement(React$2.Fragment, {
          key: option.props.value
        }, /*#__PURE__*/React$2.cloneElement(option, {
          optClassName: classNames$2(option.props.optClassName, multiple && "multiple-opt"),
          prefix: multiple && /*#__PURE__*/React$2.createElement(Checkbox, {
            checked: this.isSelected(option.props.value)
          }),
          disabled: groupDisabled || option.props.disabled,
          selected: this.isSelected(option.props.value),
          onSelect: this.handleOptionSelect.bind(this)
        }))));
      }

      renderNativeOption(option) {
        return /*#__PURE__*/React$2.createElement("option", {
          value: option.props.value,
          disabled: option.props.disabled,
          key: option.props.value
        }, this.getOptionLabel(option));
      }

      render() {
        const children = React$2.Children.toArray(this.props.children);
        const groupIndexArray = children.reduce((prev, current, index) => {
          return current.type === OptionGroup ? prev.concat(index) : prev;
        }, []);
        let listOfOptionsOrGroup = [children];
        let allOptions = children;

        if (groupIndexArray.length > 0) {
          listOfOptionsOrGroup = [];
          allOptions = [];
          groupIndexArray.forEach((groupIndex, i) => {
            if (groupIndex > 0) {
              const start = i > 0 ? groupIndexArray[i - 1] + 1 : 0;
              const options = children.slice(start, groupIndex);
              listOfOptionsOrGroup.push(options);
              allOptions = allOptions.concat(options);
            }

            listOfOptionsOrGroup.push(children[groupIndex]);
            allOptions = allOptions.concat(children[groupIndex].props.children);

            if (i === groupIndexArray.length - 1 && groupIndex < children.length - 1) {
              const options = children.slice(groupIndex + 1);
              listOfOptionsOrGroup.push(children.slice(groupIndex + 1));
              allOptions = allOptions.concat(options);
            }
          });
        }

        const {
          value,
          name,
          multiple,
          placeholder,
          disabled,
          error,
          displayTop,
          bordered = true,
          clear,
          icon,
          onClear = this.handleClear,
          selectedRender = defaultSelectedRender,
          selectedFormat = defaultSelectedFormat
        } = this.props;
        const {
          visible
        } = this.state;
        const selectClassNames = classNames$2(!bordered && "ft-select-none-border", displayTop && "top", this.props.className);
        classNames$2("select-selected", (Array.isArray(value) ? value.length <= 0 : !value) && "select-placeholder");
        return /*#__PURE__*/React$2.createElement(React$2.Fragment, null, /*#__PURE__*/React$2.createElement(Picker, {
          namespace: "ft-select",
          className: selectClassNames,
          dropdownVisible: visible,
          value: selectedRender(this.listSelectedData(allOptions)),
          placeholder: placeholder,
          error: error,
          disabled: disabled,
          onClick: this.handleSelectClick,
          onBlur: this.handleBlur,
          onClear: onClear,
          clear: clear
        }, /*#__PURE__*/React$2.createElement("div", {
          className: "select-list"
        }, listOfOptionsOrGroup.length > 0 && listOfOptionsOrGroup.map((optionsOrGroup, index) => /*#__PURE__*/React$2.createElement(React$2.Fragment, {
          key: index
        }, Array.isArray(optionsOrGroup) ? this.renderOptionList(optionsOrGroup) : /*#__PURE__*/React$2.cloneElement(optionsOrGroup, {
          children: this.renderOptionList(optionsOrGroup.props.children, optionsOrGroup.props.disabled)
        }))))), multiple ? /*#__PURE__*/React$2.createElement("input", {
          type: "hidden",
          name: name,
          value: Array.isArray(value) ? selectedFormat(value) : value
        }) : /*#__PURE__*/React$2.createElement("select", {
          name: name,
          style: {
            display: "none"
          },
          defaultValue: value
        }, children.map(child => child.type === OptionGroup ? /*#__PURE__*/React$2.createElement("optgroup", {
          label: child.props.label,
          disabled: child.props.disabled,
          key: child.props.label
        }, child.props.children.map(option => this.renderNativeOption(option))) : this.renderNativeOption(child))));
      }

      componentDidUpdate(prevProps, prevState, snapshot) {}

      componentDidMount() {}

      componentWillUnmount() {}

    }

    const defaultSelectedRender = function (options) {
      return options.length > 0 ? options.map(option => option.label).join(",") : undefined;
    };

    const defaultSelectedFormat = function (values) {
      return values.length > 0 ? values.join(",") : "";
    };

    class Option extends React$2.Component {
      constructor(props) {
        super(props);
        this.state = {};
      }

      handleSelect() {
        const {
          onSelect,
          value,
          disabled
        } = this.props;
        !disabled && onSelect && onSelect(value);
      }

      handleClick(e) {
        e.stopPropagation();
        e.preventDefault();
        this.handleSelect();
      }

      render() {
        const {
          className,
          title,
          optClassName,
          children,
          value,
          label,
          disabled,
          selected,
          prefix
        } = this.props;
        const optClassNames = classNames$2("select-opt", selected && "selected", disabled && "disabled", optClassName);
        return /*#__PURE__*/React$2.createElement("li", {
          className: className
        }, /*#__PURE__*/React$2.createElement("a", {
          className: optClassNames,
          title: title,
          href: "#",
          onClick: this.handleClick.bind(this)
        }, prefix, children || label || value));
      }

      componentDidUpdate(prevProps, prevState, snapshot) {}

      componentDidMount() {}

    }

    var htmlReactParser = {exports: {}};

    var require$$0 = /*@__PURE__*/getAugmentedNamespace(compat_module);

    var HTMLDOMPropertyConfig$1 = {
      Properties: {
        autoFocus: 4,
        accept: 0,
        acceptCharset: 0,
        accessKey: 0,
        action: 0,
        allowFullScreen: 4,
        allowTransparency: 0,
        alt: 0,
        as: 0,
        async: 4,
        autoComplete: 0,
        autoPlay: 4,
        capture: 4,
        cellPadding: 0,
        cellSpacing: 0,
        charSet: 0,
        challenge: 0,
        checked: 5,
        cite: 0,
        classID: 0,
        className: 0,
        cols: 24,
        colSpan: 0,
        content: 0,
        contentEditable: 0,
        contextMenu: 0,
        controls: 4,
        controlsList: 0,
        coords: 0,
        crossOrigin: 0,
        data: 0,
        dateTime: 0,
        default: 4,
        defer: 4,
        dir: 0,
        disabled: 4,
        download: 32,
        draggable: 0,
        encType: 0,
        form: 0,
        formAction: 0,
        formEncType: 0,
        formMethod: 0,
        formNoValidate: 4,
        formTarget: 0,
        frameBorder: 0,
        headers: 0,
        height: 0,
        hidden: 4,
        high: 0,
        href: 0,
        hrefLang: 0,
        htmlFor: 0,
        httpEquiv: 0,
        icon: 0,
        id: 0,
        inputMode: 0,
        integrity: 0,
        is: 0,
        keyParams: 0,
        keyType: 0,
        kind: 0,
        label: 0,
        lang: 0,
        list: 0,
        loop: 4,
        low: 0,
        manifest: 0,
        marginHeight: 0,
        marginWidth: 0,
        max: 0,
        maxLength: 0,
        media: 0,
        mediaGroup: 0,
        method: 0,
        min: 0,
        minLength: 0,
        multiple: 5,
        muted: 5,
        name: 0,
        nonce: 0,
        noValidate: 4,
        open: 4,
        optimum: 0,
        pattern: 0,
        placeholder: 0,
        playsInline: 4,
        poster: 0,
        preload: 0,
        profile: 0,
        radioGroup: 0,
        readOnly: 4,
        referrerPolicy: 0,
        rel: 0,
        required: 4,
        reversed: 4,
        role: 0,
        rows: 24,
        rowSpan: 8,
        sandbox: 0,
        scope: 0,
        scoped: 4,
        scrolling: 0,
        seamless: 4,
        selected: 5,
        shape: 0,
        size: 24,
        sizes: 0,
        span: 24,
        spellCheck: 0,
        src: 0,
        srcDoc: 0,
        srcLang: 0,
        srcSet: 0,
        start: 8,
        step: 0,
        style: 0,
        summary: 0,
        tabIndex: 0,
        target: 0,
        title: 0,
        type: 0,
        useMap: 0,
        value: 0,
        width: 0,
        wmode: 0,
        wrap: 0,
        about: 0,
        datatype: 0,
        inlist: 0,
        prefix: 0,
        property: 0,
        resource: 0,
        typeof: 0,
        vocab: 0,
        autoCapitalize: 0,
        autoCorrect: 0,
        autoSave: 0,
        color: 0,
        itemProp: 0,
        itemScope: 4,
        itemType: 0,
        itemID: 0,
        itemRef: 0,
        results: 0,
        security: 0,
        unselectable: 0
      },
      DOMAttributeNames: {
        acceptCharset: 'accept-charset',
        className: 'class',
        htmlFor: 'for',
        httpEquiv: 'http-equiv'
      }
    };

    var SVGDOMPropertyConfig$1 = {
      Properties: {
        accentHeight: 0,
        accumulate: 0,
        additive: 0,
        alignmentBaseline: 0,
        allowReorder: 0,
        alphabetic: 0,
        amplitude: 0,
        arabicForm: 0,
        ascent: 0,
        attributeName: 0,
        attributeType: 0,
        autoReverse: 0,
        azimuth: 0,
        baseFrequency: 0,
        baseProfile: 0,
        baselineShift: 0,
        bbox: 0,
        begin: 0,
        bias: 0,
        by: 0,
        calcMode: 0,
        capHeight: 0,
        clip: 0,
        clipPath: 0,
        clipRule: 0,
        clipPathUnits: 0,
        colorInterpolation: 0,
        colorInterpolationFilters: 0,
        colorProfile: 0,
        colorRendering: 0,
        contentScriptType: 0,
        contentStyleType: 0,
        cursor: 0,
        cx: 0,
        cy: 0,
        d: 0,
        decelerate: 0,
        descent: 0,
        diffuseConstant: 0,
        direction: 0,
        display: 0,
        divisor: 0,
        dominantBaseline: 0,
        dur: 0,
        dx: 0,
        dy: 0,
        edgeMode: 0,
        elevation: 0,
        enableBackground: 0,
        end: 0,
        exponent: 0,
        externalResourcesRequired: 0,
        fill: 0,
        fillOpacity: 0,
        fillRule: 0,
        filter: 0,
        filterRes: 0,
        filterUnits: 0,
        floodColor: 0,
        floodOpacity: 0,
        focusable: 0,
        fontFamily: 0,
        fontSize: 0,
        fontSizeAdjust: 0,
        fontStretch: 0,
        fontStyle: 0,
        fontVariant: 0,
        fontWeight: 0,
        format: 0,
        from: 0,
        fx: 0,
        fy: 0,
        g1: 0,
        g2: 0,
        glyphName: 0,
        glyphOrientationHorizontal: 0,
        glyphOrientationVertical: 0,
        glyphRef: 0,
        gradientTransform: 0,
        gradientUnits: 0,
        hanging: 0,
        horizAdvX: 0,
        horizOriginX: 0,
        ideographic: 0,
        imageRendering: 0,
        in: 0,
        in2: 0,
        intercept: 0,
        k: 0,
        k1: 0,
        k2: 0,
        k3: 0,
        k4: 0,
        kernelMatrix: 0,
        kernelUnitLength: 0,
        kerning: 0,
        keyPoints: 0,
        keySplines: 0,
        keyTimes: 0,
        lengthAdjust: 0,
        letterSpacing: 0,
        lightingColor: 0,
        limitingConeAngle: 0,
        local: 0,
        markerEnd: 0,
        markerMid: 0,
        markerStart: 0,
        markerHeight: 0,
        markerUnits: 0,
        markerWidth: 0,
        mask: 0,
        maskContentUnits: 0,
        maskUnits: 0,
        mathematical: 0,
        mode: 0,
        numOctaves: 0,
        offset: 0,
        opacity: 0,
        operator: 0,
        order: 0,
        orient: 0,
        orientation: 0,
        origin: 0,
        overflow: 0,
        overlinePosition: 0,
        overlineThickness: 0,
        paintOrder: 0,
        panose1: 0,
        pathLength: 0,
        patternContentUnits: 0,
        patternTransform: 0,
        patternUnits: 0,
        pointerEvents: 0,
        points: 0,
        pointsAtX: 0,
        pointsAtY: 0,
        pointsAtZ: 0,
        preserveAlpha: 0,
        preserveAspectRatio: 0,
        primitiveUnits: 0,
        r: 0,
        radius: 0,
        refX: 0,
        refY: 0,
        renderingIntent: 0,
        repeatCount: 0,
        repeatDur: 0,
        requiredExtensions: 0,
        requiredFeatures: 0,
        restart: 0,
        result: 0,
        rotate: 0,
        rx: 0,
        ry: 0,
        scale: 0,
        seed: 0,
        shapeRendering: 0,
        slope: 0,
        spacing: 0,
        specularConstant: 0,
        specularExponent: 0,
        speed: 0,
        spreadMethod: 0,
        startOffset: 0,
        stdDeviation: 0,
        stemh: 0,
        stemv: 0,
        stitchTiles: 0,
        stopColor: 0,
        stopOpacity: 0,
        strikethroughPosition: 0,
        strikethroughThickness: 0,
        string: 0,
        stroke: 0,
        strokeDasharray: 0,
        strokeDashoffset: 0,
        strokeLinecap: 0,
        strokeLinejoin: 0,
        strokeMiterlimit: 0,
        strokeOpacity: 0,
        strokeWidth: 0,
        surfaceScale: 0,
        systemLanguage: 0,
        tableValues: 0,
        targetX: 0,
        targetY: 0,
        textAnchor: 0,
        textDecoration: 0,
        textRendering: 0,
        textLength: 0,
        to: 0,
        transform: 0,
        u1: 0,
        u2: 0,
        underlinePosition: 0,
        underlineThickness: 0,
        unicode: 0,
        unicodeBidi: 0,
        unicodeRange: 0,
        unitsPerEm: 0,
        vAlphabetic: 0,
        vHanging: 0,
        vIdeographic: 0,
        vMathematical: 0,
        values: 0,
        vectorEffect: 0,
        version: 0,
        vertAdvY: 0,
        vertOriginX: 0,
        vertOriginY: 0,
        viewBox: 0,
        viewTarget: 0,
        visibility: 0,
        widths: 0,
        wordSpacing: 0,
        writingMode: 0,
        x: 0,
        xHeight: 0,
        x1: 0,
        x2: 0,
        xChannelSelector: 0,
        xlinkActuate: 0,
        xlinkArcrole: 0,
        xlinkHref: 0,
        xlinkRole: 0,
        xlinkShow: 0,
        xlinkTitle: 0,
        xlinkType: 0,
        xmlBase: 0,
        xmlns: 0,
        xmlnsXlink: 0,
        xmlLang: 0,
        xmlSpace: 0,
        y: 0,
        y1: 0,
        y2: 0,
        yChannelSelector: 0,
        z: 0,
        zoomAndPan: 0
      },
      DOMAttributeNames: {
        accentHeight: 'accent-height',
        alignmentBaseline: 'alignment-baseline',
        arabicForm: 'arabic-form',
        baselineShift: 'baseline-shift',
        capHeight: 'cap-height',
        clipPath: 'clip-path',
        clipRule: 'clip-rule',
        colorInterpolation: 'color-interpolation',
        colorInterpolationFilters: 'color-interpolation-filters',
        colorProfile: 'color-profile',
        colorRendering: 'color-rendering',
        dominantBaseline: 'dominant-baseline',
        enableBackground: 'enable-background',
        fillOpacity: 'fill-opacity',
        fillRule: 'fill-rule',
        floodColor: 'flood-color',
        floodOpacity: 'flood-opacity',
        fontFamily: 'font-family',
        fontSize: 'font-size',
        fontSizeAdjust: 'font-size-adjust',
        fontStretch: 'font-stretch',
        fontStyle: 'font-style',
        fontVariant: 'font-variant',
        fontWeight: 'font-weight',
        glyphName: 'glyph-name',
        glyphOrientationHorizontal: 'glyph-orientation-horizontal',
        glyphOrientationVertical: 'glyph-orientation-vertical',
        horizAdvX: 'horiz-adv-x',
        horizOriginX: 'horiz-origin-x',
        imageRendering: 'image-rendering',
        letterSpacing: 'letter-spacing',
        lightingColor: 'lighting-color',
        markerEnd: 'marker-end',
        markerMid: 'marker-mid',
        markerStart: 'marker-start',
        overlinePosition: 'overline-position',
        overlineThickness: 'overline-thickness',
        paintOrder: 'paint-order',
        panose1: 'panose-1',
        pointerEvents: 'pointer-events',
        renderingIntent: 'rendering-intent',
        shapeRendering: 'shape-rendering',
        stopColor: 'stop-color',
        stopOpacity: 'stop-opacity',
        strikethroughPosition: 'strikethrough-position',
        strikethroughThickness: 'strikethrough-thickness',
        strokeDasharray: 'stroke-dasharray',
        strokeDashoffset: 'stroke-dashoffset',
        strokeLinecap: 'stroke-linecap',
        strokeLinejoin: 'stroke-linejoin',
        strokeMiterlimit: 'stroke-miterlimit',
        strokeOpacity: 'stroke-opacity',
        strokeWidth: 'stroke-width',
        textAnchor: 'text-anchor',
        textDecoration: 'text-decoration',
        textRendering: 'text-rendering',
        underlinePosition: 'underline-position',
        underlineThickness: 'underline-thickness',
        unicodeBidi: 'unicode-bidi',
        unicodeRange: 'unicode-range',
        unitsPerEm: 'units-per-em',
        vAlphabetic: 'v-alphabetic',
        vHanging: 'v-hanging',
        vIdeographic: 'v-ideographic',
        vMathematical: 'v-mathematical',
        vectorEffect: 'vector-effect',
        vertAdvY: 'vert-adv-y',
        vertOriginX: 'vert-origin-x',
        vertOriginY: 'vert-origin-y',
        wordSpacing: 'word-spacing',
        writingMode: 'writing-mode',
        xHeight: 'x-height',
        xlinkActuate: 'xlink:actuate',
        xlinkArcrole: 'xlink:arcrole',
        xlinkHref: 'xlink:href',
        xlinkRole: 'xlink:role',
        xlinkShow: 'xlink:show',
        xlinkTitle: 'xlink:title',
        xlinkType: 'xlink:type',
        xmlBase: 'xml:base',
        xmlnsXlink: 'xmlns:xlink',
        xmlLang: 'xml:lang',
        xmlSpace: 'xml:space'
      }
    };

    var injection$1 = {
      MUST_USE_PROPERTY: 1,
      HAS_BOOLEAN_VALUE: 4,
      HAS_NUMERIC_VALUE: 8,
      HAS_POSITIVE_NUMERIC_VALUE: 24,
      HAS_OVERLOADED_BOOLEAN_VALUE: 32
    };

    var HTMLDOMPropertyConfig = HTMLDOMPropertyConfig$1;
    var SVGDOMPropertyConfig = SVGDOMPropertyConfig$1;
    var injection = injection$1;

    var MUST_USE_PROPERTY = injection.MUST_USE_PROPERTY;
    var HAS_BOOLEAN_VALUE = injection.HAS_BOOLEAN_VALUE;
    var HAS_NUMERIC_VALUE = injection.HAS_NUMERIC_VALUE;
    var HAS_POSITIVE_NUMERIC_VALUE = injection.HAS_POSITIVE_NUMERIC_VALUE;
    var HAS_OVERLOADED_BOOLEAN_VALUE = injection.HAS_OVERLOADED_BOOLEAN_VALUE;

    /**
     * @see https://github.com/facebook/react/blob/15-stable/src/renderers/dom/shared/DOMProperty.js#L14-L16
     *
     * @param  {Number}  value
     * @param  {Number}  bitmask
     * @return {Boolean}
     */
    function checkMask(value, bitmask) {
      return (value & bitmask) === bitmask;
    }

    /**
     * @see https://github.com/facebook/react/blob/15-stable/src/renderers/dom/shared/DOMProperty.js#L57
     *
     * @param {Object}  domPropertyConfig - HTMLDOMPropertyConfig or SVGDOMPropertyConfig
     * @param {Object}  config            - The object to be mutated
     * @param {Boolean} isSVG             - Whether the injected config is HTML or SVG (it assumes the default is HTML)
     */
    function injectDOMPropertyConfig(domPropertyConfig, config, isSVG) {
      var Properties = domPropertyConfig.Properties;
      var DOMAttributeNames = domPropertyConfig.DOMAttributeNames;
      var attributeName;
      var propertyName;
      var propConfig;

      for (propertyName in Properties) {
        attributeName =
          DOMAttributeNames[propertyName] ||
          (isSVG ? propertyName : propertyName.toLowerCase());
        propConfig = Properties[propertyName];

        config[attributeName] = {
          attributeName: attributeName,
          propertyName: propertyName,
          mustUseProperty: checkMask(propConfig, MUST_USE_PROPERTY),
          hasBooleanValue: checkMask(propConfig, HAS_BOOLEAN_VALUE),
          hasNumericValue: checkMask(propConfig, HAS_NUMERIC_VALUE),
          hasPositiveNumericValue: checkMask(
            propConfig,
            HAS_POSITIVE_NUMERIC_VALUE
          ),
          hasOverloadedBooleanValue: checkMask(
            propConfig,
            HAS_OVERLOADED_BOOLEAN_VALUE
          )
        };
      }
    }

    /**
     * HTML properties config.
     *
     * @type {Object}
     */
    var html = {};
    injectDOMPropertyConfig(HTMLDOMPropertyConfig, html);

    /**
     * SVG properties config.
     *
     * @type {Object}
     */
    var svg = {};
    injectDOMPropertyConfig(SVGDOMPropertyConfig, svg, true);

    /**
     * HTML and SVG properties config.
     *
     * @type {Object}
     */
    var properties = {};
    injectDOMPropertyConfig(HTMLDOMPropertyConfig, properties);
    injectDOMPropertyConfig(SVGDOMPropertyConfig, properties, true);

    var ATTRIBUTE_NAME_START_CHAR =
      ':A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD';
    var ATTRIBUTE_NAME_CHAR =
      ATTRIBUTE_NAME_START_CHAR + '\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040';

    var reactProperty$1 = {
      html: html,
      svg: svg,
      properties: properties,

      /**
       * Checks whether a property name is a custom attribute.
       *
       * @see https://github.com/facebook/react/blob/15-stable/src/renderers/dom/shared/HTMLDOMPropertyConfig.js#L23-L25
       *
       * @param {String}
       * @return {Boolean}
       */
      isCustomAttribute: RegExp.prototype.test.bind(
        new RegExp('^(data|aria)-[' + ATTRIBUTE_NAME_CHAR + ']*$')
      )
    };

    var cjs = {};

    // http://www.w3.org/TR/CSS21/grammar.html
    // https://github.com/visionmedia/css-parse/pull/49#issuecomment-30088027
    var COMMENT_REGEX = /\/\*[^*]*\*+([^/*][^*]*\*+)*\//g;

    var NEWLINE_REGEX = /\n/g;
    var WHITESPACE_REGEX = /^\s*/;

    // declaration
    var PROPERTY_REGEX = /^(\*?[-#/*\\\w]+(\[[0-9a-z_-]+\])?)\s*/;
    var COLON_REGEX = /^:\s*/;
    var VALUE_REGEX = /^((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};])+)/;
    var SEMICOLON_REGEX = /^[;\s]*/;

    // https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String/Trim#Polyfill
    var TRIM_REGEX = /^\s+|\s+$/g;

    // strings
    var NEWLINE = '\n';
    var FORWARD_SLASH = '/';
    var ASTERISK = '*';
    var EMPTY_STRING = '';

    // types
    var TYPE_COMMENT = 'comment';
    var TYPE_DECLARATION = 'declaration';

    /**
     * @param {String} style
     * @param {Object} [options]
     * @return {Object[]}
     * @throws {TypeError}
     * @throws {Error}
     */
    var inlineStyleParser = function(style, options) {
      if (typeof style !== 'string') {
        throw new TypeError('First argument must be a string');
      }

      if (!style) return [];

      options = options || {};

      /**
       * Positional.
       */
      var lineno = 1;
      var column = 1;

      /**
       * Update lineno and column based on `str`.
       *
       * @param {String} str
       */
      function updatePosition(str) {
        var lines = str.match(NEWLINE_REGEX);
        if (lines) lineno += lines.length;
        var i = str.lastIndexOf(NEWLINE);
        column = ~i ? str.length - i : column + str.length;
      }

      /**
       * Mark position and patch `node.position`.
       *
       * @return {Function}
       */
      function position() {
        var start = { line: lineno, column: column };
        return function(node) {
          node.position = new Position(start);
          whitespace();
          return node;
        };
      }

      /**
       * Store position information for a node.
       *
       * @constructor
       * @property {Object} start
       * @property {Object} end
       * @property {undefined|String} source
       */
      function Position(start) {
        this.start = start;
        this.end = { line: lineno, column: column };
        this.source = options.source;
      }

      /**
       * Non-enumerable source string.
       */
      Position.prototype.content = style;

      /**
       * Error `msg`.
       *
       * @param {String} msg
       * @throws {Error}
       */
      function error(msg) {
        var err = new Error(
          options.source + ':' + lineno + ':' + column + ': ' + msg
        );
        err.reason = msg;
        err.filename = options.source;
        err.line = lineno;
        err.column = column;
        err.source = style;

        if (options.silent) ; else {
          throw err;
        }
      }

      /**
       * Match `re` and return captures.
       *
       * @param {RegExp} re
       * @return {undefined|Array}
       */
      function match(re) {
        var m = re.exec(style);
        if (!m) return;
        var str = m[0];
        updatePosition(str);
        style = style.slice(str.length);
        return m;
      }

      /**
       * Parse whitespace.
       */
      function whitespace() {
        match(WHITESPACE_REGEX);
      }

      /**
       * Parse comments.
       *
       * @param {Object[]} [rules]
       * @return {Object[]}
       */
      function comments(rules) {
        var c;
        rules = rules || [];
        while ((c = comment())) {
          if (c !== false) {
            rules.push(c);
          }
        }
        return rules;
      }

      /**
       * Parse comment.
       *
       * @return {Object}
       * @throws {Error}
       */
      function comment() {
        var pos = position();
        if (FORWARD_SLASH != style.charAt(0) || ASTERISK != style.charAt(1)) return;

        var i = 2;
        while (
          EMPTY_STRING != style.charAt(i) &&
          (ASTERISK != style.charAt(i) || FORWARD_SLASH != style.charAt(i + 1))
        ) {
          ++i;
        }
        i += 2;

        if (EMPTY_STRING === style.charAt(i - 1)) {
          return error('End of comment missing');
        }

        var str = style.slice(2, i - 2);
        column += 2;
        updatePosition(str);
        style = style.slice(i);
        column += 2;

        return pos({
          type: TYPE_COMMENT,
          comment: str
        });
      }

      /**
       * Parse declaration.
       *
       * @return {Object}
       * @throws {Error}
       */
      function declaration() {
        var pos = position();

        // prop
        var prop = match(PROPERTY_REGEX);
        if (!prop) return;
        comment();

        // :
        if (!match(COLON_REGEX)) return error("property missing ':'");

        // val
        var val = match(VALUE_REGEX);

        var ret = pos({
          type: TYPE_DECLARATION,
          property: trim(prop[0].replace(COMMENT_REGEX, EMPTY_STRING)),
          value: val
            ? trim(val[0].replace(COMMENT_REGEX, EMPTY_STRING))
            : EMPTY_STRING
        });

        // ;
        match(SEMICOLON_REGEX);

        return ret;
      }

      /**
       * Parse declarations.
       *
       * @return {Object[]}
       */
      function declarations() {
        var decls = [];

        comments(decls);

        // declarations
        var decl;
        while ((decl = declaration())) {
          if (decl !== false) {
            decls.push(decl);
            comments(decls);
          }
        }

        return decls;
      }

      whitespace();
      return declarations();
    };

    /**
     * Trim `str`.
     *
     * @param {String} str
     * @return {String}
     */
    function trim(str) {
      return str ? str.replace(TRIM_REGEX, EMPTY_STRING) : EMPTY_STRING;
    }

    var parse = inlineStyleParser;

    /**
     * Parses inline style to object.
     *
     * @example
     * // returns { 'line-height': '42' }
     * StyleToObject('line-height: 42;');
     *
     * @param  {String}      style      - The inline style.
     * @param  {Function}    [iterator] - The iterator function.
     * @return {null|Object}
     */
    function StyleToObject(style, iterator) {
      var output = null;
      if (!style || typeof style !== 'string') {
        return output;
      }

      var declaration;
      var declarations = parse(style);
      var hasIterator = typeof iterator === 'function';
      var property;
      var value;

      for (var i = 0, len = declarations.length; i < len; i++) {
        declaration = declarations[i];
        property = declaration.property;
        value = declaration.value;

        if (hasIterator) {
          iterator(property, value, declaration);
        } else if (value) {
          output || (output = {});
          output[property] = value;
        }
      }

      return output;
    }

    var styleToObject = StyleToObject;

    var utilities$4 = {};

    utilities$4.__esModule = true;
    utilities$4.camelCase = void 0;
    var CUSTOM_PROPERTY_REGEX = /^--[a-zA-Z0-9-]+$/;
    var HYPHEN_REGEX = /-([a-z])/g;
    var NO_HYPHEN_REGEX = /^[^-]+$/;
    var VENDOR_PREFIX_REGEX = /^-(webkit|moz|ms|o|khtml)-/;
    var skipCamelCase = function (property) {
        return !property ||
            NO_HYPHEN_REGEX.test(property) ||
            CUSTOM_PROPERTY_REGEX.test(property);
    };
    var capitalize = function (match, character) {
        return character.toUpperCase();
    };
    var trimHyphen = function (match, prefix) { return prefix + "-"; };
    var camelCase = function (property, options) {
        if (options === void 0) { options = {}; }
        if (skipCamelCase(property)) {
            return property;
        }
        property = property.toLowerCase();
        if (!options.reactCompat) {
            property = property.replace(VENDOR_PREFIX_REGEX, trimHyphen);
        }
        return property.replace(HYPHEN_REGEX, capitalize);
    };
    utilities$4.camelCase = camelCase;

    (function (exports) {
    var __importDefault = (commonjsGlobal && commonjsGlobal.__importDefault) || function (mod) {
        return (mod && mod.__esModule) ? mod : { "default": mod };
    };
    exports.__esModule = true;
    var style_to_object_1 = __importDefault(styleToObject);
    var utilities_1 = utilities$4;
    function StyleToJS(style, options) {
        var output = {};
        if (!style || typeof style !== 'string') {
            return output;
        }
        style_to_object_1["default"](style, function (property, value) {
            if (property && value) {
                output[utilities_1.camelCase(property, options)] = value;
            }
        });
        return output;
    }
    exports["default"] = StyleToJS;
    }(cjs));

    var React$1 = require$$0;
    var styleToJS = cjs.default;

    /**
     * Swap key with value in an object.
     *
     * @param  {Object}   obj        - The object.
     * @param  {Function} [override] - The override method.
     * @return {Object}              - The inverted object.
     */
    function invertObject(obj, override) {
      if (!obj || typeof obj !== 'object') {
        throw new TypeError('First argument must be an object');
      }

      var key;
      var value;
      var isOverridePresent = typeof override === 'function';
      var overrides = {};
      var result = {};

      for (key in obj) {
        value = obj[key];

        if (isOverridePresent) {
          overrides = override(key, value);
          if (overrides && overrides.length === 2) {
            result[overrides[0]] = overrides[1];
            continue;
          }
        }

        if (typeof value === 'string') {
          result[value] = key;
        }
      }

      return result;
    }

    /**
     * Check if a given tag is a custom component.
     *
     * @see {@link https://github.com/facebook/react/blob/v16.6.3/packages/react-dom/src/shared/isCustomComponent.js}
     *
     * @param {string} tagName - The name of the html tag.
     * @param {Object} props   - The props being passed to the element.
     * @return {boolean}
     */
    function isCustomComponent(tagName, props) {
      if (tagName.indexOf('-') === -1) {
        return props && typeof props.is === 'string';
      }

      switch (tagName) {
        // These are reserved SVG and MathML elements.
        // We don't mind this whitelist too much because we expect it to never grow.
        // The alternative is to track the namespace in a few places which is convoluted.
        // https://w3c.github.io/webcomponents/spec/custom/#custom-elements-core-concepts
        case 'annotation-xml':
        case 'color-profile':
        case 'font-face':
        case 'font-face-src':
        case 'font-face-uri':
        case 'font-face-format':
        case 'font-face-name':
        case 'missing-glyph':
          return false;
        default:
          return true;
      }
    }

    var styleToJSOptions = { reactCompat: true };

    /**
     * Sets style prop.
     *
     * @param {null|undefined|string} style
     * @param {object} props
     */
    function setStyleProp$2(style, props) {
      if (style === null || style === undefined) {
        return;
      }
      props.style = styleToJS(style, styleToJSOptions);
    }

    /**
     * @constant {boolean}
     * @see {@link https://reactjs.org/blog/2017/09/08/dom-attributes-in-react-16.html}
     */
    var PRESERVE_CUSTOM_ATTRIBUTES = React$1.version.split('.')[0] >= 16;

    var utilities$3 = {
      PRESERVE_CUSTOM_ATTRIBUTES: PRESERVE_CUSTOM_ATTRIBUTES,
      invertObject: invertObject,
      isCustomComponent: isCustomComponent,
      setStyleProp: setStyleProp$2
    };

    var reactProperty = reactProperty$1;
    var utilities$2 = utilities$3;

    var setStyleProp$1 = utilities$2.setStyleProp;

    var htmlProperties = reactProperty.html;
    var svgProperties = reactProperty.svg;
    var isCustomAttribute = reactProperty.isCustomAttribute;

    var hasOwnProperty = Object.prototype.hasOwnProperty;

    /**
     * Converts HTML/SVG DOM attributes to React props.
     *
     * @param  {object} [attributes={}] - HTML/SVG DOM attributes.
     * @return {object}                 - React props.
     */
    function attributesToProps$2(attributes) {
      attributes = attributes || {};

      var attributeName;
      var attributeNameLowerCased;
      var attributeValue;
      var property;
      var props = {};

      for (attributeName in attributes) {
        attributeValue = attributes[attributeName];

        // ARIA (aria-*) or custom data (data-*) attribute
        if (isCustomAttribute(attributeName)) {
          props[attributeName] = attributeValue;
          continue;
        }

        // convert HTML attribute to React prop
        attributeNameLowerCased = attributeName.toLowerCase();
        if (hasOwnProperty.call(htmlProperties, attributeNameLowerCased)) {
          property = htmlProperties[attributeNameLowerCased];
          props[property.propertyName] =
            property.hasBooleanValue ||
            (property.hasOverloadedBooleanValue && !attributeValue)
              ? true
              : attributeValue;
          continue;
        }

        // convert SVG attribute to React prop
        if (hasOwnProperty.call(svgProperties, attributeName)) {
          property = svgProperties[attributeName];
          props[property.propertyName] = attributeValue;
          continue;
        }

        // preserve custom attribute if React >=16
        if (utilities$2.PRESERVE_CUSTOM_ATTRIBUTES) {
          props[attributeName] = attributeValue;
        }
      }

      // transform inline style to object
      setStyleProp$1(attributes.style, props);

      return props;
    }

    var attributesToProps_1 = attributesToProps$2;

    var React = require$$0;
    var attributesToProps$1 = attributesToProps_1;
    var utilities$1 = utilities$3;

    var setStyleProp = utilities$1.setStyleProp;

    /**
     * Converts DOM nodes to JSX element(s).
     *
     * @param  {DomElement[]} nodes             - DOM nodes.
     * @param  {object}       [options={}]      - Options.
     * @param  {Function}     [options.replace] - Replacer.
     * @param  {object}       [options.library] - Library (React/Preact/etc.).
     * @return {string|JSX.Element|JSX.Element[]}
     */
    function domToReact$1(nodes, options) {
      options = options || {};

      var library = options.library || React;
      var cloneElement = library.cloneElement;
      var createElement = library.createElement;
      var isValidElement = library.isValidElement;

      var result = [];
      var node;
      var hasReplace = typeof options.replace === 'function';
      var replaceElement;
      var props;
      var children;
      var data;
      var trim = options.trim;

      for (var i = 0, len = nodes.length; i < len; i++) {
        node = nodes[i];

        // replace with custom React element (if present)
        if (hasReplace) {
          replaceElement = options.replace(node);

          if (isValidElement(replaceElement)) {
            // set "key" prop for sibling elements
            // https://fb.me/react-warning-keys
            if (len > 1) {
              replaceElement = cloneElement(replaceElement, {
                key: replaceElement.key || i
              });
            }
            result.push(replaceElement);
            continue;
          }
        }

        if (node.type === 'text') {
          // if trim option is enabled, skip whitespace text nodes
          if (trim) {
            data = node.data.trim();
            if (data) {
              result.push(node.data);
            }
          } else {
            result.push(node.data);
          }
          continue;
        }

        props = node.attribs;
        if (skipAttributesToProps(node)) {
          setStyleProp(props.style, props);
        } else if (props) {
          props = attributesToProps$1(props);
        }

        children = null;

        switch (node.type) {
          case 'script':
          case 'style':
            // prevent text in <script> or <style> from being escaped
            // https://reactjs.org/docs/dom-elements.html#dangerouslysetinnerhtml
            if (node.children[0]) {
              props.dangerouslySetInnerHTML = {
                __html: node.children[0].data
              };
            }
            break;

          case 'tag':
            // setting textarea value in children is an antipattern in React
            // https://reactjs.org/docs/forms.html#the-textarea-tag
            if (node.name === 'textarea' && node.children[0]) {
              props.defaultValue = node.children[0].data;
            } else if (node.children && node.children.length) {
              // continue recursion of creating React elements (if applicable)
              children = domToReact$1(node.children, options);
            }
            break;

          // skip all other cases (e.g., comment)
          default:
            continue;
        }

        // set "key" prop for sibling elements
        // https://fb.me/react-warning-keys
        if (len > 1) {
          props.key = i;
        }

        result.push(createElement(node.name, props, children));
      }

      return result.length === 1 ? result[0] : result;
    }

    /**
     * Determines whether DOM element attributes should be transformed to props.
     * Web Components should not have their attributes transformed except for `style`.
     *
     * @param  {DomElement} node
     * @return {boolean}
     */
    function skipAttributesToProps(node) {
      return (
        utilities$1.PRESERVE_CUSTOM_ATTRIBUTES &&
        node.type === 'tag' &&
        utilities$1.isCustomComponent(node.name, node.attribs)
      );
    }

    var domToReact_1 = domToReact$1;

    /**
     * SVG elements are case-sensitive.
     *
     * @see {@link https://developer.mozilla.org/docs/Web/SVG/Element#SVG_elements_A_to_Z}
     */

    var CASE_SENSITIVE_TAG_NAMES$1 = [
      'animateMotion',
      'animateTransform',
      'clipPath',
      'feBlend',
      'feColorMatrix',
      'feComponentTransfer',
      'feComposite',
      'feConvolveMatrix',
      'feDiffuseLighting',
      'feDisplacementMap',
      'feDropShadow',
      'feFlood',
      'feFuncA',
      'feFuncB',
      'feFuncG',
      'feFuncR',
      'feGaussainBlur',
      'feImage',
      'feMerge',
      'feMergeNode',
      'feMorphology',
      'feOffset',
      'fePointLight',
      'feSpecularLighting',
      'feSpotLight',
      'feTile',
      'feTurbulence',
      'foreignObject',
      'linearGradient',
      'radialGradient',
      'textPath'
    ];

    var constants$1 = {
      CASE_SENSITIVE_TAG_NAMES: CASE_SENSITIVE_TAG_NAMES$1
    };

    var node = {};

    var lib = {};

    (function (exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Doctype = exports.CDATA = exports.Tag = exports.Style = exports.Script = exports.Comment = exports.Directive = exports.Text = exports.Root = exports.isTag = exports.ElementType = void 0;
    /** Types of elements found in htmlparser2's DOM */
    var ElementType;
    (function (ElementType) {
        /** Type for the root element of a document */
        ElementType["Root"] = "root";
        /** Type for Text */
        ElementType["Text"] = "text";
        /** Type for <? ... ?> */
        ElementType["Directive"] = "directive";
        /** Type for <!-- ... --> */
        ElementType["Comment"] = "comment";
        /** Type for <script> tags */
        ElementType["Script"] = "script";
        /** Type for <style> tags */
        ElementType["Style"] = "style";
        /** Type for Any tag */
        ElementType["Tag"] = "tag";
        /** Type for <![CDATA[ ... ]]> */
        ElementType["CDATA"] = "cdata";
        /** Type for <!doctype ...> */
        ElementType["Doctype"] = "doctype";
    })(ElementType = exports.ElementType || (exports.ElementType = {}));
    /**
     * Tests whether an element is a tag or not.
     *
     * @param elem Element to test
     */
    function isTag(elem) {
        return (elem.type === ElementType.Tag ||
            elem.type === ElementType.Script ||
            elem.type === ElementType.Style);
    }
    exports.isTag = isTag;
    // Exports for backwards compatibility
    /** Type for the root element of a document */
    exports.Root = ElementType.Root;
    /** Type for Text */
    exports.Text = ElementType.Text;
    /** Type for <? ... ?> */
    exports.Directive = ElementType.Directive;
    /** Type for <!-- ... --> */
    exports.Comment = ElementType.Comment;
    /** Type for <script> tags */
    exports.Script = ElementType.Script;
    /** Type for <style> tags */
    exports.Style = ElementType.Style;
    /** Type for Any tag */
    exports.Tag = ElementType.Tag;
    /** Type for <![CDATA[ ... ]]> */
    exports.CDATA = ElementType.CDATA;
    /** Type for <!doctype ...> */
    exports.Doctype = ElementType.Doctype;
    }(lib));

    var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
        var extendStatics = function (d, b) {
            extendStatics = Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
                function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
            return extendStatics(d, b);
        };
        return function (d, b) {
            if (typeof b !== "function" && b !== null)
                throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
            extendStatics(d, b);
            function __() { this.constructor = d; }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    })();
    var __assign = (commonjsGlobal && commonjsGlobal.__assign) || function () {
        __assign = Object.assign || function(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                    t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };
    Object.defineProperty(node, "__esModule", { value: true });
    node.cloneNode = node.hasChildren = node.isDocument = node.isDirective = node.isComment = node.isText = node.isCDATA = node.isTag = node.Element = node.Document = node.NodeWithChildren = node.ProcessingInstruction = node.Comment = node.Text = node.DataNode = node.Node = void 0;
    var domelementtype_1 = lib;
    var nodeTypes = new Map([
        [domelementtype_1.ElementType.Tag, 1],
        [domelementtype_1.ElementType.Script, 1],
        [domelementtype_1.ElementType.Style, 1],
        [domelementtype_1.ElementType.Directive, 1],
        [domelementtype_1.ElementType.Text, 3],
        [domelementtype_1.ElementType.CDATA, 4],
        [domelementtype_1.ElementType.Comment, 8],
        [domelementtype_1.ElementType.Root, 9],
    ]);
    /**
     * This object will be used as the prototype for Nodes when creating a
     * DOM-Level-1-compliant structure.
     */
    var Node = /** @class */ (function () {
        /**
         *
         * @param type The type of the node.
         */
        function Node(type) {
            this.type = type;
            /** Parent of the node */
            this.parent = null;
            /** Previous sibling */
            this.prev = null;
            /** Next sibling */
            this.next = null;
            /** The start index of the node. Requires `withStartIndices` on the handler to be `true. */
            this.startIndex = null;
            /** The end index of the node. Requires `withEndIndices` on the handler to be `true. */
            this.endIndex = null;
        }
        Object.defineProperty(Node.prototype, "nodeType", {
            // Read-only aliases
            get: function () {
                var _a;
                return (_a = nodeTypes.get(this.type)) !== null && _a !== void 0 ? _a : 1;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Node.prototype, "parentNode", {
            // Read-write aliases for properties
            get: function () {
                return this.parent;
            },
            set: function (parent) {
                this.parent = parent;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Node.prototype, "previousSibling", {
            get: function () {
                return this.prev;
            },
            set: function (prev) {
                this.prev = prev;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Node.prototype, "nextSibling", {
            get: function () {
                return this.next;
            },
            set: function (next) {
                this.next = next;
            },
            enumerable: false,
            configurable: true
        });
        /**
         * Clone this node, and optionally its children.
         *
         * @param recursive Clone child nodes as well.
         * @returns A clone of the node.
         */
        Node.prototype.cloneNode = function (recursive) {
            if (recursive === void 0) { recursive = false; }
            return cloneNode(this, recursive);
        };
        return Node;
    }());
    node.Node = Node;
    var DataNode = /** @class */ (function (_super) {
        __extends(DataNode, _super);
        /**
         * @param type The type of the node
         * @param data The content of the data node
         */
        function DataNode(type, data) {
            var _this = _super.call(this, type) || this;
            _this.data = data;
            return _this;
        }
        Object.defineProperty(DataNode.prototype, "nodeValue", {
            get: function () {
                return this.data;
            },
            set: function (data) {
                this.data = data;
            },
            enumerable: false,
            configurable: true
        });
        return DataNode;
    }(Node));
    node.DataNode = DataNode;
    var Text$1 = /** @class */ (function (_super) {
        __extends(Text, _super);
        function Text(data) {
            return _super.call(this, domelementtype_1.ElementType.Text, data) || this;
        }
        return Text;
    }(DataNode));
    node.Text = Text$1;
    var Comment$1 = /** @class */ (function (_super) {
        __extends(Comment, _super);
        function Comment(data) {
            return _super.call(this, domelementtype_1.ElementType.Comment, data) || this;
        }
        return Comment;
    }(DataNode));
    node.Comment = Comment$1;
    var ProcessingInstruction$1 = /** @class */ (function (_super) {
        __extends(ProcessingInstruction, _super);
        function ProcessingInstruction(name, data) {
            var _this = _super.call(this, domelementtype_1.ElementType.Directive, data) || this;
            _this.name = name;
            return _this;
        }
        return ProcessingInstruction;
    }(DataNode));
    node.ProcessingInstruction = ProcessingInstruction$1;
    /**
     * A `Node` that can have children.
     */
    var NodeWithChildren = /** @class */ (function (_super) {
        __extends(NodeWithChildren, _super);
        /**
         * @param type Type of the node.
         * @param children Children of the node. Only certain node types can have children.
         */
        function NodeWithChildren(type, children) {
            var _this = _super.call(this, type) || this;
            _this.children = children;
            return _this;
        }
        Object.defineProperty(NodeWithChildren.prototype, "firstChild", {
            // Aliases
            get: function () {
                var _a;
                return (_a = this.children[0]) !== null && _a !== void 0 ? _a : null;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(NodeWithChildren.prototype, "lastChild", {
            get: function () {
                return this.children.length > 0
                    ? this.children[this.children.length - 1]
                    : null;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(NodeWithChildren.prototype, "childNodes", {
            get: function () {
                return this.children;
            },
            set: function (children) {
                this.children = children;
            },
            enumerable: false,
            configurable: true
        });
        return NodeWithChildren;
    }(Node));
    node.NodeWithChildren = NodeWithChildren;
    var Document = /** @class */ (function (_super) {
        __extends(Document, _super);
        function Document(children) {
            return _super.call(this, domelementtype_1.ElementType.Root, children) || this;
        }
        return Document;
    }(NodeWithChildren));
    node.Document = Document;
    var Element$1 = /** @class */ (function (_super) {
        __extends(Element, _super);
        /**
         * @param name Name of the tag, eg. `div`, `span`.
         * @param attribs Object mapping attribute names to attribute values.
         * @param children Children of the node.
         */
        function Element(name, attribs, children, type) {
            if (children === void 0) { children = []; }
            if (type === void 0) { type = name === "script"
                ? domelementtype_1.ElementType.Script
                : name === "style"
                    ? domelementtype_1.ElementType.Style
                    : domelementtype_1.ElementType.Tag; }
            var _this = _super.call(this, type, children) || this;
            _this.name = name;
            _this.attribs = attribs;
            return _this;
        }
        Object.defineProperty(Element.prototype, "tagName", {
            // DOM Level 1 aliases
            get: function () {
                return this.name;
            },
            set: function (name) {
                this.name = name;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Element.prototype, "attributes", {
            get: function () {
                var _this = this;
                return Object.keys(this.attribs).map(function (name) {
                    var _a, _b;
                    return ({
                        name: name,
                        value: _this.attribs[name],
                        namespace: (_a = _this["x-attribsNamespace"]) === null || _a === void 0 ? void 0 : _a[name],
                        prefix: (_b = _this["x-attribsPrefix"]) === null || _b === void 0 ? void 0 : _b[name],
                    });
                });
            },
            enumerable: false,
            configurable: true
        });
        return Element;
    }(NodeWithChildren));
    node.Element = Element$1;
    /**
     * @param node Node to check.
     * @returns `true` if the node is a `Element`, `false` otherwise.
     */
    function isTag(node) {
        return domelementtype_1.isTag(node);
    }
    node.isTag = isTag;
    /**
     * @param node Node to check.
     * @returns `true` if the node has the type `CDATA`, `false` otherwise.
     */
    function isCDATA(node) {
        return node.type === domelementtype_1.ElementType.CDATA;
    }
    node.isCDATA = isCDATA;
    /**
     * @param node Node to check.
     * @returns `true` if the node has the type `Text`, `false` otherwise.
     */
    function isText(node) {
        return node.type === domelementtype_1.ElementType.Text;
    }
    node.isText = isText;
    /**
     * @param node Node to check.
     * @returns `true` if the node has the type `Comment`, `false` otherwise.
     */
    function isComment(node) {
        return node.type === domelementtype_1.ElementType.Comment;
    }
    node.isComment = isComment;
    /**
     * @param node Node to check.
     * @returns `true` if the node has the type `ProcessingInstruction`, `false` otherwise.
     */
    function isDirective(node) {
        return node.type === domelementtype_1.ElementType.Directive;
    }
    node.isDirective = isDirective;
    /**
     * @param node Node to check.
     * @returns `true` if the node has the type `ProcessingInstruction`, `false` otherwise.
     */
    function isDocument(node) {
        return node.type === domelementtype_1.ElementType.Root;
    }
    node.isDocument = isDocument;
    /**
     * @param node Node to check.
     * @returns `true` if the node is a `NodeWithChildren` (has children), `false` otherwise.
     */
    function hasChildren(node) {
        return Object.prototype.hasOwnProperty.call(node, "children");
    }
    node.hasChildren = hasChildren;
    /**
     * Clone a node, and optionally its children.
     *
     * @param recursive Clone child nodes as well.
     * @returns A clone of the node.
     */
    function cloneNode(node, recursive) {
        if (recursive === void 0) { recursive = false; }
        var result;
        if (isText(node)) {
            result = new Text$1(node.data);
        }
        else if (isComment(node)) {
            result = new Comment$1(node.data);
        }
        else if (isTag(node)) {
            var children = recursive ? cloneChildren(node.children) : [];
            var clone_1 = new Element$1(node.name, __assign({}, node.attribs), children);
            children.forEach(function (child) { return (child.parent = clone_1); });
            if (node["x-attribsNamespace"]) {
                clone_1["x-attribsNamespace"] = __assign({}, node["x-attribsNamespace"]);
            }
            if (node["x-attribsPrefix"]) {
                clone_1["x-attribsPrefix"] = __assign({}, node["x-attribsPrefix"]);
            }
            result = clone_1;
        }
        else if (isCDATA(node)) {
            var children = recursive ? cloneChildren(node.children) : [];
            var clone_2 = new NodeWithChildren(domelementtype_1.ElementType.CDATA, children);
            children.forEach(function (child) { return (child.parent = clone_2); });
            result = clone_2;
        }
        else if (isDocument(node)) {
            var children = recursive ? cloneChildren(node.children) : [];
            var clone_3 = new Document(children);
            children.forEach(function (child) { return (child.parent = clone_3); });
            if (node["x-mode"]) {
                clone_3["x-mode"] = node["x-mode"];
            }
            result = clone_3;
        }
        else if (isDirective(node)) {
            var instruction = new ProcessingInstruction$1(node.name, node.data);
            if (node["x-name"] != null) {
                instruction["x-name"] = node["x-name"];
                instruction["x-publicId"] = node["x-publicId"];
                instruction["x-systemId"] = node["x-systemId"];
            }
            result = instruction;
        }
        else {
            throw new Error("Not implemented yet: " + node.type);
        }
        result.startIndex = node.startIndex;
        result.endIndex = node.endIndex;
        return result;
    }
    node.cloneNode = cloneNode;
    function cloneChildren(childs) {
        var children = childs.map(function (child) { return cloneNode(child, true); });
        for (var i = 1; i < children.length; i++) {
            children[i].prev = children[i - 1];
            children[i - 1].next = children[i];
        }
        return children;
    }

    var constants = constants$1;
    var domhandler = node;

    var CASE_SENSITIVE_TAG_NAMES = constants.CASE_SENSITIVE_TAG_NAMES;

    var Comment = domhandler.Comment;
    var Element = domhandler.Element;
    var ProcessingInstruction = domhandler.ProcessingInstruction;
    var Text = domhandler.Text;

    var caseSensitiveTagNamesMap = {};
    var tagName;

    for (var i = 0, len = CASE_SENSITIVE_TAG_NAMES.length; i < len; i++) {
      tagName = CASE_SENSITIVE_TAG_NAMES[i];
      caseSensitiveTagNamesMap[tagName.toLowerCase()] = tagName;
    }

    /**
     * Gets case-sensitive tag name.
     *
     * @param  {string}           tagName - Tag name in lowercase.
     * @return {string|undefined}         - Case-sensitive tag name.
     */
    function getCaseSensitiveTagName(tagName) {
      return caseSensitiveTagNamesMap[tagName];
    }

    /**
     * Formats DOM attributes to a hash map.
     *
     * @param  {NamedNodeMap} attributes - List of attributes.
     * @return {object}                  - Map of attribute name to value.
     */
    function formatAttributes(attributes) {
      var result = {};
      var attribute;
      // `NamedNodeMap` is array-like
      for (var i = 0, len = attributes.length; i < len; i++) {
        attribute = attributes[i];
        result[attribute.name] = attribute.value;
      }
      return result;
    }

    /**
     * Corrects the tag name if it is case-sensitive (SVG).
     * Otherwise, returns the lowercase tag name (HTML).
     *
     * @param  {string} tagName - Lowercase tag name.
     * @return {string}         - Formatted tag name.
     */
    function formatTagName(tagName) {
      tagName = tagName.toLowerCase();
      var caseSensitiveTagName = getCaseSensitiveTagName(tagName);
      if (caseSensitiveTagName) {
        return caseSensitiveTagName;
      }
      return tagName;
    }

    /**
     * Transforms DOM nodes to `domhandler` nodes.
     *
     * @param  {NodeList}     nodes         - DOM nodes.
     * @param  {Element|null} [parent=null] - Parent node.
     * @param  {string}       [directive]   - Directive.
     * @return {Array<Comment|Element|ProcessingInstruction|Text>}
     */
    function formatDOM$1(nodes, parent, directive) {
      parent = parent || null;
      var result = [];

      for (var index = 0, len = nodes.length; index < len; index++) {
        var node = nodes[index];
        var current;

        // set the node data given the type
        switch (node.nodeType) {
          case 1:
            // script, style, or tag
            current = new Element(
              formatTagName(node.nodeName),
              formatAttributes(node.attributes)
            );
            current.children = formatDOM$1(node.childNodes, current);
            break;

          case 3:
            current = new Text(node.nodeValue);
            break;

          case 8:
            current = new Comment(node.nodeValue);
            break;

          default:
            continue;
        }

        // set previous node next
        var prev = result[index - 1] || null;
        if (prev) {
          prev.next = current;
        }

        // set properties for current node
        current.parent = parent;
        current.prev = prev;
        current.next = null;

        result.push(current);
      }

      if (directive) {
        current = new ProcessingInstruction(
          directive.substring(0, directive.indexOf(' ')).toLowerCase(),
          directive
        );
        current.next = result[0] || null;
        current.parent = parent;
        result.unshift(current);

        if (result[1]) {
          result[1].prev = result[0];
        }
      }

      return result;
    }

    /**
     * Detects if browser is Internet Explorer.
     *
     * @return {boolean} - Whether IE is detected.
     */
    function isIE$1() {
      return /(MSIE |Trident\/|Edge\/)/.test(navigator.userAgent);
    }

    var utilities = {
      formatAttributes: formatAttributes,
      formatDOM: formatDOM$1,
      isIE: isIE$1
    };

    // constants
    var HTML = 'html';
    var HEAD = 'head';
    var BODY = 'body';
    var FIRST_TAG_REGEX = /<([a-zA-Z]+[0-9]?)/; // e.g., <h1>
    var HEAD_TAG_REGEX = /<head.*>/i;
    var BODY_TAG_REGEX = /<body.*>/i;

    // falls back to `parseFromString` if `createHTMLDocument` cannot be used
    var parseFromDocument = function () {
      throw new Error(
        'This browser does not support `document.implementation.createHTMLDocument`'
      );
    };

    var parseFromString = function () {
      throw new Error(
        'This browser does not support `DOMParser.prototype.parseFromString`'
      );
    };

    /**
     * DOMParser (performance: slow).
     *
     * @see https://developer.mozilla.org/docs/Web/API/DOMParser#Parsing_an_SVG_or_HTML_document
     */
    if (typeof window.DOMParser === 'function') {
      var domParser = new window.DOMParser();
      var mimeType = 'text/html';

      /**
       * Creates an HTML document using `DOMParser.parseFromString`.
       *
       * @param  {string} html      - The HTML string.
       * @param  {string} [tagName] - The element to render the HTML (with 'body' as fallback).
       * @return {HTMLDocument}
       */
      parseFromString = function (html, tagName) {
        if (tagName) {
          html = '<' + tagName + '>' + html + '</' + tagName + '>';
        }

        return domParser.parseFromString(html, mimeType);
      };

      parseFromDocument = parseFromString;
    }

    /**
     * DOMImplementation (performance: fair).
     *
     * @see https://developer.mozilla.org/docs/Web/API/DOMImplementation/createHTMLDocument
     */
    if (document.implementation) {
      var isIE = utilities.isIE;

      // title parameter is required in IE
      // https://msdn.microsoft.com/en-us/library/ff975457(v=vs.85).aspx
      var doc = document.implementation.createHTMLDocument(
        isIE() ? 'html-dom-parser' : undefined
      );

      /**
       * Use HTML document created by `document.implementation.createHTMLDocument`.
       *
       * @param  {string} html      - The HTML string.
       * @param  {string} [tagName] - The element to render the HTML (with 'body' as fallback).
       * @return {HTMLDocument}
       */
      parseFromDocument = function (html, tagName) {
        if (tagName) {
          doc.documentElement.getElementsByTagName(tagName)[0].innerHTML = html;
          return doc;
        }

        doc.documentElement.innerHTML = html;
        return doc;
      };
    }

    /**
     * Template (performance: fast).
     *
     * @see https://developer.mozilla.org/docs/Web/HTML/Element/template
     */
    var template = document.createElement('template');
    var parseFromTemplate;

    if (template.content) {
      /**
       * Uses a template element (content fragment) to parse HTML.
       *
       * @param  {string} html - The HTML string.
       * @return {NodeList}
       */
      parseFromTemplate = function (html) {
        template.innerHTML = html;
        return template.content.childNodes;
      };
    }

    /**
     * Parses HTML string to DOM nodes.
     *
     * @param  {string}   html - HTML markup.
     * @return {NodeList}
     */
    function domparser$1(html) {
      var firstTagName;
      var match = html.match(FIRST_TAG_REGEX);

      if (match && match[1]) {
        firstTagName = match[1].toLowerCase();
      }

      var doc;
      var element;
      var elements;

      switch (firstTagName) {
        case HTML:
          doc = parseFromString(html);

          // the created document may come with filler head/body elements,
          // so make sure to remove them if they don't actually exist
          if (!HEAD_TAG_REGEX.test(html)) {
            element = doc.getElementsByTagName(HEAD)[0];
            if (element) {
              element.parentNode.removeChild(element);
            }
          }

          if (!BODY_TAG_REGEX.test(html)) {
            element = doc.getElementsByTagName(BODY)[0];
            if (element) {
              element.parentNode.removeChild(element);
            }
          }

          return doc.getElementsByTagName(HTML);

        case HEAD:
        case BODY:
          elements = parseFromDocument(html).getElementsByTagName(firstTagName);

          // if there's a sibling element, then return both elements
          if (BODY_TAG_REGEX.test(html) && HEAD_TAG_REGEX.test(html)) {
            return elements[0].parentNode.childNodes;
          }
          return elements;

        // low-level tag or text
        default:
          if (parseFromTemplate) {
            return parseFromTemplate(html);
          }

          return parseFromDocument(html, BODY).getElementsByTagName(BODY)[0]
            .childNodes;
      }
    }

    var domparser_1 = domparser$1;

    var domparser = domparser_1;
    var formatDOM = utilities.formatDOM;

    var DIRECTIVE_REGEX = /<(![a-zA-Z\s]+)>/; // e.g., <!doctype html>

    /**
     * Parses HTML string to DOM nodes in browser.
     *
     * @param  {string} html  - HTML markup.
     * @return {DomElement[]} - DOM elements.
     */
    function HTMLDOMParser(html) {
      if (typeof html !== 'string') {
        throw new TypeError('First argument must be a string');
      }

      if (html === '') {
        return [];
      }

      // match directive
      var match = html.match(DIRECTIVE_REGEX);
      var directive;

      if (match && match[1]) {
        directive = match[1];
      }

      return formatDOM(domparser(html), null, directive);
    }

    var htmlToDom = HTMLDOMParser;

    var domToReact = domToReact_1;
    var attributesToProps = attributesToProps_1;
    var htmlToDOM = htmlToDom;

    var domParserOptions = { lowerCaseAttributeNames: false };

    /**
     * Converts HTML string to React elements.
     *
     * @param  {String}   html                    - HTML string.
     * @param  {Object}   [options]               - Parser options.
     * @param  {Object}   [options.htmlparser2]   - htmlparser2 options.
     * @param  {Object}   [options.library]       - Library for React, Preact, etc.
     * @param  {Function} [options.replace]       - Replace method.
     * @return {JSX.Element|JSX.Element[]|String} - React element(s), empty array, or string.
     */
    function HTMLReactParser(html, options) {
      if (typeof html !== 'string') {
        throw new TypeError('First argument must be a string');
      }
      if (html === '') {
        return [];
      }
      options = options || {};
      return domToReact(
        htmlToDOM(html, options.htmlparser2 || domParserOptions),
        options
      );
    }

    HTMLReactParser.domToReact = domToReact;
    HTMLReactParser.htmlToDOM = htmlToDOM;
    HTMLReactParser.attributesToProps = attributesToProps;

    // support CommonJS and ES Modules
    htmlReactParser.exports = HTMLReactParser;
    htmlReactParser.exports.default = HTMLReactParser;

    var HTMLReactParser$1 = htmlReactParser.exports;

    HTMLReactParser$1.domToReact;
    HTMLReactParser$1.htmlToDOM;
    HTMLReactParser$1.attributesToProps;

    function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

    function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty$2(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

    class Select$1 extends React$2.Component {
      constructor(props) {
        super(props);
      }

      renderOptionGroup(group) {
        return /*#__PURE__*/React$2.createElement(OptionGroup, {
          label: group.label,
          disabled: group.disabled
        }, group.options.map(option => this.renderOption(option)));
      }

      renderOption(option) {
        const optionProps = (option => {
          const {
            children
          } = option,
                rest = _objectWithoutProperties$1(option, ["children"]);

          return _objectSpread(_objectSpread({}, rest), children ? {
            children: HTMLReactParser$1(children)
          } : {});
        })(option);

        return /*#__PURE__*/React$2.createElement(Option, optionProps);
      }

      render() {
        const {
          selectedRender
        } = this.props;
        return /*#__PURE__*/React$2.createElement(Select$2, _extends$2({}, this.props, {
          selectedRender: selectedRender ? options => HTMLReactParser$1(selectedRender(options)) : undefined
        }), this.props.list.map(optionOrGroup => optionOrGroup.options ? this.renderOptionGroup(optionOrGroup) : this.renderOption(optionOrGroup)));
      }

    }

    const Select = Compose(Select$1);

    exports.Select = Select;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
