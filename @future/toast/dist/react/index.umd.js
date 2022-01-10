(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react'), require('react-dom')) :
  typeof define === 'function' && define.amd ? define(['exports', 'react', 'react-dom'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.future = global.future || {}, global.React, global.ReactDOM));
}(this, (function (exports, React, ReactDOM) { 'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  function _interopNamespace(e) {
    if (e && e.__esModule) return e;
    var n = Object.create(null);
    if (e) {
      Object.keys(e).forEach(function (k) {
        if (k !== 'default') {
          var d = Object.getOwnPropertyDescriptor(e, k);
          Object.defineProperty(n, k, d.get ? d : {
            enumerable: true,
            get: function () {
              return e[k];
            }
          });
        }
      });
    }
    n['default'] = e;
    return Object.freeze(n);
  }

  var React__namespace = /*#__PURE__*/_interopNamespace(React);
  var ReactDOM__default = /*#__PURE__*/_interopDefaultLegacy(ReactDOM);

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

  var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  var check = function (it) {
    return it && it.Math == Math && it;
  };

  // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
  var global$j =
    // eslint-disable-next-line es/no-global-this -- safe
    check(typeof globalThis == 'object' && globalThis) ||
    check(typeof window == 'object' && window) ||
    // eslint-disable-next-line no-restricted-globals -- safe
    check(typeof self == 'object' && self) ||
    check(typeof commonjsGlobal == 'object' && commonjsGlobal) ||
    // eslint-disable-next-line no-new-func -- fallback
    (function () { return this; })() || Function('return this')();

  var objectGetOwnPropertyDescriptor = {};

  var fails$9 = function (exec) {
    try {
      return !!exec();
    } catch (error) {
      return true;
    }
  };

  var fails$8 = fails$9;

  // Detect IE8's incomplete defineProperty implementation
  var descriptors = !fails$8(function () {
    // eslint-disable-next-line es/no-object-defineproperty -- required for testing
    return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] != 7;
  });

  var objectPropertyIsEnumerable = {};

  var $propertyIsEnumerable = {}.propertyIsEnumerable;
  // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
  var getOwnPropertyDescriptor$2 = Object.getOwnPropertyDescriptor;

  // Nashorn ~ JDK8 bug
  var NASHORN_BUG = getOwnPropertyDescriptor$2 && !$propertyIsEnumerable.call({ 1: 2 }, 1);

  // `Object.prototype.propertyIsEnumerable` method implementation
  // https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
  objectPropertyIsEnumerable.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
    var descriptor = getOwnPropertyDescriptor$2(this, V);
    return !!descriptor && descriptor.enumerable;
  } : $propertyIsEnumerable;

  var createPropertyDescriptor$3 = function (bitmap, value) {
    return {
      enumerable: !(bitmap & 1),
      configurable: !(bitmap & 2),
      writable: !(bitmap & 4),
      value: value
    };
  };

  var toString = {}.toString;

  var classofRaw$1 = function (it) {
    return toString.call(it).slice(8, -1);
  };

  var fails$7 = fails$9;
  var classof$3 = classofRaw$1;

  var split = ''.split;

  // fallback for non-array-like ES3 and non-enumerable old V8 strings
  var indexedObject = fails$7(function () {
    // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
    // eslint-disable-next-line no-prototype-builtins -- safe
    return !Object('z').propertyIsEnumerable(0);
  }) ? function (it) {
    return classof$3(it) == 'String' ? split.call(it, '') : Object(it);
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

  var isObject$7 = function (it) {
    return typeof it === 'object' ? it !== null : typeof it === 'function';
  };

  var isObject$6 = isObject$7;

  // `ToPrimitive` abstract operation
  // https://tc39.es/ecma262/#sec-toprimitive
  // instead of the ES6 spec version, we didn't implement @@toPrimitive case
  // and the second argument - flag - preferred type is a string
  var toPrimitive$2 = function (input, PREFERRED_STRING) {
    if (!isObject$6(input)) return input;
    var fn, val;
    if (PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject$6(val = fn.call(input))) return val;
    if (typeof (fn = input.valueOf) == 'function' && !isObject$6(val = fn.call(input))) return val;
    if (!PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject$6(val = fn.call(input))) return val;
    throw TypeError("Can't convert object to primitive value");
  };

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

  var global$i = global$j;
  var isObject$5 = isObject$7;

  var document$3 = global$i.document;
  // typeof document.createElement is 'object' in old IE
  var EXISTS = isObject$5(document$3) && isObject$5(document$3.createElement);

  var documentCreateElement$1 = function (it) {
    return EXISTS ? document$3.createElement(it) : {};
  };

  var DESCRIPTORS$5 = descriptors;
  var fails$6 = fails$9;
  var createElement$1 = documentCreateElement$1;

  // Thank's IE8 for his funny defineProperty
  var ie8DomDefine = !DESCRIPTORS$5 && !fails$6(function () {
    // eslint-disable-next-line es/no-object-defineproperty -- requied for testing
    return Object.defineProperty(createElement$1('div'), 'a', {
      get: function () { return 7; }
    }).a != 7;
  });

  var DESCRIPTORS$4 = descriptors;
  var propertyIsEnumerableModule = objectPropertyIsEnumerable;
  var createPropertyDescriptor$2 = createPropertyDescriptor$3;
  var toIndexedObject$3 = toIndexedObject$4;
  var toPrimitive$1 = toPrimitive$2;
  var has$8 = has$9;
  var IE8_DOM_DEFINE$1 = ie8DomDefine;

  // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
  var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

  // `Object.getOwnPropertyDescriptor` method
  // https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
  objectGetOwnPropertyDescriptor.f = DESCRIPTORS$4 ? $getOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
    O = toIndexedObject$3(O);
    P = toPrimitive$1(P, true);
    if (IE8_DOM_DEFINE$1) try {
      return $getOwnPropertyDescriptor(O, P);
    } catch (error) { /* empty */ }
    if (has$8(O, P)) return createPropertyDescriptor$2(!propertyIsEnumerableModule.f.call(O, P), O[P]);
  };

  var objectDefineProperty = {};

  var isObject$4 = isObject$7;

  var anObject$9 = function (it) {
    if (!isObject$4(it)) {
      throw TypeError(String(it) + ' is not an object');
    } return it;
  };

  var DESCRIPTORS$3 = descriptors;
  var IE8_DOM_DEFINE = ie8DomDefine;
  var anObject$8 = anObject$9;
  var toPrimitive = toPrimitive$2;

  // eslint-disable-next-line es/no-object-defineproperty -- safe
  var $defineProperty = Object.defineProperty;

  // `Object.defineProperty` method
  // https://tc39.es/ecma262/#sec-object.defineproperty
  objectDefineProperty.f = DESCRIPTORS$3 ? $defineProperty : function defineProperty(O, P, Attributes) {
    anObject$8(O);
    P = toPrimitive(P, true);
    anObject$8(Attributes);
    if (IE8_DOM_DEFINE) try {
      return $defineProperty(O, P, Attributes);
    } catch (error) { /* empty */ }
    if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
    if ('value' in Attributes) O[P] = Attributes.value;
    return O;
  };

  var DESCRIPTORS$2 = descriptors;
  var definePropertyModule$4 = objectDefineProperty;
  var createPropertyDescriptor$1 = createPropertyDescriptor$3;

  var createNonEnumerableProperty$7 = DESCRIPTORS$2 ? function (object, key, value) {
    return definePropertyModule$4.f(object, key, createPropertyDescriptor$1(1, value));
  } : function (object, key, value) {
    object[key] = value;
    return object;
  };

  var redefine$4 = {exports: {}};

  var global$h = global$j;
  var createNonEnumerableProperty$6 = createNonEnumerableProperty$7;

  var setGlobal$3 = function (key, value) {
    try {
      createNonEnumerableProperty$6(global$h, key, value);
    } catch (error) {
      global$h[key] = value;
    } return value;
  };

  var global$g = global$j;
  var setGlobal$2 = setGlobal$3;

  var SHARED = '__core-js_shared__';
  var store$3 = global$g[SHARED] || setGlobal$2(SHARED, {});

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

  var global$f = global$j;
  var inspectSource$2 = inspectSource$3;

  var WeakMap$2 = global$f.WeakMap;

  var nativeWeakMap = typeof WeakMap$2 === 'function' && /native code/.test(inspectSource$2(WeakMap$2));

  var shared$3 = {exports: {}};

  var store$1 = sharedStore;

  (shared$3.exports = function (key, value) {
    return store$1[key] || (store$1[key] = value !== undefined ? value : {});
  })('versions', []).push({
    version: '3.15.2',
    mode: 'global',
    copyright: '© 2021 Denis Pushkarev (zloirock.ru)'
  });

  var id = 0;
  var postfix = Math.random();

  var uid$2 = function (key) {
    return 'Symbol(' + String(key === undefined ? '' : key) + ')_' + (++id + postfix).toString(36);
  };

  var shared$2 = shared$3.exports;
  var uid$1 = uid$2;

  var keys = shared$2('keys');

  var sharedKey$3 = function (key) {
    return keys[key] || (keys[key] = uid$1(key));
  };

  var hiddenKeys$4 = {};

  var NATIVE_WEAK_MAP = nativeWeakMap;
  var global$e = global$j;
  var isObject$3 = isObject$7;
  var createNonEnumerableProperty$5 = createNonEnumerableProperty$7;
  var objectHas = has$9;
  var shared$1 = sharedStore;
  var sharedKey$2 = sharedKey$3;
  var hiddenKeys$3 = hiddenKeys$4;

  var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
  var WeakMap$1 = global$e.WeakMap;
  var set$1, get, has$7;

  var enforce = function (it) {
    return has$7(it) ? get(it) : set$1(it, {});
  };

  var getterFor = function (TYPE) {
    return function (it) {
      var state;
      if (!isObject$3(it) || (state = get(it)).type !== TYPE) {
        throw TypeError('Incompatible receiver, ' + TYPE + ' required');
      } return state;
    };
  };

  if (NATIVE_WEAK_MAP || shared$1.state) {
    var store = shared$1.state || (shared$1.state = new WeakMap$1());
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
    has$7 = function (it) {
      return wmhas.call(store, it);
    };
  } else {
    var STATE = sharedKey$2('state');
    hiddenKeys$3[STATE] = true;
    set$1 = function (it, metadata) {
      if (objectHas(it, STATE)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
      metadata.facade = it;
      createNonEnumerableProperty$5(it, STATE, metadata);
      return metadata;
    };
    get = function (it) {
      return objectHas(it, STATE) ? it[STATE] : {};
    };
    has$7 = function (it) {
      return objectHas(it, STATE);
    };
  }

  var internalState = {
    set: set$1,
    get: get,
    has: has$7,
    enforce: enforce,
    getterFor: getterFor
  };

  var global$d = global$j;
  var createNonEnumerableProperty$4 = createNonEnumerableProperty$7;
  var has$6 = has$9;
  var setGlobal$1 = setGlobal$3;
  var inspectSource$1 = inspectSource$3;
  var InternalStateModule$2 = internalState;

  var getInternalState$2 = InternalStateModule$2.get;
  var enforceInternalState = InternalStateModule$2.enforce;
  var TEMPLATE = String(String).split('String');

  (redefine$4.exports = function (O, key, value, options) {
    var unsafe = options ? !!options.unsafe : false;
    var simple = options ? !!options.enumerable : false;
    var noTargetGet = options ? !!options.noTargetGet : false;
    var state;
    if (typeof value == 'function') {
      if (typeof key == 'string' && !has$6(value, 'name')) {
        createNonEnumerableProperty$4(value, 'name', key);
      }
      state = enforceInternalState(value);
      if (!state.source) {
        state.source = TEMPLATE.join(typeof key == 'string' ? key : '');
      }
    }
    if (O === global$d) {
      if (simple) O[key] = value;
      else setGlobal$1(key, value);
      return;
    } else if (!unsafe) {
      delete O[key];
    } else if (!noTargetGet && O[key]) {
      simple = true;
    }
    if (simple) O[key] = value;
    else createNonEnumerableProperty$4(O, key, value);
  // add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
  })(Function.prototype, 'toString', function toString() {
    return typeof this == 'function' && getInternalState$2(this).source || inspectSource$1(this);
  });

  var global$c = global$j;

  var path$1 = global$c;

  var path = path$1;
  var global$b = global$j;

  var aFunction$6 = function (variable) {
    return typeof variable == 'function' ? variable : undefined;
  };

  var getBuiltIn$5 = function (namespace, method) {
    return arguments.length < 2 ? aFunction$6(path[namespace]) || aFunction$6(global$b[namespace])
      : path[namespace] && path[namespace][method] || global$b[namespace] && global$b[namespace][method];
  };

  var objectGetOwnPropertyNames = {};

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
  var toLength$3 = function (argument) {
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

  var toIndexedObject$2 = toIndexedObject$4;
  var toLength$2 = toLength$3;
  var toAbsoluteIndex = toAbsoluteIndex$1;

  // `Array.prototype.{ indexOf, includes }` methods implementation
  var createMethod$1 = function (IS_INCLUDES) {
    return function ($this, el, fromIndex) {
      var O = toIndexedObject$2($this);
      var length = toLength$2(O.length);
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

  var has$5 = has$9;
  var toIndexedObject$1 = toIndexedObject$4;
  var indexOf = arrayIncludes.indexOf;
  var hiddenKeys$2 = hiddenKeys$4;

  var objectKeysInternal = function (object, names) {
    var O = toIndexedObject$1(object);
    var i = 0;
    var result = [];
    var key;
    for (key in O) !has$5(hiddenKeys$2, key) && has$5(O, key) && result.push(key);
    // Don't enum bug & hidden keys
    while (names.length > i) if (has$5(O, key = names[i++])) {
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

  var hiddenKeys$1 = enumBugKeys$2.concat('length', 'prototype');

  // `Object.getOwnPropertyNames` method
  // https://tc39.es/ecma262/#sec-object.getownpropertynames
  // eslint-disable-next-line es/no-object-getownpropertynames -- safe
  objectGetOwnPropertyNames.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
    return internalObjectKeys$1(O, hiddenKeys$1);
  };

  var objectGetOwnPropertySymbols = {};

  // eslint-disable-next-line es/no-object-getownpropertysymbols -- safe
  objectGetOwnPropertySymbols.f = Object.getOwnPropertySymbols;

  var getBuiltIn$4 = getBuiltIn$5;
  var getOwnPropertyNamesModule = objectGetOwnPropertyNames;
  var getOwnPropertySymbolsModule = objectGetOwnPropertySymbols;
  var anObject$7 = anObject$9;

  // all object keys, includes non-enumerable and symbols
  var ownKeys$4 = getBuiltIn$4('Reflect', 'ownKeys') || function ownKeys(it) {
    var keys = getOwnPropertyNamesModule.f(anObject$7(it));
    var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
    return getOwnPropertySymbols ? keys.concat(getOwnPropertySymbols(it)) : keys;
  };

  var has$4 = has$9;
  var ownKeys$3 = ownKeys$4;
  var getOwnPropertyDescriptorModule = objectGetOwnPropertyDescriptor;
  var definePropertyModule$3 = objectDefineProperty;

  var copyConstructorProperties$1 = function (target, source) {
    var keys = ownKeys$3(source);
    var defineProperty = definePropertyModule$3.f;
    var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      if (!has$4(target, key)) defineProperty(target, key, getOwnPropertyDescriptor(source, key));
    }
  };

  var fails$5 = fails$9;

  var replacement = /#|\.prototype\./;

  var isForced$2 = function (feature, detection) {
    var value = data[normalize(feature)];
    return value == POLYFILL ? true
      : value == NATIVE ? false
      : typeof detection == 'function' ? fails$5(detection)
      : !!detection;
  };

  var normalize = isForced$2.normalize = function (string) {
    return String(string).replace(replacement, '.').toLowerCase();
  };

  var data = isForced$2.data = {};
  var NATIVE = isForced$2.NATIVE = 'N';
  var POLYFILL = isForced$2.POLYFILL = 'P';

  var isForced_1 = isForced$2;

  var global$a = global$j;
  var getOwnPropertyDescriptor$1 = objectGetOwnPropertyDescriptor.f;
  var createNonEnumerableProperty$3 = createNonEnumerableProperty$7;
  var redefine$3 = redefine$4.exports;
  var setGlobal = setGlobal$3;
  var copyConstructorProperties = copyConstructorProperties$1;
  var isForced$1 = isForced_1;

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
      target = global$a;
    } else if (STATIC) {
      target = global$a[TARGET] || setGlobal(TARGET, {});
    } else {
      target = (global$a[TARGET] || {}).prototype;
    }
    if (target) for (key in source) {
      sourceProperty = source[key];
      if (options.noTargetGet) {
        descriptor = getOwnPropertyDescriptor$1(target, key);
        targetProperty = descriptor && descriptor.value;
      } else targetProperty = target[key];
      FORCED = isForced$1(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
      // contained in target
      if (!FORCED && targetProperty !== undefined) {
        if (typeof sourceProperty === typeof targetProperty) continue;
        copyConstructorProperties(sourceProperty, targetProperty);
      }
      // add a flag to not completely full polyfills
      if (options.sham || (targetProperty && targetProperty.sham)) {
        createNonEnumerableProperty$3(sourceProperty, 'sham', true);
      }
      // extend global
      redefine$3(target, key, sourceProperty, options);
    }
  };

  var global$9 = global$j;

  var nativePromiseConstructor = global$9.Promise;

  var redefine$2 = redefine$4.exports;

  var redefineAll$1 = function (target, src, options) {
    for (var key in src) redefine$2(target, key, src[key], options);
    return target;
  };

  var isObject$2 = isObject$7;

  var aPossiblePrototype$1 = function (it) {
    if (!isObject$2(it) && it !== null) {
      throw TypeError("Can't set " + String(it) + ' as a prototype');
    } return it;
  };

  /* eslint-disable no-proto -- safe */

  var anObject$6 = anObject$9;
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
      anObject$6(O);
      aPossiblePrototype(proto);
      if (CORRECT_SETTER) setter.call(O, proto);
      else O.__proto__ = proto;
      return O;
    };
  }() : undefined);

  var getBuiltIn$3 = getBuiltIn$5;

  var engineUserAgent = getBuiltIn$3('navigator', 'userAgent') || '';

  var global$8 = global$j;
  var userAgent$2 = engineUserAgent;

  var process$3 = global$8.process;
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

  var V8_VERSION$1 = engineV8Version;
  var fails$4 = fails$9;

  // eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing
  var nativeSymbol = !!Object.getOwnPropertySymbols && !fails$4(function () {
    var symbol = Symbol();
    // Chrome 38 Symbol has incorrect toString conversion
    // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances
    return !String(symbol) || !(Object(symbol) instanceof Symbol) ||
      // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
      !Symbol.sham && V8_VERSION$1 && V8_VERSION$1 < 41;
  });

  /* eslint-disable es/no-symbol -- required for testing */

  var NATIVE_SYMBOL$1 = nativeSymbol;

  var useSymbolAsUid = NATIVE_SYMBOL$1
    && !Symbol.sham
    && typeof Symbol.iterator == 'symbol';

  var global$7 = global$j;
  var shared = shared$3.exports;
  var has$3 = has$9;
  var uid = uid$2;
  var NATIVE_SYMBOL = nativeSymbol;
  var USE_SYMBOL_AS_UID = useSymbolAsUid;

  var WellKnownSymbolsStore = shared('wks');
  var Symbol$1 = global$7.Symbol;
  var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol$1 : Symbol$1 && Symbol$1.withoutSetter || uid;

  var wellKnownSymbol$d = function (name) {
    if (!has$3(WellKnownSymbolsStore, name) || !(NATIVE_SYMBOL || typeof WellKnownSymbolsStore[name] == 'string')) {
      if (NATIVE_SYMBOL && has$3(Symbol$1, name)) {
        WellKnownSymbolsStore[name] = Symbol$1[name];
      } else {
        WellKnownSymbolsStore[name] = createWellKnownSymbol('Symbol.' + name);
      }
    } return WellKnownSymbolsStore[name];
  };

  var defineProperty = objectDefineProperty.f;
  var has$2 = has$9;
  var wellKnownSymbol$c = wellKnownSymbol$d;

  var TO_STRING_TAG$3 = wellKnownSymbol$c('toStringTag');

  var setToStringTag$3 = function (it, TAG, STATIC) {
    if (it && !has$2(it = STATIC ? it : it.prototype, TO_STRING_TAG$3)) {
      defineProperty(it, TO_STRING_TAG$3, { configurable: true, value: TAG });
    }
  };

  var getBuiltIn$2 = getBuiltIn$5;
  var definePropertyModule$2 = objectDefineProperty;
  var wellKnownSymbol$b = wellKnownSymbol$d;
  var DESCRIPTORS$1 = descriptors;

  var SPECIES$2 = wellKnownSymbol$b('species');

  var setSpecies$1 = function (CONSTRUCTOR_NAME) {
    var Constructor = getBuiltIn$2(CONSTRUCTOR_NAME);
    var defineProperty = definePropertyModule$2.f;

    if (DESCRIPTORS$1 && Constructor && !Constructor[SPECIES$2]) {
      defineProperty(Constructor, SPECIES$2, {
        configurable: true,
        get: function () { return this; }
      });
    }
  };

  var aFunction$5 = function (it) {
    if (typeof it != 'function') {
      throw TypeError(String(it) + ' is not a function');
    } return it;
  };

  var anInstance$1 = function (it, Constructor, name) {
    if (!(it instanceof Constructor)) {
      throw TypeError('Incorrect ' + (name ? name + ' ' : '') + 'invocation');
    } return it;
  };

  var iterators = {};

  var wellKnownSymbol$a = wellKnownSymbol$d;
  var Iterators$4 = iterators;

  var ITERATOR$5 = wellKnownSymbol$a('iterator');
  var ArrayPrototype$1 = Array.prototype;

  // check on default Array iterator
  var isArrayIteratorMethod$1 = function (it) {
    return it !== undefined && (Iterators$4.Array === it || ArrayPrototype$1[ITERATOR$5] === it);
  };

  var aFunction$4 = aFunction$5;

  // optional / simple context binding
  var functionBindContext = function (fn, that, length) {
    aFunction$4(fn);
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

  var wellKnownSymbol$9 = wellKnownSymbol$d;

  var TO_STRING_TAG$2 = wellKnownSymbol$9('toStringTag');
  var test = {};

  test[TO_STRING_TAG$2] = 'z';

  var toStringTagSupport = String(test) === '[object z]';

  var TO_STRING_TAG_SUPPORT = toStringTagSupport;
  var classofRaw = classofRaw$1;
  var wellKnownSymbol$8 = wellKnownSymbol$d;

  var TO_STRING_TAG$1 = wellKnownSymbol$8('toStringTag');
  // ES3 wrong here
  var CORRECT_ARGUMENTS = classofRaw(function () { return arguments; }()) == 'Arguments';

  // fallback for IE11 Script Access Denied error
  var tryGet = function (it, key) {
    try {
      return it[key];
    } catch (error) { /* empty */ }
  };

  // getting tag from ES6+ `Object.prototype.toString`
  var classof$2 = TO_STRING_TAG_SUPPORT ? classofRaw : function (it) {
    var O, tag, result;
    return it === undefined ? 'Undefined' : it === null ? 'Null'
      // @@toStringTag case
      : typeof (tag = tryGet(O = Object(it), TO_STRING_TAG$1)) == 'string' ? tag
      // builtinTag case
      : CORRECT_ARGUMENTS ? classofRaw(O)
      // ES3 arguments fallback
      : (result = classofRaw(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : result;
  };

  var classof$1 = classof$2;
  var Iterators$3 = iterators;
  var wellKnownSymbol$7 = wellKnownSymbol$d;

  var ITERATOR$4 = wellKnownSymbol$7('iterator');

  var getIteratorMethod$1 = function (it) {
    if (it != undefined) return it[ITERATOR$4]
      || it['@@iterator']
      || Iterators$3[classof$1(it)];
  };

  var anObject$5 = anObject$9;

  var iteratorClose$1 = function (iterator) {
    var returnMethod = iterator['return'];
    if (returnMethod !== undefined) {
      return anObject$5(returnMethod.call(iterator)).value;
    }
  };

  var anObject$4 = anObject$9;
  var isArrayIteratorMethod = isArrayIteratorMethod$1;
  var toLength$1 = toLength$3;
  var bind$2 = functionBindContext;
  var getIteratorMethod = getIteratorMethod$1;
  var iteratorClose = iteratorClose$1;

  var Result = function (stopped, result) {
    this.stopped = stopped;
    this.result = result;
  };

  var iterate$1 = function (iterable, unboundFunction, options) {
    var that = options && options.that;
    var AS_ENTRIES = !!(options && options.AS_ENTRIES);
    var IS_ITERATOR = !!(options && options.IS_ITERATOR);
    var INTERRUPTED = !!(options && options.INTERRUPTED);
    var fn = bind$2(unboundFunction, that, 1 + AS_ENTRIES + INTERRUPTED);
    var iterator, iterFn, index, length, result, next, step;

    var stop = function (condition) {
      if (iterator) iteratorClose(iterator);
      return new Result(true, condition);
    };

    var callFn = function (value) {
      if (AS_ENTRIES) {
        anObject$4(value);
        return INTERRUPTED ? fn(value[0], value[1], stop) : fn(value[0], value[1]);
      } return INTERRUPTED ? fn(value, stop) : fn(value);
    };

    if (IS_ITERATOR) {
      iterator = iterable;
    } else {
      iterFn = getIteratorMethod(iterable);
      if (typeof iterFn != 'function') throw TypeError('Target is not iterable');
      // optimisation for array iterators
      if (isArrayIteratorMethod(iterFn)) {
        for (index = 0, length = toLength$1(iterable.length); length > index; index++) {
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
        iteratorClose(iterator);
        throw error;
      }
      if (typeof result == 'object' && result && result instanceof Result) return result;
    } return new Result(false);
  };

  var wellKnownSymbol$6 = wellKnownSymbol$d;

  var ITERATOR$3 = wellKnownSymbol$6('iterator');
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

  var checkCorrectnessOfIteration$1 = function (exec, SKIP_CLOSING) {
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

  var anObject$3 = anObject$9;
  var aFunction$3 = aFunction$5;
  var wellKnownSymbol$5 = wellKnownSymbol$d;

  var SPECIES$1 = wellKnownSymbol$5('species');

  // `SpeciesConstructor` abstract operation
  // https://tc39.es/ecma262/#sec-speciesconstructor
  var speciesConstructor$1 = function (O, defaultConstructor) {
    var C = anObject$3(O).constructor;
    var S;
    return C === undefined || (S = anObject$3(C)[SPECIES$1]) == undefined ? defaultConstructor : aFunction$3(S);
  };

  var getBuiltIn$1 = getBuiltIn$5;

  var html$2 = getBuiltIn$1('document', 'documentElement');

  var userAgent$1 = engineUserAgent;

  var engineIsIos = /(?:iphone|ipod|ipad).*applewebkit/i.test(userAgent$1);

  var classof = classofRaw$1;
  var global$6 = global$j;

  var engineIsNode = classof(global$6.process) == 'process';

  var global$5 = global$j;
  var fails$3 = fails$9;
  var bind$1 = functionBindContext;
  var html$1 = html$2;
  var createElement = documentCreateElement$1;
  var IS_IOS$1 = engineIsIos;
  var IS_NODE$3 = engineIsNode;

  var location = global$5.location;
  var set = global$5.setImmediate;
  var clear = global$5.clearImmediate;
  var process$2 = global$5.process;
  var MessageChannel = global$5.MessageChannel;
  var Dispatch = global$5.Dispatch;
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
    global$5.postMessage(id + '', location.protocol + '//' + location.host);
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
    if (IS_NODE$3) {
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
      defer = bind$1(port.postMessage, port, 1);
    // Browsers with postMessage, skip WebWorkers
    // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
    } else if (
      global$5.addEventListener &&
      typeof postMessage == 'function' &&
      !global$5.importScripts &&
      location && location.protocol !== 'file:' &&
      !fails$3(post)
    ) {
      defer = post;
      global$5.addEventListener('message', listener, false);
    // IE8-
    } else if (ONREADYSTATECHANGE in createElement('script')) {
      defer = function (id) {
        html$1.appendChild(createElement('script'))[ONREADYSTATECHANGE] = function () {
          html$1.removeChild(this);
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

  var global$4 = global$j;
  var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;
  var macrotask = task$1.set;
  var IS_IOS = engineIsIos;
  var IS_WEBOS_WEBKIT = engineIsWebosWebkit;
  var IS_NODE$2 = engineIsNode;

  var MutationObserver = global$4.MutationObserver || global$4.WebKitMutationObserver;
  var document$2 = global$4.document;
  var process$1 = global$4.process;
  var Promise$1 = global$4.Promise;
  // Node.js 11 shows ExperimentalWarning on getting `queueMicrotask`
  var queueMicrotaskDescriptor = getOwnPropertyDescriptor(global$4, 'queueMicrotask');
  var queueMicrotask = queueMicrotaskDescriptor && queueMicrotaskDescriptor.value;

  var flush, head, last, notify$1, toggle, node, promise, then;

  // modern engines have queueMicrotask method
  if (!queueMicrotask) {
    flush = function () {
      var parent, fn;
      if (IS_NODE$2 && (parent = process$1.domain)) parent.exit();
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
    if (!IS_IOS && !IS_NODE$2 && !IS_WEBOS_WEBKIT && MutationObserver && document$2) {
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
    } else if (IS_NODE$2) {
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
        macrotask.call(global$4, flush);
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

  var aFunction$2 = aFunction$5;

  var PromiseCapability = function (C) {
    var resolve, reject;
    this.promise = new C(function ($$resolve, $$reject) {
      if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
      resolve = $$resolve;
      reject = $$reject;
    });
    this.resolve = aFunction$2(resolve);
    this.reject = aFunction$2(reject);
  };

  // `NewPromiseCapability` abstract operation
  // https://tc39.es/ecma262/#sec-newpromisecapability
  newPromiseCapability$2.f = function (C) {
    return new PromiseCapability(C);
  };

  var anObject$2 = anObject$9;
  var isObject$1 = isObject$7;
  var newPromiseCapability$1 = newPromiseCapability$2;

  var promiseResolve$1 = function (C, x) {
    anObject$2(C);
    if (isObject$1(x) && x.constructor === C) return x;
    var promiseCapability = newPromiseCapability$1.f(C);
    var resolve = promiseCapability.resolve;
    resolve(x);
    return promiseCapability.promise;
  };

  var global$3 = global$j;

  var hostReportErrors$1 = function (a, b) {
    var console = global$3.console;
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

  var $$2 = _export;
  var global$2 = global$j;
  var getBuiltIn = getBuiltIn$5;
  var NativePromise = nativePromiseConstructor;
  var redefine$1 = redefine$4.exports;
  var redefineAll = redefineAll$1;
  var setPrototypeOf$1 = objectSetPrototypeOf;
  var setToStringTag$2 = setToStringTag$3;
  var setSpecies = setSpecies$1;
  var isObject = isObject$7;
  var aFunction$1 = aFunction$5;
  var anInstance = anInstance$1;
  var inspectSource = inspectSource$3;
  var iterate = iterate$1;
  var checkCorrectnessOfIteration = checkCorrectnessOfIteration$1;
  var speciesConstructor = speciesConstructor$1;
  var task = task$1.set;
  var microtask = microtask$1;
  var promiseResolve = promiseResolve$1;
  var hostReportErrors = hostReportErrors$1;
  var newPromiseCapabilityModule = newPromiseCapability$2;
  var perform = perform$1;
  var InternalStateModule$1 = internalState;
  var isForced = isForced_1;
  var wellKnownSymbol$4 = wellKnownSymbol$d;
  var IS_BROWSER = engineIsBrowser;
  var IS_NODE$1 = engineIsNode;
  var V8_VERSION = engineV8Version;

  var SPECIES = wellKnownSymbol$4('species');
  var PROMISE = 'Promise';
  var getInternalState$1 = InternalStateModule$1.get;
  var setInternalState$1 = InternalStateModule$1.set;
  var getInternalPromiseState = InternalStateModule$1.getterFor(PROMISE);
  var NativePromisePrototype = NativePromise && NativePromise.prototype;
  var PromiseConstructor = NativePromise;
  var PromiseConstructorPrototype = NativePromisePrototype;
  var TypeError$1 = global$2.TypeError;
  var document$1 = global$2.document;
  var process = global$2.process;
  var newPromiseCapability = newPromiseCapabilityModule.f;
  var newGenericPromiseCapability = newPromiseCapability;
  var DISPATCH_EVENT = !!(document$1 && document$1.createEvent && global$2.dispatchEvent);
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

  var FORCED = isForced(PROMISE, function () {
    var PROMISE_CONSTRUCTOR_SOURCE = inspectSource(PromiseConstructor);
    var GLOBAL_CORE_JS_PROMISE = PROMISE_CONSTRUCTOR_SOURCE !== String(PromiseConstructor);
    // V8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
    // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
    // We can't detect it synchronously, so just check versions
    if (!GLOBAL_CORE_JS_PROMISE && V8_VERSION === 66) return true;
    // We can't use @@species feature detection in V8 since it causes
    // deoptimization and performance degradation
    // https://github.com/zloirock/core-js/issues/679
    if (V8_VERSION >= 51 && /native code/.test(PROMISE_CONSTRUCTOR_SOURCE)) return false;
    // Detect correctness of subclassing with @@species support
    var promise = new PromiseConstructor(function (resolve) { resolve(1); });
    var FakePromise = function (exec) {
      exec(function () { /* empty */ }, function () { /* empty */ });
    };
    var constructor = promise.constructor = {};
    constructor[SPECIES] = FakePromise;
    SUBCLASSING = promise.then(function () { /* empty */ }) instanceof FakePromise;
    if (!SUBCLASSING) return true;
    // Unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    return !GLOBAL_CORE_JS_PROMISE && IS_BROWSER && !NATIVE_REJECTION_EVENT;
  });

  var INCORRECT_ITERATION = FORCED || !checkCorrectnessOfIteration(function (iterable) {
    PromiseConstructor.all(iterable)['catch'](function () { /* empty */ });
  });

  // helpers
  var isThenable = function (it) {
    var then;
    return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
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
      global$2.dispatchEvent(event);
    } else event = { promise: promise, reason: reason };
    if (!NATIVE_REJECTION_EVENT && (handler = global$2['on' + name])) handler(event);
    else if (name === UNHANDLED_REJECTION) hostReportErrors('Unhandled promise rejection', reason);
  };

  var onUnhandled = function (state) {
    task.call(global$2, function () {
      var promise = state.facade;
      var value = state.value;
      var IS_UNHANDLED = isUnhandled(state);
      var result;
      if (IS_UNHANDLED) {
        result = perform(function () {
          if (IS_NODE$1) {
            process.emit('unhandledRejection', value, promise);
          } else dispatchEvent(UNHANDLED_REJECTION, promise, value);
        });
        // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
        state.rejection = IS_NODE$1 || isUnhandled(state) ? UNHANDLED : HANDLED;
        if (result.error) throw result.value;
      }
    });
  };

  var isUnhandled = function (state) {
    return state.rejection !== HANDLED && !state.parent;
  };

  var onHandleUnhandled = function (state) {
    task.call(global$2, function () {
      var promise = state.facade;
      if (IS_NODE$1) {
        process.emit('rejectionHandled', promise);
      } else dispatchEvent(REJECTION_HANDLED, promise, state.value);
    });
  };

  var bind = function (fn, state, unwrap) {
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
              bind(internalResolve, wrapper, state),
              bind(internalReject, wrapper, state)
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
  if (FORCED) {
    // 25.4.3.1 Promise(executor)
    PromiseConstructor = function Promise(executor) {
      anInstance(this, PromiseConstructor, PROMISE);
      aFunction$1(executor);
      Internal.call(this);
      var state = getInternalState$1(this);
      try {
        executor(bind(internalResolve, state), bind(internalReject, state));
      } catch (error) {
        internalReject(state, error);
      }
    };
    PromiseConstructorPrototype = PromiseConstructor.prototype;
    // eslint-disable-next-line no-unused-vars -- required for `.length`
    Internal = function Promise(executor) {
      setInternalState$1(this, {
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
    Internal.prototype = redefineAll(PromiseConstructorPrototype, {
      // `Promise.prototype.then` method
      // https://tc39.es/ecma262/#sec-promise.prototype.then
      then: function then(onFulfilled, onRejected) {
        var state = getInternalPromiseState(this);
        var reaction = newPromiseCapability(speciesConstructor(this, PromiseConstructor));
        reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
        reaction.fail = typeof onRejected == 'function' && onRejected;
        reaction.domain = IS_NODE$1 ? process.domain : undefined;
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
      var state = getInternalState$1(promise);
      this.promise = promise;
      this.resolve = bind(internalResolve, state);
      this.reject = bind(internalReject, state);
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
        redefine$1(NativePromisePrototype, 'then', function then(onFulfilled, onRejected) {
          var that = this;
          return new PromiseConstructor(function (resolve, reject) {
            nativeThen.call(that, resolve, reject);
          }).then(onFulfilled, onRejected);
        // https://github.com/zloirock/core-js/issues/640
        }, { unsafe: true });

        // makes sure that native promise-based APIs `Promise#catch` properly works with patched `Promise#then`
        redefine$1(NativePromisePrototype, 'catch', PromiseConstructorPrototype['catch'], { unsafe: true });
      }

      // make `.constructor === Promise` work for native promise-based APIs
      try {
        delete NativePromisePrototype.constructor;
      } catch (error) { /* empty */ }

      // make `instanceof Promise` work for native promise-based APIs
      if (setPrototypeOf$1) {
        setPrototypeOf$1(NativePromisePrototype, PromiseConstructorPrototype);
      }
    }
  }

  $$2({ global: true, wrap: true, forced: FORCED }, {
    Promise: PromiseConstructor
  });

  setToStringTag$2(PromiseConstructor, PROMISE, false);
  setSpecies(PROMISE);

  PromiseWrapper = getBuiltIn(PROMISE);

  // statics
  $$2({ target: PROMISE, stat: true, forced: FORCED }, {
    // `Promise.reject` method
    // https://tc39.es/ecma262/#sec-promise.reject
    reject: function reject(r) {
      var capability = newPromiseCapability(this);
      capability.reject.call(undefined, r);
      return capability.promise;
    }
  });

  $$2({ target: PROMISE, stat: true, forced: FORCED }, {
    // `Promise.resolve` method
    // https://tc39.es/ecma262/#sec-promise.resolve
    resolve: function resolve(x) {
      return promiseResolve(this, x);
    }
  });

  $$2({ target: PROMISE, stat: true, forced: INCORRECT_ITERATION }, {
    // `Promise.all` method
    // https://tc39.es/ecma262/#sec-promise.all
    all: function all(iterable) {
      var C = this;
      var capability = newPromiseCapability(C);
      var resolve = capability.resolve;
      var reject = capability.reject;
      var result = perform(function () {
        var $promiseResolve = aFunction$1(C.resolve);
        var values = [];
        var counter = 0;
        var remaining = 1;
        iterate(iterable, function (promise) {
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
        var $promiseResolve = aFunction$1(C.resolve);
        iterate(iterable, function (promise) {
          $promiseResolve.call(C, promise).then(capability.resolve, reject);
        });
      });
      if (result.error) reject(result.value);
      return capability.promise;
    }
  });

  var internalObjectKeys = objectKeysInternal;
  var enumBugKeys$1 = enumBugKeys$3;

  // `Object.keys` method
  // https://tc39.es/ecma262/#sec-object.keys
  // eslint-disable-next-line es/no-object-keys -- safe
  var objectKeys$1 = Object.keys || function keys(O) {
    return internalObjectKeys(O, enumBugKeys$1);
  };

  var DESCRIPTORS = descriptors;
  var definePropertyModule$1 = objectDefineProperty;
  var anObject$1 = anObject$9;
  var objectKeys = objectKeys$1;

  // `Object.defineProperties` method
  // https://tc39.es/ecma262/#sec-object.defineproperties
  // eslint-disable-next-line es/no-object-defineproperties -- safe
  var objectDefineProperties = DESCRIPTORS ? Object.defineProperties : function defineProperties(O, Properties) {
    anObject$1(O);
    var keys = objectKeys(Properties);
    var length = keys.length;
    var index = 0;
    var key;
    while (length > index) definePropertyModule$1.f(O, key = keys[index++], Properties[key]);
    return O;
  };

  var anObject = anObject$9;
  var defineProperties = objectDefineProperties;
  var enumBugKeys = enumBugKeys$3;
  var hiddenKeys = hiddenKeys$4;
  var html = html$2;
  var documentCreateElement = documentCreateElement$1;
  var sharedKey$1 = sharedKey$3;

  var GT = '>';
  var LT = '<';
  var PROTOTYPE = 'prototype';
  var SCRIPT = 'script';
  var IE_PROTO$1 = sharedKey$1('IE_PROTO');

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
      /* global ActiveXObject -- old IE */
      activeXDocument = document.domain && new ActiveXObject('htmlfile');
    } catch (error) { /* ignore */ }
    NullProtoObject = activeXDocument ? NullProtoObjectViaActiveX(activeXDocument) : NullProtoObjectViaIFrame();
    var length = enumBugKeys.length;
    while (length--) delete NullProtoObject[PROTOTYPE][enumBugKeys[length]];
    return NullProtoObject();
  };

  hiddenKeys[IE_PROTO$1] = true;

  // `Object.create` method
  // https://tc39.es/ecma262/#sec-object.create
  var objectCreate = Object.create || function create(O, Properties) {
    var result;
    if (O !== null) {
      EmptyConstructor[PROTOTYPE] = anObject(O);
      result = new EmptyConstructor();
      EmptyConstructor[PROTOTYPE] = null;
      // add "__proto__" for Object.getPrototypeOf polyfill
      result[IE_PROTO$1] = O;
    } else result = NullProtoObject();
    return Properties === undefined ? result : defineProperties(result, Properties);
  };

  var wellKnownSymbol$3 = wellKnownSymbol$d;
  var create$1 = objectCreate;
  var definePropertyModule = objectDefineProperty;

  var UNSCOPABLES = wellKnownSymbol$3('unscopables');
  var ArrayPrototype = Array.prototype;

  // Array.prototype[@@unscopables]
  // https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
  if (ArrayPrototype[UNSCOPABLES] == undefined) {
    definePropertyModule.f(ArrayPrototype, UNSCOPABLES, {
      configurable: true,
      value: create$1(null)
    });
  }

  // add a key to Array.prototype[@@unscopables]
  var addToUnscopables$1 = function (key) {
    ArrayPrototype[UNSCOPABLES][key] = true;
  };

  var fails$2 = fails$9;

  var correctPrototypeGetter = !fails$2(function () {
    function F() { /* empty */ }
    F.prototype.constructor = null;
    // eslint-disable-next-line es/no-object-getprototypeof -- required for testing
    return Object.getPrototypeOf(new F()) !== F.prototype;
  });

  var has$1 = has$9;
  var toObject$1 = toObject$3;
  var sharedKey = sharedKey$3;
  var CORRECT_PROTOTYPE_GETTER = correctPrototypeGetter;

  var IE_PROTO = sharedKey('IE_PROTO');
  var ObjectPrototype = Object.prototype;

  // `Object.getPrototypeOf` method
  // https://tc39.es/ecma262/#sec-object.getprototypeof
  // eslint-disable-next-line es/no-object-getprototypeof -- safe
  var objectGetPrototypeOf = CORRECT_PROTOTYPE_GETTER ? Object.getPrototypeOf : function (O) {
    O = toObject$1(O);
    if (has$1(O, IE_PROTO)) return O[IE_PROTO];
    if (typeof O.constructor == 'function' && O instanceof O.constructor) {
      return O.constructor.prototype;
    } return O instanceof Object ? ObjectPrototype : null;
  };

  var fails$1 = fails$9;
  var getPrototypeOf$1 = objectGetPrototypeOf;
  var createNonEnumerableProperty$2 = createNonEnumerableProperty$7;
  var has = has$9;
  var wellKnownSymbol$2 = wellKnownSymbol$d;

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

  var NEW_ITERATOR_PROTOTYPE = IteratorPrototype$2 == undefined || fails$1(function () {
    var test = {};
    // FF44- legacy iterators case
    return IteratorPrototype$2[ITERATOR$2].call(test) !== test;
  });

  if (NEW_ITERATOR_PROTOTYPE) IteratorPrototype$2 = {};

  // `%IteratorPrototype%[@@iterator]()` method
  // https://tc39.es/ecma262/#sec-%iteratorprototype%-@@iterator
  if (!has(IteratorPrototype$2, ITERATOR$2)) {
    createNonEnumerableProperty$2(IteratorPrototype$2, ITERATOR$2, returnThis$2);
  }

  var iteratorsCore = {
    IteratorPrototype: IteratorPrototype$2,
    BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS$1
  };

  var IteratorPrototype$1 = iteratorsCore.IteratorPrototype;
  var create = objectCreate;
  var createPropertyDescriptor = createPropertyDescriptor$3;
  var setToStringTag$1 = setToStringTag$3;
  var Iterators$2 = iterators;

  var returnThis$1 = function () { return this; };

  var createIteratorConstructor$1 = function (IteratorConstructor, NAME, next) {
    var TO_STRING_TAG = NAME + ' Iterator';
    IteratorConstructor.prototype = create(IteratorPrototype$1, { next: createPropertyDescriptor(1, next) });
    setToStringTag$1(IteratorConstructor, TO_STRING_TAG, false);
    Iterators$2[TO_STRING_TAG] = returnThis$1;
    return IteratorConstructor;
  };

  var $$1 = _export;
  var createIteratorConstructor = createIteratorConstructor$1;
  var getPrototypeOf = objectGetPrototypeOf;
  var setPrototypeOf = objectSetPrototypeOf;
  var setToStringTag = setToStringTag$3;
  var createNonEnumerableProperty$1 = createNonEnumerableProperty$7;
  var redefine = redefine$4.exports;
  var wellKnownSymbol$1 = wellKnownSymbol$d;
  var Iterators$1 = iterators;
  var IteratorsCore = iteratorsCore;

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
      if (IteratorPrototype !== Object.prototype && CurrentIteratorPrototype.next) {
        if (getPrototypeOf(CurrentIteratorPrototype) !== IteratorPrototype) {
          if (setPrototypeOf) {
            setPrototypeOf(CurrentIteratorPrototype, IteratorPrototype);
          } else if (typeof CurrentIteratorPrototype[ITERATOR$1] != 'function') {
            createNonEnumerableProperty$1(CurrentIteratorPrototype, ITERATOR$1, returnThis);
          }
        }
        // Set @@toStringTag to native iterators
        setToStringTag(CurrentIteratorPrototype, TO_STRING_TAG, true);
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
          redefine(IterablePrototype, KEY, methods[KEY]);
        }
      } else $$1({ target: NAME, proto: true, forced: BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME }, methods);
    }

    return methods;
  };

  var toIndexedObject = toIndexedObject$4;
  var addToUnscopables = addToUnscopables$1;
  var Iterators = iterators;
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

  // argumentsList[@@iterator] is %ArrayProto_values%
  // https://tc39.es/ecma262/#sec-createunmappedargumentsobject
  // https://tc39.es/ecma262/#sec-createmappedargumentsobject
  Iterators.Arguments = Iterators.Array;

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

  var global$1 = global$j;
  var DOMIterables = domIterables;
  var ArrayIteratorMethods = es_array_iterator;
  var createNonEnumerableProperty = createNonEnumerableProperty$7;
  var wellKnownSymbol = wellKnownSymbol$d;

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

  function ownKeys$2(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);

      if (enumerableOnly) {
        symbols = symbols.filter(function (sym) {
          return Object.getOwnPropertyDescriptor(object, sym).enumerable;
        });
      }

      keys.push.apply(keys, symbols);
    }

    return keys;
  }

  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};

      if (i % 2) {
        ownKeys$2(Object(source), true).forEach(function (key) {
          _defineProperty(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys$2(Object(source)).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
    }

    return target;
  }

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArrayLimit(arr, i) {
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

    if (_i == null) return;
    var _arr = [];
    var _n = true;
    var _d = false;

    var _s, _e;

    try {
      for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
  }

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

  /**
   * Return if a node is a DOM node. Else will return by `findDOMNode`
   */

  function findDOMNode(node) {
    if (node instanceof HTMLElement) {
      return node;
    }

    return ReactDOM__default['default'].findDOMNode(node);
  }

  function fillRef(ref, node) {
    if (typeof ref === 'function') {
      ref(node);
    } else if (_typeof(ref) === 'object' && ref && 'current' in ref) {
      ref.current = node;
    }
  }
  /* eslint-enable */

  function canUseDom() {
    return !!(typeof window !== 'undefined' && window.document && window.document.createElement);
  }

  // Event wrapper. Copy from react source code

  function makePrefixMap(styleProp, eventName) {
    var prefixes = {};
    prefixes[styleProp.toLowerCase()] = eventName.toLowerCase();
    prefixes["Webkit".concat(styleProp)] = "webkit".concat(eventName);
    prefixes["Moz".concat(styleProp)] = "moz".concat(eventName);
    prefixes["ms".concat(styleProp)] = "MS".concat(eventName);
    prefixes["O".concat(styleProp)] = "o".concat(eventName.toLowerCase());
    return prefixes;
  }

  function getVendorPrefixes(domSupport, win) {
    var prefixes = {
      animationend: makePrefixMap('Animation', 'AnimationEnd'),
      transitionend: makePrefixMap('Transition', 'TransitionEnd')
    };

    if (domSupport) {
      if (!('AnimationEvent' in win)) {
        delete prefixes.animationend.animation;
      }

      if (!('TransitionEvent' in win)) {
        delete prefixes.transitionend.transition;
      }
    }

    return prefixes;
  }
  var vendorPrefixes = getVendorPrefixes(canUseDom(), typeof window !== 'undefined' ? window : {});
  var style = {};

  if (canUseDom()) {
    var _document$createEleme = document.createElement('div');

    style = _document$createEleme.style;
  }

  var prefixedEventNames = {};
  function getVendorPrefixedEventName(eventName) {
    if (prefixedEventNames[eventName]) {
      return prefixedEventNames[eventName];
    }

    var prefixMap = vendorPrefixes[eventName];

    if (prefixMap) {
      var stylePropList = Object.keys(prefixMap);
      var len = stylePropList.length;

      for (var i = 0; i < len; i += 1) {
        var styleProp = stylePropList[i];

        if (Object.prototype.hasOwnProperty.call(prefixMap, styleProp) && styleProp in style) {
          prefixedEventNames[eventName] = prefixMap[styleProp];
          return prefixedEventNames[eventName];
        }
      }
    }

    return '';
  }
  var internalAnimationEndName = getVendorPrefixedEventName('animationend');
  var internalTransitionEndName = getVendorPrefixedEventName('transitionend');
  var supportTransition = !!(internalAnimationEndName && internalTransitionEndName);
  var animationEndName = internalAnimationEndName || 'animationend';
  var transitionEndName = internalTransitionEndName || 'transitionend';
  function getTransitionName(transitionName, transitionType) {
    if (!transitionName) return null;

    if (_typeof(transitionName) === 'object') {
      var type = transitionType.replace(/-\w/g, function (match) {
        return match[1].toUpperCase();
      });
      return transitionName[type];
    }

    return "".concat(transitionName, "-").concat(transitionType);
  }

  var STATUS_NONE = 'none';
  var STATUS_APPEAR = 'appear';
  var STATUS_ENTER = 'enter';
  var STATUS_LEAVE = 'leave';
  var STEP_NONE = 'none';
  var STEP_PREPARE = 'prepare';
  var STEP_START = 'start';
  var STEP_ACTIVE = 'active';
  var STEP_ACTIVATED = 'end';

  function useMountStatus(defaultValue) {
    var destroyRef = React.useRef(false);

    var _useState = React.useState(defaultValue),
        _useState2 = _slicedToArray(_useState, 2),
        val = _useState2[0],
        setVal = _useState2[1];

    function setValue(next) {
      if (!destroyRef.current) {
        setVal(next);
      }
    }

    React.useEffect(function () {
      return function () {
        destroyRef.current = true;
      };
    }, []);
    return [val, setValue];
  }

  var useIsomorphicLayoutEffect = canUseDom() ? React.useLayoutEffect : React.useEffect;

  var raf = function raf(callback) {
    return +setTimeout(callback, 16);
  };

  var caf = function caf(num) {
    return clearTimeout(num);
  };

  if (typeof window !== 'undefined' && 'requestAnimationFrame' in window) {
    raf = function raf(callback) {
      return window.requestAnimationFrame(callback);
    };

    caf = function caf(handle) {
      return window.cancelAnimationFrame(handle);
    };
  }

  var rafUUID = 0;
  var rafIds = new Map();

  function cleanup(id) {
    rafIds.delete(id);
  }

  function wrapperRaf(callback) {
    var times = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
    rafUUID += 1;
    var id = rafUUID;

    function callRef(leftTimes) {
      if (leftTimes === 0) {
        // Clean up
        cleanup(id); // Trigger

        callback();
      } else {
        // Next raf
        var realId = raf(function () {
          callRef(leftTimes - 1);
        }); // Bind real raf id

        rafIds.set(id, realId);
      }
    }

    callRef(times);
    return id;
  }

  wrapperRaf.cancel = function (id) {
    var realId = rafIds.get(id);
    cleanup(realId);
    return caf(realId);
  };

  var useNextFrame = (function () {
    var nextFrameRef = React__namespace.useRef(null);

    function cancelNextFrame() {
      wrapperRaf.cancel(nextFrameRef.current);
    }

    function nextFrame(callback) {
      var delay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
      cancelNextFrame();
      var nextFrameId = wrapperRaf(function () {
        if (delay <= 1) {
          callback({
            isCanceled: function isCanceled() {
              return nextFrameId !== nextFrameRef.current;
            }
          });
        } else {
          nextFrame(callback, delay - 1);
        }
      });
      nextFrameRef.current = nextFrameId;
    }

    React__namespace.useEffect(function () {
      return function () {
        cancelNextFrame();
      };
    }, []);
    return [nextFrame, cancelNextFrame];
  });

  var STEP_QUEUE = [STEP_PREPARE, STEP_START, STEP_ACTIVE, STEP_ACTIVATED];
  /** Skip current step */

  var SkipStep = false;
  /** Current step should be update in */

  var DoStep = true;
  function isActive(step) {
    return step === STEP_ACTIVE || step === STEP_ACTIVATED;
  }
  var useStepQueue = (function (status, callback) {
    var _React$useState = React__namespace.useState(STEP_NONE),
        _React$useState2 = _slicedToArray(_React$useState, 2),
        step = _React$useState2[0],
        setStep = _React$useState2[1];

    var _useNextFrame = useNextFrame(),
        _useNextFrame2 = _slicedToArray(_useNextFrame, 2),
        nextFrame = _useNextFrame2[0],
        cancelNextFrame = _useNextFrame2[1];

    function startQueue() {
      setStep(STEP_PREPARE);
    }

    useIsomorphicLayoutEffect(function () {
      if (step !== STEP_NONE && step !== STEP_ACTIVATED) {
        var index = STEP_QUEUE.indexOf(step);
        var nextStep = STEP_QUEUE[index + 1];
        var result = callback(step);

        if (result === SkipStep) {
          // Skip when no needed
          setStep(nextStep);
        } else {
          // Do as frame for step update
          nextFrame(function (info) {
            function doNext() {
              // Skip since current queue is ood
              if (info.isCanceled()) return;
              setStep(nextStep);
            }

            if (result === true) {
              doNext();
            } else {
              // Only promise should be async
              Promise.resolve(result).then(doNext);
            }
          });
        }
      }
    }, [status, step]);
    React__namespace.useEffect(function () {
      return function () {
        cancelNextFrame();
      };
    }, []);
    return [startQueue, step];
  });

  var useDomMotionEvents = (function (callback) {
    var cacheElementRef = React.useRef(); // Cache callback

    var callbackRef = React.useRef(callback);
    callbackRef.current = callback; // Internal motion event handler

    var onInternalMotionEnd = React__namespace.useCallback(function (event) {
      callbackRef.current(event);
    }, []); // Remove events

    function removeMotionEvents(element) {
      if (element) {
        element.removeEventListener(transitionEndName, onInternalMotionEnd);
        element.removeEventListener(animationEndName, onInternalMotionEnd);
      }
    } // Patch events


    function patchMotionEvents(element) {
      if (cacheElementRef.current && cacheElementRef.current !== element) {
        removeMotionEvents(cacheElementRef.current);
      }

      if (element && element !== cacheElementRef.current) {
        element.addEventListener(transitionEndName, onInternalMotionEnd);
        element.addEventListener(animationEndName, onInternalMotionEnd); // Save as cache in case dom removed trigger by `motionDeadline`

        cacheElementRef.current = element;
      }
    } // Clean up when removed


    React__namespace.useEffect(function () {
      return function () {
        removeMotionEvents(cacheElementRef.current);
      };
    }, []);
    return [patchMotionEvents, removeMotionEvents];
  });

  function useStatus(supportMotion, visible, getElement, _ref) {
    var _ref$motionEnter = _ref.motionEnter,
        motionEnter = _ref$motionEnter === void 0 ? true : _ref$motionEnter,
        _ref$motionAppear = _ref.motionAppear,
        motionAppear = _ref$motionAppear === void 0 ? true : _ref$motionAppear,
        _ref$motionLeave = _ref.motionLeave,
        motionLeave = _ref$motionLeave === void 0 ? true : _ref$motionLeave,
        motionDeadline = _ref.motionDeadline,
        motionLeaveImmediately = _ref.motionLeaveImmediately,
        onAppearPrepare = _ref.onAppearPrepare,
        onEnterPrepare = _ref.onEnterPrepare,
        onLeavePrepare = _ref.onLeavePrepare,
        onAppearStart = _ref.onAppearStart,
        onEnterStart = _ref.onEnterStart,
        onLeaveStart = _ref.onLeaveStart,
        onAppearActive = _ref.onAppearActive,
        onEnterActive = _ref.onEnterActive,
        onLeaveActive = _ref.onLeaveActive,
        onAppearEnd = _ref.onAppearEnd,
        onEnterEnd = _ref.onEnterEnd,
        onLeaveEnd = _ref.onLeaveEnd,
        onVisibleChanged = _ref.onVisibleChanged;

    // Used for outer render usage to avoid `visible: false & status: none` to render nothing
    var _useState = useMountStatus(),
        _useState2 = _slicedToArray(_useState, 2),
        asyncVisible = _useState2[0],
        setAsyncVisible = _useState2[1];

    var _useState3 = useMountStatus(STATUS_NONE),
        _useState4 = _slicedToArray(_useState3, 2),
        status = _useState4[0],
        setStatus = _useState4[1];

    var _useState5 = useMountStatus(null),
        _useState6 = _slicedToArray(_useState5, 2),
        style = _useState6[0],
        setStyle = _useState6[1];

    var mountedRef = React.useRef(false);
    var deadlineRef = React.useRef(null);
    var destroyedRef = React.useRef(false); // =========================== Dom Node ===========================

    var cacheElementRef = React.useRef(null);

    function getDomElement() {
      var element = getElement();
      return element || cacheElementRef.current;
    } // ========================== Motion End ==========================


    var activeRef = React.useRef(false);

    function onInternalMotionEnd(event) {
      var element = getDomElement();

      if (event && !event.deadline && event.target !== element) {
        // event exists
        // not initiated by deadline
        // transitionEnd not fired by inner elements
        return;
      }

      var canEnd;

      if (status === STATUS_APPEAR && activeRef.current) {
        canEnd = onAppearEnd === null || onAppearEnd === void 0 ? void 0 : onAppearEnd(element, event);
      } else if (status === STATUS_ENTER && activeRef.current) {
        canEnd = onEnterEnd === null || onEnterEnd === void 0 ? void 0 : onEnterEnd(element, event);
      } else if (status === STATUS_LEAVE && activeRef.current) {
        canEnd = onLeaveEnd === null || onLeaveEnd === void 0 ? void 0 : onLeaveEnd(element, event);
      } // Only update status when `canEnd` and not destroyed


      if (canEnd !== false && !destroyedRef.current) {
        setStatus(STATUS_NONE);
        setStyle(null);
      }
    }

    var _useDomMotionEvents = useDomMotionEvents(onInternalMotionEnd),
        _useDomMotionEvents2 = _slicedToArray(_useDomMotionEvents, 1),
        patchMotionEvents = _useDomMotionEvents2[0]; // ============================= Step =============================


    var eventHandlers = React__namespace.useMemo(function () {
      var _ref2, _ref3, _ref4;

      switch (status) {
        case 'appear':
          return _ref2 = {}, _defineProperty(_ref2, STEP_PREPARE, onAppearPrepare), _defineProperty(_ref2, STEP_START, onAppearStart), _defineProperty(_ref2, STEP_ACTIVE, onAppearActive), _ref2;

        case 'enter':
          return _ref3 = {}, _defineProperty(_ref3, STEP_PREPARE, onEnterPrepare), _defineProperty(_ref3, STEP_START, onEnterStart), _defineProperty(_ref3, STEP_ACTIVE, onEnterActive), _ref3;

        case 'leave':
          return _ref4 = {}, _defineProperty(_ref4, STEP_PREPARE, onLeavePrepare), _defineProperty(_ref4, STEP_START, onLeaveStart), _defineProperty(_ref4, STEP_ACTIVE, onLeaveActive), _ref4;

        default:
          return {};
      }
    }, [status]);

    var _useStepQueue = useStepQueue(status, function (newStep) {
      // Only prepare step can be skip
      if (newStep === STEP_PREPARE) {
        var onPrepare = eventHandlers[STEP_PREPARE];

        if (!onPrepare) {
          return SkipStep;
        }

        return onPrepare(getDomElement());
      } // Rest step is sync update


      // Rest step is sync update
      if (step in eventHandlers) {
        var _eventHandlers$step;

        setStyle(((_eventHandlers$step = eventHandlers[step]) === null || _eventHandlers$step === void 0 ? void 0 : _eventHandlers$step.call(eventHandlers, getDomElement(), null)) || null);
      }

      if (step === STEP_ACTIVE) {
        // Patch events when motion needed
        patchMotionEvents(getDomElement());

        if (motionDeadline > 0) {
          clearTimeout(deadlineRef.current);
          deadlineRef.current = setTimeout(function () {
            onInternalMotionEnd({
              deadline: true
            });
          }, motionDeadline);
        }
      }

      return DoStep;
    }),
        _useStepQueue2 = _slicedToArray(_useStepQueue, 2),
        startStep = _useStepQueue2[0],
        step = _useStepQueue2[1];

    var active = isActive(step);
    activeRef.current = active; // ============================ Status ============================
    // Update with new status

    useIsomorphicLayoutEffect(function () {
      setAsyncVisible(visible);
      var isMounted = mountedRef.current;
      mountedRef.current = true;

      if (!supportMotion) {
        return;
      }

      var nextStatus; // Appear

      if (!isMounted && visible && motionAppear) {
        nextStatus = STATUS_APPEAR;
      } // Enter


      if (isMounted && visible && motionEnter) {
        nextStatus = STATUS_ENTER;
      } // Leave


      if (isMounted && !visible && motionLeave || !isMounted && motionLeaveImmediately && !visible && motionLeave) {
        nextStatus = STATUS_LEAVE;
      } // Update to next status


      if (nextStatus) {
        setStatus(nextStatus);
        startStep();
      }
    }, [visible]); // ============================ Effect ============================
    // Reset when motion changed

    React.useEffect(function () {
      if ( // Cancel appear
      status === STATUS_APPEAR && !motionAppear || // Cancel enter
      status === STATUS_ENTER && !motionEnter || // Cancel leave
      status === STATUS_LEAVE && !motionLeave) {
        setStatus(STATUS_NONE);
      }
    }, [motionAppear, motionEnter, motionLeave]);
    React.useEffect(function () {
      return function () {
        clearTimeout(deadlineRef.current);
        destroyedRef.current = true;
      };
    }, []); // Trigger `onVisibleChanged`

    React.useEffect(function () {
      if (asyncVisible !== undefined && status === STATUS_NONE) {
        onVisibleChanged === null || onVisibleChanged === void 0 ? void 0 : onVisibleChanged(asyncVisible);
      }
    }, [asyncVisible, status]); // ============================ Styles ============================

    var mergedStyle = style;

    if (eventHandlers[STEP_PREPARE] && step === STEP_START) {
      mergedStyle = _objectSpread2({
        transition: 'none'
      }, mergedStyle);
    }

    return [status, step, mergedStyle, asyncVisible !== null && asyncVisible !== void 0 ? asyncVisible : visible];
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

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
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
    if (call && (_typeof(call) === "object" || typeof call === "function")) {
      return call;
    } else if (call !== void 0) {
      throw new TypeError("Derived constructors may only return object or undefined");
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

  var DomWrapper = /*#__PURE__*/function (_React$Component) {
    _inherits(DomWrapper, _React$Component);

    var _super = _createSuper(DomWrapper);

    function DomWrapper() {
      _classCallCheck(this, DomWrapper);

      return _super.apply(this, arguments);
    }

    _createClass(DomWrapper, [{
      key: "render",
      value: function render() {
        return this.props.children;
      }
    }]);

    return DomWrapper;
  }(React__namespace.Component);

  /**
   * `transitionSupport` is used for none transition test case.
   * Default we use browser transition event support check.
   */

  function genCSSMotion(config) {
    var transitionSupport = config;

    if (_typeof(config) === 'object') {
      transitionSupport = config.transitionSupport;
    }

    function isSupportTransition(props) {
      return !!(props.motionName && transitionSupport);
    }

    var CSSMotion = /*#__PURE__*/React__namespace.forwardRef(function (props, ref) {
      var _props$visible = props.visible,
          visible = _props$visible === void 0 ? true : _props$visible,
          _props$removeOnLeave = props.removeOnLeave,
          removeOnLeave = _props$removeOnLeave === void 0 ? true : _props$removeOnLeave,
          forceRender = props.forceRender,
          children = props.children,
          motionName = props.motionName,
          leavedClassName = props.leavedClassName,
          eventProps = props.eventProps;
      var supportMotion = isSupportTransition(props); // Ref to the react node, it may be a HTMLElement

      var nodeRef = React.useRef(); // Ref to the dom wrapper in case ref can not pass to HTMLElement

      var wrapperNodeRef = React.useRef();

      function getDomElement() {
        try {
          return findDOMNode(nodeRef.current || wrapperNodeRef.current);
        } catch (e) {
          // Only happen when `motionDeadline` trigger but element removed.
          return null;
        }
      }

      var _useStatus = useStatus(supportMotion, visible, getDomElement, props),
          _useStatus2 = _slicedToArray(_useStatus, 4),
          status = _useStatus2[0],
          statusStep = _useStatus2[1],
          statusStyle = _useStatus2[2],
          mergedVisible = _useStatus2[3]; // Record whether content has rended
      // Will return null for un-rendered even when `removeOnLeave={false}`


      var renderedRef = React__namespace.useRef(mergedVisible);

      if (mergedVisible) {
        renderedRef.current = true;
      } // ====================== Refs ======================


      var originRef = React.useRef(ref);
      originRef.current = ref;
      var setNodeRef = React__namespace.useCallback(function (node) {
        nodeRef.current = node;
        fillRef(originRef.current, node);
      }, []); // ===================== Render =====================

      var motionChildren;

      var mergedProps = _objectSpread2(_objectSpread2({}, eventProps), {}, {
        visible: visible
      });

      if (!children) {
        // No children
        motionChildren = null;
      } else if (status === STATUS_NONE || !isSupportTransition(props)) {
        // Stable children
        if (mergedVisible) {
          motionChildren = children(_objectSpread2({}, mergedProps), setNodeRef);
        } else if (!removeOnLeave && renderedRef.current) {
          motionChildren = children(_objectSpread2(_objectSpread2({}, mergedProps), {}, {
            className: leavedClassName
          }), setNodeRef);
        } else if (forceRender) {
          motionChildren = children(_objectSpread2(_objectSpread2({}, mergedProps), {}, {
            style: {
              display: 'none'
            }
          }), setNodeRef);
        } else {
          motionChildren = null;
        }
      } else {
        var _classNames;

        // In motion
        var statusSuffix;

        if (statusStep === STEP_PREPARE) {
          statusSuffix = 'prepare';
        } else if (isActive(statusStep)) {
          statusSuffix = 'active';
        } else if (statusStep === STEP_START) {
          statusSuffix = 'start';
        }

        motionChildren = children(_objectSpread2(_objectSpread2({}, mergedProps), {}, {
          className: classNames(getTransitionName(motionName, status), (_classNames = {}, _defineProperty(_classNames, getTransitionName(motionName, "".concat(status, "-").concat(statusSuffix)), statusSuffix), _defineProperty(_classNames, motionName, typeof motionName === 'string'), _classNames)),
          style: statusStyle
        }), setNodeRef);
      }

      return /*#__PURE__*/React__namespace.createElement(DomWrapper, {
        ref: wrapperNodeRef
      }, motionChildren);
    });
    CSSMotion.displayName = 'CSSMotion';
    return CSSMotion;
  }
  var CSSMotion = genCSSMotion(supportTransition);

  var STATUS_ADD = 'add';
  var STATUS_KEEP = 'keep';
  var STATUS_REMOVE = 'remove';
  var STATUS_REMOVED = 'removed';
  function wrapKeyToObject(key) {
    var keyObj;

    if (key && _typeof(key) === 'object' && 'key' in key) {
      keyObj = key;
    } else {
      keyObj = {
        key: key
      };
    }

    return _objectSpread2(_objectSpread2({}, keyObj), {}, {
      key: String(keyObj.key)
    });
  }
  function parseKeys() {
    var keys = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    return keys.map(wrapKeyToObject);
  }
  function diffKeys() {
    var prevKeys = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var currentKeys = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    var list = [];
    var currentIndex = 0;
    var currentLen = currentKeys.length;
    var prevKeyObjects = parseKeys(prevKeys);
    var currentKeyObjects = parseKeys(currentKeys); // Check prev keys to insert or keep

    prevKeyObjects.forEach(function (keyObj) {
      var hit = false;

      for (var i = currentIndex; i < currentLen; i += 1) {
        var currentKeyObj = currentKeyObjects[i];

        if (currentKeyObj.key === keyObj.key) {
          // New added keys should add before current key
          if (currentIndex < i) {
            list = list.concat(currentKeyObjects.slice(currentIndex, i).map(function (obj) {
              return _objectSpread2(_objectSpread2({}, obj), {}, {
                status: STATUS_ADD
              });
            }));
            currentIndex = i;
          }

          list.push(_objectSpread2(_objectSpread2({}, currentKeyObj), {}, {
            status: STATUS_KEEP
          }));
          currentIndex += 1;
          hit = true;
          break;
        }
      } // If not hit, it means key is removed


      if (!hit) {
        list.push(_objectSpread2(_objectSpread2({}, keyObj), {}, {
          status: STATUS_REMOVE
        }));
      }
    }); // Add rest to the list

    if (currentIndex < currentLen) {
      list = list.concat(currentKeyObjects.slice(currentIndex).map(function (obj) {
        return _objectSpread2(_objectSpread2({}, obj), {}, {
          status: STATUS_ADD
        });
      }));
    }
    /**
     * Merge same key when it remove and add again:
     *    [1 - add, 2 - keep, 1 - remove] -> [1 - keep, 2 - keep]
     */


    var keys = {};
    list.forEach(function (_ref) {
      var key = _ref.key;
      keys[key] = (keys[key] || 0) + 1;
    });
    var duplicatedKeys = Object.keys(keys).filter(function (key) {
      return keys[key] > 1;
    });
    duplicatedKeys.forEach(function (matchKey) {
      // Remove `STATUS_REMOVE` node.
      list = list.filter(function (_ref2) {
        var key = _ref2.key,
            status = _ref2.status;
        return key !== matchKey || status !== STATUS_REMOVE;
      }); // Update `STATUS_ADD` to `STATUS_KEEP`

      list.forEach(function (node) {
        if (node.key === matchKey) {
          // eslint-disable-next-line no-param-reassign
          node.status = STATUS_KEEP;
        }
      });
    });
    return list;
  }

  var MOTION_PROP_NAMES = ['eventProps', 'visible', 'children', 'motionName', 'motionAppear', 'motionEnter', 'motionLeave', 'motionLeaveImmediately', 'motionDeadline', 'removeOnLeave', 'leavedClassName', 'onAppearStart', 'onAppearActive', 'onAppearEnd', 'onEnterStart', 'onEnterActive', 'onEnterEnd', 'onLeaveStart', 'onLeaveActive', 'onLeaveEnd'];
  /**
   * Generate a CSSMotionList component with config
   * @param transitionSupport No need since CSSMotionList no longer depends on transition support
   * @param CSSMotion CSSMotion component
   */

  function genCSSMotionList(transitionSupport) {
    var CSSMotion$1 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : CSSMotion;

    var CSSMotionList = /*#__PURE__*/function (_React$Component) {
      _inherits(CSSMotionList, _React$Component);

      var _super = _createSuper(CSSMotionList);

      function CSSMotionList() {
        var _this;

        _classCallCheck(this, CSSMotionList);

        _this = _super.apply(this, arguments);
        _this.state = {
          keyEntities: []
        };

        _this.removeKey = function (removeKey) {
          _this.setState(function (_ref) {
            var keyEntities = _ref.keyEntities;
            return {
              keyEntities: keyEntities.map(function (entity) {
                if (entity.key !== removeKey) return entity;
                return _objectSpread2(_objectSpread2({}, entity), {}, {
                  status: STATUS_REMOVED
                });
              })
            };
          });
        };

        return _this;
      }

      _createClass(CSSMotionList, [{
        key: "render",
        value: function render() {
          var _this2 = this;

          var keyEntities = this.state.keyEntities;

          var _this$props = this.props,
              component = _this$props.component,
              children = _this$props.children,
              _onVisibleChanged = _this$props.onVisibleChanged,
              restProps = _objectWithoutProperties(_this$props, ["component", "children", "onVisibleChanged"]);

          var Component = component || React__namespace.Fragment;
          var motionProps = {};
          MOTION_PROP_NAMES.forEach(function (prop) {
            motionProps[prop] = restProps[prop];
            delete restProps[prop];
          });
          delete restProps.keys;
          return /*#__PURE__*/React__namespace.createElement(Component, restProps, keyEntities.map(function (_ref2) {
            var status = _ref2.status,
                eventProps = _objectWithoutProperties(_ref2, ["status"]);

            var visible = status === STATUS_ADD || status === STATUS_KEEP;
            return /*#__PURE__*/React__namespace.createElement(CSSMotion$1, _extends({}, motionProps, {
              key: eventProps.key,
              visible: visible,
              eventProps: eventProps,
              onVisibleChanged: function onVisibleChanged(changedVisible) {
                _onVisibleChanged === null || _onVisibleChanged === void 0 ? void 0 : _onVisibleChanged(changedVisible, {
                  key: eventProps.key
                });

                if (!changedVisible) {
                  _this2.removeKey(eventProps.key);
                }
              }
            }), children);
          }));
        }
      }], [{
        key: "getDerivedStateFromProps",
        value: function getDerivedStateFromProps(_ref3, _ref4) {
          var keys = _ref3.keys;
          var keyEntities = _ref4.keyEntities;
          var parsedKeyObjects = parseKeys(keys);
          var mixedKeyEntities = diffKeys(keyEntities, parsedKeyObjects);
          return {
            keyEntities: mixedKeyEntities.filter(function (entity) {
              var prevEntity = keyEntities.find(function (_ref5) {
                var key = _ref5.key;
                return entity.key === key;
              }); // Remove if already mark as removed

              if (prevEntity && prevEntity.status === STATUS_REMOVED && entity.status === STATUS_REMOVE) {
                return false;
              }

              return true;
            })
          };
        }
      }]);

      return CSSMotionList;
    }(React__namespace.Component);

    CSSMotionList.defaultProps = {
      component: 'div'
    };
    return CSSMotionList;
  }
  var CSSMotionList = genCSSMotionList(supportTransition);

  var aFunction = aFunction$5;
  var toObject = toObject$3;
  var IndexedObject = indexedObject;
  var toLength = toLength$3;

  // `Array.prototype.{ reduce, reduceRight }` methods implementation
  var createMethod = function (IS_RIGHT) {
    return function (that, callbackfn, argumentsLength, memo) {
      aFunction(callbackfn);
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

  var fails = fails$9;

  var arrayMethodIsStrict$1 = function (METHOD_NAME, argument) {
    var method = [][METHOD_NAME];
    return !!method && fails(function () {
      // eslint-disable-next-line no-useless-call,no-throw-literal -- required for testing
      method.call(null, argument || function () { throw 1; }, 1);
    });
  };

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

  const getToastClassName = namespace => {
    return [namespace, "toast"].filter(Boolean).join("-");
  };
  const getAbovePositionStyle = above => {
    const {
      left,
      top,
      width
    } = above.getBoundingClientRect();
    return {
      top: top - 20,
      left: left + Math.floor(width / 2)
    };
  };

  class Notice extends React.Component {
    constructor(...args) {
      super(...args);

      _defineProperty(this, "closeTimer", null);

      _defineProperty(this, "close", e => {
        if (e) {
          e.stopPropagation();
        }

        this.clearCloseTimer();
        const {
          onClose,
          noticeKey
        } = this.props;

        if (onClose) {
          onClose(noticeKey);
        }
      });

      _defineProperty(this, "startCloseTimer", () => {
        if (this.props.duration) {
          this.closeTimer = window.setTimeout(() => {
            this.close();
          }, this.props.duration);
        }
      });

      _defineProperty(this, "clearCloseTimer", () => {
        if (this.closeTimer) {
          clearTimeout(this.closeTimer);
          this.closeTimer = null;
        }
      });
    }

    componentDidMount() {
      this.startCloseTimer();
    }

    componentDidUpdate(prevProps) {
      if (this.props.duration !== prevProps.duration || this.props.updateMark !== prevProps.updateMark || // Visible again need reset timer
      this.props.visible !== prevProps.visible && this.props.visible) {
        this.restartCloseTimer();
      }
    }

    componentWillUnmount() {
      this.clearCloseTimer();
    }

    restartCloseTimer() {
      this.clearCloseTimer();
      this.startCloseTimer();
    }

    render() {
      const {
        namespace,
        className,
        closable,
        type,
        icon,
        closeIcon,
        style,
        onClick,
        children,
        holder
      } = this.props;
      const toastClass = getToastClassName(namespace);
      const dataOrAriaAttributeProps = Object.keys(this.props).reduce((acc, key) => {
        if (key.substr(0, 5) === 'data-' || key.substr(0, 5) === 'aria-' || key === 'role') {
          acc[key] = this.props[key];
        }

        return acc;
      }, {});
      const buildInIconClass = type && {
        "success": "icon-yes",
        "error": "icon-error",
        "warning": "icon-caution",
        "info": "icon-info"
      }[type];
      const computedIcon = icon !== false && /*#__PURE__*/React__namespace.isValidElement(icon) ? icon : buildInIconClass && /*#__PURE__*/React__namespace.createElement("i", {
        className: classNames("ft-icon ft-toast-icon", buildInIconClass)
      });
      const node = /*#__PURE__*/React__namespace.createElement("div", _extends({
        className: classNames(toastClass, type && `is-${type}`, className, closable && `${toastClass}-closable`),
        style: style,
        onMouseEnter: this.clearCloseTimer,
        onMouseLeave: this.startCloseTimer,
        onClick: onClick
      }, dataOrAriaAttributeProps), /*#__PURE__*/React__namespace.createElement("div", {
        className: `${toastClass}-body`
      }, computedIcon, /*#__PURE__*/React__namespace.createElement("div", {
        className: "ft-toast-content"
      }, children)), closable && /*#__PURE__*/React__namespace.createElement("a", {
        tabIndex: 0,
        onClick: this.close,
        className: `${toastClass}-close`
      }, closeIcon || /*#__PURE__*/React__namespace.createElement("span", {
        className: `${toastClass}-close-x`
      })));

      if (holder) {
        return /*#__PURE__*/ReactDOM__default['default'].createPortal(node, holder);
      }

      return node;
    }

  }

  _defineProperty(Notice, "defaultProps", {
    onClose() {},

    duration: 1500
  });

  function ownKeys$1(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

  function _objectSpread$1(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$1(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$1(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
  let seed = 0;
  const now = Date.now();

  function getUuid() {
    const id = seed;
    seed += 1;
    return `rcNotification_${now}_${id}`;
  }

  class Notification extends React.Component {
    constructor(...args) {
      super(...args);

      _defineProperty(this, "state", {
        notices: []
      });

      _defineProperty(this, "hookRefs", new Map());

      _defineProperty(this, "add", (originNotice, holderCallback) => {
        const key = originNotice.key || getUuid();

        const notice = _objectSpread$1(_objectSpread$1({}, originNotice), {}, {
          key
        });

        const {
          maxCount
        } = this.props;
        this.setState(previousState => {
          const {
            notices
          } = previousState;
          const noticeIndex = notices.map(v => v.notice.key).indexOf(key);
          const updatedNotices = notices.concat();

          if (noticeIndex !== -1) {
            updatedNotices.splice(noticeIndex, 1, {
              notice,
              holderCallback
            });
          } else {
            if (maxCount && notices.length >= maxCount) {
              // XXX, use key of first item to update new added (let React to move exsiting
              // instead of remove and mount). Same key was used before for both a) external
              // manual control and b) internal react 'key' prop , which is not that good.
              // eslint-disable-next-line no-param-reassign
              // zombieJ: Not know why use `updateKey`. This makes Notice infinite loop in jest.
              // Change to `updateMark` for compare instead.
              // https://github.com/react-component/notification/commit/32299e6be396f94040bfa82517eea940db947ece
              notice.key = updatedNotices[0].notice.key;
              notice.updateMark = getUuid(); // zombieJ: That's why. User may close by key directly.
              // We need record this but not re-render to avoid upper issue
              // https://github.com/react-component/notification/issues/129

              notice.userPassKey = key;
              updatedNotices.shift();
            }

            updatedNotices.push({
              notice,
              holderCallback
            });
          }

          return {
            notices: updatedNotices
          };
        });
      });

      _defineProperty(this, "remove", removeKey => {
        this.setState(({
          notices
        }) => ({
          notices: notices.filter(({
            notice: {
              key,
              userPassKey
            }
          }) => {
            const mergedKey = userPassKey || key;
            return mergedKey !== removeKey;
          })
        }));
      });

      _defineProperty(this, "noticePropsMap", {});
    }

    getTransitionName() {
      const {
        namespace,
        animation
      } = this.props;
      let {
        transitionName
      } = this.props;

      if (!transitionName && animation) {
        transitionName = `${getToastClassName(namespace)}-${animation}`;
      }

      return transitionName;
    }

    render() {
      const {
        notices
      } = this.state;
      const {
        namespace,
        className,
        closeIcon,
        style
      } = this.props;
      const noticeKeys = [];
      notices.forEach(({
        notice,
        holderCallback
      }, index) => {
        const updateMark = index === notices.length - 1 ? notice.updateMark : undefined;
        const {
          key,
          userPassKey
        } = notice;

        const noticeProps = _objectSpread$1(_objectSpread$1(_objectSpread$1({
          namespace,
          closeIcon
        }, notice), notice.props), {}, {
          key,
          noticeKey: userPassKey || key,
          updateMark,
          onClose: noticeKey => {
            var _notice$onClose;

            this.remove(noticeKey);
            (_notice$onClose = notice.onClose) === null || _notice$onClose === void 0 ? void 0 : _notice$onClose.call(notice);
          },
          onClick: notice.onClick,
          children: notice.content
        }); // Give to motion


        noticeKeys.push(key);
        this.noticePropsMap[key] = {
          props: noticeProps,
          holderCallback
        };
      });
      return /*#__PURE__*/React__namespace.createElement("div", {
        className: classNames(`${getToastClassName(namespace)}-container`, className),
        style: style
      }, /*#__PURE__*/React__namespace.createElement(CSSMotionList, {
        keys: noticeKeys,
        motionName: this.getTransitionName(),
        onVisibleChanged: (changedVisible, {
          key
        }) => {
          if (!changedVisible) {
            delete this.noticePropsMap[key];
          }
        }
      }, ({
        key,
        className: motionClassName,
        style: motionStyle,
        visible
      }) => {
        const {
          props: noticeProps,
          holderCallback
        } = this.noticePropsMap[key];

        if (holderCallback) {
          return /*#__PURE__*/React__namespace.createElement("div", {
            key: key,
            className: classNames(motionClassName, `${getToastClassName(namespace)}-hook-holder`),
            style: _objectSpread$1({}, motionStyle),
            ref: div => {
              if (typeof key === 'undefined') {
                return;
              }

              if (div) {
                this.hookRefs.set(key, div);
                holderCallback(div, noticeProps);
              } else {
                this.hookRefs.delete(key);
              }
            }
          });
        }

        return /*#__PURE__*/React__namespace.createElement(Notice, _extends({}, noticeProps, {
          className: classNames(motionClassName, noticeProps === null || noticeProps === void 0 ? void 0 : noticeProps.className),
          style: _objectSpread$1(_objectSpread$1({}, motionStyle), noticeProps === null || noticeProps === void 0 ? void 0 : noticeProps.style),
          visible: visible
        }));
      }));
    }

  }

  _defineProperty(Notification, "defaultProps", {
    namespace: "ft",
    animation: 'fade',
    style: {
      top: 65,
      left: '50%'
    }
  });

  Notification.newInstance = function newNotificationInstance(properties, callback) {
    const _ref = properties || {},
          {
      getContainer
    } = _ref,
          props = _objectWithoutProperties(_ref, ["getContainer"]);

    const div = document.createElement('div');

    if (getContainer) {
      const root = getContainer();
      root.appendChild(div);
    } else {
      document.body.appendChild(div);
    }

    let called = false;

    function ref(notification) {
      if (called) {
        return;
      }

      called = true;
      callback({
        notice(noticeProps) {
          notification.add(noticeProps);
        },

        removeNotice(key) {
          notification.remove(key);
        },

        component: notification,

        destroy() {
          ReactDOM__default['default'].unmountComponentAtNode(div);

          if (div.parentNode) {
            div.parentNode.removeChild(div);
          }
        }

      });
    }

    ReactDOM__default['default'].render( /*#__PURE__*/React__namespace.createElement(Notification, _extends({}, props, {
      ref: ref
    })), div);
  };

  let ToastPositionEnum;

  (function (ToastPositionEnum) {
    ToastPositionEnum["Center"] = "center";
    ToastPositionEnum["TopLeft"] = "top-left";
    ToastPositionEnum["TopCenter"] = "top-center";
    ToastPositionEnum["TopRight"] = "top-right";
    ToastPositionEnum["BottomLeft"] = "bottom-left";
    ToastPositionEnum["BottomCenter"] = "bottom-center";
    ToastPositionEnum["BottomRight"] = "bottom-right";
  })(ToastPositionEnum || (ToastPositionEnum = {}));

  function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

  function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

  const createToastInstance = props => {
    return new Promise(resolve => {
      Notification.newInstance(props, instance => {
        resolve(instance);
      });
    });
  };

  const defaultOffsetTop = 65;
  const defaultOffsetLeft = 20;
  const positionStyle = {
    [ToastPositionEnum.Center]: {
      top: "38.2%",
      left: "50%"
    },
    [ToastPositionEnum.TopLeft]: {
      top: defaultOffsetTop,
      left: defaultOffsetLeft
    },
    [ToastPositionEnum.TopCenter]: {
      top: defaultOffsetTop,
      left: "50%"
    },
    [ToastPositionEnum.TopRight]: {
      top: defaultOffsetTop,
      right: defaultOffsetLeft
    },
    [ToastPositionEnum.BottomLeft]: {
      bottom: defaultOffsetTop,
      left: defaultOffsetLeft
    },
    [ToastPositionEnum.BottomCenter]: {
      bottom: defaultOffsetTop,
      left: "50%"
    },
    [ToastPositionEnum.BottomRight]: {
      bottom: defaultOffsetTop,
      right: defaultOffsetLeft
    }
  };
  const positionMap = {};
  const aboveMap = new WeakMap();
  const toast = async (content, options) => {
    const {
      namespace = "ft",
      position = ToastPositionEnum.TopCenter,
      offset,
      above
    } = options || {};
    let instance = above ? aboveMap.get(above) : positionMap[position];

    if (!instance) {
      const containerStyle = above ? getAbovePositionStyle(above) : positionStyle[position];
      instance = await createToastInstance({
        namespace,
        className: `is-${above ? "above" : position}`,
        style: containerStyle
      });

      if (above) {
        aboveMap.set(above, instance);
      } else {
        positionMap[position] = instance;
      }
    }

    return instance.notice(_objectSpread(_objectSpread(_objectSpread({}, options), offset ? {
      style: {
        top: offset[0],
        left: offset[1]
      }
    } : {}), {}, {
      content
    }));
  };

  exports.toast = toast;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
