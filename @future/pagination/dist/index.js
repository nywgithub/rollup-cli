(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, (global.future = global.future || {}, global.future.Pagination = factory()));
}(this, (function () { 'use strict';

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

    var n,u$1,i$1,t$1,o$1,r$1={},f$1=[],e$1=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;function c$1(n,l){for(var u in l)n[u]=l[u];return n}function s$1(n){var l=n.parentNode;l&&l.removeChild(n);}function a$1(n,l,u){var i,t,o,r=arguments,f={};for(o in l)"key"==o?i=l[o]:"ref"==o?t=l[o]:f[o]=l[o];if(arguments.length>3)for(u=[u],o=3;o<arguments.length;o++)u.push(r[o]);if(null!=u&&(f.children=u),"function"==typeof n&&null!=n.defaultProps)for(o in n.defaultProps)void 0===f[o]&&(f[o]=n.defaultProps[o]);return v$1(n,f,i,t,null)}function v$1(l,u,i,t,o){var r={type:l,props:u,key:i,ref:t,__k:null,__:null,__b:0,__e:null,__d:void 0,__c:null,__h:null,constructor:void 0,__v:null==o?++n.__v:o};return null!=n.vnode&&n.vnode(r),r}function h$1(){return {current:null}}function y$1(n){return n.children}function p$1(n,l){this.props=n,this.context=l;}function d$1(n,l){if(null==l)return n.__?d$1(n.__,n.__.__k.indexOf(n)+1):null;for(var u;l<n.__k.length;l++)if(null!=(u=n.__k[l])&&null!=u.__e)return u.__e;return "function"==typeof n.type?d$1(n):null}function _$1(n){var l,u;if(null!=(n=n.__)&&null!=n.__c){for(n.__e=n.__c.base=null,l=0;l<n.__k.length;l++)if(null!=(u=n.__k[l])&&null!=u.__e){n.__e=n.__c.base=u.__e;break}return _$1(n)}}function k$2(l){(!l.__d&&(l.__d=!0)&&u$1.push(l)&&!b$1.__r++||t$1!==n.debounceRendering)&&((t$1=n.debounceRendering)||i$1)(b$1);}function b$1(){for(var n;b$1.__r=u$1.length;)n=u$1.sort(function(n,l){return n.__v.__b-l.__v.__b}),u$1=[],n.some(function(n){var l,u,i,t,o,r;n.__d&&(o=(t=(l=n).__v).__e,(r=l.__P)&&(u=[],(i=c$1({},t)).__v=t.__v+1,I$1(r,t,i,l.__n,void 0!==r.ownerSVGElement,null!=t.__h?[o]:null,u,null==o?d$1(t):o,t.__h),T$2(u,t),t.__e!=o&&_$1(t)));});}function m$1(n,l,u,i,t,o,e,c,s,a){var h,p,_,k,b,m,w,A=i&&i.__k||f$1,P=A.length;for(u.__k=[],h=0;h<l.length;h++)if(null!=(k=u.__k[h]=null==(k=l[h])||"boolean"==typeof k?null:"string"==typeof k||"number"==typeof k||"bigint"==typeof k?v$1(null,k,null,null,k):Array.isArray(k)?v$1(y$1,{children:k},null,null,null):k.__b>0?v$1(k.type,k.props,k.key,null,k.__v):k)){if(k.__=u,k.__b=u.__b+1,null===(_=A[h])||_&&k.key==_.key&&k.type===_.type)A[h]=void 0;else for(p=0;p<P;p++){if((_=A[p])&&k.key==_.key&&k.type===_.type){A[p]=void 0;break}_=null;}I$1(n,k,_=_||r$1,t,o,e,c,s,a),b=k.__e,(p=k.ref)&&_.ref!=p&&(w||(w=[]),_.ref&&w.push(_.ref,null,k),w.push(p,k.__c||b,k)),null!=b?(null==m&&(m=b),"function"==typeof k.type&&null!=k.__k&&k.__k===_.__k?k.__d=s=g$2(k,s,n):s=x$2(n,k,_,A,b,s),a||"option"!==u.type?"function"==typeof u.type&&(u.__d=s):n.value=""):s&&_.__e==s&&s.parentNode!=n&&(s=d$1(_));}for(u.__e=m,h=P;h--;)null!=A[h]&&("function"==typeof u.type&&null!=A[h].__e&&A[h].__e==u.__d&&(u.__d=d$1(i,h+1)),L$1(A[h],A[h]));if(w)for(h=0;h<w.length;h++)z$1(w[h],w[++h],w[++h]);}function g$2(n,l,u){var i,t;for(i=0;i<n.__k.length;i++)(t=n.__k[i])&&(t.__=n,l="function"==typeof t.type?g$2(t,l,u):x$2(u,t,t,n.__k,t.__e,l));return l}function w$2(n,l){return l=l||[],null==n||"boolean"==typeof n||(Array.isArray(n)?n.some(function(n){w$2(n,l);}):l.push(n)),l}function x$2(n,l,u,i,t,o){var r,f,e;if(void 0!==l.__d)r=l.__d,l.__d=void 0;else if(null==u||t!=o||null==t.parentNode)n:if(null==o||o.parentNode!==n)n.appendChild(t),r=null;else {for(f=o,e=0;(f=f.nextSibling)&&e<i.length;e+=2)if(f==t)break n;n.insertBefore(t,o),r=o;}return void 0!==r?r:t.nextSibling}function A$2(n,l,u,i,t){var o;for(o in u)"children"===o||"key"===o||o in l||C$1(n,o,null,u[o],i);for(o in l)t&&"function"!=typeof l[o]||"children"===o||"key"===o||"value"===o||"checked"===o||u[o]===l[o]||C$1(n,o,l[o],u[o],i);}function P$1(n,l,u){"-"===l[0]?n.setProperty(l,u):n[l]=null==u?"":"number"!=typeof u||e$1.test(l)?u:u+"px";}function C$1(n,l,u,i,t){var o;n:if("style"===l)if("string"==typeof u)n.style.cssText=u;else {if("string"==typeof i&&(n.style.cssText=i=""),i)for(l in i)u&&l in u||P$1(n.style,l,"");if(u)for(l in u)i&&u[l]===i[l]||P$1(n.style,l,u[l]);}else if("o"===l[0]&&"n"===l[1])o=l!==(l=l.replace(/Capture$/,"")),l=l.toLowerCase()in n?l.toLowerCase().slice(2):l.slice(2),n.l||(n.l={}),n.l[l+o]=u,u?i||n.addEventListener(l,o?H$1:$$1,o):n.removeEventListener(l,o?H$1:$$1,o);else if("dangerouslySetInnerHTML"!==l){if(t)l=l.replace(/xlink[H:h]/,"h").replace(/sName$/,"s");else if("href"!==l&&"list"!==l&&"form"!==l&&"tabIndex"!==l&&"download"!==l&&l in n)try{n[l]=null==u?"":u;break n}catch(n){}"function"==typeof u||(null!=u&&(!1!==u||"a"===l[0]&&"r"===l[1])?n.setAttribute(l,u):n.removeAttribute(l));}}function $$1(l){this.l[l.type+!1](n.event?n.event(l):l);}function H$1(l){this.l[l.type+!0](n.event?n.event(l):l);}function I$1(l,u,i,t,o,r,f,e,s){var a,v,h,d,_,k,b,g,w,x,A,P=u.type;if(void 0!==u.constructor)return null;null!=i.__h&&(s=i.__h,e=u.__e=i.__e,u.__h=null,r=[e]),(a=n.__b)&&a(u);try{n:if("function"==typeof P){if(g=u.props,w=(a=P.contextType)&&t[a.__c],x=a?w?w.props.value:a.__:t,i.__c?b=(v=u.__c=i.__c).__=v.__E:("prototype"in P&&P.prototype.render?u.__c=v=new P(g,x):(u.__c=v=new p$1(g,x),v.constructor=P,v.render=M$1),w&&w.sub(v),v.props=g,v.state||(v.state={}),v.context=x,v.__n=t,h=v.__d=!0,v.__h=[]),null==v.__s&&(v.__s=v.state),null!=P.getDerivedStateFromProps&&(v.__s==v.state&&(v.__s=c$1({},v.__s)),c$1(v.__s,P.getDerivedStateFromProps(g,v.__s))),d=v.props,_=v.state,h)null==P.getDerivedStateFromProps&&null!=v.componentWillMount&&v.componentWillMount(),null!=v.componentDidMount&&v.__h.push(v.componentDidMount);else {if(null==P.getDerivedStateFromProps&&g!==d&&null!=v.componentWillReceiveProps&&v.componentWillReceiveProps(g,x),!v.__e&&null!=v.shouldComponentUpdate&&!1===v.shouldComponentUpdate(g,v.__s,x)||u.__v===i.__v){v.props=g,v.state=v.__s,u.__v!==i.__v&&(v.__d=!1),v.__v=u,u.__e=i.__e,u.__k=i.__k,u.__k.forEach(function(n){n&&(n.__=u);}),v.__h.length&&f.push(v);break n}null!=v.componentWillUpdate&&v.componentWillUpdate(g,v.__s,x),null!=v.componentDidUpdate&&v.__h.push(function(){v.componentDidUpdate(d,_,k);});}v.context=x,v.props=g,v.state=v.__s,(a=n.__r)&&a(u),v.__d=!1,v.__v=u,v.__P=l,a=v.render(v.props,v.state,v.context),v.state=v.__s,null!=v.getChildContext&&(t=c$1(c$1({},t),v.getChildContext())),h||null==v.getSnapshotBeforeUpdate||(k=v.getSnapshotBeforeUpdate(d,_)),A=null!=a&&a.type===y$1&&null==a.key?a.props.children:a,m$1(l,Array.isArray(A)?A:[A],u,i,t,o,r,f,e,s),v.base=u.__e,u.__h=null,v.__h.length&&f.push(v),b&&(v.__E=v.__=null),v.__e=!1;}else null==r&&u.__v===i.__v?(u.__k=i.__k,u.__e=i.__e):u.__e=j$2(i.__e,u,i,t,o,r,f,s);(a=n.diffed)&&a(u);}catch(l){u.__v=null,(s||null!=r)&&(u.__e=e,u.__h=!!s,r[r.indexOf(e)]=null),n.__e(l,u,i);}}function T$2(l,u){n.__c&&n.__c(u,l),l.some(function(u){try{l=u.__h,u.__h=[],l.some(function(n){n.call(u);});}catch(l){n.__e(l,u.__v);}});}function j$2(n,l,u,i,t,o,e,c){var a,v,h,y,p=u.props,d=l.props,_=l.type,k=0;if("svg"===_&&(t=!0),null!=o)for(;k<o.length;k++)if((a=o[k])&&(a===n||(_?a.localName==_:3==a.nodeType))){n=a,o[k]=null;break}if(null==n){if(null===_)return document.createTextNode(d);n=t?document.createElementNS("http://www.w3.org/2000/svg",_):document.createElement(_,d.is&&d),o=null,c=!1;}if(null===_)p===d||c&&n.data===d||(n.data=d);else {if(o=o&&f$1.slice.call(n.childNodes),v=(p=u.props||r$1).dangerouslySetInnerHTML,h=d.dangerouslySetInnerHTML,!c){if(null!=o)for(p={},y=0;y<n.attributes.length;y++)p[n.attributes[y].name]=n.attributes[y].value;(h||v)&&(h&&(v&&h.__html==v.__html||h.__html===n.innerHTML)||(n.innerHTML=h&&h.__html||""));}if(A$2(n,d,p,t,c),h)l.__k=[];else if(k=l.props.children,m$1(n,Array.isArray(k)?k:[k],l,u,i,t&&"foreignObject"!==_,o,e,n.firstChild,c),null!=o)for(k=o.length;k--;)null!=o[k]&&s$1(o[k]);c||("value"in d&&void 0!==(k=d.value)&&(k!==n.value||"progress"===_&&!k)&&C$1(n,"value",k,p.value,!1),"checked"in d&&void 0!==(k=d.checked)&&k!==n.checked&&C$1(n,"checked",k,p.checked,!1));}return n}function z$1(l,u,i){try{"function"==typeof l?l(u):l.current=u;}catch(l){n.__e(l,i);}}function L$1(l,u,i){var t,o,r;if(n.unmount&&n.unmount(l),(t=l.ref)&&(t.current&&t.current!==l.__e||z$1(t,null,u)),i||"function"==typeof l.type||(i=null!=(o=l.__e)),l.__e=l.__d=void 0,null!=(t=l.__c)){if(t.componentWillUnmount)try{t.componentWillUnmount();}catch(l){n.__e(l,u);}t.base=t.__P=null;}if(t=l.__k)for(r=0;r<t.length;r++)t[r]&&L$1(t[r],u,i);null!=o&&s$1(o);}function M$1(n,l,u){return this.constructor(n,u)}function N$1(l,u,i){var t,o,e;n.__&&n.__(l,u),o=(t="function"==typeof i)?null:i&&i.__k||u.__k,e=[],I$1(u,l=(!t&&i||u).__k=a$1(y$1,null,[l]),o||r$1,r$1,void 0!==u.ownerSVGElement,!t&&i?[i]:o?null:u.firstChild?f$1.slice.call(u.childNodes):null,e,!t&&i?i:o?o.__e:u.firstChild,t),T$2(e,l);}function O$1(n,l){N$1(n,l,O$1);}function S$1(n,l,u){var i,t,o,r=arguments,f=c$1({},n.props);for(o in l)"key"==o?i=l[o]:"ref"==o?t=l[o]:f[o]=l[o];if(arguments.length>3)for(u=[u],o=3;o<arguments.length;o++)u.push(r[o]);return null!=u&&(f.children=u),v$1(n.type,f,i||n.key,t||n.ref,null)}function q$1(n,l){var u={__c:l="__cC"+o$1++,__:n,Consumer:function(n,l){return n.children(l)},Provider:function(n){var u,i;return this.getChildContext||(u=[],(i={})[l]=this,this.getChildContext=function(){return i},this.shouldComponentUpdate=function(n){this.props.value!==n.value&&u.some(k$2);},this.sub=function(n){u.push(n);var l=n.componentWillUnmount;n.componentWillUnmount=function(){u.splice(u.indexOf(n),1),l&&l.call(n);};}),n.children}};return u.Provider.__=u.Consumer.contextType=u}n={__e:function(n,l){for(var u,i,t;l=l.__;)if((u=l.__c)&&!u.__)try{if((i=u.constructor)&&null!=i.getDerivedStateFromError&&(u.setState(i.getDerivedStateFromError(n)),t=u.__d),null!=u.componentDidCatch&&(u.componentDidCatch(n),t=u.__d),t)return u.__E=u}catch(l){n=l;}throw n},__v:0},p$1.prototype.setState=function(n,l){var u;u=null!=this.__s&&this.__s!==this.state?this.__s:this.__s=c$1({},this.state),"function"==typeof n&&(n=n(c$1({},u),this.props)),n&&c$1(u,n),null!=n&&this.__v&&(l&&this.__h.push(l),k$2(this));},p$1.prototype.forceUpdate=function(n){this.__v&&(this.__e=!0,n&&this.__h.push(n),k$2(this));},p$1.prototype.render=y$1,u$1=[],i$1="function"==typeof Promise?Promise.prototype.then.bind(Promise.resolve()):setTimeout,b$1.__r=0,o$1=0;

    var t,u,r,o=0,i=[],c=n.__b,f=n.__r,e=n.diffed,a=n.__c,v=n.unmount;function m(t,r){n.__h&&n.__h(u,t,o||r),o=0;var i=u.__H||(u.__H={__:[],__h:[]});return t>=i.__.length&&i.__.push({}),i.__[t]}function l(n){return o=1,p(w$1,n)}function p(n,r,o){var i=m(t++,2);return i.t=n,i.__c||(i.__=[o?o(r):w$1(void 0,r),function(n){var t=i.t(i.__[0],n);i.__[0]!==t&&(i.__=[t,i.__[1]],i.__c.setState({}));}],i.__c=u),i.__}function y(r,o){var i=m(t++,3);!n.__s&&k$1(i.__H,o)&&(i.__=r,i.__H=o,u.__H.__h.push(i));}function h(r,o){var i=m(t++,4);!n.__s&&k$1(i.__H,o)&&(i.__=r,i.__H=o,u.__h.push(i));}function s(n){return o=5,d(function(){return {current:n}},[])}function _(n,t,u){o=6,h(function(){"function"==typeof n?n(t()):n&&(n.current=t());},null==u?u:u.concat(n));}function d(n,u){var r=m(t++,7);return k$1(r.__H,u)&&(r.__=n(),r.__H=u,r.__h=n),r.__}function A$1(n,t){return o=8,d(function(){return n},t)}function F$1(n){var r=u.context[n.__c],o=m(t++,9);return o.__c=n,r?(null==o.__&&(o.__=!0,r.sub(u)),r.props.value):n.__}function T$1(t,u){n.useDebugValue&&n.useDebugValue(u?u(t):t);}function x$1(){i.forEach(function(t){if(t.__P)try{t.__H.__h.forEach(g$1),t.__H.__h.forEach(j$1),t.__H.__h=[];}catch(u){t.__H.__h=[],n.__e(u,t.__v);}}),i=[];}n.__b=function(n){u=null,c&&c(n);},n.__r=function(n){f&&f(n),t=0;var r=(u=n.__c).__H;r&&(r.__h.forEach(g$1),r.__h.forEach(j$1),r.__h=[]);},n.diffed=function(t){e&&e(t);var o=t.__c;o&&o.__H&&o.__H.__h.length&&(1!==i.push(o)&&r===n.requestAnimationFrame||((r=n.requestAnimationFrame)||function(n){var t,u=function(){clearTimeout(r),b&&cancelAnimationFrame(t),setTimeout(n);},r=setTimeout(u,100);b&&(t=requestAnimationFrame(u));})(x$1)),u=void 0;},n.__c=function(t,u){u.some(function(t){try{t.__h.forEach(g$1),t.__h=t.__h.filter(function(n){return !n.__||j$1(n)});}catch(r){u.some(function(n){n.__h&&(n.__h=[]);}),u=[],n.__e(r,t.__v);}}),a&&a(t,u);},n.unmount=function(t){v&&v(t);var u=t.__c;if(u&&u.__H)try{u.__H.__.forEach(g$1);}catch(t){n.__e(t,u.__v);}};var b="function"==typeof requestAnimationFrame;function g$1(n){var t=u;"function"==typeof n.__c&&n.__c(),u=t;}function j$1(n){var t=u;n.__c=n.__(),u=t;}function k$1(n,t){return !n||n.length!==t.length||t.some(function(t,u){return t!==n[u]})}function w$1(n,t){return "function"==typeof t?t(n):t}

    function C(n,t){for(var e in t)n[e]=t[e];return n}function S(n,t){for(var e in n)if("__source"!==e&&!(e in t))return !0;for(var r in t)if("__source"!==r&&n[r]!==t[r])return !0;return !1}function E(n){this.props=n;}function g(n,t){function e(n){var e=this.props.ref,r=e==n.ref;return !r&&e&&(e.call?e(null):e.current=null),t?!t(this.props,n)||!r:S(this.props,n)}function r(t){return this.shouldComponentUpdate=e,a$1(n,t)}return r.displayName="Memo("+(n.displayName||n.name)+")",r.prototype.isReactComponent=!0,r.__f=!0,r}(E.prototype=new p$1).isPureReactComponent=!0,E.prototype.shouldComponentUpdate=function(n,t){return S(this.props,n)||S(this.state,t)};var w=n.__b;n.__b=function(n){n.type&&n.type.__f&&n.ref&&(n.props.ref=n.ref,n.ref=null),w&&w(n);};var R="undefined"!=typeof Symbol&&Symbol.for&&Symbol.for("react.forward_ref")||3911;function x(n){function t(t,e){var r=C({},t);return delete r.ref,n(r,(e=t.ref||e)&&("object"!=typeof e||"current"in e)?e:null)}return t.$$typeof=R,t.render=t,t.prototype.isReactComponent=t.__f=!0,t.displayName="ForwardRef("+(n.displayName||n.name)+")",t}var N=function(n,t){return null==n?null:w$2(w$2(n).map(t))},k={map:N,forEach:N,count:function(n){return n?w$2(n).length:0},only:function(n){var t=w$2(n);if(1!==t.length)throw "Children.only";return t[0]},toArray:w$2},A=n.__e;n.__e=function(n,t,e){if(n.then)for(var r,u=t;u=u.__;)if((r=u.__c)&&r.__c)return null==t.__e&&(t.__e=e.__e,t.__k=e.__k),r.__c(n,t);A(n,t,e);};var O=n.unmount;function L(){this.__u=0,this.t=null,this.__b=null;}function U(n){var t=n.__.__c;return t&&t.__e&&t.__e(n)}function D(n){var t,e,r;function u(u){if(t||(t=n()).then(function(n){e=n.default||n;},function(n){r=n;}),r)throw r;if(!e)throw t;return a$1(e,u)}return u.displayName="Lazy",u.__f=!0,u}function F(){this.u=null,this.o=null;}n.unmount=function(n){var t=n.__c;t&&t.__R&&t.__R(),t&&!0===n.__h&&(n.type=null),O&&O(n);},(L.prototype=new p$1).__c=function(n,t){var e=t.__c,r=this;null==r.t&&(r.t=[]),r.t.push(e);var u=U(r.__v),o=!1,i=function(){o||(o=!0,e.__R=null,u?u(l):l());};e.__R=i;var l=function(){if(!--r.__u){if(r.state.__e){var n=r.state.__e;r.__v.__k[0]=function n(t,e,r){return t&&(t.__v=null,t.__k=t.__k&&t.__k.map(function(t){return n(t,e,r)}),t.__c&&t.__c.__P===e&&(t.__e&&r.insertBefore(t.__e,t.__d),t.__c.__e=!0,t.__c.__P=r)),t}(n,n.__c.__P,n.__c.__O);}var t;for(r.setState({__e:r.__b=null});t=r.t.pop();)t.forceUpdate();}},f=!0===t.__h;r.__u++||f||r.setState({__e:r.__b=r.__v.__k[0]}),n.then(i,i);},L.prototype.componentWillUnmount=function(){this.t=[];},L.prototype.render=function(n,t){if(this.__b){if(this.__v.__k){var e=document.createElement("div"),r=this.__v.__k[0].__c;this.__v.__k[0]=function n(t,e,r){return t&&(t.__c&&t.__c.__H&&(t.__c.__H.__.forEach(function(n){"function"==typeof n.__c&&n.__c();}),t.__c.__H=null),null!=(t=C({},t)).__c&&(t.__c.__P===r&&(t.__c.__P=e),t.__c=null),t.__k=t.__k&&t.__k.map(function(t){return n(t,e,r)})),t}(this.__b,e,r.__O=r.__P);}this.__b=null;}var u=t.__e&&a$1(y$1,null,n.fallback);return u&&(u.__h=null),[a$1(y$1,null,t.__e?null:n.children),u]};var M=function(n,t,e){if(++e[1]===e[0]&&n.o.delete(t),n.props.revealOrder&&("t"!==n.props.revealOrder[0]||!n.o.size))for(e=n.u;e;){for(;e.length>3;)e.pop()();if(e[1]<e[0])break;n.u=e=e[2];}};function T(n){return this.getChildContext=function(){return n.context},n.children}function j(n){var t=this,e=n.i;t.componentWillUnmount=function(){N$1(null,t.l),t.l=null,t.i=null;},t.i&&t.i!==e&&t.componentWillUnmount(),n.__v?(t.l||(t.i=e,t.l={nodeType:1,parentNode:e,childNodes:[],appendChild:function(n){this.childNodes.push(n),t.i.appendChild(n);},insertBefore:function(n,e){this.childNodes.push(n),t.i.appendChild(n);},removeChild:function(n){this.childNodes.splice(this.childNodes.indexOf(n)>>>1,1),t.i.removeChild(n);}}),N$1(a$1(T,{context:t.context},n.__v),t.l)):t.l&&t.componentWillUnmount();}function I(n,t){return a$1(j,{__v:n,i:t})}(F.prototype=new p$1).__e=function(n){var t=this,e=U(t.__v),r=t.o.get(n);return r[0]++,function(u){var o=function(){t.props.revealOrder?(r.push(u),M(t,n,r)):u();};e?e(o):o();}},F.prototype.render=function(n){this.u=null,this.o=new Map;var t=w$2(n.children);n.revealOrder&&"b"===n.revealOrder[0]&&t.reverse();for(var e=t.length;e--;)this.o.set(t[e],this.u=[1,0,this.u]);return n.children},F.prototype.componentDidUpdate=F.prototype.componentDidMount=function(){var n=this;this.o.forEach(function(t,e){M(n,e,t);});};var W="undefined"!=typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103,P=/^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|fill|flood|font|glyph(?!R)|horiz|marker(?!H|W|U)|overline|paint|stop|strikethrough|stroke|text(?!L)|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/,V=function(n){return ("undefined"!=typeof Symbol&&"symbol"==typeof Symbol()?/fil|che|rad/i:/fil|che|ra/i).test(n)};function z(n,t,e){return null==t.__k&&(t.textContent=""),N$1(n,t),"function"==typeof e&&e(),n?n.__c:null}function B(n,t,e){return O$1(n,t),"function"==typeof e&&e(),n?n.__c:null}p$1.prototype.isReactComponent={},["componentWillMount","componentWillReceiveProps","componentWillUpdate"].forEach(function(n){Object.defineProperty(p$1.prototype,n,{configurable:!0,get:function(){return this["UNSAFE_"+n]},set:function(t){Object.defineProperty(this,n,{configurable:!0,writable:!0,value:t});}});});var H=n.event;function Z(){}function Y(){return this.cancelBubble}function $(){return this.defaultPrevented}n.event=function(n){return H&&(n=H(n)),n.persist=Z,n.isPropagationStopped=Y,n.isDefaultPrevented=$,n.nativeEvent=n};var q,G={configurable:!0,get:function(){return this.class}},J=n.vnode;n.vnode=function(n){var t=n.type,e=n.props,r=e;if("string"==typeof t){for(var u in r={},e){var o=e[u];"value"===u&&"defaultValue"in e&&null==o||("defaultValue"===u&&"value"in e&&null==e.value?u="value":"download"===u&&!0===o?o="":/ondoubleclick/i.test(u)?u="ondblclick":/^onchange(textarea|input)/i.test(u+t)&&!V(e.type)?u="oninput":/^on(Ani|Tra|Tou|BeforeInp)/.test(u)?u=u.toLowerCase():P.test(u)?u=u.replace(/[A-Z0-9]/,"-$&").toLowerCase():null===o&&(o=void 0),r[u]=o);}"select"==t&&r.multiple&&Array.isArray(r.value)&&(r.value=w$2(e.children).forEach(function(n){n.props.selected=-1!=r.value.indexOf(n.props.value);})),"select"==t&&null!=r.defaultValue&&(r.value=w$2(e.children).forEach(function(n){n.props.selected=r.multiple?-1!=r.defaultValue.indexOf(n.props.value):r.defaultValue==n.props.value;})),n.props=r;}t&&e.class!=e.className&&(G.enumerable="className"in e,null!=e.className&&(r.class=e.className),Object.defineProperty(r,"className",G)),n.$$typeof=W,J&&J(n);};var K=n.__r;n.__r=function(n){K&&K(n),q=n.__c;};var Q={ReactCurrentDispatcher:{current:{readContext:function(n){return q.__n[n.__c].props.value}}}};"object"==typeof performance&&"function"==typeof performance.now?performance.now.bind(performance):function(){return Date.now()};function fn(n){return a$1.bind(null,n)}function cn(n){return !!n&&n.$$typeof===W}function an(n){return cn(n)?S$1.apply(null,arguments):n}function sn(n){return !!n.__k&&(N$1(null,n),!0)}function hn(n){return n&&(n.base||1===n.nodeType&&n)||null}var pn=function(n,t){return n(t)};var React = {useState:l,useReducer:p,useEffect:y,useLayoutEffect:h,useRef:s,useImperativeHandle:_,useMemo:d,useCallback:A$1,useContext:F$1,useDebugValue:T$1,version:"16.8.0",Children:k,render:z,hydrate:B,unmountComponentAtNode:sn,createPortal:I,createElement:a$1,createContext:q$1,createFactory:fn,cloneElement:an,createRef:h$1,Fragment:y$1,isValidElement:cn,findDOMNode:hn,Component:p$1,PureComponent:E,memo:g,forwardRef:x,unstable_batchedUpdates:pn,StrictMode:y$1,Suspense:L,SuspenseList:F,lazy:D,__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED:Q};

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

    function Compose(Component) {
        return /*#__PURE__*/function () {
            function _class(el, props) {
                this.el = el;
                this.props = props;
                this.render();
            }

            var _proto = _class.prototype;

            _proto.render = function render() {
                React.render(React.createElement(Component, this.props), this.el);
            };

            _proto.setProps = function setProps(props) {
                this.props = _extends$1({}, this.props, props);
                this.render();
            };

            _proto.destroy = function destroy() {
                React.unmountComponentAtNode(this.el);
            };

            return _class;
        }();
    }

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

    function _toConsumableArray(arr) {
      return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
    }

    function _arrayWithoutHoles(arr) {
      if (Array.isArray(arr)) return _arrayLikeToArray(arr);
    }

    function _iterableToArray(iter) {
      if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
    }

    function _unsupportedIterableToArray(o, minLen) {
      if (!o) return;
      if (typeof o === "string") return _arrayLikeToArray(o, minLen);
      var n = Object.prototype.toString.call(o).slice(8, -1);
      if (n === "Object" && o.constructor) n = o.constructor.name;
      if (n === "Map" || n === "Set") return Array.from(o);
      if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
    }

    function _arrayLikeToArray(arr, len) {
      if (len == null || len > arr.length) len = arr.length;

      for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

      return arr2;
    }

    function _nonIterableSpread() {
      throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
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

    var BranchViewFactory = function BranchViewFactory(truly) {
      return function (props) {
        return truly ? React.createElement(React.Fragment, null, props.children) : null;
      };
    };

    var css_248z = ".ft-pagination{display:flex;align-items:stretch}.ft-pagination.is-simple .ft-pagination-item{padding:7.5px 10px}.ft-pagination-item{padding:5px 10px;border:1px solid #dae0e6;background:#fff;color:#222;font-size:14px;line-height:1.5;text-decoration:none;display:inline-flex}.ft-pagination-item+.ft-pagination-item{border-left:none}.ft-pagination-item:first-child{border-top-left-radius:4px;border-bottom-left-radius:4px}.ft-pagination-item:last-child{border-top-right-radius:4px;border-bottom-right-radius:4px}.ft-pagination-item:hover{color:#222;background:#f5f7fa;text-decoration:none}.ft-pagination-item.is-disabled,.ft-pagination-item.is-disabled:hover{cursor:default;background:#f5f7fa;border:1px solid #ced3d9;color:#b3b3b3}.ft-pagination-item.is-active,.ft-pagination-item.is-more{border:none;background:unset}.ft-pagination-item.is-active+.ft-pagination-item,.ft-pagination-item.is-more+.ft-pagination-item{border-left:1px solid #dae0e6}.ft-pagination-item.is-active{color:#e64545}.ft-pagination-item.is-more{padding:5px}.ft-pagination-item .ft-icon{font-size:16px;line-height:1;display:inline-flex;align-items:center}";
    styleInject(css_248z, {id: "future-pagination-1.1.4"});

    var Pagination = /*#__PURE__*/function (_React$Component) {
      _inherits(Pagination, _React$Component);

      var _super = _createSuper(Pagination);

      function Pagination(props) {
        var _this;

        _classCallCheck(this, Pagination);

        _this = _super.call(this, props);

        _defineProperty(_assertThisInitialized(_this), "handlePageChange", function (newPageNo) {
          var _this$props = _this.props,
              pageNo = _this$props.pageNo,
              onChange = _this$props.onChange;
          var pagesCount = _this.state.pagesCount;
          var newPage = newPageNo;
          /* istanbul ignore if */

          if (!isNaN(newPage)) {
            if (newPage < 1) {
              newPage = 1;
            }

            if (newPage > pagesCount) {
              newPage = pagesCount;
            }
          }

          if (newPage !== pageNo) {
            onChange && onChange(newPage);
          }
        });

        var isSimple = props.isSimple;
        _this.state = {
          centerPages: [],
          pagesCount: _this.getPagesCount()
        };
        _this.NormalView = BranchViewFactory(!isSimple);
        _this.SimpleView = BranchViewFactory(!!isSimple);
        return _this;
      }

      _createClass(Pagination, [{
        key: "getPagesCount",
        value: function getPagesCount() {
          var _this$props2 = this.props,
              pageSize = _this$props2.pageSize,
              total = _this$props2.total;
          return Math.ceil(total / pageSize);
        }
      }, {
        key: "updateShowMore",
        value: function updateShowMore() {
          var _this2 = this;

          var pagerItemsCount = Pagination.DEFAULT_PAGER_COUNT;
          var pageNo = this.props.pageNo;
          var pagesCount = this.state.pagesCount;
          var showPrevMore = false;
          var showNextMore = false;

          if (pagesCount > pagerItemsCount) {
            if (pageNo > pagerItemsCount - 3) {
              showPrevMore = true;
            }

            if (pageNo < pagesCount - 3) {
              showNextMore = true;
            }
          }

          this.setState({
            showPrevMore: showPrevMore,
            showNextMore: showNextMore
          }, function () {
            _this2.setState({
              centerPages: _this2.getCenterPages()
            });
          });
        }
      }, {
        key: "getCenterPages",
        value: function getCenterPages() {
          var pagerCount = Pagination.DEFAULT_PAGER_COUNT;
          var pageNo = this.props.pageNo;
          var _this$state = this.state,
              showPrevMore = _this$state.showPrevMore,
              showNextMore = _this$state.showNextMore,
              pagesCount = _this$state.pagesCount;
          var array = [];

          if (showPrevMore && !showNextMore) {
            var startPage = pagesCount - (pagerCount - 2);

            for (var i = startPage; i < pagesCount; i++) {
              array.push(i);
            }
          } else if (!showPrevMore && showNextMore) {
            for (var _i = 2; _i < pagerCount; _i++) {
              array.push(_i);
            }
          } else if (showPrevMore && showNextMore) {
            var offset = Math.floor(pagerCount / 2) - 1;

            for (var _i2 = pageNo - offset; _i2 <= pageNo + offset; _i2++) {
              array.push(_i2);
            }
          } else {
            for (var _i3 = 2; _i3 < pagesCount; _i3++) {
              array.push(_i3);
            }
          }

          return array;
        }
      }, {
        key: "urlFactory",
        value: function urlFactory(pageNo) {
          var formatURL = this.props.formatURL;
          var url = Pagination.NONE_URL;

          if (formatURL) {
            url = formatURL(pageNo);
          }

          return url;
        }
      }, {
        key: "render",
        value: function render() {
          var _this3 = this;

          var _this$props3 = this.props,
              _this$props3$classNam = _this$props3.className,
              className = _this$props3$classNam === void 0 ? "" : _this$props3$classNam,
              pageNo = _this$props3.pageNo,
              target = _this$props3.target,
              showPrev = _this$props3.showPrev,
              showNext = _this$props3.showNext;
          var _this$state2 = this.state,
              showPrevMore = _this$state2.showPrevMore,
              showNextMore = _this$state2.showNextMore,
              pagesCount = _this$state2.pagesCount,
              centerPages = _this$state2.centerPages;
          var NormalView = this.NormalView,
              SimpleView = this.SimpleView;
          var isFirstPage = pageNo === 1;
          var isLastPage = pageNo === pagesCount;
          var prev = /*#__PURE__*/React.createElement(Page, {
            className: classNames(isFirstPage && "is-disabled"),
            isAnchor: !isFirstPage,
            pageNumber: pageNo - 1,
            href: this.urlFactory(pageNo - 1),
            target: target,
            onChange: this.handlePageChange
          }, /*#__PURE__*/React.createElement("i", {
            className: "ft-icon icon-left"
          }));
          var next = /*#__PURE__*/React.createElement(Page, {
            className: classNames(isLastPage && "is-disabled"),
            isAnchor: !isLastPage,
            pageNumber: pageNo + 1,
            href: this.urlFactory(pageNo + 1),
            target: target,
            onChange: this.handlePageChange
          }, /*#__PURE__*/React.createElement("i", {
            className: "ft-icon icon-right"
          }));
          var more = /*#__PURE__*/React.createElement("span", {
            className: "ft-pagination-item is-more"
          }, /*#__PURE__*/React.createElement("i", {
            className: "ft-icon icon-more"
          }));
          return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(NormalView, null, /*#__PURE__*/React.createElement("div", {
            className: classNames("ft-pagination", className)
          }, showPrev && prev, pagesCount > 0 && [1, showPrevMore && more].concat(_toConsumableArray(centerPages), [showNextMore && more, pagesCount > 1 && pagesCount]).filter(Boolean).map(function (numberOrElement, i) {
            return typeof numberOrElement === "number" ? /*#__PURE__*/React.createElement(Page, {
              className: classNames(pageNo === numberOrElement && "is-active"),
              isAnchor: pageNo !== numberOrElement,
              pageNumber: numberOrElement,
              href: _this3.urlFactory(numberOrElement),
              target: target,
              onChange: _this3.handlePageChange,
              key: numberOrElement
            }) : /*#__PURE__*/React.cloneElement(numberOrElement, {
              key: "more" + i
            });
          }), showNext && next)), /*#__PURE__*/React.createElement(SimpleView, null, /*#__PURE__*/React.createElement("div", {
            className: classNames("ft-pagination is-simple", className)
          }, prev, next)));
        }
      }, {
        key: "componentDidMount",
        value: function componentDidMount() {
          this.updateShowMore();
        }
      }, {
        key: "componentDidUpdate",
        value: function componentDidUpdate(prevProps) {
          var _this4 = this;

          var _this$props4 = this.props,
              pageNo = _this$props4.pageNo,
              total = _this$props4.total,
              pageSize = _this$props4.pageSize;

          if (prevProps.pageNo !== pageNo) {
            this.updateShowMore();
          }

          if (prevProps.total !== total || prevProps.pageSize !== pageSize) {
            this.setState({
              pagesCount: this.getPagesCount()
            }, function () {
              _this4.updateShowMore();
            });
          }
        }
      }]);

      return Pagination;
    }(React.Component);

    _defineProperty(Pagination, "NONE_URL", "javascript: void(0);");

    _defineProperty(Pagination, "DEFAULT_PAGER_COUNT", 7);

    _defineProperty(Pagination, "defaultProps", {
      showPrev: true,
      showNext: true
    });

    var Page = function Page(props) {
      var pageNumber = props.pageNumber,
          isAnchor = props.isAnchor,
          onChange = props.onChange,
          href = props.href,
          className = props.className,
          target = props.target,
          children = props.children;
      var Tag = isAnchor ? "a" : "span";
      var anchorHTMLAttributes = {
        href: href,
        target: target,
        onClick: function onClick(e) {
          e.stopPropagation();
          isAnchor && onChange && onChange(pageNumber);
        }
      };
      return /*#__PURE__*/React.createElement(Tag, _extends({
        className: classNames("ft-pagination-item", className)
      }, isAnchor ? anchorHTMLAttributes : {}), children || pageNumber);
    };

    var index = Compose(Pagination);

    return index;

})));
