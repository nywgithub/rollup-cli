(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, (global.future = global.future || {}, global.future.Picker = factory()));
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

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	var check = function (it) {
	  return it && it.Math == Math && it;
	};

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global$n =
	  // eslint-disable-next-line es/no-global-this -- safe
	  check(typeof globalThis == 'object' && globalThis) ||
	  check(typeof window == 'object' && window) ||
	  // eslint-disable-next-line no-restricted-globals -- safe
	  check(typeof self == 'object' && self) ||
	  check(typeof commonjsGlobal == 'object' && commonjsGlobal) ||
	  // eslint-disable-next-line no-new-func -- fallback
	  (function () { return this; })() || Function('return this')();

	var objectGetOwnPropertyDescriptor = {};

	var fails$n = function (exec) {
	  try {
	    return !!exec();
	  } catch (error) {
	    return true;
	  }
	};

	var fails$m = fails$n;

	// Detect IE8's incomplete defineProperty implementation
	var descriptors = !fails$m(function () {
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

	var fails$l = fails$n;
	var classof$6 = classofRaw$1;

	var split = ''.split;

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var indexedObject = fails$l(function () {
	  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
	  // eslint-disable-next-line no-prototype-builtins -- safe
	  return !Object('z').propertyIsEnumerable(0);
	}) ? function (it) {
	  return classof$6(it) == 'String' ? split.call(it, '') : Object(it);
	} : Object;

	// `RequireObjectCoercible` abstract operation
	// https://tc39.es/ecma262/#sec-requireobjectcoercible
	var requireObjectCoercible$5 = function (it) {
	  if (it == undefined) throw TypeError("Can't call method on " + it);
	  return it;
	};

	// toObject with fallback for non-array-like ES3 strings
	var IndexedObject$3 = indexedObject;
	var requireObjectCoercible$4 = requireObjectCoercible$5;

	var toIndexedObject$8 = function (it) {
	  return IndexedObject$3(requireObjectCoercible$4(it));
	};

	var isObject$h = function (it) {
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

	var isObject$g = isObject$h;

	// `ToPrimitive` abstract operation
	// https://tc39.es/ecma262/#sec-toprimitive
	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	var toPrimitive$4 = function (input, PREFERRED_STRING) {
	  if (!isObject$g(input)) return input;
	  var fn, val;
	  if (PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject$g(val = fn.call(input))) return val;
	  if (typeof (fn = input.valueOf) == 'function' && !isObject$g(val = fn.call(input))) return val;
	  if (!PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject$g(val = fn.call(input))) return val;
	  throw TypeError("Can't convert object to primitive value");
	};

	var requireObjectCoercible$3 = requireObjectCoercible$5;

	// `ToObject` abstract operation
	// https://tc39.es/ecma262/#sec-toobject
	var toObject$8 = function (argument) {
	  return Object(requireObjectCoercible$3(argument));
	};

	var toObject$7 = toObject$8;

	var hasOwnProperty = {}.hasOwnProperty;

	var has$d = Object.hasOwn || function hasOwn(it, key) {
	  return hasOwnProperty.call(toObject$7(it), key);
	};

	var global$m = global$n;
	var isObject$f = isObject$h;

	var document$3 = global$m.document;
	// typeof document.createElement is 'object' in old IE
	var EXISTS = isObject$f(document$3) && isObject$f(document$3.createElement);

	var documentCreateElement$1 = function (it) {
	  return EXISTS ? document$3.createElement(it) : {};
	};

	var DESCRIPTORS$a = descriptors;
	var fails$k = fails$n;
	var createElement$1 = documentCreateElement$1;

	// Thank's IE8 for his funny defineProperty
	var ie8DomDefine = !DESCRIPTORS$a && !fails$k(function () {
	  // eslint-disable-next-line es/no-object-defineproperty -- requied for testing
	  return Object.defineProperty(createElement$1('div'), 'a', {
	    get: function () { return 7; }
	  }).a != 7;
	});

	var DESCRIPTORS$9 = descriptors;
	var propertyIsEnumerableModule$2 = objectPropertyIsEnumerable;
	var createPropertyDescriptor$4 = createPropertyDescriptor$5;
	var toIndexedObject$7 = toIndexedObject$8;
	var toPrimitive$3 = toPrimitive$4;
	var has$c = has$d;
	var IE8_DOM_DEFINE$1 = ie8DomDefine;

	// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
	var $getOwnPropertyDescriptor$1 = Object.getOwnPropertyDescriptor;

	// `Object.getOwnPropertyDescriptor` method
	// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
	objectGetOwnPropertyDescriptor.f = DESCRIPTORS$9 ? $getOwnPropertyDescriptor$1 : function getOwnPropertyDescriptor(O, P) {
	  O = toIndexedObject$7(O);
	  P = toPrimitive$3(P, true);
	  if (IE8_DOM_DEFINE$1) try {
	    return $getOwnPropertyDescriptor$1(O, P);
	  } catch (error) { /* empty */ }
	  if (has$c(O, P)) return createPropertyDescriptor$4(!propertyIsEnumerableModule$2.f.call(O, P), O[P]);
	};

	var objectDefineProperty = {};

	var isObject$e = isObject$h;

	var anObject$e = function (it) {
	  if (!isObject$e(it)) {
	    throw TypeError(String(it) + ' is not an object');
	  } return it;
	};

	var DESCRIPTORS$8 = descriptors;
	var IE8_DOM_DEFINE = ie8DomDefine;
	var anObject$d = anObject$e;
	var toPrimitive$2 = toPrimitive$4;

	// eslint-disable-next-line es/no-object-defineproperty -- safe
	var $defineProperty$1 = Object.defineProperty;

	// `Object.defineProperty` method
	// https://tc39.es/ecma262/#sec-object.defineproperty
	objectDefineProperty.f = DESCRIPTORS$8 ? $defineProperty$1 : function defineProperty(O, P, Attributes) {
	  anObject$d(O);
	  P = toPrimitive$2(P, true);
	  anObject$d(Attributes);
	  if (IE8_DOM_DEFINE) try {
	    return $defineProperty$1(O, P, Attributes);
	  } catch (error) { /* empty */ }
	  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
	  if ('value' in Attributes) O[P] = Attributes.value;
	  return O;
	};

	var DESCRIPTORS$7 = descriptors;
	var definePropertyModule$6 = objectDefineProperty;
	var createPropertyDescriptor$3 = createPropertyDescriptor$5;

	var createNonEnumerableProperty$a = DESCRIPTORS$7 ? function (object, key, value) {
	  return definePropertyModule$6.f(object, key, createPropertyDescriptor$3(1, value));
	} : function (object, key, value) {
	  object[key] = value;
	  return object;
	};

	var redefine$9 = {exports: {}};

	var global$l = global$n;
	var createNonEnumerableProperty$9 = createNonEnumerableProperty$a;

	var setGlobal$3 = function (key, value) {
	  try {
	    createNonEnumerableProperty$9(global$l, key, value);
	  } catch (error) {
	    global$l[key] = value;
	  } return value;
	};

	var global$k = global$n;
	var setGlobal$2 = setGlobal$3;

	var SHARED = '__core-js_shared__';
	var store$3 = global$k[SHARED] || setGlobal$2(SHARED, {});

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

	var global$j = global$n;
	var inspectSource$2 = inspectSource$3;

	var WeakMap$1 = global$j.WeakMap;

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

	var keys = shared$4('keys');

	var sharedKey$4 = function (key) {
	  return keys[key] || (keys[key] = uid$3(key));
	};

	var hiddenKeys$6 = {};

	var NATIVE_WEAK_MAP = nativeWeakMap;
	var global$i = global$n;
	var isObject$d = isObject$h;
	var createNonEnumerableProperty$8 = createNonEnumerableProperty$a;
	var objectHas = has$d;
	var shared$3 = sharedStore;
	var sharedKey$3 = sharedKey$4;
	var hiddenKeys$5 = hiddenKeys$6;

	var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
	var WeakMap = global$i.WeakMap;
	var set$1, get, has$b;

	var enforce = function (it) {
	  return has$b(it) ? get(it) : set$1(it, {});
	};

	var getterFor = function (TYPE) {
	  return function (it) {
	    var state;
	    if (!isObject$d(it) || (state = get(it)).type !== TYPE) {
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
	  has$b = function (it) {
	    return wmhas.call(store, it);
	  };
	} else {
	  var STATE = sharedKey$3('state');
	  hiddenKeys$5[STATE] = true;
	  set$1 = function (it, metadata) {
	    if (objectHas(it, STATE)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
	    metadata.facade = it;
	    createNonEnumerableProperty$8(it, STATE, metadata);
	    return metadata;
	  };
	  get = function (it) {
	    return objectHas(it, STATE) ? it[STATE] : {};
	  };
	  has$b = function (it) {
	    return objectHas(it, STATE);
	  };
	}

	var internalState = {
	  set: set$1,
	  get: get,
	  has: has$b,
	  enforce: enforce,
	  getterFor: getterFor
	};

	var global$h = global$n;
	var createNonEnumerableProperty$7 = createNonEnumerableProperty$a;
	var has$a = has$d;
	var setGlobal$1 = setGlobal$3;
	var inspectSource$1 = inspectSource$3;
	var InternalStateModule$5 = internalState;

	var getInternalState$5 = InternalStateModule$5.get;
	var enforceInternalState = InternalStateModule$5.enforce;
	var TEMPLATE = String(String).split('String');

	(redefine$9.exports = function (O, key, value, options) {
	  var unsafe = options ? !!options.unsafe : false;
	  var simple = options ? !!options.enumerable : false;
	  var noTargetGet = options ? !!options.noTargetGet : false;
	  var state;
	  if (typeof value == 'function') {
	    if (typeof key == 'string' && !has$a(value, 'name')) {
	      createNonEnumerableProperty$7(value, 'name', key);
	    }
	    state = enforceInternalState(value);
	    if (!state.source) {
	      state.source = TEMPLATE.join(typeof key == 'string' ? key : '');
	    }
	  }
	  if (O === global$h) {
	    if (simple) O[key] = value;
	    else setGlobal$1(key, value);
	    return;
	  } else if (!unsafe) {
	    delete O[key];
	  } else if (!noTargetGet && O[key]) {
	    simple = true;
	  }
	  if (simple) O[key] = value;
	  else createNonEnumerableProperty$7(O, key, value);
	// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
	})(Function.prototype, 'toString', function toString() {
	  return typeof this == 'function' && getInternalState$5(this).source || inspectSource$1(this);
	});

	var global$g = global$n;

	var path$2 = global$g;

	var path$1 = path$2;
	var global$f = global$n;

	var aFunction$7 = function (variable) {
	  return typeof variable == 'function' ? variable : undefined;
	};

	var getBuiltIn$7 = function (namespace, method) {
	  return arguments.length < 2 ? aFunction$7(path$1[namespace]) || aFunction$7(global$f[namespace])
	    : path$1[namespace] && path$1[namespace][method] || global$f[namespace] && global$f[namespace][method];
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

	var min$3 = Math.min;

	// `ToLength` abstract operation
	// https://tc39.es/ecma262/#sec-tolength
	var toLength$7 = function (argument) {
	  return argument > 0 ? min$3(toInteger$4(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
	};

	var toInteger$3 = toInteger$5;

	var max$3 = Math.max;
	var min$2 = Math.min;

	// Helper for a popular repeating case of the spec:
	// Let integer be ? ToInteger(index).
	// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
	var toAbsoluteIndex$3 = function (index, length) {
	  var integer = toInteger$3(index);
	  return integer < 0 ? max$3(integer + length, 0) : min$2(integer, length);
	};

	var toIndexedObject$6 = toIndexedObject$8;
	var toLength$6 = toLength$7;
	var toAbsoluteIndex$2 = toAbsoluteIndex$3;

	// `Array.prototype.{ indexOf, includes }` methods implementation
	var createMethod$2 = function (IS_INCLUDES) {
	  return function ($this, el, fromIndex) {
	    var O = toIndexedObject$6($this);
	    var length = toLength$6(O.length);
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
	  includes: createMethod$2(true),
	  // `Array.prototype.indexOf` method
	  // https://tc39.es/ecma262/#sec-array.prototype.indexof
	  indexOf: createMethod$2(false)
	};

	var has$9 = has$d;
	var toIndexedObject$5 = toIndexedObject$8;
	var indexOf = arrayIncludes.indexOf;
	var hiddenKeys$4 = hiddenKeys$6;

	var objectKeysInternal = function (object, names) {
	  var O = toIndexedObject$5(object);
	  var i = 0;
	  var result = [];
	  var key;
	  for (key in O) !has$9(hiddenKeys$4, key) && has$9(O, key) && result.push(key);
	  // Don't enum bug & hidden keys
	  while (names.length > i) if (has$9(O, key = names[i++])) {
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

	var getBuiltIn$6 = getBuiltIn$7;
	var getOwnPropertyNamesModule$1 = objectGetOwnPropertyNames;
	var getOwnPropertySymbolsModule$2 = objectGetOwnPropertySymbols;
	var anObject$c = anObject$e;

	// all object keys, includes non-enumerable and symbols
	var ownKeys$1 = getBuiltIn$6('Reflect', 'ownKeys') || function ownKeys(it) {
	  var keys = getOwnPropertyNamesModule$1.f(anObject$c(it));
	  var getOwnPropertySymbols = getOwnPropertySymbolsModule$2.f;
	  return getOwnPropertySymbols ? keys.concat(getOwnPropertySymbols(it)) : keys;
	};

	var has$8 = has$d;
	var ownKeys = ownKeys$1;
	var getOwnPropertyDescriptorModule$1 = objectGetOwnPropertyDescriptor;
	var definePropertyModule$5 = objectDefineProperty;

	var copyConstructorProperties$2 = function (target, source) {
	  var keys = ownKeys(source);
	  var defineProperty = definePropertyModule$5.f;
	  var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule$1.f;
	  for (var i = 0; i < keys.length; i++) {
	    var key = keys[i];
	    if (!has$8(target, key)) defineProperty(target, key, getOwnPropertyDescriptor(source, key));
	  }
	};

	var fails$j = fails$n;

	var replacement = /#|\.prototype\./;

	var isForced$3 = function (feature, detection) {
	  var value = data[normalize(feature)];
	  return value == POLYFILL ? true
	    : value == NATIVE ? false
	    : typeof detection == 'function' ? fails$j(detection)
	    : !!detection;
	};

	var normalize = isForced$3.normalize = function (string) {
	  return String(string).replace(replacement, '.').toLowerCase();
	};

	var data = isForced$3.data = {};
	var NATIVE = isForced$3.NATIVE = 'N';
	var POLYFILL = isForced$3.POLYFILL = 'P';

	var isForced_1 = isForced$3;

	var global$e = global$n;
	var getOwnPropertyDescriptor$1 = objectGetOwnPropertyDescriptor.f;
	var createNonEnumerableProperty$6 = createNonEnumerableProperty$a;
	var redefine$8 = redefine$9.exports;
	var setGlobal = setGlobal$3;
	var copyConstructorProperties$1 = copyConstructorProperties$2;
	var isForced$2 = isForced_1;

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
	    target = global$e;
	  } else if (STATIC) {
	    target = global$e[TARGET] || setGlobal(TARGET, {});
	  } else {
	    target = (global$e[TARGET] || {}).prototype;
	  }
	  if (target) for (key in source) {
	    sourceProperty = source[key];
	    if (options.noTargetGet) {
	      descriptor = getOwnPropertyDescriptor$1(target, key);
	      targetProperty = descriptor && descriptor.value;
	    } else targetProperty = target[key];
	    FORCED = isForced$2(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
	    // contained in target
	    if (!FORCED && targetProperty !== undefined) {
	      if (typeof sourceProperty === typeof targetProperty) continue;
	      copyConstructorProperties$1(sourceProperty, targetProperty);
	    }
	    // add a flag to not completely full polyfills
	    if (options.sham || (targetProperty && targetProperty.sham)) {
	      createNonEnumerableProperty$6(sourceProperty, 'sham', true);
	    }
	    // extend global
	    redefine$8(target, key, sourceProperty, options);
	  }
	};

	var internalObjectKeys = objectKeysInternal;
	var enumBugKeys$1 = enumBugKeys$3;

	// `Object.keys` method
	// https://tc39.es/ecma262/#sec-object.keys
	// eslint-disable-next-line es/no-object-keys -- safe
	var objectKeys$3 = Object.keys || function keys(O) {
	  return internalObjectKeys(O, enumBugKeys$1);
	};

	var DESCRIPTORS$6 = descriptors;
	var fails$i = fails$n;
	var objectKeys$2 = objectKeys$3;
	var getOwnPropertySymbolsModule$1 = objectGetOwnPropertySymbols;
	var propertyIsEnumerableModule$1 = objectPropertyIsEnumerable;
	var toObject$6 = toObject$8;
	var IndexedObject$2 = indexedObject;

	// eslint-disable-next-line es/no-object-assign -- safe
	var $assign = Object.assign;
	// eslint-disable-next-line es/no-object-defineproperty -- required for testing
	var defineProperty$6 = Object.defineProperty;

	// `Object.assign` method
	// https://tc39.es/ecma262/#sec-object.assign
	var objectAssign = !$assign || fails$i(function () {
	  // should have correct order of operations (Edge bug)
	  if (DESCRIPTORS$6 && $assign({ b: 1 }, $assign(defineProperty$6({}, 'a', {
	    enumerable: true,
	    get: function () {
	      defineProperty$6(this, 'b', {
	        value: 3,
	        enumerable: false
	      });
	    }
	  }), { b: 2 })).b !== 1) return true;
	  // should work with symbols and should have deterministic property order (V8 bug)
	  var A = {};
	  var B = {};
	  // eslint-disable-next-line es/no-symbol -- safe
	  var symbol = Symbol();
	  var alphabet = 'abcdefghijklmnopqrst';
	  A[symbol] = 7;
	  alphabet.split('').forEach(function (chr) { B[chr] = chr; });
	  return $assign({}, A)[symbol] != 7 || objectKeys$2($assign({}, B)).join('') != alphabet;
	}) ? function assign(target, source) { // eslint-disable-line no-unused-vars -- required for `.length`
	  var T = toObject$6(target);
	  var argumentsLength = arguments.length;
	  var index = 1;
	  var getOwnPropertySymbols = getOwnPropertySymbolsModule$1.f;
	  var propertyIsEnumerable = propertyIsEnumerableModule$1.f;
	  while (argumentsLength > index) {
	    var S = IndexedObject$2(arguments[index++]);
	    var keys = getOwnPropertySymbols ? objectKeys$2(S).concat(getOwnPropertySymbols(S)) : objectKeys$2(S);
	    var length = keys.length;
	    var j = 0;
	    var key;
	    while (length > j) {
	      key = keys[j++];
	      if (!DESCRIPTORS$6 || propertyIsEnumerable.call(S, key)) T[key] = S[key];
	    }
	  } return T;
	} : $assign;

	var $$g = _export;
	var assign = objectAssign;

	// `Object.assign` method
	// https://tc39.es/ecma262/#sec-object.assign
	// eslint-disable-next-line es/no-object-assign -- required for testing
	$$g({ target: 'Object', stat: true, forced: Object.assign !== assign }, {
	  assign: assign
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

	var DESCRIPTORS$5 = descriptors;
	var defineProperty$5 = objectDefineProperty.f;

	var FunctionPrototype = Function.prototype;
	var FunctionPrototypeToString = FunctionPrototype.toString;
	var nameRE = /^\s*function ([^ (]*)/;
	var NAME = 'name';

	// Function instances `.name` property
	// https://tc39.es/ecma262/#sec-function-instances-name
	if (DESCRIPTORS$5 && !(NAME in FunctionPrototype)) {
	  defineProperty$5(FunctionPrototype, NAME, {
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

	var getBuiltIn$5 = getBuiltIn$7;

	var engineUserAgent = getBuiltIn$5('navigator', 'userAgent') || '';

	var global$d = global$n;
	var userAgent$2 = engineUserAgent;

	var process$3 = global$d.process;
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
	var fails$h = fails$n;

	// eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing
	var nativeSymbol = !!Object.getOwnPropertySymbols && !fails$h(function () {
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

	var classof$5 = classofRaw$1;

	// `IsArray` abstract operation
	// https://tc39.es/ecma262/#sec-isarray
	// eslint-disable-next-line es/no-array-isarray -- safe
	var isArray$4 = Array.isArray || function isArray(arg) {
	  return classof$5(arg) == 'Array';
	};

	var DESCRIPTORS$4 = descriptors;
	var definePropertyModule$4 = objectDefineProperty;
	var anObject$b = anObject$e;
	var objectKeys$1 = objectKeys$3;

	// `Object.defineProperties` method
	// https://tc39.es/ecma262/#sec-object.defineproperties
	// eslint-disable-next-line es/no-object-defineproperties -- safe
	var objectDefineProperties = DESCRIPTORS$4 ? Object.defineProperties : function defineProperties(O, Properties) {
	  anObject$b(O);
	  var keys = objectKeys$1(Properties);
	  var length = keys.length;
	  var index = 0;
	  var key;
	  while (length > index) definePropertyModule$4.f(O, key = keys[index++], Properties[key]);
	  return O;
	};

	var getBuiltIn$4 = getBuiltIn$7;

	var html$2 = getBuiltIn$4('document', 'documentElement');

	var anObject$a = anObject$e;
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
	    EmptyConstructor[PROTOTYPE$1] = anObject$a(O);
	    result = new EmptyConstructor();
	    EmptyConstructor[PROTOTYPE$1] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO$1] = O;
	  } else result = NullProtoObject();
	  return Properties === undefined ? result : defineProperties(result, Properties);
	};

	var objectGetOwnPropertyNamesExternal = {};

	/* eslint-disable es/no-object-getownpropertynames -- safe */

	var toIndexedObject$4 = toIndexedObject$8;
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
	    : $getOwnPropertyNames$1(toIndexedObject$4(it));
	};

	var global$c = global$n;
	var shared$2 = shared$5.exports;
	var has$7 = has$d;
	var uid$2 = uid$4;
	var NATIVE_SYMBOL$1 = nativeSymbol;
	var USE_SYMBOL_AS_UID$1 = useSymbolAsUid;

	var WellKnownSymbolsStore$1 = shared$2('wks');
	var Symbol$1 = global$c.Symbol;
	var createWellKnownSymbol = USE_SYMBOL_AS_UID$1 ? Symbol$1 : Symbol$1 && Symbol$1.withoutSetter || uid$2;

	var wellKnownSymbol$l = function (name) {
	  if (!has$7(WellKnownSymbolsStore$1, name) || !(NATIVE_SYMBOL$1 || typeof WellKnownSymbolsStore$1[name] == 'string')) {
	    if (NATIVE_SYMBOL$1 && has$7(Symbol$1, name)) {
	      WellKnownSymbolsStore$1[name] = Symbol$1[name];
	    } else {
	      WellKnownSymbolsStore$1[name] = createWellKnownSymbol('Symbol.' + name);
	    }
	  } return WellKnownSymbolsStore$1[name];
	};

	var wellKnownSymbolWrapped = {};

	var wellKnownSymbol$k = wellKnownSymbol$l;

	wellKnownSymbolWrapped.f = wellKnownSymbol$k;

	var path = path$2;
	var has$6 = has$d;
	var wrappedWellKnownSymbolModule$1 = wellKnownSymbolWrapped;
	var defineProperty$4 = objectDefineProperty.f;

	var defineWellKnownSymbol$1 = function (NAME) {
	  var Symbol = path.Symbol || (path.Symbol = {});
	  if (!has$6(Symbol, NAME)) defineProperty$4(Symbol, NAME, {
	    value: wrappedWellKnownSymbolModule$1.f(NAME)
	  });
	};

	var defineProperty$3 = objectDefineProperty.f;
	var has$5 = has$d;
	var wellKnownSymbol$j = wellKnownSymbol$l;

	var TO_STRING_TAG$3 = wellKnownSymbol$j('toStringTag');

	var setToStringTag$5 = function (it, TAG, STATIC) {
	  if (it && !has$5(it = STATIC ? it : it.prototype, TO_STRING_TAG$3)) {
	    defineProperty$3(it, TO_STRING_TAG$3, { configurable: true, value: TAG });
	  }
	};

	var aFunction$6 = function (it) {
	  if (typeof it != 'function') {
	    throw TypeError(String(it) + ' is not a function');
	  } return it;
	};

	var aFunction$5 = aFunction$6;

	// optional / simple context binding
	var functionBindContext = function (fn, that, length) {
	  aFunction$5(fn);
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

	var isObject$c = isObject$h;
	var isArray$3 = isArray$4;
	var wellKnownSymbol$i = wellKnownSymbol$l;

	var SPECIES$6 = wellKnownSymbol$i('species');

	// `ArraySpeciesCreate` abstract operation
	// https://tc39.es/ecma262/#sec-arrayspeciescreate
	var arraySpeciesCreate$3 = function (originalArray, length) {
	  var C;
	  if (isArray$3(originalArray)) {
	    C = originalArray.constructor;
	    // cross-realm fallback
	    if (typeof C == 'function' && (C === Array || isArray$3(C.prototype))) C = undefined;
	    else if (isObject$c(C)) {
	      C = C[SPECIES$6];
	      if (C === null) C = undefined;
	    }
	  } return new (C === undefined ? Array : C)(length === 0 ? 0 : length);
	};

	var bind$5 = functionBindContext;
	var IndexedObject$1 = indexedObject;
	var toObject$5 = toObject$8;
	var toLength$5 = toLength$7;
	var arraySpeciesCreate$2 = arraySpeciesCreate$3;

	var push = [].push;

	// `Array.prototype.{ forEach, map, filter, some, every, find, findIndex, filterOut }` methods implementation
	var createMethod$1 = function (TYPE) {
	  var IS_MAP = TYPE == 1;
	  var IS_FILTER = TYPE == 2;
	  var IS_SOME = TYPE == 3;
	  var IS_EVERY = TYPE == 4;
	  var IS_FIND_INDEX = TYPE == 6;
	  var IS_FILTER_OUT = TYPE == 7;
	  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
	  return function ($this, callbackfn, that, specificCreate) {
	    var O = toObject$5($this);
	    var self = IndexedObject$1(O);
	    var boundFunction = bind$5(callbackfn, that, 3);
	    var length = toLength$5(self.length);
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
	  forEach: createMethod$1(0),
	  // `Array.prototype.map` method
	  // https://tc39.es/ecma262/#sec-array.prototype.map
	  map: createMethod$1(1),
	  // `Array.prototype.filter` method
	  // https://tc39.es/ecma262/#sec-array.prototype.filter
	  filter: createMethod$1(2),
	  // `Array.prototype.some` method
	  // https://tc39.es/ecma262/#sec-array.prototype.some
	  some: createMethod$1(3),
	  // `Array.prototype.every` method
	  // https://tc39.es/ecma262/#sec-array.prototype.every
	  every: createMethod$1(4),
	  // `Array.prototype.find` method
	  // https://tc39.es/ecma262/#sec-array.prototype.find
	  find: createMethod$1(5),
	  // `Array.prototype.findIndex` method
	  // https://tc39.es/ecma262/#sec-array.prototype.findIndex
	  findIndex: createMethod$1(6),
	  // `Array.prototype.filterOut` method
	  // https://github.com/tc39/proposal-array-filtering
	  filterOut: createMethod$1(7)
	};

	var $$f = _export;
	var global$b = global$n;
	var getBuiltIn$3 = getBuiltIn$7;
	var DESCRIPTORS$3 = descriptors;
	var NATIVE_SYMBOL = nativeSymbol;
	var USE_SYMBOL_AS_UID = useSymbolAsUid;
	var fails$g = fails$n;
	var has$4 = has$d;
	var isArray$2 = isArray$4;
	var isObject$b = isObject$h;
	var anObject$9 = anObject$e;
	var toObject$4 = toObject$8;
	var toIndexedObject$3 = toIndexedObject$8;
	var toPrimitive$1 = toPrimitive$4;
	var createPropertyDescriptor$2 = createPropertyDescriptor$5;
	var nativeObjectCreate = objectCreate;
	var objectKeys = objectKeys$3;
	var getOwnPropertyNamesModule = objectGetOwnPropertyNames;
	var getOwnPropertyNamesExternal = objectGetOwnPropertyNamesExternal;
	var getOwnPropertySymbolsModule = objectGetOwnPropertySymbols;
	var getOwnPropertyDescriptorModule = objectGetOwnPropertyDescriptor;
	var definePropertyModule$3 = objectDefineProperty;
	var propertyIsEnumerableModule = objectPropertyIsEnumerable;
	var createNonEnumerableProperty$5 = createNonEnumerableProperty$a;
	var redefine$7 = redefine$9.exports;
	var shared$1 = shared$5.exports;
	var sharedKey$1 = sharedKey$4;
	var hiddenKeys$1 = hiddenKeys$6;
	var uid$1 = uid$4;
	var wellKnownSymbol$h = wellKnownSymbol$l;
	var wrappedWellKnownSymbolModule = wellKnownSymbolWrapped;
	var defineWellKnownSymbol = defineWellKnownSymbol$1;
	var setToStringTag$4 = setToStringTag$5;
	var InternalStateModule$4 = internalState;
	var $forEach$1 = arrayIteration.forEach;

	var HIDDEN = sharedKey$1('hidden');
	var SYMBOL = 'Symbol';
	var PROTOTYPE = 'prototype';
	var TO_PRIMITIVE = wellKnownSymbol$h('toPrimitive');
	var setInternalState$4 = InternalStateModule$4.set;
	var getInternalState$4 = InternalStateModule$4.getterFor(SYMBOL);
	var ObjectPrototype$1 = Object[PROTOTYPE];
	var $Symbol = global$b.Symbol;
	var $stringify = getBuiltIn$3('JSON', 'stringify');
	var nativeGetOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
	var nativeDefineProperty = definePropertyModule$3.f;
	var nativeGetOwnPropertyNames = getOwnPropertyNamesExternal.f;
	var nativePropertyIsEnumerable = propertyIsEnumerableModule.f;
	var AllSymbols = shared$1('symbols');
	var ObjectPrototypeSymbols = shared$1('op-symbols');
	var StringToSymbolRegistry = shared$1('string-to-symbol-registry');
	var SymbolToStringRegistry = shared$1('symbol-to-string-registry');
	var WellKnownSymbolsStore = shared$1('wks');
	var QObject = global$b.QObject;
	// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
	var USE_SETTER = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

	// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
	var setSymbolDescriptor = DESCRIPTORS$3 && fails$g(function () {
	  return nativeObjectCreate(nativeDefineProperty({}, 'a', {
	    get: function () { return nativeDefineProperty(this, 'a', { value: 7 }).a; }
	  })).a != 7;
	}) ? function (O, P, Attributes) {
	  var ObjectPrototypeDescriptor = nativeGetOwnPropertyDescriptor(ObjectPrototype$1, P);
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
	  if (!DESCRIPTORS$3) symbol.description = description;
	  return symbol;
	};

	var isSymbol = USE_SYMBOL_AS_UID ? function (it) {
	  return typeof it == 'symbol';
	} : function (it) {
	  return Object(it) instanceof $Symbol;
	};

	var $defineProperty = function defineProperty(O, P, Attributes) {
	  if (O === ObjectPrototype$1) $defineProperty(ObjectPrototypeSymbols, P, Attributes);
	  anObject$9(O);
	  var key = toPrimitive$1(P, true);
	  anObject$9(Attributes);
	  if (has$4(AllSymbols, key)) {
	    if (!Attributes.enumerable) {
	      if (!has$4(O, HIDDEN)) nativeDefineProperty(O, HIDDEN, createPropertyDescriptor$2(1, {}));
	      O[HIDDEN][key] = true;
	    } else {
	      if (has$4(O, HIDDEN) && O[HIDDEN][key]) O[HIDDEN][key] = false;
	      Attributes = nativeObjectCreate(Attributes, { enumerable: createPropertyDescriptor$2(0, false) });
	    } return setSymbolDescriptor(O, key, Attributes);
	  } return nativeDefineProperty(O, key, Attributes);
	};

	var $defineProperties = function defineProperties(O, Properties) {
	  anObject$9(O);
	  var properties = toIndexedObject$3(Properties);
	  var keys = objectKeys(properties).concat($getOwnPropertySymbols(properties));
	  $forEach$1(keys, function (key) {
	    if (!DESCRIPTORS$3 || $propertyIsEnumerable.call(properties, key)) $defineProperty(O, key, properties[key]);
	  });
	  return O;
	};

	var $create = function create(O, Properties) {
	  return Properties === undefined ? nativeObjectCreate(O) : $defineProperties(nativeObjectCreate(O), Properties);
	};

	var $propertyIsEnumerable = function propertyIsEnumerable(V) {
	  var P = toPrimitive$1(V, true);
	  var enumerable = nativePropertyIsEnumerable.call(this, P);
	  if (this === ObjectPrototype$1 && has$4(AllSymbols, P) && !has$4(ObjectPrototypeSymbols, P)) return false;
	  return enumerable || !has$4(this, P) || !has$4(AllSymbols, P) || has$4(this, HIDDEN) && this[HIDDEN][P] ? enumerable : true;
	};

	var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(O, P) {
	  var it = toIndexedObject$3(O);
	  var key = toPrimitive$1(P, true);
	  if (it === ObjectPrototype$1 && has$4(AllSymbols, key) && !has$4(ObjectPrototypeSymbols, key)) return;
	  var descriptor = nativeGetOwnPropertyDescriptor(it, key);
	  if (descriptor && has$4(AllSymbols, key) && !(has$4(it, HIDDEN) && it[HIDDEN][key])) {
	    descriptor.enumerable = true;
	  }
	  return descriptor;
	};

	var $getOwnPropertyNames = function getOwnPropertyNames(O) {
	  var names = nativeGetOwnPropertyNames(toIndexedObject$3(O));
	  var result = [];
	  $forEach$1(names, function (key) {
	    if (!has$4(AllSymbols, key) && !has$4(hiddenKeys$1, key)) result.push(key);
	  });
	  return result;
	};

	var $getOwnPropertySymbols = function getOwnPropertySymbols(O) {
	  var IS_OBJECT_PROTOTYPE = O === ObjectPrototype$1;
	  var names = nativeGetOwnPropertyNames(IS_OBJECT_PROTOTYPE ? ObjectPrototypeSymbols : toIndexedObject$3(O));
	  var result = [];
	  $forEach$1(names, function (key) {
	    if (has$4(AllSymbols, key) && (!IS_OBJECT_PROTOTYPE || has$4(ObjectPrototype$1, key))) {
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
	      if (has$4(this, HIDDEN) && has$4(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
	      setSymbolDescriptor(this, tag, createPropertyDescriptor$2(1, value));
	    };
	    if (DESCRIPTORS$3 && USE_SETTER) setSymbolDescriptor(ObjectPrototype$1, tag, { configurable: true, set: setter });
	    return wrap(tag, description);
	  };

	  redefine$7($Symbol[PROTOTYPE], 'toString', function toString() {
	    return getInternalState$4(this).tag;
	  });

	  redefine$7($Symbol, 'withoutSetter', function (description) {
	    return wrap(uid$1(description), description);
	  });

	  propertyIsEnumerableModule.f = $propertyIsEnumerable;
	  definePropertyModule$3.f = $defineProperty;
	  getOwnPropertyDescriptorModule.f = $getOwnPropertyDescriptor;
	  getOwnPropertyNamesModule.f = getOwnPropertyNamesExternal.f = $getOwnPropertyNames;
	  getOwnPropertySymbolsModule.f = $getOwnPropertySymbols;

	  wrappedWellKnownSymbolModule.f = function (name) {
	    return wrap(wellKnownSymbol$h(name), name);
	  };

	  if (DESCRIPTORS$3) {
	    // https://github.com/tc39/proposal-Symbol-description
	    nativeDefineProperty($Symbol[PROTOTYPE], 'description', {
	      configurable: true,
	      get: function description() {
	        return getInternalState$4(this).description;
	      }
	    });
	    {
	      redefine$7(ObjectPrototype$1, 'propertyIsEnumerable', $propertyIsEnumerable, { unsafe: true });
	    }
	  }
	}

	$$f({ global: true, wrap: true, forced: !NATIVE_SYMBOL, sham: !NATIVE_SYMBOL }, {
	  Symbol: $Symbol
	});

	$forEach$1(objectKeys(WellKnownSymbolsStore), function (name) {
	  defineWellKnownSymbol(name);
	});

	$$f({ target: SYMBOL, stat: true, forced: !NATIVE_SYMBOL }, {
	  // `Symbol.for` method
	  // https://tc39.es/ecma262/#sec-symbol.for
	  'for': function (key) {
	    var string = String(key);
	    if (has$4(StringToSymbolRegistry, string)) return StringToSymbolRegistry[string];
	    var symbol = $Symbol(string);
	    StringToSymbolRegistry[string] = symbol;
	    SymbolToStringRegistry[symbol] = string;
	    return symbol;
	  },
	  // `Symbol.keyFor` method
	  // https://tc39.es/ecma262/#sec-symbol.keyfor
	  keyFor: function keyFor(sym) {
	    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol');
	    if (has$4(SymbolToStringRegistry, sym)) return SymbolToStringRegistry[sym];
	  },
	  useSetter: function () { USE_SETTER = true; },
	  useSimple: function () { USE_SETTER = false; }
	});

	$$f({ target: 'Object', stat: true, forced: !NATIVE_SYMBOL, sham: !DESCRIPTORS$3 }, {
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

	$$f({ target: 'Object', stat: true, forced: !NATIVE_SYMBOL }, {
	  // `Object.getOwnPropertyNames` method
	  // https://tc39.es/ecma262/#sec-object.getownpropertynames
	  getOwnPropertyNames: $getOwnPropertyNames,
	  // `Object.getOwnPropertySymbols` method
	  // https://tc39.es/ecma262/#sec-object.getownpropertysymbols
	  getOwnPropertySymbols: $getOwnPropertySymbols
	});

	// Chrome 38 and 39 `Object.getOwnPropertySymbols` fails on primitives
	// https://bugs.chromium.org/p/v8/issues/detail?id=3443
	$$f({ target: 'Object', stat: true, forced: fails$g(function () { getOwnPropertySymbolsModule.f(1); }) }, {
	  getOwnPropertySymbols: function getOwnPropertySymbols(it) {
	    return getOwnPropertySymbolsModule.f(toObject$4(it));
	  }
	});

	// `JSON.stringify` method behavior with symbols
	// https://tc39.es/ecma262/#sec-json.stringify
	if ($stringify) {
	  var FORCED_JSON_STRINGIFY = !NATIVE_SYMBOL || fails$g(function () {
	    var symbol = $Symbol();
	    // MS Edge converts symbol values to JSON as {}
	    return $stringify([symbol]) != '[null]'
	      // WebKit converts symbol values to JSON as null
	      || $stringify({ a: symbol }) != '{}'
	      // V8 throws on boxed symbols
	      || $stringify(Object(symbol)) != '{}';
	  });

	  $$f({ target: 'JSON', stat: true, forced: FORCED_JSON_STRINGIFY }, {
	    // eslint-disable-next-line no-unused-vars -- required for `.length`
	    stringify: function stringify(it, replacer, space) {
	      var args = [it];
	      var index = 1;
	      var $replacer;
	      while (arguments.length > index) args.push(arguments[index++]);
	      $replacer = replacer;
	      if (!isObject$b(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
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
	  createNonEnumerableProperty$5($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
	}
	// `Symbol.prototype[@@toStringTag]` property
	// https://tc39.es/ecma262/#sec-symbol.prototype-@@tostringtag
	setToStringTag$4($Symbol, SYMBOL);

	hiddenKeys$1[HIDDEN] = true;

	var $$e = _export;
	var DESCRIPTORS$2 = descriptors;
	var global$a = global$n;
	var has$3 = has$d;
	var isObject$a = isObject$h;
	var defineProperty$2 = objectDefineProperty.f;
	var copyConstructorProperties = copyConstructorProperties$2;

	var NativeSymbol = global$a.Symbol;

	if (DESCRIPTORS$2 && typeof NativeSymbol == 'function' && (!('description' in NativeSymbol.prototype) ||
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
	      var symbol = isObject$a(this) ? this.valueOf() : this;
	      var string = symbolToString.call(symbol);
	      if (has$3(EmptyStringDescriptionStore, symbol)) return '';
	      var desc = native ? string.slice(7, -1) : string.replace(regexp, '$1');
	      return desc === '' ? undefined : desc;
	    }
	  });

	  $$e({ global: true, forced: true }, {
	    Symbol: SymbolWrapper
	  });
	}

	var wellKnownSymbol$g = wellKnownSymbol$l;

	var TO_STRING_TAG$2 = wellKnownSymbol$g('toStringTag');
	var test = {};

	test[TO_STRING_TAG$2] = 'z';

	var toStringTagSupport = String(test) === '[object z]';

	var TO_STRING_TAG_SUPPORT$2 = toStringTagSupport;
	var classofRaw = classofRaw$1;
	var wellKnownSymbol$f = wellKnownSymbol$l;

	var TO_STRING_TAG$1 = wellKnownSymbol$f('toStringTag');
	// ES3 wrong here
	var CORRECT_ARGUMENTS = classofRaw(function () { return arguments; }()) == 'Arguments';

	// fallback for IE11 Script Access Denied error
	var tryGet = function (it, key) {
	  try {
	    return it[key];
	  } catch (error) { /* empty */ }
	};

	// getting tag from ES6+ `Object.prototype.toString`
	var classof$4 = TO_STRING_TAG_SUPPORT$2 ? classofRaw : function (it) {
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
	var classof$3 = classof$4;

	// `Object.prototype.toString` method implementation
	// https://tc39.es/ecma262/#sec-object.prototype.tostring
	var objectToString = TO_STRING_TAG_SUPPORT$1 ? {}.toString : function toString() {
	  return '[object ' + classof$3(this) + ']';
	};

	var TO_STRING_TAG_SUPPORT = toStringTagSupport;
	var redefine$6 = redefine$9.exports;
	var toString = objectToString;

	// `Object.prototype.toString` method
	// https://tc39.es/ecma262/#sec-object.prototype.tostring
	if (!TO_STRING_TAG_SUPPORT) {
	  redefine$6(Object.prototype, 'toString', toString, { unsafe: true });
	}

	var fails$f = fails$n;
	var wellKnownSymbol$e = wellKnownSymbol$l;
	var V8_VERSION$2 = engineV8Version;

	var SPECIES$5 = wellKnownSymbol$e('species');

	var arrayMethodHasSpeciesSupport$5 = function (METHOD_NAME) {
	  // We can't use this feature detection in V8 since it causes
	  // deoptimization and serious performance degradation
	  // https://github.com/zloirock/core-js/issues/677
	  return V8_VERSION$2 >= 51 || !fails$f(function () {
	    var array = [];
	    var constructor = array.constructor = {};
	    constructor[SPECIES$5] = function () {
	      return { foo: 1 };
	    };
	    return array[METHOD_NAME](Boolean).foo !== 1;
	  });
	};

	var $$d = _export;
	var $map = arrayIteration.map;
	var arrayMethodHasSpeciesSupport$4 = arrayMethodHasSpeciesSupport$5;

	var HAS_SPECIES_SUPPORT$3 = arrayMethodHasSpeciesSupport$4('map');

	// `Array.prototype.map` method
	// https://tc39.es/ecma262/#sec-array.prototype.map
	// with adding support of @@species
	$$d({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT$3 }, {
	  map: function map(callbackfn /* , thisArg */) {
	    return $map(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

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

	var fails$e = fails$n;

	var arrayMethodIsStrict$2 = function (METHOD_NAME, argument) {
	  var method = [][METHOD_NAME];
	  return !!method && fails$e(function () {
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

	var global$9 = global$n;
	var DOMIterables$1 = domIterables;
	var forEach = arrayForEach;
	var createNonEnumerableProperty$4 = createNonEnumerableProperty$a;

	for (var COLLECTION_NAME$1 in DOMIterables$1) {
	  var Collection$1 = global$9[COLLECTION_NAME$1];
	  var CollectionPrototype$1 = Collection$1 && Collection$1.prototype;
	  // some Chrome versions have non-configurable methods on DOMTokenList
	  if (CollectionPrototype$1 && CollectionPrototype$1.forEach !== forEach) try {
	    createNonEnumerableProperty$4(CollectionPrototype$1, 'forEach', forEach);
	  } catch (error) {
	    CollectionPrototype$1.forEach = forEach;
	  }
	}

	var toPrimitive = toPrimitive$4;
	var definePropertyModule$2 = objectDefineProperty;
	var createPropertyDescriptor$1 = createPropertyDescriptor$5;

	var createProperty$3 = function (object, key, value) {
	  var propertyKey = toPrimitive(key);
	  if (propertyKey in object) definePropertyModule$2.f(object, propertyKey, createPropertyDescriptor$1(0, value));
	  else object[propertyKey] = value;
	};

	var $$c = _export;
	var toAbsoluteIndex$1 = toAbsoluteIndex$3;
	var toInteger$2 = toInteger$5;
	var toLength$4 = toLength$7;
	var toObject$3 = toObject$8;
	var arraySpeciesCreate$1 = arraySpeciesCreate$3;
	var createProperty$2 = createProperty$3;
	var arrayMethodHasSpeciesSupport$3 = arrayMethodHasSpeciesSupport$5;

	var HAS_SPECIES_SUPPORT$2 = arrayMethodHasSpeciesSupport$3('splice');

	var max$2 = Math.max;
	var min$1 = Math.min;
	var MAX_SAFE_INTEGER$1 = 0x1FFFFFFFFFFFFF;
	var MAXIMUM_ALLOWED_LENGTH_EXCEEDED = 'Maximum allowed length exceeded';

	// `Array.prototype.splice` method
	// https://tc39.es/ecma262/#sec-array.prototype.splice
	// with adding support of @@species
	$$c({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT$2 }, {
	  splice: function splice(start, deleteCount /* , ...items */) {
	    var O = toObject$3(this);
	    var len = toLength$4(O.length);
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
	      actualDeleteCount = min$1(max$2(toInteger$2(deleteCount), 0), len - actualStart);
	    }
	    if (len + insertCount - actualDeleteCount > MAX_SAFE_INTEGER$1) {
	      throw TypeError(MAXIMUM_ALLOWED_LENGTH_EXCEEDED);
	    }
	    A = arraySpeciesCreate$1(O, actualDeleteCount);
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

	var wellKnownSymbol$d = wellKnownSymbol$l;
	var create$4 = objectCreate;
	var definePropertyModule$1 = objectDefineProperty;

	var UNSCOPABLES = wellKnownSymbol$d('unscopables');
	var ArrayPrototype$1 = Array.prototype;

	// Array.prototype[@@unscopables]
	// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
	if (ArrayPrototype$1[UNSCOPABLES] == undefined) {
	  definePropertyModule$1.f(ArrayPrototype$1, UNSCOPABLES, {
	    configurable: true,
	    value: create$4(null)
	  });
	}

	// add a key to Array.prototype[@@unscopables]
	var addToUnscopables$1 = function (key) {
	  ArrayPrototype$1[UNSCOPABLES][key] = true;
	};

	var iterators = {};

	var fails$d = fails$n;

	var correctPrototypeGetter = !fails$d(function () {
	  function F() { /* empty */ }
	  F.prototype.constructor = null;
	  // eslint-disable-next-line es/no-object-getprototypeof -- required for testing
	  return Object.getPrototypeOf(new F()) !== F.prototype;
	});

	var has$2 = has$d;
	var toObject$2 = toObject$8;
	var sharedKey = sharedKey$4;
	var CORRECT_PROTOTYPE_GETTER = correctPrototypeGetter;

	var IE_PROTO = sharedKey('IE_PROTO');
	var ObjectPrototype = Object.prototype;

	// `Object.getPrototypeOf` method
	// https://tc39.es/ecma262/#sec-object.getprototypeof
	// eslint-disable-next-line es/no-object-getprototypeof -- safe
	var objectGetPrototypeOf = CORRECT_PROTOTYPE_GETTER ? Object.getPrototypeOf : function (O) {
	  O = toObject$2(O);
	  if (has$2(O, IE_PROTO)) return O[IE_PROTO];
	  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
	    return O.constructor.prototype;
	  } return O instanceof Object ? ObjectPrototype : null;
	};

	var fails$c = fails$n;
	var getPrototypeOf$1 = objectGetPrototypeOf;
	var createNonEnumerableProperty$3 = createNonEnumerableProperty$a;
	var has$1 = has$d;
	var wellKnownSymbol$c = wellKnownSymbol$l;

	var ITERATOR$5 = wellKnownSymbol$c('iterator');
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

	var NEW_ITERATOR_PROTOTYPE = IteratorPrototype$2 == undefined || fails$c(function () {
	  var test = {};
	  // FF44- legacy iterators case
	  return IteratorPrototype$2[ITERATOR$5].call(test) !== test;
	});

	if (NEW_ITERATOR_PROTOTYPE) IteratorPrototype$2 = {};

	// `%IteratorPrototype%[@@iterator]()` method
	// https://tc39.es/ecma262/#sec-%iteratorprototype%-@@iterator
	if (!has$1(IteratorPrototype$2, ITERATOR$5)) {
	  createNonEnumerableProperty$3(IteratorPrototype$2, ITERATOR$5, returnThis$2);
	}

	var iteratorsCore = {
	  IteratorPrototype: IteratorPrototype$2,
	  BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS$1
	};

	var IteratorPrototype$1 = iteratorsCore.IteratorPrototype;
	var create$3 = objectCreate;
	var createPropertyDescriptor = createPropertyDescriptor$5;
	var setToStringTag$3 = setToStringTag$5;
	var Iterators$4 = iterators;

	var returnThis$1 = function () { return this; };

	var createIteratorConstructor$1 = function (IteratorConstructor, NAME, next) {
	  var TO_STRING_TAG = NAME + ' Iterator';
	  IteratorConstructor.prototype = create$3(IteratorPrototype$1, { next: createPropertyDescriptor(1, next) });
	  setToStringTag$3(IteratorConstructor, TO_STRING_TAG, false);
	  Iterators$4[TO_STRING_TAG] = returnThis$1;
	  return IteratorConstructor;
	};

	var isObject$9 = isObject$h;

	var aPossiblePrototype$1 = function (it) {
	  if (!isObject$9(it) && it !== null) {
	    throw TypeError("Can't set " + String(it) + ' as a prototype');
	  } return it;
	};

	/* eslint-disable no-proto -- safe */

	var anObject$8 = anObject$e;
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

	var $$b = _export;
	var createIteratorConstructor = createIteratorConstructor$1;
	var getPrototypeOf = objectGetPrototypeOf;
	var setPrototypeOf$2 = objectSetPrototypeOf;
	var setToStringTag$2 = setToStringTag$5;
	var createNonEnumerableProperty$2 = createNonEnumerableProperty$a;
	var redefine$5 = redefine$9.exports;
	var wellKnownSymbol$b = wellKnownSymbol$l;
	var Iterators$3 = iterators;
	var IteratorsCore = iteratorsCore;

	var IteratorPrototype = IteratorsCore.IteratorPrototype;
	var BUGGY_SAFARI_ITERATORS = IteratorsCore.BUGGY_SAFARI_ITERATORS;
	var ITERATOR$4 = wellKnownSymbol$b('iterator');
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
	  var nativeIterator = IterablePrototype[ITERATOR$4]
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
	        if (setPrototypeOf$2) {
	          setPrototypeOf$2(CurrentIteratorPrototype, IteratorPrototype);
	        } else if (typeof CurrentIteratorPrototype[ITERATOR$4] != 'function') {
	          createNonEnumerableProperty$2(CurrentIteratorPrototype, ITERATOR$4, returnThis);
	        }
	      }
	      // Set @@toStringTag to native iterators
	      setToStringTag$2(CurrentIteratorPrototype, TO_STRING_TAG, true);
	    }
	  }

	  // fix Array.prototype.{ values, @@iterator }.name in V8 / FF
	  if (DEFAULT == VALUES && nativeIterator && nativeIterator.name !== VALUES) {
	    INCORRECT_VALUES_NAME = true;
	    defaultIterator = function values() { return nativeIterator.call(this); };
	  }

	  // define iterator
	  if (IterablePrototype[ITERATOR$4] !== defaultIterator) {
	    createNonEnumerableProperty$2(IterablePrototype, ITERATOR$4, defaultIterator);
	  }
	  Iterators$3[NAME] = defaultIterator;

	  // export additional methods
	  if (DEFAULT) {
	    methods = {
	      values: getIterationMethod(VALUES),
	      keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
	      entries: getIterationMethod(ENTRIES)
	    };
	    if (FORCED) for (KEY in methods) {
	      if (BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
	        redefine$5(IterablePrototype, KEY, methods[KEY]);
	      }
	    } else $$b({ target: NAME, proto: true, forced: BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME }, methods);
	  }

	  return methods;
	};

	var toIndexedObject$2 = toIndexedObject$8;
	var addToUnscopables = addToUnscopables$1;
	var Iterators$2 = iterators;
	var InternalStateModule$3 = internalState;
	var defineIterator$2 = defineIterator$3;

	var ARRAY_ITERATOR = 'Array Iterator';
	var setInternalState$3 = InternalStateModule$3.set;
	var getInternalState$3 = InternalStateModule$3.getterFor(ARRAY_ITERATOR);

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
	  setInternalState$3(this, {
	    type: ARRAY_ITERATOR,
	    target: toIndexedObject$2(iterated), // target
	    index: 0,                          // next index
	    kind: kind                         // kind
	  });
	// `%ArrayIteratorPrototype%.next` method
	// https://tc39.es/ecma262/#sec-%arrayiteratorprototype%.next
	}, function () {
	  var state = getInternalState$3(this);
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
	Iterators$2.Arguments = Iterators$2.Array;

	// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
	addToUnscopables('keys');
	addToUnscopables('values');
	addToUnscopables('entries');

	var internalMetadata = {exports: {}};

	var fails$b = fails$n;

	var freezing = !fails$b(function () {
	  // eslint-disable-next-line es/no-object-isextensible, es/no-object-preventextensions -- required for testing
	  return Object.isExtensible(Object.preventExtensions({}));
	});

	var hiddenKeys = hiddenKeys$6;
	var isObject$8 = isObject$h;
	var has = has$d;
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
	  if (!isObject$8(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
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

	var wellKnownSymbol$a = wellKnownSymbol$l;
	var Iterators$1 = iterators;

	var ITERATOR$3 = wellKnownSymbol$a('iterator');
	var ArrayPrototype = Array.prototype;

	// check on default Array iterator
	var isArrayIteratorMethod$1 = function (it) {
	  return it !== undefined && (Iterators$1.Array === it || ArrayPrototype[ITERATOR$3] === it);
	};

	var classof$2 = classof$4;
	var Iterators = iterators;
	var wellKnownSymbol$9 = wellKnownSymbol$l;

	var ITERATOR$2 = wellKnownSymbol$9('iterator');

	var getIteratorMethod$1 = function (it) {
	  if (it != undefined) return it[ITERATOR$2]
	    || it['@@iterator']
	    || Iterators[classof$2(it)];
	};

	var anObject$7 = anObject$e;

	var iteratorClose$1 = function (iterator) {
	  var returnMethod = iterator['return'];
	  if (returnMethod !== undefined) {
	    return anObject$7(returnMethod.call(iterator)).value;
	  }
	};

	var anObject$6 = anObject$e;
	var isArrayIteratorMethod = isArrayIteratorMethod$1;
	var toLength$3 = toLength$7;
	var bind$4 = functionBindContext;
	var getIteratorMethod = getIteratorMethod$1;
	var iteratorClose = iteratorClose$1;

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
	    if (iterator) iteratorClose(iterator);
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
	    iterFn = getIteratorMethod(iterable);
	    if (typeof iterFn != 'function') throw TypeError('Target is not iterable');
	    // optimisation for array iterators
	    if (isArrayIteratorMethod(iterFn)) {
	      for (index = 0, length = toLength$3(iterable.length); length > index; index++) {
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

	var anInstance$3 = function (it, Constructor, name) {
	  if (!(it instanceof Constructor)) {
	    throw TypeError('Incorrect ' + (name ? name + ' ' : '') + 'invocation');
	  } return it;
	};

	var wellKnownSymbol$8 = wellKnownSymbol$l;

	var ITERATOR$1 = wellKnownSymbol$8('iterator');
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
	  iteratorWithReturn[ITERATOR$1] = function () {
	    return this;
	  };
	  // eslint-disable-next-line es/no-array-from, no-throw-literal -- required for testing
	  Array.from(iteratorWithReturn, function () { throw 2; });
	} catch (error) { /* empty */ }

	var checkCorrectnessOfIteration$2 = function (exec, SKIP_CLOSING) {
	  if (!SKIP_CLOSING && !SAFE_CLOSING) return false;
	  var ITERATION_SUPPORT = false;
	  try {
	    var object = {};
	    object[ITERATOR$1] = function () {
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

	var isObject$7 = isObject$h;
	var setPrototypeOf$1 = objectSetPrototypeOf;

	// makes subclassing work correct for wrapped built-ins
	var inheritIfRequired$1 = function ($this, dummy, Wrapper) {
	  var NewTarget, NewTargetPrototype;
	  if (
	    // it can work only with native `setPrototypeOf`
	    setPrototypeOf$1 &&
	    // we haven't completely correct pre-ES6 way for getting `new.target`, so use this
	    typeof (NewTarget = dummy.constructor) == 'function' &&
	    NewTarget !== Wrapper &&
	    isObject$7(NewTargetPrototype = NewTarget.prototype) &&
	    NewTargetPrototype !== Wrapper.prototype
	  ) setPrototypeOf$1($this, NewTargetPrototype);
	  return $this;
	};

	var $$a = _export;
	var global$8 = global$n;
	var isForced$1 = isForced_1;
	var redefine$4 = redefine$9.exports;
	var InternalMetadataModule = internalMetadata.exports;
	var iterate$2 = iterate$3;
	var anInstance$2 = anInstance$3;
	var isObject$6 = isObject$h;
	var fails$a = fails$n;
	var checkCorrectnessOfIteration$1 = checkCorrectnessOfIteration$2;
	var setToStringTag$1 = setToStringTag$5;
	var inheritIfRequired = inheritIfRequired$1;

	var collection$1 = function (CONSTRUCTOR_NAME, wrapper, common) {
	  var IS_MAP = CONSTRUCTOR_NAME.indexOf('Map') !== -1;
	  var IS_WEAK = CONSTRUCTOR_NAME.indexOf('Weak') !== -1;
	  var ADDER = IS_MAP ? 'set' : 'add';
	  var NativeConstructor = global$8[CONSTRUCTOR_NAME];
	  var NativePrototype = NativeConstructor && NativeConstructor.prototype;
	  var Constructor = NativeConstructor;
	  var exported = {};

	  var fixMethod = function (KEY) {
	    var nativeMethod = NativePrototype[KEY];
	    redefine$4(NativePrototype, KEY,
	      KEY == 'add' ? function add(value) {
	        nativeMethod.call(this, value === 0 ? 0 : value);
	        return this;
	      } : KEY == 'delete' ? function (key) {
	        return IS_WEAK && !isObject$6(key) ? false : nativeMethod.call(this, key === 0 ? 0 : key);
	      } : KEY == 'get' ? function get(key) {
	        return IS_WEAK && !isObject$6(key) ? undefined : nativeMethod.call(this, key === 0 ? 0 : key);
	      } : KEY == 'has' ? function has(key) {
	        return IS_WEAK && !isObject$6(key) ? false : nativeMethod.call(this, key === 0 ? 0 : key);
	      } : function set(key, value) {
	        nativeMethod.call(this, key === 0 ? 0 : key, value);
	        return this;
	      }
	    );
	  };

	  var REPLACE = isForced$1(
	    CONSTRUCTOR_NAME,
	    typeof NativeConstructor != 'function' || !(IS_WEAK || NativePrototype.forEach && !fails$a(function () {
	      new NativeConstructor().entries().next();
	    }))
	  );

	  if (REPLACE) {
	    // create collection constructor
	    Constructor = common.getConstructor(wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER);
	    InternalMetadataModule.REQUIRED = true;
	  } else if (isForced$1(CONSTRUCTOR_NAME, true)) {
	    var instance = new Constructor();
	    // early implementations not supports chaining
	    var HASNT_CHAINING = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance;
	    // V8 ~ Chromium 40- weak-collections throws on primitives, but should return false
	    var THROWS_ON_PRIMITIVES = fails$a(function () { instance.has(1); });
	    // most early implementations doesn't supports iterables, most modern - not close it correctly
	    // eslint-disable-next-line no-new -- required for testing
	    var ACCEPT_ITERABLES = checkCorrectnessOfIteration$1(function (iterable) { new NativeConstructor(iterable); });
	    // for early implementations -0 and +0 not the same
	    var BUGGY_ZERO = !IS_WEAK && fails$a(function () {
	      // V8 ~ Chromium 42- fails only with 5+ elements
	      var $instance = new NativeConstructor();
	      var index = 5;
	      while (index--) $instance[ADDER](index, index);
	      return !$instance.has(-0);
	    });

	    if (!ACCEPT_ITERABLES) {
	      Constructor = wrapper(function (dummy, iterable) {
	        anInstance$2(dummy, Constructor, CONSTRUCTOR_NAME);
	        var that = inheritIfRequired(new NativeConstructor(), dummy, Constructor);
	        if (iterable != undefined) iterate$2(iterable, that[ADDER], { that: that, AS_ENTRIES: IS_MAP });
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
	  $$a({ global: true, forced: Constructor != NativeConstructor }, exported);

	  setToStringTag$1(Constructor, CONSTRUCTOR_NAME);

	  if (!IS_WEAK) common.setStrong(Constructor, CONSTRUCTOR_NAME, IS_MAP);

	  return Constructor;
	};

	var redefine$3 = redefine$9.exports;

	var redefineAll$2 = function (target, src, options) {
	  for (var key in src) redefine$3(target, key, src[key], options);
	  return target;
	};

	var getBuiltIn$2 = getBuiltIn$7;
	var definePropertyModule = objectDefineProperty;
	var wellKnownSymbol$7 = wellKnownSymbol$l;
	var DESCRIPTORS$1 = descriptors;

	var SPECIES$4 = wellKnownSymbol$7('species');

	var setSpecies$2 = function (CONSTRUCTOR_NAME) {
	  var Constructor = getBuiltIn$2(CONSTRUCTOR_NAME);
	  var defineProperty = definePropertyModule.f;

	  if (DESCRIPTORS$1 && Constructor && !Constructor[SPECIES$4]) {
	    defineProperty(Constructor, SPECIES$4, {
	      configurable: true,
	      get: function () { return this; }
	    });
	  }
	};

	var defineProperty = objectDefineProperty.f;
	var create$2 = objectCreate;
	var redefineAll$1 = redefineAll$2;
	var bind$3 = functionBindContext;
	var anInstance$1 = anInstance$3;
	var iterate$1 = iterate$3;
	var defineIterator$1 = defineIterator$3;
	var setSpecies$1 = setSpecies$2;
	var DESCRIPTORS = descriptors;
	var fastKey = internalMetadata.exports.fastKey;
	var InternalStateModule$2 = internalState;

	var setInternalState$2 = InternalStateModule$2.set;
	var internalStateGetterFor = InternalStateModule$2.getterFor;

	var collectionStrong$1 = {
	  getConstructor: function (wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER) {
	    var C = wrapper(function (that, iterable) {
	      anInstance$1(that, C, CONSTRUCTOR_NAME);
	      setInternalState$2(that, {
	        type: CONSTRUCTOR_NAME,
	        index: create$2(null),
	        first: undefined,
	        last: undefined,
	        size: 0
	      });
	      if (!DESCRIPTORS) that.size = 0;
	      if (iterable != undefined) iterate$1(iterable, that[ADDER], { that: that, AS_ENTRIES: IS_MAP });
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

	    redefineAll$1(C.prototype, {
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
	        var boundFunction = bind$3(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
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

	    redefineAll$1(C.prototype, IS_MAP ? {
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
	      setInternalState$2(this, {
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
	    setSpecies$1(CONSTRUCTOR_NAME);
	  }
	};

	var collection = collection$1;
	var collectionStrong = collectionStrong$1;

	// `Map` constructor
	// https://tc39.es/ecma262/#sec-map-objects
	collection('Map', function (init) {
	  return function Map() { return init(this, arguments.length ? arguments[0] : undefined); };
	}, collectionStrong);

	var toInteger$1 = toInteger$5;
	var requireObjectCoercible$2 = requireObjectCoercible$5;

	// `String.prototype.{ codePointAt, at }` methods implementation
	var createMethod = function (CONVERT_TO_STRING) {
	  return function ($this, pos) {
	    var S = String(requireObjectCoercible$2($this));
	    var position = toInteger$1(pos);
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
	var InternalStateModule$1 = internalState;
	var defineIterator = defineIterator$3;

	var STRING_ITERATOR = 'String Iterator';
	var setInternalState$1 = InternalStateModule$1.set;
	var getInternalState$2 = InternalStateModule$1.getterFor(STRING_ITERATOR);

	// `String.prototype[@@iterator]` method
	// https://tc39.es/ecma262/#sec-string.prototype-@@iterator
	defineIterator(String, 'String', function (iterated) {
	  setInternalState$1(this, {
	    type: STRING_ITERATOR,
	    string: String(iterated),
	    index: 0
	  });
	// `%StringIteratorPrototype%.next` method
	// https://tc39.es/ecma262/#sec-%stringiteratorprototype%.next
	}, function next() {
	  var state = getInternalState$2(this);
	  var string = state.string;
	  var index = state.index;
	  var point;
	  if (index >= string.length) return { value: undefined, done: true };
	  point = charAt$1(string, index);
	  state.index += point.length;
	  return { value: point, done: false };
	});

	var global$7 = global$n;
	var DOMIterables = domIterables;
	var ArrayIteratorMethods = es_array_iterator;
	var createNonEnumerableProperty$1 = createNonEnumerableProperty$a;
	var wellKnownSymbol$6 = wellKnownSymbol$l;

	var ITERATOR = wellKnownSymbol$6('iterator');
	var TO_STRING_TAG = wellKnownSymbol$6('toStringTag');
	var ArrayValues = ArrayIteratorMethods.values;

	for (var COLLECTION_NAME in DOMIterables) {
	  var Collection = global$7[COLLECTION_NAME];
	  var CollectionPrototype = Collection && Collection.prototype;
	  if (CollectionPrototype) {
	    // some Chrome versions have non-configurable methods on DOMTokenList
	    if (CollectionPrototype[ITERATOR] !== ArrayValues) try {
	      createNonEnumerableProperty$1(CollectionPrototype, ITERATOR, ArrayValues);
	    } catch (error) {
	      CollectionPrototype[ITERATOR] = ArrayValues;
	    }
	    if (!CollectionPrototype[TO_STRING_TAG]) {
	      createNonEnumerableProperty$1(CollectionPrototype, TO_STRING_TAG, COLLECTION_NAME);
	    }
	    if (DOMIterables[COLLECTION_NAME]) for (var METHOD_NAME in ArrayIteratorMethods) {
	      // some Chrome versions have non-configurable methods on DOMTokenList
	      if (CollectionPrototype[METHOD_NAME] !== ArrayIteratorMethods[METHOD_NAME]) try {
	        createNonEnumerableProperty$1(CollectionPrototype, METHOD_NAME, ArrayIteratorMethods[METHOD_NAME]);
	      } catch (error) {
	        CollectionPrototype[METHOD_NAME] = ArrayIteratorMethods[METHOD_NAME];
	      }
	    }
	  }
	}

	var anObject$5 = anObject$e;

	// `RegExp.prototype.flags` getter implementation
	// https://tc39.es/ecma262/#sec-get-regexp.prototype.flags
	var regexpFlags$1 = function () {
	  var that = anObject$5(this);
	  var result = '';
	  if (that.global) result += 'g';
	  if (that.ignoreCase) result += 'i';
	  if (that.multiline) result += 'm';
	  if (that.dotAll) result += 's';
	  if (that.unicode) result += 'u';
	  if (that.sticky) result += 'y';
	  return result;
	};

	var regexpStickyHelpers = {};

	var fails$9 = fails$n;

	// babel-minify transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError,
	var RE = function (s, f) {
	  return RegExp(s, f);
	};

	regexpStickyHelpers.UNSUPPORTED_Y = fails$9(function () {
	  var re = RE('a', 'y');
	  re.lastIndex = 2;
	  return re.exec('abcd') != null;
	});

	regexpStickyHelpers.BROKEN_CARET = fails$9(function () {
	  // https://bugzilla.mozilla.org/show_bug.cgi?id=773687
	  var re = RE('^r', 'gy');
	  re.lastIndex = 2;
	  return re.exec('str') != null;
	});

	var fails$8 = fails$n;

	var regexpUnsupportedDotAll = fails$8(function () {
	  // babel-minify transpiles RegExp('.', 's') -> /./s and it causes SyntaxError
	  var re = RegExp('.', (typeof '').charAt(0));
	  return !(re.dotAll && re.exec('\n') && re.flags === 's');
	});

	var fails$7 = fails$n;

	var regexpUnsupportedNcg = fails$7(function () {
	  // babel-minify transpiles RegExp('.', 'g') -> /./g and it causes SyntaxError
	  var re = RegExp('(?<a>b)', (typeof '').charAt(5));
	  return re.exec('b').groups.a !== 'b' ||
	    'b'.replace(re, '$<a>c') !== 'bc';
	});

	/* eslint-disable regexp/no-assertion-capturing-group, regexp/no-empty-group, regexp/no-lazy-ends -- testing */
	/* eslint-disable regexp/no-useless-quantifier -- testing */
	var regexpFlags = regexpFlags$1;
	var stickyHelpers = regexpStickyHelpers;
	var shared = shared$5.exports;
	var create$1 = objectCreate;
	var getInternalState$1 = internalState.get;
	var UNSUPPORTED_DOT_ALL = regexpUnsupportedDotAll;
	var UNSUPPORTED_NCG = regexpUnsupportedNcg;

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

	var UNSUPPORTED_Y = stickyHelpers.UNSUPPORTED_Y || stickyHelpers.BROKEN_CARET;

	// nonparticipating capturing group, copied from es5-shim's String#split patch.
	var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

	var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED || UNSUPPORTED_Y || UNSUPPORTED_DOT_ALL || UNSUPPORTED_NCG;

	if (PATCH) {
	  // eslint-disable-next-line max-statements -- TODO
	  patchedExec = function exec(str) {
	    var re = this;
	    var state = getInternalState$1(re);
	    var raw = state.raw;
	    var result, reCopy, lastIndex, match, i, object, group;

	    if (raw) {
	      raw.lastIndex = re.lastIndex;
	      result = patchedExec.call(raw, str);
	      re.lastIndex = raw.lastIndex;
	      return result;
	    }

	    var groups = state.groups;
	    var sticky = UNSUPPORTED_Y && re.sticky;
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
	      match.groups = object = create$1(null);
	      for (i = 0; i < groups.length; i++) {
	        group = groups[i];
	        object[group[0]] = match[group[1]];
	      }
	    }

	    return match;
	  };
	}

	var regexpExec$2 = patchedExec;

	var $$9 = _export;
	var exec = regexpExec$2;

	// `RegExp.prototype.exec` method
	// https://tc39.es/ecma262/#sec-regexp.prototype.exec
	$$9({ target: 'RegExp', proto: true, forced: /./.exec !== exec }, {
	  exec: exec
	});

	// TODO: Remove from `core-js@4` since it's moved to entry points

	var redefine$2 = redefine$9.exports;
	var regexpExec$1 = regexpExec$2;
	var fails$6 = fails$n;
	var wellKnownSymbol$5 = wellKnownSymbol$l;
	var createNonEnumerableProperty = createNonEnumerableProperty$a;

	var SPECIES$3 = wellKnownSymbol$5('species');
	var RegExpPrototype$1 = RegExp.prototype;

	var fixRegexpWellKnownSymbolLogic = function (KEY, exec, FORCED, SHAM) {
	  var SYMBOL = wellKnownSymbol$5(KEY);

	  var DELEGATES_TO_SYMBOL = !fails$6(function () {
	    // String methods call symbol-named RegEp methods
	    var O = {};
	    O[SYMBOL] = function () { return 7; };
	    return ''[KEY](O) != 7;
	  });

	  var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL && !fails$6(function () {
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
	      re.constructor[SPECIES$3] = function () { return re; };
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
	      if ($exec === regexpExec$1 || $exec === RegExpPrototype$1.exec) {
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

	    redefine$2(String.prototype, KEY, methods[0]);
	    redefine$2(RegExpPrototype$1, SYMBOL, methods[1]);
	  }

	  if (SHAM) createNonEnumerableProperty(RegExpPrototype$1[SYMBOL], 'sham', true);
	};

	var charAt = stringMultibyte.charAt;

	// `AdvanceStringIndex` abstract operation
	// https://tc39.es/ecma262/#sec-advancestringindex
	var advanceStringIndex$1 = function (S, index, unicode) {
	  return index + (unicode ? charAt(S, index).length : 1);
	};

	var toObject$1 = toObject$8;

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
	    namedCaptures = toObject$1(namedCaptures);
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
	var regexpExec = regexpExec$2;

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

	  return regexpExec.call(R, S);
	};

	var fixRegExpWellKnownSymbolLogic = fixRegexpWellKnownSymbolLogic;
	var fails$5 = fails$n;
	var anObject$4 = anObject$e;
	var toLength$2 = toLength$7;
	var toInteger = toInteger$5;
	var requireObjectCoercible$1 = requireObjectCoercible$5;
	var advanceStringIndex = advanceStringIndex$1;
	var getSubstitution = getSubstitution$1;
	var regExpExec = regexpExecAbstract;
	var wellKnownSymbol$4 = wellKnownSymbol$l;

	var REPLACE = wellKnownSymbol$4('replace');
	var max$1 = Math.max;
	var min = Math.min;

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

	var REPLACE_SUPPORTS_NAMED_GROUPS = !fails$5(function () {
	  var re = /./;
	  re.exec = function () {
	    var result = [];
	    result.groups = { a: '7' };
	    return result;
	  };
	  return ''.replace(re, '$<a>') !== '7';
	});

	// @@replace logic
	fixRegExpWellKnownSymbolLogic('replace', function (_, nativeReplace, maybeCallNative) {
	  var UNSAFE_SUBSTITUTE = REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE ? '$' : '$0';

	  return [
	    // `String.prototype.replace` method
	    // https://tc39.es/ecma262/#sec-string.prototype.replace
	    function replace(searchValue, replaceValue) {
	      var O = requireObjectCoercible$1(this);
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

	      var rx = anObject$4(this);
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
	        var result = regExpExec(rx, S);
	        if (result === null) break;

	        results.push(result);
	        if (!global) break;

	        var matchStr = String(result[0]);
	        if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength$2(rx.lastIndex), fullUnicode);
	      }

	      var accumulatedResult = '';
	      var nextSourcePosition = 0;
	      for (var i = 0; i < results.length; i++) {
	        result = results[i];

	        var matched = String(result[0]);
	        var position = max$1(min(toInteger(result.index), S.length), 0);
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

	var $$8 = _export;
	var fails$4 = fails$n;
	var isArray$1 = isArray$4;
	var isObject$5 = isObject$h;
	var toObject = toObject$8;
	var toLength$1 = toLength$7;
	var createProperty$1 = createProperty$3;
	var arraySpeciesCreate = arraySpeciesCreate$3;
	var arrayMethodHasSpeciesSupport$2 = arrayMethodHasSpeciesSupport$5;
	var wellKnownSymbol$3 = wellKnownSymbol$l;
	var V8_VERSION$1 = engineV8Version;

	var IS_CONCAT_SPREADABLE = wellKnownSymbol$3('isConcatSpreadable');
	var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF;
	var MAXIMUM_ALLOWED_INDEX_EXCEEDED = 'Maximum allowed index exceeded';

	// We can't use this feature detection in V8 since it causes
	// deoptimization and serious performance degradation
	// https://github.com/zloirock/core-js/issues/679
	var IS_CONCAT_SPREADABLE_SUPPORT = V8_VERSION$1 >= 51 || !fails$4(function () {
	  var array = [];
	  array[IS_CONCAT_SPREADABLE] = false;
	  return array.concat()[0] !== array;
	});

	var SPECIES_SUPPORT = arrayMethodHasSpeciesSupport$2('concat');

	var isConcatSpreadable = function (O) {
	  if (!isObject$5(O)) return false;
	  var spreadable = O[IS_CONCAT_SPREADABLE];
	  return spreadable !== undefined ? !!spreadable : isArray$1(O);
	};

	var FORCED$2 = !IS_CONCAT_SPREADABLE_SUPPORT || !SPECIES_SUPPORT;

	// `Array.prototype.concat` method
	// https://tc39.es/ecma262/#sec-array.prototype.concat
	// with adding support of @@isConcatSpreadable and @@species
	$$8({ target: 'Array', proto: true, forced: FORCED$2 }, {
	  // eslint-disable-next-line no-unused-vars -- required for `.length`
	  concat: function concat(arg) {
	    var O = toObject(this);
	    var A = arraySpeciesCreate(O, 0);
	    var n = 0;
	    var i, k, length, len, E;
	    for (i = -1, length = arguments.length; i < length; i++) {
	      E = i === -1 ? O : arguments[i];
	      if (isConcatSpreadable(E)) {
	        len = toLength$1(E.length);
	        if (n + len > MAX_SAFE_INTEGER) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
	        for (k = 0; k < len; k++, n++) if (k in E) createProperty$1(A, n, E[k]);
	      } else {
	        if (n >= MAX_SAFE_INTEGER) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
	        createProperty$1(A, n++, E);
	      }
	    }
	    A.length = n;
	    return A;
	  }
	});

	var requireObjectCoercible = requireObjectCoercible$5;

	var quot = /"/g;

	// `CreateHTML` abstract operation
	// https://tc39.es/ecma262/#sec-createhtml
	var createHtml = function (string, tag, attribute, value) {
	  var S = String(requireObjectCoercible(string));
	  var p1 = '<' + tag;
	  if (attribute !== '') p1 += ' ' + attribute + '="' + String(value).replace(quot, '&quot;') + '"';
	  return p1 + '>' + S + '</' + tag + '>';
	};

	var fails$3 = fails$n;

	// check the existence of a method, lowercase
	// of a tag and escaping quotes in arguments
	var stringHtmlForced = function (METHOD_NAME) {
	  return fails$3(function () {
	    var test = ''[METHOD_NAME]('"');
	    return test !== test.toLowerCase() || test.split('"').length > 3;
	  });
	};

	var $$7 = _export;
	var createHTML = createHtml;
	var forcedStringHTMLMethod = stringHtmlForced;

	// `String.prototype.sub` method
	// https://tc39.es/ecma262/#sec-string.prototype.sub
	$$7({ target: 'String', proto: true, forced: forcedStringHTMLMethod('sub') }, {
	  sub: function sub() {
	    return createHTML(this, 'sub', '', '');
	  }
	});

	var $$6 = _export;
	var $filter = arrayIteration.filter;
	var arrayMethodHasSpeciesSupport$1 = arrayMethodHasSpeciesSupport$5;

	var HAS_SPECIES_SUPPORT$1 = arrayMethodHasSpeciesSupport$1('filter');

	// `Array.prototype.filter` method
	// https://tc39.es/ecma262/#sec-array.prototype.filter
	// with adding support of @@species
	$$6({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT$1 }, {
	  filter: function filter(callbackfn /* , thisArg */) {
	    return $filter(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	var $$5 = _export;
	var isObject$4 = isObject$h;
	var isArray = isArray$4;
	var toAbsoluteIndex = toAbsoluteIndex$3;
	var toLength = toLength$7;
	var toIndexedObject$1 = toIndexedObject$8;
	var createProperty = createProperty$3;
	var wellKnownSymbol$2 = wellKnownSymbol$l;
	var arrayMethodHasSpeciesSupport = arrayMethodHasSpeciesSupport$5;

	var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('slice');

	var SPECIES$2 = wellKnownSymbol$2('species');
	var nativeSlice = [].slice;
	var max = Math.max;

	// `Array.prototype.slice` method
	// https://tc39.es/ecma262/#sec-array.prototype.slice
	// fallback for not array-like ES3 strings and DOM objects
	$$5({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT }, {
	  slice: function slice(start, end) {
	    var O = toIndexedObject$1(this);
	    var length = toLength(O.length);
	    var k = toAbsoluteIndex(start, length);
	    var fin = toAbsoluteIndex(end === undefined ? length : end, length);
	    // inline `ArraySpeciesCreate` for usage native `Array#slice` where it's possible
	    var Constructor, result, n;
	    if (isArray(O)) {
	      Constructor = O.constructor;
	      // cross-realm fallback
	      if (typeof Constructor == 'function' && (Constructor === Array || isArray(Constructor.prototype))) {
	        Constructor = undefined;
	      } else if (isObject$4(Constructor)) {
	        Constructor = Constructor[SPECIES$2];
	        if (Constructor === null) Constructor = undefined;
	      }
	      if (Constructor === Array || Constructor === undefined) {
	        return nativeSlice.call(O, k, fin);
	      }
	    }
	    result = new (Constructor === undefined ? Array : Constructor)(max(fin - k, 0));
	    for (n = 0; k < fin; k++, n++) if (k in O) createProperty(result, n, O[k]);
	    result.length = n;
	    return result;
	  }
	});

	var global$6 = global$n;

	var nativePromiseConstructor = global$6.Promise;

	var anObject$3 = anObject$e;
	var aFunction$4 = aFunction$6;
	var wellKnownSymbol$1 = wellKnownSymbol$l;

	var SPECIES$1 = wellKnownSymbol$1('species');

	// `SpeciesConstructor` abstract operation
	// https://tc39.es/ecma262/#sec-speciesconstructor
	var speciesConstructor$1 = function (O, defaultConstructor) {
	  var C = anObject$3(O).constructor;
	  var S;
	  return C === undefined || (S = anObject$3(C)[SPECIES$1]) == undefined ? defaultConstructor : aFunction$4(S);
	};

	var userAgent$1 = engineUserAgent;

	var engineIsIos = /(?:iphone|ipod|ipad).*applewebkit/i.test(userAgent$1);

	var classof = classofRaw$1;
	var global$5 = global$n;

	var engineIsNode = classof(global$5.process) == 'process';

	var global$4 = global$n;
	var fails$2 = fails$n;
	var bind$2 = functionBindContext;
	var html = html$2;
	var createElement = documentCreateElement$1;
	var IS_IOS$1 = engineIsIos;
	var IS_NODE$2 = engineIsNode;

	var location = global$4.location;
	var set = global$4.setImmediate;
	var clear = global$4.clearImmediate;
	var process$2 = global$4.process;
	var MessageChannel = global$4.MessageChannel;
	var Dispatch = global$4.Dispatch;
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
	  global$4.postMessage(id + '', location.protocol + '//' + location.host);
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
	    defer = bind$2(port.postMessage, port, 1);
	  // Browsers with postMessage, skip WebWorkers
	  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
	  } else if (
	    global$4.addEventListener &&
	    typeof postMessage == 'function' &&
	    !global$4.importScripts &&
	    location && location.protocol !== 'file:' &&
	    !fails$2(post)
	  ) {
	    defer = post;
	    global$4.addEventListener('message', listener, false);
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

	var global$3 = global$n;
	var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;
	var macrotask = task$1.set;
	var IS_IOS = engineIsIos;
	var IS_WEBOS_WEBKIT = engineIsWebosWebkit;
	var IS_NODE$1 = engineIsNode;

	var MutationObserver = global$3.MutationObserver || global$3.WebKitMutationObserver;
	var document$2 = global$3.document;
	var process$1 = global$3.process;
	var Promise$1 = global$3.Promise;
	// Node.js 11 shows ExperimentalWarning on getting `queueMicrotask`
	var queueMicrotaskDescriptor = getOwnPropertyDescriptor(global$3, 'queueMicrotask');
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
	      macrotask.call(global$3, flush);
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

	var aFunction$3 = aFunction$6;

	var PromiseCapability = function (C) {
	  var resolve, reject;
	  this.promise = new C(function ($$resolve, $$reject) {
	    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
	    resolve = $$resolve;
	    reject = $$reject;
	  });
	  this.resolve = aFunction$3(resolve);
	  this.reject = aFunction$3(reject);
	};

	// `NewPromiseCapability` abstract operation
	// https://tc39.es/ecma262/#sec-newpromisecapability
	newPromiseCapability$2.f = function (C) {
	  return new PromiseCapability(C);
	};

	var anObject$2 = anObject$e;
	var isObject$3 = isObject$h;
	var newPromiseCapability$1 = newPromiseCapability$2;

	var promiseResolve$1 = function (C, x) {
	  anObject$2(C);
	  if (isObject$3(x) && x.constructor === C) return x;
	  var promiseCapability = newPromiseCapability$1.f(C);
	  var resolve = promiseCapability.resolve;
	  resolve(x);
	  return promiseCapability.promise;
	};

	var global$2 = global$n;

	var hostReportErrors$1 = function (a, b) {
	  var console = global$2.console;
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

	var $$4 = _export;
	var global$1 = global$n;
	var getBuiltIn$1 = getBuiltIn$7;
	var NativePromise = nativePromiseConstructor;
	var redefine$1 = redefine$9.exports;
	var redefineAll = redefineAll$2;
	var setPrototypeOf = objectSetPrototypeOf;
	var setToStringTag = setToStringTag$5;
	var setSpecies = setSpecies$2;
	var isObject$2 = isObject$h;
	var aFunction$2 = aFunction$6;
	var anInstance = anInstance$3;
	var inspectSource = inspectSource$3;
	var iterate = iterate$3;
	var checkCorrectnessOfIteration = checkCorrectnessOfIteration$2;
	var speciesConstructor = speciesConstructor$1;
	var task = task$1.set;
	var microtask = microtask$1;
	var promiseResolve = promiseResolve$1;
	var hostReportErrors = hostReportErrors$1;
	var newPromiseCapabilityModule = newPromiseCapability$2;
	var perform = perform$1;
	var InternalStateModule = internalState;
	var isForced = isForced_1;
	var wellKnownSymbol = wellKnownSymbol$l;
	var IS_BROWSER = engineIsBrowser;
	var IS_NODE = engineIsNode;
	var V8_VERSION = engineV8Version;

	var SPECIES = wellKnownSymbol('species');
	var PROMISE = 'Promise';
	var getInternalState = InternalStateModule.get;
	var setInternalState = InternalStateModule.set;
	var getInternalPromiseState = InternalStateModule.getterFor(PROMISE);
	var NativePromisePrototype = NativePromise && NativePromise.prototype;
	var PromiseConstructor = NativePromise;
	var PromiseConstructorPrototype = NativePromisePrototype;
	var TypeError$1 = global$1.TypeError;
	var document$1 = global$1.document;
	var process = global$1.process;
	var newPromiseCapability = newPromiseCapabilityModule.f;
	var newGenericPromiseCapability = newPromiseCapability;
	var DISPATCH_EVENT = !!(document$1 && document$1.createEvent && global$1.dispatchEvent);
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

	var FORCED$1 = isForced(PROMISE, function () {
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

	var INCORRECT_ITERATION = FORCED$1 || !checkCorrectnessOfIteration(function (iterable) {
	  PromiseConstructor.all(iterable)['catch'](function () { /* empty */ });
	});

	// helpers
	var isThenable = function (it) {
	  var then;
	  return isObject$2(it) && typeof (then = it.then) == 'function' ? then : false;
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
	    global$1.dispatchEvent(event);
	  } else event = { promise: promise, reason: reason };
	  if (!NATIVE_REJECTION_EVENT && (handler = global$1['on' + name])) handler(event);
	  else if (name === UNHANDLED_REJECTION) hostReportErrors('Unhandled promise rejection', reason);
	};

	var onUnhandled = function (state) {
	  task.call(global$1, function () {
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
	  task.call(global$1, function () {
	    var promise = state.facade;
	    if (IS_NODE) {
	      process.emit('rejectionHandled', promise);
	    } else dispatchEvent(REJECTION_HANDLED, promise, state.value);
	  });
	};

	var bind$1 = function (fn, state, unwrap) {
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
	            bind$1(internalResolve, wrapper, state),
	            bind$1(internalReject, wrapper, state)
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
	    anInstance(this, PromiseConstructor, PROMISE);
	    aFunction$2(executor);
	    Internal.call(this);
	    var state = getInternalState(this);
	    try {
	      executor(bind$1(internalResolve, state), bind$1(internalReject, state));
	    } catch (error) {
	      internalReject(state, error);
	    }
	  };
	  PromiseConstructorPrototype = PromiseConstructor.prototype;
	  // eslint-disable-next-line no-unused-vars -- required for `.length`
	  Internal = function Promise(executor) {
	    setInternalState(this, {
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
	    var state = getInternalState(promise);
	    this.promise = promise;
	    this.resolve = bind$1(internalResolve, state);
	    this.reject = bind$1(internalReject, state);
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
	    if (setPrototypeOf) {
	      setPrototypeOf(NativePromisePrototype, PromiseConstructorPrototype);
	    }
	  }
	}

	$$4({ global: true, wrap: true, forced: FORCED$1 }, {
	  Promise: PromiseConstructor
	});

	setToStringTag(PromiseConstructor, PROMISE, false);
	setSpecies(PROMISE);

	PromiseWrapper = getBuiltIn$1(PROMISE);

	// statics
	$$4({ target: PROMISE, stat: true, forced: FORCED$1 }, {
	  // `Promise.reject` method
	  // https://tc39.es/ecma262/#sec-promise.reject
	  reject: function reject(r) {
	    var capability = newPromiseCapability(this);
	    capability.reject.call(undefined, r);
	    return capability.promise;
	  }
	});

	$$4({ target: PROMISE, stat: true, forced: FORCED$1 }, {
	  // `Promise.resolve` method
	  // https://tc39.es/ecma262/#sec-promise.resolve
	  resolve: function resolve(x) {
	    return promiseResolve(this, x);
	  }
	});

	$$4({ target: PROMISE, stat: true, forced: INCORRECT_ITERATION }, {
	  // `Promise.all` method
	  // https://tc39.es/ecma262/#sec-promise.all
	  all: function all(iterable) {
	    var C = this;
	    var capability = newPromiseCapability(C);
	    var resolve = capability.resolve;
	    var reject = capability.reject;
	    var result = perform(function () {
	      var $promiseResolve = aFunction$2(C.resolve);
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
	      var $promiseResolve = aFunction$2(C.resolve);
	      iterate(iterable, function (promise) {
	        $promiseResolve.call(C, promise).then(capability.resolve, reject);
	      });
	    });
	    if (result.error) reject(result.value);
	    return capability.promise;
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
	  } else if ("o" === l[0] && "n" === l[1]) o = l !== (l = l.replace(/Capture$/, "")), l = l.toLowerCase() in n ? l.toLowerCase().slice(2) : l.slice(2), n.l || (n.l = {}), n.l[l + o] = u, u ? i || n.addEventListener(l, o ? H$1 : $$3, o) : n.removeEventListener(l, o ? H$1 : $$3, o);else if ("dangerouslySetInnerHTML" !== l) {
	    if (t) l = l.replace(/xlink[H:h]/, "h").replace(/sName$/, "s");else if ("href" !== l && "list" !== l && "form" !== l && "tabIndex" !== l && "download" !== l && l in n) try {
	      n[l] = null == u ? "" : u;
	      break n;
	    } catch (n) {}
	    "function" == typeof u || (null != u && (!1 !== u || "a" === l[0] && "r" === l[1]) ? n.setAttribute(l, u) : n.removeAttribute(l));
	  }
	}

	function $$3(l) {
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

	function $$2() {
	  return this.defaultPrevented;
	}

	n.event = function (n) {
	  return H && (n = H(n)), n.persist = Z, n.isPropagationStopped = Y, n.isDefaultPrevented = $$2, n.nativeEvent = n;
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
	      React.render( /*#__PURE__*/React.createElement(Component, this.props), this.el);
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

	var aFunction$1 = aFunction$6;
	var isObject$1 = isObject$h;

	var slice = [].slice;
	var factories = {};

	var construct = function (C, argsLength, args) {
	  if (!(argsLength in factories)) {
	    for (var list = [], i = 0; i < argsLength; i++) list[i] = 'a[' + i + ']';
	    // eslint-disable-next-line no-new-func -- we have no proper alternatives, IE8- only
	    factories[argsLength] = Function('C,a', 'return new C(' + list.join(',') + ')');
	  } return factories[argsLength](C, args);
	};

	// `Function.prototype.bind` method implementation
	// https://tc39.es/ecma262/#sec-function.prototype.bind
	var functionBind = Function.bind || function bind(that /* , ...args */) {
	  var fn = aFunction$1(this);
	  var partArgs = slice.call(arguments, 1);
	  var boundFunction = function bound(/* args... */) {
	    var args = partArgs.concat(slice.call(arguments));
	    return this instanceof boundFunction ? construct(fn, args.length, args) : fn.apply(that, args);
	  };
	  if (isObject$1(fn.prototype)) boundFunction.prototype = fn.prototype;
	  return boundFunction;
	};

	var $$1 = _export;
	var getBuiltIn = getBuiltIn$7;
	var aFunction = aFunction$6;
	var anObject$1 = anObject$e;
	var isObject = isObject$h;
	var create = objectCreate;
	var bind = functionBind;
	var fails$1 = fails$n;

	var nativeConstruct = getBuiltIn('Reflect', 'construct');

	// `Reflect.construct` method
	// https://tc39.es/ecma262/#sec-reflect.construct
	// MS Edge supports only 2 arguments and argumentsList argument is optional
	// FF Nightly sets third argument as `new.target`, but does not create `this` from it
	var NEW_TARGET_BUG = fails$1(function () {
	  function F() { /* empty */ }
	  return !(nativeConstruct(function () { /* empty */ }, [], F) instanceof F);
	});
	var ARGS_BUG = !fails$1(function () {
	  nativeConstruct(function () { /* empty */ });
	});
	var FORCED = NEW_TARGET_BUG || ARGS_BUG;

	$$1({ target: 'Reflect', stat: true, forced: FORCED, sham: FORCED }, {
	  construct: function construct(Target, args /* , newTarget */) {
	    aFunction(Target);
	    anObject$1(args);
	    var newTarget = arguments.length < 3 ? Target : aFunction(arguments[2]);
	    if (ARGS_BUG && !NEW_TARGET_BUG) return nativeConstruct(Target, args, newTarget);
	    if (Target == newTarget) {
	      // w/o altered newTarget, optimization for 0-4 arguments
	      switch (args.length) {
	        case 0: return new Target();
	        case 1: return new Target(args[0]);
	        case 2: return new Target(args[0], args[1]);
	        case 3: return new Target(args[0], args[1], args[2]);
	        case 4: return new Target(args[0], args[1], args[2], args[3]);
	      }
	      // w/o altered newTarget, lot of arguments case
	      var $args = [null];
	      $args.push.apply($args, args);
	      return new (bind.apply(Target, $args))();
	    }
	    // with altered newTarget, not support built-in constructors
	    var proto = newTarget.prototype;
	    var instance = create(isObject(proto) ? proto : Object.prototype);
	    var result = Function.apply.call(Target, instance, args);
	    return isObject(result) ? result : instance;
	  }
	});

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

	function _assertThisInitialized(self) {
	  if (self === void 0) {
	    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	  }

	  return self;
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

	function _possibleConstructorReturn(self, call) {
	  if (call && (_typeof(call) === "object" || typeof call === "function")) {
	    return call;
	  } else if (call !== void 0) {
	    throw new TypeError("Derived constructors may only return object or undefined");
	  }

	  return _assertThisInitialized(self);
	}

	function _getPrototypeOf(o) {
	  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
	    return o.__proto__ || Object.getPrototypeOf(o);
	  };
	  return _getPrototypeOf(o);
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

	var css_248z = ".ft-picker{min-width:80px;border:1px solid #ced3d9;border-radius:4px;background:#fff;color:#222;font-size:14px;line-height:1.5;display:inline-block;position:relative}.ft-picker-none-border{border:0}.ft-picker.hover,.ft-picker:hover{border-color:#888}.ft-picker.focus,.ft-picker.open{border-color:#2e8ae6}.ft-picker.error{border-color:#e64545}.ft-picker.disabled{cursor:not-allowed;color:#b3b3b3;border:1px solid #ced3d9;background:#f5f7fa}.ft-picker.disabled.hover,.ft-picker.disabled:hover{border-color:#ced3d9}.ft-picker-input{padding:5px 10px;width:100%;box-sizing:border-box;display:flex;align-items:center;cursor:pointer;white-space:nowrap;overflow:hidden}.ft-picker.disabled .ft-picker-input{cursor:not-allowed}.ft-picker-input-inner{width:0;flex-grow:1;white-space:nowrap;overflow:hidden;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.ft-picker.disabled .ft-picker-input-inner{cursor:not-allowed}.is-placeholder .ft-picker-input-inner{color:#888}.ft-picker.disabled .is-placeholder .ft-picker-input-inner{color:#b3b3b3}.ft-picker-tools{line-height:1;box-sizing:content-box;color:#888;font-size:0;flex-shrink:0;display:flex;align-items:center;justify-content:center}.ft-picker-arrow{font-size:20px;transition:transform .2s ease}.ft-picker.open .ft-picker-arrow{transform:rotate(180deg)}.ft-picker-clear{font-size:16px;display:none}.ft-picker-with-clear:hover .ft-picker-clear{display:block}.ft-picker-with-clear:hover .ft-picker-arrow{display:none}.ft-picker-dropdown{margin-top:2px;min-width:100%;border-radius:4px;box-shadow:0 9px 16px 8px rgba(0,0,0,.03),0 6px 10px 0 rgba(0,0,0,.06),0 3px 6px -3px rgba(0,0,0,.12);background:#fff;overflow:hidden;display:none;top:100%;position:absolute;z-index:66}.ft-picker.open .ft-picker-dropdown{display:block}";
	styleInject(css_248z, {id: "future-picker-1.0.6"});

	var redefine = redefine$9.exports;
	var anObject = anObject$e;
	var fails = fails$n;
	var flags = regexpFlags$1;

	var TO_STRING = 'toString';
	var RegExpPrototype = RegExp.prototype;
	var nativeToString = RegExpPrototype[TO_STRING];

	var NOT_GENERIC = fails(function () { return nativeToString.call({ source: 'a', flags: 'b' }) != '/a/b'; });
	// FF44- RegExp#toString has a wrong name
	var INCORRECT_NAME = nativeToString.name != TO_STRING;

	// `RegExp.prototype.toString` method
	// https://tc39.es/ecma262/#sec-regexp.prototype.tostring
	if (NOT_GENERIC || INCORRECT_NAME) {
	  redefine(RegExp.prototype, TO_STRING, function toString() {
	    var R = anObject(this);
	    var p = String(R.source);
	    var rf = R.flags;
	    var f = String(rf === undefined && R instanceof RegExp && !('flags' in RegExpPrototype) ? flags.call(R) : rf);
	    return '/' + p + '/' + f;
	  }, { unsafe: true });
	}

	var $ = _export;
	var IndexedObject = indexedObject;
	var toIndexedObject = toIndexedObject$8;
	var arrayMethodIsStrict = arrayMethodIsStrict$2;

	var nativeJoin = [].join;

	var ES3_STRINGS = IndexedObject != Object;
	var STRICT_METHOD = arrayMethodIsStrict('join', ',');

	// `Array.prototype.join` method
	// https://tc39.es/ecma262/#sec-array.prototype.join
	$({ target: 'Array', proto: true, forced: ES3_STRINGS || !STRICT_METHOD }, {
	  join: function join(separator) {
	    return nativeJoin.call(toIndexedObject(this), separator === undefined ? ',' : separator);
	  }
	});

	var classnames = {exports: {}};

	(function (module) {
	  /* global define */
	  (function () {

	    var hasOwn = {}.hasOwnProperty;

	    function classNames() {
	      var classes = [];

	      for (var i = 0; i < arguments.length; i++) {
	        var arg = arguments[i];
	        if (!arg) continue;

	        var argType = _typeof(arg);

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
	  })();
	})(classnames);

	var classNames = classnames.exports;

	function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

	function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
	var appendHtmlChildren = function appendHtmlChildren(target, children) {
	  return /*#__PURE__*/React.cloneElement(target, typeof children === "string" ? {
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
	      var suffixElement = suffix || /*#__PURE__*/React.createElement(React.Fragment, null, arrow && /*#__PURE__*/React.createElement("i", {
	        className: "ft-icon icon-down ".concat(namespace, "-arrow")
	      }), clear && /*#__PURE__*/React.createElement("i", {
	        className: "ft-icon icon-error ".concat(namespace, "-clear"),
	        onClick: this.handleClear
	      }));
	      var pickerClassNames = classNames("".concat(namespace), this.isDropdownVisible() && "open", disabled && "disabled", error && "error", className);
	      return /*#__PURE__*/React.createElement("div", _extends({
	        className: pickerClassNames
	      }, name ? {
	        "data-name": name
	      } : {}, {
	        ref: this.pickerRef
	      }), /*#__PURE__*/React.createElement("div", {
	        className: classNames("".concat(namespace, "-input"), clear && value && "".concat(namespace, "-with-clear"), !value && placeholder && "is-placeholder"),
	        title: title,
	        onClick: this.handleInputClick
	      }, prefix && /*#__PURE__*/React.createElement("div", {
	        className: "".concat(namespace, "-prefix")
	      }, prefix), appendHtmlChildren( /*#__PURE__*/React.createElement("div", {
	        className: "".concat(namespace, "-input-inner")
	      }), value || /*#__PURE__*/React.createElement(React.Fragment, null, placeholder)), suffixElement && /*#__PURE__*/React.createElement("div", {
	        className: classNames("".concat(namespace, "-suffix"), !suffix && (arrow || clear) && "".concat(namespace, "-tools"))
	      }, suffixElement)), /*#__PURE__*/React.createElement("div", {
	        className: "".concat(namespace, "-dropdown")
	      }, children && ( /*#__PURE__*/React.isValidElement(children) && typeof children.type !== 'string' && children.type !== React.Fragment ? /*#__PURE__*/React.cloneElement(children, {
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
	}(React.Component);

	_defineProperty(Picker, "defaultProps", {
	  namespace: "ft-picker"
	});

	var index = Compose(Picker);

	return index;

})));
