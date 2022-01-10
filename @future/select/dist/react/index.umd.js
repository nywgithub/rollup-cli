(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react')) :
  typeof define === 'function' && define.amd ? define(['exports', 'react'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.future = global.future || {}, global.React));
}(this, (function (exports, React) { 'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

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

  var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

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

  var hasOwnProperty = {}.hasOwnProperty;

  var has$9 = Object.hasOwn || function hasOwn(it, key) {
    return hasOwnProperty.call(toObject$2(it), key);
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

  var html$1 = getBuiltIn$1('document', 'documentElement');

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
  var html = html$1;
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
    html.appendChild(iframe);
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
  var ownKeys$2 = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
    var keys = getOwnPropertyNamesModule.f(anObject$1(it));
    var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
    return getOwnPropertySymbols ? keys.concat(getOwnPropertySymbols(it)) : keys;
  };

  var has$2 = has$9;
  var ownKeys = ownKeys$2;
  var getOwnPropertyDescriptorModule = objectGetOwnPropertyDescriptor;
  var definePropertyModule = objectDefineProperty;

  var copyConstructorProperties$1 = function (target, source) {
    var keys = ownKeys(source);
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

  const OptionGroup = props => {
    const {
      label,
      children
    } = props;
    return /*#__PURE__*/React__default['default'].createElement("div", {
      className: "select-optgroup"
    }, /*#__PURE__*/React__default['default'].createElement("div", {
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

    return /*#__PURE__*/React__default['default'].createElement("label", {
      className: classNames$1("ft-checkbox", className)
    }, /*#__PURE__*/React__default['default'].createElement("input", _extends$1({
      type: "checkbox"
    }, nativeRadioProps, {
      className: classNames$1(indeterminate && !checked && "is-indeterminate")
    })), /*#__PURE__*/React__default['default'].createElement("span", {
      className: "ft-checkbox-front"
    }), children && /*#__PURE__*/React__default['default'].createElement("span", {
      className: "ft-checkbox-label"
    }, children));
  };

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
    return /*#__PURE__*/React__default['default'].cloneElement(target, typeof children === "string" ? {
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
      _this.pickerRef = /*#__PURE__*/React.createRef();
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
        var suffixElement = suffix || /*#__PURE__*/React__default['default'].createElement(React__default['default'].Fragment, null, arrow && /*#__PURE__*/React__default['default'].createElement("i", {
          className: "ft-icon icon-down ".concat(namespace, "-arrow")
        }), clear && /*#__PURE__*/React__default['default'].createElement("i", {
          className: "ft-icon icon-error ".concat(namespace, "-clear"),
          onClick: this.handleClear
        }));
        var pickerClassNames = classNames("".concat(namespace), this.isDropdownVisible() && "open", disabled && "disabled", error && "error", className);
        return /*#__PURE__*/React__default['default'].createElement("div", _extends({
          className: pickerClassNames
        }, name ? {
          "data-name": name
        } : {}, {
          ref: this.pickerRef
        }), /*#__PURE__*/React__default['default'].createElement("div", {
          className: classNames("".concat(namespace, "-input"), clear && value && "".concat(namespace, "-with-clear"), !value && placeholder && "is-placeholder"),
          title: title,
          onClick: this.handleInputClick
        }, prefix && /*#__PURE__*/React__default['default'].createElement("div", {
          className: "".concat(namespace, "-prefix")
        }, prefix), appendHtmlChildren( /*#__PURE__*/React__default['default'].createElement("div", {
          className: "".concat(namespace, "-input-inner")
        }), value || /*#__PURE__*/React__default['default'].createElement(React__default['default'].Fragment, null, placeholder)), suffixElement && /*#__PURE__*/React__default['default'].createElement("div", {
          className: classNames("".concat(namespace, "-suffix"), !suffix && (arrow || clear) && "".concat(namespace, "-tools"))
        }, suffixElement)), /*#__PURE__*/React__default['default'].createElement("div", {
          className: "".concat(namespace, "-dropdown")
        }, children && ( /*#__PURE__*/React__default['default'].isValidElement(children) && typeof children.type !== 'string' && children.type !== React__default['default'].Fragment ? /*#__PURE__*/React__default['default'].cloneElement(children, {
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
  }(React__default['default'].Component);

  _defineProperty(Picker, "defaultProps", {
    namespace: "ft-picker"
  });

  class Select extends React__default['default'].Component {
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
      this.listRef = /*#__PURE__*/React.createRef();
      this.selectWrapperRef = /*#__PURE__*/React.createRef();
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
      return options.length > 0 && /*#__PURE__*/React__default['default'].createElement("ul", {
        className: "select-list-wrap"
      }, options.map(option => /*#__PURE__*/React__default['default'].createElement(React__default['default'].Fragment, {
        key: option.props.value
      }, /*#__PURE__*/React__default['default'].cloneElement(option, {
        optClassName: classNames$2(option.props.optClassName, multiple && "multiple-opt"),
        prefix: multiple && /*#__PURE__*/React__default['default'].createElement(Checkbox, {
          checked: this.isSelected(option.props.value)
        }),
        disabled: groupDisabled || option.props.disabled,
        selected: this.isSelected(option.props.value),
        onSelect: this.handleOptionSelect.bind(this)
      }))));
    }

    renderNativeOption(option) {
      return /*#__PURE__*/React__default['default'].createElement("option", {
        value: option.props.value,
        disabled: option.props.disabled,
        key: option.props.value
      }, this.getOptionLabel(option));
    }

    render() {
      const children = React__default['default'].Children.toArray(this.props.children);
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
      return /*#__PURE__*/React__default['default'].createElement(React__default['default'].Fragment, null, /*#__PURE__*/React__default['default'].createElement(Picker, {
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
      }, /*#__PURE__*/React__default['default'].createElement("div", {
        className: "select-list"
      }, listOfOptionsOrGroup.length > 0 && listOfOptionsOrGroup.map((optionsOrGroup, index) => /*#__PURE__*/React__default['default'].createElement(React__default['default'].Fragment, {
        key: index
      }, Array.isArray(optionsOrGroup) ? this.renderOptionList(optionsOrGroup) : /*#__PURE__*/React__default['default'].cloneElement(optionsOrGroup, {
        children: this.renderOptionList(optionsOrGroup.props.children, optionsOrGroup.props.disabled)
      }))))), multiple ? /*#__PURE__*/React__default['default'].createElement("input", {
        type: "hidden",
        name: name,
        value: Array.isArray(value) ? selectedFormat(value) : value
      }) : /*#__PURE__*/React__default['default'].createElement("select", {
        name: name,
        style: {
          display: "none"
        },
        defaultValue: value
      }, children.map(child => child.type === OptionGroup ? /*#__PURE__*/React__default['default'].createElement("optgroup", {
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

  class Option extends React__default['default'].Component {
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
      return /*#__PURE__*/React__default['default'].createElement("li", {
        className: className
      }, /*#__PURE__*/React__default['default'].createElement("a", {
        className: optClassNames,
        title: title,
        href: "#",
        onClick: this.handleClick.bind(this)
      }, prefix, children || label || value));
    }

    componentDidUpdate(prevProps, prevState, snapshot) {}

    componentDidMount() {}

  }

  exports.Option = Option;
  exports.OptionGroup = OptionGroup;
  exports.Select = Select;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
