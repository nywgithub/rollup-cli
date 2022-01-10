(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.future = global.future || {}, global.future.Dialog = {})));
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

    var css_248z = ".ft-dlg-state-notitle .ft-dlg-titlebar{*zoom:1}.ft-dlg-state-notitle .ft-dlg-titlebar:after,.ft-dlg-state-notitle .ft-dlg-titlebar:before{content:\"\";display:table}.ft-dlg-state-notitle .ft-dlg-titlebar:after{clear:both}.ft-dlg-dialog{background:#fff;border-radius:3px;box-shadow:0 2px 30px rgba(0,0,0,.3)}.ft-dlg-dialog ::-webkit-scrollbar{width:10px;background:#fff}.ft-dlg-dialog ::-webkit-scrollbar-thumb{background:#dae0e6;border-radius:5px}.ft-dlg-outer{text-align:left}.ft-dlg-header{*zoom:1}.ft-dlg-titlebar{position:relative;height:100%;width:100%;*zoom:1}.ft-dlg-title{padding:20px;*min-width:760px;background-color:#fff;border-radius:3px 3px 0 0;border-bottom:1px solid #e6ecf2;color:#222;font-size:16px;line-height:1.5;font-weight:700;overflow:hidden;text-overflow:ellipsis;*zoom:1}.ft-dlg-close{display:block;position:absolute;text-decoration:none;outline:none;padding:0;height:100%;top:0;right:0;z-index:1;font-size:0;line-height:0;cursor:pointer;_cursor:pointer}.ft-dlg-close .icon-delete{color:rgba(34,34,34,.5);font-size:16px;top:50%;right:20px;position:absolute;transform:translateY(-50%)}.ft-dlg-close .icon-delete:hover{color:#222}.ft-dlg-icon{vertical-align:middle}.ft-dlg-icon div{width:48px;height:48px;margin:10px 0 10px 10px;background-position:50%;background-repeat:no-repeat}.ft-dlg-main{min-width:300px;position:relative}.ft-dlg-content{*zoom:1;border:0;padding:20px;position:relative}.ft-dlg-content:after,.ft-dlg-content:before{content:\"\";display:table}.ft-dlg-content:after{clear:both}.ft-dlg-content.ft-dlg-state-full{display:block;width:100%;margin:0;padding:0!important;height:100%}.ft-dlg-footer{padding:20px;border-top:1px solid #dae0e6;border-radius:0 0 3px 3px;box-sizing:border-box;background-color:#fff}.ft-dlg-buttons{text-align:right;white-space:nowrap;border-radius:0 0 3px 3px;display:flex;flex-direction:row-reverse}.ft-dlg-buttons button{margin-left:10px;padding:5px 15px;height:auto;border-radius:4px;font-size:15px;line-height:1.5}.ft-dlg-inner{background:#fff}.ft-dlg-se{position:absolute;right:0;width:6px;height:6px;background:#3d4b66;border-radius:0 0 3px 0}.ft-dlg-se,.ft-dlg-state-notitle .ft-dlg-title{display:none}.ft-dlg-state-notitle .ft-dlg-se{width:3px;height:3px;background:none!important}.ft-dlg-state-notitle .ft-dlg-inner{background:none}.ft-dlg-state-notitle .ft-dlg-outer{border:0}.ft-dlg-state-notitle .ft-dlg-titlebar{bottom:0;_bottom:0;_margin-top:0;z-index:5}.ft-dlg-state-notitle .ft-dlg-close{position:static;float:right;width:30px;height:30px;margin-bottom:-30px;background-position:-5px -5px}.ft-dlg-state-notitle .ft-dlg-close:hover{background-position:-5px -45px}.ft-dlg-state-notitle .ft-dlg-result{padding-top:20px;padding-bottom:10px}.ft-dlg-state-notitle .ft-dlg-result .msg p{margin-bottom:10px}.ft-dlg-state-lock .ft-dlg-se{background:#333;background:#333\\9!important}.ft-dlg-state-lock #ft-dlg-default-focus-elem:focus,.ft-dlg-state-lock #ft-dlg-default-focus-elem:focus-visible{outline:0}.ft-notice-dialog{border-radius:6px;overflow:hidden}.ft-notice-dialog .ft-dlg-close{position:absolute}.ft-notice-dialog .ft-dlg-close .icon-delete{right:50%;transform:translate(50%,-50%)}.ft-notice-dialog .ft-dlg-content{padding:30px 30px 0}.ft-notice-dialog .ft-dlg-footer{margin-top:10px;border-top:none;padding:0 30px 30px}.ft-notice-dialog .ft-notice-content{width:390px;min-height:80px;display:flex}.ft-notice-dialog .ft-notice-content .ft-icon{font-size:24px;line-height:1;flex-shrink:0}.ft-notice-dialog .ft-notice-content .icon-yes{color:#13bf13}.ft-notice-dialog .ft-notice-content .icon-error{color:#e64545}.ft-notice-dialog .ft-notice-content .icon-caution{color:#ff9500}.ft-notice-dialog .ft-notice-content .icon-info{color:#2e8ae6}.ft-notice-dialog .ft-notice-content .notice-main{margin-left:10px;flex-grow:1}.ft-notice-dialog .ft-notice-content .notice-title{color:#222;font-size:16px;font-weight:700}.ft-notice-dialog .ft-notice-content .notice-title+.notice-txt{margin-top:5px}.ft-notice-dialog .ft-notice-content .notice-txt{color:#555;font-size:14px;overflow-wrap:break-word}.without-close .ft-dlg-close{display:none!important}";
    styleInject(css_248z, {id: "future-dialog-2.0.8"});

    var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

    var check = function (it) {
      return it && it.Math == Math && it;
    };

    // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
    var global$o =
      // eslint-disable-next-line es/no-global-this -- safe
      check(typeof globalThis == 'object' && globalThis) ||
      check(typeof window == 'object' && window) ||
      // eslint-disable-next-line no-restricted-globals -- safe
      check(typeof self == 'object' && self) ||
      check(typeof commonjsGlobal == 'object' && commonjsGlobal) ||
      // eslint-disable-next-line no-new-func -- fallback
      (function () { return this; })() || Function('return this')();

    var objectGetOwnPropertyDescriptor = {};

    var fails$q = function (exec) {
      try {
        return !!exec();
      } catch (error) {
        return true;
      }
    };

    var fails$p = fails$q;

    // Detect IE8's incomplete defineProperty implementation
    var descriptors = !fails$p(function () {
      // eslint-disable-next-line es/no-object-defineproperty -- required for testing
      return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] != 7;
    });

    var objectPropertyIsEnumerable = {};

    var $propertyIsEnumerable$1 = {}.propertyIsEnumerable;
    // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
    var getOwnPropertyDescriptor$2 = Object.getOwnPropertyDescriptor;

    // Nashorn ~ JDK8 bug
    var NASHORN_BUG = getOwnPropertyDescriptor$2 && !$propertyIsEnumerable$1.call({ 1: 2 }, 1);

    // `Object.prototype.propertyIsEnumerable` method implementation
    // https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
    objectPropertyIsEnumerable.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
      var descriptor = getOwnPropertyDescriptor$2(this, V);
      return !!descriptor && descriptor.enumerable;
    } : $propertyIsEnumerable$1;

    var createPropertyDescriptor$5 = function (bitmap, value) {
      return {
        enumerable: !(bitmap & 1),
        configurable: !(bitmap & 2),
        writable: !(bitmap & 4),
        value: value
      };
    };

    var toString$2 = {}.toString;

    var classofRaw$1 = function (it) {
      return toString$2.call(it).slice(8, -1);
    };

    var fails$o = fails$q;
    var classof$7 = classofRaw$1;

    var split = ''.split;

    // fallback for non-array-like ES3 and non-enumerable old V8 strings
    var indexedObject = fails$o(function () {
      // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
      // eslint-disable-next-line no-prototype-builtins -- safe
      return !Object('z').propertyIsEnumerable(0);
    }) ? function (it) {
      return classof$7(it) == 'String' ? split.call(it, '') : Object(it);
    } : Object;

    // `RequireObjectCoercible` abstract operation
    // https://tc39.es/ecma262/#sec-requireobjectcoercible
    var requireObjectCoercible$8 = function (it) {
      if (it == undefined) throw TypeError("Can't call method on " + it);
      return it;
    };

    // toObject with fallback for non-array-like ES3 strings
    var IndexedObject$2 = indexedObject;
    var requireObjectCoercible$7 = requireObjectCoercible$8;

    var toIndexedObject$a = function (it) {
      return IndexedObject$2(requireObjectCoercible$7(it));
    };

    var isObject$g = function (it) {
      return typeof it === 'object' ? it !== null : typeof it === 'function';
    };

    var isObject$f = isObject$g;

    // `ToPrimitive` abstract operation
    // https://tc39.es/ecma262/#sec-toprimitive
    // instead of the ES6 spec version, we didn't implement @@toPrimitive case
    // and the second argument - flag - preferred type is a string
    var toPrimitive$4 = function (input, PREFERRED_STRING) {
      if (!isObject$f(input)) return input;
      var fn, val;
      if (PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject$f(val = fn.call(input))) return val;
      if (typeof (fn = input.valueOf) == 'function' && !isObject$f(val = fn.call(input))) return val;
      if (!PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject$f(val = fn.call(input))) return val;
      throw TypeError("Can't convert object to primitive value");
    };

    var requireObjectCoercible$6 = requireObjectCoercible$8;

    // `ToObject` abstract operation
    // https://tc39.es/ecma262/#sec-toobject
    var toObject$9 = function (argument) {
      return Object(requireObjectCoercible$6(argument));
    };

    var toObject$8 = toObject$9;

    var hasOwnProperty = {}.hasOwnProperty;

    var has$e = Object.hasOwn || function hasOwn(it, key) {
      return hasOwnProperty.call(toObject$8(it), key);
    };

    var global$n = global$o;
    var isObject$e = isObject$g;

    var document$3 = global$n.document;
    // typeof document.createElement is 'object' in old IE
    var EXISTS = isObject$e(document$3) && isObject$e(document$3.createElement);

    var documentCreateElement$1 = function (it) {
      return EXISTS ? document$3.createElement(it) : {};
    };

    var DESCRIPTORS$c = descriptors;
    var fails$n = fails$q;
    var createElement$1 = documentCreateElement$1;

    // Thank's IE8 for his funny defineProperty
    var ie8DomDefine = !DESCRIPTORS$c && !fails$n(function () {
      // eslint-disable-next-line es/no-object-defineproperty -- requied for testing
      return Object.defineProperty(createElement$1('div'), 'a', {
        get: function () { return 7; }
      }).a != 7;
    });

    var DESCRIPTORS$b = descriptors;
    var propertyIsEnumerableModule$1 = objectPropertyIsEnumerable;
    var createPropertyDescriptor$4 = createPropertyDescriptor$5;
    var toIndexedObject$9 = toIndexedObject$a;
    var toPrimitive$3 = toPrimitive$4;
    var has$d = has$e;
    var IE8_DOM_DEFINE$1 = ie8DomDefine;

    // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
    var $getOwnPropertyDescriptor$1 = Object.getOwnPropertyDescriptor;

    // `Object.getOwnPropertyDescriptor` method
    // https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
    objectGetOwnPropertyDescriptor.f = DESCRIPTORS$b ? $getOwnPropertyDescriptor$1 : function getOwnPropertyDescriptor(O, P) {
      O = toIndexedObject$9(O);
      P = toPrimitive$3(P, true);
      if (IE8_DOM_DEFINE$1) try {
        return $getOwnPropertyDescriptor$1(O, P);
      } catch (error) { /* empty */ }
      if (has$d(O, P)) return createPropertyDescriptor$4(!propertyIsEnumerableModule$1.f.call(O, P), O[P]);
    };

    var objectDefineProperty = {};

    var isObject$d = isObject$g;

    var anObject$g = function (it) {
      if (!isObject$d(it)) {
        throw TypeError(String(it) + ' is not an object');
      } return it;
    };

    var DESCRIPTORS$a = descriptors;
    var IE8_DOM_DEFINE = ie8DomDefine;
    var anObject$f = anObject$g;
    var toPrimitive$2 = toPrimitive$4;

    // eslint-disable-next-line es/no-object-defineproperty -- safe
    var $defineProperty$1 = Object.defineProperty;

    // `Object.defineProperty` method
    // https://tc39.es/ecma262/#sec-object.defineproperty
    objectDefineProperty.f = DESCRIPTORS$a ? $defineProperty$1 : function defineProperty(O, P, Attributes) {
      anObject$f(O);
      P = toPrimitive$2(P, true);
      anObject$f(Attributes);
      if (IE8_DOM_DEFINE) try {
        return $defineProperty$1(O, P, Attributes);
      } catch (error) { /* empty */ }
      if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
      if ('value' in Attributes) O[P] = Attributes.value;
      return O;
    };

    var DESCRIPTORS$9 = descriptors;
    var definePropertyModule$6 = objectDefineProperty;
    var createPropertyDescriptor$3 = createPropertyDescriptor$5;

    var createNonEnumerableProperty$b = DESCRIPTORS$9 ? function (object, key, value) {
      return definePropertyModule$6.f(object, key, createPropertyDescriptor$3(1, value));
    } : function (object, key, value) {
      object[key] = value;
      return object;
    };

    var redefine$a = {exports: {}};

    var global$m = global$o;
    var createNonEnumerableProperty$a = createNonEnumerableProperty$b;

    var setGlobal$3 = function (key, value) {
      try {
        createNonEnumerableProperty$a(global$m, key, value);
      } catch (error) {
        global$m[key] = value;
      } return value;
    };

    var global$l = global$o;
    var setGlobal$2 = setGlobal$3;

    var SHARED = '__core-js_shared__';
    var store$3 = global$l[SHARED] || setGlobal$2(SHARED, {});

    var sharedStore = store$3;

    var store$2 = sharedStore;

    var functionToString = Function.toString;

    // this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper
    if (typeof store$2.inspectSource != 'function') {
      store$2.inspectSource = function (it) {
        return functionToString.call(it);
      };
    }

    var inspectSource$3 = store$2.inspectSource;

    var global$k = global$o;
    var inspectSource$2 = inspectSource$3;

    var WeakMap$1 = global$k.WeakMap;

    var nativeWeakMap = typeof WeakMap$1 === 'function' && /native code/.test(inspectSource$2(WeakMap$1));

    var shared$5 = {exports: {}};

    var store$1 = sharedStore;

    (shared$5.exports = function (key, value) {
      return store$1[key] || (store$1[key] = value !== undefined ? value : {});
    })('versions', []).push({
      version: '3.15.2',
      mode: 'global',
      copyright: '© 2021 Denis Pushkarev (zloirock.ru)'
    });

    var id$1 = 0;
    var postfix = Math.random();

    var uid$4 = function (key) {
      return 'Symbol(' + String(key === undefined ? '' : key) + ')_' + (++id$1 + postfix).toString(36);
    };

    var shared$4 = shared$5.exports;
    var uid$3 = uid$4;

    var keys$1 = shared$4('keys');

    var sharedKey$4 = function (key) {
      return keys$1[key] || (keys$1[key] = uid$3(key));
    };

    var hiddenKeys$6 = {};

    var NATIVE_WEAK_MAP = nativeWeakMap;
    var global$j = global$o;
    var isObject$c = isObject$g;
    var createNonEnumerableProperty$9 = createNonEnumerableProperty$b;
    var objectHas = has$e;
    var shared$3 = sharedStore;
    var sharedKey$3 = sharedKey$4;
    var hiddenKeys$5 = hiddenKeys$6;

    var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
    var WeakMap = global$j.WeakMap;
    var set$1, get, has$c;

    var enforce = function (it) {
      return has$c(it) ? get(it) : set$1(it, {});
    };

    var getterFor = function (TYPE) {
      return function (it) {
        var state;
        if (!isObject$c(it) || (state = get(it)).type !== TYPE) {
          throw TypeError('Incompatible receiver, ' + TYPE + ' required');
        } return state;
      };
    };

    if (NATIVE_WEAK_MAP || shared$3.state) {
      var store = shared$3.state || (shared$3.state = new WeakMap());
      var wmget = store.get;
      var wmhas = store.has;
      var wmset = store.set;
      set$1 = function (it, metadata) {
        if (wmhas.call(store, it)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
        metadata.facade = it;
        wmset.call(store, it, metadata);
        return metadata;
      };
      get = function (it) {
        return wmget.call(store, it) || {};
      };
      has$c = function (it) {
        return wmhas.call(store, it);
      };
    } else {
      var STATE = sharedKey$3('state');
      hiddenKeys$5[STATE] = true;
      set$1 = function (it, metadata) {
        if (objectHas(it, STATE)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
        metadata.facade = it;
        createNonEnumerableProperty$9(it, STATE, metadata);
        return metadata;
      };
      get = function (it) {
        return objectHas(it, STATE) ? it[STATE] : {};
      };
      has$c = function (it) {
        return objectHas(it, STATE);
      };
    }

    var internalState = {
      set: set$1,
      get: get,
      has: has$c,
      enforce: enforce,
      getterFor: getterFor
    };

    var global$i = global$o;
    var createNonEnumerableProperty$8 = createNonEnumerableProperty$b;
    var has$b = has$e;
    var setGlobal$1 = setGlobal$3;
    var inspectSource$1 = inspectSource$3;
    var InternalStateModule$5 = internalState;

    var getInternalState$5 = InternalStateModule$5.get;
    var enforceInternalState$1 = InternalStateModule$5.enforce;
    var TEMPLATE = String(String).split('String');

    (redefine$a.exports = function (O, key, value, options) {
      var unsafe = options ? !!options.unsafe : false;
      var simple = options ? !!options.enumerable : false;
      var noTargetGet = options ? !!options.noTargetGet : false;
      var state;
      if (typeof value == 'function') {
        if (typeof key == 'string' && !has$b(value, 'name')) {
          createNonEnumerableProperty$8(value, 'name', key);
        }
        state = enforceInternalState$1(value);
        if (!state.source) {
          state.source = TEMPLATE.join(typeof key == 'string' ? key : '');
        }
      }
      if (O === global$i) {
        if (simple) O[key] = value;
        else setGlobal$1(key, value);
        return;
      } else if (!unsafe) {
        delete O[key];
      } else if (!noTargetGet && O[key]) {
        simple = true;
      }
      if (simple) O[key] = value;
      else createNonEnumerableProperty$8(O, key, value);
    // add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
    })(Function.prototype, 'toString', function toString() {
      return typeof this == 'function' && getInternalState$5(this).source || inspectSource$1(this);
    });

    var global$h = global$o;

    var path$2 = global$h;

    var path$1 = path$2;
    var global$g = global$o;

    var aFunction$5 = function (variable) {
      return typeof variable == 'function' ? variable : undefined;
    };

    var getBuiltIn$6 = function (namespace, method) {
      return arguments.length < 2 ? aFunction$5(path$1[namespace]) || aFunction$5(global$g[namespace])
        : path$1[namespace] && path$1[namespace][method] || global$g[namespace] && global$g[namespace][method];
    };

    var objectGetOwnPropertyNames = {};

    var ceil = Math.ceil;
    var floor$1 = Math.floor;

    // `ToInteger` abstract operation
    // https://tc39.es/ecma262/#sec-tointeger
    var toInteger$5 = function (argument) {
      return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor$1 : ceil)(argument);
    };

    var toInteger$4 = toInteger$5;

    var min$4 = Math.min;

    // `ToLength` abstract operation
    // https://tc39.es/ecma262/#sec-tolength
    var toLength$a = function (argument) {
      return argument > 0 ? min$4(toInteger$4(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
    };

    var toInteger$3 = toInteger$5;

    var max$3 = Math.max;
    var min$3 = Math.min;

    // Helper for a popular repeating case of the spec:
    // Let integer be ? ToInteger(index).
    // If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
    var toAbsoluteIndex$3 = function (index, length) {
      var integer = toInteger$3(index);
      return integer < 0 ? max$3(integer + length, 0) : min$3(integer, length);
    };

    var toIndexedObject$8 = toIndexedObject$a;
    var toLength$9 = toLength$a;
    var toAbsoluteIndex$2 = toAbsoluteIndex$3;

    // `Array.prototype.{ indexOf, includes }` methods implementation
    var createMethod$3 = function (IS_INCLUDES) {
      return function ($this, el, fromIndex) {
        var O = toIndexedObject$8($this);
        var length = toLength$9(O.length);
        var index = toAbsoluteIndex$2(fromIndex, length);
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
      includes: createMethod$3(true),
      // `Array.prototype.indexOf` method
      // https://tc39.es/ecma262/#sec-array.prototype.indexof
      indexOf: createMethod$3(false)
    };

    var has$a = has$e;
    var toIndexedObject$7 = toIndexedObject$a;
    var indexOf = arrayIncludes.indexOf;
    var hiddenKeys$4 = hiddenKeys$6;

    var objectKeysInternal = function (object, names) {
      var O = toIndexedObject$7(object);
      var i = 0;
      var result = [];
      var key;
      for (key in O) !has$a(hiddenKeys$4, key) && has$a(O, key) && result.push(key);
      // Don't enum bug & hidden keys
      while (names.length > i) if (has$a(O, key = names[i++])) {
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

    var hiddenKeys$3 = enumBugKeys$2.concat('length', 'prototype');

    // `Object.getOwnPropertyNames` method
    // https://tc39.es/ecma262/#sec-object.getownpropertynames
    // eslint-disable-next-line es/no-object-getownpropertynames -- safe
    objectGetOwnPropertyNames.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
      return internalObjectKeys$1(O, hiddenKeys$3);
    };

    var objectGetOwnPropertySymbols = {};

    // eslint-disable-next-line es/no-object-getownpropertysymbols -- safe
    objectGetOwnPropertySymbols.f = Object.getOwnPropertySymbols;

    var getBuiltIn$5 = getBuiltIn$6;
    var getOwnPropertyNamesModule$1 = objectGetOwnPropertyNames;
    var getOwnPropertySymbolsModule$1 = objectGetOwnPropertySymbols;
    var anObject$e = anObject$g;

    // all object keys, includes non-enumerable and symbols
    var ownKeys$3 = getBuiltIn$5('Reflect', 'ownKeys') || function ownKeys(it) {
      var keys = getOwnPropertyNamesModule$1.f(anObject$e(it));
      var getOwnPropertySymbols = getOwnPropertySymbolsModule$1.f;
      return getOwnPropertySymbols ? keys.concat(getOwnPropertySymbols(it)) : keys;
    };

    var has$9 = has$e;
    var ownKeys$2 = ownKeys$3;
    var getOwnPropertyDescriptorModule$2 = objectGetOwnPropertyDescriptor;
    var definePropertyModule$5 = objectDefineProperty;

    var copyConstructorProperties$2 = function (target, source) {
      var keys = ownKeys$2(source);
      var defineProperty = definePropertyModule$5.f;
      var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule$2.f;
      for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        if (!has$9(target, key)) defineProperty(target, key, getOwnPropertyDescriptor(source, key));
      }
    };

    var fails$m = fails$q;

    var replacement = /#|\.prototype\./;

    var isForced$4 = function (feature, detection) {
      var value = data[normalize(feature)];
      return value == POLYFILL ? true
        : value == NATIVE ? false
        : typeof detection == 'function' ? fails$m(detection)
        : !!detection;
    };

    var normalize = isForced$4.normalize = function (string) {
      return String(string).replace(replacement, '.').toLowerCase();
    };

    var data = isForced$4.data = {};
    var NATIVE = isForced$4.NATIVE = 'N';
    var POLYFILL = isForced$4.POLYFILL = 'P';

    var isForced_1 = isForced$4;

    var global$f = global$o;
    var getOwnPropertyDescriptor$1 = objectGetOwnPropertyDescriptor.f;
    var createNonEnumerableProperty$7 = createNonEnumerableProperty$b;
    var redefine$9 = redefine$a.exports;
    var setGlobal = setGlobal$3;
    var copyConstructorProperties$1 = copyConstructorProperties$2;
    var isForced$3 = isForced_1;

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
    */
    var _export = function (options, source) {
      var TARGET = options.target;
      var GLOBAL = options.global;
      var STATIC = options.stat;
      var FORCED, target, key, targetProperty, sourceProperty, descriptor;
      if (GLOBAL) {
        target = global$f;
      } else if (STATIC) {
        target = global$f[TARGET] || setGlobal(TARGET, {});
      } else {
        target = (global$f[TARGET] || {}).prototype;
      }
      if (target) for (key in source) {
        sourceProperty = source[key];
        if (options.noTargetGet) {
          descriptor = getOwnPropertyDescriptor$1(target, key);
          targetProperty = descriptor && descriptor.value;
        } else targetProperty = target[key];
        FORCED = isForced$3(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
        // contained in target
        if (!FORCED && targetProperty !== undefined) {
          if (typeof sourceProperty === typeof targetProperty) continue;
          copyConstructorProperties$1(sourceProperty, targetProperty);
        }
        // add a flag to not completely full polyfills
        if (options.sham || (targetProperty && targetProperty.sham)) {
          createNonEnumerableProperty$7(sourceProperty, 'sham', true);
        }
        // extend global
        redefine$9(target, key, sourceProperty, options);
      }
    };

    var internalObjectKeys = objectKeysInternal;
    var enumBugKeys$1 = enumBugKeys$3;

    // `Object.keys` method
    // https://tc39.es/ecma262/#sec-object.keys
    // eslint-disable-next-line es/no-object-keys -- safe
    var objectKeys$2 = Object.keys || function keys(O) {
      return internalObjectKeys(O, enumBugKeys$1);
    };

    var $$l = _export;
    var toObject$7 = toObject$9;
    var nativeKeys = objectKeys$2;
    var fails$l = fails$q;

    var FAILS_ON_PRIMITIVES$1 = fails$l(function () { nativeKeys(1); });

    // `Object.keys` method
    // https://tc39.es/ecma262/#sec-object.keys
    $$l({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES$1 }, {
      keys: function keys(it) {
        return nativeKeys(toObject$7(it));
      }
    });

    var getBuiltIn$4 = getBuiltIn$6;

    var engineUserAgent = getBuiltIn$4('navigator', 'userAgent') || '';

    var global$e = global$o;
    var userAgent$2 = engineUserAgent;

    var process$3 = global$e.process;
    var versions = process$3 && process$3.versions;
    var v8 = versions && versions.v8;
    var match, version;

    if (v8) {
      match = v8.split('.');
      version = match[0] < 4 ? 1 : match[0] + match[1];
    } else if (userAgent$2) {
      match = userAgent$2.match(/Edge\/(\d+)/);
      if (!match || match[1] >= 74) {
        match = userAgent$2.match(/Chrome\/(\d+)/);
        if (match) version = match[1];
      }
    }

    var engineV8Version = version && +version;

    /* eslint-disable es/no-symbol -- required for testing */

    var V8_VERSION$3 = engineV8Version;
    var fails$k = fails$q;

    // eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing
    var nativeSymbol = !!Object.getOwnPropertySymbols && !fails$k(function () {
      var symbol = Symbol();
      // Chrome 38 Symbol has incorrect toString conversion
      // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances
      return !String(symbol) || !(Object(symbol) instanceof Symbol) ||
        // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
        !Symbol.sham && V8_VERSION$3 && V8_VERSION$3 < 41;
    });

    /* eslint-disable es/no-symbol -- required for testing */

    var NATIVE_SYMBOL$2 = nativeSymbol;

    var useSymbolAsUid = NATIVE_SYMBOL$2
      && !Symbol.sham
      && typeof Symbol.iterator == 'symbol';

    var classof$6 = classofRaw$1;

    // `IsArray` abstract operation
    // https://tc39.es/ecma262/#sec-isarray
    // eslint-disable-next-line es/no-array-isarray -- safe
    var isArray$4 = Array.isArray || function isArray(arg) {
      return classof$6(arg) == 'Array';
    };

    var DESCRIPTORS$8 = descriptors;
    var definePropertyModule$4 = objectDefineProperty;
    var anObject$d = anObject$g;
    var objectKeys$1 = objectKeys$2;

    // `Object.defineProperties` method
    // https://tc39.es/ecma262/#sec-object.defineproperties
    // eslint-disable-next-line es/no-object-defineproperties -- safe
    var objectDefineProperties = DESCRIPTORS$8 ? Object.defineProperties : function defineProperties(O, Properties) {
      anObject$d(O);
      var keys = objectKeys$1(Properties);
      var length = keys.length;
      var index = 0;
      var key;
      while (length > index) definePropertyModule$4.f(O, key = keys[index++], Properties[key]);
      return O;
    };

    var getBuiltIn$3 = getBuiltIn$6;

    var html$2 = getBuiltIn$3('document', 'documentElement');

    var anObject$c = anObject$g;
    var defineProperties = objectDefineProperties;
    var enumBugKeys = enumBugKeys$3;
    var hiddenKeys$2 = hiddenKeys$6;
    var html$1 = html$2;
    var documentCreateElement = documentCreateElement$1;
    var sharedKey$2 = sharedKey$4;

    var GT = '>';
    var LT = '<';
    var PROTOTYPE$1 = 'prototype';
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
      var iframe = documentCreateElement('iframe');
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
        /* global ActiveXObject -- old IE */
        activeXDocument = document.domain && new ActiveXObject('htmlfile');
      } catch (error) { /* ignore */ }
      NullProtoObject = activeXDocument ? NullProtoObjectViaActiveX(activeXDocument) : NullProtoObjectViaIFrame();
      var length = enumBugKeys.length;
      while (length--) delete NullProtoObject[PROTOTYPE$1][enumBugKeys[length]];
      return NullProtoObject();
    };

    hiddenKeys$2[IE_PROTO$1] = true;

    // `Object.create` method
    // https://tc39.es/ecma262/#sec-object.create
    var objectCreate = Object.create || function create(O, Properties) {
      var result;
      if (O !== null) {
        EmptyConstructor[PROTOTYPE$1] = anObject$c(O);
        result = new EmptyConstructor();
        EmptyConstructor[PROTOTYPE$1] = null;
        // add "__proto__" for Object.getPrototypeOf polyfill
        result[IE_PROTO$1] = O;
      } else result = NullProtoObject();
      return Properties === undefined ? result : defineProperties(result, Properties);
    };

    var objectGetOwnPropertyNamesExternal = {};

    /* eslint-disable es/no-object-getownpropertynames -- safe */

    var toIndexedObject$6 = toIndexedObject$a;
    var $getOwnPropertyNames$1 = objectGetOwnPropertyNames.f;

    var toString$1 = {}.toString;

    var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
      ? Object.getOwnPropertyNames(window) : [];

    var getWindowNames = function (it) {
      try {
        return $getOwnPropertyNames$1(it);
      } catch (error) {
        return windowNames.slice();
      }
    };

    // fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
    objectGetOwnPropertyNamesExternal.f = function getOwnPropertyNames(it) {
      return windowNames && toString$1.call(it) == '[object Window]'
        ? getWindowNames(it)
        : $getOwnPropertyNames$1(toIndexedObject$6(it));
    };

    var global$d = global$o;
    var shared$2 = shared$5.exports;
    var has$8 = has$e;
    var uid$2 = uid$4;
    var NATIVE_SYMBOL$1 = nativeSymbol;
    var USE_SYMBOL_AS_UID$1 = useSymbolAsUid;

    var WellKnownSymbolsStore$1 = shared$2('wks');
    var Symbol$1 = global$d.Symbol;
    var createWellKnownSymbol = USE_SYMBOL_AS_UID$1 ? Symbol$1 : Symbol$1 && Symbol$1.withoutSetter || uid$2;

    var wellKnownSymbol$n = function (name) {
      if (!has$8(WellKnownSymbolsStore$1, name) || !(NATIVE_SYMBOL$1 || typeof WellKnownSymbolsStore$1[name] == 'string')) {
        if (NATIVE_SYMBOL$1 && has$8(Symbol$1, name)) {
          WellKnownSymbolsStore$1[name] = Symbol$1[name];
        } else {
          WellKnownSymbolsStore$1[name] = createWellKnownSymbol('Symbol.' + name);
        }
      } return WellKnownSymbolsStore$1[name];
    };

    var wellKnownSymbolWrapped = {};

    var wellKnownSymbol$m = wellKnownSymbol$n;

    wellKnownSymbolWrapped.f = wellKnownSymbol$m;

    var path = path$2;
    var has$7 = has$e;
    var wrappedWellKnownSymbolModule$1 = wellKnownSymbolWrapped;
    var defineProperty$6 = objectDefineProperty.f;

    var defineWellKnownSymbol$1 = function (NAME) {
      var Symbol = path.Symbol || (path.Symbol = {});
      if (!has$7(Symbol, NAME)) defineProperty$6(Symbol, NAME, {
        value: wrappedWellKnownSymbolModule$1.f(NAME)
      });
    };

    var defineProperty$5 = objectDefineProperty.f;
    var has$6 = has$e;
    var wellKnownSymbol$l = wellKnownSymbol$n;

    var TO_STRING_TAG$3 = wellKnownSymbol$l('toStringTag');

    var setToStringTag$5 = function (it, TAG, STATIC) {
      if (it && !has$6(it = STATIC ? it : it.prototype, TO_STRING_TAG$3)) {
        defineProperty$5(it, TO_STRING_TAG$3, { configurable: true, value: TAG });
      }
    };

    var aFunction$4 = function (it) {
      if (typeof it != 'function') {
        throw TypeError(String(it) + ' is not a function');
      } return it;
    };

    var aFunction$3 = aFunction$4;

    // optional / simple context binding
    var functionBindContext = function (fn, that, length) {
      aFunction$3(fn);
      if (that === undefined) return fn;
      switch (length) {
        case 0: return function () {
          return fn.call(that);
        };
        case 1: return function (a) {
          return fn.call(that, a);
        };
        case 2: return function (a, b) {
          return fn.call(that, a, b);
        };
        case 3: return function (a, b, c) {
          return fn.call(that, a, b, c);
        };
      }
      return function (/* ...args */) {
        return fn.apply(that, arguments);
      };
    };

    var isObject$b = isObject$g;
    var isArray$3 = isArray$4;
    var wellKnownSymbol$k = wellKnownSymbol$n;

    var SPECIES$6 = wellKnownSymbol$k('species');

    // `ArraySpeciesCreate` abstract operation
    // https://tc39.es/ecma262/#sec-arrayspeciescreate
    var arraySpeciesCreate$3 = function (originalArray, length) {
      var C;
      if (isArray$3(originalArray)) {
        C = originalArray.constructor;
        // cross-realm fallback
        if (typeof C == 'function' && (C === Array || isArray$3(C.prototype))) C = undefined;
        else if (isObject$b(C)) {
          C = C[SPECIES$6];
          if (C === null) C = undefined;
        }
      } return new (C === undefined ? Array : C)(length === 0 ? 0 : length);
    };

    var bind$5 = functionBindContext;
    var IndexedObject$1 = indexedObject;
    var toObject$6 = toObject$9;
    var toLength$8 = toLength$a;
    var arraySpeciesCreate$2 = arraySpeciesCreate$3;

    var push = [].push;

    // `Array.prototype.{ forEach, map, filter, some, every, find, findIndex, filterOut }` methods implementation
    var createMethod$2 = function (TYPE) {
      var IS_MAP = TYPE == 1;
      var IS_FILTER = TYPE == 2;
      var IS_SOME = TYPE == 3;
      var IS_EVERY = TYPE == 4;
      var IS_FIND_INDEX = TYPE == 6;
      var IS_FILTER_OUT = TYPE == 7;
      var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
      return function ($this, callbackfn, that, specificCreate) {
        var O = toObject$6($this);
        var self = IndexedObject$1(O);
        var boundFunction = bind$5(callbackfn, that, 3);
        var length = toLength$8(self.length);
        var index = 0;
        var create = specificCreate || arraySpeciesCreate$2;
        var target = IS_MAP ? create($this, length) : IS_FILTER || IS_FILTER_OUT ? create($this, 0) : undefined;
        var value, result;
        for (;length > index; index++) if (NO_HOLES || index in self) {
          value = self[index];
          result = boundFunction(value, index, O);
          if (TYPE) {
            if (IS_MAP) target[index] = result; // map
            else if (result) switch (TYPE) {
              case 3: return true;              // some
              case 5: return value;             // find
              case 6: return index;             // findIndex
              case 2: push.call(target, value); // filter
            } else switch (TYPE) {
              case 4: return false;             // every
              case 7: push.call(target, value); // filterOut
            }
          }
        }
        return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
      };
    };

    var arrayIteration = {
      // `Array.prototype.forEach` method
      // https://tc39.es/ecma262/#sec-array.prototype.foreach
      forEach: createMethod$2(0),
      // `Array.prototype.map` method
      // https://tc39.es/ecma262/#sec-array.prototype.map
      map: createMethod$2(1),
      // `Array.prototype.filter` method
      // https://tc39.es/ecma262/#sec-array.prototype.filter
      filter: createMethod$2(2),
      // `Array.prototype.some` method
      // https://tc39.es/ecma262/#sec-array.prototype.some
      some: createMethod$2(3),
      // `Array.prototype.every` method
      // https://tc39.es/ecma262/#sec-array.prototype.every
      every: createMethod$2(4),
      // `Array.prototype.find` method
      // https://tc39.es/ecma262/#sec-array.prototype.find
      find: createMethod$2(5),
      // `Array.prototype.findIndex` method
      // https://tc39.es/ecma262/#sec-array.prototype.findIndex
      findIndex: createMethod$2(6),
      // `Array.prototype.filterOut` method
      // https://github.com/tc39/proposal-array-filtering
      filterOut: createMethod$2(7)
    };

    var $$k = _export;
    var global$c = global$o;
    var getBuiltIn$2 = getBuiltIn$6;
    var DESCRIPTORS$7 = descriptors;
    var NATIVE_SYMBOL = nativeSymbol;
    var USE_SYMBOL_AS_UID = useSymbolAsUid;
    var fails$j = fails$q;
    var has$5 = has$e;
    var isArray$2 = isArray$4;
    var isObject$a = isObject$g;
    var anObject$b = anObject$g;
    var toObject$5 = toObject$9;
    var toIndexedObject$5 = toIndexedObject$a;
    var toPrimitive$1 = toPrimitive$4;
    var createPropertyDescriptor$2 = createPropertyDescriptor$5;
    var nativeObjectCreate = objectCreate;
    var objectKeys = objectKeys$2;
    var getOwnPropertyNamesModule = objectGetOwnPropertyNames;
    var getOwnPropertyNamesExternal = objectGetOwnPropertyNamesExternal;
    var getOwnPropertySymbolsModule = objectGetOwnPropertySymbols;
    var getOwnPropertyDescriptorModule$1 = objectGetOwnPropertyDescriptor;
    var definePropertyModule$3 = objectDefineProperty;
    var propertyIsEnumerableModule = objectPropertyIsEnumerable;
    var createNonEnumerableProperty$6 = createNonEnumerableProperty$b;
    var redefine$8 = redefine$a.exports;
    var shared$1 = shared$5.exports;
    var sharedKey$1 = sharedKey$4;
    var hiddenKeys$1 = hiddenKeys$6;
    var uid$1 = uid$4;
    var wellKnownSymbol$j = wellKnownSymbol$n;
    var wrappedWellKnownSymbolModule = wellKnownSymbolWrapped;
    var defineWellKnownSymbol = defineWellKnownSymbol$1;
    var setToStringTag$4 = setToStringTag$5;
    var InternalStateModule$4 = internalState;
    var $forEach$1 = arrayIteration.forEach;

    var HIDDEN = sharedKey$1('hidden');
    var SYMBOL = 'Symbol';
    var PROTOTYPE = 'prototype';
    var TO_PRIMITIVE = wellKnownSymbol$j('toPrimitive');
    var setInternalState$4 = InternalStateModule$4.set;
    var getInternalState$4 = InternalStateModule$4.getterFor(SYMBOL);
    var ObjectPrototype$1 = Object[PROTOTYPE];
    var $Symbol = global$c.Symbol;
    var $stringify = getBuiltIn$2('JSON', 'stringify');
    var nativeGetOwnPropertyDescriptor$1 = getOwnPropertyDescriptorModule$1.f;
    var nativeDefineProperty = definePropertyModule$3.f;
    var nativeGetOwnPropertyNames = getOwnPropertyNamesExternal.f;
    var nativePropertyIsEnumerable = propertyIsEnumerableModule.f;
    var AllSymbols = shared$1('symbols');
    var ObjectPrototypeSymbols = shared$1('op-symbols');
    var StringToSymbolRegistry = shared$1('string-to-symbol-registry');
    var SymbolToStringRegistry = shared$1('symbol-to-string-registry');
    var WellKnownSymbolsStore = shared$1('wks');
    var QObject = global$c.QObject;
    // Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
    var USE_SETTER = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

    // fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
    var setSymbolDescriptor = DESCRIPTORS$7 && fails$j(function () {
      return nativeObjectCreate(nativeDefineProperty({}, 'a', {
        get: function () { return nativeDefineProperty(this, 'a', { value: 7 }).a; }
      })).a != 7;
    }) ? function (O, P, Attributes) {
      var ObjectPrototypeDescriptor = nativeGetOwnPropertyDescriptor$1(ObjectPrototype$1, P);
      if (ObjectPrototypeDescriptor) delete ObjectPrototype$1[P];
      nativeDefineProperty(O, P, Attributes);
      if (ObjectPrototypeDescriptor && O !== ObjectPrototype$1) {
        nativeDefineProperty(ObjectPrototype$1, P, ObjectPrototypeDescriptor);
      }
    } : nativeDefineProperty;

    var wrap = function (tag, description) {
      var symbol = AllSymbols[tag] = nativeObjectCreate($Symbol[PROTOTYPE]);
      setInternalState$4(symbol, {
        type: SYMBOL,
        tag: tag,
        description: description
      });
      if (!DESCRIPTORS$7) symbol.description = description;
      return symbol;
    };

    var isSymbol = USE_SYMBOL_AS_UID ? function (it) {
      return typeof it == 'symbol';
    } : function (it) {
      return Object(it) instanceof $Symbol;
    };

    var $defineProperty = function defineProperty(O, P, Attributes) {
      if (O === ObjectPrototype$1) $defineProperty(ObjectPrototypeSymbols, P, Attributes);
      anObject$b(O);
      var key = toPrimitive$1(P, true);
      anObject$b(Attributes);
      if (has$5(AllSymbols, key)) {
        if (!Attributes.enumerable) {
          if (!has$5(O, HIDDEN)) nativeDefineProperty(O, HIDDEN, createPropertyDescriptor$2(1, {}));
          O[HIDDEN][key] = true;
        } else {
          if (has$5(O, HIDDEN) && O[HIDDEN][key]) O[HIDDEN][key] = false;
          Attributes = nativeObjectCreate(Attributes, { enumerable: createPropertyDescriptor$2(0, false) });
        } return setSymbolDescriptor(O, key, Attributes);
      } return nativeDefineProperty(O, key, Attributes);
    };

    var $defineProperties = function defineProperties(O, Properties) {
      anObject$b(O);
      var properties = toIndexedObject$5(Properties);
      var keys = objectKeys(properties).concat($getOwnPropertySymbols(properties));
      $forEach$1(keys, function (key) {
        if (!DESCRIPTORS$7 || $propertyIsEnumerable.call(properties, key)) $defineProperty(O, key, properties[key]);
      });
      return O;
    };

    var $create = function create(O, Properties) {
      return Properties === undefined ? nativeObjectCreate(O) : $defineProperties(nativeObjectCreate(O), Properties);
    };

    var $propertyIsEnumerable = function propertyIsEnumerable(V) {
      var P = toPrimitive$1(V, true);
      var enumerable = nativePropertyIsEnumerable.call(this, P);
      if (this === ObjectPrototype$1 && has$5(AllSymbols, P) && !has$5(ObjectPrototypeSymbols, P)) return false;
      return enumerable || !has$5(this, P) || !has$5(AllSymbols, P) || has$5(this, HIDDEN) && this[HIDDEN][P] ? enumerable : true;
    };

    var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(O, P) {
      var it = toIndexedObject$5(O);
      var key = toPrimitive$1(P, true);
      if (it === ObjectPrototype$1 && has$5(AllSymbols, key) && !has$5(ObjectPrototypeSymbols, key)) return;
      var descriptor = nativeGetOwnPropertyDescriptor$1(it, key);
      if (descriptor && has$5(AllSymbols, key) && !(has$5(it, HIDDEN) && it[HIDDEN][key])) {
        descriptor.enumerable = true;
      }
      return descriptor;
    };

    var $getOwnPropertyNames = function getOwnPropertyNames(O) {
      var names = nativeGetOwnPropertyNames(toIndexedObject$5(O));
      var result = [];
      $forEach$1(names, function (key) {
        if (!has$5(AllSymbols, key) && !has$5(hiddenKeys$1, key)) result.push(key);
      });
      return result;
    };

    var $getOwnPropertySymbols = function getOwnPropertySymbols(O) {
      var IS_OBJECT_PROTOTYPE = O === ObjectPrototype$1;
      var names = nativeGetOwnPropertyNames(IS_OBJECT_PROTOTYPE ? ObjectPrototypeSymbols : toIndexedObject$5(O));
      var result = [];
      $forEach$1(names, function (key) {
        if (has$5(AllSymbols, key) && (!IS_OBJECT_PROTOTYPE || has$5(ObjectPrototype$1, key))) {
          result.push(AllSymbols[key]);
        }
      });
      return result;
    };

    // `Symbol` constructor
    // https://tc39.es/ecma262/#sec-symbol-constructor
    if (!NATIVE_SYMBOL) {
      $Symbol = function Symbol() {
        if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor');
        var description = !arguments.length || arguments[0] === undefined ? undefined : String(arguments[0]);
        var tag = uid$1(description);
        var setter = function (value) {
          if (this === ObjectPrototype$1) setter.call(ObjectPrototypeSymbols, value);
          if (has$5(this, HIDDEN) && has$5(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
          setSymbolDescriptor(this, tag, createPropertyDescriptor$2(1, value));
        };
        if (DESCRIPTORS$7 && USE_SETTER) setSymbolDescriptor(ObjectPrototype$1, tag, { configurable: true, set: setter });
        return wrap(tag, description);
      };

      redefine$8($Symbol[PROTOTYPE], 'toString', function toString() {
        return getInternalState$4(this).tag;
      });

      redefine$8($Symbol, 'withoutSetter', function (description) {
        return wrap(uid$1(description), description);
      });

      propertyIsEnumerableModule.f = $propertyIsEnumerable;
      definePropertyModule$3.f = $defineProperty;
      getOwnPropertyDescriptorModule$1.f = $getOwnPropertyDescriptor;
      getOwnPropertyNamesModule.f = getOwnPropertyNamesExternal.f = $getOwnPropertyNames;
      getOwnPropertySymbolsModule.f = $getOwnPropertySymbols;

      wrappedWellKnownSymbolModule.f = function (name) {
        return wrap(wellKnownSymbol$j(name), name);
      };

      if (DESCRIPTORS$7) {
        // https://github.com/tc39/proposal-Symbol-description
        nativeDefineProperty($Symbol[PROTOTYPE], 'description', {
          configurable: true,
          get: function description() {
            return getInternalState$4(this).description;
          }
        });
        {
          redefine$8(ObjectPrototype$1, 'propertyIsEnumerable', $propertyIsEnumerable, { unsafe: true });
        }
      }
    }

    $$k({ global: true, wrap: true, forced: !NATIVE_SYMBOL, sham: !NATIVE_SYMBOL }, {
      Symbol: $Symbol
    });

    $forEach$1(objectKeys(WellKnownSymbolsStore), function (name) {
      defineWellKnownSymbol(name);
    });

    $$k({ target: SYMBOL, stat: true, forced: !NATIVE_SYMBOL }, {
      // `Symbol.for` method
      // https://tc39.es/ecma262/#sec-symbol.for
      'for': function (key) {
        var string = String(key);
        if (has$5(StringToSymbolRegistry, string)) return StringToSymbolRegistry[string];
        var symbol = $Symbol(string);
        StringToSymbolRegistry[string] = symbol;
        SymbolToStringRegistry[symbol] = string;
        return symbol;
      },
      // `Symbol.keyFor` method
      // https://tc39.es/ecma262/#sec-symbol.keyfor
      keyFor: function keyFor(sym) {
        if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol');
        if (has$5(SymbolToStringRegistry, sym)) return SymbolToStringRegistry[sym];
      },
      useSetter: function () { USE_SETTER = true; },
      useSimple: function () { USE_SETTER = false; }
    });

    $$k({ target: 'Object', stat: true, forced: !NATIVE_SYMBOL, sham: !DESCRIPTORS$7 }, {
      // `Object.create` method
      // https://tc39.es/ecma262/#sec-object.create
      create: $create,
      // `Object.defineProperty` method
      // https://tc39.es/ecma262/#sec-object.defineproperty
      defineProperty: $defineProperty,
      // `Object.defineProperties` method
      // https://tc39.es/ecma262/#sec-object.defineproperties
      defineProperties: $defineProperties,
      // `Object.getOwnPropertyDescriptor` method
      // https://tc39.es/ecma262/#sec-object.getownpropertydescriptors
      getOwnPropertyDescriptor: $getOwnPropertyDescriptor
    });

    $$k({ target: 'Object', stat: true, forced: !NATIVE_SYMBOL }, {
      // `Object.getOwnPropertyNames` method
      // https://tc39.es/ecma262/#sec-object.getownpropertynames
      getOwnPropertyNames: $getOwnPropertyNames,
      // `Object.getOwnPropertySymbols` method
      // https://tc39.es/ecma262/#sec-object.getownpropertysymbols
      getOwnPropertySymbols: $getOwnPropertySymbols
    });

    // Chrome 38 and 39 `Object.getOwnPropertySymbols` fails on primitives
    // https://bugs.chromium.org/p/v8/issues/detail?id=3443
    $$k({ target: 'Object', stat: true, forced: fails$j(function () { getOwnPropertySymbolsModule.f(1); }) }, {
      getOwnPropertySymbols: function getOwnPropertySymbols(it) {
        return getOwnPropertySymbolsModule.f(toObject$5(it));
      }
    });

    // `JSON.stringify` method behavior with symbols
    // https://tc39.es/ecma262/#sec-json.stringify
    if ($stringify) {
      var FORCED_JSON_STRINGIFY = !NATIVE_SYMBOL || fails$j(function () {
        var symbol = $Symbol();
        // MS Edge converts symbol values to JSON as {}
        return $stringify([symbol]) != '[null]'
          // WebKit converts symbol values to JSON as null
          || $stringify({ a: symbol }) != '{}'
          // V8 throws on boxed symbols
          || $stringify(Object(symbol)) != '{}';
      });

      $$k({ target: 'JSON', stat: true, forced: FORCED_JSON_STRINGIFY }, {
        // eslint-disable-next-line no-unused-vars -- required for `.length`
        stringify: function stringify(it, replacer, space) {
          var args = [it];
          var index = 1;
          var $replacer;
          while (arguments.length > index) args.push(arguments[index++]);
          $replacer = replacer;
          if (!isObject$a(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
          if (!isArray$2(replacer)) replacer = function (key, value) {
            if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
            if (!isSymbol(value)) return value;
          };
          args[1] = replacer;
          return $stringify.apply(null, args);
        }
      });
    }

    // `Symbol.prototype[@@toPrimitive]` method
    // https://tc39.es/ecma262/#sec-symbol.prototype-@@toprimitive
    if (!$Symbol[PROTOTYPE][TO_PRIMITIVE]) {
      createNonEnumerableProperty$6($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
    }
    // `Symbol.prototype[@@toStringTag]` property
    // https://tc39.es/ecma262/#sec-symbol.prototype-@@tostringtag
    setToStringTag$4($Symbol, SYMBOL);

    hiddenKeys$1[HIDDEN] = true;

    var fails$i = fails$q;
    var wellKnownSymbol$i = wellKnownSymbol$n;
    var V8_VERSION$2 = engineV8Version;

    var SPECIES$5 = wellKnownSymbol$i('species');

    var arrayMethodHasSpeciesSupport$5 = function (METHOD_NAME) {
      // We can't use this feature detection in V8 since it causes
      // deoptimization and serious performance degradation
      // https://github.com/zloirock/core-js/issues/677
      return V8_VERSION$2 >= 51 || !fails$i(function () {
        var array = [];
        var constructor = array.constructor = {};
        constructor[SPECIES$5] = function () {
          return { foo: 1 };
        };
        return array[METHOD_NAME](Boolean).foo !== 1;
      });
    };

    var $$j = _export;
    var $filter = arrayIteration.filter;
    var arrayMethodHasSpeciesSupport$4 = arrayMethodHasSpeciesSupport$5;

    var HAS_SPECIES_SUPPORT$3 = arrayMethodHasSpeciesSupport$4('filter');

    // `Array.prototype.filter` method
    // https://tc39.es/ecma262/#sec-array.prototype.filter
    // with adding support of @@species
    $$j({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT$3 }, {
      filter: function filter(callbackfn /* , thisArg */) {
        return $filter(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
      }
    });

    var $$i = _export;
    var fails$h = fails$q;
    var toIndexedObject$4 = toIndexedObject$a;
    var nativeGetOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;
    var DESCRIPTORS$6 = descriptors;

    var FAILS_ON_PRIMITIVES = fails$h(function () { nativeGetOwnPropertyDescriptor(1); });
    var FORCED$2 = !DESCRIPTORS$6 || FAILS_ON_PRIMITIVES;

    // `Object.getOwnPropertyDescriptor` method
    // https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
    $$i({ target: 'Object', stat: true, forced: FORCED$2, sham: !DESCRIPTORS$6 }, {
      getOwnPropertyDescriptor: function getOwnPropertyDescriptor(it, key) {
        return nativeGetOwnPropertyDescriptor(toIndexedObject$4(it), key);
      }
    });

    var toPrimitive = toPrimitive$4;
    var definePropertyModule$2 = objectDefineProperty;
    var createPropertyDescriptor$1 = createPropertyDescriptor$5;

    var createProperty$5 = function (object, key, value) {
      var propertyKey = toPrimitive(key);
      if (propertyKey in object) definePropertyModule$2.f(object, propertyKey, createPropertyDescriptor$1(0, value));
      else object[propertyKey] = value;
    };

    var $$h = _export;
    var DESCRIPTORS$5 = descriptors;
    var ownKeys$1 = ownKeys$3;
    var toIndexedObject$3 = toIndexedObject$a;
    var getOwnPropertyDescriptorModule = objectGetOwnPropertyDescriptor;
    var createProperty$4 = createProperty$5;

    // `Object.getOwnPropertyDescriptors` method
    // https://tc39.es/ecma262/#sec-object.getownpropertydescriptors
    $$h({ target: 'Object', stat: true, sham: !DESCRIPTORS$5 }, {
      getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object) {
        var O = toIndexedObject$3(object);
        var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
        var keys = ownKeys$1(O);
        var result = {};
        var index = 0;
        var key, descriptor;
        while (keys.length > index) {
          descriptor = getOwnPropertyDescriptor(O, key = keys[index++]);
          if (descriptor !== undefined) createProperty$4(result, key, descriptor);
        }
        return result;
      }
    });

    function _arrayLikeToArray(arr, len) {
      if (len == null || len > arr.length) len = arr.length;

      for (var i = 0, arr2 = new Array(len); i < len; i++) {
        arr2[i] = arr[i];
      }

      return arr2;
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

    function _nonIterableSpread() {
      throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }

    function _toConsumableArray$1(arr) {
      return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
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

    var fails$g = fails$q;

    var arrayMethodIsStrict$2 = function (METHOD_NAME, argument) {
      var method = [][METHOD_NAME];
      return !!method && fails$g(function () {
        // eslint-disable-next-line no-useless-call,no-throw-literal -- required for testing
        method.call(null, argument || function () { throw 1; }, 1);
      });
    };

    var $forEach = arrayIteration.forEach;
    var arrayMethodIsStrict$1 = arrayMethodIsStrict$2;

    var STRICT_METHOD$1 = arrayMethodIsStrict$1('forEach');

    // `Array.prototype.forEach` method implementation
    // https://tc39.es/ecma262/#sec-array.prototype.foreach
    var arrayForEach = !STRICT_METHOD$1 ? function forEach(callbackfn /* , thisArg */) {
      return $forEach(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    // eslint-disable-next-line es/no-array-prototype-foreach -- safe
    } : [].forEach;

    var global$b = global$o;
    var DOMIterables$1 = domIterables;
    var forEach = arrayForEach;
    var createNonEnumerableProperty$5 = createNonEnumerableProperty$b;

    for (var COLLECTION_NAME$1 in DOMIterables$1) {
      var Collection$1 = global$b[COLLECTION_NAME$1];
      var CollectionPrototype$1 = Collection$1 && Collection$1.prototype;
      // some Chrome versions have non-configurable methods on DOMTokenList
      if (CollectionPrototype$1 && CollectionPrototype$1.forEach !== forEach) try {
        createNonEnumerableProperty$5(CollectionPrototype$1, 'forEach', forEach);
      } catch (error) {
        CollectionPrototype$1.forEach = forEach;
      }
    }

    var wellKnownSymbol$h = wellKnownSymbol$n;

    var TO_STRING_TAG$2 = wellKnownSymbol$h('toStringTag');
    var test = {};

    test[TO_STRING_TAG$2] = 'z';

    var toStringTagSupport = String(test) === '[object z]';

    var TO_STRING_TAG_SUPPORT$2 = toStringTagSupport;
    var classofRaw = classofRaw$1;
    var wellKnownSymbol$g = wellKnownSymbol$n;

    var TO_STRING_TAG$1 = wellKnownSymbol$g('toStringTag');
    // ES3 wrong here
    var CORRECT_ARGUMENTS = classofRaw(function () { return arguments; }()) == 'Arguments';

    // fallback for IE11 Script Access Denied error
    var tryGet = function (it, key) {
      try {
        return it[key];
      } catch (error) { /* empty */ }
    };

    // getting tag from ES6+ `Object.prototype.toString`
    var classof$5 = TO_STRING_TAG_SUPPORT$2 ? classofRaw : function (it) {
      var O, tag, result;
      return it === undefined ? 'Undefined' : it === null ? 'Null'
        // @@toStringTag case
        : typeof (tag = tryGet(O = Object(it), TO_STRING_TAG$1)) == 'string' ? tag
        // builtinTag case
        : CORRECT_ARGUMENTS ? classofRaw(O)
        // ES3 arguments fallback
        : (result = classofRaw(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : result;
    };

    var TO_STRING_TAG_SUPPORT$1 = toStringTagSupport;
    var classof$4 = classof$5;

    // `Object.prototype.toString` method implementation
    // https://tc39.es/ecma262/#sec-object.prototype.tostring
    var objectToString = TO_STRING_TAG_SUPPORT$1 ? {}.toString : function toString() {
      return '[object ' + classof$4(this) + ']';
    };

    var TO_STRING_TAG_SUPPORT = toStringTagSupport;
    var redefine$7 = redefine$a.exports;
    var toString = objectToString;

    // `Object.prototype.toString` method
    // https://tc39.es/ecma262/#sec-object.prototype.tostring
    if (!TO_STRING_TAG_SUPPORT) {
      redefine$7(Object.prototype, 'toString', toString, { unsafe: true });
    }

    var anObject$a = anObject$g;

    // `RegExp.prototype.flags` getter implementation
    // https://tc39.es/ecma262/#sec-get-regexp.prototype.flags
    var regexpFlags$1 = function () {
      var that = anObject$a(this);
      var result = '';
      if (that.global) result += 'g';
      if (that.ignoreCase) result += 'i';
      if (that.multiline) result += 'm';
      if (that.dotAll) result += 's';
      if (that.unicode) result += 'u';
      if (that.sticky) result += 'y';
      return result;
    };

    var redefine$6 = redefine$a.exports;
    var anObject$9 = anObject$g;
    var fails$f = fails$q;
    var flags = regexpFlags$1;

    var TO_STRING = 'toString';
    var RegExpPrototype$2 = RegExp.prototype;
    var nativeToString = RegExpPrototype$2[TO_STRING];

    var NOT_GENERIC = fails$f(function () { return nativeToString.call({ source: 'a', flags: 'b' }) != '/a/b'; });
    // FF44- RegExp#toString has a wrong name
    var INCORRECT_NAME = nativeToString.name != TO_STRING;

    // `RegExp.prototype.toString` method
    // https://tc39.es/ecma262/#sec-regexp.prototype.tostring
    if (NOT_GENERIC || INCORRECT_NAME) {
      redefine$6(RegExp.prototype, TO_STRING, function toString() {
        var R = anObject$9(this);
        var p = String(R.source);
        var rf = R.flags;
        var f = String(rf === undefined && R instanceof RegExp && !('flags' in RegExpPrototype$2) ? flags.call(R) : rf);
        return '/' + p + '/' + f;
      }, { unsafe: true });
    }

    var global$a = global$o;

    var nativePromiseConstructor = global$a.Promise;

    var redefine$5 = redefine$a.exports;

    var redefineAll$2 = function (target, src, options) {
      for (var key in src) redefine$5(target, key, src[key], options);
      return target;
    };

    var isObject$9 = isObject$g;

    var aPossiblePrototype$1 = function (it) {
      if (!isObject$9(it) && it !== null) {
        throw TypeError("Can't set " + String(it) + ' as a prototype');
      } return it;
    };

    /* eslint-disable no-proto -- safe */

    var anObject$8 = anObject$g;
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
        anObject$8(O);
        aPossiblePrototype(proto);
        if (CORRECT_SETTER) setter.call(O, proto);
        else O.__proto__ = proto;
        return O;
      };
    }() : undefined);

    var getBuiltIn$1 = getBuiltIn$6;
    var definePropertyModule$1 = objectDefineProperty;
    var wellKnownSymbol$f = wellKnownSymbol$n;
    var DESCRIPTORS$4 = descriptors;

    var SPECIES$4 = wellKnownSymbol$f('species');

    var setSpecies$3 = function (CONSTRUCTOR_NAME) {
      var Constructor = getBuiltIn$1(CONSTRUCTOR_NAME);
      var defineProperty = definePropertyModule$1.f;

      if (DESCRIPTORS$4 && Constructor && !Constructor[SPECIES$4]) {
        defineProperty(Constructor, SPECIES$4, {
          configurable: true,
          get: function () { return this; }
        });
      }
    };

    var anInstance$3 = function (it, Constructor, name) {
      if (!(it instanceof Constructor)) {
        throw TypeError('Incorrect ' + (name ? name + ' ' : '') + 'invocation');
      } return it;
    };

    var iterators = {};

    var wellKnownSymbol$e = wellKnownSymbol$n;
    var Iterators$4 = iterators;

    var ITERATOR$5 = wellKnownSymbol$e('iterator');
    var ArrayPrototype$1 = Array.prototype;

    // check on default Array iterator
    var isArrayIteratorMethod$2 = function (it) {
      return it !== undefined && (Iterators$4.Array === it || ArrayPrototype$1[ITERATOR$5] === it);
    };

    var classof$3 = classof$5;
    var Iterators$3 = iterators;
    var wellKnownSymbol$d = wellKnownSymbol$n;

    var ITERATOR$4 = wellKnownSymbol$d('iterator');

    var getIteratorMethod$2 = function (it) {
      if (it != undefined) return it[ITERATOR$4]
        || it['@@iterator']
        || Iterators$3[classof$3(it)];
    };

    var anObject$7 = anObject$g;

    var iteratorClose$2 = function (iterator) {
      var returnMethod = iterator['return'];
      if (returnMethod !== undefined) {
        return anObject$7(returnMethod.call(iterator)).value;
      }
    };

    var anObject$6 = anObject$g;
    var isArrayIteratorMethod$1 = isArrayIteratorMethod$2;
    var toLength$7 = toLength$a;
    var bind$4 = functionBindContext;
    var getIteratorMethod$1 = getIteratorMethod$2;
    var iteratorClose$1 = iteratorClose$2;

    var Result = function (stopped, result) {
      this.stopped = stopped;
      this.result = result;
    };

    var iterate$3 = function (iterable, unboundFunction, options) {
      var that = options && options.that;
      var AS_ENTRIES = !!(options && options.AS_ENTRIES);
      var IS_ITERATOR = !!(options && options.IS_ITERATOR);
      var INTERRUPTED = !!(options && options.INTERRUPTED);
      var fn = bind$4(unboundFunction, that, 1 + AS_ENTRIES + INTERRUPTED);
      var iterator, iterFn, index, length, result, next, step;

      var stop = function (condition) {
        if (iterator) iteratorClose$1(iterator);
        return new Result(true, condition);
      };

      var callFn = function (value) {
        if (AS_ENTRIES) {
          anObject$6(value);
          return INTERRUPTED ? fn(value[0], value[1], stop) : fn(value[0], value[1]);
        } return INTERRUPTED ? fn(value, stop) : fn(value);
      };

      if (IS_ITERATOR) {
        iterator = iterable;
      } else {
        iterFn = getIteratorMethod$1(iterable);
        if (typeof iterFn != 'function') throw TypeError('Target is not iterable');
        // optimisation for array iterators
        if (isArrayIteratorMethod$1(iterFn)) {
          for (index = 0, length = toLength$7(iterable.length); length > index; index++) {
            result = callFn(iterable[index]);
            if (result && result instanceof Result) return result;
          } return new Result(false);
        }
        iterator = iterFn.call(iterable);
      }

      next = iterator.next;
      while (!(step = next.call(iterator)).done) {
        try {
          result = callFn(step.value);
        } catch (error) {
          iteratorClose$1(iterator);
          throw error;
        }
        if (typeof result == 'object' && result && result instanceof Result) return result;
      } return new Result(false);
    };

    var wellKnownSymbol$c = wellKnownSymbol$n;

    var ITERATOR$3 = wellKnownSymbol$c('iterator');
    var SAFE_CLOSING = false;

    try {
      var called = 0;
      var iteratorWithReturn = {
        next: function () {
          return { done: !!called++ };
        },
        'return': function () {
          SAFE_CLOSING = true;
        }
      };
      iteratorWithReturn[ITERATOR$3] = function () {
        return this;
      };
      // eslint-disable-next-line es/no-array-from, no-throw-literal -- required for testing
      Array.from(iteratorWithReturn, function () { throw 2; });
    } catch (error) { /* empty */ }

    var checkCorrectnessOfIteration$3 = function (exec, SKIP_CLOSING) {
      if (!SKIP_CLOSING && !SAFE_CLOSING) return false;
      var ITERATION_SUPPORT = false;
      try {
        var object = {};
        object[ITERATOR$3] = function () {
          return {
            next: function () {
              return { done: ITERATION_SUPPORT = true };
            }
          };
        };
        exec(object);
      } catch (error) { /* empty */ }
      return ITERATION_SUPPORT;
    };

    var anObject$5 = anObject$g;
    var aFunction$2 = aFunction$4;
    var wellKnownSymbol$b = wellKnownSymbol$n;

    var SPECIES$3 = wellKnownSymbol$b('species');

    // `SpeciesConstructor` abstract operation
    // https://tc39.es/ecma262/#sec-speciesconstructor
    var speciesConstructor$2 = function (O, defaultConstructor) {
      var C = anObject$5(O).constructor;
      var S;
      return C === undefined || (S = anObject$5(C)[SPECIES$3]) == undefined ? defaultConstructor : aFunction$2(S);
    };

    var userAgent$1 = engineUserAgent;

    var engineIsIos = /(?:iphone|ipod|ipad).*applewebkit/i.test(userAgent$1);

    var classof$2 = classofRaw$1;
    var global$9 = global$o;

    var engineIsNode = classof$2(global$9.process) == 'process';

    var global$8 = global$o;
    var fails$e = fails$q;
    var bind$3 = functionBindContext;
    var html = html$2;
    var createElement = documentCreateElement$1;
    var IS_IOS$1 = engineIsIos;
    var IS_NODE$2 = engineIsNode;

    var location = global$8.location;
    var set = global$8.setImmediate;
    var clear = global$8.clearImmediate;
    var process$2 = global$8.process;
    var MessageChannel = global$8.MessageChannel;
    var Dispatch = global$8.Dispatch;
    var counter = 0;
    var queue = {};
    var ONREADYSTATECHANGE = 'onreadystatechange';
    var defer, channel, port;

    var run = function (id) {
      // eslint-disable-next-line no-prototype-builtins -- safe
      if (queue.hasOwnProperty(id)) {
        var fn = queue[id];
        delete queue[id];
        fn();
      }
    };

    var runner = function (id) {
      return function () {
        run(id);
      };
    };

    var listener = function (event) {
      run(event.data);
    };

    var post = function (id) {
      // old engines have not location.origin
      global$8.postMessage(id + '', location.protocol + '//' + location.host);
    };

    // Node.js 0.9+ & IE10+ has setImmediate, otherwise:
    if (!set || !clear) {
      set = function setImmediate(fn) {
        var args = [];
        var i = 1;
        while (arguments.length > i) args.push(arguments[i++]);
        queue[++counter] = function () {
          // eslint-disable-next-line no-new-func -- spec requirement
          (typeof fn == 'function' ? fn : Function(fn)).apply(undefined, args);
        };
        defer(counter);
        return counter;
      };
      clear = function clearImmediate(id) {
        delete queue[id];
      };
      // Node.js 0.8-
      if (IS_NODE$2) {
        defer = function (id) {
          process$2.nextTick(runner(id));
        };
      // Sphere (JS game engine) Dispatch API
      } else if (Dispatch && Dispatch.now) {
        defer = function (id) {
          Dispatch.now(runner(id));
        };
      // Browsers with MessageChannel, includes WebWorkers
      // except iOS - https://github.com/zloirock/core-js/issues/624
      } else if (MessageChannel && !IS_IOS$1) {
        channel = new MessageChannel();
        port = channel.port2;
        channel.port1.onmessage = listener;
        defer = bind$3(port.postMessage, port, 1);
      // Browsers with postMessage, skip WebWorkers
      // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
      } else if (
        global$8.addEventListener &&
        typeof postMessage == 'function' &&
        !global$8.importScripts &&
        location && location.protocol !== 'file:' &&
        !fails$e(post)
      ) {
        defer = post;
        global$8.addEventListener('message', listener, false);
      // IE8-
      } else if (ONREADYSTATECHANGE in createElement('script')) {
        defer = function (id) {
          html.appendChild(createElement('script'))[ONREADYSTATECHANGE] = function () {
            html.removeChild(this);
            run(id);
          };
        };
      // Rest old browsers
      } else {
        defer = function (id) {
          setTimeout(runner(id), 0);
        };
      }
    }

    var task$1 = {
      set: set,
      clear: clear
    };

    var userAgent = engineUserAgent;

    var engineIsWebosWebkit = /web0s(?!.*chrome)/i.test(userAgent);

    var global$7 = global$o;
    var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;
    var macrotask = task$1.set;
    var IS_IOS = engineIsIos;
    var IS_WEBOS_WEBKIT = engineIsWebosWebkit;
    var IS_NODE$1 = engineIsNode;

    var MutationObserver = global$7.MutationObserver || global$7.WebKitMutationObserver;
    var document$2 = global$7.document;
    var process$1 = global$7.process;
    var Promise$1 = global$7.Promise;
    // Node.js 11 shows ExperimentalWarning on getting `queueMicrotask`
    var queueMicrotaskDescriptor = getOwnPropertyDescriptor(global$7, 'queueMicrotask');
    var queueMicrotask = queueMicrotaskDescriptor && queueMicrotaskDescriptor.value;

    var flush, head, last, notify$1, toggle, node, promise, then;

    // modern engines have queueMicrotask method
    if (!queueMicrotask) {
      flush = function () {
        var parent, fn;
        if (IS_NODE$1 && (parent = process$1.domain)) parent.exit();
        while (head) {
          fn = head.fn;
          head = head.next;
          try {
            fn();
          } catch (error) {
            if (head) notify$1();
            else last = undefined;
            throw error;
          }
        } last = undefined;
        if (parent) parent.enter();
      };

      // browsers with MutationObserver, except iOS - https://github.com/zloirock/core-js/issues/339
      // also except WebOS Webkit https://github.com/zloirock/core-js/issues/898
      if (!IS_IOS && !IS_NODE$1 && !IS_WEBOS_WEBKIT && MutationObserver && document$2) {
        toggle = true;
        node = document$2.createTextNode('');
        new MutationObserver(flush).observe(node, { characterData: true });
        notify$1 = function () {
          node.data = toggle = !toggle;
        };
      // environments with maybe non-completely correct, but existent Promise
      } else if (Promise$1 && Promise$1.resolve) {
        // Promise.resolve without an argument throws an error in LG WebOS 2
        promise = Promise$1.resolve(undefined);
        // workaround of WebKit ~ iOS Safari 10.1 bug
        promise.constructor = Promise$1;
        then = promise.then;
        notify$1 = function () {
          then.call(promise, flush);
        };
      // Node.js without promises
      } else if (IS_NODE$1) {
        notify$1 = function () {
          process$1.nextTick(flush);
        };
      // for other environments - macrotask based on:
      // - setImmediate
      // - MessageChannel
      // - window.postMessag
      // - onreadystatechange
      // - setTimeout
      } else {
        notify$1 = function () {
          // strange IE + webpack dev server bug - use .call(global)
          macrotask.call(global$7, flush);
        };
      }
    }

    var microtask$1 = queueMicrotask || function (fn) {
      var task = { fn: fn, next: undefined };
      if (last) last.next = task;
      if (!head) {
        head = task;
        notify$1();
      } last = task;
    };

    var newPromiseCapability$2 = {};

    var aFunction$1 = aFunction$4;

    var PromiseCapability = function (C) {
      var resolve, reject;
      this.promise = new C(function ($$resolve, $$reject) {
        if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
        resolve = $$resolve;
        reject = $$reject;
      });
      this.resolve = aFunction$1(resolve);
      this.reject = aFunction$1(reject);
    };

    // `NewPromiseCapability` abstract operation
    // https://tc39.es/ecma262/#sec-newpromisecapability
    newPromiseCapability$2.f = function (C) {
      return new PromiseCapability(C);
    };

    var anObject$4 = anObject$g;
    var isObject$8 = isObject$g;
    var newPromiseCapability$1 = newPromiseCapability$2;

    var promiseResolve$1 = function (C, x) {
      anObject$4(C);
      if (isObject$8(x) && x.constructor === C) return x;
      var promiseCapability = newPromiseCapability$1.f(C);
      var resolve = promiseCapability.resolve;
      resolve(x);
      return promiseCapability.promise;
    };

    var global$6 = global$o;

    var hostReportErrors$1 = function (a, b) {
      var console = global$6.console;
      if (console && console.error) {
        arguments.length === 1 ? console.error(a) : console.error(a, b);
      }
    };

    var perform$1 = function (exec) {
      try {
        return { error: false, value: exec() };
      } catch (error) {
        return { error: true, value: error };
      }
    };

    var engineIsBrowser = typeof window == 'object';

    var $$g = _export;
    var global$5 = global$o;
    var getBuiltIn = getBuiltIn$6;
    var NativePromise = nativePromiseConstructor;
    var redefine$4 = redefine$a.exports;
    var redefineAll$1 = redefineAll$2;
    var setPrototypeOf$2 = objectSetPrototypeOf;
    var setToStringTag$3 = setToStringTag$5;
    var setSpecies$2 = setSpecies$3;
    var isObject$7 = isObject$g;
    var aFunction = aFunction$4;
    var anInstance$2 = anInstance$3;
    var inspectSource = inspectSource$3;
    var iterate$2 = iterate$3;
    var checkCorrectnessOfIteration$2 = checkCorrectnessOfIteration$3;
    var speciesConstructor$1 = speciesConstructor$2;
    var task = task$1.set;
    var microtask = microtask$1;
    var promiseResolve = promiseResolve$1;
    var hostReportErrors = hostReportErrors$1;
    var newPromiseCapabilityModule = newPromiseCapability$2;
    var perform = perform$1;
    var InternalStateModule$3 = internalState;
    var isForced$2 = isForced_1;
    var wellKnownSymbol$a = wellKnownSymbol$n;
    var IS_BROWSER = engineIsBrowser;
    var IS_NODE = engineIsNode;
    var V8_VERSION$1 = engineV8Version;

    var SPECIES$2 = wellKnownSymbol$a('species');
    var PROMISE = 'Promise';
    var getInternalState$3 = InternalStateModule$3.get;
    var setInternalState$3 = InternalStateModule$3.set;
    var getInternalPromiseState = InternalStateModule$3.getterFor(PROMISE);
    var NativePromisePrototype = NativePromise && NativePromise.prototype;
    var PromiseConstructor = NativePromise;
    var PromiseConstructorPrototype = NativePromisePrototype;
    var TypeError$1 = global$5.TypeError;
    var document$1 = global$5.document;
    var process = global$5.process;
    var newPromiseCapability = newPromiseCapabilityModule.f;
    var newGenericPromiseCapability = newPromiseCapability;
    var DISPATCH_EVENT = !!(document$1 && document$1.createEvent && global$5.dispatchEvent);
    var NATIVE_REJECTION_EVENT = typeof PromiseRejectionEvent == 'function';
    var UNHANDLED_REJECTION = 'unhandledrejection';
    var REJECTION_HANDLED = 'rejectionhandled';
    var PENDING = 0;
    var FULFILLED = 1;
    var REJECTED = 2;
    var HANDLED = 1;
    var UNHANDLED = 2;
    var SUBCLASSING = false;
    var Internal, OwnPromiseCapability, PromiseWrapper, nativeThen;

    var FORCED$1 = isForced$2(PROMISE, function () {
      var PROMISE_CONSTRUCTOR_SOURCE = inspectSource(PromiseConstructor);
      var GLOBAL_CORE_JS_PROMISE = PROMISE_CONSTRUCTOR_SOURCE !== String(PromiseConstructor);
      // V8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
      // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
      // We can't detect it synchronously, so just check versions
      if (!GLOBAL_CORE_JS_PROMISE && V8_VERSION$1 === 66) return true;
      // We can't use @@species feature detection in V8 since it causes
      // deoptimization and performance degradation
      // https://github.com/zloirock/core-js/issues/679
      if (V8_VERSION$1 >= 51 && /native code/.test(PROMISE_CONSTRUCTOR_SOURCE)) return false;
      // Detect correctness of subclassing with @@species support
      var promise = new PromiseConstructor(function (resolve) { resolve(1); });
      var FakePromise = function (exec) {
        exec(function () { /* empty */ }, function () { /* empty */ });
      };
      var constructor = promise.constructor = {};
      constructor[SPECIES$2] = FakePromise;
      SUBCLASSING = promise.then(function () { /* empty */ }) instanceof FakePromise;
      if (!SUBCLASSING) return true;
      // Unhandled rejections tracking support, NodeJS Promise without it fails @@species test
      return !GLOBAL_CORE_JS_PROMISE && IS_BROWSER && !NATIVE_REJECTION_EVENT;
    });

    var INCORRECT_ITERATION$1 = FORCED$1 || !checkCorrectnessOfIteration$2(function (iterable) {
      PromiseConstructor.all(iterable)['catch'](function () { /* empty */ });
    });

    // helpers
    var isThenable = function (it) {
      var then;
      return isObject$7(it) && typeof (then = it.then) == 'function' ? then : false;
    };

    var notify = function (state, isReject) {
      if (state.notified) return;
      state.notified = true;
      var chain = state.reactions;
      microtask(function () {
        var value = state.value;
        var ok = state.state == FULFILLED;
        var index = 0;
        // variable length - can't use forEach
        while (chain.length > index) {
          var reaction = chain[index++];
          var handler = ok ? reaction.ok : reaction.fail;
          var resolve = reaction.resolve;
          var reject = reaction.reject;
          var domain = reaction.domain;
          var result, then, exited;
          try {
            if (handler) {
              if (!ok) {
                if (state.rejection === UNHANDLED) onHandleUnhandled(state);
                state.rejection = HANDLED;
              }
              if (handler === true) result = value;
              else {
                if (domain) domain.enter();
                result = handler(value); // can throw
                if (domain) {
                  domain.exit();
                  exited = true;
                }
              }
              if (result === reaction.promise) {
                reject(TypeError$1('Promise-chain cycle'));
              } else if (then = isThenable(result)) {
                then.call(result, resolve, reject);
              } else resolve(result);
            } else reject(value);
          } catch (error) {
            if (domain && !exited) domain.exit();
            reject(error);
          }
        }
        state.reactions = [];
        state.notified = false;
        if (isReject && !state.rejection) onUnhandled(state);
      });
    };

    var dispatchEvent = function (name, promise, reason) {
      var event, handler;
      if (DISPATCH_EVENT) {
        event = document$1.createEvent('Event');
        event.promise = promise;
        event.reason = reason;
        event.initEvent(name, false, true);
        global$5.dispatchEvent(event);
      } else event = { promise: promise, reason: reason };
      if (!NATIVE_REJECTION_EVENT && (handler = global$5['on' + name])) handler(event);
      else if (name === UNHANDLED_REJECTION) hostReportErrors('Unhandled promise rejection', reason);
    };

    var onUnhandled = function (state) {
      task.call(global$5, function () {
        var promise = state.facade;
        var value = state.value;
        var IS_UNHANDLED = isUnhandled(state);
        var result;
        if (IS_UNHANDLED) {
          result = perform(function () {
            if (IS_NODE) {
              process.emit('unhandledRejection', value, promise);
            } else dispatchEvent(UNHANDLED_REJECTION, promise, value);
          });
          // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
          state.rejection = IS_NODE || isUnhandled(state) ? UNHANDLED : HANDLED;
          if (result.error) throw result.value;
        }
      });
    };

    var isUnhandled = function (state) {
      return state.rejection !== HANDLED && !state.parent;
    };

    var onHandleUnhandled = function (state) {
      task.call(global$5, function () {
        var promise = state.facade;
        if (IS_NODE) {
          process.emit('rejectionHandled', promise);
        } else dispatchEvent(REJECTION_HANDLED, promise, state.value);
      });
    };

    var bind$2 = function (fn, state, unwrap) {
      return function (value) {
        fn(state, value, unwrap);
      };
    };

    var internalReject = function (state, value, unwrap) {
      if (state.done) return;
      state.done = true;
      if (unwrap) state = unwrap;
      state.value = value;
      state.state = REJECTED;
      notify(state, true);
    };

    var internalResolve = function (state, value, unwrap) {
      if (state.done) return;
      state.done = true;
      if (unwrap) state = unwrap;
      try {
        if (state.facade === value) throw TypeError$1("Promise can't be resolved itself");
        var then = isThenable(value);
        if (then) {
          microtask(function () {
            var wrapper = { done: false };
            try {
              then.call(value,
                bind$2(internalResolve, wrapper, state),
                bind$2(internalReject, wrapper, state)
              );
            } catch (error) {
              internalReject(wrapper, error, state);
            }
          });
        } else {
          state.value = value;
          state.state = FULFILLED;
          notify(state, false);
        }
      } catch (error) {
        internalReject({ done: false }, error, state);
      }
    };

    // constructor polyfill
    if (FORCED$1) {
      // 25.4.3.1 Promise(executor)
      PromiseConstructor = function Promise(executor) {
        anInstance$2(this, PromiseConstructor, PROMISE);
        aFunction(executor);
        Internal.call(this);
        var state = getInternalState$3(this);
        try {
          executor(bind$2(internalResolve, state), bind$2(internalReject, state));
        } catch (error) {
          internalReject(state, error);
        }
      };
      PromiseConstructorPrototype = PromiseConstructor.prototype;
      // eslint-disable-next-line no-unused-vars -- required for `.length`
      Internal = function Promise(executor) {
        setInternalState$3(this, {
          type: PROMISE,
          done: false,
          notified: false,
          parent: false,
          reactions: [],
          rejection: false,
          state: PENDING,
          value: undefined
        });
      };
      Internal.prototype = redefineAll$1(PromiseConstructorPrototype, {
        // `Promise.prototype.then` method
        // https://tc39.es/ecma262/#sec-promise.prototype.then
        then: function then(onFulfilled, onRejected) {
          var state = getInternalPromiseState(this);
          var reaction = newPromiseCapability(speciesConstructor$1(this, PromiseConstructor));
          reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
          reaction.fail = typeof onRejected == 'function' && onRejected;
          reaction.domain = IS_NODE ? process.domain : undefined;
          state.parent = true;
          state.reactions.push(reaction);
          if (state.state != PENDING) notify(state, false);
          return reaction.promise;
        },
        // `Promise.prototype.catch` method
        // https://tc39.es/ecma262/#sec-promise.prototype.catch
        'catch': function (onRejected) {
          return this.then(undefined, onRejected);
        }
      });
      OwnPromiseCapability = function () {
        var promise = new Internal();
        var state = getInternalState$3(promise);
        this.promise = promise;
        this.resolve = bind$2(internalResolve, state);
        this.reject = bind$2(internalReject, state);
      };
      newPromiseCapabilityModule.f = newPromiseCapability = function (C) {
        return C === PromiseConstructor || C === PromiseWrapper
          ? new OwnPromiseCapability(C)
          : newGenericPromiseCapability(C);
      };

      if (typeof NativePromise == 'function' && NativePromisePrototype !== Object.prototype) {
        nativeThen = NativePromisePrototype.then;

        if (!SUBCLASSING) {
          // make `Promise#then` return a polyfilled `Promise` for native promise-based APIs
          redefine$4(NativePromisePrototype, 'then', function then(onFulfilled, onRejected) {
            var that = this;
            return new PromiseConstructor(function (resolve, reject) {
              nativeThen.call(that, resolve, reject);
            }).then(onFulfilled, onRejected);
          // https://github.com/zloirock/core-js/issues/640
          }, { unsafe: true });

          // makes sure that native promise-based APIs `Promise#catch` properly works with patched `Promise#then`
          redefine$4(NativePromisePrototype, 'catch', PromiseConstructorPrototype['catch'], { unsafe: true });
        }

        // make `.constructor === Promise` work for native promise-based APIs
        try {
          delete NativePromisePrototype.constructor;
        } catch (error) { /* empty */ }

        // make `instanceof Promise` work for native promise-based APIs
        if (setPrototypeOf$2) {
          setPrototypeOf$2(NativePromisePrototype, PromiseConstructorPrototype);
        }
      }
    }

    $$g({ global: true, wrap: true, forced: FORCED$1 }, {
      Promise: PromiseConstructor
    });

    setToStringTag$3(PromiseConstructor, PROMISE, false);
    setSpecies$2(PROMISE);

    PromiseWrapper = getBuiltIn(PROMISE);

    // statics
    $$g({ target: PROMISE, stat: true, forced: FORCED$1 }, {
      // `Promise.reject` method
      // https://tc39.es/ecma262/#sec-promise.reject
      reject: function reject(r) {
        var capability = newPromiseCapability(this);
        capability.reject.call(undefined, r);
        return capability.promise;
      }
    });

    $$g({ target: PROMISE, stat: true, forced: FORCED$1 }, {
      // `Promise.resolve` method
      // https://tc39.es/ecma262/#sec-promise.resolve
      resolve: function resolve(x) {
        return promiseResolve(this, x);
      }
    });

    $$g({ target: PROMISE, stat: true, forced: INCORRECT_ITERATION$1 }, {
      // `Promise.all` method
      // https://tc39.es/ecma262/#sec-promise.all
      all: function all(iterable) {
        var C = this;
        var capability = newPromiseCapability(C);
        var resolve = capability.resolve;
        var reject = capability.reject;
        var result = perform(function () {
          var $promiseResolve = aFunction(C.resolve);
          var values = [];
          var counter = 0;
          var remaining = 1;
          iterate$2(iterable, function (promise) {
            var index = counter++;
            var alreadyCalled = false;
            values.push(undefined);
            remaining++;
            $promiseResolve.call(C, promise).then(function (value) {
              if (alreadyCalled) return;
              alreadyCalled = true;
              values[index] = value;
              --remaining || resolve(values);
            }, reject);
          });
          --remaining || resolve(values);
        });
        if (result.error) reject(result.value);
        return capability.promise;
      },
      // `Promise.race` method
      // https://tc39.es/ecma262/#sec-promise.race
      race: function race(iterable) {
        var C = this;
        var capability = newPromiseCapability(C);
        var reject = capability.reject;
        var result = perform(function () {
          var $promiseResolve = aFunction(C.resolve);
          iterate$2(iterable, function (promise) {
            $promiseResolve.call(C, promise).then(capability.resolve, reject);
          });
        });
        if (result.error) reject(result.value);
        return capability.promise;
      }
    });

    var $$f = _export;
    var IndexedObject = indexedObject;
    var toIndexedObject$2 = toIndexedObject$a;
    var arrayMethodIsStrict = arrayMethodIsStrict$2;

    var nativeJoin = [].join;

    var ES3_STRINGS = IndexedObject != Object;
    var STRICT_METHOD = arrayMethodIsStrict('join', ',');

    // `Array.prototype.join` method
    // https://tc39.es/ecma262/#sec-array.prototype.join
    $$f({ target: 'Array', proto: true, forced: ES3_STRINGS || !STRICT_METHOD }, {
      join: function join(separator) {
        return nativeJoin.call(toIndexedObject$2(this), separator === undefined ? ',' : separator);
      }
    });

    var $$e = _export;
    var fails$d = fails$q;
    var isArray$1 = isArray$4;
    var isObject$6 = isObject$g;
    var toObject$4 = toObject$9;
    var toLength$6 = toLength$a;
    var createProperty$3 = createProperty$5;
    var arraySpeciesCreate$1 = arraySpeciesCreate$3;
    var arrayMethodHasSpeciesSupport$3 = arrayMethodHasSpeciesSupport$5;
    var wellKnownSymbol$9 = wellKnownSymbol$n;
    var V8_VERSION = engineV8Version;

    var IS_CONCAT_SPREADABLE = wellKnownSymbol$9('isConcatSpreadable');
    var MAX_SAFE_INTEGER$1 = 0x1FFFFFFFFFFFFF;
    var MAXIMUM_ALLOWED_INDEX_EXCEEDED = 'Maximum allowed index exceeded';

    // We can't use this feature detection in V8 since it causes
    // deoptimization and serious performance degradation
    // https://github.com/zloirock/core-js/issues/679
    var IS_CONCAT_SPREADABLE_SUPPORT = V8_VERSION >= 51 || !fails$d(function () {
      var array = [];
      array[IS_CONCAT_SPREADABLE] = false;
      return array.concat()[0] !== array;
    });

    var SPECIES_SUPPORT = arrayMethodHasSpeciesSupport$3('concat');

    var isConcatSpreadable = function (O) {
      if (!isObject$6(O)) return false;
      var spreadable = O[IS_CONCAT_SPREADABLE];
      return spreadable !== undefined ? !!spreadable : isArray$1(O);
    };

    var FORCED = !IS_CONCAT_SPREADABLE_SUPPORT || !SPECIES_SUPPORT;

    // `Array.prototype.concat` method
    // https://tc39.es/ecma262/#sec-array.prototype.concat
    // with adding support of @@isConcatSpreadable and @@species
    $$e({ target: 'Array', proto: true, forced: FORCED }, {
      // eslint-disable-next-line no-unused-vars -- required for `.length`
      concat: function concat(arg) {
        var O = toObject$4(this);
        var A = arraySpeciesCreate$1(O, 0);
        var n = 0;
        var i, k, length, len, E;
        for (i = -1, length = arguments.length; i < length; i++) {
          E = i === -1 ? O : arguments[i];
          if (isConcatSpreadable(E)) {
            len = toLength$6(E.length);
            if (n + len > MAX_SAFE_INTEGER$1) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
            for (k = 0; k < len; k++, n++) if (k in E) createProperty$3(A, n, E[k]);
          } else {
            if (n >= MAX_SAFE_INTEGER$1) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
            createProperty$3(A, n++, E);
          }
        }
        A.length = n;
        return A;
      }
    });

    function _typeof(obj) {
      "@babel/helpers - typeof";

      if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
        _typeof = function _typeof(obj) {
          return typeof obj;
        };
      } else {
        _typeof = function _typeof(obj) {
          return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
        };
      }

      return _typeof(obj);
    }

    // a string of all valid unicode whitespaces
    var whitespaces$2 = '\u0009\u000A\u000B\u000C\u000D\u0020\u00A0\u1680\u2000\u2001\u2002' +
      '\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';

    var requireObjectCoercible$5 = requireObjectCoercible$8;
    var whitespaces$1 = whitespaces$2;

    var whitespace = '[' + whitespaces$1 + ']';
    var ltrim = RegExp('^' + whitespace + whitespace + '*');
    var rtrim = RegExp(whitespace + whitespace + '*$');

    // `String.prototype.{ trim, trimStart, trimEnd, trimLeft, trimRight }` methods implementation
    var createMethod$1 = function (TYPE) {
      return function ($this) {
        var string = String(requireObjectCoercible$5($this));
        if (TYPE & 1) string = string.replace(ltrim, '');
        if (TYPE & 2) string = string.replace(rtrim, '');
        return string;
      };
    };

    var stringTrim = {
      // `String.prototype.{ trimLeft, trimStart }` methods
      // https://tc39.es/ecma262/#sec-string.prototype.trimstart
      start: createMethod$1(1),
      // `String.prototype.{ trimRight, trimEnd }` methods
      // https://tc39.es/ecma262/#sec-string.prototype.trimend
      end: createMethod$1(2),
      // `String.prototype.trim` method
      // https://tc39.es/ecma262/#sec-string.prototype.trim
      trim: createMethod$1(3)
    };

    var fails$c = fails$q;
    var whitespaces = whitespaces$2;

    var non = '\u200B\u0085\u180E';

    // check that a method works with the correct list
    // of whitespaces and has a correct name
    var stringTrimForced = function (METHOD_NAME) {
      return fails$c(function () {
        return !!whitespaces[METHOD_NAME]() || non[METHOD_NAME]() != non || whitespaces[METHOD_NAME].name !== METHOD_NAME;
      });
    };

    var $$d = _export;
    var $trim = stringTrim.trim;
    var forcedStringTrimMethod = stringTrimForced;

    // `String.prototype.trim` method
    // https://tc39.es/ecma262/#sec-string.prototype.trim
    $$d({ target: 'String', proto: true, forced: forcedStringTrimMethod('trim') }, {
      trim: function trim() {
        return $trim(this);
      }
    });

    var regexpStickyHelpers = {};

    var fails$b = fails$q;

    // babel-minify transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError,
    var RE = function (s, f) {
      return RegExp(s, f);
    };

    regexpStickyHelpers.UNSUPPORTED_Y = fails$b(function () {
      var re = RE('a', 'y');
      re.lastIndex = 2;
      return re.exec('abcd') != null;
    });

    regexpStickyHelpers.BROKEN_CARET = fails$b(function () {
      // https://bugzilla.mozilla.org/show_bug.cgi?id=773687
      var re = RE('^r', 'gy');
      re.lastIndex = 2;
      return re.exec('str') != null;
    });

    var fails$a = fails$q;

    var regexpUnsupportedDotAll = fails$a(function () {
      // babel-minify transpiles RegExp('.', 's') -> /./s and it causes SyntaxError
      var re = RegExp('.', (typeof '').charAt(0));
      return !(re.dotAll && re.exec('\n') && re.flags === 's');
    });

    var fails$9 = fails$q;

    var regexpUnsupportedNcg = fails$9(function () {
      // babel-minify transpiles RegExp('.', 'g') -> /./g and it causes SyntaxError
      var re = RegExp('(?<a>b)', (typeof '').charAt(5));
      return re.exec('b').groups.a !== 'b' ||
        'b'.replace(re, '$<a>c') !== 'bc';
    });

    /* eslint-disable regexp/no-assertion-capturing-group, regexp/no-empty-group, regexp/no-lazy-ends -- testing */
    /* eslint-disable regexp/no-useless-quantifier -- testing */
    var regexpFlags = regexpFlags$1;
    var stickyHelpers$2 = regexpStickyHelpers;
    var shared = shared$5.exports;
    var create$3 = objectCreate;
    var getInternalState$2 = internalState.get;
    var UNSUPPORTED_DOT_ALL$1 = regexpUnsupportedDotAll;
    var UNSUPPORTED_NCG$1 = regexpUnsupportedNcg;

    var nativeExec = RegExp.prototype.exec;
    var nativeReplace = shared('native-string-replace', String.prototype.replace);

    var patchedExec = nativeExec;

    var UPDATES_LAST_INDEX_WRONG = (function () {
      var re1 = /a/;
      var re2 = /b*/g;
      nativeExec.call(re1, 'a');
      nativeExec.call(re2, 'a');
      return re1.lastIndex !== 0 || re2.lastIndex !== 0;
    })();

    var UNSUPPORTED_Y$2 = stickyHelpers$2.UNSUPPORTED_Y || stickyHelpers$2.BROKEN_CARET;

    // nonparticipating capturing group, copied from es5-shim's String#split patch.
    var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

    var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED || UNSUPPORTED_Y$2 || UNSUPPORTED_DOT_ALL$1 || UNSUPPORTED_NCG$1;

    if (PATCH) {
      // eslint-disable-next-line max-statements -- TODO
      patchedExec = function exec(str) {
        var re = this;
        var state = getInternalState$2(re);
        var raw = state.raw;
        var result, reCopy, lastIndex, match, i, object, group;

        if (raw) {
          raw.lastIndex = re.lastIndex;
          result = patchedExec.call(raw, str);
          re.lastIndex = raw.lastIndex;
          return result;
        }

        var groups = state.groups;
        var sticky = UNSUPPORTED_Y$2 && re.sticky;
        var flags = regexpFlags.call(re);
        var source = re.source;
        var charsAdded = 0;
        var strCopy = str;

        if (sticky) {
          flags = flags.replace('y', '');
          if (flags.indexOf('g') === -1) {
            flags += 'g';
          }

          strCopy = String(str).slice(re.lastIndex);
          // Support anchored sticky behavior.
          if (re.lastIndex > 0 && (!re.multiline || re.multiline && str[re.lastIndex - 1] !== '\n')) {
            source = '(?: ' + source + ')';
            strCopy = ' ' + strCopy;
            charsAdded++;
          }
          // ^(? + rx + ) is needed, in combination with some str slicing, to
          // simulate the 'y' flag.
          reCopy = new RegExp('^(?:' + source + ')', flags);
        }

        if (NPCG_INCLUDED) {
          reCopy = new RegExp('^' + source + '$(?!\\s)', flags);
        }
        if (UPDATES_LAST_INDEX_WRONG) lastIndex = re.lastIndex;

        match = nativeExec.call(sticky ? reCopy : re, strCopy);

        if (sticky) {
          if (match) {
            match.input = match.input.slice(charsAdded);
            match[0] = match[0].slice(charsAdded);
            match.index = re.lastIndex;
            re.lastIndex += match[0].length;
          } else re.lastIndex = 0;
        } else if (UPDATES_LAST_INDEX_WRONG && match) {
          re.lastIndex = re.global ? match.index + match[0].length : lastIndex;
        }
        if (NPCG_INCLUDED && match && match.length > 1) {
          // Fix browsers whose `exec` methods don't consistently return `undefined`
          // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
          nativeReplace.call(match[0], reCopy, function () {
            for (i = 1; i < arguments.length - 2; i++) {
              if (arguments[i] === undefined) match[i] = undefined;
            }
          });
        }

        if (match && groups) {
          match.groups = object = create$3(null);
          for (i = 0; i < groups.length; i++) {
            group = groups[i];
            object[group[0]] = match[group[1]];
          }
        }

        return match;
      };
    }

    var regexpExec$3 = patchedExec;

    var $$c = _export;
    var exec = regexpExec$3;

    // `RegExp.prototype.exec` method
    // https://tc39.es/ecma262/#sec-regexp.prototype.exec
    $$c({ target: 'RegExp', proto: true, forced: /./.exec !== exec }, {
      exec: exec
    });

    // TODO: Remove from `core-js@4` since it's moved to entry points

    var redefine$3 = redefine$a.exports;
    var regexpExec$2 = regexpExec$3;
    var fails$8 = fails$q;
    var wellKnownSymbol$8 = wellKnownSymbol$n;
    var createNonEnumerableProperty$4 = createNonEnumerableProperty$b;

    var SPECIES$1 = wellKnownSymbol$8('species');
    var RegExpPrototype$1 = RegExp.prototype;

    var fixRegexpWellKnownSymbolLogic = function (KEY, exec, FORCED, SHAM) {
      var SYMBOL = wellKnownSymbol$8(KEY);

      var DELEGATES_TO_SYMBOL = !fails$8(function () {
        // String methods call symbol-named RegEp methods
        var O = {};
        O[SYMBOL] = function () { return 7; };
        return ''[KEY](O) != 7;
      });

      var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL && !fails$8(function () {
        // Symbol-named RegExp methods call .exec
        var execCalled = false;
        var re = /a/;

        if (KEY === 'split') {
          // We can't use real regex here since it causes deoptimization
          // and serious performance degradation in V8
          // https://github.com/zloirock/core-js/issues/306
          re = {};
          // RegExp[@@split] doesn't call the regex's exec method, but first creates
          // a new one. We need to return the patched regex when creating the new one.
          re.constructor = {};
          re.constructor[SPECIES$1] = function () { return re; };
          re.flags = '';
          re[SYMBOL] = /./[SYMBOL];
        }

        re.exec = function () { execCalled = true; return null; };

        re[SYMBOL]('');
        return !execCalled;
      });

      if (
        !DELEGATES_TO_SYMBOL ||
        !DELEGATES_TO_EXEC ||
        FORCED
      ) {
        var nativeRegExpMethod = /./[SYMBOL];
        var methods = exec(SYMBOL, ''[KEY], function (nativeMethod, regexp, str, arg2, forceStringMethod) {
          var $exec = regexp.exec;
          if ($exec === regexpExec$2 || $exec === RegExpPrototype$1.exec) {
            if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
              // The native String method already delegates to @@method (this
              // polyfilled function), leasing to infinite recursion.
              // We avoid it by directly calling the native @@method method.
              return { done: true, value: nativeRegExpMethod.call(regexp, str, arg2) };
            }
            return { done: true, value: nativeMethod.call(str, regexp, arg2) };
          }
          return { done: false };
        });

        redefine$3(String.prototype, KEY, methods[0]);
        redefine$3(RegExpPrototype$1, SYMBOL, methods[1]);
      }

      if (SHAM) createNonEnumerableProperty$4(RegExpPrototype$1[SYMBOL], 'sham', true);
    };

    var toInteger$2 = toInteger$5;
    var requireObjectCoercible$4 = requireObjectCoercible$8;

    // `String.prototype.{ codePointAt, at }` methods implementation
    var createMethod = function (CONVERT_TO_STRING) {
      return function ($this, pos) {
        var S = String(requireObjectCoercible$4($this));
        var position = toInteger$2(pos);
        var size = S.length;
        var first, second;
        if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
        first = S.charCodeAt(position);
        return first < 0xD800 || first > 0xDBFF || position + 1 === size
          || (second = S.charCodeAt(position + 1)) < 0xDC00 || second > 0xDFFF
            ? CONVERT_TO_STRING ? S.charAt(position) : first
            : CONVERT_TO_STRING ? S.slice(position, position + 2) : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
      };
    };

    var stringMultibyte = {
      // `String.prototype.codePointAt` method
      // https://tc39.es/ecma262/#sec-string.prototype.codepointat
      codeAt: createMethod(false),
      // `String.prototype.at` method
      // https://github.com/mathiasbynens/String.prototype.at
      charAt: createMethod(true)
    };

    var charAt$1 = stringMultibyte.charAt;

    // `AdvanceStringIndex` abstract operation
    // https://tc39.es/ecma262/#sec-advancestringindex
    var advanceStringIndex$3 = function (S, index, unicode) {
      return index + (unicode ? charAt$1(S, index).length : 1);
    };

    var toObject$3 = toObject$9;

    var floor = Math.floor;
    var replace = ''.replace;
    var SUBSTITUTION_SYMBOLS = /\$([$&'`]|\d{1,2}|<[^>]*>)/g;
    var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&'`]|\d{1,2})/g;

    // `GetSubstitution` abstract operation
    // https://tc39.es/ecma262/#sec-getsubstitution
    var getSubstitution$1 = function (matched, str, position, captures, namedCaptures, replacement) {
      var tailPos = position + matched.length;
      var m = captures.length;
      var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
      if (namedCaptures !== undefined) {
        namedCaptures = toObject$3(namedCaptures);
        symbols = SUBSTITUTION_SYMBOLS;
      }
      return replace.call(replacement, symbols, function (match, ch) {
        var capture;
        switch (ch.charAt(0)) {
          case '$': return '$';
          case '&': return matched;
          case '`': return str.slice(0, position);
          case "'": return str.slice(tailPos);
          case '<':
            capture = namedCaptures[ch.slice(1, -1)];
            break;
          default: // \d\d?
            var n = +ch;
            if (n === 0) return match;
            if (n > m) {
              var f = floor(n / 10);
              if (f === 0) return match;
              if (f <= m) return captures[f - 1] === undefined ? ch.charAt(1) : captures[f - 1] + ch.charAt(1);
              return match;
            }
            capture = captures[n - 1];
        }
        return capture === undefined ? '' : capture;
      });
    };

    var classof$1 = classofRaw$1;
    var regexpExec$1 = regexpExec$3;

    // `RegExpExec` abstract operation
    // https://tc39.es/ecma262/#sec-regexpexec
    var regexpExecAbstract = function (R, S) {
      var exec = R.exec;
      if (typeof exec === 'function') {
        var result = exec.call(R, S);
        if (typeof result !== 'object') {
          throw TypeError('RegExp exec method returned something other than an Object or null');
        }
        return result;
      }

      if (classof$1(R) !== 'RegExp') {
        throw TypeError('RegExp#exec called on incompatible receiver');
      }

      return regexpExec$1.call(R, S);
    };

    var fixRegExpWellKnownSymbolLogic$2 = fixRegexpWellKnownSymbolLogic;
    var fails$7 = fails$q;
    var anObject$3 = anObject$g;
    var toLength$5 = toLength$a;
    var toInteger$1 = toInteger$5;
    var requireObjectCoercible$3 = requireObjectCoercible$8;
    var advanceStringIndex$2 = advanceStringIndex$3;
    var getSubstitution = getSubstitution$1;
    var regExpExec$1 = regexpExecAbstract;
    var wellKnownSymbol$7 = wellKnownSymbol$n;

    var REPLACE = wellKnownSymbol$7('replace');
    var max$2 = Math.max;
    var min$2 = Math.min;

    var maybeToString = function (it) {
      return it === undefined ? it : String(it);
    };

    // IE <= 11 replaces $0 with the whole match, as if it was $&
    // https://stackoverflow.com/questions/6024666/getting-ie-to-replace-a-regex-with-the-literal-string-0
    var REPLACE_KEEPS_$0 = (function () {
      // eslint-disable-next-line regexp/prefer-escape-replacement-dollar-char -- required for testing
      return 'a'.replace(/./, '$0') === '$0';
    })();

    // Safari <= 13.0.3(?) substitutes nth capture where n>m with an empty string
    var REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE = (function () {
      if (/./[REPLACE]) {
        return /./[REPLACE]('a', '$0') === '';
      }
      return false;
    })();

    var REPLACE_SUPPORTS_NAMED_GROUPS = !fails$7(function () {
      var re = /./;
      re.exec = function () {
        var result = [];
        result.groups = { a: '7' };
        return result;
      };
      return ''.replace(re, '$<a>') !== '7';
    });

    // @@replace logic
    fixRegExpWellKnownSymbolLogic$2('replace', function (_, nativeReplace, maybeCallNative) {
      var UNSAFE_SUBSTITUTE = REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE ? '$' : '$0';

      return [
        // `String.prototype.replace` method
        // https://tc39.es/ecma262/#sec-string.prototype.replace
        function replace(searchValue, replaceValue) {
          var O = requireObjectCoercible$3(this);
          var replacer = searchValue == undefined ? undefined : searchValue[REPLACE];
          return replacer !== undefined
            ? replacer.call(searchValue, O, replaceValue)
            : nativeReplace.call(String(O), searchValue, replaceValue);
        },
        // `RegExp.prototype[@@replace]` method
        // https://tc39.es/ecma262/#sec-regexp.prototype-@@replace
        function (string, replaceValue) {
          if (
            typeof replaceValue === 'string' &&
            replaceValue.indexOf(UNSAFE_SUBSTITUTE) === -1 &&
            replaceValue.indexOf('$<') === -1
          ) {
            var res = maybeCallNative(nativeReplace, this, string, replaceValue);
            if (res.done) return res.value;
          }

          var rx = anObject$3(this);
          var S = String(string);

          var functionalReplace = typeof replaceValue === 'function';
          if (!functionalReplace) replaceValue = String(replaceValue);

          var global = rx.global;
          if (global) {
            var fullUnicode = rx.unicode;
            rx.lastIndex = 0;
          }
          var results = [];
          while (true) {
            var result = regExpExec$1(rx, S);
            if (result === null) break;

            results.push(result);
            if (!global) break;

            var matchStr = String(result[0]);
            if (matchStr === '') rx.lastIndex = advanceStringIndex$2(S, toLength$5(rx.lastIndex), fullUnicode);
          }

          var accumulatedResult = '';
          var nextSourcePosition = 0;
          for (var i = 0; i < results.length; i++) {
            result = results[i];

            var matched = String(result[0]);
            var position = max$2(min$2(toInteger$1(result.index), S.length), 0);
            var captures = [];
            // NOTE: This is equivalent to
            //   captures = result.slice(1).map(maybeToString)
            // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
            // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
            // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.
            for (var j = 1; j < result.length; j++) captures.push(maybeToString(result[j]));
            var namedCaptures = result.groups;
            if (functionalReplace) {
              var replacerArgs = [matched].concat(captures, position, S);
              if (namedCaptures !== undefined) replacerArgs.push(namedCaptures);
              var replacement = String(replaceValue.apply(undefined, replacerArgs));
            } else {
              replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
            }
            if (position >= nextSourcePosition) {
              accumulatedResult += S.slice(nextSourcePosition, position) + replacement;
              nextSourcePosition = position + matched.length;
            }
          }
          return accumulatedResult + S.slice(nextSourcePosition);
        }
      ];
    }, !REPLACE_SUPPORTS_NAMED_GROUPS || !REPLACE_KEEPS_$0 || REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE);

    var wellKnownSymbol$6 = wellKnownSymbol$n;
    var create$2 = objectCreate;
    var definePropertyModule = objectDefineProperty;

    var UNSCOPABLES = wellKnownSymbol$6('unscopables');
    var ArrayPrototype = Array.prototype;

    // Array.prototype[@@unscopables]
    // https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
    if (ArrayPrototype[UNSCOPABLES] == undefined) {
      definePropertyModule.f(ArrayPrototype, UNSCOPABLES, {
        configurable: true,
        value: create$2(null)
      });
    }

    // add a key to Array.prototype[@@unscopables]
    var addToUnscopables$2 = function (key) {
      ArrayPrototype[UNSCOPABLES][key] = true;
    };

    var $$b = _export;
    var $find = arrayIteration.find;
    var addToUnscopables$1 = addToUnscopables$2;

    var FIND = 'find';
    var SKIPS_HOLES = true;

    // Shouldn't skip holes
    if (FIND in []) Array(1)[FIND](function () { SKIPS_HOLES = false; });

    // `Array.prototype.find` method
    // https://tc39.es/ecma262/#sec-array.prototype.find
    $$b({ target: 'Array', proto: true, forced: SKIPS_HOLES }, {
      find: function find(callbackfn /* , that = undefined */) {
        return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
      }
    });

    // https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
    addToUnscopables$1(FIND);

    var isObject$5 = isObject$g;
    var classof = classofRaw$1;
    var wellKnownSymbol$5 = wellKnownSymbol$n;

    var MATCH$1 = wellKnownSymbol$5('match');

    // `IsRegExp` abstract operation
    // https://tc39.es/ecma262/#sec-isregexp
    var isRegexp = function (it) {
      var isRegExp;
      return isObject$5(it) && ((isRegExp = it[MATCH$1]) !== undefined ? !!isRegExp : classof(it) == 'RegExp');
    };

    var fixRegExpWellKnownSymbolLogic$1 = fixRegexpWellKnownSymbolLogic;
    var isRegExp$1 = isRegexp;
    var anObject$2 = anObject$g;
    var requireObjectCoercible$2 = requireObjectCoercible$8;
    var speciesConstructor = speciesConstructor$2;
    var advanceStringIndex$1 = advanceStringIndex$3;
    var toLength$4 = toLength$a;
    var callRegExpExec = regexpExecAbstract;
    var regexpExec = regexpExec$3;
    var stickyHelpers$1 = regexpStickyHelpers;
    var fails$6 = fails$q;

    var UNSUPPORTED_Y$1 = stickyHelpers$1.UNSUPPORTED_Y;
    var arrayPush = [].push;
    var min$1 = Math.min;
    var MAX_UINT32 = 0xFFFFFFFF;

    // Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
    // Weex JS has frozen built-in prototypes, so use try / catch wrapper
    var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = !fails$6(function () {
      // eslint-disable-next-line regexp/no-empty-group -- required for testing
      var re = /(?:)/;
      var originalExec = re.exec;
      re.exec = function () { return originalExec.apply(this, arguments); };
      var result = 'ab'.split(re);
      return result.length !== 2 || result[0] !== 'a' || result[1] !== 'b';
    });

    // @@split logic
    fixRegExpWellKnownSymbolLogic$1('split', function (SPLIT, nativeSplit, maybeCallNative) {
      var internalSplit;
      if (
        'abbc'.split(/(b)*/)[1] == 'c' ||
        // eslint-disable-next-line regexp/no-empty-group -- required for testing
        'test'.split(/(?:)/, -1).length != 4 ||
        'ab'.split(/(?:ab)*/).length != 2 ||
        '.'.split(/(.?)(.?)/).length != 4 ||
        // eslint-disable-next-line regexp/no-assertion-capturing-group, regexp/no-empty-group -- required for testing
        '.'.split(/()()/).length > 1 ||
        ''.split(/.?/).length
      ) {
        // based on es5-shim implementation, need to rework it
        internalSplit = function (separator, limit) {
          var string = String(requireObjectCoercible$2(this));
          var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
          if (lim === 0) return [];
          if (separator === undefined) return [string];
          // If `separator` is not a regex, use native split
          if (!isRegExp$1(separator)) {
            return nativeSplit.call(string, separator, lim);
          }
          var output = [];
          var flags = (separator.ignoreCase ? 'i' : '') +
                      (separator.multiline ? 'm' : '') +
                      (separator.unicode ? 'u' : '') +
                      (separator.sticky ? 'y' : '');
          var lastLastIndex = 0;
          // Make `global` and avoid `lastIndex` issues by working with a copy
          var separatorCopy = new RegExp(separator.source, flags + 'g');
          var match, lastIndex, lastLength;
          while (match = regexpExec.call(separatorCopy, string)) {
            lastIndex = separatorCopy.lastIndex;
            if (lastIndex > lastLastIndex) {
              output.push(string.slice(lastLastIndex, match.index));
              if (match.length > 1 && match.index < string.length) arrayPush.apply(output, match.slice(1));
              lastLength = match[0].length;
              lastLastIndex = lastIndex;
              if (output.length >= lim) break;
            }
            if (separatorCopy.lastIndex === match.index) separatorCopy.lastIndex++; // Avoid an infinite loop
          }
          if (lastLastIndex === string.length) {
            if (lastLength || !separatorCopy.test('')) output.push('');
          } else output.push(string.slice(lastLastIndex));
          return output.length > lim ? output.slice(0, lim) : output;
        };
      // Chakra, V8
      } else if ('0'.split(undefined, 0).length) {
        internalSplit = function (separator, limit) {
          return separator === undefined && limit === 0 ? [] : nativeSplit.call(this, separator, limit);
        };
      } else internalSplit = nativeSplit;

      return [
        // `String.prototype.split` method
        // https://tc39.es/ecma262/#sec-string.prototype.split
        function split(separator, limit) {
          var O = requireObjectCoercible$2(this);
          var splitter = separator == undefined ? undefined : separator[SPLIT];
          return splitter !== undefined
            ? splitter.call(separator, O, limit)
            : internalSplit.call(String(O), separator, limit);
        },
        // `RegExp.prototype[@@split]` method
        // https://tc39.es/ecma262/#sec-regexp.prototype-@@split
        //
        // NOTE: This cannot be properly polyfilled in engines that don't support
        // the 'y' flag.
        function (string, limit) {
          var res = maybeCallNative(internalSplit, this, string, limit, internalSplit !== nativeSplit);
          if (res.done) return res.value;

          var rx = anObject$2(this);
          var S = String(string);
          var C = speciesConstructor(rx, RegExp);

          var unicodeMatching = rx.unicode;
          var flags = (rx.ignoreCase ? 'i' : '') +
                      (rx.multiline ? 'm' : '') +
                      (rx.unicode ? 'u' : '') +
                      (UNSUPPORTED_Y$1 ? 'g' : 'y');

          // ^(? + rx + ) is needed, in combination with some S slicing, to
          // simulate the 'y' flag.
          var splitter = new C(UNSUPPORTED_Y$1 ? '^(?:' + rx.source + ')' : rx, flags);
          var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
          if (lim === 0) return [];
          if (S.length === 0) return callRegExpExec(splitter, S) === null ? [S] : [];
          var p = 0;
          var q = 0;
          var A = [];
          while (q < S.length) {
            splitter.lastIndex = UNSUPPORTED_Y$1 ? 0 : q;
            var z = callRegExpExec(splitter, UNSUPPORTED_Y$1 ? S.slice(q) : S);
            var e;
            if (
              z === null ||
              (e = min$1(toLength$4(splitter.lastIndex + (UNSUPPORTED_Y$1 ? q : 0)), S.length)) === p
            ) {
              q = advanceStringIndex$1(S, q, unicodeMatching);
            } else {
              A.push(S.slice(p, q));
              if (A.length === lim) return A;
              for (var i = 1; i <= z.length - 1; i++) {
                A.push(z[i]);
                if (A.length === lim) return A;
              }
              q = p = e;
            }
          }
          A.push(S.slice(p));
          return A;
        }
      ];
    }, !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC, UNSUPPORTED_Y$1);

    var isObject$4 = isObject$g;
    var setPrototypeOf$1 = objectSetPrototypeOf;

    // makes subclassing work correct for wrapped built-ins
    var inheritIfRequired$2 = function ($this, dummy, Wrapper) {
      var NewTarget, NewTargetPrototype;
      if (
        // it can work only with native `setPrototypeOf`
        setPrototypeOf$1 &&
        // we haven't completely correct pre-ES6 way for getting `new.target`, so use this
        typeof (NewTarget = dummy.constructor) == 'function' &&
        NewTarget !== Wrapper &&
        isObject$4(NewTargetPrototype = NewTarget.prototype) &&
        NewTargetPrototype !== Wrapper.prototype
      ) setPrototypeOf$1($this, NewTargetPrototype);
      return $this;
    };

    var DESCRIPTORS$3 = descriptors;
    var global$4 = global$o;
    var isForced$1 = isForced_1;
    var inheritIfRequired$1 = inheritIfRequired$2;
    var createNonEnumerableProperty$3 = createNonEnumerableProperty$b;
    var defineProperty$4 = objectDefineProperty.f;
    var getOwnPropertyNames = objectGetOwnPropertyNames.f;
    var isRegExp = isRegexp;
    var getFlags = regexpFlags$1;
    var stickyHelpers = regexpStickyHelpers;
    var redefine$2 = redefine$a.exports;
    var fails$5 = fails$q;
    var has$4 = has$e;
    var enforceInternalState = internalState.enforce;
    var setSpecies$1 = setSpecies$3;
    var wellKnownSymbol$4 = wellKnownSymbol$n;
    var UNSUPPORTED_DOT_ALL = regexpUnsupportedDotAll;
    var UNSUPPORTED_NCG = regexpUnsupportedNcg;

    var MATCH = wellKnownSymbol$4('match');
    var NativeRegExp = global$4.RegExp;
    var RegExpPrototype = NativeRegExp.prototype;
    // TODO: Use only propper RegExpIdentifierName
    var IS_NCG = /^\?<[^\s\d!#%&*+<=>@^][^\s!#%&*+<=>@^]*>/;
    var re1 = /a/g;
    var re2 = /a/g;

    // "new" should create a new object, old webkit bug
    var CORRECT_NEW = new NativeRegExp(re1) !== re1;

    var UNSUPPORTED_Y = stickyHelpers.UNSUPPORTED_Y;

    var BASE_FORCED = DESCRIPTORS$3 &&
      (!CORRECT_NEW || UNSUPPORTED_Y || UNSUPPORTED_DOT_ALL || UNSUPPORTED_NCG || fails$5(function () {
        re2[MATCH] = false;
        // RegExp constructor can alter flags and IsRegExp works correct with @@match
        return NativeRegExp(re1) != re1 || NativeRegExp(re2) == re2 || NativeRegExp(re1, 'i') != '/a/i';
      }));

    var handleDotAll = function (string) {
      var length = string.length;
      var index = 0;
      var result = '';
      var brackets = false;
      var chr;
      for (; index <= length; index++) {
        chr = string.charAt(index);
        if (chr === '\\') {
          result += chr + string.charAt(++index);
          continue;
        }
        if (!brackets && chr === '.') {
          result += '[\\s\\S]';
        } else {
          if (chr === '[') {
            brackets = true;
          } else if (chr === ']') {
            brackets = false;
          } result += chr;
        }
      } return result;
    };

    var handleNCG = function (string) {
      var length = string.length;
      var index = 0;
      var result = '';
      var named = [];
      var names = {};
      var brackets = false;
      var ncg = false;
      var groupid = 0;
      var groupname = '';
      var chr;
      for (; index <= length; index++) {
        chr = string.charAt(index);
        if (chr === '\\') {
          chr = chr + string.charAt(++index);
        } else if (chr === ']') {
          brackets = false;
        } else if (!brackets) switch (true) {
          case chr === '[':
            brackets = true;
            break;
          case chr === '(':
            if (IS_NCG.test(string.slice(index + 1))) {
              index += 2;
              ncg = true;
            }
            result += chr;
            groupid++;
            continue;
          case chr === '>' && ncg:
            if (groupname === '' || has$4(names, groupname)) {
              throw new SyntaxError('Invalid capture group name');
            }
            names[groupname] = true;
            named.push([groupname, groupid]);
            ncg = false;
            groupname = '';
            continue;
        }
        if (ncg) groupname += chr;
        else result += chr;
      } return [result, named];
    };

    // `RegExp` constructor
    // https://tc39.es/ecma262/#sec-regexp-constructor
    if (isForced$1('RegExp', BASE_FORCED)) {
      var RegExpWrapper = function RegExp(pattern, flags) {
        var thisIsRegExp = this instanceof RegExpWrapper;
        var patternIsRegExp = isRegExp(pattern);
        var flagsAreUndefined = flags === undefined;
        var groups = [];
        var rawPattern = pattern;
        var rawFlags, dotAll, sticky, handled, result, state;

        if (!thisIsRegExp && patternIsRegExp && flagsAreUndefined && pattern.constructor === RegExpWrapper) {
          return pattern;
        }

        if (patternIsRegExp || pattern instanceof RegExpWrapper) {
          pattern = pattern.source;
          if (flagsAreUndefined) flags = 'flags' in rawPattern ? rawPattern.flags : getFlags.call(rawPattern);
        }

        pattern = pattern === undefined ? '' : String(pattern);
        flags = flags === undefined ? '' : String(flags);
        rawPattern = pattern;

        if (UNSUPPORTED_DOT_ALL && 'dotAll' in re1) {
          dotAll = !!flags && flags.indexOf('s') > -1;
          if (dotAll) flags = flags.replace(/s/g, '');
        }

        rawFlags = flags;

        if (UNSUPPORTED_Y && 'sticky' in re1) {
          sticky = !!flags && flags.indexOf('y') > -1;
          if (sticky) flags = flags.replace(/y/g, '');
        }

        if (UNSUPPORTED_NCG) {
          handled = handleNCG(pattern);
          pattern = handled[0];
          groups = handled[1];
        }

        result = inheritIfRequired$1(NativeRegExp(pattern, flags), thisIsRegExp ? this : RegExpPrototype, RegExpWrapper);

        if (dotAll || sticky || groups.length) {
          state = enforceInternalState(result);
          if (dotAll) {
            state.dotAll = true;
            state.raw = RegExpWrapper(handleDotAll(pattern), rawFlags);
          }
          if (sticky) state.sticky = true;
          if (groups.length) state.groups = groups;
        }

        if (pattern !== rawPattern) try {
          // fails in old engines, but we have no alternatives for unsupported regex syntax
          createNonEnumerableProperty$3(result, 'source', rawPattern === '' ? '(?:)' : rawPattern);
        } catch (error) { /* empty */ }

        return result;
      };

      var proxy = function (key) {
        key in RegExpWrapper || defineProperty$4(RegExpWrapper, key, {
          configurable: true,
          get: function () { return NativeRegExp[key]; },
          set: function (it) { NativeRegExp[key] = it; }
        });
      };

      for (var keys = getOwnPropertyNames(NativeRegExp), index = 0; keys.length > index;) {
        proxy(keys[index++]);
      }

      RegExpPrototype.constructor = RegExpWrapper;
      RegExpWrapper.prototype = RegExpPrototype;
      redefine$2(global$4, 'RegExp', RegExpWrapper);
    }

    // https://tc39.es/ecma262/#sec-get-regexp-@@species
    setSpecies$1('RegExp');

    var $$a = _export;
    var toAbsoluteIndex$1 = toAbsoluteIndex$3;
    var toInteger = toInteger$5;
    var toLength$3 = toLength$a;
    var toObject$2 = toObject$9;
    var arraySpeciesCreate = arraySpeciesCreate$3;
    var createProperty$2 = createProperty$5;
    var arrayMethodHasSpeciesSupport$2 = arrayMethodHasSpeciesSupport$5;

    var HAS_SPECIES_SUPPORT$2 = arrayMethodHasSpeciesSupport$2('splice');

    var max$1 = Math.max;
    var min = Math.min;
    var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF;
    var MAXIMUM_ALLOWED_LENGTH_EXCEEDED = 'Maximum allowed length exceeded';

    // `Array.prototype.splice` method
    // https://tc39.es/ecma262/#sec-array.prototype.splice
    // with adding support of @@species
    $$a({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT$2 }, {
      splice: function splice(start, deleteCount /* , ...items */) {
        var O = toObject$2(this);
        var len = toLength$3(O.length);
        var actualStart = toAbsoluteIndex$1(start, len);
        var argumentsLength = arguments.length;
        var insertCount, actualDeleteCount, A, k, from, to;
        if (argumentsLength === 0) {
          insertCount = actualDeleteCount = 0;
        } else if (argumentsLength === 1) {
          insertCount = 0;
          actualDeleteCount = len - actualStart;
        } else {
          insertCount = argumentsLength - 2;
          actualDeleteCount = min(max$1(toInteger(deleteCount), 0), len - actualStart);
        }
        if (len + insertCount - actualDeleteCount > MAX_SAFE_INTEGER) {
          throw TypeError(MAXIMUM_ALLOWED_LENGTH_EXCEEDED);
        }
        A = arraySpeciesCreate(O, actualDeleteCount);
        for (k = 0; k < actualDeleteCount; k++) {
          from = actualStart + k;
          if (from in O) createProperty$2(A, k, O[from]);
        }
        A.length = actualDeleteCount;
        if (insertCount < actualDeleteCount) {
          for (k = actualStart; k < len - actualDeleteCount; k++) {
            from = k + actualDeleteCount;
            to = k + insertCount;
            if (from in O) O[to] = O[from];
            else delete O[to];
          }
          for (k = len; k > len - actualDeleteCount + insertCount; k--) delete O[k - 1];
        } else if (insertCount > actualDeleteCount) {
          for (k = len - actualDeleteCount; k > actualStart; k--) {
            from = k + actualDeleteCount - 1;
            to = k + insertCount - 1;
            if (from in O) O[to] = O[from];
            else delete O[to];
          }
        }
        for (k = 0; k < insertCount; k++) {
          O[k + actualStart] = arguments[k + 2];
        }
        O.length = len - actualDeleteCount + insertCount;
        return A;
      }
    });

    var requireObjectCoercible$1 = requireObjectCoercible$8;

    var quot = /"/g;

    // `CreateHTML` abstract operation
    // https://tc39.es/ecma262/#sec-createhtml
    var createHtml = function (string, tag, attribute, value) {
      var S = String(requireObjectCoercible$1(string));
      var p1 = '<' + tag;
      if (attribute !== '') p1 += ' ' + attribute + '="' + String(value).replace(quot, '&quot;') + '"';
      return p1 + '>' + S + '</' + tag + '>';
    };

    var fails$4 = fails$q;

    // check the existence of a method, lowercase
    // of a tag and escaping quotes in arguments
    var stringHtmlForced = function (METHOD_NAME) {
      return fails$4(function () {
        var test = ''[METHOD_NAME]('"');
        return test !== test.toLowerCase() || test.split('"').length > 3;
      });
    };

    var $$9 = _export;
    var createHTML$1 = createHtml;
    var forcedStringHTMLMethod$1 = stringHtmlForced;

    // `String.prototype.fixed` method
    // https://tc39.es/ecma262/#sec-string.prototype.fixed
    $$9({ target: 'String', proto: true, forced: forcedStringHTMLMethod$1('fixed') }, {
      fixed: function fixed() {
        return createHTML$1(this, 'tt', '', '');
      }
    });

    var $$8 = _export;
    var isObject$3 = isObject$g;
    var isArray = isArray$4;
    var toAbsoluteIndex = toAbsoluteIndex$3;
    var toLength$2 = toLength$a;
    var toIndexedObject$1 = toIndexedObject$a;
    var createProperty$1 = createProperty$5;
    var wellKnownSymbol$3 = wellKnownSymbol$n;
    var arrayMethodHasSpeciesSupport$1 = arrayMethodHasSpeciesSupport$5;

    var HAS_SPECIES_SUPPORT$1 = arrayMethodHasSpeciesSupport$1('slice');

    var SPECIES = wellKnownSymbol$3('species');
    var nativeSlice = [].slice;
    var max = Math.max;

    // `Array.prototype.slice` method
    // https://tc39.es/ecma262/#sec-array.prototype.slice
    // fallback for not array-like ES3 strings and DOM objects
    $$8({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT$1 }, {
      slice: function slice(start, end) {
        var O = toIndexedObject$1(this);
        var length = toLength$2(O.length);
        var k = toAbsoluteIndex(start, length);
        var fin = toAbsoluteIndex(end === undefined ? length : end, length);
        // inline `ArraySpeciesCreate` for usage native `Array#slice` where it's possible
        var Constructor, result, n;
        if (isArray(O)) {
          Constructor = O.constructor;
          // cross-realm fallback
          if (typeof Constructor == 'function' && (Constructor === Array || isArray(Constructor.prototype))) {
            Constructor = undefined;
          } else if (isObject$3(Constructor)) {
            Constructor = Constructor[SPECIES];
            if (Constructor === null) Constructor = undefined;
          }
          if (Constructor === Array || Constructor === undefined) {
            return nativeSlice.call(O, k, fin);
          }
        }
        result = new (Constructor === undefined ? Array : Constructor)(max(fin - k, 0));
        for (n = 0; k < fin; k++, n++) if (k in O) createProperty$1(result, n, O[k]);
        result.length = n;
        return result;
      }
    });

    var DESCRIPTORS$2 = descriptors;
    var defineProperty$3 = objectDefineProperty.f;

    var FunctionPrototype = Function.prototype;
    var FunctionPrototypeToString = FunctionPrototype.toString;
    var nameRE = /^\s*function ([^ (]*)/;
    var NAME = 'name';

    // Function instances `.name` property
    // https://tc39.es/ecma262/#sec-function-instances-name
    if (DESCRIPTORS$2 && !(NAME in FunctionPrototype)) {
      defineProperty$3(FunctionPrototype, NAME, {
        configurable: true,
        get: function () {
          try {
            return FunctionPrototypeToString.call(this).match(nameRE)[1];
          } catch (error) {
            return '';
          }
        }
      });
    }

    var fixRegExpWellKnownSymbolLogic = fixRegexpWellKnownSymbolLogic;
    var anObject$1 = anObject$g;
    var toLength$1 = toLength$a;
    var requireObjectCoercible = requireObjectCoercible$8;
    var advanceStringIndex = advanceStringIndex$3;
    var regExpExec = regexpExecAbstract;

    // @@match logic
    fixRegExpWellKnownSymbolLogic('match', function (MATCH, nativeMatch, maybeCallNative) {
      return [
        // `String.prototype.match` method
        // https://tc39.es/ecma262/#sec-string.prototype.match
        function match(regexp) {
          var O = requireObjectCoercible(this);
          var matcher = regexp == undefined ? undefined : regexp[MATCH];
          return matcher !== undefined ? matcher.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
        },
        // `RegExp.prototype[@@match]` method
        // https://tc39.es/ecma262/#sec-regexp.prototype-@@match
        function (string) {
          var res = maybeCallNative(nativeMatch, this, string);
          if (res.done) return res.value;

          var rx = anObject$1(this);
          var S = String(string);

          if (!rx.global) return regExpExec(rx, S);

          var fullUnicode = rx.unicode;
          rx.lastIndex = 0;
          var A = [];
          var n = 0;
          var result;
          while ((result = regExpExec(rx, S)) !== null) {
            var matchStr = String(result[0]);
            A[n] = matchStr;
            if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength$1(rx.lastIndex), fullUnicode);
            n++;
          }
          return n === 0 ? null : A;
        }
      ];
    });

    var artDialog = {exports: {}};

    (function (module, exports) {
      (function (global, factory) {
        module.exports = factory() ;
      })(commonjsGlobal, function () {

        var $ = function $(selector, context) {
          return new $.fn.init(selector, context);
        },
            readyBound = false,
            readyList = [],
            _DOMContentLoaded2,
            isOpacity = ('opacity' in document.documentElement.style),
            quickExpr = /^(?:[^<]*(<[\w\W]+>)[^>]*$|#([\w\-]+)$)/,
            rclass = /[\n\t]/g,
            ralpha = /alpha\([^)]*\)/i,
            ropacity = /opacity=([^)]*)/,
            rfxnum = /^([+-]=)?([\d+-.]+)(.*)$/;

        $.trim = function (str) {
          return str.replace(/(^\s+|\s+$)/g, '');
        };

        $.fn = $.prototype = {
          constructor: $,

          /**
           * DOM 就绪
           * @param	{Function}	回调函数
           */
          ready: function ready(callback) {
            $.bindReady();

            if ($.isReady) {
              callback.call(document, $);
            } else if (readyList) {
              readyList.push(callback);
            }
            return this;
          },

          /**
           * 判断样式类是否存在
           * @param	{String}	名称
           * @return	{Boolean}
           */
          hasClass: function hasClass(name) {
            var className = ' ' + name + ' ';
            if ((' ' + this[0].className + ' ').replace(rclass, ' ').indexOf(className) > -1) return true;
            return false;
          },

          /**
           * 添加样式类
           * @param	{String}	名称
           */
          addClass: function addClass(name) {
            if (!this.hasClass(name)) {
              this[0].className = $.trim(this[0].className) + ' ' + $.trim(name);
            }

            return this;
          },

          /**
           * 移除样式类
           * @param	{String}	名称
           */
          removeClass: function removeClass(name) {
            var elem = this[0];

            if (!name) {
              elem.className = '';
            } else if (this.hasClass(name)) {
              elem.className = elem.className.replace(name, ' ');
            }
            return this;
          },

          /**
           * 读写样式<br />
           * css(name) 访问第一个匹配元素的样式属性<br />
           * css(properties) 把一个"名/值对"对象设置为所有匹配元素的样式属性<br />
           * css(name, value) 在所有匹配的元素中，设置一个样式属性的值<br />
           */
          css: function css(name, value) {
            var i,
                elem = this[0],
                obj = arguments[0];

            if (typeof name === 'string') {
              if (value === undefined) {
                return $.css(elem, name);
              } else {
                name === 'opacity' ? $.opacity.set(elem, value) : elem.style[name] = value;
              }
            } else {
              for (i in obj) {
                i === 'opacity' ? $.opacity.set(elem, obj[i]) : elem.style[i] = obj[i];
              }
            }
            return this;
          },

          /** 显示元素 */
          show: function show() {
            return this.css('display', 'block');
          },

          /** 隐藏元素 */
          hide: function hide() {
            return this.css('display', 'none');
          },

          /**
           * 获取相对文档的坐标
           * @return	{Object}	返回left、top的数值
           */
          offset: function offset() {
            var elem = this[0],
                box = elem.getBoundingClientRect(),
                doc = elem.ownerDocument,
                body = doc.body,
                docElem = doc.documentElement,
                clientTop = docElem.clientTop || body.clientTop || 0,
                clientLeft = docElem.clientLeft || body.clientLeft || 0,
                top = box.top + (self.pageYOffset || docElem.scrollTop) - clientTop,
                left = box.left + (self.pageXOffset || docElem.scrollLeft) - clientLeft;
            return {
              left: left,
              top: top
            };
          },

          /**
           * 读写HTML - (不支持文本框)
           * @param	{String}	内容
           */
          html: function html(content) {
            var elem = this[0];
            if (content === undefined) return elem.innerHTML;
            $.cleanData(elem.getElementsByTagName('*'));
            elem.innerHTML = content;
            return this;
          },

          /**
           * 移除节点
           */
          remove: function remove() {
            var elem = this[0];
            $.cleanData(elem.getElementsByTagName('*'));
            $.cleanData([elem]);
            elem.parentNode.removeChild(elem);
            return this;
          },

          /**
           * 事件绑定
           * @param	{String}	类型
           * @param	{Function}	要绑定的函数
           */
          bind: function bind(type, callback) {
            $.event.add(this[0], type, callback);
            return this;
          },

          /**
           * 移除事件
           * @param	{String}	类型
           * @param	{Function}	要卸载的函数
           */
          unbind: function unbind(type, callback) {
            $.event.remove(this[0], type, callback);
            return this;
          }
        };

        $.fn.init = function (selector, context) {
          var match, elem;
          context = context || document;
          if (!selector) return this;

          if (selector.nodeType) {
            this[0] = selector;
            return this;
          }

          if (selector === 'body' && context.body) {
            this[0] = context.body;
            return this;
          }

          if (selector === 'head' || selector === 'html') {
            this[0] = context.getElementsByTagName(selector)[0];
            return this;
          }

          if (typeof selector === 'string') {
            match = quickExpr.exec(selector);

            if (match && match[2]) {
              elem = context.getElementById(match[2]);
              if (elem && elem.parentNode) this[0] = elem;
              return this;
            }
          }
          if (typeof selector === 'function') return $(document).ready(selector);
          this[0] = selector;
          return this;
        };

        $.fn.init.prototype = $.fn;
        /** 空函数 */

        $.noop = function () {};
        /** 检测window */


        $.isWindow = function (obj) {
          return obj && _typeof(obj) === 'object' && 'setInterval' in obj;
        };
        /** 数组判定 */


        $.isArray = function (obj) {
          return Object.prototype.toString.call(obj) === '[object Array]';
        };
        /**
         * 搜索子元素
         * 注意：只支持nodeName或.className的形式，并且只返回第一个元素
         * @param	{String}
         */


        $.fn.find = function (expr) {
          var value,
              elem = this[0],
              className = expr.split('.')[1];

          if (className) {
            if (document.getElementsByClassName) {
              value = elem.getElementsByClassName(className);
            } else {
              value = getElementsByClassName(className, elem);
            }
          } else {
            value = elem.getElementsByTagName(expr);
          }
          return $(value[0]);
        };

        function getElementsByClassName(className, node, tag) {
          node = node || document;
          tag = tag || '*';
          var i = 0,
              j = 0,
              classElements = [],
              els = node.getElementsByTagName(tag),
              elsLen = els.length,
              pattern = new RegExp("(^|\\s)" + className + "(\\s|$)");

          for (; i < elsLen; i++) {
            if (pattern.test(els[i].className)) {
              classElements[j] = els[i];
              j++;
            }
          }
          return classElements;
        }
        /**
         * 遍历
         * @param {Object}
         * @param {Function}
         */

        $.each = function (obj, callback) {
          var name,
              i = 0,
              length = obj.length,
              isObj = length === undefined;

          if (isObj) {
            for (name in obj) {
              if (callback.call(obj[name], name, obj[name]) === false) break;
            }
          } else {
            for (var value = obj[0]; i < length && callback.call(value, i, value) !== false; value = obj[++i]) {}
          }
          return obj;
        };
        /**
         * 读写缓存
         * @param		{HTMLElement}	元素
         * @param		{String}		缓存名称
         * @param		{Any}			数据
         * @return		{Any}			如果无参数data则返回缓存数据
         */


        $.data = function (elem, name, data) {
          var cache = $.cache,
              id = uuid(elem);
          if (name === undefined) return cache[id];
          if (!cache[id]) cache[id] = {};
          if (data !== undefined) cache[id][name] = data;
          return cache[id][name];
        };
        /**
         * 删除缓存
         * @param		{HTMLElement}	元素
         * @param		{String}		缓存名称
         */


        $.removeData = function (elem, name) {
          var empty = true,
              expando = $.expando,
              cache = $.cache,
              id = uuid(elem),
              thisCache = id && cache[id];
          if (!thisCache) return;

          if (name) {
            delete thisCache[name];

            for (var n in thisCache) {
              empty = false;
            }

            if (empty) delete $.cache[id];
          } else {
            delete cache[id];

            if (elem.removeAttribute) {
              elem.removeAttribute(expando);
            } else {
              elem[expando] = null;
            }
          }
        };

        $.uuid = 0;
        $.cache = {};
        $.expando = '@cache' + +new Date(); // 标记元素唯一身份

        function uuid(elem) {
          var expando = $.expando,
              id = elem === window ? 0 : elem[expando];
          if (id === undefined) elem[expando] = id = ++$.uuid;
          return id;
        }
        /**
         * 事件机制
         * @namespace
         * @requires	[$.data, $.removeData]
         */

        $.event = {
          /**
           * 添加事件
           * @param		{HTMLElement}	元素
           * @param		{String}		事件类型
           * @param		{Function}		要添加的函数
           */
          add: function add(elem, type, callback) {
            var cache,
                listeners,
                that = $.event,
                data = $.data(elem, '@events') || $.data(elem, '@events', {});
            cache = data[type] = data[type] || {};
            listeners = cache.listeners = cache.listeners || [];
            listeners.push(callback);

            if (!cache.handler) {
              cache.elem = elem;
              cache.handler = that.handler(cache);
              elem.addEventListener ? elem.addEventListener(type, cache.handler, false) : elem.attachEvent('on' + type, cache.handler);
            }
          },

          /**
           * 卸载事件
           * @param		{HTMLElement}	元素
           * @param		{String}		事件类型
           * @param		{Function}		要卸载的函数
           */
          remove: function remove(elem, type, callback) {
            var i,
                cache,
                listeners,
                that = $.event,
                empty = true,
                data = $.data(elem, '@events');
            if (!data) return;

            if (!type) {
              for (i in data) {
                that.remove(elem, i);
              }

              return;
            }
            cache = data[type];
            if (!cache) return;
            listeners = cache.listeners;

            if (callback) {
              for (i = 0; i < listeners.length; i++) {
                listeners[i] === callback && listeners.splice(i--, 1);
              }
            } else {
              cache.listeners = [];
            }

            if (cache.listeners.length === 0) {
              elem.removeEventListener ? elem.removeEventListener(type, cache.handler, false) : elem.detachEvent('on' + type, cache.handler);
              delete data[type];
              cache = $.data(elem, '@events');

              for (var n in cache) {
                empty = false;
              }

              if (empty) $.removeData(elem, '@events');
            }
          },

          /** @inner 事件句柄 */
          handler: function handler(cache) {
            return function (event) {
              event = $.event.fix(event || window.event);

              for (var i = 0, list = cache.listeners, fn; fn = list[i++];) {
                if (fn.call(cache.elem, event) === false) {
                  event.preventDefault();
                  event.stopPropagation();
                }
              }
            };
          },

          /** @inner Event对象兼容处理 */
          fix: function fix(event) {
            if (event.target) return event;
            var event2 = {
              target: event.srcElement || document,
              preventDefault: function preventDefault() {
                event.returnValue = false;
              },
              stopPropagation: function stopPropagation() {
                event.cancelBubble = true;
              }
            }; // IE6/7/8 在原生window.event对象写入数据会导致内存无法回收，应当采用拷贝

            for (var i in event) {
              event2[i] = event[i];
            }

            return event2;
          }
        };
        /**
         * 清理元素集的事件与缓存
         * @requires	[$.removeData, $.event]
         * @param		{HTMLCollection}	元素集
         */

        $.cleanData = function (elems) {
          var i = 0,
              elem,
              len = elems.length,
              removeEvent = $.event.remove,
              removeData = $.removeData;

          for (; i < len; i++) {
            elem = elems[i];
            removeEvent(elem);
            removeData(elem);
          }
        }; // DOM就绪事件


        $.isReady = false;

        $.ready = function () {
          if (!$.isReady) {
            if (!document.body) return setTimeout($.ready, 13);
            $.isReady = true;

            if (readyList) {
              var fn,
                  i = 0;

              while (fn = readyList[i++]) {
                fn.call(document, $);
              }
              readyList = null;
            }
          }
        };

        $.bindReady = function () {
          if (readyBound) return;
          readyBound = true;

          if (document.readyState === 'complete') {
            return $.ready();
          }

          if (document.addEventListener) {
            document.addEventListener('DOMContentLoaded', _DOMContentLoaded2, false);
            window.addEventListener('load', $.ready, false);
          } else if (document.attachEvent) {
            document.attachEvent('onreadystatechange', _DOMContentLoaded2);
            window.attachEvent('onload', $.ready);
            var toplevel = false;

            try {
              toplevel = window.frameElement == null;
            } catch (e) {}

            if (document.documentElement.doScroll && toplevel) {
              doScrollCheck();
            }
          }
        };

        if (document.addEventListener) {
          _DOMContentLoaded2 = function DOMContentLoaded() {
            document.removeEventListener('DOMContentLoaded', _DOMContentLoaded2, false);
            $.ready();
          };
        } else if (document.attachEvent) {
          _DOMContentLoaded2 = function _DOMContentLoaded() {
            if (document.readyState === 'complete') {
              document.detachEvent('onreadystatechange', _DOMContentLoaded2);
              $.ready();
            }
          };
        }

        function doScrollCheck() {
          if ($.isReady) return;

          try {
            document.documentElement.doScroll('left');
          } catch (e) {
            setTimeout(doScrollCheck, 1);
            return;
          }
          $.ready();
        }

        $.css = 'defaultView' in document && 'getComputedStyle' in document.defaultView ? function (elem, name) {
          return document.defaultView.getComputedStyle(elem, false)[name];
        } : function (elem, name) {
          var ret = name === 'opacity' ? $.opacity.get(elem) : elem.currentStyle[name];
          return ret || '';
        }; // 跨浏览器处理opacity

        $.opacity = {
          get: function get(elem) {
            return isOpacity ? document.defaultView.getComputedStyle(elem, false).opacity : ropacity.test((elem.currentStyle ? elem.currentStyle.filter : elem.style.filter) || '') ? parseFloat(RegExp.$1) / 100 + '' : 1;
          },
          set: function set(elem, value) {
            if (isOpacity) return elem.style.opacity = value;
            var style = elem.style;
            style.zoom = 1;
            var opacity = 'alpha(opacity=' + value * 100 + ')',
                filter = style.filter || '';
            style.filter = ralpha.test(filter) ? filter.replace(ralpha, opacity) : style.filter + ' ' + opacity;
          }
        };
        /**
         * 获取滚动条位置 - [不支持写入]
         * $.fn.scrollLeft, $.fn.scrollTop
         * @example		获取文档垂直滚动条：$(document).scrollTop()
         * @return		{Number}	返回滚动条位置
         */

        $.each(['Left', 'Top'], function (i, name) {
          var method = 'scroll' + name;

          $.fn[method] = function () {
            var elem = this[0],
                win;
            win = getWindow(elem);
            return win ? 'pageXOffset' in win ? win[i ? 'pageYOffset' : 'pageXOffset'] : win.document.documentElement[method] || win.document.body[method] : elem[method];
          };
        });

        function getWindow(elem) {
          return $.isWindow(elem) ? elem : elem.nodeType === 9 ? elem.defaultView || elem.parentWindow : false;
        }
        /**
         * 获取窗口或文档尺寸 - [只支持window与document读取]
         * @example
         获取文档宽度：$(document).width()
         获取可视范围：$(window).width()
         * @return	{Number}
         */

        $.each(['Height', 'Width'], function (i, name) {
          var type = name.toLowerCase();

          $.fn[type] = function (size) {
            var elem = this[0];

            if (!elem) {
              return size == null ? null : this;
            }
            return $.isWindow(elem) ? elem.document.documentElement['client' + name] || elem.document.body['client' + name] : elem.nodeType === 9 ? Math.max(elem.documentElement['client' + name], elem.body['scroll' + name], elem.documentElement['scroll' + name], elem.body['offset' + name], elem.documentElement['offset' + name]) : null;
          };
        });
        /**
         * 简单ajax支持
         * @example
         * $.ajax({
         * 		url: url,
         * 		success: callback,
         * 		cache: cache
         * });
         */

        $.ajax = function (config) {
          var ajax = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP'),
              url = config.url;

          if (config.cache === false) {
            var ts = +new Date(),
                ret = url.replace(/([?&])_=[^&]*/, "$1_=" + ts);
            url = ret + (ret === url ? (/\?/.test(url) ? "&" : "?") + "_=" + ts : "");
          }

          ajax.onreadystatechange = function () {
            if (ajax.readyState === 4 && ajax.status === 200) {
              config.success && config.success(ajax.responseText);
              ajax.onreadystatechange = $.noop;
            }
          };

          ajax.open('GET', url, 1);
          ajax.send(null);
        };
        /** 动画引擎 - [不支持链式列队操作] */


        $.fn.animate = function (prop, speed, easing, _callback) {
          speed = speed || 400;
          if (typeof easing === 'function') _callback = easing;
          easing = easing && $.easing[easing] ? easing : 'swing';
          var elem = this[0],
              overflow,
              fx,
              parts,
              start,
              end,
              unit,
              opt = {
            speed: speed,
            easing: easing,
            callback: function callback() {
              if (overflow != null) elem.style.overflow = '';
              _callback && _callback();
            }
          };
          opt.curAnim = {};
          $.each(prop, function (name, val) {
            opt.curAnim[name] = val;
          });
          $.each(prop, function (name, val) {
            fx = new $.fx(elem, opt, name);
            parts = rfxnum.exec(val);
            start = parseFloat(name === 'opacity' || elem.style && elem.style[name] != null ? $.css(elem, name) : elem[name]);
            end = parseFloat(parts[2]);
            unit = parts[3];

            if (name === 'height' || name === 'width') {
              end = Math.max(0, end);
              overflow = [elem.style.overflow, elem.style.overflowX, elem.style.overflowY];
            }
            fx.custom(start, end, unit);
          });
          if (overflow != null) elem.style.overflow = 'hidden';
          return this;
        };

        $.timers = [];

        $.fx = function (elem, options, prop) {
          this.elem = elem;
          this.options = options;
          this.prop = prop;
        };

        $.fx.prototype = {
          custom: function custom(from, to, unit) {
            var that = this;
            that.startTime = $.fx.now();
            that.start = from;
            that.end = to;
            that.unit = unit;
            that.now = that.start;
            that.state = that.pos = 0;

            function t() {
              return that.step();
            }
            t.elem = that.elem;
            t();
            $.timers.push(t);
            if (!$.timerId) $.timerId = setInterval($.fx.tick, 13);
          },
          step: function step() {
            var that = this,
                t = $.fx.now(),
                done = true;

            if (t >= that.options.speed + that.startTime) {
              that.now = that.end;
              that.state = that.pos = 1;
              that.update();
              that.options.curAnim[that.prop] = true;

              for (var i in that.options.curAnim) {
                if (that.options.curAnim[i] !== true) {
                  done = false;
                }
              }
              if (done) that.options.callback.call(that.elem);
              return false;
            } else {
              var n = t - that.startTime;
              that.state = n / that.options.speed;
              that.pos = $.easing[that.options.easing](that.state, n, 0, 1, that.options.speed);
              that.now = that.start + (that.end - that.start) * that.pos;
              that.update();
              return true;
            }
          },
          update: function update() {
            var that = this;

            if (that.prop === 'opacity') {
              $.opacity.set(that.elem, that.now);
            } else if (that.elem.style && that.elem.style[that.prop] != null) {
              that.elem.style[that.prop] = that.now + that.unit;
            } else {
              that.elem[that.prop] = that.now;
            }
          }
        };

        $.fx.now = function () {
          return +new Date();
        };

        $.easing = {
          linear: function linear(p, n, firstNum, diff) {
            return firstNum + diff * p;
          },
          swing: function swing(p, n, firstNum, diff) {
            return (-Math.cos(p * Math.PI) / 2 + 0.5) * diff + firstNum;
          }
        };

        $.fx.tick = function () {
          var timers = $.timers;

          for (var i = 0; i < timers.length; i++) {
            !timers[i]() && timers.splice(i--, 1);
          }
          !timers.length && $.fx.stop();
        };

        $.fx.stop = function () {
          clearInterval($.timerId);
          $.timerId = null;
        };

        $.fn.stop = function () {
          var timers = $.timers;

          for (var i = timers.length - 1; i >= 0; i--) {
            if (timers[i].elem === this[0]) timers.splice(i, 1);
          }
          return this;
        }; //-------------end
        //------------------------------------------------
        // 对话框模块
        //------------------------------------------------


        $.noop = $.noop || function () {}; // jQuery 1.3.2


        var _box,
            _thisScript,
            _skin,
            _path,
            _count = 0,
            _$window = $(window),
            _$document = $(document),
            _$html = $('html'),
            _elem = document.documentElement,
            _isIE6 = window.VBArray && !window.XMLHttpRequest,
            _isMobile = 'createTouch' in document && !('onmousemove' in _elem) || /(iPhone|iPad|iPod)/i.test(navigator.userAgent),
            _expando = 'artDialog' + +new Date();

        var __loaded_skins__ = {};

        var preloadedSkins = function preloadedSkins() {
          var links = document.getElementsByTagName('link');
          var uri;
          var key;

          for (var i = 0; i < links.length; i++) {
            uri = links[i].href;
            uri && (key = uri.replace(/\?.*$/, ''));
            __loaded_skins__[key] = true;
          }
        };

        $(document).ready(preloadedSkins);

        var loadSkin = function loadSkin(skin) {
          if (skin) {
            var key = /\.s?css(?:\?|$)/.test(skin) ? skin : _path + '/skins/' + skin + '.css';
            key = key.replace(/\?.*$/, '');

            if (!(key in __loaded_skins__)) {
              var uri = key + '?' + artDialog.fn.version;
              var link = document.createElement('link');
              link.rel = 'stylesheet';
              link.href = uri;

              _thisScript.parentNode.insertBefore(link, _thisScript);
            }
          }
        };

        var artDialog = function artDialog(config, ok, cancel) {
          config = config || {};

          if (typeof config === 'string' || config.nodeType === 1) {
            config = {
              content: config,
              fixed: !_isMobile
            };
          }
          var api,
              defaults = artDialog.defaults,
              elem = config.follow = this && this.nodeType === 1 && this || config.follow; // 合并默认配置

          for (var i in defaults) {
            if (config[i] === undefined) config[i] = defaults[i];
          }

          if (typeof elem === 'string') elem = $(elem)[0];
          config.id = elem && elem[_expando + 'follow'] || config.id || _expando + _count;
          api = artDialog.list[config.id];
          if (elem && api) return api.follow(elem).zIndex().focus();
          if (api) return api.zIndex().focus(); // 目前主流移动设备对fixed支持不好

          if (_isMobile) config.fixed = false; // 按钮队列

          if (!$.isArray(config.button)) {
            config.button = config.button ? [config.button] : [];
          }
          if (ok !== undefined) config.ok = ok;
          if (cancel !== undefined) config.cancel = cancel;
          config.ok && config.button.push({
            name: config.okVal,
            callback: config.ok,
            focus: true
          });
          config.cancel && config.button.push({
            name: config.cancelVal,
            callback: config.cancel
          }); // zIndex全局配置

          artDialog.defaults.zIndex = config.zIndex;
          _count++;
          return artDialog.list[config.id] = _box ? _box._init(config) : new artDialog.fn._init(config);
        };

        artDialog.fn = artDialog.prototype = {
          version: '4.1.7a',
          closed: true,
          _init: function _init(config) {
            var that = this,
                DOM,
                icon = config.icon,
                iconBg = icon && (_isIE6 ? {
              png: 'icons/' + icon + '.png'
            } : {
              backgroundImage: 'url(\'' + config.path + '/skins/icons/' + icon + '.png\')'
            });
            loadSkin(config.skin);
            that.closed = false;
            that.config = config;
            that.DOM = DOM = that.DOM || that._getDOM();
            DOM.wrap.addClass(config.skin);
            DOM.wrap[0].style.zoom = 1;
            DOM.close[config.cancel === false ? 'hide' : 'show']();
            DOM.icon[0].style.display = icon ? '' : 'none';
            DOM.iconBg.css(iconBg || {
              background: 'none'
            });
            DOM.se.css('cursor', config.resize ? 'se-resize' : 'auto');
            DOM.title.css('cursor', config.drag ? 'move' : 'auto');
            DOM.content.css('padding', config.padding);
            that[config.show ? 'show' : 'hide'](true);
            that.footer(config.footer);
            that.button(config.button).title(config.title).content(config.content, true, {
              type: config.type
            }).size(config.width, config.height).time(config.time);
            config.follow ? that.follow(config.follow) : that.position(config.left, config.top);
            that.defaultFocus();
            that.zIndex().focus();
            config.lock && that.lock();

            that._addEvent();

            that._ie6PngFix();

            _box = null;
            config.init && config.init.call(that, window);
            return that;
          },

          /**
           * 设置内容
           * @param	{String, HTMLElement}	内容 (可选)
           * @return	{this, HTMLElement}		如果无参数则返回内容容器DOM对象
           */
          content: function content(msg) {
            var prev,
                next,
                parent,
                display,
                that = this,
                DOM = that.DOM,
                wrap = DOM.wrap[0],
                width = wrap.offsetWidth,
                height = wrap.offsetHeight,
                left = parseInt(wrap.style.left),
                top = parseInt(wrap.style.top),
                cssWidth = wrap.style.width,
                $content = DOM.content,
                content = $content[0];
            that._elemBack && that._elemBack();
            wrap.style.width = 'auto';
            if (msg === undefined) return content;

            if (typeof msg === 'string') {
              $content.html(msg);
            } else if (msg && msg.nodeType === 1) {
              // 让传入的元素在对话框关闭后可以返回到原来的地方
              display = msg.style.display;
              prev = msg.previousSibling;
              next = msg.nextSibling;
              parent = msg.parentNode;

              that._elemBack = function () {
                if (prev && prev.parentNode) {
                  prev.parentNode.insertBefore(msg, prev.nextSibling);
                } else if (next && next.parentNode) {
                  next.parentNode.insertBefore(msg, next);
                } else if (parent) {
                  parent.appendChild(msg);
                }
                msg.style.display = display;
                that._elemBack = null;
              };

              $content.html('');
              content.appendChild(msg);
              msg.style.display = 'block';
            }

            if (!arguments[1]) {
              if (that.config.follow) {
                that.follow(that.config.follow);
              } else {
                width = wrap.offsetWidth - width;
                height = wrap.offsetHeight - height;
                left = left - width / 2;
                top = top - height / 2;
                wrap.style.left = Math.max(left, 0) + 'px';
                wrap.style.top = Math.max(top, 0) + 'px';
              }

              if (cssWidth && cssWidth !== 'auto') {
                wrap.style.width = wrap.offsetWidth + 'px';
              }

              that._autoPositionType();
            }

            that._ie6SelectFix();

            that._runScript(content);

            return that;
          },

          /**
           * 设置标题
           * @param	{String, Boolean}	标题内容. 为false则隐藏标题栏
           * @return	{this, HTMLElement}	如果无参数则返回内容器DOM对象
           */
          title: function title(text) {
            var DOM = this.DOM,
                wrap = DOM.wrap,
                title = DOM.title,
                className = 'ft-dlg-state-notitle';
            if (text === undefined) return title[0];

            if (text === false) {
              title.hide().html('');
              wrap.addClass(className);
            } else {
              title.show().html(text || '');
              wrap.removeClass(className);
            }
            return this;
          },
          footer: function footer(html) {
            var DOM = this.DOM;

            if (html === undefined) {
              return DOM.footerContent[0];
            }

            html = html || '';

            if (typeof html === 'string') {
              DOM.footerContent.html(html);
            } else {
              DOM.footerContent.html('');
              DOM.footerContent[0].appendChild(html);
            }

            if (typeof html === 'string' && /^\s*$/.test(html) || !html) {
              DOM.footerContent.hide();
            } else {
              DOM.footerContent.show();
            }

            this._checkFooterStatus();

            this._ie6SelectFix();

            return this;
          },

          /**
           * 位置(相对于可视区域)
           * @param	{Number, String}
           * @param	{Number, String}
           */
          position: function position(left, top) {
            var that = this,
                config = that.config,
                wrap = that.DOM.wrap[0],
                isFixed = _isIE6 ? false : config.fixed,
                ie6Fixed = _isIE6 && that.config.fixed,
                docLeft = _$document.scrollLeft(),
                docTop = _$document.scrollTop(),
                dl = isFixed ? 0 : docLeft,
                dt = isFixed ? 0 : docTop,
                ww = _$window.width(),
                wh = _$window.height(),
                ow = wrap.offsetWidth,
                oh = wrap.offsetHeight,
                style = wrap.style;

            if (left || left === 0) {
              that._left = left.toString().indexOf('%') !== -1 ? left : null;
              left = that._toNumber(left, ww - ow);

              if (typeof left === 'number') {
                left = ie6Fixed ? left += docLeft : left + dl;
                style.left = Math.max(left, dl) + 'px';
              } else if (typeof left === 'string') {
                style.left = left;
              }
            }

            if (top || top === 0) {
              that._top = top.toString().indexOf('%') !== -1 ? top : null;
              top = that._toNumber(top, wh - oh);

              if (typeof top === 'number') {
                top = ie6Fixed ? top += docTop : top + dt;
                style.top = Math.max(top, dt) + 'px';
              } else if (typeof top === 'string') {
                style.top = top;
              }
            }

            if (left !== undefined && top !== undefined) {
              that._follow = null;

              that._autoPositionType();
            }
            return that;
          },

          /**
           *	尺寸
           *	@param	{Number, String}	宽度
           *	@param	{Number, String}	高度
           */
          size: function size(width, height) {
            var maxWidth,
                maxHeight,
                scaleWidth,
                scaleHeight,
                that = this;
                that.config;
                var DOM = that.DOM,
                wrap = DOM.wrap,
                main = DOM.main,
                wrapStyle = wrap[0].style,
                style = main[0].style; //style.minWidth = /^\d*$/.test(this.config.minWidth + '') ? (this.config.minWidth + 'px') : this.config.minWidth;
            //style.minHeight = /^\d*$/.test(this.config.minHeight + '') ? (this.config.minHeight + 'px') : this.config.minHeight;

            if (width) {
              that._width = width.toString().indexOf('%') !== -1 ? width : null;
              maxWidth = _$window.width() - wrap[0].offsetWidth + main[0].offsetWidth;
              scaleWidth = that._toNumber(width, maxWidth);
              width = scaleWidth;

              if (typeof width === 'number') {
                wrapStyle.width = 'auto';
                style.width = Math.max(that.config.minWidth, width) + 'px';
                wrapStyle.width = wrap[0].offsetWidth + 'px'; // 防止未定义宽度的表格遇到浏览器右边边界伸缩
              } else if (typeof width === 'string') {
                style.width = width;
                width === 'auto' && wrap.css('width', 'auto');
              }
            }

            if (height) {
              that._height = height.toString().indexOf('%') !== -1 ? height : null;
              maxHeight = _$window.height() - wrap[0].offsetHeight + main[0].offsetHeight;
              scaleHeight = that._toNumber(height, maxHeight);
              height = scaleHeight;

              if (typeof height === 'number') {
                style.height = Math.max(that.config.minHeight, height) + 'px';
              } else if (typeof height === 'string') {
                style.height = height;
              }
            }

            that._ie6SelectFix();

            return that;
          },

          /**
           * 跟随元素
           * @param	{HTMLElement, String}
           */
          follow: function follow(elem) {
            var $elem,
                that = this,
                config = that.config;

            if (typeof elem === 'string' || elem && elem.nodeType === 1) {
              $elem = $(elem);
              elem = $elem[0];
            }

            if (!elem || !elem.offsetWidth && !elem.offsetHeight) {
              return that.position(that._left, that._top);
            }

            var expando = _expando + 'follow',
                winWidth = _$window.width(),
                winHeight = _$window.height(),
                docLeft = _$document.scrollLeft(),
                docTop = _$document.scrollTop(),
                offset = $elem.offset(),
                width = elem.offsetWidth,
                height = elem.offsetHeight,
                isFixed = _isIE6 ? false : config.fixed,
                left = isFixed ? offset.left - docLeft : offset.left,
                top = isFixed ? offset.top - docTop : offset.top,
                wrap = that.DOM.wrap[0],
                style = wrap.style,
                wrapWidth = wrap.offsetWidth,
                wrapHeight = wrap.offsetHeight,
                setLeft = left - (wrapWidth - width) / 2,
                setTop = top + height,
                dl = isFixed ? 0 : docLeft,
                dt = isFixed ? 0 : docTop;

            setLeft = setLeft < dl ? left : setLeft + wrapWidth > winWidth && left - wrapWidth > dl ? left - wrapWidth + width : setLeft;
            setTop = setTop + wrapHeight > winHeight + dt && top - wrapHeight > dt ? top - wrapHeight : setTop;
            style.left = setLeft + 'px';
            style.top = setTop + 'px';
            that._follow && that._follow.removeAttribute(expando);
            that._follow = elem;
            elem[expando] = config.id;

            that._autoPositionType();

            return that;
          },

          /**
           * 自定义按钮
           * @example
           button({
          name: 'login',
          callback: function () {},
          disabled: false,
          focus: true
          }, .., ..)
           */
          button: function button() {
            var that = this,
                ags = arguments,
                DOM = that.DOM,
                buttons = DOM.buttons,
                elem = buttons[0],
                strongButton = 'ft-btn-main',
                highlight = 'ft-btn-main',
                disabledClass = 'ft-btn-disabled',
                listeners = that._listeners = that._listeners || {},
                list = $.isArray(ags[0]) ? ags[0] : [].slice.call(ags);
            if (ags[0] === undefined) return elem;
            $.each(list, function (i, val) {
              var name = val.name,
                  isNewButton = !listeners[name],
                  button = !isNewButton ? listeners[name].elem : document.createElement('button');
              if (!listeners[name]) listeners[name] = {};
              if (val.callback) listeners[name].callback = val.callback;
              if (val.className) button.className = val.className;
              $(button).addClass('ft-btn');

              if (val.focus) {
                that._focus && that._focus.removeClass(strongButton);
                that._focus = $(button).addClass(strongButton);
                that.focus();
              }

              if (val.highlight) {
                $(button).addClass(highlight);
              } // Internet Explorer 的默认类型是 "button"，
              // 而其他浏览器中（包括 W3C 规范）的默认值是 "submit"
              // @see http://www.w3school.com.cn/tags/att_button_type.asp


              button.setAttribute('type', 'button');
              button[_expando + 'callback'] = name;
              button.disabled = !!val.disabled;

              if (val.disabled) {
                $(button).addClass(disabledClass);
              } else {
                $(button).removeClass(disabledClass);
              }

              if (isNewButton) {
                button.innerHTML = name;
                listeners[name].elem = button;
                elem.appendChild(button);
              }
            });
            buttons[0].style.display = list.length ? '' : 'none';

            if (!list.length) {
              buttons.html('');
            }

            that._checkFooterStatus();

            that._ie6SelectFix();

            return that;
          },
          defaultFocus: function defaultFocus() {
            this._defaultFocus = $('#ft-dlg-default-focus-elem'); //this._defaultFocus[0] && (this._defaultFocus[0].id += ((Math.random() * 1000) | 0));

            this._defaultFocus.bind('click', function (e) {
              e = e || window.event; //e.stopPropagation ? e.stopPropagation() : (e.cancelBubble = true);

              e.preventDefault ? e.preventDefault() : e.returnValue = false;
            });

            return this;
          },

          /** 显示对话框 */
          show: function show() {
            this.DOM.wrap.show();
            !arguments[0] && this._lockMaskWrap && this._lockMaskWrap.show();
            return this;
          },

          /** 隐藏对话框 */
          hide: function hide() {
            this.DOM.wrap.hide();
            !arguments[0] && this._lockMaskWrap && this._lockMaskWrap.hide();
            return this;
          },
          // 检测footer的内容状态，并设置是否显示
          _checkFooterStatus: function _checkFooterStatus() {
            var footerContent = $.trim(this.DOM.footerContent.html());
            var buttons = $.trim(this.DOM.buttons.html());

            if (!footerContent && !buttons) {
              this.DOM.footer.hide();
            } else {
              this.DOM.footer.show();
            }
          },

          /** 关闭对话框 */
          close: function close() {
            if (this.closed) return this;
            var that = this,
                DOM = that.DOM,
                wrap = DOM.wrap,
                list = artDialog.list,
                fn = that.config.close,
                follow = that.config.follow;
     // 1. IE10+ iframe form item get item, then click the close button, the parent window form item can't be focus bug
            // 2. Firefox has the similar case, after click close button to close the dialog, then it can't use mousewheel to scroll page
            //if (isIE) {

            if (DOM.content.find("iframe")[0]) {
              var top = window.scrollTop || document.documentElement.scrollTop || document.body.scrollTop || 0;
              var focusElem = document.createElement('input');
              focusElem.type = 'text';
              document.body.appendChild(focusElem);
              focusElem.style.cssText = 'position:absolute; top:' + (top + 100) + 'px; left:-500px; font-size: 16px;';
              focusElem.focus();
              setTimeout(function () {
                focusElem.blur();
                document.body.removeChild(focusElem);
              }, 0);
            } //}


            that.time();

            if (typeof fn === 'function' && fn.call(that, window) === false) {
              return that;
            }
            that.unlock(); // 置空内容

            that._elemBack && that._elemBack();
            wrap[0].className = wrap[0].style.cssText = '';
            DOM.title.html('');
            DOM.content.html('');
            DOM.buttons.html('');
            DOM.footerContent.html('');
            if (artDialog.focus === that) artDialog.focus = null;
            if (follow) follow.removeAttribute(_expando + 'follow');
            delete list[that.config.id];

            that._removeEvent();

            that.hide(true)._setAbsolute(); // 清空除this.DOM之外临时对象，恢复到初始状态，以便使用单例模式


            for (var i in that) {
              if (that.hasOwnProperty(i) && i !== 'DOM') delete that[i];
            }

            _box ? wrap.remove() : _box = that;
            return that;
          },

          /**
           * 定时关闭
           * @param	{Number}	单位为秒, 无参数则停止计时器
           */
          time: function time(second, callback) {
            var that = this,
                cancel = that.config.cancelVal,
                timer = that._timer;
            timer && clearTimeout(timer);

            if (second) {
              that._timer = setTimeout(function () {
                that._click(cancel);

                typeof callback === 'function' && callback.call(that);
              }, 1000 * second);
            }
            return that;
          },

          /** 设置焦点 */
          focus: function focus() {
            try {
              if (this.config.focus) {
                var elem = this._focus && this._focus[0] || this._defaultFocus && this._defaultFocus[0]; //this.DOM.close[0];

                elem && elem.focus();
              }
            } catch (e) {}

            return this;
          },

          /** 置顶对话框 */
          zIndex: function zIndex() {
            var that = this,
                DOM = that.DOM,
                wrap = DOM.wrap,
                top = artDialog.focus,
                index = artDialog.defaults.zIndex++; // 设置叠加高度

            wrap.css('zIndex', index);
            that._lockMask && that._lockMask.css('zIndex', index - 1); // 设置最高层的样式

            top && top.DOM.wrap.removeClass('ft-dlg-state-focus');
            artDialog.focus = that;
            wrap.addClass('ft-dlg-state-focus');
            return that;
          },

          /** 设置屏锁 */
          lock: function lock() {
            if (this._lock) return this;

            var that = this,
                index = artDialog.defaults.zIndex - 1,
                wrap = that.DOM.wrap,
                config = that.config,
                docWidth = _$document.width(),
                docHeight = _$document.height(),
                lockMaskWrap = that._lockMaskWrap || $(document.body.appendChild(document.createElement('div'))),
                lockMask = that._lockMask || $(lockMaskWrap[0].appendChild(document.createElement('div'))),
                domTxt = '(document).documentElement',
                sizeCss = _isMobile ? 'width:' + docWidth + 'px;height:' + docHeight + 'px' : 'width:100%;height:100%',
                ie6Css = _isIE6 ? 'position:absolute;left:expression(' + domTxt + '.scrollLeft);top:expression(' + domTxt + '.scrollTop);width:expression(' + domTxt + '.clientWidth);height:expression(' + domTxt + '.clientHeight)' : '';

            that.zIndex();
            wrap.addClass('ft-dlg-state-lock');
            lockMaskWrap[0].style.cssText = sizeCss + ';position:fixed;z-index:' + index + ';top:0;left:0;overflow:hidden;' + ie6Css;
            lockMask[0].style.cssText = 'height:100%;background:' + config.background + ';filter:alpha(opacity=0);opacity:0'; // 让IE6锁屏遮罩能够盖住下拉控件

            if (_isIE6) lockMask.html('<iframe src="about:blank" style="width:100%;height:100%;position:absolute;' + 'top:0;left:0;z-index:-1;filter:alpha(opacity=0)"></iframe>');
            lockMask.stop();
            lockMask.bind('click', function () {
              that._reset();
            });
            /*.bind('dblclick', function () {
            that._click(that.config.cancelVal);
            });*/

            if (config.duration === 0) {
              lockMask.css({
                opacity: config.opacity
              });
            } else {
              lockMask.animate({
                opacity: config.opacity
              }, config.duration);
            }
            that._lockMaskWrap = lockMaskWrap;
            that._lockMask = lockMask;
            that._lock = true;
            return that;
          },

          /** 解开屏锁 */
          unlock: function unlock() {
            var that = this,
                lockMaskWrap = that._lockMaskWrap,
                lockMask = that._lockMask;
            if (!that._lock) return that;
            var style = lockMaskWrap[0].style;

            var un = function un() {
              if (_isIE6) {
                style.removeExpression('width');
                style.removeExpression('height');
                style.removeExpression('left');
                style.removeExpression('top');
              }
              style.cssText = 'display:none';
              _box && lockMaskWrap.remove();
            };

            lockMask.stop().unbind();
            that.DOM.wrap.removeClass('ft-dlg-state-lock');

            if (!that.config.duration) {
              // 取消动画，快速关闭
              un();
            } else {
              lockMask.animate({
                opacity: 0
              }, that.config.duration, un);
            }
            that._lock = false;
            return that;
          },
          // 获取元素
          _getDOM: function _getDOM() {
            var wrap = document.createElement('div'),
                body = document.body;
            wrap.style.cssText = 'position:absolute;left:0;top:0';
            wrap.innerHTML = artDialog._templates;
            body.insertBefore(wrap, body.firstChild);
            var name,
                i = 0,
                DOM = {
              wrap: $(wrap)
            },
                els = wrap.getElementsByTagName('*'),
                elsLen = els.length;

            for (; i < elsLen; i++) {
              name = els[i].className.split('ft-dlg-')[1];

              if (name) {
                name = name.replace(/\-(\w)/g, function ($1, w) {
                  return w.toUpperCase();
                });
                DOM[name] = $(els[i]);
              }
            }
            return DOM;
          },
          // px与%单位转换成数值 (百分比单位按照最大值换算)
          // 其他的单位返回原值
          _toNumber: function _toNumber(thisValue, maxValue) {
            if (!thisValue && thisValue !== 0 || typeof thisValue === 'number') {
              return thisValue;
            }
            var last = thisValue.length - 1;

            if (thisValue.lastIndexOf('px') === last) {
              thisValue = parseInt(thisValue);
            } else if (thisValue.lastIndexOf('%') === last) {
              thisValue = parseInt(maxValue * thisValue.split('%')[0] / 100);
            }
            return thisValue;
          },
          // 让IE6 CSS支持PNG背景
          _ie6PngFix: _isIE6 ? function () {
            var i = 0,
                elem,
                png,
                pngPath,
                runtimeStyle,
                path = artDialog.defaults.path + '/skins/',
                list = this.DOM.wrap[0].getElementsByTagName('*');

            for (; i < list.length; i++) {
              elem = list[i];
              png = elem.currentStyle['png'];

              if (png) {
                pngPath = path + png;
                runtimeStyle = elem.runtimeStyle;
                runtimeStyle.backgroundImage = 'none';
                runtimeStyle.filter = "progid:DXImageTransform.Microsoft." + "AlphaImageLoader(src='" + pngPath + "',sizingMethod='crop')";
              }
            }
          } : $.noop,
          // 强制覆盖IE6下拉控件
          _ie6SelectFix: _isIE6 ? function () {
            var $wrap = this.DOM.wrap,
                wrap = $wrap[0],
                expando = _expando + 'iframeMask',
                iframe = $wrap[expando],
                width = wrap.offsetWidth,
                height = wrap.offsetHeight;
            width = width + 'px';
            height = height + 'px';

            if (iframe) {
              iframe.style.width = width;
              iframe.style.height = height;
            } else {
              iframe = wrap.appendChild(document.createElement('iframe'));
              $wrap[expando] = iframe;
              iframe.src = 'about:blank';
              iframe.style.cssText = 'position:absolute;z-index:-1;left:0;top:0;' + 'filter:alpha(opacity=0);width:' + width + ';height:' + height;
            }
          } : $.noop,
          // 解析HTML片段中自定义类型脚本，其this指向artDialog内部
          // <script type="text/dialog">/* [code] */</script>
          _runScript: function _runScript(elem) {
            var fun,
                i = 0,
                n = 0,
                tags = elem.getElementsByTagName('script'),
                length = tags.length,
                script = [];

            for (; i < length; i++) {
              if (tags[i].type === 'text/dialog') {
                script[n] = tags[i].innerHTML;
                n++;
              }
            }

            if (script.length) {
              script = script.join('');
              fun = new Function(script);
              fun.call(this);
            }
          },
          // 自动切换定位类型
          _autoPositionType: function _autoPositionType() {
            this[this.config.fixed ? '_setFixed' : '_setAbsolute'](); /////////////
          },
          // 设置静止定位
          // IE6 Fixed @see: http://www.planeart.cn/?p=877
          _setFixed: function () {
            _isIE6 && $(function () {
              var bg = 'backgroundAttachment';

              if (_$html.css(bg) !== 'fixed' && $('body').css(bg) !== 'fixed') {
                _$html.css({
                  zoom: 1,
                  // 避免偶尔出现body背景图片异常的情况
                  backgroundImage: 'url(about:blank)',
                  backgroundAttachment: 'fixed'
                });
              }
            });
            return function () {
              var $elem = this.DOM.wrap,
                  style = $elem[0].style;

              if (_isIE6) {
                var left = parseInt($elem.css('left')),
                    top = parseInt($elem.css('top')),
                    sLeft = _$document.scrollLeft(),
                    sTop = _$document.scrollTop(),
                    txt = '(document.documentElement)';

                this._setAbsolute();

                style.setExpression('left', 'eval(' + txt + '.scrollLeft + ' + (left - sLeft) + ') + "px"');
                style.setExpression('top', 'eval(' + txt + '.scrollTop + ' + (top - sTop) + ') + "px"');
              } else {
                style.position = 'fixed';
              }
            };
          }(),
          // 设置绝对定位
          _setAbsolute: function _setAbsolute() {
            var style = this.DOM.wrap[0].style;

            if (_isIE6) {
              style.removeExpression('left');
              style.removeExpression('top');
            }
            style.position = 'absolute';
          },
          // 按钮回调函数触发
          _click: function _click(name) {
            var that = this,
                fn = that._listeners[name] && that._listeners[name].callback;
            return typeof fn !== 'function' || fn.call(that, window) !== false ? that.close() : that;
          },
          // alias of _click
          clickButton: function clickButton(name) {
            this._click(name);
          },
          // 重置位置与尺寸
          _reset: function _reset(test) {
            var newSize,
                that = this,
                oldSize = that._winSize || _$window.width() * _$window.height(),
                elem = that._follow,
                width = that._width,
                height = that._height,
                left = that._left,
                top = that._top;

            if (test) {
              // IE6~7 window.onresize bug
              newSize = that._winSize = _$window.width() * _$window.height();
              if (oldSize === newSize) return;
            }

            if (width || height) that.size(width, height);

            if (elem) {
              that.follow(elem);
            } else if (left || top) {
              that.position(left, top);
            }
          },
          // 重置界面
          reset: function reset() {
            var that = this;
            setTimeout(function () {
              that._reset();
            }, 0);
          },
          // 事件代理
          _addEvent: function _addEvent() {
            var resizeTimer,
                that = this,
                config = that.config,
                isIE = ('CollectGarbage' in window),
                DOM = that.DOM; // 窗口调节事件

            that._winResize = function () {
              resizeTimer && clearTimeout(resizeTimer);
              resizeTimer = setTimeout(function () {
                that._reset(isIE);
              }, 40);
            };

            _$window.bind('resize', that._winResize); // 监听点击


            DOM.wrap.bind('click', function (event) {
              var target = event.target,
                  callbackID;
              if (target.disabled) return false; // IE BUG

              if (target === DOM.close[0] || DOM.close[0].contains(target)) {
                that._click(config.cancelVal);

                return false;
              } else {
                callbackID = target[_expando + 'callback'];
                callbackID && that._click(callbackID);
              }

              that._ie6SelectFix();
            }).bind('mousedown', function () {
              that.zIndex();
            });
          },
          // 卸载事件代理
          _removeEvent: function _removeEvent() {
            var that = this,
                DOM = that.DOM;
            DOM.wrap.unbind();

            _$window.unbind('resize', that._winResize);
          }
        };
        artDialog.fn._init.prototype = artDialog.fn;

        $.fn.dialog = $.fn.artDialog = function () {
          var config = arguments;
          this[this.live ? 'live' : 'bind']('click', function () {
            artDialog.apply(this, config);
            return false;
          });
          return this;
        };
        /** 最顶层的对话框API */


        artDialog.focus = null;
        /** 获取某对话框API */

        artDialog.get = function (id) {
          return id === undefined ? artDialog.list : artDialog.list[id];
        };

        artDialog.list = {}; // 全局快捷键

        _$document.bind('keydown', function (event) {
          var target = event.target,
              nodeName = target.nodeName,
              rinput = /^INPUT|TEXTAREA$/,
              api = artDialog.focus,
              keyCode = event.keyCode;
          if (!api || !api.config.esc || rinput.test(nodeName)) return;
          keyCode === 27 && api._click(api.config.cancelVal);
        }); // 获取artDialog路径


        _path = window['_artDialog_path'] || function (script, i, me) {
          for (; i < script.length; i++) {
            // 如果通过第三方脚本加载器加载本文件，请保证文件名含有"artDialog"字符
            if (script[i].src && script[i].src.indexOf('artDialog') !== -1) me = script[i];
          }
          _thisScript = me || script[script.length - 1];
          me = _thisScript.src.replace(/\\/g, '/');
          return me.lastIndexOf('/') < 0 ? '.' : me.substring(0, me.lastIndexOf('/'));
        }(document.getElementsByTagName('script')); // 无阻塞载入CSS (如"artDialog.js?skin=aero")


        _skin = _thisScript.src.match(/[\?&]skin=([^&#]*)/);
        _skin && loadSkin(_skin[1]); // 触发浏览器预先缓存背景图片

        _$window.bind('load', function () {
          setTimeout(function () {
            if (_count) return;
            var dia = artDialog({
              time: 9,
              fixed: false,
              lock: false,
              focus: false
            });
            dia.position('-9999em', '-9999em');
          }, 150);
        }); // 开启IE6 CSS背景图片缓存


        try {
          document.execCommand('BackgroundImageCache', false, true);
        } catch (e) {}
        // uglifyjs: http://marijnhaverbeke.nl/uglifyjs

        artDialog._templates = '' + '<div class="ft-dlg-dialog">' + '<div class="ft-dlg-header">' + '<div class="ft-dlg-titlebar">' + '<div class="ft-dlg-title"></div>' + '<span class="ft-dlg-close">' + '<i class="ft-icon icon-delete"></i>' + '</span>' + '</div>' + '</div>' + '<div class="ft-dlg-icon">' + '<div class="ft-dlg-iconBg"></div>' + '</div>' + '<div class="ft-dlg-main">' + '<div class="ft-dlg-content"></div>' + '</div>' + '<div class="ft-dlg-footer">' + '<div class="ft-dlg-footer-content"></div>' + '<div class="ft-dlg-buttons"></div>' + '</div>' + '</div>' + '<div class="ft-dlg-se"></div>' + '<a href="#" id="ft-dlg-default-focus-elem" style="margin-top:-20px; display:block; width:1px; height:1px; overflow:hidden;">x</a>';
        /**
         * 默认配置
         */

        artDialog.defaults = {
          // 消息内容
          content: '<div class="ft-dlg-loading"><span>loading..</span></div>',
          title: "\u6D88\u606F",
          // 标题. 默认'消息'
          footer: '',
          // 页脚内容
          button: null,
          // 自定义按钮
          ok: null,
          // 确定按钮回调函数
          cancel: null,
          // 取消按钮回调函数
          init: null,
          // 对话框初始化后执行的函数
          close: null,
          // 对话框关闭前执行的函数
          okVal: "\u786E\u5B9A",
          // 确定按钮文本. 默认'确定'
          cancelVal: "\u53D6\u6D88",
          // 取消按钮文本. 默认'取消'
          width: 'auto',
          // 内容宽度
          height: 'auto',
          // 内容高度
          minWidth: 0,
          // 最小宽度限制
          minHeight: 0,
          // 最小高度限制
          padding: '',
          // 内容与边界填充距离
          skin: '',
          // 皮肤名
          icon: null,
          // 消息图标名称
          time: null,
          // 自动关闭时间
          esc: true,
          // 是否支持Esc键关闭
          focus: true,
          // 是否支持对话框按钮自动聚焦
          show: true,
          // 初始化后是否显示对话框
          follow: null,
          // 跟随某元素(即让对话框在元素附近弹出)
          path: _path,
          // artDialog路径
          lock: false,
          // 是否锁屏
          background: '#000',
          // 遮罩颜色
          opacity: .4,
          // 遮罩透明度
          duration: 300,
          // 遮罩透明度渐变动画速度
          fixed: false,
          // 是否静止定位
          left: '50%',
          // X轴坐标
          top: '38.2%',
          // Y轴坐标
          zIndex: 1987,
          // 对话框叠加高度值(重要：此值不能超过浏览器最大限制)
          resize: true,
          // 是否允许用户调节尺寸
          drag: true // 是否允许用户拖动位置

        };
        return artDialog;
      });
    })(artDialog);

    var ArtDialog = artDialog.exports;

    var $$7 = _export;
    var DESCRIPTORS$1 = descriptors;
    var global$3 = global$o;
    var has$3 = has$e;
    var isObject$2 = isObject$g;
    var defineProperty$2 = objectDefineProperty.f;
    var copyConstructorProperties = copyConstructorProperties$2;

    var NativeSymbol = global$3.Symbol;

    if (DESCRIPTORS$1 && typeof NativeSymbol == 'function' && (!('description' in NativeSymbol.prototype) ||
      // Safari 12 bug
      NativeSymbol().description !== undefined
    )) {
      var EmptyStringDescriptionStore = {};
      // wrap Symbol constructor for correct work with undefined description
      var SymbolWrapper = function Symbol() {
        var description = arguments.length < 1 || arguments[0] === undefined ? undefined : String(arguments[0]);
        var result = this instanceof SymbolWrapper
          ? new NativeSymbol(description)
          // in Edge 13, String(Symbol(undefined)) === 'Symbol(undefined)'
          : description === undefined ? NativeSymbol() : NativeSymbol(description);
        if (description === '') EmptyStringDescriptionStore[result] = true;
        return result;
      };
      copyConstructorProperties(SymbolWrapper, NativeSymbol);
      var symbolPrototype = SymbolWrapper.prototype = NativeSymbol.prototype;
      symbolPrototype.constructor = SymbolWrapper;

      var symbolToString = symbolPrototype.toString;
      var native = String(NativeSymbol('test')) == 'Symbol(test)';
      var regexp = /^Symbol\((.*)\)[^)]+$/;
      defineProperty$2(symbolPrototype, 'description', {
        configurable: true,
        get: function description() {
          var symbol = isObject$2(this) ? this.valueOf() : this;
          var string = symbolToString.call(symbol);
          if (has$3(EmptyStringDescriptionStore, symbol)) return '';
          var desc = native ? string.slice(7, -1) : string.replace(regexp, '$1');
          return desc === '' ? undefined : desc;
        }
      });

      $$7({ global: true, forced: true }, {
        Symbol: SymbolWrapper
      });
    }

    var $$6 = _export;
    var $map = arrayIteration.map;
    var arrayMethodHasSpeciesSupport = arrayMethodHasSpeciesSupport$5;

    var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('map');

    // `Array.prototype.map` method
    // https://tc39.es/ecma262/#sec-array.prototype.map
    // with adding support of @@species
    $$6({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT }, {
      map: function map(callbackfn /* , thisArg */) {
        return $map(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
      }
    });

    var fails$3 = fails$q;

    var correctPrototypeGetter = !fails$3(function () {
      function F() { /* empty */ }
      F.prototype.constructor = null;
      // eslint-disable-next-line es/no-object-getprototypeof -- required for testing
      return Object.getPrototypeOf(new F()) !== F.prototype;
    });

    var has$2 = has$e;
    var toObject$1 = toObject$9;
    var sharedKey = sharedKey$4;
    var CORRECT_PROTOTYPE_GETTER = correctPrototypeGetter;

    var IE_PROTO = sharedKey('IE_PROTO');
    var ObjectPrototype = Object.prototype;

    // `Object.getPrototypeOf` method
    // https://tc39.es/ecma262/#sec-object.getprototypeof
    // eslint-disable-next-line es/no-object-getprototypeof -- safe
    var objectGetPrototypeOf = CORRECT_PROTOTYPE_GETTER ? Object.getPrototypeOf : function (O) {
      O = toObject$1(O);
      if (has$2(O, IE_PROTO)) return O[IE_PROTO];
      if (typeof O.constructor == 'function' && O instanceof O.constructor) {
        return O.constructor.prototype;
      } return O instanceof Object ? ObjectPrototype : null;
    };

    var fails$2 = fails$q;
    var getPrototypeOf$1 = objectGetPrototypeOf;
    var createNonEnumerableProperty$2 = createNonEnumerableProperty$b;
    var has$1 = has$e;
    var wellKnownSymbol$2 = wellKnownSymbol$n;

    var ITERATOR$2 = wellKnownSymbol$2('iterator');
    var BUGGY_SAFARI_ITERATORS$1 = false;

    var returnThis$2 = function () { return this; };

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

    var NEW_ITERATOR_PROTOTYPE = IteratorPrototype$2 == undefined || fails$2(function () {
      var test = {};
      // FF44- legacy iterators case
      return IteratorPrototype$2[ITERATOR$2].call(test) !== test;
    });

    if (NEW_ITERATOR_PROTOTYPE) IteratorPrototype$2 = {};

    // `%IteratorPrototype%[@@iterator]()` method
    // https://tc39.es/ecma262/#sec-%iteratorprototype%-@@iterator
    if (!has$1(IteratorPrototype$2, ITERATOR$2)) {
      createNonEnumerableProperty$2(IteratorPrototype$2, ITERATOR$2, returnThis$2);
    }

    var iteratorsCore = {
      IteratorPrototype: IteratorPrototype$2,
      BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS$1
    };

    var IteratorPrototype$1 = iteratorsCore.IteratorPrototype;
    var create$1 = objectCreate;
    var createPropertyDescriptor = createPropertyDescriptor$5;
    var setToStringTag$2 = setToStringTag$5;
    var Iterators$2 = iterators;

    var returnThis$1 = function () { return this; };

    var createIteratorConstructor$1 = function (IteratorConstructor, NAME, next) {
      var TO_STRING_TAG = NAME + ' Iterator';
      IteratorConstructor.prototype = create$1(IteratorPrototype$1, { next: createPropertyDescriptor(1, next) });
      setToStringTag$2(IteratorConstructor, TO_STRING_TAG, false);
      Iterators$2[TO_STRING_TAG] = returnThis$1;
      return IteratorConstructor;
    };

    var $$5 = _export;
    var createIteratorConstructor = createIteratorConstructor$1;
    var getPrototypeOf = objectGetPrototypeOf;
    var setPrototypeOf = objectSetPrototypeOf;
    var setToStringTag$1 = setToStringTag$5;
    var createNonEnumerableProperty$1 = createNonEnumerableProperty$b;
    var redefine$1 = redefine$a.exports;
    var wellKnownSymbol$1 = wellKnownSymbol$n;
    var Iterators$1 = iterators;
    var IteratorsCore = iteratorsCore;

    var IteratorPrototype = IteratorsCore.IteratorPrototype;
    var BUGGY_SAFARI_ITERATORS = IteratorsCore.BUGGY_SAFARI_ITERATORS;
    var ITERATOR$1 = wellKnownSymbol$1('iterator');
    var KEYS = 'keys';
    var VALUES = 'values';
    var ENTRIES = 'entries';

    var returnThis = function () { return this; };

    var defineIterator$3 = function (Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
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
        if (IteratorPrototype !== Object.prototype && CurrentIteratorPrototype.next) {
          if (getPrototypeOf(CurrentIteratorPrototype) !== IteratorPrototype) {
            if (setPrototypeOf) {
              setPrototypeOf(CurrentIteratorPrototype, IteratorPrototype);
            } else if (typeof CurrentIteratorPrototype[ITERATOR$1] != 'function') {
              createNonEnumerableProperty$1(CurrentIteratorPrototype, ITERATOR$1, returnThis);
            }
          }
          // Set @@toStringTag to native iterators
          setToStringTag$1(CurrentIteratorPrototype, TO_STRING_TAG, true);
        }
      }

      // fix Array.prototype.{ values, @@iterator }.name in V8 / FF
      if (DEFAULT == VALUES && nativeIterator && nativeIterator.name !== VALUES) {
        INCORRECT_VALUES_NAME = true;
        defaultIterator = function values() { return nativeIterator.call(this); };
      }

      // define iterator
      if (IterablePrototype[ITERATOR$1] !== defaultIterator) {
        createNonEnumerableProperty$1(IterablePrototype, ITERATOR$1, defaultIterator);
      }
      Iterators$1[NAME] = defaultIterator;

      // export additional methods
      if (DEFAULT) {
        methods = {
          values: getIterationMethod(VALUES),
          keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
          entries: getIterationMethod(ENTRIES)
        };
        if (FORCED) for (KEY in methods) {
          if (BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
            redefine$1(IterablePrototype, KEY, methods[KEY]);
          }
        } else $$5({ target: NAME, proto: true, forced: BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME }, methods);
      }

      return methods;
    };

    var toIndexedObject = toIndexedObject$a;
    var addToUnscopables = addToUnscopables$2;
    var Iterators = iterators;
    var InternalStateModule$2 = internalState;
    var defineIterator$2 = defineIterator$3;

    var ARRAY_ITERATOR = 'Array Iterator';
    var setInternalState$2 = InternalStateModule$2.set;
    var getInternalState$1 = InternalStateModule$2.getterFor(ARRAY_ITERATOR);

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
    var es_array_iterator = defineIterator$2(Array, 'Array', function (iterated, kind) {
      setInternalState$2(this, {
        type: ARRAY_ITERATOR,
        target: toIndexedObject(iterated), // target
        index: 0,                          // next index
        kind: kind                         // kind
      });
    // `%ArrayIteratorPrototype%.next` method
    // https://tc39.es/ecma262/#sec-%arrayiteratorprototype%.next
    }, function () {
      var state = getInternalState$1(this);
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

    // argumentsList[@@iterator] is %ArrayProto_values%
    // https://tc39.es/ecma262/#sec-createunmappedargumentsobject
    // https://tc39.es/ecma262/#sec-createmappedargumentsobject
    Iterators.Arguments = Iterators.Array;

    // https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
    addToUnscopables('keys');
    addToUnscopables('values');
    addToUnscopables('entries');

    var internalMetadata = {exports: {}};

    var fails$1 = fails$q;

    var freezing = !fails$1(function () {
      // eslint-disable-next-line es/no-object-isextensible, es/no-object-preventextensions -- required for testing
      return Object.isExtensible(Object.preventExtensions({}));
    });

    var hiddenKeys = hiddenKeys$6;
    var isObject$1 = isObject$g;
    var has = has$e;
    var defineProperty$1 = objectDefineProperty.f;
    var uid = uid$4;
    var FREEZING = freezing;

    var METADATA = uid('meta');
    var id = 0;

    // eslint-disable-next-line es/no-object-isextensible -- safe
    var isExtensible = Object.isExtensible || function () {
      return true;
    };

    var setMetadata = function (it) {
      defineProperty$1(it, METADATA, { value: {
        objectID: 'O' + id++, // object ID
        weakData: {}          // weak collections IDs
      } });
    };

    var fastKey$1 = function (it, create) {
      // return a primitive with prefix
      if (!isObject$1(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
      if (!has(it, METADATA)) {
        // can't set metadata to uncaught frozen object
        if (!isExtensible(it)) return 'F';
        // not necessary to add metadata
        if (!create) return 'E';
        // add missing metadata
        setMetadata(it);
      // return object ID
      } return it[METADATA].objectID;
    };

    var getWeakData = function (it, create) {
      if (!has(it, METADATA)) {
        // can't set metadata to uncaught frozen object
        if (!isExtensible(it)) return true;
        // not necessary to add metadata
        if (!create) return false;
        // add missing metadata
        setMetadata(it);
      // return the store of weak collections IDs
      } return it[METADATA].weakData;
    };

    // add metadata on freeze-family methods calling
    var onFreeze = function (it) {
      if (FREEZING && meta.REQUIRED && isExtensible(it) && !has(it, METADATA)) setMetadata(it);
      return it;
    };

    var meta = internalMetadata.exports = {
      REQUIRED: false,
      fastKey: fastKey$1,
      getWeakData: getWeakData,
      onFreeze: onFreeze
    };

    hiddenKeys[METADATA] = true;

    var $$4 = _export;
    var global$2 = global$o;
    var isForced = isForced_1;
    var redefine = redefine$a.exports;
    var InternalMetadataModule = internalMetadata.exports;
    var iterate$1 = iterate$3;
    var anInstance$1 = anInstance$3;
    var isObject = isObject$g;
    var fails = fails$q;
    var checkCorrectnessOfIteration$1 = checkCorrectnessOfIteration$3;
    var setToStringTag = setToStringTag$5;
    var inheritIfRequired = inheritIfRequired$2;

    var collection$1 = function (CONSTRUCTOR_NAME, wrapper, common) {
      var IS_MAP = CONSTRUCTOR_NAME.indexOf('Map') !== -1;
      var IS_WEAK = CONSTRUCTOR_NAME.indexOf('Weak') !== -1;
      var ADDER = IS_MAP ? 'set' : 'add';
      var NativeConstructor = global$2[CONSTRUCTOR_NAME];
      var NativePrototype = NativeConstructor && NativeConstructor.prototype;
      var Constructor = NativeConstructor;
      var exported = {};

      var fixMethod = function (KEY) {
        var nativeMethod = NativePrototype[KEY];
        redefine(NativePrototype, KEY,
          KEY == 'add' ? function add(value) {
            nativeMethod.call(this, value === 0 ? 0 : value);
            return this;
          } : KEY == 'delete' ? function (key) {
            return IS_WEAK && !isObject(key) ? false : nativeMethod.call(this, key === 0 ? 0 : key);
          } : KEY == 'get' ? function get(key) {
            return IS_WEAK && !isObject(key) ? undefined : nativeMethod.call(this, key === 0 ? 0 : key);
          } : KEY == 'has' ? function has(key) {
            return IS_WEAK && !isObject(key) ? false : nativeMethod.call(this, key === 0 ? 0 : key);
          } : function set(key, value) {
            nativeMethod.call(this, key === 0 ? 0 : key, value);
            return this;
          }
        );
      };

      var REPLACE = isForced(
        CONSTRUCTOR_NAME,
        typeof NativeConstructor != 'function' || !(IS_WEAK || NativePrototype.forEach && !fails(function () {
          new NativeConstructor().entries().next();
        }))
      );

      if (REPLACE) {
        // create collection constructor
        Constructor = common.getConstructor(wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER);
        InternalMetadataModule.REQUIRED = true;
      } else if (isForced(CONSTRUCTOR_NAME, true)) {
        var instance = new Constructor();
        // early implementations not supports chaining
        var HASNT_CHAINING = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance;
        // V8 ~ Chromium 40- weak-collections throws on primitives, but should return false
        var THROWS_ON_PRIMITIVES = fails(function () { instance.has(1); });
        // most early implementations doesn't supports iterables, most modern - not close it correctly
        // eslint-disable-next-line no-new -- required for testing
        var ACCEPT_ITERABLES = checkCorrectnessOfIteration$1(function (iterable) { new NativeConstructor(iterable); });
        // for early implementations -0 and +0 not the same
        var BUGGY_ZERO = !IS_WEAK && fails(function () {
          // V8 ~ Chromium 42- fails only with 5+ elements
          var $instance = new NativeConstructor();
          var index = 5;
          while (index--) $instance[ADDER](index, index);
          return !$instance.has(-0);
        });

        if (!ACCEPT_ITERABLES) {
          Constructor = wrapper(function (dummy, iterable) {
            anInstance$1(dummy, Constructor, CONSTRUCTOR_NAME);
            var that = inheritIfRequired(new NativeConstructor(), dummy, Constructor);
            if (iterable != undefined) iterate$1(iterable, that[ADDER], { that: that, AS_ENTRIES: IS_MAP });
            return that;
          });
          Constructor.prototype = NativePrototype;
          NativePrototype.constructor = Constructor;
        }

        if (THROWS_ON_PRIMITIVES || BUGGY_ZERO) {
          fixMethod('delete');
          fixMethod('has');
          IS_MAP && fixMethod('get');
        }

        if (BUGGY_ZERO || HASNT_CHAINING) fixMethod(ADDER);

        // weak collections should not contains .clear method
        if (IS_WEAK && NativePrototype.clear) delete NativePrototype.clear;
      }

      exported[CONSTRUCTOR_NAME] = Constructor;
      $$4({ global: true, forced: Constructor != NativeConstructor }, exported);

      setToStringTag(Constructor, CONSTRUCTOR_NAME);

      if (!IS_WEAK) common.setStrong(Constructor, CONSTRUCTOR_NAME, IS_MAP);

      return Constructor;
    };

    var defineProperty = objectDefineProperty.f;
    var create = objectCreate;
    var redefineAll = redefineAll$2;
    var bind$1 = functionBindContext;
    var anInstance = anInstance$3;
    var iterate = iterate$3;
    var defineIterator$1 = defineIterator$3;
    var setSpecies = setSpecies$3;
    var DESCRIPTORS = descriptors;
    var fastKey = internalMetadata.exports.fastKey;
    var InternalStateModule$1 = internalState;

    var setInternalState$1 = InternalStateModule$1.set;
    var internalStateGetterFor = InternalStateModule$1.getterFor;

    var collectionStrong$1 = {
      getConstructor: function (wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER) {
        var C = wrapper(function (that, iterable) {
          anInstance(that, C, CONSTRUCTOR_NAME);
          setInternalState$1(that, {
            type: CONSTRUCTOR_NAME,
            index: create(null),
            first: undefined,
            last: undefined,
            size: 0
          });
          if (!DESCRIPTORS) that.size = 0;
          if (iterable != undefined) iterate(iterable, that[ADDER], { that: that, AS_ENTRIES: IS_MAP });
        });

        var getInternalState = internalStateGetterFor(CONSTRUCTOR_NAME);

        var define = function (that, key, value) {
          var state = getInternalState(that);
          var entry = getEntry(that, key);
          var previous, index;
          // change existing entry
          if (entry) {
            entry.value = value;
          // create new entry
          } else {
            state.last = entry = {
              index: index = fastKey(key, true),
              key: key,
              value: value,
              previous: previous = state.last,
              next: undefined,
              removed: false
            };
            if (!state.first) state.first = entry;
            if (previous) previous.next = entry;
            if (DESCRIPTORS) state.size++;
            else that.size++;
            // add to index
            if (index !== 'F') state.index[index] = entry;
          } return that;
        };

        var getEntry = function (that, key) {
          var state = getInternalState(that);
          // fast case
          var index = fastKey(key);
          var entry;
          if (index !== 'F') return state.index[index];
          // frozen object case
          for (entry = state.first; entry; entry = entry.next) {
            if (entry.key == key) return entry;
          }
        };

        redefineAll(C.prototype, {
          // `{ Map, Set }.prototype.clear()` methods
          // https://tc39.es/ecma262/#sec-map.prototype.clear
          // https://tc39.es/ecma262/#sec-set.prototype.clear
          clear: function clear() {
            var that = this;
            var state = getInternalState(that);
            var data = state.index;
            var entry = state.first;
            while (entry) {
              entry.removed = true;
              if (entry.previous) entry.previous = entry.previous.next = undefined;
              delete data[entry.index];
              entry = entry.next;
            }
            state.first = state.last = undefined;
            if (DESCRIPTORS) state.size = 0;
            else that.size = 0;
          },
          // `{ Map, Set }.prototype.delete(key)` methods
          // https://tc39.es/ecma262/#sec-map.prototype.delete
          // https://tc39.es/ecma262/#sec-set.prototype.delete
          'delete': function (key) {
            var that = this;
            var state = getInternalState(that);
            var entry = getEntry(that, key);
            if (entry) {
              var next = entry.next;
              var prev = entry.previous;
              delete state.index[entry.index];
              entry.removed = true;
              if (prev) prev.next = next;
              if (next) next.previous = prev;
              if (state.first == entry) state.first = next;
              if (state.last == entry) state.last = prev;
              if (DESCRIPTORS) state.size--;
              else that.size--;
            } return !!entry;
          },
          // `{ Map, Set }.prototype.forEach(callbackfn, thisArg = undefined)` methods
          // https://tc39.es/ecma262/#sec-map.prototype.foreach
          // https://tc39.es/ecma262/#sec-set.prototype.foreach
          forEach: function forEach(callbackfn /* , that = undefined */) {
            var state = getInternalState(this);
            var boundFunction = bind$1(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
            var entry;
            while (entry = entry ? entry.next : state.first) {
              boundFunction(entry.value, entry.key, this);
              // revert to the last existing entry
              while (entry && entry.removed) entry = entry.previous;
            }
          },
          // `{ Map, Set}.prototype.has(key)` methods
          // https://tc39.es/ecma262/#sec-map.prototype.has
          // https://tc39.es/ecma262/#sec-set.prototype.has
          has: function has(key) {
            return !!getEntry(this, key);
          }
        });

        redefineAll(C.prototype, IS_MAP ? {
          // `Map.prototype.get(key)` method
          // https://tc39.es/ecma262/#sec-map.prototype.get
          get: function get(key) {
            var entry = getEntry(this, key);
            return entry && entry.value;
          },
          // `Map.prototype.set(key, value)` method
          // https://tc39.es/ecma262/#sec-map.prototype.set
          set: function set(key, value) {
            return define(this, key === 0 ? 0 : key, value);
          }
        } : {
          // `Set.prototype.add(value)` method
          // https://tc39.es/ecma262/#sec-set.prototype.add
          add: function add(value) {
            return define(this, value = value === 0 ? 0 : value, value);
          }
        });
        if (DESCRIPTORS) defineProperty(C.prototype, 'size', {
          get: function () {
            return getInternalState(this).size;
          }
        });
        return C;
      },
      setStrong: function (C, CONSTRUCTOR_NAME, IS_MAP) {
        var ITERATOR_NAME = CONSTRUCTOR_NAME + ' Iterator';
        var getInternalCollectionState = internalStateGetterFor(CONSTRUCTOR_NAME);
        var getInternalIteratorState = internalStateGetterFor(ITERATOR_NAME);
        // `{ Map, Set }.prototype.{ keys, values, entries, @@iterator }()` methods
        // https://tc39.es/ecma262/#sec-map.prototype.entries
        // https://tc39.es/ecma262/#sec-map.prototype.keys
        // https://tc39.es/ecma262/#sec-map.prototype.values
        // https://tc39.es/ecma262/#sec-map.prototype-@@iterator
        // https://tc39.es/ecma262/#sec-set.prototype.entries
        // https://tc39.es/ecma262/#sec-set.prototype.keys
        // https://tc39.es/ecma262/#sec-set.prototype.values
        // https://tc39.es/ecma262/#sec-set.prototype-@@iterator
        defineIterator$1(C, CONSTRUCTOR_NAME, function (iterated, kind) {
          setInternalState$1(this, {
            type: ITERATOR_NAME,
            target: iterated,
            state: getInternalCollectionState(iterated),
            kind: kind,
            last: undefined
          });
        }, function () {
          var state = getInternalIteratorState(this);
          var kind = state.kind;
          var entry = state.last;
          // revert to the last existing entry
          while (entry && entry.removed) entry = entry.previous;
          // get next entry
          if (!state.target || !(state.last = entry = entry ? entry.next : state.state.first)) {
            // or finish the iteration
            state.target = undefined;
            return { value: undefined, done: true };
          }
          // return step by kind
          if (kind == 'keys') return { value: entry.key, done: false };
          if (kind == 'values') return { value: entry.value, done: false };
          return { value: [entry.key, entry.value], done: false };
        }, IS_MAP ? 'entries' : 'values', !IS_MAP, true);

        // `{ Map, Set }.prototype[@@species]` accessors
        // https://tc39.es/ecma262/#sec-get-map-@@species
        // https://tc39.es/ecma262/#sec-get-set-@@species
        setSpecies(CONSTRUCTOR_NAME);
      }
    };

    var collection = collection$1;
    var collectionStrong = collectionStrong$1;

    // `Map` constructor
    // https://tc39.es/ecma262/#sec-map-objects
    collection('Map', function (init) {
      return function Map() { return init(this, arguments.length ? arguments[0] : undefined); };
    }, collectionStrong);

    var charAt = stringMultibyte.charAt;
    var InternalStateModule = internalState;
    var defineIterator = defineIterator$3;

    var STRING_ITERATOR = 'String Iterator';
    var setInternalState = InternalStateModule.set;
    var getInternalState = InternalStateModule.getterFor(STRING_ITERATOR);

    // `String.prototype[@@iterator]` method
    // https://tc39.es/ecma262/#sec-string.prototype-@@iterator
    defineIterator(String, 'String', function (iterated) {
      setInternalState(this, {
        type: STRING_ITERATOR,
        string: String(iterated),
        index: 0
      });
    // `%StringIteratorPrototype%.next` method
    // https://tc39.es/ecma262/#sec-%stringiteratorprototype%.next
    }, function next() {
      var state = getInternalState(this);
      var string = state.string;
      var index = state.index;
      var point;
      if (index >= string.length) return { value: undefined, done: true };
      point = charAt(string, index);
      state.index += point.length;
      return { value: point, done: false };
    });

    var global$1 = global$o;
    var DOMIterables = domIterables;
    var ArrayIteratorMethods = es_array_iterator;
    var createNonEnumerableProperty = createNonEnumerableProperty$b;
    var wellKnownSymbol = wellKnownSymbol$n;

    var ITERATOR = wellKnownSymbol('iterator');
    var TO_STRING_TAG = wellKnownSymbol('toStringTag');
    var ArrayValues = ArrayIteratorMethods.values;

    for (var COLLECTION_NAME in DOMIterables) {
      var Collection = global$1[COLLECTION_NAME];
      var CollectionPrototype = Collection && Collection.prototype;
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
    }

    var $$3 = _export;
    var createHTML = createHtml;
    var forcedStringHTMLMethod = stringHtmlForced;

    // `String.prototype.sub` method
    // https://tc39.es/ecma262/#sec-string.prototype.sub
    $$3({ target: 'String', proto: true, forced: forcedStringHTMLMethod('sub') }, {
      sub: function sub() {
        return createHTML(this, 'sub', '', '');
      }
    });

    var n,
        u$1,
        i$1,
        t$1,
        o$1,
        r$1 = {},
        f$1 = [],
        e$1 = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;

    function c$1(n, l) {
      for (var u in l) {
        n[u] = l[u];
      }

      return n;
    }

    function s$1(n) {
      var l = n.parentNode;
      l && l.removeChild(n);
    }

    function a$1(n, l, u) {
      var i,
          t,
          o,
          r = arguments,
          f = {};

      for (o in l) {
        "key" == o ? i = l[o] : "ref" == o ? t = l[o] : f[o] = l[o];
      }

      if (arguments.length > 3) for (u = [u], o = 3; o < arguments.length; o++) {
        u.push(r[o]);
      }
      if (null != u && (f.children = u), "function" == typeof n && null != n.defaultProps) for (o in n.defaultProps) {
        void 0 === f[o] && (f[o] = n.defaultProps[o]);
      }
      return v$1(n, f, i, t, null);
    }

    function v$1(l, u, i, t, o) {
      var r = {
        type: l,
        props: u,
        key: i,
        ref: t,
        __k: null,
        __: null,
        __b: 0,
        __e: null,
        __d: void 0,
        __c: null,
        __h: null,
        constructor: void 0,
        __v: null == o ? ++n.__v : o
      };
      return null != n.vnode && n.vnode(r), r;
    }

    function h$1() {
      return {
        current: null
      };
    }

    function y$1(n) {
      return n.children;
    }

    function p$1(n, l) {
      this.props = n, this.context = l;
    }

    function d$1(n, l) {
      if (null == l) return n.__ ? d$1(n.__, n.__.__k.indexOf(n) + 1) : null;

      for (var u; l < n.__k.length; l++) {
        if (null != (u = n.__k[l]) && null != u.__e) return u.__e;
      }

      return "function" == typeof n.type ? d$1(n) : null;
    }

    function _$1(n) {
      var l, u;

      if (null != (n = n.__) && null != n.__c) {
        for (n.__e = n.__c.base = null, l = 0; l < n.__k.length; l++) {
          if (null != (u = n.__k[l]) && null != u.__e) {
            n.__e = n.__c.base = u.__e;
            break;
          }
        }

        return _$1(n);
      }
    }

    function k$2(l) {
      (!l.__d && (l.__d = !0) && u$1.push(l) && !b$1.__r++ || t$1 !== n.debounceRendering) && ((t$1 = n.debounceRendering) || i$1)(b$1);
    }

    function b$1() {
      for (var n; b$1.__r = u$1.length;) {
        n = u$1.sort(function (n, l) {
          return n.__v.__b - l.__v.__b;
        }), u$1 = [], n.some(function (n) {
          var l, u, i, t, o, r;
          n.__d && (o = (t = (l = n).__v).__e, (r = l.__P) && (u = [], (i = c$1({}, t)).__v = t.__v + 1, I$1(r, t, i, l.__n, void 0 !== r.ownerSVGElement, null != t.__h ? [o] : null, u, null == o ? d$1(t) : o, t.__h), T$2(u, t), t.__e != o && _$1(t)));
        });
      }
    }

    function m$1(n, l, u, i, t, o, e, c, s, a) {
      var h,
          p,
          _,
          k,
          b,
          m,
          w,
          A = i && i.__k || f$1,
          P = A.length;

      for (u.__k = [], h = 0; h < l.length; h++) {
        if (null != (k = u.__k[h] = null == (k = l[h]) || "boolean" == typeof k ? null : "string" == typeof k || "number" == typeof k || "bigint" == typeof k ? v$1(null, k, null, null, k) : Array.isArray(k) ? v$1(y$1, {
          children: k
        }, null, null, null) : k.__b > 0 ? v$1(k.type, k.props, k.key, null, k.__v) : k)) {
          if (k.__ = u, k.__b = u.__b + 1, null === (_ = A[h]) || _ && k.key == _.key && k.type === _.type) A[h] = void 0;else for (p = 0; p < P; p++) {
            if ((_ = A[p]) && k.key == _.key && k.type === _.type) {
              A[p] = void 0;
              break;
            }

            _ = null;
          }
          I$1(n, k, _ = _ || r$1, t, o, e, c, s, a), b = k.__e, (p = k.ref) && _.ref != p && (w || (w = []), _.ref && w.push(_.ref, null, k), w.push(p, k.__c || b, k)), null != b ? (null == m && (m = b), "function" == typeof k.type && null != k.__k && k.__k === _.__k ? k.__d = s = g$2(k, s, n) : s = x$2(n, k, _, A, b, s), a || "option" !== u.type ? "function" == typeof u.type && (u.__d = s) : n.value = "") : s && _.__e == s && s.parentNode != n && (s = d$1(_));
        }
      }

      for (u.__e = m, h = P; h--;) {
        null != A[h] && ("function" == typeof u.type && null != A[h].__e && A[h].__e == u.__d && (u.__d = d$1(i, h + 1)), L$1(A[h], A[h]));
      }

      if (w) for (h = 0; h < w.length; h++) {
        z$1(w[h], w[++h], w[++h]);
      }
    }

    function g$2(n, l, u) {
      var i, t;

      for (i = 0; i < n.__k.length; i++) {
        (t = n.__k[i]) && (t.__ = n, l = "function" == typeof t.type ? g$2(t, l, u) : x$2(u, t, t, n.__k, t.__e, l));
      }

      return l;
    }

    function w$2(n, l) {
      return l = l || [], null == n || "boolean" == typeof n || (Array.isArray(n) ? n.some(function (n) {
        w$2(n, l);
      }) : l.push(n)), l;
    }

    function x$2(n, l, u, i, t, o) {
      var r, f, e;
      if (void 0 !== l.__d) r = l.__d, l.__d = void 0;else if (null == u || t != o || null == t.parentNode) n: if (null == o || o.parentNode !== n) n.appendChild(t), r = null;else {
        for (f = o, e = 0; (f = f.nextSibling) && e < i.length; e += 2) {
          if (f == t) break n;
        }

        n.insertBefore(t, o), r = o;
      }
      return void 0 !== r ? r : t.nextSibling;
    }

    function A$2(n, l, u, i, t) {
      var o;

      for (o in u) {
        "children" === o || "key" === o || o in l || C$1(n, o, null, u[o], i);
      }

      for (o in l) {
        t && "function" != typeof l[o] || "children" === o || "key" === o || "value" === o || "checked" === o || u[o] === l[o] || C$1(n, o, l[o], u[o], i);
      }
    }

    function P$1(n, l, u) {
      "-" === l[0] ? n.setProperty(l, u) : n[l] = null == u ? "" : "number" != typeof u || e$1.test(l) ? u : u + "px";
    }

    function C$1(n, l, u, i, t) {
      var o;

      n: if ("style" === l) {
        if ("string" == typeof u) n.style.cssText = u;else {
          if ("string" == typeof i && (n.style.cssText = i = ""), i) for (l in i) {
            u && l in u || P$1(n.style, l, "");
          }
          if (u) for (l in u) {
            i && u[l] === i[l] || P$1(n.style, l, u[l]);
          }
        }
      } else if ("o" === l[0] && "n" === l[1]) o = l !== (l = l.replace(/Capture$/, "")), l = l.toLowerCase() in n ? l.toLowerCase().slice(2) : l.slice(2), n.l || (n.l = {}), n.l[l + o] = u, u ? i || n.addEventListener(l, o ? H$1 : $$2, o) : n.removeEventListener(l, o ? H$1 : $$2, o);else if ("dangerouslySetInnerHTML" !== l) {
        if (t) l = l.replace(/xlink[H:h]/, "h").replace(/sName$/, "s");else if ("href" !== l && "list" !== l && "form" !== l && "tabIndex" !== l && "download" !== l && l in n) try {
          n[l] = null == u ? "" : u;
          break n;
        } catch (n) {}
        "function" == typeof u || (null != u && (!1 !== u || "a" === l[0] && "r" === l[1]) ? n.setAttribute(l, u) : n.removeAttribute(l));
      }
    }

    function $$2(l) {
      this.l[l.type + !1](n.event ? n.event(l) : l);
    }

    function H$1(l) {
      this.l[l.type + !0](n.event ? n.event(l) : l);
    }

    function I$1(l, u, i, t, o, r, f, e, s) {
      var a,
          v,
          h,
          d,
          _,
          k,
          b,
          g,
          w,
          x,
          A,
          P = u.type;

      if (void 0 !== u.constructor) return null;
      null != i.__h && (s = i.__h, e = u.__e = i.__e, u.__h = null, r = [e]), (a = n.__b) && a(u);

      try {
        n: if ("function" == typeof P) {
          if (g = u.props, w = (a = P.contextType) && t[a.__c], x = a ? w ? w.props.value : a.__ : t, i.__c ? b = (v = u.__c = i.__c).__ = v.__E : ("prototype" in P && P.prototype.render ? u.__c = v = new P(g, x) : (u.__c = v = new p$1(g, x), v.constructor = P, v.render = M$1), w && w.sub(v), v.props = g, v.state || (v.state = {}), v.context = x, v.__n = t, h = v.__d = !0, v.__h = []), null == v.__s && (v.__s = v.state), null != P.getDerivedStateFromProps && (v.__s == v.state && (v.__s = c$1({}, v.__s)), c$1(v.__s, P.getDerivedStateFromProps(g, v.__s))), d = v.props, _ = v.state, h) null == P.getDerivedStateFromProps && null != v.componentWillMount && v.componentWillMount(), null != v.componentDidMount && v.__h.push(v.componentDidMount);else {
            if (null == P.getDerivedStateFromProps && g !== d && null != v.componentWillReceiveProps && v.componentWillReceiveProps(g, x), !v.__e && null != v.shouldComponentUpdate && !1 === v.shouldComponentUpdate(g, v.__s, x) || u.__v === i.__v) {
              v.props = g, v.state = v.__s, u.__v !== i.__v && (v.__d = !1), v.__v = u, u.__e = i.__e, u.__k = i.__k, u.__k.forEach(function (n) {
                n && (n.__ = u);
              }), v.__h.length && f.push(v);
              break n;
            }

            null != v.componentWillUpdate && v.componentWillUpdate(g, v.__s, x), null != v.componentDidUpdate && v.__h.push(function () {
              v.componentDidUpdate(d, _, k);
            });
          }
          v.context = x, v.props = g, v.state = v.__s, (a = n.__r) && a(u), v.__d = !1, v.__v = u, v.__P = l, a = v.render(v.props, v.state, v.context), v.state = v.__s, null != v.getChildContext && (t = c$1(c$1({}, t), v.getChildContext())), h || null == v.getSnapshotBeforeUpdate || (k = v.getSnapshotBeforeUpdate(d, _)), A = null != a && a.type === y$1 && null == a.key ? a.props.children : a, m$1(l, Array.isArray(A) ? A : [A], u, i, t, o, r, f, e, s), v.base = u.__e, u.__h = null, v.__h.length && f.push(v), b && (v.__E = v.__ = null), v.__e = !1;
        } else null == r && u.__v === i.__v ? (u.__k = i.__k, u.__e = i.__e) : u.__e = j$2(i.__e, u, i, t, o, r, f, s);

        (a = n.diffed) && a(u);
      } catch (l) {
        u.__v = null, (s || null != r) && (u.__e = e, u.__h = !!s, r[r.indexOf(e)] = null), n.__e(l, u, i);
      }
    }

    function T$2(l, u) {
      n.__c && n.__c(u, l), l.some(function (u) {
        try {
          l = u.__h, u.__h = [], l.some(function (n) {
            n.call(u);
          });
        } catch (l) {
          n.__e(l, u.__v);
        }
      });
    }

    function j$2(n, l, u, i, t, o, e, c) {
      var a,
          v,
          h,
          y,
          p = u.props,
          d = l.props,
          _ = l.type,
          k = 0;
      if ("svg" === _ && (t = !0), null != o) for (; k < o.length; k++) {
        if ((a = o[k]) && (a === n || (_ ? a.localName == _ : 3 == a.nodeType))) {
          n = a, o[k] = null;
          break;
        }
      }

      if (null == n) {
        if (null === _) return document.createTextNode(d);
        n = t ? document.createElementNS("http://www.w3.org/2000/svg", _) : document.createElement(_, d.is && d), o = null, c = !1;
      }

      if (null === _) p === d || c && n.data === d || (n.data = d);else {
        if (o = o && f$1.slice.call(n.childNodes), v = (p = u.props || r$1).dangerouslySetInnerHTML, h = d.dangerouslySetInnerHTML, !c) {
          if (null != o) for (p = {}, y = 0; y < n.attributes.length; y++) {
            p[n.attributes[y].name] = n.attributes[y].value;
          }
          (h || v) && (h && (v && h.__html == v.__html || h.__html === n.innerHTML) || (n.innerHTML = h && h.__html || ""));
        }

        if (A$2(n, d, p, t, c), h) l.__k = [];else if (k = l.props.children, m$1(n, Array.isArray(k) ? k : [k], l, u, i, t && "foreignObject" !== _, o, e, n.firstChild, c), null != o) for (k = o.length; k--;) {
          null != o[k] && s$1(o[k]);
        }
        c || ("value" in d && void 0 !== (k = d.value) && (k !== n.value || "progress" === _ && !k) && C$1(n, "value", k, p.value, !1), "checked" in d && void 0 !== (k = d.checked) && k !== n.checked && C$1(n, "checked", k, p.checked, !1));
      }
      return n;
    }

    function z$1(l, u, i) {
      try {
        "function" == typeof l ? l(u) : l.current = u;
      } catch (l) {
        n.__e(l, i);
      }
    }

    function L$1(l, u, i) {
      var t, o, r;

      if (n.unmount && n.unmount(l), (t = l.ref) && (t.current && t.current !== l.__e || z$1(t, null, u)), i || "function" == typeof l.type || (i = null != (o = l.__e)), l.__e = l.__d = void 0, null != (t = l.__c)) {
        if (t.componentWillUnmount) try {
          t.componentWillUnmount();
        } catch (l) {
          n.__e(l, u);
        }
        t.base = t.__P = null;
      }

      if (t = l.__k) for (r = 0; r < t.length; r++) {
        t[r] && L$1(t[r], u, i);
      }
      null != o && s$1(o);
    }

    function M$1(n, l, u) {
      return this.constructor(n, u);
    }

    function N$1(l, u, i) {
      var t, o, e;
      n.__ && n.__(l, u), o = (t = "function" == typeof i) ? null : i && i.__k || u.__k, e = [], I$1(u, l = (!t && i || u).__k = a$1(y$1, null, [l]), o || r$1, r$1, void 0 !== u.ownerSVGElement, !t && i ? [i] : o ? null : u.firstChild ? f$1.slice.call(u.childNodes) : null, e, !t && i ? i : o ? o.__e : u.firstChild, t), T$2(e, l);
    }

    function O$1(n, l) {
      N$1(n, l, O$1);
    }

    function S$1(n, l, u) {
      var i,
          t,
          o,
          r = arguments,
          f = c$1({}, n.props);

      for (o in l) {
        "key" == o ? i = l[o] : "ref" == o ? t = l[o] : f[o] = l[o];
      }

      if (arguments.length > 3) for (u = [u], o = 3; o < arguments.length; o++) {
        u.push(r[o]);
      }
      return null != u && (f.children = u), v$1(n.type, f, i || n.key, t || n.ref, null);
    }

    function q$1(n, l) {
      var u = {
        __c: l = "__cC" + o$1++,
        __: n,
        Consumer: function Consumer(n, l) {
          return n.children(l);
        },
        Provider: function Provider(n) {
          var u, i;
          return this.getChildContext || (u = [], (i = {})[l] = this, this.getChildContext = function () {
            return i;
          }, this.shouldComponentUpdate = function (n) {
            this.props.value !== n.value && u.some(k$2);
          }, this.sub = function (n) {
            u.push(n);
            var l = n.componentWillUnmount;

            n.componentWillUnmount = function () {
              u.splice(u.indexOf(n), 1), l && l.call(n);
            };
          }), n.children;
        }
      };
      return u.Provider.__ = u.Consumer.contextType = u;
    }

    n = {
      __e: function __e(n, l) {
        for (var u, i, t; l = l.__;) {
          if ((u = l.__c) && !u.__) try {
            if ((i = u.constructor) && null != i.getDerivedStateFromError && (u.setState(i.getDerivedStateFromError(n)), t = u.__d), null != u.componentDidCatch && (u.componentDidCatch(n), t = u.__d), t) return u.__E = u;
          } catch (l) {
            n = l;
          }
        }

        throw n;
      },
      __v: 0
    }, p$1.prototype.setState = function (n, l) {
      var u;
      u = null != this.__s && this.__s !== this.state ? this.__s : this.__s = c$1({}, this.state), "function" == typeof n && (n = n(c$1({}, u), this.props)), n && c$1(u, n), null != n && this.__v && (l && this.__h.push(l), k$2(this));
    }, p$1.prototype.forceUpdate = function (n) {
      this.__v && (this.__e = !0, n && this.__h.push(n), k$2(this));
    }, p$1.prototype.render = y$1, u$1 = [], i$1 = "function" == typeof Promise ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, b$1.__r = 0, o$1 = 0;

    var t,
        u,
        r,
        o = 0,
        i = [],
        c = n.__b,
        f = n.__r,
        e = n.diffed,
        a = n.__c,
        v = n.unmount;

    function m(t, r) {
      n.__h && n.__h(u, t, o || r), o = 0;
      var i = u.__H || (u.__H = {
        __: [],
        __h: []
      });
      return t >= i.__.length && i.__.push({}), i.__[t];
    }

    function l(n) {
      return o = 1, p(w$1, n);
    }

    function p(n, r, o) {
      var i = m(t++, 2);
      return i.t = n, i.__c || (i.__ = [o ? o(r) : w$1(void 0, r), function (n) {
        var t = i.t(i.__[0], n);
        i.__[0] !== t && (i.__ = [t, i.__[1]], i.__c.setState({}));
      }], i.__c = u), i.__;
    }

    function y(r, o) {
      var i = m(t++, 3);
      !n.__s && k$1(i.__H, o) && (i.__ = r, i.__H = o, u.__H.__h.push(i));
    }

    function h(r, o) {
      var i = m(t++, 4);
      !n.__s && k$1(i.__H, o) && (i.__ = r, i.__H = o, u.__h.push(i));
    }

    function s(n) {
      return o = 5, d(function () {
        return {
          current: n
        };
      }, []);
    }

    function _(n, t, u) {
      o = 6, h(function () {
        "function" == typeof n ? n(t()) : n && (n.current = t());
      }, null == u ? u : u.concat(n));
    }

    function d(n, u) {
      var r = m(t++, 7);
      return k$1(r.__H, u) && (r.__ = n(), r.__H = u, r.__h = n), r.__;
    }

    function A$1(n, t) {
      return o = 8, d(function () {
        return n;
      }, t);
    }

    function F$1(n) {
      var r = u.context[n.__c],
          o = m(t++, 9);
      return o.__c = n, r ? (null == o.__ && (o.__ = !0, r.sub(u)), r.props.value) : n.__;
    }

    function T$1(t, u) {
      n.useDebugValue && n.useDebugValue(u ? u(t) : t);
    }

    function x$1() {
      i.forEach(function (t) {
        if (t.__P) try {
          t.__H.__h.forEach(g$1), t.__H.__h.forEach(j$1), t.__H.__h = [];
        } catch (u) {
          t.__H.__h = [], n.__e(u, t.__v);
        }
      }), i = [];
    }

    n.__b = function (n) {
      u = null, c && c(n);
    }, n.__r = function (n) {
      f && f(n), t = 0;
      var r = (u = n.__c).__H;
      r && (r.__h.forEach(g$1), r.__h.forEach(j$1), r.__h = []);
    }, n.diffed = function (t) {
      e && e(t);
      var o = t.__c;
      o && o.__H && o.__H.__h.length && (1 !== i.push(o) && r === n.requestAnimationFrame || ((r = n.requestAnimationFrame) || function (n) {
        var t,
            u = function u() {
          clearTimeout(r), b && cancelAnimationFrame(t), setTimeout(n);
        },
            r = setTimeout(u, 100);

        b && (t = requestAnimationFrame(u));
      })(x$1)), u = void 0;
    }, n.__c = function (t, u) {
      u.some(function (t) {
        try {
          t.__h.forEach(g$1), t.__h = t.__h.filter(function (n) {
            return !n.__ || j$1(n);
          });
        } catch (r) {
          u.some(function (n) {
            n.__h && (n.__h = []);
          }), u = [], n.__e(r, t.__v);
        }
      }), a && a(t, u);
    }, n.unmount = function (t) {
      v && v(t);
      var u = t.__c;
      if (u && u.__H) try {
        u.__H.__.forEach(g$1);
      } catch (t) {
        n.__e(t, u.__v);
      }
    };
    var b = "function" == typeof requestAnimationFrame;

    function g$1(n) {
      var t = u;
      "function" == typeof n.__c && n.__c(), u = t;
    }

    function j$1(n) {
      var t = u;
      n.__c = n.__(), u = t;
    }

    function k$1(n, t) {
      return !n || n.length !== t.length || t.some(function (t, u) {
        return t !== n[u];
      });
    }

    function w$1(n, t) {
      return "function" == typeof t ? t(n) : t;
    }

    function C(n, t) {
      for (var e in t) {
        n[e] = t[e];
      }

      return n;
    }

    function S(n, t) {
      for (var e in n) {
        if ("__source" !== e && !(e in t)) return !0;
      }

      for (var r in t) {
        if ("__source" !== r && n[r] !== t[r]) return !0;
      }

      return !1;
    }

    function E(n) {
      this.props = n;
    }

    function g(n, t) {
      function e(n) {
        var e = this.props.ref,
            r = e == n.ref;
        return !r && e && (e.call ? e(null) : e.current = null), t ? !t(this.props, n) || !r : S(this.props, n);
      }

      function r(t) {
        return this.shouldComponentUpdate = e, a$1(n, t);
      }

      return r.displayName = "Memo(" + (n.displayName || n.name) + ")", r.prototype.isReactComponent = !0, r.__f = !0, r;
    }

    (E.prototype = new p$1()).isPureReactComponent = !0, E.prototype.shouldComponentUpdate = function (n, t) {
      return S(this.props, n) || S(this.state, t);
    };
    var w = n.__b;

    n.__b = function (n) {
      n.type && n.type.__f && n.ref && (n.props.ref = n.ref, n.ref = null), w && w(n);
    };

    var R = "undefined" != typeof Symbol && Symbol.for && Symbol.for("react.forward_ref") || 3911;

    function x(n) {
      function t(t, e) {
        var r = C({}, t);
        return delete r.ref, n(r, (e = t.ref || e) && ("object" != _typeof(e) || "current" in e) ? e : null);
      }

      return t.$$typeof = R, t.render = t, t.prototype.isReactComponent = t.__f = !0, t.displayName = "ForwardRef(" + (n.displayName || n.name) + ")", t;
    }

    var N = function N(n, t) {
      return null == n ? null : w$2(w$2(n).map(t));
    },
        k = {
      map: N,
      forEach: N,
      count: function count(n) {
        return n ? w$2(n).length : 0;
      },
      only: function only(n) {
        var t = w$2(n);
        if (1 !== t.length) throw "Children.only";
        return t[0];
      },
      toArray: w$2
    },
        A = n.__e;

    n.__e = function (n, t, e) {
      if (n.then) for (var r, u = t; u = u.__;) {
        if ((r = u.__c) && r.__c) return null == t.__e && (t.__e = e.__e, t.__k = e.__k), r.__c(n, t);
      }
      A(n, t, e);
    };

    var O = n.unmount;

    function L() {
      this.__u = 0, this.t = null, this.__b = null;
    }

    function U(n) {
      var t = n.__.__c;
      return t && t.__e && t.__e(n);
    }

    function D(n) {
      var t, e, r;

      function u(u) {
        if (t || (t = n()).then(function (n) {
          e = n.default || n;
        }, function (n) {
          r = n;
        }), r) throw r;
        if (!e) throw t;
        return a$1(e, u);
      }

      return u.displayName = "Lazy", u.__f = !0, u;
    }

    function F() {
      this.u = null, this.o = null;
    }

    n.unmount = function (n) {
      var t = n.__c;
      t && t.__R && t.__R(), t && !0 === n.__h && (n.type = null), O && O(n);
    }, (L.prototype = new p$1()).__c = function (n, t) {
      var e = t.__c,
          r = this;
      null == r.t && (r.t = []), r.t.push(e);

      var u = U(r.__v),
          o = !1,
          i = function i() {
        o || (o = !0, e.__R = null, u ? u(l) : l());
      };

      e.__R = i;

      var l = function l() {
        if (! --r.__u) {
          if (r.state.__e) {
            var n = r.state.__e;

            r.__v.__k[0] = function n(t, e, r) {
              return t && (t.__v = null, t.__k = t.__k && t.__k.map(function (t) {
                return n(t, e, r);
              }), t.__c && t.__c.__P === e && (t.__e && r.insertBefore(t.__e, t.__d), t.__c.__e = !0, t.__c.__P = r)), t;
            }(n, n.__c.__P, n.__c.__O);
          }

          var t;

          for (r.setState({
            __e: r.__b = null
          }); t = r.t.pop();) {
            t.forceUpdate();
          }
        }
      },
          f = !0 === t.__h;

      r.__u++ || f || r.setState({
        __e: r.__b = r.__v.__k[0]
      }), n.then(i, i);
    }, L.prototype.componentWillUnmount = function () {
      this.t = [];
    }, L.prototype.render = function (n, t) {
      if (this.__b) {
        if (this.__v.__k) {
          var e = document.createElement("div"),
              r = this.__v.__k[0].__c;

          this.__v.__k[0] = function n(t, e, r) {
            return t && (t.__c && t.__c.__H && (t.__c.__H.__.forEach(function (n) {
              "function" == typeof n.__c && n.__c();
            }), t.__c.__H = null), null != (t = C({}, t)).__c && (t.__c.__P === r && (t.__c.__P = e), t.__c = null), t.__k = t.__k && t.__k.map(function (t) {
              return n(t, e, r);
            })), t;
          }(this.__b, e, r.__O = r.__P);
        }

        this.__b = null;
      }

      var u = t.__e && a$1(y$1, null, n.fallback);
      return u && (u.__h = null), [a$1(y$1, null, t.__e ? null : n.children), u];
    };

    var M = function M(n, t, e) {
      if (++e[1] === e[0] && n.o.delete(t), n.props.revealOrder && ("t" !== n.props.revealOrder[0] || !n.o.size)) for (e = n.u; e;) {
        for (; e.length > 3;) {
          e.pop()();
        }

        if (e[1] < e[0]) break;
        n.u = e = e[2];
      }
    };

    function T(n) {
      return this.getChildContext = function () {
        return n.context;
      }, n.children;
    }

    function j(n) {
      var t = this,
          e = n.i;
      t.componentWillUnmount = function () {
        N$1(null, t.l), t.l = null, t.i = null;
      }, t.i && t.i !== e && t.componentWillUnmount(), n.__v ? (t.l || (t.i = e, t.l = {
        nodeType: 1,
        parentNode: e,
        childNodes: [],
        appendChild: function appendChild(n) {
          this.childNodes.push(n), t.i.appendChild(n);
        },
        insertBefore: function insertBefore(n, e) {
          this.childNodes.push(n), t.i.appendChild(n);
        },
        removeChild: function removeChild(n) {
          this.childNodes.splice(this.childNodes.indexOf(n) >>> 1, 1), t.i.removeChild(n);
        }
      }), N$1(a$1(T, {
        context: t.context
      }, n.__v), t.l)) : t.l && t.componentWillUnmount();
    }

    function I(n, t) {
      return a$1(j, {
        __v: n,
        i: t
      });
    }

    (F.prototype = new p$1()).__e = function (n) {
      var t = this,
          e = U(t.__v),
          r = t.o.get(n);
      return r[0]++, function (u) {
        var o = function o() {
          t.props.revealOrder ? (r.push(u), M(t, n, r)) : u();
        };

        e ? e(o) : o();
      };
    }, F.prototype.render = function (n) {
      this.u = null, this.o = new Map();
      var t = w$2(n.children);
      n.revealOrder && "b" === n.revealOrder[0] && t.reverse();

      for (var e = t.length; e--;) {
        this.o.set(t[e], this.u = [1, 0, this.u]);
      }

      return n.children;
    }, F.prototype.componentDidUpdate = F.prototype.componentDidMount = function () {
      var n = this;
      this.o.forEach(function (t, e) {
        M(n, e, t);
      });
    };

    var W = "undefined" != typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103,
        P = /^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|fill|flood|font|glyph(?!R)|horiz|marker(?!H|W|U)|overline|paint|stop|strikethrough|stroke|text(?!L)|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/,
        V = function V(n) {
      return ("undefined" != typeof Symbol && "symbol" == _typeof(Symbol()) ? /fil|che|rad/i : /fil|che|ra/i).test(n);
    };

    function z(n, t, e) {
      return null == t.__k && (t.textContent = ""), N$1(n, t), "function" == typeof e && e(), n ? n.__c : null;
    }

    function B(n, t, e) {
      return O$1(n, t), "function" == typeof e && e(), n ? n.__c : null;
    }

    p$1.prototype.isReactComponent = {}, ["componentWillMount", "componentWillReceiveProps", "componentWillUpdate"].forEach(function (n) {
      Object.defineProperty(p$1.prototype, n, {
        configurable: !0,
        get: function get() {
          return this["UNSAFE_" + n];
        },
        set: function set(t) {
          Object.defineProperty(this, n, {
            configurable: !0,
            writable: !0,
            value: t
          });
        }
      });
    });
    var H = n.event;

    function Z() {}

    function Y() {
      return this.cancelBubble;
    }

    function $$1() {
      return this.defaultPrevented;
    }

    n.event = function (n) {
      return H && (n = H(n)), n.persist = Z, n.isPropagationStopped = Y, n.isDefaultPrevented = $$1, n.nativeEvent = n;
    };

    var q,
        G = {
      configurable: !0,
      get: function get() {
        return this.class;
      }
    },
        J = n.vnode;

    n.vnode = function (n) {
      var t = n.type,
          e = n.props,
          r = e;

      if ("string" == typeof t) {
        for (var u in r = {}, e) {
          var o = e[u];
          "value" === u && "defaultValue" in e && null == o || ("defaultValue" === u && "value" in e && null == e.value ? u = "value" : "download" === u && !0 === o ? o = "" : /ondoubleclick/i.test(u) ? u = "ondblclick" : /^onchange(textarea|input)/i.test(u + t) && !V(e.type) ? u = "oninput" : /^on(Ani|Tra|Tou|BeforeInp)/.test(u) ? u = u.toLowerCase() : P.test(u) ? u = u.replace(/[A-Z0-9]/, "-$&").toLowerCase() : null === o && (o = void 0), r[u] = o);
        }

        "select" == t && r.multiple && Array.isArray(r.value) && (r.value = w$2(e.children).forEach(function (n) {
          n.props.selected = -1 != r.value.indexOf(n.props.value);
        })), "select" == t && null != r.defaultValue && (r.value = w$2(e.children).forEach(function (n) {
          n.props.selected = r.multiple ? -1 != r.defaultValue.indexOf(n.props.value) : r.defaultValue == n.props.value;
        })), n.props = r;
      }

      t && e.class != e.className && (G.enumerable = "className" in e, null != e.className && (r.class = e.className), Object.defineProperty(r, "className", G)), n.$$typeof = W, J && J(n);
    };

    var K = n.__r;

    n.__r = function (n) {
      K && K(n), q = n.__c;
    };

    var Q = {
      ReactCurrentDispatcher: {
        current: {
          readContext: function readContext(n) {
            return q.__n[n.__c].props.value;
          }
        }
      }
    };

    "object" == (typeof performance === "undefined" ? "undefined" : _typeof(performance)) && "function" == typeof performance.now ? performance.now.bind(performance) : function () {
      return Date.now();
    };

    function fn(n) {
      return a$1.bind(null, n);
    }

    function cn(n) {
      return !!n && n.$$typeof === W;
    }

    function an(n) {
      return cn(n) ? S$1.apply(null, arguments) : n;
    }

    function sn(n) {
      return !!n.__k && (N$1(null, n), !0);
    }

    function hn(n) {
      return n && (n.base || 1 === n.nodeType && n) || null;
    }

    var pn = function pn(n, t) {
      return n(t);
    };

    var React = {
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
      version: "16.8.0",
      Children: k,
      render: z,
      hydrate: B,
      unmountComponentAtNode: sn,
      createPortal: I,
      createElement: a$1,
      createContext: q$1,
      createFactory: fn,
      cloneElement: an,
      createRef: h$1,
      Fragment: y$1,
      isValidElement: cn,
      findDOMNode: hn,
      Component: p$1,
      PureComponent: E,
      memo: g,
      forwardRef: x,
      unstable_batchedUpdates: pn,
      StrictMode: y$1,
      Suspense: L,
      SuspenseList: F,
      lazy: D,
      __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: Q
    };

    var anObject = anObject$g;
    var iteratorClose = iteratorClose$2;

    // call something on iterator step with safe closing on error
    var callWithSafeIterationClosing$1 = function (iterator, fn, value, ENTRIES) {
      try {
        return ENTRIES ? fn(anObject(value)[0], value[1]) : fn(value);
      } catch (error) {
        iteratorClose(iterator);
        throw error;
      }
    };

    var bind = functionBindContext;
    var toObject = toObject$9;
    var callWithSafeIterationClosing = callWithSafeIterationClosing$1;
    var isArrayIteratorMethod = isArrayIteratorMethod$2;
    var toLength = toLength$a;
    var createProperty = createProperty$5;
    var getIteratorMethod = getIteratorMethod$2;

    // `Array.from` method implementation
    // https://tc39.es/ecma262/#sec-array.from
    var arrayFrom = function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
      var O = toObject(arrayLike);
      var C = typeof this == 'function' ? this : Array;
      var argumentsLength = arguments.length;
      var mapfn = argumentsLength > 1 ? arguments[1] : undefined;
      var mapping = mapfn !== undefined;
      var iteratorMethod = getIteratorMethod(O);
      var index = 0;
      var length, result, step, iterator, next, value;
      if (mapping) mapfn = bind(mapfn, argumentsLength > 2 ? arguments[2] : undefined, 2);
      // if the target is not iterable or it's an array with the default iterator - use a simple case
      if (iteratorMethod != undefined && !(C == Array && isArrayIteratorMethod(iteratorMethod))) {
        iterator = iteratorMethod.call(O);
        next = iterator.next;
        result = new C();
        for (;!(step = next.call(iterator)).done; index++) {
          value = mapping ? callWithSafeIterationClosing(iterator, mapfn, [step.value, index], true) : step.value;
          createProperty(result, index, value);
        }
      } else {
        length = toLength(O.length);
        result = new C(length);
        for (;length > index; index++) {
          value = mapping ? mapfn(O[index], index) : O[index];
          createProperty(result, index, value);
        }
      }
      result.length = index;
      return result;
    };

    var $ = _export;
    var from = arrayFrom;
    var checkCorrectnessOfIteration = checkCorrectnessOfIteration$3;

    var INCORRECT_ITERATION = !checkCorrectnessOfIteration(function (iterable) {
      // eslint-disable-next-line es/no-array-from -- required for testing
      Array.from(iterable);
    });

    // `Array.from` method
    // https://tc39.es/ecma262/#sec-array.from
    $({ target: 'Array', stat: true, forced: INCORRECT_ITERATION }, {
      from: from
    });

    function _toConsumableArray(arr) {
      if (Array.isArray(arr)) {
        for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
          arr2[i] = arr[i];
        }

        return arr2;
      } else {
        return Array.from(arr);
      }
    } // Older browsers don't support event options, feature detect it.
    // Adopted and modified solution from Bohdan Didukh (2017)
    // https://stackoverflow.com/questions/41594997/ios-10-safari-prevent-scrolling-behind-a-fixed-overlay-and-maintain-scroll-posi


    var hasPassiveEvents = false;

    if (typeof window !== 'undefined') {
      var passiveTestOptions = {
        get passive() {
          hasPassiveEvents = true;
          return undefined;
        }

      };
      window.addEventListener('testPassive', null, passiveTestOptions);
      window.removeEventListener('testPassive', null, passiveTestOptions);
    }

    var isIosDevice = typeof window !== 'undefined' && window.navigator && window.navigator.platform && (/iP(ad|hone|od)/.test(window.navigator.platform) || window.navigator.platform === 'MacIntel' && window.navigator.maxTouchPoints > 1);
    var locks = [];
    var documentListenerAdded = false;
    var initialClientY = -1;
    var previousBodyOverflowSetting = void 0;
    var previousBodyPosition = void 0;
    var previousBodyPaddingRight = void 0; // returns true if `el` should be allowed to receive touchmove events.

    var allowTouchMove = function allowTouchMove(el) {
      return locks.some(function (lock) {
        if (lock.options.allowTouchMove && lock.options.allowTouchMove(el)) {
          return true;
        }

        return false;
      });
    };

    var preventDefault = function preventDefault(rawEvent) {
      var e = rawEvent || window.event; // For the case whereby consumers adds a touchmove event listener to document.
      // Recall that we do document.addEventListener('touchmove', preventDefault, { passive: false })
      // in disableBodyScroll - so if we provide this opportunity to allowTouchMove, then
      // the touchmove event on document will break.

      if (allowTouchMove(e.target)) {
        return true;
      } // Do not prevent if the event has more than one touch (usually meaning this is a multi touch gesture like pinch to zoom).


      if (e.touches.length > 1) return true;
      if (e.preventDefault) e.preventDefault();
      return false;
    };

    var setOverflowHidden = function setOverflowHidden(options) {
      // If previousBodyPaddingRight is already set, don't set it again.
      if (previousBodyPaddingRight === undefined) {
        var _reserveScrollBarGap = !!options && options.reserveScrollBarGap === true;

        var scrollBarGap = window.innerWidth - document.documentElement.clientWidth;

        if (_reserveScrollBarGap && scrollBarGap > 0) {
          var computedBodyPaddingRight = parseInt(window.getComputedStyle(document.body).getPropertyValue('padding-right'), 10);
          previousBodyPaddingRight = document.body.style.paddingRight;
          document.body.style.paddingRight = computedBodyPaddingRight + scrollBarGap + 'px';
        }
      } // If previousBodyOverflowSetting is already set, don't set it again.


      if (previousBodyOverflowSetting === undefined) {
        previousBodyOverflowSetting = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
      }
    };

    var restoreOverflowSetting = function restoreOverflowSetting() {
      if (previousBodyPaddingRight !== undefined) {
        document.body.style.paddingRight = previousBodyPaddingRight; // Restore previousBodyPaddingRight to undefined so setOverflowHidden knows it
        // can be set again.

        previousBodyPaddingRight = undefined;
      }

      if (previousBodyOverflowSetting !== undefined) {
        document.body.style.overflow = previousBodyOverflowSetting; // Restore previousBodyOverflowSetting to undefined
        // so setOverflowHidden knows it can be set again.

        previousBodyOverflowSetting = undefined;
      }
    };

    var setPositionFixed = function setPositionFixed() {
      return window.requestAnimationFrame(function () {
        // If previousBodyPosition is already set, don't set it again.
        if (previousBodyPosition === undefined) {
          previousBodyPosition = {
            position: document.body.style.position,
            top: document.body.style.top,
            left: document.body.style.left
          }; // Update the dom inside an animation frame 

          var _window = window,
              scrollY = _window.scrollY,
              scrollX = _window.scrollX,
              innerHeight = _window.innerHeight;
          document.body.style.position = 'fixed';
          document.body.style.top = -scrollY;
          document.body.style.left = -scrollX;
          setTimeout(function () {
            return window.requestAnimationFrame(function () {
              // Attempt to check if the bottom bar appeared due to the position change
              var bottomBarHeight = innerHeight - window.innerHeight;

              if (bottomBarHeight && scrollY >= innerHeight) {
                // Move the content further up so that the bottom bar doesn't hide it
                document.body.style.top = -(scrollY + bottomBarHeight);
              }
            });
          }, 300);
        }
      });
    };

    var restorePositionSetting = function restorePositionSetting() {
      if (previousBodyPosition !== undefined) {
        // Convert the position from "px" to Int
        var y = -parseInt(document.body.style.top, 10);
        var x = -parseInt(document.body.style.left, 10); // Restore styles

        document.body.style.position = previousBodyPosition.position;
        document.body.style.top = previousBodyPosition.top;
        document.body.style.left = previousBodyPosition.left; // Restore scroll

        window.scrollTo(x, y);
        previousBodyPosition = undefined;
      }
    }; // https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollHeight#Problems_and_solutions


    var isTargetElementTotallyScrolled = function isTargetElementTotallyScrolled(targetElement) {
      return targetElement ? targetElement.scrollHeight - targetElement.scrollTop <= targetElement.clientHeight : false;
    };

    var handleScroll = function handleScroll(event, targetElement) {
      var clientY = event.targetTouches[0].clientY - initialClientY;

      if (allowTouchMove(event.target)) {
        return false;
      }

      if (targetElement && targetElement.scrollTop === 0 && clientY > 0) {
        // element is at the top of its scroll.
        return preventDefault(event);
      }

      if (isTargetElementTotallyScrolled(targetElement) && clientY < 0) {
        // element is at the bottom of its scroll.
        return preventDefault(event);
      }

      event.stopPropagation();
      return true;
    };

    var disableBodyScroll = function disableBodyScroll(targetElement, options) {
      // targetElement must be provided
      if (!targetElement) {
        // eslint-disable-next-line no-console
        console.error('disableBodyScroll unsuccessful - targetElement must be provided when calling disableBodyScroll on IOS devices.');
        return;
      } // disableBodyScroll must not have been called on this targetElement before


      if (locks.some(function (lock) {
        return lock.targetElement === targetElement;
      })) {
        return;
      }

      var lock = {
        targetElement: targetElement,
        options: options || {}
      };
      locks = [].concat(_toConsumableArray(locks), [lock]);

      if (isIosDevice) {
        setPositionFixed();
      } else {
        setOverflowHidden(options);
      }

      if (isIosDevice) {
        targetElement.ontouchstart = function (event) {
          if (event.targetTouches.length === 1) {
            // detect single touch.
            initialClientY = event.targetTouches[0].clientY;
          }
        };

        targetElement.ontouchmove = function (event) {
          if (event.targetTouches.length === 1) {
            // detect single touch.
            handleScroll(event, targetElement);
          }
        };

        if (!documentListenerAdded) {
          document.addEventListener('touchmove', preventDefault, hasPassiveEvents ? {
            passive: false
          } : undefined);
          documentListenerAdded = true;
        }
      }
    };
    var enableBodyScroll = function enableBodyScroll(targetElement) {
      if (!targetElement) {
        // eslint-disable-next-line no-console
        console.error('enableBodyScroll unsuccessful - targetElement must be provided when calling enableBodyScroll on IOS devices.');
        return;
      }

      locks = locks.filter(function (lock) {
        return lock.targetElement !== targetElement;
      });

      if (isIosDevice) {
        targetElement.ontouchstart = null;
        targetElement.ontouchmove = null;

        if (documentListenerAdded && locks.length === 0) {
          document.removeEventListener('touchmove', preventDefault, hasPassiveEvents ? {
            passive: false
          } : undefined);
          documentListenerAdded = false;
        }
      }

      if (isIosDevice) {
        restorePositionSetting();
      } else {
        restoreOverflowSetting();
      }
    };

    function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

    function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
    var getDialogInstance = function getDialogInstance(content, options) {
      var _options$classList = options.classList,
          classList = _options$classList === void 0 ? [] : _options$classList,
          _options$lock = options.lock,
          lock = _options$lock === void 0 ? true : _options$lock,
          _options$drag = options.drag,
          drag = _options$drag === void 0 ? false : _options$drag,
          _options$resize = options.resize,
          resize = _options$resize === void 0 ? false : _options$resize;
      return new ArtDialog({
        title: options.title,
        content: "",
        init: function init() {
          var _contentElement$paren,
              _this = this;

          var contentElement = this.content();
          var dialogElement = (_contentElement$paren = contentElement.parentElement) === null || _contentElement$paren === void 0 ? void 0 : _contentElement$paren.parentElement;
          dialogElement && classList.forEach(function (className) {
            dialogElement.classList.add(className);
          });

          if (dialogElement && options.close === false) {
            dialogElement.classList.add("without-close");
          }

          lock && disableBodyScroll(contentElement);

          if ( /*#__PURE__*/React.isValidElement(content)) {
            React.render(content, contentElement, function () {
              _this.position(_this._left, _this._top);
            });
          } else {
            contentElement.innerHTML = content.toString();
            this.position(this._left, this._top);
          }

          options.init && options.init.call(this);
        },
        lock: lock,
        drag: drag,
        resize: resize,
        okVal: options.okVal,
        cancelVal: options.cancelVal,
        ok: options.ok,
        cancel: options.cancel,
        close: function close() {
          var userCloseReturn;

          if (typeof options.close === "function") {
            userCloseReturn = options.close.call(this);
          }

          if (userCloseReturn !== false) {
            var _contentElement$paren2;

            var contentElement = this.content();

            /*#__PURE__*/
            React.isValidElement(content) && React.unmountComponentAtNode(contentElement);
            var dialogElement = (_contentElement$paren2 = contentElement.parentElement) === null || _contentElement$paren2 === void 0 ? void 0 : _contentElement$paren2.parentElement;
            dialogElement && classList.forEach(function (className) {
              dialogElement.classList.remove(className);
            });

            if (dialogElement && options.close === false) {
              dialogElement.classList.remove("without-close");
            }

            lock && enableBodyScroll(contentElement);
          }

          return userCloseReturn;
        }
      });
    };
    function callDialog(content) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return new Promise(function (resolve, reject) {
        var dialog;
        var ok = options.ok;
        var cancel = options.cancel;

        var confirmDialog = function confirmDialog(data) {
          resolve(data);
          dialog && dialog.close();
        };

        var cancelDialog = function cancelDialog(err) {
          reject(err);
          dialog && dialog.close();
        };

        if (ok) {
          options.ok = function () {
            return ok.call(this, confirmDialog);
          };
        }

        if (cancel) {
          options.cancel = function () {
            return cancel.call(this, cancelDialog);
          };
        }

        if (options.close === undefined) {
          options.close = reject;
        }

        dialog = getDialogInstance( /*#__PURE__*/React.isValidElement(content) ? /*#__PURE__*/React.cloneElement(content, {
          confirmDialog: confirmDialog,
          cancelDialog: cancelDialog
        }) : content, options);
      });
    }

    var DialogNoticeContent = function DialogNoticeContent(props) {
      var title = props.title,
          _props$type = props.type,
          type = _props$type === void 0 ? "info" : _props$type;
      var iconClassName = {
        "success": "icon-yes",
        "error": "icon-error",
        "warning": "icon-caution",
        "info": "icon-info"
      }[type];
      return /*#__PURE__*/React.createElement("div", {
        className: "ft-notice-content"
      }, /*#__PURE__*/React.createElement("i", {
        className: ["ft-icon", iconClassName].join(" ")
      }), /*#__PURE__*/React.createElement("div", {
        className: "notice-main"
      }, title && /*#__PURE__*/React.createElement("div", {
        className: "notice-title"
      }, title), /*#__PURE__*/React.createElement("div", {
        className: "notice-txt"
      }, props.children)));
    };

    var callNoticeDialog = function callNoticeDialog(content, options) {
      var _ref = options || {},
          _ref$classList = _ref.classList,
          classList = _ref$classList === void 0 ? [] : _ref$classList,
          type = _ref.type,
          title = _ref.title;

      return callDialog(type ? /*#__PURE__*/React.createElement(DialogNoticeContent, {
        title: title,
        type: type
      }, content) : content, _objectSpread(_objectSpread({
        ok: function ok(resolve) {
          resolve();
        },
        cancel: function cancel(reject) {
          reject();
        }
      }, options), {}, {
        title: false,
        classList: ['ft-notice-dialog'].concat(_toConsumableArray$1(classList))
      }));
    };

    var callConfirmDialog = callNoticeDialog;
    var callAlertDialog = function callAlertDialog(content, options) {
      return callNoticeDialog(content, _objectSpread(_objectSpread({}, options), {}, {
        cancel: undefined,
        close: false
      }));
    };

    exports.callAlertDialog = callAlertDialog;
    exports.callConfirmDialog = callConfirmDialog;
    exports.callDialog = callDialog;
    exports.getDialogInstance = getDialogInstance;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
