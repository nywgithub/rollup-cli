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

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	var check = function (it) {
	  return it && it.Math == Math && it;
	};

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global$e =
	  // eslint-disable-next-line es/no-global-this -- safe
	  check(typeof globalThis == 'object' && globalThis) ||
	  check(typeof window == 'object' && window) ||
	  // eslint-disable-next-line no-restricted-globals -- safe
	  check(typeof self == 'object' && self) ||
	  check(typeof commonjsGlobal == 'object' && commonjsGlobal) ||
	  // eslint-disable-next-line no-new-func -- fallback
	  (function () { return this; })() || Function('return this')();

	var objectGetOwnPropertyDescriptor = {};

	var fails$g = function (exec) {
	  try {
	    return !!exec();
	  } catch (error) {
	    return true;
	  }
	};

	var fails$f = fails$g;

	// Detect IE8's incomplete defineProperty implementation
	var descriptors = !fails$f(function () {
	  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
	  return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] != 7;
	});

	var objectPropertyIsEnumerable = {};

	var $propertyIsEnumerable$1 = {}.propertyIsEnumerable;
	// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
	var getOwnPropertyDescriptor$1 = Object.getOwnPropertyDescriptor;

	// Nashorn ~ JDK8 bug
	var NASHORN_BUG = getOwnPropertyDescriptor$1 && !$propertyIsEnumerable$1.call({ 1: 2 }, 1);

	// `Object.prototype.propertyIsEnumerable` method implementation
	// https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
	objectPropertyIsEnumerable.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
	  var descriptor = getOwnPropertyDescriptor$1(this, V);
	  return !!descriptor && descriptor.enumerable;
	} : $propertyIsEnumerable$1;

	var createPropertyDescriptor$4 = function (bitmap, value) {
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

	var fails$e = fails$g;
	var classof$5 = classofRaw$1;

	var split = ''.split;

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var indexedObject = fails$e(function () {
	  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
	  // eslint-disable-next-line no-prototype-builtins -- safe
	  return !Object('z').propertyIsEnumerable(0);
	}) ? function (it) {
	  return classof$5(it) == 'String' ? split.call(it, '') : Object(it);
	} : Object;

	// `RequireObjectCoercible` abstract operation
	// https://tc39.es/ecma262/#sec-requireobjectcoercible
	var requireObjectCoercible$4 = function (it) {
	  if (it == undefined) throw TypeError("Can't call method on " + it);
	  return it;
	};

	// toObject with fallback for non-array-like ES3 strings
	var IndexedObject$2 = indexedObject;
	var requireObjectCoercible$3 = requireObjectCoercible$4;

	var toIndexedObject$8 = function (it) {
	  return IndexedObject$2(requireObjectCoercible$3(it));
	};

	var isObject$8 = function (it) {
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

	var isObject$7 = isObject$8;

	// `ToPrimitive` abstract operation
	// https://tc39.es/ecma262/#sec-toprimitive
	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	var toPrimitive$4 = function (input, PREFERRED_STRING) {
	  if (!isObject$7(input)) return input;
	  var fn, val;
	  if (PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject$7(val = fn.call(input))) return val;
	  if (typeof (fn = input.valueOf) == 'function' && !isObject$7(val = fn.call(input))) return val;
	  if (!PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject$7(val = fn.call(input))) return val;
	  throw TypeError("Can't convert object to primitive value");
	};

	var requireObjectCoercible$2 = requireObjectCoercible$4;

	// `ToObject` abstract operation
	// https://tc39.es/ecma262/#sec-toobject
	var toObject$5 = function (argument) {
	  return Object(requireObjectCoercible$2(argument));
	};

	var toObject$4 = toObject$5;

	var hasOwnProperty$1 = {}.hasOwnProperty;

	var has$9 = Object.hasOwn || function hasOwn(it, key) {
	  return hasOwnProperty$1.call(toObject$4(it), key);
	};

	var global$d = global$e;
	var isObject$6 = isObject$8;

	var document$1 = global$d.document;
	// typeof document.createElement is 'object' in old IE
	var EXISTS = isObject$6(document$1) && isObject$6(document$1.createElement);

	var documentCreateElement$1 = function (it) {
	  return EXISTS ? document$1.createElement(it) : {};
	};

	var DESCRIPTORS$7 = descriptors;
	var fails$d = fails$g;
	var createElement = documentCreateElement$1;

	// Thank's IE8 for his funny defineProperty
	var ie8DomDefine = !DESCRIPTORS$7 && !fails$d(function () {
	  // eslint-disable-next-line es/no-object-defineproperty -- requied for testing
	  return Object.defineProperty(createElement('div'), 'a', {
	    get: function () { return 7; }
	  }).a != 7;
	});

	var DESCRIPTORS$6 = descriptors;
	var propertyIsEnumerableModule$1 = objectPropertyIsEnumerable;
	var createPropertyDescriptor$3 = createPropertyDescriptor$4;
	var toIndexedObject$7 = toIndexedObject$8;
	var toPrimitive$3 = toPrimitive$4;
	var has$8 = has$9;
	var IE8_DOM_DEFINE$1 = ie8DomDefine;

	// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
	var $getOwnPropertyDescriptor$1 = Object.getOwnPropertyDescriptor;

	// `Object.getOwnPropertyDescriptor` method
	// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
	objectGetOwnPropertyDescriptor.f = DESCRIPTORS$6 ? $getOwnPropertyDescriptor$1 : function getOwnPropertyDescriptor(O, P) {
	  O = toIndexedObject$7(O);
	  P = toPrimitive$3(P, true);
	  if (IE8_DOM_DEFINE$1) try {
	    return $getOwnPropertyDescriptor$1(O, P);
	  } catch (error) { /* empty */ }
	  if (has$8(O, P)) return createPropertyDescriptor$3(!propertyIsEnumerableModule$1.f.call(O, P), O[P]);
	};

	var objectDefineProperty = {};

	var isObject$5 = isObject$8;

	var anObject$8 = function (it) {
	  if (!isObject$5(it)) {
	    throw TypeError(String(it) + ' is not an object');
	  } return it;
	};

	var DESCRIPTORS$5 = descriptors;
	var IE8_DOM_DEFINE = ie8DomDefine;
	var anObject$7 = anObject$8;
	var toPrimitive$2 = toPrimitive$4;

	// eslint-disable-next-line es/no-object-defineproperty -- safe
	var $defineProperty$1 = Object.defineProperty;

	// `Object.defineProperty` method
	// https://tc39.es/ecma262/#sec-object.defineproperty
	objectDefineProperty.f = DESCRIPTORS$5 ? $defineProperty$1 : function defineProperty(O, P, Attributes) {
	  anObject$7(O);
	  P = toPrimitive$2(P, true);
	  anObject$7(Attributes);
	  if (IE8_DOM_DEFINE) try {
	    return $defineProperty$1(O, P, Attributes);
	  } catch (error) { /* empty */ }
	  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
	  if ('value' in Attributes) O[P] = Attributes.value;
	  return O;
	};

	var DESCRIPTORS$4 = descriptors;
	var definePropertyModule$4 = objectDefineProperty;
	var createPropertyDescriptor$2 = createPropertyDescriptor$4;

	var createNonEnumerableProperty$7 = DESCRIPTORS$4 ? function (object, key, value) {
	  return definePropertyModule$4.f(object, key, createPropertyDescriptor$2(1, value));
	} : function (object, key, value) {
	  object[key] = value;
	  return object;
	};

	var redefine$4 = {exports: {}};

	var global$c = global$e;
	var createNonEnumerableProperty$6 = createNonEnumerableProperty$7;

	var setGlobal$3 = function (key, value) {
	  try {
	    createNonEnumerableProperty$6(global$c, key, value);
	  } catch (error) {
	    global$c[key] = value;
	  } return value;
	};

	var global$b = global$e;
	var setGlobal$2 = setGlobal$3;

	var SHARED = '__core-js_shared__';
	var store$3 = global$b[SHARED] || setGlobal$2(SHARED, {});

	var sharedStore = store$3;

	var store$2 = sharedStore;

	var functionToString = Function.toString;

	// this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper
	if (typeof store$2.inspectSource != 'function') {
	  store$2.inspectSource = function (it) {
	    return functionToString.call(it);
	  };
	}

	var inspectSource$2 = store$2.inspectSource;

	var global$a = global$e;
	var inspectSource$1 = inspectSource$2;

	var WeakMap$1 = global$a.WeakMap;

	var nativeWeakMap = typeof WeakMap$1 === 'function' && /native code/.test(inspectSource$1(WeakMap$1));

	var shared$5 = {exports: {}};

	var store$1 = sharedStore;

	(shared$5.exports = function (key, value) {
	  return store$1[key] || (store$1[key] = value !== undefined ? value : {});
	})('versions', []).push({
	  version: '3.15.2',
	  mode: 'global',
	  copyright: '© 2021 Denis Pushkarev (zloirock.ru)'
	});

	var id = 0;
	var postfix = Math.random();

	var uid$3 = function (key) {
	  return 'Symbol(' + String(key === undefined ? '' : key) + ')_' + (++id + postfix).toString(36);
	};

	var shared$4 = shared$5.exports;
	var uid$2 = uid$3;

	var keys = shared$4('keys');

	var sharedKey$3 = function (key) {
	  return keys[key] || (keys[key] = uid$2(key));
	};

	var hiddenKeys$5 = {};

	var NATIVE_WEAK_MAP = nativeWeakMap;
	var global$9 = global$e;
	var isObject$4 = isObject$8;
	var createNonEnumerableProperty$5 = createNonEnumerableProperty$7;
	var objectHas = has$9;
	var shared$3 = sharedStore;
	var sharedKey$2 = sharedKey$3;
	var hiddenKeys$4 = hiddenKeys$5;

	var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
	var WeakMap = global$9.WeakMap;
	var set, get, has$7;

	var enforce = function (it) {
	  return has$7(it) ? get(it) : set(it, {});
	};

	var getterFor = function (TYPE) {
	  return function (it) {
	    var state;
	    if (!isObject$4(it) || (state = get(it)).type !== TYPE) {
	      throw TypeError('Incompatible receiver, ' + TYPE + ' required');
	    } return state;
	  };
	};

	if (NATIVE_WEAK_MAP || shared$3.state) {
	  var store = shared$3.state || (shared$3.state = new WeakMap());
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
	  has$7 = function (it) {
	    return wmhas.call(store, it);
	  };
	} else {
	  var STATE = sharedKey$2('state');
	  hiddenKeys$4[STATE] = true;
	  set = function (it, metadata) {
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
	  set: set,
	  get: get,
	  has: has$7,
	  enforce: enforce,
	  getterFor: getterFor
	};

	var global$8 = global$e;
	var createNonEnumerableProperty$4 = createNonEnumerableProperty$7;
	var has$6 = has$9;
	var setGlobal$1 = setGlobal$3;
	var inspectSource = inspectSource$2;
	var InternalStateModule$1 = internalState;

	var getInternalState$2 = InternalStateModule$1.get;
	var enforceInternalState = InternalStateModule$1.enforce;
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
	  if (O === global$8) {
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
	  return typeof this == 'function' && getInternalState$2(this).source || inspectSource(this);
	});

	var global$7 = global$e;

	var path$2 = global$7;

	var path$1 = path$2;
	var global$6 = global$e;

	var aFunction$3 = function (variable) {
	  return typeof variable == 'function' ? variable : undefined;
	};

	var getBuiltIn$4 = function (namespace, method) {
	  return arguments.length < 2 ? aFunction$3(path$1[namespace]) || aFunction$3(global$6[namespace])
	    : path$1[namespace] && path$1[namespace][method] || global$6[namespace] && global$6[namespace][method];
	};

	var objectGetOwnPropertyNames = {};

	var ceil = Math.ceil;
	var floor = Math.floor;

	// `ToInteger` abstract operation
	// https://tc39.es/ecma262/#sec-tointeger
	var toInteger$3 = function (argument) {
	  return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor : ceil)(argument);
	};

	var toInteger$2 = toInteger$3;

	var min$3 = Math.min;

	// `ToLength` abstract operation
	// https://tc39.es/ecma262/#sec-tolength
	var toLength$4 = function (argument) {
	  return argument > 0 ? min$3(toInteger$2(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
	};

	var toInteger$1 = toInteger$3;

	var max$1 = Math.max;
	var min$2 = Math.min;

	// Helper for a popular repeating case of the spec:
	// Let integer be ? ToInteger(index).
	// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
	var toAbsoluteIndex$1 = function (index, length) {
	  var integer = toInteger$1(index);
	  return integer < 0 ? max$1(integer + length, 0) : min$2(integer, length);
	};

	var toIndexedObject$6 = toIndexedObject$8;
	var toLength$3 = toLength$4;
	var toAbsoluteIndex = toAbsoluteIndex$1;

	// `Array.prototype.{ indexOf, includes }` methods implementation
	var createMethod$2 = function (IS_INCLUDES) {
	  return function ($this, el, fromIndex) {
	    var O = toIndexedObject$6($this);
	    var length = toLength$3(O.length);
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
	  includes: createMethod$2(true),
	  // `Array.prototype.indexOf` method
	  // https://tc39.es/ecma262/#sec-array.prototype.indexof
	  indexOf: createMethod$2(false)
	};

	var has$5 = has$9;
	var toIndexedObject$5 = toIndexedObject$8;
	var indexOf = arrayIncludes.indexOf;
	var hiddenKeys$3 = hiddenKeys$5;

	var objectKeysInternal = function (object, names) {
	  var O = toIndexedObject$5(object);
	  var i = 0;
	  var result = [];
	  var key;
	  for (key in O) !has$5(hiddenKeys$3, key) && has$5(O, key) && result.push(key);
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

	var hiddenKeys$2 = enumBugKeys$2.concat('length', 'prototype');

	// `Object.getOwnPropertyNames` method
	// https://tc39.es/ecma262/#sec-object.getownpropertynames
	// eslint-disable-next-line es/no-object-getownpropertynames -- safe
	objectGetOwnPropertyNames.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
	  return internalObjectKeys$1(O, hiddenKeys$2);
	};

	var objectGetOwnPropertySymbols = {};

	// eslint-disable-next-line es/no-object-getownpropertysymbols -- safe
	objectGetOwnPropertySymbols.f = Object.getOwnPropertySymbols;

	var getBuiltIn$3 = getBuiltIn$4;
	var getOwnPropertyNamesModule$1 = objectGetOwnPropertyNames;
	var getOwnPropertySymbolsModule$1 = objectGetOwnPropertySymbols;
	var anObject$6 = anObject$8;

	// all object keys, includes non-enumerable and symbols
	var ownKeys$3 = getBuiltIn$3('Reflect', 'ownKeys') || function ownKeys(it) {
	  var keys = getOwnPropertyNamesModule$1.f(anObject$6(it));
	  var getOwnPropertySymbols = getOwnPropertySymbolsModule$1.f;
	  return getOwnPropertySymbols ? keys.concat(getOwnPropertySymbols(it)) : keys;
	};

	var has$4 = has$9;
	var ownKeys$2 = ownKeys$3;
	var getOwnPropertyDescriptorModule$2 = objectGetOwnPropertyDescriptor;
	var definePropertyModule$3 = objectDefineProperty;

	var copyConstructorProperties$1 = function (target, source) {
	  var keys = ownKeys$2(source);
	  var defineProperty = definePropertyModule$3.f;
	  var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule$2.f;
	  for (var i = 0; i < keys.length; i++) {
	    var key = keys[i];
	    if (!has$4(target, key)) defineProperty(target, key, getOwnPropertyDescriptor(source, key));
	  }
	};

	var fails$c = fails$g;

	var replacement = /#|\.prototype\./;

	var isForced$1 = function (feature, detection) {
	  var value = data[normalize(feature)];
	  return value == POLYFILL ? true
	    : value == NATIVE ? false
	    : typeof detection == 'function' ? fails$c(detection)
	    : !!detection;
	};

	var normalize = isForced$1.normalize = function (string) {
	  return String(string).replace(replacement, '.').toLowerCase();
	};

	var data = isForced$1.data = {};
	var NATIVE = isForced$1.NATIVE = 'N';
	var POLYFILL = isForced$1.POLYFILL = 'P';

	var isForced_1 = isForced$1;

	var global$5 = global$e;
	var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;
	var createNonEnumerableProperty$3 = createNonEnumerableProperty$7;
	var redefine$3 = redefine$4.exports;
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
	*/
	var _export = function (options, source) {
	  var TARGET = options.target;
	  var GLOBAL = options.global;
	  var STATIC = options.stat;
	  var FORCED, target, key, targetProperty, sourceProperty, descriptor;
	  if (GLOBAL) {
	    target = global$5;
	  } else if (STATIC) {
	    target = global$5[TARGET] || setGlobal(TARGET, {});
	  } else {
	    target = (global$5[TARGET] || {}).prototype;
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
	      createNonEnumerableProperty$3(sourceProperty, 'sham', true);
	    }
	    // extend global
	    redefine$3(target, key, sourceProperty, options);
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

	var $$9 = _export;
	var toObject$3 = toObject$5;
	var nativeKeys = objectKeys$2;
	var fails$b = fails$g;

	var FAILS_ON_PRIMITIVES$1 = fails$b(function () { nativeKeys(1); });

	// `Object.keys` method
	// https://tc39.es/ecma262/#sec-object.keys
	$$9({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES$1 }, {
	  keys: function keys(it) {
	    return nativeKeys(toObject$3(it));
	  }
	});

	var getBuiltIn$2 = getBuiltIn$4;

	var engineUserAgent = getBuiltIn$2('navigator', 'userAgent') || '';

	var global$4 = global$e;
	var userAgent = engineUserAgent;

	var process$1 = global$4.process;
	var versions = process$1 && process$1.versions;
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

	var V8_VERSION$2 = engineV8Version;
	var fails$a = fails$g;

	// eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing
	var nativeSymbol = !!Object.getOwnPropertySymbols && !fails$a(function () {
	  var symbol = Symbol();
	  // Chrome 38 Symbol has incorrect toString conversion
	  // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances
	  return !String(symbol) || !(Object(symbol) instanceof Symbol) ||
	    // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
	    !Symbol.sham && V8_VERSION$2 && V8_VERSION$2 < 41;
	});

	/* eslint-disable es/no-symbol -- required for testing */

	var NATIVE_SYMBOL$2 = nativeSymbol;

	var useSymbolAsUid = NATIVE_SYMBOL$2
	  && !Symbol.sham
	  && typeof Symbol.iterator == 'symbol';

	var classof$4 = classofRaw$1;

	// `IsArray` abstract operation
	// https://tc39.es/ecma262/#sec-isarray
	// eslint-disable-next-line es/no-array-isarray -- safe
	var isArray$3 = Array.isArray || function isArray(arg) {
	  return classof$4(arg) == 'Array';
	};

	var DESCRIPTORS$3 = descriptors;
	var definePropertyModule$2 = objectDefineProperty;
	var anObject$5 = anObject$8;
	var objectKeys$1 = objectKeys$2;

	// `Object.defineProperties` method
	// https://tc39.es/ecma262/#sec-object.defineproperties
	// eslint-disable-next-line es/no-object-defineproperties -- safe
	var objectDefineProperties = DESCRIPTORS$3 ? Object.defineProperties : function defineProperties(O, Properties) {
	  anObject$5(O);
	  var keys = objectKeys$1(Properties);
	  var length = keys.length;
	  var index = 0;
	  var key;
	  while (length > index) definePropertyModule$2.f(O, key = keys[index++], Properties[key]);
	  return O;
	};

	var getBuiltIn$1 = getBuiltIn$4;

	var html$1 = getBuiltIn$1('document', 'documentElement');

	var anObject$4 = anObject$8;
	var defineProperties = objectDefineProperties;
	var enumBugKeys = enumBugKeys$3;
	var hiddenKeys$1 = hiddenKeys$5;
	var html = html$1;
	var documentCreateElement = documentCreateElement$1;
	var sharedKey$1 = sharedKey$3;

	var GT = '>';
	var LT = '<';
	var PROTOTYPE$1 = 'prototype';
	var SCRIPT = 'script';
	var IE_PROTO = sharedKey$1('IE_PROTO');

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
	  while (length--) delete NullProtoObject[PROTOTYPE$1][enumBugKeys[length]];
	  return NullProtoObject();
	};

	hiddenKeys$1[IE_PROTO] = true;

	// `Object.create` method
	// https://tc39.es/ecma262/#sec-object.create
	var objectCreate = Object.create || function create(O, Properties) {
	  var result;
	  if (O !== null) {
	    EmptyConstructor[PROTOTYPE$1] = anObject$4(O);
	    result = new EmptyConstructor();
	    EmptyConstructor[PROTOTYPE$1] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO] = O;
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

	var global$3 = global$e;
	var shared$2 = shared$5.exports;
	var has$3 = has$9;
	var uid$1 = uid$3;
	var NATIVE_SYMBOL$1 = nativeSymbol;
	var USE_SYMBOL_AS_UID$1 = useSymbolAsUid;

	var WellKnownSymbolsStore$1 = shared$2('wks');
	var Symbol$1 = global$3.Symbol;
	var createWellKnownSymbol = USE_SYMBOL_AS_UID$1 ? Symbol$1 : Symbol$1 && Symbol$1.withoutSetter || uid$1;

	var wellKnownSymbol$b = function (name) {
	  if (!has$3(WellKnownSymbolsStore$1, name) || !(NATIVE_SYMBOL$1 || typeof WellKnownSymbolsStore$1[name] == 'string')) {
	    if (NATIVE_SYMBOL$1 && has$3(Symbol$1, name)) {
	      WellKnownSymbolsStore$1[name] = Symbol$1[name];
	    } else {
	      WellKnownSymbolsStore$1[name] = createWellKnownSymbol('Symbol.' + name);
	    }
	  } return WellKnownSymbolsStore$1[name];
	};

	var wellKnownSymbolWrapped = {};

	var wellKnownSymbol$a = wellKnownSymbol$b;

	wellKnownSymbolWrapped.f = wellKnownSymbol$a;

	var path = path$2;
	var has$2 = has$9;
	var wrappedWellKnownSymbolModule$1 = wellKnownSymbolWrapped;
	var defineProperty$1 = objectDefineProperty.f;

	var defineWellKnownSymbol$1 = function (NAME) {
	  var Symbol = path.Symbol || (path.Symbol = {});
	  if (!has$2(Symbol, NAME)) defineProperty$1(Symbol, NAME, {
	    value: wrappedWellKnownSymbolModule$1.f(NAME)
	  });
	};

	var defineProperty = objectDefineProperty.f;
	var has$1 = has$9;
	var wellKnownSymbol$9 = wellKnownSymbol$b;

	var TO_STRING_TAG$2 = wellKnownSymbol$9('toStringTag');

	var setToStringTag$1 = function (it, TAG, STATIC) {
	  if (it && !has$1(it = STATIC ? it : it.prototype, TO_STRING_TAG$2)) {
	    defineProperty(it, TO_STRING_TAG$2, { configurable: true, value: TAG });
	  }
	};

	var aFunction$2 = function (it) {
	  if (typeof it != 'function') {
	    throw TypeError(String(it) + ' is not a function');
	  } return it;
	};

	var aFunction$1 = aFunction$2;

	// optional / simple context binding
	var functionBindContext = function (fn, that, length) {
	  aFunction$1(fn);
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

	var isObject$3 = isObject$8;
	var isArray$2 = isArray$3;
	var wellKnownSymbol$8 = wellKnownSymbol$b;

	var SPECIES$3 = wellKnownSymbol$8('species');

	// `ArraySpeciesCreate` abstract operation
	// https://tc39.es/ecma262/#sec-arrayspeciescreate
	var arraySpeciesCreate$2 = function (originalArray, length) {
	  var C;
	  if (isArray$2(originalArray)) {
	    C = originalArray.constructor;
	    // cross-realm fallback
	    if (typeof C == 'function' && (C === Array || isArray$2(C.prototype))) C = undefined;
	    else if (isObject$3(C)) {
	      C = C[SPECIES$3];
	      if (C === null) C = undefined;
	    }
	  } return new (C === undefined ? Array : C)(length === 0 ? 0 : length);
	};

	var bind = functionBindContext;
	var IndexedObject$1 = indexedObject;
	var toObject$2 = toObject$5;
	var toLength$2 = toLength$4;
	var arraySpeciesCreate$1 = arraySpeciesCreate$2;

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
	    var O = toObject$2($this);
	    var self = IndexedObject$1(O);
	    var boundFunction = bind(callbackfn, that, 3);
	    var length = toLength$2(self.length);
	    var index = 0;
	    var create = specificCreate || arraySpeciesCreate$1;
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

	var $$8 = _export;
	var global$2 = global$e;
	var getBuiltIn = getBuiltIn$4;
	var DESCRIPTORS$2 = descriptors;
	var NATIVE_SYMBOL = nativeSymbol;
	var USE_SYMBOL_AS_UID = useSymbolAsUid;
	var fails$9 = fails$g;
	var has = has$9;
	var isArray$1 = isArray$3;
	var isObject$2 = isObject$8;
	var anObject$3 = anObject$8;
	var toObject$1 = toObject$5;
	var toIndexedObject$3 = toIndexedObject$8;
	var toPrimitive$1 = toPrimitive$4;
	var createPropertyDescriptor$1 = createPropertyDescriptor$4;
	var nativeObjectCreate = objectCreate;
	var objectKeys = objectKeys$2;
	var getOwnPropertyNamesModule = objectGetOwnPropertyNames;
	var getOwnPropertyNamesExternal = objectGetOwnPropertyNamesExternal;
	var getOwnPropertySymbolsModule = objectGetOwnPropertySymbols;
	var getOwnPropertyDescriptorModule$1 = objectGetOwnPropertyDescriptor;
	var definePropertyModule$1 = objectDefineProperty;
	var propertyIsEnumerableModule = objectPropertyIsEnumerable;
	var createNonEnumerableProperty$2 = createNonEnumerableProperty$7;
	var redefine$2 = redefine$4.exports;
	var shared$1 = shared$5.exports;
	var sharedKey = sharedKey$3;
	var hiddenKeys = hiddenKeys$5;
	var uid = uid$3;
	var wellKnownSymbol$7 = wellKnownSymbol$b;
	var wrappedWellKnownSymbolModule = wellKnownSymbolWrapped;
	var defineWellKnownSymbol = defineWellKnownSymbol$1;
	var setToStringTag = setToStringTag$1;
	var InternalStateModule = internalState;
	var $forEach$1 = arrayIteration.forEach;

	var HIDDEN = sharedKey('hidden');
	var SYMBOL = 'Symbol';
	var PROTOTYPE = 'prototype';
	var TO_PRIMITIVE = wellKnownSymbol$7('toPrimitive');
	var setInternalState = InternalStateModule.set;
	var getInternalState$1 = InternalStateModule.getterFor(SYMBOL);
	var ObjectPrototype = Object[PROTOTYPE];
	var $Symbol = global$2.Symbol;
	var $stringify = getBuiltIn('JSON', 'stringify');
	var nativeGetOwnPropertyDescriptor$1 = getOwnPropertyDescriptorModule$1.f;
	var nativeDefineProperty = definePropertyModule$1.f;
	var nativeGetOwnPropertyNames = getOwnPropertyNamesExternal.f;
	var nativePropertyIsEnumerable = propertyIsEnumerableModule.f;
	var AllSymbols = shared$1('symbols');
	var ObjectPrototypeSymbols = shared$1('op-symbols');
	var StringToSymbolRegistry = shared$1('string-to-symbol-registry');
	var SymbolToStringRegistry = shared$1('symbol-to-string-registry');
	var WellKnownSymbolsStore = shared$1('wks');
	var QObject = global$2.QObject;
	// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
	var USE_SETTER = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

	// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
	var setSymbolDescriptor = DESCRIPTORS$2 && fails$9(function () {
	  return nativeObjectCreate(nativeDefineProperty({}, 'a', {
	    get: function () { return nativeDefineProperty(this, 'a', { value: 7 }).a; }
	  })).a != 7;
	}) ? function (O, P, Attributes) {
	  var ObjectPrototypeDescriptor = nativeGetOwnPropertyDescriptor$1(ObjectPrototype, P);
	  if (ObjectPrototypeDescriptor) delete ObjectPrototype[P];
	  nativeDefineProperty(O, P, Attributes);
	  if (ObjectPrototypeDescriptor && O !== ObjectPrototype) {
	    nativeDefineProperty(ObjectPrototype, P, ObjectPrototypeDescriptor);
	  }
	} : nativeDefineProperty;

	var wrap = function (tag, description) {
	  var symbol = AllSymbols[tag] = nativeObjectCreate($Symbol[PROTOTYPE]);
	  setInternalState(symbol, {
	    type: SYMBOL,
	    tag: tag,
	    description: description
	  });
	  if (!DESCRIPTORS$2) symbol.description = description;
	  return symbol;
	};

	var isSymbol = USE_SYMBOL_AS_UID ? function (it) {
	  return typeof it == 'symbol';
	} : function (it) {
	  return Object(it) instanceof $Symbol;
	};

	var $defineProperty = function defineProperty(O, P, Attributes) {
	  if (O === ObjectPrototype) $defineProperty(ObjectPrototypeSymbols, P, Attributes);
	  anObject$3(O);
	  var key = toPrimitive$1(P, true);
	  anObject$3(Attributes);
	  if (has(AllSymbols, key)) {
	    if (!Attributes.enumerable) {
	      if (!has(O, HIDDEN)) nativeDefineProperty(O, HIDDEN, createPropertyDescriptor$1(1, {}));
	      O[HIDDEN][key] = true;
	    } else {
	      if (has(O, HIDDEN) && O[HIDDEN][key]) O[HIDDEN][key] = false;
	      Attributes = nativeObjectCreate(Attributes, { enumerable: createPropertyDescriptor$1(0, false) });
	    } return setSymbolDescriptor(O, key, Attributes);
	  } return nativeDefineProperty(O, key, Attributes);
	};

	var $defineProperties = function defineProperties(O, Properties) {
	  anObject$3(O);
	  var properties = toIndexedObject$3(Properties);
	  var keys = objectKeys(properties).concat($getOwnPropertySymbols(properties));
	  $forEach$1(keys, function (key) {
	    if (!DESCRIPTORS$2 || $propertyIsEnumerable.call(properties, key)) $defineProperty(O, key, properties[key]);
	  });
	  return O;
	};

	var $create = function create(O, Properties) {
	  return Properties === undefined ? nativeObjectCreate(O) : $defineProperties(nativeObjectCreate(O), Properties);
	};

	var $propertyIsEnumerable = function propertyIsEnumerable(V) {
	  var P = toPrimitive$1(V, true);
	  var enumerable = nativePropertyIsEnumerable.call(this, P);
	  if (this === ObjectPrototype && has(AllSymbols, P) && !has(ObjectPrototypeSymbols, P)) return false;
	  return enumerable || !has(this, P) || !has(AllSymbols, P) || has(this, HIDDEN) && this[HIDDEN][P] ? enumerable : true;
	};

	var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(O, P) {
	  var it = toIndexedObject$3(O);
	  var key = toPrimitive$1(P, true);
	  if (it === ObjectPrototype && has(AllSymbols, key) && !has(ObjectPrototypeSymbols, key)) return;
	  var descriptor = nativeGetOwnPropertyDescriptor$1(it, key);
	  if (descriptor && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) {
	    descriptor.enumerable = true;
	  }
	  return descriptor;
	};

	var $getOwnPropertyNames = function getOwnPropertyNames(O) {
	  var names = nativeGetOwnPropertyNames(toIndexedObject$3(O));
	  var result = [];
	  $forEach$1(names, function (key) {
	    if (!has(AllSymbols, key) && !has(hiddenKeys, key)) result.push(key);
	  });
	  return result;
	};

	var $getOwnPropertySymbols = function getOwnPropertySymbols(O) {
	  var IS_OBJECT_PROTOTYPE = O === ObjectPrototype;
	  var names = nativeGetOwnPropertyNames(IS_OBJECT_PROTOTYPE ? ObjectPrototypeSymbols : toIndexedObject$3(O));
	  var result = [];
	  $forEach$1(names, function (key) {
	    if (has(AllSymbols, key) && (!IS_OBJECT_PROTOTYPE || has(ObjectPrototype, key))) {
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
	    var tag = uid(description);
	    var setter = function (value) {
	      if (this === ObjectPrototype) setter.call(ObjectPrototypeSymbols, value);
	      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
	      setSymbolDescriptor(this, tag, createPropertyDescriptor$1(1, value));
	    };
	    if (DESCRIPTORS$2 && USE_SETTER) setSymbolDescriptor(ObjectPrototype, tag, { configurable: true, set: setter });
	    return wrap(tag, description);
	  };

	  redefine$2($Symbol[PROTOTYPE], 'toString', function toString() {
	    return getInternalState$1(this).tag;
	  });

	  redefine$2($Symbol, 'withoutSetter', function (description) {
	    return wrap(uid(description), description);
	  });

	  propertyIsEnumerableModule.f = $propertyIsEnumerable;
	  definePropertyModule$1.f = $defineProperty;
	  getOwnPropertyDescriptorModule$1.f = $getOwnPropertyDescriptor;
	  getOwnPropertyNamesModule.f = getOwnPropertyNamesExternal.f = $getOwnPropertyNames;
	  getOwnPropertySymbolsModule.f = $getOwnPropertySymbols;

	  wrappedWellKnownSymbolModule.f = function (name) {
	    return wrap(wellKnownSymbol$7(name), name);
	  };

	  if (DESCRIPTORS$2) {
	    // https://github.com/tc39/proposal-Symbol-description
	    nativeDefineProperty($Symbol[PROTOTYPE], 'description', {
	      configurable: true,
	      get: function description() {
	        return getInternalState$1(this).description;
	      }
	    });
	    {
	      redefine$2(ObjectPrototype, 'propertyIsEnumerable', $propertyIsEnumerable, { unsafe: true });
	    }
	  }
	}

	$$8({ global: true, wrap: true, forced: !NATIVE_SYMBOL, sham: !NATIVE_SYMBOL }, {
	  Symbol: $Symbol
	});

	$forEach$1(objectKeys(WellKnownSymbolsStore), function (name) {
	  defineWellKnownSymbol(name);
	});

	$$8({ target: SYMBOL, stat: true, forced: !NATIVE_SYMBOL }, {
	  // `Symbol.for` method
	  // https://tc39.es/ecma262/#sec-symbol.for
	  'for': function (key) {
	    var string = String(key);
	    if (has(StringToSymbolRegistry, string)) return StringToSymbolRegistry[string];
	    var symbol = $Symbol(string);
	    StringToSymbolRegistry[string] = symbol;
	    SymbolToStringRegistry[symbol] = string;
	    return symbol;
	  },
	  // `Symbol.keyFor` method
	  // https://tc39.es/ecma262/#sec-symbol.keyfor
	  keyFor: function keyFor(sym) {
	    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol');
	    if (has(SymbolToStringRegistry, sym)) return SymbolToStringRegistry[sym];
	  },
	  useSetter: function () { USE_SETTER = true; },
	  useSimple: function () { USE_SETTER = false; }
	});

	$$8({ target: 'Object', stat: true, forced: !NATIVE_SYMBOL, sham: !DESCRIPTORS$2 }, {
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

	$$8({ target: 'Object', stat: true, forced: !NATIVE_SYMBOL }, {
	  // `Object.getOwnPropertyNames` method
	  // https://tc39.es/ecma262/#sec-object.getownpropertynames
	  getOwnPropertyNames: $getOwnPropertyNames,
	  // `Object.getOwnPropertySymbols` method
	  // https://tc39.es/ecma262/#sec-object.getownpropertysymbols
	  getOwnPropertySymbols: $getOwnPropertySymbols
	});

	// Chrome 38 and 39 `Object.getOwnPropertySymbols` fails on primitives
	// https://bugs.chromium.org/p/v8/issues/detail?id=3443
	$$8({ target: 'Object', stat: true, forced: fails$9(function () { getOwnPropertySymbolsModule.f(1); }) }, {
	  getOwnPropertySymbols: function getOwnPropertySymbols(it) {
	    return getOwnPropertySymbolsModule.f(toObject$1(it));
	  }
	});

	// `JSON.stringify` method behavior with symbols
	// https://tc39.es/ecma262/#sec-json.stringify
	if ($stringify) {
	  var FORCED_JSON_STRINGIFY = !NATIVE_SYMBOL || fails$9(function () {
	    var symbol = $Symbol();
	    // MS Edge converts symbol values to JSON as {}
	    return $stringify([symbol]) != '[null]'
	      // WebKit converts symbol values to JSON as null
	      || $stringify({ a: symbol }) != '{}'
	      // V8 throws on boxed symbols
	      || $stringify(Object(symbol)) != '{}';
	  });

	  $$8({ target: 'JSON', stat: true, forced: FORCED_JSON_STRINGIFY }, {
	    // eslint-disable-next-line no-unused-vars -- required for `.length`
	    stringify: function stringify(it, replacer, space) {
	      var args = [it];
	      var index = 1;
	      var $replacer;
	      while (arguments.length > index) args.push(arguments[index++]);
	      $replacer = replacer;
	      if (!isObject$2(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
	      if (!isArray$1(replacer)) replacer = function (key, value) {
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
	  createNonEnumerableProperty$2($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
	}
	// `Symbol.prototype[@@toStringTag]` property
	// https://tc39.es/ecma262/#sec-symbol.prototype-@@tostringtag
	setToStringTag($Symbol, SYMBOL);

	hiddenKeys[HIDDEN] = true;

	var fails$8 = fails$g;
	var wellKnownSymbol$6 = wellKnownSymbol$b;
	var V8_VERSION$1 = engineV8Version;

	var SPECIES$2 = wellKnownSymbol$6('species');

	var arrayMethodHasSpeciesSupport$2 = function (METHOD_NAME) {
	  // We can't use this feature detection in V8 since it causes
	  // deoptimization and serious performance degradation
	  // https://github.com/zloirock/core-js/issues/677
	  return V8_VERSION$1 >= 51 || !fails$8(function () {
	    var array = [];
	    var constructor = array.constructor = {};
	    constructor[SPECIES$2] = function () {
	      return { foo: 1 };
	    };
	    return array[METHOD_NAME](Boolean).foo !== 1;
	  });
	};

	var $$7 = _export;
	var $filter = arrayIteration.filter;
	var arrayMethodHasSpeciesSupport$1 = arrayMethodHasSpeciesSupport$2;

	var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport$1('filter');

	// `Array.prototype.filter` method
	// https://tc39.es/ecma262/#sec-array.prototype.filter
	// with adding support of @@species
	$$7({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT }, {
	  filter: function filter(callbackfn /* , thisArg */) {
	    return $filter(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	var $$6 = _export;
	var fails$7 = fails$g;
	var toIndexedObject$2 = toIndexedObject$8;
	var nativeGetOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;
	var DESCRIPTORS$1 = descriptors;

	var FAILS_ON_PRIMITIVES = fails$7(function () { nativeGetOwnPropertyDescriptor(1); });
	var FORCED$1 = !DESCRIPTORS$1 || FAILS_ON_PRIMITIVES;

	// `Object.getOwnPropertyDescriptor` method
	// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
	$$6({ target: 'Object', stat: true, forced: FORCED$1, sham: !DESCRIPTORS$1 }, {
	  getOwnPropertyDescriptor: function getOwnPropertyDescriptor(it, key) {
	    return nativeGetOwnPropertyDescriptor(toIndexedObject$2(it), key);
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

	var fails$6 = fails$g;

	var arrayMethodIsStrict$2 = function (METHOD_NAME, argument) {
	  var method = [][METHOD_NAME];
	  return !!method && fails$6(function () {
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

	var global$1 = global$e;
	var DOMIterables = domIterables;
	var forEach = arrayForEach;
	var createNonEnumerableProperty$1 = createNonEnumerableProperty$7;

	for (var COLLECTION_NAME in DOMIterables) {
	  var Collection = global$1[COLLECTION_NAME];
	  var CollectionPrototype = Collection && Collection.prototype;
	  // some Chrome versions have non-configurable methods on DOMTokenList
	  if (CollectionPrototype && CollectionPrototype.forEach !== forEach) try {
	    createNonEnumerableProperty$1(CollectionPrototype, 'forEach', forEach);
	  } catch (error) {
	    CollectionPrototype.forEach = forEach;
	  }
	}

	var toPrimitive = toPrimitive$4;
	var definePropertyModule = objectDefineProperty;
	var createPropertyDescriptor = createPropertyDescriptor$4;

	var createProperty$2 = function (object, key, value) {
	  var propertyKey = toPrimitive(key);
	  if (propertyKey in object) definePropertyModule.f(object, propertyKey, createPropertyDescriptor(0, value));
	  else object[propertyKey] = value;
	};

	var $$5 = _export;
	var DESCRIPTORS = descriptors;
	var ownKeys$1 = ownKeys$3;
	var toIndexedObject$1 = toIndexedObject$8;
	var getOwnPropertyDescriptorModule = objectGetOwnPropertyDescriptor;
	var createProperty$1 = createProperty$2;

	// `Object.getOwnPropertyDescriptors` method
	// https://tc39.es/ecma262/#sec-object.getownpropertydescriptors
	$$5({ target: 'Object', stat: true, sham: !DESCRIPTORS }, {
	  getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object) {
	    var O = toIndexedObject$1(object);
	    var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
	    var keys = ownKeys$1(O);
	    var result = {};
	    var index = 0;
	    var key, descriptor;
	    while (keys.length > index) {
	      descriptor = getOwnPropertyDescriptor(O, key = keys[index++]);
	      if (descriptor !== undefined) createProperty$1(result, key, descriptor);
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

	function _toConsumableArray(arr) {
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

	function _objectWithoutProperties(source, excluded) {
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

	var $$4 = _export;
	var fails$5 = fails$g;
	var isArray = isArray$3;
	var isObject$1 = isObject$8;
	var toObject = toObject$5;
	var toLength$1 = toLength$4;
	var createProperty = createProperty$2;
	var arraySpeciesCreate = arraySpeciesCreate$2;
	var arrayMethodHasSpeciesSupport = arrayMethodHasSpeciesSupport$2;
	var wellKnownSymbol$5 = wellKnownSymbol$b;
	var V8_VERSION = engineV8Version;

	var IS_CONCAT_SPREADABLE = wellKnownSymbol$5('isConcatSpreadable');
	var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF;
	var MAXIMUM_ALLOWED_INDEX_EXCEEDED = 'Maximum allowed index exceeded';

	// We can't use this feature detection in V8 since it causes
	// deoptimization and serious performance degradation
	// https://github.com/zloirock/core-js/issues/679
	var IS_CONCAT_SPREADABLE_SUPPORT = V8_VERSION >= 51 || !fails$5(function () {
	  var array = [];
	  array[IS_CONCAT_SPREADABLE] = false;
	  return array.concat()[0] !== array;
	});

	var SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('concat');

	var isConcatSpreadable = function (O) {
	  if (!isObject$1(O)) return false;
	  var spreadable = O[IS_CONCAT_SPREADABLE];
	  return spreadable !== undefined ? !!spreadable : isArray(O);
	};

	var FORCED = !IS_CONCAT_SPREADABLE_SUPPORT || !SPECIES_SUPPORT;

	// `Array.prototype.concat` method
	// https://tc39.es/ecma262/#sec-array.prototype.concat
	// with adding support of @@isConcatSpreadable and @@species
	$$4({ target: 'Array', proto: true, forced: FORCED }, {
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
	        for (k = 0; k < len; k++, n++) if (k in E) createProperty(A, n, E[k]);
	      } else {
	        if (n >= MAX_SAFE_INTEGER) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
	        createProperty(A, n++, E);
	      }
	    }
	    A.length = n;
	    return A;
	  }
	});

	var css_248z = ".ft-popover[data-animation=fade][data-state=hidden]{opacity:0}[data-tippy-root]{max-width:calc(100vw - 10px)}.ft-popover{border-radius:3px;box-shadow:0 9px 16px 8px rgba(0,0,0,.03),0 6px 10px 0 rgba(0,0,0,.06),0 3px 6px -3px rgba(0,0,0,.12);background-color:#fff;color:#555;font-size:14px;line-height:1.5;white-space:normal;outline:0;transition-property:transform,visibility,opacity;position:relative}.ft-popover[data-placement^=top]>.ft-popover-arrow{bottom:0}.ft-popover[data-placement^=top]>.ft-popover-arrow:before{bottom:-5px;left:0;border-width:6px 6px 0;border-top-color:initial;transform-origin:center top}.ft-popover[data-placement^=bottom]>.ft-popover-arrow{top:0}.ft-popover[data-placement^=bottom]>.ft-popover-arrow:before{top:-5px;left:0;border-width:0 6px 6px;border-bottom-color:initial;transform-origin:center bottom}.ft-popover[data-placement^=left]>.ft-popover-arrow{right:0}.ft-popover[data-placement^=left]>.ft-popover-arrow:before{border-width:6px 0 6px 6px;border-left-color:initial;right:-5px;transform-origin:center}.ft-popover[data-placement^=right]>.ft-popover-arrow{left:0}.ft-popover[data-placement^=right]>.ft-popover-arrow:before{left:-5px;border-width:6px 6px 6px 0;border-right-color:initial;transform-origin:center}.ft-popover[data-inertia][data-state=visible]{transition-timing-function:cubic-bezier(.54,1.5,.38,1.11)}.ft-popover-arrow{width:12px;height:12px;color:#fff}.ft-popover-arrow:before{content:\"\";position:absolute;border-color:transparent;border-style:solid}.ft-popover-content{padding:10px;position:relative;z-index:1}";
	styleInject(css_248z, {id: "future-popover-2.0.0"});

	var n,u$1,i$1,t$1,o$1,r$1={},f$1=[],e$1=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;function c$1(n,l){for(var u in l)n[u]=l[u];return n}function s$1(n){var l=n.parentNode;l&&l.removeChild(n);}function a$1(n,l,u){var i,t,o,r=arguments,f={};for(o in l)"key"==o?i=l[o]:"ref"==o?t=l[o]:f[o]=l[o];if(arguments.length>3)for(u=[u],o=3;o<arguments.length;o++)u.push(r[o]);if(null!=u&&(f.children=u),"function"==typeof n&&null!=n.defaultProps)for(o in n.defaultProps)void 0===f[o]&&(f[o]=n.defaultProps[o]);return v$1(n,f,i,t,null)}function v$1(l,u,i,t,o){var r={type:l,props:u,key:i,ref:t,__k:null,__:null,__b:0,__e:null,__d:void 0,__c:null,__h:null,constructor:void 0,__v:null==o?++n.__v:o};return null!=n.vnode&&n.vnode(r),r}function h$1(){return {current:null}}function y$1(n){return n.children}function p$1(n,l){this.props=n,this.context=l;}function d$1(n,l){if(null==l)return n.__?d$1(n.__,n.__.__k.indexOf(n)+1):null;for(var u;l<n.__k.length;l++)if(null!=(u=n.__k[l])&&null!=u.__e)return u.__e;return "function"==typeof n.type?d$1(n):null}function _$1(n){var l,u;if(null!=(n=n.__)&&null!=n.__c){for(n.__e=n.__c.base=null,l=0;l<n.__k.length;l++)if(null!=(u=n.__k[l])&&null!=u.__e){n.__e=n.__c.base=u.__e;break}return _$1(n)}}function k$2(l){(!l.__d&&(l.__d=!0)&&u$1.push(l)&&!b$1.__r++||t$1!==n.debounceRendering)&&((t$1=n.debounceRendering)||i$1)(b$1);}function b$1(){for(var n;b$1.__r=u$1.length;)n=u$1.sort(function(n,l){return n.__v.__b-l.__v.__b}),u$1=[],n.some(function(n){var l,u,i,t,o,r;n.__d&&(o=(t=(l=n).__v).__e,(r=l.__P)&&(u=[],(i=c$1({},t)).__v=t.__v+1,I$1(r,t,i,l.__n,void 0!==r.ownerSVGElement,null!=t.__h?[o]:null,u,null==o?d$1(t):o,t.__h),T$2(u,t),t.__e!=o&&_$1(t)));});}function m$1(n,l,u,i,t,o,e,c,s,a){var h,p,_,k,b,m,w,A=i&&i.__k||f$1,P=A.length;for(u.__k=[],h=0;h<l.length;h++)if(null!=(k=u.__k[h]=null==(k=l[h])||"boolean"==typeof k?null:"string"==typeof k||"number"==typeof k||"bigint"==typeof k?v$1(null,k,null,null,k):Array.isArray(k)?v$1(y$1,{children:k},null,null,null):k.__b>0?v$1(k.type,k.props,k.key,null,k.__v):k)){if(k.__=u,k.__b=u.__b+1,null===(_=A[h])||_&&k.key==_.key&&k.type===_.type)A[h]=void 0;else for(p=0;p<P;p++){if((_=A[p])&&k.key==_.key&&k.type===_.type){A[p]=void 0;break}_=null;}I$1(n,k,_=_||r$1,t,o,e,c,s,a),b=k.__e,(p=k.ref)&&_.ref!=p&&(w||(w=[]),_.ref&&w.push(_.ref,null,k),w.push(p,k.__c||b,k)),null!=b?(null==m&&(m=b),"function"==typeof k.type&&null!=k.__k&&k.__k===_.__k?k.__d=s=g$2(k,s,n):s=x$2(n,k,_,A,b,s),a||"option"!==u.type?"function"==typeof u.type&&(u.__d=s):n.value=""):s&&_.__e==s&&s.parentNode!=n&&(s=d$1(_));}for(u.__e=m,h=P;h--;)null!=A[h]&&("function"==typeof u.type&&null!=A[h].__e&&A[h].__e==u.__d&&(u.__d=d$1(i,h+1)),L$1(A[h],A[h]));if(w)for(h=0;h<w.length;h++)z$1(w[h],w[++h],w[++h]);}function g$2(n,l,u){var i,t;for(i=0;i<n.__k.length;i++)(t=n.__k[i])&&(t.__=n,l="function"==typeof t.type?g$2(t,l,u):x$2(u,t,t,n.__k,t.__e,l));return l}function w$2(n,l){return l=l||[],null==n||"boolean"==typeof n||(Array.isArray(n)?n.some(function(n){w$2(n,l);}):l.push(n)),l}function x$2(n,l,u,i,t,o){var r,f,e;if(void 0!==l.__d)r=l.__d,l.__d=void 0;else if(null==u||t!=o||null==t.parentNode)n:if(null==o||o.parentNode!==n)n.appendChild(t),r=null;else {for(f=o,e=0;(f=f.nextSibling)&&e<i.length;e+=2)if(f==t)break n;n.insertBefore(t,o),r=o;}return void 0!==r?r:t.nextSibling}function A$2(n,l,u,i,t){var o;for(o in u)"children"===o||"key"===o||o in l||C$1(n,o,null,u[o],i);for(o in l)t&&"function"!=typeof l[o]||"children"===o||"key"===o||"value"===o||"checked"===o||u[o]===l[o]||C$1(n,o,l[o],u[o],i);}function P$1(n,l,u){"-"===l[0]?n.setProperty(l,u):n[l]=null==u?"":"number"!=typeof u||e$1.test(l)?u:u+"px";}function C$1(n,l,u,i,t){var o;n:if("style"===l)if("string"==typeof u)n.style.cssText=u;else {if("string"==typeof i&&(n.style.cssText=i=""),i)for(l in i)u&&l in u||P$1(n.style,l,"");if(u)for(l in u)i&&u[l]===i[l]||P$1(n.style,l,u[l]);}else if("o"===l[0]&&"n"===l[1])o=l!==(l=l.replace(/Capture$/,"")),l=l.toLowerCase()in n?l.toLowerCase().slice(2):l.slice(2),n.l||(n.l={}),n.l[l+o]=u,u?i||n.addEventListener(l,o?H$1:$$3,o):n.removeEventListener(l,o?H$1:$$3,o);else if("dangerouslySetInnerHTML"!==l){if(t)l=l.replace(/xlink[H:h]/,"h").replace(/sName$/,"s");else if("href"!==l&&"list"!==l&&"form"!==l&&"tabIndex"!==l&&"download"!==l&&l in n)try{n[l]=null==u?"":u;break n}catch(n){}"function"==typeof u||(null!=u&&(!1!==u||"a"===l[0]&&"r"===l[1])?n.setAttribute(l,u):n.removeAttribute(l));}}function $$3(l){this.l[l.type+!1](n.event?n.event(l):l);}function H$1(l){this.l[l.type+!0](n.event?n.event(l):l);}function I$1(l,u,i,t,o,r,f,e,s){var a,v,h,d,_,k,b,g,w,x,A,P=u.type;if(void 0!==u.constructor)return null;null!=i.__h&&(s=i.__h,e=u.__e=i.__e,u.__h=null,r=[e]),(a=n.__b)&&a(u);try{n:if("function"==typeof P){if(g=u.props,w=(a=P.contextType)&&t[a.__c],x=a?w?w.props.value:a.__:t,i.__c?b=(v=u.__c=i.__c).__=v.__E:("prototype"in P&&P.prototype.render?u.__c=v=new P(g,x):(u.__c=v=new p$1(g,x),v.constructor=P,v.render=M$1),w&&w.sub(v),v.props=g,v.state||(v.state={}),v.context=x,v.__n=t,h=v.__d=!0,v.__h=[]),null==v.__s&&(v.__s=v.state),null!=P.getDerivedStateFromProps&&(v.__s==v.state&&(v.__s=c$1({},v.__s)),c$1(v.__s,P.getDerivedStateFromProps(g,v.__s))),d=v.props,_=v.state,h)null==P.getDerivedStateFromProps&&null!=v.componentWillMount&&v.componentWillMount(),null!=v.componentDidMount&&v.__h.push(v.componentDidMount);else {if(null==P.getDerivedStateFromProps&&g!==d&&null!=v.componentWillReceiveProps&&v.componentWillReceiveProps(g,x),!v.__e&&null!=v.shouldComponentUpdate&&!1===v.shouldComponentUpdate(g,v.__s,x)||u.__v===i.__v){v.props=g,v.state=v.__s,u.__v!==i.__v&&(v.__d=!1),v.__v=u,u.__e=i.__e,u.__k=i.__k,u.__k.forEach(function(n){n&&(n.__=u);}),v.__h.length&&f.push(v);break n}null!=v.componentWillUpdate&&v.componentWillUpdate(g,v.__s,x),null!=v.componentDidUpdate&&v.__h.push(function(){v.componentDidUpdate(d,_,k);});}v.context=x,v.props=g,v.state=v.__s,(a=n.__r)&&a(u),v.__d=!1,v.__v=u,v.__P=l,a=v.render(v.props,v.state,v.context),v.state=v.__s,null!=v.getChildContext&&(t=c$1(c$1({},t),v.getChildContext())),h||null==v.getSnapshotBeforeUpdate||(k=v.getSnapshotBeforeUpdate(d,_)),A=null!=a&&a.type===y$1&&null==a.key?a.props.children:a,m$1(l,Array.isArray(A)?A:[A],u,i,t,o,r,f,e,s),v.base=u.__e,u.__h=null,v.__h.length&&f.push(v),b&&(v.__E=v.__=null),v.__e=!1;}else null==r&&u.__v===i.__v?(u.__k=i.__k,u.__e=i.__e):u.__e=j$2(i.__e,u,i,t,o,r,f,s);(a=n.diffed)&&a(u);}catch(l){u.__v=null,(s||null!=r)&&(u.__e=e,u.__h=!!s,r[r.indexOf(e)]=null),n.__e(l,u,i);}}function T$2(l,u){n.__c&&n.__c(u,l),l.some(function(u){try{l=u.__h,u.__h=[],l.some(function(n){n.call(u);});}catch(l){n.__e(l,u.__v);}});}function j$2(n,l,u,i,t,o,e,c){var a,v,h,y,p=u.props,d=l.props,_=l.type,k=0;if("svg"===_&&(t=!0),null!=o)for(;k<o.length;k++)if((a=o[k])&&(a===n||(_?a.localName==_:3==a.nodeType))){n=a,o[k]=null;break}if(null==n){if(null===_)return document.createTextNode(d);n=t?document.createElementNS("http://www.w3.org/2000/svg",_):document.createElement(_,d.is&&d),o=null,c=!1;}if(null===_)p===d||c&&n.data===d||(n.data=d);else {if(o=o&&f$1.slice.call(n.childNodes),v=(p=u.props||r$1).dangerouslySetInnerHTML,h=d.dangerouslySetInnerHTML,!c){if(null!=o)for(p={},y=0;y<n.attributes.length;y++)p[n.attributes[y].name]=n.attributes[y].value;(h||v)&&(h&&(v&&h.__html==v.__html||h.__html===n.innerHTML)||(n.innerHTML=h&&h.__html||""));}if(A$2(n,d,p,t,c),h)l.__k=[];else if(k=l.props.children,m$1(n,Array.isArray(k)?k:[k],l,u,i,t&&"foreignObject"!==_,o,e,n.firstChild,c),null!=o)for(k=o.length;k--;)null!=o[k]&&s$1(o[k]);c||("value"in d&&void 0!==(k=d.value)&&(k!==n.value||"progress"===_&&!k)&&C$1(n,"value",k,p.value,!1),"checked"in d&&void 0!==(k=d.checked)&&k!==n.checked&&C$1(n,"checked",k,p.checked,!1));}return n}function z$1(l,u,i){try{"function"==typeof l?l(u):l.current=u;}catch(l){n.__e(l,i);}}function L$1(l,u,i){var t,o,r;if(n.unmount&&n.unmount(l),(t=l.ref)&&(t.current&&t.current!==l.__e||z$1(t,null,u)),i||"function"==typeof l.type||(i=null!=(o=l.__e)),l.__e=l.__d=void 0,null!=(t=l.__c)){if(t.componentWillUnmount)try{t.componentWillUnmount();}catch(l){n.__e(l,u);}t.base=t.__P=null;}if(t=l.__k)for(r=0;r<t.length;r++)t[r]&&L$1(t[r],u,i);null!=o&&s$1(o);}function M$1(n,l,u){return this.constructor(n,u)}function N$1(l,u,i){var t,o,e;n.__&&n.__(l,u),o=(t="function"==typeof i)?null:i&&i.__k||u.__k,e=[],I$1(u,l=(!t&&i||u).__k=a$1(y$1,null,[l]),o||r$1,r$1,void 0!==u.ownerSVGElement,!t&&i?[i]:o?null:u.firstChild?f$1.slice.call(u.childNodes):null,e,!t&&i?i:o?o.__e:u.firstChild,t),T$2(e,l);}function O$1(n,l){N$1(n,l,O$1);}function S$1(n,l,u){var i,t,o,r=arguments,f=c$1({},n.props);for(o in l)"key"==o?i=l[o]:"ref"==o?t=l[o]:f[o]=l[o];if(arguments.length>3)for(u=[u],o=3;o<arguments.length;o++)u.push(r[o]);return null!=u&&(f.children=u),v$1(n.type,f,i||n.key,t||n.ref,null)}function q$1(n,l){var u={__c:l="__cC"+o$1++,__:n,Consumer:function(n,l){return n.children(l)},Provider:function(n){var u,i;return this.getChildContext||(u=[],(i={})[l]=this,this.getChildContext=function(){return i},this.shouldComponentUpdate=function(n){this.props.value!==n.value&&u.some(k$2);},this.sub=function(n){u.push(n);var l=n.componentWillUnmount;n.componentWillUnmount=function(){u.splice(u.indexOf(n),1),l&&l.call(n);};}),n.children}};return u.Provider.__=u.Consumer.contextType=u}n={__e:function(n,l){for(var u,i,t;l=l.__;)if((u=l.__c)&&!u.__)try{if((i=u.constructor)&&null!=i.getDerivedStateFromError&&(u.setState(i.getDerivedStateFromError(n)),t=u.__d),null!=u.componentDidCatch&&(u.componentDidCatch(n),t=u.__d),t)return u.__E=u}catch(l){n=l;}throw n},__v:0},p$1.prototype.setState=function(n,l){var u;u=null!=this.__s&&this.__s!==this.state?this.__s:this.__s=c$1({},this.state),"function"==typeof n&&(n=n(c$1({},u),this.props)),n&&c$1(u,n),null!=n&&this.__v&&(l&&this.__h.push(l),k$2(this));},p$1.prototype.forceUpdate=function(n){this.__v&&(this.__e=!0,n&&this.__h.push(n),k$2(this));},p$1.prototype.render=y$1,u$1=[],i$1="function"==typeof Promise?Promise.prototype.then.bind(Promise.resolve()):setTimeout,b$1.__r=0,o$1=0;

	var t,u,r,o=0,i=[],c=n.__b,f=n.__r,e=n.diffed,a=n.__c,v=n.unmount;function m(t,r){n.__h&&n.__h(u,t,o||r),o=0;var i=u.__H||(u.__H={__:[],__h:[]});return t>=i.__.length&&i.__.push({}),i.__[t]}function l(n){return o=1,p(w$1,n)}function p(n,r,o){var i=m(t++,2);return i.t=n,i.__c||(i.__=[o?o(r):w$1(void 0,r),function(n){var t=i.t(i.__[0],n);i.__[0]!==t&&(i.__=[t,i.__[1]],i.__c.setState({}));}],i.__c=u),i.__}function y(r,o){var i=m(t++,3);!n.__s&&k$1(i.__H,o)&&(i.__=r,i.__H=o,u.__H.__h.push(i));}function h(r,o){var i=m(t++,4);!n.__s&&k$1(i.__H,o)&&(i.__=r,i.__H=o,u.__h.push(i));}function s(n){return o=5,d(function(){return {current:n}},[])}function _(n,t,u){o=6,h(function(){"function"==typeof n?n(t()):n&&(n.current=t());},null==u?u:u.concat(n));}function d(n,u){var r=m(t++,7);return k$1(r.__H,u)&&(r.__=n(),r.__H=u,r.__h=n),r.__}function A$1(n,t){return o=8,d(function(){return n},t)}function F$1(n){var r=u.context[n.__c],o=m(t++,9);return o.__c=n,r?(null==o.__&&(o.__=!0,r.sub(u)),r.props.value):n.__}function T$1(t,u){n.useDebugValue&&n.useDebugValue(u?u(t):t);}function x$1(){i.forEach(function(t){if(t.__P)try{t.__H.__h.forEach(g$1),t.__H.__h.forEach(j$1),t.__H.__h=[];}catch(u){t.__H.__h=[],n.__e(u,t.__v);}}),i=[];}n.__b=function(n){u=null,c&&c(n);},n.__r=function(n){f&&f(n),t=0;var r=(u=n.__c).__H;r&&(r.__h.forEach(g$1),r.__h.forEach(j$1),r.__h=[]);},n.diffed=function(t){e&&e(t);var o=t.__c;o&&o.__H&&o.__H.__h.length&&(1!==i.push(o)&&r===n.requestAnimationFrame||((r=n.requestAnimationFrame)||function(n){var t,u=function(){clearTimeout(r),b&&cancelAnimationFrame(t),setTimeout(n);},r=setTimeout(u,100);b&&(t=requestAnimationFrame(u));})(x$1)),u=void 0;},n.__c=function(t,u){u.some(function(t){try{t.__h.forEach(g$1),t.__h=t.__h.filter(function(n){return !n.__||j$1(n)});}catch(r){u.some(function(n){n.__h&&(n.__h=[]);}),u=[],n.__e(r,t.__v);}}),a&&a(t,u);},n.unmount=function(t){v&&v(t);var u=t.__c;if(u&&u.__H)try{u.__H.__.forEach(g$1);}catch(t){n.__e(t,u.__v);}};var b="function"==typeof requestAnimationFrame;function g$1(n){var t=u;"function"==typeof n.__c&&n.__c(),u=t;}function j$1(n){var t=u;n.__c=n.__(),u=t;}function k$1(n,t){return !n||n.length!==t.length||t.some(function(t,u){return t!==n[u]})}function w$1(n,t){return "function"==typeof t?t(n):t}

	function C(n,t){for(var e in t)n[e]=t[e];return n}function S(n,t){for(var e in n)if("__source"!==e&&!(e in t))return !0;for(var r in t)if("__source"!==r&&n[r]!==t[r])return !0;return !1}function E(n){this.props=n;}function g(n,t){function e(n){var e=this.props.ref,r=e==n.ref;return !r&&e&&(e.call?e(null):e.current=null),t?!t(this.props,n)||!r:S(this.props,n)}function r(t){return this.shouldComponentUpdate=e,a$1(n,t)}return r.displayName="Memo("+(n.displayName||n.name)+")",r.prototype.isReactComponent=!0,r.__f=!0,r}(E.prototype=new p$1).isPureReactComponent=!0,E.prototype.shouldComponentUpdate=function(n,t){return S(this.props,n)||S(this.state,t)};var w=n.__b;n.__b=function(n){n.type&&n.type.__f&&n.ref&&(n.props.ref=n.ref,n.ref=null),w&&w(n);};var R="undefined"!=typeof Symbol&&Symbol.for&&Symbol.for("react.forward_ref")||3911;function x(n){function t(t,e){var r=C({},t);return delete r.ref,n(r,(e=t.ref||e)&&("object"!=typeof e||"current"in e)?e:null)}return t.$$typeof=R,t.render=t,t.prototype.isReactComponent=t.__f=!0,t.displayName="ForwardRef("+(n.displayName||n.name)+")",t}var N=function(n,t){return null==n?null:w$2(w$2(n).map(t))},k={map:N,forEach:N,count:function(n){return n?w$2(n).length:0},only:function(n){var t=w$2(n);if(1!==t.length)throw "Children.only";return t[0]},toArray:w$2},A=n.__e;n.__e=function(n,t,e){if(n.then)for(var r,u=t;u=u.__;)if((r=u.__c)&&r.__c)return null==t.__e&&(t.__e=e.__e,t.__k=e.__k),r.__c(n,t);A(n,t,e);};var O=n.unmount;function L(){this.__u=0,this.t=null,this.__b=null;}function U(n){var t=n.__.__c;return t&&t.__e&&t.__e(n)}function D(n){var t,e,r;function u(u){if(t||(t=n()).then(function(n){e=n.default||n;},function(n){r=n;}),r)throw r;if(!e)throw t;return a$1(e,u)}return u.displayName="Lazy",u.__f=!0,u}function F(){this.u=null,this.o=null;}n.unmount=function(n){var t=n.__c;t&&t.__R&&t.__R(),t&&!0===n.__h&&(n.type=null),O&&O(n);},(L.prototype=new p$1).__c=function(n,t){var e=t.__c,r=this;null==r.t&&(r.t=[]),r.t.push(e);var u=U(r.__v),o=!1,i=function(){o||(o=!0,e.__R=null,u?u(l):l());};e.__R=i;var l=function(){if(!--r.__u){if(r.state.__e){var n=r.state.__e;r.__v.__k[0]=function n(t,e,r){return t&&(t.__v=null,t.__k=t.__k&&t.__k.map(function(t){return n(t,e,r)}),t.__c&&t.__c.__P===e&&(t.__e&&r.insertBefore(t.__e,t.__d),t.__c.__e=!0,t.__c.__P=r)),t}(n,n.__c.__P,n.__c.__O);}var t;for(r.setState({__e:r.__b=null});t=r.t.pop();)t.forceUpdate();}},f=!0===t.__h;r.__u++||f||r.setState({__e:r.__b=r.__v.__k[0]}),n.then(i,i);},L.prototype.componentWillUnmount=function(){this.t=[];},L.prototype.render=function(n,t){if(this.__b){if(this.__v.__k){var e=document.createElement("div"),r=this.__v.__k[0].__c;this.__v.__k[0]=function n(t,e,r){return t&&(t.__c&&t.__c.__H&&(t.__c.__H.__.forEach(function(n){"function"==typeof n.__c&&n.__c();}),t.__c.__H=null),null!=(t=C({},t)).__c&&(t.__c.__P===r&&(t.__c.__P=e),t.__c=null),t.__k=t.__k&&t.__k.map(function(t){return n(t,e,r)})),t}(this.__b,e,r.__O=r.__P);}this.__b=null;}var u=t.__e&&a$1(y$1,null,n.fallback);return u&&(u.__h=null),[a$1(y$1,null,t.__e?null:n.children),u]};var M=function(n,t,e){if(++e[1]===e[0]&&n.o.delete(t),n.props.revealOrder&&("t"!==n.props.revealOrder[0]||!n.o.size))for(e=n.u;e;){for(;e.length>3;)e.pop()();if(e[1]<e[0])break;n.u=e=e[2];}};function T(n){return this.getChildContext=function(){return n.context},n.children}function j(n){var t=this,e=n.i;t.componentWillUnmount=function(){N$1(null,t.l),t.l=null,t.i=null;},t.i&&t.i!==e&&t.componentWillUnmount(),n.__v?(t.l||(t.i=e,t.l={nodeType:1,parentNode:e,childNodes:[],appendChild:function(n){this.childNodes.push(n),t.i.appendChild(n);},insertBefore:function(n,e){this.childNodes.push(n),t.i.appendChild(n);},removeChild:function(n){this.childNodes.splice(this.childNodes.indexOf(n)>>>1,1),t.i.removeChild(n);}}),N$1(a$1(T,{context:t.context},n.__v),t.l)):t.l&&t.componentWillUnmount();}function I(n,t){return a$1(j,{__v:n,i:t})}(F.prototype=new p$1).__e=function(n){var t=this,e=U(t.__v),r=t.o.get(n);return r[0]++,function(u){var o=function(){t.props.revealOrder?(r.push(u),M(t,n,r)):u();};e?e(o):o();}},F.prototype.render=function(n){this.u=null,this.o=new Map;var t=w$2(n.children);n.revealOrder&&"b"===n.revealOrder[0]&&t.reverse();for(var e=t.length;e--;)this.o.set(t[e],this.u=[1,0,this.u]);return n.children},F.prototype.componentDidUpdate=F.prototype.componentDidMount=function(){var n=this;this.o.forEach(function(t,e){M(n,e,t);});};var W="undefined"!=typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103,P=/^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|fill|flood|font|glyph(?!R)|horiz|marker(?!H|W|U)|overline|paint|stop|strikethrough|stroke|text(?!L)|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/,V=function(n){return ("undefined"!=typeof Symbol&&"symbol"==typeof Symbol()?/fil|che|rad/i:/fil|che|ra/i).test(n)};function z(n,t,e){return null==t.__k&&(t.textContent=""),N$1(n,t),"function"==typeof e&&e(),n?n.__c:null}function B(n,t,e){return O$1(n,t),"function"==typeof e&&e(),n?n.__c:null}p$1.prototype.isReactComponent={},["componentWillMount","componentWillReceiveProps","componentWillUpdate"].forEach(function(n){Object.defineProperty(p$1.prototype,n,{configurable:!0,get:function(){return this["UNSAFE_"+n]},set:function(t){Object.defineProperty(this,n,{configurable:!0,writable:!0,value:t});}});});var H=n.event;function Z(){}function Y(){return this.cancelBubble}function $$2(){return this.defaultPrevented}n.event=function(n){return H&&(n=H(n)),n.persist=Z,n.isPropagationStopped=Y,n.isDefaultPrevented=$$2,n.nativeEvent=n};var q,G={configurable:!0,get:function(){return this.class}},J=n.vnode;n.vnode=function(n){var t=n.type,e=n.props,r=e;if("string"==typeof t){for(var u in r={},e){var o=e[u];"value"===u&&"defaultValue"in e&&null==o||("defaultValue"===u&&"value"in e&&null==e.value?u="value":"download"===u&&!0===o?o="":/ondoubleclick/i.test(u)?u="ondblclick":/^onchange(textarea|input)/i.test(u+t)&&!V(e.type)?u="oninput":/^on(Ani|Tra|Tou|BeforeInp)/.test(u)?u=u.toLowerCase():P.test(u)?u=u.replace(/[A-Z0-9]/,"-$&").toLowerCase():null===o&&(o=void 0),r[u]=o);}"select"==t&&r.multiple&&Array.isArray(r.value)&&(r.value=w$2(e.children).forEach(function(n){n.props.selected=-1!=r.value.indexOf(n.props.value);})),"select"==t&&null!=r.defaultValue&&(r.value=w$2(e.children).forEach(function(n){n.props.selected=r.multiple?-1!=r.defaultValue.indexOf(n.props.value):r.defaultValue==n.props.value;})),n.props=r;}t&&e.class!=e.className&&(G.enumerable="className"in e,null!=e.className&&(r.class=e.className),Object.defineProperty(r,"className",G)),n.$$typeof=W,J&&J(n);};var K=n.__r;n.__r=function(n){K&&K(n),q=n.__c;};var Q={ReactCurrentDispatcher:{current:{readContext:function(n){return q.__n[n.__c].props.value}}}};"object"==typeof performance&&"function"==typeof performance.now?performance.now.bind(performance):function(){return Date.now()};function fn(n){return a$1.bind(null,n)}function cn(n){return !!n&&n.$$typeof===W}function an(n){return cn(n)?S$1.apply(null,arguments):n}function sn(n){return !!n.__k&&(N$1(null,n),!0)}function hn(n){return n&&(n.base||1===n.nodeType&&n)||null}var pn=function(n,t){return n(t)};var React = {useState:l,useReducer:p,useEffect:y,useLayoutEffect:h,useRef:s,useImperativeHandle:_,useMemo:d,useCallback:A$1,useContext:F$1,useDebugValue:T$1,version:"16.8.0",Children:k,render:z,hydrate:B,unmountComponentAtNode:sn,createPortal:I,createElement:a$1,createContext:q$1,createFactory:fn,cloneElement:an,createRef:h$1,Fragment:y$1,isValidElement:cn,findDOMNode:hn,Component:p$1,PureComponent:E,memo:g,forwardRef:x,unstable_batchedUpdates:pn,StrictMode:y$1,Suspense:L,SuspenseList:F,lazy:D,__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED:Q};

	var top = 'top';
	var bottom = 'bottom';
	var right = 'right';
	var left = 'left';
	var auto = 'auto';
	var basePlacements = [top, bottom, right, left];
	var start = 'start';
	var end = 'end';
	var clippingParents = 'clippingParents';
	var viewport = 'viewport';
	var popper = 'popper';
	var reference = 'reference';
	var variationPlacements = /*#__PURE__*/basePlacements.reduce(function (acc, placement) {
	  return acc.concat([placement + "-" + start, placement + "-" + end]);
	}, []);
	var placements = /*#__PURE__*/[].concat(basePlacements, [auto]).reduce(function (acc, placement) {
	  return acc.concat([placement, placement + "-" + start, placement + "-" + end]);
	}, []); // modifiers that need to read the DOM

	var beforeRead = 'beforeRead';
	var read = 'read';
	var afterRead = 'afterRead'; // pure-logic modifiers

	var beforeMain = 'beforeMain';
	var main = 'main';
	var afterMain = 'afterMain'; // modifier with the purpose to write to the DOM (or write into a framework state)

	var beforeWrite = 'beforeWrite';
	var write = 'write';
	var afterWrite = 'afterWrite';
	var modifierPhases = [beforeRead, read, afterRead, beforeMain, main, afterMain, beforeWrite, write, afterWrite];

	function getNodeName(element) {
	  return element ? (element.nodeName || '').toLowerCase() : null;
	}

	function getWindow(node) {
	  if (node == null) {
	    return window;
	  }

	  if (node.toString() !== '[object Window]') {
	    var ownerDocument = node.ownerDocument;
	    return ownerDocument ? ownerDocument.defaultView || window : window;
	  }

	  return node;
	}

	function isElement$1(node) {
	  var OwnElement = getWindow(node).Element;
	  return node instanceof OwnElement || node instanceof Element;
	}

	function isHTMLElement(node) {
	  var OwnElement = getWindow(node).HTMLElement;
	  return node instanceof OwnElement || node instanceof HTMLElement;
	}

	function isShadowRoot(node) {
	  // IE 11 has no ShadowRoot
	  if (typeof ShadowRoot === 'undefined') {
	    return false;
	  }

	  var OwnElement = getWindow(node).ShadowRoot;
	  return node instanceof OwnElement || node instanceof ShadowRoot;
	}

	// and applies them to the HTMLElements such as popper and arrow

	function applyStyles(_ref) {
	  var state = _ref.state;
	  Object.keys(state.elements).forEach(function (name) {
	    var style = state.styles[name] || {};
	    var attributes = state.attributes[name] || {};
	    var element = state.elements[name]; // arrow is optional + virtual elements

	    if (!isHTMLElement(element) || !getNodeName(element)) {
	      return;
	    } // Flow doesn't support to extend this property, but it's the most
	    // effective way to apply styles to an HTMLElement
	    // $FlowFixMe[cannot-write]


	    Object.assign(element.style, style);
	    Object.keys(attributes).forEach(function (name) {
	      var value = attributes[name];

	      if (value === false) {
	        element.removeAttribute(name);
	      } else {
	        element.setAttribute(name, value === true ? '' : value);
	      }
	    });
	  });
	}

	function effect$2(_ref2) {
	  var state = _ref2.state;
	  var initialStyles = {
	    popper: {
	      position: state.options.strategy,
	      left: '0',
	      top: '0',
	      margin: '0'
	    },
	    arrow: {
	      position: 'absolute'
	    },
	    reference: {}
	  };
	  Object.assign(state.elements.popper.style, initialStyles.popper);
	  state.styles = initialStyles;

	  if (state.elements.arrow) {
	    Object.assign(state.elements.arrow.style, initialStyles.arrow);
	  }

	  return function () {
	    Object.keys(state.elements).forEach(function (name) {
	      var element = state.elements[name];
	      var attributes = state.attributes[name] || {};
	      var styleProperties = Object.keys(state.styles.hasOwnProperty(name) ? state.styles[name] : initialStyles[name]); // Set all values to an empty string to unset them

	      var style = styleProperties.reduce(function (style, property) {
	        style[property] = '';
	        return style;
	      }, {}); // arrow is optional + virtual elements

	      if (!isHTMLElement(element) || !getNodeName(element)) {
	        return;
	      }

	      Object.assign(element.style, style);
	      Object.keys(attributes).forEach(function (attribute) {
	        element.removeAttribute(attribute);
	      });
	    });
	  };
	} // eslint-disable-next-line import/no-unused-modules


	var applyStyles$1 = {
	  name: 'applyStyles',
	  enabled: true,
	  phase: 'write',
	  fn: applyStyles,
	  effect: effect$2,
	  requires: ['computeStyles']
	};

	function getBasePlacement$1(placement) {
	  return placement.split('-')[0];
	}

	// import { isHTMLElement } from './instanceOf';
	function getBoundingClientRect(element, // eslint-disable-next-line unused-imports/no-unused-vars
	includeScale) {

	  var rect = element.getBoundingClientRect();
	  var scaleX = 1;
	  var scaleY = 1; // FIXME:
	  // `offsetWidth` returns an integer while `getBoundingClientRect`
	  // returns a float. This results in `scaleX` or `scaleY` being
	  // non-1 when it should be for elements that aren't a full pixel in
	  // width or height.
	  // if (isHTMLElement(element) && includeScale) {
	  //   const offsetHeight = element.offsetHeight;
	  //   const offsetWidth = element.offsetWidth;
	  //   // Do not attempt to divide by 0, otherwise we get `Infinity` as scale
	  //   // Fallback to 1 in case both values are `0`
	  //   if (offsetWidth > 0) {
	  //     scaleX = rect.width / offsetWidth || 1;
	  //   }
	  //   if (offsetHeight > 0) {
	  //     scaleY = rect.height / offsetHeight || 1;
	  //   }
	  // }

	  return {
	    width: rect.width / scaleX,
	    height: rect.height / scaleY,
	    top: rect.top / scaleY,
	    right: rect.right / scaleX,
	    bottom: rect.bottom / scaleY,
	    left: rect.left / scaleX,
	    x: rect.left / scaleX,
	    y: rect.top / scaleY
	  };
	}

	// means it doesn't take into account transforms.

	function getLayoutRect(element) {
	  var clientRect = getBoundingClientRect(element); // Use the clientRect sizes if it's not been transformed.
	  // Fixes https://github.com/popperjs/popper-core/issues/1223

	  var width = element.offsetWidth;
	  var height = element.offsetHeight;

	  if (Math.abs(clientRect.width - width) <= 1) {
	    width = clientRect.width;
	  }

	  if (Math.abs(clientRect.height - height) <= 1) {
	    height = clientRect.height;
	  }

	  return {
	    x: element.offsetLeft,
	    y: element.offsetTop,
	    width: width,
	    height: height
	  };
	}

	function contains(parent, child) {
	  var rootNode = child.getRootNode && child.getRootNode(); // First, attempt with faster native method

	  if (parent.contains(child)) {
	    return true;
	  } // then fallback to custom implementation with Shadow DOM support
	  else if (rootNode && isShadowRoot(rootNode)) {
	      var next = child;

	      do {
	        if (next && parent.isSameNode(next)) {
	          return true;
	        } // $FlowFixMe[prop-missing]: need a better way to handle this...


	        next = next.parentNode || next.host;
	      } while (next);
	    } // Give up, the result is false


	  return false;
	}

	function getComputedStyle(element) {
	  return getWindow(element).getComputedStyle(element);
	}

	function isTableElement(element) {
	  return ['table', 'td', 'th'].indexOf(getNodeName(element)) >= 0;
	}

	function getDocumentElement(element) {
	  // $FlowFixMe[incompatible-return]: assume body is always available
	  return ((isElement$1(element) ? element.ownerDocument : // $FlowFixMe[prop-missing]
	  element.document) || window.document).documentElement;
	}

	function getParentNode(element) {
	  if (getNodeName(element) === 'html') {
	    return element;
	  }

	  return (// this is a quicker (but less type safe) way to save quite some bytes from the bundle
	    // $FlowFixMe[incompatible-return]
	    // $FlowFixMe[prop-missing]
	    element.assignedSlot || // step into the shadow DOM of the parent of a slotted node
	    element.parentNode || ( // DOM Element detected
	    isShadowRoot(element) ? element.host : null) || // ShadowRoot detected
	    // $FlowFixMe[incompatible-call]: HTMLElement is a Node
	    getDocumentElement(element) // fallback

	  );
	}

	function getTrueOffsetParent(element) {
	  if (!isHTMLElement(element) || // https://github.com/popperjs/popper-core/issues/837
	  getComputedStyle(element).position === 'fixed') {
	    return null;
	  }

	  return element.offsetParent;
	} // `.offsetParent` reports `null` for fixed elements, while absolute elements
	// return the containing block


	function getContainingBlock(element) {
	  var isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') !== -1;
	  var isIE = navigator.userAgent.indexOf('Trident') !== -1;

	  if (isIE && isHTMLElement(element)) {
	    // In IE 9, 10 and 11 fixed elements containing block is always established by the viewport
	    var elementCss = getComputedStyle(element);

	    if (elementCss.position === 'fixed') {
	      return null;
	    }
	  }

	  var currentNode = getParentNode(element);

	  while (isHTMLElement(currentNode) && ['html', 'body'].indexOf(getNodeName(currentNode)) < 0) {
	    var css = getComputedStyle(currentNode); // This is non-exhaustive but covers the most common CSS properties that
	    // create a containing block.
	    // https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block#identifying_the_containing_block

	    if (css.transform !== 'none' || css.perspective !== 'none' || css.contain === 'paint' || ['transform', 'perspective'].indexOf(css.willChange) !== -1 || isFirefox && css.willChange === 'filter' || isFirefox && css.filter && css.filter !== 'none') {
	      return currentNode;
	    } else {
	      currentNode = currentNode.parentNode;
	    }
	  }

	  return null;
	} // Gets the closest ancestor positioned element. Handles some edge cases,
	// such as table ancestors and cross browser bugs.


	function getOffsetParent(element) {
	  var window = getWindow(element);
	  var offsetParent = getTrueOffsetParent(element);

	  while (offsetParent && isTableElement(offsetParent) && getComputedStyle(offsetParent).position === 'static') {
	    offsetParent = getTrueOffsetParent(offsetParent);
	  }

	  if (offsetParent && (getNodeName(offsetParent) === 'html' || getNodeName(offsetParent) === 'body' && getComputedStyle(offsetParent).position === 'static')) {
	    return window;
	  }

	  return offsetParent || getContainingBlock(element) || window;
	}

	function getMainAxisFromPlacement(placement) {
	  return ['top', 'bottom'].indexOf(placement) >= 0 ? 'x' : 'y';
	}

	var max = Math.max;
	var min$1 = Math.min;
	var round = Math.round;

	function within(min, value, max$1) {
	  return max(min, min$1(value, max$1));
	}

	function getFreshSideObject() {
	  return {
	    top: 0,
	    right: 0,
	    bottom: 0,
	    left: 0
	  };
	}

	function mergePaddingObject(paddingObject) {
	  return Object.assign({}, getFreshSideObject(), paddingObject);
	}

	function expandToHashMap(value, keys) {
	  return keys.reduce(function (hashMap, key) {
	    hashMap[key] = value;
	    return hashMap;
	  }, {});
	}

	var toPaddingObject = function toPaddingObject(padding, state) {
	  padding = typeof padding === 'function' ? padding(Object.assign({}, state.rects, {
	    placement: state.placement
	  })) : padding;
	  return mergePaddingObject(typeof padding !== 'number' ? padding : expandToHashMap(padding, basePlacements));
	};

	function arrow(_ref) {
	  var _state$modifiersData$;

	  var state = _ref.state,
	      name = _ref.name,
	      options = _ref.options;
	  var arrowElement = state.elements.arrow;
	  var popperOffsets = state.modifiersData.popperOffsets;
	  var basePlacement = getBasePlacement$1(state.placement);
	  var axis = getMainAxisFromPlacement(basePlacement);
	  var isVertical = [left, right].indexOf(basePlacement) >= 0;
	  var len = isVertical ? 'height' : 'width';

	  if (!arrowElement || !popperOffsets) {
	    return;
	  }

	  var paddingObject = toPaddingObject(options.padding, state);
	  var arrowRect = getLayoutRect(arrowElement);
	  var minProp = axis === 'y' ? top : left;
	  var maxProp = axis === 'y' ? bottom : right;
	  var endDiff = state.rects.reference[len] + state.rects.reference[axis] - popperOffsets[axis] - state.rects.popper[len];
	  var startDiff = popperOffsets[axis] - state.rects.reference[axis];
	  var arrowOffsetParent = getOffsetParent(arrowElement);
	  var clientSize = arrowOffsetParent ? axis === 'y' ? arrowOffsetParent.clientHeight || 0 : arrowOffsetParent.clientWidth || 0 : 0;
	  var centerToReference = endDiff / 2 - startDiff / 2; // Make sure the arrow doesn't overflow the popper if the center point is
	  // outside of the popper bounds

	  var min = paddingObject[minProp];
	  var max = clientSize - arrowRect[len] - paddingObject[maxProp];
	  var center = clientSize / 2 - arrowRect[len] / 2 + centerToReference;
	  var offset = within(min, center, max); // Prevents breaking syntax highlighting...

	  var axisProp = axis;
	  state.modifiersData[name] = (_state$modifiersData$ = {}, _state$modifiersData$[axisProp] = offset, _state$modifiersData$.centerOffset = offset - center, _state$modifiersData$);
	}

	function effect$1(_ref2) {
	  var state = _ref2.state,
	      options = _ref2.options;
	  var _options$element = options.element,
	      arrowElement = _options$element === void 0 ? '[data-popper-arrow]' : _options$element;

	  if (arrowElement == null) {
	    return;
	  } // CSS selector


	  if (typeof arrowElement === 'string') {
	    arrowElement = state.elements.popper.querySelector(arrowElement);

	    if (!arrowElement) {
	      return;
	    }
	  }

	  if (process.env.NODE_ENV !== "production") {
	    if (!isHTMLElement(arrowElement)) {
	      console.error(['Popper: "arrow" element must be an HTMLElement (not an SVGElement).', 'To use an SVG arrow, wrap it in an HTMLElement that will be used as', 'the arrow.'].join(' '));
	    }
	  }

	  if (!contains(state.elements.popper, arrowElement)) {
	    if (process.env.NODE_ENV !== "production") {
	      console.error(['Popper: "arrow" modifier\'s `element` must be a child of the popper', 'element.'].join(' '));
	    }

	    return;
	  }

	  state.elements.arrow = arrowElement;
	} // eslint-disable-next-line import/no-unused-modules


	var arrow$1 = {
	  name: 'arrow',
	  enabled: true,
	  phase: 'main',
	  fn: arrow,
	  effect: effect$1,
	  requires: ['popperOffsets'],
	  requiresIfExists: ['preventOverflow']
	};

	function getVariation(placement) {
	  return placement.split('-')[1];
	}

	var unsetSides = {
	  top: 'auto',
	  right: 'auto',
	  bottom: 'auto',
	  left: 'auto'
	}; // Round the offsets to the nearest suitable subpixel based on the DPR.
	// Zooming can change the DPR, but it seems to report a value that will
	// cleanly divide the values into the appropriate subpixels.

	function roundOffsetsByDPR(_ref) {
	  var x = _ref.x,
	      y = _ref.y;
	  var win = window;
	  var dpr = win.devicePixelRatio || 1;
	  return {
	    x: round(round(x * dpr) / dpr) || 0,
	    y: round(round(y * dpr) / dpr) || 0
	  };
	}

	function mapToStyles(_ref2) {
	  var _Object$assign2;

	  var popper = _ref2.popper,
	      popperRect = _ref2.popperRect,
	      placement = _ref2.placement,
	      variation = _ref2.variation,
	      offsets = _ref2.offsets,
	      position = _ref2.position,
	      gpuAcceleration = _ref2.gpuAcceleration,
	      adaptive = _ref2.adaptive,
	      roundOffsets = _ref2.roundOffsets;

	  var _ref3 = roundOffsets === true ? roundOffsetsByDPR(offsets) : typeof roundOffsets === 'function' ? roundOffsets(offsets) : offsets,
	      _ref3$x = _ref3.x,
	      x = _ref3$x === void 0 ? 0 : _ref3$x,
	      _ref3$y = _ref3.y,
	      y = _ref3$y === void 0 ? 0 : _ref3$y;

	  var hasX = offsets.hasOwnProperty('x');
	  var hasY = offsets.hasOwnProperty('y');
	  var sideX = left;
	  var sideY = top;
	  var win = window;

	  if (adaptive) {
	    var offsetParent = getOffsetParent(popper);
	    var heightProp = 'clientHeight';
	    var widthProp = 'clientWidth';

	    if (offsetParent === getWindow(popper)) {
	      offsetParent = getDocumentElement(popper);

	      if (getComputedStyle(offsetParent).position !== 'static' && position === 'absolute') {
	        heightProp = 'scrollHeight';
	        widthProp = 'scrollWidth';
	      }
	    } // $FlowFixMe[incompatible-cast]: force type refinement, we compare offsetParent with window above, but Flow doesn't detect it


	    offsetParent = offsetParent;

	    if (placement === top || (placement === left || placement === right) && variation === end) {
	      sideY = bottom; // $FlowFixMe[prop-missing]

	      y -= offsetParent[heightProp] - popperRect.height;
	      y *= gpuAcceleration ? 1 : -1;
	    }

	    if (placement === left || (placement === top || placement === bottom) && variation === end) {
	      sideX = right; // $FlowFixMe[prop-missing]

	      x -= offsetParent[widthProp] - popperRect.width;
	      x *= gpuAcceleration ? 1 : -1;
	    }
	  }

	  var commonStyles = Object.assign({
	    position: position
	  }, adaptive && unsetSides);

	  if (gpuAcceleration) {
	    var _Object$assign;

	    return Object.assign({}, commonStyles, (_Object$assign = {}, _Object$assign[sideY] = hasY ? '0' : '', _Object$assign[sideX] = hasX ? '0' : '', _Object$assign.transform = (win.devicePixelRatio || 1) <= 1 ? "translate(" + x + "px, " + y + "px)" : "translate3d(" + x + "px, " + y + "px, 0)", _Object$assign));
	  }

	  return Object.assign({}, commonStyles, (_Object$assign2 = {}, _Object$assign2[sideY] = hasY ? y + "px" : '', _Object$assign2[sideX] = hasX ? x + "px" : '', _Object$assign2.transform = '', _Object$assign2));
	}

	function computeStyles(_ref4) {
	  var state = _ref4.state,
	      options = _ref4.options;
	  var _options$gpuAccelerat = options.gpuAcceleration,
	      gpuAcceleration = _options$gpuAccelerat === void 0 ? true : _options$gpuAccelerat,
	      _options$adaptive = options.adaptive,
	      adaptive = _options$adaptive === void 0 ? true : _options$adaptive,
	      _options$roundOffsets = options.roundOffsets,
	      roundOffsets = _options$roundOffsets === void 0 ? true : _options$roundOffsets;

	  if (process.env.NODE_ENV !== "production") {
	    var transitionProperty = getComputedStyle(state.elements.popper).transitionProperty || '';

	    if (adaptive && ['transform', 'top', 'right', 'bottom', 'left'].some(function (property) {
	      return transitionProperty.indexOf(property) >= 0;
	    })) {
	      console.warn(['Popper: Detected CSS transitions on at least one of the following', 'CSS properties: "transform", "top", "right", "bottom", "left".', '\n\n', 'Disable the "computeStyles" modifier\'s `adaptive` option to allow', 'for smooth transitions, or remove these properties from the CSS', 'transition declaration on the popper element if only transitioning', 'opacity or background-color for example.', '\n\n', 'We recommend using the popper element as a wrapper around an inner', 'element that can have any CSS property transitioned for animations.'].join(' '));
	    }
	  }

	  var commonStyles = {
	    placement: getBasePlacement$1(state.placement),
	    variation: getVariation(state.placement),
	    popper: state.elements.popper,
	    popperRect: state.rects.popper,
	    gpuAcceleration: gpuAcceleration
	  };

	  if (state.modifiersData.popperOffsets != null) {
	    state.styles.popper = Object.assign({}, state.styles.popper, mapToStyles(Object.assign({}, commonStyles, {
	      offsets: state.modifiersData.popperOffsets,
	      position: state.options.strategy,
	      adaptive: adaptive,
	      roundOffsets: roundOffsets
	    })));
	  }

	  if (state.modifiersData.arrow != null) {
	    state.styles.arrow = Object.assign({}, state.styles.arrow, mapToStyles(Object.assign({}, commonStyles, {
	      offsets: state.modifiersData.arrow,
	      position: 'absolute',
	      adaptive: false,
	      roundOffsets: roundOffsets
	    })));
	  }

	  state.attributes.popper = Object.assign({}, state.attributes.popper, {
	    'data-popper-placement': state.placement
	  });
	} // eslint-disable-next-line import/no-unused-modules


	var computeStyles$1 = {
	  name: 'computeStyles',
	  enabled: true,
	  phase: 'beforeWrite',
	  fn: computeStyles,
	  data: {}
	};

	var passive = {
	  passive: true
	};

	function effect(_ref) {
	  var state = _ref.state,
	      instance = _ref.instance,
	      options = _ref.options;
	  var _options$scroll = options.scroll,
	      scroll = _options$scroll === void 0 ? true : _options$scroll,
	      _options$resize = options.resize,
	      resize = _options$resize === void 0 ? true : _options$resize;
	  var window = getWindow(state.elements.popper);
	  var scrollParents = [].concat(state.scrollParents.reference, state.scrollParents.popper);

	  if (scroll) {
	    scrollParents.forEach(function (scrollParent) {
	      scrollParent.addEventListener('scroll', instance.update, passive);
	    });
	  }

	  if (resize) {
	    window.addEventListener('resize', instance.update, passive);
	  }

	  return function () {
	    if (scroll) {
	      scrollParents.forEach(function (scrollParent) {
	        scrollParent.removeEventListener('scroll', instance.update, passive);
	      });
	    }

	    if (resize) {
	      window.removeEventListener('resize', instance.update, passive);
	    }
	  };
	} // eslint-disable-next-line import/no-unused-modules


	var eventListeners = {
	  name: 'eventListeners',
	  enabled: true,
	  phase: 'write',
	  fn: function fn() {},
	  effect: effect,
	  data: {}
	};

	var hash$1 = {
	  left: 'right',
	  right: 'left',
	  bottom: 'top',
	  top: 'bottom'
	};
	function getOppositePlacement(placement) {
	  return placement.replace(/left|right|bottom|top/g, function (matched) {
	    return hash$1[matched];
	  });
	}

	var hash = {
	  start: 'end',
	  end: 'start'
	};
	function getOppositeVariationPlacement(placement) {
	  return placement.replace(/start|end/g, function (matched) {
	    return hash[matched];
	  });
	}

	function getWindowScroll(node) {
	  var win = getWindow(node);
	  var scrollLeft = win.pageXOffset;
	  var scrollTop = win.pageYOffset;
	  return {
	    scrollLeft: scrollLeft,
	    scrollTop: scrollTop
	  };
	}

	function getWindowScrollBarX(element) {
	  // If <html> has a CSS width greater than the viewport, then this will be
	  // incorrect for RTL.
	  // Popper 1 is broken in this case and never had a bug report so let's assume
	  // it's not an issue. I don't think anyone ever specifies width on <html>
	  // anyway.
	  // Browsers where the left scrollbar doesn't cause an issue report `0` for
	  // this (e.g. Edge 2019, IE11, Safari)
	  return getBoundingClientRect(getDocumentElement(element)).left + getWindowScroll(element).scrollLeft;
	}

	function getViewportRect(element) {
	  var win = getWindow(element);
	  var html = getDocumentElement(element);
	  var visualViewport = win.visualViewport;
	  var width = html.clientWidth;
	  var height = html.clientHeight;
	  var x = 0;
	  var y = 0; // NB: This isn't supported on iOS <= 12. If the keyboard is open, the popper
	  // can be obscured underneath it.
	  // Also, `html.clientHeight` adds the bottom bar height in Safari iOS, even
	  // if it isn't open, so if this isn't available, the popper will be detected
	  // to overflow the bottom of the screen too early.

	  if (visualViewport) {
	    width = visualViewport.width;
	    height = visualViewport.height; // Uses Layout Viewport (like Chrome; Safari does not currently)
	    // In Chrome, it returns a value very close to 0 (+/-) but contains rounding
	    // errors due to floating point numbers, so we need to check precision.
	    // Safari returns a number <= 0, usually < -1 when pinch-zoomed
	    // Feature detection fails in mobile emulation mode in Chrome.
	    // Math.abs(win.innerWidth / visualViewport.scale - visualViewport.width) <
	    // 0.001
	    // Fallback here: "Not Safari" userAgent

	    if (!/^((?!chrome|android).)*safari/i.test(navigator.userAgent)) {
	      x = visualViewport.offsetLeft;
	      y = visualViewport.offsetTop;
	    }
	  }

	  return {
	    width: width,
	    height: height,
	    x: x + getWindowScrollBarX(element),
	    y: y
	  };
	}

	// of the `<html>` and `<body>` rect bounds if horizontally scrollable

	function getDocumentRect(element) {
	  var _element$ownerDocumen;

	  var html = getDocumentElement(element);
	  var winScroll = getWindowScroll(element);
	  var body = (_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body;
	  var width = max(html.scrollWidth, html.clientWidth, body ? body.scrollWidth : 0, body ? body.clientWidth : 0);
	  var height = max(html.scrollHeight, html.clientHeight, body ? body.scrollHeight : 0, body ? body.clientHeight : 0);
	  var x = -winScroll.scrollLeft + getWindowScrollBarX(element);
	  var y = -winScroll.scrollTop;

	  if (getComputedStyle(body || html).direction === 'rtl') {
	    x += max(html.clientWidth, body ? body.clientWidth : 0) - width;
	  }

	  return {
	    width: width,
	    height: height,
	    x: x,
	    y: y
	  };
	}

	function isScrollParent(element) {
	  // Firefox wants us to check `-x` and `-y` variations as well
	  var _getComputedStyle = getComputedStyle(element),
	      overflow = _getComputedStyle.overflow,
	      overflowX = _getComputedStyle.overflowX,
	      overflowY = _getComputedStyle.overflowY;

	  return /auto|scroll|overlay|hidden/.test(overflow + overflowY + overflowX);
	}

	function getScrollParent(node) {
	  if (['html', 'body', '#document'].indexOf(getNodeName(node)) >= 0) {
	    // $FlowFixMe[incompatible-return]: assume body is always available
	    return node.ownerDocument.body;
	  }

	  if (isHTMLElement(node) && isScrollParent(node)) {
	    return node;
	  }

	  return getScrollParent(getParentNode(node));
	}

	/*
	given a DOM element, return the list of all scroll parents, up the list of ancesors
	until we get to the top window object. This list is what we attach scroll listeners
	to, because if any of these parent elements scroll, we'll need to re-calculate the
	reference element's position.
	*/

	function listScrollParents(element, list) {
	  var _element$ownerDocumen;

	  if (list === void 0) {
	    list = [];
	  }

	  var scrollParent = getScrollParent(element);
	  var isBody = scrollParent === ((_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body);
	  var win = getWindow(scrollParent);
	  var target = isBody ? [win].concat(win.visualViewport || [], isScrollParent(scrollParent) ? scrollParent : []) : scrollParent;
	  var updatedList = list.concat(target);
	  return isBody ? updatedList : // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
	  updatedList.concat(listScrollParents(getParentNode(target)));
	}

	function rectToClientRect(rect) {
	  return Object.assign({}, rect, {
	    left: rect.x,
	    top: rect.y,
	    right: rect.x + rect.width,
	    bottom: rect.y + rect.height
	  });
	}

	function getInnerBoundingClientRect(element) {
	  var rect = getBoundingClientRect(element);
	  rect.top = rect.top + element.clientTop;
	  rect.left = rect.left + element.clientLeft;
	  rect.bottom = rect.top + element.clientHeight;
	  rect.right = rect.left + element.clientWidth;
	  rect.width = element.clientWidth;
	  rect.height = element.clientHeight;
	  rect.x = rect.left;
	  rect.y = rect.top;
	  return rect;
	}

	function getClientRectFromMixedType(element, clippingParent) {
	  return clippingParent === viewport ? rectToClientRect(getViewportRect(element)) : isHTMLElement(clippingParent) ? getInnerBoundingClientRect(clippingParent) : rectToClientRect(getDocumentRect(getDocumentElement(element)));
	} // A "clipping parent" is an overflowable container with the characteristic of
	// clipping (or hiding) overflowing elements with a position different from
	// `initial`


	function getClippingParents(element) {
	  var clippingParents = listScrollParents(getParentNode(element));
	  var canEscapeClipping = ['absolute', 'fixed'].indexOf(getComputedStyle(element).position) >= 0;
	  var clipperElement = canEscapeClipping && isHTMLElement(element) ? getOffsetParent(element) : element;

	  if (!isElement$1(clipperElement)) {
	    return [];
	  } // $FlowFixMe[incompatible-return]: https://github.com/facebook/flow/issues/1414


	  return clippingParents.filter(function (clippingParent) {
	    return isElement$1(clippingParent) && contains(clippingParent, clipperElement) && getNodeName(clippingParent) !== 'body';
	  });
	} // Gets the maximum area that the element is visible in due to any number of
	// clipping parents


	function getClippingRect(element, boundary, rootBoundary) {
	  var mainClippingParents = boundary === 'clippingParents' ? getClippingParents(element) : [].concat(boundary);
	  var clippingParents = [].concat(mainClippingParents, [rootBoundary]);
	  var firstClippingParent = clippingParents[0];
	  var clippingRect = clippingParents.reduce(function (accRect, clippingParent) {
	    var rect = getClientRectFromMixedType(element, clippingParent);
	    accRect.top = max(rect.top, accRect.top);
	    accRect.right = min$1(rect.right, accRect.right);
	    accRect.bottom = min$1(rect.bottom, accRect.bottom);
	    accRect.left = max(rect.left, accRect.left);
	    return accRect;
	  }, getClientRectFromMixedType(element, firstClippingParent));
	  clippingRect.width = clippingRect.right - clippingRect.left;
	  clippingRect.height = clippingRect.bottom - clippingRect.top;
	  clippingRect.x = clippingRect.left;
	  clippingRect.y = clippingRect.top;
	  return clippingRect;
	}

	function computeOffsets(_ref) {
	  var reference = _ref.reference,
	      element = _ref.element,
	      placement = _ref.placement;
	  var basePlacement = placement ? getBasePlacement$1(placement) : null;
	  var variation = placement ? getVariation(placement) : null;
	  var commonX = reference.x + reference.width / 2 - element.width / 2;
	  var commonY = reference.y + reference.height / 2 - element.height / 2;
	  var offsets;

	  switch (basePlacement) {
	    case top:
	      offsets = {
	        x: commonX,
	        y: reference.y - element.height
	      };
	      break;

	    case bottom:
	      offsets = {
	        x: commonX,
	        y: reference.y + reference.height
	      };
	      break;

	    case right:
	      offsets = {
	        x: reference.x + reference.width,
	        y: commonY
	      };
	      break;

	    case left:
	      offsets = {
	        x: reference.x - element.width,
	        y: commonY
	      };
	      break;

	    default:
	      offsets = {
	        x: reference.x,
	        y: reference.y
	      };
	  }

	  var mainAxis = basePlacement ? getMainAxisFromPlacement(basePlacement) : null;

	  if (mainAxis != null) {
	    var len = mainAxis === 'y' ? 'height' : 'width';

	    switch (variation) {
	      case start:
	        offsets[mainAxis] = offsets[mainAxis] - (reference[len] / 2 - element[len] / 2);
	        break;

	      case end:
	        offsets[mainAxis] = offsets[mainAxis] + (reference[len] / 2 - element[len] / 2);
	        break;
	    }
	  }

	  return offsets;
	}

	function detectOverflow(state, options) {
	  if (options === void 0) {
	    options = {};
	  }

	  var _options = options,
	      _options$placement = _options.placement,
	      placement = _options$placement === void 0 ? state.placement : _options$placement,
	      _options$boundary = _options.boundary,
	      boundary = _options$boundary === void 0 ? clippingParents : _options$boundary,
	      _options$rootBoundary = _options.rootBoundary,
	      rootBoundary = _options$rootBoundary === void 0 ? viewport : _options$rootBoundary,
	      _options$elementConte = _options.elementContext,
	      elementContext = _options$elementConte === void 0 ? popper : _options$elementConte,
	      _options$altBoundary = _options.altBoundary,
	      altBoundary = _options$altBoundary === void 0 ? false : _options$altBoundary,
	      _options$padding = _options.padding,
	      padding = _options$padding === void 0 ? 0 : _options$padding;
	  var paddingObject = mergePaddingObject(typeof padding !== 'number' ? padding : expandToHashMap(padding, basePlacements));
	  var altContext = elementContext === popper ? reference : popper;
	  var popperRect = state.rects.popper;
	  var element = state.elements[altBoundary ? altContext : elementContext];
	  var clippingClientRect = getClippingRect(isElement$1(element) ? element : element.contextElement || getDocumentElement(state.elements.popper), boundary, rootBoundary);
	  var referenceClientRect = getBoundingClientRect(state.elements.reference);
	  var popperOffsets = computeOffsets({
	    reference: referenceClientRect,
	    element: popperRect,
	    strategy: 'absolute',
	    placement: placement
	  });
	  var popperClientRect = rectToClientRect(Object.assign({}, popperRect, popperOffsets));
	  var elementClientRect = elementContext === popper ? popperClientRect : referenceClientRect; // positive = overflowing the clipping rect
	  // 0 or negative = within the clipping rect

	  var overflowOffsets = {
	    top: clippingClientRect.top - elementClientRect.top + paddingObject.top,
	    bottom: elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom,
	    left: clippingClientRect.left - elementClientRect.left + paddingObject.left,
	    right: elementClientRect.right - clippingClientRect.right + paddingObject.right
	  };
	  var offsetData = state.modifiersData.offset; // Offsets can be applied only to the popper element

	  if (elementContext === popper && offsetData) {
	    var offset = offsetData[placement];
	    Object.keys(overflowOffsets).forEach(function (key) {
	      var multiply = [right, bottom].indexOf(key) >= 0 ? 1 : -1;
	      var axis = [top, bottom].indexOf(key) >= 0 ? 'y' : 'x';
	      overflowOffsets[key] += offset[axis] * multiply;
	    });
	  }

	  return overflowOffsets;
	}

	function computeAutoPlacement(state, options) {
	  if (options === void 0) {
	    options = {};
	  }

	  var _options = options,
	      placement = _options.placement,
	      boundary = _options.boundary,
	      rootBoundary = _options.rootBoundary,
	      padding = _options.padding,
	      flipVariations = _options.flipVariations,
	      _options$allowedAutoP = _options.allowedAutoPlacements,
	      allowedAutoPlacements = _options$allowedAutoP === void 0 ? placements : _options$allowedAutoP;
	  var variation = getVariation(placement);
	  var placements$1 = variation ? flipVariations ? variationPlacements : variationPlacements.filter(function (placement) {
	    return getVariation(placement) === variation;
	  }) : basePlacements;
	  var allowedPlacements = placements$1.filter(function (placement) {
	    return allowedAutoPlacements.indexOf(placement) >= 0;
	  });

	  if (allowedPlacements.length === 0) {
	    allowedPlacements = placements$1;

	    if (process.env.NODE_ENV !== "production") {
	      console.error(['Popper: The `allowedAutoPlacements` option did not allow any', 'placements. Ensure the `placement` option matches the variation', 'of the allowed placements.', 'For example, "auto" cannot be used to allow "bottom-start".', 'Use "auto-start" instead.'].join(' '));
	    }
	  } // $FlowFixMe[incompatible-type]: Flow seems to have problems with two array unions...


	  var overflows = allowedPlacements.reduce(function (acc, placement) {
	    acc[placement] = detectOverflow(state, {
	      placement: placement,
	      boundary: boundary,
	      rootBoundary: rootBoundary,
	      padding: padding
	    })[getBasePlacement$1(placement)];
	    return acc;
	  }, {});
	  return Object.keys(overflows).sort(function (a, b) {
	    return overflows[a] - overflows[b];
	  });
	}

	function getExpandedFallbackPlacements(placement) {
	  if (getBasePlacement$1(placement) === auto) {
	    return [];
	  }

	  var oppositePlacement = getOppositePlacement(placement);
	  return [getOppositeVariationPlacement(placement), oppositePlacement, getOppositeVariationPlacement(oppositePlacement)];
	}

	function flip(_ref) {
	  var state = _ref.state,
	      options = _ref.options,
	      name = _ref.name;

	  if (state.modifiersData[name]._skip) {
	    return;
	  }

	  var _options$mainAxis = options.mainAxis,
	      checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis,
	      _options$altAxis = options.altAxis,
	      checkAltAxis = _options$altAxis === void 0 ? true : _options$altAxis,
	      specifiedFallbackPlacements = options.fallbackPlacements,
	      padding = options.padding,
	      boundary = options.boundary,
	      rootBoundary = options.rootBoundary,
	      altBoundary = options.altBoundary,
	      _options$flipVariatio = options.flipVariations,
	      flipVariations = _options$flipVariatio === void 0 ? true : _options$flipVariatio,
	      allowedAutoPlacements = options.allowedAutoPlacements;
	  var preferredPlacement = state.options.placement;
	  var basePlacement = getBasePlacement$1(preferredPlacement);
	  var isBasePlacement = basePlacement === preferredPlacement;
	  var fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipVariations ? [getOppositePlacement(preferredPlacement)] : getExpandedFallbackPlacements(preferredPlacement));
	  var placements = [preferredPlacement].concat(fallbackPlacements).reduce(function (acc, placement) {
	    return acc.concat(getBasePlacement$1(placement) === auto ? computeAutoPlacement(state, {
	      placement: placement,
	      boundary: boundary,
	      rootBoundary: rootBoundary,
	      padding: padding,
	      flipVariations: flipVariations,
	      allowedAutoPlacements: allowedAutoPlacements
	    }) : placement);
	  }, []);
	  var referenceRect = state.rects.reference;
	  var popperRect = state.rects.popper;
	  var checksMap = new Map();
	  var makeFallbackChecks = true;
	  var firstFittingPlacement = placements[0];

	  for (var i = 0; i < placements.length; i++) {
	    var placement = placements[i];

	    var _basePlacement = getBasePlacement$1(placement);

	    var isStartVariation = getVariation(placement) === start;
	    var isVertical = [top, bottom].indexOf(_basePlacement) >= 0;
	    var len = isVertical ? 'width' : 'height';
	    var overflow = detectOverflow(state, {
	      placement: placement,
	      boundary: boundary,
	      rootBoundary: rootBoundary,
	      altBoundary: altBoundary,
	      padding: padding
	    });
	    var mainVariationSide = isVertical ? isStartVariation ? right : left : isStartVariation ? bottom : top;

	    if (referenceRect[len] > popperRect[len]) {
	      mainVariationSide = getOppositePlacement(mainVariationSide);
	    }

	    var altVariationSide = getOppositePlacement(mainVariationSide);
	    var checks = [];

	    if (checkMainAxis) {
	      checks.push(overflow[_basePlacement] <= 0);
	    }

	    if (checkAltAxis) {
	      checks.push(overflow[mainVariationSide] <= 0, overflow[altVariationSide] <= 0);
	    }

	    if (checks.every(function (check) {
	      return check;
	    })) {
	      firstFittingPlacement = placement;
	      makeFallbackChecks = false;
	      break;
	    }

	    checksMap.set(placement, checks);
	  }

	  if (makeFallbackChecks) {
	    // `2` may be desired in some cases – research later
	    var numberOfChecks = flipVariations ? 3 : 1;

	    var _loop = function _loop(_i) {
	      var fittingPlacement = placements.find(function (placement) {
	        var checks = checksMap.get(placement);

	        if (checks) {
	          return checks.slice(0, _i).every(function (check) {
	            return check;
	          });
	        }
	      });

	      if (fittingPlacement) {
	        firstFittingPlacement = fittingPlacement;
	        return "break";
	      }
	    };

	    for (var _i = numberOfChecks; _i > 0; _i--) {
	      var _ret = _loop(_i);

	      if (_ret === "break") break;
	    }
	  }

	  if (state.placement !== firstFittingPlacement) {
	    state.modifiersData[name]._skip = true;
	    state.placement = firstFittingPlacement;
	    state.reset = true;
	  }
	} // eslint-disable-next-line import/no-unused-modules


	var flip$1 = {
	  name: 'flip',
	  enabled: true,
	  phase: 'main',
	  fn: flip,
	  requiresIfExists: ['offset'],
	  data: {
	    _skip: false
	  }
	};

	function getSideOffsets(overflow, rect, preventedOffsets) {
	  if (preventedOffsets === void 0) {
	    preventedOffsets = {
	      x: 0,
	      y: 0
	    };
	  }

	  return {
	    top: overflow.top - rect.height - preventedOffsets.y,
	    right: overflow.right - rect.width + preventedOffsets.x,
	    bottom: overflow.bottom - rect.height + preventedOffsets.y,
	    left: overflow.left - rect.width - preventedOffsets.x
	  };
	}

	function isAnySideFullyClipped(overflow) {
	  return [top, right, bottom, left].some(function (side) {
	    return overflow[side] >= 0;
	  });
	}

	function hide(_ref) {
	  var state = _ref.state,
	      name = _ref.name;
	  var referenceRect = state.rects.reference;
	  var popperRect = state.rects.popper;
	  var preventedOffsets = state.modifiersData.preventOverflow;
	  var referenceOverflow = detectOverflow(state, {
	    elementContext: 'reference'
	  });
	  var popperAltOverflow = detectOverflow(state, {
	    altBoundary: true
	  });
	  var referenceClippingOffsets = getSideOffsets(referenceOverflow, referenceRect);
	  var popperEscapeOffsets = getSideOffsets(popperAltOverflow, popperRect, preventedOffsets);
	  var isReferenceHidden = isAnySideFullyClipped(referenceClippingOffsets);
	  var hasPopperEscaped = isAnySideFullyClipped(popperEscapeOffsets);
	  state.modifiersData[name] = {
	    referenceClippingOffsets: referenceClippingOffsets,
	    popperEscapeOffsets: popperEscapeOffsets,
	    isReferenceHidden: isReferenceHidden,
	    hasPopperEscaped: hasPopperEscaped
	  };
	  state.attributes.popper = Object.assign({}, state.attributes.popper, {
	    'data-popper-reference-hidden': isReferenceHidden,
	    'data-popper-escaped': hasPopperEscaped
	  });
	} // eslint-disable-next-line import/no-unused-modules


	var hide$1 = {
	  name: 'hide',
	  enabled: true,
	  phase: 'main',
	  requiresIfExists: ['preventOverflow'],
	  fn: hide
	};

	function distanceAndSkiddingToXY(placement, rects, offset) {
	  var basePlacement = getBasePlacement$1(placement);
	  var invertDistance = [left, top].indexOf(basePlacement) >= 0 ? -1 : 1;

	  var _ref = typeof offset === 'function' ? offset(Object.assign({}, rects, {
	    placement: placement
	  })) : offset,
	      skidding = _ref[0],
	      distance = _ref[1];

	  skidding = skidding || 0;
	  distance = (distance || 0) * invertDistance;
	  return [left, right].indexOf(basePlacement) >= 0 ? {
	    x: distance,
	    y: skidding
	  } : {
	    x: skidding,
	    y: distance
	  };
	}

	function offset(_ref2) {
	  var state = _ref2.state,
	      options = _ref2.options,
	      name = _ref2.name;
	  var _options$offset = options.offset,
	      offset = _options$offset === void 0 ? [0, 0] : _options$offset;
	  var data = placements.reduce(function (acc, placement) {
	    acc[placement] = distanceAndSkiddingToXY(placement, state.rects, offset);
	    return acc;
	  }, {});
	  var _data$state$placement = data[state.placement],
	      x = _data$state$placement.x,
	      y = _data$state$placement.y;

	  if (state.modifiersData.popperOffsets != null) {
	    state.modifiersData.popperOffsets.x += x;
	    state.modifiersData.popperOffsets.y += y;
	  }

	  state.modifiersData[name] = data;
	} // eslint-disable-next-line import/no-unused-modules


	var offset$1 = {
	  name: 'offset',
	  enabled: true,
	  phase: 'main',
	  requires: ['popperOffsets'],
	  fn: offset
	};

	function popperOffsets(_ref) {
	  var state = _ref.state,
	      name = _ref.name;
	  // Offsets are the actual position the popper needs to have to be
	  // properly positioned near its reference element
	  // This is the most basic placement, and will be adjusted by
	  // the modifiers in the next step
	  state.modifiersData[name] = computeOffsets({
	    reference: state.rects.reference,
	    element: state.rects.popper,
	    strategy: 'absolute',
	    placement: state.placement
	  });
	} // eslint-disable-next-line import/no-unused-modules


	var popperOffsets$1 = {
	  name: 'popperOffsets',
	  enabled: true,
	  phase: 'read',
	  fn: popperOffsets,
	  data: {}
	};

	function getAltAxis(axis) {
	  return axis === 'x' ? 'y' : 'x';
	}

	function preventOverflow(_ref) {
	  var state = _ref.state,
	      options = _ref.options,
	      name = _ref.name;
	  var _options$mainAxis = options.mainAxis,
	      checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis,
	      _options$altAxis = options.altAxis,
	      checkAltAxis = _options$altAxis === void 0 ? false : _options$altAxis,
	      boundary = options.boundary,
	      rootBoundary = options.rootBoundary,
	      altBoundary = options.altBoundary,
	      padding = options.padding,
	      _options$tether = options.tether,
	      tether = _options$tether === void 0 ? true : _options$tether,
	      _options$tetherOffset = options.tetherOffset,
	      tetherOffset = _options$tetherOffset === void 0 ? 0 : _options$tetherOffset;
	  var overflow = detectOverflow(state, {
	    boundary: boundary,
	    rootBoundary: rootBoundary,
	    padding: padding,
	    altBoundary: altBoundary
	  });
	  var basePlacement = getBasePlacement$1(state.placement);
	  var variation = getVariation(state.placement);
	  var isBasePlacement = !variation;
	  var mainAxis = getMainAxisFromPlacement(basePlacement);
	  var altAxis = getAltAxis(mainAxis);
	  var popperOffsets = state.modifiersData.popperOffsets;
	  var referenceRect = state.rects.reference;
	  var popperRect = state.rects.popper;
	  var tetherOffsetValue = typeof tetherOffset === 'function' ? tetherOffset(Object.assign({}, state.rects, {
	    placement: state.placement
	  })) : tetherOffset;
	  var data = {
	    x: 0,
	    y: 0
	  };

	  if (!popperOffsets) {
	    return;
	  }

	  if (checkMainAxis || checkAltAxis) {
	    var mainSide = mainAxis === 'y' ? top : left;
	    var altSide = mainAxis === 'y' ? bottom : right;
	    var len = mainAxis === 'y' ? 'height' : 'width';
	    var offset = popperOffsets[mainAxis];
	    var min = popperOffsets[mainAxis] + overflow[mainSide];
	    var max$1 = popperOffsets[mainAxis] - overflow[altSide];
	    var additive = tether ? -popperRect[len] / 2 : 0;
	    var minLen = variation === start ? referenceRect[len] : popperRect[len];
	    var maxLen = variation === start ? -popperRect[len] : -referenceRect[len]; // We need to include the arrow in the calculation so the arrow doesn't go
	    // outside the reference bounds

	    var arrowElement = state.elements.arrow;
	    var arrowRect = tether && arrowElement ? getLayoutRect(arrowElement) : {
	      width: 0,
	      height: 0
	    };
	    var arrowPaddingObject = state.modifiersData['arrow#persistent'] ? state.modifiersData['arrow#persistent'].padding : getFreshSideObject();
	    var arrowPaddingMin = arrowPaddingObject[mainSide];
	    var arrowPaddingMax = arrowPaddingObject[altSide]; // If the reference length is smaller than the arrow length, we don't want
	    // to include its full size in the calculation. If the reference is small
	    // and near the edge of a boundary, the popper can overflow even if the
	    // reference is not overflowing as well (e.g. virtual elements with no
	    // width or height)

	    var arrowLen = within(0, referenceRect[len], arrowRect[len]);
	    var minOffset = isBasePlacement ? referenceRect[len] / 2 - additive - arrowLen - arrowPaddingMin - tetherOffsetValue : minLen - arrowLen - arrowPaddingMin - tetherOffsetValue;
	    var maxOffset = isBasePlacement ? -referenceRect[len] / 2 + additive + arrowLen + arrowPaddingMax + tetherOffsetValue : maxLen + arrowLen + arrowPaddingMax + tetherOffsetValue;
	    var arrowOffsetParent = state.elements.arrow && getOffsetParent(state.elements.arrow);
	    var clientOffset = arrowOffsetParent ? mainAxis === 'y' ? arrowOffsetParent.clientTop || 0 : arrowOffsetParent.clientLeft || 0 : 0;
	    var offsetModifierValue = state.modifiersData.offset ? state.modifiersData.offset[state.placement][mainAxis] : 0;
	    var tetherMin = popperOffsets[mainAxis] + minOffset - offsetModifierValue - clientOffset;
	    var tetherMax = popperOffsets[mainAxis] + maxOffset - offsetModifierValue;

	    if (checkMainAxis) {
	      var preventedOffset = within(tether ? min$1(min, tetherMin) : min, offset, tether ? max(max$1, tetherMax) : max$1);
	      popperOffsets[mainAxis] = preventedOffset;
	      data[mainAxis] = preventedOffset - offset;
	    }

	    if (checkAltAxis) {
	      var _mainSide = mainAxis === 'x' ? top : left;

	      var _altSide = mainAxis === 'x' ? bottom : right;

	      var _offset = popperOffsets[altAxis];

	      var _min = _offset + overflow[_mainSide];

	      var _max = _offset - overflow[_altSide];

	      var _preventedOffset = within(tether ? min$1(_min, tetherMin) : _min, _offset, tether ? max(_max, tetherMax) : _max);

	      popperOffsets[altAxis] = _preventedOffset;
	      data[altAxis] = _preventedOffset - _offset;
	    }
	  }

	  state.modifiersData[name] = data;
	} // eslint-disable-next-line import/no-unused-modules


	var preventOverflow$1 = {
	  name: 'preventOverflow',
	  enabled: true,
	  phase: 'main',
	  fn: preventOverflow,
	  requiresIfExists: ['offset']
	};

	function getHTMLElementScroll(element) {
	  return {
	    scrollLeft: element.scrollLeft,
	    scrollTop: element.scrollTop
	  };
	}

	function getNodeScroll(node) {
	  if (node === getWindow(node) || !isHTMLElement(node)) {
	    return getWindowScroll(node);
	  } else {
	    return getHTMLElementScroll(node);
	  }
	}

	function isElementScaled(element) {
	  var rect = element.getBoundingClientRect();
	  var scaleX = rect.width / element.offsetWidth || 1;
	  var scaleY = rect.height / element.offsetHeight || 1;
	  return scaleX !== 1 || scaleY !== 1;
	} // Returns the composite rect of an element relative to its offsetParent.
	// Composite means it takes into account transforms as well as layout.


	function getCompositeRect(elementOrVirtualElement, offsetParent, isFixed) {
	  if (isFixed === void 0) {
	    isFixed = false;
	  }

	  var isOffsetParentAnElement = isHTMLElement(offsetParent);
	  isHTMLElement(offsetParent) && isElementScaled(offsetParent);
	  var documentElement = getDocumentElement(offsetParent);
	  var rect = getBoundingClientRect(elementOrVirtualElement);
	  var scroll = {
	    scrollLeft: 0,
	    scrollTop: 0
	  };
	  var offsets = {
	    x: 0,
	    y: 0
	  };

	  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
	    if (getNodeName(offsetParent) !== 'body' || // https://github.com/popperjs/popper-core/issues/1078
	    isScrollParent(documentElement)) {
	      scroll = getNodeScroll(offsetParent);
	    }

	    if (isHTMLElement(offsetParent)) {
	      offsets = getBoundingClientRect(offsetParent);
	      offsets.x += offsetParent.clientLeft;
	      offsets.y += offsetParent.clientTop;
	    } else if (documentElement) {
	      offsets.x = getWindowScrollBarX(documentElement);
	    }
	  }

	  return {
	    x: rect.left + scroll.scrollLeft - offsets.x,
	    y: rect.top + scroll.scrollTop - offsets.y,
	    width: rect.width,
	    height: rect.height
	  };
	}

	function order(modifiers) {
	  var map = new Map();
	  var visited = new Set();
	  var result = [];
	  modifiers.forEach(function (modifier) {
	    map.set(modifier.name, modifier);
	  }); // On visiting object, check for its dependencies and visit them recursively

	  function sort(modifier) {
	    visited.add(modifier.name);
	    var requires = [].concat(modifier.requires || [], modifier.requiresIfExists || []);
	    requires.forEach(function (dep) {
	      if (!visited.has(dep)) {
	        var depModifier = map.get(dep);

	        if (depModifier) {
	          sort(depModifier);
	        }
	      }
	    });
	    result.push(modifier);
	  }

	  modifiers.forEach(function (modifier) {
	    if (!visited.has(modifier.name)) {
	      // check for visited object
	      sort(modifier);
	    }
	  });
	  return result;
	}

	function orderModifiers(modifiers) {
	  // order based on dependencies
	  var orderedModifiers = order(modifiers); // order based on phase

	  return modifierPhases.reduce(function (acc, phase) {
	    return acc.concat(orderedModifiers.filter(function (modifier) {
	      return modifier.phase === phase;
	    }));
	  }, []);
	}

	function debounce$1(fn) {
	  var pending;
	  return function () {
	    if (!pending) {
	      pending = new Promise(function (resolve) {
	        Promise.resolve().then(function () {
	          pending = undefined;
	          resolve(fn());
	        });
	      });
	    }

	    return pending;
	  };
	}

	function format(str) {
	  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	    args[_key - 1] = arguments[_key];
	  }

	  return [].concat(args).reduce(function (p, c) {
	    return p.replace(/%s/, c);
	  }, str);
	}

	var INVALID_MODIFIER_ERROR = 'Popper: modifier "%s" provided an invalid %s property, expected %s but got %s';
	var MISSING_DEPENDENCY_ERROR = 'Popper: modifier "%s" requires "%s", but "%s" modifier is not available';
	var VALID_PROPERTIES = ['name', 'enabled', 'phase', 'fn', 'effect', 'requires', 'options'];
	function validateModifiers(modifiers) {
	  modifiers.forEach(function (modifier) {
	    [].concat(Object.keys(modifier), VALID_PROPERTIES) // IE11-compatible replacement for `new Set(iterable)`
	    .filter(function (value, index, self) {
	      return self.indexOf(value) === index;
	    }).forEach(function (key) {
	      switch (key) {
	        case 'name':
	          if (typeof modifier.name !== 'string') {
	            console.error(format(INVALID_MODIFIER_ERROR, String(modifier.name), '"name"', '"string"', "\"" + String(modifier.name) + "\""));
	          }

	          break;

	        case 'enabled':
	          if (typeof modifier.enabled !== 'boolean') {
	            console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"enabled"', '"boolean"', "\"" + String(modifier.enabled) + "\""));
	          }

	          break;

	        case 'phase':
	          if (modifierPhases.indexOf(modifier.phase) < 0) {
	            console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"phase"', "either " + modifierPhases.join(', '), "\"" + String(modifier.phase) + "\""));
	          }

	          break;

	        case 'fn':
	          if (typeof modifier.fn !== 'function') {
	            console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"fn"', '"function"', "\"" + String(modifier.fn) + "\""));
	          }

	          break;

	        case 'effect':
	          if (modifier.effect != null && typeof modifier.effect !== 'function') {
	            console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"effect"', '"function"', "\"" + String(modifier.fn) + "\""));
	          }

	          break;

	        case 'requires':
	          if (modifier.requires != null && !Array.isArray(modifier.requires)) {
	            console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"requires"', '"array"', "\"" + String(modifier.requires) + "\""));
	          }

	          break;

	        case 'requiresIfExists':
	          if (!Array.isArray(modifier.requiresIfExists)) {
	            console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"requiresIfExists"', '"array"', "\"" + String(modifier.requiresIfExists) + "\""));
	          }

	          break;

	        case 'options':
	        case 'data':
	          break;

	        default:
	          console.error("PopperJS: an invalid property has been provided to the \"" + modifier.name + "\" modifier, valid properties are " + VALID_PROPERTIES.map(function (s) {
	            return "\"" + s + "\"";
	          }).join(', ') + "; but \"" + key + "\" was provided.");
	      }

	      modifier.requires && modifier.requires.forEach(function (requirement) {
	        if (modifiers.find(function (mod) {
	          return mod.name === requirement;
	        }) == null) {
	          console.error(format(MISSING_DEPENDENCY_ERROR, String(modifier.name), requirement, requirement));
	        }
	      });
	    });
	  });
	}

	function uniqueBy(arr, fn) {
	  var identifiers = new Set();
	  return arr.filter(function (item) {
	    var identifier = fn(item);

	    if (!identifiers.has(identifier)) {
	      identifiers.add(identifier);
	      return true;
	    }
	  });
	}

	function mergeByName(modifiers) {
	  var merged = modifiers.reduce(function (merged, current) {
	    var existing = merged[current.name];
	    merged[current.name] = existing ? Object.assign({}, existing, current, {
	      options: Object.assign({}, existing.options, current.options),
	      data: Object.assign({}, existing.data, current.data)
	    }) : current;
	    return merged;
	  }, {}); // IE11 does not support Object.values

	  return Object.keys(merged).map(function (key) {
	    return merged[key];
	  });
	}

	var INVALID_ELEMENT_ERROR = 'Popper: Invalid reference or popper argument provided. They must be either a DOM element or virtual element.';
	var INFINITE_LOOP_ERROR = 'Popper: An infinite loop in the modifiers cycle has been detected! The cycle has been interrupted to prevent a browser crash.';
	var DEFAULT_OPTIONS = {
	  placement: 'bottom',
	  modifiers: [],
	  strategy: 'absolute'
	};

	function areValidElements() {
	  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
	    args[_key] = arguments[_key];
	  }

	  return !args.some(function (element) {
	    return !(element && typeof element.getBoundingClientRect === 'function');
	  });
	}

	function popperGenerator(generatorOptions) {
	  if (generatorOptions === void 0) {
	    generatorOptions = {};
	  }

	  var _generatorOptions = generatorOptions,
	      _generatorOptions$def = _generatorOptions.defaultModifiers,
	      defaultModifiers = _generatorOptions$def === void 0 ? [] : _generatorOptions$def,
	      _generatorOptions$def2 = _generatorOptions.defaultOptions,
	      defaultOptions = _generatorOptions$def2 === void 0 ? DEFAULT_OPTIONS : _generatorOptions$def2;
	  return function createPopper(reference, popper, options) {
	    if (options === void 0) {
	      options = defaultOptions;
	    }

	    var state = {
	      placement: 'bottom',
	      orderedModifiers: [],
	      options: Object.assign({}, DEFAULT_OPTIONS, defaultOptions),
	      modifiersData: {},
	      elements: {
	        reference: reference,
	        popper: popper
	      },
	      attributes: {},
	      styles: {}
	    };
	    var effectCleanupFns = [];
	    var isDestroyed = false;
	    var instance = {
	      state: state,
	      setOptions: function setOptions(setOptionsAction) {
	        var options = typeof setOptionsAction === 'function' ? setOptionsAction(state.options) : setOptionsAction;
	        cleanupModifierEffects();
	        state.options = Object.assign({}, defaultOptions, state.options, options);
	        state.scrollParents = {
	          reference: isElement$1(reference) ? listScrollParents(reference) : reference.contextElement ? listScrollParents(reference.contextElement) : [],
	          popper: listScrollParents(popper)
	        }; // Orders the modifiers based on their dependencies and `phase`
	        // properties

	        var orderedModifiers = orderModifiers(mergeByName([].concat(defaultModifiers, state.options.modifiers))); // Strip out disabled modifiers

	        state.orderedModifiers = orderedModifiers.filter(function (m) {
	          return m.enabled;
	        }); // Validate the provided modifiers so that the consumer will get warned
	        // if one of the modifiers is invalid for any reason

	        if (process.env.NODE_ENV !== "production") {
	          var modifiers = uniqueBy([].concat(orderedModifiers, state.options.modifiers), function (_ref) {
	            var name = _ref.name;
	            return name;
	          });
	          validateModifiers(modifiers);

	          if (getBasePlacement$1(state.options.placement) === auto) {
	            var flipModifier = state.orderedModifiers.find(function (_ref2) {
	              var name = _ref2.name;
	              return name === 'flip';
	            });

	            if (!flipModifier) {
	              console.error(['Popper: "auto" placements require the "flip" modifier be', 'present and enabled to work.'].join(' '));
	            }
	          }

	          var _getComputedStyle = getComputedStyle(popper),
	              marginTop = _getComputedStyle.marginTop,
	              marginRight = _getComputedStyle.marginRight,
	              marginBottom = _getComputedStyle.marginBottom,
	              marginLeft = _getComputedStyle.marginLeft; // We no longer take into account `margins` on the popper, and it can
	          // cause bugs with positioning, so we'll warn the consumer


	          if ([marginTop, marginRight, marginBottom, marginLeft].some(function (margin) {
	            return parseFloat(margin);
	          })) {
	            console.warn(['Popper: CSS "margin" styles cannot be used to apply padding', 'between the popper and its reference element or boundary.', 'To replicate margin, use the `offset` modifier, as well as', 'the `padding` option in the `preventOverflow` and `flip`', 'modifiers.'].join(' '));
	          }
	        }

	        runModifierEffects();
	        return instance.update();
	      },
	      // Sync update – it will always be executed, even if not necessary. This
	      // is useful for low frequency updates where sync behavior simplifies the
	      // logic.
	      // For high frequency updates (e.g. `resize` and `scroll` events), always
	      // prefer the async Popper#update method
	      forceUpdate: function forceUpdate() {
	        if (isDestroyed) {
	          return;
	        }

	        var _state$elements = state.elements,
	            reference = _state$elements.reference,
	            popper = _state$elements.popper; // Don't proceed if `reference` or `popper` are not valid elements
	        // anymore

	        if (!areValidElements(reference, popper)) {
	          if (process.env.NODE_ENV !== "production") {
	            console.error(INVALID_ELEMENT_ERROR);
	          }

	          return;
	        } // Store the reference and popper rects to be read by modifiers


	        state.rects = {
	          reference: getCompositeRect(reference, getOffsetParent(popper), state.options.strategy === 'fixed'),
	          popper: getLayoutRect(popper)
	        }; // Modifiers have the ability to reset the current update cycle. The
	        // most common use case for this is the `flip` modifier changing the
	        // placement, which then needs to re-run all the modifiers, because the
	        // logic was previously ran for the previous placement and is therefore
	        // stale/incorrect

	        state.reset = false;
	        state.placement = state.options.placement; // On each update cycle, the `modifiersData` property for each modifier
	        // is filled with the initial data specified by the modifier. This means
	        // it doesn't persist and is fresh on each update.
	        // To ensure persistent data, use `${name}#persistent`

	        state.orderedModifiers.forEach(function (modifier) {
	          return state.modifiersData[modifier.name] = Object.assign({}, modifier.data);
	        });
	        var __debug_loops__ = 0;

	        for (var index = 0; index < state.orderedModifiers.length; index++) {
	          if (process.env.NODE_ENV !== "production") {
	            __debug_loops__ += 1;

	            if (__debug_loops__ > 100) {
	              console.error(INFINITE_LOOP_ERROR);
	              break;
	            }
	          }

	          if (state.reset === true) {
	            state.reset = false;
	            index = -1;
	            continue;
	          }

	          var _state$orderedModifie = state.orderedModifiers[index],
	              fn = _state$orderedModifie.fn,
	              _state$orderedModifie2 = _state$orderedModifie.options,
	              _options = _state$orderedModifie2 === void 0 ? {} : _state$orderedModifie2,
	              name = _state$orderedModifie.name;

	          if (typeof fn === 'function') {
	            state = fn({
	              state: state,
	              options: _options,
	              name: name,
	              instance: instance
	            }) || state;
	          }
	        }
	      },
	      // Async and optimistically optimized update – it will not be executed if
	      // not necessary (debounced to run at most once-per-tick)
	      update: debounce$1(function () {
	        return new Promise(function (resolve) {
	          instance.forceUpdate();
	          resolve(state);
	        });
	      }),
	      destroy: function destroy() {
	        cleanupModifierEffects();
	        isDestroyed = true;
	      }
	    };

	    if (!areValidElements(reference, popper)) {
	      if (process.env.NODE_ENV !== "production") {
	        console.error(INVALID_ELEMENT_ERROR);
	      }

	      return instance;
	    }

	    instance.setOptions(options).then(function (state) {
	      if (!isDestroyed && options.onFirstUpdate) {
	        options.onFirstUpdate(state);
	      }
	    }); // Modifiers have the ability to execute arbitrary code before the first
	    // update cycle runs. They will be executed in the same order as the update
	    // cycle. This is useful when a modifier adds some persistent data that
	    // other modifiers need to use, but the modifier is run after the dependent
	    // one.

	    function runModifierEffects() {
	      state.orderedModifiers.forEach(function (_ref3) {
	        var name = _ref3.name,
	            _ref3$options = _ref3.options,
	            options = _ref3$options === void 0 ? {} : _ref3$options,
	            effect = _ref3.effect;

	        if (typeof effect === 'function') {
	          var cleanupFn = effect({
	            state: state,
	            name: name,
	            instance: instance,
	            options: options
	          });

	          var noopFn = function noopFn() {};

	          effectCleanupFns.push(cleanupFn || noopFn);
	        }
	      });
	    }

	    function cleanupModifierEffects() {
	      effectCleanupFns.forEach(function (fn) {
	        return fn();
	      });
	      effectCleanupFns = [];
	    }

	    return instance;
	  };
	}

	var defaultModifiers = [eventListeners, popperOffsets$1, computeStyles$1, applyStyles$1, offset$1, flip$1, preventOverflow$1, arrow$1, hide$1];
	var createPopper = /*#__PURE__*/popperGenerator({
	  defaultModifiers: defaultModifiers
	}); // eslint-disable-next-line import/no-unused-modules

	/**!
	* tippy.js v6.3.2
	* (c) 2017-2021 atomiks
	* MIT License
	*/
	var BOX_CLASS = "tippy-box";
	var CONTENT_CLASS = "tippy-content";
	var BACKDROP_CLASS = "tippy-backdrop";
	var ARROW_CLASS = "tippy-arrow";
	var SVG_ARROW_CLASS = "tippy-svg-arrow";
	var TOUCH_OPTIONS = {
	  passive: true,
	  capture: true
	};
	var TIPPY_DEFAULT_APPEND_TO = function TIPPY_DEFAULT_APPEND_TO() {
	  return document.body;
	};

	function hasOwnProperty(obj, key) {
	  return {}.hasOwnProperty.call(obj, key);
	}
	function getValueAtIndexOrReturn(value, index, defaultValue) {
	  if (Array.isArray(value)) {
	    var v = value[index];
	    return v == null ? Array.isArray(defaultValue) ? defaultValue[index] : defaultValue : v;
	  }

	  return value;
	}
	function isType(value, type) {
	  var str = {}.toString.call(value);
	  return str.indexOf('[object') === 0 && str.indexOf(type + "]") > -1;
	}
	function invokeWithArgsOrReturn(value, args) {
	  return typeof value === 'function' ? value.apply(void 0, args) : value;
	}
	function debounce(fn, ms) {
	  // Avoid wrapping in `setTimeout` if ms is 0 anyway
	  if (ms === 0) {
	    return fn;
	  }

	  var timeout;
	  return function (arg) {
	    clearTimeout(timeout);
	    timeout = setTimeout(function () {
	      fn(arg);
	    }, ms);
	  };
	}
	function removeProperties(obj, keys) {
	  var clone = Object.assign({}, obj);
	  keys.forEach(function (key) {
	    delete clone[key];
	  });
	  return clone;
	}
	function splitBySpaces(value) {
	  return value.split(/\s+/).filter(Boolean);
	}
	function normalizeToArray(value) {
	  return [].concat(value);
	}
	function pushIfUnique(arr, value) {
	  if (arr.indexOf(value) === -1) {
	    arr.push(value);
	  }
	}
	function unique(arr) {
	  return arr.filter(function (item, index) {
	    return arr.indexOf(item) === index;
	  });
	}
	function getBasePlacement(placement) {
	  return placement.split('-')[0];
	}
	function arrayFrom(value) {
	  return [].slice.call(value);
	}
	function removeUndefinedProps(obj) {
	  return Object.keys(obj).reduce(function (acc, key) {
	    if (obj[key] !== undefined) {
	      acc[key] = obj[key];
	    }

	    return acc;
	  }, {});
	}

	function div() {
	  return document.createElement('div');
	}
	function isElement(value) {
	  return ['Element', 'Fragment'].some(function (type) {
	    return isType(value, type);
	  });
	}
	function isNodeList(value) {
	  return isType(value, 'NodeList');
	}
	function isMouseEvent(value) {
	  return isType(value, 'MouseEvent');
	}
	function isReferenceElement(value) {
	  return !!(value && value._tippy && value._tippy.reference === value);
	}
	function getArrayOfElements(value) {
	  if (isElement(value)) {
	    return [value];
	  }

	  if (isNodeList(value)) {
	    return arrayFrom(value);
	  }

	  if (Array.isArray(value)) {
	    return value;
	  }

	  return arrayFrom(document.querySelectorAll(value));
	}
	function setTransitionDuration(els, value) {
	  els.forEach(function (el) {
	    if (el) {
	      el.style.transitionDuration = value + "ms";
	    }
	  });
	}
	function setVisibilityState(els, state) {
	  els.forEach(function (el) {
	    if (el) {
	      el.setAttribute('data-state', state);
	    }
	  });
	}
	function getOwnerDocument(elementOrElements) {
	  var _element$ownerDocumen;

	  var _normalizeToArray = normalizeToArray(elementOrElements),
	      element = _normalizeToArray[0]; // Elements created via a <template> have an ownerDocument with no reference to the body


	  return (element == null ? void 0 : (_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body) ? element.ownerDocument : document;
	}
	function isCursorOutsideInteractiveBorder(popperTreeData, event) {
	  var clientX = event.clientX,
	      clientY = event.clientY;
	  return popperTreeData.every(function (_ref) {
	    var popperRect = _ref.popperRect,
	        popperState = _ref.popperState,
	        props = _ref.props;
	    var interactiveBorder = props.interactiveBorder;
	    var basePlacement = getBasePlacement(popperState.placement);
	    var offsetData = popperState.modifiersData.offset;

	    if (!offsetData) {
	      return true;
	    }

	    var topDistance = basePlacement === 'bottom' ? offsetData.top.y : 0;
	    var bottomDistance = basePlacement === 'top' ? offsetData.bottom.y : 0;
	    var leftDistance = basePlacement === 'right' ? offsetData.left.x : 0;
	    var rightDistance = basePlacement === 'left' ? offsetData.right.x : 0;
	    var exceedsTop = popperRect.top - clientY + topDistance > interactiveBorder;
	    var exceedsBottom = clientY - popperRect.bottom - bottomDistance > interactiveBorder;
	    var exceedsLeft = popperRect.left - clientX + leftDistance > interactiveBorder;
	    var exceedsRight = clientX - popperRect.right - rightDistance > interactiveBorder;
	    return exceedsTop || exceedsBottom || exceedsLeft || exceedsRight;
	  });
	}
	function updateTransitionEndListener(box, action, listener) {
	  var method = action + "EventListener"; // some browsers apparently support `transition` (unprefixed) but only fire
	  // `webkitTransitionEnd`...

	  ['transitionend', 'webkitTransitionEnd'].forEach(function (event) {
	    box[method](event, listener);
	  });
	}
	/**
	 * Compared to xxx.contains, this function works for dom structures with shadow
	 * dom
	 */

	function actualContains(parent, child) {
	  var target = child;

	  while (target) {
	    var _ref2;

	    if (parent.contains(target)) {
	      return true;
	    }

	    target = (_ref2 = target.getRootNode == null ? void 0 : target.getRootNode()) == null ? void 0 : _ref2.host;
	  }

	  return false;
	}

	var currentInput = {
	  isTouch: false
	};
	var lastMouseMoveTime = 0;
	/**
	 * When a `touchstart` event is fired, it's assumed the user is using touch
	 * input. We'll bind a `mousemove` event listener to listen for mouse input in
	 * the future. This way, the `isTouch` property is fully dynamic and will handle
	 * hybrid devices that use a mix of touch + mouse input.
	 */

	function onDocumentTouchStart() {
	  if (currentInput.isTouch) {
	    return;
	  }

	  currentInput.isTouch = true;

	  if (window.performance) {
	    document.addEventListener('mousemove', onDocumentMouseMove);
	  }
	}
	/**
	 * When two `mousemove` event are fired consecutively within 20ms, it's assumed
	 * the user is using mouse input again. `mousemove` can fire on touch devices as
	 * well, but very rarely that quickly.
	 */

	function onDocumentMouseMove() {
	  var now = performance.now();

	  if (now - lastMouseMoveTime < 20) {
	    currentInput.isTouch = false;
	    document.removeEventListener('mousemove', onDocumentMouseMove);
	  }

	  lastMouseMoveTime = now;
	}
	/**
	 * When an element is in focus and has a tippy, leaving the tab/window and
	 * returning causes it to show again. For mouse users this is unexpected, but
	 * for keyboard use it makes sense.
	 * TODO: find a better technique to solve this problem
	 */

	function onWindowBlur() {
	  var activeElement = document.activeElement;

	  if (isReferenceElement(activeElement)) {
	    var instance = activeElement._tippy;

	    if (activeElement.blur && !instance.state.isVisible) {
	      activeElement.blur();
	    }
	  }
	}
	function bindGlobalEventListeners() {
	  document.addEventListener('touchstart', onDocumentTouchStart, TOUCH_OPTIONS);
	  window.addEventListener('blur', onWindowBlur);
	}

	var isBrowser$1 = typeof window !== 'undefined' && typeof document !== 'undefined';
	var isIE11 = isBrowser$1 ? // @ts-ignore
	!!window.msCrypto : false;

	function createMemoryLeakWarning(method) {
	  var txt = method === 'destroy' ? 'n already-' : ' ';
	  return [method + "() was called on a" + txt + "destroyed instance. This is a no-op but", 'indicates a potential memory leak.'].join(' ');
	}
	function clean(value) {
	  var spacesAndTabs = /[ \t]{2,}/g;
	  var lineStartWithSpaces = /^[ \t]*/gm;
	  return value.replace(spacesAndTabs, ' ').replace(lineStartWithSpaces, '').trim();
	}

	function getDevMessage(message) {
	  return clean("\n  %ctippy.js\n\n  %c" + clean(message) + "\n\n  %c\uD83D\uDC77\u200D This is a development-only message. It will be removed in production.\n  ");
	}

	function getFormattedMessage(message) {
	  return [getDevMessage(message), // title
	  'color: #00C584; font-size: 1.3em; font-weight: bold;', // message
	  'line-height: 1.5', // footer
	  'color: #a6a095;'];
	} // Assume warnings and errors never have the same message

	var visitedMessages;

	if (process.env.NODE_ENV !== "production") {
	  resetVisitedMessages();
	}

	function resetVisitedMessages() {
	  visitedMessages = new Set();
	}
	function warnWhen(condition, message) {
	  if (condition && !visitedMessages.has(message)) {
	    var _console;

	    visitedMessages.add(message);

	    (_console = console).warn.apply(_console, getFormattedMessage(message));
	  }
	}
	function errorWhen(condition, message) {
	  if (condition && !visitedMessages.has(message)) {
	    var _console2;

	    visitedMessages.add(message);

	    (_console2 = console).error.apply(_console2, getFormattedMessage(message));
	  }
	}
	function validateTargets(targets) {
	  var didPassFalsyValue = !targets;
	  var didPassPlainObject = Object.prototype.toString.call(targets) === '[object Object]' && !targets.addEventListener;
	  errorWhen(didPassFalsyValue, ['tippy() was passed', '`' + String(targets) + '`', 'as its targets (first) argument. Valid types are: String, Element,', 'Element[], or NodeList.'].join(' '));
	  errorWhen(didPassPlainObject, ['tippy() was passed a plain object which is not supported as an argument', 'for virtual positioning. Use props.getReferenceClientRect instead.'].join(' '));
	}

	var pluginProps = {
	  animateFill: false,
	  followCursor: false,
	  inlinePositioning: false,
	  sticky: false
	};
	var renderProps = {
	  allowHTML: false,
	  animation: 'fade',
	  arrow: true,
	  content: '',
	  inertia: false,
	  maxWidth: 350,
	  role: 'tooltip',
	  theme: '',
	  zIndex: 9999
	};
	var defaultProps = Object.assign({
	  appendTo: TIPPY_DEFAULT_APPEND_TO,
	  aria: {
	    content: 'auto',
	    expanded: 'auto'
	  },
	  delay: 0,
	  duration: [300, 250],
	  getReferenceClientRect: null,
	  hideOnClick: true,
	  ignoreAttributes: false,
	  interactive: false,
	  interactiveBorder: 2,
	  interactiveDebounce: 0,
	  moveTransition: '',
	  offset: [0, 10],
	  onAfterUpdate: function onAfterUpdate() {},
	  onBeforeUpdate: function onBeforeUpdate() {},
	  onCreate: function onCreate() {},
	  onDestroy: function onDestroy() {},
	  onHidden: function onHidden() {},
	  onHide: function onHide() {},
	  onMount: function onMount() {},
	  onShow: function onShow() {},
	  onShown: function onShown() {},
	  onTrigger: function onTrigger() {},
	  onUntrigger: function onUntrigger() {},
	  onClickOutside: function onClickOutside() {},
	  placement: 'top',
	  plugins: [],
	  popperOptions: {},
	  render: null,
	  showOnCreate: false,
	  touch: true,
	  trigger: 'mouseenter focus',
	  triggerTarget: null
	}, pluginProps, {}, renderProps);
	var defaultKeys = Object.keys(defaultProps);
	var setDefaultProps = function setDefaultProps(partialProps) {
	  /* istanbul ignore else */
	  if (process.env.NODE_ENV !== "production") {
	    validateProps(partialProps, []);
	  }

	  var keys = Object.keys(partialProps);
	  keys.forEach(function (key) {
	    defaultProps[key] = partialProps[key];
	  });
	};
	function getExtendedPassedProps(passedProps) {
	  var plugins = passedProps.plugins || [];
	  var pluginProps = plugins.reduce(function (acc, plugin) {
	    var name = plugin.name,
	        defaultValue = plugin.defaultValue;

	    if (name) {
	      var _name;

	      acc[name] = passedProps[name] !== undefined ? passedProps[name] : (_name = defaultProps[name]) != null ? _name : defaultValue;
	    }

	    return acc;
	  }, {});
	  return Object.assign({}, passedProps, {}, pluginProps);
	}
	function getDataAttributeProps(reference, plugins) {
	  var propKeys = plugins ? Object.keys(getExtendedPassedProps(Object.assign({}, defaultProps, {
	    plugins: plugins
	  }))) : defaultKeys;
	  var props = propKeys.reduce(function (acc, key) {
	    var valueAsString = (reference.getAttribute("data-tippy-" + key) || '').trim();

	    if (!valueAsString) {
	      return acc;
	    }

	    if (key === 'content') {
	      acc[key] = valueAsString;
	    } else {
	      try {
	        acc[key] = JSON.parse(valueAsString);
	      } catch (e) {
	        acc[key] = valueAsString;
	      }
	    }

	    return acc;
	  }, {});
	  return props;
	}
	function evaluateProps(reference, props) {
	  var out = Object.assign({}, props, {
	    content: invokeWithArgsOrReturn(props.content, [reference])
	  }, props.ignoreAttributes ? {} : getDataAttributeProps(reference, props.plugins));
	  out.aria = Object.assign({}, defaultProps.aria, {}, out.aria);
	  out.aria = {
	    expanded: out.aria.expanded === 'auto' ? props.interactive : out.aria.expanded,
	    content: out.aria.content === 'auto' ? props.interactive ? null : 'describedby' : out.aria.content
	  };
	  return out;
	}
	function validateProps(partialProps, plugins) {
	  if (partialProps === void 0) {
	    partialProps = {};
	  }

	  if (plugins === void 0) {
	    plugins = [];
	  }

	  var keys = Object.keys(partialProps);
	  keys.forEach(function (prop) {
	    var nonPluginProps = removeProperties(defaultProps, Object.keys(pluginProps));
	    var didPassUnknownProp = !hasOwnProperty(nonPluginProps, prop); // Check if the prop exists in `plugins`

	    if (didPassUnknownProp) {
	      didPassUnknownProp = plugins.filter(function (plugin) {
	        return plugin.name === prop;
	      }).length === 0;
	    }

	    warnWhen(didPassUnknownProp, ["`" + prop + "`", "is not a valid prop. You may have spelled it incorrectly, or if it's", 'a plugin, forgot to pass it in an array as props.plugins.', '\n\n', 'All props: https://atomiks.github.io/tippyjs/v6/all-props/\n', 'Plugins: https://atomiks.github.io/tippyjs/v6/plugins/'].join(' '));
	  });
	}

	var innerHTML = function innerHTML() {
	  return 'innerHTML';
	};

	function dangerouslySetInnerHTML(element, html) {
	  element[innerHTML()] = html;
	}

	function createArrowElement(value) {
	  var arrow = div();

	  if (value === true) {
	    arrow.className = ARROW_CLASS;
	  } else {
	    arrow.className = SVG_ARROW_CLASS;

	    if (isElement(value)) {
	      arrow.appendChild(value);
	    } else {
	      dangerouslySetInnerHTML(arrow, value);
	    }
	  }

	  return arrow;
	}

	function setContent(content, props) {
	  if (isElement(props.content)) {
	    dangerouslySetInnerHTML(content, '');
	    content.appendChild(props.content);
	  } else if (typeof props.content !== 'function') {
	    if (props.allowHTML) {
	      dangerouslySetInnerHTML(content, props.content);
	    } else {
	      content.textContent = props.content;
	    }
	  }
	}
	function getChildren(popper) {
	  var box = popper.firstElementChild;
	  var boxChildren = arrayFrom(box.children);
	  return {
	    box: box,
	    content: boxChildren.find(function (node) {
	      return node.classList.contains(CONTENT_CLASS);
	    }),
	    arrow: boxChildren.find(function (node) {
	      return node.classList.contains(ARROW_CLASS) || node.classList.contains(SVG_ARROW_CLASS);
	    }),
	    backdrop: boxChildren.find(function (node) {
	      return node.classList.contains(BACKDROP_CLASS);
	    })
	  };
	}
	function render(instance) {
	  var popper = div();
	  var box = div();
	  box.className = BOX_CLASS;
	  box.setAttribute('data-state', 'hidden');
	  box.setAttribute('tabindex', '-1');
	  var content = div();
	  content.className = CONTENT_CLASS;
	  content.setAttribute('data-state', 'hidden');
	  setContent(content, instance.props);
	  popper.appendChild(box);
	  box.appendChild(content);
	  onUpdate(instance.props, instance.props);

	  function onUpdate(prevProps, nextProps) {
	    var _getChildren = getChildren(popper),
	        box = _getChildren.box,
	        content = _getChildren.content,
	        arrow = _getChildren.arrow;

	    if (nextProps.theme) {
	      box.setAttribute('data-theme', nextProps.theme);
	    } else {
	      box.removeAttribute('data-theme');
	    }

	    if (typeof nextProps.animation === 'string') {
	      box.setAttribute('data-animation', nextProps.animation);
	    } else {
	      box.removeAttribute('data-animation');
	    }

	    if (nextProps.inertia) {
	      box.setAttribute('data-inertia', '');
	    } else {
	      box.removeAttribute('data-inertia');
	    }

	    box.style.maxWidth = typeof nextProps.maxWidth === 'number' ? nextProps.maxWidth + "px" : nextProps.maxWidth;

	    if (nextProps.role) {
	      box.setAttribute('role', nextProps.role);
	    } else {
	      box.removeAttribute('role');
	    }

	    if (prevProps.content !== nextProps.content || prevProps.allowHTML !== nextProps.allowHTML) {
	      setContent(content, instance.props);
	    }

	    if (nextProps.arrow) {
	      if (!arrow) {
	        box.appendChild(createArrowElement(nextProps.arrow));
	      } else if (prevProps.arrow !== nextProps.arrow) {
	        box.removeChild(arrow);
	        box.appendChild(createArrowElement(nextProps.arrow));
	      }
	    } else if (arrow) {
	      box.removeChild(arrow);
	    }
	  }

	  return {
	    popper: popper,
	    onUpdate: onUpdate
	  };
	} // Runtime check to identify if the render function is the default one; this
	// way we can apply default CSS transitions logic and it can be tree-shaken away

	render.$$tippy = true;

	var idCounter = 1;
	var mouseMoveListeners = []; // Used by `hideAll()`

	var mountedInstances = [];
	function createTippy(reference, passedProps) {
	  var props = evaluateProps(reference, Object.assign({}, defaultProps, {}, getExtendedPassedProps(removeUndefinedProps(passedProps)))); // ===========================================================================
	  // 🔒 Private members
	  // ===========================================================================

	  var showTimeout;
	  var hideTimeout;
	  var scheduleHideAnimationFrame;
	  var isVisibleFromClick = false;
	  var didHideDueToDocumentMouseDown = false;
	  var didTouchMove = false;
	  var ignoreOnFirstUpdate = false;
	  var lastTriggerEvent;
	  var currentTransitionEndListener;
	  var onFirstUpdate;
	  var listeners = [];
	  var debouncedOnMouseMove = debounce(onMouseMove, props.interactiveDebounce);
	  var currentTarget; // ===========================================================================
	  // 🔑 Public members
	  // ===========================================================================

	  var id = idCounter++;
	  var popperInstance = null;
	  var plugins = unique(props.plugins);
	  var state = {
	    // Is the instance currently enabled?
	    isEnabled: true,
	    // Is the tippy currently showing and not transitioning out?
	    isVisible: false,
	    // Has the instance been destroyed?
	    isDestroyed: false,
	    // Is the tippy currently mounted to the DOM?
	    isMounted: false,
	    // Has the tippy finished transitioning in?
	    isShown: false
	  };
	  var instance = {
	    // properties
	    id: id,
	    reference: reference,
	    popper: div(),
	    popperInstance: popperInstance,
	    props: props,
	    state: state,
	    plugins: plugins,
	    // methods
	    clearDelayTimeouts: clearDelayTimeouts,
	    setProps: setProps,
	    setContent: setContent,
	    show: show,
	    hide: hide,
	    hideWithInteractivity: hideWithInteractivity,
	    enable: enable,
	    disable: disable,
	    unmount: unmount,
	    destroy: destroy
	  }; // TODO: Investigate why this early return causes a TDZ error in the tests —
	  // it doesn't seem to happen in the browser

	  /* istanbul ignore if */

	  if (!props.render) {
	    if (process.env.NODE_ENV !== "production") {
	      errorWhen(true, 'render() function has not been supplied.');
	    }

	    return instance;
	  } // ===========================================================================
	  // Initial mutations
	  // ===========================================================================


	  var _props$render = props.render(instance),
	      popper = _props$render.popper,
	      onUpdate = _props$render.onUpdate;

	  popper.setAttribute('data-tippy-root', '');
	  popper.id = "tippy-" + instance.id;
	  instance.popper = popper;
	  reference._tippy = instance;
	  popper._tippy = instance;
	  var pluginsHooks = plugins.map(function (plugin) {
	    return plugin.fn(instance);
	  });
	  var hasAriaExpanded = reference.hasAttribute('aria-expanded');
	  addListeners();
	  handleAriaExpandedAttribute();
	  handleStyles();
	  invokeHook('onCreate', [instance]);

	  if (props.showOnCreate) {
	    scheduleShow();
	  } // Prevent a tippy with a delay from hiding if the cursor left then returned
	  // before it started hiding


	  popper.addEventListener('mouseenter', function () {
	    if (instance.props.interactive && instance.state.isVisible) {
	      instance.clearDelayTimeouts();
	    }
	  });
	  popper.addEventListener('mouseleave', function (event) {
	    if (instance.props.interactive && instance.props.trigger.indexOf('mouseenter') >= 0) {
	      getDocument().addEventListener('mousemove', debouncedOnMouseMove);
	      debouncedOnMouseMove(event);
	    }
	  });
	  return instance; // ===========================================================================
	  // 🔒 Private methods
	  // ===========================================================================

	  function getNormalizedTouchSettings() {
	    var touch = instance.props.touch;
	    return Array.isArray(touch) ? touch : [touch, 0];
	  }

	  function getIsCustomTouchBehavior() {
	    return getNormalizedTouchSettings()[0] === 'hold';
	  }

	  function getIsDefaultRenderFn() {
	    var _instance$props$rende;

	    // @ts-ignore
	    return !!((_instance$props$rende = instance.props.render) == null ? void 0 : _instance$props$rende.$$tippy);
	  }

	  function getCurrentTarget() {
	    return currentTarget || reference;
	  }

	  function getDocument() {
	    var parent = getCurrentTarget().parentNode;
	    return parent ? getOwnerDocument(parent) : document;
	  }

	  function getDefaultTemplateChildren() {
	    return getChildren(popper);
	  }

	  function getDelay(isShow) {
	    // For touch or keyboard input, force `0` delay for UX reasons
	    // Also if the instance is mounted but not visible (transitioning out),
	    // ignore delay
	    if (instance.state.isMounted && !instance.state.isVisible || currentInput.isTouch || lastTriggerEvent && lastTriggerEvent.type === 'focus') {
	      return 0;
	    }

	    return getValueAtIndexOrReturn(instance.props.delay, isShow ? 0 : 1, defaultProps.delay);
	  }

	  function handleStyles() {
	    popper.style.pointerEvents = instance.props.interactive && instance.state.isVisible ? '' : 'none';
	    popper.style.zIndex = "" + instance.props.zIndex;
	  }

	  function invokeHook(hook, args, shouldInvokePropsHook) {
	    if (shouldInvokePropsHook === void 0) {
	      shouldInvokePropsHook = true;
	    }

	    pluginsHooks.forEach(function (pluginHooks) {
	      if (pluginHooks[hook]) {
	        pluginHooks[hook].apply(void 0, args);
	      }
	    });

	    if (shouldInvokePropsHook) {
	      var _instance$props;

	      (_instance$props = instance.props)[hook].apply(_instance$props, args);
	    }
	  }

	  function handleAriaContentAttribute() {
	    var aria = instance.props.aria;

	    if (!aria.content) {
	      return;
	    }

	    var attr = "aria-" + aria.content;
	    var id = popper.id;
	    var nodes = normalizeToArray(instance.props.triggerTarget || reference);
	    nodes.forEach(function (node) {
	      var currentValue = node.getAttribute(attr);

	      if (instance.state.isVisible) {
	        node.setAttribute(attr, currentValue ? currentValue + " " + id : id);
	      } else {
	        var nextValue = currentValue && currentValue.replace(id, '').trim();

	        if (nextValue) {
	          node.setAttribute(attr, nextValue);
	        } else {
	          node.removeAttribute(attr);
	        }
	      }
	    });
	  }

	  function handleAriaExpandedAttribute() {
	    if (hasAriaExpanded || !instance.props.aria.expanded) {
	      return;
	    }

	    var nodes = normalizeToArray(instance.props.triggerTarget || reference);
	    nodes.forEach(function (node) {
	      if (instance.props.interactive) {
	        node.setAttribute('aria-expanded', instance.state.isVisible && node === getCurrentTarget() ? 'true' : 'false');
	      } else {
	        node.removeAttribute('aria-expanded');
	      }
	    });
	  }

	  function cleanupInteractiveMouseListeners() {
	    getDocument().removeEventListener('mousemove', debouncedOnMouseMove);
	    mouseMoveListeners = mouseMoveListeners.filter(function (listener) {
	      return listener !== debouncedOnMouseMove;
	    });
	  }

	  function onDocumentPress(event) {
	    // Moved finger to scroll instead of an intentional tap outside
	    if (currentInput.isTouch) {
	      if (didTouchMove || event.type === 'mousedown') {
	        return;
	      }
	    }

	    var actualTarget = event.composedPath && event.composedPath()[0] || event.target; // Clicked on interactive popper

	    if (instance.props.interactive && actualContains(popper, actualTarget)) {
	      return;
	    } // Clicked on the event listeners target


	    if (actualContains(getCurrentTarget(), actualTarget)) {
	      if (currentInput.isTouch) {
	        return;
	      }

	      if (instance.state.isVisible && instance.props.trigger.indexOf('click') >= 0) {
	        return;
	      }
	    } else {
	      invokeHook('onClickOutside', [instance, event]);
	    }

	    if (instance.props.hideOnClick === true) {
	      instance.clearDelayTimeouts();
	      instance.hide(); // `mousedown` event is fired right before `focus` if pressing the
	      // currentTarget. This lets a tippy with `focus` trigger know that it
	      // should not show

	      didHideDueToDocumentMouseDown = true;
	      setTimeout(function () {
	        didHideDueToDocumentMouseDown = false;
	      }); // The listener gets added in `scheduleShow()`, but this may be hiding it
	      // before it shows, and hide()'s early bail-out behavior can prevent it
	      // from being cleaned up

	      if (!instance.state.isMounted) {
	        removeDocumentPress();
	      }
	    }
	  }

	  function onTouchMove() {
	    didTouchMove = true;
	  }

	  function onTouchStart() {
	    didTouchMove = false;
	  }

	  function addDocumentPress() {
	    var doc = getDocument();
	    doc.addEventListener('mousedown', onDocumentPress, true);
	    doc.addEventListener('touchend', onDocumentPress, TOUCH_OPTIONS);
	    doc.addEventListener('touchstart', onTouchStart, TOUCH_OPTIONS);
	    doc.addEventListener('touchmove', onTouchMove, TOUCH_OPTIONS);
	  }

	  function removeDocumentPress() {
	    var doc = getDocument();
	    doc.removeEventListener('mousedown', onDocumentPress, true);
	    doc.removeEventListener('touchend', onDocumentPress, TOUCH_OPTIONS);
	    doc.removeEventListener('touchstart', onTouchStart, TOUCH_OPTIONS);
	    doc.removeEventListener('touchmove', onTouchMove, TOUCH_OPTIONS);
	  }

	  function onTransitionedOut(duration, callback) {
	    onTransitionEnd(duration, function () {
	      if (!instance.state.isVisible && popper.parentNode && popper.parentNode.contains(popper)) {
	        callback();
	      }
	    });
	  }

	  function onTransitionedIn(duration, callback) {
	    onTransitionEnd(duration, callback);
	  }

	  function onTransitionEnd(duration, callback) {
	    var box = getDefaultTemplateChildren().box;

	    function listener(event) {
	      if (event.target === box) {
	        updateTransitionEndListener(box, 'remove', listener);
	        callback();
	      }
	    } // Make callback synchronous if duration is 0
	    // `transitionend` won't fire otherwise


	    if (duration === 0) {
	      return callback();
	    }

	    updateTransitionEndListener(box, 'remove', currentTransitionEndListener);
	    updateTransitionEndListener(box, 'add', listener);
	    currentTransitionEndListener = listener;
	  }

	  function on(eventType, handler, options) {
	    if (options === void 0) {
	      options = false;
	    }

	    var nodes = normalizeToArray(instance.props.triggerTarget || reference);
	    nodes.forEach(function (node) {
	      node.addEventListener(eventType, handler, options);
	      listeners.push({
	        node: node,
	        eventType: eventType,
	        handler: handler,
	        options: options
	      });
	    });
	  }

	  function addListeners() {
	    if (getIsCustomTouchBehavior()) {
	      on('touchstart', onTrigger, {
	        passive: true
	      });
	      on('touchend', onMouseLeave, {
	        passive: true
	      });
	    }

	    splitBySpaces(instance.props.trigger).forEach(function (eventType) {
	      if (eventType === 'manual') {
	        return;
	      }

	      on(eventType, onTrigger);

	      switch (eventType) {
	        case 'mouseenter':
	          on('mouseleave', onMouseLeave);
	          break;

	        case 'focus':
	          on(isIE11 ? 'focusout' : 'blur', onBlurOrFocusOut);
	          break;

	        case 'focusin':
	          on('focusout', onBlurOrFocusOut);
	          break;
	      }
	    });
	  }

	  function removeListeners() {
	    listeners.forEach(function (_ref) {
	      var node = _ref.node,
	          eventType = _ref.eventType,
	          handler = _ref.handler,
	          options = _ref.options;
	      node.removeEventListener(eventType, handler, options);
	    });
	    listeners = [];
	  }

	  function onTrigger(event) {
	    var _lastTriggerEvent;

	    var shouldScheduleClickHide = false;

	    if (!instance.state.isEnabled || isEventListenerStopped(event) || didHideDueToDocumentMouseDown) {
	      return;
	    }

	    var wasFocused = ((_lastTriggerEvent = lastTriggerEvent) == null ? void 0 : _lastTriggerEvent.type) === 'focus';
	    lastTriggerEvent = event;
	    currentTarget = event.currentTarget;
	    handleAriaExpandedAttribute();

	    if (!instance.state.isVisible && isMouseEvent(event)) {
	      // If scrolling, `mouseenter` events can be fired if the cursor lands
	      // over a new target, but `mousemove` events don't get fired. This
	      // causes interactive tooltips to get stuck open until the cursor is
	      // moved
	      mouseMoveListeners.forEach(function (listener) {
	        return listener(event);
	      });
	    } // Toggle show/hide when clicking click-triggered tooltips


	    if (event.type === 'click' && (instance.props.trigger.indexOf('mouseenter') < 0 || isVisibleFromClick) && instance.props.hideOnClick !== false && instance.state.isVisible) {
	      shouldScheduleClickHide = true;
	    } else {
	      scheduleShow(event);
	    }

	    if (event.type === 'click') {
	      isVisibleFromClick = !shouldScheduleClickHide;
	    }

	    if (shouldScheduleClickHide && !wasFocused) {
	      scheduleHide(event);
	    }
	  }

	  function onMouseMove(event) {
	    var target = event.target;
	    var isCursorOverReferenceOrPopper = getCurrentTarget().contains(target) || popper.contains(target);

	    if (event.type === 'mousemove' && isCursorOverReferenceOrPopper) {
	      return;
	    }

	    var popperTreeData = getNestedPopperTree().concat(popper).map(function (popper) {
	      var _instance$popperInsta;

	      var instance = popper._tippy;
	      var state = (_instance$popperInsta = instance.popperInstance) == null ? void 0 : _instance$popperInsta.state;

	      if (state) {
	        return {
	          popperRect: popper.getBoundingClientRect(),
	          popperState: state,
	          props: props
	        };
	      }

	      return null;
	    }).filter(Boolean);

	    if (isCursorOutsideInteractiveBorder(popperTreeData, event)) {
	      cleanupInteractiveMouseListeners();
	      scheduleHide(event);
	    }
	  }

	  function onMouseLeave(event) {
	    var shouldBail = isEventListenerStopped(event) || instance.props.trigger.indexOf('click') >= 0 && isVisibleFromClick;

	    if (shouldBail) {
	      return;
	    }

	    if (instance.props.interactive) {
	      instance.hideWithInteractivity(event);
	      return;
	    }

	    scheduleHide(event);
	  }

	  function onBlurOrFocusOut(event) {
	    if (instance.props.trigger.indexOf('focusin') < 0 && event.target !== getCurrentTarget()) {
	      return;
	    } // If focus was moved to within the popper


	    if (instance.props.interactive && event.relatedTarget && popper.contains(event.relatedTarget)) {
	      return;
	    }

	    scheduleHide(event);
	  }

	  function isEventListenerStopped(event) {
	    return currentInput.isTouch ? getIsCustomTouchBehavior() !== event.type.indexOf('touch') >= 0 : false;
	  }

	  function createPopperInstance() {
	    destroyPopperInstance();
	    var _instance$props2 = instance.props,
	        popperOptions = _instance$props2.popperOptions,
	        placement = _instance$props2.placement,
	        offset = _instance$props2.offset,
	        getReferenceClientRect = _instance$props2.getReferenceClientRect,
	        moveTransition = _instance$props2.moveTransition;
	    var arrow = getIsDefaultRenderFn() ? getChildren(popper).arrow : null;
	    var computedReference = getReferenceClientRect ? {
	      getBoundingClientRect: getReferenceClientRect,
	      contextElement: getReferenceClientRect.contextElement || getCurrentTarget()
	    } : reference;
	    var tippyModifier = {
	      name: '$$tippy',
	      enabled: true,
	      phase: 'beforeWrite',
	      requires: ['computeStyles'],
	      fn: function fn(_ref2) {
	        var state = _ref2.state;

	        if (getIsDefaultRenderFn()) {
	          var _getDefaultTemplateCh = getDefaultTemplateChildren(),
	              box = _getDefaultTemplateCh.box;

	          ['placement', 'reference-hidden', 'escaped'].forEach(function (attr) {
	            if (attr === 'placement') {
	              box.setAttribute('data-placement', state.placement);
	            } else {
	              if (state.attributes.popper["data-popper-" + attr]) {
	                box.setAttribute("data-" + attr, '');
	              } else {
	                box.removeAttribute("data-" + attr);
	              }
	            }
	          });
	          state.attributes.popper = {};
	        }
	      }
	    };
	    var modifiers = [{
	      name: 'offset',
	      options: {
	        offset: offset
	      }
	    }, {
	      name: 'preventOverflow',
	      options: {
	        padding: {
	          top: 2,
	          bottom: 2,
	          left: 5,
	          right: 5
	        }
	      }
	    }, {
	      name: 'flip',
	      options: {
	        padding: 5
	      }
	    }, {
	      name: 'computeStyles',
	      options: {
	        adaptive: !moveTransition
	      }
	    }, tippyModifier];

	    if (getIsDefaultRenderFn() && arrow) {
	      modifiers.push({
	        name: 'arrow',
	        options: {
	          element: arrow,
	          padding: 3
	        }
	      });
	    }

	    modifiers.push.apply(modifiers, (popperOptions == null ? void 0 : popperOptions.modifiers) || []);
	    instance.popperInstance = createPopper(computedReference, popper, Object.assign({}, popperOptions, {
	      placement: placement,
	      onFirstUpdate: onFirstUpdate,
	      modifiers: modifiers
	    }));
	  }

	  function destroyPopperInstance() {
	    if (instance.popperInstance) {
	      instance.popperInstance.destroy();
	      instance.popperInstance = null;
	    }
	  }

	  function mount() {
	    var appendTo = instance.props.appendTo;
	    var parentNode; // By default, we'll append the popper to the triggerTargets's parentNode so
	    // it's directly after the reference element so the elements inside the
	    // tippy can be tabbed to
	    // If there are clipping issues, the user can specify a different appendTo
	    // and ensure focus management is handled correctly manually

	    var node = getCurrentTarget();

	    if (instance.props.interactive && appendTo === TIPPY_DEFAULT_APPEND_TO || appendTo === 'parent') {
	      parentNode = node.parentNode;
	    } else {
	      parentNode = invokeWithArgsOrReturn(appendTo, [node]);
	    } // The popper element needs to exist on the DOM before its position can be
	    // updated as Popper needs to read its dimensions


	    if (!parentNode.contains(popper)) {
	      parentNode.appendChild(popper);
	    }

	    createPopperInstance();
	    /* istanbul ignore else */

	    if (process.env.NODE_ENV !== "production") {
	      // Accessibility check
	      warnWhen(instance.props.interactive && appendTo === defaultProps.appendTo && node.nextElementSibling !== popper, ['Interactive tippy element may not be accessible via keyboard', 'navigation because it is not directly after the reference element', 'in the DOM source order.', '\n\n', 'Using a wrapper <div> or <span> tag around the reference element', 'solves this by creating a new parentNode context.', '\n\n', 'Specifying `appendTo: document.body` silences this warning, but it', 'assumes you are using a focus management solution to handle', 'keyboard navigation.', '\n\n', 'See: https://atomiks.github.io/tippyjs/v6/accessibility/#interactivity'].join(' '));
	    }
	  }

	  function getNestedPopperTree() {
	    return arrayFrom(popper.querySelectorAll('[data-tippy-root]'));
	  }

	  function scheduleShow(event) {
	    instance.clearDelayTimeouts();

	    if (event) {
	      invokeHook('onTrigger', [instance, event]);
	    }

	    addDocumentPress();
	    var delay = getDelay(true);

	    var _getNormalizedTouchSe = getNormalizedTouchSettings(),
	        touchValue = _getNormalizedTouchSe[0],
	        touchDelay = _getNormalizedTouchSe[1];

	    if (currentInput.isTouch && touchValue === 'hold' && touchDelay) {
	      delay = touchDelay;
	    }

	    if (delay) {
	      showTimeout = setTimeout(function () {
	        instance.show();
	      }, delay);
	    } else {
	      instance.show();
	    }
	  }

	  function scheduleHide(event) {
	    instance.clearDelayTimeouts();
	    invokeHook('onUntrigger', [instance, event]);

	    if (!instance.state.isVisible) {
	      removeDocumentPress();
	      return;
	    } // For interactive tippies, scheduleHide is added to a document.body handler
	    // from onMouseLeave so must intercept scheduled hides from mousemove/leave
	    // events when trigger contains mouseenter and click, and the tip is
	    // currently shown as a result of a click.


	    if (instance.props.trigger.indexOf('mouseenter') >= 0 && instance.props.trigger.indexOf('click') >= 0 && ['mouseleave', 'mousemove'].indexOf(event.type) >= 0 && isVisibleFromClick) {
	      return;
	    }

	    var delay = getDelay(false);

	    if (delay) {
	      hideTimeout = setTimeout(function () {
	        if (instance.state.isVisible) {
	          instance.hide();
	        }
	      }, delay);
	    } else {
	      // Fixes a `transitionend` problem when it fires 1 frame too
	      // late sometimes, we don't want hide() to be called.
	      scheduleHideAnimationFrame = requestAnimationFrame(function () {
	        instance.hide();
	      });
	    }
	  } // ===========================================================================
	  // 🔑 Public methods
	  // ===========================================================================


	  function enable() {
	    instance.state.isEnabled = true;
	  }

	  function disable() {
	    // Disabling the instance should also hide it
	    // https://github.com/atomiks/tippy.js-react/issues/106
	    instance.hide();
	    instance.state.isEnabled = false;
	  }

	  function clearDelayTimeouts() {
	    clearTimeout(showTimeout);
	    clearTimeout(hideTimeout);
	    cancelAnimationFrame(scheduleHideAnimationFrame);
	  }

	  function setProps(partialProps) {
	    /* istanbul ignore else */
	    if (process.env.NODE_ENV !== "production") {
	      warnWhen(instance.state.isDestroyed, createMemoryLeakWarning('setProps'));
	    }

	    if (instance.state.isDestroyed) {
	      return;
	    }

	    invokeHook('onBeforeUpdate', [instance, partialProps]);
	    removeListeners();
	    var prevProps = instance.props;
	    var nextProps = evaluateProps(reference, Object.assign({}, instance.props, {}, partialProps, {
	      ignoreAttributes: true
	    }));
	    instance.props = nextProps;
	    addListeners();

	    if (prevProps.interactiveDebounce !== nextProps.interactiveDebounce) {
	      cleanupInteractiveMouseListeners();
	      debouncedOnMouseMove = debounce(onMouseMove, nextProps.interactiveDebounce);
	    } // Ensure stale aria-expanded attributes are removed


	    if (prevProps.triggerTarget && !nextProps.triggerTarget) {
	      normalizeToArray(prevProps.triggerTarget).forEach(function (node) {
	        node.removeAttribute('aria-expanded');
	      });
	    } else if (nextProps.triggerTarget) {
	      reference.removeAttribute('aria-expanded');
	    }

	    handleAriaExpandedAttribute();
	    handleStyles();

	    if (onUpdate) {
	      onUpdate(prevProps, nextProps);
	    }

	    if (instance.popperInstance) {
	      createPopperInstance(); // Fixes an issue with nested tippies if they are all getting re-rendered,
	      // and the nested ones get re-rendered first.
	      // https://github.com/atomiks/tippyjs-react/issues/177
	      // TODO: find a cleaner / more efficient solution(!)

	      getNestedPopperTree().forEach(function (nestedPopper) {
	        // React (and other UI libs likely) requires a rAF wrapper as it flushes
	        // its work in one
	        requestAnimationFrame(nestedPopper._tippy.popperInstance.forceUpdate);
	      });
	    }

	    invokeHook('onAfterUpdate', [instance, partialProps]);
	  }

	  function setContent(content) {
	    instance.setProps({
	      content: content
	    });
	  }

	  function show() {
	    /* istanbul ignore else */
	    if (process.env.NODE_ENV !== "production") {
	      warnWhen(instance.state.isDestroyed, createMemoryLeakWarning('show'));
	    } // Early bail-out


	    var isAlreadyVisible = instance.state.isVisible;
	    var isDestroyed = instance.state.isDestroyed;
	    var isDisabled = !instance.state.isEnabled;
	    var isTouchAndTouchDisabled = currentInput.isTouch && !instance.props.touch;
	    var duration = getValueAtIndexOrReturn(instance.props.duration, 0, defaultProps.duration);

	    if (isAlreadyVisible || isDestroyed || isDisabled || isTouchAndTouchDisabled) {
	      return;
	    } // Normalize `disabled` behavior across browsers.
	    // Firefox allows events on disabled elements, but Chrome doesn't.
	    // Using a wrapper element (i.e. <span>) is recommended.


	    if (getCurrentTarget().hasAttribute('disabled')) {
	      return;
	    }

	    invokeHook('onShow', [instance], false);

	    if (instance.props.onShow(instance) === false) {
	      return;
	    }

	    instance.state.isVisible = true;

	    if (getIsDefaultRenderFn()) {
	      popper.style.visibility = 'visible';
	    }

	    handleStyles();
	    addDocumentPress();

	    if (!instance.state.isMounted) {
	      popper.style.transition = 'none';
	    } // If flipping to the opposite side after hiding at least once, the
	    // animation will use the wrong placement without resetting the duration


	    if (getIsDefaultRenderFn()) {
	      var _getDefaultTemplateCh2 = getDefaultTemplateChildren(),
	          box = _getDefaultTemplateCh2.box,
	          content = _getDefaultTemplateCh2.content;

	      setTransitionDuration([box, content], 0);
	    }

	    onFirstUpdate = function onFirstUpdate() {
	      var _instance$popperInsta2;

	      if (!instance.state.isVisible || ignoreOnFirstUpdate) {
	        return;
	      }

	      ignoreOnFirstUpdate = true; // reflow

	      void popper.offsetHeight;
	      popper.style.transition = instance.props.moveTransition;

	      if (getIsDefaultRenderFn() && instance.props.animation) {
	        var _getDefaultTemplateCh3 = getDefaultTemplateChildren(),
	            _box = _getDefaultTemplateCh3.box,
	            _content = _getDefaultTemplateCh3.content;

	        setTransitionDuration([_box, _content], duration);
	        setVisibilityState([_box, _content], 'visible');
	      }

	      handleAriaContentAttribute();
	      handleAriaExpandedAttribute();
	      pushIfUnique(mountedInstances, instance); // certain modifiers (e.g. `maxSize`) require a second update after the
	      // popper has been positioned for the first time

	      (_instance$popperInsta2 = instance.popperInstance) == null ? void 0 : _instance$popperInsta2.forceUpdate();
	      instance.state.isMounted = true;
	      invokeHook('onMount', [instance]);

	      if (instance.props.animation && getIsDefaultRenderFn()) {
	        onTransitionedIn(duration, function () {
	          instance.state.isShown = true;
	          invokeHook('onShown', [instance]);
	        });
	      }
	    };

	    mount();
	  }

	  function hide() {
	    /* istanbul ignore else */
	    if (process.env.NODE_ENV !== "production") {
	      warnWhen(instance.state.isDestroyed, createMemoryLeakWarning('hide'));
	    } // Early bail-out


	    var isAlreadyHidden = !instance.state.isVisible;
	    var isDestroyed = instance.state.isDestroyed;
	    var isDisabled = !instance.state.isEnabled;
	    var duration = getValueAtIndexOrReturn(instance.props.duration, 1, defaultProps.duration);

	    if (isAlreadyHidden || isDestroyed || isDisabled) {
	      return;
	    }

	    invokeHook('onHide', [instance], false);

	    if (instance.props.onHide(instance) === false) {
	      return;
	    }

	    instance.state.isVisible = false;
	    instance.state.isShown = false;
	    ignoreOnFirstUpdate = false;
	    isVisibleFromClick = false;

	    if (getIsDefaultRenderFn()) {
	      popper.style.visibility = 'hidden';
	    }

	    cleanupInteractiveMouseListeners();
	    removeDocumentPress();
	    handleStyles();

	    if (getIsDefaultRenderFn()) {
	      var _getDefaultTemplateCh4 = getDefaultTemplateChildren(),
	          box = _getDefaultTemplateCh4.box,
	          content = _getDefaultTemplateCh4.content;

	      if (instance.props.animation) {
	        setTransitionDuration([box, content], duration);
	        setVisibilityState([box, content], 'hidden');
	      }
	    }

	    handleAriaContentAttribute();
	    handleAriaExpandedAttribute();

	    if (instance.props.animation) {
	      if (getIsDefaultRenderFn()) {
	        onTransitionedOut(duration, instance.unmount);
	      }
	    } else {
	      instance.unmount();
	    }
	  }

	  function hideWithInteractivity(event) {
	    /* istanbul ignore else */
	    if (process.env.NODE_ENV !== "production") {
	      warnWhen(instance.state.isDestroyed, createMemoryLeakWarning('hideWithInteractivity'));
	    }

	    getDocument().addEventListener('mousemove', debouncedOnMouseMove);
	    pushIfUnique(mouseMoveListeners, debouncedOnMouseMove);
	    debouncedOnMouseMove(event);
	  }

	  function unmount() {
	    /* istanbul ignore else */
	    if (process.env.NODE_ENV !== "production") {
	      warnWhen(instance.state.isDestroyed, createMemoryLeakWarning('unmount'));
	    }

	    if (instance.state.isVisible) {
	      instance.hide();
	    }

	    if (!instance.state.isMounted) {
	      return;
	    }

	    destroyPopperInstance(); // If a popper is not interactive, it will be appended outside the popper
	    // tree by default. This seems mainly for interactive tippies, but we should
	    // find a workaround if possible

	    getNestedPopperTree().forEach(function (nestedPopper) {
	      nestedPopper._tippy.unmount();
	    });

	    if (popper.parentNode) {
	      popper.parentNode.removeChild(popper);
	    }

	    mountedInstances = mountedInstances.filter(function (i) {
	      return i !== instance;
	    });
	    instance.state.isMounted = false;
	    invokeHook('onHidden', [instance]);
	  }

	  function destroy() {
	    /* istanbul ignore else */
	    if (process.env.NODE_ENV !== "production") {
	      warnWhen(instance.state.isDestroyed, createMemoryLeakWarning('destroy'));
	    }

	    if (instance.state.isDestroyed) {
	      return;
	    }

	    instance.clearDelayTimeouts();
	    instance.unmount();
	    removeListeners();
	    delete reference._tippy;
	    instance.state.isDestroyed = true;
	    invokeHook('onDestroy', [instance]);
	  }
	}

	function tippy(targets, optionalProps) {
	  if (optionalProps === void 0) {
	    optionalProps = {};
	  }

	  var plugins = defaultProps.plugins.concat(optionalProps.plugins || []);
	  /* istanbul ignore else */

	  if (process.env.NODE_ENV !== "production") {
	    validateTargets(targets);
	    validateProps(optionalProps, plugins);
	  }

	  bindGlobalEventListeners();
	  var passedProps = Object.assign({}, optionalProps, {
	    plugins: plugins
	  });
	  var elements = getArrayOfElements(targets);
	  /* istanbul ignore else */

	  if (process.env.NODE_ENV !== "production") {
	    var isSingleContentElement = isElement(passedProps.content);
	    var isMoreThanOneReferenceElement = elements.length > 1;
	    warnWhen(isSingleContentElement && isMoreThanOneReferenceElement, ['tippy() was passed an Element as the `content` prop, but more than', 'one tippy instance was created by this invocation. This means the', 'content element will only be appended to the last tippy instance.', '\n\n', 'Instead, pass the .innerHTML of the element, or use a function that', 'returns a cloned version of the element instead.', '\n\n', '1) content: element.innerHTML\n', '2) content: () => element.cloneNode(true)'].join(' '));
	  }

	  var instances = elements.reduce(function (acc, reference) {
	    var instance = reference && createTippy(reference, passedProps);

	    if (instance) {
	      acc.push(instance);
	    }

	    return acc;
	  }, []);
	  return isElement(targets) ? instances[0] : instances;
	}

	tippy.defaultProps = defaultProps;
	tippy.setDefaultProps = setDefaultProps;
	tippy.currentInput = currentInput;

	// every time the popper is destroyed (i.e. a new target), removing the styles
	// and causing transitions to break for singletons when the console is open, but
	// most notably for non-transform styles being used, `gpuAcceleration: false`.

	Object.assign({}, applyStyles$1, {
	  effect: function effect(_ref) {
	    var state = _ref.state;
	    var initialStyles = {
	      popper: {
	        position: state.options.strategy,
	        left: '0',
	        top: '0',
	        margin: '0'
	      },
	      arrow: {
	        position: 'absolute'
	      },
	      reference: {}
	    };
	    Object.assign(state.elements.popper.style, initialStyles.popper);
	    state.styles = initialStyles;

	    if (state.elements.arrow) {
	      Object.assign(state.elements.arrow.style, initialStyles.arrow);
	    } // intentionally return no cleanup function
	    // return () => { ... }

	  }
	});

	tippy.setDefaultProps({
	  render: render
	});

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

	var isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined';
	function preserveRef(ref, node) {
	  if (ref) {
	    if (typeof ref === 'function') {
	      ref(node);
	    }

	    if ({}.hasOwnProperty.call(ref, 'current')) {
	      ref.current = node;
	    }
	  }
	}
	function ssrSafeCreateDiv() {
	  return isBrowser && document.createElement('div');
	}
	function toDataAttributes(attrs) {
	  var dataAttrs = {
	    'data-placement': attrs.placement
	  };

	  if (attrs.referenceHidden) {
	    dataAttrs['data-reference-hidden'] = '';
	  }

	  if (attrs.escaped) {
	    dataAttrs['data-escaped'] = '';
	  }

	  return dataAttrs;
	}

	function deepEqual(x, y) {
	  if (x === y) {
	    return true;
	  } else if (typeof x === 'object' && x != null && typeof y === 'object' && y != null) {
	    if (Object.keys(x).length !== Object.keys(y).length) {
	      return false;
	    }

	    for (var prop in x) {
	      if (y.hasOwnProperty(prop)) {
	        if (!deepEqual(x[prop], y[prop])) {
	          return false;
	        }
	      } else {
	        return false;
	      }
	    }

	    return true;
	  } else {
	    return false;
	  }
	}

	function uniqueByShape(arr) {
	  var output = [];
	  arr.forEach(function (item) {
	    if (!output.find(function (outputItem) {
	      return deepEqual(item, outputItem);
	    })) {
	      output.push(item);
	    }
	  });
	  return output;
	}
	function deepPreserveProps(instanceProps, componentProps) {
	  var _instanceProps$popper, _componentProps$poppe;

	  return Object.assign({}, componentProps, {
	    popperOptions: Object.assign({}, instanceProps.popperOptions, componentProps.popperOptions, {
	      modifiers: uniqueByShape([].concat(((_instanceProps$popper = instanceProps.popperOptions) == null ? void 0 : _instanceProps$popper.modifiers) || [], ((_componentProps$poppe = componentProps.popperOptions) == null ? void 0 : _componentProps$poppe.modifiers) || []))
	    })
	  });
	}

	var useIsomorphicLayoutEffect = isBrowser ? h : y;
	function useMutableBox(initialValue) {
	  // Using refs instead of state as it's recommended to not store imperative
	  // values in state due to memory problems in React(?)
	  var ref = s();

	  if (!ref.current) {
	    ref.current = typeof initialValue === 'function' ? initialValue() : initialValue;
	  }

	  return ref.current;
	}

	function updateClassName(box, action, classNames) {
	  classNames.split(/\s+/).forEach(function (name) {
	    if (name) {
	      box.classList[action](name);
	    }
	  });
	}

	var classNamePlugin = {
	  name: 'className',
	  defaultValue: '',
	  fn: function fn(instance) {
	    var box = instance.popper.firstElementChild;

	    var isDefaultRenderFn = function isDefaultRenderFn() {
	      var _instance$props$rende;

	      return !!((_instance$props$rende = instance.props.render) == null ? void 0 : _instance$props$rende.$$tippy);
	    };

	    function add() {
	      if (instance.props.className && !isDefaultRenderFn()) {
	        if (process.env.NODE_ENV !== 'production') {
	          console.warn(['@tippyjs/react: Cannot use `className` prop in conjunction with', '`render` prop. Place the className on the element you are', 'rendering.'].join(' '));
	        }

	        return;
	      }

	      updateClassName(box, 'add', instance.props.className);
	    }

	    function remove() {
	      if (isDefaultRenderFn()) {
	        updateClassName(box, 'remove', instance.props.className);
	      }
	    }

	    return {
	      onCreate: add,
	      onBeforeUpdate: remove,
	      onAfterUpdate: add
	    };
	  }
	};

	function TippyGenerator(tippy) {
	  function Tippy(_ref) {
	    var children = _ref.children,
	        content = _ref.content,
	        visible = _ref.visible,
	        singleton = _ref.singleton,
	        render = _ref.render,
	        reference = _ref.reference,
	        _ref$disabled = _ref.disabled,
	        disabled = _ref$disabled === void 0 ? false : _ref$disabled,
	        _ref$ignoreAttributes = _ref.ignoreAttributes,
	        ignoreAttributes = _ref$ignoreAttributes === void 0 ? true : _ref$ignoreAttributes;
	        _ref.__source;
	        _ref.__self;
	        var restOfNativeProps = _objectWithoutPropertiesLoose(_ref, ["children", "content", "visible", "singleton", "render", "reference", "disabled", "ignoreAttributes", "__source", "__self"]);

	    var isControlledMode = visible !== undefined;
	    var isSingletonMode = singleton !== undefined;

	    var _useState = l(false),
	        mounted = _useState[0],
	        setMounted = _useState[1];

	    var _useState2 = l({}),
	        attrs = _useState2[0],
	        setAttrs = _useState2[1];

	    var _useState3 = l(),
	        singletonContent = _useState3[0],
	        setSingletonContent = _useState3[1];

	    var mutableBox = useMutableBox(function () {
	      return {
	        container: ssrSafeCreateDiv(),
	        renders: 1
	      };
	    });
	    var props = Object.assign({
	      ignoreAttributes: ignoreAttributes
	    }, restOfNativeProps, {
	      content: mutableBox.container
	    });

	    if (isControlledMode) {
	      if (process.env.NODE_ENV !== 'production') {
	        ['trigger', 'hideOnClick', 'showOnCreate'].forEach(function (nativeStateProp) {
	          if (props[nativeStateProp] !== undefined) {
	            console.warn(["@tippyjs/react: Cannot specify `" + nativeStateProp + "` prop in", "controlled mode (`visible` prop)"].join(' '));
	          }
	        });
	      }

	      props.trigger = 'manual';
	      props.hideOnClick = false;
	    }

	    if (isSingletonMode) {
	      disabled = true;
	    }

	    var computedProps = props;
	    var plugins = props.plugins || [];

	    if (render) {
	      computedProps = Object.assign({}, props, {
	        plugins: isSingletonMode && singleton.data != null ? [].concat(plugins, [{
	          fn: function fn() {
	            return {
	              onTrigger: function onTrigger(instance, event) {
	                var node = singleton.data.children.find(function (_ref2) {
	                  var instance = _ref2.instance;
	                  return instance.reference === event.currentTarget;
	                });
	                instance.state.$$activeSingletonInstance = node.instance;
	                setSingletonContent(node.content);
	              }
	            };
	          }
	        }]) : plugins,
	        render: function render() {
	          return {
	            popper: mutableBox.container
	          };
	        }
	      });
	    }

	    var deps = [reference].concat(children ? [children.type] : []); // CREATE

	    useIsomorphicLayoutEffect(function () {
	      var element = reference;

	      if (reference && reference.hasOwnProperty('current')) {
	        element = reference.current;
	      }

	      var instance = tippy(element || mutableBox.ref || ssrSafeCreateDiv(), Object.assign({}, computedProps, {
	        plugins: [classNamePlugin].concat(props.plugins || [])
	      }));
	      mutableBox.instance = instance;

	      if (disabled) {
	        instance.disable();
	      }

	      if (visible) {
	        instance.show();
	      }

	      if (isSingletonMode) {
	        singleton.hook({
	          instance: instance,
	          content: content,
	          props: computedProps,
	          setSingletonContent: setSingletonContent
	        });
	      }

	      setMounted(true);
	      return function () {
	        instance.destroy();
	        singleton == null ? void 0 : singleton.cleanup(instance);
	      };
	    }, deps); // UPDATE

	    useIsomorphicLayoutEffect(function () {
	      var _instance$popperInsta;

	      // Prevent this effect from running on 1st render
	      if (mutableBox.renders === 1) {
	        mutableBox.renders++;
	        return;
	      }

	      var instance = mutableBox.instance;
	      instance.setProps(deepPreserveProps(instance.props, computedProps)); // Fixes #264

	      (_instance$popperInsta = instance.popperInstance) == null ? void 0 : _instance$popperInsta.forceUpdate();

	      if (disabled) {
	        instance.disable();
	      } else {
	        instance.enable();
	      }

	      if (isControlledMode) {
	        if (visible) {
	          instance.show();
	        } else {
	          instance.hide();
	        }
	      }

	      if (isSingletonMode) {
	        singleton.hook({
	          instance: instance,
	          content: content,
	          props: computedProps,
	          setSingletonContent: setSingletonContent
	        });
	      }
	    });
	    useIsomorphicLayoutEffect(function () {
	      var _instance$props$poppe;

	      if (!render) {
	        return;
	      }

	      var instance = mutableBox.instance;
	      instance.setProps({
	        popperOptions: Object.assign({}, instance.props.popperOptions, {
	          modifiers: [].concat((((_instance$props$poppe = instance.props.popperOptions) == null ? void 0 : _instance$props$poppe.modifiers) || []).filter(function (_ref3) {
	            var name = _ref3.name;
	            return name !== '$$tippyReact';
	          }), [{
	            name: '$$tippyReact',
	            enabled: true,
	            phase: 'beforeWrite',
	            requires: ['computeStyles'],
	            fn: function fn(_ref4) {
	              var _state$modifiersData;

	              var state = _ref4.state;
	              var hideData = (_state$modifiersData = state.modifiersData) == null ? void 0 : _state$modifiersData.hide; // WARNING: this is a high-risk path that can cause an infinite
	              // loop. This expression _must_ evaluate to false when required

	              if (attrs.placement !== state.placement || attrs.referenceHidden !== (hideData == null ? void 0 : hideData.isReferenceHidden) || attrs.escaped !== (hideData == null ? void 0 : hideData.hasPopperEscaped)) {
	                setAttrs({
	                  placement: state.placement,
	                  referenceHidden: hideData == null ? void 0 : hideData.isReferenceHidden,
	                  escaped: hideData == null ? void 0 : hideData.hasPopperEscaped
	                });
	              }

	              state.attributes.popper = {};
	            }
	          }])
	        })
	      });
	    }, [attrs.placement, attrs.referenceHidden, attrs.escaped].concat(deps));
	    return /*#__PURE__*/React.createElement(React.Fragment, null, children ? /*#__PURE__*/an(children, {
	      ref: function ref(node) {
	        mutableBox.ref = node;
	        preserveRef(children.ref, node);
	      }
	    }) : null, mounted && /*#__PURE__*/I(render ? render(toDataAttributes(attrs), singletonContent, mutableBox.instance) : content, mutableBox.container));
	  }

	  return Tippy;
	}

	var forwardRef = (function (Tippy, defaultProps) {
	  return /*#__PURE__*/x(function TippyWrapper(_ref, _ref2) {
	    var children = _ref.children,
	        props = _objectWithoutPropertiesLoose(_ref, ["children"]);

	    return (
	      /*#__PURE__*/
	      // If I spread them separately here, Babel adds the _extends ponyfill for
	      // some reason
	      React.createElement(Tippy, Object.assign({}, defaultProps, props), children ? /*#__PURE__*/an(children, {
	        ref: function ref(node) {
	          preserveRef(_ref2, node);
	          preserveRef(children.ref, node);
	        }
	      }) : null)
	    );
	  });
	});
	var index = /*#__PURE__*/forwardRef( /*#__PURE__*/TippyGenerator(tippy));

	var anObject$2 = anObject$8;

	// `RegExp.prototype.flags` getter implementation
	// https://tc39.es/ecma262/#sec-get-regexp.prototype.flags
	var regexpFlags$1 = function () {
	  var that = anObject$2(this);
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

	var fails$4 = fails$g;

	// babel-minify transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError,
	var RE = function (s, f) {
	  return RegExp(s, f);
	};

	regexpStickyHelpers.UNSUPPORTED_Y = fails$4(function () {
	  var re = RE('a', 'y');
	  re.lastIndex = 2;
	  return re.exec('abcd') != null;
	});

	regexpStickyHelpers.BROKEN_CARET = fails$4(function () {
	  // https://bugzilla.mozilla.org/show_bug.cgi?id=773687
	  var re = RE('^r', 'gy');
	  re.lastIndex = 2;
	  return re.exec('str') != null;
	});

	var fails$3 = fails$g;

	var regexpUnsupportedDotAll = fails$3(function () {
	  // babel-minify transpiles RegExp('.', 's') -> /./s and it causes SyntaxError
	  var re = RegExp('.', (typeof '').charAt(0));
	  return !(re.dotAll && re.exec('\n') && re.flags === 's');
	});

	var fails$2 = fails$g;

	var regexpUnsupportedNcg = fails$2(function () {
	  // babel-minify transpiles RegExp('.', 'g') -> /./g and it causes SyntaxError
	  var re = RegExp('(?<a>b)', (typeof '').charAt(5));
	  return re.exec('b').groups.a !== 'b' ||
	    'b'.replace(re, '$<a>c') !== 'bc';
	});

	/* eslint-disable regexp/no-assertion-capturing-group, regexp/no-empty-group, regexp/no-lazy-ends -- testing */
	/* eslint-disable regexp/no-useless-quantifier -- testing */
	var regexpFlags = regexpFlags$1;
	var stickyHelpers$1 = regexpStickyHelpers;
	var shared = shared$5.exports;
	var create = objectCreate;
	var getInternalState = internalState.get;
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

	var UNSUPPORTED_Y$1 = stickyHelpers$1.UNSUPPORTED_Y || stickyHelpers$1.BROKEN_CARET;

	// nonparticipating capturing group, copied from es5-shim's String#split patch.
	var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

	var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED || UNSUPPORTED_Y$1 || UNSUPPORTED_DOT_ALL || UNSUPPORTED_NCG;

	if (PATCH) {
	  // eslint-disable-next-line max-statements -- TODO
	  patchedExec = function exec(str) {
	    var re = this;
	    var state = getInternalState(re);
	    var raw = state.raw;
	    var result, reCopy, lastIndex, match, i, object, group;

	    if (raw) {
	      raw.lastIndex = re.lastIndex;
	      result = patchedExec.call(raw, str);
	      re.lastIndex = raw.lastIndex;
	      return result;
	    }

	    var groups = state.groups;
	    var sticky = UNSUPPORTED_Y$1 && re.sticky;
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
	      match.groups = object = create(null);
	      for (i = 0; i < groups.length; i++) {
	        group = groups[i];
	        object[group[0]] = match[group[1]];
	      }
	    }

	    return match;
	  };
	}

	var regexpExec$3 = patchedExec;

	var $$1 = _export;
	var exec = regexpExec$3;

	// `RegExp.prototype.exec` method
	// https://tc39.es/ecma262/#sec-regexp.prototype.exec
	$$1({ target: 'RegExp', proto: true, forced: /./.exec !== exec }, {
	  exec: exec
	});

	// TODO: Remove from `core-js@4` since it's moved to entry points

	var redefine$1 = redefine$4.exports;
	var regexpExec$2 = regexpExec$3;
	var fails$1 = fails$g;
	var wellKnownSymbol$4 = wellKnownSymbol$b;
	var createNonEnumerableProperty = createNonEnumerableProperty$7;

	var SPECIES$1 = wellKnownSymbol$4('species');
	var RegExpPrototype = RegExp.prototype;

	var fixRegexpWellKnownSymbolLogic = function (KEY, exec, FORCED, SHAM) {
	  var SYMBOL = wellKnownSymbol$4(KEY);

	  var DELEGATES_TO_SYMBOL = !fails$1(function () {
	    // String methods call symbol-named RegEp methods
	    var O = {};
	    O[SYMBOL] = function () { return 7; };
	    return ''[KEY](O) != 7;
	  });

	  var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL && !fails$1(function () {
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
	      if ($exec === regexpExec$2 || $exec === RegExpPrototype.exec) {
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

	    redefine$1(String.prototype, KEY, methods[0]);
	    redefine$1(RegExpPrototype, SYMBOL, methods[1]);
	  }

	  if (SHAM) createNonEnumerableProperty(RegExpPrototype[SYMBOL], 'sham', true);
	};

	var isObject = isObject$8;
	var classof$3 = classofRaw$1;
	var wellKnownSymbol$3 = wellKnownSymbol$b;

	var MATCH = wellKnownSymbol$3('match');

	// `IsRegExp` abstract operation
	// https://tc39.es/ecma262/#sec-isregexp
	var isRegexp = function (it) {
	  var isRegExp;
	  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : classof$3(it) == 'RegExp');
	};

	var anObject$1 = anObject$8;
	var aFunction = aFunction$2;
	var wellKnownSymbol$2 = wellKnownSymbol$b;

	var SPECIES = wellKnownSymbol$2('species');

	// `SpeciesConstructor` abstract operation
	// https://tc39.es/ecma262/#sec-speciesconstructor
	var speciesConstructor$1 = function (O, defaultConstructor) {
	  var C = anObject$1(O).constructor;
	  var S;
	  return C === undefined || (S = anObject$1(C)[SPECIES]) == undefined ? defaultConstructor : aFunction(S);
	};

	var toInteger = toInteger$3;
	var requireObjectCoercible$1 = requireObjectCoercible$4;

	// `String.prototype.{ codePointAt, at }` methods implementation
	var createMethod = function (CONVERT_TO_STRING) {
	  return function ($this, pos) {
	    var S = String(requireObjectCoercible$1($this));
	    var position = toInteger(pos);
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

	var charAt = stringMultibyte.charAt;

	// `AdvanceStringIndex` abstract operation
	// https://tc39.es/ecma262/#sec-advancestringindex
	var advanceStringIndex$1 = function (S, index, unicode) {
	  return index + (unicode ? charAt(S, index).length : 1);
	};

	var classof$2 = classofRaw$1;
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

	  if (classof$2(R) !== 'RegExp') {
	    throw TypeError('RegExp#exec called on incompatible receiver');
	  }

	  return regexpExec$1.call(R, S);
	};

	var fixRegExpWellKnownSymbolLogic = fixRegexpWellKnownSymbolLogic;
	var isRegExp = isRegexp;
	var anObject = anObject$8;
	var requireObjectCoercible = requireObjectCoercible$4;
	var speciesConstructor = speciesConstructor$1;
	var advanceStringIndex = advanceStringIndex$1;
	var toLength = toLength$4;
	var callRegExpExec = regexpExecAbstract;
	var regexpExec = regexpExec$3;
	var stickyHelpers = regexpStickyHelpers;
	var fails = fails$g;

	var UNSUPPORTED_Y = stickyHelpers.UNSUPPORTED_Y;
	var arrayPush = [].push;
	var min = Math.min;
	var MAX_UINT32 = 0xFFFFFFFF;

	// Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
	// Weex JS has frozen built-in prototypes, so use try / catch wrapper
	var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = !fails(function () {
	  // eslint-disable-next-line regexp/no-empty-group -- required for testing
	  var re = /(?:)/;
	  var originalExec = re.exec;
	  re.exec = function () { return originalExec.apply(this, arguments); };
	  var result = 'ab'.split(re);
	  return result.length !== 2 || result[0] !== 'a' || result[1] !== 'b';
	});

	// @@split logic
	fixRegExpWellKnownSymbolLogic('split', function (SPLIT, nativeSplit, maybeCallNative) {
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
	      var string = String(requireObjectCoercible(this));
	      var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
	      if (lim === 0) return [];
	      if (separator === undefined) return [string];
	      // If `separator` is not a regex, use native split
	      if (!isRegExp(separator)) {
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
	      var O = requireObjectCoercible(this);
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

	      var rx = anObject(this);
	      var S = String(string);
	      var C = speciesConstructor(rx, RegExp);

	      var unicodeMatching = rx.unicode;
	      var flags = (rx.ignoreCase ? 'i' : '') +
	                  (rx.multiline ? 'm' : '') +
	                  (rx.unicode ? 'u' : '') +
	                  (UNSUPPORTED_Y ? 'g' : 'y');

	      // ^(? + rx + ) is needed, in combination with some S slicing, to
	      // simulate the 'y' flag.
	      var splitter = new C(UNSUPPORTED_Y ? '^(?:' + rx.source + ')' : rx, flags);
	      var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
	      if (lim === 0) return [];
	      if (S.length === 0) return callRegExpExec(splitter, S) === null ? [S] : [];
	      var p = 0;
	      var q = 0;
	      var A = [];
	      while (q < S.length) {
	        splitter.lastIndex = UNSUPPORTED_Y ? 0 : q;
	        var z = callRegExpExec(splitter, UNSUPPORTED_Y ? S.slice(q) : S);
	        var e;
	        if (
	          z === null ||
	          (e = min(toLength(splitter.lastIndex + (UNSUPPORTED_Y ? q : 0)), S.length)) === p
	        ) {
	          q = advanceStringIndex(S, q, unicodeMatching);
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
	}, !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC, UNSUPPORTED_Y);

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

	var appendClassName = function appendClassName(container, selector, className) {
	  var target = container.querySelector(selector);

	  if (target) {
	    target.classList.add(className);
	  }
	};

	var prefixClassNamePlugin = {
	  name: "prefixClassName",
	  defaultValue: "",
	  fn: function fn(instance) {
	    return {
	      onCreate: function onCreate(instance) {
	        var box = instance.popper.firstElementChild;
	        var prefixCls = instance.props.prefixClassName || "ft-popover";

	        if (box) {
	          box.classList.add(prefixCls);
	          appendClassName(box, ".tippy-content", "".concat(prefixCls, "-content"));
	          appendClassName(box, ".tippy-arrow", "".concat(prefixCls, "-arrow"));
	          appendClassName(box, ".tippy-backdrop", "".concat(prefixCls, "-backdrop"));
	        }
	      }
	    };
	  }
	};

	var wellKnownSymbol$1 = wellKnownSymbol$b;

	var TO_STRING_TAG$1 = wellKnownSymbol$1('toStringTag');
	var test = {};

	test[TO_STRING_TAG$1] = 'z';

	var toStringTagSupport = String(test) === '[object z]';

	var TO_STRING_TAG_SUPPORT$2 = toStringTagSupport;
	var classofRaw = classofRaw$1;
	var wellKnownSymbol = wellKnownSymbol$b;

	var TO_STRING_TAG = wellKnownSymbol('toStringTag');
	// ES3 wrong here
	var CORRECT_ARGUMENTS = classofRaw(function () { return arguments; }()) == 'Arguments';

	// fallback for IE11 Script Access Denied error
	var tryGet = function (it, key) {
	  try {
	    return it[key];
	  } catch (error) { /* empty */ }
	};

	// getting tag from ES6+ `Object.prototype.toString`
	var classof$1 = TO_STRING_TAG_SUPPORT$2 ? classofRaw : function (it) {
	  var O, tag, result;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (tag = tryGet(O = Object(it), TO_STRING_TAG)) == 'string' ? tag
	    // builtinTag case
	    : CORRECT_ARGUMENTS ? classofRaw(O)
	    // ES3 arguments fallback
	    : (result = classofRaw(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : result;
	};

	var TO_STRING_TAG_SUPPORT$1 = toStringTagSupport;
	var classof = classof$1;

	// `Object.prototype.toString` method implementation
	// https://tc39.es/ecma262/#sec-object.prototype.tostring
	var objectToString = TO_STRING_TAG_SUPPORT$1 ? {}.toString : function toString() {
	  return '[object ' + classof(this) + ']';
	};

	var TO_STRING_TAG_SUPPORT = toStringTagSupport;
	var redefine = redefine$4.exports;
	var toString = objectToString;

	// `Object.prototype.toString` method
	// https://tc39.es/ecma262/#sec-object.prototype.tostring
	if (!TO_STRING_TAG_SUPPORT) {
	  redefine(Object.prototype, 'toString', toString, { unsafe: true });
	}

	function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

	function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
	var Popover = function Popover(props) {
	  var popoverProps = function (_ref) {
	    var _ref$plugins = _ref.plugins,
	        plugins = _ref$plugins === void 0 ? [] : _ref$plugins,
	        rest = _objectWithoutProperties(_ref, ["plugins"]);

	    return _objectSpread({
	      plugins: [prefixClassNamePlugin].concat(_toConsumableArray(plugins))
	    }, rest);
	  }(props);

	  return /*#__PURE__*/React.createElement(index, popoverProps);
	};

	exports.Popover = Popover;

	Object.defineProperty(exports, '__esModule', { value: true });

})));
